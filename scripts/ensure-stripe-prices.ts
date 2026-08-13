/**
 * Ensure every template and bundle in lib/templates.ts has a valid Stripe
 * product + price. Skips items that already have a working price ID.
 *
 * Usage:
 *   npx tsx scripts/ensure-stripe-prices.ts
 *
 * What it does:
 *   1. Reads all templates + bundles from lib/templates.ts
 *   2. For each, tries to retrieve the Stripe Price (to check if it exists)
 *   3. If the price is invalid/missing, creates a new Product + Price on Stripe
 *   4. Updates lib/templates.ts in-place with any new price IDs
 *
 * Safe to run multiple times — idempotent.
 */

import Stripe from "stripe";
import fs from "node:fs";
import path from "node:path";

// ── Load .env.local ──────────────────────────────────────────────────────────
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.+)$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
}

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_KEY) {
  console.error("STRIPE_SECRET_KEY not found. Set it in .env.local or environment.");
  process.exit(1);
}

const stripe = new Stripe(STRIPE_KEY);

// ── Parse templates.ts to extract items ──────────────────────────────────────
const templatesPath = path.resolve(process.cwd(), "lib/templates.ts");
let src = fs.readFileSync(templatesPath, "utf-8");

interface ParsedItem {
  id: string;
  name: string;
  description: string;
  price: number; // cents
  stripePriceId: string;
  type: "template" | "bundle";
}

function extractTemplates(source: string): ParsedItem[] {
  const items: ParsedItem[] = [];

  // Match template objects: { id: "...", name: "...", ... price: N, stripePriceId: "..." }
  const templateRegex =
    /\{\s*id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?description:\s*(?:"([^"]+)"|[\s\S]*?"([^"]+)")[\s\S]*?price:\s*(\d+)[\s\S]*?stripePriceId:\s*"([^"]+)"/g;

  // Find the templates array region
  const templatesStart = source.indexOf("export const templates");
  const bundlesStart = source.indexOf("export const bundles");

  if (templatesStart !== -1) {
    const region =
      bundlesStart !== -1
        ? source.slice(templatesStart, bundlesStart)
        : source.slice(templatesStart);
    let m;
    while ((m = templateRegex.exec(region)) !== null) {
      items.push({
        id: m[1],
        name: m[2],
        description: m[3] || m[4] || "",
        price: parseInt(m[5], 10),
        stripePriceId: m[6],
        type: "template",
      });
    }
  }

  // Reset regex and find bundles
  if (bundlesStart !== -1) {
    const bundleRegion = source.slice(bundlesStart);
    templateRegex.lastIndex = 0;
    let m;
    while ((m = templateRegex.exec(bundleRegion)) !== null) {
      items.push({
        id: m[1],
        name: m[2],
        description: m[3] || m[4] || "",
        price: parseInt(m[5], 10),
        stripePriceId: m[6],
        type: "bundle",
      });
    }
  }

  return items;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const items = extractTemplates(src);
  console.log(`\nFound ${items.length} items (templates + bundles)\n`);

  let valid = 0;
  let created = 0;
  let failed = 0;
  const replacements: { old: string; new: string }[] = [];

  for (const item of items) {
    // Try to verify existing price
    try {
      const price = await stripe.prices.retrieve(item.stripePriceId);
      if (price && price.active) {
        console.log(`  ✓  ${item.name} — ${item.stripePriceId} (valid)`);
        valid++;
        continue;
      }
    } catch {
      // Price doesn't exist or is invalid — will create
    }

    // Create new product + price
    try {
      const product = await stripe.products.create({
        name: item.name,
        description: (
          item.description || `${item.type === "bundle" ? "Bundle" : "UI Template"} — FORMA`
        ).slice(0, 500),
        metadata: {
          [`${item.type}Id`]: item.id,
          source: "forma",
          createdBy: "ensure-stripe-prices",
        },
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: item.price,
        currency: "eur",
        metadata: {
          [`${item.type}Id`]: item.id,
          source: "forma",
        },
      });

      console.log(`  ${item.name} — CREATED ${price.id} (was: ${item.stripePriceId})`);
      replacements.push({ old: item.stripePriceId, new: price.id });
      created++;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ${item.name} — FAILED: ${msg}`);
      failed++;
    }
  }

  // Update lib/templates.ts with new price IDs
  if (replacements.length > 0) {
    for (const { old: oldId, new: newId } of replacements) {
      src = src.replaceAll(`"${oldId}"`, `"${newId}"`);
    }
    fs.writeFileSync(templatesPath, src, "utf-8");
    console.log(`\nUpdated lib/templates.ts with ${replacements.length} new price IDs.`);
  }

  console.log(`\n── Summary ──────────────────────────────────────────────`);
  console.log(`  Valid (skipped):  ${valid}`);
  console.log(`  Created:          ${created}`);
  console.log(`  Failed:           ${failed}`);
  console.log(`  Total:            ${items.length}`);
  console.log();

  if (created > 0) {
    console.log(`Run: git add lib/templates.ts && git commit -m "Update Stripe price IDs"`);
  }
  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});

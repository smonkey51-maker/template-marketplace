/**
 * Reads lib/templates.ts, finds every template still using the placeholder
 * price ID, creates a Stripe Product + Price for each one, then patches the
 * file in place with the real price IDs.
 *
 * Usage:  node scripts/sync-stripe.mjs
 */

import Stripe from "stripe";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ── Load .env.local ────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
}

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY not found");
  process.exit(1);
}
const stripe = new Stripe(STRIPE_SECRET_KEY);

// ── Read templates.ts ──────────────────────────────────────────────────────
const templatesPath = path.join(__dirname, "../lib/templates.ts");
let source = fs.readFileSync(templatesPath, "utf8");

// Extract all template blocks by splitting on object boundaries.
// Strategy: find all  id: "...", name: "...", price: NNN, stripePriceId: "..."  tuples.
const templateMeta = [];
const blockRe =
  /id:\s*"([^"]+)"[^]*?name:\s*"([^"]+)"[^]*?(?:description:\s*"([^"]*)"[^]*?)?price:\s*(\d+)[^]*?stripePriceId:\s*"([^"]*)"/g;
let match;
while ((match = blockRe.exec(source)) !== null) {
  // skip the interface definition (id: string)
  if (match[1] === "string") continue;
  templateMeta.push({
    id: match[1],
    name: match[2],
    price: parseInt(match[4], 10),
    currentPriceId: match[5],
  });
}

console.log(`Found ${templateMeta.length} templates in lib/templates.ts\n`);

// ── Fetch existing Stripe products keyed by metadata.templateId ────────────
console.log("Fetching existing Stripe products...");
const existing = {}; // templateId → { productId, priceId }
let hasMore = true;
let startingAfter = undefined;
while (hasMore) {
  const page = await stripe.products.list({
    limit: 100,
    ...(startingAfter ? { starting_after: startingAfter } : {}),
  });
  for (const product of page.data) {
    if (product.metadata?.templateId) {
      const prices = await stripe.prices.list({ product: product.id, active: true, limit: 1 });
      if (prices.data.length > 0) {
        existing[product.metadata.templateId] = {
          productId: product.id,
          priceId: prices.data[0].id,
        };
      }
    }
  }
  hasMore = page.has_more;
  if (page.data.length > 0) startingAfter = page.data[page.data.length - 1].id;
}
console.log(`Found ${Object.keys(existing).length} already-synced templates in Stripe.\n`);

// ── Create or reuse product+price per template ─────────────────────────────
let patched = 0;
for (const tmpl of templateMeta) {
  let priceId;

  if (existing[tmpl.id]) {
    priceId = existing[tmpl.id].priceId;
    // Only patch if different from current
    if (priceId === tmpl.currentPriceId) {
      console.log(`=  ${tmpl.id.padEnd(35)} already correct`);
      continue;
    }
    console.log(`✓  ${tmpl.id.padEnd(35)} (existing) → ${priceId}`);
  } else {
    // Create product + price
    const product = await stripe.products.create({
      name: `${tmpl.name} — TemplateLab`,
      metadata: { templateId: tmpl.id },
    });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: tmpl.price,
      currency: "eur",
    });
    priceId = price.id;
    console.log(`+  ${tmpl.id.padEnd(35)} (created)  → ${priceId}`);
  }

  // Patch the source: find "id: "tmpl.id"" then the next stripePriceId value
  const idMarker = `id: "${tmpl.id}"`;
  const idPos = source.indexOf(idMarker);
  if (idPos === -1) {
    console.warn(`   ⚠ id not found in source: ${tmpl.id}`);
    continue;
  }

  const priceKeyPos = source.indexOf('stripePriceId: "', idPos);
  if (priceKeyPos === -1) {
    console.warn(`   ⚠ stripePriceId not found: ${tmpl.id}`);
    continue;
  }

  const valueStart = priceKeyPos + 'stripePriceId: "'.length;
  const valueEnd = source.indexOf('"', valueStart);
  source = source.slice(0, valueStart) + priceId + source.slice(valueEnd);
  patched++;
}

fs.writeFileSync(templatesPath, source, "utf8");
console.log(`\n✅  Done. Patched ${patched} price IDs in lib/templates.ts`);

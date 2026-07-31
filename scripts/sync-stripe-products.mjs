/**
 * Syncs Stripe product names + descriptions with lib/templates.ts data.
 * Run: node scripts/sync-stripe-products.mjs
 *
 * What it does:
 *  - For each template with a stripePriceId: retrieves the Stripe Price,
 *    then updates the linked Product's name and description.
 *  - For each bundle with a stripePriceId: same.
 *  - Skips items with empty/placeholder stripePriceId.
 */
import Stripe from "stripe";
import { readFileSync } from "fs";
import { createRequire } from "module";

// ── Load env ──────────────────────────────────────────────────────────────────
const envRaw = readFileSync(".env.local", "utf8");
const envMap = Object.fromEntries(
  envRaw
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => {
      const [k, ...v] = l.split("=");
      return [k.trim(), v.join("=").trim()];
    }),
);
const stripe = new Stripe(envMap.STRIPE_SECRET_KEY);

// ── Import templates data via dynamic require workaround ──────────────────────
// We read the compiled JS; since we don't want to run tsc, parse the raw TS
// source and extract the data we need directly.
const src = readFileSync("./lib/templates.ts", "utf8");

// Parse templates array: extract id, name, description, stripePriceId
//
// Bounded per-object, not one big lazy scan across the whole array: the old
// `id:[\s\S]*?name:[\s\S]*?description:[\s\S]*?stripePriceId:` regex had no
// boundary between one object and the next, so any entry missing a field (or
// with them out of this exact order) let the match bleed into the following
// template — silently pairing that template's name/description with the
// WRONG stripePriceId when this script pushes metadata to Stripe. Slicing the
// source between one `id:` and the next confines every field lookup to its
// own object.
//
// The slice itself is also bounded to the next `export const`: without that,
// extracting "templates" ran off the end of that array straight into
// "bundles" (whose entries have the same id/name/description/stripePriceId
// shape), so every bundle got synced twice — once correctly as a bundle, once
// mislabeled with `metadata.templateId`.
function extractItems(src, arrayName) {
  const items = [];
  const startMarker = `export const ${arrayName}`;
  const startIdx = src.indexOf(startMarker);
  if (startIdx === -1) return items;

  const nextExportIdx = src.indexOf("\nexport const ", startIdx + startMarker.length);
  const slice = nextExportIdx === -1 ? src.slice(startIdx) : src.slice(startIdx, nextExportIdx);
  const idRe = /id:\s*"([^"]+)"/g;
  const idMatches = [...slice.matchAll(idRe)];

  for (let i = 0; i < idMatches.length; i++) {
    const id = idMatches[i][1];
    const objStart = idMatches[i].index;
    const objEnd = i + 1 < idMatches.length ? idMatches[i + 1].index : slice.length;
    const objSrc = slice.slice(objStart, objEnd);

    const name = objSrc.match(/name:\s*"([^"]+)"/)?.[1];
    const description = objSrc.match(/description:\s*"([^"]+)"/)?.[1];
    const stripePriceId = objSrc.match(/stripePriceId:\s*"([^"]+)"/)?.[1];
    if (!name || !description || !stripePriceId) continue;

    items.push({ id, name, description, stripePriceId });
  }
  return items;
}

const templates = extractItems(src, "templates");
const bundles = extractItems(src, "bundles");

console.log(`Found ${templates.length} templates, ${bundles.length} bundles.\n`);

async function syncItem(item, type) {
  if (!item.stripePriceId || item.stripePriceId.startsWith("price_TODO")) {
    console.log(`  ⏭  Skipping ${item.id} (no valid price ID)`);
    return;
  }

  try {
    // Get price to find product ID
    const price = await stripe.prices.retrieve(item.stripePriceId);
    const productId = typeof price.product === "string" ? price.product : price.product.id;

    // Update product
    await stripe.products.update(productId, {
      name: item.name,
      description: item.description.slice(0, 500), // Stripe max 500 chars
      metadata: {
        [`${type}Id`]: item.id,
        source: "forma",
        lastSync: new Date().toISOString().slice(0, 10),
      },
    });

    console.log(`  ✓  ${item.name} (${item.id})`);
  } catch (err) {
    console.error(`  ✗  ${item.id}: ${err.message}`);
  }
}

console.log("── Templates ─────────────────────────────────────────────────────");
for (const tmpl of templates) {
  await syncItem(tmpl, "template");
}

console.log("\n── Bundles ───────────────────────────────────────────────────────");
for (const bundle of bundles) {
  await syncItem(bundle, "bundle");
}

console.log("\nSync complete.");

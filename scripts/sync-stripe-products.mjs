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
import Stripe from 'stripe';
import { readFileSync } from 'fs';
import { createRequire } from 'module';

// ── Load env ──────────────────────────────────────────────────────────────────
const envRaw = readFileSync('.env.local', 'utf8');
const envMap = Object.fromEntries(
  envRaw.split('\n')
    .filter(l => l.includes('='))
    .map(l => { const [k, ...v] = l.split('='); return [k.trim(), v.join('=').trim()]; })
);
const stripe = new Stripe(envMap.STRIPE_SECRET_KEY);

// ── Import templates data via dynamic require workaround ──────────────────────
// We read the compiled JS; since we don't want to run tsc, parse the raw TS
// source and extract the data we need directly.
const src = readFileSync('./lib/templates.ts', 'utf8');

// Parse templates array: extract id, name, description, stripePriceId
function extractItems(src, arrayName) {
  const items = [];
  const startMarker = `export const ${arrayName}`;
  const startIdx = src.indexOf(startMarker);
  if (startIdx === -1) return items;

  // Walk through and extract each { id, name, description, stripePriceId } block
  const re = /id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]+)"[\s\S]*?stripePriceId:\s*"([^"]+)"/g;
  // Only search from the array start
  const slice = src.slice(startIdx);
  let m;
  while ((m = re.exec(slice)) !== null) {
    items.push({
      id: m[1],
      name: m[2],
      description: m[3],
      stripePriceId: m[4],
    });
  }
  return items;
}

const templates = extractItems(src, 'templates');
const bundles = extractItems(src, 'bundles');

console.log(`Found ${templates.length} templates, ${bundles.length} bundles.\n`);

async function syncItem(item, type) {
  if (!item.stripePriceId || item.stripePriceId.startsWith('price_TODO')) {
    console.log(`  ⏭  Skipping ${item.id} (no valid price ID)`);
    return;
  }

  try {
    // Get price to find product ID
    const price = await stripe.prices.retrieve(item.stripePriceId);
    const productId = typeof price.product === 'string' ? price.product : price.product.id;

    // Update product
    await stripe.products.update(productId, {
      name: item.name,
      description: item.description.slice(0, 500), // Stripe max 500 chars
      metadata: {
        [`${type}Id`]: item.id,
        source: 'templatelab',
        lastSync: new Date().toISOString().slice(0, 10),
      },
    });

    console.log(`  ✓  ${item.name} (${item.id})`);
  } catch (err) {
    console.error(`  ✗  ${item.id}: ${err.message}`);
  }
}

console.log('── Templates ─────────────────────────────────────────────────────');
for (const tmpl of templates) {
  await syncItem(tmpl, 'template');
}

console.log('\n── Bundles ───────────────────────────────────────────────────────');
for (const bundle of bundles) {
  await syncItem(bundle, 'bundle');
}

console.log('\nSync complete.');

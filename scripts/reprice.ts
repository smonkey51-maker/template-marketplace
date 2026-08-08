/**
 * Move the catalogue onto a new price ladder, on Stripe and in the code at the
 * same time.
 *
 * Why this exists rather than editing lib/templates.ts by hand: checkout bills
 * through `stripePriceId`, so the `price` field in lib/templates.ts is only the
 * number the shop *displays*. Editing it alone makes the site advertise one
 * amount and charge another. And a Stripe Price is immutable — repricing means
 * creating a new Price on the same Product and pointing at it. Those two edits
 * have to happen together or the shop lies, so this script does both or
 * neither.
 *
 * Usage:
 *   npx tsx scripts/reprice.ts            # dry run — prints the plan, writes nothing
 *   npx tsx scripts/reprice.ts --apply    # creates the Prices and rewrites lib/templates.ts
 *
 * STRIPE_SECRET_KEY comes from .env.local or the environment. Never paste it
 * into a chat or a commit; a live key that has been seen by anyone else has to
 * be rolled.
 *
 * ── The ladder, and why ──────────────────────────────────────────────────────
 *
 * The 2026 market report puts a "premium guide" at $29-99 and calls the
 * low-price standalone guide a dying model. That tier describes a 100+ page
 * artifact — 25,000 to 50,000 words. These products run 400 to 3,794 words.
 * Pricing a 1,200-word guide at €39 because a benchmark for something ten times
 * its size says so is not premium positioning, it is mispricing, and the first
 * refund request would say so.
 *
 * So the ladder stays inside the two bands that do describe this catalogue —
 * AI prompt pack $3-30, template $7-49 — and moves the floor rather than the
 * ceiling: €7 disappears, €12 becomes the entry price, €19 the top. The report's
 * point that survives here is that €7 is below the level at which a buyer reads
 * a product as worth their attention, not that everything should cost €39.
 */

import Stripe from "stripe";
import fs from "node:fs";
import path from "node:path";

/** id → new price in cents. Only the products still on sale. */
const TEMPLATE_PRICES: Record<string, number> = {
  // AI / prompts — the biggest artifacts in the catalogue.
  "chatgpt-prompt-library-freelancers": 1900, // 3,794 words, 45 KB — the top of the ladder
  "chatgpt-prompt-pack-creators": 1500, // 2,006 words
  "midjourney-prompt-guide-mockups": 1500, // 1,096 words, but a full workflow
  // B2B copy and playbooks.
  "dm-sales-script-pack": 1500, // 1,901 words, 10 ready scripts
  "first-100-online-guide": 1500, // 1,238 words
  "digital-product-launch-checklist": 1200, // 701 words — a checklist, priced as one
  // Working tools. Priced on what they do, not how much text they contain.
  "freelance-rate-calculator": 1500, // a calculator you use repeatedly
  "monthly-business-finance-tracker": 1200,
  "remote-job-search-tracker": 1200,
};

/**
 * Bundles: [new price, saving off the sum of the parts].
 *
 * `regularPrice` is not listed because it is not a choice — it is the sum of
 * the members' new prices, recomputed here. It is the crossed-out figure a
 * buyer is shown, so under the Omnibus directive it has to be a price the
 * products are genuinely sold at, and lib/bundles.test.ts fails if it drifts.
 */
const BUNDLE_SAVINGS: Record<string, number> = {
  "bundle-ai-creator": 2000, // sum 6400 → 4400
  "bundle-money-career": 2000, // sum 6600 → 4600
};

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.+)$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
}

const APPLY = process.argv.includes("--apply");
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_KEY) {
  console.error("STRIPE_SECRET_KEY not set — put it in .env.local or the environment.");
  process.exit(1);
}
const stripe = new Stripe(STRIPE_KEY);

const templatesPath = path.resolve(process.cwd(), "lib/templates.ts");

interface Change {
  id: string;
  kind: "template" | "bundle";
  oldPrice: number;
  newPrice: number;
  oldRegular?: number;
  newRegular?: number;
  oldPriceId: string;
  newPriceId?: string;
}

async function main() {
  const { templates, bundles, sellableTemplates, sellableBundles } =
    await import("../lib/templates");

  // Every product named in the ladder must still be on sale, and every product
  // on sale must be named. A silent gap here reprices some of the shop and
  // leaves the rest, which is worse than not running at all.
  const sellableIds = new Set(sellableTemplates.filter((t) => t.price > 0).map((t) => t.id));
  const named = new Set(Object.keys(TEMPLATE_PRICES));
  for (const id of sellableIds) {
    if (!named.has(id)) throw new Error(`on sale but missing from the ladder: ${id}`);
  }
  for (const id of named) {
    if (!sellableIds.has(id)) throw new Error(`in the ladder but not on sale: ${id}`);
  }

  const changes: Change[] = [];

  for (const t of templates) {
    const next = TEMPLATE_PRICES[t.id];
    if (next === undefined || next === t.price) continue;
    changes.push({
      id: t.id,
      kind: "template",
      oldPrice: t.price,
      newPrice: next,
      oldPriceId: t.stripePriceId,
    });
  }

  for (const b of bundles) {
    const saving = BUNDLE_SAVINGS[b.id];
    if (saving === undefined) continue;
    const sum = b.templateIds.reduce((n, id) => n + (TEMPLATE_PRICES[id] ?? 0), 0);
    const next = sum - saving;
    if (next <= 0) throw new Error(`bundle ${b.id}: saving exceeds the sum of its parts`);
    if (saving % 100 !== 0)
      throw new Error(`bundle ${b.id}: saving is not a whole number of euros`);
    changes.push({
      id: b.id,
      kind: "bundle",
      oldPrice: b.price,
      newPrice: next,
      oldRegular: b.regularPrice,
      newRegular: sum,
      oldPriceId: b.stripePriceId,
    });
  }

  const eur = (c: number) => `€${(c / 100).toFixed(2)}`;
  console.log(APPLY ? "APPLYING\n" : "DRY RUN — nothing will be written\n");
  for (const c of changes) {
    const extra =
      c.kind === "bundle" ? `  (crossed-out ${eur(c.oldRegular!)} → ${eur(c.newRegular!)})` : "";
    console.log(`${c.id.padEnd(38)} ${eur(c.oldPrice)} → ${eur(c.newPrice)}${extra}`);
  }
  if (!changes.length) return console.log("nothing to do — already on the ladder");
  if (!APPLY) return console.log("\nRe-run with --apply to create the Prices and update the code.");

  // Create the new Prices first. If any call fails the run stops here, before
  // lib/templates.ts has been touched — so the code still points at Prices that
  // exist, and the shop keeps charging what it displays.
  for (const c of changes) {
    const existing = await stripe.prices.retrieve(c.oldPriceId);
    const productId =
      typeof existing.product === "string"
        ? existing.product
        : (existing.product as { id: string }).id;
    const created = await stripe.prices.create({
      product: productId,
      unit_amount: c.newPrice,
      currency: existing.currency,
    });
    c.newPriceId = created.id;
    console.log(`  ${c.id}: created ${created.id}`);
  }

  let src = fs.readFileSync(templatesPath, "utf-8");
  for (const c of changes) {
    const before = src;
    // Anchored on the id line so the edit lands in the right object literal.
    const block = new RegExp(`(id: "${c.id}",[\\s\\S]{0,2000}?)`);
    src = src.replace(block, (m) => {
      let out = m.replace(`price: ${c.oldPrice},`, `price: ${c.newPrice},`);
      out = out.replace(`stripePriceId: "${c.oldPriceId}"`, `stripePriceId: "${c.newPriceId}"`);
      if (c.kind === "bundle") {
        out = out.replace(`regularPrice: ${c.oldRegular},`, `regularPrice: ${c.newRegular},`);
      }
      return out;
    });
    if (src === before) throw new Error(`could not rewrite ${c.id} in lib/templates.ts`);
  }
  fs.writeFileSync(templatesPath, src);
  console.log("\nlib/templates.ts updated.");

  // Deactivating the old Prices is deliberately left out: an active old Price
  // charges nobody once nothing references it, and leaving it means a checkout
  // session opened seconds before this ran can still complete at the price it
  // quoted. Archive them from the Stripe dashboard once traffic has turned over.
  console.log("Old Prices left active on purpose — see the note at the end of this script.");
  console.log("Now run: npm test && npm run build");
}

main().catch((err) => {
  console.error("reprice failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});

/**
 * Point the catalogue at Prices that already exist on Stripe.
 *
 * The companion to scripts/reprice.ts, for when the Prices are created by hand
 * in the Stripe dashboard instead of through the API — no secret key involved,
 * because a Price id is not a secret (they sit in plain text in
 * lib/templates.ts already, alongside the amounts they charge).
 *
 * The danger this script exists to remove: checkout bills through
 * `stripePriceId` while the shop displays `price`, so a Price created at the
 * wrong amount makes the site advertise one number and charge another, silently
 * and indefinitely. So the amount is not taken on trust. You paste back what
 * Stripe shows for each new Price, and the run refuses to write unless every
 * one of them matches the ladder.
 *
 * Usage:
 *   npx tsx scripts/apply-price-ids.ts prices.tsv           # dry run
 *   npx tsx scripts/apply-price-ids.ts prices.tsv --apply
 *
 * prices.tsv — one line per product, whitespace-separated:
 *
 *   dm-sales-script-pack        price_1AbC...   1500
 *   bundle-ai-creator           price_1XyZ...   4400
 *
 * The third column is the amount **as Stripe reports it**, in cents. Copy it
 * from the dashboard rather than from the plan: the point of the column is to
 * catch a Price built at the wrong figure, and a number copied from the
 * intended value catches nothing.
 */

import fs from "node:fs";
import path from "node:path";

/** The ladder. Must stay identical to the one in scripts/reprice.ts. */
const TEMPLATE_PRICES: Record<string, number> = {
  "chatgpt-prompt-library-freelancers": 1900,
  "chatgpt-prompt-pack-creators": 1500,
  "midjourney-prompt-guide-mockups": 1500,
  "dm-sales-script-pack": 1500,
  "first-100-online-guide": 1500,
  "digital-product-launch-checklist": 1200,
  "freelance-rate-calculator": 1500,
  "monthly-business-finance-tracker": 1200,
  "remote-job-search-tracker": 1200,
};

const BUNDLE_SAVINGS: Record<string, number> = {
  "bundle-ai-creator": 2000,
  "bundle-money-career": 2000,
};

const file = process.argv[2];
const APPLY = process.argv.includes("--apply");
if (!file || file.startsWith("--")) {
  console.error("Usage: npx tsx scripts/apply-price-ids.ts prices.tsv [--apply]");
  process.exit(1);
}

const templatesPath = path.resolve(process.cwd(), "lib/templates.ts");

async function main() {
  const { templates, bundles } = await import("../lib/templates");

  const rows = fs
    .readFileSync(file, "utf-8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const [id, priceId, amount] = l.split(/\s+/);
      return { id, priceId, amount: Number(amount) };
    });

  const problems: string[] = [];

  for (const r of rows) {
    if (!r.priceId?.startsWith("price_"))
      problems.push(`${r.id}: "${r.priceId}" is not a Price id`);
    if (!Number.isInteger(r.amount)) problems.push(`${r.id}: amount "${r.amount}" is not cents`);

    const expected =
      TEMPLATE_PRICES[r.id] ??
      (BUNDLE_SAVINGS[r.id] !== undefined
        ? (bundles.find((b) => b.id === r.id)?.templateIds ?? []).reduce(
            (n, tid) => n + (TEMPLATE_PRICES[tid] ?? 0),
            0,
          ) - BUNDLE_SAVINGS[r.id]
        : undefined);

    if (expected === undefined) {
      problems.push(`${r.id}: not in the ladder`);
    } else if (r.amount !== expected) {
      // The whole reason the third column exists.
      problems.push(
        `${r.id}: Stripe says ${r.amount} but the ladder says ${expected} — ` +
          `the shop would display €${(expected / 100).toFixed(2)} and charge €${(r.amount / 100).toFixed(2)}`,
      );
    }
  }

  // Nothing partial: repricing half the shop is worse than repricing none of it.
  const expectedIds = [...Object.keys(TEMPLATE_PRICES), ...Object.keys(BUNDLE_SAVINGS)];
  for (const id of expectedIds) {
    if (!rows.some((r) => r.id === id)) problems.push(`${id}: missing from ${file}`);
  }

  if (problems.length) {
    console.error("Refusing to write:\n" + problems.map((p) => "  " + p).join("\n"));
    process.exit(1);
  }

  const eur = (c: number) => `€${(c / 100).toFixed(2)}`;
  console.log(APPLY ? "APPLYING\n" : "DRY RUN — nothing will be written\n");

  let src = fs.readFileSync(templatesPath, "utf-8");

  for (const r of rows) {
    const isBundle = BUNDLE_SAVINGS[r.id] !== undefined;
    const current = isBundle
      ? bundles.find((b) => b.id === r.id)
      : templates.find((t) => t.id === r.id);
    if (!current) {
      console.error(`${r.id} is not in lib/templates.ts`);
      process.exit(1);
    }

    const newRegular = isBundle
      ? (bundles.find((b) => b.id === r.id)?.templateIds ?? []).reduce(
          (n, tid) => n + (TEMPLATE_PRICES[tid] ?? 0),
          0,
        )
      : undefined;

    console.log(
      `${r.id.padEnd(36)} ${eur(current.price)} → ${eur(r.amount)}  ${r.priceId}` +
        (isBundle ? `  (crossed-out → ${eur(newRegular!)})` : ""),
    );

    if (!APPLY) continue;

    const before = src;
    const block = new RegExp(`(id: "${r.id}",[\\s\\S]{0,2000}?)`);
    src = src.replace(block, (m) => {
      let out = m.replace(`price: ${current.price},`, `price: ${r.amount},`);
      out = out.replace(
        `stripePriceId: "${current.stripePriceId}"`,
        `stripePriceId: "${r.priceId}"`,
      );
      if (isBundle) {
        out = out.replace(
          `regularPrice: ${(current as { regularPrice: number }).regularPrice},`,
          `regularPrice: ${newRegular},`,
        );
      }
      return out;
    });
    if (src === before) {
      console.error(`could not rewrite ${r.id} in lib/templates.ts`);
      process.exit(1);
    }
  }

  if (!APPLY) return console.log("\nRe-run with --apply to write lib/templates.ts.");

  fs.writeFileSync(templatesPath, src);
  console.log("\nlib/templates.ts updated. Now run: npm test && npm run build");
}

main().catch((err) => {
  console.error("failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});

/**
 * Push lib/templates.ts into the Supabase `templates` and `bundles` tables.
 *
 * These two sources drifted apart badly enough to break the shop: the table
 * still held a previous catalogue of 60 templates whose ids no id in the
 * shipped file matched, so every product page rendered "Template non trovato"
 * while the catalogue grid — which reads the file — listed the products
 * happily. Their `stripe_price_id` values also pointed at a different Stripe
 * account than the one the site charges through.
 *
 * lib/templates.ts is the source of truth (CLAUDE.md says so). This script
 * makes the table agree with it, and exists so that agreeing is a command
 * rather than an afternoon.
 *
 * Usage:
 *   npx tsx scripts/sync-templates-to-db.ts              # apply
 *   npx tsx scripts/sync-templates-to-db.ts --print-sql  # emit SQL, change nothing
 *
 * Applying needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY. --print-sql needs
 * neither, so the statements can be reviewed, or run through any other client,
 * before anything is written.
 *
 * The delete is a full replacement rather than an upsert: rows that no longer
 * exist in the file are products that are no longer for sale, and leaving them
 * behind is what produced dead product pages in the first place. Nothing
 * references these rows — `purchases.template_id` is plain text with no foreign
 * key — but check that the table is empty, or that its ids are all still in the
 * catalogue, before running this against a shop that has taken orders.
 */

import { createClient } from "@supabase/supabase-js";
import { templates, bundles } from "../lib/templates";

const printOnly = process.argv.includes("--print-sql");

function quote(value: string | undefined | null): string {
  if (value === undefined || value === null) return "null";
  return `'${String(value).replace(/'/g, "''")}'`;
}

function quoteArray(values: readonly string[] | undefined): string {
  return `ARRAY[${(values ?? []).map(quote).join(",")}]::text[]`;
}

function buildSql(): string {
  const lines: string[] = ["begin;", "delete from templates;", "delete from bundles;"];

  for (const t of templates) {
    lines.push(
      "insert into templates " +
        "(id,name,description,category,price,stripe_price_id,tags,downloads,content," +
        "download_type,download_url,video_url,editors_pick,is_new) values (" +
        [
          quote(t.id),
          quote(t.name),
          quote(t.description),
          quote(t.category),
          t.price,
          quote(t.stripePriceId),
          quoteArray(t.tags),
          t.downloads ?? 0,
          quote(t.content),
          quote(t.downloadType),
          quote(t.downloadUrl),
          quote(t.videoUrl),
          Boolean(t.editorsPick),
          Boolean(t.isNew),
        ].join(",") +
        ");",
    );
  }

  for (const b of bundles) {
    lines.push(
      "insert into bundles " +
        "(id,name,tagline,description,price,regular_price,stripe_price_id," +
        "template_ids,tags,highlights,emoji,accent_color) values (" +
        [
          quote(b.id),
          quote(b.name),
          quote(b.tagline),
          quote(b.description),
          b.price,
          b.regularPrice ?? b.price,
          quote(b.stripePriceId),
          quoteArray(b.templateIds),
          quoteArray(b.tags),
          quoteArray(b.highlights),
          quote(""), // column kept, value unused — see Bundle in lib/templates.ts
          quote(b.accentColor),
        ].join(",") +
        ");",
    );
  }

  lines.push("commit;");
  return lines.join("\n");
}

async function apply() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set (or use --print-sql).");
    process.exit(1);
  }
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const templateRows = templates.map((t) => ({
    id: t.id,
    name: t.name,
    description: t.description,
    category: t.category,
    price: t.price,
    stripe_price_id: t.stripePriceId,
    tags: t.tags ?? [],
    downloads: t.downloads ?? 0,
    content: t.content ?? "",
    download_type: t.downloadType ?? null,
    download_url: t.downloadUrl ?? null,
    video_url: t.videoUrl ?? null,
    editors_pick: Boolean(t.editorsPick),
    is_new: Boolean(t.isNew),
  }));

  const bundleRows = bundles.map((b) => ({
    id: b.id,
    name: b.name,
    tagline: b.tagline,
    description: b.description,
    price: b.price,
    regular_price: b.regularPrice ?? b.price,
    stripe_price_id: b.stripePriceId,
    template_ids: b.templateIds ?? [],
    tags: b.tags ?? [],
    highlights: b.highlights ?? [],
    emoji: "", // column kept, value unused — see Bundle in lib/templates.ts
    accent_color: b.accentColor ?? "",
  }));

  const keepTemplateIds = templateRows.map((r) => r.id);
  const keepBundleIds = bundleRows.map((r) => r.id);

  // Upsert first, delete the leftovers after: at no point is the table empty,
  // so a request landing mid-sync sees the old catalogue or the new one, never
  // nothing.
  const up = await supabase.from("templates").upsert(templateRows, { onConflict: "id" });
  if (up.error) throw up.error;
  const upB = await supabase.from("bundles").upsert(bundleRows, { onConflict: "id" });
  if (upB.error) throw upB.error;

  const delT = await supabase
    .from("templates")
    .delete()
    .not("id", "in", `(${keepTemplateIds.join(",")})`);
  if (delT.error) throw delT.error;
  const delB = await supabase
    .from("bundles")
    .delete()
    .not("id", "in", `(${keepBundleIds.join(",")})`);
  if (delB.error) throw delB.error;

  console.log(`Synced ${templateRows.length} templates and ${bundleRows.length} bundles.`);
}

if (printOnly) {
  console.log(buildSql());
} else {
  apply().catch((err) => {
    console.error("Sync failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  });
}

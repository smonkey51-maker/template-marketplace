/**
 * Seed script: migrates all templates and bundles from lib/templates.ts
 * into the Supabase `templates` and `bundles` tables.
 *
 * Run with:
 *   npx tsx scripts/seed-templates.ts
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "node:path";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function seedTemplates() {
  console.log("Loading templates from lib/templates.ts...");
  const { templates, bundles } = await import("../lib/templates");

  console.log(`   Found ${templates.length} templates and ${bundles.length} bundles.`);

  // ── Upsert templates ──────────────────────────────────────────────────────
  const templateRows = templates.map((t) => ({
    id: t.id,
    name: t.name,
    description: t.description,
    category: t.category,
    price: t.price,
    stripe_price_id: t.stripePriceId,
    tags: t.tags,
    downloads: t.downloads,
    content: t.content,
    download_type: t.downloadType ?? null,
    download_url: t.downloadUrl ?? null,
    video_url: t.videoUrl ?? null,
    editors_pick: t.editorsPick ?? false,
    is_new: t.isNew ?? false,
  }));

  console.log("Upserting templates...");
  const { error: templatesError } = await supabase
    .from("templates")
    .upsert(templateRows, { onConflict: "id" });

  if (templatesError) {
    console.error("Templates upsert error:", templatesError);
    process.exit(1);
  }
  console.log(`${templateRows.length} templates upserted.`);

  // ── Upsert bundles ────────────────────────────────────────────────────────
  if (bundles.length > 0) {
    const bundleRows = bundles.map((b) => ({
      id: b.id,
      name: b.name,
      tagline: b.tagline ?? "",
      description: b.description ?? "",
      price: b.price,
      regular_price: b.regularPrice ?? b.price,
      stripe_price_id: b.stripePriceId,
      template_ids: b.templateIds,
      tags: b.tags ?? [],
      highlights: b.highlights ?? [],
      // The Bundle type no longer carries an emoji and nothing renders one,
      // but the column still exists in Supabase. Written empty rather than
      // dropped, so this keeps working against the current schema.
      emoji: "",
      accent_color: b.accentColor ?? "",
    }));

    console.log("Upserting bundles...");
    const { error: bundlesError } = await supabase
      .from("bundles")
      .upsert(bundleRows, { onConflict: "id" });

    if (bundlesError) {
      console.error("Bundles upsert error:", bundlesError);
      process.exit(1);
    }
    console.log(`${bundleRows.length} bundles upserted.`);
  }

  // ── Verification ──────────────────────────────────────────────────────────
  const { count: templateCount } = await supabase
    .from("templates")
    .select("*", { count: "exact", head: true });

  const { count: bundleCount } = await supabase
    .from("bundles")
    .select("*", { count: "exact", head: true });

  console.log(`\nSeed complete!`);
  console.log(`   Templates in DB: ${templateCount}`);
  console.log(`   Bundles in DB:   ${bundleCount}`);
}

seedTemplates().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});

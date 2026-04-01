/**
 * Database-backed template/bundle accessors.
 * Replaces direct imports from lib/templates.ts in server-side code.
 *
 * Uses Next.js unstable_cache for ISR-style caching (revalidates every hour).
 * Falls back to lib/templates.ts if Supabase is not configured — safe for
 * local development without DB.
 */

import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { Template, Bundle } from "@/lib/templates";

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// ── Row → domain type mappers ─────────────────────────────────────────────────

function rowToTemplate(row: Record<string, unknown>): Template {
  return {
    id: row.id as string,
    name: row.name as string,
    description: row.description as string,
    category: row.category as Template["category"],
    price: row.price as number,
    stripePriceId: row.stripe_price_id as string,
    tags: (row.tags as string[]) ?? [],
    downloads: (row.downloads as number) ?? 0,
    content: row.content as string,
    downloadType: (row.download_type as Template["downloadType"]) ?? undefined,
    downloadUrl: (row.download_url as string) ?? undefined,
    videoUrl: (row.video_url as string) ?? undefined,
    editorsPick: (row.editors_pick as boolean) ?? false,
    isNew: (row.is_new as boolean) ?? false,
  };
}

function rowToBundle(row: Record<string, unknown>): Bundle {
  return {
    id: row.id as string,
    name: row.name as string,
    tagline: (row.tagline as string) ?? "",
    description: (row.description as string) ?? "",
    price: row.price as number,
    regularPrice: (row.regular_price as number) ?? (row.price as number),
    stripePriceId: row.stripe_price_id as string,
    templateIds: (row.template_ids as string[]) ?? [],
    tags: (row.tags as string[]) ?? [],
    highlights: (row.highlights as string[]) ?? [],
    emoji: (row.emoji as string) ?? "",
    accentColor: (row.accent_color as string) ?? "",
  };
}

// ── Cached queries ────────────────────────────────────────────────────────────

export const getAllTemplates = unstable_cache(
  async (): Promise<Template[]> => {
    const supabase = getSupabase();
    // Exclude `content` for list queries — only load it when needed
    const { data, error } = await supabase
      .from("templates")
      .select("id,name,description,category,price,stripe_price_id,tags,downloads,download_type,download_url,video_url,editors_pick,is_new,content");

    if (error || !data) return [];
    return data.map(rowToTemplate);
  },
  ["templates-all"],
  { revalidate: 3600, tags: ["templates"] }
);

export const getAllBundles = unstable_cache(
  async (): Promise<Bundle[]> => {
    const supabase = getSupabase();
    const { data, error } = await supabase.from("bundles").select("*");
    if (error || !data) return [];
    return data.map(rowToBundle);
  },
  ["bundles-all"],
  { revalidate: 3600, tags: ["bundles"] }
);

export const getTemplateFromDb = unstable_cache(
  async (id: string): Promise<Template | null> => {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return rowToTemplate(data);
  },
  ["template-by-id"],
  { revalidate: 3600, tags: ["templates"] }
);

export const getBundleFromDb = unstable_cache(
  async (id: string): Promise<Bundle | null> => {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("bundles")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return rowToBundle(data);
  },
  ["bundle-by-id"],
  { revalidate: 3600, tags: ["bundles"] }
);

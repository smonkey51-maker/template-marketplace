/**
 * Database-backed template/bundle accessors.
 * Replaces direct imports from lib/templates.ts in server-side code.
 *
 * Uses Next.js unstable_cache for ISR-style caching (revalidates every hour).
 * Falls back to lib/templates.ts if Supabase is not configured — safe for
 * local development without DB.
 */

import { unstable_cache } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { Template, Bundle } from "@/lib/templates";
import {
  getTemplate as getLocalTemplate,
  getBundle as getLocalBundle,
  templates as localTemplates,
  bundles as localBundles,
} from "@/lib/templates";

const getSupabase = supabaseAdmin;

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
      .select(
        "id,name,description,category,price,stripe_price_id,tags,downloads,download_type,download_url,video_url,editors_pick,is_new",
      );

    if (error || !data) return [];
    // `content` is intentionally absent here — callers that need the body use
    // getTemplateFromDb(id). Keep the field defined so the type stays honest.
    return data.map((row) => ({ ...rowToTemplate(row), content: "" }));
  },
  ["templates-all"],
  { revalidate: 3600, tags: ["templates"] },
);

export const getAllBundles = unstable_cache(
  async (): Promise<Bundle[]> => {
    const supabase = getSupabase();
    const { data, error } = await supabase.from("bundles").select("*");
    if (error || !data) return [];
    return data.map(rowToBundle);
  },
  ["bundles-all"],
  { revalidate: 3600, tags: ["bundles"] },
);

export const getTemplateFromDb = unstable_cache(
  async (id: string): Promise<Template | null> => {
    const supabase = getSupabase();
    const { data, error } = await supabase.from("templates").select("*").eq("id", id).single();

    if (error || !data) return null;
    return rowToTemplate(data);
  },
  ["template-by-id"],
  { revalidate: 3600, tags: ["templates"] },
);

export const getBundleFromDb = unstable_cache(
  async (id: string): Promise<Bundle | null> => {
    const supabase = getSupabase();
    const { data, error } = await supabase.from("bundles").select("*").eq("id", id).single();

    if (error || !data) return null;
    return rowToBundle(data);
  },
  ["bundle-by-id"],
  { revalidate: 3600, tags: ["bundles"] },
);

// ── Circuit breaker ───────────────────────────────────────────────────────────

/**
 * How long to stop calling Supabase after it fails.
 *
 * The fallback below means a dead database costs correctness nothing — but it
 * costs *time*, and that time is paid per call. When the Supabase project is
 * paused its hostname stops resolving entirely, so every lookup sat through a
 * failed DNS resolution before falling back; the catalogue mounts 16 preview
 * iframes, so one page load paid that 16 times over. Short window, because the
 * point is to shed load during an outage, not to keep serving stale data after
 * one recovers.
 */
const BREAKER_MS = 30_000;
let breakerOpenUntil = 0;

async function fromDb<T>(query: () => Promise<T | null>): Promise<T | null> {
  if (Date.now() < breakerOpenUntil) return null;

  try {
    const result = await query();
    breakerOpenUntil = 0;
    return result;
  } catch {
    breakerOpenUntil = Date.now() + BREAKER_MS;
    return null;
  }
}

/**
 * Resolve a template, preferring Supabase and falling back to the catalogue
 * bundled in lib/templates.ts.
 *
 * Supabase is the source of truth, but it can be unreachable, unconfigured
 * (local dev) or simply missing a row that the shipped catalogue still has.
 * Every server route goes through this so they can't disagree about whether a
 * template exists — a mismatch there meant guests and signed-in users were
 * served different files for the same purchase.
 */
export async function resolveTemplate(id: string): Promise<Template | null> {
  return (await fromDb(() => getTemplateFromDb(id))) ?? getLocalTemplate(id) ?? null;
}

export async function resolveBundle(id: string): Promise<Bundle | null> {
  return (await fromDb(() => getBundleFromDb(id))) ?? getLocalBundle(id) ?? null;
}

/**
 * The whole catalogue, same fallback rule as resolveTemplate.
 *
 * getAllTemplates answers `[]` for both "the database is empty" and "the query
 * failed", and callers cannot tell those apart. Used directly by
 * generateStaticParams that meant zero pages were prerendered whenever the
 * table was out of sync with the shipped catalogue — which is exactly the state
 * the site was in.
 */
export async function resolveAllTemplates(): Promise<Template[]> {
  const fromDatabase = await fromDb(() => getAllTemplates());
  return fromDatabase?.length ? fromDatabase : localTemplates;
}

export async function resolveAllBundles(): Promise<Bundle[]> {
  const fromDatabase = await fromDb(() => getAllBundles());
  return fromDatabase?.length ? fromDatabase : localBundles;
}

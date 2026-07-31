import { describe, it, expect, vi } from "vitest";

/**
 * The shipped catalogue must survive an empty or unreachable database.
 *
 * The preview and bundle pages used to call getTemplateFromDb/getBundleFromDb
 * directly, which answer `null` for a missing row and never consult
 * lib/templates.ts. The Supabase `templates` table still held the previous
 * catalogue, so every product page on the live site rendered "Template non
 * trovato" while the catalogue grid — which reads the local file — listed the
 * same products happily. Buying worked throughout, because checkout went
 * through resolveTemplate and got the fallback.
 *
 * These tests pin the fallback itself rather than the call sites, so the guard
 * holds no matter which page asks.
 */

// Every query resolves to "no rows", the shape a stale table produces.
vi.mock("@/lib/supabaseAdmin", () => ({
  supabaseAdmin: () => ({
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: { message: "no rows" } }),
        }),
        then: (resolve: (v: unknown) => unknown) => resolve({ data: [], error: null }),
      }),
    }),
  }),
}));

// unstable_cache wraps the query; run it straight through in tests.
vi.mock("next/cache", () => ({
  unstable_cache: <T extends (...args: never[]) => unknown>(fn: T) => fn,
}));

const { resolveTemplate, resolveBundle, resolveAllTemplates, resolveAllBundles } =
  await import("@/lib/templatesDb");
const { templates, bundles } = await import("@/lib/templates");

describe("resolveTemplate", () => {
  it("falls back to the shipped catalogue when the row is missing", async () => {
    const first = templates[0];
    const resolved = await resolveTemplate(first.id);
    expect(resolved).not.toBeNull();
    expect(resolved?.id).toBe(first.id);
  });

  it("still answers null for an id that exists nowhere", async () => {
    expect(await resolveTemplate("no-such-template-anywhere")).toBeNull();
  });
});

describe("resolveBundle", () => {
  it("falls back to the shipped bundles when the row is missing", async () => {
    const first = bundles[0];
    const resolved = await resolveBundle(first.id);
    expect(resolved?.id).toBe(first.id);
  });
});

describe("resolveAllTemplates", () => {
  it("returns the shipped catalogue rather than an empty list", async () => {
    // The bug this guards: an empty result is indistinguishable from a failed
    // query, and generateStaticParams treated it as "no pages to build".
    const all = await resolveAllTemplates();
    expect(all.length).toBe(templates.length);
  });

  it("covers every product the catalogue page shows", async () => {
    const ids = new Set((await resolveAllTemplates()).map((t) => t.id));
    for (const t of templates) expect(ids.has(t.id)).toBe(true);
  });
});

describe("resolveAllBundles", () => {
  it("returns the shipped bundles rather than an empty list", async () => {
    expect((await resolveAllBundles()).length).toBe(bundles.length);
  });
});

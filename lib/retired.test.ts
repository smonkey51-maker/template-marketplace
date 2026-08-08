import { describe, it, expect } from "vitest";
import {
  templates,
  bundles,
  sellableTemplates,
  sellableTemplatesMeta,
  sellableBundles,
  getTemplate,
} from "@/lib/templates";

/**
 * A withdrawn product must be unreachable from anywhere a visitor could buy it,
 * and still reachable to anyone who already did.
 *
 * Seven B2C lifestyle products were retired because they compete in the half of
 * the market the 2026 report flags as saturated. Retiring is a boolean, not a
 * deletion, and that is the whole risk: the record stays in `templates`, so any
 * listing that reads `templates` directly instead of `sellableTemplates` keeps
 * selling it, silently and with no error anywhere. That mistake is one import
 * away in seven different files, which is why it is pinned here.
 */
describe("retired products", () => {
  const retired = templates.filter((t) => t.retired);

  it("there are retired products to check", () => {
    expect(retired.length).toBeGreaterThan(0);
  });

  it("none of them appear in any sellable list", () => {
    const ids = new Set(retired.map((t) => t.id));
    for (const list of [sellableTemplates, sellableTemplatesMeta]) {
      for (const t of list) {
        expect(ids.has(t.id), `${t.id} is retired but still listed for sale`).toBe(false);
      }
    }
  });

  it("stay resolvable by id, so past buyers can still download", () => {
    for (const t of retired) {
      expect(getTemplate(t.id), `${t.id} vanished — a past buyer's download 404s`).toBeDefined();
    }
  });

  it("no sellable bundle contains a retired product", () => {
    const retiredIds = new Set(retired.map((t) => t.id));
    for (const b of sellableBundles) {
      for (const id of b.templateIds) {
        expect(
          retiredIds.has(id),
          `bundle ${b.id} still sells retired product ${id}`,
        ).toBe(false);
      }
    }
  });

  it("a bundle whose every product is retired is retired too", () => {
    const retiredIds = new Set(retired.map((t) => t.id));
    for (const b of bundles) {
      const allGone = b.templateIds.every((id) => retiredIds.has(id));
      if (allGone) {
        expect(b.retired, `bundle ${b.id} sells nothing but withdrawn products`).toBe(true);
      }
    }
  });

  it("every sellable bundle's products all still exist and are sellable", () => {
    const sellableIds = new Set(sellableTemplates.map((t) => t.id));
    for (const b of sellableBundles) {
      for (const id of b.templateIds) {
        expect(sellableIds.has(id), `bundle ${b.id} references ${id}, not on sale`).toBe(true);
      }
    }
  });
});

/**
 * The catalogue must not claim popularity it cannot measure.
 *
 * `downloads` was a hand-typed literal that nothing ever incremented, rendered
 * on the cards as a sales count, used to award a "bestseller" badge past 700,
 * and joined by a live "N viewing" figure derived from a hash of the product id
 * and the current hour. All of it is gone. This fails if any of it is rendered
 * again.
 */
describe("no fabricated social proof", () => {
  it("nothing renders the downloads field", async () => {
    const { readFileSync } = await import("node:fs");
    const { globSync } = await import("node:fs");
    const files = globSync("{app,components}/**/*.{ts,tsx}");
    const offenders: string[] = [];
    for (const f of files) {
      const src = readFileSync(f, "utf8");
      // Strip comments before searching: the removals are documented in prose
      // that names the field, and a comment sells nothing.
      const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
      if (/\.downloads\b/.test(code)) offenders.push(f);
    }
    expect(offenders, `these render the invented download count: ${offenders.join(", ")}`).toEqual(
      [],
    );
  });
});

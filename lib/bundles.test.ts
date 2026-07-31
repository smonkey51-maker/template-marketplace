import { describe, it, expect } from "vitest";
import { bundles, getTemplate } from "@/lib/templates";

/**
 * The crossed-out price on a bundle must be what the products in it actually
 * cost bought separately.
 *
 * It was written by hand and had drifted on all four: two understated the real
 * total, and two **overstated** it — Money & Career advertised "Risparmia
 * €16.01" against a €46.00 reference when the five products came to €41.00, so
 * the discount shown was five euros larger than the one on offer. A crossed-out
 * price that was never charged is not a rounding slip; under the Omnibus
 * directive the reference price has to be genuine.
 *
 * Pinning it to the sum means a bundle cannot silently start lying the next
 * time a single product is repriced — the test fails instead of the shop.
 */
describe("bundle reference prices", () => {
  it.each(bundles.map((b) => [b.name, b] as const))(
    "%s: the crossed-out price equals the sum of its products",
    (_name, bundle) => {
      const sum = bundle.templateIds.reduce((total, id) => {
        const t = getTemplate(id);
        expect(t, `bundle references a template that does not exist: ${id}`).toBeDefined();
        return total + (t?.price ?? 0);
      }, 0);
      expect(bundle.regularPrice).toBe(sum);
    },
  );

  it.each(bundles.map((b) => [b.name, b] as const))(
    "%s: costs less than its parts, and saves a whole number of euros",
    (_name, bundle) => {
      const saving = bundle.regularPrice - bundle.price;
      expect(saving).toBeGreaterThan(0);
      // Whole euros: "Risparmia €15,01" reads as a bug to a buyer, and the odd
      // cent only ever came from mixing round totals with .99 prices.
      expect(saving % 100).toBe(0);
    },
  );

  it("every bundle carries a real Stripe price id", () => {
    for (const bundle of bundles) {
      expect(bundle.stripePriceId).toMatch(/^price_/);
      expect(bundle.stripePriceId).not.toMatch(/^price_TODO/);
    }
  });
});

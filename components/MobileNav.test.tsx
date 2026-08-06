import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import MobileNav from "./MobileNav";

/**
 * The floating pill must stay off any page that puts its own bar at the bottom
 * of the viewport.
 *
 * It is `bottom-6 z-[90]` and centred; a page-level bottom bar is `bottom-0
 * z-50` and full width — so the pill lands *on top of* the page's control
 * rather than beside it. On /bundle that control is the "Acquista bundle"
 * button, which the pill covered on every phone.
 *
 * Two ways this regresses, and both are caught here: a new bottom-bar page gets
 * added and nobody adds it to the list, or the locale prefix stops being
 * stripped so `startsWith` silently matches nothing (which is the state the
 * whole list was in until #153 — `hidden` was permanently false).
 */

// jsdom has no matchMedia, and the component reads it on mount to decide
// whether to animate. Nothing here is about motion, so a fixed "no preference"
// answer is enough.
window.matchMedia = ((query: string) => ({
  matches: false,
  media: query,
  addEventListener: () => {},
  removeEventListener: () => {},
})) as unknown as typeof window.matchMedia;

const pathname = vi.hoisted(() => ({ value: "/it" }));

vi.mock("next/navigation", () => ({
  usePathname: () => pathname.value,
}));

vi.mock("@/components/LanguageProvider", () => ({
  useLang: () => ({ lang: "it" }),
}));

function renderAt(path: string) {
  pathname.value = path;
  return render(<MobileNav />);
}

describe("MobileNav visibility", () => {
  it.each([
    ["/it/bundle/bundle-ai-creator", "the bundle page's own CTA bar"],
    ["/it/preview/dm-sales-script-pack", "the preview page's buy bar"],
    ["/it/studio", "the Studio tool's own chrome"],
    ["/it/sign-in", "Clerk's card"],
    ["/it/sign-up", "Clerk's card"],
    // Locale is not special: /en must behave exactly like /it.
    ["/en/bundle/bundle-ai-creator", "the bundle page's own CTA bar"],
  ])("stays hidden on %s, which has %s", (path) => {
    const { container } = renderAt(path);
    expect(container.querySelector("nav")).toBeNull();
  });

  it.each([
    "/it",
    "/it/catalogo",
    "/it/templates/dm-sales-script-pack",
    "/it/ai-studio",
    "/it/account",
    "/en/catalogo",
  ])("still renders on %s", (path) => {
    const { container } = renderAt(path);
    expect(container.querySelector("nav")).not.toBeNull();
  });

  it("prefixes every tab with the active locale", () => {
    const { container } = renderAt("/it/catalogo");
    const hrefs = [...container.querySelectorAll("a")].map((a) => a.getAttribute("href"));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href, `unprefixed link would 404 or bounce: ${href}`).toMatch(/^\/it(\/|$)/);
    }
  });
});

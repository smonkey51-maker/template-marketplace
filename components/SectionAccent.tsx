"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site sections as gallery "rooms" — see app/globals.css for the
 * [data-section] token overrides this attribute drives. Order matters:
 * the first matching prefix wins, so a longer, more specific path (e.g.
 * /account nested under /studio-access) should be listed before a shorter
 * one it could otherwise be swallowed by.
 */
const SECTION_ROUTES: { prefix: string; section: string }[] = [
  { prefix: "/catalogo", section: "catalogo" },
  { prefix: "/bundle", section: "catalogo" },
  { prefix: "/templates", section: "catalogo" },
  { prefix: "/preview", section: "catalogo" },
  { prefix: "/wishlist", section: "catalogo" },
  { prefix: "/guida", section: "guida" },
  { prefix: "/guide", section: "guida" },
  { prefix: "/studio", section: "studio" },
  { prefix: "/ai-studio", section: "studio" },
  { prefix: "/account", section: "account" },
  { prefix: "/success", section: "account" },
];

/** Sets [data-section] on <html> from the route, so globals.css can give
 * each section its own accent while the rest of the design system stays
 * fixed. Renders nothing — it only ever touches the root attribute. */
export default function SectionAccent() {
  const pathname = usePathname();

  useEffect(() => {
    const withoutLang = pathname.replace(/^\/(it|en)(?=\/|$)/, "");
    const match = SECTION_ROUTES.find((r) => withoutLang.startsWith(r.prefix));
    if (match) {
      document.documentElement.setAttribute("data-section", match.section);
    } else {
      document.documentElement.removeAttribute("data-section");
    }
  }, [pathname]);

  return null;
}

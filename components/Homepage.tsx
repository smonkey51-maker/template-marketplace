"use client";

import SectionNav from "@/components/sections/SectionNav";
import Hero from "@/components/Hero";
import TemplateMasonry from "@/components/sections/TemplateMasonry";
import { FormaFooter } from "@/components/FormaFooter";

/**
 * The homepage: an editorial hero, then a masonry wall of every template,
 * then the footer.
 *
 * This replaced the bento hub (four destination cells over painting
 * backgrounds), which itself had replaced five stacked full-viewport
 * sections — see git history for that migration's reasoning. This one
 * follows the FORMA rebrand's Figma prototype: a static editorial
 * hero next to/above a masonry gallery wall, rather than a grid of
 * destination tiles. The four destinations the bento hub surfaced
 * (Catalogo/Guida/Studio/Account) live in SectionNav and SiteNav instead,
 * same as every other page.
 *
 * Scrolling stays whatever the browser does by default — nothing here
 * touches scroll position.
 */
export default function Homepage() {
  return (
    // <main> rather than <div>: every page needs one main landmark so screen
    // readers can skip past the nav straight to the content.
    <main className="relative flex flex-col" style={{ overflowX: "hidden" }}>
      <SectionNav />
      <Hero />
      <TemplateMasonry />
      <FormaFooter />
    </main>
  );
}

"use client";

import BentoHub from "@/components/sections/BentoHub";
import SectionNav from "@/components/sections/SectionNav";
import GallerySpotlight from "@/components/sections/GallerySpotlight";
import CatalogPreview from "@/components/sections/CatalogPreview";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import StudioCTA from "@/components/sections/StudioCTA";
import { FormaFooter } from "@/components/FormaFooter";

/**
 * The homepage: a bento hub, then the footer.
 *
 * This replaced five stacked full-viewport sections. Each held one
 * destination, so reaching the Studio meant scrolling past four screens of
 * parallax — one grid's worth of information spread over five viewports. The
 * hub puts every destination on one screen, sized by importance.
 *
 * Scrolling stays whatever the browser does by default. An earlier version
 * stacked the sections inside a `sticky` viewport and drove their opacity and
 * scale from scroll progress across a 500vh spacer, so the page moved five
 * times further than it looked and nothing was ever where the scrollbar said
 * it was. Nothing here touches scroll position.
 *
 * The five section components are gone rather than left unused: the homepage
 * was their only caller, and each shipped its own copy of the page's content
 * to the client for a screen most visitors scrolled straight past.
 *
 * Below the hub — which carries the hero and quick links to every other
 * destination — three flat M3 sections give the homepage the mobile-first
 * structure product asked for (hero → catalog → features → studio CTA →
 * footer): a real slice of the catalog grid, a "why FORMA" features grid,
 * and an AI Studio CTA banner. All three are plain document flow, same as
 * the hub — no parallax, no scroll hijacking, nothing added here that the
 * hub above doesn't already do.
 */
export default function Homepage() {
  return (
    // <main> rather than <div>: every page needs one main landmark so screen
    // readers can skip past the nav straight to the content.
    <main className="relative flex flex-col" style={{ overflowX: "hidden" }}>
      <GallerySpotlight />
      <SectionNav />
      <BentoHub />
      <CatalogPreview />
      <FeaturesGrid />
      <StudioCTA />
      <FormaFooter />
    </main>
  );
}

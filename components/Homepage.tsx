"use client";

import BentoHub from "@/components/sections/BentoHub";
import SectionNav from "@/components/sections/SectionNav";
import GallerySpotlight from "@/components/sections/GallerySpotlight";
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
 */
export default function Homepage() {
  return (
    // <main> rather than <div>: every page needs one main landmark so screen
    // readers can skip past the nav straight to the content.
    <main className="relative flex flex-col" style={{ overflowX: "hidden" }}>
      <GallerySpotlight />
      <SectionNav />
      <BentoHub />
      <FormaFooter />
    </main>
  );
}

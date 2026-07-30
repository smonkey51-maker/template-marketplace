"use client";

import HeroSection from "@/components/sections/HeroSection";
import CatalogoSection from "@/components/sections/CatalogoSection";
import GuidaSection from "@/components/sections/GuidaSection";
import StudioSection from "@/components/sections/StudioSection";
import AccountSection from "@/components/sections/AccountSection";
import SectionNav from "@/components/sections/SectionNav";
import GallerySpotlight from "@/components/sections/GallerySpotlight";

/**
 * The five homepage sections, one after another, in normal document flow.
 *
 * Scrolling is whatever the browser does by default: one pixel of page per
 * pixel of scroll, no hijacking. The previous version stacked all five
 * sections on top of each other inside a `sticky` viewport and drove their
 * opacity and scale from scroll progress across a 500vh spacer — so the page
 * moved five times further than it looked, nothing was ever where the
 * scrollbar said it was, and Ctrl-F / anchor links / the keyboard PageDown
 * all landed in the wrong place. It also kept every section mounted and
 * animating at once.
 *
 * Entrance animations still exist — they are CSS, triggered once per section
 * by the IntersectionObserver in ArtSection, and they do not touch scroll
 * position.
 */
export default function Homepage() {
  return (
    // <main> rather than <div>: every page needs one main landmark so screen
    // readers can skip past the nav straight to the content.
    <main className="relative flex flex-col" style={{ overflowX: "hidden" }}>
      <GallerySpotlight />
      <SectionNav />

      <HeroSection />
      <CatalogoSection />
      <GuidaSection />
      <StudioSection />
      <AccountSection />
    </main>
  );
}

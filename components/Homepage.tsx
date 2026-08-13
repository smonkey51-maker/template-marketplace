"use client";

import HomeSplash from "@/components/HomeSplash";

/**
 * The homepage: a minimal splash — giant wordmark, one-line claim, three
 * index-numbered entries (Catalogo/Studio/Guida). See HomeSplash.tsx for the
 * implementation and its own history note.
 *
 * This replaced the editorial Hero + template masonry + how-it-works +
 * footer stack, which itself had replaced a four-cell bento hub, which had
 * replaced five stacked full-viewport sections — see git history on this
 * file for that lineage. Product browsing, the sales pitch and the footer
 * now live one click away on /catalogo, /studio and /guida, each of which
 * carries SiteNav and FormaFooter — this screen intentionally carries
 * neither.
 */
export default function Homepage() {
  return <HomeSplash />;
}

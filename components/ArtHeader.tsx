import type { ReactNode } from "react";

/**
 * A page header in the homepage's language: painting, dark veil, editorial text.
 *
 * The homepage is art-led — every bento cell is a painting under a veil — and
 * the inner pages were plain text on a flat ground, so moving between them read
 * as leaving the site. This is the same three layers BentoHub's CellPainting
 * builds, extracted so the treatment is defined once rather than pasted per
 * page.
 *
 * `painting` is not a free choice. Each destination that has a cell on the
 * homepage already wears an image there, and this header should use that same
 * one: arriving is then a continuation of the click that got you here rather
 * than a new picture. See PAINTINGS below.
 */

/**
 * The painting each destination already carries on the homepage.
 * Keeping them here, named by destination rather than by painter, is what makes
 * a wrong pairing obvious at the call site.
 */
export const PAINTINGS = {
  catalogo: "/paintings/seurat.jpg",
  guida: "/paintings/monet.jpg",
  studio: "/paintings/kandinsky.jpg",
  /**
   * The personal area has no painting on the homepage — its cell is a plain
   * panel — so this one is an assignment, not a continuation. Van Gogh was the
   * only canvas in the set not already spoken for.
   */
  account: "/paintings/vangogh.jpg",
} as const;

export function ArtHeader({
  painting,
  kicker,
  title,
  subtitle,
  /** Vertical framing of the crop, when the default centre cuts badly. */
  position = "center 42%",
  /**
   * Shorter band, for pages you use rather than browse.
   *
   * The account page and the wishlist are tools: you arrive already decided,
   * wanting a file. A full-height header there pushes the download button below
   * the fold, which is a real cost paid for atmosphere on the one page where
   * atmosphere is not the point. Compact keeps the language and gives back the
   * height.
   */
  compact = false,
}: {
  painting: string;
  kicker?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  position?: string;
  compact?: boolean;
}) {
  return (
    <div className={`fn-cat-hero r-glass${compact ? " fn-cat-hero--compact" : ""}`}>
      <div
        aria-hidden
        className="fn-cat-hero__art"
        style={{ backgroundImage: `url('${painting}')`, backgroundPosition: position }}
      />
      <div aria-hidden className="fn-cat-hero__veil" />
      <div className="fn-cat-hero__text">
        {kicker ? <div className="fn-kicker">{kicker}</div> : null}
        <h1 className="fn-art-title">{title}</h1>
        {subtitle ? <p className="fn-art-sub">{subtitle}</p> : null}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

/**
 * The bento grid: a tray of variable-size cells, each one a destination.
 *
 * Two things this deliberately does not do.
 *
 * It does not hijack scrolling. Cells are laid out by CSS grid in normal
 * document flow, so one pixel of scroll is one pixel of page and Ctrl-F,
 * anchor links and PageDown all land where the scrollbar says they will.
 *
 * It does not animate layout properties. Entrance and hover move `transform`
 * and `opacity` only — never `width`, `top` or `margin` — so the compositor
 * handles them and the grid holds frame rate while cells are appearing.
 *
 * Spans are inline styles rather than Tailwind classes on purpose: a class
 * like `col-span-${n}` is invisible to Tailwind's scanner and gets purged from
 * the production build, so the layout would silently collapse to one column
 * in the only environment that matters.
 */

/** How many of the grid's 4 tracks a cell occupies, at each breakpoint. */
export type BentoSpan = 1 | 2 | 3 | 4;

export interface BentoCellProps {
  children: ReactNode;
  /** Column tracks on desktop (≥1024px). Below that the grid reflows. */
  cols?: BentoSpan;
  /** Row tracks — how many base row heights tall the cell is. */
  rows?: 1 | 2;
  /** Column tracks on tablet (640–1023px). Defaults to a sensible narrowing. */
  colsMd?: BentoSpan;
  /** Makes the whole cell a link. */
  href?: string;
  /**
   * Accessible name for the cell as a link. Required with `href` whenever the
   * visible content alone would not tell a screen-reader user where the link
   * goes — a cell whose only text is a price or an image is a dead end read
   * aloud.
   */
  label?: string;
  /** Staggers the entrance. Kept small — a long stagger reads as jank. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export function BentoCell({
  children,
  cols = 1,
  rows = 1,
  colsMd,
  href,
  label,
  delay = 0,
  className = "",
  style,
}: BentoCellProps) {
  // A 4-wide cell stays full width on tablet; anything narrower halves. Capped
  // at 2 because the tablet grid only has 2 tracks — a wider span there would
  // overflow the viewport, and CSS can't clamp it (`span min(…)` is invalid).
  const tabletSpan = Math.min(colsMd ?? (cols === 4 ? 2 : 1), 2);

  const cellStyle = {
    // Custom properties, not `gridColumn` directly: the media queries in
    // globals.css read these, which keeps the breakpoint logic in CSS where it
    // belongs instead of duplicating it in a resize listener.
    "--bento-cols": cols,
    "--bento-cols-md": tabletSpan,
    "--bento-rows": rows,
    "--delay": `${delay}ms`,
    ...style,
  } as CSSProperties;

  // Deliberately not `.anim-up`: that class sits at opacity 0 until an
  // ancestor `.forma-section` gets `data-entered` from ArtSection's observer.
  // A bento grid outside a section would stay invisible forever. `.bento-cell`
  // carries its own entrance so a cell can never get stuck unpainted.
  const shared =
    "bento-cell glass-surface r-glass relative overflow-hidden flex flex-col " + className;

  if (href) {
    return (
      <Link href={href} aria-label={label} className={`${shared} group`} style={cellStyle}>
        {children}
      </Link>
    );
  }

  return (
    <div className={shared} style={cellStyle}>
      {children}
    </div>
  );
}

export interface BentoGridProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Labels the grid for assistive tech when it acts as a navigation hub. */
  ariaLabel?: string;
}

export function BentoGrid({ children, className = "", style, ariaLabel }: BentoGridProps) {
  // A <nav> when it is labelled, a plain div otherwise. An aria-label on a
  // generic div with no role is dropped on the floor by screen readers, so
  // labelling one would have looked accessible while doing nothing — and a hub
  // whose cells are the site's primary destinations is a navigation landmark
  // regardless.
  if (ariaLabel) {
    return (
      <nav className={`bento-grid ${className}`} style={style} aria-label={ariaLabel}>
        {children}
      </nav>
    );
  }

  return (
    <div className={`bento-grid ${className}`} style={style}>
      {children}
    </div>
  );
}

/**
 * Eyebrow label for a cell — the small uppercase tag in the reference.
 *
 * `aria-hidden` is wrong here even though it looks decorative: it usually
 * carries the only category word on the cell ("Portfolio", "About us"), and
 * hiding it would strip that from the accessible name.
 */
export function BentoEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-[11px] font-black uppercase tracking-[0.18em] text-accent">
      {children}
    </span>
  );
}

/**
 * A group of smaller boxes nested inside one cell.
 *
 * This is what keeps the grid from reading as noise. Eight same-looking cells
 * of different sizes give the eye no grouping to work with — every tile competes
 * equally for attention. Putting related destinations inside one labelled cell
 * says "these two belong together" structurally, so the top level of the grid
 * stays down to a handful of zones instead of a wall of peers.
 */
export function BentoSubGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">{children}</div>;
}

export interface BentoSubBoxProps {
  children: ReactNode;
  href: string;
  label?: string;
}

/** One box inside a BentoSubGrid. Lighter than a cell — it sits on one. */
export function BentoSubBox({ children, href, label }: BentoSubBoxProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      // A nested surface needs its own rim to be findable against the cell it
      // sits on, but a second backdrop-filter here would stack blurs for no
      // visual gain and cost a compositor layer per box — so fill and rim only.
      className="r-md flex flex-col justify-end p-4 min-h-[104px] border transition-colors duration-200"
      style={{
        background: "var(--glass-s-fill)",
        borderColor: "var(--glass-s-rim)",
      }}
    >
      {children}
    </Link>
  );
}

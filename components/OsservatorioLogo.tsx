"use client";

import { useId } from "react";

/**
 * The OSSERVATORIO wordmark.
 *
 * This component owns the OSSERVATORIO wordmark and icon.\n */ Unlike the earlier 5-letter wordmarks (ACUME, then INSPO), "OSSERVATORIO"
 * is 12 characters — too long for individually hand-placed letter x
 * coordinates. It's rendered as a single `<text>` with `textLength` +
 * `lengthAdjust="spacingAndGlyphs"` so it always fills the same width
 * regardless of font metrics, with per-letter `<tspan>`s carrying the
 * staggered fade-in (natural text flow positions each one, no manual
 * placement needed). The gradient runs Rosso Tè (#8B2635) → a darker
 * maroon shade of the same hue — the site's one accent, tinted for depth —
 * matching the exact-hex "Il Taccuino di Jane" palette (see CLAUDE.md
 * "Design System").
 *
 * Each instance mints its own gradient id with `useId` — SVG ids are
 * document-scoped, and two copies of the logo on one page (header + footer)
 * would otherwise collide.
 */
const WORD = "OSSERVATORIO";
const VIEWBOX_WIDTH = 1400;
const TEXT_LENGTH = VIEWBOX_WIDTH - 40;

export function OsservatorioLogoAnimated({ className }: { className?: string }) {
  const gid = useId();
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_WIDTH} 200`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={WORD}
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B2635" />
          <stop offset="100%" stopColor="#5F1A26" />
        </linearGradient>
      </defs>
      <text
        x="20"
        y="145"
        fill={`url(#${gid})`}
        fontSize="140"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
        textLength={TEXT_LENGTH}
        lengthAdjust="spacingAndGlyphs"
      >
        {WORD.split("").map((letter, i) => (
          <tspan key={i} opacity="0">
            {letter}
            <animate
              attributeName="opacity"
              from="0"
              to="1"
              dur="0.4s"
              begin={`${i * 0.08}s`}
              fill="freeze"
            />
          </tspan>
        ))}
      </text>
    </svg>
  );
}

export function OsservatorioLogoStatic({ className }: { className?: string }) {
  const gid = useId();
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_WIDTH} 200`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={WORD}
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B2635" />
          <stop offset="100%" stopColor="#5F1A26" />
        </linearGradient>
      </defs>
      <text
        x="20"
        y="145"
        fill={`url(#${gid})`}
        fontSize="140"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
        textLength={TEXT_LENGTH}
        lengthAdjust="spacingAndGlyphs"
      >
        {WORD}
      </text>
    </svg>
  );
}

export function OsservatorioLogoIcon({ size = 32, className }: { size?: number; className?: string }) {
  const gid = useId();
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={WORD}
      width={size}
      height={size}
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B2635" />
          <stop offset="100%" stopColor="#5F1A26" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="46" stroke={`url(#${gid})`} strokeWidth="14" fill="none" />
      <circle cx="60" cy="60" r="10" fill={`url(#${gid})`} />
    </svg>
  );
}

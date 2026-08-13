"use client";

import { useId } from "react";

/**
 * The Atelier Nove wordmark — set in Fraunces, the site's display serif.
 * Kept as a small SVG (not a `<span>`) so every caller gets pixel-identical
 * sizing/centering via `viewBox`, the way the header and footer expect.
 *
 * Component names (FormaLogo*) are kept for compat with existing imports
 * across the site — only the mark itself changed in the Atelier Nove rebrand.
 *
 * "use client" because of the hook: every caller is already a client component,
 * but without the directive a future server-component caller would fail
 * somewhere confusing.
 */
export function FormaLogoAnimated({ className }: { className?: string }) {
  const gid = useId();
  return (
    <svg
      viewBox="0 0 560 90"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Atelier Nove"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--terra)" />
        </linearGradient>
      </defs>
      <text
        x="6"
        y="64"
        textLength="530"
        lengthAdjust="spacingAndGlyphs"
        fill={`url(#${gid})`}
        fontSize="62"
        fontWeight="650"
        fontStyle="italic"
        fontFamily="var(--font-fraunces), Georgia, serif"
        opacity="0"
      >
        Atelier Nove
        <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="0.1s" fill="freeze" />
      </text>
    </svg>
  );
}

export function FormaLogoStatic({ className }: { className?: string }) {
  const gid = useId();
  return (
    <svg
      viewBox="0 0 560 90"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Atelier Nove"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--terra)" />
        </linearGradient>
      </defs>
      <text
        x="6"
        y="64"
        textLength="530"
        lengthAdjust="spacingAndGlyphs"
        fill={`url(#${gid})`}
        fontSize="62"
        fontWeight="650"
        fontStyle="italic"
        fontFamily="var(--font-fraunces), Georgia, serif"
      >
        Atelier Nove
      </text>
    </svg>
  );
}

export function FormaLogoIcon({ size = 32, className }: { size?: number; className?: string }) {
  const gid = useId();
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Atelier Nove"
      width={size}
      height={size}
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--terra)" />
        </linearGradient>
      </defs>
      <text
        x="60"
        y="80"
        textAnchor="middle"
        fill={`url(#${gid})`}
        fontSize="70"
        fontWeight="650"
        fontStyle="italic"
        fontFamily="var(--font-fraunces), Georgia, serif"
      >
        A
      </text>
    </svg>
  );
}

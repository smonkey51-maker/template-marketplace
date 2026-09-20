"use client";

import { useId } from "react";

/**
 * The INSPO wordmark.
 *
 * Kept in its own file (and kept the filename `FormaLogo.tsx`, and the
 * exported names `FormaLogoAnimated` / `FormaLogoStatic` / `FormaLogoIcon`)
 * for the same reason CLAUDE.md documents for the rest of the pre-refresh
 * naming: every call site already imports these names, and renaming them
 * would touch a dozen files for no visible benefit. The wordmark's gradient
 * runs red → dark red (the site's one accent, tinted for depth) rather than
 * a flat fill, keeping the letter-drawn animation from the earlier version.
 *
 * Each instance mints its own gradient id with `useId` — SVG ids are
 * document-scoped, and two copies of the logo on one page (header + footer)
 * would otherwise collide.
 */
const LETTERS = ["I", "N", "S", "P", "O"];
const LETTER_X = [60, 230, 400, 570, 740];

export function FormaLogoAnimated({ className }: { className?: string }) {
  const gid = useId();
  return (
    <svg
      viewBox="0 0 900 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="INSPO"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E14A30" />
          <stop offset="100%" stopColor="#B43B26" />
        </linearGradient>
      </defs>
      {LETTERS.map((letter, i) => (
        <text
          key={letter + i}
          x={LETTER_X[i]}
          y="140"
          fill={`url(#${gid})`}
          fontSize="120"
          fontWeight="800"
          fontFamily="system-ui, sans-serif"
          opacity="0"
        >
          {letter}
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="0.5s"
            begin={`${i * 0.2}s`}
            fill="freeze"
          />
        </text>
      ))}
    </svg>
  );
}

export function FormaLogoStatic({ className }: { className?: string }) {
  const gid = useId();
  return (
    <svg
      viewBox="0 0 900 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="INSPO"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E14A30" />
          <stop offset="100%" stopColor="#B43B26" />
        </linearGradient>
      </defs>
      {LETTERS.map((letter, i) => (
        <text
          key={letter + i}
          x={LETTER_X[i]}
          y="140"
          fill={`url(#${gid})`}
          fontSize="120"
          fontWeight="800"
          fontFamily="system-ui, sans-serif"
        >
          {letter}
        </text>
      ))}
    </svg>
  );
}

export function FormaLogoIcon({ size = 32, className }: { size?: number; className?: string }) {
  const gid = useId();
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="INSPO"
      width={size}
      height={size}
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E14A30" />
          <stop offset="100%" stopColor="#B43B26" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="46" stroke={`url(#${gid})`} strokeWidth="14" fill="none" />
      <circle cx="60" cy="60" r="10" fill={`url(#${gid})`} />
    </svg>
  );
}

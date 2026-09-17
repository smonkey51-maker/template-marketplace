"use client";

import { useId } from "react";

/**
 * The ACUME wordmark.
 *
 * Kept in its own file (and kept the filename `FormaLogo.tsx`, and the
 * exported names `FormaLogoAnimated` / `FormaLogoStatic` / `FormaLogoIcon`)
 * for the same reason CLAUDE.md documents for the rest of the pre-refresh
 * naming: every call site already imports these names, and renaming them
 * would touch a dozen files for no visible benefit. The wordmark itself kept
 * its gold gradient and letter-drawn animation deliberately — see CLAUDE.md,
 * "Fonts" / brand exceptions.
 *
 * Each instance mints its own gradient id with `useId` — SVG ids are
 * document-scoped, and two copies of the logo on one page (header + footer)
 * would otherwise collide.
 */
const O_CIRC = 314; // 2π × r=50

export function FormaLogoAnimated({ className }: { className?: string }) {
  const gid = useId();
  return (
    <svg
      viewBox="0 0 900 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ACUME"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>

      {/* A */}
      <path
        d="M40 140 L90 20 L140 140 M55 100 L125 100"
        stroke={`url(#${gid})`}
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* C — draws itself */}
      <circle
        cx="230"
        cy="80"
        r="50"
        stroke={`url(#${gid})`}
        strokeWidth="20"
        fill="none"
        strokeDasharray={O_CIRC}
        strokeDashoffset={O_CIRC * 0.28}
        transform="rotate(35 230 80)"
      >
        <animate
          attributeName="stroke-dashoffset"
          from={O_CIRC}
          to={O_CIRC * 0.28}
          dur="0.9s"
          fill="freeze"
        />
      </circle>

      {/* U */}
      <path
        d="M340 20 L340 100 A45 45 0 0 0 430 100 L430 20"
        stroke={`url(#${gid})`}
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
        opacity="0"
      >
        <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.7s" fill="freeze" />
      </path>

      {/* M */}
      <text
        x="480"
        y="140"
        fill={`url(#${gid})`}
        fontSize="120"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
        opacity="0"
      >
        M
        <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.9s" fill="freeze" />
      </text>

      {/* E */}
      <text
        x="650"
        y="140"
        fill={`url(#${gid})`}
        fontSize="120"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
        opacity="0"
      >
        E
        <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.1s" fill="freeze" />
      </text>
    </svg>
  );
}

export function FormaLogoStatic({ className }: { className?: string }) {
  const gid = useId();
  return (
    <svg
      viewBox="0 0 900 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ACUME"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>
      <path
        d="M40 140 L90 20 L140 140 M55 100 L125 100"
        stroke={`url(#${gid})`}
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="230"
        cy="80"
        r="50"
        stroke={`url(#${gid})`}
        strokeWidth="20"
        fill="none"
        strokeDasharray={O_CIRC}
        strokeDashoffset={O_CIRC * 0.28}
        transform="rotate(35 230 80)"
      />
      <path
        d="M340 20 L340 100 A45 45 0 0 0 430 100 L430 20"
        stroke={`url(#${gid})`}
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
      />
      <text
        x="480"
        y="140"
        fill={`url(#${gid})`}
        fontSize="120"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
      >
        M
      </text>
      <text
        x="650"
        y="140"
        fill={`url(#${gid})`}
        fontSize="120"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
      >
        E
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
      aria-label="ACUME"
      width={size}
      height={size}
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="46" stroke={`url(#${gid})`} strokeWidth="14" fill="none" />
      <circle cx="60" cy="60" r="10" fill={`url(#${gid})`} />
    </svg>
  );
}

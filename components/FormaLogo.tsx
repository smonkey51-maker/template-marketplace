/**
 * FormaLogo — reusable FORMA wordmark components.
 *
 * FormaLogoAnimated  — animated SVG for hero use (O draws itself, letters fade in)
 * FormaLogoStatic    — static SVG for nav / repeated views (no animation overhead)
 * FormaLogoIcon      — icon-only circle O, for favicons / compact contexts
 *
 * Gradient IDs are unique per component to avoid collisions when multiple
 * instances render on the same page.
 */

/** Animated FORMA wordmark — O draws itself, letters fade in sequentially. */
export function FormaLogoAnimated({ width = 400, className }: { width?: number; className?: string }) {
  const h = Math.round((width / 720) * 200);
  return (
    <svg
      viewBox="0 0 720 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="FORMA"
      width={width}
      height={h}
      className={className}
    >
      <defs>
        <linearGradient id="formaGoldAnim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>

      {/* Subtle baseline */}
      <line
        x1="10" y1="160" x2="700" y2="160"
        stroke="url(#formaGoldAnim)"
        strokeOpacity="0.15"
        strokeWidth="1"
      />

      {/* F — fades in first */}
      <text
        x="10" y="148"
        fill="url(#formaGoldAnim)"
        fontSize="128"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
        letterSpacing="-4"
        opacity="0"
      >
        F
        <animate attributeName="opacity" from="0" to="1" dur="0.4s" fill="freeze" />
      </text>

      {/* O — draws itself as a circle stroke */}
      <circle
        cx="195" cy="100" r="52"
        stroke="url(#formaGoldAnim)"
        strokeWidth="22"
        fill="none"
        strokeDasharray="327"
        strokeDashoffset="327"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="327" to="0"
          dur="1.2s"
          fill="freeze"
        />
      </circle>

      {/* R — fades in after O starts drawing */}
      <text
        x="278" y="148"
        fill="url(#formaGoldAnim)"
        fontSize="128"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
        letterSpacing="-4"
        opacity="0"
      >
        R
        <animate attributeName="opacity" from="0" to="1" begin="0.9s" dur="0.4s" fill="freeze" />
      </text>

      {/* M — follows R */}
      <text
        x="386" y="148"
        fill="url(#formaGoldAnim)"
        fontSize="128"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
        letterSpacing="-4"
        opacity="0"
      >
        M
        <animate attributeName="opacity" from="0" to="1" begin="1.1s" dur="0.4s" fill="freeze" />
      </text>

      {/* A — triangle, fades in last */}
      <path d="M548 148 L598 40 L648 148 Z" fill="url(#formaGoldAnim)" opacity="0">
        <animate attributeName="opacity" from="0" to="1" begin="1.3s" dur="0.4s" fill="freeze" />
      </path>
    </svg>
  );
}

/** Static FORMA wordmark — no animation, for nav and repeated contexts. */
export function FormaLogoStatic({ width = 90, className }: { width?: number; className?: string }) {
  const h = Math.round((width / 720) * 200);
  return (
    <svg
      viewBox="0 0 720 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Forma"
      width={width}
      height={h}
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="formaGoldStatic" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>
      {/* F */}
      <text x="10" y="148" fill="url(#formaGoldStatic)" fontSize="128" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="-4">F</text>
      {/* O */}
      <circle cx="195" cy="100" r="52" stroke="url(#formaGoldStatic)" strokeWidth="22" fill="none" />
      {/* R */}
      <text x="278" y="148" fill="url(#formaGoldStatic)" fontSize="128" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="-4">R</text>
      {/* M */}
      <text x="386" y="148" fill="url(#formaGoldStatic)" fontSize="128" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="-4">M</text>
      {/* A — triangle */}
      <path d="M548 148 L598 40 L648 148 Z" fill="url(#formaGoldStatic)" />
    </svg>
  );
}

/** Icon-only — circle O, for compact / favicon contexts. */
export function FormaLogoIcon({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Forma"
      width={size}
      height={size}
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="formaGoldIcon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="60" stroke="url(#formaGoldIcon)" strokeWidth="20" fill="none" />
    </svg>
  );
}

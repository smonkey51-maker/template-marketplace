/* Circumference of r=48 circle ≈ 301.6 — used for stroke-dasharray animation */
const O_CIRC = 302;

export function FormaLogoAnimated({ width = 400, className }: { width?: number; className?: string }) {
  const h = Math.round((width / 800) * 200);
  return (
    <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" aria-label="FORMA"
      width={width} height={h} className={className}>
      <defs>
        <linearGradient id="formaGoldAnim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#b8962e" />
        </linearGradient>
      </defs>
      {/* F */}
      <text x="35" y="140" fill="url(#formaGoldAnim)" fontSize="118" fontWeight="900"
        fontFamily="system-ui, sans-serif" letterSpacing="8" opacity="0">
        F
        <animate attributeName="opacity" from="0" to="1" dur="0.4s" fill="freeze" />
      </text>
      {/* O — draws itself */}
      <circle cx="220" cy="98" r="48" stroke="url(#formaGoldAnim)" strokeWidth="20" fill="none"
        strokeDasharray={O_CIRC} strokeDashoffset={O_CIRC}>
        <animate attributeName="stroke-dashoffset" from={O_CIRC} to="0" dur="1.2s" fill="freeze" />
      </circle>
      {/* R M */}
      <text x="300" y="140" fill="url(#formaGoldAnim)" fontSize="118" fontWeight="900"
        fontFamily="system-ui, sans-serif" letterSpacing="8" opacity="0">
        RM
        <animate attributeName="opacity" from="0" to="1" begin="0.9s" dur="0.4s" fill="freeze" />
      </text>
      {/* A — triangle */}
      <path d="M610 140 L660 42 L710 140 Z" fill="url(#formaGoldAnim)" opacity="0">
        <animate attributeName="opacity" from="0" to="1" begin="1.2s" dur="0.4s" fill="freeze" />
      </path>
    </svg>
  );
}

export function FormaLogoStatic({ width = 120, className }: { width?: number; className?: string }) {
  const h = Math.round((width / 800) * 200);
  return (
    <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" aria-label="Forma"
      width={width} height={h} className={className} style={{ display: "block" }}>
      <defs>
        <linearGradient id="formaGoldStatic" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#b8962e" />
        </linearGradient>
      </defs>
      <text x="35" y="140" fill="url(#formaGoldStatic)" fontSize="118" fontWeight="900"
        fontFamily="system-ui, sans-serif" letterSpacing="8">F</text>
      <circle cx="220" cy="98" r="48" stroke="url(#formaGoldStatic)" strokeWidth="20" fill="none" />
      <text x="300" y="140" fill="url(#formaGoldStatic)" fontSize="118" fontWeight="900"
        fontFamily="system-ui, sans-serif" letterSpacing="8">RM</text>
      <path d="M610 140 L660 42 L710 140 Z" fill="url(#formaGoldStatic)" />
    </svg>
  );
}

export function FormaLogoIcon({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="Forma"
      width={size} height={size} className={className} style={{ display: "block" }}>
      <defs>
        <linearGradient id="formaGoldIcon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#b8962e" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="60" stroke="url(#formaGoldIcon)" strokeWidth="20" fill="none" />
    </svg>
  );
}

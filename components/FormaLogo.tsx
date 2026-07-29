const O_CIRC = 314; // 2π × r=50

export function FormaLogoAnimated({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="FORMA"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="formaGoldAnim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>

      {/* F */}
      <text
        x="40"
        y="140"
        fill="url(#formaGoldAnim)"
        fontSize="120"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
      >
        F
      </text>

      {/* O — draws itself */}
      <circle
        cx="210"
        cy="100"
        r="50"
        stroke="url(#formaGoldAnim)"
        strokeWidth="20"
        fill="none"
        strokeDasharray={O_CIRC}
        strokeDashoffset={O_CIRC}
      >
        <animate attributeName="stroke-dashoffset" from={O_CIRC} to="0" dur="1s" fill="freeze" />
      </circle>

      {/* R */}
      <text
        x="300"
        y="140"
        fill="url(#formaGoldAnim)"
        fontSize="120"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
        opacity="0"
      >
        R
        <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="0.8s" fill="freeze" />
      </text>

      {/* M */}
      <text
        x="420"
        y="140"
        fill="url(#formaGoldAnim)"
        fontSize="120"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
        opacity="0"
      >
        M
        <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="1s" fill="freeze" />
      </text>

      {/* A — triangle */}
      <path d="M580 140 L630 40 L680 140 Z" fill="url(#formaGoldAnim)" opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="1.2s" fill="freeze" />
      </path>
    </svg>
  );
}

export function FormaLogoStatic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="FORMA"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="formaGoldStatic" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>
      <text
        x="40"
        y="140"
        fill="url(#formaGoldStatic)"
        fontSize="120"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
      >
        F
      </text>
      <circle
        cx="210"
        cy="100"
        r="50"
        stroke="url(#formaGoldStatic)"
        strokeWidth="20"
        fill="none"
      />
      <text
        x="300"
        y="140"
        fill="url(#formaGoldStatic)"
        fontSize="120"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
      >
        R
      </text>
      <text
        x="420"
        y="140"
        fill="url(#formaGoldStatic)"
        fontSize="120"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
      >
        M
      </text>
      <path d="M580 140 L630 40 L680 140 Z" fill="url(#formaGoldStatic)" />
    </svg>
  );
}

export function FormaLogoIcon({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="FORMA"
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
      <circle cx="60" cy="60" r="46" stroke="url(#formaGoldIcon)" strokeWidth="14" fill="none" />
    </svg>
  );
}

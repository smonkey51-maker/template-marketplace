export function FormaLogoAnimated({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="formaGoldAnim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>

      <g
        fill="url(#formaGoldAnim)"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="120"
        fontWeight="900"
      >
        <text x="40" y="140" opacity="0">
          F
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="0.4s"
            begin="0s"
            fill="freeze"
          />
        </text>

        <circle
          cx="210"
          cy="100"
          r="50"
          stroke="url(#formaGoldAnim)"
          strokeWidth="20"
          fill="none"
          strokeDasharray="314"
          strokeDashoffset="314"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="314"
            to="0"
            dur="1.2s"
            begin="0.3s"
            fill="freeze"
          />
        </circle>

        <text x="300" y="140" opacity="0">
          R
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="0.4s"
            begin="0.6s"
            fill="freeze"
          />
        </text>

        <text x="460" y="140" opacity="0">
          M
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="0.4s"
            begin="0.9s"
            fill="freeze"
          />
        </text>

        <path
          d="M 660 140 L 710 40 L 760 140"
          stroke="url(#formaGoldAnim)"
          strokeWidth="20"
          fill="none"
          strokeDasharray="240"
          strokeDashoffset="240"
          strokeLinecap="square"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="240"
            to="0"
            dur="0.8s"
            begin="1.2s"
            fill="freeze"
          />
        </path>
      </g>
    </svg>
  );
}

export function FormaLogoStatic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="formaGoldStatic" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>

      <g
        fill="url(#formaGoldStatic)"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="120"
        fontWeight="900"
      >
        <text x="40" y="140">
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
        <text x="300" y="140">
          R
        </text>
        <text x="460" y="140">
          M
        </text>
        <path
          d="M 660 140 L 710 40 L 760 140"
          stroke="url(#formaGoldStatic)"
          strokeWidth="20"
          fill="none"
          strokeLinecap="square"
        />
      </g>
    </svg>
  );
}

export function FormaLogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="formaGoldIcon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>
      <circle
        cx="60"
        cy="60"
        r="50"
        stroke="url(#formaGoldIcon)"
        strokeWidth="20"
        fill="none"
      />
    </svg>
  );
}

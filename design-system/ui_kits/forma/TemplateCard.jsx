// ── Forma UI Kit — Template Card component ──────────────────────────

const TEMPLATES = [
  {
    id: "t1",
    name: "SaaS Dashboard",
    desc: "Full-featured admin panel with dark mode",
    price: 1999,
    type: "html",
    isNew: true,
    tag: "UI",
  },
  {
    id: "t2",
    name: "Pitch Deck Pro",
    desc: "20 slide investor-ready presentation",
    price: 1499,
    type: "canva",
    editorsPick: true,
    tag: "Canva",
  },
  {
    id: "t3",
    name: "Budget Planner",
    desc: "12-month expense & income tracker",
    price: 0,
    type: "sheets",
    tag: "Sheets",
  },
  {
    id: "t4",
    name: "Landing Page Kit",
    desc: "Hero, features, pricing, CTA sections",
    price: 2499,
    type: "html",
    isNew: true,
    tag: "UI",
  },
  {
    id: "t5",
    name: "Claude Prompts Pack",
    desc: "50 optimised prompts for productivity",
    price: 999,
    type: "notion",
    tag: "Prompt",
  },
  {
    id: "t6",
    name: "Portfolio Minimal",
    desc: "Clean single-page portfolio template",
    price: 1299,
    type: "html",
    tag: "UI",
  },
  {
    id: "t7",
    name: "E-commerce Store",
    desc: "Product listing & checkout UI kit",
    price: 2999,
    type: "webflow",
    editorsPick: true,
    tag: "Webflow",
  },
  {
    id: "t8",
    name: "Notion HQ",
    desc: "Complete personal productivity workspace",
    price: 1499,
    type: "notion",
    tag: "Notion",
  },
];

const PLATFORM_COLORS = {
  html: { from: "#9C7733", to: "#5c4219", label: "HTML" },
  canva: { from: "#7B61FF", to: "#4B3DB5", label: "Canva" },
  sheets: { from: "#0F9D58", to: "#086d3d", label: "Sheets" },
  notion: { from: "#2f3437", to: "#1a1a1a", label: "Notion" },
  webflow: { from: "#4353FF", to: "#2233cc", label: "Webflow" },
  framer: { from: "#0055FF", to: "#0033aa", label: "Framer" },
};

function formatPrice(cents) {
  if (cents === 0) return "Free";
  return `€${(cents / 100).toFixed(2)}`;
}

function TemplateCardUI({ template, onClick, purchased }) {
  const [hovered, setHovered] = React.useState(false);
  const plat = PLATFORM_COLORS[template.type] || PLATFORM_COLORS.html;

  const cardStyle = {
    position: "relative",
    background: COLORS.cardBg,
    border: `1px solid ${hovered ? "rgba(200,145,90,0.25)" : COLORS.cardBorder}`,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    transition: `transform 0.32s ${EASE.glide}, box-shadow 0.32s ease, border-color 0.22s`,
    transform: hovered ? "translateY(-3px)" : "none",
    boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.2)",
  };

  // Gold top border sweep on hover
  const sweepStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.terra})`,
    transform: hovered ? "scaleX(1)" : "scaleX(0)",
    transformOrigin: "left",
    transition: `transform 0.3s ${EASE.glide}`,
    zIndex: 5,
  };

  return (
    <div
      style={cardStyle}
      onClick={() => onClick(template)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={sweepStyle} />

      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          height: 140,
          overflow: "hidden",
          background: `linear-gradient(145deg, ${plat.from}44, ${plat.to}88)`,
        }}
      >
        {/* Mock content bars */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: 14,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            justifyContent: "flex-end",
          }}
        >
          <div style={{ height: 8, width: "60%", background: "rgba(237,232,220,0.15)" }} />
          <div style={{ height: 5, width: "80%", background: "rgba(237,232,220,0.08)" }} />
          <div style={{ height: 5, width: "55%", background: "rgba(237,232,220,0.06)" }} />
        </div>
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* Platform badge */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "2px 6px",
          }}
        >
          <span
            style={{
              fontFamily: FONTS.heading,
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {plat.label}
          </span>
        </div>

        {/* isNew / editorsPick */}
        {template.editorsPick && (
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: COLORS.accent,
              padding: "2px 6px",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.heading,
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#0d0a06",
              }}
            >
              ✦ Staff Pick
            </span>
          </div>
        )}
        {template.isNew && !template.editorsPick && (
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.18)",
              padding: "2px 6px",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.heading,
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              New
            </span>
          </div>
        )}

        {/* Purchased badge */}
        {purchased && (
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: 8,
              background: COLORS.success,
              padding: "3px 8px",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6l2.8 3 5.2-5"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{ fontFamily: FONTS.body, fontSize: 9, fontWeight: 600, color: "#0d0a06" }}
            >
              Purchased
            </span>
          </div>
        )}

        {/* Hover preview overlay */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.heading,
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "rgba(255,255,255,0.9)",
                background: "rgba(0,0,0,0.5)",
                padding: "6px 12px",
                border: "1px solid rgba(255,255,255,0.25)",
                backdropFilter: "blur(4px)",
              }}
            >
              Preview
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div
        style={{
          padding: "12px 14px 14px",
          borderTop: `1px solid ${COLORS.border}`,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3
          style={{
            fontFamily: FONTS.heading,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: COLORS.text,
            margin: "0 0 4px",
          }}
        >
          {template.name}
        </h3>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 11,
            color: COLORS.muted,
            margin: 0,
            lineHeight: 1.5,
            flex: 1,
          }}
        >
          {template.desc}
        </p>
        <div
          style={{
            marginTop: 10,
            paddingTop: 10,
            borderTop: `1px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{ fontFamily: FONTS.display, fontSize: 20, color: COLORS.accent, lineHeight: 1 }}
          >
            {formatPrice(template.price)}
          </span>
          <svg
            width="13"
            height="13"
            viewBox="0 0 14 14"
            fill="none"
            style={{ color: "rgba(237,232,220,0.25)" }}
          >
            <path
              d="M7 12S1 8 1 4.5A3.5 3.5 0 017 2.1a3.5 3.5 0 016 2.4C13 8 7 12 7 12z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TEMPLATES, formatPrice, TemplateCardUI });

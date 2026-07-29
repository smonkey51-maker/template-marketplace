// ── Forma UI Kit — Nav + Footer components ────────────────────────────
// Load after tokens.js

function FormaNav({ screen, setScreen }) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const el = document.getElementById("kit-scroll");
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 20);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle = {
    position: "sticky",
    top: 0,
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "10px 24px",
    background: COLORS.navBg,
    borderBottom: `1px solid ${scrolled ? "rgba(200,145,90,0.2)" : COLORS.border}`,
    backdropFilter: "blur(24px)",
    transition: "border-color 0.3s",
  };

  const links = [
    { id: "home", label: "Catalog" },
    { id: "preview", label: "Template" },
    { id: "studio", label: "AI Studio" },
    { id: "account", label: "Account" },
  ];

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <div
        style={{ marginRight: 20, cursor: "pointer", flexShrink: 0 }}
        onClick={() => setScreen("home")}
      >
        <div
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 800,
            fontSize: 15,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: COLORS.text,
            lineHeight: 1,
          }}
        >
          For<span style={{ color: COLORS.accent }}>ma</span>
        </div>
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 9,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: COLORS.accent,
            fontWeight: 500,
            marginTop: 2,
          }}
        >
          Artisan digital marketplace
        </div>
      </div>

      {/* Nav links */}
      {links.map((l) => {
        const isActive = screen === l.id || (screen === "home" && l.id === "home");
        return (
          <button
            key={l.id}
            onClick={() => setScreen(l.id)}
            style={{
              fontFamily: FONTS.heading,
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: isActive ? COLORS.text : COLORS.muted,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 12px",
              position: "relative",
              transition: "color 0.2s",
            }}
          >
            {l.label}
            {isActive && (
              <span
                style={{
                  position: "absolute",
                  bottom: 1,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: COLORS.accent,
                  boxShadow: `0 0 8px ${COLORS.accent}`,
                }}
              />
            )}
          </button>
        );
      })}

      <div style={{ flex: 1 }} />

      {/* Search bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "5px 10px",
          border: `1px solid ${COLORS.border}`,
          background: COLORS.inputBg,
          marginRight: 8,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <circle
            cx="11"
            cy="11"
            r="7"
            stroke="currentColor"
            strokeWidth="1.8"
            style={{ color: COLORS.muted }}
          />
          <path
            d="M20 20l-3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{ color: COLORS.muted }}
          />
        </svg>
        <span
          style={{
            fontFamily: FONTS.heading,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.1em",
            color: COLORS.muted,
          }}
        >
          Search
        </span>
        <span
          style={{
            fontFamily: FONTS.heading,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.08em",
            padding: "1px 5px",
            border: `1px solid ${COLORS.border}`,
            background: "rgba(237,232,220,0.04)",
            color: COLORS.muted,
          }}
        >
          ⌘K
        </span>
      </div>

      {/* Claude AI badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          padding: "4px 8px",
          marginRight: 8,
          border: "1px solid rgba(200,145,90,0.3)",
          background: "rgba(200,145,90,0.1)",
        }}
      >
        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
          <path
            d="M5 1l1.1 2.3L9 4l-2 1.8.5 2.5L5 7.2 2.5 8.3 3 5.8 1 4l2.9-.7L5 1z"
            fill={COLORS.accent}
          />
        </svg>
        <span
          style={{
            fontFamily: FONTS.heading,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: COLORS.accent,
          }}
        >
          Claude AI
        </span>
      </div>

      {/* Studio CTA */}
      <button
        onClick={() => setScreen("studio")}
        style={{
          fontFamily: FONTS.heading,
          fontWeight: 700,
          fontSize: 9,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          background: COLORS.accent,
          color: "#0d0a06",
          padding: "7px 14px",
          border: "none",
          cursor: "pointer",
          marginRight: 10,
        }}
      >
        Studio
      </button>

      {/* Avatar */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "rgba(200,145,90,0.25)",
          border: `1px solid rgba(200,145,90,0.4)`,
          cursor: "pointer",
        }}
        onClick={() => setScreen("account")}
      />
    </nav>
  );
}

function FormaFooter() {
  return (
    <footer
      style={{
        background: COLORS.surface,
        borderTop: `1px solid ${COLORS.border}`,
        padding: "48px 24px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Kanji watermark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          fontFamily: FONTS.display,
          fontSize: 320,
          fontWeight: 300,
          color: COLORS.accent,
          opacity: 0.05,
          lineHeight: 0.8,
          letterSpacing: "-0.05em",
          bottom: "-8%",
          right: "-2%",
          transform: "rotate(-6deg)",
          pointerEvents: "none",
        }}
      >
        形
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 32,
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: COLORS.text,
              marginBottom: 8,
            }}
          >
            For<span style={{ color: COLORS.accent }}>ma</span>
          </div>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 12,
              color: COLORS.muted,
              lineHeight: 1.7,
              maxWidth: 200,
            }}
          >
            Premium templates and AI prompts, crafted like small artisanal objects.
          </p>
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 28,
              color: COLORS.accent,
              opacity: 0.85,
              marginTop: 12,
            }}
          >
            形
          </div>
        </div>
        {/* Product */}
        <div>
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: COLORS.accent,
              marginBottom: 12,
            }}
          >
            Product
          </div>
          {["Templates", "Bundles", "AI Studio", "Wishlist", "Guide"].map((l) => (
            <div
              key={l}
              style={{
                fontFamily: FONTS.body,
                fontSize: 12,
                color: COLORS.muted,
                marginBottom: 6,
                cursor: "pointer",
              }}
            >
              {l}
            </div>
          ))}
        </div>
        {/* Legal */}
        <div>
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: COLORS.accent,
              marginBottom: 12,
            }}
          >
            Legal
          </div>
          {["Privacy Policy", "Terms of Use"].map((l) => (
            <div
              key={l}
              style={{
                fontFamily: FONTS.body,
                fontSize: 12,
                color: COLORS.muted,
                marginBottom: 6,
                cursor: "pointer",
              }}
            >
              {l}
            </div>
          ))}
        </div>
        {/* Philosophy */}
        <div>
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: COLORS.accent,
              marginBottom: 12,
            }}
          >
            Philosophy
          </div>
          <p
            style={{
              fontFamily: FONTS.editorial,
              fontStyle: "italic",
              fontSize: 13,
              fontWeight: 300,
              color: COLORS.muted,
              lineHeight: 2,
            }}
          >
            「 Kanso 」 simplicity.
            <br />
            「 Shizen 」 naturalness.
            <br />「 Seijaku 」 tranquility.
          </p>
        </div>
      </div>

      {/* Zen divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          margin: "32px auto 16px",
          maxWidth: 1100,
          opacity: 0.45,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(to right, transparent, ${COLORS.accent})`,
          }}
        />
        <span style={{ fontSize: 10, color: COLORS.accent }}>◇</span>
        <div
          style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(to left, transparent, ${COLORS.accent})`,
          }}
        />
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontFamily: FONTS.body, fontSize: 11, color: COLORS.muted }}>
          © 2025 Forma. All rights reserved.
        </p>
        <span style={{ fontFamily: FONTS.body, fontSize: 10, color: COLORS.muted }}>
          Powered by{" "}
          <span style={{ color: COLORS.accent, fontFamily: FONTS.heading, fontWeight: 600 }}>
            Claude AI
          </span>
        </span>
      </div>
    </footer>
  );
}

Object.assign(window, { FormaNav, FormaFooter });

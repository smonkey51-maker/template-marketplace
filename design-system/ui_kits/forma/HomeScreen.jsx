// ── Forma UI Kit — Home / Catalog screen ─────────────────────────────

const FILTERS = ["All", "UI", "Prompt", "Canva", "Notion", "Sheets", "Webflow"];

function HomeScreen({ setScreen, setSelectedTemplate }) {
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [email, setEmail] = React.useState("");

  const filtered =
    activeFilter === "All"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.tag === activeFilter || t.type === activeFilter.toLowerCase());

  const handleCardClick = (t) => {
    setSelectedTemplate(t);
    setScreen("preview");
  };

  const seigaiha = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='40'><circle cx='40' cy='40' r='40' fill='none' stroke='%23C8915A' stroke-width='0.7' stroke-opacity='0.06'/><circle cx='0' cy='40' r='40' fill='none' stroke='%23C8915A' stroke-width='0.7' stroke-opacity='0.06'/><circle cx='80' cy='40' r='40' fill='none' stroke='%23C8915A' stroke-width='0.7' stroke-opacity='0.06'/><circle cx='40' cy='0' r='40' fill='none' stroke='%23C8915A' stroke-width='0.7' stroke-opacity='0.06'/></svg>")`;

  return (
    <div>
      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "80px 24px 72px",
          textAlign: "center",
          backgroundImage: seigaiha,
          backgroundSize: "80px 40px",
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 300,
            background: "radial-gradient(ellipse, rgba(200,145,90,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Torii accent */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            opacity: 0.45,
            marginBottom: 20,
          }}
        >
          <div style={{ height: 1, width: 48, background: COLORS.accent }} />
          <div style={{ height: 1, width: 32, background: COLORS.accent }} />
        </div>

        {/* Label */}
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: COLORS.accent,
            marginBottom: 16,
          }}
        >
          AI-Powered Template Marketplace
        </div>

        {/* Hero headline */}
        <h1
          style={{
            fontFamily: FONTS.display,
            fontStyle: "italic",
            fontSize: "clamp(36px,6vw,72px)",
            fontWeight: 400,
            letterSpacing: "-0.035em",
            lineHeight: 1.02,
            color: COLORS.text,
            margin: "0 0 20px",
            position: "relative",
          }}
        >
          Premium <em style={{ color: COLORS.accent, fontStyle: "italic" }}>templates</em>
          <br />
          for every platform
        </h1>

        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 16,
            color: COLORS.muted,
            maxWidth: 480,
            margin: "0 auto 36px",
            lineHeight: 1.7,
          }}
        >
          Buy, customise, and download UI and prompt templates. Tailor any design with Claude AI in
          seconds.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => {}}
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 700,
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              background: COLORS.accent,
              color: "#0d0a06",
              padding: "14px 32px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Browse Templates
          </button>
          <button
            onClick={() => setScreen("studio")}
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 700,
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              background: "transparent",
              color: COLORS.text,
              padding: "14px 32px",
              border: `1px solid rgba(237,232,220,0.22)`,
              cursor: "pointer",
            }}
          >
            Try AI Studio →
          </button>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 40,
            marginTop: 48,
            paddingTop: 32,
            borderTop: `1px solid ${COLORS.border}`,
          }}
        >
          {[
            ["120+", "Templates"],
            ["4.9★", "Avg. Rating"],
            ["Claude AI", "Powered"],
          ].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 22,
                  color: COLORS.accent,
                  lineHeight: 1,
                }}
              >
                {v}
              </div>
              <div
                style={{
                  fontFamily: FONTS.heading,
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: COLORS.muted,
                  marginTop: 4,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Filter chips ── */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex",
          gap: 6,
          overflowX: "auto",
          flexWrap: "wrap",
        }}
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              fontFamily: FONTS.heading,
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "5px 14px",
              border: `1px solid ${activeFilter === f ? "rgba(200,145,90,0.5)" : "rgba(237,232,220,0.15)"}`,
              background: activeFilter === f ? "rgba(200,145,90,0.1)" : "transparent",
              color: activeFilter === f ? COLORS.accent : COLORS.muted,
              cursor: "pointer",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {f}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <span
          style={{ fontFamily: FONTS.body, fontSize: 11, color: COLORS.muted, alignSelf: "center" }}
        >
          {filtered.length} templates
        </span>
      </div>

      {/* ── Template grid ── */}
      <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Section label */}
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: COLORS.accent,
            marginBottom: 16,
          }}
        >
          {activeFilter === "All" ? "All Templates" : activeFilter}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {filtered.map((t) => (
            <TemplateCardUI
              key={t.id}
              template={t}
              onClick={handleCardClick}
              purchased={t.id === "t3"}
            />
          ))}
        </div>
      </div>

      {/* ── Bundles band ── */}
      <section
        style={{
          padding: "48px 24px",
          background: COLORS.surface,
          borderTop: `1px solid ${COLORS.border}`,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: COLORS.accent,
              marginBottom: 6,
            }}
          >
            Bundles
          </div>
          <h2
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: "-0.02em",
              color: COLORS.text,
              margin: "0 0 24px",
            }}
          >
            More value, together
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            {[
              {
                name: "Founder Kit",
                desc: "Landing page + Pitch Deck + Prompt Pack",
                price: "€39",
                count: 3,
              },
              {
                name: "Designer Pack",
                desc: "Dashboard + Portfolio + E-commerce Kit",
                price: "€59",
                count: 3,
              },
            ].map((b) => (
              <div
                key={b.name}
                style={{
                  border: `1px solid rgba(200,145,90,0.25)`,
                  padding: "24px",
                  background: COLORS.cardBg,
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.terra})`,
                  }}
                />
                <div
                  style={{
                    fontFamily: FONTS.heading,
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: COLORS.accent,
                    marginBottom: 6,
                  }}
                >
                  {b.count} Templates
                </div>
                <div
                  style={{
                    fontFamily: FONTS.heading,
                    fontWeight: 700,
                    fontSize: 18,
                    letterSpacing: "-0.01em",
                    color: COLORS.text,
                    marginBottom: 6,
                  }}
                >
                  {b.name}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 12,
                    color: COLORS.muted,
                    marginBottom: 16,
                  }}
                >
                  {b.desc}
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                >
                  <span style={{ fontFamily: FONTS.display, fontSize: 24, color: COLORS.accent }}>
                    {b.price}
                  </span>
                  <button
                    style={{
                      fontFamily: FONTS.heading,
                      fontWeight: 700,
                      fontSize: 9,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      background: COLORS.accent,
                      color: "#0d0a06",
                      padding: "8px 16px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Get Bundle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section
        style={{
          padding: "48px 24px",
          textAlign: "center",
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: COLORS.accent,
            marginBottom: 8,
          }}
        >
          Newsletter
        </div>
        <h3
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 700,
            fontSize: 22,
            color: COLORS.text,
            margin: "0 0 8px",
          }}
        >
          New templates every week
        </h3>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.muted, marginBottom: 20 }}>
          Get notified when new templates drop. No spam, unsubscribe anytime.
        </p>
        <div
          style={{
            display: "flex",
            gap: 0,
            justifyContent: "center",
            maxWidth: 400,
            margin: "0 auto",
          }}
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              flex: 1,
              background: COLORS.inputBg,
              border: `1px solid ${COLORS.border}`,
              borderRight: "none",
              color: COLORS.text,
              fontFamily: FONTS.body,
              fontSize: 13,
              padding: "10px 14px",
              outline: "none",
            }}
          />
          <button
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 700,
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              background: COLORS.accent,
              color: "#0d0a06",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { HomeScreen });

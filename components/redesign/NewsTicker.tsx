"use client";
import { useLang } from "@/components/LanguageProvider";
import { templates } from "@/lib/templates";

export default function NewsTicker() {
  const { lang } = useLang();

  // Build ticker items from templates: show name
  const items = templates.slice(0, 12).map((t) => t.name);
  const label = lang === "it" ? "NUOVO" : "NEW";

  // Double the items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        borderBottom: "1px solid var(--forma-border)",
        background: "var(--forma-bg-dark-section)", // deepest dark canvas color
        overflow: "hidden",
        position: "relative",
        height: "28px",
        display: "flex",
        alignItems: "center",
      }}
      aria-hidden // decorative
    >
      {/* Left fade mask */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "40px",
          background: "linear-gradient(to right, var(--forma-bg-dark-section), transparent)",
          zIndex: 2,
        }}
      />
      {/* Right fade mask */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "40px",
          background: "linear-gradient(to left, var(--forma-bg-dark-section), transparent)",
          zIndex: 2,
        }}
      />

      <div
        className="forma-ticker-track"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          whiteSpace: "nowrap",
          animation: "forma-ticker 40s linear infinite",
        }}
      >
        {doubled.map((name, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--forma-text-accent)", // gold on dark
                padding: "0 16px",
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "9px",
                fontWeight: 300,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: "var(--forma-kinari)", // cream on dark
                opacity: 0.7,
                padding: "0 16px 0 0",
              }}
            >
              {name}
            </span>
            <span
              style={{
                color: "var(--forma-text-accent)",
                opacity: 0.3,
                padding: "0 8px",
              }}
            >
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

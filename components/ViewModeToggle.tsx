"use client";

import { useViewMode } from "./ViewModeProvider";
import { useLang } from "./LanguageProvider";

export default function ViewModeToggle() {
  const { viewMode, setViewMode } = useViewMode();
  const { lang } = useLang();

  const isDesktop = viewMode === "desktop";
  const isMobile = viewMode === "mobile";

  const activeStyle = {
    background: "var(--accent)",
    color: "var(--bg)",
  };

  const inactiveStyle = {
    background: "transparent",
    color: "var(--muted)",
  };

  return (
    <div
      className="fixed z-[60] flex items-center"
      style={{
        bottom: "clamp(1.25rem, 3vw, 1.5rem)",
        left: "50%",
        transform: "translateX(-50%)",
        background: "var(--nav-bg)",
        border: "1px solid var(--border)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        boxShadow: "0 4px 32px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.06) inset",
        padding: "3px",
        gap: "2px",
        whiteSpace: "nowrap",
      }}
      role="group"
      aria-label={lang === "it" ? "Modalità di visualizzazione" : "View mode"}
    >
      <button
        onClick={() => setViewMode("desktop")}
        aria-pressed={isDesktop}
        style={{
          ...( isDesktop ? activeStyle : inactiveStyle),
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 14px",
          fontFamily: "monospace",
          fontSize: "10px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 600,
          transition: "background 0.2s ease, color 0.2s ease",
          cursor: "pointer",
          border: "none",
          outline: "none",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
          <rect x="1" y="1.5" width="11" height="8" rx="0" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M4.5 11.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          <path d="M6.5 9.5v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        {lang === "it" ? "Desktop" : "Desktop"}
      </button>

      <button
        onClick={() => setViewMode("mobile")}
        aria-pressed={isMobile}
        style={{
          ...(isMobile ? activeStyle : inactiveStyle),
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 14px",
          fontFamily: "monospace",
          fontSize: "10px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 600,
          transition: "background 0.2s ease, color 0.2s ease",
          cursor: "pointer",
          border: "none",
          outline: "none",
        }}
      >
        <svg width="10" height="13" viewBox="0 0 10 13" fill="none" aria-hidden>
          <rect x="1" y="1" width="8" height="11" rx="0" stroke="currentColor" strokeWidth="1.3"/>
          <circle cx="5" cy="10.5" r="0.7" fill="currentColor"/>
        </svg>
        {lang === "it" ? "Mobile" : "Mobile"}
      </button>
    </div>
  );
}

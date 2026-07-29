"use client";

import { useLang } from "./LanguageProvider";

export default function LanguageToggle() {
  const { lang, toggle } = useLang();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="relative flex items-center p-[2px] rounded-full overflow-hidden transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] border border-theme"
      style={{
        width: "64px",
        height: "26px",
        background: "var(--card-bg)",
      }}
    >
      {/* IT side */}
      <span
        className="flex-1 flex items-center justify-center text-[11px] font-black tracking-widest rounded-full transition-all duration-200 h-full"
        style={
          lang === "it"
            ? { background: "var(--accent)", color: "var(--bg)" }
            : { color: "var(--muted)" }
        }
      >
        IT
      </span>

      {/* EN side */}
      <span
        className="flex-1 flex items-center justify-center text-[11px] font-black tracking-widest rounded-full transition-all duration-200 h-full"
        style={
          lang === "en"
            ? { background: "var(--accent)", color: "var(--bg)" }
            : { color: "var(--muted)" }
        }
      >
        EN
      </span>
    </button>
  );
}

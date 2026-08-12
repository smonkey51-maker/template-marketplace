"use client";

import { useLang } from "./LanguageProvider";

export default function LanguageToggle() {
  const { lang, toggle } = useLang();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="m3-surface-pill relative flex items-center p-[2px] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      style={{ width: "64px", height: "26px" }}
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

"use client";

import { useLang } from "./LanguageProvider";

export default function LanguageToggle() {
  const { lang, toggle } = useLang();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="relative flex items-center rounded-full p-[3px] transition-colors duration-300 focus:outline-none"
      style={{
        width: "64px",
        height: "28px",
        backgroundColor: "rgba(120,120,128,0.18)",
      }}
    >
      {/* IT side */}
      <span
        className="flex-1 flex items-center justify-center rounded-full text-[11px] font-black tracking-widest transition-all duration-200 h-full"
        style={
          lang === "it"
            ? { background: "#0A84FF", color: "#fff" }
            : { color: "var(--color-muted)" }
        }
      >
        IT
      </span>

      {/* EN side */}
      <span
        className="flex-1 flex items-center justify-center rounded-full text-[11px] font-black tracking-widest transition-all duration-200 h-full"
        style={
          lang === "en"
            ? { background: "#0A84FF", color: "#fff" }
            : { color: "var(--color-muted)" }
        }
      >
        EN
      </span>
    </button>
  );
}

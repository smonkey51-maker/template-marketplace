"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative flex items-center w-[52px] h-[28px] rounded-full p-[3px] transition-colors duration-300 focus:outline-none"
      style={{ backgroundColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)" }}
    >
      {/* Track icons */}
      <span className="absolute left-[6px] text-[13px] select-none pointer-events-none">
        {isDark ? "🌙" : ""}
      </span>
      <span className="absolute right-[6px] text-[13px] select-none pointer-events-none">
        {isDark ? "" : "☀️"}
      </span>

      {/* Knob */}
      <span
        className="toggle-knob relative z-10 w-[22px] h-[22px] rounded-full shadow-md flex items-center justify-center text-[11px]"
        style={{
          transform: isDark ? "translateX(24px)" : "translateX(0px)",
          backgroundColor: isDark ? "#1C1C1E" : "#FFFFFF",
          boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
        }}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}

"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex items-center w-[52px] h-[28px] rounded-full p-[3px] transition-colors duration-300 focus:outline-none"
      style={{ backgroundColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)" }}
    >
      {/* Moon icon (left, visible in dark mode) */}
      <span className="absolute left-[6px] pointer-events-none">
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden
          style={{ opacity: isDark ? 0.7 : 0 }}>
          <path d="M12.5 9A6 6 0 015 1.5a.5.5 0 00-.6.6A6 6 0 1013 9.6a.5.5 0 00-.5-.6z"
            fill="currentColor" className="text-white"/>
        </svg>
      </span>
      {/* Sun icon (right, visible in light mode) */}
      <span className="absolute right-[6px] pointer-events-none">
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden
          style={{ opacity: isDark ? 0 : 0.7 }}>
          <circle cx="7" cy="7" r="3" fill="#1C1C1E"/>
          <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.93 2.93l1.06 1.06M10.01 10.01l1.06 1.06M2.93 11.07l1.06-1.06M10.01 3.99l1.06-1.06"
            stroke="#1C1C1E" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      </span>

      {/* Knob */}
      <span
        className="relative z-10 w-[22px] h-[22px] rounded-full flex items-center justify-center transition-transform duration-300"
        style={{
          transform: isDark ? "translateX(24px)" : "translateX(0px)",
          backgroundColor: isDark ? "#1C1C1E" : "#FFFFFF",
          boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
        }}
      >
        {isDark ? (
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M12.5 9A6 6 0 015 1.5a.5.5 0 00-.6.6A6 6 0 1013 9.6a.5.5 0 00-.5-.6z"
              fill="white" opacity="0.9"/>
          </svg>
        ) : (
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
            <circle cx="7" cy="7" r="2.8" fill="#FF9F0A"/>
            <path d="M7 1.5V3M7 11v1.5M1.5 7H3M11 7h1.5M3.4 3.4l1.06 1.06M9.54 9.54l1.06 1.06M3.4 10.6l1.06-1.06M9.54 4.46l1.06-1.06"
              stroke="#FF9F0A" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        )}
      </span>
    </button>
  );
}

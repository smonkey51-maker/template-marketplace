"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="glass-surface-pill relative flex items-center w-[52px] h-[28px] p-[3px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
    >
      {/* Sun icon — left side (active in light mode) */}
      <span
        className="absolute left-[6px] pointer-events-none transition-opacity duration-300"
        style={{ opacity: isDark ? 0.28 : 0 }}
      >
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="2.8" fill="currentColor" style={{ color: "var(--accent)" }} />
          <path
            d="M7 1.5V3M7 11v1.5M1.5 7H3M11 7h1.5M3.4 3.4l1.06 1.06M9.54 9.54l1.06 1.06M3.4 10.6l1.06-1.06M9.54 4.46l1.06-1.06"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            style={{ color: "var(--accent)" }}
          />
        </svg>
      </span>

      {/* Moon icon — right side (active in dark mode) */}
      <span
        className="absolute right-[6px] pointer-events-none transition-opacity duration-300"
        style={{ opacity: isDark ? 0 : 0.32 }}
      >
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M12.5 9A6 6 0 015 1.5a.5.5 0 00-.6.6A6 6 0 1013 9.6a.5.5 0 00-.5-.6z"
            fill="currentColor"
            className="text-muted"
          />
        </svg>
      </span>

      {/* Sliding knob */}
      <span
        className="relative z-10 w-[22px] h-[22px] rounded-full flex items-center justify-center transition-transform duration-300"
        style={{
          transform: isDark ? "translateX(24px)" : "translateX(0px)",
          backgroundColor: "var(--card-bg)",
          boxShadow: isDark
            ? "0 1px 3px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.06)"
            : "0 1px 3px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.04)",
        }}
      >
        {isDark ? (
          /* Moon on knob in dark mode */
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M12.5 9A6 6 0 015 1.5a.5.5 0 00-.6.6A6 6 0 1013 9.6a.5.5 0 00-.5-.6z"
              fill="white"
              opacity="0.85"
            />
          </svg>
        ) : (
          /* Sun on knob in light mode */
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
            <circle cx="7" cy="7" r="2.8" fill="var(--accent)" />
            <path
              d="M7 1.5V3M7 11v1.5M1.5 7H3M11 7h1.5M3.4 3.4l1.06 1.06M9.54 9.54l1.06 1.06M3.4 10.6l1.06-1.06M9.54 4.46l1.06-1.06"
              stroke="var(--accent)"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
}

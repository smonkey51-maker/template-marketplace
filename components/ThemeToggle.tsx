"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

/**
 * Circular icon button — single Sun/Moon glyph that swaps with a quick
 * fade + rotate, matching the Figma Make prototype's ThemeToggle.tsx.
 * Replaced the sliding pill switch this used to be. No framer-motion in
 * this codebase, so the swap is a plain CSS transition keyed by theme
 * rather than an AnimatePresence exit/enter.
 */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Attiva tema chiaro" : "Attiva tema scuro"}
      className="relative flex h-11 w-11 items-center justify-center overflow-hidden border border-theme r-md transition-colors hover:bg-[var(--surface)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
    >
      <span
        key={theme}
        className="flex items-center justify-center"
        style={{
          animation: "theme-toggle-spin 0.25s ease-out",
          color: "var(--text)",
        }}
      >
        {isDark ? (
          <Sun size={17} strokeWidth={1.8} aria-hidden />
        ) : (
          <Moon size={17} strokeWidth={1.8} aria-hidden />
        )}
      </span>
    </button>
  );
}

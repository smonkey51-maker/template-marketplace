"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Attiva tema chiaro" : "Attiva tema scuro"}
      className="glass-ctl flex h-11 w-11 items-center justify-center text-ink"
    >
      {isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
    </button>
  );
}

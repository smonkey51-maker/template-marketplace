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
      className="flex h-9 w-9 items-center justify-center rounded-md border border-line-strong text-ink transition-colors hover:bg-surface"
    >
      {isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
    </button>
  );
}

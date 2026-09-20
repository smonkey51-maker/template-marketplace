import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        // Playfair Display (display) + Inter (body).
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      colors: {
        // Kept as Tailwind utilities for parity with the CSS custom
        // properties of the same name in globals.css — see CLAUDE.md
        // "Design System" for the exact-hex palette these track.
        gold: "#8B2635",
        "gold-soft": "#B23A4A",
      },
    },
  },
  plugins: [],
};

export default config;

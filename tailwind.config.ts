import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        // Fraunces (display) + Inter (body).
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        fraunces: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      colors: {
        // Kept as Tailwind utilities for parity with the CSS custom
        // properties of the same name in globals.css — see CLAUDE.md
        // "Design System" for the 3-colour palette these are shades of.
        gold: "#B43B26",
        "gold-soft": "#E14A30",
      },
    },
  },
  plugins: [],
};

export default config;

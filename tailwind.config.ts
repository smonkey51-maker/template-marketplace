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
        gold: "#D4AF37",
        "gold-soft": "#B8962E",
      },
    },
  },
  plugins: [],
};

export default config;

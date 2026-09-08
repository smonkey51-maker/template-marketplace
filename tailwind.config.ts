import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        // FORMA: Fraunces (display) + Inter (body).
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        fraunces: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      colors: {
        sumi: "#1A1815",
        tsuchi: "#8B6F47",
        kinari: "#F5F0E8",
        sabi: "#A0522D",
        "sumi-dim": "#4A4642",
        gold: "#D4AF37",
        "gold-soft": "#B8962E",
        "forma-bg": "#060606",
        "forma-surface": "#0f0f0f",
        "forma-text": "#eaeaea",
        "forma-muted": "#8a8a8a",
      },
    },
  },
  plugins: [],
};

export default config;

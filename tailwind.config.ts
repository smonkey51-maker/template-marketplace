import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "gatsunaga": ["var(--font-gatsunaga)"],
        "dm-serif":  ["var(--font-dm-serif)", "Georgia", "serif"],
        "cormorant": ["var(--font-cormorant)", "Georgia", "serif"],
        "jakarta":   ["var(--font-jakarta)", "system-ui", "sans-serif"],
        "inter":     ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        sumi:      "#1A1815",
        tsuchi:    "#8B6F47",
        kinari:    "#F5F0E8",
        sabi:      "#A0522D",
        "sumi-dim": "#4A4642",
      },
    },
  },
  plugins: [],
};

export default config;

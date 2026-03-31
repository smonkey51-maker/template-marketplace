import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "ios-blue":       "#0A84FF",
        "ios-blue-light": "#409CFF",
        "ios-green":      "#30D158",
        "ios-red":        "#FF453A",
        "ios-blue-alt":   "#007AFF",
      },
      fontFamily: {
        "gatsunaga": ["var(--font-gatsunaga)"],
        "dm-serif":  ["var(--font-dm-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;

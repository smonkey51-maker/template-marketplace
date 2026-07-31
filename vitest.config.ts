import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    typecheck: { tsconfig: "./tsconfig.test.json" },
    exclude: ["**/node_modules/**", "**/e2e/**", "**/*.spec.ts"],
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
});

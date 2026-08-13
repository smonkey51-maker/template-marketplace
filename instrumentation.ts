/**
 * Next.js Instrumentation Hook
 * Viene eseguito una volta all'avvio del server (dev e prod).
 * In modalità dev, imposta anche un watcher su lib/templates.ts:
 * ogni volta che aggiungi o modifichi un template, exports/ si aggiorna
 * automaticamente senza dover fare nulla.
 */
export async function register() {
  // Sentry: initialise for the current runtime
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  } else if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }

  if (process.env.NEXT_RUNTIME === "nodejs") {
    if (process.env.NODE_ENV === "development") {
      try {
        // Usa require per bypassare l'analisi statica webpack per l'Edge
        const { runExport } = require("./scripts/export-for-marketplace");
        const fs = require("node:fs");
        const path = require("node:path");

        console.log("\n[FORMA] Generazione exports/...");
        runExport();
        console.log("[FORMA] exports/ aggiornato.\n");

        const getCwd = () => process.cwd();
        const templatesPath = path.resolve(getCwd(), "lib", "templates.ts");
        let debounceTimer: ReturnType<typeof setTimeout> | null = null;

        fs.watch(templatesPath, () => {
          if (debounceTimer) clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            console.log("\n[FORMA] templates.ts modificato — rigenero exports/...");
            try {
              runExport();
              console.log("[FORMA] exports/ aggiornato.\n");
            } catch (err) {
              console.error("[FORMA] Errore durante l'export:", err);
            }
          }, 300);
        });

        console.log("[FORMA] Watcher attivo su lib/templates.ts\n");
      } catch (err) {
        console.error("[FORMA] Errore durante l'export iniziale:", err);
      }
    }
  }
}

export const onRequestError = async (...args: any[]) => {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;
  const { captureRequestError } = await import("@sentry/nextjs");
  // @ts-expect-error — Sentry types vary by version
  captureRequestError(...args);
};

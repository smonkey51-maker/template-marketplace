/**
 * Next.js Instrumentation Hook
 * Viene eseguito una volta all'avvio del server (dev e prod).
 * In modalità dev, imposta anche un watcher su lib/templates.ts:
 * ogni volta che aggiungi o modifichi un template, exports/ si aggiorna
 * automaticamente senza dover fare nulla.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.NODE_ENV !== "development") return;

  const { runExport } = await import("./scripts/export-for-marketplace");
  const { watch } = await import("node:fs");
  const { resolve } = await import("node:path");

  // Esportazione iniziale all'avvio (solo in sviluppo)
  try {
    console.log("\n📦 [TemplateLab] Generazione exports/...");
    runExport();
    console.log("📦 [TemplateLab] exports/ aggiornato.\n");
  } catch (err) {
    console.error("❌ [TemplateLab] Errore durante l'export iniziale:", err);
  }

  // Watcher su lib/templates.ts — rigenera al salvataggio
  const templatesPath = resolve(process.cwd(), "lib", "templates.ts");
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  watch(templatesPath, () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      console.log("\n🔄 [TemplateLab] templates.ts modificato — rigenero exports/...");
      try {
        runExport();
        console.log("✅ [TemplateLab] exports/ aggiornato.\n");
      } catch (err) {
        console.error("❌ [TemplateLab] Errore durante l'export:", err);
      }
    }, 300);
  });

  console.log("👁️  [TemplateLab] Watcher attivo su lib/templates.ts\n");
}

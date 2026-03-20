/**
 * Next.js Instrumentation Hook
 * Viene eseguito una volta all'avvio del server (dev e prod).
 * In modalità dev, imposta anche un watcher su lib/templates.ts:
 * ogni volta che aggiungi o modifichi un template, exports/ si aggiorna
 * automaticamente senza dover fare nulla.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { registerNodeOnly } = await import("./instrumentation.node");
  await registerNodeOnly();
}

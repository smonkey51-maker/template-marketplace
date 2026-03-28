"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global-error-boundary]", error);
  }, [error]);

  return (
    <html lang="it">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#050402", color: "#F2EBD9" }}>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", padding: "1rem", textAlign: "center" }}>
          <p style={{ fontSize: "3rem" }} aria-hidden>⚠️</p>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>Errore critico</h1>
          <p style={{ fontSize: "0.9rem", opacity: 0.6, maxWidth: "24rem", margin: 0 }}>
            L&apos;applicazione ha riscontrato un errore critico. Ricarica la pagina.
          </p>
          <button
            onClick={reset}
            style={{ padding: "0.625rem 1.5rem", background: "#9C7733", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem" }}
          >
            Riprova
          </button>
        </div>
      </body>
    </html>
  );
}

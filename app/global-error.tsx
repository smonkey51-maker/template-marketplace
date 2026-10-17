"use client";

import { useEffect } from "react";

/** Renders its own <html>: it only shows when the app itself has failed, so it
 * depends on nothing — no fonts, no stylesheet, no providers. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="it">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#ffffff",
          color: "#0b1c3d",
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "1rem",
            padding: "2rem",
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", margin: 0 }}>Si è verificato un errore</h1>
          <p style={{ margin: 0, color: "#43506b" }}>Qualcosa non ha funzionato. Riprova.</p>
          <button
            onClick={reset}
            style={{
              background: "#1740b5",
              color: "#ffffff",
              border: 0,
              borderRadius: 4,
              padding: "10px 18px",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Riprova
          </button>
        </div>
      </body>
    </html>
  );
}

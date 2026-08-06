"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="it">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#050402",
          color: "#F2EBD9",
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          {/* Inline SVG, not an emoji: this page renders its own <html> when
              the app has already failed, so it must not depend on anything. */}
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>Errore critico</h1>
          <p style={{ fontSize: "0.9rem", opacity: 0.6, maxWidth: "24rem", margin: 0 }}>
            L&apos;applicazione ha riscontrato un errore critico. Ricarica la pagina.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "0.625rem 1.5rem",
              background: "#C49A3C",
              color: "#0D0906",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.875rem",
            }}
          >
            Riprova
          </button>
        </div>
      </body>
    </html>
  );
}

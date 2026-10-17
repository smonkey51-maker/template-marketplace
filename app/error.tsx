"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[error-boundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 py-16">
      <div className="glass max-w-md p-8">
        <h1 className="text-[1.75rem]">Si è verificato un errore</h1>
        <p className="mt-3 text-muted">Qualcosa non ha funzionato. Riprova o torna alla home.</p>
        <div className="mt-6 flex gap-3">
          <button onClick={reset} className="btn btn-primary">
            Riprova
          </button>
          <a href="/" className="btn btn-outline">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

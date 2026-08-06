"use client";

import { TriangleAlert } from "lucide-react";
import { useEffect } from "react";

export default function Error({
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
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
      <TriangleAlert aria-hidden size={40} strokeWidth={1.25} className="text-muted" />
      <h2 className="text-[22px] font-bold text-theme">Qualcosa è andato storto</h2>
      <p className="text-[14px] text-muted max-w-sm">
        Si è verificato un errore imprevisto. Riprova o torna alla home.
      </p>
      <div className="flex gap-3">
        <button onClick={reset} className="btn-brand-sm">
          Riprova
        </button>
        <a
          href="/"
          className="px-4 py-2 text-[13px] font-semibold border border-theme r-pill text-muted hover:text-theme transition-colors"
        >
          ← Home
        </a>
      </div>
    </div>
  );
}

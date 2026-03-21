"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

interface StudioAccessButtonProps {
  compact?: boolean;
}

export default function StudioAccessButton({ compact = false }: StudioAccessButtonProps) {
  const { isSignedIn } = useUser();
  const { lang } = useLang();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (!isSignedIn) {
      window.location.href = "/sign-in";
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: "studio-access" }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Errore durante il checkout. Riprova.");
      }
    } catch {
      setError("Errore di rete. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  if (compact) {
    return (
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleClick}
          disabled={loading}
          className="px-4 py-2 font-bold text-[10px] uppercase tracking-[0.14em] disabled:opacity-60 transition-colors duration-200"
          style={{ fontFamily: "var(--font-syne)", background: "var(--accent)", color: "var(--bg)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--text)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)"; }}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            </span>
          ) : (
            t[lang].studioAccessBanner.cta
          )}
        </button>
        {error && (
          <p className="text-[#FF453A] text-[12px] anim-fade-in">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleClick}
        disabled={loading}
        className="px-8 py-4 font-bold text-[10px] uppercase tracking-[0.14em] disabled:opacity-60 transition-colors duration-200"
        style={{ fontFamily: "var(--font-syne)", background: "var(--accent)", color: "var(--bg)" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--text)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)"; }}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            {lang === "it" ? "Caricamento..." : "Loading..."}
          </span>
        ) : (
          t[lang].studioAccessBanner.cta
        )}
      </button>

      {error && (
        <p className="text-[#FF453A] text-[13px] anim-fade-in">{error}</p>
      )}
    </div>
  );
}

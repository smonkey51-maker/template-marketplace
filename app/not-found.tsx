"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";

export default function NotFound() {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-6">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-40"
          style={{ background: "radial-gradient(ellipse, var(--glow-gold) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 text-center max-w-md">
        {/* 404 number */}
        <p
          className="text-[120px] font-black leading-none tracking-tighter select-none"
          style={{ color: "var(--accent)" }}
        >
          404
        </p>

        <h1 className="text-[22px] font-bold text-theme mt-2 mb-3 tracking-tight">
          {lang === "it" ? "Pagina non trovata" : "Page not found"}
        </h1>

        <p className="text-[15px] text-muted mb-8 leading-relaxed">
          {lang === "it"
            ? "La pagina che stai cercando non esiste o è stata rimossa."
            : "The page you're looking for doesn't exist or has been removed."}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-bold text-[15px] transition-colors duration-200 active:scale-[0.97] ios-spring"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--text)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)"; }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M6 1L1 7l5 6M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {lang === "it" ? "Torna al marketplace" : "Back to marketplace"}
          </Link>
          <Link
            href="/studio"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 glass-subtle border border-theme text-theme font-bold text-[15px] transition-all duration-200 active:scale-[0.97] ios-spring"
          >
            {lang === "it" ? "AI Studio" : "AI Studio"}
          </Link>
        </div>
      </div>
    </div>
  );
}

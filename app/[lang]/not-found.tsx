"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import { templates, formatPrice } from "@/lib/templates";
import { templateTranslations } from "@/lib/i18n";

// Pick 3 popular templates as suggestions
const popularTemplates = [...templates].sort((a, b) => b.downloads - a.downloads).slice(0, 3);

export default function NotFound() {
  const { lang } = useLang();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/?q=${encodeURIComponent(query.trim())}#browse`;
    }
  };

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-6 py-16">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-40"
          style={{ background: "radial-gradient(ellipse, var(--glow-gold) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 text-center max-w-lg w-full">
        {/* 404 number */}
        <p
          className="text-[100px] sm:text-[120px] leading-none tracking-tighter select-none"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 300,
            color: "var(--accent)",
            letterSpacing: "-0.02em",
          }}
        >
          404
        </p>

        <h1 className="text-[20px] font-semibold text-theme mt-2 mb-3 tracking-tight">
          {lang === "it" ? "Pagina non trovata" : "Page not found"}
        </h1>

        <p className="text-[15px] text-muted mb-6 leading-relaxed">
          {lang === "it"
            ? "La pagina che stai cercando non esiste o è stata rimossa."
            : "The page you're looking for doesn't exist or has been removed."}
        </p>

        {/* Search box */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-sm mx-auto mb-8">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              width="14"
              height="14"
              viewBox="0 0 20 20"
              fill="none"
              style={{ color: "var(--muted)" }}
            >
              <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.7" />
              <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === "it" ? "Cerca un template…" : "Search for a template…"}
              className="w-full pl-9 pr-3 py-2.5 text-[14px] outline-none border border-theme bg-input text-theme placeholder:text-muted focus:border-accent transition-colors duration-200"
              style={{ caretColor: "var(--accent)" }}
            />
          </div>
          <button type="submit" className="btn-brand btn-brand-sm px-4">
            {lang === "it" ? "Cerca" : "Search"}
          </button>
        </form>

        {/* Suggested popular templates */}
        <div className="mb-8">
          <p
            className="text-[10px] font-normal uppercase tracking-[0.18em] mb-4"
            style={{ fontFamily: "monospace", color: "var(--accent)" }}
          >
            {lang === "it" ? "Template popolari" : "Popular templates"}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            {popularTemplates.map((tmpl) => {
              const name =
                lang === "it" ? (templateTranslations[tmpl.id]?.name ?? tmpl.name) : tmpl.name;
              return (
                <Link
                  key={tmpl.id}
                  href={`/preview/${tmpl.id}`}
                  className="flex items-center gap-3 px-4 py-3 glass-subtle border border-theme hover:border-accent/30 transition-all duration-200 text-left group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-theme truncate group-hover:text-accent transition-colors">
                      {name}
                    </p>
                    <p className="text-[11px] text-muted">{formatPrice(tmpl.price)}</p>
                  </div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="text-muted group-hover:text-accent transition-colors flex-shrink-0"
                    aria-hidden
                  >
                    <path
                      d="M2 6h8M7 3l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-brand gap-2 text-[15px]" style={{ padding: "12px 24px" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M6 1L1 7l5 6M1 7h12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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

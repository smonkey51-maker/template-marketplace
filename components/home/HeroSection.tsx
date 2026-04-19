"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Split a phrase into words, each wrapped in .split-word with an explicit
// animation-delay that compounds across the headline so stagger is correct.
function HeroHeadline({ segments }: { segments: Array<{ word: string; emphasize?: boolean; br?: boolean }> }) {
  let idx = 0;
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.br) return <br key={`br-${i}`} />;
        const delay = 60 + idx * 100;
        idx += 1;
        return (
          <span key={i} className="split-word">
            <span style={{ animationDelay: `${delay}ms` }}>
              {seg.emphasize ? <em>{seg.word}</em> : seg.word}
            </span>
            {"\u00A0"}
          </span>
        );
      })}
    </>
  );
}

export default function HeroSection({
  lang,
  countedTemplates,
  query,
  setQuery,
}: {
  lang: "it" | "en";
  countedTemplates: number;
  query: string;
  setQuery: (q: string) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const segmentsIt = [
    { word: "Dai" },
    { word: "forma", emphasize: true },
    { word: "", br: true },
    { word: "alla" },
    { word: "tua" },
    { word: "visione." },
  ];
  const segmentsEn = [
    { word: "Give" },
    { word: "forma", emphasize: true },
    { word: "", br: true },
    { word: "to" },
    { word: "your" },
    { word: "vision." },
  ];

  return (
    <section className="relative z-10 overflow-hidden">
      {/* Orbit ambient thumbs — hidden on mobile for performance */}
      <div className="hidden md:block orbit-layer" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="orbit-thumb" aria-hidden>
            <div
              style={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(135deg, rgba(var(--accent-rgb), ${0.08 + i * 0.04}), rgba(var(--accent-rgb), 0.02))`,
              }}
            >
              <div style={{ padding: "8px" }}>
                <div style={{ height: "4px", width: "60%", background: "rgba(var(--accent-rgb), 0.4)", marginBottom: "6px" }} />
                <div style={{ height: "2px", width: "80%", background: "rgba(var(--accent-rgb), 0.2)", marginBottom: "3px" }} />
                <div style={{ height: "2px", width: "50%", background: "rgba(var(--accent-rgb), 0.2)" }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center py-10 sm:py-24">
        {/* Torii ornament — above headline */}
        <div className="torii-accent mb-7 fade-up-0" aria-hidden="true" />

        {/* Eyebrow */}
        <p
          className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] uppercase mb-6 fade-up-0"
          style={{ color: "var(--accent)", opacity: 0.9 }}
        >
          {lang === "it" ? "・ Forma — Studio Digitale ・" : "・ Forma — Digital Studio ・"}
        </p>

        {/* Headline — Fraunces display serif + split reveal */}
        <h1
          className="display-serif mb-6 sm:mb-8"
          style={{
            fontSize: "clamp(42px, 9vw, 140px)",
            color: "var(--text)",
          }}
        >
          {mounted ? (
            <HeroHeadline segments={lang === "it" ? segmentsIt : segmentsEn} />
          ) : lang === "it" ? (
            <>Dai <em>forma</em><br />alla tua visione.</>
          ) : (
            <>Give <em>forma</em><br />to your vision.</>
          )}
        </h1>

        {/* Sub */}
        <p
          className="fade-up-2 text-[13px] sm:text-[16px] leading-[1.7] mb-8 sm:mb-10 max-w-[520px] font-light"
          style={{ color: "var(--muted)" }}
        >
          {lang === "it"
            ? "Template professionali pronti all'uso, personalizzabili in pochi secondi con Claude AI. Senza codice, senza sottoscrizioni obbligatorie."
            : "Professional templates ready to use. Customize any design in seconds with Claude AI. No code, no mandatory subscriptions."}
        </p>

        {/* Search bar — elegant, prominent */}
        <div className="fade-up-3 w-full max-w-[480px] mb-8">
          <label htmlFor="hero-search" className="sr-only">
            {lang === "it" ? "Cerca template" : "Search templates"}
          </label>
          <div
            className="flex items-center gap-3 px-4 py-3.5 border transition-all focus-within:border-[var(--accent)]"
            style={{
              borderColor: "var(--border)",
              background: "var(--card-bg)",
              boxShadow: "var(--elev-2)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" style={{ color: "var(--muted)" }} />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" style={{ color: "var(--muted)" }} />
            </svg>
            <input
              id="hero-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === "it" ? "Cerca template, stile, categoria…" : "Search templates, style, category…"}
              className="flex-1 bg-transparent outline-none text-[14px] placeholder:opacity-60"
              style={{ color: "var(--text)" }}
            />
            <kbd
              className="text-[9px] font-bold tracking-[0.08em] px-1.5 py-0.5 border hidden sm:inline-block"
              style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--muted)" }}
            >
              ⌘K
            </kbd>
          </div>
        </div>

        {/* CTAs */}
        <div className="fade-up-3 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          <a
            href="#browse"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-brand magnetic gap-2 justify-center"
          >
            {lang === "it" ? "Sfoglia il catalogo →" : "Browse catalog →"}
          </a>
          <Link href="/studio" className="btn-ghost gap-1.5 justify-center">
            {lang === "it" ? "Prova l'AI Studio" : "Try AI Studio"}
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Stats row — editorial */}
        <div
          className="fade-up-4 grid grid-cols-3 gap-6 sm:gap-12 mt-10 sm:mt-14 pt-8 sm:pt-10 w-full max-w-[560px]"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="text-center">
            <p
              className="text-[30px] sm:text-[38px] leading-none mb-2 display-serif"
              style={{ color: "var(--terra, #C4622D)" }}
            >
              {countedTemplates}
            </p>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
              {lang === "it" ? "template" : "templates"}
            </p>
          </div>
          <div className="text-center">
            <p
              className="text-[30px] sm:text-[38px] leading-none mb-2 display-serif"
              style={{ color: "var(--accent)" }}
            >
              8
            </p>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
              {lang === "it" ? "bundle" : "bundles"}
            </p>
          </div>
          <div className="text-center">
            <p
              className="text-[30px] sm:text-[38px] leading-none mb-2 display-serif italic"
              style={{ color: "var(--accent)" }}
            >
              ∞
            </p>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
              {lang === "it" ? "personalizzazioni AI" : "AI customizations"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

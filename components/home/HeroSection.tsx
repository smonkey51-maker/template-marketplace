"use client";

import Link from "next/link";

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
  return (
    <section
      className="relative z-10"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center py-8 sm:py-24">

        {/* Torii ornament — above headline */}
        <div className="torii-accent mb-8 fade-up-0" aria-hidden="true" />

        {/* Headline */}
        <h1
          className="fade-up-1 leading-[1.08] mb-5 sm:mb-7"
          style={{
            fontSize: "clamp(38px, 8.5vw, 128px)",
            fontWeight: 800,
            letterSpacing: "-0.035em",
            color: "var(--text)",
            fontFamily: "var(--font-montserrat), sans-serif",
          }}
        >
          {lang === "it" ? (
            <>
              Dai <em style={{ fontStyle: "normal", color: "var(--accent)" }}>FORMA</em><br />
              alla tua visione.
            </>
          ) : (
            <>
              Give <em style={{ fontStyle: "normal", color: "var(--accent)" }}>FORMA</em><br />
              to your vision.
            </>
          )}
        </h1>

        {/* Sub */}
        <p className="fade-up-2 text-[12px] sm:text-[14px] leading-[1.78] mb-5 sm:mb-10 max-w-[420px] font-light" style={{ color: "var(--muted)" }}>
          {lang === "it"
            ? "Template professionali pronti all'uso, personalizzabili in pochi secondi con Claude AI."
            : "Professional templates ready to use. Customize any design in seconds with Claude AI."}
        </p>

        {/* CTAs */}
        <div className="fade-up-3 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <a
            href="#browse"
            onClick={(e) => { e.preventDefault(); document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-brand gap-2 justify-center"
          >
            {lang === "it" ? "Sfoglia il catalogo →" : "Browse catalog →"}
          </a>
          <Link
            href="/studio"
            className="btn-ghost gap-1.5 justify-center"
          >
            {lang === "it" ? "Prova l'AI Studio" : "Try AI Studio"}
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>

        {/* Stats row */}
        <div className="fade-up-4 flex items-center gap-8 mt-6 sm:mt-10 pt-6 sm:pt-8" style={{ borderTop: "1px solid var(--border)" }}>
          <div>
            <p className="text-[26px] leading-none mb-1.5" style={{ fontFamily: "var(--font-jakarta), sans-serif", fontWeight: 700, color: "var(--terra, #C4622D)" }}>
              {countedTemplates}
            </p>
            <p className="text-[9px] font-medium uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
              {lang === "it" ? "template disponibili" : "templates available"}
            </p>
          </div>
          <span className="select-none text-[9px]" style={{ color: "var(--accent)", opacity: 0.3 }}>◇</span>
          <div>
            <p className="text-[26px] leading-none mb-1.5" style={{ fontFamily: "var(--font-jakarta), sans-serif", fontWeight: 700, color: "var(--accent)" }}>
              8
            </p>
            <p className="text-[9px] font-medium uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
              {lang === "it" ? "bundle" : "bundles"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { templates } from "@/lib/templates";

const TOTAL_DOWNLOADS = templates.reduce((sum, t) => sum + (t.downloads || 0), 0);

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
      className="relative z-10 border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-20 items-center py-14 sm:py-28">

        {/* Left: copy */}
        <div>
          {/* Eyebrow */}
          <div className="label-section mb-5 sm:mb-8" style={{ color: "var(--accent)" }}>
            {lang === "it" ? "Collezione Primavera 2026" : "Spring Collection 2026"}
          </div>

          {/* Headline */}
          <h1
            className="font-dm-serif leading-[1.04] mb-5 sm:mb-7"
            style={{
              fontSize: "clamp(42px, 6.5vw, 102px)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              color: "var(--text)",
              fontFamily: "var(--font-dm-serif), Georgia, serif",
            }}
          >
            {lang === "it" ? (
              <>
                Template premium,<br />
                <em className="hero-em-animate" style={{ fontStyle: "italic", color: "var(--terra, #C4622D)" }}>plasmati con cura.</em>
              </>
            ) : (
              <>
                Premium templates,<br />
                <em className="hero-em-animate" style={{ fontStyle: "italic", color: "var(--terra, #C4622D)" }}>crafted with care.</em>
              </>
            )}
          </h1>

          {/* Sub */}
          <p className="text-[13px] sm:text-[14px] leading-[1.78] mb-7 sm:mb-10 max-w-[420px] font-light" style={{ color: "var(--muted)" }}>
            {lang === "it"
              ? "Template professionali pronti all'uso, personalizzabili in pochi secondi con Claude AI."
              : "Professional templates ready to use. Customize any design in seconds with Claude AI."}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <a
              href="#browse"
              onClick={(e) => { e.preventDefault(); document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-brand gap-2 justify-center sm:justify-start"
            >
              {lang === "it" ? "Sfoglia il catalogo →" : "Browse catalog →"}
            </a>
            <Link
              href="/studio"
              className="btn-ghost gap-1.5 justify-center sm:justify-start"
            >
              {lang === "it" ? "Prova l'AI Studio" : "Try AI Studio"}
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-6 mt-8 pt-7" style={{ borderTop: "1px solid var(--border)" }}>
            <div>
              <p className="text-[22px] italic leading-none mb-1" style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--accent)" }}>
                {TOTAL_DOWNLOADS.toLocaleString("it-IT")}+
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
                {lang === "it" ? "download totali" : "total downloads"}
              </p>
            </div>
            <div className="w-px h-8 flex-shrink-0" style={{ background: "var(--border)" }} />
            <div>
              <p className="text-[22px] italic leading-none mb-1" style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--terra, #C4622D)" }}>
                {countedTemplates}
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
                template
              </p>
            </div>
            <div className="w-px h-8 flex-shrink-0" style={{ background: "var(--border)" }} />
            <div>
              <p className="text-[22px] italic leading-none mb-1" style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--accent)" }}>
                AI
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
                {lang === "it" ? "powered" : "powered"}
              </p>
            </div>
          </div>
        </div>

        {/* Right: catalog shelf widget */}
        <div className="hidden lg:block border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          {/* Header */}
          <div className="flex items-center justify-between px-[22px] py-[14px] border-b" style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
            <span className="font-dm-serif text-[13px] italic" style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--muted)" }}>
              {lang === "it" ? "Selezionati questa settimana" : "Selected this week"}
            </span>
            <span className="text-[9px] tracking-[0.18em] uppercase font-semibold" style={{ fontFamily: "var(--font-syne)", color: "var(--accent)", opacity: 0.75 }}>
              {countedTemplates} {lang === "it" ? "pezzi" : "pieces"}
            </span>
          </div>
          {/* Shelf items — top templates */}
          {[
            { num: "001", name: "SaaS Hero Section",       cat: lang === "it" ? "UI · Pick" : "UI · Pick",      price: "€ 12,99", featured: true,  id: "hero-saas" },
            { num: "002", name: "Pricing Table 3-Tier",    cat: "UI",                                             price: "€ 9,99",  featured: false, id: "pricing-table" },
            { num: "018", name: "LinkedIn Growth Kit",     cat: "Prompt",                                         price: "€ 7,99",  featured: false, id: "linkedin-prompt-pack" },
            { num: "031", name: "Portfolio Agency Dark",   cat: lang === "it" ? "UI · Nuovo" : "UI · New",        price: "€ 14,99", featured: false, id: "creative-agency-portfolio" },
            { num: "044", name: "E-learning Landing",      cat: "UI",                                             price: "€ 10,99", featured: false, id: "elearning-landing" },
          ].map((item) => (
            <Link
              key={item.num}
              href={`/preview/${item.id}`}
              className="flex items-center gap-3 px-[22px] py-[13px] border-b transition-colors duration-150 last:border-0"
              style={{
                borderColor: "var(--border)",
                background: item.featured ? "var(--accent-bg)" : "transparent",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cream-08, var(--input-bg))")}
              onMouseLeave={(e) => (e.currentTarget.style.background = item.featured ? "var(--accent-bg)" : "transparent")}
            >
              <span
                className="w-[44px] flex-shrink-0 text-[11px] italic"
                style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--accent)", opacity: item.featured ? 1 : 0.55 }}
              >
                N° {item.num}
              </span>
              <span className="flex-1 text-[13px] font-normal truncate" style={{ color: "var(--text)" }}>
                {item.name}
              </span>
              <span className="text-[9px] tracking-[0.12em] uppercase font-medium mr-3 hidden sm:block"
                style={{ color: item.featured ? "var(--accent)" : "var(--muted)", opacity: item.featured ? 0.9 : 0.7 }}>
                {item.cat}
              </span>
              <span className="text-[15px] italic flex-shrink-0" style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--accent)" }}>
                {item.price}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

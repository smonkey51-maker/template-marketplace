"use client";

import Link from "next/link";
import { BentoGrid, BentoCell, BentoEyebrow } from "@/components/BentoGrid";
import { FormaLogoAnimated } from "@/components/FormaLogo";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";

/**
 * The homepage as a bento hub: every destination on one screen, sized by
 * importance rather than stacked in five full-viewport sections.
 *
 * On desktop the eight cells tile a 4-track grid exactly, with the hero two
 * tracks wide and two rows tall:
 *
 *   ┌────────┬─────────────────┬────────┐
 *   │ logo   │      hero       │ catal. │
 *   ├────────┤                 ├────────┤
 *   │ links  │                 │ guida  │
 *   ├────────┴────────┬────────┼────────┤
 *   │     studio      │ accnt  │ wish   │
 *   └─────────────────┴────────┴────────┘
 *
 * The cell order below is the order auto-placement needs to produce that —
 * reordering the JSX reflows the whole grid, so keep the diagram in sync.
 */

/** A painting used as a cell background, with the overlay that keeps text legible. */
function CellPainting({ src, position = "center" }: { src: string; position?: string }) {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${src}')`,
          backgroundSize: "cover",
          backgroundPosition: position,
        }}
      />
      {/* Not decoration — this is what buys the contrast ratio for the text
          above it. A painting alone puts white type over unpredictable
          midtones and fails WCAG 1.4.3 somewhere on every image. */}
      <div aria-hidden className="absolute inset-0" style={{ background: "rgba(5,3,2,0.72)" }} />
    </>
  );
}

export default function BentoHub() {
  const { lang } = useLang();
  const t = copy[lang];

  const quickLinks = [
    { href: "/catalogo", label: t.catalogo },
    { href: "/guida", label: t.guida },
    { href: "/ai-studio", label: t.studioAi },
    { href: "/account", label: t.account },
  ];

  return (
    <BentoGrid
      className="mx-auto w-full max-w-[1400px] px-3 sm:px-4 lg:px-6 py-4 sm:py-6"
      ariaLabel={lang === "it" ? "Sezioni del sito" : "Site sections"}
    >
      {/* ── Wordmark ───────────────────────────────────────────────────── */}
      <BentoCell delay={0} className="justify-between p-5">
        <FormaLogoAnimated className="w-full h-auto max-w-[150px]" />
        <div>
          <p className="text-[13px] text-muted leading-snug">{t.tagline}</p>
          <p className="text-[11px] text-muted/70 mt-1">{t.date}</p>
        </div>
      </BentoCell>

      {/* ── Hero — the one cell that carries the headline ───────────────── */}
      <BentoCell cols={2} rows={2} colsMd={2} delay={60} className="justify-end p-6 sm:p-8">
        <CellPainting src="/paintings/vermeer.jpg" position="center 20%" />
        <div className="relative flex flex-col gap-4">
          <BentoEyebrow>{t.heroKicker}</BentoEyebrow>
          <h1
            className="font-black text-white leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)" }}
          >
            {t.heroTagline}
          </h1>
          <p className="text-[15px] text-white/75 max-w-md leading-relaxed">{t.heroSubSnap}</p>
          <div className="flex flex-wrap gap-2.5 mt-1">
            {/* Nested in a non-link cell, so these are the only interactive
                things here — a link inside a link is invalid and makes the
                whole cell unusable with a keyboard. */}
            <Link href="/catalogo" className="btn-brand">
              {t.heroCtaSnap}
            </Link>
            <Link
              href="/guida"
              className="r-pill glass-surface px-5 py-2.5 text-[14px] font-bold text-white"
            >
              {t.heroCtaGuidaSnap}
            </Link>
          </div>
        </div>
      </BentoCell>

      {/* ── Catalogo ───────────────────────────────────────────────────── */}
      <BentoCell href="/catalogo" label={t.catalogo} delay={120} className="justify-end p-5 sm:p-6">
        <CellPainting src="/paintings/seurat.jpg" />
        <div className="relative">
          <BentoEyebrow>{t.catalogo}</BentoEyebrow>
          <p className="text-[19px] font-black text-white leading-tight mt-1.5">{t.heroTitle}</p>
        </div>
      </BentoCell>

      {/* ── Quick links ────────────────────────────────────────────────── */}
      <BentoCell delay={180} className="justify-center p-5 gap-1">
        {quickLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="r-sm -mx-1 px-1 py-0.5 text-[17px] font-bold text-theme hover:text-accent transition-colors duration-200"
          >
            {l.label}.
          </Link>
        ))}
      </BentoCell>

      {/* ── Guida ──────────────────────────────────────────────────────── */}
      <BentoCell href="/guida" label={t.guida} delay={240} className="justify-end p-5 sm:p-6">
        <CellPainting src="/paintings/monet.jpg" />
        <div className="relative">
          <BentoEyebrow>{t.guida}</BentoEyebrow>
          <p className="text-[19px] font-black text-white leading-tight mt-1.5">
            {t.heroCtaGuidaSnap}
          </p>
        </div>
      </BentoCell>

      {/* ── Studio ─────────────────────────────────────────────────────── */}
      <BentoCell
        href="/ai-studio"
        label={t.aiTitle}
        cols={2}
        colsMd={2}
        delay={300}
        className="justify-end p-6 sm:p-8"
      >
        <CellPainting src="/paintings/kandinsky.jpg" />
        <div className="relative">
          <BentoEyebrow>{t.aiTitle}</BentoEyebrow>
          <p
            className="font-black text-white leading-[0.95] tracking-tight mt-2"
            style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)" }}
          >
            {t.studioTitle}
          </p>
          <p className="text-[14px] text-white/70 max-w-sm mt-2 leading-relaxed">{t.aiSub}</p>
        </div>
      </BentoCell>

      {/* ── Account ────────────────────────────────────────────────────── */}
      <BentoCell href="/account" label={t.accountTitle} delay={360} className="justify-end p-5">
        <BentoEyebrow>{t.account}</BentoEyebrow>
        <p className="text-[17px] font-black text-theme leading-tight mt-1.5">{t.accountTitle}</p>
        <p className="text-[13px] text-muted mt-1 leading-snug">{t.accountSub}</p>
      </BentoCell>

      {/* ── Wishlist ───────────────────────────────────────────────────── */}
      <BentoCell
        href="/wishlist"
        label={lang === "it" ? "Salvati" : "Saved"}
        delay={420}
        className="justify-end p-5"
      >
        <BentoEyebrow>{lang === "it" ? "Salvati" : "Saved"}</BentoEyebrow>
        <p className="text-[17px] font-black text-theme leading-tight mt-1.5">
          {lang === "it" ? "I tuoi preferiti" : "Your favourites"}
        </p>
      </BentoCell>
    </BentoGrid>
  );
}

"use client";

import Link from "next/link";
import {
  BentoGrid,
  BentoCell,
  BentoEyebrow,
  BentoSubGrid,
  BentoSubBox,
} from "@/components/BentoGrid";
import { FormaLogoAnimated } from "@/components/FormaLogo";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";

/**
 * The homepage as a bento hub — four zones, not eight peers.
 *
 * On desktop the cells tile a 4-track grid exactly:
 *
 *   ┌────────┬─────────────────┬────────┐
 *   │ brand  │      HERO       │ catal. │
 *   ├────────┤     (2 × 2)     ├────────┤
 *   │ studio │                 │ guida  │
 *   ├────────┴─────────────────┴────────┤
 *   │       area personale (4 wide)     │
 *   │        ┌────────┐ ┌────────┐      │
 *   │        │ account│ │ salvati│      │
 *   │        └────────┘ └────────┘      │
 *   └───────────────────────────────────┘
 *
 * Row 1 is 1+2+1, row 2 is 1+(hero)+1, row 3 is 4. The cell order below is what
 * auto-placement needs to produce that, so reordering the JSX reflows the whole
 * grid — keep the diagram in sync.
 *
 * Two things changed after the first version read as confusing.
 *
 * The eight cells were all top-level peers, so nothing told the eye what
 * belonged with what. Now the two discovery destinations stack on the right,
 * the tool sits under the brand on the left, and the personal-area pair is
 * grouped inside a single labelled cell as sub-boxes.
 *
 * And a whole cell of quick links is gone: it repeated Catalogo / Guida /
 * Studio / Account, which the fixed header already lists three centimetres
 * above it. The same four words twice on one screen is most of what made the
 * layout feel noisy.
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

  const savedLabel = lang === "it" ? "Salvati" : "Saved";

  return (
    <BentoGrid
      // The top padding clears the fixed 56px header. Without it the first cell
      // slid underneath, and the wordmark inside it collided with the header's
      // own logo — two FORMA marks stacked in the same corner.
      className="mx-auto w-full max-w-[1400px] px-3 sm:px-4 lg:px-6 pb-4 sm:pb-6"
      style={{ paddingTop: "calc(56px + env(safe-area-inset-top, 0px) + 16px)" }}
      ariaLabel={lang === "it" ? "Sezioni del sito" : "Site sections"}
    >
      {/* ── Brand ──────────────────────────────────────────────────────── */}
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

      {/* ── Discover, right column: catalogue above guide ───────────────── */}
      <BentoCell href="/catalogo" label={t.catalogo} delay={120} className="justify-end p-5 sm:p-6">
        <CellPainting src="/paintings/seurat.jpg" />
        <div className="relative">
          <BentoEyebrow>{t.catalogo}</BentoEyebrow>
          <p className="text-[19px] font-black text-white leading-tight mt-1.5">{t.heroTitle}</p>
        </div>
      </BentoCell>

      {/* ── Studio — under the brand, left column ───────────────────────── */}
      <BentoCell href="/ai-studio" label={t.aiTitle} delay={180} className="justify-end p-5">
        <CellPainting src="/paintings/kandinsky.jpg" />
        <div className="relative">
          <BentoEyebrow>{t.aiTitle}</BentoEyebrow>
          <p className="text-[19px] font-black text-white leading-tight mt-1.5">{t.studioTitle}</p>
        </div>
      </BentoCell>

      {/* ── Guide ──────────────────────────────────────────────────────── */}
      <BentoCell href="/guida" label={t.guida} delay={240} className="justify-end p-5 sm:p-6">
        <CellPainting src="/paintings/monet.jpg" />
        <div className="relative">
          <BentoEyebrow>{t.guida}</BentoEyebrow>
          <p className="text-[19px] font-black text-white leading-tight mt-1.5">
            {t.heroCtaGuidaSnap}
          </p>
        </div>
      </BentoCell>

      {/* ── Personal area — one cell, two sub-boxes ─────────────────────── */}
      <BentoCell cols={4} colsMd={2} delay={300} className="justify-center p-5 sm:p-6">
        <BentoEyebrow>{lang === "it" ? "Area personale" : "Your area"}</BentoEyebrow>
        <BentoSubGrid>
          <BentoSubBox href="/account" label={t.accountTitle}>
            <p className="text-[16px] font-black text-theme leading-tight">{t.accountTitle}</p>
            <p className="text-[12px] text-muted mt-1 leading-snug">{t.accountSub}</p>
          </BentoSubBox>
          <BentoSubBox href="/wishlist" label={savedLabel}>
            <p className="text-[16px] font-black text-theme leading-tight">{savedLabel}</p>
            <p className="text-[12px] text-muted mt-1 leading-snug">
              {lang === "it"
                ? "I template che hai messo da parte."
                : "The templates you set aside."}
            </p>
          </BentoSubBox>
        </BentoSubGrid>
      </BentoCell>
    </BentoGrid>
  );
}

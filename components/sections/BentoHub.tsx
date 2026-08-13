"use client";

import Link from "next/link";
import {
  BentoGrid,
  BentoCell,
  BentoEyebrow,
  BentoSubGrid,
  BentoSubBox,
} from "@/components/BentoGrid";
import { Bookmark, UserRound } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";

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
      className="mx-auto w-full max-w-[1400px] px-3 sm:px-4 lg:px-6 pb-4 sm:pb-6"
      style={{ paddingTop: "calc(56px + env(safe-area-inset-top, 0px) + 16px)" }}
      ariaLabel={lang === "it" ? "Sezioni del sito" : "Site sections"}
    >
      {/* ── AI Studio — left column, spans 2 rows ────────────────────── */}
      <BentoCell
        rows={2}
        href={`/${lang}/ai-studio`}
        label={t.aiTitle}
        delay={180}
        className="bento-order-studio justify-end p-5"
      >
        <CellPainting src="/paintings/kandinsky.jpg" />
        <div className="relative">
          <BentoEyebrow>{t.aiTitle}</BentoEyebrow>
          <p className="text-[19px] font-black text-white leading-tight mt-1.5">{t.studioTitle}</p>
        </div>
      </BentoCell>

      {/* ── Hero — the one cell that carries the headline ────────────── */}
      <BentoCell
        cols={2}
        rows={2}
        colsMd={2}
        delay={60}
        className="bento-order-hero justify-end p-6 sm:p-8"
      >
        <CellPainting src="/paintings/vermeer.jpg" position="center 20%" />
        {/* No wordmark inside the hero. SectionNav already puts one in the
            fixed bar directly above this cell, so on a phone the visitor met
            Atelier Nove twice within the first 240px — the second one reading as a
            duplicate rather than as branding. */}
        <div className="relative flex flex-col gap-4">
          <h1
            className="font-black text-white leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)" }}
          >
            {t.heroTagline}
          </h1>
          <p className="text-[15px] text-white/75 max-w-md leading-relaxed">{t.heroSubSnap}</p>
          <div className="bento-hero-ctas flex flex-col sm:flex-row flex-wrap gap-2.5 mt-1">
            <Link href={`/${lang}/catalogo`} className="btn-brand">
              {t.heroCtaSnap}
            </Link>
            <Link
              href={`/${lang}/guida`}
              className="r-pill px-5 py-2.5 text-[14px] font-bold text-white transition-all"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                backdropFilter: "blur(12px)",
              }}
            >
              {t.heroCtaGuidaSnap}
            </Link>
          </div>
        </div>
      </BentoCell>

      {/* ── Catalogo — right column, top ─────────────────────────────── */}
      <BentoCell
        href={`/${lang}/catalogo`}
        label={t.catalogo}
        delay={120}
        className="bento-order-catalogo justify-end p-5 sm:p-6"
      >
        <CellPainting src="/paintings/seurat.jpg" />
        <div className="relative">
          <BentoEyebrow>{t.catalogo}</BentoEyebrow>
          <p className="text-[19px] font-black text-white leading-tight mt-1.5">{t.heroTitle}</p>
        </div>
      </BentoCell>

      {/* ── Guida — right column, bottom ────────────────────────────── */}
      <BentoCell
        href={`/${lang}/guida`}
        label={t.guida}
        delay={240}
        className="bento-order-guida justify-end p-5 sm:p-6"
      >
        <CellPainting src="/paintings/monet.jpg" />
        <div className="relative">
          <BentoEyebrow>{t.guida}</BentoEyebrow>
          <p className="text-[19px] font-black text-white leading-tight mt-1.5">
            {t.heroCtaGuidaSnap}
          </p>
        </div>
      </BentoCell>

      {/* ── Personal area — one cell, two sub-boxes ─────────────────── */}
      <BentoCell
        cols={4}
        colsMd={2}
        delay={300}
        className="bento-order-personal justify-center p-5 sm:p-6"
      >
        <BentoEyebrow>{lang === "it" ? "Area personale" : "Your area"}</BentoEyebrow>
        <BentoSubGrid>
          <BentoSubBox href={`/${lang}/account`} label={t.accountTitle}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[16px] font-black text-theme leading-tight">{t.accountTitle}</p>
                <p className="text-[12px] text-muted mt-1 leading-snug">{t.accountSub}</p>
              </div>
              {/* Line icons, not emoji. The two boxes used a bust and a
                  bookmark glyph, which a phone renders in full colour — a blue
                  figure and a red tag, the only saturated non-gold marks
                  anywhere on the page. These inherit the accent instead. */}
              <UserRound
                aria-hidden
                className="shrink-0 ml-3 text-accent opacity-70"
                size={20}
                strokeWidth={1.5}
              />
            </div>
          </BentoSubBox>
          <BentoSubBox href={`/${lang}/wishlist`} label={savedLabel}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[16px] font-black text-theme leading-tight">{savedLabel}</p>
                <p className="text-[12px] text-muted mt-1 leading-snug">
                  {lang === "it"
                    ? "I template che hai messo da parte."
                    : "The templates you set aside."}
                </p>
              </div>
              <Bookmark
                aria-hidden
                className="shrink-0 ml-3 text-accent opacity-70"
                size={20}
                strokeWidth={1.5}
              />
            </div>
          </BentoSubBox>
        </BentoSubGrid>
      </BentoCell>
    </BentoGrid>
  );
}

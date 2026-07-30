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
      <BentoCell rows={2} href="/ai-studio" label={t.aiTitle} delay={180} className="bento-order-studio justify-end p-5">
        <CellPainting src="/paintings/kandinsky.jpg" />
        <div className="relative">
          <BentoEyebrow>{t.aiTitle}</BentoEyebrow>
          <p className="text-[19px] font-black text-white leading-tight mt-1.5">{t.studioTitle}</p>
        </div>
      </BentoCell>

      {/* ── Hero — the one cell that carries the headline ────────────── */}
      <BentoCell cols={2} rows={2} colsMd={2} delay={60} className="bento-order-hero justify-end p-6 sm:p-8">
        <CellPainting src="/paintings/vermeer.jpg" position="center 20%" />
        <div className="relative flex flex-col gap-4">
          <div className="sm:hidden mb-4">
            <FormaLogoAnimated className="w-full h-auto max-w-[150px]" />
          </div>
          <BentoEyebrow>{t.heroKicker}</BentoEyebrow>
          <h1
            className="font-black text-white leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)" }}
          >
            {t.heroTagline}
          </h1>
          <p className="text-[15px] text-white/75 max-w-md leading-relaxed">{t.heroSubSnap}</p>
          <div className="bento-hero-ctas flex flex-col sm:flex-row flex-wrap gap-2.5 mt-1">
            <Link href="/catalogo" className="btn-brand">
              {t.heroCtaSnap}
            </Link>
            <Link
              href="/guida"
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
      <BentoCell href="/catalogo" label={t.catalogo} delay={120} className="bento-order-catalogo justify-end p-5 sm:p-6">
        <CellPainting src="/paintings/seurat.jpg" />
        <div className="relative">
          <BentoEyebrow>{t.catalogo}</BentoEyebrow>
          <p className="text-[19px] font-black text-white leading-tight mt-1.5">{t.heroTitle}</p>
        </div>
      </BentoCell>

      {/* ── Guida — right column, bottom ────────────────────────────── */}
      <BentoCell href="/guida" label={t.guida} delay={240} className="bento-order-guida justify-end p-5 sm:p-6">
        <CellPainting src="/paintings/monet.jpg" />
        <div className="relative">
          <BentoEyebrow>{t.guida}</BentoEyebrow>
          <p className="text-[19px] font-black text-white leading-tight mt-1.5">
            {t.heroCtaGuidaSnap}
          </p>
        </div>
      </BentoCell>

      {/* ── Personal area — one cell, two sub-boxes ─────────────────── */}
      <BentoCell cols={4} colsMd={2} delay={300} className="bento-order-personal justify-center p-5 sm:p-6">
        <BentoEyebrow>{lang === "it" ? "Area personale" : "Your area"}</BentoEyebrow>
        <BentoSubGrid>
          <BentoSubBox href="/account" label={t.accountTitle}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[16px] font-black text-theme leading-tight">{t.accountTitle}</p>
                <p className="text-[12px] text-muted mt-1 leading-snug">{t.accountSub}</p>
              </div>
              <span className="text-[20px] opacity-60 shrink-0 ml-3">👤</span>
            </div>
          </BentoSubBox>
          <BentoSubBox href="/wishlist" label={savedLabel}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[16px] font-black text-theme leading-tight">{savedLabel}</p>
                <p className="text-[12px] text-muted mt-1 leading-snug">
                  {lang === "it"
                    ? "I template che hai messo da parte."
                    : "The templates you set aside."}
                </p>
              </div>
              <span className="text-[20px] opacity-60 shrink-0 ml-3">🔖</span>
            </div>
          </BentoSubBox>
        </BentoSubGrid>
      </BentoCell>
    </BentoGrid>
  );
}

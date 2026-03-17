"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { templates } from "@/lib/templates";
import TemplateGrid from "@/components/TemplateGrid";
import NavButtons from "@/components/NavButtons";
import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import EmailCapture from "@/components/EmailCapture";
import Footer from "@/components/Footer";

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

export default function HomeContent() {
  const { lang } = useLang();
  const totalDownloads = templates.reduce((s, tmpl) => s + tmpl.downloads, 0);
  const animatedDownloads = useCountUp(totalDownloads);
  const animatedTemplates = useCountUp(templates.length);

  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden">

      {/* ── Ambient orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-60"
          style={{ background: "radial-gradient(ellipse, var(--glow-blue) 0%, transparent 70%)" }} />
        <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse, var(--glow-purple) 0%, transparent 70%)" }} />
      </div>

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 border-b border-theme backdrop-blur-2xl bg-nav px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <span className="text-[17px] font-bold tracking-tight text-[#0A84FF] shrink-0 select-none">
            TemplateLab
          </span>
          <div className="hidden sm:flex items-center gap-1">
            <Link href="/guide" className="text-[14px] text-muted hover:text-theme transition-colors duration-200 px-3 py-1.5 rounded-xl hover:bg-card">
              {t[lang].nav.guide}
            </Link>
            <Link href="/studio" className="text-[14px] text-muted hover:text-theme transition-colors duration-200 px-3 py-1.5 rounded-xl hover:bg-card">
              {t[lang].nav.studio}
            </Link>
            <Link href="/account" className="text-[14px] text-muted hover:text-theme transition-colors duration-200 px-3 py-1.5 rounded-xl hover:bg-card">
              {t[lang].nav.account}
            </Link>
          </div>
          <NavButtons />
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 px-4 sm:px-6 pt-16 pb-10 sm:pt-24 sm:pb-16 text-center max-w-2xl mx-auto">

        {/* Badge */}
        <div className="anim-fade-up delay-0 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold glass-subtle text-[#0A84FF] mb-6 select-none">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0A84FF] opacity-50" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0A84FF]" />
          </span>
          {t[lang].hero.badge}
        </div>

        {/* Heading */}
        <h1 className="anim-fade-up delay-75 text-[2rem] sm:text-[3rem] md:text-[3.6rem] font-black leading-[1.06] tracking-[-0.03em] mb-4 text-theme">
          {t[lang].hero.titleStart}{" "}
          <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #0A84FF 0%, #5E5CE6 100%)" }}>
            {t[lang].hero.titleGradient.split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </span>{" "}
          {t[lang].hero.titleEnd}
        </h1>

        {/* Subtitle */}
        <p className="anim-fade-up delay-150 text-[15px] sm:text-[16px] text-muted max-w-lg mx-auto mb-8 leading-relaxed">
          {t[lang].hero.subtitle}
        </p>

        {/* CTAs */}
        <div className="anim-fade-up delay-225 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#browse"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0A84FF] hover:bg-[#409CFF] rounded-2xl font-bold text-white text-[15px] btn-glow-blue active:scale-[0.96] ios-spring shadow-[0_4px_20px_rgba(10,132,255,0.3)]">
            {t[lang].hero.cta1}
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="shrink-0 opacity-80">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <Link href="/studio"
            className="px-7 py-3.5 glass-subtle rounded-2xl font-bold text-[15px] text-theme hover:border-[#0A84FF]/30 active:scale-[0.96] ios-spring transition-all duration-300">
            {t[lang].hero.cta2}
          </Link>
        </div>

        {/* Trust stats */}
        <div className="anim-fade-up delay-300 flex items-center justify-center gap-0 mt-7 text-[12px] text-muted">
          <span className="flex items-center gap-1.5 px-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A84FF] shrink-0" />
            {animatedTemplates} {t[lang].hero.statTemplates}
          </span>
          <span className="w-px h-3 bg-theme/25 shrink-0" />
          <span className="flex items-center gap-1.5 px-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] shrink-0" />
            {animatedDownloads.toLocaleString(lang === "it" ? "it-IT" : "en-US")}+ {t[lang].hero.statDownloads}
          </span>
          <span className="w-px h-3 bg-theme/25 shrink-0" />
          <span className="flex items-center gap-1.5 px-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5E5CE6] shrink-0" />
            {t[lang].hero.statPayment}
          </span>
        </div>
      </section>

      {/* ── Come funziona — compact strip ── */}
      <div className="relative z-10 anim-fade-up delay-300">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-12">
          <div className="relative border border-theme rounded-[20px] bg-surface overflow-hidden">
            {/* top glow line */}
            <div className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(10,132,255,0.2), rgba(94,92,230,0.2), transparent)" }} />

            <div className="grid grid-cols-3 divide-x divide-theme">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center px-4 py-5 gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#0A84FF]/10 flex items-center justify-center text-base">🔍</div>
                <div>
                  <p className="text-[11px] font-black text-[#0A84FF] uppercase tracking-widest mb-0.5">01</p>
                  <p className="text-[12px] font-semibold text-theme leading-snug">{t[lang].howItWorks.step1Title}</p>
                  <p className="text-[10.5px] text-muted mt-1 leading-snug hidden sm:block">{t[lang].howItWorks.step1Desc}</p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center px-4 py-5 gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#5E5CE6]/10 flex items-center justify-center text-base">⚡</div>
                <div>
                  <p className="text-[11px] font-black text-[#5E5CE6] uppercase tracking-widest mb-0.5">02</p>
                  <p className="text-[12px] font-semibold text-theme leading-snug">{t[lang].howItWorks.step2Title}</p>
                  <p className="text-[10.5px] text-muted mt-1 leading-snug hidden sm:block">{t[lang].howItWorks.step2Desc}</p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center px-4 py-5 gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#30D158]/10 flex items-center justify-center text-base">🤖</div>
                <div>
                  <p className="text-[11px] font-black text-[#30D158] uppercase tracking-widest mb-0.5">03</p>
                  <p className="text-[12px] font-semibold text-theme leading-snug">{t[lang].howItWorks.step3Title}</p>
                  <p className="text-[10.5px] text-muted mt-1 leading-snug hidden sm:block">{t[lang].howItWorks.step3Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section divider → browse ── */}
      <div id="browse" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-0">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-theme" />
          <span className="text-[11px] font-bold text-muted uppercase tracking-[0.18em] shrink-0">
            {templates.length} {lang === "it" ? "template disponibili" : "templates available"}
          </span>
          <div className="flex-1 h-px bg-theme" />
        </div>
      </div>

      {/* ── Template Grid ── */}
      <div className="relative z-10">
        <TemplateGrid />
      </div>

      {/* ── Newsletter ── */}
      <div className="relative z-10 border-t border-theme">
        <EmailCapture />
      </div>

      {/* ── Footer ── */}
      <Footer />

    </div>
  );
}

"use client";

import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import SiteNav from "@/components/SiteNav";

export default function GuidePage() {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden">

      {/* ── Ambient background orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-50"
          style={{ background: "radial-gradient(ellipse, var(--glow-blue) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-[30%] right-[-5%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, var(--glow-purple) 0%, transparent 70%)" }}
        />
      </div>

      <SiteNav title={t[lang].guide.pageTitle} />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-16">

        {/* ── Hero ── */}
        <section className="text-center anim-fade-up delay-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-semibold glass-subtle text-[#0A84FF] mb-6 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A84FF]" />
            {t[lang].guide.badge}
          </div>
          <h1 className="text-[2rem] sm:text-[2.8rem] font-black tracking-[-0.03em] leading-[1.1] text-theme mb-4">
            {t[lang].guide.title}
          </h1>
          <p className="text-[16px] sm:text-[18px] text-muted max-w-lg mx-auto leading-relaxed">
            {t[lang].guide.subtitle}
          </p>
        </section>

        {/* ── Sezione 1: Due tipi di template ── */}
        <section className="anim-fade-up delay-75">
          <p className="text-[11px] font-bold text-muted uppercase tracking-[0.2em] mb-6 text-center">
            {t[lang].guide.sectionTypes}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* UI Template */}
            <div className="bg-surface border border-theme rounded-[24px] p-6 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A84FF]/10 flex items-center justify-center">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="2" y="4" width="20" height="14" rx="2" stroke="#0A84FF" strokeWidth="1.7"/>
                  <path d="M8 18v2M16 18v2M6 20h12" stroke="#0A84FF" strokeWidth="1.7" strokeLinecap="round"/>
                  <path d="M6 8h5M6 11.5h8" stroke="#0A84FF" strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
                </svg>
              </div>
              <div>
                <h2 className="text-[18px] font-bold text-theme mb-2">{t[lang].guide.uiTitle}</h2>
                <p className="text-[14px] text-muted leading-relaxed">
                  {t[lang].guide.uiDesc}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["HTML", "Tailwind CSS", "Copy & Paste"].map((tag) => (
                  <span
                    key={tag}
                    className="glass-subtle rounded-full px-3 py-1 text-[11px] font-semibold text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Prompt Template */}
            <div className="bg-surface border border-theme rounded-[24px] p-6 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#5E5CE6]/10 flex items-center justify-center">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="4" y="2" width="16" height="20" rx="2" stroke="#5E5CE6" strokeWidth="1.7"/>
                  <path d="M8 8h8M8 12h8M8 16h5" stroke="#5E5CE6" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <h2 className="text-[18px] font-bold text-theme mb-2">{t[lang].guide.promptTitle}</h2>
                <p className="text-[14px] text-muted leading-relaxed">
                  {t[lang].guide.promptDesc}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["Claude AI", "ChatGPT", "Copy & Paste"].map((tag) => (
                  <span
                    key={tag}
                    className="glass-subtle rounded-full px-3 py-1 text-[11px] font-semibold text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Sezione 2: Come installare un UI Template ── */}
        <section className="anim-fade-up delay-150">
          <p className="text-[11px] font-bold text-muted uppercase tracking-[0.2em] mb-6">
            {t[lang].guide.sectionInstall}
          </p>
          <div className="bg-surface border border-theme rounded-[24px] p-6 sm:p-8">
            <StepList
              steps={[
                { emoji: "🛒", title: t[lang].guide.installStep1Title, desc: t[lang].guide.installStep1Desc },
                { emoji: "🤖", title: t[lang].guide.installStep2Title, desc: t[lang].guide.installStep2Desc },
                { emoji: "📋", title: t[lang].guide.installStep3Title, desc: t[lang].guide.installStep3Desc },
                { emoji: "🚀", title: t[lang].guide.installStep4Title, desc: t[lang].guide.installStep4Desc },
              ]}
            />
          </div>
        </section>

        {/* ── Sezione 3: Come usare un Prompt Template ── */}
        <section className="anim-fade-up delay-225">
          <p className="text-[11px] font-bold text-muted uppercase tracking-[0.2em] mb-6">
            {t[lang].guide.sectionPromptUse}
          </p>
          <div className="bg-surface border border-theme rounded-[24px] p-6 sm:p-8">
            <StepList
              steps={[
                { emoji: "🛒", title: t[lang].guide.promptStep1Title, desc: t[lang].guide.promptStep1Desc },
                { emoji: "📋", title: t[lang].guide.promptStep2Title, desc: t[lang].guide.promptStep2Desc },
                { emoji: "✍️", title: t[lang].guide.promptStep3Title, desc: t[lang].guide.promptStep3Desc },
              ]}
            />
          </div>
        </section>

        {/* ── Sezione 4: Demo visiva ── */}
        <section className="anim-fade-up delay-300">
          <p className="text-[11px] font-bold text-muted uppercase tracking-[0.2em] mb-6 text-center">
            {t[lang].guide.sectionDemo}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* UI Template mock */}
            <div className="bg-surface border border-theme rounded-[24px] p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-theme">{t[lang].guide.uiTitle}</span>
                <span className="glass-subtle rounded-full px-2 py-0.5 text-[11px] font-semibold text-[#0A84FF]">HTML</span>
              </div>
              {/* Mini HTML mockup */}
              <div className="rounded-xl overflow-hidden border border-theme/50 bg-[#0F0F10]">
                {/* Fake browser bar */}
                <div className="flex items-center gap-1.5 px-3 py-2 bg-[#1C1C1E] border-b border-white/5">
                  <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                  <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                  <div className="ml-2 flex-1 h-3.5 bg-white/8 rounded-full" />
                </div>
                {/* Fake page content */}
                <div className="p-4 space-y-3">
                  {/* Fake nav */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="h-3 w-16 bg-[#0A84FF]/70 rounded-full" />
                    <div className="flex gap-2">
                      <div className="h-2.5 w-8 bg-white/15 rounded-full" />
                      <div className="h-2.5 w-8 bg-white/15 rounded-full" />
                    </div>
                  </div>
                  {/* Fake hero */}
                  <div className="rounded-lg bg-gradient-to-br from-[#0A84FF]/20 to-[#5E5CE6]/20 p-4 text-center space-y-2">
                    <div className="h-3.5 w-3/4 mx-auto bg-white/40 rounded-full" />
                    <div className="h-2.5 w-1/2 mx-auto bg-white/20 rounded-full" />
                    <div className="h-6 w-24 mx-auto bg-[#0A84FF] rounded-lg mt-2" />
                  </div>
                  {/* Fake cards row */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="rounded-md bg-white/5 p-2 space-y-1.5">
                        <div className="h-2 w-full bg-white/15 rounded-full" />
                        <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[12px] text-muted leading-relaxed">
                {t[lang].guide.demoUIDesc}
              </p>
            </div>

            {/* Prompt Template mock */}
            <div className="bg-surface border border-theme rounded-[24px] p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-theme">{t[lang].guide.promptTitle}</span>
                <span className="glass-subtle rounded-full px-2 py-0.5 text-[11px] font-semibold text-[#5E5CE6]">AI</span>
              </div>
              {/* macOS Notes style */}
              <div className="rounded-xl overflow-hidden border border-theme/50 bg-[#1C1C1E]">
                {/* Title bar */}
                <div className="flex items-center gap-1.5 px-3 py-2 bg-[#2C2C2E] border-b border-white/5">
                  <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                  <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                  <span className="ml-2 text-[10px] text-white/40 font-medium">Cold Email Template</span>
                </div>
                {/* Notes content */}
                <div className="bg-[#FFFEF7] p-4">
                  <p className="font-mono text-[10px] text-[#1C1C1E] leading-relaxed">
                    Sei un esperto di copywriting B2B.{" "}
                    <br />Scrivi una cold email per{" "}
                    <span className="bg-[#007AFF]/15 text-[#007AFF] rounded px-0.5 font-semibold">{"{{nome_azienda}}"}</span>
                    , che vende{" "}
                    <span className="bg-[#007AFF]/15 text-[#007AFF] rounded px-0.5 font-semibold">{"{{prodotto}}"}</span>
                    .
                    <br /><br />
                    Target:{" "}
                    <span className="bg-[#007AFF]/15 text-[#007AFF] rounded px-0.5 font-semibold">{"{{target}}"}</span>
                    <br />
                    Tono:{" "}
                    <span className="bg-[#007AFF]/15 text-[#007AFF] rounded px-0.5 font-semibold">{"{{tono}}"}</span>
                  </p>
                </div>
              </div>
              <p className="text-[12px] text-muted leading-relaxed">
                {t[lang].guide.demoPromptDesc}
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA finale ── */}
        <section className="anim-fade-up delay-300 text-center pb-8">
          <div className="bg-surface border border-theme rounded-[24px] p-8 sm:p-10 relative overflow-hidden">
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(10,132,255,0.4), transparent)" }}
            />
            <div
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(10,132,255,0.07) 0%, transparent 70%)" }}
            />
            <div className="relative">
              <p className="text-[13px] text-muted font-semibold uppercase tracking-widest mb-3">
                {t[lang].guide.ctaLabel}
              </p>
              <h2 className="text-[1.6rem] sm:text-[2rem] font-black tracking-[-0.03em] text-theme mb-3">
                {t[lang].guide.ctaTitle}
              </h2>
              <p className="text-[15px] text-muted mb-7 max-w-md mx-auto leading-relaxed">
                {t[lang].guide.ctaSubtitle}
              </p>
              <Link
                href="/#browse"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0A84FF] hover:bg-[#409CFF] text-white font-bold text-[15px] rounded-2xl ios-spring transition-all duration-200 shadow-[0_4px_20px_rgba(10,132,255,0.35)]"
              >
                {t[lang].guide.ctaBtn}
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

/* ── Step list component (internal) ── */
function StepList({
  steps,
}: {
  steps: { emoji: string; title: string; desc: string }[];
}) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          {/* Left: number + connector line */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#0A84FF]/10 text-[#0A84FF] font-black text-sm flex items-center justify-center shrink-0">
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className="w-px bg-theme flex-1 min-h-[24px] my-1 opacity-30" />
            )}
          </div>
          {/* Right: content */}
          <div className={`pb-${i < steps.length - 1 ? "6" : "0"} pt-0.5 flex-1`}
            style={{ paddingBottom: i < steps.length - 1 ? "24px" : "0" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl leading-none">{step.emoji}</span>
              <h3 className="text-[15px] font-bold text-theme">{step.title}</h3>
            </div>
            <p className="text-[13px] text-muted leading-relaxed">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

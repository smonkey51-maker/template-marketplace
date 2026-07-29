"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import SiteNav from "@/components/SiteNav";

export default function GuidePage() {
  const { lang } = useLang();
  const g = t[lang].guide;

  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-50"
          style={{ background: "radial-gradient(ellipse, var(--glow-gold) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-[40%] right-[-5%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, var(--glow-terra) 0%, transparent 70%)" }}
        />
      </div>

      <SiteNav />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-14">
        {/* ── Hero ── */}
        <section className="text-center anim-fade-up delay-0">
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              fontWeight: 400,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "20px",
            }}
          >
            {g.badge}
          </p>
          <h1
            className="text-[2rem] sm:text-[2.6rem] leading-[1.1] text-theme mb-4"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontWeight: 400,
              letterSpacing: "0.01em",
              lineHeight: 1.1,
            }}
          >
            {g.title}
          </h1>
          <p className="text-[16px] text-muted max-w-md mx-auto leading-relaxed">{g.subtitle}</p>
        </section>

        {/* ── 1. Tipi di template ── */}
        <section className="anim-fade-up delay-75">
          <SectionLabel>{g.sectionTypes}</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {/* UI Template */}
            <div className="bg-surface border border-theme r-glass p-6 flex flex-col gap-4">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ background: "var(--accent-bg)" }}
                aria-hidden
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="2"
                    y="4"
                    width="20"
                    height="14"
                    rx="2"
                    stroke="var(--accent)"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M8 18v2M16 18v2M6 20h12"
                    stroke="var(--accent)"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 8h5M6 11.5h8"
                    stroke="var(--accent)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </div>
              <div>
                <h2
                  className="text-[16px] font-semibold text-theme mb-1.5"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "18px",
                    fontWeight: 500,
                  }}
                >
                  {g.uiTitle}
                </h2>
                <p className="text-[13px] text-muted leading-relaxed">{g.uiDesc}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                {g.uiTags.map((tag: string) => (
                  <span
                    key={tag}
                    className="glass-subtle px-2.5 py-1 text-[11px] font-semibold text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Prompt Template */}
            <div className="bg-surface border border-theme r-glass p-6 flex flex-col gap-4">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ background: "var(--accent-bg)" }}
                aria-hidden
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 6h16M4 10h10M4 14h12M4 18h7"
                    stroke="var(--accent)"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <circle cx="19" cy="17" r="3.5" stroke="var(--accent)" strokeWidth="1.4" />
                  <path
                    d="M21.5 19.5l1.5 1.5"
                    stroke="var(--accent)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <h2
                  className="text-[16px] font-semibold text-theme mb-1.5"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "18px",
                    fontWeight: 500,
                  }}
                >
                  {g.promptTitle}
                </h2>
                <p className="text-[13px] text-muted leading-relaxed">{g.promptDesc}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                {g.promptTags.map((tag: string) => (
                  <span
                    key={tag}
                    className="glass-subtle px-2.5 py-1 text-[11px] font-semibold text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Il flusso ── */}
        <section className="anim-fade-up delay-150">
          <SectionLabel>{g.sectionFlow}</SectionLabel>
          <div className="mt-6 bg-surface border border-theme r-glass p-6 sm:p-8">
            <StepList
              steps={[
                { title: g.flowStep1Title, desc: g.flowStep1Desc },
                { title: g.flowStep2Title, desc: g.flowStep2Desc },
                { title: g.flowStep3Title, desc: g.flowStep3Desc },
                { title: g.flowStep4Title, desc: g.flowStep4Desc },
              ]}
            />
          </div>
        </section>

        {/* ── 3. AI Studio ── */}
        <section className="anim-fade-up delay-150">
          <SectionLabel>{g.sectionStudio}</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {/* Personalizza */}
            <div className="bg-surface border border-theme r-glass p-6 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[15px] font-bold text-theme">{g.studioCustomTitle}</h3>
                <span
                  className="shrink-0 text-[10px] font-bold px-2 py-0.5 border"
                  style={{
                    color: "var(--success)",
                    borderColor: "var(--success)",
                    background: "var(--success-dim)",
                  }}
                >
                  {g.studioCustomBadge}
                </span>
              </div>
              <p className="text-[13px] text-muted leading-relaxed">{g.studioCustomDesc}</p>
            </div>

            {/* Genera */}
            <div className="bg-surface border border-theme r-glass p-6 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[15px] font-bold text-theme">{g.studioGenTitle}</h3>
                <span
                  className="shrink-0 text-[10px] font-bold px-2 py-0.5 border"
                  style={{
                    color: "var(--accent)",
                    borderColor: "var(--accent)",
                    background: "var(--accent-bg)",
                  }}
                >
                  {g.studioGenBadge}
                </span>
              </div>
              <p className="text-[13px] text-muted leading-relaxed">{g.studioGenDesc}</p>
            </div>
          </div>
        </section>

        {/* ── 4. Bundle ── */}
        <section className="anim-fade-up delay-225">
          <SectionLabel>{g.sectionBundles}</SectionLabel>
          <div className="mt-6 bg-surface border border-theme r-glass p-6 flex flex-col sm:flex-row sm:items-center gap-5">
            <div
              className="w-10 h-10 shrink-0 flex items-center justify-center"
              style={{ background: "var(--accent-bg)" }}
              aria-hidden
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="8"
                  width="18"
                  height="13"
                  rx="1"
                  stroke="var(--accent)"
                  strokeWidth="1.7"
                />
                <path
                  d="M8 8V6a4 4 0 018 0v2"
                  stroke="var(--accent)"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <path
                  d="M9 13h6M9 16h4"
                  stroke="var(--accent)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[15px] font-bold text-theme">{g.bundleTitle}</h3>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 border"
                  style={{
                    color: "var(--terra)",
                    borderColor: "var(--terra)",
                    background: "var(--terra-dim)",
                  }}
                >
                  {g.bundleBadge}
                </span>
              </div>
              <p className="text-[13px] text-muted leading-relaxed">{g.bundleDesc}</p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="anim-fade-up delay-300 text-center pb-8">
          <div className="bg-surface border border-theme r-glass p-8 sm:p-10 relative overflow-hidden">
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, var(--accent-muted), transparent)",
              }}
            />
            <div
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, var(--glow-gold) 0%, transparent 70%)",
              }}
            />
            <div className="relative">
              <p className="text-[11px] font-bold text-muted uppercase tracking-[0.2em] mb-3">
                {g.ctaLabel}
              </p>
              <h2
                className="text-[1.6rem] sm:text-[2rem] text-theme mb-3"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                  lineHeight: 1.1,
                }}
              >
                {g.ctaTitle}
              </h2>
              <p className="text-[14px] text-muted mb-7 max-w-sm mx-auto leading-relaxed">
                {g.ctaSubtitle}
              </p>
              <Link href="/#browse" className="btn-brand" style={{ padding: "14px 32px" }}>
                {g.ctaBtn}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ── Sezione label ── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-normal uppercase tracking-[0.18em]"
      style={{ fontFamily: "monospace", color: "var(--accent)" }}
    >
      {children}
    </p>
  );
}

/* ── Step list ── */
function StepList({ steps }: { steps: { title: string; desc: string }[] }) {
  return (
    <div className="flex flex-col">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center shrink-0">
            <div
              className="w-7 h-7 text-[12px] font-black flex items-center justify-center shrink-0"
              style={{ background: "var(--accent-bg)", color: "var(--accent)" }}
            >
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div
                className="w-px flex-1 min-h-[20px] my-1"
                style={{ background: "var(--border)" }}
              />
            )}
          </div>
          <div
            className="flex-1 pt-0.5"
            style={{ paddingBottom: i < steps.length - 1 ? "20px" : "0" }}
          >
            <h3 className="text-[14px] font-bold text-theme mb-0.5">{step.title}</h3>
            <p className="text-[13px] text-muted leading-relaxed">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

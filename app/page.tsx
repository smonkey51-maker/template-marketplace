import Link from "next/link";
import { templates } from "@/lib/templates";
import TemplateGrid from "@/components/TemplateGrid";
import NavButtons from "@/components/NavButtons";
import StudioAccessButton from "@/components/StudioAccessButton";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-page">

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 border-b border-theme backdrop-blur-2xl bg-nav px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <span className="text-[17px] font-bold tracking-tight text-[#0A84FF] shrink-0">
            TemplateLab
          </span>

          {/* Desktop nav links */}
          <div className="hidden sm:flex items-center gap-1">
            <Link href="/studio" className="text-[14px] text-muted hover:text-theme transition-colors duration-200 px-3 py-1.5 rounded-xl hover:bg-card">
              AI Studio
            </Link>
            <Link href="/account" className="text-[14px] text-muted hover:text-theme transition-colors duration-200 px-3 py-1.5 rounded-xl hover:bg-card">
              Account
            </Link>
          </div>

          <NavButtons />
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="px-4 sm:px-6 pt-12 pb-14 sm:pt-20 sm:pb-20 text-center max-w-3xl mx-auto">
        {/* Claude badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-semibold bg-card border border-theme text-[#0A84FF] mb-6">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 100-16 8 8 0 000 16zm-1-11h2v6h-2zm0-4h2v2h-2z"/>
          </svg>
          Powered by Claude AI · Anthropic
        </div>

        <h1 className="text-[2rem] sm:text-5xl md:text-[3.5rem] font-bold leading-tight tracking-tight mb-4 text-theme">
          Template premium,{" "}
          <span className="text-[#0A84FF]">personalizzati<br className="hidden sm:inline"/> con AI</span>{" "}
          per te
        </h1>

        <p className="text-[15px] text-muted max-w-xl mx-auto mb-8 leading-relaxed">
          Acquista un template, adattalo in secondi con Claude AI.
          Cambia stili, contenuti e genera varianti — illimitatamente.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#browse"
            className="px-7 py-3.5 bg-[#0A84FF] hover:bg-[#409CFF] rounded-2xl font-bold transition-all duration-200 text-white shadow-[0_4px_20px_rgba(10,132,255,0.28)] active:scale-[0.97] ios-spring text-[15px]"
          >
            Sfoglia template →
          </a>
          <Link
            href="/studio"
            className="px-7 py-3.5 bg-card border border-theme rounded-2xl font-bold transition-all duration-200 active:scale-[0.97] ios-spring text-theme hover:border-[#0A84FF]/40 text-[15px]"
          >
            Apri AI Studio
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-[13px] text-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A84FF]" />
            {templates.length} template
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
            Claude AI
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5E5CE6]" />
            Pagamenti sicuri
          </span>
        </div>
      </section>

      {/* ── Studio Access Banner ── */}
      <section className="px-4 sm:px-6 mb-14 max-w-4xl mx-auto">
        <div className="bg-surface border border-theme rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 relative overflow-hidden shadow-sm">

          {/* Background accent — Claude-branded, not Gemini */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px] sm:rounded-[32px]">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#0A84FF]/5" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#5E5CE6]/5" />
          </div>

          <div className="relative text-center max-w-xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest bg-[#0A84FF]/10 text-[#0A84FF] border border-[#0A84FF]/20 px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A84FF] animate-pulse" />
              Studio Access
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-theme tracking-tight leading-tight">
              Genera qualsiasi template<br className="hidden sm:inline"/> con l&apos;AI
            </h2>

            <p className="text-[14px] sm:text-[15px] text-muted mb-4 leading-relaxed">
              Descrivi quello che vuoi, Claude lo costruisce in secondi.
              Componenti UI, prompt, landing page — illimitati.
            </p>

            <p className="text-[#0A84FF] font-semibold text-[16px] sm:text-[17px] mb-6">
              €9,99 / mese · Generazioni illimitate
            </p>

            <StudioAccessButton />
          </div>
        </div>
      </section>

      {/* ── Template Grid ── */}
      <TemplateGrid />
    </div>
  );
}

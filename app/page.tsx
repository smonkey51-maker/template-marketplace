import Link from "next/link";
import { templates } from "@/lib/templates";
import TemplateGrid from "@/components/TemplateGrid";
import NavButtons from "@/components/NavButtons";
import StudioAccessButton from "@/components/StudioAccessButton";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden">

      {/* ── Ambient background orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-60"
          style={{ background: "radial-gradient(ellipse, var(--glow-blue) 0%, transparent 70%)" }} />
        <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse, var(--glow-purple) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(48,209,88,0.06) 0%, transparent 70%)" }} />
      </div>

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 border-b border-theme backdrop-blur-2xl bg-nav px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <span className="text-[17px] font-bold tracking-tight text-[#0A84FF] shrink-0 select-none">
            TemplateLab
          </span>
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
      <section className="relative z-10 px-4 sm:px-6 pt-14 pb-16 sm:pt-24 sm:pb-24 text-center max-w-3xl mx-auto">

        {/* Badge */}
        <div className="anim-fade-up delay-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-semibold glass-subtle text-[#0A84FF] mb-7 select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0A84FF] opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0A84FF]" />
          </span>
          Powered by Claude AI · Anthropic
        </div>

        {/* Heading */}
        <h1 className="anim-fade-up delay-75 text-[2.1rem] sm:text-[3.2rem] md:text-[3.8rem] font-black leading-[1.08] tracking-[-0.03em] mb-5 text-theme">
          Template premium,{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #0A84FF 0%, #5E5CE6 100%)" }}
          >
            personalizzati<br />con AI
          </span>{" "}
          per te
        </h1>

        {/* Sub */}
        <p className="anim-fade-up delay-150 text-[15px] sm:text-[16px] text-muted max-w-xl mx-auto mb-9 leading-relaxed">
          Acquista un template, adattalo in secondi con Claude AI.
          Cambia stili, contenuti e genera varianti — illimitatamente.
        </p>

        {/* CTAs */}
        <div className="anim-fade-up delay-225 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#browse"
            className="relative px-7 py-3.5 bg-[#0A84FF] hover:bg-[#409CFF] rounded-2xl font-bold text-white text-[15px] btn-glow-blue active:scale-[0.96] ios-spring"
          >
            Sfoglia template →
          </a>
          <Link
            href="/studio"
            className="px-7 py-3.5 glass-subtle rounded-2xl font-bold text-[15px] text-theme hover:border-[#0A84FF]/30 active:scale-[0.96] ios-spring transition-all duration-300"
          >
            Apri AI Studio
          </Link>
        </div>

        {/* Stats */}
        <div className="anim-fade-up delay-300 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-9 text-[13px] text-muted">
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
      <section className="relative z-10 px-4 sm:px-6 mb-16 max-w-5xl mx-auto anim-fade-up delay-400">
        <div className="relative bg-surface border border-theme rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 overflow-hidden shadow-[0_2px_40px_rgba(0,0,0,0.08)]">

          {/* Inner glow top */}
          <div className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(10,132,255,0.4), transparent)" }} />

          {/* Background glow blob */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(10,132,255,0.08) 0%, transparent 70%)" }} />

          <div className="relative text-center max-w-xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest bg-[#0A84FF]/10 text-[#0A84FF] border border-[#0A84FF]/20 px-3 py-1 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A84FF] animate-pulse" />
              Studio Access
            </span>

            <h2 className="text-[1.6rem] sm:text-[2rem] md:text-[2.5rem] font-black tracking-[-0.03em] mb-3 text-theme leading-tight">
              Genera qualsiasi template<br className="hidden sm:inline" /> con l&apos;AI
            </h2>

            <p className="text-[14px] sm:text-[15px] text-muted mb-4 leading-relaxed">
              Descrivi quello che vuoi, Claude lo costruisce in secondi.
              Componenti UI, prompt, landing page — illimitati.
            </p>

            <p className="font-bold text-[16px] sm:text-[17px] mb-6"
              style={{ background: "linear-gradient(135deg, #0A84FF, #5E5CE6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              €9,99 / mese · Generazioni illimitate
            </p>

            <StudioAccessButton />
          </div>
        </div>
      </section>

      {/* ── Template Grid ── */}
      <div className="relative z-10">
        <TemplateGrid />
      </div>
    </div>
  );
}

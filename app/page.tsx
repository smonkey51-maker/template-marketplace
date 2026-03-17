import Link from "next/link";
import { templates } from "@/lib/templates";
import TemplateGrid from "@/components/TemplateGrid";
import NavButtons from "@/components/NavButtons";
import StudioAccessButton from "@/components/StudioAccessButton";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-page relative">

      {/* Nav — iOS liquid glass */}
      <nav className="sticky top-0 z-50 border-b border-theme backdrop-blur-2xl bg-nav px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-[#0A84FF]">
            TemplateLab
          </span>
          <div className="flex items-center gap-4">
            <Link href="/studio" className="text-[15px] text-muted hover:text-theme transition-all duration-300">
              AI Studio
            </Link>
            <Link href="/account" className="text-[15px] text-muted hover:text-theme transition-all duration-300">
              Account
            </Link>
            <NavButtons />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 py-20 px-6 text-center max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-medium bg-card border border-theme text-[#0A84FF] mb-6">
          ⚡ Powered by Claude AI
        </span>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-5 text-theme">
          Template premium,{" "}
          <span className="text-[#0A84FF]">personalizzati con AI</span>{" "}
          per te
        </h1>
        <p className="text-[15px] text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
          Acquista un template, poi adattalo istantaneamente con l&apos;AI. Cambia stili,
          contenuti, genera varianti — in pochi secondi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#browse"
            className="px-8 py-3.5 bg-[#0A84FF] hover:bg-[#409CFF] rounded-2xl font-bold transition-all duration-200 text-white shadow-[0_4px_20px_rgba(10,132,255,0.3)] active:scale-[0.97] ios-spring"
          >
            Sfoglia template →
          </a>
          <Link
            href="/studio"
            className="px-8 py-3.5 bg-card border border-theme rounded-2xl font-bold transition-all duration-200 active:scale-[0.97] ios-spring text-theme hover:bg-[rgba(10,132,255,0.08)]"
          >
            Apri AI Studio
          </Link>
        </div>
        <div className="flex items-center justify-center gap-8 mt-10 text-[13px] text-muted">
          <span>⚡ {templates.length}+ templates</span>
          <span>🤖 Claude AI</span>
          <span>💳 Pagamenti sicuri</span>
        </div>
      </section>

      {/* Studio Access Banner */}
      <section className="relative z-10 px-6 mb-16 max-w-5xl mx-auto">
        <div className="bg-surface border border-theme rounded-[32px] p-10 text-center relative overflow-hidden shadow-sm">
          <div className="absolute -top-4 -right-4 text-[10rem] leading-none text-muted/10 select-none pointer-events-none font-bold">
            ✦
          </div>
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest bg-[#0A84FF]/10 text-[#0A84FF] border border-[#0A84FF]/20 px-3 py-1 rounded-full mb-4">
            Studio Access
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-theme tracking-tight">
            Genera qualsiasi template con l&apos;AI
          </h2>
          <p className="text-[15px] text-muted mb-4 max-w-xl mx-auto leading-relaxed">
            Descrivi quello che vuoi, Claude lo crea in secondi. Componenti UI, prompt, landing page — illimitati.
          </p>
          <p className="text-[#0A84FF] font-semibold text-[17px] mb-6">
            €9,99 / mese · Generazioni illimitate
          </p>
          <StudioAccessButton />
        </div>
      </section>

      {/* Template Grid */}
      <div className="relative z-10">
        <TemplateGrid />
      </div>
    </div>
  );
}

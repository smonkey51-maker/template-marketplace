import Link from "next/link";
import { templates } from "@/lib/templates";
import TemplateGrid from "@/components/TemplateGrid";
import NavButtons from "@/components/NavButtons";
import StudioAccessButton from "@/components/StudioAccessButton";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-orange-950/10 relative">
      {/* Background blobs for depth */}
      <div
        className="fixed top-0 left-0 w-96 h-96 bg-orange-500/15 blur-3xl rounded-full pointer-events-none z-0"
        style={{ transform: "translate(-30%, -30%)" }}
      />
      <div
        className="fixed top-0 right-0 w-80 h-80 bg-amber-400/10 blur-3xl rounded-full pointer-events-none z-0"
        style={{ transform: "translate(30%, -30%)" }}
      />
      <div
        className="fixed bottom-0 left-1/2 w-72 h-72 bg-violet-500/10 blur-3xl rounded-full pointer-events-none z-0"
        style={{ transform: "translate(-50%, 30%)" }}
      />

      {/* Nav — liquid glass */}
      <nav className="sticky top-0 z-50 border-b border-white/8 backdrop-blur-2xl bg-gray-950/60 px-6 py-4 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            TemplateLab
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/studio"
              className="text-sm text-gray-400 hover:text-white transition-all duration-300"
            >
              AI Studio
            </Link>
            <NavButtons />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 py-20 px-6 text-center max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-white/8 backdrop-blur-sm border border-white/15 text-orange-300 mb-6">
          ⚡ Powered by Claude AI
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-5">
          Template premium,{" "}
          <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            personalizzati con AI
          </span>{" "}
          per te
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Acquista un template, poi adattalo istantaneamente con l&apos;AI. Cambia stili,
          contenuti, genera varianti — in pochi secondi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#browse"
            className="px-8 py-3.5 bg-orange-500 hover:bg-orange-400 rounded-2xl font-bold transition-all duration-200 text-white shadow-lg shadow-orange-500/25"
          >
            Sfoglia template →
          </a>
          <Link
            href="/studio"
            className="px-8 py-3.5 bg-white/8 backdrop-blur-sm hover:bg-white/15 border border-white/15 rounded-2xl font-bold transition-all duration-200"
          >
            Apri AI Studio
          </Link>
        </div>
        <div className="flex items-center justify-center gap-8 mt-10 text-sm text-gray-600">
          <span>⚡ {templates.length}+ templates</span>
          <span>🤖 Claude AI</span>
          <span>💳 Acquisto unico</span>
        </div>
      </section>

      {/* Studio Access Banner */}
      <section className="relative z-10 px-6 mb-16 max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-orange-400/20 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent backdrop-blur-2xl p-10 text-center shadow-2xl shadow-orange-950/20">
          {/* Decorative background character */}
          <div className="absolute -top-4 -right-4 text-[12rem] leading-none text-orange-500/5 select-none pointer-events-none font-bold">
            ✦
          </div>

          <span className="inline-block text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-400/30 px-3 py-1 rounded-full mb-4">
            ⚡ Studio Access
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-white">
            Genera qualsiasi template con l&apos;AI
          </h2>

          <p className="text-gray-300 mb-4 max-w-xl mx-auto">
            Descrivi quello che vuoi, Claude lo crea in secondi. Componenti UI, prompt, landing page — illimitati.
          </p>

          <p className="text-amber-300 font-semibold text-base mb-6">
            €9,99 / mese · Disdici quando vuoi
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

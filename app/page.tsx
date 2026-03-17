import Link from "next/link";
import { templates } from "@/lib/templates";
import TemplateGrid from "@/components/TemplateGrid";
import NavButtons from "@/components/NavButtons";
import StudioAccessButton from "@/components/StudioAccessButton";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-orange-950/10">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-xl font-extrabold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            TemplateLab
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/studio"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              AI Studio
            </Link>
            <NavButtons />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300 border border-orange-500/30 mb-6">
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
            className="px-7 py-3 bg-orange-500 hover:bg-orange-400 rounded-xl font-semibold transition text-white"
          >
            Sfoglia template →
          </a>
          <Link
            href="/studio"
            className="px-7 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition"
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

      {/* Studio Access Banner — prominent, above template grid */}
      <section className="px-6 mb-16 max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-orange-500/30 bg-gradient-to-br from-amber-950 via-orange-950 to-red-950 p-10 text-center shadow-2xl shadow-orange-950/40">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 pointer-events-none" />

          <span className="inline-block text-xs font-bold bg-orange-500/30 text-orange-300 border border-orange-400/40 px-3 py-1 rounded-full mb-4">
            🔥 Offerta limitata
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-white">
            Genera template illimitati con AI
          </h2>

          <p className="text-gray-300 mb-2 max-w-xl mx-auto">
            Descrivi quello che vuoi e Claude lo crea per te — componenti UI, prompt template, qualsiasi cosa.
          </p>

          <p className="text-amber-300 font-bold text-lg mb-2">
            Acquisto unico · Generazioni illimitate
          </p>

          <p className="text-2xl font-extrabold text-white mb-6">
            Solo <span className="text-yellow-400">$29.00</span>
          </p>

          <StudioAccessButton />

          <p className="text-xs text-gray-500 mt-4">
            Nessun abbonamento · Accesso permanente · Garanzia soddisfatti o rimborsati
          </p>
        </div>
      </section>

      {/* Template Grid (client — fetches purchases, renders cards with modal) */}
      <TemplateGrid />
    </div>
  );
}

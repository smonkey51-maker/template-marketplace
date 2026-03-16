import Link from "next/link";
import { templates } from "@/lib/templates";
import TemplateCard from "@/components/TemplateCard";
import NavButtons from "@/components/NavButtons";

export default function MarketplacePage() {
  const uiTemplates = templates.filter((t) => t.category === "ui");
  const promptTemplates = templates.filter((t) => t.category === "prompt");

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-xl font-extrabold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
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
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/20 text-violet-300 border border-violet-500/30 mb-6">
          ✨ Powered by Claude AI
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-5">
          Premium templates,{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            AI-customized
          </span>{" "}
          for you
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Buy any template, then instantly adapt it with AI. Change styles,
          swap content, generate new variations — in seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/studio"
            className="px-7 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold transition"
          >
            Open AI Studio →
          </Link>
          <a
            href="#browse"
            className="px-7 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition"
          >
            Browse templates
          </a>
        </div>
        <div className="flex items-center justify-center gap-8 mt-10 text-sm text-gray-600">
          <span>⚡ {templates.length}+ templates</span>
          <span>🤖 Claude Opus 4.6</span>
          <span>💳 One-time purchase</span>
        </div>
      </section>

      {/* UI Templates */}
      <section id="browse" className="px-6 pb-16 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            UI Templates{" "}
            <span className="text-sm font-normal text-gray-500 ml-2">
              HTML + Tailwind CSS
            </span>
          </h2>
          <span className="text-sm text-gray-500">
            {uiTemplates.length} templates
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uiTemplates.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      </section>

      {/* Prompt Templates */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Prompt Templates{" "}
            <span className="text-sm font-normal text-gray-500 ml-2">
              Works with any LLM
            </span>
          </h2>
          <span className="text-sm text-gray-500">
            {promptTemplates.length} templates
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promptTemplates.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-6 mb-24 rounded-3xl bg-gradient-to-br from-violet-900 to-indigo-900 border border-violet-500/30 p-12 text-center max-w-4xl lg:mx-auto">
        <h2 className="text-3xl font-bold mb-3">
          Don't see what you need?
        </h2>
        <p className="text-gray-300 mb-6">
          Use the AI Studio to generate a brand-new template from scratch —
          just describe what you want.
        </p>
        <Link
          href="/studio"
          className="inline-block px-8 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-white/90 transition"
        >
          Generate a template →
        </Link>
      </section>
    </div>
  );
}

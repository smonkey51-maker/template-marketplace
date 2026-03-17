import Link from "next/link";

export default function GuidePage() {
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

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 border-b border-theme backdrop-blur-2xl bg-nav px-4 sm:px-6 py-3.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* Back */}
          <Link
            href="/"
            className="flex items-center gap-1 text-[#0A84FF] text-[15px] font-medium hover:opacity-70 transition-opacity ios-spring shrink-0"
          >
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" className="shrink-0">
              <path
                d="M8 1L1.5 7.5L8 14"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline">Marketplace</span>
          </Link>

          <span className="text-[13px] text-muted font-semibold uppercase tracking-widest">Guida</span>

          <div className="w-9" />{/* spacer per centrare il titolo */}
        </div>
      </nav>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-16">

        {/* ── Hero ── */}
        <section className="text-center anim-fade-up delay-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-semibold glass-subtle text-[#0A84FF] mb-6 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A84FF]" />
            Come funziona
          </div>
          <h1 className="text-[2rem] sm:text-[2.8rem] font-black tracking-[-0.03em] leading-[1.1] text-theme mb-4">
            Come usare TemplateLab
          </h1>
          <p className="text-[16px] sm:text-[18px] text-muted max-w-lg mx-auto leading-relaxed">
            Dalla scelta all&apos;utilizzo in pochi minuti.
          </p>
        </section>

        {/* ── Sezione 1: Due tipi di template ── */}
        <section className="anim-fade-up delay-75">
          <p className="text-[11px] font-bold text-muted uppercase tracking-[0.2em] mb-6 text-center">
            I due tipi di template
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* UI Template */}
            <div className="bg-surface border border-theme rounded-[24px] p-6 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A84FF]/10 flex items-center justify-center text-2xl">
                🖼️
              </div>
              <div>
                <h2 className="text-[18px] font-bold text-theme mb-2">UI Template</h2>
                <p className="text-[14px] text-muted leading-relaxed">
                  Pagine HTML complete, pronte da copiare e incollare nel tuo progetto. Ogni template è
                  realizzato con Tailwind CSS e personalizzabile in secondi con l&apos;AI Studio.
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
              <div className="w-12 h-12 rounded-2xl bg-[#5E5CE6]/10 flex items-center justify-center text-2xl">
                📝
              </div>
              <div>
                <h2 className="text-[18px] font-bold text-theme mb-2">Prompt Template</h2>
                <p className="text-[14px] text-muted leading-relaxed">
                  Testi strutturati pronti per l&apos;uso con qualsiasi AI. Basta copiarli, compilare i
                  campi e ottenere risultati professionali in secondi.
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
            Come installare un UI Template
          </p>
          <div className="bg-surface border border-theme rounded-[24px] p-6 sm:p-8">
            <StepList
              steps={[
                { emoji: "🛒", title: "Acquista il template", desc: "Scegli il template che ti serve dal marketplace e acquistalo in un click con pagamento sicuro Stripe." },
                { emoji: "🤖", title: "Aprilo in AI Studio e personalizzalo", desc: "Accedi all'AI Studio incluso nell'acquisto. Descrivi in italiano i colori, testi e stile che vuoi — Claude li applica in secondi." },
                { emoji: "📋", title: "Copia il codice HTML generato", desc: "Con un click copi l'intero codice HTML personalizzato negli appunti. Pronto all'uso." },
                { emoji: "🚀", title: "Incollalo nel tuo progetto", desc: "Funziona con qualsiasi framework (React, Next.js, Vue, Svelte) o anche in HTML puro. Zero dipendenze." },
              ]}
            />
          </div>
        </section>

        {/* ── Sezione 3: Come usare un Prompt Template ── */}
        <section className="anim-fade-up delay-225">
          <p className="text-[11px] font-bold text-muted uppercase tracking-[0.2em] mb-6">
            Come usare un Prompt Template
          </p>
          <div className="bg-surface border border-theme rounded-[24px] p-6 sm:p-8">
            <StepList
              steps={[
                { emoji: "🛒", title: "Acquista il prompt", desc: "Ogni prompt è ottimizzato per un caso d'uso specifico: copywriting, SEO, email, assistenti AI e molto altro." },
                { emoji: "📋", title: "Copialo e incollalo nella tua AI preferita", desc: "Funziona con Claude, ChatGPT, Gemini o qualsiasi altra AI. Basta incollarlo nella chat." },
                { emoji: "✍️", title: "Compila i tuoi dati", desc: "Sostituisci i campi {{placeholder}} con le tue informazioni specifiche e ottieni un risultato professionale su misura." },
              ]}
            />
          </div>
        </section>

        {/* ── Sezione 4: Demo visiva ── */}
        <section className="anim-fade-up delay-300">
          <p className="text-[11px] font-bold text-muted uppercase tracking-[0.2em] mb-6 text-center">
            Come appaiono i template
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* UI Template mock */}
            <div className="bg-surface border border-theme rounded-[24px] p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-theme">UI Template</span>
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
                Pagina HTML completa con navbar, hero e sezioni. Pronta da personalizzare con AI Studio.
              </p>
            </div>

            {/* Prompt Template mock */}
            <div className="bg-surface border border-theme rounded-[24px] p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-theme">Prompt Template</span>
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
                I campi{" "}
                <span className="text-[#0A84FF] font-semibold font-mono text-[11px]">{"{{placeholder}}"}</span>{" "}
                si compilano con le tue informazioni per un risultato su misura.
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
                Inizia ora
              </p>
              <h2 className="text-[1.6rem] sm:text-[2rem] font-black tracking-[-0.03em] text-theme mb-3">
                Pronto a usare TemplateLab?
              </h2>
              <p className="text-[15px] text-muted mb-7 max-w-md mx-auto leading-relaxed">
                Sfoglia i template, scegli quello che fa per te e personalizzalo in secondi con AI.
              </p>
              <Link
                href="/#browse"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0A84FF] hover:bg-[#409CFF] text-white font-bold text-[15px] rounded-2xl ios-spring transition-all duration-200 shadow-[0_4px_20px_rgba(10,132,255,0.35)]"
              >
                Sfoglia i template →
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

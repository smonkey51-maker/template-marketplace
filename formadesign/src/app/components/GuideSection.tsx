export default function GuideSection() {
  const steps = [
    {
      number: "01",
      title: "Scegli",
      description: "Naviga il catalogo e seleziona il template perfetto per il tuo progetto.",
      icon: "🎨",
    },
    {
      number: "02",
      title: "Personalizza",
      description: "Usa Claude AI per modificare colori, testi e layout in tempo reale.",
      icon: "✨",
    },
    {
      number: "03",
      title: "Esporta",
      description: "Scarica il codice pronto per la produzione con un click.",
      icon: "🚀",
    },
  ];

  return (
    <div className="relative h-full flex flex-col items-center justify-center px-4 py-20">
      <div className="anim-in relative z-10 w-full max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-[#7ec8a0]/20 border border-[#7ec8a0]/30 mb-4">
            <span className="text-xs uppercase tracking-wider text-[#7ec8a0]">Come Funziona</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">Guida Rapida</h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Tre semplici passi per trasformare le tue idee in realtà
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="anim-up relative backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-[#7ec8a0]/50 transition-all"
              style={{
                animationDelay: `${index * 0.15}s`,
              }}
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#7ec8a0] to-[#5fa87f] flex items-center justify-center text-black font-bold shadow-lg">
                {step.number}
              </div>

              <div className="text-5xl mb-6 mt-4">{step.icon}</div>

              <h3 className="text-2xl mb-4">{step.title}</h3>
              <p className="opacity-70 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#studio"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block px-8 py-3 rounded-full bg-[#7ec8a0] text-black font-semibold hover:shadow-lg hover:shadow-[rgba(126,200,160,0.4)] transition-all hover:-translate-y-1"
          >
            Prova l'AI Studio →
          </a>
        </div>
      </div>

      {/* Section counter */}
      <div className="absolute top-8 right-8 text-sm opacity-30">03 / 05</div>

      {/* Oversized background text */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[12vw] font-bold opacity-5 pointer-events-none whitespace-nowrap"
        style={{ WebkitTextStroke: "2px currentColor", color: "transparent" }}
      >
        GUIDA
      </div>
    </div>
  );
}

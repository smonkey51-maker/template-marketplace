"use client";

export default function GuideSection() {
  const steps = [
    {
      number: "01",
      title: "Scegli",
      description: "Sfoglia il catalogo e seleziona il template perfetto per te",
      icon: "🔍",
    },
    {
      number: "02",
      title: "Personalizza",
      description: "Adatta il design alle tue esigenze con Studio AI",
      icon: "✨",
    },
    {
      number: "03",
      title: "Pubblica",
      description: "Scarica e metti online il tuo progetto in pochi minuti",
      icon: "🚀",
    },
  ];

  return (
    <div className="relative px-6 py-20 flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-8 right-8 text-[#D4AF37] font-bold text-lg tracking-wider">
        03 / 05
      </div>

      <div className="anim-in text-center mb-16">
        <h2
          className="text-5xl md:text-7xl font-bold mb-4 text-[#eaeaea]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Come Funziona
        </h2>
        <p
          className="text-xl text-[#8a8a8a] max-w-2xl mx-auto"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          Tre semplici passi verso il tuo progetto perfetto
        </p>
      </div>

      <div className="anim-up grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative"
            style={{ "--delay": `${0.2 + index * 0.15}s` } as any}
          >
            <div className="bg-[#0f0f0f] border-2 border-[#D4AF37] rounded-sm p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-6xl mb-6">{step.icon}</div>
              <div className="text-[#D4AF37] font-black text-5xl mb-4 opacity-30">
                {step.number}
              </div>
              <h3
                className="text-2xl font-bold mb-4 text-[#eaeaea]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {step.title}
              </h3>
              <p
                className="text-[#8a8a8a]"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {step.description}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent" />
            )}
          </div>
        ))}
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#D4AF37]/30 pointer-events-none text-[12rem] font-black leading-none"
        style={{
          fontFamily: "Montserrat, sans-serif",
          WebkitTextStroke: "2px rgba(212, 175, 55, 0.2)",
          WebkitTextFillColor: "transparent",
        }}
      >
        GUIDA
      </div>
    </div>
  );
}

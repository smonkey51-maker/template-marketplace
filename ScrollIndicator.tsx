"use client";

export default function CatalogSection() {
  return (
    <div className="relative px-6 py-20 flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-8 right-8 text-[#D4AF37] font-bold text-lg tracking-wider">
        02 / 05
      </div>

      <div className="anim-in text-center mb-16">
        <h2
          className="text-5xl md:text-7xl font-bold mb-4 text-[#eaeaea]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Catalogo
        </h2>
        <p
          className="text-xl text-[#8a8a8a] max-w-2xl mx-auto"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          Esplora la nostra collezione di template premium
        </p>
      </div>

      <div
        className="anim-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full"
        style={{ "--delay": "0.2s" } as any}
      >
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="bg-[#0f0f0f] border border-[#D4AF37]/20 rounded-sm overflow-hidden hover:border-[#D4AF37] transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="aspect-video bg-gradient-to-br from-[#D4AF37]/20 to-[#B8962E]/20 flex items-center justify-center">
              <span className="text-6xl">🎨</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-[#eaeaea]">
                Template #{n}
              </h3>
              <p className="text-[#8a8a8a] text-sm mb-4">
                Design moderno e responsive
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[#D4AF37] font-bold text-lg">€12.99</span>
                <button className="px-4 py-2 bg-[#D4AF37] text-[#060606] font-bold text-sm rounded-sm hover:bg-[#B8962E] transition-colors">
                  Dettagli
                </button>
              </div>
            </div>
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
        CATALOGO
      </div>
    </div>
  );
}

"use client";

import { FormaLogoAnimated } from "./FormaLogo";

export default function HeroSection() {
  return (
    <div className="relative px-6 py-20 flex flex-col items-center justify-center min-h-screen text-center">
      <div className="absolute top-8 right-8 text-[#D4AF37] font-bold text-lg tracking-wider">
        01 / 05
      </div>

      <div className="anim-in mb-12 w-full max-w-3xl">
        <FormaLogoAnimated className="w-full h-auto" />
      </div>

      <h1
        className="anim-up text-5xl md:text-7xl lg:text-8xl font-light italic mb-6 text-[#eaeaea]"
        style={{
          fontFamily: "Cormorant Garamond, serif",
          letterSpacing: "0.02em",
          lineHeight: 1.1,
        }}
      >
        Arte in tasca
      </h1>

      <p
        className="anim-up text-xl md:text-2xl text-[#8a8a8a] max-w-2xl mb-12"
        style={{ fontFamily: "Plus Jakarta Sans, sans-serif", "--delay": "0.2s" } as any}
      >
        Template UI premium per trasformare le tue idee in capolavori digitali
      </p>

      <div
        className="anim-up flex flex-wrap gap-4 justify-center"
        style={{ "--delay": "0.4s" } as any}
      >
        <a
          href="#catalogo"
          className="px-8 py-4 bg-gradient-to-br from-[#D4AF37] to-[#B8962E] text-[#060606] font-bold rounded-sm hover:scale-105 transition-transform duration-300"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Esplora Template
        </a>
        <a
          href="#studio"
          className="px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-sm hover:bg-[#D4AF37]/10 transition-colors duration-300"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Studio AI
        </a>
      </div>

      <div
        className="anim-up mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full"
        style={{ "--delay": "0.6s" } as any}
      >
        <div className="bg-[#0f0f0f] p-6 rounded-sm border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-colors">
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="text-xl font-bold mb-2 text-[#D4AF37]">Design Premium</h3>
          <p className="text-[#8a8a8a] text-sm">
            Template curati con estetica raffinata e attenzione ai dettagli
          </p>
        </div>

        <div className="bg-[#0f0f0f] p-6 rounded-sm border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-colors">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-bold mb-2 text-[#D4AF37]">Pronti all'uso</h3>
          <p className="text-[#8a8a8a] text-sm">
            Scarica, personalizza e pubblica in pochi minuti
          </p>
        </div>

        <div className="bg-[#0f0f0f] p-6 rounded-sm border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-colors">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-bold mb-2 text-[#D4AF37]">AI Studio</h3>
          <p className="text-[#8a8a8a] text-sm">
            Genera e personalizza template con Claude AI
          </p>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#D4AF37]/30 pointer-events-none text-[12rem] font-black leading-none"
        style={{
          fontFamily: "Montserrat, sans-serif",
          WebkitTextStroke: "2px rgba(212, 175, 55, 0.2)",
          WebkitTextFillColor: "transparent",
        }}
      >
        FORMA
      </div>
    </div>
  );
}

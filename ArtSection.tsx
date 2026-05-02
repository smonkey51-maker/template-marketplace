"use client";

import { useState } from "react";

export default function StudioSection() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="relative px-6 py-20 flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-8 right-8 text-[#D4AF37] font-bold text-lg tracking-wider">
        04 / 05
      </div>

      <div className="anim-in text-center mb-16">
        <h2
          className="text-5xl md:text-7xl font-bold mb-4 text-[#eaeaea]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Studio AI
        </h2>
        <p
          className="text-xl text-[#8a8a8a] max-w-2xl mx-auto"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          Genera e personalizza template con l'intelligenza artificiale
        </p>
      </div>

      <div className="anim-up max-w-4xl w-full" style={{ "--delay": "0.2s" } as any}>
        <div className="bg-[#0f0f0f] border border-[#D4AF37]/20 rounded-sm p-8">
          <label
            htmlFor="ai-prompt"
            className="block text-[#eaeaea] font-bold mb-4 text-lg"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Descrivi il tuo template ideale
          </label>
          <textarea
            id="ai-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Es: Una landing page moderna per un'agenzia creativa con hero video, sezione servizi e portfolio..."
            className="w-full h-40 bg-[#060606] border border-[#D4AF37]/30 rounded-sm p-4 text-[#eaeaea] placeholder-[#8a8a8a] focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          />
          <div className="flex gap-4 mt-6">
            <button className="flex-1 px-6 py-4 bg-gradient-to-br from-[#D4AF37] to-[#B8962E] text-[#060606] font-bold rounded-sm hover:scale-105 transition-transform duration-300">
              Genera Template
            </button>
            <button className="px-6 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-sm hover:bg-[#D4AF37]/10 transition-colors">
              Esempi
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-[#0f0f0f] border border-[#D4AF37]/20 rounded-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚡</span>
              <h3 className="text-lg font-bold text-[#eaeaea]">Generazione Rapida</h3>
            </div>
            <p className="text-[#8a8a8a] text-sm">
              Template pronti in secondi con Claude AI
            </p>
          </div>

          <div className="bg-[#0f0f0f] border border-[#D4AF37]/20 rounded-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🎨</span>
              <h3 className="text-lg font-bold text-[#eaeaea]">Personalizzazione</h3>
            </div>
            <p className="text-[#8a8a8a] text-sm">
              Modifica colori, layout e contenuti in tempo reale
            </p>
          </div>
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
        STUDIO
      </div>
    </div>
  );
}

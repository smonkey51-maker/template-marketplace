import { useEffect, useState } from "react";
import { FormaLogoAnimated } from "./FormaLogo";

export default function HeroSection() {
  return (
    <div className="relative h-full flex flex-col items-center justify-center px-4 py-20">
      <div className="anim-in max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <FormaLogoAnimated className="w-full max-w-2xl mx-auto" />
        </div>

        <h2
          className="text-4xl md:text-5xl mb-6 italic"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            color: "#eaeaea",
          }}
        >
          Arte in tasca
        </h2>

        <p className="text-lg md:text-xl mb-12 opacity-70 max-w-2xl mx-auto">
          Template professionali pronti all'uso, personalizzabili in pochi secondi con Claude AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#catalogo"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8962E] text-black font-semibold hover:shadow-lg hover:shadow-[rgba(212,175,55,0.4)] transition-all hover:-translate-y-1"
          >
            Esplora il Catalogo →
          </a>
          <a
            href="#guida"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("guida")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all"
          >
            Come Funziona
          </a>
        </div>
      </div>

      {/* Floating mockup cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { x: "10%", y: "20%", rotate: -8, delay: 0 },
          { x: "75%", y: "15%", rotate: 12, delay: 0.2 },
          { x: "15%", y: "70%", rotate: 6, delay: 0.4 },
        ].map((card, i) => (
          <div
            key={i}
            className="anim-up absolute w-48 h-64 rounded-2xl border-2 border-[#D4AF37]/30 bg-black/40 backdrop-blur-sm"
            style={{
              left: card.x,
              top: card.y,
              transform: `rotate(${card.rotate}deg)`,
              animationDelay: `${card.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Section counter */}
      <div className="absolute top-8 right-8 text-sm opacity-30">01 / 05</div>
    </div>
  );
}
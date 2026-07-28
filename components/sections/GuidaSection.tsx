"use client";

import ArtSection from "@/components/ArtSection";
import Link from "next/link";

const MONET_ACCENT = "#7ec8a0";

const STEPS = [
  { n: "01", title: "Scegli il template", desc: "Esplora il catalogo e trova il formato adatto al tuo progetto." },
  { n: "02", title: "Personalizza con AI", desc: "Descrivi le modifiche che vuoi: Claude le applica in secondi." },
  { n: "03", title: "Esporta e usa", desc: "Scarica il file pronto e integralo dove vuoi." },
];

export default function GuidaSection() {
  return (
    <ArtSection id="guida" className="relative overflow-hidden flex flex-col items-center justify-center" aria-label="Sezione 3 di 5: Guida">

      {/* Painting background — Monet, Le Bassin aux Nymphéas */}
      <div
        className="anim-bg absolute inset-0"
        style={{
          zIndex: 0,
          backgroundColor: "#162216",
          backgroundImage: "url('/paintings/monet.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay */}
      <div className="anim-bg absolute inset-0" style={{ zIndex: 1, background: "rgba(6,12,8,0.74)", "--delay": "0.05s" } as React.CSSProperties} />

      {/* Green shimmer */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: "radial-gradient(ellipse 100% 50% at 50% 85%, rgba(60,120,70,0.20), transparent)" }} aria-hidden />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 sm:px-12 max-w-2xl w-full pt-20 pb-14">

        <p className="anim-up text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: MONET_ACCENT, letterSpacing: "0.16em", "--delay": "0.1s" } as React.CSSProperties}>
          Guida
        </p>

        <h2
          className="anim-up mb-3"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 300, fontStyle: "italic", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", "--delay": "0.2s" } as React.CSSProperties}
        >
          Ogni template è un punto di partenza.
        </h2>

        <p className="anim-up text-white/60 text-sm sm:text-base leading-relaxed max-w-[38ch] mb-8" style={{ "--delay": "0.32s" } as React.CSSProperties}>
          In tre passi trasformi un file in qualcosa di tuo.
        </p>

        {/* Steps grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className="forma-glass-card anim-up"
              style={{
                padding: "24px 24px 26px",
                textAlign: "left",
                "--delay": `${0.44 + i * 0.08}s`,
              } as React.CSSProperties}
            >
              <span className="text-xs font-black tracking-widest" style={{ color: MONET_ACCENT }}>{step.n}</span>
              <p className="text-white text-sm font-semibold mt-3 mb-2" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>{step.title}</p>
              <p className="text-white/55 text-xs leading-loose" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>{step.desc}</p>
            </div>
          ))}
        </div>

        <Link
          href="/guida"
          className="anim-up inline-block text-sm font-semibold tracking-wider transition-opacity duration-200 hover:opacity-100"
          style={{ color: MONET_ACCENT, borderBottom: `1px solid ${MONET_ACCENT}`, paddingBottom: "2px", textDecoration: "none", "--delay": "0.56s" } as React.CSSProperties}
        >
          Leggi la guida completa →
        </Link>
      </div>

      {/* GUIDA oversized */}
      <div className="anim-in absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 6, "--delay": "0.5s" } as React.CSSProperties} aria-hidden>
        <span style={{ display: "block", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "clamp(5rem, 18vw, 16rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.85, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.08)", textTransform: "uppercase", paddingLeft: "0.15em" }}>
          GUIDA
        </span>
      </div>

      <div className="absolute top-20 right-6 sm:right-8 font-montserrat text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", zIndex: 10 }} aria-hidden>
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>03</span><span className="mx-1 opacity-40">/</span><span>05</span>
      </div>
    </ArtSection>
  );
}

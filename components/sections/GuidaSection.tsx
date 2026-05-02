"use client";

import ArtSection from "@/components/ArtSection";
import Image from "next/image";
import Link from "next/link";

const MONET_ACCENT = "#7a9e60";
const SECTION_BG_FALLBACK = "#1e2d3b";

export default function GuidaSection() {
  return (
    <ArtSection
      id="guida"
      className="relative overflow-hidden"
      aria-label="Sezione 3 di 5: Guida"
    >
      {/* SVG filter for Monet ripple */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden>
        <defs>
          <filter id="monet-ripple" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.025" numOctaves="3" seed="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Painting background */}
      <div className="anim-bg absolute inset-0" style={{ zIndex: 0, background: SECTION_BG_FALLBACK }}>
        <Image src="/paintings/monet.jpg" alt="" fill sizes="100vw" className="object-cover object-center" loading="lazy" aria-hidden onError={() => {}} />
      </div>

      {/* Dark overlay */}
      <div className="anim-bg absolute inset-0" style={{ zIndex: 1, background: "rgba(10,18,26,0.65)", "--delay": "0.05s" } as React.CSSProperties} />

      {/* Parallax layer 0 — deep water shimmer */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: "radial-gradient(ellipse 120% 60% at 50% 80%, rgba(74,103,65,0.18), transparent)" }} aria-hidden />

      {/* Parallax layer 1 — lily pad clip-path */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block" style={{ zIndex: 3, background: "radial-gradient(ellipse 80% 40% at 30% 70%, rgba(74,103,65,0.22), transparent)", clipPath: "ellipse(60% 30% at 30% 75%)" }} aria-hidden />

      {/* Feature image — Monet ripple filtered */}
      <div
        className="anim-in absolute hidden lg:block pointer-events-none"
        style={{ right: "8%", top: "50%", transform: "translateY(-50%)", width: "480px", height: "320px", zIndex: 4, filter: "url(#monet-ripple)", borderRadius: "2px", overflow: "hidden", "--delay": "0.4s" } as React.CSSProperties}
        aria-hidden
      >
        <div style={{ width: "100%", height: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="text-white/20 text-sm font-light tracking-widest uppercase">Guida all&apos;uso</span>
        </div>
      </div>

      {/* Reflection sheen */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none hidden lg:block" style={{ zIndex: 5, height: "30%", background: "linear-gradient(to top, rgba(74,103,65,0.15), transparent)" }} aria-hidden />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-6 sm:px-10 lg:px-16 pt-20 pb-12 lg:pb-16 max-w-lg">
        <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: MONET_ACCENT, letterSpacing: "0.14em" }}>
          Guida
        </p>

        <h2
          className="anim-up text-white font-light leading-snug mb-4"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em", "--delay": "0.2s" } as React.CSSProperties}
        >
          Ogni template è un punto di partenza.
        </h2>

        <p className="anim-up text-white/65 text-sm sm:text-base leading-relaxed max-w-[32ch]" style={{ "--delay": "0.32s" } as React.CSSProperties}>
          La guida ti mostra come usarli, personalizzarli e renderli tuoi — in pochi minuti.
        </p>

        <Link
          href="/guida"
          className="anim-up inline-block mt-6 text-sm font-semibold tracking-wider transition-opacity duration-200 hover:opacity-100"
          style={{ color: MONET_ACCENT, borderBottom: `1px solid ${MONET_ACCENT}`, paddingBottom: "2px", textDecoration: "none", width: "fit-content", "--delay": "0.44s" } as React.CSSProperties}
        >
          Inizia il percorso →
        </Link>

        {/* Content card */}
        <div
          className="anim-up mt-8 hidden sm:block"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", padding: "16px", borderRadius: "2px", backdropFilter: "blur(6px)", maxWidth: "280px", "--delay": "0.56s" } as React.CSSProperties}
        >
          <p className="text-white/50 text-[11px] font-semibold tracking-widest uppercase mb-2">In questa guida</p>
          {["Scegli il template", "Personalizza con AI", "Esporta e usa"].map((step, i) => (
            <div key={step} className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold" style={{ color: MONET_ACCENT }}>0{i + 1}</span>
              <span className="text-white/60 text-xs">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* GUIDA oversized typography */}
      <div className="anim-in absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 6, "--delay": "0.5s" } as React.CSSProperties} aria-hidden>
        <span style={{ display: "block", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "clamp(5rem, 18vw, 16rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.85, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.10)", textTransform: "uppercase", paddingLeft: "0.15em" }}>
          GUIDA
        </span>
      </div>

      {/* Counter */}
      <div className="absolute top-20 right-6 sm:right-8 font-montserrat text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", zIndex: 10 }} aria-hidden>
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>03</span>
        <span className="mx-1 opacity-40">/</span>
        <span>05</span>
      </div>
    </ArtSection>
  );
}

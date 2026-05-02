"use client";

import ArtSection from "@/components/ArtSection";
import Image from "next/image";
import Link from "next/link";

const K = {
  yellow:  "#F5C519",
  red:     "#CF2B3A",
  blue:    "#1B4B8A",
  violet:  "#6B3FA0",
  black:   "#1C1C1C",
  cream:   "#F2EBD9",
};

const SECTION_BG_FALLBACK = "#0d1520";

export default function StudioSection() {
  return (
    <ArtSection
      id="studio"
      className="relative overflow-hidden"
      aria-label="Sezione 4 di 5: Studio"
    >
      {/* Painting background */}
      <div className="anim-bg absolute inset-0" style={{ zIndex: 0, background: SECTION_BG_FALLBACK }}>
        <Image src="/paintings/kandinsky.jpg" alt="" fill sizes="100vw" className="object-cover object-center" loading="lazy" aria-hidden onError={() => {}} />
      </div>
      <div className="anim-bg absolute inset-0" style={{ zIndex: 1, background: "rgba(8,12,22,0.72)", "--delay": "0.05s" } as React.CSSProperties} />

      {/* Kandinsky SVG composition — static */}
      <div className="anim-in absolute inset-0 pointer-events-none" style={{ zIndex: 2, "--delay": "0.25s" } as React.CSSProperties}>
        <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <polygon points="200,120 260,40 320,120" fill={K.yellow} opacity="0.85" />
          <g>
            <circle cx="700" cy="150" r="60" fill="none" stroke={K.blue} strokeWidth="3" />
            <circle cx="700" cy="150" r="40" fill="none" stroke={K.blue} strokeWidth="2" opacity="0.7" />
            <circle cx="700" cy="150" r="20" fill={K.blue} opacity="0.4" />
          </g>
          <g>
            <circle cx="550" cy="450" r="35" fill="none" stroke={K.red} strokeWidth="2" />
            <circle cx="550" cy="450" r="18" fill={K.red} opacity="0.3" />
          </g>
          <path d="M 100 480 L 400 120" stroke={K.black} strokeWidth="18" strokeLinecap="round" fill="none" opacity="0.8" />
          <circle cx="820" cy="420" r="45" fill={K.violet} opacity="0.8" />
          <path d="M 400 80 L 850 200" stroke="rgba(242,235,217,0.4)" strokeWidth="1.5" fill="none" />
          <g opacity="0.6">
            {[0, 1, 2, 3].flatMap((row) =>
              [0, 1, 2, 3].map((col) =>
                (row + col) % 2 === 0 ? (
                  <rect key={`${row}-${col}`} x={120 + col * 16} y={320 + row * 16} width="14" height="14" fill="rgba(242,235,217,0.25)" />
                ) : null
              )
            )}
          </g>
          <path d="M 600 500 Q 750 380 880 480" stroke={K.yellow} strokeWidth="2.5" fill="none" opacity="0.6" />
        </svg>
      </div>

      {/* UI panel */}
      <div className="anim-up absolute right-6 sm:right-10 lg:right-16 top-1/2 -translate-y-1/2" style={{ zIndex: 8, width: "min(340px, 90vw)", "--delay": "0.35s" } as React.CSSProperties}>
        <div className="studio-ui-sidebar absolute -left-6 top-0 bottom-0 hidden lg:flex flex-col items-center gap-2 py-4" style={{ width: "4px", background: "rgba(28,28,28,0.8)", borderRadius: "2px" }} />

        <div className="flex items-center gap-2 mb-3">
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(107,63,160,0.35)", border: "1px solid rgba(107,63,160,0.6)" }} />
          <span className="text-white/50 text-xs font-semibold tracking-wider">AI Studio</span>
        </div>

        {/* Pseudo-textarea */}
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "2px", padding: "12px 14px", marginBottom: "10px", minHeight: "72px", backdropFilter: "blur(8px)" }}>
          <span className="text-white/35 text-sm font-light" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>
            Genera un template per…
          </span>
        </div>

        <Link
          href="/ai-studio"
          className="block w-full text-center py-3 px-4 text-sm font-bold tracking-wider uppercase transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{ background: K.yellow, color: K.black, borderRadius: "2px", letterSpacing: "0.12em", textDecoration: "none", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          Genera template
        </Link>

        <div className="grid grid-cols-3 gap-1.5 mt-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ aspectRatio: "1", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1px" }} />
          ))}
        </div>
      </div>

      {/* Left content */}
      <div className="relative z-10 flex flex-col h-full px-6 sm:px-10 lg:px-16 pt-20 pb-12 max-w-xs sm:max-w-sm">
        <p className="anim-up text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: K.yellow, letterSpacing: "0.14em", "--delay": "0.2s" } as React.CSSProperties}>
          AI Studio
        </p>
        <h2 className="anim-up text-white font-light leading-snug mb-4" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em", "--delay": "0.3s" } as React.CSSProperties}>
          L&apos;astrazione che diventa forma.
        </h2>
        <p className="anim-up text-white/60 text-sm leading-relaxed max-w-[32ch]" style={{ "--delay": "0.4s" } as React.CSSProperties}>
          Descrivi ciò che vuoi creare.<br />Claude genera il template in secondi.
        </p>
      </div>

      {/* STUDIO oversized typography */}
      <div className="anim-in absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 6, "--delay": "0.5s" } as React.CSSProperties} aria-hidden>
        <span style={{ display: "block", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "clamp(5rem, 18vw, 16rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.85, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.10)", textTransform: "uppercase", paddingLeft: "0.15em" }}>
          STUDIO
        </span>
      </div>

      {/* Counter */}
      <div className="absolute top-20 right-6 sm:right-8 font-montserrat text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", zIndex: 10 }} aria-hidden>
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>04</span>
        <span className="mx-1 opacity-40">/</span>
        <span>05</span>
      </div>
    </ArtSection>
  );
}

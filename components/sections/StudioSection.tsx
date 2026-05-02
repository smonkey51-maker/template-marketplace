"use client";

import ArtSection from "@/components/ArtSection";
import Link from "next/link";

const K = { yellow: "#F5C519", red: "#CF2B3A", blue: "#1B4B8A", violet: "#6B3FA0", black: "#1C1C1C", cream: "#F2EBD9" };

export default function StudioSection() {
  return (
    <ArtSection id="studio" className="relative overflow-hidden" aria-label="Sezione 4 di 5: Studio">

      {/* Painting background — Kandinsky, Yellow-Red-Blue */}
      <div
        className="anim-bg absolute inset-0"
        style={{
          zIndex: 0,
          backgroundColor: "#0d1520",
          backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/a/ae/Vassily_Kandinsky%2C_1925_-_Yellow-Red-Blue.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="anim-bg absolute inset-0" style={{ zIndex: 1, background: "rgba(8,12,22,0.78)", "--delay": "0.05s" } as React.CSSProperties} />

      {/* Kandinsky SVG overlay */}
      <div className="anim-in absolute inset-0 pointer-events-none" style={{ zIndex: 2, "--delay": "0.25s" } as React.CSSProperties}>
        <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <polygon points="200,120 260,40 320,120" fill={K.yellow} opacity="0.7" />
          <g><circle cx="700" cy="150" r="60" fill="none" stroke={K.blue} strokeWidth="3" /><circle cx="700" cy="150" r="40" fill="none" stroke={K.blue} strokeWidth="2" opacity="0.7" /><circle cx="700" cy="150" r="20" fill={K.blue} opacity="0.35" /></g>
          <g><circle cx="550" cy="450" r="35" fill="none" stroke={K.red} strokeWidth="2" /><circle cx="550" cy="450" r="18" fill={K.red} opacity="0.25" /></g>
          <path d="M 100 480 L 400 120" stroke={K.black} strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.6" />
          <circle cx="820" cy="420" r="45" fill={K.violet} opacity="0.65" />
          <path d="M 400 80 L 850 200" stroke="rgba(242,235,217,0.3)" strokeWidth="1.5" fill="none" />
          <g opacity="0.5">{[0,1,2,3].flatMap(r=>[0,1,2,3].map(c=>(r+c)%2===0?<rect key={`${r}-${c}`} x={120+c*16} y={320+r*16} width="14" height="14" fill="rgba(242,235,217,0.3)" />:null))}</g>
          <path d="M 600 500 Q 750 380 880 480" stroke={K.yellow} strokeWidth="2.5" fill="none" opacity="0.5" />
        </svg>
      </div>

      {/* UI panel */}
      <div className="anim-up absolute right-6 sm:right-10 lg:right-20 top-1/2 -translate-y-1/2" style={{ zIndex: 8, width: "min(340px, 88vw)", "--delay": "0.35s" } as React.CSSProperties}>
        <div className="flex items-center gap-3 mb-4">
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(107,63,160,0.4)", border: "1px solid rgba(107,63,160,0.65)", backdropFilter: "blur(8px)" }} />
          <span className="text-white/50 text-xs font-semibold tracking-wider" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>AI Studio</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "2px", padding: "14px 16px", marginBottom: "12px", minHeight: "72px", backdropFilter: "blur(14px)" }}>
          <span className="text-white/30 text-sm font-light" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>Genera un template per…</span>
        </div>
        <Link href="/ai-studio" className="block w-full text-center py-3.5 px-4 text-sm font-bold tracking-wider uppercase hover:opacity-90 transition-opacity"
          style={{ background: K.yellow, color: K.black, borderRadius: "2px", letterSpacing: "0.12em", textDecoration: "none", minHeight: "46px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          Genera template
        </Link>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ aspectRatio: "1", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "2px", backdropFilter: "blur(8px)" }} />
          ))}
        </div>
      </div>

      {/* Left content */}
      <div className="relative z-10 flex flex-col h-full px-8 sm:px-14 lg:px-20 pt-24 pb-14 max-w-xs sm:max-w-sm">
        <p className="anim-up text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: K.yellow, letterSpacing: "0.16em", "--delay": "0.2s" } as React.CSSProperties}>AI Studio</p>
        <h2 className="anim-up text-white font-light leading-snug mb-5" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.9rem, 4vw, 3.2rem)", letterSpacing: "-0.02em", "--delay": "0.3s" } as React.CSSProperties}>
          L&apos;astrazione che diventa forma.
        </h2>
        <p className="anim-up text-white/55 text-sm leading-loose max-w-[32ch]" style={{ fontFamily: "var(--font-jakarta), sans-serif", "--delay": "0.4s" } as React.CSSProperties}>
          Descrivi ciò che vuoi creare.<br />Claude genera il template in secondi.
        </p>
      </div>

      {/* STUDIO oversized */}
      <div className="anim-in absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 6, "--delay": "0.5s" } as React.CSSProperties} aria-hidden>
        <span style={{ display: "block", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "clamp(5rem, 18vw, 16rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.85, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.10)", textTransform: "uppercase", paddingLeft: "0.15em" }}>
          STUDIO
        </span>
      </div>

      <div className="absolute top-20 right-6 sm:right-8 font-montserrat text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", zIndex: 10 }} aria-hidden>
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>04</span><span className="mx-1 opacity-40">/</span><span>05</span>
      </div>
    </ArtSection>
  );
}

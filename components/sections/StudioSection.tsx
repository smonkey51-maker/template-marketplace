"use client";

import ArtSection from "@/components/ArtSection";
import Link from "next/link";

const K = { yellow: "#F5C519", red: "#CF2B3A", blue: "#1B4B8A", violet: "#6B3FA0", black: "#1C1C1C", cream: "#F2EBD9" };

export default function StudioSection() {
  return (
    <ArtSection id="studio" className="relative overflow-hidden flex flex-col items-center justify-center" aria-label="Sezione 4 di 5: Studio">

      {/* Painting background — Kandinsky, Yellow-Red-Blue */}
      <div
        className="anim-bg absolute inset-0"
        style={{
          zIndex: 0,
          backgroundColor: "#0d1520",
          backgroundImage: "url('/paintings/kandinsky.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="anim-bg absolute inset-0" style={{ zIndex: 1, background: "rgba(8,12,22,0.78)", "--delay": "0.05s" } as React.CSSProperties} />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 sm:px-12 max-w-2xl w-full pt-20 pb-14">
        <p className="anim-up text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: K.yellow, letterSpacing: "0.16em", "--delay": "0.2s" } as React.CSSProperties}>AI Studio</p>
        <h2 className="anim-up mb-3" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 300, fontStyle: "italic", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", "--delay": "0.3s" } as React.CSSProperties}>
          L&apos;astrazione che diventa forma.
        </h2>
        <p className="anim-up text-white/60 text-sm sm:text-base leading-relaxed max-w-[38ch] mb-8" style={{ "--delay": "0.4s" } as React.CSSProperties}>
          Descrivi ciò che vuoi creare. Claude genera il template in secondi.
        </p>

        <Link
          href="/ai-studio"
          className="anim-up inline-block text-sm font-semibold tracking-wider"
          style={{ color: K.yellow, borderBottom: `1px solid ${K.yellow}`, paddingBottom: "2px", textDecoration: "none", "--delay": "0.5s" } as React.CSSProperties}
        >
          Prova l&apos;AI Studio →
        </Link>
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

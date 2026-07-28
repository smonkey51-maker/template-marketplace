"use client";

import ArtSection from "@/components/ArtSection";
import Link from "next/link";

const SUN = { yellow: "#F5C519", amber: "#E8900A", brown: "#3D1C00", stem: "#3a6a2a", cream: "#F2EBD9" };


export default function AccountSection() {
  return (
    <ArtSection id="account" className="relative overflow-hidden flex flex-col items-center justify-center" aria-label="Sezione 5 di 5: Account">

      {/* Painting background — Van Gogh, Sunflowers */}
      <div
        className="anim-bg absolute inset-0"
        style={{
          zIndex: 0,
          backgroundColor: "#1a1205",
          backgroundImage: "url('/paintings/vangogh.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      <div className="anim-bg absolute inset-0" style={{ zIndex: 1, background: "rgba(12,8,3,0.72)", "--delay": "0.05s" } as React.CSSProperties} />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 sm:px-12 max-w-2xl w-full pt-20 pb-14">
        <p className="anim-up text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: SUN.yellow, letterSpacing: "0.16em", "--delay": "0.2s" } as React.CSSProperties}>Account</p>
        <h2 className="anim-up mb-3" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 300, fontStyle: "italic", color: SUN.cream, lineHeight: 1.1, letterSpacing: "-0.02em", "--delay": "0.3s" } as React.CSSProperties}>
          La tua collezione,<br />sempre con te.
        </h2>
        <p className="anim-up text-white/60 text-sm sm:text-base leading-relaxed max-w-[38ch] mb-8" style={{ fontFamily: "var(--font-jakarta), sans-serif", "--delay": "0.4s" } as React.CSSProperties}>
          Accedi per vedere i tuoi acquisti e personalizzare ogni template con AI Studio.
        </p>

        {/* Stat pill — glassmorphism */}
        <div className="forma-glass-card anim-up flex items-baseline gap-3 mb-8 px-6 py-4"
          style={{ borderRadius: "999px", "--delay": "0.48s" } as React.CSSProperties}>
          <span style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "2.8rem", fontWeight: 900, color: SUN.yellow, lineHeight: 1 }}>47</span>
          <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-jakarta), sans-serif" }}>template nel catalogo</span>
        </div>

        <Link href="/account" className="anim-up inline-block text-sm font-semibold tracking-wider hover:opacity-100 transition-opacity"
          style={{ color: SUN.yellow, borderBottom: `1px solid ${SUN.yellow}`, paddingBottom: "3px", textDecoration: "none", letterSpacing: "0.08em", "--delay": "0.56s" } as React.CSSProperties}>
          Accedi al tuo account →
        </Link>
      </div>

      {/* ACCOUNT oversized */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 6 }} aria-hidden>
        <span style={{ display: "block", fontFamily: "var(--font-syne), sans-serif", fontSize: "clamp(4rem, 15vw, 13rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.85, color: "transparent", WebkitTextStroke: "1px rgba(245,197,25,0.12)", textTransform: "uppercase", paddingLeft: "0.15em" }}>
          ACCOUNT
        </span>
      </div>

      <div className="absolute top-20 right-6 sm:right-8 font-montserrat text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", zIndex: 10 }} aria-hidden>
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>05</span><span className="mx-1 opacity-40">/</span><span>05</span>
      </div>
    </ArtSection>
  );
}

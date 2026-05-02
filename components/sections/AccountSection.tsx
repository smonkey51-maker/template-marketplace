"use client";

import ArtSection from "@/components/ArtSection";
import Link from "next/link";

const SUN = { yellow: "#F5C519", amber: "#E8900A", brown: "#3D1C00", stem: "#3a6a2a", cream: "#F2EBD9" };

const PETALS = Array.from({ length: 16 }, (_, i) => ({ id: i, angle: (i / 16) * 360 }));
const PETALS_SM = Array.from({ length: 12 }, (_, i) => ({ id: i, angle: (i / 12) * 360 }));

export default function AccountSection() {
  return (
    <ArtSection id="account" className="relative overflow-hidden" aria-label="Sezione 5 di 5: Account">

      {/* Painting background — Van Gogh, Sunflowers */}
      <div
        className="anim-bg absolute inset-0"
        style={{
          zIndex: 0,
          backgroundColor: "#1a1205",
          backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/4/46/Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      <div className="anim-bg absolute inset-0" style={{ zIndex: 1, background: "rgba(12,8,3,0.72)", "--delay": "0.05s" } as React.CSSProperties} />

      {/* Van Gogh SVG — sunflowers botanical */}
      <div className="anim-in absolute inset-0 pointer-events-none" style={{ zIndex: 2, "--delay": "0.3s" } as React.CSSProperties}>
        <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" aria-hidden>
          {/* Large sunflower — top right */}
          <g transform="translate(820, 155)">
            {PETALS.map((p) => (
              <path key={p.id} d="M 0 0 Q -10 -26 0 -54 Q 10 -26 0 0" fill={SUN.yellow} transform={`rotate(${p.angle})`} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }} />
            ))}
            <circle cx="0" cy="0" r="26" fill={SUN.brown} />
            <circle cx="0" cy="0" r="18" fill="#5C2A00" opacity="0.55" />
          </g>
          {/* Stem — large flower */}
          <path d="M 820 208 C 812 320 795 430 804 560" stroke={SUN.stem} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.55" />
          {/* Leaf 1 */}
          <path d="M 815 295 C 770 265 690 278 650 308" stroke={SUN.stem} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.45" />
          {/* Leaf 2 */}
          <path d="M 806 390 C 860 360 920 370 950 395" stroke={SUN.stem} strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.35" />
          {/* Small sunflower — mid right */}
          <g transform="translate(672, 385)">
            {PETALS_SM.map((p) => (
              <path key={p.id} d="M 0 0 Q -7 -18 0 -36 Q 7 -18 0 0" fill={SUN.amber} transform={`rotate(${p.angle})`} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }} />
            ))}
            <circle cx="0" cy="0" r="15" fill={SUN.brown} />
          </g>
          {/* Pollen scatter */}
          {[0,1,2,3,4].map((i) => (
            <circle key={i} cx={760 + i * 18} cy={150 + (i % 3) * 14} r={2 + (i % 2)} fill={SUN.yellow} opacity="0.45" />
          ))}
        </svg>
      </div>

      {/* Warm glow — sunflower */}
      <div className="anim-in absolute pointer-events-none hidden lg:block" style={{ zIndex: 3, width: "90px", height: "90px", borderRadius: "50%", background: SUN.yellow, right: "17%", top: "20%", boxShadow: "0 0 140px 40px rgba(245,197,25,0.35)", "--delay": "0.45s" } as React.CSSProperties} aria-hidden />
      <div className="anim-in absolute inset-0 pointer-events-none lg:hidden" style={{ zIndex: 3, background: "radial-gradient(ellipse 60% 40% at 78% 24%, rgba(245,197,25,0.25), transparent)", "--delay": "0.45s" } as React.CSSProperties} aria-hidden />

      {/* Left content */}
      <div className="relative z-10 flex flex-col h-full px-8 sm:px-14 lg:px-20 pt-24 pb-14 max-w-sm lg:max-w-md">
        <p className="anim-up text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: SUN.yellow, letterSpacing: "0.16em", "--delay": "0.2s" } as React.CSSProperties}>Account</p>
        <h2 className="anim-up mb-5" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.9rem, 4vw, 3.4rem)", fontWeight: 300, fontStyle: "italic", color: SUN.cream, lineHeight: 1.08, letterSpacing: "-0.02em", "--delay": "0.3s" } as React.CSSProperties}>
          La tua collezione,<br />sempre con te.
        </h2>
        <p className="anim-up text-white/55 text-sm leading-loose max-w-[30ch] mb-8" style={{ fontFamily: "var(--font-jakarta), sans-serif", "--delay": "0.4s" } as React.CSSProperties}>
          Accedi per vedere i tuoi acquisti e personalizzare ogni template con AI Studio.
        </p>

        {/* Stat pill — glassmorphism */}
        <div className="anim-up flex items-baseline gap-3 mb-8 w-fit px-5 py-3"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.13)", backdropFilter: "blur(10px)", "--delay": "0.48s" } as React.CSSProperties}>
          <span style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "2.8rem", fontWeight: 900, color: SUN.yellow, lineHeight: 1 }}>47</span>
          <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-jakarta), sans-serif" }}>template nel catalogo</span>
        </div>

        <Link href="/account" className="anim-up inline-block text-sm font-semibold tracking-wider hover:opacity-100 transition-opacity"
          style={{ color: SUN.yellow, borderBottom: `1px solid ${SUN.yellow}`, paddingBottom: "3px", textDecoration: "none", width: "fit-content", letterSpacing: "0.08em", "--delay": "0.56s" } as React.CSSProperties}>
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

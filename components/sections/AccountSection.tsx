"use client";

import ArtSection from "@/components/ArtSection";
import Link from "next/link";

const VG = { ultramarine: "#1d2951", gold: "#f6b93b", cream: "#F2EBD9", starWhite: "rgba(255,245,200,0.9)" };

const STARS = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const r = 120 + (i % 3) * 40;
  return { id: i, cx: 700 + Math.cos(angle) * r, cy: 300 + Math.sin(angle) * r * 0.6, size: 3 + (i % 4) * 1.5 };
});

const PETALS = Array.from({ length: 12 }, (_, i) => ({ id: i, angle: (i / 12) * 360 }));

export default function AccountSection() {
  return (
    <ArtSection id="account" className="relative overflow-hidden" aria-label="Sezione 5 di 5: Account">

      {/* Painting background — Van Gogh, Starry Night */}
      <div
        className="anim-bg absolute inset-0"
        style={{
          zIndex: 0,
          backgroundColor: VG.ultramarine,
          backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      <div className="anim-bg absolute inset-0" style={{ zIndex: 1, background: "rgba(15,18,45,0.72)", "--delay": "0.05s" } as React.CSSProperties} />

      {/* Van Gogh SVG — stars + sunflower */}
      <div className="anim-in absolute inset-0 pointer-events-none" style={{ zIndex: 2, "--delay": "0.3s" } as React.CSSProperties}>
        <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <path d="M 500 300 Q 620 180 760 250 Q 880 320 850 450 Q 820 560 680 540 Q 540 520 500 400" fill="none" stroke={VG.gold} strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
          <path d="M 500 300 Q 380 200 260 280 Q 150 360 170 490 Q 190 590 340 580 Q 470 570 500 450" fill="none" stroke="rgba(255,245,200,0.25)" strokeWidth="1" strokeLinecap="round" />
          {STARS.map((s) => (
            <circle key={s.id} cx={s.cx} cy={s.cy} r={s.size} fill={VG.starWhite} opacity="0.85" />
          ))}
          <g transform="translate(800, 180)">
            {PETALS.map((p) => (
              <path key={p.id} d="M 0 0 Q -8 -20 0 -42 Q 8 -20 0 0" fill={VG.gold} transform={`rotate(${p.angle})`} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }} />
            ))}
            <circle cx="0" cy="0" r="18" fill="#5C3A00" />
          </g>
        </svg>
      </div>

      {/* Gold glow */}
      <div className="anim-in absolute pointer-events-none hidden lg:block" style={{ zIndex: 3, width: "80px", height: "80px", borderRadius: "50%", background: VG.gold, right: "18%", top: "24%", boxShadow: "0 0 120px 30px rgba(246,185,59,0.45)", "--delay": "0.45s" } as React.CSSProperties} aria-hidden />
      <div className="anim-in absolute inset-0 pointer-events-none lg:hidden" style={{ zIndex: 3, background: "radial-gradient(ellipse 60% 40% at 80% 25%, rgba(246,185,59,0.30), transparent)", "--delay": "0.45s" } as React.CSSProperties} aria-hidden />

      {/* Left content */}
      <div className="relative z-10 flex flex-col h-full px-6 sm:px-10 lg:px-16 pt-20 pb-12 max-w-sm">
        <p className="anim-up text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: VG.gold, letterSpacing: "0.14em", "--delay": "0.2s" } as React.CSSProperties}>Account</p>
        <h2 className="anim-up mb-4" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 300, fontStyle: "italic", color: VG.cream, lineHeight: 1.1, letterSpacing: "-0.02em", "--delay": "0.3s" } as React.CSSProperties}>
          La tua collezione,<br />sempre con te.
        </h2>
        <p className="anim-up text-white/60 text-sm leading-relaxed max-w-[30ch] mb-2" style={{ "--delay": "0.4s" } as React.CSSProperties}>
          Accedi per vedere i tuoi acquisti e personalizzare ogni template con AI Studio.
        </p>
        <div className="anim-up flex items-baseline gap-2 mb-6" style={{ "--delay": "0.48s" } as React.CSSProperties}>
          <span className="font-montserrat text-4xl font-black" style={{ color: VG.gold, lineHeight: 1 }}>47</span>
          <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>template nel catalogo</span>
        </div>
        <Link href="/account" className="anim-up inline-block text-sm font-semibold tracking-wider hover:opacity-100 transition-opacity"
          style={{ color: VG.gold, borderBottom: `1px solid ${VG.gold}`, paddingBottom: "2px", textDecoration: "none", width: "fit-content", "--delay": "0.56s" } as React.CSSProperties}>
          Accedi al tuo account →
        </Link>
      </div>

      {/* ACCOUNT oversized */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 6 }} aria-hidden>
        <span style={{ display: "block", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "clamp(4rem, 15vw, 13rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.85, color: "transparent", WebkitTextStroke: "1px rgba(246,185,59,0.14)", textTransform: "uppercase", paddingLeft: "0.15em" }}>
          ACCOUNT
        </span>
      </div>

      {/* Social — bottom left, visibili sempre */}
      <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-10 lg:left-16 flex items-center gap-4" style={{ zIndex: 10 }}>
        {[
          { href: "https://twitter.com", label: "Twitter", icon: "M4 4l7.5 7.5L4 18h2.5l5.5-6.5L17 18h3l-7.5-8 7.5-8H17l-5.5 6-5-6H4z" },
          { href: "https://instagram.com", label: "Instagram" },
        ].map(({ href, label, icon }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            className="flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-100"
            style={{ color: "rgba(255,255,255,0.50)" }}>
            <svg width="15" height="15" viewBox="0 0 22 22" fill="none" aria-hidden>
              {icon ? (
                <path d={icon} stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <><rect x="3" y="3" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.5" /><circle cx="11" cy="11" r="3.5" stroke="currentColor" strokeWidth="1.5" /><circle cx="16" cy="6" r="0.75" fill="currentColor" /></>
              )}
            </svg>
            <span className="text-[10px] font-semibold tracking-widest uppercase hidden sm:inline" style={{ letterSpacing: "0.12em" }}>{label}</span>
          </a>
        ))}
      </div>

      <div className="absolute top-20 right-6 sm:right-8 font-montserrat text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", zIndex: 10 }} aria-hidden>
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>05</span><span className="mx-1 opacity-40">/</span><span>05</span>
      </div>
    </ArtSection>
  );
}

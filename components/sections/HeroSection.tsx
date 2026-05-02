"use client";

import ArtSection from "@/components/ArtSection";
import { FormaLogoAnimated } from "@/components/FormaLogo";
import Link from "next/link";

function MockCard({
  rotate,
  x,
  y,
  width,
  label,
  accent,
  lines,
  className = "",
}: {
  rotate: number;
  x: string;
  y: string;
  width: number;
  label: string;
  accent: string;
  lines: number[];
  className?: string;
}) {
  return (
    <div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        left: x,
        top: y,
        width,
        transform: `rotate(${rotate}deg)`,
        filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.65)) drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
      }}
      aria-hidden
    >
      <div style={{ background: "rgba(20,18,15,0.95)", border: "1px solid rgba(212,175,55,0.18)", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ height: "22px", background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "5px", padding: "0 8px" }}>
          {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
            <span key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
          <span style={{ flex: 1, height: "10px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", marginLeft: "6px" }} />
        </div>
        <div style={{ height: "38px", background: accent, opacity: 0.9, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "8px", fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(0,0,0,0.65)", textTransform: "uppercase" }}>
            {label}
          </span>
        </div>
        <div style={{ padding: "8px", background: "rgba(12,11,9,0.95)" }}>
          {lines.map((w, i) => (
            <div key={i} style={{ height: "5px", width: `${w}%`, background: "rgba(255,255,255,0.08)", borderRadius: "2px", marginBottom: "4px" }} />
          ))}
          <div style={{ height: "16px", width: "42%", background: `${accent}33`, border: `1px solid ${accent}55`, borderRadius: "2px", marginTop: "6px" }} />
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <ArtSection
      id="hero"
      once
      className="relative flex flex-col items-center justify-center"
      style={{ overflow: "visible" }}
      aria-label="Sezione 1 di 5: Hero"
    >
      <div className="absolute inset-0 bg-page" style={{ zIndex: 0 }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1, background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.07), transparent)" }}
      />

      {/* Floating mockup cards */}
      <MockCard
        className="hidden lg:block anim-in"
        rotate={14} x="calc(100% - 160px)" y="6%" width={220}
        label="SaaS Hero" accent="#D4AF37" lines={[85, 60, 75]}
      />
      <MockCard
        className="hidden lg:block anim-in"
        rotate={-11} x="-60px" y="58%" width={200}
        label="Landing Page" accent="#5a8fb0" lines={[90, 55, 70]}
      />
      <MockCard
        className="hidden sm:block anim-in"
        rotate={6} x="calc(100% - 110px)" y="44%" width={180}
        label="Notion Hub" accent="#6b8e4e" lines={[80, 65, 50]}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 px-6 text-center max-w-3xl mx-auto">
        <div
          className="w-36 sm:w-48 lg:w-64 anim-up"
          style={{ "--delay": "0s" } as React.CSSProperties}
          aria-hidden
        >
          <FormaLogoAnimated className="w-full h-auto" />
        </div>

        <h1
          className="anim-up"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.8rem, 8vw, 7rem)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            "--delay": "0.15s",
          } as React.CSSProperties}
        >
          Arte in tasca.
        </h1>

        <p
          className="font-jakarta text-base sm:text-lg max-w-xs sm:max-w-sm anim-up"
          style={{ color: "var(--muted)", "--delay": "0.3s" } as React.CSSProperties}
        >
          Template, prompt e strumenti per chi crea.
        </p>

        <Link
          href="/catalogo"
          className="anim-up inline-block text-sm font-semibold tracking-widest uppercase"
          style={{
            color: "var(--accent)",
            borderBottom: "1px solid var(--accent)",
            paddingBottom: "2px",
            textDecoration: "none",
            letterSpacing: "0.14em",
            transition: "letter-spacing 0.4s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.2s",
            "--delay": "0.45s",
          } as React.CSSProperties}
        >
          Esplora il catalogo →
        </Link>
      </div>

      {/* Counter 01/05 */}
      <div
        className="anim-in absolute bottom-6 right-6 sm:bottom-8 sm:right-8 font-montserrat text-xs tracking-widest uppercase"
        style={{ color: "var(--muted)", letterSpacing: "0.12em", zIndex: 10, "--delay": "0.55s" } as React.CSSProperties}
        aria-hidden
      >
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>01</span>
        <span className="mx-1 opacity-40">/</span>
        <span>05</span>
      </div>

      {/* Social — bottom-left desktop */}
      <div
        className="hidden lg:flex absolute bottom-8 left-10 items-center gap-4 anim-in"
        style={{ zIndex: 10, "--delay": "0.6s" } as React.CSSProperties}
        aria-label="Social links"
      >
        {[
          { href: "https://twitter.com", label: "Twitter / X", path: "M4 4l7.5 7.5L4 18h2.5l5.5-6.5L17 18h3l-7.5-8 7.5-8H17l-5.5 6-5-6H4z" },
          { href: "https://instagram.com", label: "Instagram", rect: true },
        ].map(({ href, label, path, rect }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            className="transition-opacity duration-200 hover:opacity-100" style={{ color: "rgba(255,255,255,0.35)" }}>
            <svg width="16" height="16" viewBox="0 0 22 22" fill="none" aria-hidden>
              {rect ? (
                <><rect x="3" y="3" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.5" /><circle cx="11" cy="11" r="3.5" stroke="currentColor" strokeWidth="1.5" /><circle cx="16" cy="6" r="0.75" fill="currentColor" /></>
              ) : (
                <path d={path} stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </a>
        ))}
      </div>
    </ArtSection>
  );
}

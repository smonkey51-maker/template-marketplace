"use client";

import ArtSection from "@/components/ArtSection";
import { FormaLogoAnimated } from "@/components/FormaLogo";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { AmbientAura } from "@/components/AmbientAura";

export default function HeroSection() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <ArtSection
      id="hero"
      once
      className="relative flex flex-col items-center justify-center"
      aria-label="Sezione 1 di 5: Hero"
    >
      {/* Painting background — Vermeer, L'Astronomo, 1668 */}
      <div
        className="anim-bg parallax-layer absolute inset-0"
        style={{
          zIndex: 0,
          backgroundColor: "#0d0a07",
          backgroundImage: "url('/paintings/vermeer.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ zIndex: 1, background: "rgba(5,3,2,0.80)" }} />
      {/* Magic Aura (Tech/Studio) */}
      <AmbientAura color="gold" />

      {/* Main content */}
      <div
        className="relative flex flex-col items-center gap-6 sm:gap-8 px-8 text-center max-w-3xl mx-auto"
        style={{ zIndex: 3 }}
      >
        {/* FORMA — protagonist wordmark */}
        <div
          className="w-64 sm:w-[420px] lg:w-[580px] anim-up"
          style={{ "--delay": "0s" } as React.CSSProperties}
        >
          <FormaLogoAnimated className="w-full h-auto" />
        </div>

        {/* Tagline — secondary, italic */}
        <h1
          className="anim-up"
          style={
            {
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "rgba(242,235,217,0.78)",
              "--delay": "0.18s",
            } as React.CSSProperties
          }
        >
          {t.heroTagline}
        </h1>

        <p
          className="font-jakarta text-sm sm:text-base max-w-[52ch] anim-up leading-loose"
          style={{ color: "rgba(242,235,217,0.45)", "--delay": "0.32s" } as React.CSSProperties}
        >
          {t.heroSubSnap}
        </p>

        <div
          className="anim-up flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          style={{ "--delay": "0.46s" } as React.CSSProperties}
        >
          <Link
            href="/catalogo"
            className="inline-block text-sm font-semibold tracking-widest uppercase"
            style={{
              color: "var(--accent)",
              borderBottom: "1px solid var(--accent)",
              paddingBottom: "2px",
              textDecoration: "none",
              letterSpacing: "0.14em",
              transition: "letter-spacing 0.4s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.2s",
            }}
          >
            {t.heroCtaSnap}
          </Link>
          <Link
            href="/guida"
            className="inline-block text-sm font-semibold tracking-widest uppercase"
            style={{
              color: "rgba(242,235,217,0.45)",
              borderBottom: "1px solid rgba(242,235,217,0.45)",
              paddingBottom: "2px",
              textDecoration: "none",
              letterSpacing: "0.14em",
              transition:
                "letter-spacing 0.4s cubic-bezier(0.25,0.46,0.45,0.94), color 0.2s, border-color 0.2s",
            }}
          >
            {t.heroCtaGuidaSnap}
          </Link>
        </div>
      </div>

      {/* Counter 01/05 */}
      <div
        className="anim-in absolute bottom-6 right-6 sm:bottom-8 sm:right-8 font-montserrat text-xs tracking-widest uppercase"
        style={
          {
            color: "rgba(242,235,217,0.35)",
            letterSpacing: "0.12em",
            zIndex: 10,
            "--delay": "0.55s",
          } as React.CSSProperties
        }
        aria-hidden
      >
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>01</span>
        <span className="mx-1 opacity-40">/</span>
        <span>05</span>
      </div>
    </ArtSection>
  );
}

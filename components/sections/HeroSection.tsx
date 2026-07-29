"use client";

import ArtSection from "@/components/ArtSection";
import { FormaLogoAnimated } from "@/components/FormaLogo";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";

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
      <div
        style={{
          background: "rgba(20,18,15,0.95)",
          border: "1px solid rgba(212,175,55,0.18)",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "22px",
            background: "rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "0 8px",
          }}
        >
          {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
            <span
              key={c}
              style={{ width: 7, height: 7, borderRadius: "50%", background: c, opacity: 0.7 }}
            />
          ))}
          <span
            style={{
              flex: 1,
              height: "10px",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "2px",
              marginLeft: "6px",
            }}
          />
        </div>
        <div
          style={{
            height: "38px",
            background: accent,
            opacity: 0.9,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "8px",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "rgba(0,0,0,0.65)",
              textTransform: "uppercase",
            }}
          >
            {label}
          </span>
        </div>
        <div style={{ padding: "8px", background: "rgba(12,11,9,0.95)" }}>
          {lines.map((w, i) => (
            <div
              key={i}
              style={{
                height: "5px",
                width: `${w}%`,
                background: "rgba(255,255,255,0.08)",
                borderRadius: "2px",
                marginBottom: "4px",
              }}
            />
          ))}
          <div
            style={{
              height: "16px",
              width: "42%",
              background: `${accent}33`,
              border: `1px solid ${accent}55`,
              borderRadius: "2px",
              marginTop: "6px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <ArtSection
      id="hero"
      once
      className="relative flex flex-col items-center justify-center"
      style={{ overflow: "visible" }}
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
      {/* Gold radial glow — top center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "radial-gradient(ellipse 70% 50% at 50% 35%, rgba(212,175,55,0.10), transparent)",
        }}
      />

      {/* Floating mockup cards — xl only, live in outer margins at that width */}
      <MockCard
        className="hidden xl:block anim-in"
        rotate={14}
        x="calc(100% - 160px)"
        y="6%"
        width={220}
        label="SaaS Hero"
        accent="#D4AF37"
        lines={[85, 60, 75]}
      />
      <MockCard
        className="hidden xl:block anim-in"
        rotate={-11}
        x="-60px"
        y="58%"
        width={200}
        label="Landing Page"
        accent="#5a8fb0"
        lines={[90, 55, 70]}
      />
      <MockCard
        className="hidden xl:block anim-in"
        rotate={6}
        x="calc(100% - 110px)"
        y="44%"
        width={180}
        label="Notion Hub"
        accent="#6b8e4e"
        lines={[80, 65, 50]}
      />

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

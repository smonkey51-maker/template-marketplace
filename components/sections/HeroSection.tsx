"use client";

import { useCallback } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import ArtSection from "@/components/ArtSection";
import { FormaLogoAnimated } from "@/components/FormaLogo";
import Link from "next/link";

gsap.registerPlugin(SplitText, MotionPathPlugin);

// ── Floating out-of-box card mockups ────────────────────────────────────────

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
        willChange: "transform",
      }}
      aria-hidden
    >
      {/* Browser chrome */}
      <div
        style={{
          background: "rgba(20,18,15,0.95)",
          border: "1px solid rgba(212,175,55,0.18)",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        {/* Title bar */}
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
            <span key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c, opacity: 0.7 }} />
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

        {/* Hero bar */}
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

        {/* Content skeleton */}
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

// ────────────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const buildTimeline = useCallback((tl: gsap.core.Timeline, container: HTMLElement) => {
    const isDesktop = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const taglineEl = container.querySelector(".hero-tagline") as HTMLElement | null;
    const subEl = container.querySelector(".hero-sub") as HTMLElement | null;
    const logoEl = container.querySelector(".hero-logo") as HTMLElement | null;
    const counterEl = container.querySelector(".hero-counter") as HTMLElement | null;
    const ctaEl = container.querySelector(".hero-cta") as HTMLElement | null;
    const mockCards = Array.from(container.querySelectorAll(".hero-mockcard")) as HTMLElement[];

    if (reduceMotion) {
      gsap.set([taglineEl, subEl, logoEl, counterEl, ctaEl, ...mockCards].filter(Boolean), { opacity: 1, y: 0, yPercent: 0 });
      return;
    }

    if (logoEl) tl.from(logoEl, { opacity: 0, y: -20, duration: 0.8, ease: "power3.out" });

    if (taglineEl) {
      const split = new SplitText(taglineEl, { type: "lines", mask: "lines" });
      tl.from(split.lines, {
        yPercent: 100, duration: 1.1, ease: "expo.out", stagger: 0.08,
        onComplete: () => split.revert(),
      }, "-=0.4");
    }

    if (subEl) tl.from(subEl, { opacity: 0, y: 24, duration: 0.7, ease: "power3.out" }, "-=0.5");
    if (ctaEl) tl.from(ctaEl, { opacity: 0, y: 16, duration: 0.6, ease: "power2.out" }, "-=0.4");
    if (counterEl) tl.from(counterEl, { opacity: 0, x: 20, duration: 0.5, ease: "power2.out" }, "-=0.4");

    // Floating mock cards drift in from outside
    if (mockCards.length > 0) {
      tl.from(mockCards, {
        opacity: 0,
        scale: 0.88,
        y: (i) => (i % 2 === 0 ? -30 : 30),
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.12,
      }, 0.2);

      // Idle gentle float
      if (isDesktop) {
        mockCards.forEach((card, i) => {
          tl.to(card, {
            y: `+=${i % 2 === 0 ? -10 : 10}`,
            duration: 3 + i * 0.7,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          }, 1.5 + i * 0.3);
        });
      }
    }

    if (isDesktop && taglineEl) {
      const decor = container.querySelector(".hero-decor-path") as SVGPathElement | null;
      if (decor) {
        const len = decor.getTotalLength?.() ?? 300;
        gsap.set(decor, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.35 });
        tl.to(decor, { strokeDashoffset: 0, opacity: 0, duration: 1.4, ease: "power2.inOut" }, 0.2);
      }
    }
  }, []);

  return (
    <ArtSection
      id="hero"
      buildTimeline={buildTimeline}
      once
      // overflow-visible so mockup cards bleed past section edges; snap container clips x-axis
      className="relative flex flex-col items-center justify-center"
      style={{ overflow: "visible" }}
      aria-label="Sezione 1 di 5: Hero"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-page" style={{ zIndex: 0 }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.07), transparent)",
        }}
      />

      {/* Decorative MotionPath SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
        style={{ zIndex: 1, opacity: 0 }}
        aria-hidden
        preserveAspectRatio="none"
      >
        <path
          className="hero-decor-path"
          d="M 200 400 Q 600 100 1200 350"
          fill="none"
          stroke="rgba(212,175,55,0.5)"
          strokeWidth="1"
        />
      </svg>

      {/* ── Out-of-the-box floating mockup cards ─────────────────── */}

      {/* Card A — top-right, tilted +14deg, peeking from edge */}
      <MockCard
        className="hero-mockcard hidden lg:block"
        rotate={14}
        x="calc(100% - 160px)"
        y="6%"
        width={220}
        label="SaaS Hero"
        accent="#D4AF37"
        lines={[85, 60, 75]}
      />

      {/* Card B — bottom-left, tilted -11deg */}
      <MockCard
        className="hero-mockcard hidden lg:block"
        rotate={-11}
        x="-60px"
        y="58%"
        width={200}
        label="Landing Page"
        accent="#5a8fb0"
        lines={[90, 55, 70]}
      />

      {/* Card C — right-center, tilted +6deg — visible on tablet too */}
      <MockCard
        className="hero-mockcard hidden sm:block"
        rotate={6}
        x="calc(100% - 110px)"
        y="44%"
        width={180}
        label="Notion Hub"
        accent="#6b8e4e"
        lines={[80, 65, 50]}
      />

      {/* ── Main content ──────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 px-6 text-center max-w-3xl mx-auto">
        <div className="hero-logo w-36 sm:w-48 lg:w-64" aria-hidden>
          <FormaLogoAnimated className="w-full h-auto" />
        </div>

        <h1
          className="hero-tagline overflow-hidden"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.8rem, 8vw, 7rem)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--text)",
          }}
        >
          Arte in tasca.
        </h1>

        <p
          className="hero-sub font-jakarta text-base sm:text-lg max-w-xs sm:max-w-sm"
          style={{ color: "var(--muted)" }}
        >
          Template, prompt e strumenti per chi crea.
        </p>

        <Link
          href="/catalogo"
          className="hero-cta inline-block text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-100 hover:tracking-[0.2em]"
          style={{
            color: "var(--accent)",
            borderBottom: "1px solid var(--accent)",
            paddingBottom: "2px",
            textDecoration: "none",
            letterSpacing: "0.14em",
            transition: "letter-spacing 0.4s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.2s",
          }}
        >
          Esplora il catalogo →
        </Link>
      </div>

      {/* Counter 01/05 */}
      <div
        className="hero-counter absolute bottom-6 right-6 sm:bottom-8 sm:right-8 font-montserrat text-xs tracking-widest uppercase"
        style={{ color: "var(--muted)", letterSpacing: "0.12em", zIndex: 10 }}
        aria-hidden
      >
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>01</span>
        <span className="mx-1 opacity-40">/</span>
        <span>05</span>
      </div>

      {/* Social — bottom-left desktop */}
      <div className="hidden lg:flex absolute bottom-8 left-10 items-center gap-4" aria-label="Social links" style={{ zIndex: 10 }}>
        {[
          { href: "https://twitter.com", label: "Twitter / X", path: "M4 4l7.5 7.5L4 18h2.5l5.5-6.5L17 18h3l-7.5-8 7.5-8H17l-5.5 6-5-6H4z" },
          { href: "https://instagram.com", label: "Instagram", rect: true },
        ].map(({ href, label, path, rect }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="transition-opacity duration-200 hover:opacity-100"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            <svg width="16" height="16" viewBox="0 0 22 22" fill="none" aria-hidden>
              {rect ? (
                <>
                  <rect x="3" y="3" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="11" cy="11" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="16" cy="6" r="0.75" fill="currentColor" />
                </>
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

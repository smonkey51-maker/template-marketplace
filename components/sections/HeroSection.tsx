"use client";

import { useCallback } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import ArtSection from "@/components/ArtSection";
import { FormaLogoAnimated } from "@/components/FormaLogo";
import Link from "next/link";

gsap.registerPlugin(SplitText, MotionPathPlugin);

export default function HeroSection() {
  const buildTimeline = useCallback((tl: gsap.core.Timeline, container: HTMLElement) => {
    const isDesktop = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const taglineEl = container.querySelector(".hero-tagline") as HTMLElement | null;
    const subEl = container.querySelector(".hero-sub") as HTMLElement | null;
    const logoEl = container.querySelector(".hero-logo") as HTMLElement | null;
    const counterEl = container.querySelector(".hero-counter") as HTMLElement | null;
    const ctaEl = container.querySelector(".hero-cta") as HTMLElement | null;

    if (reduceMotion) {
      gsap.set([taglineEl, subEl, logoEl, counterEl, ctaEl].filter(Boolean), { opacity: 1, y: 0, yPercent: 0 });
      return;
    }

    // Logo fade in
    if (logoEl) {
      tl.from(logoEl, { opacity: 0, y: -20, duration: 0.8, ease: "power3.out" });
    }

    // SplitText tagline line-mask reveal
    if (taglineEl) {
      const split = new SplitText(taglineEl, { type: "lines", mask: "lines" });
      tl.from(
        split.lines,
        {
          yPercent: 100,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
          onComplete: () => split.revert(),
        },
        "-=0.4"
      );
    }

    // Sub text fade up
    if (subEl) {
      tl.from(subEl, { opacity: 0, y: 24, duration: 0.7, ease: "power3.out" }, "-=0.5");
    }

    // CTA fade
    if (ctaEl) {
      tl.from(ctaEl, { opacity: 0, y: 16, duration: 0.6, ease: "power2.out" }, "-=0.4");
    }

    // Counter fade
    if (counterEl) {
      tl.from(counterEl, { opacity: 0, x: 20, duration: 0.5, ease: "power2.out" }, "-=0.4");
    }

    // Desktop: MotionPath subtle curve on tagline entry (decor, not layout)
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
      className="relative flex flex-col items-center justify-center overflow-hidden"
      aria-label="Sezione 1 di 5: Hero"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-page" style={{ zIndex: 0 }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.07), transparent)",
        }}
      />

      {/* Decorative MotionPath SVG (desktop only) */}
      <svg
        className="hero-decor-path absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
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

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 px-6 text-center max-w-3xl mx-auto">
        {/* Logo */}
        <div className="hero-logo w-36 sm:w-48 lg:w-64" aria-hidden>
          <FormaLogoAnimated className="w-full h-auto" />
        </div>

        {/* Tagline */}
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

        {/* Sub */}
        <p
          className="hero-sub font-jakarta text-base sm:text-lg max-w-xs sm:max-w-sm"
          style={{ color: "var(--muted)" }}
        >
          Template, prompt e strumenti per chi crea.
        </p>

        {/* CTA */}
        <Link
          href="/catalogo"
          className="hero-cta inline-block text-sm font-semibold tracking-widest uppercase transition-colors duration-200 hover:opacity-100"
          style={{
            color: "var(--accent)",
            borderBottom: "1px solid var(--accent)",
            paddingBottom: "2px",
            textDecoration: "none",
            letterSpacing: "0.14em",
          }}
        >
          Esplora il catalogo →
        </Link>
      </div>

      {/* Counter 01/05 bottom-right */}
      <div
        className="hero-counter absolute bottom-6 right-6 sm:bottom-8 sm:right-8 font-montserrat text-xs tracking-widest uppercase"
        style={{ color: "var(--muted)", letterSpacing: "0.12em" }}
        aria-hidden
      >
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>01</span>
        <span className="mx-1 opacity-40">/</span>
        <span>05</span>
      </div>

      {/* Social — bottom-left (desktop) */}
      <div
        className="hidden lg:flex absolute bottom-8 left-10 items-center gap-4"
        aria-label="Social links"
      >
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

"use client";

import { useCallback } from "react";
import gsap from "gsap";
import ArtSection from "@/components/ArtSection";
import Image from "next/image";
import Link from "next/link";

// Seurat pointillism palette — extracted from La Grande Jatte
const SEURAT_PALETTE = [
  "#3b5e8c", "#5a8fb0", "#c98a73", "#e8c170", "#6b8e4e", "#d8d2c2",
  "#7aa3c0", "#b87a5a", "#4a7a3a", "#e0c88a", "#8ab0c8", "#c0a060",
];

const SECTION_BG_FALLBACK = "#1a2a3a";

// Mulberry32 deterministic PRNG — identical values on SSR and client (no hydration mismatch)
function rng(seed: number): number {
  let t = (seed ^ 0x6D2B79F5) >>> 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function buildDots(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    color: SEURAT_PALETTE[i % SEURAT_PALETTE.length],
    x: rng(i * 3) * 100,
    y: rng(i * 3 + 1) * 100,
    size: 4 + rng(i * 3 + 2) * 6,
  }));
}

// Pre-computed at module level — deterministic, safe for SSR
const DESKTOP_DOTS = buildDots(120);
const MOBILE_DOTS = buildDots(30);

// Template card data (top 3 from catalog — static preview)
const PREVIEW_CARDS = [
  { id: "hero-saas", label: "SaaS Hero", cat: "UI" },
  { id: "cold-email-b2b", label: "Cold Email B2B", cat: "Prompt" },
  { id: "notion-project-hub", label: "Project Hub", cat: "Notion" },
  { id: "landing-minimal", label: "Landing Minimal", cat: "UI" },
  { id: "prompt-linkedin", label: "LinkedIn Post", cat: "Prompt" },
  { id: "dashboard-analytics", label: "Analytics Dash", cat: "UI" },
];

export default function CatalogoSection() {
  const buildTimeline = useCallback((tl: gsap.core.Timeline, container: HTMLElement) => {
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const bg = container.querySelector(".catalogo-bg") as HTMLElement | null;
    const overlay = container.querySelector(".catalogo-overlay") as HTMLElement | null;
    const dots = Array.from(container.querySelectorAll(".seurat-dot")) as HTMLElement[];
    const cards = Array.from(container.querySelectorAll(".catalogo-card")) as HTMLElement[];
    const headline = container.querySelector(".catalogo-headline") as HTMLElement | null;
    const bodyCopy = container.querySelector(".catalogo-copy") as HTMLElement | null;
    const ctaEl = container.querySelector(".catalogo-cta") as HTMLElement | null;

    if (reduceMotion) {
      gsap.set([bg, overlay, dots, cards, headline, bodyCopy, ctaEl].filter(Boolean), {
        opacity: 1, y: 0, x: 0, filter: "none",
      });
      return;
    }

    // 0.6s — background + overlay fade
    tl.from(bg, { opacity: 0, duration: 0.6, ease: "power2.out" }, 0)
      .from(overlay, { opacity: 0, duration: 0.6, ease: "power2.out" }, 0);

    if (dots.length > 0) {
      // Scatter dots randomly across viewport
      dots.forEach((dot) => {
        gsap.set(dot, {
          x: (Math.random() - 0.5) * (isMobile ? 200 : 400),
          y: (Math.random() - 0.5) * (isMobile ? 200 : 400),
          opacity: 0,
          scale: isMobile ? 0.8 : 1.2,
        });
      });

      // 0.6s stagger scatter→converge to grid positions
      tl.to(
        dots,
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: { from: "random", amount: 0.6, grid: [isMobile ? 5 : 10, isMobile ? 6 : 12] },
        },
        0.3
      );

      // Cards rise from behind the dots
      tl.from(
        cards,
        {
          y: 40,
          opacity: 0,
          filter: "blur(12px)",
          duration: 0.7,
          ease: "power3.out",
          stagger: { from: "start", amount: 0.35 },
        },
        0.9
      );

      // Blur-to-sharp on cards
      tl.to(cards, { filter: "blur(0px)", duration: 0.4, ease: "power2.out" }, 1.1);

      // Dots desaturate as cards "pop"
      if (!isMobile) {
        tl.to(
          dots,
          { filter: "saturate(0) opacity(0.3)", duration: 0.5, ease: "power1.out" },
          1.3
        );

        // Idle shimmer — yoyo opacity, killed on section leave (via tl.pause(0) in ArtSection)
        tl.to(
          dots,
          {
            opacity: 0.15,
            duration: 2.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          },
          1.8
        );
      }
    }

    // Headline + copy reveal
    tl.from(headline, { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, 1.0)
      .from(bodyCopy, { opacity: 0, y: 16, duration: 0.5, ease: "power2.out" }, 1.2)
      .from(ctaEl, { opacity: 0, y: 12, duration: 0.4, ease: "power2.out" }, 1.4);
  }, []);

  return (
    <ArtSection
      id="catalogo"
      buildTimeline={buildTimeline}
      className="relative overflow-hidden"
      aria-label="Sezione 2 di 5: Catalogo"
    >
      {/* Full-bleed painting background */}
      <div className="catalogo-bg absolute inset-0 opacity-0" style={{ zIndex: 0, background: SECTION_BG_FALLBACK }}>
        <Image
          src="/paintings/seurat.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          loading="lazy"
          aria-hidden
          onError={() => {}} // graceful — fallback color shows
        />
      </div>

      {/* Dark overlay ~30% */}
      <div
        className="catalogo-overlay absolute inset-0 opacity-0"
        style={{ zIndex: 1, background: "rgba(10,20,30,0.68)" }}
      />

      {/* Seurat dots layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }} aria-hidden>
        <div className="relative w-full h-full">
          {DESKTOP_DOTS.map((dot) => (
            <span
              key={dot.id}
              className="seurat-dot absolute rounded-full"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                background: dot.color,
                opacity: 0,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>
      </div>

      {/* Content grid */}
      <div className="relative z-10 flex flex-col h-full px-6 sm:px-10 lg:px-16 pt-20 pb-12 lg:pb-16">
        {/* Top-left: body copy */}
        <div className="max-w-xs sm:max-w-sm">
          <p
            className="catalogo-copy text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--accent)", letterSpacing: "0.14em" }}
          >
            Catalogo
          </p>
          <p className="catalogo-copy text-white/75 text-sm sm:text-base leading-relaxed max-w-[28ch]">
            Template curati per ogni progetto.<br />
            HTML, Notion, prompt e molto altro.
          </p>
          <Link
            href="/catalogo"
            className="catalogo-cta inline-block mt-4 text-sm font-semibold tracking-wider transition-opacity duration-200 hover:opacity-100"
            style={{ color: "var(--accent)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px", textDecoration: "none" }}
          >
            Sfoglia tutto →
          </Link>
        </div>

        {/* Template card grid */}
        <div className="mt-auto grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl lg:max-w-3xl">
          {PREVIEW_CARDS.map((card) => (
            <Link
              key={card.id}
              href={`/preview/${card.id}`}
              className="catalogo-card group block"
              style={{ filter: "blur(12px)" }}
            >
              <div
                className="relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "2px",
                  padding: "12px",
                  backdropFilter: "blur(4px)",
                }}
              >
                {/* Mock thumbnail */}
                <div
                  className="w-full mb-2"
                  style={{
                    aspectRatio: "16/10",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: "1px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
                    {card.cat}
                  </span>
                </div>
                <p className="text-white/80 text-xs font-semibold truncate">{card.label}</p>
                <p className="text-white/35 text-[10px] uppercase tracking-widest mt-0.5">{card.cat}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CATALOGO oversized typography — cropped at bottom */}
      <div
        className="catalogo-headline absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 3 }}
        aria-hidden
      >
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "clamp(5rem, 18vw, 16rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.12)",
            textTransform: "uppercase",
            paddingLeft: "0.15em",
            opacity: 0,
          }}
        >
          CATALOGO
        </span>
      </div>

      {/* Counter */}
      <div
        className="absolute top-20 right-6 sm:right-8 font-montserrat text-xs tracking-widest"
        style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", zIndex: 10 }}
        aria-hidden
      >
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>02</span>
        <span className="mx-1 opacity-40">/</span>
        <span>05</span>
      </div>
    </ArtSection>
  );
}

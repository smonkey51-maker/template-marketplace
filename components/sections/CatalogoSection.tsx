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

// Mulberry32 deterministic PRNG — identical values on SSR and client
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

const DESKTOP_DOTS = buildDots(120);

// ── Template cards with Editor's Pick curation ──────────────────────────────
// editorsPick: gold border + badge + larger grid treatment
// tiltDeg: "out of box" CSS rotation (non-zero breaks outside grid cell)
interface PreviewCard {
  id: string;
  label: string;
  cat: string;
  editorsPick?: boolean;
  tiltDeg?: number;
  accentColor?: string;
}

const PREVIEW_CARDS: PreviewCard[] = [
  { id: "hero-saas",          label: "SaaS Hero",         cat: "UI",     editorsPick: true,  tiltDeg: -2.5, accentColor: "#D4AF37" },
  { id: "cold-email-b2b",     label: "Cold Email B2B",    cat: "Prompt", tiltDeg: 1.5 },
  { id: "notion-project-hub", label: "Project Hub",       cat: "Notion", editorsPick: true,  tiltDeg: -1.5, accentColor: "#6b8e4e" },
  { id: "landing-minimal",    label: "Landing Minimal",   cat: "UI",     tiltDeg: 2 },
  { id: "prompt-linkedin",    label: "LinkedIn Post",     cat: "Prompt" },
  { id: "dashboard-analytics",label: "Analytics Dash",    cat: "UI",     editorsPick: true,  tiltDeg: -1,   accentColor: "#5a8fb0" },
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

    tl.from(bg,      { opacity: 0, duration: 0.6, ease: "power2.out" }, 0)
      .from(overlay, { opacity: 0, duration: 0.6, ease: "power2.out" }, 0);

    if (dots.length > 0) {
      dots.forEach((dot) => {
        gsap.set(dot, {
          x: (Math.random() - 0.5) * (isMobile ? 200 : 400),
          y: (Math.random() - 0.5) * (isMobile ? 200 : 400),
          opacity: 0,
          scale: isMobile ? 0.8 : 1.2,
        });
      });

      tl.to(dots, {
        x: 0, y: 0, opacity: 1, scale: 1,
        duration: 0.8, ease: "power3.out",
        stagger: { from: "random", amount: 0.6, grid: [isMobile ? 5 : 10, isMobile ? 6 : 12] },
      }, 0.3);

      tl.from(cards, {
        y: 40, opacity: 0, filter: "blur(12px)",
        duration: 0.7, ease: "power3.out",
        stagger: { from: "start", amount: 0.35 },
      }, 0.9);

      tl.to(cards, { filter: "blur(0px)", duration: 0.4, ease: "power2.out" }, 1.1);

      if (!isMobile) {
        tl.to(dots, { filter: "saturate(0) opacity(0.3)", duration: 0.5, ease: "power1.out" }, 1.3);
        tl.to(dots, { opacity: 0.15, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: -1 }, 1.8);
      }
    }

    tl.from(headline, { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, 1.0)
      .from(bodyCopy,  { opacity: 0, y: 16, duration: 0.5, ease: "power2.out" }, 1.2)
      .from(ctaEl,     { opacity: 0, y: 12, duration: 0.4, ease: "power2.out" }, 1.4);
  }, []);

  return (
    <ArtSection
      id="catalogo"
      buildTimeline={buildTimeline}
      className="relative overflow-hidden"
      aria-label="Sezione 2 di 5: Catalogo"
    >
      {/* Painting background */}
      <div className="catalogo-bg absolute inset-0 opacity-0" style={{ zIndex: 0, background: SECTION_BG_FALLBACK }}>
        <Image
          src="/paintings/seurat.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          loading="lazy"
          aria-hidden
          onError={() => {}}
        />
      </div>

      {/* Dark overlay */}
      <div
        className="catalogo-overlay absolute inset-0 opacity-0"
        style={{ zIndex: 1, background: "rgba(10,20,30,0.68)" }}
      />

      {/* Seurat dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }} aria-hidden>
        <div className="relative w-full h-full">
          {DESKTOP_DOTS.map((dot) => (
            <span
              key={dot.id}
              className="seurat-dot absolute rounded-full"
              style={{
                left: `${dot.x}%`, top: `${dot.y}%`,
                width: `${dot.size}px`, height: `${dot.size}px`,
                background: dot.color, opacity: 0,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-6 sm:px-10 lg:px-16 pt-20 pb-12 lg:pb-16">
        {/* Body copy */}
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
            className="catalogo-cta inline-block mt-4 text-sm font-semibold tracking-wider"
            style={{
              color: "var(--accent)",
              borderBottom: "1px solid var(--accent)",
              paddingBottom: "2px",
              textDecoration: "none",
              transition: "letter-spacing 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
            }}
          >
            Sfoglia tutto →
          </Link>
        </div>

        {/* ── Template card grid with Editor's Pick ──────────────── */}
        <div
          className="mt-auto"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
            maxWidth: "min(680px, 100%)",
          }}
        >
          {PREVIEW_CARDS.map((card) => (
            <Link
              key={card.id}
              href={`/preview/${card.id}`}
              className="catalogo-card group block"
              style={{
                filter: "blur(12px)",
                // Editor's pick cards span 2 cols on larger screens via inline col-span
                gridColumn: card.editorsPick ? "span 1" : "span 1",
                transform: card.tiltDeg ? `rotate(${card.tiltDeg}deg)` : undefined,
                transformOrigin: "center bottom",
                transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
                zIndex: card.editorsPick ? 2 : 1,
                position: "relative",
              }}
            >
              <div
                className="relative overflow-visible"
                style={{
                  background: card.editorsPick
                    ? `linear-gradient(135deg, rgba(212,175,55,0.10), rgba(255,255,255,0.05))`
                    : "rgba(255,255,255,0.06)",
                  border: card.editorsPick
                    ? "1px solid rgba(212,175,55,0.40)"
                    : "1px solid rgba(255,255,255,0.10)",
                  borderRadius: "2px",
                  padding: "10px",
                  backdropFilter: "blur(4px)",
                  boxShadow: card.editorsPick
                    ? "0 8px 32px rgba(212,175,55,0.18), 0 2px 8px rgba(0,0,0,0.4)"
                    : "0 4px 16px rgba(0,0,0,0.3)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                {/* Editor's Pick badge */}
                {card.editorsPick && (
                  <div
                    className="absolute -top-[11px] left-2 flex items-center gap-1 px-2 py-0.5"
                    style={{
                      background: "linear-gradient(90deg, #D4AF37, #B8962E)",
                      borderRadius: "2px",
                      zIndex: 3,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "8px",
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontWeight: 800,
                        letterSpacing: "0.14em",
                        color: "rgba(0,0,0,0.8)",
                        textTransform: "uppercase",
                        lineHeight: 1,
                      }}
                    >
                      ✦ Editor&#39;s Pick
                    </span>
                  </div>
                )}

                {/* Thumbnail */}
                <div
                  style={{
                    aspectRatio: "16/10",
                    background: card.accentColor
                      ? `linear-gradient(135deg, ${card.accentColor}22, rgba(255,255,255,0.04))`
                      : "rgba(255,255,255,0.05)",
                    borderRadius: "1px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "8px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Subtle grid lines on thumbnail */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    style={{ opacity: 0.12 }}
                    aria-hidden
                  >
                    <defs>
                      <pattern id={`grid-${card.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${card.id})`} />
                  </svg>
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: card.accentColor ?? "rgba(255,255,255,0.2)", zIndex: 1 }}
                  >
                    {card.cat}
                  </span>
                </div>

                <p className="text-white/85 text-[11px] font-semibold truncate">{card.label}</p>
                <p
                  className="text-[9px] uppercase tracking-widest mt-0.5"
                  style={{ color: card.editorsPick ? "rgba(212,175,55,0.6)" : "rgba(255,255,255,0.3)" }}
                >
                  {card.cat}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CATALOGO oversized typography */}
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

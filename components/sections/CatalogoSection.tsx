"use client";

import ArtSection from "@/components/ArtSection";
import Image from "next/image";
import Link from "next/link";

const SEURAT_PALETTE = [
  "#3b5e8c", "#5a8fb0", "#c98a73", "#e8c170", "#6b8e4e", "#d8d2c2",
  "#7aa3c0", "#b87a5a", "#4a7a3a", "#e0c88a", "#8ab0c8", "#c0a060",
];

const SECTION_BG_FALLBACK = "#1a2a3a";

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

interface PreviewCard {
  id: string;
  label: string;
  cat: string;
  editorsPick?: boolean;
  tiltDeg?: number;
  accentColor?: string;
}

const PREVIEW_CARDS: PreviewCard[] = [
  { id: "hero-saas",           label: "SaaS Hero",       cat: "UI",     editorsPick: true,  tiltDeg: -2.5, accentColor: "#D4AF37" },
  { id: "cold-email-b2b",      label: "Cold Email B2B",  cat: "Prompt", tiltDeg: 1.5 },
  { id: "notion-project-hub",  label: "Project Hub",     cat: "Notion", editorsPick: true,  tiltDeg: -1.5, accentColor: "#6b8e4e" },
  { id: "landing-minimal",     label: "Landing Minimal", cat: "UI",     tiltDeg: 2 },
  { id: "prompt-linkedin",     label: "LinkedIn Post",   cat: "Prompt" },
  { id: "dashboard-analytics", label: "Analytics Dash",  cat: "UI",     editorsPick: true,  tiltDeg: -1,   accentColor: "#5a8fb0" },
];

export default function CatalogoSection() {
  return (
    <ArtSection
      id="catalogo"
      className="relative overflow-hidden"
      aria-label="Sezione 2 di 5: Catalogo"
    >
      {/* Painting background */}
      <div className="anim-bg absolute inset-0" style={{ zIndex: 0, background: SECTION_BG_FALLBACK }}>
        <Image src="/paintings/seurat.jpg" alt="" fill sizes="100vw" className="object-cover object-center" loading="lazy" aria-hidden onError={() => {}} />
      </div>

      {/* Dark overlay */}
      <div className="anim-bg absolute inset-0" style={{ zIndex: 1, background: "rgba(10,20,30,0.68)", "--delay": "0.05s" } as React.CSSProperties} />

      {/* Seurat dots */}
      <div className="anim-in absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2, "--delay": "0.3s" } as React.CSSProperties} aria-hidden>
        <div className="relative w-full h-full">
          {DESKTOP_DOTS.map((dot) => (
            <span
              key={dot.id}
              className="absolute rounded-full"
              style={{ left: `${dot.x}%`, top: `${dot.y}%`, width: `${dot.size}px`, height: `${dot.size}px`, background: dot.color, opacity: 0.18 }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-6 sm:px-10 lg:px-16 pt-20 pb-12 lg:pb-16">
        <div className="max-w-xs sm:max-w-sm">
          <p className="anim-up text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--accent)", letterSpacing: "0.14em", "--delay": "0.2s" } as React.CSSProperties}>
            Catalogo
          </p>
          <p className="anim-up text-white/75 text-sm sm:text-base leading-relaxed max-w-[28ch]" style={{ "--delay": "0.3s" } as React.CSSProperties}>
            Template curati per ogni progetto.<br />HTML, Notion, prompt e molto altro.
          </p>
          <Link
            href="/catalogo"
            className="anim-up inline-block mt-4 text-sm font-semibold tracking-wider"
            style={{ color: "var(--accent)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px", textDecoration: "none", transition: "letter-spacing 0.4s cubic-bezier(0.25,0.46,0.45,0.94)", "--delay": "0.4s" } as React.CSSProperties}
          >
            Sfoglia tutto →
          </Link>
        </div>

        {/* Template card grid */}
        <div className="mt-auto" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", maxWidth: "min(680px, 100%)" }}>
          {PREVIEW_CARDS.map((card, i) => (
            <Link
              key={card.id}
              href={`/preview/${card.id}`}
              className="catalogo-card group block anim-up"
              style={{
                transform: card.tiltDeg ? `rotate(${card.tiltDeg}deg)` : undefined,
                transformOrigin: "center bottom",
                transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
                zIndex: card.editorsPick ? 2 : 1,
                position: "relative",
                "--delay": `${0.45 + i * 0.06}s`,
              } as React.CSSProperties}
            >
              <div
                className="relative overflow-visible"
                style={{
                  background: card.editorsPick ? `linear-gradient(135deg, rgba(212,175,55,0.10), rgba(255,255,255,0.05))` : "rgba(255,255,255,0.06)",
                  border: card.editorsPick ? "1px solid rgba(212,175,55,0.40)" : "1px solid rgba(255,255,255,0.10)",
                  borderRadius: "2px", padding: "10px", backdropFilter: "blur(4px)",
                  boxShadow: card.editorsPick ? "0 8px 32px rgba(212,175,55,0.18), 0 2px 8px rgba(0,0,0,0.4)" : "0 4px 16px rgba(0,0,0,0.3)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                {card.editorsPick && (
                  <div className="absolute -top-[11px] left-2 flex items-center gap-1 px-2 py-0.5" style={{ background: "linear-gradient(90deg, #D4AF37, #B8962E)", borderRadius: "2px", zIndex: 3 }}>
                    <span style={{ fontSize: "8px", fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 800, letterSpacing: "0.14em", color: "rgba(0,0,0,0.8)", textTransform: "uppercase", lineHeight: 1 }}>
                      ✦ Editor&#39;s Pick
                    </span>
                  </div>
                )}
                <div style={{ aspectRatio: "16/10", background: card.accentColor ? `linear-gradient(135deg, ${card.accentColor}22, rgba(255,255,255,0.04))` : "rgba(255,255,255,0.05)", borderRadius: "1px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px", position: "relative", overflow: "hidden" }}>
                  <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.12 }} aria-hidden>
                    <defs><pattern id={`grid-${card.id}`} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" /></pattern></defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${card.id})`} />
                  </svg>
                  <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: card.accentColor ?? "rgba(255,255,255,0.2)", zIndex: 1 }}>{card.cat}</span>
                </div>
                <p className="text-white/85 text-[11px] font-semibold truncate">{card.label}</p>
                <p className="text-[9px] uppercase tracking-widest mt-0.5" style={{ color: card.editorsPick ? "rgba(212,175,55,0.6)" : "rgba(255,255,255,0.3)" }}>{card.cat}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CATALOGO oversized typography */}
      <div className="anim-in absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 3, "--delay": "0.5s" } as React.CSSProperties} aria-hidden>
        <span style={{ display: "block", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "clamp(5rem, 18vw, 16rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.85, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.12)", textTransform: "uppercase", paddingLeft: "0.15em" }}>
          CATALOGO
        </span>
      </div>

      {/* Counter */}
      <div className="absolute top-20 right-6 sm:right-8 font-montserrat text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", zIndex: 10 }} aria-hidden>
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>02</span>
        <span className="mx-1 opacity-40">/</span>
        <span>05</span>
      </div>
    </ArtSection>
  );
}

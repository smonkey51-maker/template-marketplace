"use client";

import ArtSection from "@/components/ArtSection";
import Link from "next/link";

const SEURAT_PALETTE = [
  "#3b5e8c","#5a8fb0","#c98a73","#e8c170","#6b8e4e","#d8d2c2",
  "#7aa3c0","#b87a5a","#4a7a3a","#e0c88a","#8ab0c8","#c0a060",
];

function rng(seed: number): number {
  let t = (seed ^ 0x6D2B79F5) >>> 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const DOTS = Array.from({ length: 120 }, (_, i) => ({
  id: i, color: SEURAT_PALETTE[i % SEURAT_PALETTE.length],
  x: rng(i * 3) * 100, y: rng(i * 3 + 1) * 100, size: 4 + rng(i * 3 + 2) * 6,
}));

// ── Mini template preview components ────────────────────────────────────────

function PreviewSaasHero() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#0a0a0f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px", gap: 5 }}>
      <div style={{ width: "40%", height: 4, background: "#D4AF37", borderRadius: 1, opacity: 0.9 }} />
      <div style={{ width: "70%", height: 7, background: "rgba(255,255,255,0.85)", borderRadius: 1 }} />
      <div style={{ width: "55%", height: 3, background: "rgba(255,255,255,0.3)", borderRadius: 1 }} />
      <div style={{ width: "55%", height: 3, background: "rgba(255,255,255,0.2)", borderRadius: 1, marginTop: 1 }} />
      <div style={{ width: "32%", height: 14, background: "#D4AF37", borderRadius: 2, marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "60%", height: 3, background: "rgba(0,0,0,0.6)", borderRadius: 1 }} />
      </div>
      <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
        {[70, 50, 65].map((w, i) => (
          <div key={i} style={{ width: w * 0.4, height: 28, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 1 }} />
        ))}
      </div>
    </div>
  );
}

function PreviewColdEmail() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#f8f6f0", display: "flex", flexDirection: "column", padding: "8px 10px", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#2d4a8a" }} />
        <div style={{ flex: 1 }}>
          <div style={{ width: "50%", height: 3, background: "#1a1a2e", borderRadius: 1 }} />
          <div style={{ width: "35%", height: 2, background: "rgba(0,0,0,0.25)", borderRadius: 1, marginTop: 2 }} />
        </div>
      </div>
      <div style={{ width: "75%", height: 4, background: "#1a1a2e", borderRadius: 1, fontWeight: 700 }} />
      {[90, 80, 70, 85, 60].map((w, i) => (
        <div key={i} style={{ width: `${w}%`, height: 3, background: "rgba(0,0,0,0.18)", borderRadius: 1 }} />
      ))}
      <div style={{ marginTop: 4, width: "38%", height: 14, background: "#2d4a8a", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "60%", height: 2, background: "rgba(255,255,255,0.8)", borderRadius: 1 }} />
      </div>
    </div>
  );
}

function PreviewNotionHub() {
  const cols = ["#6b8e4e", "#c98a73", "#5a8fb0"];
  return (
    <div style={{ width: "100%", height: "100%", background: "#ffffff", display: "flex", flexDirection: "column", padding: "6px 8px", gap: 5 }}>
      <div style={{ width: "55%", height: 5, background: "#1a1a1a", borderRadius: 1 }} />
      <div style={{ display: "flex", gap: 4, flex: 1 }}>
        {cols.map((col, ci) => (
          <div key={ci} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ height: 3, background: col, borderRadius: 1, opacity: 0.8 }} />
            {[1, 2, 3].slice(0, 3 - ci % 2).map((_, i) => (
              <div key={i} style={{ background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 2, padding: "4px 5px" }}>
                <div style={{ width: "80%", height: 3, background: "rgba(0,0,0,0.25)", borderRadius: 1 }} />
                <div style={{ width: "50%", height: 2, background: "rgba(0,0,0,0.12)", borderRadius: 1, marginTop: 2 }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewLandingMinimal() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#fafaf8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px", gap: 4 }}>
      <div style={{ width: "30%", height: 3, background: "#1a1a1a", borderRadius: 1, opacity: 0.5 }} />
      <div style={{ width: "80%", height: 8, background: "#1a1a1a", borderRadius: 1 }} />
      <div style={{ width: "65%", height: 8, background: "#1a1a1a", borderRadius: 1 }} />
      <div style={{ width: "50%", height: 3, background: "rgba(0,0,0,0.2)", borderRadius: 1, marginTop: 1 }} />
      <div style={{ display: "flex", gap: 6, marginTop: 5 }}>
        <div style={{ width: 44, height: 14, background: "#1a1a1a", borderRadius: 1 }} />
        <div style={{ width: 44, height: 14, border: "1px solid rgba(0,0,0,0.3)", borderRadius: 1 }} />
      </div>
      <div style={{ marginTop: 8, width: "100%", height: 1, background: "rgba(0,0,0,0.08)" }} />
      <div style={{ display: "flex", gap: 8 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ width: 26, height: 22, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 1 }} />
        ))}
      </div>
    </div>
  );
}

function PreviewLinkedIn() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#f3f2ef", display: "flex", flexDirection: "column", padding: "7px 8px", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#0077b5" }} />
        <div>
          <div style={{ width: 50, height: 3, background: "#1a1a1a", borderRadius: 1 }} />
          <div style={{ width: 36, height: 2, background: "rgba(0,0,0,0.25)", borderRadius: 1, marginTop: 2 }} />
        </div>
      </div>
      <div style={{ width: "85%", height: 4, background: "#1a1a1a", borderRadius: 1, fontWeight: 700 }} />
      {[95, 88, 92, 70].map((w, i) => (
        <div key={i} style={{ width: `${w}%`, height: 3, background: "rgba(0,0,0,0.18)", borderRadius: 1 }} />
      ))}
      <div style={{ marginTop: 2, padding: "5px 7px", background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 2 }}>
        <div style={{ width: "70%", height: 3, background: "#0077b5", borderRadius: 1 }} />
        <div style={{ width: "50%", height: 2, background: "rgba(0,0,0,0.15)", borderRadius: 1, marginTop: 2 }} />
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
        {["👍", "💬", "🔁"].map((e) => (
          <span key={e} style={{ fontSize: 8 }}>{e}</span>
        ))}
      </div>
    </div>
  );
}

function PreviewAnalytics() {
  const bars = [60, 85, 45, 90, 70, 55, 80];
  return (
    <div style={{ width: "100%", height: "100%", background: "#0f1117", display: "flex", flexDirection: "column", padding: "7px 8px", gap: 5 }}>
      <div style={{ display: "flex", gap: 5 }}>
        {[["#5a8fb0", "2.4k"], ["#6b8e4e", "89%"], ["#D4AF37", "142"]].map(([col, val]) => (
          <div key={val} style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, padding: "4px 5px" }}>
            <div style={{ width: "50%", height: 2, background: "rgba(255,255,255,0.2)", borderRadius: 1 }} />
            <div style={{ marginTop: 3, width: "65%", height: 5, background: col as string, borderRadius: 1, opacity: 0.9 }} />
          </div>
        ))}
      </div>
      <div style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2, padding: "5px 6px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 2 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 28 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: `rgba(90,143,176,${0.4 + h / 200})`, borderRadius: "1px 1px 0 0" }} />
          ))}
        </div>
        <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.08)" }} />
      </div>
    </div>
  );
}

// ── Card definitions ─────────────────────────────────────────────────────────

interface PreviewCard {
  id: string; label: string; cat: string;
  editorsPick?: boolean; tiltDeg?: number; accentColor: string;
  Preview: () => React.ReactElement;
}

const PREVIEW_CARDS: PreviewCard[] = [
  { id: "hero-saas",           label: "SaaS Hero",       cat: "UI",     editorsPick: true,  tiltDeg: -2.5, accentColor: "#D4AF37", Preview: PreviewSaasHero },
  { id: "cold-email-b2b",      label: "Cold Email B2B",  cat: "Prompt", tiltDeg: 1.5,                     accentColor: "#2d4a8a", Preview: PreviewColdEmail },
  { id: "notion-project-hub",  label: "Project Hub",     cat: "Notion", editorsPick: true,  tiltDeg: -1.5, accentColor: "#6b8e4e", Preview: PreviewNotionHub },
  { id: "landing-minimal",     label: "Landing Minimal", cat: "UI",     tiltDeg: 2,                       accentColor: "#888",    Preview: PreviewLandingMinimal },
  { id: "prompt-linkedin",     label: "LinkedIn Post",   cat: "Prompt",                                    accentColor: "#0077b5", Preview: PreviewLinkedIn },
  { id: "dashboard-analytics", label: "Analytics Dash",  cat: "UI",     editorsPick: true,  tiltDeg: -1,   accentColor: "#5a8fb0", Preview: PreviewAnalytics },
];

export default function CatalogoSection() {
  return (
    <ArtSection id="catalogo" className="relative overflow-hidden" aria-label="Sezione 2 di 5: Catalogo">

      {/* Painting background — Seurat, La Grande Jatte */}
      <div
        className="anim-bg absolute inset-0"
        style={{
          zIndex: 0,
          backgroundColor: "#1a2a3a",
          backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="anim-bg absolute inset-0" style={{ zIndex: 1, background: "rgba(10,20,30,0.70)", "--delay": "0.05s" } as React.CSSProperties} />

      {/* Seurat dots */}
      <div className="anim-in absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2, "--delay": "0.3s" } as React.CSSProperties} aria-hidden>
        <div className="relative w-full h-full">
          {DOTS.map((dot) => (
            <span key={dot.id} className="absolute rounded-full" style={{ left: `${dot.x}%`, top: `${dot.y}%`, width: `${dot.size}px`, height: `${dot.size}px`, background: dot.color, opacity: 0.18 }} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-8 sm:px-12 lg:px-20 pt-24 pb-14 lg:pb-16">
        <div className="max-w-xs sm:max-w-sm">
          <p className="anim-up text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--accent)", letterSpacing: "0.14em", "--delay": "0.2s" } as React.CSSProperties}>
            Catalogo
          </p>
          <p className="anim-up text-white/75 text-sm sm:text-base leading-relaxed max-w-[28ch]" style={{ "--delay": "0.3s" } as React.CSSProperties}>
            Template curati per ogni progetto.<br />HTML, Notion, prompt e molto altro.
          </p>
          <Link href="/catalogo" className="anim-up inline-block mt-4 text-sm font-semibold tracking-wider"
            style={{ color: "var(--accent)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px", textDecoration: "none", transition: "letter-spacing 0.4s ease", "--delay": "0.4s" } as React.CSSProperties}>
            Sfoglia tutto →
          </Link>
        </div>

        {/* Template card grid */}
        <div className="mt-auto" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", maxWidth: "min(680px, 100%)" }}>
          {PREVIEW_CARDS.map((card, i) => (
            <Link key={card.id} href={`/preview/${card.id}`}
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
              <div style={{
                background: card.editorsPick ? `linear-gradient(135deg, rgba(212,175,55,0.12), rgba(255,255,255,0.04))` : "rgba(255,255,255,0.06)",
                border: card.editorsPick ? "1px solid rgba(212,175,55,0.40)" : "1px solid rgba(255,255,255,0.10)",
                borderRadius: "3px",
                padding: "8px",
                backdropFilter: "blur(6px)",
                boxShadow: card.editorsPick ? "0 8px 32px rgba(212,175,55,0.18), 0 2px 8px rgba(0,0,0,0.5)" : "0 4px 16px rgba(0,0,0,0.4)",
                transition: "box-shadow 0.3s ease",
                position: "relative",
                overflow: "visible",
              }}>
                {card.editorsPick && (
                  <div className="absolute -top-[11px] left-2 flex items-center gap-1 px-2 py-0.5"
                    style={{ background: "linear-gradient(90deg, #D4AF37, #B8962E)", borderRadius: "2px", zIndex: 3 }}>
                    <span style={{ fontSize: "8px", fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 800, letterSpacing: "0.14em", color: "rgba(0,0,0,0.85)", textTransform: "uppercase", lineHeight: 1 }}>
                      ✦ Editor&#39;s Pick
                    </span>
                  </div>
                )}

                {/* Visual template preview */}
                <div style={{ aspectRatio: "16/10", borderRadius: "2px", overflow: "hidden", marginBottom: "7px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <card.Preview />
                </div>

                <p className="text-white text-[11px] font-semibold truncate">{card.label}</p>
                <p className="text-[9px] uppercase tracking-widest mt-0.5"
                  style={{ color: card.editorsPick ? "rgba(212,175,55,0.65)" : "rgba(255,255,255,0.35)" }}>
                  {card.cat}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CATALOGO oversized */}
      <div className="anim-in absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 3, "--delay": "0.5s" } as React.CSSProperties} aria-hidden>
        <span style={{ display: "block", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "clamp(5rem, 18vw, 16rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.85, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.12)", textTransform: "uppercase", paddingLeft: "0.15em" }}>
          CATALOGO
        </span>
      </div>

      <div className="absolute top-20 right-6 sm:right-8 font-montserrat text-xs tracking-widest"
        style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", zIndex: 10 }} aria-hidden>
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>02</span>
        <span className="mx-1 opacity-40">/</span>
        <span>05</span>
      </div>
    </ArtSection>
  );
}

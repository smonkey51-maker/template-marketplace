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

function PreviewChatGPTFreelancer() {
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#1e3a5f,#0f2240)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px", gap: 5 }}>
      <div style={{ width: "70%", height: 3, background: "rgba(212,175,55,0.8)", borderRadius: 1 }} />
      <div style={{ width: "85%", height: 5, background: "rgba(255,255,255,0.8)", borderRadius: 1 }} />
      <div style={{ width: "65%", height: 3, background: "rgba(255,255,255,0.3)", borderRadius: 1 }} />
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        {[["53", "Prompts"], ["10", "Cat."], ["0", "Effort"]].map(([n, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ width: 24, height: 6, background: "rgba(255,255,255,0.85)", borderRadius: 1, margin: "0 auto" }} />
            <div style={{ width: 20, height: 2, background: "rgba(255,255,255,0.3)", borderRadius: 1, margin: "2px auto 0" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewLaunchChecklist() {
  const items = [true, true, false, false, false];
  return (
    <div style={{ width: "100%", height: "100%", background: "#fafaf7", display: "flex", flexDirection: "column", padding: "8px 10px", gap: 5 }}>
      <div style={{ width: "60%", height: 4, background: "#1a1a1a", borderRadius: 1 }} />
      <div style={{ width: "40%", height: 2, background: "rgba(0,0,0,0.2)", borderRadius: 1 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 2 }}>
        {items.map((done, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: 1, border: done ? "none" : "1.5px solid rgba(0,0,0,0.2)", background: done ? "#D4AF37" : "transparent", flexShrink: 0 }} />
            <div style={{ flex: 1, height: 3, background: `rgba(0,0,0,${done ? 0.15 : 0.25})`, borderRadius: 1 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewRateCalculator() {
  const rows = [["Tariffa ora", "#D4AF37"], ["Spese mese", "rgba(0,0,0,0.35)"], ["Ore/sett.", "rgba(0,0,0,0.35)"], ["Risultato", "#4a8a5a"]];
  return (
    <div style={{ width: "100%", height: "100%", background: "#f0f4f0", display: "flex", flexDirection: "column", padding: "6px 8px", gap: 3 }}>
      <div style={{ width: "55%", height: 4, background: "#1a1a1a", borderRadius: 1 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 3 }}>
        {rows.map(([, col], i) => (
          <div key={i} style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <div style={{ flex: 2, height: 3, background: "rgba(0,0,0,0.18)", borderRadius: 1 }} />
            <div style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "60%", height: 2, background: col, borderRadius: 1 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewAntiProcrast() {
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#1a0a00,#3d1a00)", display: "flex", flexDirection: "column", padding: "8px 10px", gap: 5 }}>
      <div style={{ width: "55%", height: 4, background: "#D4AF37", borderRadius: 1, opacity: 0.9 }} />
      <div style={{ width: "80%", height: 5, background: "rgba(255,255,255,0.8)", borderRadius: 1 }} />
      <div style={{ width: "65%", height: 3, background: "rgba(255,255,255,0.3)", borderRadius: 1 }} />
      <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
        {[100, 65, 40].map((w, i) => (
          <div key={i} style={{ flex: 1, height: 4, background: `rgba(212,175,55,${0.7 - i * 0.2})`, borderRadius: 1 }} />
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {[80, 65, 50].map((w, i) => (
          <div key={i} style={{ width: `${w}%`, height: 2, background: "rgba(255,255,255,0.2)", borderRadius: 1 }} />
        ))}
      </div>
    </div>
  );
}

function PreviewFinanceTracker() {
  const bars = [50, 70, 45, 80, 60, 75];
  return (
    <div style={{ width: "100%", height: "100%", background: "#0d1117", display: "flex", flexDirection: "column", padding: "7px 8px", gap: 4 }}>
      <div style={{ display: "flex", gap: 4 }}>
        {[["#4a8a5a", "+12%"], ["#D4AF37", "€4.2k"], ["#e05a4a", "-3%"]].map(([col, v]) => (
          <div key={v} style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, padding: "3px 4px" }}>
            <div style={{ width: "70%", height: 2, background: "rgba(255,255,255,0.2)", borderRadius: 1 }} />
            <div style={{ marginTop: 2, width: "55%", height: 4, background: col as string, borderRadius: 1 }} />
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 2, padding: "4px 2px 0" }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, background: `rgba(74,138,90,${0.35 + h / 200})`, borderRadius: "1px 1px 0 0" }} />
        ))}
      </div>
    </div>
  );
}

function PreviewMidjourney() {
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#0d0d1a,#1a0a2e)", display: "flex", flexDirection: "column", padding: "8px 9px", gap: 5 }}>
      <div style={{ width: "50%", height: 3, background: "rgba(180,120,255,0.7)", borderRadius: 1 }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, flex: 1 }}>
        {["#4a2a6a","#2a3a6a","#6a2a4a","#2a5a3a"].map((bg, i) => (
          <div key={i} style={{ background: bg, borderRadius: 2, opacity: 0.75, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "50%", height: 2, background: "rgba(255,255,255,0.3)", borderRadius: 1 }} />
          </div>
        ))}
      </div>
      <div style={{ width: "75%", height: 3, background: "rgba(255,255,255,0.25)", borderRadius: 1 }} />
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
  { id: "chatgpt-prompt-library-freelancers", label: "ChatGPT Prompts", cat: "Prompt", editorsPick: true,  tiltDeg: -2.5, accentColor: "#D4AF37", Preview: PreviewChatGPTFreelancer },
  { id: "digital-product-launch-checklist",   label: "Launch Checklist", cat: "Guide",  tiltDeg: 1.5,                     accentColor: "#888",    Preview: PreviewLaunchChecklist },
  { id: "freelance-rate-calculator",          label: "Rate Calculator",  cat: "Sheet",  editorsPick: true,  tiltDeg: -1.5, accentColor: "#4a8a5a", Preview: PreviewRateCalculator },
  { id: "anti-procrastination-playbook",      label: "Playbook",         cat: "Guide",  tiltDeg: 2,                       accentColor: "#B5501F", Preview: PreviewAntiProcrast },
  { id: "monthly-business-finance-tracker",   label: "Finance Tracker",  cat: "Sheet",  editorsPick: true,  tiltDeg: -1,   accentColor: "#4a8a5a", Preview: PreviewFinanceTracker },
  { id: "midjourney-prompt-guide-mockups",    label: "Midjourney Guide", cat: "Prompt", tiltDeg: 1,                       accentColor: "#b478ff", Preview: PreviewMidjourney },
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
          backgroundImage: "url('/paintings/seurat.jpg')",
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
                background: card.editorsPick
                  ? `linear-gradient(160deg, rgba(212,175,55,0.14), rgba(255,255,255,0.04))`
                  : "rgba(255,255,255,0.07)",
                border: card.editorsPick ? "1px solid rgba(212,175,55,0.45)" : "1px solid rgba(255,255,255,0.13)",
                borderRadius: "3px",
                padding: "8px",
                backdropFilter: "blur(18px) saturate(160%)",
                WebkitBackdropFilter: "blur(18px) saturate(160%)",
                boxShadow: card.editorsPick
                  ? "0 8px 32px rgba(212,175,55,0.20), 0 2px 8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(212,175,55,0.18)"
                  : "0 4px 16px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
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

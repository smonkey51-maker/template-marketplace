"use client";

import { useState } from "react";
import BackLink from "@/components/BackLink";
import { FileText, Globe2, Palette } from "lucide-react";
import { FormaLogoStatic } from "@/components/FormaLogo";

type Lang = "it" | "en";

const PAGES: [string, string][] = [
  ["Primary logo presentation", "Marchio primario"],
  ["Logo system and variations", "Sistema logo e varianti"],
  ["Templates collection", "Collezione template"],
  ["Brand baseline hero", "Tagline e visual astratti"],
  ["Product mockup showcase", "Mockup prodotto"],
  ["Lifestyle cases", "Casi reali lifestyle"],
  ["Live campaign ads", "Campagne live"],
  ["App UI/UX previews", "Preview UI/UX app"],
  ["Social media visuals", "Visual social"],
];

export default function BrandPage() {
  const [lang, setLang] = useState<Lang>("it");

  const title = lang === "it" ? "Brand kit" : "Brand kit";
  const subtitle =
    lang === "it"
      ? "Nove tavole coordinate: logo, sistema, template, prodotto, campagne e social."
      : "Nine coordinated boards: logo, system, templates, product, campaigns and social.";
  const boardDesc =
    lang === "it"
      ? "Una tavola editoriale coerente con il sistema FORMA: nero profondo, oro opaco, griglie pulite e template multipiattaforma."
      : "An editorial board consistent with FORMA: deep black, matte gold, clean grids and multiplatform templates.";

  return (
    <div className="fp-page">
      {/* Nav */}
      <nav className="fp-nav">
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <BackLink />
          <div style={{ width: 120 }}>
            <FormaLogoStatic />
          </div>
        </div>
        <div className="fp-lang">
          <button onClick={() => setLang("it")} className={lang === "it" ? "active" : ""}>
            IT
          </button>
          <button onClick={() => setLang("en")} className={lang === "en" ? "active" : ""}>
            EN
          </button>
        </div>
      </nav>

      <div className="fp-brand-board">
        <h1 style={{ fontSize: 86, lineHeight: 0.9, letterSpacing: "-.07em", margin: "0 0 16px" }}>
          {title}
        </h1>
        <p className="fp-lead" style={{ margin: 0 }}>
          {subtitle}
        </p>

        {PAGES.map((p, i) => (
          <section className="fp-board" key={p[0]}>
            <span className="fp-badge">0{i + 1}</span>
            <h2>{lang === "it" ? p[1] : p[0]}</h2>
            <p>{boardDesc}</p>
            <div className="fp-board-grid">
              <div className="fp-mini">
                <Palette color="var(--accent)" size={22} />
                <h3>Visual system</h3>
              </div>
              <div className="fp-mini">
                <FileText color="var(--accent)" size={22} />
                <h3>Template</h3>
              </div>
              <div className="fp-mini">
                <Globe2 color="var(--accent)" size={22} />
                <h3>Campaign</h3>
              </div>
            </div>
            <div className="fp-orb" />
          </section>
        ))}

        {/* ── Board 10 — a color exploration, not the live brand ──
            Everything above renders FORMA's actual gold/terra system, the one
            CLAUDE.md documents as a deliberate choice. This board is scoped to
            its own custom properties (fp-ive-*) so it can sit here as a real,
            navigable piece of the site without a single global token moving —
            --accent, --gold and every catalogue and checkout surface are
            untouched. */}
        <section className="fp-board fp-ive" key="ive-exploration">
          <span className="fp-badge fp-ive-badge">Esplorazione</span>
          <h2>{lang === "it" ? "La palette di Jony Ive" : "The Jony Ive palette"}</h2>
          <p>
            {lang === "it"
              ? "Quattro storie di colore raccontate da Ive negli anni — l'arancione tenuto nascosto, l'argento ereditato da suo padre, l'inchiostro e la carta di LoveFrom, il blu e il verde della Corona — applicate a superfici reali di FORMA: non il brand in uso, una direzione a parte."
              : "Four color stories Ive has told over the years — the hidden orange, the silver he inherited from his father, LoveFrom's ink and paper, the Crown's blue and green — applied to real FORMA surfaces. Not the brand in use: a direction of its own."}
          </p>
          <div className="fp-ive-swatches">
            <span className="fp-ive-chip">
              <i style={{ background: "#E2570C" }} />
              {lang === "it" ? "Arancione vivido" : "Vivid orange"}
            </span>
            <span className="fp-ive-chip">
              <i style={{ background: "#83898D" }} />
              {lang === "it" ? "Argento" : "Silver"}
            </span>
            <span className="fp-ive-chip">
              <i style={{ background: "#17150F", border: "1px solid rgba(255,255,255,.25)" }} />
              {lang === "it" ? "Inchiostro" : "Ink"}
            </span>
            <span className="fp-ive-chip">
              <i style={{ background: "#F7F2E7", border: "1px solid rgba(0,0,0,.15)" }} />
              {lang === "it" ? "Carta" : "Paper"}
            </span>
            <span className="fp-ive-chip">
              <i style={{ background: "#1F5C4A" }} />
              {lang === "it" ? "Smeraldo" : "Emerald"}
            </span>
            <span className="fp-ive-chip">
              <i style={{ background: "#1E3A5F" }} />
              {lang === "it" ? "Blu profondo" : "Deep blue"}
            </span>
          </div>
          <button type="button" className="fp-ive-cta" disabled aria-disabled="true">
            {lang === "it" ? "Bottone primario, in arancione" : "Primary button, in orange"}
          </button>
        </section>
      </div>
    </div>
  );
}

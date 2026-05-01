"use client";

import { useState } from "react";
import { FileText, Globe2, Palette } from "lucide-react";
import { FormaLogoStatic } from "@/components/FormaLogo";

type Lang = "it" | "en";

const PAGES: [string, string][] = [
  ["Primary logo presentation",  "Marchio primario"],
  ["Logo system and variations",  "Sistema logo e varianti"],
  ["Templates collection",        "Collezione template"],
  ["Brand baseline hero",         "Tagline e visual astratti"],
  ["Product mockup showcase",     "Mockup prodotto"],
  ["Lifestyle cases",             "Casi reali lifestyle"],
  ["Live campaign ads",           "Campagne live"],
  ["App UI/UX previews",          "Preview UI/UX app"],
  ["Social media visuals",        "Visual social"],
];

export default function BrandPage() {
  const [lang, setLang] = useState<Lang>("it");

  const title      = lang === "it" ? "Brand kit" : "Brand kit";
  const subtitle   = lang === "it"
    ? "Nove tavole coordinate: logo, sistema, template, prodotto, campagne e social."
    : "Nine coordinated boards: logo, system, templates, product, campaigns and social.";
  const boardDesc  = lang === "it"
    ? "Una tavola editoriale coerente con il sistema FORMA: nero profondo, oro opaco, griglie pulite e template multipiattaforma."
    : "An editorial board consistent with FORMA: deep black, matte gold, clean grids and multiplatform templates.";

  return (
    <div className="fp-page">
      {/* Nav */}
      <nav className="fp-nav">
        <div style={{ width: 120 }}><FormaLogoStatic /></div>
        <div className="fp-lang">
          <button onClick={() => setLang("it")} className={lang === "it" ? "active" : ""}>IT</button>
          <button onClick={() => setLang("en")} className={lang === "en" ? "active" : ""}>EN</button>
        </div>
      </nav>

      <div className="fp-brand-board">
        <h1 style={{ fontSize: 86, lineHeight: 0.9, letterSpacing: "-.07em", margin: "0 0 16px" }}>
          {title}
        </h1>
        <p className="fp-lead" style={{ margin: 0 }}>{subtitle}</p>

        {PAGES.map((p, i) => (
          <section className="fp-board" key={p[0]}>
            <span className="fp-badge">0{i + 1}</span>
            <h2>{lang === "it" ? p[1] : p[0]}</h2>
            <p>{boardDesc}</p>
            <div className="fp-board-grid">
              <div className="fp-mini">
                <Palette color="#d4af37" size={22} />
                <h3>Visual system</h3>
              </div>
              <div className="fp-mini">
                <FileText color="#d4af37" size={22} />
                <h3>Template</h3>
              </div>
              <div className="fp-mini">
                <Globe2 color="#d4af37" size={22} />
                <h3>Campaign</h3>
              </div>
            </div>
            <div className="fp-orb" />
          </section>
        ))}
      </div>
    </div>
  );
}

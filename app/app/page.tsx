"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Boxes, Download, Heart } from "lucide-react";
import { FormaLogoStatic } from "@/components/FormaLogo";

type Lang = "it" | "en";

const dict = {
  it: {
    eyebrow: "Template multipiattaforma",
    appTitle: "Libreria template",
    appSub: "Trova, salva e usa template pronti per la piattaforma che ti serve.",
    search: "Cerca template...",
    saved: "Salvati",
    use: "Usa template",
    preview: "Anteprima",
    all: "Tutti",
  },
  en: {
    eyebrow: "Multiplatform templates",
    appTitle: "Template library",
    appSub: "Find, save and use ready-made templates for the platform you need.",
    search: "Search templates...",
    saved: "Saved",
    use: "Use template",
    preview: "Preview",
    all: "All",
  },
} as const;

const TEMPLATES = [
  { id: 1, type: "Notion", title: { it: "CRM essenziale", en: "Essential CRM" }, desc: { it: "Clienti, follow-up e pipeline senza complessità.", en: "Clients, follow-ups and pipeline without complexity." }, tag: "CRM" },
  { id: 2, type: "Web",    title: { it: "Landing premium",  en: "Premium landing"  }, desc: { it: "Hero, sezioni e CTA pronte per conversione.",  en: "Hero, sections and CTAs ready to convert."          }, tag: "SITE" },
  { id: 3, type: "Mobile", title: { it: "App launch kit",   en: "App launch kit"   }, desc: { it: "Schermate mobile per validare subito un prodotto.", en: "Mobile screens to validate a product quickly."    }, tag: "APP"  },
  { id: 4, type: "Pitch",  title: { it: "Investor deck",    en: "Investor deck"    }, desc: { it: "Narrativa, mercato, prodotto e ask in 12 slide.", en: "Narrative, market, product and ask in 12 slides."  }, tag: "DECK" },
  { id: 5, type: "Notion", title: { it: "Content system",   en: "Content system"   }, desc: { it: "Calendario, asset, status e pubblicazione.",  en: "Calendar, assets, status and publishing."           }, tag: "OPS"  },
  { id: 6, type: "Web",    title: { it: "SaaS dashboard",   en: "SaaS dashboard"   }, desc: { it: "UI scura, KPI, card e flussi prodotto.",     en: "Dark UI, KPIs, cards and product flows."            }, tag: "UI"   },
];

const FILTERS = ["All", "Notion", "Web", "Mobile", "Pitch"] as const;

export default function MarketplacePage() {
  const [lang, setLang] = useState<Lang>("it");
  const [q, setQ]       = useState("");
  const [filter, setFilter] = useState("All");
  const [saved, setSaved]   = useState<number[]>([]);

  const t = (k: keyof typeof dict.it) => dict[lang][k];

  const filtered = useMemo(
    () => TEMPLATES.filter(x =>
      (filter === "All" || x.type === filter) &&
      x.title[lang].toLowerCase().includes(q.toLowerCase())
    ),
    [q, filter, lang]
  );

  const toggle = (id: number) =>
    setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div className="fp-app-shell">
      {/* Sidebar */}
      <aside className="fp-sidebar">
        <div style={{ width: 120 }}><FormaLogoStatic /></div>
        <div style={{ height: 32 }} />
        {FILTERS.map(x => (
          <div
            key={x}
            onClick={() => setFilter(x)}
            className={`fp-sideitem${filter === x ? " active" : ""}`}
          >
            <Boxes size={17} />
            {x === "All" ? t("all") : x}
          </div>
        ))}
        <div style={{ height: 20 }} />
        <div className="fp-lang">
          <button onClick={() => setLang("it")} className={lang === "it" ? "active" : ""}>IT</button>
          <button onClick={() => setLang("en")} className={lang === "en" ? "active" : ""}>EN</button>
        </div>
      </aside>

      {/* Main */}
      <main className="fp-main">
        <div className="fp-top">
          <div>
            <div className="fp-eyebrow"><span className="fp-dot" />{t("eyebrow")}</div>
            <h1 style={{ fontSize: 58, lineHeight: 0.92, letterSpacing: "-.05em", margin: "16px 0 8px" }}>
              {t("appTitle")}
            </h1>
            <p className="fp-lead" style={{ margin: 0 }}>{t("appSub")}</p>
          </div>
          <div className="fp-card" style={{ minHeight: "auto", padding: "20px 28px", textAlign: "center" }}>
            <b style={{ fontSize: 32, display: "block" }}>{saved.length}</b>
            <p>{t("saved")}</p>
          </div>
        </div>

        <input
          className="fp-search"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder={t("search")}
        />

        <div className="fp-filters">
          {FILTERS.map(x => (
            <button
              key={x}
              onClick={() => setFilter(x)}
              className={`fp-chip${filter === x ? " active" : ""}`}
            >
              {x === "All" ? t("all") : x}
            </button>
          ))}
        </div>

        <div className="fp-market">
          {filtered.map(x => (
            <div className="fp-product" key={x.id}>
              <div className="fp-preview">{x.tag}</div>
              <div className="fp-product-body">
                <span className="fp-badge">{x.type}</span>
                <h3>{x.title[lang]}</h3>
                <p>{x.desc[lang]}</p>
                <div className="fp-actions" style={{ justifyContent: "flex-start", marginTop: 18 }}>
                  <button className="fp-btn primary">
                    <Download size={15} /> {t("use")}
                  </button>
                  <button onClick={() => toggle(x.id)} className="fp-btn">
                    <Heart size={15} fill={saved.includes(x.id) ? "#d4af37" : "none"} /> {t("saved")}
                  </button>
                </div>
                <div className="fp-meta">
                  <span>{t("preview")}</span>
                  <span>FORMA</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

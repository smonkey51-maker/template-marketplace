"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { copy, formaTemplates, type Lang, type Template } from "@/lib/formaCopy";

type Preview = Template["preview"];

function PreviewMock({ type }: { type: Preview }) {
  if (type === "crm") return (
    <div className="fn-preview fn-p-crm">
      {[0,1,2,3,4].map(i => (
        <div className="fn-row" key={i}>
          <div className={`fn-cell${i === 1 ? " fn-goldcell" : ""}`} />
          <div className="fn-cell" />
          <div className="fn-cell" />
        </div>
      ))}
    </div>
  );
  if (type === "web") return (
    <div className="fn-preview fn-p-web">
      <div className="fn-window">
        <div className="fn-line gold" /><div className="fn-line" />
        <div className="fn-line" /><div className="fn-line gold" />
      </div>
    </div>
  );
  if (type === "app") return (
    <div className="fn-preview fn-p-app">
      <div className="fn-phone">
        <div className="gold" /><div /><div /><div className="gold" />
      </div>
    </div>
  );
  return (
    <div className="fn-preview fn-p-deck">
      {[1,2,3].map(i => (
        <div className="fn-slide" key={i}>
          <b>0{i}</b>
          <div className="fn-line" /><div className="fn-line gold" />
        </div>
      ))}
    </div>
  );
}

const FILTERS = ["All", "Notion", "Web", "App", "Deck"] as const;

export default function CatalogoPage() {
  const [lang, setLang] = useState<Lang>("it");
  const [q, setQ]       = useState("");
  const [filter, setFilter] = useState("All");

  const t = (k: keyof typeof copy.it) => copy[lang][k];

  const filtered = useMemo(
    () => formaTemplates.filter(x =>
      (filter === "All" || x.platform === filter) &&
      `${x.title[lang]} ${x.desc[lang]} ${x.platform}`.toLowerCase().includes(q.toLowerCase())
    ),
    [q, filter, lang]
  );

  return (
    <div className="fn-bg">
      <div className="fn-shell">
        <SiteNav />
        <section className="fn-section">
          <div className="fn-kicker">{t("browseAll")}</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 54, margin: "0 0 14px" }}>
            {t("templates")}
          </h2>
          <div className="fn-toolbar">
            <input
              className="fn-search"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder={t("searchPlaceholder")}
            />
          </div>
          <div className="fn-chips">
            {FILTERS.map(x => (
              <button
                key={x}
                className={`fn-chip${filter === x ? " active" : ""}`}
                onClick={() => setFilter(x)}
              >
                {x === "All" ? t("all") : x}
              </button>
            ))}
          </div>
          <div className="fn-grid">
            {filtered.map(item => (
              <article className="fn-card" key={item.slug}>
                <PreviewMock type={item.preview} />
                <div className="fn-body">
                  <span className="fn-badge">{item.platform}</span>
                  <h3>{item.title[lang]}</h3>
                  <p>{item.desc[lang]}</p>
                  <div className="fn-meta"><span>{item.format}</span><b>{item.price}</b></div>
                  <div className="fn-card-actions">
                    <Link href={`/templates/${item.slug}`} className="fn-btn primary">{t("buy")}</Link>
                    <a href={item.file} download className="fn-btn">{t("download")}</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <footer className="fn-footer">
          <span>FORMA</span>
          <span>
            <Link href="/">Home</Link> · <Link href="/catalogo">Catalogo</Link> ·{" "}
            <Link href="/guida">Guida</Link> · <Link href="/account">Account</Link>
          </span>
        </footer>
      </div>
    </div>
  );
}

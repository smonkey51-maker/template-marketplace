"use client";

import Link from "next/link";
import { Layers } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { FormaFooter } from "@/components/FormaFooter";
import { sellableBundles, formatPrice, getTemplate } from "@/lib/templates";
import { getLocalizedName } from "@/lib/i18n";
import { ArtHeader, PAINTINGS } from "@/components/ArtHeader";

/** Bundles cut across the three product formats, so — like each format —
 * they get their own page off the catalogue hub instead of a section
 * embedded in one of the format pages. */
export default function CatalogoBundlesContent() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];

  return (
    <div className="fn-bg">
      <div className="fn-shell">
        <SiteNav />

        <section className="fn-section">
          <Link
            href={`/${lang}/catalogo`}
            style={{ fontSize: 13, color: "var(--muted)" }}
            className="hover:text-[var(--accent)] transition-colors"
          >
            {t("backToCatalog")}
          </Link>

          <div style={{ marginTop: 8 }}>
            <ArtHeader
              painting={PAINTINGS.catalogo}
              kicker={lang === "it" ? "Risparmia" : "Save"}
              title={lang === "it" ? "Bundle" : "Bundles"}
              subtitle={
                lang === "it"
                  ? "Più prodotti insieme, a un prezzo più basso."
                  : "Multiple products together, at a lower price."
              }
            />
          </div>

          <div className="fn-grid" style={{ marginTop: 40 }}>
            {sellableBundles.map((b) => (
              <Link
                key={b.id}
                href={`/${lang}/bundle/${b.id}`}
                className="fn-card"
                style={{ display: "flex", flexDirection: "column", height: "100%" }}
              >
                <div
                  className="fn-body"
                  style={{ display: "flex", flexDirection: "column", flex: 1 }}
                >
                  <div style={{ marginBottom: 14 }}>
                    <Layers
                      aria-hidden
                      size={26}
                      strokeWidth={1.25}
                      style={{ color: "var(--accent)" }}
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-fraunces), Georgia, serif",
                      fontWeight: 400,
                      fontSize: 22,
                      margin: "0 0 8px",
                      lineHeight: 1.2,
                    }}
                  >
                    {getLocalizedName(b, lang)}
                  </h3>
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                      margin: "0 0 16px",
                      listStyle: "none",
                      padding: 0,
                    }}
                  >
                    {b.templateIds.slice(0, 3).map((tid) => {
                      const included = getTemplate(tid);
                      return (
                        <li
                          key={tid}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 6,
                            fontSize: 13,
                            color: "var(--muted)",
                            lineHeight: 1.4,
                          }}
                        >
                          <span aria-hidden style={{ color: "var(--border)", flexShrink: 0 }}>
                            •
                          </span>
                          {included ? getLocalizedName(included, lang) : tid}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="fn-meta" style={{ marginTop: "auto" }}>
                    <span>
                      {b.templateIds.length}{" "}
                      {lang === "it" ? "prodotti inclusi" : "products included"}
                    </span>
                    <span style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <s style={{ color: "var(--muted)", fontSize: 14 }}>
                        {formatPrice(b.regularPrice)}
                      </s>
                      <b
                        style={{
                          fontFamily: "var(--font-fraunces), Georgia, serif",
                          fontSize: 22,
                          fontWeight: 400,
                          color: "var(--text)",
                        }}
                      >
                        {formatPrice(b.price)}
                      </b>
                    </span>
                  </div>
                  <div className="fn-card-actions" style={{ marginTop: 18 }}>
                    <span className="fn-btn primary w-full justify-center">
                      {lang === "it"
                        ? `Risparmia ${formatPrice(b.regularPrice - b.price)}`
                        : `Save ${formatPrice(b.regularPrice - b.price)}`}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <FormaFooter />
      </div>
    </div>
  );
}

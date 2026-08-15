"use client";

import Link from "next/link";
import { Layers } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import { ArtHeader, PAINTINGS } from "@/components/ArtHeader";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { FormaFooter } from "@/components/FormaFooter";
import { sellableBundles } from "@/lib/templates";
import { FORMAT_TILES, FORMAT_COUNTS } from "@/lib/catalogFormats";

/**
 * The catalogue itself, now just a hub: three format tiles plus bundles,
 * each a real navigation into its own page — clicking one is a route
 * change, the same as Catalogo/Studio/Guida off the homepage splash, not an
 * in-page filter. The product grid, search and price/rating facets moved to
 * catalogo/[gruppo]/page.tsx and catalogo/bundle/page.tsx.
 */
export default function CatalogoHub() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];

  return (
    <div className="fn-bg">
      <div className="fn-shell">
        <SiteNav />

        <section className="fn-section">
          <ArtHeader painting={PAINTINGS.catalogo} kicker={t("browseAll")} title={t("templates")} />

          {/* Same honest count the footer states again at the bottom of the
              page — repeated here so a visitor scanning the hub doesn't have
              to scroll past four tiles and a full footer just to get a
              sense of the catalogue's size. */}
          <p
            className="mt-3 text-[11px] uppercase"
            style={{ color: "var(--muted)", letterSpacing: "0.15em" }}
          >
            {FORMAT_COUNTS.prompt + FORMAT_COUNTS.guide + FORMAT_COUNTS.sheet}{" "}
            {lang === "it" ? "prodotti curati" : "curated products"} · {FORMAT_TILES.length}{" "}
            {lang === "it" ? "formati" : "formats"}
          </p>

          <div
            style={{
              marginTop: 40,
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            {FORMAT_TILES.map((tile) => {
              const Icon = tile.icon;
              const label = lang === "it" ? tile.it : tile.en;
              return (
                <Link
                  key={tile.key}
                  href={`/${lang}/catalogo/${tile.key}`}
                  className="glass-surface"
                  style={{
                    padding: "22px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <Icon
                    aria-hidden
                    size={22}
                    strokeWidth={1.5}
                    style={{ color: "var(--accent)" }}
                  />
                  {/* h2, not a styled span: without a real heading here, a
                      screen reader user jumping by heading never lands on
                      "Prompt e script" / "Guide e template" / "Fogli e
                      tracker" — they're the hub's only real sections. */}
                  <h2
                    style={{
                      fontFamily: "var(--font-fraunces), Georgia, serif",
                      fontWeight: 400,
                      fontSize: 19,
                      margin: 0,
                      color: "var(--text)",
                    }}
                  >
                    {label.title}
                  </h2>
                  <span style={{ fontSize: 13, lineHeight: 1.5, color: "var(--muted)" }}>
                    {label.desc}
                  </span>
                  <span
                    style={{
                      marginTop: "auto",
                      paddingTop: 6,
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "var(--muted)",
                    }}
                  >
                    {FORMAT_COUNTS[tile.key]} {lang === "it" ? "prodotti" : "products"}
                  </span>
                </Link>
              );
            })}

            {/* Bundles cut across the three formats above, so they get their
                own tile rather than being folded into one of them — and,
                unlike the three formats, a bundle is a discount, not a
                shape of product. It gets a visibly different treatment
                (accent wash, "Risparmia" flag) instead of sitting as
                a fourth identical peer, so the grid doesn't imply "4 equal
                ways to browse" when it's really "3 formats, plus a deal". */}
            {sellableBundles.length > 0 && (
              <Link
                href={`/${lang}/catalogo/bundle`}
                className="r-md"
                style={{
                  padding: "22px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  position: "relative",
                  background: "var(--accent-bg)",
                  border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 16,
                    fontSize: 10,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--accent)",
                  }}
                >
                  {lang === "it" ? "Risparmia" : "Save"}
                </span>
                <Layers
                  aria-hidden
                  size={22}
                  strokeWidth={1.5}
                  style={{ color: "var(--accent)" }}
                />
                <h2
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontWeight: 400,
                    fontSize: 19,
                    margin: 0,
                    color: "var(--text)",
                  }}
                >
                  {lang === "it" ? "Bundle" : "Bundles"}
                </h2>
                <span style={{ fontSize: 13, lineHeight: 1.5, color: "var(--muted)" }}>
                  {lang === "it"
                    ? "Più prodotti insieme, a un prezzo più basso."
                    : "Multiple products together, at a lower price."}
                </span>
                <span
                  style={{
                    marginTop: "auto",
                    paddingTop: 6,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--muted)",
                  }}
                >
                  {sellableBundles.length} {lang === "it" ? "bundle" : "bundles"}
                </span>
              </Link>
            )}
          </div>
        </section>

        <FormaFooter />
      </div>
    </div>
  );
}

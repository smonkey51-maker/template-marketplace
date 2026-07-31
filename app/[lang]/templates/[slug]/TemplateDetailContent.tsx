"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { TemplateThumb } from "@/components/TemplateThumb";
import { BuyButton } from "./BuyButton";
import { FormaFooter } from "@/components/FormaFooter";
import { formatPrice, type TemplateMeta } from "@/lib/templates";
import { getLocalizedName, getLocalizedDesc } from "@/lib/i18n";

function getPlatformLabel(downloadType?: string): string {
  const labels: Record<string, string> = {
    html: "HTML",
    notion: "Notion",
    canva: "Canva",
    excel: "Excel",
    sheets: "Google Sheets",
    framer: "Framer",
    webflow: "Webflow",
    shopify: "Shopify",
    wordpress: "WordPress",
  };
  return labels[downloadType ?? "html"] ?? "HTML";
}

export function TemplateDetailContent({
  item,
  related,
}: {
  item: TemplateMeta;
  related: TemplateMeta[];
}) {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const dt = item.downloadType ?? "html";
  const platform = getPlatformLabel(dt);
  const name = getLocalizedName(item, lang);

  return (
    <>
      <main
        style={{
          maxWidth: 960,
          margin: "0 auto",
          // The bottom figure clears the floating mobile nav: it sits 24px off
          // the bottom and stands ~56px tall, so anything less leaves the last
          // screenful of the page — including the buy button — sitting under it
          // with no way to scroll clear.
          padding: "40px clamp(16px, 3vw, 36px) calc(140px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        {/* Navigation Breadcrumb (Floating Pill) */}
        <div className="flex justify-center mb-10">
          <nav className="glass-pill px-6 py-2 flex gap-3 text-[11px] font-semibold uppercase tracking-widest text-muted items-center">
            <Link href={`/${lang}`} className="hover:text-accent transition-colors">
              FORMA
            </Link>
            <span>/</span>
            <Link href={`/${lang}/catalogo`} className="hover:text-accent transition-colors">
              {t("catalogo")}
            </Link>
            <span>/</span>
            <span className="text-accent">{name}</span>
          </nav>
        </div>

        {/* The Glass Sheet */}
        <article className="glass-panel overflow-hidden mb-24">
          {/* The static thumbnail, not the live iframe.
              TemplatePreview lays the template out at its 1440px design width
              and scales the whole thing down to the container — on a ~390px
              phone that is a factor of 0.27, so the product was drawn at
              roughly a quarter size and could not be read at all. The generated
              thumbnails are cropped to the template's own bounding box, so they
              stay legible at any width, and they cost an image instead of a
              nested document. The live, explorable version is one tap away
              under "Preview dal vivo". */}
          <div className="fn-detail-shot">
            <TemplateThumb id={item.id} name={name} priority height={420} />
          </div>

          <div className="p-8 sm:p-14 lg:p-20">
            <div className="flex flex-wrap gap-2 items-center mb-6">
              <span className="fn-badge bg-black/20 backdrop-blur-md">{platform}</span>
              {item.editorsPick && (
                <span
                  className="fn-badge"
                  style={{ border: "1px solid rgba(212,175,55,.4)", color: "#D4AF37" }}
                >
                  ★ Editor
                </span>
              )}
            </div>

            <h1
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(36px, 6vw, 64px)",
                lineHeight: 1.05,
                fontWeight: 300,
                marginBottom: 24,
              }}
            >
              {name}
            </h1>

            <p className="text-muted text-lg sm:text-xl leading-relaxed max-w-2xl mb-12">
              {getLocalizedDesc(item, lang)}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-theme pt-12">
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-6">
                  Features
                </h3>
                <ul className="space-y-3 text-muted text-sm sm:text-base">
                  <li className="flex items-center gap-3">
                    <span className="text-accent">✓</span> Accesso immediato
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-accent">✓</span> Uso commerciale limitato
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-accent">✓</span> Supporto prioritario
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-accent">✓</span> Rimborso entro 14 giorni
                  </li>
                </ul>
              </div>

              <div className="fn-buy-box flex flex-col justify-end bg-black/10 rounded-3xl p-8 border border-theme">
                <span className="text-xs uppercase tracking-widest text-muted mb-2">
                  Prezzo una tantum
                </span>
                <div className="font-cormorant text-5xl mb-8">{formatPrice(item.price)}</div>

                <div className="flex flex-col gap-3">
                  <BuyButton templateId={item.id} price={formatPrice(item.price)} />
                  <Link
                    href={`/${lang}/preview/${item.id}`}
                    className="fn-btn justify-center bg-white/5 hover:bg-white/10 r-pill"
                  >
                    Preview dal vivo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related templates */}
        {related.length > 0 && (
          <div className="text-center mt-32 mb-20">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-16">
              {t("relatedTemplates")}
            </h2>
            {/* A plain grid, not the fanned stack of three absolutely positioned
                cards this used to be. That needed a framer spring per card and a
                3D perspective context, and the cards overlapped each other at
                rest — so two of the three products were partly hidden on a page
                whose job is to show them. Hover lift is CSS, via .fn-card. */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {related.slice(0, 3).map((rel) => {
                return (
                  <div key={rel.id} className="w-full">
                    <Link
                      href={`/${lang}/templates/${rel.id}`}
                      className="fn-card overflow-hidden flex flex-col items-center block w-full h-full"
                    >
                      <div className="w-full h-36 relative pointer-events-none">
                        {/* Static, like the shot above and the catalogue grid.
                            Nothing on this page mounts an iframe any more; the
                            live view lives at /preview/[id]. */}
                        <TemplateThumb
                          id={rel.id}
                          name={getLocalizedName(rel, lang)}
                          height={144}
                        />
                      </div>
                      <div className="p-5 text-center w-full">
                        <div className="font-cormorant text-2xl mb-1">
                          {getLocalizedName(rel, lang)}
                        </div>
                        <div className="text-accent text-sm tracking-widest">
                          {formatPrice(rel.price)}
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <FormaFooter />
    </>
  );
}

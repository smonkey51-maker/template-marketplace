"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { TemplatePreview } from "@/components/TemplatePreview";
import { BuyButton } from "./BuyButton";
import { FormaFooter } from "@/components/FormaFooter";
import { formatPrice, type TemplateMeta } from "@/lib/templates";
import { motion } from "framer-motion";

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

  return (
    <>
      <main
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "40px clamp(16px, 3vw, 36px) 120px",
        }}
      >
        {/* Navigation Breadcrumb (Floating Pill) */}
        <div className="flex justify-center mb-10">
          <nav className="glass-pill px-6 py-2 flex gap-3 text-[11px] font-semibold uppercase tracking-widest text-muted items-center">
            <Link href="/" className="hover:text-accent transition-colors">
              FORMA
            </Link>
            <span>/</span>
            <Link href="/catalogo" className="hover:text-accent transition-colors">
              {t("catalogo")}
            </Link>
            <span>/</span>
            <span className="text-accent">{item.name}</span>
          </nav>
        </div>

        {/* The Glass Sheet */}
        <article className="glass-panel overflow-hidden mb-24">
          <div style={{ height: "60vh", minHeight: "400px", position: "relative" }}>
            <TemplatePreview id={item.id} />
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
              {item.name}
            </h1>

            <p className="text-muted text-lg sm:text-xl leading-relaxed max-w-2xl mb-12">
              {item.description}
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

              <div className="flex flex-col justify-end bg-black/10 rounded-3xl p-8 border border-theme">
                <span className="text-xs uppercase tracking-widest text-muted mb-2">
                  Prezzo una tantum
                </span>
                <div className="font-cormorant text-5xl mb-8">{formatPrice(item.price)}</div>

                <div className="flex flex-col gap-3">
                  <BuyButton templateId={item.id} price={formatPrice(item.price)} />
                  <Link
                    href={`/preview/${item.id}`}
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
            <div className="flex justify-center items-center h-[320px] relative w-full perspective-[1400px]">
              {related.slice(0, 3).map((rel, i) => {
                const offset = i - 1; // -1, 0, 1 (assumendo massimo 3 correlati)
                return (
                  <motion.div
                    key={rel.id}
                    className="absolute w-[260px] sm:w-[320px]"
                    style={{ zIndex: 10 + i }}
                    initial={{ x: offset * 80, rotate: offset * 6, y: Math.abs(offset) * 16 }}
                    whileHover={{
                      y: -30,
                      scale: 1.05,
                      zIndex: 30,
                      rotate: offset * 2,
                    }}
                    transition={{ type: "spring", bounce: 0.3 }}
                  >
                    <Link
                      href={`/templates/${rel.id}`}
                      className="glass-panel overflow-hidden flex flex-col items-center block w-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    >
                      <div className="w-full h-36 relative pointer-events-none">
                        <TemplatePreview id={rel.id} />
                      </div>
                      <div className="p-5 text-center w-full">
                        <div className="font-cormorant text-2xl mb-1">{rel.name}</div>
                        <div className="text-accent text-sm tracking-widest">
                          {formatPrice(rel.price)}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
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

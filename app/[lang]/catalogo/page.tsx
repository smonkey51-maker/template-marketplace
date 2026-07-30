"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { FormaFooter } from "@/components/FormaFooter";
import { templatesMeta, formatPrice, type TemplateMeta } from "@/lib/templates";
import { TemplatePreview } from "@/components/TemplatePreview";
import { TemplateThumb } from "@/components/TemplateThumb";
import gsap from "gsap";

function getPlatformLabel(t: TemplateMeta): string {
  const dt = t.downloadType ?? "html";
  const labels: Record<string, string> = {
    html: "HTML",
    notion: "Notion",
    canva: "Canva",
    excel: "Excel",
    sheets: "Sheets",
    framer: "Framer",
    webflow: "Webflow",
    shopify: "Shopify",
    wordpress: "WordPress",
  };
  return labels[dt] ?? "HTML";
}

const PAID_TEMPLATES = templatesMeta.filter((t) => !t.id.startsWith("free-"));

export default function CatalogoPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const [q, setQ] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const activeItem = useMemo(() => PAID_TEMPLATES.find((t) => t.id === activeId), [activeId]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeId && !isClosing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeId, isClosing]);

  // Background animation
  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        scale: activeId && !isClosing ? 0.985 : 1,
        filter: activeId && !isClosing ? "brightness(0.88)" : "brightness(1)",
        duration: 0.32,
        ease: "power2.out",
      });
    }
  }, [activeId, isClosing]);

  // Modal Entrance Animation
  useEffect(() => {
    if (activeId && !isClosing && overlayRef.current && modalRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        modalRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.34, ease: "power2.out" }
      );
    }
  }, [activeId, isClosing]);

  // Handle closing animation before unmounting
  const handleClose = () => {
    if (!overlayRef.current || !modalRef.current) return;
    setIsClosing(true);
    
    gsap.to(modalRef.current, {
      y: 24,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setActiveId(null);
        setIsClosing(false);
      },
    });
  };

  const filtered = useMemo(
    () =>
      PAID_TEMPLATES.filter((x) =>
        `${x.name} ${x.description} ${x.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  );

  return (
    <>
      <div
        ref={bgRef}
        className="fn-bg"
        style={{
          transformOrigin: "top center",
          minHeight: "100vh",
          borderRadius: "var(--glass-radius)",
          opacity: 1,
        }}
      >
        <div className="fn-shell">
          <SiteNav />

          <section className="fn-section">
            <div className="fn-kicker">{t("browseAll")}</div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(42px,5vw,72px)",
                margin: "0 0 6px",
                color: "var(--text)",
              }}
            >
              {t("templates")}
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 17, marginBottom: 32 }}>
              {filtered.length}{" "}
              {lang === "it"
                ? "template pronti all'uso — HTML, Notion, Shopify, WordPress"
                : "ready-to-use templates — HTML, Notion, Shopify, WordPress"}
            </p>

            <div className="fn-toolbar">
              <input
                className="fn-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("searchPlaceholder")}
              />
            </div>

            {filtered.length === 0 ? (
              <div style={{ padding: "60px 0", textAlign: "center", color: "var(--muted)" }}>
                {t("noResults")}
              </div>
            ) : (
              <div className="fn-grid">
                {filtered.map((item, idx) => (
                  <article
                    className={`fn-card cursor-pointer${item.editorsPick ? " fn-card--wide" : ""}`}
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                  >
                    <div
                      style={{ borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}
                    >
                      <TemplateThumb id={item.id} name={item.name} priority={idx < 3} />
                    </div>
                    <div className="fn-body">
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                          marginBottom: 14,
                          flexWrap: "wrap",
                        }}
                      >
                        <span className="fn-badge">{getPlatformLabel(item)}</span>
                        {item.editorsPick && (
                          <span
                            className="fn-badge"
                            style={{
                              background: "transparent",
                              border: "1px solid rgba(212,175,55,.5)",
                              color: "#D4AF37",
                            }}
                          >
                            ★ Editor
                          </span>
                        )}
                        {item.isNew && (
                          <span
                            className="fn-badge"
                            style={{
                              background: "transparent",
                              border: "1px solid rgba(234,234,234,.25)",
                              color: "var(--text)",
                            }}
                          >
                            New
                          </span>
                        )}
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontWeight: 400,
                          fontSize: 26,
                          margin: "0 0 8px",
                          lineHeight: 1.2,
                        }}
                      >
                        {item.name}
                      </h3>
                      <p
                        style={{
                          color: "var(--muted)",
                          fontSize: 14,
                          lineHeight: 1.55,
                          margin: "0 0 16px",
                        }}
                      >
                        {item.description}
                      </p>
                      <div className="fn-meta">
                        <span>{item.tags.slice(0, 2).join(" · ")}</span>
                        <b
                          style={{
                            fontFamily: "var(--font-cormorant), Georgia, serif",
                            fontSize: 22,
                            fontWeight: 400,
                            color: "var(--text)",
                          }}
                        >
                          {formatPrice(item.price)}
                        </b>
                      </div>
                      <div className="fn-card-actions" style={{ marginTop: 18 }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveId(item.id);
                          }}
                          className="fn-btn primary w-full justify-center"
                        >
                          {t("details")}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
          <FormaFooter />
        </div>
      </div>

      {/* iOS App-like Modal Overlay */}
      {(activeId || isClosing) && activeItem && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-none sm:p-4">
          {/* Overlay invisibile per cliccare fuori e chiudere */}
          <div
            ref={overlayRef}
            className="absolute inset-0 pointer-events-auto bg-black/40 backdrop-blur-sm opacity-0"
            onClick={handleClose}
          />

          <div
            ref={modalRef}
            className="relative w-full max-w-[1000px] glass-panel flex flex-col pointer-events-auto z-10"
            style={{
              height: "92vh",
              borderRadius: "var(--glass-radius) var(--glass-radius) 0 0",
              overflow: "hidden",
              opacity: 0,
              transform: "translateY(24px)",
            }}
          >
            {/* Bottone Chiudi */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white backdrop-blur-xl border border-white/10 hover:bg-black/60 transition-colors"
              aria-label="Chiudi"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <div
                style={{
                  width: "100%",
                  height: "50vh",
                  minHeight: "400px",
                  position: "relative",
                }}
              >
                <TemplatePreview id={activeItem.id} interactive={true} />
              </div>

              <div className="p-8 sm:p-12">
                <div className="flex gap-2 items-center flex-wrap mb-4">
                  <span className="fn-badge bg-black/20">{getPlatformLabel(activeItem)}</span>
                  {activeItem.editorsPick && (
                    <span
                      className="fn-badge"
                      style={{ border: "1px solid rgba(212,175,55,.5)", color: "#D4AF37" }}
                    >
                      ★ Editor
                    </span>
                  )}
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(32px, 4vw, 48px)",
                    lineHeight: 1.1,
                    marginBottom: 16,
                  }}
                >
                  {activeItem.name}
                </h2>

                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: 18,
                    lineHeight: 1.6,
                    marginBottom: 32,
                    maxWidth: "600px",
                  }}
                >
                  {activeItem.description}
                </p>

                <div className="flex items-center gap-6 pt-6 border-t border-theme">
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-muted mb-1">
                      Prezzo
                    </span>
                    <b
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: 32,
                      }}
                    >
                      {formatPrice(activeItem.price)}
                    </b>
                  </div>

                  <div className="flex-1 flex justify-end gap-3">
                    <Link href={`/preview/${activeItem.id}`} className="fn-btn">
                      {t("download")}
                    </Link>
                    <Link
                      href={`/templates/${activeItem.id}`}
                      className="fn-btn primary shadow-lg"
                    >
                      Acquista Ora
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

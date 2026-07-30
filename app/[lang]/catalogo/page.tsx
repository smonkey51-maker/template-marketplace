"use client";

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
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
  // Whatever opened the sheet, so focus returns there on close instead of
  // dropping to the top of the document.
  const openerRef = useRef<HTMLElement | null>(null);

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

  // No entrance effect here on purpose. The sheet used to start at inline
  // `opacity: 0` and rely on gsap to animate it up, which had two failure modes:
  // the sheet was invisible whenever that animation did not run — it mounted and
  // locked scroll, so clicking a template appeared to do nothing at all — and
  // React owns the `style` attribute, so the first re-render reset opacity back
  // to 0 and wiped what gsap had written. The entrance is CSS now, which means
  // the resting state is visible and animation is decoration rather than a
  // precondition. gsap still drives the close and the background recede, where
  // it earns its place: the close has to finish before the element unmounts.

  // Closing animation, then unmount.
  const handleClose = useCallback(() => {
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
        // Same reason on the way back: the card that opened the sheet may be
        // far up a long grid, and returning focus to it must not yank the page
        // to it — the browser restores the scroll position on its own.
        openerRef.current?.focus({ preventScroll: true });
      },
    });
  }, []);

  // Escape closes the sheet, and focus moves into it on open. Neither worked
  // before: the only way out was the small × with a pointer, and focus stayed on
  // the card behind the overlay, so Tab wandered through the catalogue
  // underneath instead of the dialog on top of it.
  useEffect(() => {
    if (!activeId || isClosing) return;
    // preventScroll matters here. The sheet's entrance starts at
    // translateY(100%), so at the moment focus lands it is still below the
    // viewport — and the browser's job on focus is to scroll whatever received
    // it into view. That scrolled the document to the bottom of the catalogue
    // before the sheet slid up, which read as the page jumping to the end to
    // open it.
    modalRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeId, isClosing, handleClose]);

  const filtered = useMemo(() => {
    const matches = PAID_TEMPLATES.filter((x) =>
      `${x.name} ${x.description} ${x.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase()),
    );

    // Lay the grid out on purpose instead of taking whatever order the
    // catalogue happens to be written in.
    //
    // Two things were wrong with source order. An editor's pick spans two of the
    // three tracks, and in source order they fell at indices 0, 3, 6, 8 — the
    // one at 6 arrived when a single track was left, could not fit, and got
    // pushed to the next row, leaving a visible hole. And the best products were
    // scattered through the page rather than leading it.
    //
    // Pairing each wide card with one normal card fills a row exactly (2 + 1),
    // so every wide card starts a row and none of them strand a gap. The
    // remaining normal cards follow three-up in their original order, which
    // keeps the category grouping intact below the featured block. `grid-auto-
    // flow: dense` would also close the hole, but by reordering cards visually
    // without reordering the DOM — so tab order would stop matching what you
    // see.
    const wide = matches.filter((x) => x.editorsPick);
    const rest = matches.filter((x) => !x.editorsPick);

    const ordered: TemplateMeta[] = [];
    wide.forEach((w, i) => {
      ordered.push(w);
      if (rest[i]) ordered.push(rest[i]);
    });
    ordered.push(...rest.slice(wide.length));
    return ordered;
  }, [q]);

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
                    onClick={(e) => {
                      openerRef.current = e.currentTarget as HTMLElement;
                      setActiveId(item.id);
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "16/10",
                        borderRadius: "12px",
                        overflow: "hidden",
                        marginBottom: "16px",
                        flexShrink: 0,
                      }}
                    >
                      <TemplateThumb id={item.id} name={item.name} priority={idx < 3} />
                    </div>

                    <div
                      className="fn-body"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
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

                      <div className="fn-meta" style={{ marginTop: "auto" }}>
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
                            openerRef.current = e.currentTarget;
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
            className={`absolute inset-0 pointer-events-auto bg-black/40 backdrop-blur-sm${
              isClosing ? "" : " anim-fade-in"
            }`}
            onClick={handleClose}
          />

          <div
            ref={modalRef}
            // A real dialog: without these a screen reader announced nothing on
            // open and went on reading the catalogue behind as though the sheet
            // were not there.
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            tabIndex={-1}
            className={`relative w-full max-w-[1000px] glass-panel flex flex-col pointer-events-auto z-10 outline-none${
              isClosing ? "" : " sheet-enter"
            }`}
            style={{
              height: "92vh",
              borderRadius: "var(--glass-radius) var(--glass-radius) 0 0",
              overflow: "hidden",
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
                  id="sheet-title"
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
                    {/* Aggiunto /${lang} ai percorsi e sblocco scroll su click */}
                    <Link
                      href={`/${lang}/preview/${activeItem.id}`}
                      className="fn-btn"
                      onClick={() => {
                        document.body.style.overflow = "";
                      }}
                    >
                      {t("download")}
                    </Link>
                    <Link
                      href={`/${lang}/templates/${activeItem.id}`}
                      className="fn-btn primary shadow-lg"
                      onClick={() => {
                        document.body.style.overflow = "";
                      }}
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

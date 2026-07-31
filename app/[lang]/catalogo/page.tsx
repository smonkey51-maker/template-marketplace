"use client";

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { FormaFooter } from "@/components/FormaFooter";
import { templatesMeta, formatPrice, type TemplateMeta } from "@/lib/templates";
import { getLocalizedName, getLocalizedDesc, templateTranslations } from "@/lib/i18n";
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

type GroupKey = "all" | "prompt" | "guide" | "sheet";

const GROUP_OF: Record<TemplateMeta["category"], Exclude<GroupKey, "all">> = {
  prompt: "prompt",
  script: "prompt",
  guide: "guide",
  worksheet: "sheet",
  tracker: "sheet",
  ui: "guide",
};

const GROUPS: { key: GroupKey; it: string; en: string }[] = [
  { key: "all", it: "Tutti", en: "All" },
  { key: "prompt", it: "Prompt e script", en: "Prompts & scripts" },
  { key: "guide", it: "Guide", en: "Guides" },
  { key: "sheet", it: "Fogli e tracker", en: "Sheets & trackers" },
];

type PriceKey = "all" | "under10" | "from10";

const PRICE_BANDS: { key: PriceKey; it: string; en: string }[] = [
  { key: "all", it: "Qualsiasi prezzo", en: "Any price" },
  { key: "under10", it: "Fino a €9", en: "Up to €9" },
  { key: "from10", it: "€10 e oltre", en: "€10 and up" },
];

type StarsKey = 0 | 3 | 4 | 5;

const STAR_BANDS: StarsKey[] = [0, 3, 4, 5];

interface Facets {
  group: GroupKey;
  price: PriceKey;
  stars: StarsKey;
}

type Ratings = Record<string, { avg: number; count: number }>;

function matchesGroup(x: TemplateMeta, key: GroupKey) {
  return key === "all" || GROUP_OF[x.category] === key;
}
function matchesPrice(x: TemplateMeta, key: PriceKey) {
  if (key === "all") return true;
  return key === "under10" ? x.price < 1000 : x.price >= 1000;
}
function matchesStars(x: TemplateMeta, key: StarsKey, ratings: Ratings) {
  if (key === 0) return true;
  const r = ratings[x.id];
  return !!r && r.count > 0 && r.avg >= key;
}
function matchesQuery(x: TemplateMeta, needle: string) {
  if (!needle) return true;
  const tr = templateTranslations[x.id];
  const haystack = `${x.name} ${x.description} ${x.tags.join(" ")} ${tr?.name ?? ""} ${tr?.description ?? ""}`;
  return haystack.toLowerCase().includes(needle);
}

function countWith(
  facets: Facets,
  needle: string,
  ratings: Ratings,
  override: Partial<Facets>,
): number {
  const f = { ...facets, ...override };
  return PAID_TEMPLATES.filter(
    (x) =>
      matchesGroup(x, f.group) &&
      matchesPrice(x, f.price) &&
      matchesStars(x, f.stars, ratings) &&
      matchesQuery(x, needle),
  ).length;
}

function FilterChip({
  active,
  count,
  onClick,
  children,
}: {
  active: boolean;
  count: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      disabled={count === 0 && !active}
      className={`fn-filter${active ? " is-active" : ""}`}
    >
      {children}
      <span className="fn-filter__count">{count}</span>
    </button>
  );
}

export default function CatalogoPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<GroupKey>("all");
  const [price, setPrice] = useState<PriceKey>("all");
  const [stars, setStars] = useState<StarsKey>(0);
  const [ratings, setRatings] = useState<Ratings>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
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

  // Animate Modal entrance explicitly via GSAP to ensure it's brought into view
  useEffect(() => {
    if (activeId && !isClosing && modalRef.current && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.fromTo(
        modalRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.35, ease: "power2.out" },
      );
    }
  }, [activeId, isClosing]);

  const handleClose = useCallback(() => {
    if (!overlayRef.current || !modalRef.current) {
      setActiveId(null);
      return;
    }
    setIsClosing(true);

    gsap.to(modalRef.current, {
      y: "100%",
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.28,
      onComplete: () => {
        setActiveId(null);
        setIsClosing(false);
        openerRef.current?.focus({ preventScroll: true });
      },
    });
  }, []);

  useEffect(() => {
    if (!activeId || isClosing) return;
    modalRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeId, isClosing, handleClose]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reviews/summary")
      .then((r) => (r.ok ? r.json() : { summary: {} }))
      .then((d) => {
        if (!cancelled) setRatings(d?.summary ?? {});
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const hasRatings = useMemo(() => Object.values(ratings).some((r) => r.count > 0), [ratings]);

  const needle = q.trim().toLowerCase();
  const facets: Facets = useMemo(() => ({ group, price, stars }), [group, price, stars]);

  const filtered = useMemo(() => {
    return PAID_TEMPLATES.filter(
      (x) =>
        matchesGroup(x, facets.group) &&
        matchesPrice(x, facets.price) &&
        matchesStars(x, facets.stars, ratings) &&
        matchesQuery(x, needle),
    );
  }, [facets, needle, ratings]);

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

            <div className="fn-facets">
              <div
                className="fn-filters"
                role="group"
                aria-label={lang === "it" ? "Filtra per tipo" : "Filter by type"}
              >
                {GROUPS.map((g) => (
                  <FilterChip
                    key={g.key}
                    active={group === g.key}
                    count={countWith(facets, needle, ratings, { group: g.key })}
                    onClick={() => setGroup(g.key)}
                  >
                    {lang === "it" ? g.it : g.en}
                  </FilterChip>
                ))}
              </div>

              <div
                className="fn-filters"
                role="group"
                aria-label={lang === "it" ? "Filtra per prezzo" : "Filter by price"}
              >
                {PRICE_BANDS.map((b) => (
                  <FilterChip
                    key={b.key}
                    active={price === b.key}
                    count={countWith(facets, needle, ratings, { price: b.key })}
                    onClick={() => setPrice(b.key)}
                  >
                    {lang === "it" ? b.it : b.en}
                  </FilterChip>
                ))}
              </div>

              {hasRatings && (
                <div
                  className="fn-filters"
                  role="group"
                  aria-label={lang === "it" ? "Filtra per valutazione" : "Filter by rating"}
                >
                  {STAR_BANDS.map((sKey) => (
                    <FilterChip
                      key={sKey}
                      active={stars === sKey}
                      count={countWith(facets, needle, ratings, { stars: sKey })}
                      onClick={() => setStars(sKey)}
                    >
                      {sKey === 0
                        ? lang === "it"
                          ? "Qualsiasi voto"
                          : "Any rating"
                        : `${"★".repeat(sKey)}+`}
                    </FilterChip>
                  ))}
                </div>
              )}
            </div>

            {filtered.length === 0 ? (
              <div style={{ padding: "60px 0", textAlign: "center", color: "var(--muted)" }}>
                {t("noResults")}
              </div>
            ) : (
              <div className="fn-grid">
                {filtered.map((item, idx) => (
                  <article
                    className="fn-card cursor-pointer"
                    key={item.id}
                    onClick={(e) => {
                      // Se l'utente fa un click sinistro standard, apriamo il modale.
                      if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                        e.preventDefault();
                        openerRef.current = e.currentTarget as HTMLElement;
                        setActiveId(item.id);
                      }
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <Link
                      href={`/${lang}/templates/${item.id}`}
                      className="block no-underline text-inherit flex-1 flex flex-col"
                      onClick={(e) => {
                        if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                          e.preventDefault();
                        }
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
                        <TemplateThumb
                          id={item.id}
                          name={getLocalizedName(item, lang)}
                          priority={idx < 3}
                        />
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
                          {getLocalizedName(item, lang)}
                        </h3>
                        <p
                          style={{
                            color: "var(--muted)",
                            fontSize: 14,
                            lineHeight: 1.55,
                            margin: "0 0 16px",
                          }}
                        >
                          {getLocalizedDesc(item, lang)}
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
                      </div>
                    </Link>

                    <div className="fn-card-actions" style={{ marginTop: 18 }}>
                      <button
                        type="button"
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
                  </article>
                ))}
              </div>
            )}
          </section>
          <FormaFooter />
        </div>
      </div>

      {/* Modal Overlay */}
      {(activeId || isClosing) && activeItem && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:p-4">
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={handleClose}
          />

          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            tabIndex={-1}
            className="relative w-full max-w-[1000px] glass-panel fn-sheet-panel flex flex-col z-10 outline-none"
            style={{
              height: "92vh",
              borderRadius: "var(--glass-radius) var(--glass-radius) 0 0",
              overflow: "hidden",
            }}
          >
            <button
              type="button"
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
              <div className="fn-sheet-shot">
                <TemplateThumb
                  id={activeItem.id}
                  name={getLocalizedName(activeItem, lang)}
                  priority
                  height={340}
                />
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
                  {getLocalizedName(activeItem, lang)}
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
                  {getLocalizedDesc(activeItem, lang)}
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

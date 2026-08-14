"use client";

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/lib/useCart";
import SiteNav from "@/components/SiteNav";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { FormaFooter } from "@/components/FormaFooter";
import { formatPrice, type TemplateMeta } from "@/lib/templates";
import { getLocalizedName, getLocalizedDesc, templateTranslations } from "@/lib/i18n";
import { TemplateThumb } from "@/components/TemplateThumb";
import { ArtHeader, PAINTINGS } from "@/components/ArtHeader";
import { getKindLabel, getCatKey, type GroupKey } from "@/lib/categories";
import { prefersReducedMotion, motionDuration } from "@/lib/reducedMotion";
import { PAID_TEMPLATES, getFormatTile } from "@/lib/catalogFormats";
import gsap from "gsap";

type Group = Exclude<GroupKey, "all">;

/**
 * Two price bands, not five.
 *
 * The catalogue runs €7 to €15 — four distinct prices across sixteen products.
 * Slicing an eight-euro spread finer produces exactly the one-result filters the
 * groups above were shaped to avoid. Two bands split it 11 / 5, which is a split
 * a buyer can actually act on.
 */
type PriceKey = "all" | "under" | "from";

/**
 * The boundary is computed, not typed.
 *
 * It used to be €9/€10 as literals, which described the catalogue at the moment
 * someone wrote them. Withdraw a few products or move the ladder and one of the
 * two chips quietly returns nothing for every product on the shelf — a filter
 * that is permanently empty and disabled, which is exactly the broken-looking
 * page the bands were shaped to avoid.
 *
 * So: of the distinct prices on offer, take the boundary that splits the
 * catalogue most evenly. With one distinct price there is nothing to split and
 * the band row hides itself.
 *
 * Computed once against the whole paid catalogue, not per-format: a boundary
 * that shifts depending on which format page you're on would make "Fino a
 * €X" mean a different X on each page, which is worse than one boundary that
 * occasionally splits a single format lopsidedly.
 */
const PRICE_BOUNDARY: number | null = (() => {
  const prices = [...new Set(PAID_TEMPLATES.map((t) => t.price))].sort((a, b) => a - b);
  if (prices.length < 2) return null;
  let best = prices[0];
  let bestGap = Infinity;
  for (const p of prices.slice(0, -1)) {
    const below = PAID_TEMPLATES.filter((t) => t.price <= p).length;
    const gap = Math.abs(below - (PAID_TEMPLATES.length - below));
    if (gap <= bestGap) {
      bestGap = gap;
      best = p;
    }
  }
  return best;
})();

const PRICE_BANDS: { key: PriceKey; it: string; en: string }[] =
  PRICE_BOUNDARY === null
    ? []
    : [
        { key: "all", it: "Qualsiasi prezzo", en: "Any price" },
        {
          key: "under",
          it: `Fino a ${formatPrice(PRICE_BOUNDARY)}`,
          en: `Up to ${formatPrice(PRICE_BOUNDARY)}`,
        },
        {
          key: "from",
          it: `Oltre ${formatPrice(PRICE_BOUNDARY)}`,
          en: `Over ${formatPrice(PRICE_BOUNDARY)}`,
        },
      ];

/** Minimum stars; 0 means the facet is off. */
type StarsKey = 0 | 3 | 4 | 5;

const STAR_BANDS: StarsKey[] = [0, 3, 4, 5];

interface Facets {
  price: PriceKey;
  stars: StarsKey;
}

type Ratings = Record<string, { avg: number; count: number }>;

function matchesPrice(x: TemplateMeta, key: PriceKey) {
  if (key === "all" || PRICE_BOUNDARY === null) return true;
  return key === "under" ? x.price <= PRICE_BOUNDARY : x.price > PRICE_BOUNDARY;
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
  group: Group,
  facets: Facets,
  needle: string,
  ratings: Ratings,
  override: Partial<Facets>,
): number {
  const f = { ...facets, ...override };
  return PAID_TEMPLATES.filter(
    (x) =>
      getCatKey(x) === group &&
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

export default function CatalogoCategoryContent({ group }: { group: Group }) {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const { add: addToCart, has: inCart } = useCart();
  const [q, setQ] = useState("");
  const [price, setPrice] = useState<PriceKey>("all");
  const [stars, setStars] = useState<StarsKey>(0);
  const [ratings, setRatings] = useState<Ratings>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const tile = getFormatTile(group);
  const tileLabel = lang === "it" ? tile.it : tile.en;

  const groupItems = useMemo(() => PAID_TEMPLATES.filter((x) => getCatKey(x) === group), [group]);

  const activeItem = useMemo(
    () => groupItems.find((t) => t.id === activeId),
    [groupItems, activeId],
  );

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

  useEffect(() => {
    if (bgRef.current) {
      const isOpen = activeId && !isClosing;
      const reduced = prefersReducedMotion();
      gsap.to(bgRef.current, {
        scale: reduced ? 1 : isOpen ? 0.985 : 1,
        filter: isOpen ? "brightness(0.88)" : "brightness(1)",
        duration: motionDuration(0.32),
        ease: "power2.out",
      });
    }
  }, [activeId, isClosing]);

  const handleClose = useCallback(() => {
    if (!overlayRef.current || !modalRef.current) {
      setActiveId(null);
      return;
    }
    setIsClosing(true);
    const duration = motionDuration(0.3);

    gsap.to(modalRef.current, {
      y: 24,
      opacity: 0,
      duration,
      ease: "power2.in",
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration,
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
  const facets: Facets = useMemo(() => ({ price, stars }), [price, stars]);

  const filtered = useMemo(() => {
    return groupItems.filter(
      (x) =>
        matchesPrice(x, facets.price) &&
        matchesStars(x, facets.stars, ratings) &&
        matchesQuery(x, needle),
    );
  }, [groupItems, facets, needle, ratings]);

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
                kicker={t("browseAll")}
                title={tileLabel.title}
                subtitle={tileLabel.desc}
              />
            </div>

            <div className="fn-toolbar">
              <input
                className="fn-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("searchPlaceholder")}
              />
            </div>

            <div className="fn-facets">
              {PRICE_BANDS.length > 0 && (
                <div
                  className="fn-filters"
                  role="group"
                  aria-label={lang === "it" ? "Filtra per prezzo" : "Filter by price"}
                >
                  {PRICE_BANDS.map((b) => (
                    <FilterChip
                      key={b.key}
                      active={price === b.key}
                      count={countWith(group, facets, needle, ratings, { price: b.key })}
                      onClick={() => setPrice(b.key)}
                    >
                      {lang === "it" ? b.it : b.en}
                    </FilterChip>
                  ))}
                </div>
              )}

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
                      count={countWith(group, facets, needle, ratings, { stars: sKey })}
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
                          borderRadius: "var(--r-md)",
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
                          <span className="fn-badge" data-cat={getCatKey(item)}>
                            {getKindLabel(item, lang)}
                          </span>
                        </div>
                        <h3
                          style={{
                            fontFamily: "var(--font-fraunces), Georgia, serif",
                            fontWeight: 400,
                            fontSize: 26,
                            margin: "0 0 8px",
                            lineHeight: 1.2,
                          }}
                        >
                          {getLocalizedName(item, lang)}
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
                          {item.tags.slice(0, 1).map((tag) => (
                            <li
                              key={tag}
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
                              {tag}
                            </li>
                          ))}
                        </ul>

                        <div className="fn-meta" style={{ marginTop: "auto" }}>
                          <b
                            style={{
                              fontFamily: "var(--font-fraunces), Georgia, serif",
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

                    <div
                      className="fn-card-actions"
                      style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item.id);
                        }}
                        disabled={inCart(item.id)}
                        className="fn-btn primary"
                        style={{ flex: 1, justifyContent: "center", gap: 6, fontSize: 12 }}
                      >
                        {inCart(item.id) ? (
                          <>
                            <Check size={13} strokeWidth={2} aria-hidden />
                            {lang === "it" ? "Aggiunto" : "Added"}
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={13} strokeWidth={1.8} aria-hidden />
                            {lang === "it" ? "Aggiungi" : "Add"}
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openerRef.current = e.currentTarget;
                          setActiveId(item.id);
                        }}
                        style={{ fontSize: 12, color: "var(--muted)", whiteSpace: "nowrap" }}
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

      {(activeId || isClosing) &&
        activeItem &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-none sm:p-4">
            <div
              ref={overlayRef}
              className={`absolute inset-0 pointer-events-auto bg-black/65 backdrop-blur-sm${
                isClosing ? "" : " anim-fade-in"
              }`}
              onClick={handleClose}
            />

            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="sheet-title"
              tabIndex={-1}
              className={`relative w-full max-w-[1000px] glass-panel fn-sheet-panel flex flex-col pointer-events-auto z-10 outline-none${
                isClosing ? "" : " sheet-enter"
              }`}
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
                    <span className="fn-badge bg-black/20" data-cat={getCatKey(activeItem)}>
                      {getKindLabel(activeItem, lang)}
                    </span>
                    {activeItem.editorsPick && (
                      <span
                        className="fn-badge"
                        style={{
                          border:
                            "1px solid color-mix(in srgb, var(--cat-guide-ink) 45%, transparent)",
                          color: "var(--cat-guide-ink)",
                        }}
                      >
                        ★ Editor
                      </span>
                    )}
                  </div>

                  <h2
                    id="sheet-title"
                    style={{
                      fontFamily: "var(--font-fraunces), Georgia, serif",
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
                          fontFamily: "var(--font-fraunces), Georgia, serif",
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
                        {lang === "it" ? "Anteprima" : "Preview"}
                      </Link>
                      <Link
                        href={`/${lang}/templates/${activeItem.id}`}
                        className="fn-btn primary shadow-lg"
                        onClick={() => {
                          document.body.style.overflow = "";
                        }}
                      >
                        {lang === "it" ? "Acquista ora" : "Buy now"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { FormaFooter } from "@/components/FormaFooter";
import { templatesMeta, bundles, formatPrice, type TemplateMeta } from "@/lib/templates";
import { getLocalizedName, getLocalizedDesc, templateTranslations } from "@/lib/i18n";
import { TemplateThumb } from "@/components/TemplateThumb";
import { prefersReducedMotion, motionDuration } from "@/lib/reducedMotion";
import gsap from "gsap";

/**
 * What kind of thing this is, in the visitor's language.
 *
 * The badge used to read the download format, which was "HTML" on all sixteen
 * cards — the same word sixteen times, occupying the one spot on the card that
 * could carry information. Nothing on the site sells a Notion or Shopify file,
 * so the format never distinguished anything. `category` does: it is what the
 * filter chips group by, so the badge and the filters now say the same thing.
 */
const KIND_LABELS: Record<TemplateMeta["category"], { it: string; en: string }> = {
  prompt: { it: "Prompt", en: "Prompts" },
  script: { it: "Script", en: "Scripts" },
  guide: { it: "Guida", en: "Guide" },
  worksheet: { it: "Foglio", en: "Worksheet" },
  tracker: { it: "Tracker", en: "Tracker" },
  ui: { it: "Template", en: "Template" },
};

function getKindLabel(t: TemplateMeta, lang: "it" | "en"): string {
  return KIND_LABELS[t.category]?.[lang] ?? KIND_LABELS.ui[lang];
}

const PAID_TEMPLATES = templatesMeta.filter((t) => !t.id.startsWith("free-"));

/**
 * Buyer-facing groupings, not the raw `category` field.
 *
 * The categories as stored are prompt 3 · script 1 · guide 6 · worksheet 5 ·
 * tracker 1. Exposing those directly would give two filters that return a
 * single product each, which is worse than no filter — you click it and the
 * page looks broken. So `script` joins the prompts (both are copy you paste and
 * adapt) and `tracker` joins the worksheets (both are sheets you fill in),
 * leaving four groups that each hold a real handful.
 */
export type GroupKey = "all" | "prompt" | "guide" | "sheet";

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

/**
 * Two price bands, not five.
 *
 * The catalogue runs €7 to €15 — four distinct prices across sixteen products.
 * Slicing an eight-euro spread finer produces exactly the one-result filters the
 * groups above were shaped to avoid. Two bands split it 11 / 5, which is a split
 * a buyer can actually act on.
 */
type PriceKey = "all" | "under10" | "from10";

const PRICE_BANDS: { key: PriceKey; it: string; en: string }[] = [
  { key: "all", it: "Qualsiasi prezzo", en: "Any price" },
  { key: "under10", it: "Fino a €9", en: "Up to €9" },
  { key: "from10", it: "€10 e oltre", en: "€10 and up" },
];

/** Minimum stars; 0 means the facet is off. */
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
  // Both languages are searched regardless of the current locale. The tags are
  // English-only, so an Italian visitor typing "matrimonio" would otherwise
  // miss the wedding tracker whose card in front of them says "Matrimonio",
  // and an English visitor searching a product they were linked to in Italian
  // would miss it too. Matching the union costs one string concat and makes
  // the search agree with whatever the visitor can actually see.
  const tr = templateTranslations[x.id];
  const haystack = `${x.name} ${x.description} ${x.tags.join(" ")} ${tr?.name ?? ""} ${tr?.description ?? ""}`;
  return haystack.toLowerCase().includes(needle);
}

/**
 * How many products a chip would show **given whatever else is already
 * selected** — not how many exist in the catalogue overall.
 *
 * This is the difference between a facet count that helps and one that lies. A
 * chip reading "6" that yields two results once clicked is worse than no number
 * at all, because it was believed. So each count is computed with its own
 * dimension overridden and every other filter left as the user has it.
 */
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

/** One facet chip. Label, plus what selecting it would actually yield. */
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
      // Disabled rather than hidden when it would yield nothing: a row of chips
      // that reshuffles as you filter is disorienting, and knowing a combination
      // is empty *before* clicking is the point of showing counts at all.
      disabled={count === 0 && !active}
      className={`fn-filter${active ? " is-active" : ""}`}
    >
      {children}
      <span className="fn-filter__count">{count}</span>
    </button>
  );
}

export default function CatalogoContent({ initialGroup }: { initialGroup: GroupKey }) {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<GroupKey>(initialGroup);
  const [price, setPrice] = useState<PriceKey>("all");
  const [stars, setStars] = useState<StarsKey>(0);
  const [ratings, setRatings] = useState<Ratings>({});
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

  // Background animation. The recede itself is motion, so with reduced motion
  // the scale is left alone entirely and only the dimming is applied — that
  // part is a colour change, and it is what tells you the page behind is no
  // longer the thing you are interacting with.
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
    // Without the refs there is nothing to animate, but the sheet still has to
    // go — closing it must never depend on the animation being available.
    if (!overlayRef.current || !modalRef.current) {
      setActiveId(null);
      return;
    }
    setIsClosing(true);

    // Zero duration rather than an early return when motion is unwanted: the
    // `onComplete` below is what unmounts the sheet and restores focus, so the
    // tween has to run either way — it just arrives immediately.
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

  // Ratings come from one aggregate request, not one per card. An empty object
  // is the honest resting state: it means "no ratings known", which is also
  // what the catalogue shows before the first review is ever written — and it
  // is what keeps a failed request from taking the grid down over a facet.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/reviews/summary")
      .then((r) => (r.ok ? r.json() : { summary: {} }))
      .then((d) => {
        if (!cancelled) setRatings(d?.summary ?? {});
      })
      .catch(() => {
        /* leave ratings empty — the star filter simply stays hidden */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * Whether any template has a rating at all.
   *
   * The star filter is hidden until this is true. A facet whose every option
   * returns nothing is the same broken-looking page as a one-result filter, and
   * with no reviews written yet that is exactly what it would be. It appears on
   * its own the moment the first review lands — no deploy needed.
   */
  const hasRatings = useMemo(() => Object.values(ratings).some((r) => r.count > 0), [ratings]);

  const needle = q.trim().toLowerCase();
  const facets: Facets = useMemo(() => ({ group, price, stars }), [group, price, stars]);

  const filtered = useMemo(() => {
    // Uniform cards mean the grid tiles by itself, so there is no ordering
    // trick here any more. Source order — which groups by category — is the
    // honest order to browse in, and every facet composes with the others
    // rather than replacing them.
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
                ? "prodotti pronti all'uso — prompt, guide, fogli e tracker"
                : "ready-to-use products — prompts, guides, sheets and trackers"}
            </p>

            <div className="fn-toolbar">
              <input
                className="fn-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("searchPlaceholder")}
              />
            </div>

            {/* Facets. Each row is single-select, because the options within a
                row do not overlap — more than one at a time would be
                meaningless. Counts are computed against the other active
                filters, so a chip never promises more than clicking it
                delivers. */}
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

              {/* Only once something has actually been rated. Before that every
                  option would return nothing, which is the same broken-looking
                  page as a filter that finds one item. It appears by itself when
                  the first review lands. */}
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
                      // Plain click opens the sheet; the modified clicks belong
                      // to the browser, so the link underneath can do its job.
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
                    {/* A real link around the card, even though a plain click
                        opens the sheet instead of following it. It is what makes
                        the card middle-clickable, cmd-clickable and copyable as a
                        URL — an onClick handler on its own is none of those. */}
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
                          <span className="fn-badge">{getKindLabel(item, lang)}</span>
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

                    {/* Outside the link on purpose — a button nested in an
                        anchor is invalid, and this one opens the sheet rather
                        than navigating. */}
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

          {/*
            Bundles had no way in. Nothing on the site linked to /bundle/[id] —
            the only links pointing at that route used the id `studio-access`,
            which is not one of them and answers "Bundle non trovato". So the
            four most expensive items in the shop, €19.99 to €29.99, could be
            bought only by someone who guessed the URL. They belong on the page
            people actually browse.
          */}
          <section className="fn-section" id="bundle" style={{ scrollMarginTop: 24 }}>
            <div className="fn-kicker">{lang === "it" ? "Risparmia" : "Save"}</div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(32px, 4vw, 52px)",
                margin: "0 0 6px",
                color: "var(--text)",
              }}
            >
              {lang === "it" ? "Bundle" : "Bundles"}
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 17, marginBottom: 32 }}>
              {lang === "it"
                ? "Più prodotti insieme, a meno di quanto costerebbero singolarmente."
                : "Several products together, for less than they cost apart."}
            </p>

            <div className="fn-grid">
              {bundles.map((b) => (
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
                    <div style={{ fontSize: 34, lineHeight: 1, marginBottom: 14 }} aria-hidden>
                      {b.emoji}
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
                      {getLocalizedName(b, lang)}
                    </h3>
                    <p
                      style={{
                        color: "var(--muted)",
                        fontSize: 14,
                        lineHeight: 1.55,
                        margin: "0 0 16px",
                      }}
                    >
                      {getLocalizedDesc(b, lang)}
                    </p>
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
                            fontFamily: "var(--font-cormorant), Georgia, serif",
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

      {/* Rendered into document.body rather than here.
          A modal has no business being positioned relative to whatever happens
          to wrap the page. It was, and it cost: PageTransition's wrapper kept a
          `transform: translateY(0)` after its animation finished (declared
          `both`), and any transform other than `none` makes an element the
          containing block for its fixed descendants — so `inset-0` resolved
          against the whole document and `items-end` parked this sheet below
          the end of the page, unreachable behind the scroll lock. It opened,
          and nothing appeared.
          PageTransition no longer leaves that transform behind, so this portal
          is not what fixes the reported bug. It is here so that the next
          wrapper someone adds cannot reintroduce it. */}
      {/* No mounted guard: the branch is only reached once something has been
          clicked, so it is never evaluated during the server render and
          document.body is never touched there. */}
      {(activeId || isClosing) &&
        activeItem &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-none sm:p-4">
            {/* Overlay invisibile per cliccare fuori e chiudere */}
            <div
              ref={overlayRef}
              className={`absolute inset-0 pointer-events-auto bg-black/65 backdrop-blur-sm${
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
              className={`relative w-full max-w-[1000px] glass-panel fn-sheet-panel flex flex-col pointer-events-auto z-10 outline-none${
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
                {/* Same reason as the detail page: TemplatePreview lays the
                  template out at 1440px and scales it to fit, so on a phone the
                  product was drawn at roughly a quarter size and could not be
                  read. The thumbnail is cropped to the template's own bounds and
                  stays legible. "Anteprima" below opens the live one. */}
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
                    <span className="fn-badge bg-black/20">{getKindLabel(activeItem, lang)}</span>
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
          </div>,
          document.body,
        )}
    </>
  );
}

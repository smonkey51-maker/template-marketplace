"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { usePurchases } from "@/lib/usePurchases";
import { useSearchParams, useRouter } from "next/navigation";
import { templates, bundles, Template, getDownloadType } from "@/lib/templates";
import TemplateCard from "@/components/TemplateCard";
import StudioAccessButton from "@/components/StudioAccessButton";
import { useLang } from "@/components/LanguageProvider";
import { t, SEARCH_SYNONYMS, templateTranslations } from "@/lib/i18n";
import PreviewModal from "@/components/PreviewModal";
import { useRecentlyViewed } from "@/lib/useRecentlyViewed";
import { PLATFORMS, SECTIONS, PILLARS, PlatformFilter } from "@/lib/gridData";
import CategoryCard from "@/components/grid/CategoryCard";
import SplitFlap from "@/components/grid/SplitFlapCounter";
import ScrambleText from "@/components/grid/ScrambleText";
import MagneticWrap from "@/components/grid/MagneticWrap";
import ScrollRevealCard from "@/components/grid/ScrollRevealCard";

const byId = Object.fromEntries(templates.map((tmpl) => [tmpl.id, tmpl]));

// ── Utilities ────────────────────────────────────────────────────────────────

function normalize(str: string): string {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// ── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-card border border-theme rounded-none overflow-hidden animate-pulse">
      <div className="h-48 bg-theme/5" />
      <div className="p-4 flex flex-col gap-2.5">
        <div className="h-2 w-16 bg-theme/8" />
        <div className="h-3.5 w-3/4 bg-theme/8" />
        <div className="mt-2 flex items-center justify-between">
          <div className="h-3.5 w-10 bg-theme/8" />
          <div className="h-2.5 w-12 bg-theme/8" />
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function TemplateGrid({ externalQuery = "", onClearSearch }: { externalQuery?: string; onClearSearch?: () => void }) {
  const { lang } = useLang();
  const { ids: recentIds } = useRecentlyViewed();
  const searchParams = useSearchParams();
  const router = useRouter();
  const recentTemplates = useMemo(
    () => recentIds.map((id) => byId[id]).filter(Boolean) as Template[],
    [recentIds]
  );
  const { purchasedIds, loading } = usePurchases();
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(() => searchParams.get("category"));
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [animKey, setAnimKey] = useState(0);
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("all");
  const gridTopRef = useRef<HTMLDivElement>(null);
  const drillDirectionRef = useRef<"in" | "back">("in");

  const handleQuickView = useCallback((id: string) => setQuickViewId(id), []);

  // Reset when query changes (from hero)
  useEffect(() => {
    if (externalQuery.trim()) {
      setOpenCategoryId(null);
      setVisibleCount(12);
      setAnimKey((k) => k + 1);
    }
  }, [externalQuery]);

  // Search filter state
  const [searchTypeFilter, setSearchTypeFilter] = useState<"all" | "ui" | "prompt">("all");
  const [searchSort, setSearchSort] = useState<"relevance" | "popular" | "price-asc" | "price-desc">("relevance");

  // Search results with relevance scoring
  const searchResults = useMemo(() => {
    const raw = normalize(externalQuery.trim());
    if (!raw) return [];
    const words = raw.split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];

    // Collect all synonym expansions for each word
    const allTerms = new Set<string>(words);
    for (const w of words) {
      const syns = SEARCH_SYNONYMS[w];
      if (syns) syns.forEach((s) => allTerms.add(normalize(s)));
    }
    const terms = Array.from(allTerms);

    // Score each template for relevance
    const scored = templates.map((tmpl) => {
      const itName = templateTranslations[tmpl.id]?.name ?? "";
      const itDesc = templateTranslations[tmpl.id]?.description ?? "";
      const nameNorm = normalize(tmpl.name);
      const itNameNorm = normalize(itName);
      const descNorm = normalize(tmpl.description);
      const itDescNorm = normalize(itDesc);
      const tagsNorm = tmpl.tags.map(normalize).join(" ");
      const haystack = [nameNorm, descNorm, itNameNorm, itDescNorm, tagsNorm].join(" ");

      let score = 0;
      for (const term of terms) {
        if (!haystack.includes(term)) continue;
        // Exact name match = highest score
        if (nameNorm === term || itNameNorm === term) score += 100;
        // Name contains term
        else if (nameNorm.includes(term) || itNameNorm.includes(term)) score += 50;
        // Tags match
        else if (tagsNorm.includes(term)) score += 20;
        // Description match
        else if (descNorm.includes(term) || itDescNorm.includes(term)) score += 10;
      }
      // Tiny tiebreaker for popularity (max 2 points — won't override relevance)
      score += Math.min(tmpl.downloads / 500, 2);
      return { tmpl, score };
    }).filter(({ score }) => score > 0);

    // Apply type filter
    const filtered = scored.filter(({ tmpl }) => {
      if (searchTypeFilter === "all") return true;
      return tmpl.category === searchTypeFilter;
    });

    // Sort
    if (searchSort === "relevance") {
      filtered.sort((a, b) => b.score - a.score);
    } else if (searchSort === "popular") {
      filtered.sort((a, b) => b.tmpl.downloads - a.tmpl.downloads);
    } else if (searchSort === "price-asc") {
      filtered.sort((a, b) => a.tmpl.price - b.tmpl.price);
    } else {
      filtered.sort((a, b) => b.tmpl.price - a.tmpl.price);
    }

    return filtered.map(({ tmpl }) => tmpl);
  }, [externalQuery, searchTypeFilter, searchSort]);

  const isSearching = externalQuery.trim() !== "";

  // Platform-filtered sections — only show sections that have templates matching the selected platform
  const filteredSections = useMemo(() => {
    if (platformFilter === "all") return SECTIONS;
    return SECTIONS.map((section) => {
      const matchingIds = section.ids.filter((id) => {
        const tmpl = byId[id];
        if (!tmpl) return false;
        return getDownloadType(tmpl) === platformFilter;
      });
      return { ...section, ids: matchingIds };
    }).filter((section) => section.ids.length > 0);
  }, [platformFilter]);

  // Count templates per platform for badges
  const platformCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const tmpl of templates) {
      const dt = getDownloadType(tmpl);
      counts[dt] = (counts[dt] || 0) + 1;
    }
    counts["all"] = templates.length;
    return counts;
  }, []);

  // Current category data
  const openSection = openCategoryId ? SECTIONS.find((s) => s.id === openCategoryId) : null;
  const openSectionTemplates = openSection
    ? (openSection.ids.map((id) => byId[id]).filter(Boolean) as Template[])
    : [];
  const openSectionMeta = openSection
    ? t[lang].sections[openSection.id as keyof typeof t[typeof lang]["sections"]]
    : null;

  const handleOpenCategory = (id: string) => {
    drillDirectionRef.current = "in";
    setOpenCategoryId(id);
    setVisibleCount(12);
    setAnimKey((k) => k + 1);
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", id);
    router.replace(`?${params.toString()}`, { scroll: false });
    setTimeout(() => {
      gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleBack = () => {
    drillDirectionRef.current = "back";
    setOpenCategoryId(null);
    setAnimKey((k) => k + 1);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : window.location.pathname, { scroll: false });
    setTimeout(() => {
      gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div id="browse" className="px-4 sm:px-6 pb-24 max-w-5xl mx-auto">

      {/* Scroll anchor */}
      <div ref={gridTopRef} className="h-0 -mt-4" />

      {/* ── Studio Access hint ── */}
      <div className="mb-8 mt-4 flex items-center justify-between gap-3 px-1">
        <p className="text-[13px] text-muted">{t[lang].studioAccessBanner.title}</p>
        <MagneticWrap><StudioAccessButton compact /></MagneticWrap>
      </div>

      {/* ══════════════════════════════════════════════════
          VIEW 1 — Search results
      ══════════════════════════════════════════════════ */}
      {isSearching && (
        <div className="space-y-5" role="region" aria-live="polite" aria-label={lang === "it" ? "Risultati ricerca" : "Search results"}>
          {/* Search toolbar: filters + sort */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-[13px] text-muted font-medium">
                {t[lang].search.found.replace("{{n}}", String(searchResults.length))}
              </p>
              {/* Type filter chips */}
              <div className="flex items-center gap-1 ml-2">
                {(["all", "ui", "prompt"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => { setSearchTypeFilter(type); setVisibleCount(12); }}
                    className={`px-2.5 py-1 text-[11px] font-semibold border transition-all duration-150 ${
                      searchTypeFilter === type
                        ? "border-accent/40 text-accent"
                        : "border-theme text-muted hover:text-theme hover:border-accent/20"
                    }`}
                    style={searchTypeFilter === type ? { background: "var(--accent-bg)" } : undefined}
                  >
                    {type === "all" ? (lang === "it" ? "Tutti" : "All") :
                     type === "ui" ? "UI" : "Prompt"}
                  </button>
                ))}
              </div>
            </div>
            {/* Sort dropdown */}
            <select
              value={searchSort}
              onChange={(e) => setSearchSort(e.target.value as typeof searchSort)}
              className="text-[11px] font-medium text-muted bg-input border border-theme rounded-none px-2.5 py-1.5 outline-none focus:border-accent transition-colors"
              style={{ color: "var(--muted)", background: "var(--input-bg)" }}
            >
              <option value="relevance">{lang === "it" ? "Più rilevanti" : "Most relevant"}</option>
              <option value="popular">{lang === "it" ? "Più scaricati" : "Most popular"}</option>
              <option value="price-asc">{lang === "it" ? "Prezzo ↑" : "Price ↑"}</option>
              <option value="price-desc">{lang === "it" ? "Prezzo ↓" : "Price ↓"}</option>
            </select>
          </div>

          {searchResults.length > 0 ? (
            <>
              <div key={animKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-9">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                  : searchResults.slice(0, visibleCount).map((tmpl, i) => (
                      <div key={tmpl.id} className="opacity-0"
                        style={{ animation: "cardEntrance 0.4s ease forwards", animationDelay: `${Math.min(i * 40, 400)}ms` }}>
                        <TemplateCard template={tmpl} purchasedIds={purchasedIds} onQuickView={handleQuickView} />
                      </div>
                    ))}
              </div>
              {!loading && searchResults.length > visibleCount && (
                <div className="flex justify-center mt-6">
                  <MagneticWrap>
                    <button
                      onClick={() => setVisibleCount((v) => v + 12)}
                      className="px-6 py-2.5 glass border border-theme rounded-none text-[13px] font-semibold text-muted hover:text-theme hover:border-accent/30 transition-all duration-200 ios-spring"
                    >
                      {lang === "it"
                        ? `Mostra altri ${Math.min(12, searchResults.length - visibleCount)} di ${searchResults.length} →`
                        : `Show ${Math.min(12, searchResults.length - visibleCount)} more of ${searchResults.length} →`}
                    </button>
                  </MagneticWrap>
                </div>
              )}
            </>
          ) : (
            <div className="py-16 flex flex-col items-center gap-4 text-center">
              <p className="text-[32px]" style={{ color: "var(--muted)", opacity: 0.4 }}>—</p>
              <p className="text-[17px] font-semibold text-theme">{t[lang].search.notFound}</p>
              <p className="text-[14px] text-muted">{t[lang].search.notFoundDesc}</p>
              {onClearSearch && (
                <button
                  onClick={onClearSearch}
                  className="mt-2 btn-brand-sm"
                >
                  {t[lang].search.resetCta} →
                </button>
              )}
              {/* Popular suggestions */}
              <div className="mt-8 w-full max-w-3xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted mb-4">
                  {lang === "it" ? "Più popolari" : "Most popular"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
                  {templates.sort((a, b) => b.downloads - a.downloads).slice(0, 3).map((tmpl) => (
                    <TemplateCard key={tmpl.id} template={tmpl} purchasedIds={purchasedIds} onQuickView={handleQuickView} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          VIEW 2 — Category templates (drilled in)
      ══════════════════════════════════════════════════ */}
      {!isSearching && openCategoryId && openSection && openSectionMeta && (
        <div key={`drill-${animKey}`} className={drillDirectionRef.current === "in" ? "anim-drill-in" : "anim-drill-back"}>
          {/* Back header */}
          <div className="flex items-center gap-3 mb-7">
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-[13px] font-semibold text-muted hover:text-theme transition-colors duration-200 group"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                className="group-hover:-translate-x-0.5 transition-transform duration-200">
                <path d="M10 7H2M6 3l-4 4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {lang === "it" ? "Categorie" : "Categories"}
            </button>
            <span style={{ color: "var(--border)" }}>/</span>
            <span className="text-[13px] font-semibold text-theme">
              {openSection.emoji} {openSectionMeta.label}
            </span>
            <span className="bg-accent/10 text-accent rounded-none px-2 py-0.5 text-[11px] font-bold">
              {openSectionTemplates.length}
            </span>
          </div>

          {/* Template cards */}
          <div key={animKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-9">
            {loading
              ? Array.from({ length: openSectionTemplates.length || 3 }).map((_, i) => <SkeletonCard key={i} />)
              : openSectionTemplates.map((tmpl, i) => (
                  <div key={tmpl.id} className="opacity-0"
                    style={{ animation: "cardEntrance 0.4s ease forwards", animationDelay: `${Math.min(i * 45, 400)}ms` }}>
                    <TemplateCard template={tmpl} purchasedIds={purchasedIds} onQuickView={handleQuickView} />
                  </div>
                ))}
          </div>
        </div>
      )}


      {/* ══════════════════════════════════════════════════
          VIEW 3 — Category cards grid (default)
      ══════════════════════════════════════════════════ */}
      {!isSearching && !openCategoryId && (
        <div key={`grid-${animKey}`} className={drillDirectionRef.current === "back" ? "anim-drill-back" : ""}>

          {/* ── Desktop: sidebar + main layout ── */}
          <div className="lg:flex lg:gap-8 lg:items-start">

            {/* ── Sidebar: platform filters (lg+) — tanzaku style ── */}
            <aside className="hidden lg:block w-40 shrink-0 sticky top-20 self-start">
              {/* Tategaki header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex flex-col items-center gap-1" aria-hidden="true">
                  <div className="w-px h-4" style={{ background: "linear-gradient(to bottom, transparent, var(--accent))", opacity: 0.4 }} />
                  <span style={{ fontFamily: "var(--font-gatsunaga)", fontSize: "11px", color: "var(--accent)", opacity: 0.55, writingMode: "vertical-rl", letterSpacing: "0.1em" }}>台</span>
                  <div className="w-px h-4" style={{ background: "linear-gradient(to top, transparent, var(--accent))", opacity: 0.4 }} />
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
                  {lang === "it" ? "Piattaforma" : "Platform"}
                </p>
              </div>
              <div className="flex flex-col gap-0.5">
                {PLATFORMS.filter((p) => p.id === "all" || (platformCounts[p.id] ?? 0) > 0).map((p) => {
                  const isActive = platformFilter === p.id;
                  const count = platformCounts[p.id] ?? 0;
                  const kanji: Record<string, string> = { all: "全", html: "網", shopify: "商", wordpress: "文", notion: "念", canva: "画", webflow: "流", framer: "枠", excel: "算", sheets: "表" };
                  return (
                    <button
                      key={p.id}
                      onClick={() => { setPlatformFilter(p.id); setAnimKey((k) => k + 1); }}
                      className="flex items-center gap-2.5 py-2 pr-2 w-full text-left transition-all duration-150 group relative"
                      style={{ paddingLeft: "10px", borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent" }}
                    >
                      {/* Background tint when active */}
                      {isActive && (
                        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--accent-bg)", opacity: 0.7 }} />
                      )}
                      {/* Kanji mark */}
                      <span
                        className="shrink-0 relative z-10"
                        style={{
                          fontFamily: "var(--font-gatsunaga)",
                          fontSize: "12px",
                          opacity: isActive ? 0.9 : 0.35,
                          color: isActive ? "var(--accent)" : "var(--text)",
                          lineHeight: 1,
                          transition: "opacity 0.15s",
                        }}
                      >
                        {kanji[p.id] ?? p.icon}
                      </span>
                      {/* Label */}
                      <span
                        className="flex-1 truncate text-[11px] font-medium relative z-10 transition-colors duration-150"
                        style={{ color: isActive ? "var(--accent)" : "var(--muted)" }}
                      >
                        {p.label[lang]}
                      </span>
                      {/* Count */}
                      {p.id !== "all" && (
                        <span
                          className="text-[9px] shrink-0 relative z-10 tabular-nums"
                          style={{ color: isActive ? "var(--accent)" : "var(--muted)", opacity: isActive ? 0.8 : 0.45 }}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {/* Bottom fade line */}
              <div className="mt-4 h-px" style={{ background: "linear-gradient(to right, var(--accent), transparent)", opacity: 0.18 }} />
            </aside>

            {/* ── Main content ── */}
            <div className="flex-1 min-w-0">

              {/* ── Mobile platform filter bar (hidden lg+) — tanzaku chips ── */}
              <div className="mb-6 lg:hidden">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
                  {PLATFORMS.filter((p) => p.id === "all" || (platformCounts[p.id] ?? 0) > 0).map((p) => {
                    const isActive = platformFilter === p.id;
                    const kanji: Record<string, string> = { all: "全", html: "網", shopify: "商", wordpress: "文", notion: "念", canva: "画", webflow: "流", framer: "枠", excel: "算", sheets: "表" };
                    return (
                      <button
                        key={p.id}
                        onClick={() => { setPlatformFilter(p.id); setAnimKey((k) => k + 1); }}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 whitespace-nowrap transition-all duration-150 shrink-0 relative"
                        style={{
                          borderBottom: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                          background: isActive ? "var(--accent-bg)" : "transparent",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-gatsunaga)",
                            fontSize: "11px",
                            opacity: isActive ? 0.9 : 0.3,
                            color: isActive ? "var(--accent)" : "var(--text)",
                            lineHeight: 1,
                          }}
                        >
                          {kanji[p.id] ?? p.icon}
                        </span>
                        <span
                          className="text-[11px] font-medium"
                          style={{ color: isActive ? "var(--accent)" : "var(--muted)" }}
                        >
                          {p.label[lang]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section label */}
              <div className="flex items-center gap-4 mb-6 px-1">
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                <span className="text-[10px] font-bold text-muted uppercase tracking-[0.18em] shrink-0">
                  {platformFilter === "all" ? (
                    <><SplitFlap to={templates.length} /> {lang === "it" ? "template" : "templates"} · {bundles.length} bundle</>
                  ) : (
                    <>{filteredSections.reduce((sum, s) => sum + s.ids.length, 0)} {platformFilter} {lang === "it" ? "template" : "templates"}</>
                  )}
                </span>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7 sm:gap-9">
                  {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : filteredSections.length > 0 ? (
                <div className="flex flex-col gap-20">
                  {PILLARS.map((pillar, pillarIdx) => {
                    const pillarSections = filteredSections.filter((s) => s.pillar === pillar.id);
                    const validSections = pillarSections.filter((s) =>
                      s.ids.some((id) => byId[id])
                    );
                    if (validSections.length === 0) return null;
                    return (
                      <div key={pillar.id}>
                        {/* Ma divider between pillars */}
                        {pillarIdx > 0 && (
                          <div className="ma-divider mb-10" aria-hidden="true"><span>{pillar.kanji[0]}</span></div>
                        )}

                        {/* Pillar header — tategaki style */}
                        <div className="flex items-stretch gap-4 mb-8">
                          {/* Vertical kanji bar */}
                          <div className="flex flex-col items-center gap-1 shrink-0 py-1" aria-hidden="true">
                            <div className="pillar-bar w-px flex-1" style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }} />
                            <span className="tategaki pillar-tategaki">{pillar.kanji}</span>
                            <div className="pillar-bar w-px flex-1" style={{ background: "linear-gradient(to top, var(--accent), transparent)" }} />
                          </div>
                          {/* Text */}
                          <div className="flex flex-col justify-center gap-1">
                            <span className="pillar-name" style={{ fontFamily: "var(--font-gatsunaga)", fontSize: "20px", color: "var(--accent)", lineHeight: 1.1 }}>
                              {lang === "it" ? pillar.nameIt : pillar.nameEn}
                            </span>
                            <span className="text-[11px] font-light tracking-[0.06em]" style={{ color: "var(--muted)" }}>
                              {lang === "it" ? pillar.subtitleIt : pillar.subtitleEn}
                            </span>
                          </div>
                          <div className="pillar-line flex-1 h-px self-center ml-2" style={{ background: "linear-gradient(to right, var(--accent), transparent)" }} />
                        </div>

                        {/* Tatami grid — first card wider (featured) */}
                        <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                          {validSections.map((section, i) => {
                            const sectionTemplates = section.ids.map((id) => byId[id]).filter(Boolean) as Template[];
                            const isFeatured = i === 0;
                            return (
                              <div key={section.id} className={isFeatured ? "col-span-2 xl:col-span-2" : "col-span-1"}>
                                <CategoryCard
                                  section={section}
                                  sectionTemplates={sectionTemplates}
                                  onClick={() => handleOpenCategory(section.id)}
                                  lang={lang}
                                  index={i}
                                  featured={isFeatured}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-16 flex flex-col items-center gap-5 text-center">
                  <div className="w-12 h-12 flex items-center justify-center border border-theme text-2xl"
                    style={{ background: "var(--card-bg)" }}>
                    🔍
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-theme mb-1.5">
                      {lang === "it" ? "Nessun template per questa piattaforma" : "No templates for this platform yet"}
                    </p>
                    <p className="text-[13px] text-muted max-w-[280px]">
                      {lang === "it"
                        ? "Crea il tuo template personalizzato con l'AI Studio."
                        : "Create your custom template with AI Studio."}
                    </p>
                  </div>
                  <a href="/studio" className="btn-brand-sm">
                    {lang === "it" ? "Apri AI Studio →" : "Open AI Studio →"}
                  </a>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ── Quick Preview Modal ── */}
      {quickViewId && (
        <PreviewModal templateId={quickViewId} onClose={() => setQuickViewId(null)} />
      )}
    </div>
  );
}

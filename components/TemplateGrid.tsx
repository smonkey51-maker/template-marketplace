"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { templates, Template } from "@/lib/templates";
import TemplateCard from "@/components/TemplateCard";
import StudioAccessButton from "@/components/StudioAccessButton";
import { useLang } from "@/components/LanguageProvider";
import { t, SEARCH_SYNONYMS, templateTranslations } from "@/lib/i18n";
import PreviewModal from "@/components/PreviewModal";

// ── Section definitions ──────────────────────────────────────────────────────

const SECTIONS: {
  id: string;
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
  ids: string[];
}[] = [
  { id: "professionals",    emoji: "🏢", gradientFrom: "#1e3a5f", gradientTo: "#0f2a47", ids: ["real-estate-agent", "therapist-profile", "law-firm-services", "personal-trainer-profile", "ai-tech-portfolio"] },
  { id: "lifestyle-finance",emoji: "🏡", gradientFrom: "#0d3b2e", gradientTo: "#052a1f", ids: ["airbnb-property-listing", "budget-tracker", "personal-finance-dashboard", "adhd-focus-tracker"] },
  { id: "business",         emoji: "🛍️", gradientFrom: "#3b2000", gradientTo: "#2a1600", ids: ["artisan-product-catalog", "revenue-analytics", "pricing-table", "ecommerce-product-page", "invoice-html"] },
  { id: "startup",          emoji: "🚀", gradientFrom: "#2d1b69", gradientTo: "#1a0e47", ids: ["saas-landing-dark", "startup-product-launch", "hero-saas", "waiting-list-page", "saas-pricing-full"] },
  { id: "creative",         emoji: "🎨", gradientFrom: "#4a0d2e", gradientTo: "#330920", ids: ["creative-agency-portfolio", "freelance-tech-profile", "blog-card-grid"] },
  { id: "copywriting-ai",   emoji: "✍️", gradientFrom: "#0d2b4a", gradientTo: "#061c35", ids: ["cold-email-b2b", "product-description-ecom", "ai-assistant-system-prompt", "linkedin-prompt-pack", "youtube-script-pack"] },
  { id: "ai-productivity",  emoji: "🤖", gradientFrom: "#1a1a2e", gradientTo: "#0d0d1f", ids: ["claude-projects-pack", "ai-workflow-pack"] },
  { id: "hospitality",      emoji: "🍽️", gradientFrom: "#3b0a0a", gradientTo: "#2a0606", ids: ["restaurant-menu", "coffee-shop-landing", "hotel-booking"] },
  { id: "digital-product",  emoji: "📱", gradientFrom: "#003b4a", gradientTo: "#002535", ids: ["mobile-app-showcase", "feature-showcase", "saas-dashboard"] },
  { id: "personal-brand",   emoji: "🪪", gradientFrom: "#2d0e4a", gradientTo: "#1e0933", ids: ["digital-resume", "link-in-bio", "newsletter-landing"] },
  { id: "notion-workspace", emoji: "📓", gradientFrom: "#1c1c1c", gradientTo: "#0f0f0f", ids: ["notion-project-hub", "notion-freelancer-crm", "notion-content-calendar", "notion-finance-tracker", "notion-second-brain", "notion-job-tracker", "notion-weekly-review", "notion-client-portal"] },
];

const byId = Object.fromEntries(templates.map((tmpl) => [tmpl.id, tmpl]));

// ── Utilities ────────────────────────────────────────────────────────────────

function normalize(str: string): string {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// ── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-card border border-theme rounded-[22px] overflow-hidden animate-pulse">
      <div className="h-48 bg-theme/5" />
      <div className="p-4 flex flex-col gap-2.5">
        <div className="h-2 w-16 bg-theme/8 rounded-full" />
        <div className="h-3.5 w-3/4 bg-theme/8 rounded-full" />
        <div className="mt-2 flex items-center justify-between">
          <div className="h-3.5 w-10 bg-theme/8 rounded-full" />
          <div className="h-2.5 w-12 bg-theme/8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ── Category card thumbnail ───────────────────────────────────────────────────

function CategoryThumbnail({
  section,
  firstTemplate,
}: {
  section: (typeof SECTIONS)[number];
  firstTemplate: Template | undefined;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: "300px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const showIframe = visible && firstTemplate && firstTemplate.category === "ui";

  return (
    <div
      ref={containerRef}
      className="relative h-36 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${section.gradientFrom}, ${section.gradientTo})` }}
    >
      {/* Template iframe preview */}
      {showIframe && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: "scale(0.36)", transformOrigin: "top left", width: "278%", height: "278%" }}
        >
          <iframe
            src={`/api/preview/${firstTemplate.id}`}
            title={firstTemplate.name}
            sandbox="allow-scripts"
            className="w-full border-0"
            style={{ height: "400px" }}
          />
        </div>
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: showIframe
            ? "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0.78) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)",
        }}
      />

      {/* Emoji fallback */}
      {!showIframe && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="select-none"
            style={{ fontSize: "2.8rem", filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.5))", opacity: 0.85 }}
          >
            {section.emoji}
          </span>
        </div>
      )}

      {/* Dot-grid pattern (non-iframe only) */}
      {!showIframe && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
      )}
    </div>
  );
}

// ── Category card ─────────────────────────────────────────────────────────────

type Lang = "it" | "en";

function CategoryCard({
  section,
  sectionTemplates,
  onClick,
  lang,
  index,
}: {
  section: (typeof SECTIONS)[number];
  sectionTemplates: Template[];
  onClick: () => void;
  lang: Lang;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const sectionMeta = t[lang].sections[section.id as keyof typeof t[typeof lang]["sections"]];

  // Pick the most downloaded template as the thumbnail preview
  const featured = [...sectionTemplates].sort((a, b) => b.downloads - a.downloads)[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(700px) rotateX(${(-y * 8).toFixed(1)}deg) rotateY(${(x * 8).toFixed(1)}deg) scale3d(1.025,1.025,1.025)`;
    });
  };

  const handleMouseLeave = () => {
    cancelAnimationFrame(frameRef.current);
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform .5s cubic-bezier(.34,1.2,.64,1)";
    el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    setTimeout(() => { if (el) el.style.transition = ""; }, 500);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group relative rounded-2xl h-full anim-fade-up cursor-pointer"
      style={{ willChange: "transform", animationDelay: `${index * 45}ms` }}
    >
      {/* Card */}
      <div className="glass relative rounded-2xl overflow-hidden flex flex-col h-full active:opacity-90">
        {/* Specular top edge */}
        <div className="absolute top-0 left-[8%] right-[8%] h-px pointer-events-none z-10" style={{ background: "var(--glass-top-edge)" }} />

        {/* Thumbnail */}
        <CategoryThumbnail section={section} firstTemplate={featured} />

        {/* Hover CTA overlay — sits over the thumbnail */}
        <div className="absolute top-0 left-0 right-0 h-36 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="bg-white/90 dark:bg-black/75 text-zinc-900 dark:text-zinc-100 text-[12px] font-bold px-3.5 py-1.5 rounded-xl shadow-sm backdrop-blur-sm">
            {lang === "it"
              ? `Vedi ${sectionTemplates.length} template →`
              : `View ${sectionTemplates.length} templates →`}
          </span>
        </div>

        {/* Info — compact */}
        <div className="px-3.5 py-3 flex items-center gap-2.5">
          {/* Emoji pill */}
          <span className="text-base flex-shrink-0 leading-none">{section.emoji}</span>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-[#0A84FF] transition-colors duration-200 truncate">
              {sectionMeta.label}
            </h3>
            <p className="text-[11px] text-muted leading-snug truncate mt-0.5">
              {sectionMeta.subtitle}
            </p>
          </div>

          {/* Count + arrow */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 tabular-nums">
              {sectionTemplates.length}
            </span>
            <svg
              width="13" height="13" viewBox="0 0 14 14" fill="none"
              className="text-zinc-300 dark:text-zinc-600 group-hover:text-[#0A84FF] group-hover:translate-x-0.5 transition-all duration-200"
            >
              <path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function TemplateGrid({ externalQuery = "" }: { externalQuery?: string }) {
  const { lang } = useLang();
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [animKey, setAnimKey] = useState(0);
  const gridTopRef = useRef<HTMLDivElement>(null);

  const handleQuickView = useCallback((id: string) => setQuickViewId(id), []);

  useEffect(() => {
    fetch("/api/purchases")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => setPurchasedIds(data.templateIds ?? []))
      .catch(() => setPurchasedIds([]))
      .finally(() => setLoading(false));
  }, []);

  // Reset when query changes (from hero)
  useEffect(() => {
    if (externalQuery.trim()) {
      setOpenCategoryId(null);
      setVisibleCount(12);
      setAnimKey((k) => k + 1);
    }
  }, [externalQuery]);

  // Search results (when query active)
  const searchResults = useMemo(() => {
    const q = normalize(externalQuery.trim());
    if (!q) return [];
    const synonyms: string[] = SEARCH_SYNONYMS[q] ?? [];
    return templates.filter((tmpl) => {
      const itName = templateTranslations[tmpl.id]?.name ?? "";
      const itDesc = templateTranslations[tmpl.id]?.description ?? "";
      const matchesDirect =
        normalize(tmpl.name).includes(q) ||
        normalize(tmpl.description).includes(q) ||
        normalize(itName).includes(q) ||
        normalize(itDesc).includes(q) ||
        tmpl.tags.some((tag) => normalize(tag).includes(q));
      const matchesSynonym = synonyms.some((syn) =>
        normalize(tmpl.name).includes(normalize(syn)) ||
        normalize(tmpl.description).includes(normalize(syn)) ||
        tmpl.tags.some((tag) => normalize(tag).includes(normalize(syn)))
      );
      return matchesDirect || matchesSynonym;
    }).sort((a, b) => b.downloads - a.downloads);
  }, [externalQuery]);

  const isSearching = externalQuery.trim() !== "";

  // Current category data
  const openSection = openCategoryId ? SECTIONS.find((s) => s.id === openCategoryId) : null;
  const openSectionTemplates = openSection
    ? (openSection.ids.map((id) => byId[id]).filter(Boolean) as Template[])
    : [];
  const openSectionMeta = openSection
    ? t[lang].sections[openSection.id as keyof typeof t[typeof lang]["sections"]]
    : null;

  const handleOpenCategory = (id: string) => {
    setOpenCategoryId(id);
    setVisibleCount(12);
    setAnimKey((k) => k + 1);
    // Scroll to grid top
    setTimeout(() => {
      gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleBack = () => {
    setOpenCategoryId(null);
    setAnimKey((k) => k + 1);
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
        <StudioAccessButton compact />
      </div>

      {/* ══════════════════════════════════════════════════
          VIEW 1 — Search results
      ══════════════════════════════════════════════════ */}
      {isSearching && (
        <div className="space-y-5">
          {searchResults.length > 0 ? (
            <>
              <p className="text-[13px] text-muted font-medium px-1">
                {t[lang].search.found.replace("{{n}}", String(searchResults.length))}
              </p>
              <div key={animKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                  : searchResults.slice(0, visibleCount).map((tmpl, i) => (
                      <div key={tmpl.id} className="anim-fade-up" style={{ animationDelay: `${i * 35}ms` }}>
                        <TemplateCard template={tmpl} purchasedIds={purchasedIds} onQuickView={handleQuickView} />
                      </div>
                    ))}
              </div>
              {!loading && searchResults.length > visibleCount && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setVisibleCount((v) => v + 12)}
                    className="px-6 py-2.5 glass border border-theme rounded-2xl text-[13px] font-semibold text-muted hover:text-theme hover:border-[#0A84FF]/30 transition-all duration-200 ios-spring"
                  >
                    {lang === "it"
                      ? `Mostra altri ${Math.min(12, searchResults.length - visibleCount)} →`
                      : `Show ${Math.min(12, searchResults.length - visibleCount)} more →`}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-24 flex flex-col items-center gap-4 text-center">
              <span className="text-5xl">🔍</span>
              <p className="text-[17px] font-semibold text-theme">{t[lang].search.notFound}</p>
              <p className="text-[14px] text-muted">{t[lang].search.notFoundDesc}</p>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          VIEW 2 — Category templates (drilled in)
      ══════════════════════════════════════════════════ */}
      {!isSearching && openCategoryId && openSection && openSectionMeta && (
        <div>
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
            <span className="text-zinc-300 dark:text-zinc-600">/</span>
            <span className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
              {openSection.emoji} {openSectionMeta.label}
            </span>
            <span className="bg-[#0A84FF]/10 text-[#0A84FF] rounded-full px-2 py-0.5 text-[11px] font-bold">
              {openSectionTemplates.length}
            </span>
          </div>

          {/* Template cards */}
          <div key={animKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {loading
              ? Array.from({ length: openSectionTemplates.length || 3 }).map((_, i) => <SkeletonCard key={i} />)
              : openSectionTemplates.map((tmpl, i) => (
                  <div key={tmpl.id} className="anim-fade-up" style={{ animationDelay: `${i * 45}ms` }}>
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
        <div>
          {/* Section label */}
          <div className="flex items-center gap-4 mb-6 px-1">
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-[10px] font-bold text-muted uppercase tracking-[0.18em] shrink-0">
              {templates.length} {lang === "it" ? "template disponibili" : "templates available"}
            </span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {SECTIONS.map((section, i) => {
              const sectionTemplates = section.ids.map((id) => byId[id]).filter(Boolean) as Template[];
              if (sectionTemplates.length === 0) return null;
              return (
                <CategoryCard
                  key={section.id}
                  section={section}
                  sectionTemplates={sectionTemplates}
                  onClick={() => handleOpenCategory(section.id)}
                  lang={lang}
                  index={i}
                />
              );
            })}
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

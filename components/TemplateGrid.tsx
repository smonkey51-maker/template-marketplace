"use client";

import { useState, useEffect, useMemo } from "react";
import { templates, Template } from "@/lib/templates";
import TemplateCard from "@/components/TemplateCard";
import StudioAccessButton from "@/components/StudioAccessButton";
import { useLang } from "@/components/LanguageProvider";
import { t, SEARCH_SYNONYMS } from "@/lib/i18n";

type CategoryFilter = "all" | "ui" | "prompt";

const SECTION_IDS: {
  id: string;
  emoji: string;
  ids: string[];
}[] = [
  { id: "professionals", emoji: "🏢", ids: ["real-estate-agent", "therapist-profile", "law-firm-services"] },
  { id: "lifestyle-finance", emoji: "🏡", ids: ["airbnb-property-listing", "budget-tracker", "personal-finance-dashboard"] },
  { id: "business", emoji: "🛍️", ids: ["artisan-product-catalog", "revenue-analytics", "pricing-table"] },
  { id: "startup", emoji: "🚀", ids: ["saas-landing-dark", "startup-product-launch", "hero-saas"] },
  { id: "creative", emoji: "🎨", ids: ["creative-agency-portfolio", "freelance-tech-profile", "blog-card-grid"] },
  { id: "copywriting-ai", emoji: "✍️", ids: ["cold-email-b2b", "product-description-ecom", "ai-assistant-system-prompt"] },
  { id: "hospitality", emoji: "🍽️", ids: ["restaurant-menu", "coffee-shop-landing", "hotel-booking"] },
  { id: "digital-product", emoji: "📱", ids: ["mobile-app-showcase", "feature-showcase", "saas-dashboard"] },
  { id: "personal-brand", emoji: "🪪", ids: ["digital-resume", "link-in-bio", "newsletter-landing"] },
];

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

function normalize(str: string): string {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function TemplateGrid() {
  const { lang } = useLang();
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  useEffect(() => {
    fetch("/api/purchases")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => setPurchasedIds(data.templateIds ?? []))
      .catch(() => setPurchasedIds([]))
      .finally(() => setLoading(false));
  }, []);

  const byId = Object.fromEntries(templates.map((tmpl) => [tmpl.id, tmpl]));
  const isFiltered = query.trim() !== "" || categoryFilter !== "all";

  const filteredTemplates = useMemo(() => {
    const q = normalize(query.trim());
    return templates.filter((tmpl) => {
      const matchesCategory = categoryFilter === "all" || tmpl.category === categoryFilter;
      if (!matchesCategory) return false;
      if (!q) return true;
      const synonyms: string[] = SEARCH_SYNONYMS[q] ?? [];
      const matchesDirect =
        normalize(tmpl.name).includes(q) ||
        normalize(tmpl.description).includes(q) ||
        tmpl.tags.some((tag) => normalize(tag).includes(q));
      const matchesSynonym = synonyms.some((syn) =>
        normalize(tmpl.name).includes(normalize(syn)) ||
        normalize(tmpl.description).includes(normalize(syn)) ||
        tmpl.tags.some((tag) => normalize(tag).includes(normalize(syn)))
      );
      return matchesDirect || matchesSynonym;
    });
  }, [query, categoryFilter]);

  const categoryChips: { value: CategoryFilter; label: string; activeClass: string }[] = [
    { value: "all",    label: t[lang].search.chipAll,    activeClass: "bg-[#0A84FF] text-white border-transparent shadow-[0_2px_12px_rgba(10,132,255,0.3)]" },
    { value: "ui",     label: t[lang].search.chipUI,     activeClass: "bg-[#0A84FF] text-white border-transparent shadow-[0_2px_12px_rgba(10,132,255,0.3)]" },
    { value: "prompt", label: t[lang].search.chipPrompt, activeClass: "bg-[#5E5CE6] text-white border-transparent shadow-[0_2px_12px_rgba(94,92,230,0.3)]" },
  ];

  return (
    <div id="browse" className="px-4 sm:px-6 pb-24 max-w-5xl mx-auto">

      {/* ── Search + Filter Bar ── */}
      <div className="sticky top-[60px] z-40 py-3 bg-page/80 backdrop-blur-xl -mx-4 sm:-mx-6 px-4 sm:px-6 mb-6 border-b border-theme">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              width="15" height="15" viewBox="0 0 20 20" fill="none">
              <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.7"/>
              <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t[lang].search.placeholder}
              className="w-full bg-input border border-theme rounded-2xl pl-10 pr-4 py-3 text-[14px] text-theme placeholder:text-muted outline-none focus:border-[#0A84FF]/50 focus:ring-2 focus:ring-[#0A84FF]/10 transition-all duration-200"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label={lang === "it" ? "Cancella ricerca" : "Clear search"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-theme transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {categoryChips.map((chip) => (
              <button
                key={chip.value}
                onClick={() => setCategoryFilter(chip.value)}
                className={`rounded-2xl px-4 py-3 text-[13px] font-semibold transition-all duration-200 ios-spring whitespace-nowrap border ${
                  categoryFilter === chip.value
                    ? chip.activeClass
                    : "text-muted border-theme bg-input hover:text-theme hover:border-[#0A84FF]/30"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Studio Access inline hint ── */}
      <div className="mb-7 flex items-center justify-between gap-3 px-1">
        <p className="text-[13px] text-muted">
          🤖 {t[lang].studioAccessBanner.title}
        </p>
        <StudioAccessButton compact />
      </div>

      {/* ── Section jump nav (non-filtered only) ── */}
      {!isFiltered && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-4 sm:-mx-6 px-4 sm:px-6" style={{ scrollbarWidth: "none" }}>
          {SECTION_IDS.map((section) => {
            const sectionMeta = t[lang].sections[section.id as keyof typeof t[typeof lang]["sections"]];
            return (
              <button
                key={section.id}
                onClick={() => {
                  document.getElementById(`section-${section.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-xl
                  bg-input border border-theme text-muted text-[12px] font-semibold
                  hover:text-theme hover:border-[#0A84FF]/30 transition-all duration-200 ios-spring
                  whitespace-nowrap"
              >
                <span>{section.emoji}</span>
                <span>{sectionMeta.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* ── Filtered results view ── */}
      {isFiltered ? (
        <div className="space-y-5">
          {filteredTemplates.length > 0 && (
            <p className="text-[13px] text-muted font-medium">
              {t[lang].search.found.replace("{{n}}", String(filteredTemplates.length))}
            </p>
          )}
          {filteredTemplates.length === 0 ? (
            <div className="py-24 flex flex-col items-center gap-4 text-center">
              <span className="text-5xl">🔍</span>
              <p className="text-[17px] font-semibold text-theme">{t[lang].search.notFound}</p>
              <p className="text-[14px] text-muted">{t[lang].search.notFoundDesc}</p>
              <button
                onClick={() => { setQuery(""); setCategoryFilter("all"); }}
                className="mt-2 px-5 py-2.5 bg-[#0A84FF] hover:bg-[#409CFF] text-white font-semibold rounded-2xl text-[14px] ios-spring transition-all duration-200"
              >
                {t[lang].search.resetCta}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                : filteredTemplates.map((tmpl, i) => (
                    <div key={tmpl.id} className="anim-fade-up" style={{ animationDelay: `${i * 35}ms` }}>
                      <TemplateCard template={tmpl} purchasedIds={purchasedIds} />
                    </div>
                  ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-14">
          {SECTION_IDS.map((section) => {
            const sectionTemplates = section.ids.map((id) => byId[id]).filter(Boolean) as Template[];
            if (sectionTemplates.length === 0) return null;
            const sectionMeta = t[lang].sections[section.id as keyof typeof t[typeof lang]["sections"]];

            return (
              <section key={section.id} id={`section-${section.id}`}>
                {/* Section header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-surface border border-theme flex items-center justify-center text-xl shrink-0 shadow-sm">
                    {section.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="text-[16px] sm:text-[18px] font-bold tracking-tight text-theme">
                        {sectionMeta.label}
                      </h2>
                      <span className="bg-[#0A84FF]/10 text-[#0A84FF] rounded-full px-2 py-0.5 text-[11px] font-bold shrink-0">
                        {sectionTemplates.length}
                      </span>
                    </div>
                    <p className="text-[12px] text-muted mt-0.5">{sectionMeta.subtitle}</p>
                  </div>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {loading
                    ? Array.from({ length: sectionTemplates.length }).map((_, i) => <SkeletonCard key={i} />)
                    : sectionTemplates.map((tmpl, i) => (
                        <div key={tmpl.id} className="anim-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                          <TemplateCard template={tmpl} purchasedIds={purchasedIds} />
                        </div>
                      ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

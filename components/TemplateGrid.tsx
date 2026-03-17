"use client";

import { useState, useEffect, useMemo } from "react";
import { templates, Template } from "@/lib/templates";
import TemplateCard from "@/components/TemplateCard";

type CategoryFilter = "all" | "ui" | "prompt";

const SECTIONS: {
  id: string;
  emoji: string;
  label: string;
  subtitle: string;
  ids: string[];
}[] = [
  {
    id: "professionals",
    emoji: "🏢",
    label: "Professionisti",
    subtitle: "Agenti immobiliari, psicologi, studi legali",
    ids: ["real-estate-agent", "therapist-profile", "law-firm-services"],
  },
  {
    id: "lifestyle-finance",
    emoji: "🏡",
    label: "Lifestyle & Finanza personale",
    subtitle: "Affitti brevi, budget tracker, gestione patrimonio",
    ids: ["airbnb-property-listing", "budget-tracker", "personal-finance-dashboard"],
  },
  {
    id: "business",
    emoji: "🛍️",
    label: "Imprenditori & Business",
    subtitle: "Cataloghi, analytics, pricing per piccole imprese",
    ids: ["artisan-product-catalog", "revenue-analytics", "pricing-table"],
  },
  {
    id: "startup",
    emoji: "🚀",
    label: "Startup & Lancio prodotto",
    subtitle: "Landing page, hero section, pagine di lancio",
    ids: ["saas-landing-dark", "startup-product-launch", "hero-saas"],
  },
  {
    id: "creative",
    emoji: "🎨",
    label: "Agenzie & Freelance",
    subtitle: "Portfolio, profili developer, blog",
    ids: ["creative-agency-portfolio", "freelance-tech-profile", "blog-card-grid"],
  },
  {
    id: "copywriting-ai",
    emoji: "✍️",
    label: "Copywriting & AI Prompt",
    subtitle: "Prompt pronti per vendite, SEO e assistenti AI",
    ids: ["cold-email-b2b", "product-description-ecom", "ai-assistant-system-prompt"],
  },
  {
    id: "hospitality",
    emoji: "🍽️",
    label: "Ristorazione & Hospitality",
    subtitle: "Ristoranti, café, hotel e strutture ricettive",
    ids: ["restaurant-menu", "coffee-shop-landing", "hotel-booking"],
  },
  {
    id: "digital-product",
    emoji: "📱",
    label: "App & Prodotto Digitale",
    subtitle: "Showcase app, dashboard SaaS, feature page",
    ids: ["mobile-app-showcase", "feature-showcase", "saas-dashboard"],
  },
  {
    id: "personal-brand",
    emoji: "🪪",
    label: "Identità & Personal Brand",
    subtitle: "CV digitale, link in bio, newsletter landing",
    ids: ["digital-resume", "link-in-bio", "newsletter-landing"],
  },
];

const CATEGORY_CHIPS: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "Tutti" },
  { value: "ui", label: "UI Template" },
  { value: "prompt", label: "Prompt" },
];

function SkeletonCard() {
  return (
    <div className="bg-card border border-theme rounded-[24px] overflow-hidden animate-pulse">
      <div className="h-40 bg-theme/5" />
      <div className="p-4 flex flex-col gap-2.5">
        <div className="h-2.5 w-20 bg-theme/8 rounded-full" />
        <div className="h-4 w-3/4 bg-theme/8 rounded-full" />
        <div className="mt-2 flex items-center justify-between">
          <div className="h-4 w-10 bg-theme/8 rounded-full" />
          <div className="h-3 w-14 bg-theme/8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function TemplateGrid() {
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  useEffect(() => {
    fetch("/api/purchases")
      .then((r) => {
        if (!r.ok) throw new Error("not signed in");
        return r.json();
      })
      .then((data) => setPurchasedIds(data.templateIds ?? []))
      .catch(() => setPurchasedIds([]))
      .finally(() => setLoading(false));
  }, []);

  const byId = Object.fromEntries(templates.map((t) => [t.id, t]));

  const isFiltered = query.trim() !== "" || categoryFilter !== "all";

  const filteredTemplates = useMemo(() => {
    const q = query.trim().toLowerCase();
    return templates.filter((t) => {
      const matchesCategory =
        categoryFilter === "all" || t.category === categoryFilter;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [query, categoryFilter]);

  return (
    <div id="browse" className="px-4 sm:px-6 pb-24 max-w-5xl mx-auto">
      {/* ── Search + Filter Bar ── */}
      <div className="sticky top-[60px] z-40 py-3 bg-page/80 backdrop-blur-xl -mx-4 sm:-mx-6 px-4 sm:px-6 mb-8 border-b border-theme">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              width="15"
              height="15"
              viewBox="0 0 20 20"
              fill="none"
            >
              <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.7" />
              <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cerca template…"
              className="w-full bg-input border border-theme rounded-2xl pl-9 pr-4 py-2.5 text-sm text-theme placeholder:text-muted outline-none focus:border-[#0A84FF]/50 focus:ring-2 focus:ring-[#0A84FF]/10 transition-all duration-200"
            />
          </div>

          {/* Category chips */}
          <div className="flex items-center gap-2 shrink-0">
            {CATEGORY_CHIPS.map((chip) => (
              <button
                key={chip.value}
                onClick={() => setCategoryFilter(chip.value)}
                className={`glass-subtle rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all duration-200 ios-spring whitespace-nowrap ${
                  categoryFilter === chip.value
                    ? "bg-[#0A84FF] text-white border-transparent"
                    : "text-muted hover:text-theme"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filtered results view ── */}
      {isFiltered ? (
        <div className="space-y-6">
          <p className="text-[13px] text-muted font-medium">
            {filteredTemplates.length > 0 ? (
              <>
                <span className="text-theme font-bold">{filteredTemplates.length}</span>{" "}
                template trovati
              </>
            ) : null}
          </p>

          {filteredTemplates.length === 0 ? (
            <div className="py-24 flex flex-col items-center gap-4 text-center">
              <span className="text-4xl">🔍</span>
              <p className="text-[17px] font-semibold text-theme">Nessun template trovato</p>
              <p className="text-[14px] text-muted">Prova con un termine diverso o cambia categoria.</p>
              <button
                onClick={() => { setQuery(""); setCategoryFilter("all"); }}
                className="mt-2 px-5 py-2.5 bg-[#0A84FF] hover:bg-[#409CFF] text-white font-semibold rounded-2xl text-[14px] ios-spring transition-all duration-200"
              >
                Sfoglia tutti
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
                      <SkeletonCard />
                    </div>
                  ))
                : filteredTemplates.map((t, i) => (
                    <div
                      key={t.id}
                      className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] anim-fade-up"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <TemplateCard template={t} purchasedIds={purchasedIds} />
                    </div>
                  ))}
            </div>
          )}
        </div>
      ) : (
        /* ── Normal sections view ── */
        <div className="space-y-14">
          {SECTIONS.map((section) => {
            const sectionTemplates = section.ids
              .map((id) => byId[id])
              .filter(Boolean) as Template[];

            if (sectionTemplates.length === 0) return null;

            return (
              <section key={section.id}>
                {/* Section header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl sm:text-3xl shrink-0">{section.emoji}</span>
                  <div className="min-w-0">
                    <h2 className="text-[17px] sm:text-[20px] font-bold tracking-tight flex flex-wrap items-center gap-x-2 gap-y-1 text-theme">
                      {section.label}
                      <span className="bg-[#0A84FF]/12 text-[#0A84FF] rounded-full px-2 py-0.5 text-[12px] font-semibold shrink-0">
                        {sectionTemplates.length}
                      </span>
                    </h2>
                    <p className="text-[12px] sm:text-[13px] text-muted mt-0.5 truncate">
                      {section.subtitle}
                    </p>
                  </div>
                </div>

                <div className="h-px border-t border-theme mb-5" />

                {/* Cards — flex-wrap so partial rows stay centered */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
                  {loading
                    ? Array.from({ length: sectionTemplates.length }).map((_, i) => (
                        <div key={i} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
                          <SkeletonCard />
                        </div>
                      ))
                    : sectionTemplates.map((t, i) => (
                        <div
                          key={t.id}
                          className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] anim-fade-up"
                          style={{ animationDelay: `${i * 60}ms` }}
                        >
                          <TemplateCard
                            template={t}
                            purchasedIds={purchasedIds}
                          />
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

"use client";

import { useState, useEffect } from "react";
import { templates, Template } from "@/lib/templates";
import TemplateCard from "@/components/TemplateCard";

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

  return (
    <div id="browse" className="px-4 sm:px-6 pb-24 max-w-5xl mx-auto space-y-14">
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
  );
}

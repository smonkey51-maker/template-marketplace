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
    id: "real-estate",
    emoji: "🏠",
    label: "Agenti immobiliari & Host Airbnb",
    subtitle: "Schede proprietà, profili agente, listing brevi",
    ids: ["real-estate-agent", "airbnb-property-listing"],
  },
  {
    id: "health-legal",
    emoji: "🩺",
    label: "Psicologi & Studi Legali",
    subtitle: "Profili professionali, servizi, prenotazioni",
    ids: ["therapist-profile", "law-firm-services"],
  },
  {
    id: "finance-artisan",
    emoji: "💰",
    label: "Finanza personale & Piccoli imprenditori",
    subtitle: "Budget, analytics, cataloghi prodotto",
    ids: [
      "budget-tracker",
      "personal-finance-dashboard",
      "artisan-product-catalog",
      "revenue-analytics",
    ],
  },
  {
    id: "startup-tech",
    emoji: "🚀",
    label: "Startup, Agenzie & Freelance tech",
    subtitle: "Landing page, portfolio, profili developer",
    ids: [
      "saas-landing-dark",
      "creative-agency-portfolio",
      "freelance-tech-profile",
      "startup-product-launch",
      "hero-saas",
      "pricing-table",
      "blog-card-grid",
    ],
  },
  {
    id: "copywriting-ai",
    emoji: "✍️",
    label: "Copywriting & AI Prompt",
    subtitle: "Prompt pronti per vendite, SEO e assistenti AI",
    ids: [
      "cold-email-b2b",
      "product-description-ecom",
      "ai-assistant-system-prompt",
    ],
  },
];

function SkeletonCard() {
  return (
    <div className="bg-[#1C1C1E] rounded-[28px] overflow-hidden animate-pulse">
      <div className="h-40 bg-white/[0.06]" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-3 w-24 bg-white/[0.06] rounded-full" />
        <div className="h-4 w-3/4 bg-white/[0.06] rounded-full" />
        <div className="mt-3 flex items-center justify-between">
          <div className="h-4 w-12 bg-white/[0.06] rounded-full" />
          <div className="h-3 w-16 bg-white/[0.06] rounded-full" />
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
    <div id="browse" className="px-6 pb-24 max-w-7xl mx-auto space-y-16">
      {SECTIONS.map((section) => {
        const sectionTemplates = section.ids
          .map((id) => byId[id])
          .filter(Boolean) as Template[];

        if (sectionTemplates.length === 0) return null;

        return (
          <section key={section.id}>
            {/* Section header */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{section.emoji}</span>
              <div>
                <h2 className="text-[20px] font-bold tracking-tight flex items-center gap-2">
                  {section.label}
                  <span className="bg-[#0A84FF]/15 text-[#0A84FF] rounded-full px-2.5 py-0.5 text-[13px] font-semibold">
                    {sectionTemplates.length}
                  </span>
                </h2>
                <p className="text-[13px] text-[#8E8E93] mt-0.5">
                  {section.subtitle}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.06] mb-6" />

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: sectionTemplates.length }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : sectionTemplates.map((t) => (
                    <TemplateCard
                      key={t.id}
                      template={t}
                      purchasedIds={purchasedIds}
                    />
                  ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

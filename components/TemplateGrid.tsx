"use client";

import { useState, useEffect } from "react";
import { templates } from "@/lib/templates";
import TemplateCard from "@/components/TemplateCard";

function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/4 overflow-hidden animate-pulse">
      <div className="h-40 bg-white/10" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-3 w-24 bg-white/10 rounded-full" />
        <div className="h-4 w-3/4 bg-white/10 rounded-full" />
        <div className="mt-3 flex items-center justify-between">
          <div className="h-4 w-12 bg-white/10 rounded-full" />
          <div className="h-3 w-16 bg-white/10 rounded-full" />
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

  const uiTemplates = templates.filter((t) => t.category === "ui");
  const promptTemplates = templates.filter((t) => t.category === "prompt");

  return (
    <>
      {/* UI Templates */}
      <section id="browse" className="px-6 pb-16 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            UI Templates
            <span className="text-sm font-normal text-gray-500">
              HTML + Tailwind CSS
            </span>
            <span className="bg-orange-500/15 text-orange-300 border border-orange-500/20 rounded-full px-3 py-0.5 text-sm font-normal">
              {uiTemplates.length}
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: uiTemplates.length }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : uiTemplates.map((t) => (
                <TemplateCard
                  key={t.id}
                  template={t}
                  purchasedIds={purchasedIds}
                />
              ))}
        </div>
      </section>

      {/* Prompt Templates */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            Prompt Templates
            <span className="text-sm font-normal text-gray-500">
              Works with any LLM
            </span>
            <span className="bg-orange-500/15 text-orange-300 border border-orange-500/20 rounded-full px-3 py-0.5 text-sm font-normal">
              {promptTemplates.length}
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: promptTemplates.length }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : promptTemplates.map((t) => (
                <TemplateCard
                  key={t.id}
                  template={t}
                  purchasedIds={purchasedIds}
                />
              ))}
        </div>
      </section>
    </>
  );
}

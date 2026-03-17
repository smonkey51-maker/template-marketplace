"use client";

import { useState, useEffect } from "react";
import { templates } from "@/lib/templates";
import TemplateCard from "@/components/TemplateCard";

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

  const uiTemplates = templates.filter((t) => t.category === "ui");
  const promptTemplates = templates.filter((t) => t.category === "prompt");

  return (
    <>
      {/* UI Templates */}
      <section id="browse" className="px-6 pb-16 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[22px] font-bold flex items-center gap-3 tracking-tight">
            UI Templates
            <span className="text-[13px] font-normal text-[#8E8E93]">
              HTML + Tailwind CSS
            </span>
            <span className="bg-[#FF9F0A]/15 text-[#FF9F0A] rounded-full px-2.5 py-0.5 text-[13px] font-semibold">
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
          <h2 className="text-[22px] font-bold flex items-center gap-3 tracking-tight">
            Prompt Templates
            <span className="text-[13px] font-normal text-[#8E8E93]">
              Works with any LLM
            </span>
            <span className="bg-[#FF9F0A]/15 text-[#FF9F0A] rounded-full px-2.5 py-0.5 text-[13px] font-semibold">
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

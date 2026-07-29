"use client";

import { templates, bundles } from "@/lib/templates";
import { CATEGORIES, STEPS } from "@/lib/homeData";
import { PILLARS } from "@/lib/gridData";

export default function TemplatesDropdown({ lang }: { lang: "it" | "en" }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-[580px] max-w-[calc(100vw-2rem)]">
      <div className="border border-theme rounded-2xl shadow-2xl overflow-hidden" style={{ background: "var(--bg)" }}>
        <div className="grid grid-cols-[180px_1fr]">
          {/* Left: steps */}
          <div className="p-4" style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-3 px-1" style={{ color: "var(--muted)" }}>
              {lang === "it" ? "Come funziona" : "How it works"}
            </p>
            <div className="flex flex-col gap-1">
              {STEPS.map((s) => (
                <div key={s.n} className="flex items-start gap-2.5 px-2 py-2.5 rounded-lg">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0 shadow-sm border"
                    style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold mb-0.5" style={{ color: "var(--muted)" }}>{s.n}</p>
                    <p className="text-[12px] font-semibold leading-tight" style={{ color: "var(--text)" }}>
                      {lang === "it" ? s.titleIt : s.titleEn}
                    </p>
                    <p className="text-[11px] mt-0.5 leading-tight" style={{ color: "var(--muted)" }}>
                      {lang === "it" ? s.descIt : s.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right: categories grouped by pillar */}
          <div className="p-4 overflow-y-auto max-h-[420px]">
            {PILLARS.map((pillar) => {
              const cats = CATEGORIES.filter((c) => c.pillar === pillar.id);
              return (
                <div key={pillar.id} className="mb-4 last:mb-0">
                  <div className="flex items-center gap-2 mb-1.5 px-1">
                    <span style={{ fontFamily: "var(--font-gatsunaga)", fontSize: "13px", color: "var(--accent)", opacity: 0.6 }}>
                      {pillar.kanji}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
                      {pillar.nameIt}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0">
                    {cats.map((cat) => (
                      <button
                        key={cat.id}
                        role="menuitem"
                        onClick={() => {
                          const el = document.getElementById(`section-${cat.id}`);
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                          else document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors hover:bg-surface focus:bg-surface"
                      >
                        <span className="text-xs flex-shrink-0">{cat.emoji}</span>
                        <span className="text-[11px] font-medium leading-tight" style={{ color: "var(--text)", opacity: 0.8 }}>
                          {lang === "it" ? cat.labelIt : cat.labelEn}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Footer hint */}
        <div className="px-4 py-2.5 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
          <span className="text-[11px]" style={{ color: "var(--muted)" }}>
            {templates.length} template · {bundles.length} bundle
          </span>
          <button
            onClick={() => document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" })}
            className="text-[11px] font-semibold transition-colors"
            style={{ color: "var(--accent)" }}
          >
            {lang === "it" ? "Vedi tutti →" : "Browse all →"}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Template, templates, formatPrice } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import { templateTranslations } from "@/lib/i18n";

function getRelated(current: Template, count = 3): Template[] {
  const scored = templates
    .filter((t) => t.id !== current.id)
    .map((t) => {
      const overlap = t.tags.filter((tag) => current.tags.includes(tag)).length;
      const sameCategory = t.category === current.category ? 2 : 0;
      const sameDlType = t.downloadType === current.downloadType ? 1 : 0;
      return { template: t, score: overlap * 3 + sameCategory + sameDlType };
    })
    .sort((a, b) => b.score - a.score);

  // Prefer templates with actual relevance (score > 0), fallback to same category
  const relevant = scored.filter((x) => x.score > 0).slice(0, count);
  if (relevant.length === count) return relevant.map((x) => x.template);

  // Backfill with same-category templates if not enough relevant ones
  const sameCategory = scored
    .filter((x) => x.template.category === current.category && x.score === 0)
    .slice(0, count - relevant.length);

  return [...relevant, ...sameCategory].slice(0, count).map((x) => x.template);
}

export default function RelatedTemplates({ currentTemplate }: { currentTemplate: Template }) {
  const { lang } = useLang();
  const related = getRelated(currentTemplate);
  if (related.length === 0) return null;

  return (
    <section className="px-4 py-8 max-w-2xl mx-auto">
      <p className="text-[11px] font-bold text-muted uppercase tracking-[0.2em] mb-4">
        {lang === "it" ? "Potrebbero interessarti" : "You might also like"}
      </p>
      <div className="flex flex-col gap-3">
        {related.map((tmpl) => {
          const tName =
            lang === "it" ? (templateTranslations[tmpl.id]?.name ?? tmpl.name) : tmpl.name;
          const tDesc =
            lang === "it"
              ? (templateTranslations[tmpl.id]?.description ?? tmpl.description)
              : tmpl.description;
          return (
            <Link
              key={tmpl.id}
              href={`/preview/${tmpl.id}`}
              className="flex items-center gap-4 bg-surface border border-theme r-md px-4 py-3.5 hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
            >
              <div className="w-10 h-10 flex items-center justify-center shrink-0 bg-accent/10">
                {tmpl.category === "ui" ? (
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <rect
                      x="1.5"
                      y="3.5"
                      width="17"
                      height="12"
                      rx="2"
                      stroke="var(--accent)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M5 15.5v2M15 15.5v2M4 17.5h12"
                      stroke="var(--accent)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg width="16" height="18" viewBox="0 0 16 20" fill="none" aria-hidden>
                    <rect
                      x="1.5"
                      y="1.5"
                      width="13"
                      height="17"
                      rx="2"
                      stroke="var(--accent)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M5 7h6M5 10.5h6M5 14h4"
                      stroke="var(--accent)"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-theme text-[14px] truncate">{tName}</p>
                <p className="text-[12px] text-muted truncate">{tDesc}</p>
              </div>
              <span className="text-[14px] font-bold shrink-0" style={{ color: "var(--accent)" }}>
                {formatPrice(tmpl.price)}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

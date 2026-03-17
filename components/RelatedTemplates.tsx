"use client";

import Link from "next/link";
import { Template, templates, formatPrice } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import { templateTranslations } from "@/lib/i18n";

function getRelated(current: Template, count = 3): Template[] {
  return templates
    .filter((t) => t.id !== current.id)
    .map((t) => {
      const overlap = t.tags.filter((tag) => current.tags.includes(tag)).length;
      const sameCategory = t.category === current.category ? 1 : 0;
      return { template: t, score: overlap * 2 + sameCategory };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((x) => x.template);
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
          const tName = lang === "it" ? (templateTranslations[tmpl.id]?.name ?? tmpl.name) : tmpl.name;
          const tDesc = lang === "it" ? (templateTranslations[tmpl.id]?.description ?? tmpl.description) : tmpl.description;
          return (
            <Link
              key={tmpl.id}
              href={`/preview/${tmpl.id}`}
              className="flex items-center gap-4 bg-surface border border-theme rounded-[20px] px-4 py-3.5 hover:border-[#0A84FF]/30 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                tmpl.category === "ui" ? "bg-[#007AFF]/15" : "bg-[#5E5CE6]/15"
              }`}>
                {tmpl.category === "ui" ? "🖼" : "📝"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-theme text-[14px] truncate">{tName}</p>
                <p className="text-[12px] text-muted truncate">{tDesc}</p>
              </div>
              <span className="text-[14px] font-bold text-[#0A84FF] shrink-0">{formatPrice(tmpl.price)}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

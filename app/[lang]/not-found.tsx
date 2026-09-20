"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/i18n";
import { getAllArticlesSorted } from "@/lib/articles";

const suggested = getAllArticlesSorted().slice(0, 3);

export default function NotFound() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-6 py-16">
      <div className="relative z-10 text-center max-w-lg w-full">
        <p
          className="text-[100px] sm:text-[120px] leading-none tracking-tighter select-none"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 300,
            color: "var(--accent)",
            letterSpacing: "-0.02em",
          }}
        >
          404
        </p>

        <h1 className="text-[20px] font-semibold text-theme mt-2 mb-3 tracking-tight">
          {t("notFoundTitle")}
        </h1>

        <p className="text-[15px] text-muted mb-8 leading-relaxed">{t("notFoundSub")}</p>

        <div className="mb-8">
          <p
            className="text-[10px] font-normal uppercase tracking-[0.18em] mb-4"
            style={{ fontFamily: "monospace", color: "var(--accent)" }}
          >
            {t("navArticoli")}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            {suggested.map((article) => (
              <Link
                key={article.slug}
                href={`/${lang}/articoli/${article.slug}`}
                className="r-md flex items-center gap-3 px-4 py-3 border border-theme hover:border-accent/30 transition-all duration-200 text-left group"
              >
                <p className="text-[13px] font-semibold text-theme truncate group-hover:text-accent transition-colors">
                  {article[lang].title}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <Link
          href={`/${lang}`}
          className="btn-brand gap-2 text-[15px] inline-flex"
          style={{ padding: "12px 24px" }}
        >
          {t("notFoundCta")}
        </Link>
      </div>
    </div>
  );
}

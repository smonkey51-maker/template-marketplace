"use client";

import Link from "next/link";
import TemplateCard from "@/components/TemplateCard";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { sellableTemplates } from "@/lib/templates";
import { usePurchases } from "@/lib/usePurchases";

/**
 * Homepage — catalog grid preview.
 *
 * A real slice of the catalog (actual `Template` records, actual
 * `TemplateCard` — wishlist, purchased state, checkout link all work exactly
 * as they do on /catalogo), not a mock grid of placeholder cards. Capped to
 * the newest few so the homepage stays a taste of the catalog, not a second
 * copy of it — "see the full catalog" is one tap away for the rest.
 */
const PREVIEW_COUNT = 6;

export default function CatalogPreview() {
  const { lang } = useLang();
  const t = copy[lang];
  const { purchasedIds } = usePurchases();

  // Editor's picks first (same signal the catalog's own badge uses), then
  // fill the rest — never an arbitrary array slice a content edit could
  // silently reorder into something stale.
  const featured = [...sellableTemplates]
    .sort((a, b) => Number(!!b.editorsPick) - Number(!!a.editorsPick))
    .slice(0, PREVIEW_COUNT);

  if (featured.length === 0) return null;

  return (
    <section
      className="mx-auto w-full max-w-[1400px] px-3 sm:px-4 lg:px-6 py-10 sm:py-14"
      aria-labelledby="home-catalog-heading"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <p className="fn-kicker mb-2">{t.homeCatalogKicker}</p>
          <h2
            id="home-catalog-heading"
            className="text-[26px] sm:text-[34px] font-black text-theme tracking-tight leading-tight"
          >
            {t.homeCatalogTitle}
          </h2>
          <p className="text-[14px] text-muted mt-2 max-w-md">{t.homeCatalogSub}</p>
        </div>
        <Link
          href={`/${lang}/catalogo`}
          className="btn-m3-outlined shrink-0 whitespace-nowrap text-[13px]"
        >
          {t.homeCatalogCta}
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {featured.map((template) => (
          <TemplateCard key={template.id} template={template} purchasedIds={purchasedIds} />
        ))}
      </div>
    </section>
  );
}

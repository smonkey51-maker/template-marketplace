"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { sellableTemplatesMeta, formatPrice } from "@/lib/templates";
import { getLocalizedName } from "@/lib/i18n";
import { getKindLabel, getCatKey } from "@/lib/categories";
import { TemplateThumb } from "@/components/TemplateThumb";

/**
 * The homepage catalogue, as a masonry wall — the Atelier Nove rebrand's
 * replacement for the bento hub's four destination cells. Every sellable
 * template gets one card (not a curated teaser): the brief was "tutti i
 * template", the gallery-wall read the Figma prototype's masonry direction
 * was going for only works with the full shelf on it.
 *
 * CSS multi-column layout, not a JS masonry library: `react-responsive-masonry`
 * (what the prototype used) adds a dependency and a client-side measure pass
 * for something `columns` does natively, with no layout shift and no JS.
 * Heights cycle through a small set of values so the columns settle at
 * different points — the staggered silhouette a masonry wall is for — rather
 * than every card being identically tall.
 */
const THUMB_HEIGHTS = [260, 200, 300, 230, 340, 210];

export default function TemplateMasonry() {
  const { lang } = useLang();

  return (
    <section
      id="catalogo-teaser"
      className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pb-20"
    >
      <div
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4"
        style={{ columnGap: "20px" }}
      >
        {sellableTemplatesMeta.map((item, idx) => (
          <Link
            key={item.id}
            href={`/${lang}/templates/${item.id}`}
            className="group block mb-5 break-inside-avoid bg-card border border-theme r-md overflow-hidden no-underline text-inherit transition-transform duration-300 hover:-translate-y-0.5"
          >
            <TemplateThumb
              id={item.id}
              name={getLocalizedName(item, lang)}
              height={THUMB_HEIGHTS[idx % THUMB_HEIGHTS.length]}
              priority={idx < 4}
            />
            <div className="px-4 py-3.5">
              <span
                className="fn-badge"
                data-cat={getCatKey(item)}
                style={{ marginBottom: 10, display: "inline-block" }}
              >
                {getKindLabel(item, lang)}
              </span>
              <h3
                className="mt-1.5 text-[16px] leading-snug"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--text)" }}
              >
                {getLocalizedName(item, lang)}
              </h3>
              <p
                className="mt-1.5 text-[13px]"
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  color: "var(--accent)",
                }}
              >
                {item.price === 0 ? (lang === "it" ? "Gratis" : "Free") : formatPrice(item.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

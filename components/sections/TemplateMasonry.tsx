"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { sellableTemplatesMeta, formatPrice } from "@/lib/templates";
import { getLocalizedName } from "@/lib/i18n";
import { getKindLabel, getCatKey } from "@/lib/categories";
import { TemplateThumb } from "@/components/TemplateThumb";

/**
 * The homepage catalogue, as a masonry wall — the FORMA rebrand's
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
 *
 * Small and quiet on purpose: at full poster size the product shots (app UI
 * screenshots, saturated banner colours) read as loud and off-brand next to
 * the flat paper/bordeaux system. Shrunk to a thumbnail and desaturated by
 * default (`.thumb-quiet`, full colour on hover) so the wall reads as a
 * catalogue index, not a billboard.
 */
const THUMB_HEIGHTS = [130, 100, 150, 110, 170, 105];

export default function TemplateMasonry() {
  const { lang } = useLang();

  return (
    <section
      id="catalogo-teaser"
      className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pb-20"
    >
      <div
        className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5"
        style={{ columnGap: "16px" }}
      >
        {sellableTemplatesMeta.map((item, idx) => (
          <Link
            key={item.id}
            href={`/${lang}/templates/${item.id}`}
            className="thumb-quiet group block mb-4 break-inside-avoid bg-card border border-theme r-md overflow-hidden no-underline text-inherit transition-transform duration-300 hover:-translate-y-0.5"
          >
            <TemplateThumb
              id={item.id}
              name={getLocalizedName(item, lang)}
              height={THUMB_HEIGHTS[idx % THUMB_HEIGHTS.length]}
              priority={idx < 4}
            />
            <div className="px-2.5 py-2">
              <span
                className="fn-badge"
                data-cat={getCatKey(item)}
                style={{
                  marginBottom: 6,
                  display: "inline-block",
                  fontSize: 8,
                  padding: "2px 7px",
                }}
              >
                {getKindLabel(item, lang)}
              </span>
              <h3
                className="mt-1 text-[12.5px] leading-snug line-clamp-1"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--text)" }}
              >
                {getLocalizedName(item, lang)}
              </h3>
              <p
                className="mt-0.5 text-[11px]"
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

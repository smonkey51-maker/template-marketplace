"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { sellableTemplatesMeta, sellableBundles } from "@/lib/templates";

const SELLABLE_COUNT = sellableTemplatesMeta.filter((t) => t.price > 0).length;

/**
 * Editorial hero — replaced the bento hub's four destination cells (see
 * Homepage.tsx). Split layout, text left / dedicated painting right, same
 * shape as the Figma prototype's Hero.tsx: full-bleed artwork carries the
 * atmosphere the flat paper side can't, text carries the pitch. Vermeer is
 * the original homepage hero painting, restored here rather than the bento
 * hub's dark veil-over-photo treatment — nothing sits on top of the image
 * this time, so it reads as a picture next to the page, not a background
 * behind it.
 *
 * No wordmark in the text column: SectionNav already puts one, enlarged, in
 * the fixed bar directly above this section, so repeating it would read as
 * a duplicate rather than as branding.
 */
export default function Hero() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <section className="border-b border-theme">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left — editorial text on paper */}
        <div
          className="flex flex-col justify-between px-4 sm:px-6 lg:px-10 py-12 lg:py-16"
          style={{ paddingTop: "calc(56px + env(safe-area-inset-top, 0px) + 56px)" }}
        >
          <div>
            <p
              className="text-[11px] font-semibold uppercase mb-6"
              style={{ color: "var(--accent)", letterSpacing: "0.26em" }}
            >
              {lang === "it" ? "FORMA · Studio digitale" : "FORMA · Digital studio"}
            </p>

            <h1
              className="max-w-xl"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                lineHeight: 1,
                letterSpacing: "-0.01em",
                color: "var(--text)",
              }}
            >
              {t.heroTagline}
            </h1>

            <p
              className="mt-6 max-w-md text-[15px] leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {t.heroSubSnap}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
            <Link href={`/${lang}/catalogo`} className="btn-brand inline-flex items-center gap-2">
              {t.heroCtaSnap.replace(" →", "")}
              <ArrowRight size={16} strokeWidth={2} aria-hidden />
            </Link>
            <Link
              href={`/${lang}/guida`}
              className="group inline-flex items-center gap-2 pb-1 text-sm font-semibold transition-colors"
              style={{ color: "var(--text)", borderBottom: "1px solid var(--border)" }}
            >
              {t.heroCtaGuidaSnap}
            </Link>

            <div className="flex gap-8 sm:ml-auto">
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    color: "var(--text)",
                  }}
                  className="text-2xl"
                >
                  {SELLABLE_COUNT}
                </div>
                <div
                  className="text-[11px] uppercase"
                  style={{ color: "var(--muted)", letterSpacing: "0.14em" }}
                >
                  {lang === "it" ? "Template" : "Templates"}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    color: "var(--text)",
                  }}
                  className="text-2xl"
                >
                  {sellableBundles.length}
                </div>
                <div
                  className="text-[11px] uppercase"
                  style={{ color: "var(--muted)", letterSpacing: "0.14em" }}
                >
                  {lang === "it" ? "Bundle" : "Bundles"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — full-bleed painting */}
        <div
          className="relative min-h-[320px] lg:min-h-full"
          style={{ background: "var(--surface-2)" }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/paintings/vermeer.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center 30%",
            }}
          />
        </div>
      </div>
    </section>
  );
}

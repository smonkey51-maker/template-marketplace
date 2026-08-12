"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";

/**
 * Homepage — AI Studio call-to-action banner.
 *
 * Links straight to `/studio` (the real, functional Studio — prompt input,
 * streaming generation against `/api/generate`), not the `/ai-studio`
 * marketing page, so the homepage's own CTA doesn't add an extra hop for
 * anyone ready to use it.
 */
export default function StudioCTA() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <section className="mx-auto w-full max-w-[1400px] px-3 sm:px-4 lg:px-6 pb-10 sm:pb-14">
      <div className="m3-panel p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
        <div className="flex-1">
          <p className="fn-kicker mb-2">{t.homeStudioKicker}</p>
          <h2 className="text-[24px] sm:text-[30px] font-black text-theme tracking-tight leading-tight mb-2">
            {t.homeStudioTitle}
          </h2>
          <p className="text-[14px] text-muted max-w-lg leading-relaxed">{t.homeStudioSub}</p>
        </div>
        <Link href={`/${lang}/studio`} className="btn-brand shrink-0 whitespace-nowrap">
          {t.homeStudioCta}
        </Link>
      </div>
    </section>
  );
}

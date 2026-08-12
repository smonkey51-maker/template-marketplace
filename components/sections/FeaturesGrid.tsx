"use client";

import { Sparkles, Zap, Bot, ShieldCheck } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";

/**
 * Homepage — "Why FORMA" features grid.
 *
 * Four M3 tonal cards (`.m3-surface`), no blur, no per-card entrance
 * animation beyond the shared fade-up utility already used elsewhere on
 * this page — a static grid doesn't need scroll-triggered motion to read.
 */
export default function FeaturesGrid() {
  const { lang } = useLang();
  const t = copy[lang];

  const features = [
    { icon: Sparkles, title: t.homeFeature1Title, desc: t.homeFeature1Desc },
    { icon: Zap, title: t.homeFeature2Title, desc: t.homeFeature2Desc },
    { icon: Bot, title: t.homeFeature3Title, desc: t.homeFeature3Desc },
    { icon: ShieldCheck, title: t.homeFeature4Title, desc: t.homeFeature4Desc },
  ];

  return (
    <section
      className="mx-auto w-full max-w-[1400px] px-3 sm:px-4 lg:px-6 py-10 sm:py-14"
      aria-labelledby="home-features-heading"
    >
      <div className="mb-6 sm:mb-8 max-w-lg">
        <p className="fn-kicker mb-2">{t.homeFeaturesKicker}</p>
        <h2
          id="home-features-heading"
          className="text-[26px] sm:text-[34px] font-black text-theme tracking-tight leading-tight"
        >
          {t.homeFeaturesTitle}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="m3-surface p-5 sm:p-6 flex flex-col gap-3">
            <div className="w-10 h-10 flex items-center justify-center r-md bg-accent/10">
              <Icon aria-hidden size={20} strokeWidth={1.75} className="text-accent" />
            </div>
            <h3 className="text-[15px] font-bold text-theme leading-snug">{title}</h3>
            <p className="text-[13px] text-muted leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

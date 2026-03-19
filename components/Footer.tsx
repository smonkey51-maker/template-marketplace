"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";

export default function Footer() {
  const { lang } = useLang();
  const f = t[lang].footer;

  return (
    <footer className="relative z-10 border-t border-theme bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <span className="text-[16px] font-bold text-zinc-900 dark:text-white tracking-tight select-none">
              TemplateLab
            </span>
            <p className="text-[12px] text-muted max-w-[200px] leading-relaxed">
              {f.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div className="flex flex-col gap-2.5">
              <p className="text-[10px] font-bold text-muted uppercase tracking-[0.15em] mb-0.5">Product</p>
              <Link href="/#bundles" className="text-[13px] text-muted hover:text-theme transition-colors duration-200">{f.bundles}</Link>
              <Link href="/guide" className="text-[13px] text-muted hover:text-theme transition-colors duration-200">{f.guide}</Link>
              <Link href="/studio" className="text-[13px] text-muted hover:text-theme transition-colors duration-200">{f.studio}</Link>
              <Link href="/account" className="text-[13px] text-muted hover:text-theme transition-colors duration-200">{f.account}</Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <p className="text-[10px] font-bold text-muted uppercase tracking-[0.15em] mb-0.5">Legal</p>
              <Link href="/privacy" className="text-[13px] text-muted hover:text-theme transition-colors duration-200">{f.privacy}</Link>
              <Link href="/terms" className="text-[13px] text-muted hover:text-theme transition-colors duration-200">{f.terms}</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-theme flex items-center justify-between gap-4 flex-wrap">
          <p className="text-[11px] text-muted">{f.copyright}</p>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <div className="flex items-center gap-1 text-[11px] text-muted">
              <span>Powered by</span>
              <span className="font-semibold text-zinc-900 dark:text-white">Claude AI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

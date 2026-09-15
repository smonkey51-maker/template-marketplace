"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { FormaLogoAnimated } from "@/components/FormaLogo";
import ThemeToggle from "@/components/ThemeToggle";

const ENTRIES = [
  { it: "Catalogo", en: "Catalog", href: "/catalogo", index: "01", noteIt: "Collezioni digitali curate", noteEn: "Curated digital collections" },
  { it: "Studio", en: "Studio", href: "/studio", index: "02", noteIt: "Rendile tue", noteEn: "Make them yours" },
  { it: "Guida", en: "Guide", href: "/guida", index: "03", noteIt: "Uso, installazione e licenze", noteEn: "Use, installation and licenses" },
] as const;

export default function HomeSplash() {
  const { lang } = useLang();
  return (
    <main className="min-h-[100svh] flex flex-col bg-page text-theme">
      <header className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-theme">
        <span className="text-[10px] uppercase tracking-[.24em] text-muted">Digital editions</span>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href={`/${lang}/account`} aria-label={lang === "it" ? "Il mio account" : "My account"} className="flex h-9 w-9 items-center justify-center border border-theme transition-colors hover:bg-[var(--surface)]">
            <User size={15} strokeWidth={1.6} aria-hidden />
          </Link>
        </div>
      </header>

      <section className="flex flex-1 flex-col justify-between px-6 md:px-10 pt-12 md:pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <FormaLogoAnimated className="w-full max-w-[900px]" />
          </div>
          <div className="lg:col-span-4 lg:pb-4">
            <p className="text-[clamp(1.7rem,3vw,3.25rem)] leading-[1.05] tracking-[-.025em]" style={{fontFamily:"var(--font-fraunces), Georgia, serif"}}>
              {lang === "it" ? "Arte in tasca." : "Art in your pocket."}
            </p>
            <p className="mt-4 max-w-sm text-sm text-muted leading-relaxed">
              {lang === "it" ? "Collezioni digitali curate e strumenti per renderle tue." : "Curated digital collections and tools to make them yours."}
            </p>
          </div>
        </div>

        <nav className="mt-16 md:mt-24 border-t border-theme" aria-label="Main navigation">
          <ul>
            {ENTRIES.map((e) => (
              <li key={e.href} className="border-b border-theme">
                <Link href={`/${lang}${e.href}`} className="group grid grid-cols-[48px_1fr_auto] md:grid-cols-[80px_1fr_1fr_auto] items-center gap-3 py-5 md:py-7 transition-colors hover:bg-[var(--surface)] md:px-3">
                  <span className="text-[10px] text-muted">[{e.index}]</span>
                  <span className="text-[clamp(1.5rem,3vw,2.8rem)] leading-none" style={{fontFamily:"var(--font-fraunces), Georgia, serif"}}>{lang === "it" ? e.it : e.en}</span>
                  <span className="hidden md:block text-xs text-muted">{lang === "it" ? e.noteIt : e.noteEn}</span>
                  <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </main>
  );
}

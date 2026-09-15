"use client";

import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { useLang } from "@/components/LanguageProvider";
import { FormaFooter } from "@/components/FormaFooter";
import { sellableBundles } from "@/lib/templates";
import { FORMAT_TILES, FORMAT_COUNTS } from "@/lib/catalogFormats";

export default function CatalogoHub() {
  const { lang } = useLang();
  return (
    <div className="fn-bg"><div className="fn-shell">
      <SiteNav />
      <main className="fn-section">
        <header className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-theme pb-10 md:pb-16">
          <div className="md:col-span-8">
            <span className="text-[10px] text-muted tracking-[.14em]">[01]</span>
            <h1 className="mt-4 text-[clamp(3.5rem,9vw,8rem)] leading-[.88] font-normal">{lang === "it" ? "Catalogo" : "Catalog"}</h1>
          </div>
          <p className="md:col-span-4 md:self-end text-sm text-muted max-w-sm">{lang === "it" ? "Collezioni digitali curate. Scegli un oggetto, usalo così com’è o portalo nello Studio per renderlo tuo." : "Curated digital collections. Choose an object, use it as it is, or take it into the Studio and make it yours."}</p>
        </header>

        <div className="mt-4">
          {FORMAT_TILES.map((tile, i) => {
            const label = lang === "it" ? tile.it : tile.en;
            return <Link key={tile.key} href={`/${lang}/catalogo/${tile.key}`} className="group grid grid-cols-[48px_1fr_auto] md:grid-cols-[80px_1.2fr_1fr_auto] items-center gap-4 py-7 md:py-10 border-b border-theme hover:bg-[var(--surface)] transition-colors md:px-3">
              <span className="text-[10px] text-muted">[{String(i+1).padStart(3,"0")}]</span>
              <span className="text-[clamp(1.7rem,4vw,3.5rem)] leading-none" style={{fontFamily:"var(--font-fraunces), Georgia, serif"}}>{label.title}</span>
              <span className="hidden md:block text-xs text-muted max-w-md">{label.desc}<br/><span className="uppercase tracking-[.12em] text-[9px]">{FORMAT_COUNTS[tile.key]} {lang === "it" ? "edizioni" : "editions"}</span></span>
              <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </Link>;
          })}
          {sellableBundles.length > 0 && <Link href={`/${lang}/catalogo/bundle`} className="group grid grid-cols-[48px_1fr_auto] md:grid-cols-[80px_1.2fr_1fr_auto] items-center gap-4 py-7 md:py-10 border-b border-theme hover:bg-[var(--surface)] transition-colors md:px-3">
            <span className="text-[10px] text-muted">[004]</span><span className="text-[clamp(1.7rem,4vw,3.5rem)] leading-none" style={{fontFamily:"var(--font-fraunces), Georgia, serif"}}>Bundle</span><span className="hidden md:block text-xs text-muted">{lang === "it" ? "Collezioni di più oggetti, raccolti come un’unica edizione." : "Multiple objects collected as a single edition."}</span><span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </Link>}
        </div>
      </main>
      <FormaFooter />
    </div></div>
  );
}

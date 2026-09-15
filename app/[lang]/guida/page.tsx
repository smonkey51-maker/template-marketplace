"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { FormaFooter } from "@/components/FormaFooter";

export default function GuidaPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const steps = [
    { n: "01", title: t("guideStep1Title"), body: t("guideStep1Body") },
    { n: "02", title: t("guideStep2Title"), body: t("guideStep2Body") },
    { n: "03", title: t("guideStep3Title"), body: t("guideStep3Body") },
    { n: "04", title: t("guideStep4Title"), body: t("guideStep4Body") },
  ];
  const faqs = [
    { q: t("guideFaq1Q"), a: t("guideFaq1A") }, { q: t("guideFaq2Q"), a: t("guideFaq2A") },
    { q: t("guideFaq3Q"), a: t("guideFaq3A") }, { q: t("guideFaq4Q"), a: t("guideFaq4A") },
    { q: t("guideFaq5Q"), a: t("guideFaq5A") },
  ];

  return <div className="fn-bg"><div className="fn-shell"><SiteNav />
    <main className="mx-auto w-full max-w-[1400px] px-6 py-12 md:px-10 md:py-20">
      <header className="grid gap-8 border-b border-theme pb-12 md:grid-cols-[180px_1fr]">
        <div className="text-[11px] uppercase tracking-[.16em] text-muted">[03] {lang === "it" ? "Manuale" : "Manual"}</div>
        <div><h1 className="text-[clamp(3.2rem,9vw,8rem)] font-normal leading-[.88]">{t("guideTitle")}</h1>
          <p className="mt-6 max-w-xl text-[15px] text-muted">{t("guideSub")}</p></div>
      </header>

      <div className="grid md:grid-cols-[180px_1fr]">
        <aside className="hidden border-r border-theme py-10 pr-8 md:block">
          <div className="sticky top-28 space-y-4 text-[11px] uppercase tracking-[.12em] text-muted">
            {steps.map(s => <a key={s.n} href={`#step-${s.n}`} className="block hover:text-theme">{s.n} — {s.title}</a>)}
            <a href="#faq" className="block hover:text-theme">05 — FAQ</a>
          </div>
        </aside>
        <div className="md:pl-12 lg:pl-20">
          {steps.map(step => <section id={`step-${step.n}`} key={step.n} className="grid gap-5 border-b border-theme py-12 md:grid-cols-[90px_1fr] md:py-16">
            <div className="text-[12px] tracking-[.12em] text-muted">[{step.n}]</div>
            <div><h2 className="text-[clamp(2rem,4vw,3.5rem)] font-normal">{step.title}</h2><p className="mt-5 max-w-2xl text-[15px] leading-7 text-muted">{step.body}</p></div>
          </section>)}

          <section id="faq" className="py-16"><div className="text-[11px] uppercase tracking-[.14em] text-muted">[05] {t("guideFaqKicker")}</div>
            <h2 className="mt-3 text-[clamp(2.2rem,5vw,4rem)] font-normal">{t("guideFaqTitle")}</h2>
            <ul className="mt-8 border-t border-theme">{faqs.map((faq,i)=>{const open=openFaq===i; return <li key={faq.q} className="border-b border-theme">
              <button onClick={()=>setOpenFaq(open?null:i)} aria-expanded={open} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                <span className="text-[1.05rem] font-medium">{String(i+1).padStart(2,"0")} — {faq.q}</span>{open?<Minus size={17}/>:<Plus size={17}/>}</button>
              <div className="grid transition-all duration-300" style={{gridTemplateRows:open?"1fr":"0fr",opacity:open?1:0}}><div className="overflow-hidden"><p className="max-w-2xl pb-7 text-[14px] leading-7 text-muted">{faq.a}</p></div></div>
            </li>})}</ul>
          </section>
          <div className="flex flex-wrap gap-6 border-t border-theme py-12 text-[13px]"><Link href={`/${lang}/catalogo`} className="underline underline-offset-4">{t("guideCta1")} →</Link><Link href={`/${lang}/studio`} className="underline underline-offset-4">{t("guideCta2")} →</Link></div>
        </div>
      </div>
    </main><FormaFooter /></div></div>;
}

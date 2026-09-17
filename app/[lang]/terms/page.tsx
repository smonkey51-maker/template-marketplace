"use client";

import SiteNav from "@/components/SiteNav";
import { FormaFooter } from "@/components/FormaFooter";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/i18n";

const SECTIONS = {
  it: [
    {
      title: "Natura del sito",
      body: "INSPO è un sito editoriale di commento e approfondimento, gratuito, senza vendita di prodotti, abbonamenti o servizi. Tutti i contenuti sono accessibili liberamente.",
    },
    {
      title: "Sito di fan non ufficiale",
      body: 'INSPO non è affiliato, sponsorizzato, avallato o in alcun modo collegato a CBS, Warner Bros. Television, o ai creatori, produttori e cast de "Il Mentalist". Ogni riferimento alla serie, ai personaggi o al titolo ha esclusivamente finalità di commento, critica e analisi, nei limiti dell\'uso corretto (fair use / fair dealing) applicabile al commento e alla critica.',
    },
    {
      title: "Proprietà dei contenuti",
      body: 'I testi pubblicati su INSPO (analisi, articoli, guide) sono opera originale degli autori del sito e non possono essere copiati o ripubblicati senza autorizzazione. "The Mentalist", i nomi dei personaggi e ogni marchio associato restano di proprietà dei rispettivi titolari dei diritti.',
    },
    {
      title: "Contenuti di psicologia",
      body: "Le guide pratiche di psicologia pubblicate sul sito hanno scopo educativo e informativo. Non costituiscono consulenza psicologica, medica o professionale, e non sostituiscono il parere di uno specialista qualificato.",
    },
    {
      title: "Limitazione di responsabilità",
      body: 'I contenuti sono forniti "così come sono". Non garantiamo che le tecniche descritte producano risultati specifici, e non siamo responsabili per l\'uso che i lettori ne fanno.',
    },
  ],
  en: [
    {
      title: "Nature of the site",
      body: "INSPO is a free editorial commentary and deep-dive site, with no products, subscriptions or services for sale. All content is freely accessible.",
    },
    {
      title: "Unofficial fan site",
      body: 'INSPO is not affiliated with, sponsored by, endorsed by, or in any way connected to CBS, Warner Bros. Television, or the creators, producers and cast of "The Mentalist". Any reference to the show, its characters or its title is solely for commentary, criticism and analysis purposes, within the bounds of fair use / fair dealing applicable to commentary and criticism.',
    },
    {
      title: "Content ownership",
      body: 'The text published on INSPO (analysis, articles, guides) is original work by the site\'s authors and may not be copied or republished without permission. "The Mentalist", its character names and any associated trademarks remain the property of their respective rights holders.',
    },
    {
      title: "Psychology content",
      body: "The practical psychology guides published on the site are for educational and informational purposes. They do not constitute psychological, medical or professional advice, and do not replace the opinion of a qualified specialist.",
    },
    {
      title: "Limitation of liability",
      body: 'Content is provided "as is". We do not guarantee that the described techniques will produce specific results, and we are not responsible for how readers use them.',
    },
  ],
} as const;

export default function TermsPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const sections = SECTIONS[lang];

  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden">
      <SiteNav />
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "16px",
          }}
        >
          {t("termsKicker")} · {t("siteName")}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontSize: "clamp(36px, 5vw, 52px)",
            fontWeight: 400,
            letterSpacing: "0.01em",
            lineHeight: 1.1,
          }}
          className="text-theme mb-3"
        >
          {lang === "it" ? "Termini di Servizio" : "Terms of Service"}
        </h1>
        <p className="text-[13px] text-muted mb-10">
          {t("lastUpdated")}: {lang === "it" ? "marzo 2026" : "March 2026"}
        </p>

        <div className="space-y-8 text-[14px] text-muted leading-relaxed">
          {sections.map((s) => (
            <section key={s.title}>
              <h2
                className="text-[15px] font-semibold text-theme mb-2"
                style={{ fontFamily: "var(--font-fraunces), sans-serif", letterSpacing: "0.02em" }}
              >
                {s.title}
              </h2>
              <p>{s.body}</p>
            </section>
          ))}
        </div>
      </div>
      <FormaFooter />
    </div>
  );
}

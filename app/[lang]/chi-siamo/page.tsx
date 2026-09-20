import type { Metadata } from "next";
import { toLocale } from "@/lib/locales";
import { copy } from "@/lib/i18n";
import SiteNav from "@/components/SiteNav";
import { FormaFooter } from "@/components/FormaFooter";
import { ArtHeader, PAINTINGS } from "@/components/ArtHeader";

const META = {
  it: {
    title: "Chi siamo — INSPO",
    description:
      'INSPO è un progetto di fan indipendente su "Il Mentalist" e la psicologia dell\'osservazione.',
  },
  en: {
    title: "About — INSPO",
    description:
      'INSPO is an independent fan project about "The Mentalist" and the psychology of observation.',
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  return { title: META[lang].title, description: META[lang].description };
}

const CONTENT = {
  it: [
    {
      heading: "Cos'è INSPO",
      body: 'INSPO è un sito di commento e approfondimento nato dalla passione per "Il Mentalist" e per il personaggio di Patrick Jane, unita a un interesse concreto per la psicologia applicabile alla vita di tutti i giorni. Pubblichiamo due tipi di contenuti: analisi da fan sul personaggio, i suoi metodi e la serie, e guide pratiche su tecniche psicologiche reali — osservazione, linguaggio del corpo, memoria, ascolto attivo, persuasione, cold reading.',
    },
    {
      heading: "Non siamo un prodotto ufficiale",
      body: 'INSPO è un progetto indipendente, gestito da fan, senza alcuna relazione contrattuale, commerciale o editoriale con CBS, Warner Bros. Television, i produttori, gli sceneggiatori o il cast de "Il Mentalist". Non siamo autorizzati, sponsorizzati, avallati o in alcun modo affiliati ai detentori dei diritti della serie. "The Mentalist" e i nomi dei personaggi sono marchi e opere protette dai rispettivi proprietari, citati qui esclusivamente a scopo di commento, critica e analisi — un uso che riteniamo rientri nelle pratiche comuni di fan commentary.',
    },
    {
      heading: "Come trattiamo i contenuti della serie",
      body: "Non pubblichiamo né script, né trascrizioni di episodi, né screenshot o fotogrammi dello show, né immagini dell'attore protagonista o del cast. Le nostre analisi sono scritte con parole nostre, come commento e interpretazione — non riproduzione — del materiale originale. Le immagini che usiamo sul sito sono opere d'arte di pubblico dominio o illustrazioni generiche, mai materiale tratto dalla serie.",
    },
    {
      heading: "Sulle tecniche di psicologia che descriviamo",
      body: "Gli articoli sulla parte 'psicologia pratica' del sito descrivono concetti generali — osservazione, ascolto attivo, mnemotecniche, principi di persuasione, il fenomeno del cold reading — con l'obiettivo di essere informativi ed educativi. Non sostituiscono una consulenza professionale, e non garantiamo risultati specifici: sono strumenti di consapevolezza, non promesse.",
    },
    {
      heading: "Contatti",
      body: "Per domande, correzioni o segnalazioni relative ai contenuti del sito, scrivici all'indirizzo indicato nel footer.",
    },
  ],
  en: [
    {
      heading: "What INSPO is",
      body: 'INSPO is a commentary and deep-dive site born from a passion for "The Mentalist" and the character of Patrick Jane, combined with a genuine interest in psychology applicable to everyday life. We publish two kinds of content: fan analysis of the character, his methods and the show, and practical guides on real psychological techniques — observation, body language, memory, active listening, persuasion, cold reading.',
    },
    {
      heading: "We are not an official product",
      body: 'INSPO is an independent, fan-run project with no contractual, commercial or editorial relationship with CBS, Warner Bros. Television, the producers, writers or cast of "The Mentalist". We are not authorised, sponsored, endorsed or in any way affiliated with the rights holders of the show. "The Mentalist" and its character names are trademarks and protected works belonging to their respective owners, referenced here solely for commentary, criticism and analysis — a use we believe falls within common fan-commentary practice.',
    },
    {
      heading: "How we treat the show's material",
      body: "We do not publish scripts, episode transcripts, screenshots or stills from the show, nor images of the lead actor or cast. Our analysis is written in our own words, as commentary and interpretation — not reproduction — of the original material. Any images used on the site are public-domain artwork or generic illustrations, never material taken from the show.",
    },
    {
      heading: "About the psychology techniques we describe",
      body: "The articles in the site's 'practical psychology' section describe general concepts — observation, active listening, mnemonics, persuasion principles, the cold-reading phenomenon — aimed at being informative and educational. They do not replace professional advice, and we do not guarantee specific outcomes: they are tools for awareness, not promises.",
    },
    {
      heading: "Contact",
      body: "For questions, corrections or content concerns, reach us at the address listed in the footer.",
    },
  ],
} as const;

export default async function ChiSiamoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const sections = CONTENT[lang];

  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden">
      <SiteNav />
      <div className="mx-auto max-w-[720px] px-4 sm:px-6">
        <ArtHeader
          painting={PAINTINGS.chiSiamo}
          kicker={t("chiSiamoKicker")}
          title={t("chiSiamoTitle")}
        />
        <div
          className="space-y-8 py-12 text-[15px] leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {sections.map((s) => (
            <section key={s.heading}>
              <h2
                className="mb-2 text-[1.1rem]"
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontWeight: 500,
                  color: "var(--text)",
                }}
              >
                {s.heading}
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

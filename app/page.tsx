import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} — ${SITE.tagline}` },
  description: SITE.description,
  alternates: { canonical: "/" },
};

const kicker = "font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-accent";

const STEPS = [
  ["Colloquio conoscitivo", "Ascoltiamo le esigenze dell'azienda e il contesto in cui operate."],
  ["Analisi e proposta", "Definiamo obiettivi, attività e tempi in una proposta chiara."],
  [
    "Avvio e monitoraggio",
    "Un consulente di riferimento segue il lavoro e ne verifica i risultati.",
  ],
];

const SERVICES = [
  ["Selezione e ricerca del personale", "Dal profilo cercato all'inserimento in azienda."],
  ["Valutazione e sviluppo delle persone", "Assessment, feedback e percorsi di crescita."],
  ["Formazione e leadership", "Percorsi per team e manager, costruiti sul vostro contesto."],
  ["Organizzazione e clima aziendale", "Ruoli, processi e benessere organizzativo."],
];

const PRINCIPLES = [
  [
    "Un consulente di riferimento",
    "Un interlocutore unico che conosce la vostra azienda e risponde del lavoro.",
  ],
  [
    "Obiettivi verificabili",
    "Ogni intervento parte da risultati concordati e si chiude con una verifica.",
  ],
  [
    "Riservatezza",
    "Le informazioni su persone e organizzazione restano nel perimetro del progetto.",
  ],
];

export default function HomePage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-10">
        <div className="glass grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className={kicker}>Consulenza HR</p>
            <h1 className="mt-3 text-[clamp(2rem,4.6vw,3.25rem)]">
              Persone e organizzazione, al passo con la tua impresa.
            </h1>
            <p className="mt-5 max-w-xl text-[17px] text-muted">
              Affianchiamo imprese e responsabili HR nella selezione, nella crescita delle persone e
              nell&apos;organizzazione del lavoro, con un consulente di riferimento dedicato.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contatti" className="btn btn-primary">
                Richiedi un colloquio
              </Link>
              <Link href="/servizi" className="btn btn-outline">
                Scopri i servizi
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-5" aria-labelledby="come-iniziamo">
            <h2
              id="come-iniziamo"
              className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted"
            >
              Come iniziamo
            </h2>
            <ol className="mt-4 space-y-4">
              {STEPS.map(([title, text], i) => (
                <li key={title} className="flex gap-4">
                  <span className="mt-0.5 font-mono text-[13px] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-medium">{title}</span>
                    <span className="block text-[14px] text-muted">{text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6">
        <p className={kicker}>Servizi</p>
        <h2 className="mt-2 text-[1.75rem]">Cosa facciamo per le imprese</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {SERVICES.map(([title, text]) => (
            <li key={title}>
              <Link href="/servizi" className="glass block h-full p-6 hover:border-line-strong">
                <span className="block text-[17px] font-semibold">{title}</span>
                <span className="mt-2 block text-[14px] text-muted">{text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-[1200px] px-4 pb-14 sm:px-6">
        <p className={kicker}>Metodo</p>
        <h2 className="mt-2 text-[1.75rem]">Come lavoriamo</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {PRINCIPLES.map(([title, text]) => (
            <li key={title} className="border-t border-line-strong pt-4">
              <h3 className="text-[17px]">{title}</h3>
              <p className="mt-2 text-[14px] text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Client area teaser */}
      <section className="mx-auto max-w-[1200px] px-4 pb-6 sm:px-6">
        <div className="glass flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-[1.25rem]">Area riservata per i clienti</h2>
            <p className="mt-2 max-w-xl text-[15px] text-muted">
              Il tuo profilo, gli appuntamenti con il consulente e le fatture, in un unico posto.
            </p>
          </div>
          <Link href="/area-riservata" className="btn btn-outline shrink-0">
            Scopri l&apos;area riservata
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

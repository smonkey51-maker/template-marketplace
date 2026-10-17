import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} — ${SITE.tagline}` },
  description: SITE.description,
  alternates: { canonical: "/" },
};

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

const CLIENT_AREA = [
  ["Il tuo profilo", "Le tue generalità e i dati dell'azienda per cui lavori."],
  [
    "Gli appuntamenti",
    "Il calendario degli incontri con il consulente, con il link per la videochiamata.",
  ],
  ["Le fatture", "Le fatture emesse, sempre consultabili e scaricabili."],
  ["Il tuo consulente", "Un riferimento unico, raggiungibile dall'area riservata."],
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
      {/* 1 · Hero: headline, two actions, the photo behind the glass */}
      <div className="relative isolate overflow-hidden">
        {/* The photo is in the page flow on purpose: the glass lenses refract what the page
            snapshot contains, and the snapshot ignores fixed elements. */}
        <Image
          src="/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
        <div aria-hidden className="hero-wash absolute inset-0 -z-10" />
        <section className="mx-auto max-w-[1200px] px-4 pb-24 pt-12 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-3xl">
            <div className="glass-hero px-6 py-10 text-center sm:px-12 sm:py-14">
              <h1 className="text-[clamp(2rem,4.6vw,3.25rem)]">
                Persone e organizzazione, al passo con la tua impresa.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-[17px] text-ink">
                Affianchiamo imprese e responsabili HR nella selezione, nella crescita delle persone
                e nell&apos;organizzazione del lavoro, con un consulente di riferimento dedicato.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/contatti" data-magnet className="btn btn-primary">
                  Richiedi un colloquio
                </Link>
                <Link href="/area-riservata" data-magnet className="btn btn-outline">
                  Area riservata
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 2 · Highlight banner */}
      <section className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6">
        <div className="glass-panel grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 data-reveal className="text-[1.75rem]">
              Il primo passo è un colloquio conoscitivo
            </h2>
            <p className="mt-3 max-w-2xl text-[16px] text-muted">
              Ascoltiamo le esigenze dell&apos;azienda e il contesto in cui operate, poi definiamo
              insieme obiettivi, attività e tempi.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Link href="/contatti" data-magnet className="btn btn-primary">
              Richiedi un colloquio
            </Link>
            <Link href="/metodo" data-magnet className="btn btn-outline">
              Il metodo
            </Link>
          </div>
        </div>
      </section>

      {/* 3 · Services */}
      <div className="band-tint">
        <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
          <h2 data-reveal className="text-center text-[1.75rem]">
            Cosa facciamo per le imprese
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map(([title, text]) => (
              <li key={title}>
                <Link
                  href="/servizi"
                  className="glass-panel block h-full p-6 hover:border-line-strong"
                >
                  <span className="block text-[17px] font-semibold">{title}</span>
                  <span className="mt-2 block text-[14px] text-muted">{text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* 4 · Dark band: how we start, three connected steps */}
      <div className="band-dark">
        <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
          <h2 data-reveal className="text-center text-[1.75rem] text-white">
            Come iniziamo
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map(([title, text]) => (
              <li key={title} data-reveal className="band-card p-6">
                <h3 className="text-[17px] text-white">{title}</h3>
                <p className="mt-2 text-[14px] text-white/80">{text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex justify-center">
            <Link href="/metodo" data-magnet className="btn btn-light">
              Scopri il metodo
            </Link>
          </div>
        </section>
      </div>

      {/* 5 · Principles as a checklist */}
      <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
        <div className="glass-panel grid gap-8 p-8 sm:p-10 lg:grid-cols-12">
          <h2 data-reveal className="text-[1.75rem] lg:col-span-4">
            Come lavoriamo
          </h2>
          <ul className="space-y-5 lg:col-span-8">
            {PRINCIPLES.map(([title, text]) => (
              <li key={title} className="flex gap-4">
                <span aria-hidden className="check-mark mt-1" />
                <span>
                  <span className="block text-[17px] font-semibold">{title}</span>
                  <span className="mt-1 block text-[14px] text-muted">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 · Dark slate band: the client area */}
      <div className="band-slate">
        <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
          <h2 data-reveal className="text-center text-[1.75rem] text-white">
            Area riservata per i clienti
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[15px] text-white/80">
            Tutto quello che riguarda il lavoro con noi, in un unico posto.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CLIENT_AREA.map(([title, text]) => (
              <li key={title} data-reveal className="band-card p-6">
                <h3 className="text-[17px] text-white">{title}</h3>
                <p className="mt-2 text-[14px] text-white/80">{text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <Link href="/area-riservata" data-magnet className="btn btn-light">
              Scopri l&apos;area riservata
            </Link>
          </div>
        </section>
      </div>

      {/* 7 · Closing call to action */}
      <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
        <div className="glass-panel px-6 py-10 text-center sm:px-12">
          <h2 data-reveal className="text-[1.75rem]">
            Parliamo della tua organizzazione
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[16px] text-muted">
            Raccontaci il contesto: ti rispondiamo con una proposta chiara.
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/contatti" data-magnet className="btn btn-primary">
              Contattaci
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

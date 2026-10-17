import { Fragment } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import PageShell from "@/components/PageShell";
import Band from "@/components/Band";
import HeroReady from "@/components/HeroReady";

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

const HERO_TITLE = "Persone e organizzazione, al passo con la tua impresa.";

const STATEMENT =
  "Dietro ogni organizzazione ci sono persone. Il nostro lavoro è aiutarle a trovarsi, a crescere e a lavorare bene insieme.";

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
      <HeroReady />
      {/* 1 · Hero: a full-screen photo and a giant headline that rises word by word */}
      <div className="tone-blue relative isolate flex min-h-[calc(100svh-6rem)] flex-col overflow-hidden text-ink">
        {/* The photo is in the page flow on purpose: the glass lenses refract what the page
            snapshot contains, and the snapshot ignores fixed elements. */}
        <div className="hero-wipe absolute inset-0 -z-10">
          <Image
            src="/hero-2.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-photo object-cover object-center"
          />
        </div>
        <div aria-hidden className="hero-wash absolute inset-0 -z-10" />
        <section className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-end px-4 pb-28 pt-24 sm:px-6">
          <h1 className="hero-title">
            {HERO_TITLE.split(" ").map((w, i) => (
              <Fragment key={`${w}-${i}`}>
                <span className="hero-word-mask">
                  <span className="hero-word" style={{ ["--i" as string]: i }}>
                    {w}
                  </span>
                </span>{" "}
              </Fragment>
            ))}
          </h1>
          <div className="hero-sub mt-8 grid items-end gap-6 md:grid-cols-12">
            <p className="max-w-xl text-[17px] text-ink md:col-span-7">
              Affianchiamo imprese e responsabili HR nella selezione, nella crescita delle persone e
              nell&apos;organizzazione del lavoro, con un consulente di riferimento dedicato.
            </p>
            <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
              <Link href="/contatti" className="btn btn-accent">
                Richiedi un colloquio
              </Link>
              <Link href="/area-riservata" className="btn btn-outline">
                Area riservata
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* 2 · Warm band: the human statement */}
      <Band tone="blue" label="Chi siamo in una frase" className="band-pad">
        <p className="statement">
          {STATEMENT.split(" ").map((w, i) => (
            <Fragment key={`${w}-${i}`}>
              <span className="statement-word" style={{ ["--i" as string]: i }}>
                {w}
              </span>{" "}
            </Fragment>
          ))}
        </p>
      </Band>

      {/* 3 · Dark band: services as hairline rows */}
      <Band tone="white" label="Servizi" className="band-pad">
        <h2 data-reveal className="band-title max-w-3xl">
          Cosa facciamo per le imprese
        </h2>
        <ul className="mt-12 sm:mt-16">
          {SERVICES.map(([title, text]) => (
            <li key={title} data-reveal>
              <Link href="/servizi" className="row-link">
                <span className="row-title text-[1.35rem] font-semibold tracking-tight sm:text-[1.6rem]">
                  {title}
                </span>
                <span className="text-[16px] text-muted">{text}</span>
                <span aria-hidden className="row-arrow text-[1.4rem]">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Band>

      {/* 4 · Warm band: how we start */}
      <Band tone="soft" label="Come iniziamo" className="band-pad">
        <h2 data-reveal className="band-title max-w-3xl">
          Si comincia ascoltando
        </h2>
        <ol className="col-rule mt-12 grid gap-10 sm:mt-16 md:grid-cols-3 md:gap-8">
          {STEPS.map(([title, text]) => (
            <li key={title} data-reveal>
              <h3 className="text-[1.35rem] font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-[16px] text-muted">{text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <Link href="/metodo" className="btn btn-primary">
            Scopri il metodo
          </Link>
        </div>
      </Band>

      {/* 5 · Dark band: the people, and how we work */}
      <Band
        tone="white"
        label="Come lavoriamo"
        className="band-pad"
        inner="grid gap-12 lg:grid-cols-12"
      >
        <div className="relative aspect-[4/5] overflow-hidden lg:col-span-5">
          <Image
            src="/hero.webp"
            alt="Un gruppo di persone che parla attorno a un tavolo di lavoro"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
            style={{ objectPosition: "42% 50%" }}
          />
        </div>
        <div className="lg:col-span-7 lg:pl-8">
          <h2 data-reveal className="band-title">
            Persone che lavorano con persone
          </h2>
          <ul className="mt-10">
            {PRINCIPLES.map(([title, text]) => (
              <li key={title} data-reveal className="row-line py-6">
                <h3 className="text-[1.25rem] font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 max-w-xl text-[16px] text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      {/* 6 · Warm band: the client area */}
      <Band tone="blue" label="Area riservata" className="band-pad">
        <h2 data-reveal className="band-title max-w-3xl">
          Un posto tuo, per seguire il lavoro
        </h2>
        <p className="mt-5 max-w-xl text-[17px] text-muted">
          Tutto quello che riguarda il lavoro con noi, in un unico spazio riservato ai clienti.
        </p>
        <ul className="col-rule mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {CLIENT_AREA.map(([title, text]) => (
            <li key={title} data-reveal>
              <h3 className="text-[1.2rem] font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-[15px] text-muted">{text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <Link href="/area-riservata" className="btn btn-outline">
            Scopri l&apos;area riservata
          </Link>
        </div>
      </Band>

      {/* 7 · Terracotta band: the one thing to do */}
      <Band tone="yellow" label="Contattaci" className="band-pad">
        <h2 data-reveal className="band-title max-w-4xl">
          Parliamo di persone.
        </h2>
        <p className="mt-5 max-w-xl text-[18px] text-muted">
          Raccontaci il contesto: ti rispondiamo con una proposta chiara.
        </p>
        <div className="mt-10">
          <Link href="/contatti" className="btn btn-primary">
            Richiedi un colloquio
          </Link>
        </div>
      </Band>
    </PageShell>
  );
}

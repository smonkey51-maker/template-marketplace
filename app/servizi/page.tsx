import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/meta";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import SectionIndex from "@/components/SectionIndex";

export const metadata: Metadata = pageMeta(
  "/servizi",
  "Servizi",
  "Selezione, sviluppo delle persone, formazione e organizzazione: i servizi di consulenza HR per le imprese.",
);

const SERVICES = [
  {
    id: "selezione",
    title: "Selezione e ricerca del personale",
    text: "Ti aiutiamo a trovare le persone giuste, definendo prima il profilo e poi il percorso per raggiungerle.",
    items: [
      "Definizione del profilo e dei criteri di valutazione",
      "Ricerca e primo screening dei candidati",
      "Colloqui e restituzione di una shortlist motivata",
      "Accompagnamento nei primi mesi di inserimento",
    ],
  },
  {
    id: "sviluppo",
    title: "Valutazione e sviluppo delle persone",
    text: "Strumenti per capire dove sono le persone oggi e come farle crescere insieme all'azienda.",
    items: [
      "Assessment delle competenze",
      "Feedback strutturato e piani di sviluppo individuali",
      "Percorsi di crescita e di carriera",
      "Supporto ai responsabili nella gestione dei collaboratori",
    ],
  },
  {
    id: "formazione",
    title: "Formazione e leadership",
    text: "Percorsi formativi costruiti sul contesto dell'azienda, non su cataloghi generici.",
    items: [
      "Analisi dei bisogni formativi",
      "Workshop e percorsi per team e manager",
      "Coaching individuale per ruoli di responsabilità",
      "Verifica dell'efficacia al termine del percorso",
    ],
  },
  {
    id: "organizzazione",
    title: "Organizzazione e clima aziendale",
    text: "Dall'analisi dei ruoli e dei processi HR alla lettura del clima interno.",
    items: [
      "Analisi organizzativa, ruoli e responsabilità",
      "Indagini di clima e restituzione dei risultati",
      "Definizione di policy e processi HR",
      "Supporto ai cambiamenti organizzativi",
    ],
  },
];

export default function ServiziPage() {
  return (
    <PageShell>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Servizi" }]}
        kicker="Servizi"
        title="Cosa facciamo per le imprese"
        subtitle="Quattro aree di lavoro, che si possono affrontare separatamente o come un unico percorso."
      />

      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="grid gap-6">
          {SERVICES.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-title`}
              className="glass-panel p-6 sm:p-8"
            >
              <div className="grid gap-6 md:grid-cols-12">
                <div className="md:col-span-5">
                  <p className="font-mono text-[12px] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 id={`${s.id}-title`} className="mt-1 text-[1.35rem]">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-[15px] text-muted">{s.text}</p>
                </div>
                <div className="md:col-span-7">
                  <h3 className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
                    Cosa include
                  </h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px]">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}

          <div className="flex flex-col items-start gap-4 pt-4 sm:flex-row sm:items-center">
            <p className="text-[15px] text-muted">
              Non sai da dove partire? Parliamone in un primo colloquio.
            </p>
            <Link href="/contatti" className="btn btn-primary">
              Richiedi un colloquio
            </Link>
          </div>
        </div>
        <SectionIndex items={SERVICES.map((s) => ({ id: s.id, label: s.title }))} />
      </div>
    </PageShell>
  );
}

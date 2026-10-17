import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/meta";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import Band from "@/components/Band";

export const metadata: Metadata = pageMeta(
  "/metodo",
  "Metodo",
  "Come lavoriamo: ascolto, analisi, piano e accompagnamento, con un consulente di riferimento.",
);

const STEPS = [
  [
    "Ascolto",
    "Un primo colloquio per capire l'azienda, le persone coinvolte e il risultato atteso.",
  ],
  ["Analisi", "Raccogliamo le informazioni necessarie e le leggiamo insieme a chi decide."],
  ["Piano", "Concordiamo attività, tempi e indicatori in una proposta scritta, senza sorprese."],
  [
    "Accompagnamento",
    "Un consulente di riferimento segue l'attività e verifica i risultati al termine.",
  ],
];

export default function MetodoPage() {
  return (
    <PageShell>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Metodo" }]}
        title="Come lavoriamo"
        subtitle="Un percorso in quattro passaggi, uguale per ogni servizio."
      />

      <Band tone="soft" className="band-pad">
        <ol className="col-rule grid gap-10 md:grid-cols-4 md:gap-8">
          {STEPS.map(([title, text]) => (
            <li key={title}>
              <h2 className="text-[1.5rem] font-semibold tracking-tight">{title}</h2>
              <p className="mt-3 text-[16px] text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </Band>

      <Band tone="blue" label="Riservatezza" className="band-pad">
        <section aria-labelledby="riservatezza" className="max-w-3xl">
          <h2 id="riservatezza" className="band-title">
            Riservatezza e dati personali
          </h2>
          <p className="mt-6 text-[18px] text-muted">
            In ambito HR si trattano informazioni delicate. Le usiamo solo per il progetto per cui
            ci vengono affidate, le condividiamo con il minor numero possibile di persone e le
            gestiamo secondo l&apos;
            <Link href="/privacy" className="text-ink underline">
              informativa privacy
            </Link>
            .
          </p>
        </section>
      </Band>
    </PageShell>
  );
}

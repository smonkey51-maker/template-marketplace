import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/meta";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";

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
        kicker="Metodo"
        title="Come lavoriamo"
        subtitle="Un percorso in quattro passaggi, uguale per ogni servizio."
      />

      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
        <ol className="grid gap-4 md:grid-cols-2">
          {STEPS.map(([title, text], i) => (
            <li key={title} className="glass-panel p-6">
              <span className="font-mono text-[12px] text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-1 text-[1.25rem]">{title}</h2>
              <p className="mt-2 text-[15px] text-muted">{text}</p>
            </li>
          ))}
        </ol>

        <section className="mt-12 max-w-2xl" aria-labelledby="riservatezza">
          <h2 id="riservatezza" className="text-[1.35rem]">
            Riservatezza e dati personali
          </h2>
          <p className="mt-3 text-[16px] text-muted">
            In ambito HR si trattano informazioni delicate. Le usiamo solo per il progetto per cui
            ci vengono affidate, le condividiamo con il minor numero possibile di persone e le
            gestiamo secondo l&apos;
            <Link href="/privacy" className="underline">
              informativa privacy
            </Link>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}

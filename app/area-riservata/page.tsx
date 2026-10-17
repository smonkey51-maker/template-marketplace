import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/meta";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = pageMeta(
  "/area-riservata",
  "Area riservata",
  "L'area riservata per i clienti: profilo, appuntamenti con il consulente e fatture.",
);

const CONTENTS = [
  ["Il tuo profilo", "Le tue generalità e i dati dell'azienda per cui lavori."],
  [
    "Gli appuntamenti",
    "Il calendario degli incontri con il consulente, con il link per la videochiamata.",
  ],
  ["Le fatture", "Le fatture emesse, sempre consultabili e scaricabili."],
];

export default function AreaRiservataPage() {
  return (
    <PageShell>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Area riservata" }]}
        kicker="Clienti"
        title="Area riservata"
        subtitle="Uno spazio personale per seguire il lavoro con il tuo consulente."
      />

      <div className="mx-auto max-w-[1200px] space-y-8 px-4 py-12 sm:px-6">
        <ul className="grid gap-4 md:grid-cols-3">
          {CONTENTS.map(([title, text]) => (
            <li key={title} className="glass p-6">
              <h2 className="text-[1.1rem]">{title}</h2>
              <p className="mt-2 text-[15px] text-muted">{text}</p>
            </li>
          ))}
        </ul>

        <div className="glass max-w-2xl p-6">
          <p className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
            In arrivo
          </p>
          <p className="mt-2 text-[15px]">
            L&apos;accesso non è ancora attivo. Se sei già nostro cliente, contattaci: ti avviseremo
            appena potrai entrare.
          </p>
          <Link href="/contatti" className="btn btn-outline mt-4">
            Contattaci
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/meta";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import Band from "@/components/Band";

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
        title="Area riservata"
        subtitle="Uno spazio personale per seguire il lavoro con il tuo consulente."
      />

      <Band tone="soft" className="band-pad">
        <ul className="col-rule grid gap-10 md:grid-cols-3 md:gap-8">
          {CONTENTS.map(([title, text]) => (
            <li key={title}>
              <h2 className="text-[1.4rem] font-semibold tracking-tight">{title}</h2>
              <p className="mt-3 text-[16px] text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </Band>

      <Band tone="blue" label="Accesso" className="band-pad">
        <div className="max-w-2xl">
          <p className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
            In arrivo
          </p>
          <p className="mt-3 text-[20px]">
            L&apos;accesso non è ancora attivo. Se sei già nostro cliente, contattaci: ti avviseremo
            appena potrai entrare.
          </p>
          <Link href="/contatti" className="btn btn-outline mt-8">
            Contattaci
          </Link>
        </div>
      </Band>
    </PageShell>
  );
}

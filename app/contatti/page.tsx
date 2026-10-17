import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Band from "@/components/Band";

export const metadata: Metadata = pageMeta(
  "/contatti",
  "Contatti",
  "Richiedi un primo colloquio di consulenza HR: compila il modulo e ti ricontatteremo.",
);

export default function ContattiPage() {
  return (
    <PageShell>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Contatti" }]}
        title="Richiedi un colloquio"
        subtitle="Raccontaci in breve l'esigenza: ti ricontatteremo per fissare un primo colloquio."
      />

      <Band tone="soft" className="band-pad" inner="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ContactForm />
        </div>
        <aside className="lg:col-span-4" aria-labelledby="dopo">
          <h2 id="dopo" className="text-[1.25rem] font-semibold tracking-tight">
            Cosa succede dopo
          </h2>
          <ol className="mt-4 space-y-5 text-[16px]">
            <li>
              <span className="font-semibold">Ti ricontattiamo</span>
              <span className="block text-muted">per fissare un primo colloquio conoscitivo.</span>
            </li>
            <li>
              <span className="font-semibold">Ascoltiamo l&apos;esigenza</span>
              <span className="block text-muted">
                senza impegno e nel rispetto della riservatezza.
              </span>
            </li>
            <li>
              <span className="font-semibold">Ricevi una proposta</span>
              <span className="block text-muted">con attività, tempi e indicatori.</span>
            </li>
          </ol>
        </aside>
      </Band>
    </PageShell>
  );
}

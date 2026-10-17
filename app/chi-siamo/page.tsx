import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/meta";
import { SITE } from "@/lib/site";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import Band from "@/components/Band";

export const metadata: Metadata = pageMeta(
  "/chi-siamo",
  "Chi siamo",
  "Lo studio di consulenza HR e il modo in cui lavora.",
);

export default function ChiSiamoPage() {
  return (
    <PageShell>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Chi siamo" }]}
        title={`${SITE.name}: consulenza HR per le imprese`}
        subtitle="Uno studio che mette al centro le persone e il modo in cui un'organizzazione lavora."
      />

      <Band tone="warm" className="band-pad">
        <section aria-labelledby="approccio" className="max-w-3xl">
          <h2 id="approccio" className="band-title">
            Il nostro approccio
          </h2>
          <p className="mt-6 text-[19px] leading-relaxed text-muted">
            Crediamo che un intervento HR funzioni quando parte dal contesto dell&apos;azienda, ha
            obiettivi chiari e viene verificato alla fine. Per questo ogni cliente ha un consulente
            di riferimento e un percorso scritto, condiviso prima di iniziare.
          </p>
        </section>

        {SITE.draft && (
          <aside className="panel mt-12 max-w-2xl p-6" aria-label="Contenuto da completare">
            <p className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
              Da completare
            </p>
            <p className="mt-2 text-[16px]">
              Questa sezione presenterà il team, le esperienze e le certificazioni dello studio. I
              contenuti verranno inseriti quando saranno definitivi.
            </p>
          </aside>
        )}
      </Band>

      <Band tone="clay" label="Contattaci" className="band-pad">
        <h2 className="band-title max-w-3xl">Conosciamoci.</h2>
        <div className="mt-10">
          <Link href="/contatti" className="btn btn-primary">
            Parla con noi
          </Link>
        </div>
      </Band>
    </PageShell>
  );
}

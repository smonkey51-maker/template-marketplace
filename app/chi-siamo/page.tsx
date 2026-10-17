import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/meta";
import { SITE } from "@/lib/site";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";

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
        kicker="Chi siamo"
        title={`${SITE.name}: consulenza HR per le imprese`}
        subtitle="Uno studio che mette al centro le persone e il modo in cui un'organizzazione lavora."
      />

      <div className="mx-auto max-w-[1200px] space-y-8 px-4 py-12 sm:px-6">
        <section className="max-w-2xl" aria-labelledby="approccio">
          <h2 id="approccio" className="text-[1.35rem]">
            Il nostro approccio
          </h2>
          <p className="mt-3 text-[16px] text-muted">
            Crediamo che un intervento HR funzioni quando parte dal contesto dell&apos;azienda, ha
            obiettivi chiari e viene verificato alla fine. Per questo ogni cliente ha un consulente
            di riferimento e un percorso scritto, condiviso prima di iniziare.
          </p>
        </section>

        {SITE.draft && (
          <aside className="glass-panel max-w-2xl p-6" aria-label="Contenuto da completare">
            <p className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
              Da completare
            </p>
            <p className="mt-2 text-[15px]">
              Questa sezione presenterà il team, le esperienze e le certificazioni dello studio. I
              contenuti verranno inseriti quando saranno definitivi.
            </p>
          </aside>
        )}

        <Link href="/contatti" className="btn btn-primary">
          Parla con noi
        </Link>
      </div>
    </PageShell>
  );
}

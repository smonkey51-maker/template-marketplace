import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { SITE } from "@/lib/site";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import SectionIndex from "@/components/SectionIndex";

export const metadata: Metadata = pageMeta(
  "/privacy",
  "Informativa privacy",
  "Come trattiamo i dati personali raccolti tramite il sito.",
);

const slug = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const SECTIONS: [string, string][] = [
  [
    "Titolare del trattamento",
    "Il titolare è il soggetto che gestisce il sito. I dati identificativi e di contatto verranno inseriti qui prima della pubblicazione definitiva.",
  ],
  [
    "Dati che raccogliamo",
    "Quando compili il modulo di contatto: nome e cognome, azienda, email, telefono (facoltativo) e il contenuto del messaggio. Quando ti iscrivi alla newsletter: il tuo indirizzo email. Il sito può inoltre registrare dati tecnici di navigazione e, se attivati, statistiche d'uso in forma aggregata.",
  ],
  [
    "Perché li trattiamo",
    "Per rispondere alla tua richiesta di contatto e, se lo richiedi, per inviarti la newsletter. La base giuridica è la tua richiesta (misure precontrattuali) e il tuo consenso per la newsletter, che puoi revocare in ogni momento.",
  ],
  [
    "Per quanto tempo",
    "I dati del modulo di contatto sono conservati per il tempo necessario a gestire la richiesta e gli eventuali rapporti che ne derivano. L'indirizzo della newsletter è conservato fino alla tua cancellazione.",
  ],
  [
    "I tuoi diritti",
    "Puoi chiedere l'accesso ai tuoi dati, la rettifica, la cancellazione, la limitazione del trattamento e l'opposizione, e proporre reclamo all'autorità di controllo (Garante per la protezione dei dati personali).",
  ],
];

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
        title="Informativa privacy"
        subtitle="Come trattiamo i dati personali raccolti tramite questo sito."
      />

      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="space-y-8">
          {SITE.draft && (
            <aside className="glass-panel max-w-2xl p-5" aria-label="Avviso sulla bozza">
              <p className="text-[14px]">
                <span className="font-medium">Bozza.</span> Questo testo è provvisorio e va
                verificato da un professionista legale prima della pubblicazione.
              </p>
            </aside>
          )}
          {SECTIONS.map(([title, text]) => (
            <section key={title} id={slug(title)} className="max-w-2xl scroll-mt-32">
              <h2 className="text-[1.15rem]">{title}</h2>
              <p className="mt-2 text-[15px] text-muted">{text}</p>
            </section>
          ))}
        </div>
        <SectionIndex items={SECTIONS.map(([title]) => ({ id: slug(title), label: title }))} />
      </div>
    </PageShell>
  );
}

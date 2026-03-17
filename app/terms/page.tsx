import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — TemplateLab",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-page px-4 sm:px-6 py-16 max-w-2xl mx-auto">
      <Link href="/" className="text-[14px] text-[#0A84FF] font-semibold mb-8 inline-block hover:opacity-80 transition-opacity">
        ← TemplateLab
      </Link>
      <h1 className="text-[28px] font-black text-theme mb-2">Termini di Servizio</h1>
      <p className="text-[13px] text-muted mb-10">Ultimo aggiornamento: marzo 2026</p>

      <div className="space-y-8 text-[14px] text-muted leading-relaxed">
        <section>
          <h2 className="text-[16px] font-bold text-theme mb-2">Acquisto e licenza</h2>
          <p>Acquistando un template su TemplateLab ottieni una licenza personale, non esclusiva e non trasferibile per utilizzarlo in un progetto commerciale o personale. Non è consentita la rivendita, redistribuzione o sub-licenza del template.</p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-theme mb-2">Pagamenti e rimborsi</h2>
          <p>I pagamenti sono processati da Stripe in modo sicuro. Gli acquisti di template digitali sono definitivi e non rimborsabili, salvo malfunzionamenti tecnici documentati. Per problemi contattaci entro 7 giorni dall'acquisto.</p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-theme mb-2">Studio Access</h2>
          <p>L'abbonamento Studio Access è mensile e si rinnova automaticamente. Puoi cancellarlo in qualsiasi momento dalla pagina Account. La cancellazione è effettiva al termine del periodo già pagato.</p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-theme mb-2">Proprietà intellettuale</h2>
          <p>I template sono di proprietà di TemplateLab. L'utilizzo è consentito nei limiti della licenza acquistata. Il codice generato dall'AI Studio è di tua proprietà una volta scaricato.</p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-theme mb-2">Limitazione di responsabilità</h2>
          <p>TemplateLab fornisce i template "così come sono". Non siamo responsabili per danni indiretti derivanti dall'uso dei template o dell'AI Studio.</p>
        </section>
      </div>
    </div>
  );
}

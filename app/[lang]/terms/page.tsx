"use client";

import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden">
      <SiteNav />
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <p
          style={{
            fontFamily: "monospace",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "16px",
          }}
        >
          Legale · Forma
        </p>
        <h1
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 5vw, 52px)",
            fontWeight: 400,
            letterSpacing: "0.01em",
            lineHeight: 1.1,
          }}
          className="text-theme mb-3"
        >
          Termini di Servizio
        </h1>
        <p className="text-[13px] text-muted mb-10">Ultimo aggiornamento: marzo 2026</p>

        <div className="space-y-8 text-[14px] text-muted leading-relaxed">
          <section>
            <h2
              className="text-[15px] font-semibold text-theme mb-2"
              style={{ fontFamily: "var(--font-montserrat), sans-serif", letterSpacing: "0.02em" }}
            >
              Acquisto e licenza
            </h2>
            <p>
              Acquistando un template su Forma ottieni una licenza personale, non esclusiva e non
              trasferibile per utilizzarlo in un progetto commerciale o personale. Non è consentita
              la rivendita, redistribuzione o sub-licenza del template.
            </p>
          </section>

          <section>
            <h2
              className="text-[15px] font-semibold text-theme mb-2"
              style={{ fontFamily: "var(--font-montserrat), sans-serif", letterSpacing: "0.02em" }}
            >
              Pagamenti e rimborsi
            </h2>
            <p>
              I pagamenti sono processati da Stripe in modo sicuro. Gli acquisti di template
              digitali sono definitivi e non rimborsabili, salvo malfunzionamenti tecnici
              documentati. Per problemi contattaci entro 7 giorni dall'acquisto.
            </p>
          </section>

          <section>
            <h2
              className="text-[15px] font-semibold text-theme mb-2"
              style={{ fontFamily: "var(--font-montserrat), sans-serif", letterSpacing: "0.02em" }}
            >
              Studio Access
            </h2>
            <p>
              L'abbonamento Studio Access è mensile e si rinnova automaticamente. Puoi cancellarlo
              in qualsiasi momento dalla pagina Account. La cancellazione è effettiva al termine del
              periodo già pagato.
            </p>
          </section>

          <section>
            <h2
              className="text-[15px] font-semibold text-theme mb-2"
              style={{ fontFamily: "var(--font-montserrat), sans-serif", letterSpacing: "0.02em" }}
            >
              Proprietà intellettuale
            </h2>
            <p>
              I template sono di proprietà di Forma. L'utilizzo è consentito nei limiti della
              licenza acquistata. Il codice generato dall'AI Studio è di tua proprietà una volta
              scaricato.
            </p>
          </section>

          <section>
            <h2
              className="text-[15px] font-semibold text-theme mb-2"
              style={{ fontFamily: "var(--font-montserrat), sans-serif", letterSpacing: "0.02em" }}
            >
              Limitazione di responsabilità
            </h2>
            <p>
              Forma fornisce i template "così come sono". Non siamo responsabili per danni indiretti
              derivanti dall'uso dei template o dell'AI Studio.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

"use client";

import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import { FormaFooter } from "@/components/FormaFooter";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden">
      <SiteNav />
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "16px",
          }}
        >
          Privacy · FORMA
        </p>
        <h1
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontSize: "clamp(36px, 5vw, 52px)",
            fontWeight: 400,
            letterSpacing: "0.01em",
            lineHeight: 1.1,
          }}
          className="text-theme mb-3"
        >
          Privacy Policy
        </h1>
        <p className="text-[13px] text-muted mb-10">Ultimo aggiornamento: marzo 2026</p>

        <div className="space-y-8 text-[14px] text-muted leading-relaxed">
          <section>
            <h2
              className="text-[15px] font-semibold text-theme mb-2"
              style={{ fontFamily: "var(--font-fraunces), sans-serif", letterSpacing: "0.02em" }}
            >
              Dati raccolti
            </h2>
            <p>
              FORMA raccoglie i dati minimi necessari per fornire il servizio: indirizzo email
              (tramite Clerk per l'autenticazione), dati di pagamento processati da Stripe (non
              archiviamo numeri di carta), e indirizzi email degli iscritti alla newsletter.
            </p>
          </section>

          <section>
            <h2
              className="text-[15px] font-semibold text-theme mb-2"
              style={{ fontFamily: "var(--font-fraunces), sans-serif", letterSpacing: "0.02em" }}
            >
              Utilizzo dei dati
            </h2>
            <p>
              I dati vengono utilizzati esclusivamente per: gestire il tuo account, processare gli
              acquisti, inviarti aggiornamenti sui nuovi template se iscritto alla newsletter. Non
              vendiamo né condividiamo i tuoi dati con terze parti a scopo commerciale.
            </p>
          </section>

          <section>
            <h2
              className="text-[15px] font-semibold text-theme mb-2"
              style={{ fontFamily: "var(--font-fraunces), sans-serif", letterSpacing: "0.02em" }}
            >
              Cookie e tracciamento
            </h2>
            <p>
              Il sito utilizza cookie tecnici necessari al funzionamento (sessione, autenticazione).
              Non utilizziamo cookie di tracciamento pubblicitario.
            </p>
          </section>

          <section>
            <h2
              className="text-[15px] font-semibold text-theme mb-2"
              style={{ fontFamily: "var(--font-fraunces), sans-serif", letterSpacing: "0.02em" }}
            >
              I tuoi diritti
            </h2>
            <p>
              Hai il diritto di accedere, modificare o cancellare i tuoi dati in qualsiasi momento.
              Per richieste, contattaci all'indirizzo indicato nel footer.
            </p>
          </section>

          <section>
            <h2
              className="text-[15px] font-semibold text-theme mb-2"
              style={{ fontFamily: "var(--font-fraunces), sans-serif", letterSpacing: "0.02em" }}
            >
              Servizi terzi
            </h2>
            <p>
              Utilizziamo Clerk per l'autenticazione, Stripe per i pagamenti e Supabase per il
              database. Ognuno di questi servizi ha la propria privacy policy disponibile sui
              rispettivi siti.
            </p>
          </section>
        </div>
      </div>
      <FormaFooter />
    </div>
  );
}

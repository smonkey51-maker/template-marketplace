import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — TemplateLab",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-page px-4 sm:px-6 py-16 max-w-2xl mx-auto">
      <Link href="/" className="text-[14px] text-[#0A84FF] font-semibold mb-8 inline-block hover:opacity-80 transition-opacity">
        ← TemplateLab
      </Link>
      <h1 className="text-[28px] font-black text-theme mb-2">Privacy Policy</h1>
      <p className="text-[13px] text-muted mb-10">Ultimo aggiornamento: marzo 2026</p>

      <div className="space-y-8 text-[14px] text-muted leading-relaxed">
        <section>
          <h2 className="text-[16px] font-bold text-theme mb-2">Dati raccolti</h2>
          <p>TemplateLab raccoglie i dati minimi necessari per fornire il servizio: indirizzo email (tramite Clerk per l'autenticazione), dati di pagamento processati da Stripe (non archiviamo numeri di carta), e indirizzi email degli iscritti alla newsletter.</p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-theme mb-2">Utilizzo dei dati</h2>
          <p>I dati vengono utilizzati esclusivamente per: gestire il tuo account, processare gli acquisti, inviarti aggiornamenti sui nuovi template se iscritto alla newsletter. Non vendiamo né condividiamo i tuoi dati con terze parti a scopo commerciale.</p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-theme mb-2">Cookie e tracciamento</h2>
          <p>Il sito utilizza cookie tecnici necessari al funzionamento (sessione, autenticazione). Non utilizziamo cookie di tracciamento pubblicitario.</p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-theme mb-2">I tuoi diritti</h2>
          <p>Hai il diritto di accedere, modificare o cancellare i tuoi dati in qualsiasi momento. Per richieste, contattaci all'indirizzo indicato nel footer.</p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-theme mb-2">Servizi terzi</h2>
          <p>Utilizziamo Clerk per l'autenticazione, Stripe per i pagamenti e Supabase per il database. Ognuno di questi servizi ha la propria privacy policy disponibile sui rispettivi siti.</p>
        </section>
      </div>
    </div>
  );
}

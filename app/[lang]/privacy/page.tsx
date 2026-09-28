"use client";

import SiteNav from "@/components/SiteNav";
import { OsservatorioFooter } from "@/components/OsservatorioFooter";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/i18n";

const SECTIONS = {
  it: [
    {
      title: "Dati raccolti",
      body: "Questo sito raccoglie dati minimi: l'indirizzo email di chi si iscrive alla newsletter, e dati di navigazione anonimi tramite PostHog (analytics), se configurato. Non ci sono account utente, non ci sono pagamenti, non c'è alcun database di terzi che archivia i tuoi dati personali oltre all'indirizzo email fornito volontariamente.",
    },
    {
      title: "Utilizzo dei dati",
      body: "L'unico uso dell'indirizzo email raccolto è l'invio occasionale di una notifica quando pubblichiamo un nuovo articolo. Non vendiamo né condividiamo la tua email con terze parti a scopo commerciale.",
    },
    {
      title: "Cookie e tracciamento",
      body: "Il sito non usa cookie di autenticazione o di sessione (non esiste un login). Se PostHog è configurato, l'analisi di navigazione è impostata per non usare cookie (persistenza in memoria) e per finalità puramente statistiche e aggregate.",
    },
    {
      title: "I tuoi diritti",
      body: "Puoi chiedere in qualsiasi momento la cancellazione della tua email dalla nostra lista di notifica, scrivendo all'indirizzo indicato nel footer.",
    },
    {
      title: "Servizi terzi",
      body: "Usiamo Resend per l'invio di email e, opzionalmente, PostHog per analytics aggregate. Ognuno di questi servizi ha una propria privacy policy disponibile sul rispettivo sito.",
    },
  ],
  en: [
    {
      title: "Data collected",
      body: "This site collects minimal data: the email address of anyone who subscribes to the newsletter, and anonymous browsing data via PostHog (analytics), if configured. There are no user accounts, no payments, and no third-party database storing your personal data beyond the email address you voluntarily provide.",
    },
    {
      title: "How data is used",
      body: "The only use of the collected email address is to occasionally notify you when we publish a new article. We do not sell or share your email with third parties for commercial purposes.",
    },
    {
      title: "Cookies and tracking",
      body: "The site uses no authentication or session cookies (there is no login). If PostHog is configured, browsing analytics are set to avoid cookies (in-memory persistence) and are used purely for aggregate, statistical purposes.",
    },
    {
      title: "Your rights",
      body: "You can ask us to remove your email from our notification list at any time by writing to the address listed in the footer.",
    },
    {
      title: "Third-party services",
      body: "We use Resend to send emails and, optionally, PostHog for aggregate analytics. Each of these services has its own privacy policy available on its respective website.",
    },
  ],
} as const;

export default function PrivacyPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const sections = SECTIONS[lang];

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
          {t("privacyKicker")} · {t("siteName")}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(36px, 5vw, 52px)",
            fontWeight: 400,
            letterSpacing: "0.01em",
            lineHeight: 1.1,
          }}
          className="text-theme mb-3"
        >
          Privacy Policy
        </h1>
        <p className="text-[13px] text-muted mb-10">
          {t("lastUpdated")}: {lang === "it" ? "marzo 2026" : "March 2026"}
        </p>

        <div className="space-y-8 text-[14px] text-muted leading-relaxed">
          {sections.map((s) => (
            <section key={s.title}>
              <h2
                className="text-[15px] font-semibold text-theme mb-2"
                style={{ fontFamily: "var(--font-display), sans-serif", letterSpacing: "0.02em" }}
              >
                {s.title}
              </h2>
              <p>{s.body}</p>
            </section>
          ))}
        </div>
      </div>
      <OsservatorioFooter />
    </div>
  );
}

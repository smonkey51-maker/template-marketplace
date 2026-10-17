import { copy } from "@/lib/i18n";
import ArticleBody from "@/components/ArticleBody";
import type { Locale } from "@/lib/locales";

const h2 = "font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted";

/** The base test material, shared by both pages: status, typography, buttons, fields, callout. */
export default function TestBase({ lang }: { lang: Locale }) {
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const L = (it: string, en: string) => (lang === "it" ? it : en);

  const status: [string, string][] = [
    [t("statusEnv"), t("statusEnvValue")],
    [t("statusContent"), t("statusContentValue")],
    [t("statusLangs"), "IT, EN"],
    [t("statusStack"), "Next.js 16 · React 19 · Tailwind 4 · Ark UI"],
  ];

  return (
    <div className="space-y-14">
      <section aria-labelledby="status">
        <h2 id="status" className={h2}>
          {t("statusTitle")}
        </h2>
        <div className="glass mt-4 overflow-hidden">
          <dl>
            {status.map(([k, v]) => (
              <div
                key={k}
                className="flex flex-col gap-1 border-b border-line px-5 py-3 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <dt className="text-[14px] text-muted">{k}</dt>
                <dd className="font-mono text-[14px] font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="type">
        <h2 id="type" className={h2}>
          {L("Tipografia", "Typography")}
        </h2>
        <div className="mt-4 space-y-3">
          <p className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight">
            {L("Titolo di primo livello", "Level one heading")}
          </p>
          <p className="text-[1.5rem] font-semibold">
            {L("Titolo di secondo livello", "Level two heading")}
          </p>
          <p className="text-[1.15rem] font-semibold">
            {L("Titolo di terzo livello", "Level three heading")}
          </p>
          <p className="max-w-[68ch] text-[16px]">
            {L(
              "Testo corrente in IBM Plex Sans a 16 px, con interlinea 1,6 e lunghezza di riga limitata per una lettura confortevole.",
              "Body text in IBM Plex Sans at 16 px, with 1.6 line height and a limited line length for comfortable reading.",
            )}
          </p>
          <p className="max-w-[68ch] text-[14px] text-muted">
            {L(
              "Testo secondario e didascalie in grigio freddo.",
              "Secondary text and captions in cool grey.",
            )}
          </p>
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
            {L("Etichetta in IBM Plex Mono", "Label in IBM Plex Mono")} · 2026-10-17
          </p>
        </div>
      </section>

      <section aria-labelledby="controls">
        <h2 id="controls" className={h2}>
          {L("Pulsanti e campi", "Buttons and fields")}
        </h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary">
            {L("Azione principale", "Primary action")}
          </button>
          <button type="button" className="btn btn-outline">
            {L("Azione secondaria", "Secondary action")}
          </button>
          <button type="button" className="btn btn-primary" disabled>
            {L("Disabilitato", "Disabled")}
          </button>
        </div>
        <div className="mt-4 grid max-w-xl gap-3 sm:grid-cols-2">
          <label className="text-[13px] font-medium">
            {L("Nome", "Name")}
            <input
              type="text"
              className="field mt-1"
              placeholder={L("Mario Rossi", "Alex Smith")}
            />
          </label>
          <label className="text-[13px] font-medium">
            Email
            <input type="email" className="field mt-1" placeholder="nome@example.com" />
          </label>
        </div>
      </section>

      <section aria-labelledby="callout">
        <h2 id="callout" className={h2}>
          Callout
        </h2>
        <div className="mt-4">
          <ArticleBody
            body={L(
              ":::callout In sintesi\nQuesto blocco serve a evidenziare un punto chiave. Usa un filo laterale e lo sfondo della superficie, senza ombre né gradienti.\n:::",
              ":::callout In brief\nThis block highlights a key point. It uses a side rule and the surface background, with no shadows or gradients.\n:::",
            )}
          />
        </div>
      </section>
    </div>
  );
}

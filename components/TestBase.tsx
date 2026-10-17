import ArticleBody from "@/components/ArticleBody";

const h2 = "font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted";

const STATUS: [string, string][] = [
  ["Ambiente", "Test"],
  ["Contenuti", "Esempio"],
  ["Lingua", "IT"],
  ["Stack", "Next.js 16 · React 19 · Tailwind 4 · Ark UI"],
];

/** The base test material shared by both test pages: status, typography, buttons, fields, callout. */
export default function TestBase() {
  return (
    <div className="space-y-14">
      <section aria-labelledby="status">
        <h2 id="status" className={h2}>
          Stato dell&apos;ambiente
        </h2>
        <div className="glass-panel mt-4 overflow-hidden">
          <dl>
            {STATUS.map(([k, v]) => (
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
          Tipografia
        </h2>
        <div className="mt-4 space-y-3">
          <p className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight">
            Titolo di primo livello
          </p>
          <p className="text-[1.5rem] font-semibold">Titolo di secondo livello</p>
          <p className="text-[1.15rem] font-semibold">Titolo di terzo livello</p>
          <p className="max-w-[68ch] text-[16px]">
            Testo corrente in IBM Plex Sans a 16 px, con interlinea 1,6 e lunghezza di riga limitata
            per una lettura confortevole.
          </p>
          <p className="max-w-[68ch] text-[14px] text-muted">
            Testo secondario e didascalie in grigio freddo.
          </p>
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
            Etichetta in IBM Plex Mono · 2026-10-17
          </p>
        </div>
      </section>

      <section aria-labelledby="controls">
        <h2 id="controls" className={h2}>
          Pulsanti e campi
        </h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary">
            Azione principale
          </button>
          <button type="button" className="btn btn-outline">
            Azione secondaria
          </button>
          <button type="button" className="btn btn-primary" disabled>
            Disabilitato
          </button>
        </div>
        <div className="mt-4 grid max-w-xl gap-3 sm:grid-cols-2">
          <label className="text-[13px] font-medium">
            Nome
            <input type="text" className="field mt-1" placeholder="Mario Rossi" />
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
            body=":::callout In sintesi
Questo blocco serve a evidenziare un punto chiave. Usa un filo laterale e il vetro, senza ombre pesanti.
:::"
          />
        </div>
      </section>
    </div>
  );
}

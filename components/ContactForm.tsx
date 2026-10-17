"use client";

import Link from "next/link";
import { useState } from "react";

type Fields = Record<string, string>;
type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string; fields: Fields };

const label = "block text-[13px] font-medium";
const err = "mt-1 text-[13px] text-danger";

/** Contact form: posts to /api/contact, shows per-field and general errors accessibly. */
export default function ContactForm() {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState({ kind: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          company: data.get("company"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
        }),
      });
      if (res.ok) {
        form.reset();
        setState({ kind: "sent" });
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { fields?: Fields };
      const message =
        res.status === 400
          ? "Controlla i campi evidenziati e riprova."
          : res.status === 429
            ? "Hai inviato troppe richieste. Riprova tra qualche minuto."
            : "Al momento non è possibile inviare il messaggio. Riprova più tardi.";
      setState({ kind: "error", message, fields: body.fields ?? {} });
    } catch {
      setState({
        kind: "error",
        message: "Connessione non riuscita. Controlla la rete e riprova.",
        fields: {},
      });
    }
  }

  if (state.kind === "sent") {
    return (
      <div role="status" className="panel p-8">
        <h2 className="text-[1.25rem]">Messaggio inviato</h2>
        <p className="mt-2 text-muted">
          Grazie per averci scritto. Ti ricontatteremo per fissare un primo colloquio.
        </p>
      </div>
    );
  }

  const fields = state.kind === "error" ? state.fields : {};
  const invalid = (name: string) => (fields[name] ? true : undefined);
  const describedBy = (name: string) => (fields[name] ? `${name}-error` : undefined);
  const sending = state.kind === "sending";

  const input = (
    name: string,
    text: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) => (
    <div>
      <label htmlFor={name} className={label}>
        {text}
      </label>
      <input
        id={name}
        name={name}
        className="field mt-1"
        aria-invalid={invalid(name)}
        aria-describedby={describedBy(name)}
        {...props}
      />
      {fields[name] && (
        <p id={`${name}-error`} className={err}>
          {fields[name]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="panel space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {input("name", "Nome e cognome *", { required: true, autoComplete: "name" })}
        {input("company", "Azienda *", { required: true, autoComplete: "organization" })}
        {input("email", "Email *", { type: "email", required: true, autoComplete: "email" })}
        {input("phone", "Telefono", { type: "tel", autoComplete: "tel" })}
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Messaggio *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={2000}
          className="field mt-1 py-3"
          aria-invalid={invalid("message")}
          aria-describedby={describedBy("message")}
        />
        {fields.message && (
          <p id="message-error" className={err}>
            {fields.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and from assistive tech; bots fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Sito web</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex items-start gap-3 text-[14px]">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--brand)]"
            aria-invalid={invalid("consent")}
            aria-describedby={describedBy("consent")}
          />
          <span>
            Ho letto l&apos;{" "}
            <Link href="/privacy" className="underline">
              informativa privacy
            </Link>{" "}
            e acconsento al trattamento dei dati per essere ricontattato. *
          </span>
        </label>
        {fields.consent && (
          <p id="consent-error" className={err}>
            {fields.consent}
          </p>
        )}
      </div>

      {state.kind === "error" && (
        <p role="alert" className="text-[14px] font-medium text-danger">
          {state.message}
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={sending}>
        {sending ? "Invio in corso…" : "Invia richiesta"}
      </button>
    </form>
  );
}

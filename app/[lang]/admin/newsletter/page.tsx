"use client";

import { useUser } from "@clerk/nextjs";
import BackLink from "@/components/BackLink";
import { useEffect, useState } from "react";

export default function NewsletterAdminPage() {
  const { user, isLoaded } = useUser();
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [count, setCount] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [result, setResult] = useState<{ sent: number; errors: number; total: number } | null>(
    null,
  );

  useEffect(() => {
    fetch("/api/admin/newsletter")
      .then((r) =>
        r.ok ? r.json() : Promise.reject(new Error(`/api/admin/newsletter ${r.status}`)),
      )
      .then((d) => setCount(d.count ?? null))
      .catch((e) => console.error("[NewsletterAdmin] fetch count:", e));
  }, []);

  if (!isLoaded) return null;
  if (!user) return <p className="p-8 text-muted">Accesso negato.</p>;

  const previewLines = body
    .split("\n")
    .filter(Boolean)
    .map((l, i) => (
      <p
        key={i}
        style={{ margin: "0 0 14px", fontSize: 15, color: "var(--muted)", lineHeight: 1.7 }}
      >
        {l}
      </p>
    ));

  const handleSend = async () => {
    if (!subject || !title || !body) return;
    const confirmed = window.confirm(
      `Stai per inviare la newsletter a ${count ?? "?"} subscriber. Continuare?`,
    );
    if (!confirmed) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/admin/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, title, body }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-page p-6 sm:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <BackLink />
        </div>
        <div className="mb-8">
          <p className="text-[11px] font-bold text-muted uppercase tracking-[0.2em] mb-1">Admin</p>
          <h1 className="text-2xl font-bold text-theme">Invia Newsletter</h1>
          {count !== null && (
            <p className="text-[13px] text-muted mt-1">{count} subscriber attivi</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-muted mb-1.5">
                Oggetto email
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="es. Nuovi template disponibili su Forma"
                className="w-full bg-input border border-theme r-md px-3 py-2.5 text-[13px] text-theme placeholder:text-muted outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-muted mb-1.5">Titolo</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="es. 5 nuovi template questa settimana"
                className="w-full bg-input border border-theme r-md px-3 py-2.5 text-[13px] text-theme placeholder:text-muted outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-muted mb-1.5">
                Corpo <span className="text-muted font-normal">(una riga = un paragrafo)</span>
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={"Ciao!\n\nQuesta settimana abbiamo aggiunto 5 nuovi template..."}
                rows={10}
                className="w-full bg-input border border-theme r-md px-3 py-2.5 text-[13px] text-theme placeholder:text-muted outline-none focus:border-accent/50 transition-colors resize-y font-mono"
              />
            </div>

            {status === "done" && result && (
              <p className="text-[13px] font-medium" style={{ color: "var(--success)" }}>
                Inviata a {result.sent}/{result.total} subscriber
                {result.errors > 0 && ` · ${result.errors} errori`}
              </p>
            )}
            {status === "error" && (
              <p className="text-[13px]" style={{ color: "var(--error)" }}>
                Errore durante l&apos;invio. Riprova.
              </p>
            )}

            <button
              onClick={handleSend}
              disabled={!subject || !title || !body || status === "sending"}
              className="btn-brand w-full justify-center text-[14px]"
              style={{ padding: "12px 24px" }}
            >
              {status === "sending" ? "Invio in corso…" : `Invia a ${count ?? "?"} subscriber`}
            </button>
          </div>

          {/* Preview */}
          <div>
            <p className="text-[12px] font-semibold text-muted mb-3">Anteprima</p>
            <div
              style={{
                background: "var(--bg)",
                overflow: "hidden",
                border: "1px solid var(--border)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  background: "linear-gradient(135deg, var(--accent) 0%, var(--terra) 100%)",
                  padding: "20px 24px",
                }}
              >
                <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#fff" }}>Forma</p>
                <p style={{ margin: "3px 0 0", fontSize: 12, color: "rgba(255,255,255,0.65)" }}>
                  Mercato del digitale artigianale
                </p>
              </div>
              {/* Body */}
              <div style={{ padding: "24px 24px 0" }}>
                <p
                  style={{
                    margin: "0 0 16px",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--text)",
                    letterSpacing: -0.3,
                  }}
                >
                  {title || <span style={{ color: "var(--muted)" }}>Titolo dell&apos;email</span>}
                </p>
                {previewLines.length > 0 ? (
                  previewLines
                ) : (
                  <p style={{ fontSize: 14, color: "var(--muted)" }}>Il corpo apparirà qui…</p>
                )}
                <hr
                  style={{ border: "none", borderTop: "1px solid var(--border)", margin: "20px 0" }}
                />
                <p style={{ margin: 0, fontSize: 11, color: "var(--muted)", lineHeight: 1.7 }}>
                  support@forma.design · forma.design
                </p>
              </div>
              {/* Footer */}
              <div
                style={{
                  background: "var(--surface)",
                  padding: "12px 24px",
                  marginTop: 20,
                  textAlign: "center",
                }}
              >
                <p style={{ margin: 0, fontSize: 11, color: "var(--muted)" }}>
                  © 2026 Forma. Tutti i diritti riservati.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

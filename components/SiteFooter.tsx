"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/site";
import SiteLogo from "@/components/SiteLogo";
import BigWordmark from "@/components/BigWordmark";

const SERVICES = [
  { href: "/servizi", label: "Servizi" },
  { href: "/metodo", label: "Metodo" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/contatti", label: "Contatti" },
  { href: "/area-riservata", label: "Area riservata" },
];

const LEGAL = [{ href: "/privacy", label: "Privacy" }];

const heading = "font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const column = (title: string, items: { href: string; label: string }[]) => (
    <div>
      <h2 className={heading}>{title}</h2>
      <ul className="mt-3 space-y-0.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="inline-block py-1.5 text-[14px] hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="band tone-blue pb-[env(safe-area-inset-bottom)] md:pb-20">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <SiteLogo tile />
            <p className="mt-4 max-w-sm text-[14px] text-muted">{SITE.tagline}.</p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-4">
            {column("Pagine", SERVICES)}
            {column("Note legali", LEGAL)}
          </div>

          <div className="md:col-span-4">
            <h2 className={heading}>Newsletter</h2>
            <p className="mt-4 text-[14px] text-muted">
              Novità e approfondimenti su HR e organizzazione, senza rumore.
            </p>
            {status !== "sent" ? (
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Indirizzo email"
                  aria-label="Indirizzo email"
                  className="field min-w-0 flex-1"
                />
                <button type="submit" className="btn btn-primary shrink-0">
                  Iscriviti
                </button>
              </form>
            ) : (
              <p role="status" className="mt-4 text-[14px] font-medium text-accent">
                Iscrizione registrata. Grazie.
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="mt-2 text-[13px] text-muted">
                Non è stato possibile completare l&apos;iscrizione. Riprova più tardi.
              </p>
            )}
            <p className="mt-3 text-[12px] text-muted">
              Iscrivendoti accetti l&apos;
              <Link href="/privacy" className="underline">
                informativa privacy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-14">
          <BigWordmark text={SITE.name.toUpperCase()} />
        </div>

        <div className="mt-10 flex flex-col gap-2 pt-6 font-mono text-[12px] text-muted sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}
          </p>
          {SITE.draft && <p>BOZZA · CONTENUTI PROVVISORI</p>}
        </div>
      </div>
    </footer>
  );
}

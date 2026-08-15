"use client";

import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { ArtHeader, PAINTINGS } from "@/components/ArtHeader";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { FormaFooter } from "@/components/FormaFooter";

/**
 * Standalone brand-statement page — not part of the homepage, which stays a
 * minimal splash on purpose (see HomeSplash.tsx). One quote, one short
 * paragraph, one link out: gallery wall text, not a product page. It still
 * says something true about this codebase — saturated categories get
 * retired rather than discounted, see the `retired` field in
 * lib/templates.ts — but states it once, briefly, instead of arguing the
 * case with pricing and review language a catalogue page already carries.
 */
export default function ManifestoPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];

  return (
    <div className="fn-bg">
      <div className="fn-shell">
        <SiteNav />
        <main className="fn-simple">
          <ArtHeader
            painting={PAINTINGS.manifesto}
            kicker={t("manifestoKicker")}
            title={t("manifestoTitle")}
          />

          <blockquote
            style={{
              margin: "48px 0 0",
              padding: 0,
              borderLeft: "2px solid var(--accent)",
              paddingLeft: 28,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(20px, 2.6vw, 30px)",
                lineHeight: 1.4,
                color: "var(--text)",
                margin: 0,
              }}
            >
              {t("manifestoQuote")}
            </p>
          </blockquote>

          <p
            style={{
              marginTop: 40,
              maxWidth: 560,
              color: "var(--muted)",
              fontSize: 16,
              lineHeight: 1.75,
            }}
          >
            {t("manifestoBody1")}
          </p>

          <div style={{ marginTop: 40 }}>
            <Link className="fn-btn primary" href={`/${lang}/catalogo`}>
              {t("manifestoCta")}
            </Link>
          </div>
        </main>
        <FormaFooter />
      </div>
    </div>
  );
}

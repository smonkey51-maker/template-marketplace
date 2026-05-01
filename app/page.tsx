import type { Metadata } from "next";
import { FormaLogoAnimated, FormaLogoStatic } from "@/components/FormaLogo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://forma.design";

export const metadata: Metadata = {
  title: "FORMA — Infrastructure for Digital Structure",
  description:
    "FORMA turns scattered initiatives into modular projects, visible flows and decision-ready systems. Built for teams that want control without visual noise.",
  openGraph: {
    title: "FORMA — Infrastructure for Digital Structure",
    description:
      "FORMA turns scattered initiatives into modular projects, visible flows and decision-ready systems.",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "FORMA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FORMA — Infrastructure for Digital Structure",
    description: "FORMA turns scattered initiatives into modular projects, visible flows and decision-ready systems.",
    images: ["/api/og"],
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FORMA",
    url: SITE_URL,
    description: "Infrastructure for Digital Structure",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="forma-hero">
        <div style={{ position: "relative", zIndex: 1 }}>
          <FormaLogoAnimated width={320} />
          <p className="forma-eyebrow" style={{ marginTop: 40 }}>Premium operating layer</p>
          <h1>Infrastructure for<br />digital structure.</h1>
          <p className="forma-lead">
            FORMA turns scattered initiatives into modular projects, visible flows and
            decision-ready systems. Built for teams that want control without visual noise.
          </p>
          <div className="forma-hero-actions">
            <a className="forma-btn" href="/app">Open SaaS Demo</a>
            <a className="forma-btn forma-btn-ghost" href="/brand">View Brand System</a>
          </div>
        </div>
      </section>

      {/* Narrative split */}
      <section id="system" className="forma-section forma-split">
        <div>
          <p className="forma-eyebrow">Narrative</p>
          <h2>A system, not a tool.</h2>
          <p className="forma-lead">
            The product language is architectural: projects, structures, modules and flows.
            Every surface reinforces the same premium, controlled identity.
          </p>
        </div>
        <div className="forma-mock">
          <div className="forma-mock-top">
            <span className="forma-dot" /><span className="forma-dot" /><span className="forma-dot" />
          </div>
          <div className="forma-metric"><span>Structures mapped</span><b>128</b></div>
          <div className="forma-metric"><span>Active modules</span><b>42</b></div>
          <div className="forma-metric"><span>Decision clarity</span><b>94%</b></div>
        </div>
      </section>

      {/* Proof points */}
      <section className="forma-section">
        <p className="forma-eyebrow">Proof points</p>
        <div className="forma-grid3" style={{ marginTop: 40 }}>
          <div className="forma-card">
            <h3>Composable</h3>
            <p className="forma-lead" style={{ fontSize: 16, marginTop: 8 }}>
              Modular building blocks for complex initiatives.
            </p>
          </div>
          <div className="forma-card">
            <h3>Editorial</h3>
            <p className="forma-lead" style={{ fontSize: 16, marginTop: 8 }}>
              High-trust visual language for premium positioning.
            </p>
          </div>
          <div className="forma-card">
            <h3>Operational</h3>
            <p className="forma-lead" style={{ fontSize: 16, marginTop: 8 }}>
              A SaaS surface designed around everyday use.
            </p>
          </div>
        </div>
      </section>

      <footer className="forma-footer">FORMA © Premium Brand System</footer>
    </>
  );
}

import type { Metadata } from "next";
import { FormaLogoStatic, FormaLogoIcon } from "@/components/FormaLogo";

export const metadata: Metadata = {
  title: "Brand System — FORMA",
  description: "9-page FORMA brand kit: logo system, color, typography, templates, mockups, and campaign assets.",
};

export default function BrandPage() {
  return (
    <main>

      {/* Page 1 — Primary logo presentation */}
      <section className="forma-brand-board">
        <div>
          <p className="forma-eyebrow">Page 1</p>
          <h2>Primary logo presentation</h2>
          <p className="forma-lead">The custom monolith logotype drives the premium direction.</p>
        </div>
        <div className="forma-board-canvas">
          <div className="forma-circle" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <FormaLogoStatic width={280} />
          </div>
        </div>
      </section>

      {/* Page 2 — Logo system */}
      <section className="forma-brand-board">
        <div>
          <p className="forma-eyebrow">Page 2</p>
          <h2>Logo system and variations</h2>
          <p className="forma-lead">Primary, inverted, mono, icon-only and spacing logic.</p>
        </div>
        <div className="forma-board-canvas">
          <div className="forma-grid3" style={{ gap: 16 }}>
            <div className="forma-gold-block" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FormaLogoStatic width={100} />
            </div>
            <div className="forma-card" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontWeight: 800, letterSpacing: "0.18em", color: "var(--muted)" }}>MONO</span>
            </div>
            <div className="forma-card" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FormaLogoIcon size={56} />
            </div>
          </div>
        </div>
      </section>

      {/* Page 3 — Templates collection */}
      <section className="forma-brand-board">
        <div>
          <p className="forma-eyebrow">Page 3</p>
          <h2>Templates collection</h2>
          <p className="forma-lead">Reusable branded templates for decks, pages and internal reports.</p>
        </div>
        <div className="forma-board-canvas">
          <div className="forma-grid3" style={{ gap: 16 }}>
            <div className="forma-post">01</div>
            <div className="forma-post">02</div>
            <div className="forma-post">03</div>
          </div>
        </div>
      </section>

      {/* Page 4 — Brand baseline */}
      <section className="forma-brand-board">
        <div>
          <p className="forma-eyebrow">Page 4</p>
          <h2>Brand baseline</h2>
          <p className="forma-lead">Infrastructure for Digital Structure.</p>
        </div>
        <div className="forma-board-canvas">
          <div className="forma-gold-block" style={{ width: "100%" }}>
            <h2 style={{ color: "#080808", margin: 0 }}>Structure creates trust.</h2>
          </div>
        </div>
      </section>

      {/* Page 5 — Product mockup showcase */}
      <section className="forma-brand-board">
        <div>
          <p className="forma-eyebrow">Page 5</p>
          <h2>Product mockup showcase</h2>
          <p className="forma-lead">Branded SaaS application surfaces.</p>
        </div>
        <div className="forma-board-canvas">
          <div className="forma-mock" style={{ width: "100%" }}>
            <div className="forma-metric"><span>Projects</span><b>24</b></div>
            <div className="forma-metric"><span>Modules</span><b>118</b></div>
            <div className="forma-metric"><span>Flows</span><b>63</b></div>
          </div>
        </div>
      </section>

      {/* Page 6 — Real cases / lifestyle */}
      <section className="forma-brand-board">
        <div>
          <p className="forma-eyebrow">Page 6</p>
          <h2>Real cases / lifestyle</h2>
          <p className="forma-lead">Flash photography aesthetic translated into digital boards.</p>
        </div>
        <div className="forma-board-canvas" style={{ padding: 0 }}>
          <div className="forma-photo-flash" style={{ width: "100%", minHeight: 430, borderRadius: 34 }} />
        </div>
      </section>

      {/* Page 7 — Live campaign ads */}
      <section className="forma-brand-board">
        <div>
          <p className="forma-eyebrow">Page 7</p>
          <h2>Live campaign ads</h2>
          <p className="forma-lead">Illustration, typography and people-led campaign layouts.</p>
        </div>
        <div className="forma-board-canvas">
          <div className="forma-grid3" style={{ gap: 16 }}>
            <div className="forma-post">BUILD WITH STRUCTURE</div>
            <div className="forma-gold-block" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, letterSpacing: "0.1em" }}>
              FORMA LIVE
            </div>
            <div className="forma-post">SYSTEM FIRST</div>
          </div>
        </div>
      </section>

      {/* Page 8 — App UI/UX previews */}
      <section className="forma-brand-board">
        <div>
          <p className="forma-eyebrow">Page 8</p>
          <h2>App UI/UX previews</h2>
          <p className="forma-lead">Mobile screens and system previews.</p>
        </div>
        <div className="forma-board-canvas">
          <div className="forma-phone">
            <p className="forma-eyebrow" style={{ marginTop: 0 }}>FORMA</p>
            <div className="forma-mini">Atlas</div>
            <div className="forma-mini">Northstar</div>
            <div className="forma-mini">Investor Room</div>
          </div>
        </div>
      </section>

      {/* Page 9 — Social media visuals */}
      <section className="forma-brand-board">
        <div>
          <p className="forma-eyebrow">Page 9</p>
          <h2>Social media visuals</h2>
          <p className="forma-lead">Posts, stories and campaign assets.</p>
        </div>
        <div className="forma-board-canvas">
          <div className="forma-grid3" style={{ gap: 16 }}>
            <div className="forma-post">Post</div>
            <div className="forma-post">Story</div>
            <div className="forma-post">Ad</div>
          </div>
        </div>
      </section>

    </main>
  );
}

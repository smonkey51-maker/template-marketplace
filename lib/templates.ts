export type TemplateCategory = "ui" | "guide" | "worksheet" | "tracker" | "script" | "prompt";
export type DownloadType =
  | "html" // UI template → .html file with Tailwind CDN
  | "canva" // Canva edit link
  | "excel" // .xlsx file
  | "sheets" // Google Sheets /copy link
  | "notion" // Notion duplicate link
  | "webflow" // Webflow project link
  | "framer" // Framer project link
  | "shopify" // Shopify Liquid theme → .zip download
  | "wordpress"; // WordPress PHP theme → .zip download

export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  price: number; // cents
  stripePriceId: string;
  tags: string[];
  /**
   * @deprecated Decorative, and no longer displayed anywhere.
   *
   * Nothing has ever incremented this — the only writes are the seed scripts
   * copying the literal into the database — so it was a number typed by hand
   * and shown to shoppers as a sales count. The catalogue card and the 404
   * page's "popular" ranking both used to read it; neither does now. Kept only
   * because the `templates` table has the column.
   */
  downloads: number;
  content: string;
  /** Override download type (defaults to "html") */
  downloadType?: DownloadType;
  /** Required for canva / excel / sheets / notion / webflow / framer */
  downloadUrl?: string;
  /** Optional YouTube/Loom URL for a walkthrough tutorial shown on the preview page */
  videoUrl?: string;
  editorsPick?: boolean;
  /**
   * Marks a genuinely recent arrival, and nothing else. Every template in the
   * catalogue carried this at once, which made the "New" badge appear on all of
   * them — a badge on everything distinguishes nothing, and it diluted the one
   * badge that does carry signal (`editorsPick`). Set it deliberately on a new
   * template and clear it when it stops being new.
   */
  isNew?: boolean;
  /**
   * Withdrawn from sale, but not deleted.
   *
   * A retired product disappears from the catalogue, the search, the bundles,
   * the sitemap and the related rail — everywhere a visitor could still buy it.
   * It stays in this array on purpose: `/api/download` resolves a purchase by
   * template id, so deleting the record would turn every past buyer's download
   * into a 404. Retiring is reversible and costs a boolean; deleting is not.
   *
   * The seven retired here are the B2C lifestyle and self-help half of the
   * catalogue — the categories the 2026 market report flags as saturated
   * ("generic productivity", broad fitness, self-help). They are not bad
   * products; they are the ones competing in the crowded half of the market.
   */
  retired?: boolean;
}

/** Returns the effective download type, falling back to "html" */
export function getDownloadType(template: Template): DownloadType {
  return template.downloadType ?? "html";
}

export const templates: Template[] = [
  // ── PROMPT PACKS ─────────────────────────────────────────────────────────

  {
    id: "chatgpt-prompt-library-freelancers",
    name: "ChatGPT Prompt Library for Freelancers",
    description:
      "53 copy-paste ChatGPT prompts for every part of your freelance business: proposals, client emails, pricing, marketing, and onboarding.",
    category: "prompt",
    price: 1200,
    stripePriceId: "price_1TyygCBN003f1Fovw1u2xGQq",
    tags: ["chatgpt", "prompts", "freelancer", "AI tools", "productivity"],
    downloads: 847,
    editorsPick: true,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#f0f2f5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#1e3a5f,#0f2240);color:#fff;border-radius:16px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.25)}
.badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.8;margin-bottom:24px;line-height:1.6}
.stats{display:flex;gap:28px;justify-content:center}
.stat strong{display:block;font-size:28px;font-weight:800}.stat span{font-size:12px;opacity:.6}
</style>
<div class="card">
  <div class="badge">✦ READY TO USE · INSTANT DOWNLOAD</div>
  <h1>ChatGPT Prompt Library for Freelancers</h1>
  <p>53 tested, copy-paste prompts across 10 categories. Replace the brackets, hit enter — 80% done for you.</p>
  <div class="stats">
    <div class="stat"><strong>53</strong><span>Prompts</span></div>
    <div class="stat"><strong>10</strong><span>Categories</span></div>
    <div class="stat"><strong>0</strong><span>Prompt engineering</span></div>
  </div>
</div>`,
  },

  {
    id: "chatgpt-prompt-pack-creators",
    name: "ChatGPT Prompt Pack for Content Creators",
    description:
      "30 copy-paste prompts for writing Threads hooks, Instagram captions, product descriptions, and content that converts.",
    category: "prompt",
    price: 900,
    stripePriceId: "price_1TyygDBN003f1FovFbvBfRKQ",
    tags: ["chatgpt", "content creator", "social media", "threads", "instagram"],
    downloads: 612,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#f0f2f5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#0e7490,#164e63);color:#fff;border-radius:16px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.25)}
.badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.8;margin-bottom:24px;line-height:1.6}
.stats{display:flex;gap:28px;justify-content:center}
.stat strong{display:block;font-size:28px;font-weight:800}.stat span{font-size:12px;opacity:.6}
</style>
<div class="card">
  <div class="badge">✦ HOOKS · CAPTIONS · DESCRIPTIONS · SCRIPTS</div>
  <h1>ChatGPT Prompt Pack for Content Creators</h1>
  <p>30 prompts for Threads hooks, Instagram captions, Gumroad descriptions, and video scripts. Zero writer's block.</p>
  <div class="stats">
    <div class="stat"><strong>30</strong><span>Prompts</span></div>
    <div class="stat"><strong>6</strong><span>Categories</span></div>
    <div class="stat"><strong>0</strong><span>Writer's block</span></div>
  </div>
</div>`,
  },

  {
    id: "midjourney-prompt-guide-mockups",
    name: "Midjourney Prompt Guide for Product Mockups",
    description:
      "25+ tested Midjourney prompts and a full workflow for creating professional product mockup images without hiring a designer.",
    category: "prompt",
    price: 1200,
    stripePriceId: "price_1TyygDBN003f1FovmlXEKSde",
    tags: ["midjourney", "AI image", "product mockups", "etsy", "digital products"],
    downloads: 391,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#f0f2f5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#4f46e5,#312e81);color:#fff;border-radius:16px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.25)}
.badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.8;margin-bottom:24px;line-height:1.6}
.stats{display:flex;gap:28px;justify-content:center}
.stat strong{display:block;font-size:28px;font-weight:800}.stat span{font-size:12px;opacity:.6}
</style>
<div class="card">
  <div class="badge">✦ 25+ PROMPTS · FULL WORKFLOW GUIDE</div>
  <h1>Midjourney Prompt Guide for Product Mockups</h1>
  <p>Create professional product mockups for Etsy and Gumroad without a designer. 25+ ready-to-use prompts + full workflow.</p>
  <div class="stats">
    <div class="stat"><strong>25+</strong><span>Prompts</span></div>
    <div class="stat"><strong>6</strong><span>Mockup styles</span></div>
    <div class="stat"><strong>$0</strong><span>Design tools</span></div>
  </div>
</div>`,
  },

  // ── UI TEMPLATES ─────────────────────────────────────────────────────────
  // NOTE: stripePriceId below is a PLACEHOLDER — no live Stripe Price exists
  // for these yet. Run `npm run ensure-stripe` (or seed-stripe.ts) with a real
  // STRIPE_SECRET_KEY and paste the returned price_... id here before this
  // template is sellable. See CLAUDE.md: "never fabricate one".

  {
    id: "wallet-dashboard-ui",
    name: "Wallet Dashboard Mobile UI Kit",
    description:
      "Dark, gold-accented fintech wallet screen: hero balance, quick-action pills, masked card and a transaction list. Pure HTML/CSS, no framework, ready to adapt.",
    category: "ui",
    price: 1900,
    stripePriceId: "price_PLACEHOLDER_wallet_dashboard_ui",
    tags: ["mobile ui", "fintech", "wallet", "dashboard", "dark mode"],
    downloads: 0,
    isNew: true,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#1c1712;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#241d13,#050402);color:#f2ebd9;border-radius:22px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.4);border:1px solid rgba(200,169,110,.2)}
.badge{display:inline-block;background:rgba(200,169,110,.12);border:1px solid rgba(200,169,110,.3);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px;color:#c8a96e}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.7;margin-bottom:24px;line-height:1.6}
.stats{display:flex;gap:28px;justify-content:center}
.stat strong{display:block;font-size:28px;font-weight:800;color:#c8a96e}.stat span{font-size:12px;opacity:.6}
</style>
<div class="card">
  <div class="badge">✦ MOBILE UI KIT · HTML/CSS</div>
  <h1>Wallet Dashboard Mobile UI Kit</h1>
  <p>Balance hero, quick actions, masked card and transaction feed — a complete fintech wallet screen, ready to customise.</p>
  <div class="stats">
    <div class="stat"><strong>390px</strong><span>Mobile frame</span></div>
    <div class="stat"><strong>4</strong><span>UI sections</span></div>
    <div class="stat"><strong>0</strong><span>Dependencies</span></div>
  </div>
</div>`,
  },

  {
    id: "daily-agenda-ui",
    name: "Daily Agenda Timeline Mobile UI Kit",
    description:
      "Dark editorial agenda screen: day header, horizontal date strip, timeline notes and a contact/meeting card with an embedded place card. Pure HTML/CSS.",
    category: "ui",
    price: 1900,
    stripePriceId: "price_PLACEHOLDER_daily_agenda_ui",
    tags: ["mobile ui", "calendar", "agenda", "productivity", "dark mode"],
    downloads: 0,
    isNew: true,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#1c1712;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#241d13,#050402);color:#f2ebd9;border-radius:22px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.4);border:1px solid rgba(200,169,110,.2)}
.badge{display:inline-block;background:rgba(196,98,45,.14);border:1px solid rgba(196,98,45,.35);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px;color:#e08a5c}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.7;margin-bottom:24px;line-height:1.6}
.stats{display:flex;gap:28px;justify-content:center}
.stat strong{display:block;font-size:28px;font-weight:800;color:#c8a96e}.stat span{font-size:12px;opacity:.6}
</style>
<div class="card">
  <div class="badge">✦ MOBILE UI KIT · HTML/CSS</div>
  <h1>Daily Agenda Timeline Mobile UI Kit</h1>
  <p>Day header, date strip, timeline notes and a meeting card with embedded location — a complete agenda screen, ready to customise.</p>
  <div class="stats">
    <div class="stat"><strong>390px</strong><span>Mobile frame</span></div>
    <div class="stat"><strong>4</strong><span>UI sections</span></div>
    <div class="stat"><strong>0</strong><span>Dependencies</span></div>
  </div>
</div>`,
  },

  {
    id: "workspace-dashboard-ui",
    name: "Workspace Management Dashboard UI Kit",
    description:
      "Desktop SaaS admin dashboard: sidebar nav, KPI cards, and a live isometric floor map with a room-detail popover. Pure HTML/CSS, no framework.",
    category: "ui",
    price: 2400,
    stripePriceId: "price_PLACEHOLDER_workspace_dashboard_ui",
    tags: ["dashboard", "saas", "admin", "desktop ui", "dark mode"],
    downloads: 0,
    isNew: true,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#08070a;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#16130d,#08070a);color:#f2ebd9;border-radius:22px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.4);border:1px solid rgba(200,169,110,.2)}
.badge{display:inline-block;background:rgba(200,169,110,.12);border:1px solid rgba(200,169,110,.3);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px;color:#c8a96e}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.7;margin-bottom:24px;line-height:1.6}
.stats{display:flex;gap:28px;justify-content:center}
.stat strong{display:block;font-size:28px;font-weight:800;color:#c8a96e}.stat span{font-size:12px;opacity:.6}
</style>
<div class="card">
  <div class="badge">✦ DESKTOP UI KIT · HTML/CSS</div>
  <h1>Workspace Management Dashboard UI Kit</h1>
  <p>Sidebar nav, KPI cards and a live isometric floor map with room booking — a complete facility-management admin screen.</p>
  <div class="stats">
    <div class="stat"><strong>3</strong><span>KPI cards</span></div>
    <div class="stat"><strong>1</strong><span>3D floor map</span></div>
    <div class="stat"><strong>0</strong><span>Dependencies</span></div>
  </div>
</div>`,
  },

  {
    id: "fitness-tracker-ui",
    name: "Fitness Tracker Mobile UI Kit",
    description:
      "Dark, gold-accented fitness home screen: weekly training bars, a cardio line chart, hydration and sleep-quality widgets, and a recovery insight card.",
    category: "ui",
    price: 1900,
    stripePriceId: "price_PLACEHOLDER_fitness_tracker_ui",
    tags: ["mobile ui", "fitness", "health", "charts", "dark mode"],
    downloads: 0,
    isNew: true,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#1c1712;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#241d13,#050402);color:#f2ebd9;border-radius:22px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.4);border:1px solid rgba(200,169,110,.2)}
.badge{display:inline-block;background:rgba(200,169,110,.12);border:1px solid rgba(200,169,110,.3);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px;color:#c8a96e}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.7;margin-bottom:24px;line-height:1.6}
.stats{display:flex;gap:28px;justify-content:center}
.stat strong{display:block;font-size:28px;font-weight:800;color:#c8a96e}.stat span{font-size:12px;opacity:.6}
</style>
<div class="card">
  <div class="badge">✦ MOBILE UI KIT · HTML/CSS</div>
  <h1>Fitness Tracker Mobile UI Kit</h1>
  <p>Training bars, a cardio chart, hydration and sleep widgets, plus a recovery insight card — a complete fitness home screen.</p>
  <div class="stats">
    <div class="stat"><strong>390px</strong><span>Mobile frame</span></div>
    <div class="stat"><strong>4</strong><span>Chart widgets</span></div>
    <div class="stat"><strong>0</strong><span>Dependencies</span></div>
  </div>
</div>`,
  },

  {
    id: "banking-app-ui",
    name: "Banking App Mobile UI Kit",
    description:
      "Light, warm-toned banking home screen: quick actions, a physical card mockup, recent contacts, card details and upcoming bills. Pure HTML/CSS.",
    category: "ui",
    price: 1900,
    stripePriceId: "price_PLACEHOLDER_banking_app_ui",
    tags: ["mobile ui", "fintech", "banking", "light mode"],
    downloads: 0,
    isNew: true,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#e9e2d2;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:#fdfaf5;color:#1c1610;border-radius:22px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(28,22,16,.15);border:1px solid rgba(28,22,16,.1)}
.badge{display:inline-block;background:rgba(156,119,51,.12);border:1px solid rgba(156,119,51,.3);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px;color:#9c7733}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.7;margin-bottom:24px;line-height:1.6}
.stats{display:flex;gap:28px;justify-content:center}
.stat strong{display:block;font-size:28px;font-weight:800;color:#9c7733}.stat span{font-size:12px;opacity:.6}
</style>
<div class="card">
  <div class="badge">✦ MOBILE UI KIT · HTML/CSS</div>
  <h1>Banking App Mobile UI Kit</h1>
  <p>Quick actions, a card mockup, recent contacts and upcoming bills — a complete light-theme banking home screen.</p>
  <div class="stats">
    <div class="stat"><strong>390px</strong><span>Mobile frame</span></div>
    <div class="stat"><strong>5</strong><span>UI sections</span></div>
    <div class="stat"><strong>0</strong><span>Dependencies</span></div>
  </div>
</div>`,
  },

  {
    id: "ai-assistant-suggestions-ui",
    name: "AI Assistant Suggestions Mobile UI Kit",
    description:
      "Glass suggestion pills floating over a warm gradient-mesh background, plus a floating prompt bar — a ready-to-adapt AI assistant home screen.",
    category: "ui",
    price: 1500,
    stripePriceId: "price_PLACEHOLDER_ai_assistant_suggestions_ui",
    tags: ["mobile ui", "ai", "assistant", "glassmorphism", "gradient"],
    downloads: 0,
    isNew: true,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#1c1712;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:radial-gradient(120% 100% at 20% 0%,#f3b04a 0%,transparent 55%),radial-gradient(120% 100% at 100% 30%,#c4622d 0%,transparent 55%),#4a1f22;color:#fff8ec;border-radius:22px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.4)}
.badge{display:inline-block;background:rgba(255,248,236,.14);border:1px solid rgba(255,248,236,.3);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.8;margin-bottom:24px;line-height:1.6}
.stats{display:flex;gap:28px;justify-content:center}
.stat strong{display:block;font-size:28px;font-weight:800}.stat span{font-size:12px;opacity:.7}
</style>
<div class="card">
  <div class="badge">✦ MOBILE UI KIT · HTML/CSS</div>
  <h1>AI Assistant Suggestions Mobile UI Kit</h1>
  <p>Glass suggestion pills over a warm gradient mesh, with a floating prompt bar — ready to reskin for any AI assistant.</p>
  <div class="stats">
    <div class="stat"><strong>390px</strong><span>Mobile frame</span></div>
    <div class="stat"><strong>4</strong><span>Suggestion pills</span></div>
    <div class="stat"><strong>0</strong><span>Dependencies</span></div>
  </div>
</div>`,
  },

  {
    id: "ride-booking-ui",
    name: "Ride Booking Mobile UI Kit",
    description:
      "Dark travel-app home screen: destination search with recent-trip suggestions, a from/to route card and a recent-trips list. Pure HTML/CSS.",
    category: "ui",
    price: 1900,
    stripePriceId: "price_PLACEHOLDER_ride_booking_ui",
    tags: ["mobile ui", "travel", "ride", "booking", "dark mode"],
    downloads: 0,
    isNew: true,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#1c1712;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#241d13,#050402);color:#f2ebd9;border-radius:22px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.4);border:1px solid rgba(200,169,110,.2)}
.badge{display:inline-block;background:rgba(200,169,110,.12);border:1px solid rgba(200,169,110,.3);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px;color:#c8a96e}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.7;margin-bottom:24px;line-height:1.6}
.stats{display:flex;gap:28px;justify-content:center}
.stat strong{display:block;font-size:28px;font-weight:800;color:#c8a96e}.stat span{font-size:12px;opacity:.6}
</style>
<div class="card">
  <div class="badge">✦ MOBILE UI KIT · HTML/CSS</div>
  <h1>Ride Booking Mobile UI Kit</h1>
  <p>Destination search, a from/to route card and a recent-trips list — a complete ride-booking home screen.</p>
  <div class="stats">
    <div class="stat"><strong>390px</strong><span>Mobile frame</span></div>
    <div class="stat"><strong>4</strong><span>UI sections</span></div>
    <div class="stat"><strong>0</strong><span>Dependencies</span></div>
  </div>
</div>`,
  },

  {
    id: "health-insights-ui",
    name: "Health Insight Cards Mobile UI Kit",
    description:
      "Wine-red glass insight cards over a deep gradient background: a steps progress card, a personalised health-score message, and a sleep-deficit alert.",
    category: "ui",
    price: 1500,
    stripePriceId: "price_PLACEHOLDER_health_insights_ui",
    tags: ["mobile ui", "health", "wellness", "cards", "dark mode"],
    downloads: 0,
    isNew: true,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#170707;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:radial-gradient(90% 100% at 50% 0%,#4a1414 0%,transparent 60%),#170707;color:#fbeee7;border-radius:22px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.4);border:1px solid rgba(251,238,231,.14)}
.badge{display:inline-block;background:rgba(251,238,231,.1);border:1px solid rgba(251,238,231,.25);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.75;margin-bottom:24px;line-height:1.6}
.stats{display:flex;gap:28px;justify-content:center}
.stat strong{display:block;font-size:28px;font-weight:800;color:#e8a06a}.stat span{font-size:12px;opacity:.65}
</style>
<div class="card">
  <div class="badge">✦ MOBILE UI KIT · HTML/CSS</div>
  <h1>Health Insight Cards Mobile UI Kit</h1>
  <p>A steps progress card, a personalised score message and a sleep alert — three glass cards over a wine-red gradient.</p>
  <div class="stats">
    <div class="stat"><strong>390px</strong><span>Mobile frame</span></div>
    <div class="stat"><strong>3</strong><span>Insight cards</span></div>
    <div class="stat"><strong>0</strong><span>Dependencies</span></div>
  </div>
</div>`,
  },

  {
    id: "sleep-tracker-ui",
    name: "Sleep Tracker Mobile UI Kit",
    description:
      "Dark sleep-detail screen: a segmented sleep-stages timeline, stage stat grid, a recovery insight banner and a stage breakdown table. Pure HTML/CSS.",
    category: "ui",
    price: 1700,
    stripePriceId: "price_PLACEHOLDER_sleep_tracker_ui",
    tags: ["mobile ui", "health", "sleep", "charts", "dark mode"],
    downloads: 0,
    isNew: true,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#1c1712;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#241d13,#050402);color:#f2ebd9;border-radius:22px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.4);border:1px solid rgba(200,169,110,.2)}
.badge{display:inline-block;background:rgba(200,169,110,.12);border:1px solid rgba(200,169,110,.3);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px;color:#c8a96e}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.7;margin-bottom:24px;line-height:1.6}
.stats{display:flex;gap:28px;justify-content:center}
.stat strong{display:block;font-size:28px;font-weight:800;color:#c8a96e}.stat span{font-size:12px;opacity:.6}
</style>
<div class="card">
  <div class="badge">✦ MOBILE UI KIT · HTML/CSS</div>
  <h1>Sleep Tracker Mobile UI Kit</h1>
  <p>A segmented sleep-stages timeline, stat grid, recovery insight and stage breakdown — a complete sleep-detail screen.</p>
  <div class="stats">
    <div class="stat"><strong>390px</strong><span>Mobile frame</span></div>
    <div class="stat"><strong>4</strong><span>Sleep stages</span></div>
    <div class="stat"><strong>0</strong><span>Dependencies</span></div>
  </div>
</div>`,
  },

  // ── SCRIPT PACKS ─────────────────────────────────────────────────────────

  {
    id: "dm-sales-script-pack",
    name: "DM Sales Script Pack",
    description:
      "10 copy-paste DM scripts for selling digital products on Instagram and Threads — for every stage of the conversation, without sounding spammy.",
    category: "script",
    price: 900,
    stripePriceId: "price_1TyygEBN003f1Fov6HbOaxmK",
    tags: ["DM scripts", "sales", "Instagram", "Threads", "digital products"],
    downloads: 1204,
    editorsPick: true,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#f0f2f5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#7c3aed,#4c1d95);color:#fff;border-radius:16px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.25)}
.badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.8;margin-bottom:24px;line-height:1.6}
.stats{display:flex;gap:28px;justify-content:center}
.stat strong{display:block;font-size:28px;font-weight:800}.stat span{font-size:12px;opacity:.6}
</style>
<div class="card">
  <div class="badge">✦ 10 SCRIPTS · COPY-PASTE READY</div>
  <h1>DM Sales Script Pack</h1>
  <p>10 tested scripts for every sales conversation stage — from cold opener to handling objections. No spam energy.</p>
  <div class="stats">
    <div class="stat"><strong>10</strong><span>Scripts</span></div>
    <div class="stat"><strong>5</strong><span>Conversation stages</span></div>
    <div class="stat"><strong>0</strong><span>Spam energy</span></div>
  </div>
</div>`,
  },

  // ── GUIDES ────────────────────────────────────────────────────────────────

  {
    id: "home-gym-4-week-guide",
    retired: true,
    name: "Home Gym 4-Week Programming Guide",
    description:
      "A complete, progressive 4-week training program for home workouts with minimal equipment. Beginner to intermediate, 3–4 sessions/week.",
    category: "guide",
    price: 1500,
    stripePriceId: "price_1TyygEBN003f1Fov7KgFyMHY",
    tags: ["fitness", "home workout", "training program", "bodyweight", "beginner"],
    downloads: 733,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#f0f2f5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#065f46,#022c22);color:#fff;border-radius:16px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.25)}
.badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.8;margin-bottom:24px;line-height:1.6}
.stats{display:flex;gap:28px;justify-content:center}
.stat strong{display:block;font-size:28px;font-weight:800}.stat span{font-size:12px;opacity:.6}
</style>
<div class="card">
  <div class="badge">✦ 4 WEEKS · 3-4 SESSIONS/WEEK · MINIMAL EQUIPMENT</div>
  <h1>Home Gym 4-Week Programming Guide</h1>
  <p>Progressive overload built in. Bodyweight alternatives for everything. Progress tracker included.</p>
  <div class="stats">
    <div class="stat"><strong>4</strong><span>Weeks</span></div>
    <div class="stat"><strong>3-4</strong><span>Sessions/wk</span></div>
    <div class="stat"><strong>45-60</strong><span>Min/session</span></div>
  </div>
</div>`,
  },

  {
    id: "social-media-detox-7day",
    retired: true,
    name: "7-Day Social Media Detox Protocol",
    description:
      "A structured 7-day daily-action plan to break compulsive scrolling and rebuild an intentional relationship with social media.",
    category: "guide",
    price: 900,
    stripePriceId: "price_1TyygEBN003f1FovJH8wpeTE",
    tags: ["productivity", "mental health", "social media", "screen time", "detox"],
    downloads: 528,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#f0f2f5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#059669,#065f46);color:#fff;border-radius:16px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.25)}
.badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.8;margin-bottom:24px;line-height:1.6}
.stats{display:flex;gap:28px;justify-content:center}
.stat strong{display:block;font-size:28px;font-weight:800}.stat span{font-size:12px;opacity:.6}
</style>
<div class="card">
  <div class="badge">✦ 7 DAYS · DAILY CHECKBOXES · BUILT FOR CREATORS</div>
  <h1>Social Media Detox Protocol</h1>
  <p>Day-by-day actions to reset your attention and rebuild intentional social media habits. Not willpower — systems.</p>
  <div class="stats">
    <div class="stat"><strong>7</strong><span>Days</span></div>
    <div class="stat"><strong>4+</strong><span>Rules</span></div>
    <div class="stat"><strong>30</strong><span>Day after-plan</span></div>
  </div>
</div>`,
  },

  {
    id: "anti-procrastination-playbook",
    retired: true,
    name: "Anti-Procrastination Playbook",
    description:
      "Root causes, 8 behavioral frameworks, and systems that actually override procrastination. Based on behavioral psychology, not motivation.",
    category: "guide",
    price: 1200,
    stripePriceId: "price_1TyygFBN003f1FovYYbq1CD1",
    tags: ["productivity", "procrastination", "focus", "behavioral psychology", "systems"],
    downloads: 914,
    editorsPick: true,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#f0f2f5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#dc2626,#7f1d1d);color:#fff;border-radius:16px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.25)}
.badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.8;margin-bottom:24px;line-height:1.6}
.stats{display:flex;gap:28px;justify-content:center}
.stat strong{display:block;font-size:28px;font-weight:800}.stat span{font-size:12px;opacity:.6}
</style>
<div class="card">
  <div class="badge">✦ 4 ROOT CAUSES · 8 FRAMEWORKS · INSTANT USE</div>
  <h1>Anti-Procrastination Playbook</h1>
  <p>Diagnose your procrastination type, then apply the matching behavioral framework. Mechanics, not motivation.</p>
  <div class="stats">
    <div class="stat"><strong>4</strong><span>Root causes</span></div>
    <div class="stat"><strong>8</strong><span>Frameworks</span></div>
    <div class="stat"><strong>0</strong><span>Motivational fluff</span></div>
  </div>
</div>`,
  },

  {
    id: "mindset-reset-7day-journal",
    retired: true,
    name: "7-Day Mindset Reset Journal",
    description:
      "A guided daily journal for clearing mental blocks, surfacing limiting beliefs, and reconnecting with what you actually want to build.",
    category: "guide",
    price: 900,
    stripePriceId: "price_1TyygFBN003f1Foveqi3pEwE",
    tags: ["journaling", "mindset", "personal development", "confidence", "creator"],
    downloads: 677,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#f0f2f5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#92400e,#451a03);color:#fff;border-radius:16px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.25)}
.badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px}
h1{font-size:28px;font-weight:800;font-family:Georgia,serif;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.8;margin-bottom:24px;line-height:1.6}
.days{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
.day{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:8px;padding:6px 12px;font-size:13px;font-weight:600}
</style>
<div class="card">
  <div class="badge">✦ 7-DAY GUIDED JOURNAL · PRINT OR DIGITAL</div>
  <h1>7-Day Mindset Reset Journal</h1>
  <p>10–20 minutes each morning. Real prompts for real clarity. No toxic positivity.</p>
  <div class="days">
    <div class="day">Day 1: Honesty</div><div class="day">Day 2: Stories</div><div class="day">Day 3: Fear</div>
    <div class="day">Day 4: Want</div><div class="day">Day 5: Identity</div><div class="day">Day 6: Gratitude</div><div class="day">Day 7: Commitment</div>
  </div>
</div>`,
  },

  {
    id: "first-100-online-guide",
    name: "How to Make Your First $100 Online",
    description:
      "A no-BS, step-by-step roadmap from zero — 13 sequential steps from choosing what to sell to making your first sale, with no audience or startup capital.",
    category: "guide",
    price: 900,
    stripePriceId: "price_1TyygGBN003f1FovzPgxITMl",
    tags: ["make money online", "digital products", "beginner", "side hustle", "Gumroad"],
    downloads: 1842,
    editorsPick: true,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#f0f2f5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#b45309,#78350f);color:#fff;border-radius:16px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.25)}
.badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.8;margin-bottom:24px;line-height:1.6}
.phases{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.ph{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:8px;padding:8px 12px;font-size:13px;text-align:left}
.ph strong{display:block;font-size:11px;opacity:.6;margin-bottom:2px;text-transform:uppercase}
</style>
<div class="card">
  <div class="badge">✦ BEGINNER ROADMAP · ZERO INVESTMENT · 13 STEPS</div>
  <h1>How to Make Your First $100 Online</h1>
  <p>Step-by-step from "I have an idea" to your first Stripe notification. No audience needed.</p>
  <div class="phases">
    <div class="ph"><strong>Phase 1</strong>Choose What to Sell</div>
    <div class="ph"><strong>Phase 2</strong>Build in 2–6 Hours</div>
    <div class="ph"><strong>Phase 3</strong>Set Up Gumroad</div>
    <div class="ph"><strong>Phase 4</strong>Get First Sale</div>
  </div>
</div>`,
  },

  {
    id: "digital-product-launch-checklist",
    name: "Digital Product Launch Checklist",
    description:
      "Every step from idea to first sale: 6-phase launch checklist covering product foundation, build, Gumroad setup, pre-launch, launch day, and post-launch.",
    category: "guide",
    price: 700,
    stripePriceId: "price_1TyygGBN003f1Fovi8BPofAl",
    tags: ["digital products", "launch checklist", "Gumroad", "product launch", "beginner"],
    downloads: 2103,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#f0f2f5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#1d4ed8,#1e1b4b);color:#fff;border-radius:16px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.25)}
.badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.8;margin-bottom:24px;line-height:1.6}
.phases{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
.ph{background:rgba(255,255,255,.1);border-radius:8px;padding:8px;font-size:12px;font-weight:600}
</style>
<div class="card">
  <div class="badge">✦ 6 PHASES · NOTHING SKIPPED · PRINT-READY</div>
  <h1>Digital Product Launch Checklist</h1>
  <p>Every step from idea to first sale. Use every launch. Never skip a step.</p>
  <div class="phases">
    <div class="ph">Foundation</div>
    <div class="ph">Build</div>
    <div class="ph">Gumroad</div>
    <div class="ph">Pre-Launch</div>
    <div class="ph">Launch Day</div>
    <div class="ph">Post-Launch</div>
  </div>
</div>`,
  },

  // ── WORKSHEETS ────────────────────────────────────────────────────────────

  {
    id: "freelance-rate-calculator",
    name: "Freelance Rate Calculator Workbook",
    description:
      "Calculate your real hourly freelance rate in 15 minutes. Accounts for taxes, business expenses, non-billable time, and profit margin. Google Sheets ready.",
    category: "worksheet",
    price: 900,
    stripePriceId: "price_1TyygHBN003f1FovVFC3vsJc",
    tags: ["freelancer", "rate calculator", "pricing", "Google Sheets", "financial"],
    downloads: 1187,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#f0f2f5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#0284c7,#0c4a6e);color:#fff;border-radius:16px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.25)}
.badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.8;margin-bottom:24px;line-height:1.6}
.rates{display:flex;gap:16px;justify-content:center}
.rate{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:10px;padding:14px 18px;text-align:center}
.rate .label{font-size:11px;opacity:.6;margin-bottom:4px;text-transform:uppercase}
.rate .val{font-size:22px;font-weight:800}
</style>
<div class="card">
  <div class="badge">✦ 5 SECTIONS · GOOGLE SHEETS FORMULAS · 15 MIN</div>
  <h1>Freelance Rate Calculator Workbook</h1>
  <p>Stop guessing your rate. This workbook calculates it from income goals, taxes, expenses, and profit margin.</p>
  <div class="rates">
    <div class="rate"><div class="label">Minimum</div><div class="val">€___/hr</div></div>
    <div class="rate"><div class="label">✓ Recommended</div><div class="val">€___/hr</div></div>
    <div class="rate"><div class="label">Premium</div><div class="val">€___/hr</div></div>
  </div>
</div>`,
  },

  {
    id: "monthly-business-finance-tracker",
    name: "Monthly Business Finance Tracker",
    description:
      "A complete monthly financial dashboard for freelancers: track revenue, expenses, profit margins, and tax estimates. Google Sheets ready with formulas.",
    category: "worksheet",
    price: 900,
    stripePriceId: "price_1TyygHBN003f1FovEFtHbXOz",
    tags: ["finance tracker", "freelancer", "revenue", "Google Sheets", "taxes", "accounting"],
    downloads: 876,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#f0f2f5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#16a34a,#14532d);color:#fff;border-radius:16px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.25)}
.badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.8;margin-bottom:24px;line-height:1.6}
.metrics{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
.m{background:rgba(255,255,255,.1);border-radius:8px;padding:10px;font-size:13px;font-weight:600}
.m span{display:block;font-size:11px;opacity:.6;font-weight:400}
</style>
<div class="card">
  <div class="badge">✦ REVENUE · EXPENSES · PROFIT · TAX ESTIMATE</div>
  <h1>Monthly Business Finance Tracker</h1>
  <p>Know your real profit margin every month. Includes tax reserve calculator and pending invoice tracker.</p>
  <div class="metrics">
    <div class="m">€ ___<span>Gross Profit</span></div>
    <div class="m">___ %<span>Margin</span></div>
    <div class="m">€ ___<span>Tax Reserve</span></div>
    <div class="m">€ ___<span>Net After Tax</span></div>
    <div class="m">€ ___<span>Pending</span></div>
    <div class="m">€ ___<span>Avg/Day</span></div>
  </div>
</div>`,
  },

  {
    id: "wedding-budget-tracker",
    retired: true,
    name: "Wedding Planning Budget Tracker",
    description:
      "Track every vendor, deposit, and payment deadline across 6 wedding categories. Complete overview of what's booked, paid, and still owed.",
    category: "worksheet",
    price: 1200,
    stripePriceId: "price_1TyygIBN003f1FovhwibmNMz",
    tags: ["wedding", "budget planner", "wedding planning", "Google Sheets", "vendor tracking"],
    downloads: 634,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#f0f2f5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#be185d,#831843);color:#fff;border-radius:16px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.25)}
.badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.8;margin-bottom:24px;line-height:1.6}
.cats{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.cat{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:5px 14px;font-size:13px;font-weight:600}
</style>
<div class="card">
  <div class="badge">✦ 6 VENDOR CATEGORIES · DEPOSITS · TIMELINE</div>
  <h1>Wedding Planning Budget Tracker</h1>
  <p>Every vendor, deposit, and payment deadline in one dashboard. Know exactly where you stand financially.</p>
  <div class="cats">
    <div class="cat">Venue</div><div class="cat">Catering</div><div class="cat">Photo/Video</div>
    <div class="cat">Music</div><div class="cat">Flowers</div><div class="cat">Attire</div>
  </div>
</div>`,
  },

  {
    id: "remote-job-search-tracker",
    name: "Remote Job Search Tracker",
    description:
      "Track every application, interview stage, follow-up, and offer. Includes offer comparison table and weekly goal tracker. Google Sheets ready.",
    category: "worksheet",
    price: 700,
    stripePriceId: "price_1TyygIBN003f1FovERkoz2dx",
    tags: ["job search", "remote work", "job tracker", "career", "Google Sheets"],
    downloads: 941,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#f0f2f5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#0f766e,#134e4a);color:#fff;border-radius:16px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.25)}
.badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.8;margin-bottom:24px;line-height:1.6}
.stages{display:flex;gap:6px;justify-content:center;flex-wrap:wrap}
.stage{border-radius:999px;padding:4px 12px;font-size:12px;font-weight:700}
.s1{background:#2563eb;}.s2{background:#7c3aed;}.s3{background:#d97706;}.s4{background:#16a34a;}
</style>
<div class="card">
  <div class="badge">✦ APPLICATIONS · INTERVIEWS · OFFERS · COMPARISON</div>
  <h1>Remote Job Search Tracker</h1>
  <p>Never lose track of where you stand. Track response rates, interview stages, and compare multiple offers.</p>
  <div class="stages">
    <div class="stage s1">Applied</div>
    <div class="stage s2">Phone Screen</div>
    <div class="stage s3">Interview</div>
    <div class="stage s4">Offer</div>
  </div>
</div>`,
  },

  {
    id: "first-apartment-budget-planner",
    retired: true,
    name: "First Apartment Checklist & Budget Planner",
    description:
      "Everything to buy, set up, and budget for your first apartment — prioritized by urgency so you don't overspend on things you don't need yet.",
    category: "worksheet",
    price: 700,
    stripePriceId: "price_1TyygIBN003f1FovpNPQbngu",
    tags: ["apartment", "moving", "budget planner", "checklist", "first home", "Gen Z"],
    downloads: 1034,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#f0f2f5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#ea580c,#7c2d12);color:#fff;border-radius:16px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.25)}
.badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.8;margin-bottom:24px;line-height:1.6}
.sections{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.sec{background:rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;font-size:13px;font-weight:600;text-align:left}
.sec span{display:block;font-size:11px;opacity:.6;font-weight:400}
</style>
<div class="card">
  <div class="badge">✦ MOVE-IN CHECKLIST · MONTHLY BUDGET · PRIORITIES</div>
  <h1>First Apartment Checklist &amp; Budget Planner</h1>
  <p>Prioritized by urgency. Buy essentials first, don't overspend on nice-to-haves day one.</p>
  <div class="sections">
    <div class="sec">Week 1 Essentials<span>9 must-have items</span></div>
    <div class="sec">Furnishing<span>First 30 days</span></div>
    <div class="sec">Kitchen Setup<span>9 items prioritized</span></div>
    <div class="sec">Monthly Budget<span>All recurring costs</span></div>
  </div>
</div>`,
  },

  // ── TRACKERS ──────────────────────────────────────────────────────────────

  {
    id: "pet-care-vet-tracker",
    retired: true,
    name: "Pet Care & Vet Visit Tracker",
    description:
      "A complete health record and care organizer for your pet — vet visits, vaccinations, medications, weight log, diet, and emergency contacts. Print-ready.",
    category: "tracker",
    price: 700,
    stripePriceId: "price_1TyygJBN003f1FovYgfy4YEH",
    tags: ["pet care", "vet tracker", "dog", "cat", "health record", "pet owner"],
    downloads: 487,
    content: `<style>
body{font-family:'Segoe UI',sans-serif;background:#f0f2f5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.card{background:linear-gradient(135deg,#7c3aed,#4c1d95);color:#fff;border-radius:16px;padding:48px 40px;max-width:480px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.25)}
.badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:5px 16px;font-size:12px;letter-spacing:.5px;margin-bottom:20px}
h1{font-size:28px;font-weight:800;line-height:1.2;margin-bottom:12px}
p{font-size:15px;opacity:.8;margin-bottom:24px;line-height:1.6}
.sections{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.sec{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:5px 14px;font-size:13px;font-weight:600}
</style>
<div class="card">
  <div class="badge">✦ VET RECORDS · VACCINATIONS · MEDICATIONS · PRINT-READY</div>
  <h1>Pet Care &amp; Vet Visit Tracker</h1>
  <p>Everything in one place for your next vet visit. Works for dogs and cats. Print and keep in a binder.</p>
  <div class="sections">
    <div class="sec">Pet Profile</div><div class="sec">Vaccines</div><div class="sec">Vet Visits</div>
    <div class="sec">Medications</div><div class="sec">Weight Log</div><div class="sec">Diet</div><div class="sec">Emergency</div>
  </div>
</div>`,
  },
];

export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}

/**
 * The products a visitor may actually be offered.
 *
 * Defined once and exported, rather than filtered at each call site: a retired
 * product must vanish from the catalogue, the search, the related rail, the
 * 404 page's "popular" list, the Studio picker and the sitemap, and a filter
 * repeated in seven files is a filter that will be forgotten in the eighth.
 * `templates` itself stays complete so past buyers can still download.
 */
export const sellableTemplates: Template[] = templates.filter((t) => !t.retired);

export function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}

/** Lightweight template record — no inline HTML/prompt content. Use in catalog listings. */
export type TemplateMeta = Omit<Template, "content">;

/** All templates without their content strings — safe for client-side catalog imports. */
export const templatesMeta: TemplateMeta[] = templates.map(({ content: _c, ...meta }) => meta);

/** Listing-safe metadata: the sellable products, without their inline content. */
export const sellableTemplatesMeta: TemplateMeta[] = templatesMeta.filter((t) => !t.retired);

/** Abbreviated count: 1240 → "1.2k", 14500 → "15k" */
export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${Math.round(n / 1_000)}k`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

// ── Bundles ────────────────────────────────────────────────────────────────

export interface Bundle {
  id: string;
  name: string;
  tagline: string;
  description: string;
  templateIds: string[];
  /** 3 short USP bullet points shown on the card and detail page */
  highlights: string[];
  price: number; // cents
  /** Regular price (sum of individual templates) for savings display */
  regularPrice: number;
  stripePriceId: string;
  accentColor: string; // Tailwind color class prefix, e.g. "blue"
  tags: string[];
  /** Optional: ID of the single template to spotlight on the bundle detail page */
  featuredProductId?: string;
  /**
   * Withdrawn from sale — see Template.retired, same reasoning.
   *
   * A bundle whose members are all retired has to go with them: it would
   * otherwise sell, and its detail page would price a basket of products no
   * longer on offer.
   */
  retired?: boolean;
}

export const bundles: Bundle[] = [
  {
    id: "bundle-ai-creator",
    name: "AI Creator Bundle",
    tagline: "Tutto ciò che serve per creare e vendere con l'AI",
    description:
      "53 prompts for freelancers, 30 for creators, a full Midjourney guide for product mockups, and 10 DM scripts that sell. A complete AI arsenal.",
    templateIds: [
      "chatgpt-prompt-library-freelancers",
      "chatgpt-prompt-pack-creators",
      "midjourney-prompt-guide-mockups",
      "dm-sales-script-pack",
    ],
    highlights: [
      "93 prompt ChatGPT + guida Midjourney inclusi",
      "Dalla creazione contenuti alla chiusura vendite",
      "Risparmia €15 rispetto all'acquisto singolo",
    ],
    price: 2700,
    regularPrice: 4200,
    stripePriceId: "price_1TzFSMBN003f1FovLExROHOi",
    accentColor: "violet",
    tags: ["ai", "chatgpt", "midjourney", "prompt", "creator"],
  },
  {
    id: "bundle-wellness-mindset",
    retired: true,
    name: "Wellness & Mindset Bundle",
    tagline: "Rimetti a fuoco corpo, mente e abitudini",
    description:
      "A 4-week home gym program, a social media detox protocol, an anti-procrastination playbook, and a 7-day mindset journal. A complete reset.",
    templateIds: [
      "home-gym-4-week-guide",
      "social-media-detox-7day",
      "anti-procrastination-playbook",
      "mindset-reset-7day-journal",
    ],
    highlights: [
      "Corpo + mente + abitudini in un unico bundle",
      "4 prodotti standalone pronti per il download",
      "Risparmia €17 rispetto all'acquisto singolo",
    ],
    price: 2800,
    regularPrice: 4500,
    stripePriceId: "price_1TzFSMBN003f1FovthA5W1QW",
    accentColor: "emerald",
    tags: ["wellness", "fitness", "mindset", "productivity", "journal"],
  },
  {
    id: "bundle-money-career",
    name: "Money & Career Bundle",
    tagline: "Gestisci soldi, carriera e business da subito",
    description:
      "Freelance rate calculator, monthly finance tracker, remote job search tracker, the first $100 online guide, and a digital product launch checklist.",
    templateIds: [
      "freelance-rate-calculator",
      "monthly-business-finance-tracker",
      "remote-job-search-tracker",
      "first-100-online-guide",
      "digital-product-launch-checklist",
    ],
    highlights: [
      "5 strumenti per freelancer, creator e job seeker",
      "Dall'idea al lancio — tutto tracciato",
      "Risparmia €11 rispetto all'acquisto singolo",
    ],
    price: 3000,
    regularPrice: 4100,
    stripePriceId: "price_1TzFSNBN003f1FovnZjfRRiN",
    accentColor: "amber",
    tags: ["finance", "freelance", "career", "remote work", "business"],
  },
  {
    id: "bundle-life-admin",
    retired: true,
    name: "Life Admin Bundle",
    tagline: "Tieni tutto sotto controllo senza stress",
    description:
      "First apartment budget planner, wedding budget tracker, and pet care & vet record. The three essential trackers for life's big milestones.",
    templateIds: [
      "first-apartment-budget-planner",
      "wedding-budget-tracker",
      "pet-care-vet-tracker",
    ],
    highlights: [
      "3 tracker per le milestone più importanti della vita",
      "Pronti all'uso, stampabili o digitali",
      "Risparmia €6 rispetto all'acquisto singolo",
    ],
    price: 2000,
    regularPrice: 2600,
    stripePriceId: "price_1TzFSNBN003f1FovtPq77vi9",
    accentColor: "blue",
    tags: ["budget", "tracker", "apartment", "wedding", "pet"],
  },
];

export function getBundle(id: string): Bundle | undefined {
  return bundles.find((b) => b.id === id);
}

/** Bundles still on offer — see sellableTemplates. */
export const sellableBundles: Bundle[] = bundles.filter((b) => !b.retired);

import { DownloadType } from "@/lib/templates";

// ── Philosophy pillars (Filosofia giapponese) ────────────────────────────────

export type PillarId = "shokunin" | "kaizen" | "omotenashi" | "ikigai";

export const PILLARS: {
  id: PillarId;
  kanji: string;
  nameIt: string;
  nameEn: string;
  subtitleIt: string;
  subtitleEn: string;
}[] = [
  {
    id: "shokunin",
    kanji: "職人",
    nameIt: "Shokunin",
    nameEn: "Shokunin",
    subtitleIt: "La Via dell'Artigiano",
    subtitleEn: "The Craftsman's Way",
  },
  {
    id: "kaizen",
    kanji: "改善",
    nameIt: "Kaizen",
    nameEn: "Kaizen",
    subtitleIt: "Il Miglioramento Continuo",
    subtitleEn: "Continuous Improvement",
  },
  {
    id: "omotenashi",
    kanji: "おもてなし",
    nameIt: "Omotenashi",
    nameEn: "Omotenashi",
    subtitleIt: "L'Arte dell'Ospitalità",
    subtitleEn: "The Art of Hospitality",
  },
  {
    id: "ikigai",
    kanji: "生き甲斐",
    nameIt: "Ikigai",
    nameEn: "Ikigai",
    subtitleIt: "La Ragione di Vita",
    subtitleEn: "Reason for Being",
  },
];

// ── Platform macro-categories ────────────────────────────────────────────────

export type PlatformFilter = "all" | DownloadType;

export const PLATFORMS: {
  id: PlatformFilter;
  label: { it: string; en: string };
  icon: string;
  color?: string;
}[] = [
  { id: "all",       label: { it: "Tutte",       en: "All" },        icon: "⊞" },
  { id: "html",      label: { it: "HTML",        en: "HTML" },       icon: "🌐", color: "var(--accent)" },
  { id: "shopify",   label: { it: "Shopify",     en: "Shopify" },    icon: "🛒", color: "var(--platform-shopify)" },
  { id: "wordpress", label: { it: "WordPress",   en: "WordPress" },  icon: "📝", color: "var(--platform-wordpress)" },
  { id: "notion",    label: { it: "Notion",      en: "Notion" },     icon: "📓", color: "var(--platform-notion)" },
  { id: "canva",     label: { it: "Canva",       en: "Canva" },      icon: "🎨", color: "var(--platform-canva)" },
  { id: "webflow",   label: { it: "Webflow",     en: "Webflow" },    icon: "🔷", color: "var(--platform-webflow)" },
  { id: "framer",    label: { it: "Framer",      en: "Framer" },     icon: "◆",  color: "var(--platform-framer)" },
  { id: "excel",     label: { it: "Excel",       en: "Excel" },      icon: "📊", color: "var(--platform-excel)" },
  { id: "sheets",    label: { it: "Sheets",      en: "Sheets" },     icon: "📋", color: "var(--platform-sheets)" },
];

// ── Section definitions ──────────────────────────────────────────────────────

export const SECTIONS: {
  id: string;
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
  ids: string[];
  pillar: PillarId;
}[] = [
  // ── 職人 Shokunin ──
  { id: "creative",          pillar: "shokunin", emoji: "🎨", gradientFrom: "#4a0d2e", gradientTo: "#330920", ids: ["creative-agency-portfolio", "freelance-tech-profile", "blog-card-grid"] },
  { id: "copywriting-ai",    pillar: "shokunin", emoji: "✍️", gradientFrom: "#0d2b4a", gradientTo: "#061c35", ids: ["cold-email-b2b", "product-description-ecom", "ai-assistant-system-prompt", "linkedin-prompt-pack", "youtube-script-pack"] },
  { id: "personal-brand",    pillar: "shokunin", emoji: "🪪", gradientFrom: "#2d0e4a", gradientTo: "#1e0933", ids: ["digital-resume", "link-in-bio", "newsletter-landing"] },
  { id: "wordpress-themes",  pillar: "shokunin", emoji: "📝", gradientFrom: "#0d3b5c", gradientTo: "#06243a", ids: ["wordpress-business-theme", "wordpress-blog-theme", "wordpress-portfolio-theme"] },
  { id: "shopify-ecommerce", pillar: "shokunin", emoji: "🛒", gradientFrom: "#2d4a1b", gradientTo: "#1a2e0d", ids: ["shopify-product-landing", "shopify-collection-grid", "shopify-announcement-bar"] },
  // ── 改善 Kaizen ──
  { id: "startup",           pillar: "kaizen",   emoji: "🚀", gradientFrom: "#2d1b69", gradientTo: "#1a0e47", ids: ["saas-landing-dark", "startup-product-launch", "hero-saas", "waiting-list-page", "saas-pricing-full"] },
  { id: "digital-product",   pillar: "kaizen",   emoji: "📱", gradientFrom: "#003b4a", gradientTo: "#002535", ids: ["mobile-app-showcase", "feature-showcase", "saas-dashboard"] },
  { id: "ai-productivity",   pillar: "kaizen",   emoji: "🤖", gradientFrom: "#1a1a2e", gradientTo: "#0d0d1f", ids: ["claude-projects-pack", "ai-workflow-pack"] },
  { id: "notion-workspace",  pillar: "kaizen",   emoji: "📓", gradientFrom: "#1c1c1c", gradientTo: "#0f0f0f", ids: ["notion-project-hub", "notion-freelancer-crm", "notion-content-calendar", "notion-finance-tracker", "notion-second-brain", "notion-job-tracker", "notion-weekly-review", "notion-client-portal"] },
  { id: "elearning",         pillar: "kaizen",   emoji: "🎓", gradientFrom: "#1a3a5c", gradientTo: "#0d2240", ids: ["course-landing-page", "webinar-registration", "course-curriculum-builder", "student-success-story", "course-email-welcome"] },
  // ── おもてなし Omotenashi ──
  { id: "professionals",     pillar: "omotenashi", emoji: "🏢", gradientFrom: "#1e3a5f", gradientTo: "#0f2a47", ids: ["real-estate-agent", "therapist-profile", "law-firm-services", "personal-trainer-profile", "ai-tech-portfolio"] },
  { id: "business",          pillar: "omotenashi", emoji: "🛍️", gradientFrom: "#3b2000", gradientTo: "#2a1600", ids: ["artisan-product-catalog", "revenue-analytics", "pricing-table", "ecommerce-product-page", "invoice-html"] },
  { id: "hospitality",       pillar: "omotenashi", emoji: "🍽️", gradientFrom: "#3b0a0a", gradientTo: "#2a0606", ids: ["restaurant-menu", "coffee-shop-landing", "hotel-booking"] },
  // ── 生き甲斐 Ikigai ──
  { id: "lifestyle-finance", pillar: "ikigai",   emoji: "🏡", gradientFrom: "#0d3b2e", gradientTo: "#052a1f", ids: ["airbnb-property-listing", "budget-tracker", "personal-finance-dashboard", "adhd-focus-tracker"] },
];

// ── Category cover images (Unsplash) ─────────────────────────────────────────

export const CATEGORY_IMAGES: Record<string, string> = {
  professionals:     "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=280&fit=crop&q=80&auto=format",
  "lifestyle-finance":"https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=280&fit=crop&q=80&auto=format",
  business:          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=280&fit=crop&q=80&auto=format",
  startup:           "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=280&fit=crop&q=80&auto=format",
  creative:          "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=280&fit=crop&q=80&auto=format",
  "copywriting-ai":  "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=280&fit=crop&q=80&auto=format",
  "ai-productivity": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=280&fit=crop&q=80&auto=format",
  hospitality:       "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=280&fit=crop&q=80&auto=format",
  "digital-product": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=280&fit=crop&q=80&auto=format",
  "personal-brand":  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=280&fit=crop&q=80&auto=format",
  "notion-workspace":"https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=280&fit=crop&q=80&auto=format",
  "elearning":           "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=280&fit=crop&q=80&auto=format",
  "shopify-ecommerce":   "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=280&fit=crop&q=80&auto=format",
  "wordpress-themes":    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=280&fit=crop&q=80&auto=format",
};

// ── Scramble chars ────────────────────────────────────────────────────────────
export const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

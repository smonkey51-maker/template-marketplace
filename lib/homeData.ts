// ── Home page static data ─────────────────────────────────────────────────────
// Shared constants used across HomeContent sub-components.

export const CATEGORIES = [
  // 職人 Shokunin
  { id: "creative",          pillar: "shokunin",   emoji: "🎨", labelIt: "Agenzie & Freelance",     labelEn: "Agencies & Freelance" },
  { id: "copywriting-ai",    pillar: "shokunin",   emoji: "✍️", labelIt: "Copywriting & AI Prompt", labelEn: "Copywriting & AI Prompt" },
  { id: "personal-brand",    pillar: "shokunin",   emoji: "🪪", labelIt: "Identità & Personal Brand",labelEn: "Identity & Personal Brand" },
  { id: "wordpress-themes",  pillar: "shokunin",   emoji: "📝", labelIt: "Temi WordPress",           labelEn: "WordPress Themes" },
  { id: "shopify-ecommerce", pillar: "shokunin",   emoji: "🛒", labelIt: "Shopify E-commerce",       labelEn: "Shopify E-commerce" },
  // 改善 Kaizen
  { id: "startup",           pillar: "kaizen",     emoji: "🚀", labelIt: "Startup & Lancio prodotto",labelEn: "Startup & Product Launch" },
  { id: "digital-product",   pillar: "kaizen",     emoji: "📱", labelIt: "App & Prodotto Digitale",  labelEn: "App & Digital Product" },
  { id: "ai-productivity",   pillar: "kaizen",     emoji: "🤖", labelIt: "AI & Produttività",        labelEn: "AI & Productivity" },
  { id: "notion-workspace",  pillar: "kaizen",     emoji: "📓", labelIt: "Notion Workspace",         labelEn: "Notion Workspace" },
  { id: "elearning",         pillar: "kaizen",     emoji: "🎓", labelIt: "E-learning & Corsi",       labelEn: "E-learning & Courses" },
  // おもてなし Omotenashi
  { id: "professionals",     pillar: "omotenashi", emoji: "🏢", labelIt: "Professionisti",           labelEn: "Professionals" },
  { id: "business",          pillar: "omotenashi", emoji: "🛍️", labelIt: "Imprenditori & Business", labelEn: "Entrepreneurs & Business" },
  { id: "hospitality",       pillar: "omotenashi", emoji: "🍽️", labelIt: "Ristorazione & Hospitality",labelEn: "Food & Hospitality" },
  // 生き甲斐 Ikigai
  { id: "lifestyle-finance", pillar: "ikigai",     emoji: "🏡", labelIt: "Lifestyle & Finanza personale", labelEn: "Lifestyle & Personal Finance" },
];

export const STEPS = [
  { n: "01", icon: "🔍", titleIt: "Scegli un template",    titleEn: "Choose a template",    descIt: "Anteprima completa prima di acquistare.", descEn: "Full preview before buying." },
  { n: "02", icon: "⚡", titleIt: "Acquista in un click",  titleEn: "Buy in one click",      descIt: "Pagamento sicuro con Stripe.",            descEn: "Secure Stripe payment." },
  { n: "03", icon: "🤖", titleIt: "Personalizza con AI",   titleEn: "Customize with AI",     descIt: "Claude AI applica le tue modifiche.",     descEn: "Claude AI applies your changes." },
];

export const TESTIMONIALS = [
  {
    nameIt: "Marco Ferretti", nameEn: "Marco Ferretti",
    roleIt: "Founder @ StartupMilano", roleEn: "Founder @ StartupMilano",
    quoteIt: "Ho lanciato la landing page del mio SaaS in meno di un giorno. Il template era perfetto e l'AI lo ha adattato al mio brand in pochi minuti.",
    quoteEn: "I launched my SaaS landing page in less than a day. The template was perfect and the AI adapted it to my brand in minutes.",
    rating: 5,
    initials: "MF",
    accent: "from-[#9C7733] to-[#C8A96E]",
  },
  {
    nameIt: "Sara Neri", nameEn: "Sara Neri",
    roleIt: "Freelance Designer", roleEn: "Freelance Designer",
    quoteIt: "Uso Forma per tutti i miei clienti. Risparmio ore di lavoro e posso offrire risultati professionali a prezzi competitivi.",
    quoteEn: "I use Forma for all my clients. I save hours of work and can deliver professional results at competitive prices.",
    rating: 5,
    initials: "SN",
    accent: "from-[#B5501F] to-[#C4622D]",
  },
  {
    nameIt: "Luca Moretti", nameEn: "Luca Moretti",
    roleIt: "Marketing Manager", roleEn: "Marketing Manager",
    quoteIt: "I prompt template per LinkedIn hanno triplicato il mio engagement. Claude AI li personalizza perfettamente per ogni post.",
    quoteEn: "The LinkedIn prompt templates tripled my engagement. Claude AI perfectly customizes them for each post.",
    rating: 5,
    initials: "LM",
    accent: "from-[#7A6B56] to-[#9C7733]",
  },
];

export const BUNDLE_GRADIENTS: Record<string, { bg: string; glow: string; accent: string; badgeBg: string }> = {
  blue:    { bg: "linear-gradient(145deg,#3d2e14 0%,#0d0b08 100%)", glow: "200,169,110",  accent: "#C8A96E", badgeBg: "rgba(200,169,110,0.22)" },
  violet:  { bg: "linear-gradient(145deg,#4a2510 0%,#0d0b08 100%)", glow: "196,98,45",    accent: "#C4622D", badgeBg: "rgba(196,98,45,0.22)" },
  emerald: { bg: "linear-gradient(145deg,#2c3a1a 0%,#0d0b08 100%)", glow: "139,175,90",   accent: "#8BAF5A", badgeBg: "rgba(139,175,90,0.22)" },
  purple:  { bg: "linear-gradient(145deg,#3d2e14 0%,#1a1408 100%)", glow: "156,119,51",   accent: "#9C7733", badgeBg: "rgba(156,119,51,0.22)" },
  amber:   { bg: "linear-gradient(145deg,#78350f 0%,#1c0a00 100%)", glow: "200,169,110",  accent: "#C8A96E", badgeBg: "rgba(200,169,110,0.22)" },
  orange:  { bg: "linear-gradient(145deg,#7c2d12 0%,#1c0700 100%)", glow: "196,98,45",    accent: "#C4622D", badgeBg: "rgba(196,98,45,0.22)" },
};

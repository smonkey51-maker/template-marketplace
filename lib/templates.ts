export type TemplateCategory = "ui" | "prompt";

export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  price: number; // cents
  stripePriceId: string;
  tags: string[];
  downloads: number;
  content: string;
}

export const templates: Template[] = [
  // ── UI Templates ──────────────────────────────────────────────────────────
  {
    id: "hero-saas",
    name: "SaaS Hero Section",
    description:
      "Modern hero with gradient background, CTA buttons, and social proof badge.",
    category: "ui",
    price: 999,
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
    tags: ["hero", "saas", "landing", "gradient"],
    downloads: 1423,
    content: `<section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm border border-white/20 mb-6">
      🚀 Now in public beta
    </span>
    <h1 class="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
      Build faster with<br/>
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-cyan-300">
        AI-powered tools
      </span>
    </h1>
    <p class="text-xl text-white/70 max-w-2xl mx-auto mb-8">
      Ship your product in days, not months. Join 10,000+ developers who trust our platform.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button class="px-8 py-4 bg-white text-indigo-900 font-bold rounded-xl hover:bg-white/90 transition">
        Start for free
      </button>
      <button class="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition backdrop-blur-sm">
        Watch demo →
      </button>
    </div>
    <p class="mt-8 text-white/40 text-sm">No credit card required · Free tier available · Cancel anytime</p>
  </div>
</section>`,
  },
  {
    id: "pricing-table",
    name: "3-Tier Pricing Table",
    description:
      "Clean pricing cards with highlighted recommended plan and feature lists.",
    category: "ui",
    price: 799,
    stripePriceId: "price_1TBixDBoWNgrJbiyjst5ntr3",
    tags: ["pricing", "saas", "cards", "table"],
    downloads: 987,
    content: `<div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 py-16">
  <!-- Starter -->
  <div class="rounded-2xl border border-gray-200 p-8 bg-white">
    <h3 class="text-lg font-semibold text-gray-900">Starter</h3>
    <p class="mt-4 text-4xl font-bold text-gray-900">$9<span class="text-lg text-gray-500">/mo</span></p>
    <ul class="mt-6 space-y-3 text-sm text-gray-600">
      <li>✅ 100 AI generations</li>
      <li>✅ 5 projects</li>
      <li>✅ Email support</li>
    </ul>
    <button class="mt-8 w-full py-3 rounded-xl border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition">
      Get started
    </button>
  </div>
  <!-- Pro (highlighted) -->
  <div class="rounded-2xl border-2 border-indigo-600 p-8 bg-indigo-600 text-white scale-105 shadow-2xl">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-semibold">Pro</h3>
      <span class="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">POPULAR</span>
    </div>
    <p class="mt-4 text-4xl font-bold">$29<span class="text-lg text-white/70">/mo</span></p>
    <ul class="mt-6 space-y-3 text-sm text-white/80">
      <li>✅ Unlimited generations</li>
      <li>✅ 50 projects</li>
      <li>✅ Priority support</li>
    </ul>
    <button class="mt-8 w-full py-3 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-white/90 transition">
      Get started
    </button>
  </div>
  <!-- Enterprise -->
  <div class="rounded-2xl border border-gray-200 p-8 bg-white">
    <h3 class="text-lg font-semibold text-gray-900">Enterprise</h3>
    <p class="mt-4 text-4xl font-bold text-gray-900">$99<span class="text-lg text-gray-500">/mo</span></p>
    <ul class="mt-6 space-y-3 text-sm text-gray-600">
      <li>✅ Unlimited everything</li>
      <li>✅ Custom integrations</li>
      <li>✅ Dedicated support</li>
    </ul>
    <button class="mt-8 w-full py-3 rounded-xl border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition">
      Contact sales
    </button>
  </div>
</div>`,
  },
  {
    id: "blog-card-grid",
    name: "Blog Card Grid",
    description:
      "Responsive 3-column blog post cards with author info and hover effects.",
    category: "ui",
    price: 599,
    stripePriceId: "price_1TBixEBoWNgrJbiyhJfNG8k8",
    tags: ["blog", "cards", "grid", "articles"],
    downloads: 756,
    content: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 py-12">
  <article class="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
    <div class="h-48 bg-gradient-to-br from-violet-400 to-indigo-600"></div>
    <div class="p-6">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">Technology</span>
        <span class="text-xs text-gray-400">5 min read</span>
      </div>
      <h2 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
        The Future of AI in Product Development
      </h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        How modern teams are leveraging artificial intelligence to ship products 10x faster.
      </p>
      <div class="flex items-center gap-3 mt-6">
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-violet-500"></div>
        <div>
          <p class="text-sm font-medium text-gray-900">Sarah Chen</p>
          <p class="text-xs text-gray-400">March 15, 2025</p>
        </div>
      </div>
    </div>
  </article>
</div>`,
  },
  // ── Prompt Templates ──────────────────────────────────────────────────────
  {
    id: "cold-email-b2b",
    name: "B2B Cold Email Outreach",
    description:
      "High-converting cold email prompt with personalization variables for any prospect.",
    category: "prompt",
    price: 1299,
    stripePriceId: "price_1TBixFBoWNgrJbiyzxGXK1Jo",
    tags: ["cold email", "b2b", "sales", "outreach"],
    downloads: 2341,
    content: `You are an expert B2B sales copywriter. Write a cold outreach email:

PROSPECT INFO:
- Name: {{prospect_name}}
- Company: {{company_name}}
- Role: {{prospect_role}}
- Industry: {{industry}}
- Pain point: {{pain_point}}

SENDER INFO:
- My name: {{sender_name}}
- My company: {{sender_company}}
- Product/service: {{product_description}}
- Key benefit: {{key_benefit}}
- Social proof: {{social_proof}} (e.g., "trusted by 500+ SaaS companies")

EMAIL REQUIREMENTS:
1. Subject line: Under 50 chars, create curiosity without clickbait
2. Opening: Reference something specific about their company
3. Problem: Briefly acknowledge the {{pain_point}} they face
4. Solution: One sentence on how {{product_description}} solves it
5. Social proof: Weave in {{social_proof}} naturally
6. CTA: Single, low-friction ask — a 15-minute call
7. Length: Under 150 words
8. Tone: Professional but conversational, never pushy

OUTPUT FORMAT:
Subject: [subject line]

[email body]

---
Alternative subject lines:
1. [alt 1]
2. [alt 2]`,
  },
  {
    id: "product-description-ecom",
    name: "E-commerce Product Description",
    description:
      "SEO-optimized product description generator for any e-commerce store.",
    category: "prompt",
    price: 799,
    stripePriceId: "price_1TBixFBoWNgrJbiyOlJPdvT0",
    tags: ["e-commerce", "seo", "product", "copywriting"],
    downloads: 1876,
    content: `You are an expert e-commerce copywriter and SEO specialist.

PRODUCT DETAILS:
- Product name: {{product_name}}
- Category: {{category}}
- Key features: {{features_list}}
- Target audience: {{target_audience}}
- Price point: {{price}}
- Brand voice: {{brand_voice}} (e.g., premium, fun, technical, casual)

SEO REQUIREMENTS:
- Primary keyword: {{primary_keyword}}
- Secondary keywords: {{secondary_keywords}}

DELIVERABLES:
1. Meta title (60 chars max): Include primary keyword naturally
2. Meta description (155 chars max): Include primary keyword + CTA
3. Product headline (H1): Benefit-focused, include primary keyword
4. Short description (2-3 sentences): Above-the-fold hook
5. Full description (150-200 words):
   - Lead with the customer's desired outcome
   - Address top 3 pain points it solves
   - Highlight 3-5 key features as benefits
   - Include social proof signal
   - Close with urgency or guarantee
6. Bullet points (5 bullets): Feature → Benefit format
7. FAQ (3 Q&A): Address top buying objections`,
  },
  {
    id: "ai-assistant-system-prompt",
    name: "Custom AI Assistant System Prompt",
    description:
      "Craft the perfect system prompt for any custom AI assistant or chatbot.",
    category: "prompt",
    price: 1499,
    stripePriceId: "price_1TBixGBoWNgrJbiyioEK1MiF",
    tags: ["system prompt", "ai assistant", "chatbot", "llm"],
    downloads: 3102,
    content: `You are a world-class AI prompt engineer. Create a comprehensive system prompt for a custom AI assistant:

ASSISTANT SPECS:
- Name: {{assistant_name}}
- Use case: {{use_case}}
- Target users: {{target_users}}
- Primary tasks: {{primary_tasks}}
- Tone/personality: {{personality}} (e.g., formal, friendly, direct, empathetic)
- Expertise domains: {{expertise_domains}}
- Off-limits topics: {{restrictions}}
- Output format preference: {{output_format}}

BUILD THE SYSTEM PROMPT WITH THESE SECTIONS:
1. Role definition: Clear, specific role statement (who the AI is)
2. Core capabilities: 3-5 specific things it excels at
3. Personality & tone: How it communicates and its character traits
4. Response format rules: Structure, length, formatting conventions
5. Handling edge cases: What to do when asked something outside scope
6. Example interaction: A sample Q&A demonstrating ideal behavior
7. Safety boundaries: Clear, firm limits without being preachy

QUALITY CRITERIA:
- Specific enough to be consistent
- Flexible enough to handle varied inputs
- Focused on the user's actual needs
- Free from contradictions
- Length: 400-600 words`,
  },
];

export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

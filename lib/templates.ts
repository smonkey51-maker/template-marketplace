export type TemplateCategory = "ui" | "prompt";
export type DownloadType =
  | "html"     // UI template → .html file with Tailwind CDN
  | "prompt"   // Prompt template → .txt file
  | "canva"    // Canva edit link
  | "excel"    // .xlsx file
  | "sheets"   // Google Sheets /copy link
  | "notion"   // Notion duplicate link
  | "webflow"  // Webflow project link
  | "framer";  // Framer project link

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
  /** Defaults to "html" for ui templates, "prompt" for prompt templates */
  downloadType?: DownloadType;
  /** Required for canva / excel / sheets / notion / webflow / framer */
  downloadUrl?: string;
  editorsPick?: boolean;
  isNew?: boolean;
}

/** Returns the effective download type, falling back to category-based default */
export function getDownloadType(template: Template): DownloadType {
  return template.downloadType ?? (template.category === "ui" ? "html" : "prompt");
}

export const templates: Template[] = [
  // ── UI Templates ──────────────────────────────────────────────────────────
  {
    id: "hero-saas",
    name: "SaaS Hero Section",
    description:
      "Modern hero with gradient background, CTA buttons, and social proof badge.",
    category: "ui",
    price: 1299,
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
    tags: ["hero", "saas", "landing", "gradient"],
    downloads: 1423,
    editorsPick: true,
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
    price: 999,
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
    price: 699,
    stripePriceId: "price_1TBixEBoWNgrJbiyhJfNG8k8",
    tags: ["blog", "cards", "grid", "articles"],
    downloads: 756,
    content: `<div class="bg-gray-50 min-h-screen py-12 px-4">
  <div class="max-w-5xl mx-auto">
    <div class="mb-10 text-center">
      <h1 class="text-3xl font-black text-gray-900 mb-2">The Journal</h1>
      <p class="text-gray-500 text-sm">Ideas, insights and stories worth reading.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Card 1 — Featured -->
      <article class="group md:col-span-1 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
        <div class="h-48 bg-gradient-to-br from-violet-400 to-indigo-600 relative">
          <span class="absolute top-3 left-3 text-xs font-bold bg-white/20 text-white backdrop-blur-sm px-2.5 py-1 rounded-full">Technology</span>
        </div>
        <div class="p-5">
          <div class="flex items-center gap-2 mb-2"><span class="text-xs text-gray-400">5 min read</span><span class="text-gray-200">·</span><span class="text-xs text-gray-400">Mar 15</span></div>
          <h2 class="text-[15px] font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors leading-snug">The Future of AI in Product Development</h2>
          <p class="text-gray-500 text-xs leading-relaxed">How modern teams are leveraging AI to ship products 10x faster without sacrificing quality.</p>
          <div class="flex items-center gap-2 mt-5"><div class="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-violet-500 shrink-0"></div><div><p class="text-xs font-semibold text-gray-800">Sarah Chen</p><p class="text-[10px] text-gray-400">Editor in Chief</p></div></div>
        </div>
      </article>
      <!-- Card 2 -->
      <article class="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
        <div class="h-48 bg-gradient-to-br from-emerald-400 to-teal-600 relative">
          <span class="absolute top-3 left-3 text-xs font-bold bg-white/20 text-white backdrop-blur-sm px-2.5 py-1 rounded-full">Design</span>
        </div>
        <div class="p-5">
          <div class="flex items-center gap-2 mb-2"><span class="text-xs text-gray-400">3 min read</span><span class="text-gray-200">·</span><span class="text-xs text-gray-400">Mar 10</span></div>
          <h2 class="text-[15px] font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors leading-snug">Why Minimalism Still Wins in 2025</h2>
          <p class="text-gray-500 text-xs leading-relaxed">Clean interfaces reduce cognitive load. Here's the data behind less-is-more design thinking.</p>
          <div class="flex items-center gap-2 mt-5"><div class="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shrink-0"></div><div><p class="text-xs font-semibold text-gray-800">Marco Bianchi</p><p class="text-[10px] text-gray-400">Design Lead</p></div></div>
        </div>
      </article>
      <!-- Card 3 -->
      <article class="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
        <div class="h-48 bg-gradient-to-br from-amber-400 to-orange-500 relative">
          <span class="absolute top-3 left-3 text-xs font-bold bg-white/20 text-white backdrop-blur-sm px-2.5 py-1 rounded-full">Business</span>
        </div>
        <div class="p-5">
          <div class="flex items-center gap-2 mb-2"><span class="text-xs text-gray-400">7 min read</span><span class="text-gray-200">·</span><span class="text-xs text-gray-400">Mar 5</span></div>
          <h2 class="text-[15px] font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors leading-snug">Bootstrap to €1M ARR: Lessons Learned</h2>
          <p class="text-gray-500 text-xs leading-relaxed">A founder's honest account of what worked, what failed, and the one decision that changed everything.</p>
          <div class="flex items-center gap-2 mt-5"><div class="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shrink-0"></div><div><p class="text-xs font-semibold text-gray-800">Giulia Rossi</p><p class="text-[10px] text-gray-400">Founder</p></div></div>
        </div>
      </article>
    </div>
  </div>
</div>`,
  },

  // ── Canva-Style Templates ─────────────────────────────────────────────────
  {
    id: "real-estate-agent",
    name: "Real Estate Agent Profile",
    description:
      "Elegant Canva-style profile page for real estate agents with listings showcase and contact CTA.",
    category: "ui",
    price: 1199,
    stripePriceId: "price_1TBz4bBoWNgrJbiy53ZV2H24",
    tags: ["real estate", "agent", "profile", "canva", "listings"],
    downloads: 312,
    isNew: true,
    content: `<div class="min-h-screen bg-gradient-to-b from-amber-50 to-white font-sans">
  <!-- Hero -->
  <div class="relative bg-gradient-to-r from-amber-800 to-amber-600 text-white py-20 px-8 text-center overflow-hidden">
    <div class="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHY2YzYuNjMgMCAxMiA1LjM3IDEyIDEyaC02eiIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4=')]"></div>
    <div class="w-24 h-24 rounded-full bg-amber-200 mx-auto mb-4 flex items-center justify-center text-4xl">👤</div>
    <h1 class="text-4xl font-bold mb-2">Marco Rossi</h1>
    <p class="text-amber-200 text-lg">Luxury Real Estate Specialist · Milano</p>
    <div class="flex justify-center gap-6 mt-6 text-sm">
      <div class="text-center"><div class="text-2xl font-bold">140+</div><div class="text-amber-200">Sold</div></div>
      <div class="w-px bg-white/20"></div>
      <div class="text-center"><div class="text-2xl font-bold">€2.4M</div><div class="text-amber-200">Avg. Price</div></div>
      <div class="w-px bg-white/20"></div>
      <div class="text-center"><div class="text-2xl font-bold">12yr</div><div class="text-amber-200">Experience</div></div>
    </div>
  </div>
  <!-- Featured Listings -->
  <div class="max-w-4xl mx-auto px-6 py-12">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Featured Listings</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="rounded-2xl overflow-hidden shadow-md bg-white border border-amber-100">
        <div class="h-40 bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-5xl">🏡</div>
        <div class="p-4">
          <div class="text-xs text-amber-600 font-semibold uppercase mb-1">For Sale</div>
          <div class="font-bold text-gray-800">Villa San Babila</div>
          <div class="text-gray-500 text-sm mt-1">4 bd · 3 ba · 220 m²</div>
          <div class="text-amber-700 font-bold mt-2">€ 1,250,000</div>
        </div>
      </div>
      <div class="rounded-2xl overflow-hidden shadow-md bg-white border border-amber-100">
        <div class="h-40 bg-gradient-to-br from-sky-300 to-blue-400 flex items-center justify-center text-5xl">🏢</div>
        <div class="p-4">
          <div class="text-xs text-green-600 font-semibold uppercase mb-1">New</div>
          <div class="font-bold text-gray-800">Penthouse Navigli</div>
          <div class="text-gray-500 text-sm mt-1">3 bd · 2 ba · 180 m²</div>
          <div class="text-amber-700 font-bold mt-2">€ 890,000</div>
        </div>
      </div>
      <div class="rounded-2xl overflow-hidden shadow-md bg-white border border-amber-100">
        <div class="h-40 bg-gradient-to-br from-emerald-300 to-teal-400 flex items-center justify-center text-5xl">🌿</div>
        <div class="p-4">
          <div class="text-xs text-purple-600 font-semibold uppercase mb-1">Reduced</div>
          <div class="font-bold text-gray-800">Country Estate</div>
          <div class="text-gray-500 text-sm mt-1">6 bd · 4 ba · 450 m²</div>
          <div class="text-amber-700 font-bold mt-2">€ 2,100,000</div>
        </div>
      </div>
    </div>
    <div class="mt-10 bg-amber-700 rounded-2xl p-8 text-white text-center">
      <h3 class="text-2xl font-bold mb-2">Ready to find your dream home?</h3>
      <p class="text-amber-200 mb-6">Free consultation · No obligations · Fast response</p>
      <button class="bg-white text-amber-800 font-bold px-8 py-3 rounded-xl hover:bg-amber-50 transition">Book a Free Call</button>
    </div>
  </div>
</div>`,
  },
  {
    id: "airbnb-property-listing",
    name: "Airbnb Property Listing",
    description:
      "Beautiful property showcase page for short-term rental hosts with amenities and booking CTA.",
    category: "ui",
    price: 999,
    stripePriceId: "price_1TBz4cBoWNgrJbiylT4TF2vL",
    tags: ["airbnb", "property", "rental", "canva", "hospitality"],
    downloads: 489,
    content: `<div class="min-h-screen bg-white font-sans">
  <!-- Photo Grid -->
  <div class="grid grid-cols-4 grid-rows-2 h-72 gap-2 p-4 max-w-5xl mx-auto">
    <div class="col-span-2 row-span-2 rounded-2xl bg-gradient-to-br from-rose-300 to-pink-500 flex items-center justify-center text-6xl">🌅</div>
    <div class="rounded-xl bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center text-3xl">🛋️</div>
    <div class="rounded-xl bg-gradient-to-br from-emerald-200 to-teal-300 flex items-center justify-center text-3xl">🛏️</div>
    <div class="rounded-xl bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center text-3xl">🍳</div>
    <div class="rounded-xl bg-gradient-to-br from-violet-200 to-purple-300 flex items-center justify-center text-3xl">🛁</div>
  </div>
  <!-- Details -->
  <div class="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-10">
    <div class="md:col-span-2">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Cozy Apartment in Trastevere</h1>
          <p class="text-gray-500 mt-1">Roma · Entire apartment · 2 guests · 1 bed · 1 bath</p>
        </div>
        <div class="flex items-center gap-1 text-sm font-semibold"><span class="text-rose-500">★</span> 4.97 <span class="text-gray-400">(128)</span></div>
      </div>
      <hr class="my-6 border-gray-100"/>
      <h2 class="font-bold text-gray-800 mb-3">About this place</h2>
      <p class="text-gray-600 text-sm leading-relaxed">Charming sunlit apartment in the heart of Trastevere. Original terracotta floors, exposed brick walls, and a private terrace with rooftop views. Walking distance from top restaurants and the Tiber river.</p>
      <h2 class="font-bold text-gray-800 mt-6 mb-3">What this place offers</h2>
      <div class="grid grid-cols-2 gap-2">
        <div class="flex items-center gap-2 text-sm text-gray-700">✅ WiFi · 200 Mbps</div>
        <div class="flex items-center gap-2 text-sm text-gray-700">✅ Air conditioning</div>
        <div class="flex items-center gap-2 text-sm text-gray-700">✅ Fully equipped kitchen</div>
        <div class="flex items-center gap-2 text-sm text-gray-700">✅ Private terrace</div>
        <div class="flex items-center gap-2 text-sm text-gray-700">✅ Washing machine</div>
        <div class="flex items-center gap-2 text-sm text-gray-700">✅ Self check-in</div>
      </div>
    </div>
    <div class="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 h-fit sticky top-6">
      <div class="text-2xl font-bold text-gray-900">€85 <span class="text-base font-normal text-gray-500">/ night</span></div>
      <div class="flex items-center gap-1 text-sm mt-1"><span class="text-rose-500">★</span><span class="font-semibold">4.97</span><span class="text-gray-400">(128 reviews)</span></div>
      <div class="mt-4 border border-gray-200 rounded-xl overflow-hidden text-sm">
        <div class="grid grid-cols-2 divide-x divide-gray-200">
          <div class="p-3"><div class="text-xs font-bold text-gray-700 uppercase">Check-in</div><div class="text-gray-600">Apr 14, 2025</div></div>
          <div class="p-3"><div class="text-xs font-bold text-gray-700 uppercase">Checkout</div><div class="text-gray-600">Apr 18, 2025</div></div>
        </div>
      </div>
      <button class="mt-4 w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl transition">Reserve</button>
      <p class="text-center text-gray-400 text-xs mt-2">You won't be charged yet</p>
      <div class="mt-4 text-sm text-gray-600 space-y-2 border-t border-gray-100 pt-4">
        <div class="flex justify-between"><span>€85 × 4 nights</span><span>€340</span></div>
        <div class="flex justify-between"><span>Cleaning fee</span><span>€30</span></div>
        <div class="flex justify-between font-bold text-gray-800 pt-2 border-t border-gray-100 mt-2"><span>Total</span><span>€370</span></div>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    id: "therapist-profile",
    name: "Therapist / Psychologist Profile",
    description:
      "Warm, professional Canva-style profile page for therapists with specializations and booking.",
    category: "ui",
    price: 1099,
    stripePriceId: "price_1TBz4cBoWNgrJbiyl78g7arm",
    tags: ["therapist", "psychologist", "health", "canva", "booking"],
    downloads: 267,
    isNew: true,
    content: `<div class="min-h-screen bg-gradient-to-b from-teal-50 to-white font-sans">
  <div class="max-w-3xl mx-auto px-6 py-12">
    <!-- Profile Header -->
    <div class="text-center mb-10">
      <div class="w-28 h-28 rounded-full bg-gradient-to-br from-teal-300 to-emerald-400 mx-auto mb-4 flex items-center justify-center text-5xl">🧠</div>
      <h1 class="text-3xl font-bold text-gray-800">Dr. Elena Ferretti</h1>
      <p class="text-teal-600 font-medium mt-1">Clinical Psychologist · CBT Specialist</p>
      <p class="text-gray-500 text-sm mt-2">📍 Milano · Online sessions available</p>
      <div class="flex justify-center gap-3 mt-4">
        <span class="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">Anxiety & Stress</span>
        <span class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">Relationships</span>
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">Burnout</span>
      </div>
    </div>
    <!-- About -->
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-teal-100 mb-6">
      <h2 class="text-lg font-bold text-gray-800 mb-3">About Me</h2>
      <p class="text-gray-600 text-sm leading-relaxed">With 10+ years of experience, I support individuals navigating anxiety, burnout, and relationship challenges. My approach combines evidence-based CBT with compassion-focused therapy. I offer a safe, judgment-free space for growth.</p>
    </div>
    <!-- Services -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-teal-50 rounded-2xl p-5 text-center">
        <div class="text-3xl mb-2">🎯</div>
        <div class="font-bold text-gray-800 text-sm">Individual Therapy</div>
        <div class="text-gray-500 text-xs mt-1">50 min · €90</div>
      </div>
      <div class="bg-emerald-50 rounded-2xl p-5 text-center">
        <div class="text-3xl mb-2">💑</div>
        <div class="font-bold text-gray-800 text-sm">Couples Therapy</div>
        <div class="text-gray-500 text-xs mt-1">80 min · €130</div>
      </div>
      <div class="bg-blue-50 rounded-2xl p-5 text-center">
        <div class="text-3xl mb-2">🧘</div>
        <div class="font-bold text-gray-800 text-sm">Free Consultation</div>
        <div class="text-gray-500 text-xs mt-1">20 min · No charge</div>
      </div>
    </div>
    <!-- Testimonials -->
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-teal-100 mb-6">
      <h2 class="text-lg font-bold text-gray-800 mb-4">What clients say</h2>
      <div class="space-y-4">
        <div class="flex gap-3"><div class="text-[#0A84FF] text-sm">★★★★★</div><p class="text-gray-600 text-sm italic">"Dr. Ferretti changed my life. I finally feel understood."</p></div>
        <div class="flex gap-3"><div class="text-[#0A84FF] text-sm">★★★★★</div><p class="text-gray-600 text-sm italic">"Practical, kind, and truly effective. Highly recommend."</p></div>
      </div>
    </div>
    <button class="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-2xl transition text-lg">Book a Free Consultation</button>
  </div>
</div>`,
  },
  {
    id: "law-firm-services",
    name: "Law Firm Services Page",
    description:
      "Authoritative, trust-building services page for law firms with practice areas and CTA.",
    category: "ui",
    price: 1399,
    stripePriceId: "price_1TBz4dBoWNgrJbiyTRJrTvkK",
    tags: ["law", "legal", "firm", "canva", "professional"],
    downloads: 198,
    isNew: true,
    content: `<div class="min-h-screen bg-slate-900 text-white font-sans">
  <!-- Header -->
  <div class="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 px-8 py-5 flex items-center justify-between max-w-6xl mx-auto">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center font-bold text-slate-900">⚖</div>
      <div><div class="font-bold text-white">Conti & Associati</div><div class="text-xs text-slate-400">Studio Legale</div></div>
    </div>
    <nav class="hidden md:flex gap-6 text-sm text-slate-300">
      <a class="hover:text-white transition">Chi siamo</a>
      <a class="hover:text-white transition">Servizi</a>
      <a class="hover:text-white transition">Team</a>
      <a class="hover:text-white transition">Contatti</a>
    </nav>
    <button class="bg-yellow-500 text-slate-900 font-bold px-5 py-2 rounded-lg text-sm hover:bg-yellow-400 transition">Consulenza gratuita</button>
  </div>
  <!-- Hero -->
  <div class="max-w-6xl mx-auto px-8 py-16 text-center">
    <div class="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-[#0A84FF] px-4 py-2 rounded-full text-sm mb-6">⚖️ Oltre 500 casi vinti · Dal 1998</div>
    <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-4">La tua tutela legale,<br/><span class="text-[#0A84FF]">la nostra priorità</span></h1>
    <p class="text-slate-400 text-lg max-w-xl mx-auto">Assistenza legale personalizzata per privati e aziende. Risultati concreti, massima riservatezza.</p>
    <div class="flex gap-4 justify-center mt-8">
      <button class="bg-yellow-500 text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 transition">Prenota ora</button>
      <button class="border border-slate-600 text-white px-8 py-4 rounded-xl hover:border-slate-400 transition">Scopri di più</button>
    </div>
  </div>
  <!-- Practice Areas -->
  <div class="max-w-6xl mx-auto px-8 pb-16 grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="bg-slate-800 border border-slate-700 rounded-2xl p-5 hover:border-yellow-500/50 transition">
      <div class="text-3xl mb-3">🏢</div>
      <div class="font-bold text-white mb-1">Diritto Societario</div>
      <div class="text-slate-400 text-xs">Contratti, M&A, governance aziendale</div>
    </div>
    <div class="bg-slate-800 border border-slate-700 rounded-2xl p-5 hover:border-yellow-500/50 transition">
      <div class="text-3xl mb-3">🏠</div>
      <div class="font-bold text-white mb-1">Diritto Immobiliare</div>
      <div class="text-slate-400 text-xs">Compravendite, locazioni, controversie</div>
    </div>
    <div class="bg-slate-800 border border-slate-700 rounded-2xl p-5 hover:border-yellow-500/50 transition">
      <div class="text-3xl mb-3">👨‍👩‍👧</div>
      <div class="font-bold text-white mb-1">Diritto di Famiglia</div>
      <div class="text-slate-400 text-xs">Separazioni, divorzi, affidi</div>
    </div>
    <div class="bg-slate-800 border border-slate-700 rounded-2xl p-5 hover:border-yellow-500/50 transition">
      <div class="text-3xl mb-3">🛡️</div>
      <div class="font-bold text-white mb-1">Penale</div>
      <div class="text-slate-400 text-xs">Difesa penale, reati informatici</div>
    </div>
  </div>
</div>`,
  },

  // ── Spreadsheet-Style Templates ───────────────────────────────────────────
  {
    id: "budget-tracker",
    name: "Personal Budget Tracker",
    description:
      "Clean spreadsheet-style monthly budget tracker with income, expenses, and savings overview.",
    category: "ui",
    price: 699,
    stripePriceId: "price_1TBz4eBoWNgrJbiyCYxFpTUr",
    tags: ["budget", "finance", "tracker", "spreadsheet", "personal"],
    downloads: 621,
    content: `<div class="min-h-screen bg-gray-50 p-6 font-mono text-sm">
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div><h1 class="text-2xl font-bold text-gray-800">💰 Budget Tracker</h1><p class="text-gray-500 text-xs mt-1">March 2025</p></div>
      <div class="flex gap-3">
        <div class="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold">+€3,200 Income</div>
        <div class="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-bold">-€2,140 Expenses</div>
        <div class="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-bold">€1,060 Saved</div>
      </div>
    </div>
    <!-- Progress Bar -->
    <div class="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-200">
      <div class="flex justify-between text-xs text-gray-500 mb-2"><span>Budget used</span><span>67%</span></div>
      <div class="h-3 bg-gray-100 rounded-full overflow-hidden"><div class="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" style="width:67%"></div></div>
    </div>
    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-100 text-gray-600 text-xs uppercase">
          <tr>
            <th class="px-4 py-3 text-left">Category</th>
            <th class="px-4 py-3 text-right">Budgeted</th>
            <th class="px-4 py-3 text-right">Spent</th>
            <th class="px-4 py-3 text-right">Remaining</th>
            <th class="px-4 py-3 text-center">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr class="hover:bg-gray-50"><td class="px-4 py-3">🏠 Housing</td><td class="px-4 py-3 text-right text-gray-600">€800</td><td class="px-4 py-3 text-right font-medium">€800</td><td class="px-4 py-3 text-right text-gray-400">€0</td><td class="px-4 py-3 text-center"><span class="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">Full</span></td></tr>
          <tr class="hover:bg-gray-50"><td class="px-4 py-3">🍕 Food</td><td class="px-4 py-3 text-right text-gray-600">€400</td><td class="px-4 py-3 text-right font-medium">€320</td><td class="px-4 py-3 text-right text-green-600">€80</td><td class="px-4 py-3 text-center"><span class="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">On track</span></td></tr>
          <tr class="hover:bg-gray-50"><td class="px-4 py-3">🚗 Transport</td><td class="px-4 py-3 text-right text-gray-600">€200</td><td class="px-4 py-3 text-right font-medium">€245</td><td class="px-4 py-3 text-right text-red-500">-€45</td><td class="px-4 py-3 text-center"><span class="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">Over</span></td></tr>
          <tr class="hover:bg-gray-50"><td class="px-4 py-3">🎮 Entertainment</td><td class="px-4 py-3 text-right text-gray-600">€150</td><td class="px-4 py-3 text-right font-medium">€85</td><td class="px-4 py-3 text-right text-green-600">€65</td><td class="px-4 py-3 text-center"><span class="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">On track</span></td></tr>
          <tr class="hover:bg-gray-50"><td class="px-4 py-3">💊 Health</td><td class="px-4 py-3 text-right text-gray-600">€100</td><td class="px-4 py-3 text-right font-medium">€60</td><td class="px-4 py-3 text-right text-green-600">€40</td><td class="px-4 py-3 text-center"><span class="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">On track</span></td></tr>
          <tr class="bg-gray-50 font-bold"><td class="px-4 py-3">Total</td><td class="px-4 py-3 text-right">€1,650</td><td class="px-4 py-3 text-right">€1,510</td><td class="px-4 py-3 text-right text-green-600">€140</td><td class="px-4 py-3 text-center"><span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">Good</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`,
  },
  {
    id: "personal-finance-dashboard",
    name: "Personal Finance Dashboard",
    description:
      "Comprehensive spreadsheet dashboard for net worth, investments, and financial goals tracking.",
    category: "ui",
    price: 999,
    stripePriceId: "price_1TBz4fBoWNgrJbiyRXLSv3aw",
    tags: ["finance", "investments", "net worth", "spreadsheet", "dashboard"],
    downloads: 843,
    content: `<div class="min-h-screen bg-slate-950 p-6 font-mono text-sm text-white">
  <div class="max-w-5xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold">📊 Finance Dashboard <span class="text-slate-400 text-base font-normal">Q1 2025</span></h1>
      <span class="text-green-400 text-xs bg-green-400/10 px-3 py-1 rounded-full">↑ +12.4% YTD</span>
    </div>
    <!-- KPI Row -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div class="text-slate-400 text-xs mb-1">Net Worth</div>
        <div class="text-2xl font-bold text-white">€87,430</div>
        <div class="text-green-400 text-xs mt-1">↑ +€4,200 vs last month</div>
      </div>
      <div class="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div class="text-slate-400 text-xs mb-1">Investments</div>
        <div class="text-2xl font-bold text-white">€52,100</div>
        <div class="text-green-400 text-xs mt-1">↑ +8.3% return</div>
      </div>
      <div class="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div class="text-slate-400 text-xs mb-1">Emergency Fund</div>
        <div class="text-2xl font-bold text-white">€12,000</div>
        <div class="text-blue-400 text-xs mt-1">4.0x monthly expenses</div>
      </div>
      <div class="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div class="text-slate-400 text-xs mb-1">Monthly Savings</div>
        <div class="text-2xl font-bold text-white">€1,060</div>
        <div class="text-[#0A84FF] text-xs mt-1">33% savings rate</div>
      </div>
    </div>
    <!-- Portfolio + Goals -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h2 class="font-bold text-slate-200 mb-4">Portfolio Allocation</h2>
        <div class="space-y-3">
          <div><div class="flex justify-between text-xs mb-1"><span class="text-slate-300">Stocks (ETF)</span><span class="text-slate-400">62% · €32,300</span></div><div class="h-2 bg-slate-700 rounded-full"><div class="h-full bg-blue-500 rounded-full" style="width:62%"></div></div></div>
          <div><div class="flex justify-between text-xs mb-1"><span class="text-slate-300">Bonds</span><span class="text-slate-400">20% · €10,420</span></div><div class="h-2 bg-slate-700 rounded-full"><div class="h-full bg-green-500 rounded-full" style="width:20%"></div></div></div>
          <div><div class="flex justify-between text-xs mb-1"><span class="text-slate-300">Crypto</span><span class="text-slate-400">10% · €5,210</span></div><div class="h-2 bg-slate-700 rounded-full"><div class="h-full bg-yellow-500 rounded-full" style="width:10%"></div></div></div>
          <div><div class="flex justify-between text-xs mb-1"><span class="text-slate-300">Cash</span><span class="text-slate-400">8% · €4,170</span></div><div class="h-2 bg-slate-700 rounded-full"><div class="h-full bg-slate-400 rounded-full" style="width:8%"></div></div></div>
        </div>
      </div>
      <div class="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h2 class="font-bold text-slate-200 mb-4">Financial Goals</h2>
        <div class="space-y-4">
          <div><div class="flex justify-between text-xs mb-1"><span class="text-slate-300">🏠 House Down Payment</span><span class="text-green-400">68%</span></div><div class="h-2 bg-slate-700 rounded-full"><div class="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style="width:68%"></div></div><div class="text-slate-500 text-xs mt-1">€34,000 / €50,000</div></div>
          <div><div class="flex justify-between text-xs mb-1"><span class="text-slate-300">✈️ Travel Fund</span><span class="text-blue-400">45%</span></div><div class="h-2 bg-slate-700 rounded-full"><div class="h-full bg-blue-500 rounded-full" style="width:45%"></div></div><div class="text-slate-500 text-xs mt-1">€2,250 / €5,000</div></div>
          <div><div class="flex justify-between text-xs mb-1"><span class="text-slate-300">🎓 Education</span><span class="text-[#0A84FF]">22%</span></div><div class="h-2 bg-slate-700 rounded-full"><div class="h-full bg-yellow-500 rounded-full" style="width:22%"></div></div><div class="text-slate-500 text-xs mt-1">€2,200 / €10,000</div></div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    id: "artisan-product-catalog",
    name: "Artisan Product Catalog",
    description:
      "Spreadsheet-style inventory and pricing catalog for artisans and small makers.",
    category: "ui",
    price: 799,
    stripePriceId: "price_1TBz4fBoWNgrJbiy7LMgcESo",
    tags: ["artisan", "catalog", "inventory", "spreadsheet", "small business"],
    downloads: 334,
    content: `<div class="min-h-screen bg-amber-50 p-6 font-sans text-sm">
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <div><h1 class="text-2xl font-bold text-amber-900">🏺 Bottega Ceramica</h1><p class="text-amber-600 text-xs">Catalogo Prodotti · Spring 2025</p></div>
      <div class="text-right"><div class="text-sm font-semibold text-gray-700">24 products · €4,820 inventory value</div><div class="text-xs text-gray-400 mt-0.5">Last updated: March 17</div></div>
    </div>
    <!-- Filters Row -->
    <div class="flex gap-2 mb-4 flex-wrap">
      <span class="bg-amber-800 text-white px-3 py-1 rounded-full text-xs font-medium cursor-pointer">All (24)</span>
      <span class="bg-white text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-amber-50">Vases (8)</span>
      <span class="bg-white text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-amber-50">Bowls (9)</span>
      <span class="bg-white text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-amber-50">Plates (7)</span>
    </div>
    <!-- Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-amber-200 overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-amber-100 text-amber-800 text-xs uppercase">
          <tr>
            <th class="px-4 py-3 text-left">Product</th>
            <th class="px-4 py-3 text-left">Category</th>
            <th class="px-4 py-3 text-right">Cost</th>
            <th class="px-4 py-3 text-right">Price</th>
            <th class="px-4 py-3 text-right">Margin</th>
            <th class="px-4 py-3 text-center">Stock</th>
            <th class="px-4 py-3 text-center">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-amber-50">
          <tr class="hover:bg-amber-50"><td class="px-4 py-3 font-medium text-gray-800">🏺 Vaso Toscano Grande</td><td class="px-4 py-3 text-gray-500">Vase</td><td class="px-4 py-3 text-right text-gray-400">€18</td><td class="px-4 py-3 text-right font-bold text-amber-800">€65</td><td class="px-4 py-3 text-right text-green-600">72%</td><td class="px-4 py-3 text-center">12</td><td class="px-4 py-3 text-center"><span class="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">Active</span></td></tr>
          <tr class="hover:bg-amber-50"><td class="px-4 py-3 font-medium text-gray-800">🍜 Ciotola Maiolica</td><td class="px-4 py-3 text-gray-500">Bowl</td><td class="px-4 py-3 text-right text-gray-400">€12</td><td class="px-4 py-3 text-right font-bold text-amber-800">€40</td><td class="px-4 py-3 text-right text-green-600">70%</td><td class="px-4 py-3 text-center">3</td><td class="px-4 py-3 text-center"><span class="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs">Low stock</span></td></tr>
          <tr class="hover:bg-amber-50"><td class="px-4 py-3 font-medium text-gray-800">🍽️ Piatto Deruta</td><td class="px-4 py-3 text-gray-500">Plate</td><td class="px-4 py-3 text-right text-gray-400">€15</td><td class="px-4 py-3 text-right font-bold text-amber-800">€55</td><td class="px-4 py-3 text-right text-green-600">73%</td><td class="px-4 py-3 text-center">0</td><td class="px-4 py-3 text-center"><span class="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs">Out of stock</span></td></tr>
          <tr class="hover:bg-amber-50"><td class="px-4 py-3 font-medium text-gray-800">🫙 Brocca Rustica</td><td class="px-4 py-3 text-gray-500">Vase</td><td class="px-4 py-3 text-right text-gray-400">€22</td><td class="px-4 py-3 text-right font-bold text-amber-800">€80</td><td class="px-4 py-3 text-right text-green-600">73%</td><td class="px-4 py-3 text-center">7</td><td class="px-4 py-3 text-center"><span class="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">Active</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`,
  },
  {
    id: "revenue-analytics",
    name: "Revenue Analytics Sheet",
    description:
      "MRR, churn, and growth metrics spreadsheet dashboard for small business owners.",
    category: "ui",
    price: 1199,
    stripePriceId: "price_1TBz4gBoWNgrJbiyKIPEVnxT",
    tags: ["revenue", "analytics", "mrr", "spreadsheet", "business"],
    downloads: 512,
    content: `<div class="min-h-screen bg-gray-950 text-white p-6 font-mono text-sm">
  <div class="max-w-5xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-xl font-bold text-white">📈 Revenue Analytics <span class="text-gray-500 font-normal text-sm">· Q1 2025</span></h1>
      <div class="flex gap-3">
        <span class="text-xs text-gray-400 border border-gray-700 px-3 py-1 rounded cursor-pointer hover:border-gray-500">Monthly</span>
        <span class="text-xs text-white bg-blue-600 px-3 py-1 rounded">Quarterly</span>
      </div>
    </div>
    <!-- Top metrics -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-4"><div class="text-gray-400 text-xs mb-1">MRR</div><div class="text-2xl font-bold">€18,400</div><div class="text-green-400 text-xs mt-1">↑ +14% MoM</div></div>
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-4"><div class="text-gray-400 text-xs mb-1">ARR</div><div class="text-2xl font-bold">€220,800</div><div class="text-green-400 text-xs mt-1">↑ +32% YoY</div></div>
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-4"><div class="text-gray-400 text-xs mb-1">Churn Rate</div><div class="text-2xl font-bold text-red-400">2.1%</div><div class="text-gray-500 text-xs mt-1">Industry avg 3.2%</div></div>
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-4"><div class="text-gray-400 text-xs mb-1">LTV:CAC</div><div class="text-2xl font-bold text-blue-400">4.8x</div><div class="text-green-400 text-xs mt-1">Target: &gt;3x ✓</div></div>
    </div>
    <!-- MRR Breakdown Table -->
    <div class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-6">
      <div class="px-5 py-3 border-b border-gray-800 font-bold text-gray-200">MRR Movements</div>
      <table class="w-full">
        <thead class="text-xs text-gray-500 uppercase bg-gray-950">
          <tr><th class="px-5 py-2 text-left">Type</th><th class="px-5 py-2 text-right">Jan</th><th class="px-5 py-2 text-right">Feb</th><th class="px-5 py-2 text-right">Mar</th><th class="px-5 py-2 text-right">Total</th></tr>
        </thead>
        <tbody class="divide-y divide-gray-800">
          <tr class="hover:bg-gray-800/50"><td class="px-5 py-3 text-green-400">New MRR</td><td class="px-5 py-3 text-right">€1,820</td><td class="px-5 py-3 text-right">€2,100</td><td class="px-5 py-3 text-right">€2,450</td><td class="px-5 py-3 text-right font-bold text-green-400">€6,370</td></tr>
          <tr class="hover:bg-gray-800/50"><td class="px-5 py-3 text-blue-400">Expansion MRR</td><td class="px-5 py-3 text-right">€340</td><td class="px-5 py-3 text-right">€510</td><td class="px-5 py-3 text-right">€620</td><td class="px-5 py-3 text-right font-bold text-blue-400">€1,470</td></tr>
          <tr class="hover:bg-gray-800/50"><td class="px-5 py-3 text-red-400">Churned MRR</td><td class="px-5 py-3 text-right">-€280</td><td class="px-5 py-3 text-right">-€310</td><td class="px-5 py-3 text-right">-€240</td><td class="px-5 py-3 text-right font-bold text-red-400">-€830</td></tr>
          <tr class="bg-gray-800/30 font-bold"><td class="px-5 py-3 text-white">Net New MRR</td><td class="px-5 py-3 text-right">€1,880</td><td class="px-5 py-3 text-right">€2,300</td><td class="px-5 py-3 text-right">€2,830</td><td class="px-5 py-3 text-right text-green-400">€7,010</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`,
  },

  // ── Framer/Webflow-Style Templates ────────────────────────────────────────
  {
    id: "saas-landing-dark",
    name: "SaaS Dark Landing Page",
    description:
      "High-converting Framer-style dark SaaS landing page with animated gradients and social proof.",
    category: "ui",
    price: 1299,
    stripePriceId: "price_1TBz4hBoWNgrJbiyldGkbh0n",
    tags: ["saas", "landing", "dark", "framer", "conversion"],
    downloads: 728,
    editorsPick: true,
    content: `<div class="min-h-screen bg-black text-white overflow-hidden font-sans">
  <!-- Gradient Orbs -->
  <div class="fixed inset-0 pointer-events-none">
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
    <div class="absolute top-20 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
  </div>
  <!-- Nav -->
  <nav class="relative z-10 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
    <div class="flex items-center gap-2 font-bold text-lg">⚡ NovaSaaS</div>
    <div class="hidden md:flex gap-6 text-sm text-gray-400">
      <a class="hover:text-white transition">Features</a>
      <a class="hover:text-white transition">Pricing</a>
      <a class="hover:text-white transition">Docs</a>
      <a class="hover:text-white transition">Blog</a>
    </div>
    <div class="flex gap-3">
      <button class="text-sm text-gray-300 hover:text-white transition px-4 py-2">Log in</button>
      <button class="text-sm bg-white text-black font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition">Get started free</button>
    </div>
  </nav>
  <!-- Hero -->
  <div class="relative z-10 text-center pt-16 pb-20 px-6 max-w-4xl mx-auto">
    <div class="inline-flex items-center gap-2 border border-white/10 bg-white/5 text-gray-300 px-4 py-2 rounded-full text-sm mb-8 backdrop-blur-sm">
      <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Now with AI autopilot
    </div>
    <h1 class="text-5xl md:text-7xl font-black leading-tight mb-6">
      The fastest way to<br/>
      <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">build & ship</span>
    </h1>
    <p class="text-gray-400 text-xl max-w-2xl mx-auto mb-10">Stop wrestling with infrastructure. NovaSaaS handles auth, payments, AI, and deploy in one unified platform.</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button class="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition text-lg">Start building free →</button>
      <button class="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition backdrop-blur-sm">Watch 2-min demo</button>
    </div>
    <div class="mt-12 flex items-center justify-center gap-6 text-sm text-gray-500">
      <span>✓ No credit card</span>
      <span>✓ Deploy in 60s</span>
      <span>✓ 10,000 users free</span>
    </div>
  </div>
  <!-- Feature Pills -->
  <div class="relative z-10 flex flex-wrap justify-center gap-3 px-6 pb-16 max-w-3xl mx-auto">
    <div class="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-300 backdrop-blur-sm">🔐 Auth in 5 mins</div>
    <div class="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-300 backdrop-blur-sm">💳 Stripe built-in</div>
    <div class="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-300 backdrop-blur-sm">🤖 AI components</div>
    <div class="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-300 backdrop-blur-sm">🚀 Edge deploy</div>
    <div class="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-300 backdrop-blur-sm">📊 Analytics</div>
  </div>
</div>`,
  },
  {
    id: "creative-agency-portfolio",
    name: "Creative Agency Portfolio",
    description:
      "Bold Framer-style agency portfolio with case studies grid and bold typography.",
    category: "ui",
    price: 1099,
    stripePriceId: "price_1TBz4iBoWNgrJbiyKCR10XRH",
    tags: ["agency", "portfolio", "creative", "framer", "webflow"],
    downloads: 456,
    content: `<div class="min-h-screen bg-zinc-950 text-white font-sans">
  <!-- Nav -->
  <nav class="flex items-center justify-between px-8 py-6 border-b border-zinc-800">
    <div class="font-black text-2xl tracking-tight">FORMA<span class="text-[#0A84FF]">.</span></div>
    <div class="hidden md:flex gap-8 text-sm text-zinc-400">
      <a class="hover:text-white transition">Work</a>
      <a class="hover:text-white transition">About</a>
      <a class="hover:text-white transition">Services</a>
      <a class="hover:text-white transition">Contact</a>
    </div>
    <button class="border border-yellow-400 text-[#0A84FF] px-5 py-2 text-sm font-bold hover:bg-yellow-400 hover:text-black transition rounded">Start a project</button>
  </nav>
  <!-- Hero -->
  <div class="px-8 pt-20 pb-12 max-w-6xl mx-auto">
    <div class="text-xs tracking-widest text-zinc-500 mb-6 uppercase">Design & Brand Studio · Milano, IT</div>
    <h1 class="text-7xl md:text-8xl font-black leading-none mb-6 tracking-tighter">
      We craft<br/>
      <span class="text-[#0A84FF]">bold</span> brands<br/>
      <span class="text-zinc-600">that last.</span>
    </h1>
    <div class="flex items-center gap-8 mt-10">
      <p class="text-zinc-400 max-w-xs leading-relaxed">Strategic design for forward-thinking companies. From identity to digital, we build experiences that convert.</p>
      <div class="flex gap-8 text-center ml-auto">
        <div><div class="text-3xl font-black text-[#0A84FF]">120+</div><div class="text-zinc-500 text-xs mt-1">Projects</div></div>
        <div><div class="text-3xl font-black text-[#0A84FF]">8yr</div><div class="text-zinc-500 text-xs mt-1">Experience</div></div>
        <div><div class="text-3xl font-black text-[#0A84FF]">4.9★</div><div class="text-zinc-500 text-xs mt-1">Clutch</div></div>
      </div>
    </div>
  </div>
  <!-- Portfolio Grid -->
  <div class="px-8 pb-20 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
    <div class="group relative col-span-2 bg-gradient-to-br from-yellow-400 to-blue-500 rounded-2xl h-64 overflow-hidden cursor-pointer">
      <div class="absolute inset-0 flex items-center justify-center text-7xl opacity-30">🎨</div>
      <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60"><div class="font-bold text-lg">Nuvola — Brand Identity</div><div class="text-white/60 text-sm">Branding · Strategy</div></div>
    </div>
    <div class="group relative bg-gradient-to-br from-violet-500 to-purple-700 rounded-2xl h-64 overflow-hidden cursor-pointer">
      <div class="absolute inset-0 flex items-center justify-center text-7xl opacity-30">📱</div>
      <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60"><div class="font-bold">Finora App</div><div class="text-white/60 text-sm">UX/UI</div></div>
    </div>
    <div class="group relative bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl h-48 overflow-hidden cursor-pointer">
      <div class="absolute inset-0 flex items-center justify-center text-5xl opacity-30">🛍️</div>
      <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60"><div class="font-bold text-sm">Moda Store</div><div class="text-white/60 text-xs">E-commerce</div></div>
    </div>
    <div class="group relative bg-gradient-to-br from-rose-400 to-pink-600 rounded-2xl h-48 overflow-hidden cursor-pointer">
      <div class="absolute inset-0 flex items-center justify-center text-5xl opacity-30">🏢</div>
      <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60"><div class="font-bold text-sm">Corp Rebrand</div><div class="text-white/60 text-xs">Identity</div></div>
    </div>
    <div class="group relative bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl h-48 overflow-hidden cursor-pointer">
      <div class="absolute inset-0 flex items-center justify-center text-5xl opacity-30">🚀</div>
      <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60"><div class="font-bold text-sm">Launchpad</div><div class="text-white/60 text-xs">Web · Brand</div></div>
    </div>
  </div>
</div>`,
  },
  {
    id: "freelance-tech-profile",
    name: "Freelance Tech Profile",
    description:
      "Minimal Webflow-style profile for freelance developers and designers with skills and work.",
    category: "ui",
    price: 899,
    stripePriceId: "price_1TBz4iBoWNgrJbiyzETQok5Q",
    tags: ["freelance", "developer", "portfolio", "webflow", "tech"],
    downloads: 389,
    content: `<div class="min-h-screen bg-gray-950 text-white font-sans">
  <div class="max-w-3xl mx-auto px-6 py-16">
    <!-- Profile -->
    <div class="flex items-start gap-6 mb-12">
      <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-3xl flex-shrink-0">👨‍💻</div>
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-1">
          <h1 class="text-2xl font-bold">Luca Bianchi</h1>
          <span class="flex items-center gap-1.5 text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full"><span class="w-1.5 h-1.5 rounded-full bg-green-400"></span>Available for work</span>
        </div>
        <p class="text-gray-400 mb-3">Full-stack Engineer · Next.js · TypeScript · AI integrations</p>
        <div class="flex gap-3 flex-wrap">
          <a class="text-xs border border-gray-700 text-gray-400 px-3 py-1 rounded-full hover:border-gray-500 hover:text-white transition">GitHub</a>
          <a class="text-xs border border-gray-700 text-gray-400 px-3 py-1 rounded-full hover:border-gray-500 hover:text-white transition">LinkedIn</a>
          <a class="text-xs bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-500 transition font-medium">Hire me →</a>
        </div>
      </div>
    </div>
    <!-- Skills -->
    <div class="mb-10">
      <h2 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Stack</h2>
      <div class="flex flex-wrap gap-2">
        <span class="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-lg text-sm">Next.js</span>
        <span class="bg-violet-500/10 text-violet-400 border border-violet-500/20 px-3 py-1 rounded-lg text-sm">TypeScript</span>
        <span class="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-lg text-sm">Node.js</span>
        <span class="bg-blue-500/10 text-orange-400 border border-blue-500/20 px-3 py-1 rounded-lg text-sm">Supabase</span>
        <span class="bg-pink-500/10 text-pink-400 border border-pink-500/20 px-3 py-1 rounded-lg text-sm">Tailwind</span>
        <span class="bg-yellow-500/10 text-[#0A84FF] border border-yellow-500/20 px-3 py-1 rounded-lg text-sm">AI/LLMs</span>
        <span class="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-lg text-sm">Docker</span>
        <span class="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-lg text-sm">AWS</span>
      </div>
    </div>
    <!-- Work -->
    <div>
      <h2 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Selected work</h2>
      <div class="space-y-3">
        <div class="group flex items-center gap-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-xl p-4 cursor-pointer transition">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-lg flex-shrink-0">🤖</div>
          <div class="flex-1"><div class="font-semibold text-sm">AI Content Platform</div><div class="text-gray-500 text-xs mt-0.5">Next.js · Anthropic API · Stripe · 5k MAU</div></div>
          <span class="text-gray-600 group-hover:text-white transition text-sm">→</span>
        </div>
        <div class="group flex items-center gap-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-xl p-4 cursor-pointer transition">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-lg flex-shrink-0">📊</div>
          <div class="flex-1"><div class="font-semibold text-sm">SaaS Analytics Dashboard</div><div class="text-gray-500 text-xs mt-0.5">React · Supabase · Recharts · B2B</div></div>
          <span class="text-gray-600 group-hover:text-white transition text-sm">→</span>
        </div>
        <div class="group flex items-center gap-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-xl p-4 cursor-pointer transition">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-red-500 flex items-center justify-center text-lg flex-shrink-0">🛒</div>
          <div class="flex-1"><div class="font-semibold text-sm">E-commerce Engine</div><div class="text-gray-500 text-xs mt-0.5">Next.js · Shopify API · TypeScript</div></div>
          <span class="text-gray-600 group-hover:text-white transition text-sm">→</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    id: "startup-product-launch",
    name: "Startup Product Launch",
    description:
      "Conversion-optimized Framer/Webflow-style product launch page with waitlist and features.",
    category: "ui",
    price: 1299,
    stripePriceId: "price_1TBz4jBoWNgrJbiy6sGjzcNh",
    tags: ["startup", "launch", "waitlist", "framer", "product"],
    downloads: 615,
    content: `<div class="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white font-sans overflow-hidden">
  <!-- Ambient Glow -->
  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
  <!-- Nav -->
  <nav class="relative z-10 flex items-center justify-between px-8 py-5 max-w-5xl mx-auto">
    <div class="flex items-center gap-2.5"><div class="w-7 h-7 bg-indigo-500 rounded-lg"></div><span class="font-bold text-lg">Orbit</span></div>
    <button class="text-sm bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 rounded-lg font-medium">Join waitlist →</button>
  </nav>
  <!-- Hero -->
  <div class="relative z-10 text-center pt-20 pb-16 px-6 max-w-4xl mx-auto">
    <div class="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-medium mb-8">
      🚀 Launching Q2 2025 — 2,400 on waitlist
    </div>
    <h1 class="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
      Your entire workflow,<br/>
      <span class="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">one place.</span>
    </h1>
    <p class="text-slate-400 text-xl max-w-xl mx-auto mb-10 leading-relaxed">Orbit connects your tools, automates your busywork, and gives your team back 10 hours per week.</p>
    <!-- Waitlist Form -->
    <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input type="email" placeholder="Enter your email" class="flex-1 bg-white/5 border border-white/10 text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"/>
      <button class="bg-indigo-600 hover:bg-indigo-500 transition text-white font-bold px-6 py-3 rounded-xl text-sm whitespace-nowrap">Get early access</button>
    </div>
    <p class="text-slate-600 text-xs mt-3">Join 2,400+ early adopters · First month free for waitlist</p>
  </div>
  <!-- Feature Grid -->
  <div class="relative z-10 max-w-5xl mx-auto px-8 pb-20 grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-indigo-500/30 transition">
      <div class="text-3xl mb-3">⚡</div>
      <h3 class="font-bold text-white mb-2">Instant automation</h3>
      <p class="text-slate-500 text-sm leading-relaxed">Connect any tool and automate repetitive tasks with no-code workflows in minutes.</p>
    </div>
    <div class="bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-indigo-500/30 transition">
      <div class="text-3xl mb-3">🤝</div>
      <h3 class="font-bold text-white mb-2">Team sync</h3>
      <p class="text-slate-500 text-sm leading-relaxed">Real-time collaboration with shared workspaces, comments, and role-based access.</p>
    </div>
    <div class="bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-indigo-500/30 transition">
      <div class="text-3xl mb-3">📊</div>
      <h3 class="font-bold text-white mb-2">Smart analytics</h3>
      <p class="text-slate-500 text-sm leading-relaxed">See exactly where time is lost and get AI-powered suggestions to fix it.</p>
    </div>
  </div>
</div>`,
  },

  // ── Prompt Templates ──────────────────────────────────────────────────────
  {
    id: "cold-email-b2b",
    name: "B2B Cold Email Outreach",
    description:
      "High-converting cold email prompt with personalization variables for any prospect.",
    category: "prompt",
    price: 699,
    stripePriceId: "price_1TBixFBoWNgrJbiyzxGXK1Jo",
    tags: ["cold email", "b2b", "sales", "outreach"],
    downloads: 2341,
    editorsPick: true,
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
    price: 699,
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
    price: 799,
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

  // ── Ristorazione & Hospitality ────────────────────────────────────────────
  {
    id: "restaurant-menu",
    name: "Restaurant Menu Dark",
    description:
      "Luxury dark-themed restaurant menu with dish cards, chef's specials, and reservation CTA.",
    category: "ui",
    price: 799,
    stripePriceId: "price_1TBz23BoWNgrJbiyyFk0vJBh",
    tags: ["restaurant", "menu", "food", "dark", "luxury"],
    downloads: 344,
    content: `<div class="min-h-screen bg-[#0d0d0d] text-white font-sans">
  <style>@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');</style>
  <!-- Header -->
  <div class="relative overflow-hidden bg-gradient-to-b from-[#1a1008] to-[#0d0d0d] px-8 py-14 text-center border-b border-amber-900/30">
    <div class="absolute inset-0 opacity-5" style="background-image:radial-gradient(circle,#d97706 1px,transparent 1px);background-size:24px 24px"></div>
    <p class="text-amber-400 text-xs tracking-[0.3em] uppercase mb-3">Ristorante</p>
    <h1 class="text-5xl font-bold text-amber-100 mb-2" style="font-family:'Playfair Display',serif">Oro & Fuoco</h1>
    <p class="text-amber-600 text-sm tracking-widest">Milano · Dal 1987</p>
    <div class="flex justify-center gap-6 mt-6 text-xs text-amber-700">
      <span>Lun–Sab 19:00–23:30</span><span class="text-amber-800">·</span><span>+39 02 1234567</span>
    </div>
  </div>
  <!-- Chef's Special -->
  <div class="max-w-4xl mx-auto px-6 py-10">
    <div class="flex items-center gap-4 mb-6"><div class="flex-1 h-px bg-amber-900/40"></div><p class="text-amber-500 text-xs tracking-[0.25em] uppercase">Chef's Selection</p><div class="flex-1 h-px bg-amber-900/40"></div></div>
    <div class="bg-gradient-to-r from-amber-950/60 to-[#0d0d0d] border border-amber-800/40 rounded-2xl p-6 mb-10 relative overflow-hidden">
      <div class="absolute top-0 right-0 bg-amber-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl tracking-widest">SPECIALE</div>
      <div class="flex items-start gap-5">
        <div class="w-16 h-16 rounded-xl bg-amber-900/30 flex items-center justify-center text-3xl shrink-0">🥩</div>
        <div class="flex-1">
          <h3 class="text-lg font-bold text-amber-100 mb-1">Filetto al Tartufo Nero</h3>
          <p class="text-amber-700 text-sm leading-relaxed">Controfiletto di Fassona piemontese, riduzione di Barolo, lamelle di tartufo nero d'Acqualagna, purè al burro di Normandia.</p>
          <div class="flex items-center justify-between mt-3">
            <div class="flex gap-2"><span class="text-[10px] bg-amber-900/50 text-amber-400 px-2 py-0.5 rounded-full">Senza glutine</span><span class="text-[10px] bg-amber-900/50 text-amber-400 px-2 py-0.5 rounded-full">Signature</span></div>
            <span class="text-amber-400 font-bold text-lg">€42</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Menu Sections -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Antipasti -->
      <div>
        <div class="flex items-center gap-3 mb-4"><div class="w-7 h-7 rounded-lg bg-amber-900/40 flex items-center justify-center text-sm">🌿</div><h2 class="text-sm font-bold text-amber-400 uppercase tracking-widest">Antipasti</h2></div>
        <div class="space-y-4">
          <div class="flex justify-between items-start border-b border-white/5 pb-3"><div><p class="text-white font-medium text-sm">Carpaccio di Manzo</p><p class="text-white/40 text-xs mt-0.5">Rucola, grana, capperi, limone</p></div><span class="text-amber-400 font-bold text-sm ml-4">€18</span></div>
          <div class="flex justify-between items-start border-b border-white/5 pb-3"><div><p class="text-white font-medium text-sm">Burrata Pugliese</p><p class="text-white/40 text-xs mt-0.5">Pomodorini confit, basilico fresco</p></div><span class="text-amber-400 font-bold text-sm ml-4">€16</span></div>
          <div class="flex justify-between items-start"><div><p class="text-white font-medium text-sm">Frittura di Gamberi</p><p class="text-white/40 text-xs mt-0.5">Gamberi rossi, salsa tartara</p></div><span class="text-amber-400 font-bold text-sm ml-4">€22</span></div>
        </div>
      </div>
      <!-- Primi -->
      <div>
        <div class="flex items-center gap-3 mb-4"><div class="w-7 h-7 rounded-lg bg-amber-900/40 flex items-center justify-center text-sm">🍝</div><h2 class="text-sm font-bold text-amber-400 uppercase tracking-widest">Primi Piatti</h2></div>
        <div class="space-y-4">
          <div class="flex justify-between items-start border-b border-white/5 pb-3"><div><p class="text-white font-medium text-sm">Tagliolini al Caviale</p><p class="text-white/40 text-xs mt-0.5">Pasta fresca, burro, caviale Beluga</p></div><span class="text-amber-400 font-bold text-sm ml-4">€38</span></div>
          <div class="flex justify-between items-start border-b border-white/5 pb-3"><div><p class="text-white font-medium text-sm">Risotto Mantecato</p><p class="text-white/40 text-xs mt-0.5">Carnaroli, zafferano DOP, osso buco</p></div><span class="text-amber-400 font-bold text-sm ml-4">€28</span></div>
          <div class="flex justify-between items-start"><div><p class="text-white font-medium text-sm">Paccheri all'Astice</p><p class="text-white/40 text-xs mt-0.5">Astice bretone, pomodorini, bisque</p></div><span class="text-amber-400 font-bold text-sm ml-4">€34</span></div>
        </div>
      </div>
    </div>
    <!-- Reserve CTA -->
    <div class="mt-10 bg-gradient-to-r from-amber-950/80 to-amber-900/20 border border-amber-800/40 rounded-2xl p-6 text-center">
      <p class="text-amber-200 font-bold text-lg mb-1">Prenota il tuo tavolo</p>
      <p class="text-amber-700 text-sm mb-4">Disponibilità limitata · Dress code richiesto</p>
      <button class="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-xl text-sm transition">Prenota ora →</button>
    </div>
  </div>
</div>`,
  },
  {
    id: "coffee-shop-landing",
    name: "Coffee Shop Landing Page",
    description:
      "Warm, cozy landing page for coffee shops and cafés with menu highlights and loyalty program.",
    category: "ui",
    price: 699,
    stripePriceId: "price_1TBz23BoWNgrJbiyqDLxdo1I",
    tags: ["coffee", "café", "food", "warm", "landing"],
    downloads: 291,
    isNew: true,
    content: `<div class="min-h-screen font-sans" style="background:#fdf6ed">
  <!-- Nav -->
  <nav class="flex items-center justify-between px-8 py-4 border-b border-[#e8d5b0]">
    <div class="flex items-center gap-2"><span class="text-2xl">☕</span><span class="font-bold text-[#3d1f0a] text-lg">Brewed & Co.</span></div>
    <div class="hidden md:flex gap-6 text-sm text-[#7a4f2e]"><a class="hover:text-[#3d1f0a]">Menu</a><a class="hover:text-[#3d1f0a]">About</a><a class="hover:text-[#3d1f0a]">Find Us</a></div>
    <button class="bg-[#3d1f0a] text-[#fdf6ed] px-4 py-2 rounded-xl text-sm font-semibold">Order Online</button>
  </nav>
  <!-- Hero -->
  <div class="max-w-5xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <div>
      <span class="inline-block bg-[#3d1f0a]/10 text-[#3d1f0a] text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">Specialty Coffee · Milano</span>
      <h1 class="text-4xl md:text-5xl font-black text-[#2a1205] leading-tight mb-4">Every cup<br/>tells a<br/><span style="color:#c2692a">story.</span></h1>
      <p class="text-[#7a4f2e] mb-6 leading-relaxed">Single-origin beans, slow-roasted in our micro-roastery. Drop by, slow down, and taste the difference.</p>
      <div class="flex gap-3"><button class="bg-[#c2692a] hover:bg-[#a8551f] text-white font-bold px-6 py-3 rounded-xl transition">View Menu →</button><button class="border border-[#c2692a] text-[#c2692a] font-bold px-6 py-3 rounded-xl hover:bg-[#c2692a]/5 transition">Our Story</button></div>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div class="rounded-2xl overflow-hidden h-44 bg-gradient-to-br from-[#c2692a] to-[#7a2d0a] flex items-center justify-center text-6xl">☕</div>
      <div class="rounded-2xl overflow-hidden h-44 bg-gradient-to-br from-[#f5e6c8] to-[#e8c98a] flex items-center justify-center text-6xl">🥐</div>
      <div class="rounded-2xl overflow-hidden h-44 bg-gradient-to-br from-[#e8c98a] to-[#d4a44c] flex items-center justify-center text-6xl">🍰</div>
      <div class="rounded-2xl overflow-hidden h-44 bg-gradient-to-br from-[#3d1f0a] to-[#6b3518] flex items-center justify-center text-6xl">🫘</div>
    </div>
  </div>
  <!-- Menu Highlights -->
  <div class="bg-[#3d1f0a] py-12 px-6">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-[#fdf6ed] text-center font-bold text-2xl mb-2">Today's Menu</h2>
      <p class="text-[#c2692a] text-center text-sm mb-8">Fresh every morning · House-made pastries</p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-[#fdf6ed]/5 rounded-2xl p-4 text-center border border-[#fdf6ed]/10"><div class="text-3xl mb-2">☕</div><p class="text-[#fdf6ed] font-semibold text-sm">Flat White</p><p class="text-[#c2692a] text-xs mt-1">€3.50</p></div>
        <div class="bg-[#fdf6ed]/5 rounded-2xl p-4 text-center border border-[#fdf6ed]/10"><div class="text-3xl mb-2">🧋</div><p class="text-[#fdf6ed] font-semibold text-sm">Matcha Latte</p><p class="text-[#c2692a] text-xs mt-1">€4.20</p></div>
        <div class="bg-[#fdf6ed]/5 rounded-2xl p-4 text-center border border-[#fdf6ed]/10"><div class="text-3xl mb-2">🥐</div><p class="text-[#fdf6ed] font-semibold text-sm">Croissant Beurre</p><p class="text-[#c2692a] text-xs mt-1">€2.80</p></div>
        <div class="bg-[#c2692a]/20 rounded-2xl p-4 text-center border border-[#c2692a]/40"><div class="text-3xl mb-2">🫙</div><p class="text-[#fdf6ed] font-semibold text-sm">Cold Brew</p><p class="text-[#c2692a] text-xs mt-1">€4.50</p></div>
      </div>
    </div>
  </div>
  <!-- Loyalty -->
  <div class="max-w-4xl mx-auto px-6 py-12">
    <div class="bg-gradient-to-r from-[#c2692a]/15 to-[#3d1f0a]/10 border border-[#c2692a]/20 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
      <div class="text-5xl">🎁</div>
      <div class="flex-1 text-center md:text-left"><h3 class="text-[#2a1205] font-bold text-xl mb-1">Join Brewed Rewards</h3><p class="text-[#7a4f2e] text-sm">Collect stamps, unlock free drinks. Your 10th coffee is always on us.</p></div>
      <button class="bg-[#c2692a] text-white font-bold px-6 py-3 rounded-xl whitespace-nowrap hover:bg-[#a8551f] transition">Get Card →</button>
    </div>
  </div>
</div>`,
  },
  {
    id: "hotel-booking",
    name: "Boutique Hotel Booking Card",
    description:
      "Elegant hotel booking UI with room showcase, amenities, and date selection.",
    category: "ui",
    price: 1299,
    stripePriceId: "price_1TBz24BoWNgrJbiyThvqyfL5",
    tags: ["hotel", "booking", "travel", "luxury", "hospitality"],
    downloads: 188,
    isNew: true,
    content: `<div class="min-h-screen bg-[#f8f6f2] font-sans">
  <!-- Hero Image -->
  <div class="relative h-80 bg-gradient-to-br from-slate-700 via-slate-600 to-stone-600 overflow-hidden">
    <div class="absolute inset-0 flex items-center justify-center text-[120px] opacity-20">🏨</div>
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
    <div class="absolute bottom-0 left-0 right-0 p-8">
      <span class="text-[10px] font-bold text-white/60 tracking-[0.3em] uppercase">5-Star · Firenze Centro</span>
      <h1 class="text-3xl font-bold text-white mt-1">Villa dei Medici</h1>
      <div class="flex items-center gap-2 mt-2"><span class="text-yellow-400 text-sm">★★★★★</span><span class="text-white/60 text-xs">9.4 Eccellente · 1.240 recensioni</span></div>
    </div>
    <!-- Floating badge -->
    <div class="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">Disponibile</div>
  </div>
  <!-- Main Content -->
  <div class="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
    <!-- Details -->
    <div class="md:col-span-2 space-y-6">
      <!-- Amenities -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
        <h2 class="font-bold text-stone-800 mb-4">Servizi inclusi</h2>
        <div class="grid grid-cols-3 gap-3">
          <div class="flex flex-col items-center gap-1.5 p-3 bg-stone-50 rounded-xl text-center"><span class="text-2xl">🍳</span><span class="text-xs text-stone-600 font-medium">Colazione inclusa</span></div>
          <div class="flex flex-col items-center gap-1.5 p-3 bg-stone-50 rounded-xl text-center"><span class="text-2xl">🏊</span><span class="text-xs text-stone-600 font-medium">Piscina & SPA</span></div>
          <div class="flex flex-col items-center gap-1.5 p-3 bg-stone-50 rounded-xl text-center"><span class="text-2xl">🚗</span><span class="text-xs text-stone-600 font-medium">Parcheggio</span></div>
          <div class="flex flex-col items-center gap-1.5 p-3 bg-stone-50 rounded-xl text-center"><span class="text-2xl">📶</span><span class="text-xs text-stone-600 font-medium">WiFi veloce</span></div>
          <div class="flex flex-col items-center gap-1.5 p-3 bg-stone-50 rounded-xl text-center"><span class="text-2xl">🍽️</span><span class="text-xs text-stone-600 font-medium">Ristorante</span></div>
          <div class="flex flex-col items-center gap-1.5 p-3 bg-stone-50 rounded-xl text-center"><span class="text-2xl">✈️</span><span class="text-xs text-stone-600 font-medium">Transfer</span></div>
        </div>
      </div>
      <!-- Rooms -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
        <h2 class="font-bold text-stone-800 mb-4">Scegli la camera</h2>
        <div class="space-y-3">
          <div class="border border-stone-200 rounded-xl p-4 flex items-center gap-4 hover:border-stone-400 transition cursor-pointer">
            <div class="w-16 h-14 rounded-lg bg-gradient-to-br from-stone-300 to-stone-400 flex items-center justify-center text-2xl shrink-0">🛏️</div>
            <div class="flex-1"><p class="font-semibold text-stone-800 text-sm">Superior Room</p><p class="text-stone-400 text-xs mt-0.5">25 m² · Vista cortile · King bed</p></div>
            <div class="text-right"><p class="font-bold text-stone-800">€180</p><p class="text-stone-400 text-xs">/ notte</p></div>
          </div>
          <div class="border-2 border-amber-400 rounded-xl p-4 flex items-center gap-4 bg-amber-50 cursor-pointer relative">
            <div class="absolute -top-2 right-3 bg-amber-400 text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-widest">CONSIGLIATA</div>
            <div class="w-16 h-14 rounded-lg bg-gradient-to-br from-amber-300 to-amber-400 flex items-center justify-center text-2xl shrink-0">🛏️</div>
            <div class="flex-1"><p class="font-semibold text-stone-800 text-sm">Deluxe Suite</p><p class="text-stone-400 text-xs mt-0.5">45 m² · Vista Duomo · Vasca</p></div>
            <div class="text-right"><p class="font-bold text-amber-700">€320</p><p class="text-stone-400 text-xs">/ notte</p></div>
          </div>
        </div>
      </div>
    </div>
    <!-- Booking Card -->
    <div class="bg-white rounded-2xl shadow-lg border border-stone-100 p-6 h-fit sticky top-6">
      <p class="text-stone-500 text-xs font-bold uppercase tracking-widest mb-4">Da</p>
      <div class="text-3xl font-black text-stone-800 mb-1">€180 <span class="text-base font-normal text-stone-400">/ notte</span></div>
      <div class="space-y-3 mt-4">
        <div class="border border-stone-200 rounded-xl overflow-hidden">
          <div class="grid grid-cols-2 divide-x divide-stone-200">
            <div class="p-3"><p class="text-[10px] font-bold text-stone-500 uppercase">Arrivo</p><p class="text-stone-700 text-sm mt-0.5">15 Apr</p></div>
            <div class="p-3"><p class="text-[10px] font-bold text-stone-500 uppercase">Partenza</p><p class="text-stone-700 text-sm mt-0.5">18 Apr</p></div>
          </div>
        </div>
        <div class="border border-stone-200 rounded-xl p-3"><p class="text-[10px] font-bold text-stone-500 uppercase">Ospiti</p><p class="text-stone-700 text-sm mt-0.5">2 adulti · 1 camera</p></div>
      </div>
      <div class="mt-4 space-y-2 text-sm text-stone-600 border-t border-stone-100 pt-4">
        <div class="flex justify-between"><span>€180 × 3 notti</span><span>€540</span></div>
        <div class="flex justify-between"><span>Colazione</span><span class="text-emerald-600">Inclusa</span></div>
        <div class="flex justify-between font-bold text-stone-800 pt-2 border-t border-stone-100"><span>Totale</span><span>€540</span></div>
      </div>
      <button class="mt-4 w-full bg-stone-800 hover:bg-stone-700 text-white font-bold py-3.5 rounded-xl text-sm transition">Prenota ora</button>
      <p class="text-center text-stone-400 text-xs mt-2">Cancellazione gratuita entro 48h</p>
    </div>
  </div>
</div>`,
  },

  // ── App & Prodotto Digitale ───────────────────────────────────────────────
  {
    id: "mobile-app-showcase",
    name: "Mobile App Showcase",
    description:
      "App Store-style showcase page for iOS/Android apps with screenshots, ratings, and download CTA.",
    category: "ui",
    price: 999,
    stripePriceId: "price_1TBz25BoWNgrJbiy9Lsn21ma",
    tags: ["app", "mobile", "ios", "showcase", "download"],
    downloads: 412,
    content: `<div class="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#0d0d20] to-[#060610] font-sans text-white">
  <!-- App Header -->
  <div class="max-w-3xl mx-auto px-6 pt-12 pb-8">
    <div class="flex items-start gap-5">
      <div class="w-20 h-20 rounded-[22px] bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-4xl shadow-[0_8px_32px_rgba(139,92,246,0.4)] shrink-0">🎯</div>
      <div class="flex-1">
        <h1 class="text-2xl font-bold">FocusFlow</h1>
        <p class="text-white/50 text-sm mt-0.5">Productivity & Focus Timer</p>
        <div class="flex items-center gap-3 mt-2">
          <div class="flex items-center gap-1"><span class="text-yellow-400 text-sm">★★★★★</span><span class="text-white/40 text-xs ml-1">4.9</span></div>
          <span class="text-white/20">·</span>
          <span class="text-white/40 text-xs">12.4K ratings</span>
          <span class="text-white/20">·</span>
          <span class="text-white/40 text-xs">Gratis</span>
        </div>
      </div>
      <button class="bg-[#0A84FF] hover:bg-[#409CFF] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shrink-0">Scarica</button>
    </div>
    <!-- Stats Bar -->
    <div class="grid grid-cols-3 gap-4 mt-8 border-t border-white/5 pt-8">
      <div class="text-center"><div class="text-2xl font-black text-white">#1</div><div class="text-white/40 text-xs mt-1">Produttività</div></div>
      <div class="text-center border-x border-white/5"><div class="text-2xl font-black text-white">500K+</div><div class="text-white/40 text-xs mt-1">Download</div></div>
      <div class="text-center"><div class="text-2xl font-black text-white">4.9</div><div class="text-white/40 text-xs mt-1">Valutazione</div></div>
    </div>
  </div>
  <!-- Screenshots -->
  <div class="px-6 py-4 max-w-3xl mx-auto">
    <div class="flex gap-4 overflow-x-auto pb-4" style="scrollbar-width:none">
      <div class="shrink-0 w-36 h-64 rounded-2xl bg-gradient-to-b from-violet-900/80 to-indigo-900/80 border border-white/10 overflow-hidden relative">
        <div class="absolute top-0 inset-x-0 h-1.5 bg-white/5 rounded-t-2xl"></div>
        <div class="p-4 text-center mt-4"><div class="text-4xl mb-2">⏱️</div><div class="text-xs font-bold text-white">Focus Mode</div><div class="text-[10px] text-white/40 mt-1">25:00</div><div class="mt-4 w-16 h-16 rounded-full border-4 border-violet-400 flex items-center justify-center text-violet-300 text-2xl mx-auto">▶</div></div>
      </div>
      <div class="shrink-0 w-36 h-64 rounded-2xl bg-gradient-to-b from-emerald-900/80 to-teal-900/80 border border-white/10 overflow-hidden relative">
        <div class="p-4 text-center mt-4"><div class="text-4xl mb-2">📊</div><div class="text-xs font-bold text-white">Stats</div><div class="mt-3 space-y-2"><div class="h-2 bg-emerald-500/30 rounded-full"><div class="h-full bg-emerald-400 rounded-full" style="width:78%"></div></div><div class="h-2 bg-emerald-500/30 rounded-full"><div class="h-full bg-teal-400 rounded-full" style="width:55%"></div></div><div class="h-2 bg-emerald-500/30 rounded-full"><div class="h-full bg-emerald-300 rounded-full" style="width:90%"></div></div></div></div>
      </div>
      <div class="shrink-0 w-36 h-64 rounded-2xl bg-gradient-to-b from-amber-900/80 to-orange-900/80 border border-white/10 overflow-hidden relative">
        <div class="p-4 text-center mt-4"><div class="text-4xl mb-2">🏆</div><div class="text-xs font-bold text-white">Streak</div><div class="text-[10px] text-white/40 mt-1">14 giorni 🔥</div><div class="grid grid-cols-7 gap-1 mt-3">${Array(21).fill(0).map((_, i) => `<div class="h-4 rounded-sm ${i < 14 ? 'bg-amber-400' : 'bg-amber-900/50'}"></div>`).join('')}</div></div>
      </div>
      <div class="shrink-0 w-36 h-64 rounded-2xl bg-gradient-to-b from-pink-900/80 to-rose-900/80 border border-white/10 overflow-hidden relative">
        <div class="p-4 text-center mt-4"><div class="text-4xl mb-2">🎵</div><div class="text-xs font-bold text-white">Focus Music</div><div class="mt-3 space-y-2 text-left"><div class="bg-pink-900/50 rounded-lg p-2 text-[10px] text-pink-200">Lo-fi Beats ▶</div><div class="bg-pink-900/50 rounded-lg p-2 text-[10px] text-pink-200">Nature Sounds</div><div class="bg-pink-900/50 rounded-lg p-2 text-[10px] text-pink-200">White Noise</div></div></div>
      </div>
    </div>
  </div>
  <!-- Features -->
  <div class="max-w-3xl mx-auto px-6 py-6">
    <h2 class="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Funzionalità</h2>
    <div class="grid grid-cols-1 gap-3">
      <div class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 flex items-center gap-4"><div class="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-xl shrink-0">🍅</div><div><p class="font-semibold text-sm">Tecnica Pomodoro</p><p class="text-white/40 text-xs mt-0.5">Sessioni da 25 minuti con pause guidate</p></div></div>
      <div class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 flex items-center gap-4"><div class="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-xl shrink-0">📈</div><div><p class="font-semibold text-sm">Analisi produttività</p><p class="text-white/40 text-xs mt-0.5">Grafici settimanali e trend mensili</p></div></div>
    </div>
  </div>
</div>`,
  },
  {
    id: "feature-showcase",
    name: "SaaS Features Showcase",
    description:
      "Glassmorphism feature cards page for SaaS products with icons, descriptions, and benefit highlights.",
    category: "ui",
    price: 799,
    stripePriceId: "price_1TBz25BoWNgrJbiyIiw34qio",
    tags: ["features", "saas", "glassmorphism", "cards", "product"],
    downloads: 538,
    content: `<div class="min-h-screen font-sans" style="background:linear-gradient(135deg,#0f0c29 0%,#1a1040 50%,#24243e 100%)">
  <!-- Header -->
  <div class="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
    <span class="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-purple-300/70 bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full mb-5">Tutto ciò di cui hai bisogno</span>
    <h1 class="text-4xl md:text-5xl font-black text-white leading-tight mb-4">Funzionalità <span style="background:linear-gradient(135deg,#a78bfa,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent">potenti</span></h1>
    <p class="text-white/40 text-lg max-w-xl mx-auto">Una piattaforma completa per team che vogliono muoversi velocemente senza compromessi.</p>
  </div>
  <!-- Feature Grid -->
  <div class="max-w-4xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- Big feature -->
    <div class="md:col-span-2 rounded-3xl p-6 relative overflow-hidden border border-white/[0.08]" style="background:rgba(255,255,255,0.04);backdrop-filter:blur(20px)">
      <div class="absolute inset-0 opacity-30" style="background:radial-gradient(circle at 80% 20%,rgba(139,92,246,0.3),transparent 60%)"></div>
      <div class="relative">
        <div class="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center text-2xl mb-4">⚡</div>
        <h3 class="text-white font-bold text-xl mb-2">AI Automation Engine</h3>
        <p class="text-white/50 text-sm leading-relaxed mb-4">Automatizza workflow complessi con regole intelligenti. Il nostro motore AI impara dai tuoi pattern e suggerisce ottimizzazioni in tempo reale.</p>
        <div class="flex gap-2 flex-wrap">
          <span class="text-[11px] bg-violet-500/15 text-violet-300 border border-violet-500/20 px-2.5 py-1 rounded-full">Smart Rules</span>
          <span class="text-[11px] bg-violet-500/15 text-violet-300 border border-violet-500/20 px-2.5 py-1 rounded-full">ML-powered</span>
          <span class="text-[11px] bg-violet-500/15 text-violet-300 border border-violet-500/20 px-2.5 py-1 rounded-full">No-code</span>
        </div>
      </div>
    </div>
    <!-- Small feature -->
    <div class="rounded-3xl p-6 relative overflow-hidden border border-white/[0.08]" style="background:rgba(255,255,255,0.04);backdrop-filter:blur(20px)">
      <div class="absolute inset-0 opacity-30" style="background:radial-gradient(circle at 20% 80%,rgba(96,165,250,0.3),transparent 60%)"></div>
      <div class="relative">
        <div class="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-2xl mb-4">🔒</div>
        <h3 class="text-white font-bold text-lg mb-2">Enterprise Security</h3>
        <p class="text-white/50 text-sm leading-relaxed">SOC 2 Type II, SSO, 2FA, audit log completo.</p>
        <div class="mt-4 flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div><span class="text-emerald-400 text-xs font-medium">99.99% uptime</span></div>
      </div>
    </div>
    <!-- Three equal features -->
    <div class="rounded-3xl p-6 border border-white/[0.08]" style="background:rgba(255,255,255,0.04);backdrop-filter:blur(20px)">
      <div class="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-xl mb-3">📊</div>
      <h3 class="text-white font-bold mb-1">Analytics Real-time</h3>
      <p class="text-white/40 text-xs leading-relaxed">Dashboard interattive con dati aggiornati ogni secondo.</p>
    </div>
    <div class="rounded-3xl p-6 border border-white/[0.08]" style="background:rgba(255,255,255,0.04);backdrop-filter:blur(20px)">
      <div class="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-xl mb-3">🤝</div>
      <h3 class="text-white font-bold mb-1">Team Collaboration</h3>
      <p class="text-white/40 text-xs leading-relaxed">Commenti, menzioni, permessi granulari per ogni risorsa.</p>
    </div>
    <div class="rounded-3xl p-6 border border-white/[0.08]" style="background:rgba(255,255,255,0.04);backdrop-filter:blur(20px)">
      <div class="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-xl mb-3">🔌</div>
      <h3 class="text-white font-bold mb-1">500+ Integrazioni</h3>
      <p class="text-white/40 text-xs leading-relaxed">Slack, Notion, GitHub, Jira e tutto il tuo stack.</p>
    </div>
  </div>
  <!-- CTA -->
  <div class="max-w-4xl mx-auto px-6 pb-16 text-center">
    <button class="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-400 hover:to-blue-400 text-white font-bold px-10 py-4 rounded-2xl text-[15px] transition shadow-[0_4px_24px_rgba(139,92,246,0.4)]">Inizia gratis — nessuna carta richiesta</button>
  </div>
</div>`,
  },
  {
    id: "saas-dashboard",
    name: "SaaS Dashboard Preview",
    description:
      "Dark minimal SaaS analytics dashboard with KPI cards, charts, and activity feed.",
    category: "ui",
    price: 1299,
    stripePriceId: "price_1TBz26BoWNgrJbiyAaT2x1l1",
    tags: ["dashboard", "analytics", "saas", "dark", "minimal"],
    downloads: 672,
    content: `<div class="min-h-screen bg-[#0e0e12] text-white font-sans flex">
  <!-- Sidebar -->
  <div class="hidden md:flex flex-col w-16 bg-[#16161c] border-r border-white/[0.06] items-center py-5 gap-5 shrink-0">
    <div class="w-8 h-8 rounded-lg bg-[#0A84FF] flex items-center justify-center text-sm font-black">N</div>
    <div class="flex-1 flex flex-col gap-3 mt-4">
      <div class="w-9 h-9 rounded-xl bg-[#0A84FF]/15 flex items-center justify-center text-base cursor-pointer">📊</div>
      <div class="w-9 h-9 rounded-xl hover:bg-white/5 flex items-center justify-center text-base cursor-pointer opacity-50">👤</div>
      <div class="w-9 h-9 rounded-xl hover:bg-white/5 flex items-center justify-center text-base cursor-pointer opacity-50">💬</div>
      <div class="w-9 h-9 rounded-xl hover:bg-white/5 flex items-center justify-center text-base cursor-pointer opacity-50">⚙️</div>
    </div>
  </div>
  <!-- Main -->
  <div class="flex-1 overflow-hidden">
    <!-- Top Bar -->
    <div class="h-12 border-b border-white/[0.06] flex items-center justify-between px-6">
      <div class="flex items-center gap-2"><span class="text-white/30 text-xs">Dashboard</span><span class="text-white/20 text-xs">/</span><span class="text-white text-xs font-semibold">Overview</span></div>
      <div class="flex items-center gap-3"><div class="bg-white/5 border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-white/40">Apr 2025 ▾</div><div class="w-7 h-7 rounded-full bg-[#0A84FF] flex items-center justify-center text-xs font-bold">M</div></div>
    </div>
    <!-- Content -->
    <div class="p-5 space-y-4 overflow-y-auto" style="max-height:calc(100vh - 48px)">
      <!-- KPIs -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="bg-[#16161c] border border-white/[0.06] rounded-2xl p-4"><div class="text-white/40 text-xs mb-2">MRR</div><div class="text-xl font-black">€28.4K</div><div class="text-emerald-400 text-xs mt-1">↑ +12% vs last month</div></div>
        <div class="bg-[#16161c] border border-white/[0.06] rounded-2xl p-4"><div class="text-white/40 text-xs mb-2">Active Users</div><div class="text-xl font-black">1,847</div><div class="text-emerald-400 text-xs mt-1">↑ +5.3%</div></div>
        <div class="bg-[#16161c] border border-white/[0.06] rounded-2xl p-4"><div class="text-white/40 text-xs mb-2">Churn Rate</div><div class="text-xl font-black">2.1%</div><div class="text-emerald-400 text-xs mt-1">↓ -0.4%</div></div>
        <div class="bg-[#16161c] border border-white/[0.06] rounded-2xl p-4"><div class="text-white/40 text-xs mb-2">NPS Score</div><div class="text-xl font-black">71</div><div class="text-white/30 text-xs mt-1">→ Stable</div></div>
      </div>
      <!-- Chart + Feed -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="md:col-span-2 bg-[#16161c] border border-white/[0.06] rounded-2xl p-5">
          <div class="flex items-center justify-between mb-4"><h3 class="font-semibold text-sm">Revenue Trend</h3><span class="text-white/30 text-xs">Ultimi 7 giorni</span></div>
          <!-- Fake bar chart -->
          <div class="flex items-end gap-2 h-24">
            ${[60, 75, 55, 85, 70, 90, 100].map((h, i) => `<div class="flex-1 rounded-t-md transition" style="height:${h}%;background:${i === 6 ? 'linear-gradient(to top,#0A84FF,#5E5CE6)' : 'rgba(10,132,255,0.15)'}"></div>`).join('')}
          </div>
          <div class="flex justify-between mt-2 text-white/20 text-[10px]"><span>Lun</span><span>Mar</span><span>Mer</span><span>Gio</span><span>Ven</span><span>Sab</span><span>Dom</span></div>
        </div>
        <div class="bg-[#16161c] border border-white/[0.06] rounded-2xl p-5">
          <h3 class="font-semibold text-sm mb-4">Activity</h3>
          <div class="space-y-3">
            <div class="flex items-start gap-2.5"><div class="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs shrink-0">↑</div><div class="text-xs"><p class="text-white/70">New signup</p><p class="text-white/30 text-[10px]">marco@mail.it · 2m fa</p></div></div>
            <div class="flex items-start gap-2.5"><div class="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs shrink-0">💳</div><div class="text-xs"><p class="text-white/70">Payment received</p><p class="text-white/30 text-[10px]">€299 · Pro Plan · 8m fa</p></div></div>
            <div class="flex items-start gap-2.5"><div class="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs shrink-0">⚠</div><div class="text-xs"><p class="text-white/70">Trial expiring</p><p class="text-white/30 text-[10px]">3 accounts · tomorrow</p></div></div>
            <div class="flex items-start gap-2.5"><div class="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs shrink-0">↑</div><div class="text-xs"><p class="text-white/70">Upgrade Pro→Enterprise</p><p class="text-white/30 text-[10px]">acme corp · 1h fa</p></div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },

  // ── Identità & Personal Brand ─────────────────────────────────────────────
  {
    id: "digital-resume",
    name: "Digital Resume / CV",
    description:
      "Clean minimal digital CV with skills, experience timeline, and contact card.",
    category: "ui",
    price: 699,
    stripePriceId: "price_1TBz27BoWNgrJbiy4EzhrLu3",
    tags: ["cv", "resume", "portfolio", "minimal", "personal"],
    downloads: 891,
    editorsPick: true,
    content: `<div class="min-h-screen bg-white font-sans">
  <div class="max-w-3xl mx-auto px-6 py-12">
    <!-- Header -->
    <div class="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 pb-8 border-b border-gray-100">
      <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] flex items-center justify-center text-3xl font-black text-white shrink-0">LM</div>
      <div class="flex-1">
        <h1 class="text-3xl font-black text-gray-900 tracking-tight">Luca Marchetti</h1>
        <p class="text-[#0A84FF] font-semibold mt-0.5">Senior Product Designer</p>
        <div class="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
          <span>📍 Milano, Italy</span><span>✉️ luca@marchetti.io</span><span>🌐 marchetti.io</span>
        </div>
      </div>
      <div class="flex flex-col gap-2 shrink-0">
        <button class="bg-[#0A84FF] text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-[#409CFF] transition">Download CV</button>
        <button class="border border-gray-200 text-gray-600 font-medium px-5 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition">Contattami</button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Main column -->
      <div class="md:col-span-2 space-y-8">
        <!-- About -->
        <div>
          <h2 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">About</h2>
          <p class="text-gray-600 text-sm leading-relaxed">Product Designer con 8+ anni di esperienza nel creare interfacce digitali che uniscono estetica e funzionalità. Specializzato in design systems, UX research e prototipazione ad alta fedeltà.</p>
        </div>
        <!-- Experience -->
        <div>
          <h2 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Esperienza</h2>
          <div class="space-y-5">
            <div class="flex gap-4">
              <div class="flex flex-col items-center"><div class="w-9 h-9 rounded-xl bg-[#0A84FF]/10 flex items-center justify-center text-base shrink-0">🏢</div><div class="w-px flex-1 bg-gray-100 my-2"></div></div>
              <div class="pb-2"><p class="font-bold text-gray-900 text-sm">Lead Product Designer</p><p class="text-[#0A84FF] text-xs font-medium">Factorial · 2022 – oggi</p><p class="text-gray-500 text-xs mt-1 leading-relaxed">Design system da zero, ridotto il tempo di sviluppo del 40%. Team di 4 designer.</p></div>
            </div>
            <div class="flex gap-4">
              <div class="flex flex-col items-center"><div class="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-base shrink-0">🎨</div><div class="w-px flex-1 bg-gray-100 my-2"></div></div>
              <div class="pb-2"><p class="font-bold text-gray-900 text-sm">Senior UX Designer</p><p class="text-purple-600 text-xs font-medium">Bending Spoons · 2019 – 2022</p><p class="text-gray-500 text-xs mt-1 leading-relaxed">Redesign completo di Elytra (4M utenti). App featured nell'App Store 3 volte.</p></div>
            </div>
            <div class="flex gap-4">
              <div class="flex flex-col items-center"><div class="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-base shrink-0">🚀</div></div>
              <div><p class="font-bold text-gray-900 text-sm">Product Designer</p><p class="text-emerald-600 text-xs font-medium">Satispay · 2017 – 2019</p><p class="text-gray-500 text-xs mt-1 leading-relaxed">Interfacce per il pagamento mobile. 0 → 2M utenti attivi.</p></div>
            </div>
          </div>
        </div>
      </div>
      <!-- Side column -->
      <div class="space-y-6">
        <!-- Skills -->
        <div>
          <h2 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Skills</h2>
          <div class="space-y-2">
            <div><div class="flex justify-between text-xs mb-1"><span class="text-gray-700 font-medium">Figma / Framer</span><span class="text-gray-400">Expert</span></div><div class="h-1.5 bg-gray-100 rounded-full"><div class="h-full bg-[#0A84FF] rounded-full" style="width:95%"></div></div></div>
            <div><div class="flex justify-between text-xs mb-1"><span class="text-gray-700 font-medium">Design Systems</span><span class="text-gray-400">Expert</span></div><div class="h-1.5 bg-gray-100 rounded-full"><div class="h-full bg-[#0A84FF] rounded-full" style="width:90%"></div></div></div>
            <div><div class="flex justify-between text-xs mb-1"><span class="text-gray-700 font-medium">UX Research</span><span class="text-gray-400">Advanced</span></div><div class="h-1.5 bg-gray-100 rounded-full"><div class="h-full bg-purple-500 rounded-full" style="width:80%"></div></div></div>
            <div><div class="flex justify-between text-xs mb-1"><span class="text-gray-700 font-medium">React / CSS</span><span class="text-gray-400">Intermediate</span></div><div class="h-1.5 bg-gray-100 rounded-full"><div class="h-full bg-emerald-500 rounded-full" style="width:65%"></div></div></div>
          </div>
        </div>
        <!-- Tools -->
        <div>
          <h2 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tools</h2>
          <div class="flex flex-wrap gap-2">
            <span class="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-lg">Figma</span>
            <span class="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-lg">Framer</span>
            <span class="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-lg">Notion</span>
            <span class="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-lg">Linear</span>
            <span class="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-lg">Lottie</span>
          </div>
        </div>
        <!-- Education -->
        <div>
          <h2 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Formazione</h2>
          <div class="bg-gray-50 rounded-xl p-3"><p class="font-semibold text-gray-800 text-sm">Comunicazione Visiva</p><p class="text-gray-500 text-xs mt-0.5">Politecnico di Milano · 2017</p></div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    id: "link-in-bio",
    name: "Link in Bio Page",
    description:
      "Minimal link-in-bio page for creators and influencers with social links and featured content.",
    category: "ui",
    price: 599,
    stripePriceId: "price_1TBz28BoWNgrJbiy02owOzUD",
    tags: ["link in bio", "creator", "social", "minimal", "instagram"],
    downloads: 1204,
    editorsPick: true,
    content: `<div class="min-h-screen flex items-center justify-center py-10 px-4 font-sans" style="background:linear-gradient(160deg,#1a0533 0%,#0d001a 50%,#001a33 100%)">
  <div class="w-full max-w-sm">
    <!-- Profile -->
    <div class="text-center mb-7">
      <div class="relative inline-block mb-4">
        <div class="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-amber-400 flex items-center justify-center text-4xl" style="padding:3px">
          <div class="w-full h-full rounded-full bg-[#0d001a] flex items-center justify-center text-3xl">✨</div>
        </div>
        <div class="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-400 border-2 border-[#0d001a]"></div>
      </div>
      <h1 class="text-white font-black text-xl">@giulia.creates</h1>
      <p class="text-white/50 text-sm mt-1">Designer & Content Creator</p>
      <div class="flex justify-center gap-4 mt-3 text-white/40 text-xs">
        <span>📍 Milano</span><span>·</span><span>42K followers</span>
      </div>
    </div>
    <!-- Links -->
    <div class="space-y-3">
      <a class="flex items-center gap-3 bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] rounded-2xl px-5 py-3.5 transition cursor-pointer group">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-sm shrink-0">📸</div>
        <span class="text-white font-semibold text-sm flex-1">Instagram</span>
        <span class="text-white/30 text-xs group-hover:translate-x-0.5 transition-transform">→</span>
      </a>
      <a class="flex items-center gap-3 bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] rounded-2xl px-5 py-3.5 transition cursor-pointer group">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-sm shrink-0">▶</div>
        <span class="text-white font-semibold text-sm flex-1">YouTube</span>
        <span class="text-white/30 text-xs group-hover:translate-x-0.5 transition-transform">→</span>
      </a>
      <!-- Featured -->
      <div class="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl px-5 py-4 relative overflow-hidden cursor-pointer">
        <div class="absolute top-2 right-3 text-[10px] font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full tracking-widest">NUOVO</div>
        <div class="flex items-center gap-3"><div class="w-8 h-8 rounded-xl bg-purple-500/30 flex items-center justify-center text-sm shrink-0">🎨</div><div><p class="text-white font-semibold text-sm">Design Course 2025</p><p class="text-white/40 text-xs mt-0.5">Figma · UI · Brand Identity</p></div></div>
      </div>
      <a class="flex items-center gap-3 bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] rounded-2xl px-5 py-3.5 transition cursor-pointer group">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm shrink-0">💼</div>
        <span class="text-white font-semibold text-sm flex-1">Portfolio & Lavora con me</span>
        <span class="text-white/30 text-xs group-hover:translate-x-0.5 transition-transform">→</span>
      </a>
      <a class="flex items-center gap-3 bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] rounded-2xl px-5 py-3.5 transition cursor-pointer group">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-sm shrink-0">📬</div>
        <span class="text-white font-semibold text-sm flex-1">Newsletter</span>
        <span class="text-white/30 text-xs group-hover:translate-x-0.5 transition-transform">→</span>
      </a>
    </div>
    <!-- Footer -->
    <p class="text-center text-white/20 text-xs mt-8">Made with TemplateLab ✦</p>
  </div>
</div>`,
  },
  {
    id: "newsletter-landing",
    name: "Newsletter Landing Page",
    description:
      "High-converting newsletter signup page with social proof, benefits, and email form.",
    category: "ui",
    price: 799,
    stripePriceId: "price_1TBz28BoWNgrJbiykMdFUZHe",
    tags: ["newsletter", "email", "landing", "signup", "conversion"],
    downloads: 763,
    content: `<div class="min-h-screen flex items-center justify-center bg-[#f5f0ff] px-4 font-sans py-16">
  <div class="w-full max-w-2xl">
    <!-- Social Proof Bar -->
    <div class="flex justify-center mb-8">
      <div class="flex items-center gap-2 bg-white border border-purple-100 shadow-sm rounded-full px-4 py-2">
        <div class="flex -space-x-1">${['bg-pink-400','bg-violet-400','bg-blue-400','bg-emerald-400'].map(c=>`<div class="w-6 h-6 rounded-full ${c} border-2 border-white"></div>`).join('')}</div>
        <span class="text-sm text-gray-600 font-medium">Uniti a <strong class="text-gray-900">14.200</strong> lettori</span>
      </div>
    </div>
    <!-- Main Card -->
    <div class="bg-white rounded-[32px] shadow-[0_8px_64px_rgba(139,92,246,0.12)] border border-purple-100/50 overflow-hidden">
      <!-- Top gradient band -->
      <div class="h-2 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500"></div>
      <div class="p-8 md:p-12">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-600 text-xs font-bold px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">📬 Newsletter Settimanale</div>
        <h1 class="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">Il meglio del design<br/>nella tua inbox.<br/><span class="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">Ogni lunedì.</span></h1>
        <p class="text-gray-500 text-base leading-relaxed mb-8">Risorse, tools, case study e ispirazioni selezionate per designer e product manager. Breve, curata, senza spam.</p>
        <!-- Email Form -->
        <div class="flex flex-col sm:flex-row gap-3 mb-6">
          <input type="email" placeholder="tua@email.com" class="flex-1 border-2 border-gray-200 focus:border-violet-400 rounded-2xl px-5 py-3.5 text-sm outline-none transition bg-gray-50 placeholder-gray-400"/>
          <button class="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white font-bold px-7 py-3.5 rounded-2xl text-sm transition shadow-[0_4px_16px_rgba(139,92,246,0.3)] whitespace-nowrap">Iscriviti gratis →</button>
        </div>
        <p class="text-gray-400 text-xs text-center">Cancellazione con un click · Zero spam · Privacy garantita</p>
        <!-- Benefits -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
          <div class="flex items-start gap-3"><div class="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center text-base shrink-0">✏️</div><div><p class="font-semibold text-gray-800 text-sm">Curata a mano</p><p class="text-gray-400 text-xs mt-0.5">Solo il meglio, selezionato ogni settimana</p></div></div>
          <div class="flex items-start gap-3"><div class="w-8 h-8 rounded-xl bg-pink-50 flex items-center justify-center text-base shrink-0">⚡</div><div><p class="font-semibold text-gray-800 text-sm">5 minuti in lettura</p><p class="text-gray-400 text-xs mt-0.5">Denso, senza contenuto di riempimento</p></div></div>
          <div class="flex items-start gap-3"><div class="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-base shrink-0">🔒</div><div><p class="font-semibold text-gray-800 text-sm">Privacy first</p><p class="text-gray-400 text-xs mt-0.5">I tuoi dati non vengono mai condivisi</p></div></div>
        </div>
      </div>
    </div>
    <!-- Testimonial -->
    <div class="mt-6 bg-white rounded-2xl border border-purple-100 p-5 flex items-start gap-4 shadow-sm">
      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-lg shrink-0">👤</div>
      <div><p class="text-gray-700 text-sm italic">"La migliore newsletter di design in Italia. La aspetto ogni lunedì."</p><p class="text-gray-400 text-xs mt-1 font-medium">— Federica R., UX Lead @ Satispay</p></div>
    </div>
  </div>
</div>`,
  },

  // ── Nuovi Template HTML ────────────────────────────────────────────────────
  {
    id: "waiting-list-page",
    name: "Waitlist Coming Soon Page",
    description:
      "High-converting coming soon page with animated countdown, email capture, and social proof.",
    category: "ui",
    price: 999,
    stripePriceId: "price_PLACEHOLDER_waitinglist01",
    tags: ["waitlist", "coming soon", "launch", "email capture", "startup"],
    downloads: 124,
    isNew: true,
    content: `<div class="min-h-screen flex flex-col items-center justify-center px-4 py-16 font-sans" style="background:linear-gradient(135deg,#0a0015 0%,#120028 50%,#0a001e 100%)">
  <!-- Ambient glow -->
  <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 pointer-events-none" style="background:radial-gradient(ellipse,#7c3aed,transparent 70%)"></div>
  <div class="relative z-10 text-center max-w-2xl w-full">
    <!-- Logo -->
    <div class="flex justify-center mb-10">
      <div class="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-2.5">
        <div class="w-7 h-7 rounded-lg bg-violet-500 flex items-center justify-center text-sm font-black text-white">V</div>
        <span class="text-white font-bold text-lg tracking-tight">Vault</span>
      </div>
    </div>
    <!-- Badge -->
    <div class="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 tracking-wide">
      <span class="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
      Lancio previsto — Q3 2025
    </div>
    <!-- Headline -->
    <h1 class="text-4xl md:text-6xl font-black text-white leading-tight mb-5 tracking-tight">
      Qualcosa di<br/>
      <span style="background:linear-gradient(90deg,#a78bfa,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent">straordinario</span><br/>
      sta arrivando.
    </h1>
    <p class="text-white/50 text-lg max-w-md mx-auto mb-10 leading-relaxed">
      Il tuo nuovo strumento per gestire, condividere e monetizzare i tuoi asset digitali in un click.
    </p>
    <!-- Countdown -->
    <div class="flex justify-center gap-4 mb-10">
      <div class="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 min-w-[72px] text-center">
        <div class="text-3xl font-black text-white">47</div>
        <div class="text-white/30 text-xs mt-1 uppercase tracking-widest">Giorni</div>
      </div>
      <div class="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 min-w-[72px] text-center">
        <div class="text-3xl font-black text-white">12</div>
        <div class="text-white/30 text-xs mt-1 uppercase tracking-widest">Ore</div>
      </div>
      <div class="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 min-w-[72px] text-center">
        <div class="text-3xl font-black text-white">34</div>
        <div class="text-white/30 text-xs mt-1 uppercase tracking-widest">Min</div>
      </div>
      <div class="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 min-w-[72px] text-center">
        <div class="text-3xl font-black text-white">08</div>
        <div class="text-white/30 text-xs mt-1 uppercase tracking-widest">Sec</div>
      </div>
    </div>
    <!-- Email Form -->
    <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
      <input type="email" placeholder="La tua email" class="flex-1 bg-white/5 border border-white/10 focus:border-violet-500 text-white placeholder-white/30 px-5 py-3.5 rounded-2xl outline-none text-sm transition"/>
      <button class="bg-violet-600 hover:bg-violet-500 transition text-white font-bold px-6 py-3.5 rounded-2xl text-sm whitespace-nowrap shadow-[0_4px_20px_rgba(124,58,237,0.4)]">Unisciti alla lista →</button>
    </div>
    <!-- Social proof -->
    <div class="flex items-center justify-center gap-3 mb-10">
      <div class="flex -space-x-2">
        <div class="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 border-2 border-[#0a0015]"></div>
        <div class="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 border-2 border-[#0a0015]"></div>
        <div class="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-[#0a0015]"></div>
        <div class="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-[#0a0015]"></div>
      </div>
      <span class="text-white/40 text-sm"><strong class="text-white/70">1.847</strong> persone già in lista</span>
    </div>
    <!-- Features teaser -->
    <div class="grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
      <div class="text-center"><div class="text-2xl mb-2">⚡</div><p class="text-white/50 text-xs leading-relaxed">Setup in 60 secondi</p></div>
      <div class="text-center"><div class="text-2xl mb-2">🔒</div><p class="text-white/50 text-xs leading-relaxed">Privacy by design</p></div>
      <div class="text-center"><div class="text-2xl mb-2">🚀</div><p class="text-white/50 text-xs leading-relaxed">Early access gratuito</p></div>
    </div>
  </div>
</div>`,
  },
  {
    id: "saas-pricing-full",
    name: "SaaS Full Pricing Page",
    description:
      "Complete pricing page with monthly/annual toggle, 3-tier comparison, feature matrix, and FAQ.",
    category: "ui",
    price: 1499,
    stripePriceId: "price_PLACEHOLDER_saaspricingfull",
    tags: ["pricing", "saas", "comparison", "plans", "conversion"],
    downloads: 87,
    isNew: true,
    content: `<div class="min-h-screen bg-gray-950 text-white font-sans">
  <div class="max-w-5xl mx-auto px-6 py-16">
    <!-- Header -->
    <div class="text-center mb-12">
      <span class="inline-block text-xs font-bold tracking-widest uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-5">Prezzi trasparenti</span>
      <h1 class="text-4xl md:text-5xl font-black mb-4 leading-tight">Scegli il piano<br/><span style="background:linear-gradient(90deg,#60a5fa,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent">giusto per te</span></h1>
      <p class="text-white/50 text-lg max-w-md mx-auto">Parti gratis, scala quando sei pronto. Nessuna sorpresa in fattura.</p>
      <!-- Toggle -->
      <div class="inline-flex items-center gap-3 mt-8 bg-white/5 border border-white/10 rounded-2xl p-1.5">
        <button class="px-5 py-2 rounded-xl bg-white text-gray-900 font-bold text-sm">Mensile</button>
        <button class="px-5 py-2 rounded-xl text-white/60 font-medium text-sm flex items-center gap-2">Annuale <span class="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">–20%</span></button>
      </div>
    </div>
    <!-- Plans -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      <!-- Starter -->
      <div class="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-7">
        <div class="text-white/60 font-semibold text-sm mb-1">Starter</div>
        <div class="text-4xl font-black mb-1">Gratis</div>
        <p class="text-white/40 text-xs mb-6">Per sempre. Nessuna carta.</p>
        <button class="w-full border border-white/20 text-white font-bold py-3 rounded-xl hover:bg-white/5 transition text-sm mb-7">Inizia gratis</button>
        <ul class="space-y-3 text-sm text-white/70">
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> 3 progetti</li>
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> 100 operazioni/mese</li>
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> 1 GB storage</li>
          <li class="flex items-center gap-2"><span class="text-white/20">✗</span> <span class="text-white/30">API access</span></li>
          <li class="flex items-center gap-2"><span class="text-white/20">✗</span> <span class="text-white/30">Priority support</span></li>
        </ul>
      </div>
      <!-- Pro (highlighted) -->
      <div class="relative bg-gradient-to-b from-blue-600/20 to-violet-600/10 border-2 border-blue-500/50 rounded-3xl p-7 shadow-[0_0_60px_rgba(59,130,246,0.15)]">
        <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-violet-500 text-white text-[11px] font-black px-4 py-1 rounded-full tracking-wider">POPOLARE</div>
        <div class="text-blue-300 font-semibold text-sm mb-1">Pro</div>
        <div class="text-4xl font-black mb-0.5">€29<span class="text-lg font-normal text-white/40">/mo</span></div>
        <p class="text-white/40 text-xs mb-6">Fatturato mensilmente</p>
        <button class="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold py-3 rounded-xl transition text-sm mb-7 shadow-[0_4px_16px_rgba(59,130,246,0.3)]">Inizia la prova</button>
        <ul class="space-y-3 text-sm text-white/70">
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Progetti illimitati</li>
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> 10.000 operazioni/mese</li>
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> 50 GB storage</li>
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> API access</li>
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Priority support</li>
        </ul>
      </div>
      <!-- Enterprise -->
      <div class="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-7">
        <div class="text-violet-300 font-semibold text-sm mb-1">Enterprise</div>
        <div class="text-4xl font-black mb-1">Su misura</div>
        <p class="text-white/40 text-xs mb-6">Contattaci per un preventivo</p>
        <button class="w-full border border-violet-500/40 bg-violet-500/10 text-violet-300 font-bold py-3 rounded-xl hover:bg-violet-500/20 transition text-sm mb-7">Contatta le vendite</button>
        <ul class="space-y-3 text-sm text-white/70">
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Volume illimitato</li>
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Storage illimitato</li>
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> SLA 99.99%</li>
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> SSO / SAML</li>
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Dedicated support</li>
        </ul>
      </div>
    </div>
    <!-- FAQ -->
    <div class="border-t border-white/[0.08] pt-12">
      <h2 class="text-2xl font-black text-center mb-8">Domande frequenti</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5"><p class="font-semibold text-sm mb-2">Posso cambiare piano?</p><p class="text-white/40 text-xs leading-relaxed">Sì, puoi passare a un piano superiore o inferiore in qualsiasi momento. Il credito non utilizzato viene scalato automaticamente.</p></div>
        <div class="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5"><p class="font-semibold text-sm mb-2">C'è un contratto?</p><p class="text-white/40 text-xs leading-relaxed">No. I piani mensili possono essere cancellati quando vuoi. I piani annuali durano 12 mesi e non si rinnovano automaticamente.</p></div>
        <div class="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5"><p class="font-semibold text-sm mb-2">Accettate PayPal?</p><p class="text-white/40 text-xs leading-relaxed">Accettiamo tutte le principali carte di credito/debito e PayPal. Il pagamento è gestito da Stripe con crittografia end-to-end.</p></div>
        <div class="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5"><p class="font-semibold text-sm mb-2">Esiste una garanzia?</p><p class="text-white/40 text-xs leading-relaxed">Offriamo rimborso completo entro 14 giorni dall'acquisto, senza domande.</p></div>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    id: "ecommerce-product-page",
    name: "E-commerce Product Page",
    description:
      "Conversion-optimized product detail page with gallery, variant selector, reviews, and trust badges.",
    category: "ui",
    price: 1299,
    stripePriceId: "price_PLACEHOLDER_ecommerceproduct",
    tags: ["ecommerce", "product", "shop", "cart", "conversion"],
    downloads: 63,
    isNew: true,
    content: `<div class="min-h-screen bg-white font-sans">
  <div class="max-w-5xl mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-xs text-gray-400 mb-6">
      <span class="hover:text-gray-600 cursor-pointer">Home</span>
      <span>›</span>
      <span class="hover:text-gray-600 cursor-pointer">Abbigliamento</span>
      <span>›</span>
      <span class="text-gray-700 font-medium">Premium Hoodie</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <!-- Gallery -->
      <div class="space-y-3">
        <!-- Main image -->
        <div class="aspect-square rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden border border-slate-200">
          <span class="text-[120px]">👕</span>
          <div class="absolute top-4 left-4 bg-red-500 text-white text-[11px] font-black px-3 py-1 rounded-full">–30%</div>
          <div class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-red-500 cursor-pointer transition">♡</div>
        </div>
        <!-- Thumbnails -->
        <div class="flex gap-3">
          <div class="flex-1 aspect-square rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-4xl border-2 border-blue-500 cursor-pointer">👕</div>
          <div class="flex-1 aspect-square rounded-xl bg-gradient-to-br from-slate-200 to-white flex items-center justify-center text-4xl border border-slate-200 cursor-pointer opacity-60 hover:opacity-100 transition">👕</div>
          <div class="flex-1 aspect-square rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-4xl border border-slate-200 cursor-pointer opacity-60 hover:opacity-100 transition">👕</div>
          <div class="flex-1 aspect-square rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center text-base border border-slate-200 cursor-pointer opacity-60 hover:opacity-100 transition text-gray-500">+2</div>
        </div>
      </div>
      <!-- Details -->
      <div>
        <!-- Title & Rating -->
        <div class="flex items-start justify-between mb-2">
          <div>
            <p class="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">ARKET STUDIO</p>
            <h1 class="text-2xl font-black text-gray-900 leading-tight">Premium Organic Hoodie</h1>
          </div>
        </div>
        <div class="flex items-center gap-3 mb-5">
          <div class="flex text-yellow-400 text-sm">★★★★★</div>
          <span class="text-gray-500 text-sm">4.9 · <span class="underline cursor-pointer">284 recensioni</span></span>
        </div>
        <!-- Price -->
        <div class="flex items-baseline gap-3 mb-6">
          <span class="text-3xl font-black text-gray-900">€69</span>
          <span class="text-xl text-gray-400 line-through">€99</span>
          <span class="bg-red-50 text-red-600 text-sm font-bold px-2.5 py-1 rounded-lg">Risparmi €30</span>
        </div>
        <!-- Colors -->
        <div class="mb-5">
          <p class="text-sm font-bold text-gray-700 mb-2.5">Colore: <span class="font-normal text-gray-500">Midnight Black</span></p>
          <div class="flex gap-2.5">
            <div class="w-9 h-9 rounded-full bg-gray-900 border-2 border-blue-500 cursor-pointer shadow-sm"></div>
            <div class="w-9 h-9 rounded-full bg-gray-100 border-2 border-transparent hover:border-gray-300 cursor-pointer shadow-sm"></div>
            <div class="w-9 h-9 rounded-full bg-blue-100 border-2 border-transparent hover:border-blue-300 cursor-pointer shadow-sm"></div>
          </div>
        </div>
        <!-- Sizes -->
        <div class="mb-7">
          <div class="flex justify-between items-center mb-2.5">
            <p class="text-sm font-bold text-gray-700">Taglia</p>
            <span class="text-xs text-blue-600 underline cursor-pointer">Guida taglie</span>
          </div>
          <div class="flex gap-2.5">
            <button class="w-11 h-11 rounded-xl border border-gray-200 text-sm text-gray-400 hover:border-gray-400 transition">XS</button>
            <button class="w-11 h-11 rounded-xl border border-gray-200 text-sm text-gray-400 hover:border-gray-400 transition">S</button>
            <button class="w-11 h-11 rounded-xl border-2 border-gray-900 bg-gray-900 text-white text-sm font-bold">M</button>
            <button class="w-11 h-11 rounded-xl border border-gray-200 text-sm text-gray-400 hover:border-gray-400 transition">L</button>
            <button class="w-11 h-11 rounded-xl border border-gray-200 text-sm text-gray-400 hover:border-gray-400 transition">XL</button>
          </div>
        </div>
        <!-- CTA -->
        <div class="space-y-3 mb-7">
          <button class="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-2xl text-base transition shadow-[0_4px_16px_rgba(0,0,0,0.15)]">Aggiungi al carrello — €69</button>
          <button class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl text-base transition">Acquista subito →</button>
        </div>
        <!-- Trust badges -->
        <div class="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-100 pt-5">
          <div class="flex items-center gap-1.5"><span class="text-emerald-500">✓</span> Reso gratuito</div>
          <div class="flex items-center gap-1.5"><span class="text-emerald-500">✓</span> Consegna in 48h</div>
          <div class="flex items-center gap-1.5"><span class="text-emerald-500">✓</span> Pago sicuro</div>
        </div>
      </div>
    </div>
    <!-- Reviews preview -->
    <div class="mt-12 border-t border-gray-100 pt-10">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-black text-gray-900">Recensioni</h2>
        <div class="flex items-center gap-2"><span class="text-3xl font-black text-gray-900">4.9</span><div class="flex text-yellow-400">★★★★★</div></div>
      </div>
      <div class="space-y-4">
        <div class="bg-gray-50 rounded-2xl p-5"><div class="flex items-center gap-2 mb-2"><div class="text-yellow-400 text-sm">★★★★★</div><span class="text-gray-700 font-semibold text-sm">Marco T.</span><span class="text-gray-400 text-xs">· Acquisto verificato</span></div><p class="text-gray-600 text-sm leading-relaxed">Qualità eccellente, il tessuto è morbidissimo. Ho preso la M e veste perfetta. Consiglio assolutamente.</p></div>
        <div class="bg-gray-50 rounded-2xl p-5"><div class="flex items-center gap-2 mb-2"><div class="text-yellow-400 text-sm">★★★★★</div><span class="text-gray-700 font-semibold text-sm">Federica R.</span><span class="text-gray-400 text-xs">· Acquisto verificato</span></div><p class="text-gray-600 text-sm leading-relaxed">Bellissima! L'ho lavata 5 volte e non ha perso forma né colore. Packaging curatissimo.</p></div>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    id: "adhd-focus-tracker",
    name: "ADHD Focus Tracker Dashboard",
    description:
      "Minimal focus dashboard with Pomodoro timer, task manager, energy tracker, and daily streak.",
    category: "ui",
    price: 999,
    stripePriceId: "price_PLACEHOLDER_adhdfocustracker",
    tags: ["focus", "adhd", "productivity", "pomodoro", "dashboard"],
    downloads: 341,
    isNew: true,
    content: `<div class="min-h-screen bg-[#f0eff8] font-sans">
  <div class="max-w-3xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <p class="text-[#6b5ce7]/60 text-xs font-bold uppercase tracking-widest mb-0.5">Mercoledì 15 Maggio</p>
        <h1 class="text-2xl font-black text-[#1a1040]">Ciao, Luca 👋</h1>
        <p class="text-[#6b5ce7]/50 text-sm mt-0.5">Hai completato 3 sessioni oggi. Ottimo lavoro!</p>
      </div>
      <div class="flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5 shadow-sm border border-purple-100">
        <span class="text-2xl">🔥</span>
        <div><p class="text-2xl font-black text-[#1a1040] leading-none">7</p><p class="text-xs text-[#6b5ce7]/50">giorno streak</p></div>
      </div>
    </div>
    <!-- Focus Timer -->
    <div class="bg-gradient-to-br from-[#6b5ce7] to-[#5e4dcd] rounded-3xl p-8 mb-6 text-white relative overflow-hidden shadow-[0_8px_32px_rgba(107,92,231,0.3)]">
      <div class="absolute inset-0 opacity-10" style="background:radial-gradient(circle at 80% 20%,white,transparent 60%)"></div>
      <div class="relative text-center">
        <p class="text-white/60 text-xs font-bold uppercase tracking-widest mb-6">Sessione Focus · Pomodoro #4</p>
        <!-- Timer circle mockup -->
        <div class="relative inline-flex items-center justify-center w-40 h-40 mb-6">
          <svg class="absolute inset-0" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="10"/>
            <circle cx="80" cy="80" r="70" fill="none" stroke="white" stroke-width="10" stroke-linecap="round" stroke-dasharray="439.8" stroke-dashoffset="110" transform="rotate(-90 80 80)"/>
          </svg>
          <div><p class="text-5xl font-black">17:42</p><p class="text-white/50 text-xs mt-1">rimanenti</p></div>
        </div>
        <p class="text-white/70 text-sm mb-6">🎯 Stai lavorando su: <strong>Progetto Template</strong></p>
        <div class="flex justify-center gap-3">
          <button class="bg-white/20 hover:bg-white/30 border border-white/20 text-white font-bold px-5 py-2.5 rounded-2xl text-sm transition">Pausa</button>
          <button class="bg-white text-[#6b5ce7] font-bold px-8 py-2.5 rounded-2xl text-sm shadow-[0_4px_12px_rgba(0,0,0,0.15)]">▶ Riprendi</button>
          <button class="bg-white/20 hover:bg-white/30 border border-white/20 text-white font-bold px-5 py-2.5 rounded-2xl text-sm transition">Stop</button>
        </div>
      </div>
    </div>
    <!-- Tasks + Energy -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <!-- Tasks -->
      <div class="md:col-span-3 bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-black text-[#1a1040]">Task di oggi</h2>
          <span class="text-xs bg-[#6b5ce7]/10 text-[#6b5ce7] font-bold px-2.5 py-1 rounded-full">3/5 completati</span>
        </div>
        <div class="space-y-3">
          <label class="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" checked class="w-5 h-5 rounded-lg accent-[#6b5ce7]"/>
            <span class="text-sm text-gray-400 line-through flex-1">Revisionare mockup homepage</span>
            <span class="text-[#6b5ce7] text-xs opacity-0 group-hover:opacity-100">✓</span>
          </label>
          <label class="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" checked class="w-5 h-5 rounded-lg accent-[#6b5ce7]"/>
            <span class="text-sm text-gray-400 line-through flex-1">Call con il cliente 15:00</span>
          </label>
          <label class="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" checked class="w-5 h-5 rounded-lg accent-[#6b5ce7]"/>
            <span class="text-sm text-gray-400 line-through flex-1">Scrivere 3 sezioni del report</span>
          </label>
          <label class="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" class="w-5 h-5 rounded-lg accent-[#6b5ce7]"/>
            <span class="text-sm text-[#1a1040] font-medium flex-1">Completare template pricing</span>
            <span class="text-[10px] bg-orange-100 text-orange-600 font-bold px-2 py-0.5 rounded-full">ALTA</span>
          </label>
          <label class="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" class="w-5 h-5 rounded-lg accent-[#6b5ce7]"/>
            <span class="text-sm text-[#1a1040] flex-1">Rispondere alle email</span>
          </label>
        </div>
        <button class="mt-5 w-full border-2 border-dashed border-purple-200 text-[#6b5ce7]/50 py-2.5 rounded-2xl text-sm hover:border-purple-400 hover:text-[#6b5ce7] transition">+ Aggiungi task</button>
      </div>
      <!-- Energy -->
      <div class="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
        <h2 class="font-black text-[#1a1040] mb-5">Energia</h2>
        <div class="space-y-3 mb-6">
          <div class="flex items-center justify-between"><span class="text-sm text-gray-500">9:00</span><div class="flex-1 mx-3 h-2 bg-purple-100 rounded-full"><div class="h-full bg-[#6b5ce7] rounded-full" style="width:85%"></div></div><span class="text-xs text-[#6b5ce7] font-bold">Alta</span></div>
          <div class="flex items-center justify-between"><span class="text-sm text-gray-500">11:00</span><div class="flex-1 mx-3 h-2 bg-purple-100 rounded-full"><div class="h-full bg-[#6b5ce7] rounded-full" style="width:70%"></div></div><span class="text-xs text-[#6b5ce7] font-bold">Media</span></div>
          <div class="flex items-center justify-between"><span class="text-sm text-gray-500">13:00</span><div class="flex-1 mx-3 h-2 bg-purple-100 rounded-full"><div class="h-full bg-purple-300 rounded-full" style="width:45%"></div></div><span class="text-xs text-purple-500 font-bold">Bassa</span></div>
          <div class="flex items-center justify-between"><span class="text-sm text-gray-500">Ora</span><div class="flex-1 mx-3 h-2 bg-purple-100 rounded-full"><div class="h-full bg-[#6b5ce7] rounded-full" style="width:65%"></div></div><span class="text-xs text-[#6b5ce7] font-bold">Media</span></div>
        </div>
        <p class="text-xs text-gray-400 text-center mb-4">Come ti senti adesso?</p>
        <div class="flex justify-between">
          <button class="flex flex-col items-center gap-1 hover:scale-110 transition"><span class="text-2xl">😴</span><span class="text-[10px] text-gray-400">Stanco</span></button>
          <button class="flex flex-col items-center gap-1 hover:scale-110 transition"><span class="text-2xl">😐</span><span class="text-[10px] text-gray-400">Neutro</span></button>
          <button class="flex flex-col items-center gap-1 hover:scale-110 transition ring-2 ring-[#6b5ce7] rounded-xl px-1"><span class="text-2xl">🙂</span><span class="text-[10px] text-[#6b5ce7] font-bold">Bene</span></button>
          <button class="flex flex-col items-center gap-1 hover:scale-110 transition"><span class="text-2xl">🚀</span><span class="text-[10px] text-gray-400">Top</span></button>
        </div>
      </div>
    </div>
    <!-- Session stats -->
    <div class="grid grid-cols-4 gap-3">
      <div class="bg-white rounded-2xl p-4 text-center shadow-sm border border-purple-100"><div class="text-2xl font-black text-[#6b5ce7]">3</div><div class="text-xs text-gray-400 mt-1">Sessioni oggi</div></div>
      <div class="bg-white rounded-2xl p-4 text-center shadow-sm border border-purple-100"><div class="text-2xl font-black text-[#6b5ce7]">75m</div><div class="text-xs text-gray-400 mt-1">Tempo focus</div></div>
      <div class="bg-white rounded-2xl p-4 text-center shadow-sm border border-purple-100"><div class="text-2xl font-black text-[#6b5ce7]">3/5</div><div class="text-xs text-gray-400 mt-1">Task done</div></div>
      <div class="bg-white rounded-2xl p-4 text-center shadow-sm border border-purple-100"><div class="text-2xl font-black text-[#6b5ce7]">7🔥</div><div class="text-xs text-gray-400 mt-1">Streak giorni</div></div>
    </div>
  </div>
</div>`,
  },
  {
    id: "invoice-html",
    name: "Professional Invoice Template",
    description:
      "Clean, print-ready invoice with line items, VAT calculation, payment details, and company branding.",
    category: "ui",
    price: 799,
    stripePriceId: "price_PLACEHOLDER_invoicehtml01",
    tags: ["invoice", "billing", "freelance", "print", "business"],
    downloads: 512,
    isNew: true,
    content: `<div class="min-h-screen bg-gray-100 flex items-start justify-center py-10 px-4 font-sans">
  <div class="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden">
    <!-- Header -->
    <div class="bg-gray-900 text-white px-8 py-7 flex items-start justify-between">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center text-base font-black">S</div>
          <span class="font-black text-xl tracking-tight">Studio Marco</span>
        </div>
        <div class="text-white/50 text-xs space-y-0.5">
          <p>Via Roma 42, 20121 Milano</p>
          <p>P.IVA: IT12345678901</p>
          <p>studio@marco.design</p>
        </div>
      </div>
      <div class="text-right">
        <div class="text-4xl font-black text-white/10 mb-2">FATTURA</div>
        <p class="text-white/60 text-sm"># <span class="text-white font-bold">2025-047</span></p>
        <p class="text-white/40 text-xs mt-1">Emessa: 15 Maggio 2025</p>
        <p class="text-white/40 text-xs">Scadenza: <span class="text-amber-400">14 Giugno 2025</span></p>
      </div>
    </div>
    <!-- Bill To -->
    <div class="px-8 py-5 bg-gray-50 border-b border-gray-200 grid grid-cols-2 gap-6">
      <div>
        <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Fatturato a</p>
        <p class="font-bold text-gray-900">Acme Corporation Srl</p>
        <div class="text-gray-500 text-xs space-y-0.5 mt-1">
          <p>Via Manzoni 10, 20123 Milano</p>
          <p>P.IVA: IT98765432100</p>
          <p>admin@acme.it</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Stato pagamento</p>
        <span class="inline-block bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1.5 rounded-full">In attesa</span>
        <p class="text-gray-400 text-xs mt-2">Bonifico bancario</p>
      </div>
    </div>
    <!-- Line items -->
    <div class="px-8 py-6">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b-2 border-gray-200 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <th class="text-left pb-3">Descrizione</th>
            <th class="text-center pb-3">Qta</th>
            <th class="text-right pb-3">Prezzo unit.</th>
            <th class="text-right pb-3">Totale</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr class="py-3">
            <td class="py-3.5">
              <p class="font-semibold text-gray-900">Progettazione UI/UX — App Mobile</p>
              <p class="text-gray-400 text-xs mt-0.5">Design system, wireframe, prototipo interattivo</p>
            </td>
            <td class="text-center text-gray-600 py-3.5">20h</td>
            <td class="text-right text-gray-600 py-3.5">€120,00</td>
            <td class="text-right font-bold text-gray-900 py-3.5">€2.400,00</td>
          </tr>
          <tr>
            <td class="py-3.5">
              <p class="font-semibold text-gray-900">Sviluppo componenti React</p>
              <p class="text-gray-400 text-xs mt-0.5">8 componenti + design token setup</p>
            </td>
            <td class="text-center text-gray-600 py-3.5">12h</td>
            <td class="text-right text-gray-600 py-3.5">€150,00</td>
            <td class="text-right font-bold text-gray-900 py-3.5">€1.800,00</td>
          </tr>
          <tr>
            <td class="py-3.5">
              <p class="font-semibold text-gray-900">Revisioni e consegna finale</p>
              <p class="text-gray-400 text-xs mt-0.5">2 cicli di revisione inclusi</p>
            </td>
            <td class="text-center text-gray-600 py-3.5">1</td>
            <td class="text-right text-gray-600 py-3.5">€300,00</td>
            <td class="text-right font-bold text-gray-900 py-3.5">€300,00</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Totals -->
    <div class="px-8 pb-6">
      <div class="ml-auto max-w-xs space-y-2 text-sm border-t border-gray-200 pt-4">
        <div class="flex justify-between text-gray-600"><span>Imponibile</span><span>€4.500,00</span></div>
        <div class="flex justify-between text-gray-600"><span>IVA 22%</span><span>€990,00</span></div>
        <div class="flex justify-between font-black text-gray-900 text-base border-t border-gray-200 pt-2 mt-2"><span>Totale</span><span class="text-blue-600">€5.490,00</span></div>
      </div>
    </div>
    <!-- Footer -->
    <div class="px-8 py-5 bg-gray-50 border-t border-gray-200 grid grid-cols-2 gap-6 text-xs">
      <div>
        <p class="font-black text-gray-400 uppercase tracking-widest mb-2">Dati per il pagamento</p>
        <div class="text-gray-600 space-y-0.5">
          <p>Banca: UniCredit SpA</p>
          <p>IBAN: IT60 X054 2811 1010 0000 0123 456</p>
          <p>Causale: Fattura n. 2025-047</p>
        </div>
      </div>
      <div class="text-right text-gray-400">
        <p class="mb-1">Grazie per la collaborazione!</p>
        <p>Per qualsiasi domanda scrivici a</p>
        <p class="text-blue-600 font-medium">studio@marco.design</p>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    id: "ai-tech-portfolio",
    name: "AI & Tech Portfolio",
    description:
      "Dark glassmorphism portfolio for AI engineers and ML researchers with projects, papers, and skills matrix.",
    category: "ui",
    price: 1299,
    stripePriceId: "price_PLACEHOLDER_aitechportfolio",
    tags: ["ai", "ml", "portfolio", "dark", "tech", "engineer"],
    downloads: 178,
    isNew: true,
    content: `<div class="min-h-screen bg-[#030712] text-white font-sans">
  <!-- Ambient background -->
  <div class="fixed inset-0 pointer-events-none overflow-hidden">
    <div class="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-10" style="background:radial-gradient(circle,#3b82f6,transparent 70%)"></div>
    <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-10" style="background:radial-gradient(circle,#8b5cf6,transparent 70%)"></div>
  </div>
  <div class="relative z-10 max-w-4xl mx-auto px-6 py-16">
    <!-- Header -->
    <div class="flex flex-col md:flex-row items-start gap-8 mb-16 pb-16 border-b border-white/5">
      <div class="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-4xl shrink-0 shadow-[0_8px_32px_rgba(59,130,246,0.4)]">🤖</div>
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-1">
          <h1 class="text-3xl font-black tracking-tight">Sara Chen</h1>
          <span class="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3 py-1 rounded-full"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>Open to work</span>
        </div>
        <p class="text-blue-400 font-semibold mb-3">Senior ML Engineer · LLM Researcher</p>
        <p class="text-white/50 text-sm leading-relaxed max-w-xl mb-5">Building production AI systems that actually ship. Previously at DeepMind and Hugging Face. 7 published papers. NeurIPS 2024 spotlight.</p>
        <div class="flex flex-wrap gap-2.5">
          <a class="flex items-center gap-1.5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 px-4 py-2 rounded-xl text-sm transition">🐙 GitHub</a>
          <a class="flex items-center gap-1.5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 px-4 py-2 rounded-xl text-sm transition">📄 arXiv</a>
          <a class="flex items-center gap-1.5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 px-4 py-2 rounded-xl text-sm transition">🐦 Twitter</a>
          <a class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition">Contattami →</a>
        </div>
      </div>
    </div>
    <!-- Projects -->
    <div class="mb-16">
      <h2 class="text-xs font-black text-white/30 uppercase tracking-[0.25em] mb-6">Progetti selezionati</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="group relative bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/40 rounded-3xl p-6 transition cursor-pointer">
          <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-2xl">🧠</div>
            <span class="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full font-bold">Open Source</span>
          </div>
          <h3 class="font-bold text-lg mb-2">NeuroRAG</h3>
          <p class="text-white/50 text-sm leading-relaxed mb-4">Retrieval-augmented generation framework ottimizzato per documenti lunghi. 2.4k ⭐ su GitHub, 180k+ download/mese su PyPI.</p>
          <div class="flex flex-wrap gap-1.5">
            <span class="text-[11px] bg-white/5 text-white/40 px-2.5 py-1 rounded-lg">Python</span>
            <span class="text-[11px] bg-white/5 text-white/40 px-2.5 py-1 rounded-lg">PyTorch</span>
            <span class="text-[11px] bg-white/5 text-white/40 px-2.5 py-1 rounded-lg">LangChain</span>
          </div>
        </div>
        <div class="group relative bg-white/[0.03] border border-white/[0.08] hover:border-violet-500/40 rounded-3xl p-6 transition cursor-pointer">
          <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center text-2xl">⚗️</div>
            <span class="text-xs bg-violet-500/10 text-violet-400 border border-violet-500/20 px-2.5 py-1 rounded-full font-bold">NeurIPS 2024</span>
          </div>
          <h3 class="font-bold text-lg mb-2">EfficientFine</h3>
          <p class="text-white/50 text-sm leading-relaxed mb-4">Metodo di fine-tuning che riduce del 73% il consumo di memoria con performance comparabili a LoRA su task reasoning.</p>
          <div class="flex flex-wrap gap-1.5">
            <span class="text-[11px] bg-white/5 text-white/40 px-2.5 py-1 rounded-lg">Transformers</span>
            <span class="text-[11px] bg-white/5 text-white/40 px-2.5 py-1 rounded-lg">CUDA</span>
            <span class="text-[11px] bg-white/5 text-white/40 px-2.5 py-1 rounded-lg">Triton</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Skills matrix -->
    <div class="mb-16">
      <h2 class="text-xs font-black text-white/30 uppercase tracking-[0.25em] mb-6">Stack tecnico</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 text-center"><div class="text-2xl mb-2">🔥</div><p class="font-semibold text-sm">PyTorch</p><p class="text-white/30 text-xs mt-0.5">Expert</p></div>
        <div class="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 text-center"><div class="text-2xl mb-2">🤗</div><p class="font-semibold text-sm">HuggingFace</p><p class="text-white/30 text-xs mt-0.5">Expert</p></div>
        <div class="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 text-center"><div class="text-2xl mb-2">⚡</div><p class="font-semibold text-sm">vLLM / TGI</p><p class="text-white/30 text-xs mt-0.5">Advanced</p></div>
        <div class="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 text-center"><div class="text-2xl mb-2">☁️</div><p class="font-semibold text-sm">AWS / GCP</p><p class="text-white/30 text-xs mt-0.5">Advanced</p></div>
      </div>
    </div>
    <!-- CTA -->
    <div class="bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-blue-500/20 rounded-3xl p-8 text-center">
      <h3 class="text-xl font-black mb-2">Collaboriamo?</h3>
      <p class="text-white/50 text-sm mb-6">Sono disponibile per consulenze, contratti e posizioni senior a partire da Q4 2025.</p>
      <a class="inline-block bg-white text-gray-900 font-bold px-8 py-3.5 rounded-2xl hover:bg-gray-100 transition shadow-[0_4px_16px_rgba(255,255,255,0.15)]">sara@chenai.dev →</a>
    </div>
  </div>
</div>`,
  },
  {
    id: "personal-trainer-profile",
    name: "Personal Trainer Profile",
    description:
      "High-energy fitness coach profile with services, transformation gallery, and booking CTA.",
    category: "ui",
    price: 999,
    stripePriceId: "price_PLACEHOLDER_personaltrainer",
    tags: ["fitness", "coach", "personal trainer", "booking", "health"],
    downloads: 145,
    isNew: true,
    content: `<div class="min-h-screen bg-[#111] text-white font-sans">
  <!-- Hero -->
  <div class="relative overflow-hidden bg-gradient-to-br from-[#111] via-[#1a1a1a] to-[#111] px-6 pt-16 pb-12">
    <div class="absolute inset-0 opacity-5" style="background-image:repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,0.1) 40px,rgba(255,255,255,0.1) 41px)"></div>
    <div class="max-w-3xl mx-auto relative">
      <div class="flex flex-col md:flex-row items-center gap-8">
        <!-- Photo mockup -->
        <div class="w-40 h-40 rounded-3xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-7xl shrink-0 shadow-[0_16px_48px_rgba(249,115,22,0.4)]">💪</div>
        <div class="text-center md:text-left flex-1">
          <div class="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">Certified Personal Trainer</div>
          <h1 class="text-4xl md:text-5xl font-black tracking-tight mb-3">Alex Fontana</h1>
          <p class="text-white/60 text-base mb-5 leading-relaxed">12 anni di esperienza · 800+ clienti trasformati · Milano & Online</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <button class="bg-orange-500 hover:bg-orange-400 text-white font-black px-8 py-3.5 rounded-2xl transition shadow-[0_4px_20px_rgba(249,115,22,0.4)] text-[15px]">Prenota una sessione →</button>
            <button class="border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-bold px-8 py-3.5 rounded-2xl transition">Vedi i pacchetti</button>
          </div>
        </div>
      </div>
      <!-- Stats -->
      <div class="grid grid-cols-4 gap-4 mt-10 border-t border-white/5 pt-8">
        <div class="text-center"><div class="text-3xl font-black text-orange-400">800+</div><div class="text-white/40 text-xs mt-1">Clienti</div></div>
        <div class="text-center"><div class="text-3xl font-black text-orange-400">12</div><div class="text-white/40 text-xs mt-1">Anni exp.</div></div>
        <div class="text-center"><div class="text-3xl font-black text-orange-400">4.9★</div><div class="text-white/40 text-xs mt-1">Rating</div></div>
        <div class="text-center"><div class="text-3xl font-black text-orange-400">100%</div><div class="text-white/40 text-xs mt-1">Online ready</div></div>
      </div>
    </div>
  </div>
  <!-- Services -->
  <div class="max-w-3xl mx-auto px-6 py-12">
    <h2 class="text-xs font-black text-white/30 uppercase tracking-[0.25em] mb-6">Pacchetti allenamento</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      <div class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
        <div class="text-3xl mb-3">🌱</div>
        <h3 class="font-bold text-lg mb-1">Starter</h3>
        <div class="text-2xl font-black text-orange-400 mb-3">€149 <span class="text-sm font-normal text-white/40">/mese</span></div>
        <ul class="space-y-2 text-sm text-white/60 mb-5">
          <li>✓ 4 sessioni/mese (60 min)</li>
          <li>✓ Piano nutrizionale base</li>
          <li>✓ Accesso app tracker</li>
        </ul>
        <button class="w-full border border-orange-500/40 text-orange-400 font-bold py-2.5 rounded-xl hover:bg-orange-500/10 transition text-sm">Scegli Starter</button>
      </div>
      <div class="relative bg-gradient-to-b from-orange-500/20 to-red-600/10 border-2 border-orange-500/60 rounded-2xl p-6">
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest">PIÙ SCELTO</div>
        <div class="text-3xl mb-3">🔥</div>
        <h3 class="font-bold text-lg mb-1">Trasformazione</h3>
        <div class="text-2xl font-black text-orange-400 mb-3">€299 <span class="text-sm font-normal text-white/40">/mese</span></div>
        <ul class="space-y-2 text-sm text-white/70 mb-5">
          <li>✓ 8 sessioni/mese</li>
          <li>✓ Piano nutrizionale personalizzato</li>
          <li>✓ Check-in settimanale via chat</li>
          <li>✓ Accesso programma online</li>
        </ul>
        <button class="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-2.5 rounded-xl transition text-sm shadow-[0_4px_16px_rgba(249,115,22,0.3)]">Scegli Trasformazione</button>
      </div>
      <div class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
        <div class="text-3xl mb-3">👑</div>
        <h3 class="font-bold text-lg mb-1">Elite</h3>
        <div class="text-2xl font-black text-orange-400 mb-3">€499 <span class="text-sm font-normal text-white/40">/mese</span></div>
        <ul class="space-y-2 text-sm text-white/60 mb-5">
          <li>✓ 12 sessioni/mese</li>
          <li>✓ Supporto illimitato via chat</li>
          <li>✓ Analisi body composition mensile</li>
          <li>✓ Piano 100% personalizzato</li>
        </ul>
        <button class="w-full border border-orange-500/40 text-orange-400 font-bold py-2.5 rounded-xl hover:bg-orange-500/10 transition text-sm">Scegli Elite</button>
      </div>
    </div>
    <!-- Testimonials -->
    <h2 class="text-xs font-black text-white/30 uppercase tracking-[0.25em] mb-6">Risultati reali</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5">
        <div class="flex text-orange-400 text-sm mb-3">★★★★★</div>
        <p class="text-white/70 text-sm italic leading-relaxed mb-4">"In 3 mesi ho perso 12kg e guadagnato una mentalità completamente diversa verso il cibo e l'allenamento."</p>
        <div class="flex items-center gap-3"><div class="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-sm">👩</div><div><p class="font-semibold text-sm">Chiara M.</p><p class="text-white/30 text-xs">Paziente da 6 mesi</p></div></div>
      </div>
      <div class="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5">
        <div class="flex text-orange-400 text-sm mb-3">★★★★★</div>
        <p class="text-white/70 text-sm italic leading-relaxed mb-4">"Il primo PT che ha capito le mie esigenze. Ho aumentato la massa del 15% senza compromettere la mobilità."</p>
        <div class="flex items-center gap-3"><div class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-sm">👨</div><div><p class="font-semibold text-sm">Davide K.</p><p class="text-white/30 text-xs">Paziente da 8 mesi</p></div></div>
      </div>
    </div>
  </div>
</div>`,
  },

  // ── Nuovi Prompt Templates ─────────────────────────────────────────────────
  {
    id: "linkedin-prompt-pack",
    name: "LinkedIn Content Pack (5 formati)",
    description:
      "5 proven LinkedIn post formats: thought leadership, personal story, how-to list, contrarian take, and viral hook.",
    category: "prompt",
    price: 999,
    stripePriceId: "price_PLACEHOLDER_linkedinpack01",
    tags: ["linkedin", "social media", "content", "copywriting", "personal brand"],
    downloads: 678,
    isNew: true,
    content: `You are a top LinkedIn content strategist. Generate a high-performing LinkedIn post using the format specified below.

ABOUT THE AUTHOR:
- Name: {{author_name}}
- Role: {{author_role}}
- Industry: {{industry}}
- Audience: {{target_audience}} (e.g., "founders", "marketers", "engineers")
- Core topic: {{topic}}
- Key insight or message: {{key_insight}}

SELECT A FORMAT:
{{format}} — choose one: thought-leadership | personal-story | how-to-list | contrarian-take | viral-hook

══════════════════════════════════════
FORMAT: thought-leadership
══════════════════════════════════════
Structure:
1. Bold opening statement (1 line, no fluff)
2. Context: why this matters NOW (2-3 lines)
3. Your unique perspective (3-4 lines, specific data or examples)
4. What most people get wrong (2-3 lines)
5. The real insight (2-3 lines)
6. Close with a question to drive comments

Tone: confident, direct, no buzzwords, data-backed when possible
Length: 150-200 words

══════════════════════════════════════
FORMAT: personal-story
══════════════════════════════════════
Structure:
1. Hook: a surprising moment or failure (1-2 lines)
2. The backstory (3-4 lines — set the scene)
3. The turning point (2-3 lines)
4. The lesson learned (2-3 lines)
5. Universal takeaway for {{target_audience}} (2-3 lines)
6. CTA: ask readers to share a similar experience

Tone: vulnerable but professional, storytelling voice
Length: 180-230 words

══════════════════════════════════════
FORMAT: how-to-list
══════════════════════════════════════
Structure:
1. Promise headline: "How to [result] in [timeframe]"
2. Brief credibility statement (1 line)
3. Numbered list of 5-7 actionable tips
   - Each tip: bold label + 1-2 sentence explanation
   - Include one counterintuitive tip
4. Summary line
5. CTA: save this post + follow for more

Tone: practical, no-nonsense, specific
Length: 200-280 words

══════════════════════════════════════
FORMAT: contrarian-take
══════════════════════════════════════
Structure:
1. "Hot take:" or "Unpopular opinion:" opener
2. State the conventional wisdom (1-2 lines)
3. "I disagree. Here's why:" pivot (bold)
4. Your argument with 3 specific reasons
5. Acknowledge what IS true about the common view
6. Your conclusion
7. CTA: "Agree or disagree? Tell me below"

Tone: provocative but fair, backed by logic
Length: 160-210 words

══════════════════════════════════════
FORMAT: viral-hook
══════════════════════════════════════
Structure:
1. Opening hook (1 shocking line — stat, question, or bold claim)
2. Expand the hook (2-3 lines explaining)
3. The revelation (3-4 lines with the actual insight)
4. Practical application for {{target_audience}} (3-4 lines)
5. Memorable close (1 punchy line)
6. 3 relevant hashtags

Tone: energetic, punchy, shareable
Length: 130-170 words

OUTPUT:
Write the complete post only. No commentary or meta-text.
Then add:
---
Best time to post: [day + time window]
Estimated reach boost: [low/medium/high] for this format
`,
  },
  {
    id: "youtube-script-pack",
    name: "YouTube Script Builder",
    description:
      "Full YouTube video script with hook, story arc, CTA and SEO title/description generator.",
    category: "prompt",
    price: 1299,
    stripePriceId: "price_PLACEHOLDER_youtubescriptpack",
    tags: ["youtube", "script", "video", "content creator", "seo"],
    downloads: 432,
    isNew: true,
    content: `You are a professional YouTube scriptwriter and SEO strategist. Create a complete, production-ready script for a YouTube video.

VIDEO BRIEF:
- Channel name: {{channel_name}}
- Channel niche: {{niche}} (e.g., personal finance, fitness, tech tutorials)
- Target audience: {{target_audience}}
- Video topic: {{video_topic}}
- Main keyword: {{main_keyword}}
- Desired video length: {{duration}} (e.g., "8-10 minutes")
- Video style: {{style}} (e.g., talking head, tutorial, story, listicle)
- Tone: {{tone}} (e.g., educational, entertaining, inspiring, conversational)

═══════════════════════════════════════
PART 1 — SEO PACKAGE
═══════════════════════════════════════

1. VIDEO TITLE (3 options)
   Option A: [Curiosity-gap style — 50-60 chars]
   Option B: [How-to/listicle style — 50-60 chars]
   Option C: [Story/emotional style — 50-60 chars]

2. DESCRIPTION (500 chars)
   - First 2 lines must contain {{main_keyword}} (shown before "Show more")
   - Value proposition + timestamps placeholder
   - 3-5 relevant hashtags

3. TAGS (15 tags — mix of broad, specific, long-tail)

═══════════════════════════════════════
PART 2 — FULL SCRIPT
═══════════════════════════════════════

[HOOK — 0:00–0:45]
Goal: Stop the scroll. The first 30 seconds determine retention.
Write a hook using ONE of these techniques:
- Pattern interrupt: start mid-action or mid-sentence
- Bold claim: state the most surprising fact about {{video_topic}}
- Pain/desire opener: "If you've ever [frustration]... this video is for you"

[INTRO — 0:45–1:30]
- Introduce {{channel_name}} in one sentence (no long intros)
- Preview the 3 main things viewers will learn
- Subscribe nudge: natural, not desperate

[MAIN CONTENT — 1:30–end-2:00]
Divide the {{video_topic}} into 3-5 sections based on {{duration}}:

Section 1: [Title]
  - Opening transition
  - Key point explanation (clear, with example or analogy)
  - Visual cue note: [B-roll/graphic suggestion]
  - Mini CTA or engagement hook (e.g., "Comment below if...")

Section 2: [Title]
  [same structure]

Section 3: [Title]
  [same structure]

[Add more sections as needed for {{duration}}]

[OUTRO — last 90 seconds]
- Summary: 3 key takeaways in bullet form
- CTA priority 1: subscribe with specific reason ("so you don't miss...")
- CTA priority 2: next video recommendation (describe what to pitch)
- Final memorable line / sign-off

═══════════════════════════════════════
PART 3 — PRODUCTION NOTES
═══════════════════════════════════════
- Thumbnail concept: [describe the ideal thumbnail composition]
- Best upload time for {{niche}}: [day + time]
- Suggested end screen CTA video: [describe ideal paired video topic]

Write the complete script using natural spoken language.
Use [PAUSE], [SMILE], [HOLD UP PRODUCT] style stage directions sparingly.
Word count should match {{duration}} at ~130 words/minute.
`,
  },
  {
    id: "claude-projects-pack",
    name: "Claude Projects Starter Pack",
    description:
      "6 ready-to-use Claude Project system prompts: writing assistant, code reviewer, business strategist, research analyst, email coach, and product manager.",
    category: "prompt",
    price: 1499,
    stripePriceId: "price_PLACEHOLDER_claudeprojectspack",
    tags: ["claude", "ai assistant", "system prompt", "projects", "productivity"],
    downloads: 891,
    editorsPick: true,
    isNew: true,
    content: `Six production-ready Claude Project system prompts. Copy each one directly into a Claude Project's "Project instructions" field.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT 1: Writing & Content Assistant
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You are an elite writing assistant for {{user_name}}, a {{user_role}} in {{industry}}.

YOUR CORE BEHAVIORS:
- Match and elevate the user's existing voice — never replace it
- Default output length: concise. Ask to expand if needed
- Format: use markdown only when the user will render it
- When editing: track changes clearly, explain key edits in a separate bullet list
- When generating: ask for target audience, purpose, and tone before starting

SPECIALIZATIONS:
- Long-form articles and essays: structure, argument flow, transitions
- Email and Slack messages: clarity, brevity, appropriate tone
- Social media: platform-specific optimization (LinkedIn, Twitter/X, Newsletter)
- Presentations: narrative arc, slide-by-slide flow
- Technical documentation: accuracy + accessibility balance

WHAT TO AVOID:
- Hollow phrases: "Certainly!", "Great question!", "As an AI..."
- Unnecessary hedging or disclaimers
- Changing the user's core argument without flagging it
- Adding fluff to hit word counts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT 2: Senior Code Reviewer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You are a senior software engineer and code reviewer with deep expertise in {{tech_stack}}.

REVIEW FRAMEWORK (always apply in this order):
1. CORRECTNESS — Does it do what it's supposed to? Edge cases?
2. SECURITY — Injection risks, auth issues, exposed secrets, OWASP top 10
3. PERFORMANCE — Unnecessary loops, N+1 queries, memory leaks
4. READABILITY — Naming, complexity, documentation where needed
5. ARCHITECTURE — Does it fit the existing patterns? SOLID principles?

OUTPUT FORMAT for code reviews:
🔴 CRITICAL (must fix before merge): [issue + fix]
🟡 WARNING (should fix): [issue + suggestion]
🟢 IMPROVEMENT (optional refactor): [suggestion]
💡 LEARNING NOTE: [explain why, not just what]

When writing new code:
- Prioritize correctness over cleverness
- Add comments only for non-obvious logic
- Write tests first if asked for TDD
- Flag when a request could introduce technical debt

Stack assumptions: {{tech_stack}}. Ask before assuming other technologies.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT 3: Business Strategist & Advisor
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You are a strategic advisor for {{company_name}}, a {{company_description}}.

CONTEXT (always keep in mind):
- Stage: {{company_stage}} (e.g., pre-revenue, Series A, profitable SMB)
- Team size: {{team_size}}
- Primary goal this quarter: {{quarterly_goal}}
- Biggest constraint: {{main_constraint}} (e.g., cash, talent, time)

YOUR APPROACH:
- Lead with the most important insight, not with process
- Use first-principles thinking for novel problems
- Apply known frameworks (JTBD, BCG matrix, Porter's 5 forces) only when genuinely useful — not by default
- When you spot an assumption in the user's question, name it
- Offer 2-3 concrete options with trade-offs, not a single answer

COMMUNICATION STYLE:
- Bullet points for lists, prose for reasoning
- Bold the single most important sentence in each response
- If a question needs more context, ask ONE specific clarifying question

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT 4: Research & Analysis Engine
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You are a research analyst for {{user_name}} in the field of {{research_domain}}.

RESEARCH STANDARDS:
- Always distinguish: [FACT], [INFERENCE], [ASSUMPTION], [UNKNOWN]
- Cite reasoning chains, not just conclusions
- Acknowledge knowledge cutoff limitations proactively
- Flag when a topic requires real-time data you cannot provide

OUTPUT TEMPLATES:

For topic overviews:
## Summary (2-3 sentences)
## Key findings (5-7 bullets with source reasoning)
## Conflicting views (if any)
## Gaps / open questions
## Recommended next steps

For comparisons:
## Criteria matrix (table format)
## Verdict with reasoning
## What the comparison misses

For literature/report summaries:
## Core argument
## Evidence quality (strong/weak/mixed)
## Implications for {{user_name}}'s work
## One critical question this raises

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT 5: Email & Communication Coach
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You are a communication coach helping {{user_name}} write clear, effective professional emails and messages.

STYLE PROFILE:
- User's communication style: {{communication_style}} (e.g., formal, direct, warm)
- Typical recipients: {{recipient_types}} (e.g., investors, clients, team)
- Recurring challenge: {{communication_challenge}} (e.g., "too long", "not assertive enough", "unclear asks")

FOR EVERY EMAIL/MESSAGE YOU WRITE OR REVIEW:
1. Subject line: 6-8 words, specific, action-oriented
2. Opening: skip "I hope this email finds you well" — lead with the point
3. Body: one paragraph per idea, max 3 paragraphs for most emails
4. Ask: one clear, specific request per email
5. Close: action + deadline if relevant

REVIEW MODE (when user pastes a draft):
- Highlight the single biggest problem
- Rewrite the subject line
- Rewrite the first sentence
- Offer a full rewrite only if requested

TONE CALIBRATION:
- Cold outreach → curious, respectful, brief
- Client updates → confident, transparent, solution-focused
- Internal team → direct, warm, actionable
- Difficult conversations → empathetic, factual, collaborative

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT 6: Product Manager Co-Pilot
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You are a product management partner for {{pm_name}}, PM at {{company_name}}.

PRODUCT CONTEXT:
- Product: {{product_description}}
- Users: {{primary_users}}
- Current phase: {{product_phase}} (e.g., discovery, build, growth, optimization)
- OKRs this cycle: {{current_okrs}}

YOUR PM TOOLKIT:

PRDs & Specs:
- Lead with user problem + evidence, not solution
- Include: success metrics, non-goals, edge cases
- Flag assumptions explicitly with [ASSUMPTION] tags

User Stories:
Format: "As [specific user type], when [context], I want [action] so that [outcome]"
- Include acceptance criteria (Given/When/Then)
- Add one "sad path" per story

Prioritization:
- Default to RICE when asked to prioritize (Reach × Impact × Confidence / Effort)
- Always show the denominator (effort) — it's the most underestimated variable
- Challenge any prioritization that ignores user evidence

Retrospectives & Analysis:
- Structure: What happened → Why → What we learned → What changes
- Avoid blame language; focus on systems and processes

HOW TO USE EACH PROJECT:
1. Create a new Claude Project for each prompt
2. Paste the system prompt into "Project instructions"
3. Fill in all {{variables}} with your specific context
4. Upload relevant documents (codebase, brand guide, product spec) to the Project
`,
  },
  {
    id: "ai-workflow-pack",
    name: "AI Workflow Automation Pack",
    description:
      "5 AI workflow prompts for n8n, Make, and Zapier: email triage, content repurposing, lead qualification, support ticket routing, and weekly digest.",
    category: "prompt",
    price: 1699,
    stripePriceId: "price_PLACEHOLDER_aiworkflowpack01",
    tags: ["automation", "workflow", "n8n", "zapier", "make", "ai agent"],
    downloads: 312,
    isNew: true,
    content: `Five production-tested AI workflow automation prompts. Each is designed as the AI step in an n8n/Make/Zapier automation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WORKFLOW 1: Smart Email Triage Agent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRIGGER: New email arrives in Gmail/Outlook
AI STEP PROMPT:

You are an email triage assistant for {{user_name}} at {{company_name}}.

Analyze this email and return a JSON object only (no other text):

Email from: {{sender}}
Subject: {{subject}}
Body: {{email_body}}

Return:
{
  "priority": "urgent|high|normal|low",
  "category": "client|sales|support|admin|newsletter|spam|personal",
  "requires_response": true/false,
  "response_deadline_hours": number or null,
  "suggested_label": "string",
  "one_line_summary": "max 10 words",
  "draft_reply": "string or null (only if requires_response is true, keep under 100 words)",
  "action_items": ["array of strings, max 3"]
}

PRIORITY RULES for {{company_name}}:
- urgent: clients with active contracts, revenue impact, legal
- high: new leads, team blockers, time-sensitive decisions
- normal: general business correspondence
- low: newsletters, automated notifications, FYI emails

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WORKFLOW 2: Content Repurposing Engine
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRIGGER: New blog post / YouTube video published
AI STEP PROMPT:

You are a content repurposing specialist. Turn the following source content into multiple platform-specific formats. Return valid JSON only.

Source content: {{source_content}}
Author name: {{author_name}}
Brand voice: {{brand_voice}} (e.g., "direct and educational, never corporate")
Primary audience: {{audience}}

Return:
{
  "twitter_thread": {
    "hook_tweet": "string (max 240 chars, creates curiosity)",
    "thread_tweets": ["array of 4-6 tweets, each max 240 chars"],
    "closing_cta": "string (follow + link)"
  },
  "linkedin_post": "string (150-200 words, professional tone, ends with question)",
  "newsletter_section": {
    "subject_line": "string",
    "preview_text": "string (max 90 chars)",
    "body": "string (200-250 words, conversational)"
  },
  "instagram_caption": "string (max 150 words + 5 hashtags)",
  "seo_meta": {
    "title": "string (max 60 chars)",
    "description": "string (max 155 chars)",
    "focus_keyword": "string"
  }
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WORKFLOW 3: Lead Qualification Scorer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRIGGER: New lead form submission / CRM entry
AI STEP PROMPT:

You are a B2B lead qualification agent for {{company_name}}, which sells {{product_description}} to {{ideal_customer_profile}}.

Qualify this lead and return JSON only:

Lead data:
- Name: {{lead_name}}
- Company: {{company_name_lead}}
- Title: {{job_title}}
- Company size: {{company_size}}
- Message/notes: {{lead_message}}
- Source: {{lead_source}}
- Website: {{company_website}}

Return:
{
  "score": number (0-100),
  "tier": "hot|warm|cold|disqualified",
  "fit_analysis": {
    "company_fit": "high|medium|low",
    "persona_fit": "high|medium|low",
    "intent_signals": ["array of strings"]
  },
  "recommended_action": "string (specific next step)",
  "assign_to": "{{sales_rep_name}} | {{account_executive}} | nurture_sequence | discard",
  "personalization_note": "string (1-2 sentences for the first outreach email)",
  "red_flags": ["array of strings or empty"]
}

SCORING CRITERIA for {{company_name}}:
- 80-100: ICP match + high intent → immediate outreach
- 60-79: partial fit → nurture sequence
- 40-59: low fit → low-priority follow-up
- <40: disqualify

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WORKFLOW 4: Support Ticket Router
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRIGGER: New support ticket created
AI STEP PROMPT:

You are a support operations agent for {{company_name}}. Analyze this ticket and return JSON only.

Ticket:
- From: {{customer_name}} ({{customer_plan}} plan, customer since {{customer_since}})
- Subject: {{ticket_subject}}
- Message: {{ticket_body}}

Return:
{
  "category": "billing|technical|onboarding|feature_request|bug|account|general",
  "priority": "critical|high|medium|low",
  "sentiment": "frustrated|neutral|positive",
  "churn_risk": "high|medium|low",
  "assign_to": "tier1|tier2|engineering|billing|success_manager",
  "sla_hours": number,
  "suggested_response": "string (empathetic, professional, under 100 words — leave [SOLUTION] placeholder where the specific answer goes)",
  "escalation_flag": true/false,
  "escalation_reason": "string or null",
  "knowledge_base_articles": ["array of relevant article slugs to check"]
}

PRIORITY RULES:
- critical: service down, data loss, security issue
- high: feature broken, {{customer_plan}} = enterprise/pro
- medium: non-blocking issue, workaround exists
- low: question, feature request, general inquiry

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WORKFLOW 5: Weekly Business Digest
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRIGGER: Every Friday at {{digest_time}}
DATA INPUTS: Pull from your CRM, analytics, and project tools

AI STEP PROMPT:

You are a business analyst preparing {{user_name}}'s weekly digest for {{company_name}}.

Analyze the following data and write a clear, scannable digest. Return as formatted markdown.

DATA PROVIDED:
- Revenue this week: {{weekly_revenue}} (vs last week: {{last_week_revenue}})
- New customers: {{new_customers}}
- Churned customers: {{churned_customers}}
- Active support tickets: {{open_tickets}} open, {{closed_tickets}} closed
- Key tasks completed: {{completed_tasks}}
- Key tasks overdue: {{overdue_tasks}}
- Top content: {{top_content_title}} ({{top_content_views}} views)
- Team notes: {{team_notes}}

FORMAT:
# Weekly Digest — Week of {{week_date}}

## 🎯 Headline number
[Single most important metric with context]

## 📈 Revenue
[2-3 bullets with trend analysis]

## 👥 Customers
[Acquisition + churn summary with signals]

## ⚡ Wins this week
[3 bullets — be specific, quantify where possible]

## ⚠️ Watch list
[2-3 items that need attention next week]

## 📌 This week's focus
[1-2 sentences on what the team should prioritize Monday]

Keep the entire digest under 300 words. No empty positivity — only signal.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPLEMENTATION NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Replace all {{variables}} with your actual values or dynamic fields from your automation tool
2. For JSON-returning workflows, add a JSON parse step after the AI call
3. Test with edge cases: empty fields, very long inputs, special characters
4. Add error handling: if AI returns invalid JSON, route to manual review
5. Recommended model: Claude 3.5 Haiku for speed/cost, Claude 3.5 Sonnet for quality
`,
  },
];

export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}

export function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}

// ── Bundles ────────────────────────────────────────────────────────────────

export interface Bundle {
  id: string;
  name: string;
  tagline: string;
  description: string;
  templateIds: string[];
  price: number; // cents
  /** Regular price (sum of individual templates) for savings display */
  regularPrice: number;
  stripePriceId: string;
  emoji: string;
  accentColor: string; // Tailwind color class prefix, e.g. "blue"
  tags: string[];
}

export const bundles: Bundle[] = [
  {
    id: "bundle-saas-starter",
    name: "SaaS Starter Kit",
    tagline: "Lancia il tuo SaaS in un weekend",
    description:
      "Tutto ciò che serve per il tuo prodotto SaaS: hero section, pricing, features, dashboard e pricing completo. Risparmia ore di lavoro.",
    templateIds: ["hero-saas", "pricing-table", "feature-showcase", "saas-dashboard", "saas-pricing-full"],
    price: 2999,
    regularPrice: 6595,
    stripePriceId: "price_BUNDLE_PLACEHOLDER_saas01",
    emoji: "🚀",
    accentColor: "blue",
    tags: ["saas", "startup", "landing", "dashboard"],
  },
  {
    id: "bundle-ai-content",
    name: "AI Content Creator Pack",
    tagline: "Contenuti AI pronti per ogni canale",
    description:
      "I 5 prompt più usati dai creator: email B2B, descrizioni e-commerce, system prompt AI, LinkedIn e YouTube. Un arsenale completo.",
    templateIds: ["cold-email-b2b", "product-description-ecom", "ai-assistant-system-prompt", "linkedin-prompt-pack", "youtube-script-pack"],
    price: 2299,
    regularPrice: 5395,
    stripePriceId: "price_BUNDLE_PLACEHOLDER_aicontent",
    emoji: "✍️",
    accentColor: "violet",
    tags: ["content", "ai", "copywriting", "linkedin", "youtube"],
  },
  {
    id: "bundle-freelancer-kit",
    name: "Freelancer Essential Kit",
    tagline: "Il kit completo per freelancer seri",
    description:
      "CV digitale, profilo tech, fattura professionale e landing newsletter. Presenta te stesso al meglio da subito.",
    templateIds: ["digital-resume", "freelance-tech-profile", "invoice-html", "newsletter-landing"],
    price: 1999,
    regularPrice: 3195,
    stripePriceId: "price_BUNDLE_PLACEHOLDER_freelancer",
    emoji: "💼",
    accentColor: "emerald",
    tags: ["freelance", "portfolio", "invoice", "personal brand"],
  },
  {
    id: "bundle-claude-power",
    name: "Claude Power Bundle",
    tagline: "Trasforma Claude nel tuo collaboratore ideale",
    description:
      "6 Claude Project system prompts + AI workflow automation + LinkedIn content pack. Il setup definitivo per lavorare con Claude.",
    templateIds: ["claude-projects-pack", "ai-workflow-pack", "ai-assistant-system-prompt", "linkedin-prompt-pack"],
    price: 2999,
    regularPrice: 5195,
    stripePriceId: "price_BUNDLE_PLACEHOLDER_claudepower",
    emoji: "🤖",
    accentColor: "purple",
    tags: ["claude", "ai", "automation", "workflow", "productivity"],
  },
  {
    id: "bundle-local-business",
    name: "Local Business Web Pack",
    tagline: "Il sito perfetto per la tua attività locale",
    description:
      "Menu ristorante, landing café, booking hotel e pagina prodotto e-commerce. Dai al tuo business locale una presenza online professionale.",
    templateIds: ["restaurant-menu", "coffee-shop-landing", "hotel-booking", "ecommerce-product-page"],
    price: 1999,
    regularPrice: 4095,
    stripePriceId: "price_BUNDLE_PLACEHOLDER_localbiz",
    emoji: "🏪",
    accentColor: "amber",
    tags: ["local business", "restaurant", "hospitality", "ecommerce"],
  },
  {
    id: "bundle-productivity",
    name: "Focus & Productivity Bundle",
    tagline: "Smetti di procrastinare, inizia a produrre",
    description:
      "ADHD focus tracker, AI workflow automation e YouTube script builder. Strumenti concreti per chi vuole fare di più in meno tempo.",
    templateIds: ["adhd-focus-tracker", "ai-workflow-pack", "youtube-script-pack"],
    price: 2499,
    regularPrice: 3997,
    stripePriceId: "price_BUNDLE_PLACEHOLDER_productivity",
    emoji: "⚡",
    accentColor: "orange",
    tags: ["productivity", "focus", "adhd", "automation"],
  },
];

export function getBundle(id: string): Bundle | undefined {
  return bundles.find((b) => b.id === id);
}

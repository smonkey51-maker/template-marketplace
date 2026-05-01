export type TemplateCategory = "ui";
export type DownloadType =
  | "html"       // UI template → .html file with Tailwind CDN
  | "canva"      // Canva edit link
  | "excel"      // .xlsx file
  | "sheets"     // Google Sheets /copy link
  | "notion"     // Notion duplicate link
  | "webflow"    // Webflow project link
  | "framer"     // Framer project link
  | "shopify"    // Shopify Liquid theme → .zip download
  | "wordpress"; // WordPress PHP theme → .zip download

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
  /** Override download type (defaults to "html") */
  downloadType?: DownloadType;
  /** Required for canva / excel / sheets / notion / webflow / framer */
  downloadUrl?: string;
  /** Optional YouTube/Loom URL for a walkthrough tutorial shown on the preview page */
  videoUrl?: string;
  editorsPick?: boolean;
  isNew?: boolean;
}

/** Returns the effective download type, falling back to "html" */
export function getDownloadType(template: Template): DownloadType {
  return template.downloadType ?? "html";
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
    price: 499,
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
    price: 1299,
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
    price: 999,
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
    price: 1299,
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
    price: 499,
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
    price: 1299,
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
    price: 999,
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
    price: 799,
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

  // ── CRM / E-commerce / AI Interface Templates ───────────────────────────
  {
    id: "cold-email-b2b",
    name: "B2B Outreach CRM",
    description:
      "Dark CRM dashboard for email outreach campaigns with sequence tracking and reply analytics.",
    category: "ui",
    price: 799,
    stripePriceId: "price_1TBixFBoWNgrJbiyzxGXK1Jo",
    tags: ["crm", "outreach", "email", "dashboard", "dark", "saas"],
    downloads: 2341,
    editorsPick: true,
    content: `<div class="min-h-screen bg-[#0A0A0B] text-white font-sans" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="w-64 bg-[#111113] border-r border-white/[0.06] flex flex-col p-4 gap-1">
      <div class="flex items-center gap-2 px-3 py-2 mb-4">
        <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold">R</div>
        <span class="font-semibold text-[15px]">ReachPro</span>
      </div>
      <a class="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.06] text-white text-[13px] font-medium" href="#">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1.5" fill="currentColor" opacity=".9"/><rect x="9" y="2" width="5" height="5" rx="1.5" fill="currentColor" opacity=".5"/><rect x="2" y="9" width="5" height="5" rx="1.5" fill="currentColor" opacity=".5"/><rect x="9" y="9" width="5" height="5" rx="1.5" fill="currentColor" opacity=".5"/></svg>
        Dashboard
      </a>
      <a class="flex items-center gap-3 px-3 py-2 rounded-xl text-white/50 text-[13px] hover:text-white hover:bg-white/[0.04] transition-colors" href="#">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h8M2 12h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        Sequences
      </a>
      <a class="flex items-center gap-3 px-3 py-2 rounded-xl text-white/50 text-[13px] hover:text-white hover:bg-white/[0.04] transition-colors" href="#">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        Contacts
      </a>
      <a class="flex items-center gap-3 px-3 py-2 rounded-xl text-white/50 text-[13px] hover:text-white hover:bg-white/[0.04] transition-colors" href="#">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 6h12" stroke="currentColor" stroke-width="1.5"/></svg>
        Templates
      </a>
      <div class="mt-auto pt-4 border-t border-white/[0.06]">
        <div class="flex items-center gap-2 px-3 py-2">
          <div class="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[11px] font-bold flex items-center justify-center">JD</div>
          <div><p class="text-[12px] font-medium">James D.</p><p class="text-[11px] text-white/40">Pro plan</p></div>
        </div>
      </div>
    </div>
    <!-- Main -->
    <div class="flex-1 overflow-auto">
      <!-- Header -->
      <div class="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-[18px] font-semibold">Outreach Dashboard</h1>
          <p class="text-white/40 text-[12px] mt-0.5">March 2026 · Active campaign</p>
        </div>
        <button class="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-[13px] font-semibold transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
          New sequence
        </button>
      </div>
      <!-- Stats -->
      <div class="grid grid-cols-4 gap-4 p-6 pb-0">
        <div class="bg-[#111113] border border-white/[0.06] rounded-2xl p-4">
          <p class="text-white/40 text-[11px] uppercase tracking-wider mb-2">Emails sent</p>
          <p class="text-[28px] font-bold">2,847</p>
          <p class="text-emerald-400 text-[12px] mt-1 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 2l3 4H2l3-4z" fill="currentColor"/></svg>
            +18% this week
          </p>
        </div>
        <div class="bg-[#111113] border border-white/[0.06] rounded-2xl p-4">
          <p class="text-white/40 text-[11px] uppercase tracking-wider mb-2">Open rate</p>
          <p class="text-[28px] font-bold">68.4%</p>
          <p class="text-emerald-400 text-[12px] mt-1">↑ 12% vs avg</p>
        </div>
        <div class="bg-[#111113] border border-white/[0.06] rounded-2xl p-4">
          <p class="text-white/40 text-[11px] uppercase tracking-wider mb-2">Replies</p>
          <p class="text-[28px] font-bold">184</p>
          <p class="text-white/40 text-[12px] mt-1">6.5% reply rate</p>
        </div>
        <div class="bg-[#111113] border border-white/[0.06] rounded-2xl p-4">
          <p class="text-white/40 text-[11px] uppercase tracking-wider mb-2">Meetings booked</p>
          <p class="text-[28px] font-bold">31</p>
          <p class="text-emerald-400 text-[12px] mt-1">↑ 8 this week</p>
        </div>
      </div>
      <!-- Recent emails -->
      <div class="p-6">
        <div class="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div class="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h2 class="font-semibold text-[14px]">Active Sequences</h2>
            <span class="bg-blue-500/10 text-blue-400 text-[11px] font-semibold px-2 py-0.5 rounded-full">3 running</span>
          </div>
          <div class="divide-y divide-white/[0.04]">
            <div class="px-5 py-3.5 flex items-center gap-4">
              <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20 flex items-center justify-center text-xs">📧</div>
              <div class="flex-1">
                <p class="text-[13px] font-medium">SaaS Founders — Q1 Push</p>
                <p class="text-white/40 text-[11px]">Step 2 of 4 · 312 contacts</p>
              </div>
              <div class="text-right">
                <p class="text-[13px] font-semibold text-emerald-400">72% open</p>
                <p class="text-white/40 text-[11px]">8.1% reply</p>
              </div>
              <span class="bg-emerald-500/10 text-emerald-400 text-[11px] font-medium px-2.5 py-1 rounded-full">Active</span>
            </div>
            <div class="px-5 py-3.5 flex items-center gap-4">
              <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center text-xs">🎯</div>
              <div class="flex-1">
                <p class="text-[13px] font-medium">E-commerce Decision Makers</p>
                <p class="text-white/40 text-[11px]">Step 1 of 3 · 187 contacts</p>
              </div>
              <div class="text-right">
                <p class="text-[13px] font-semibold text-blue-400">61% open</p>
                <p class="text-white/40 text-[11px]">5.3% reply</p>
              </div>
              <span class="bg-emerald-500/10 text-emerald-400 text-[11px] font-medium px-2.5 py-1 rounded-full">Active</span>
            </div>
            <div class="px-5 py-3.5 flex items-center gap-4">
              <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/20 flex items-center justify-center text-xs">🚀</div>
              <div class="flex-1">
                <p class="text-[13px] font-medium">Agency Outreach — Winter</p>
                <p class="text-white/40 text-[11px]">Step 3 of 4 · 94 contacts</p>
              </div>
              <div class="text-right">
                <p class="text-[13px] font-semibold text-orange-400">58% open</p>
                <p class="text-white/40 text-[11px]">9.6% reply</p>
              </div>
              <span class="bg-yellow-500/10 text-yellow-400 text-[11px] font-medium px-2.5 py-1 rounded-full">Paused</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    id: "product-description-ecom",
    name: "E-commerce Product Page",
    description:
      "Elegant minimal product detail page with gallery, variant selector, reviews, and trust badges.",
    category: "ui",
    price: 799,
    stripePriceId: "price_1TBixFBoWNgrJbiyOlJPdvT0",
    tags: ["ecommerce", "product", "shop", "minimal", "cards"],
    downloads: 1876,
    content: `<div class="min-h-screen bg-white" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <!-- Nav -->
  <nav class="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
    <span class="text-[18px] font-bold tracking-tight text-gray-900">MAISON</span>
    <div class="flex items-center gap-6 text-[13px] text-gray-500">
      <a href="#" class="hover:text-gray-900 transition-colors">Collection</a>
      <a href="#" class="hover:text-gray-900 transition-colors">About</a>
      <a href="#" class="hover:text-gray-900 transition-colors">Contact</a>
      <button class="relative"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 2H4a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2h-2M6 2a2 2 0 012-2h4a2 2 0 012 2M6 2h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><span class="absolute -top-1 -right-1 bg-gray-900 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">2</span></button>
    </div>
  </nav>
  <!-- Product -->
  <div class="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 gap-16 items-start">
    <!-- Images -->
    <div class="space-y-3">
      <div class="aspect-square bg-gradient-to-br from-stone-100 to-stone-200 rounded-2xl flex items-center justify-center overflow-hidden">
        <div class="w-40 h-52 bg-gradient-to-br from-stone-300 to-stone-400 rounded-xl shadow-2xl flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M16 12h16v24H16z" fill="white" opacity=".3"/><path d="M20 8h8v4h-8zM14 36h20v4H14z" fill="white" opacity=".2"/></svg>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-2">
        <div class="aspect-square bg-gradient-to-br from-stone-100 to-stone-200 rounded-xl cursor-pointer ring-2 ring-gray-900"></div>
        <div class="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl cursor-pointer opacity-60 hover:opacity-100 transition-opacity"></div>
        <div class="aspect-square bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl cursor-pointer opacity-60 hover:opacity-100 transition-opacity"></div>
        <div class="aspect-square bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-xl cursor-pointer opacity-60 hover:opacity-100 transition-opacity"></div>
      </div>
    </div>
    <!-- Details -->
    <div class="pt-4 space-y-6">
      <div>
        <p class="text-[11px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Premium Collection · 2026</p>
        <h1 class="text-[32px] font-bold text-gray-900 leading-tight">Minimalist Ceramic<br/>Diffuser Set</h1>
        <div class="flex items-center gap-3 mt-3">
          <div class="flex text-amber-400 text-sm">★★★★★</div>
          <p class="text-[13px] text-gray-500">4.9 (284 reviews)</p>
        </div>
      </div>
      <div class="flex items-baseline gap-3">
        <span class="text-[32px] font-bold text-gray-900">€89</span>
        <span class="text-[18px] text-gray-400 line-through">€120</span>
        <span class="bg-rose-100 text-rose-600 text-[12px] font-bold px-2.5 py-1 rounded-full">-26%</span>
      </div>
      <!-- Options -->
      <div>
        <p class="text-[13px] font-semibold text-gray-700 mb-2">Fragrance</p>
        <div class="flex gap-2">
          <button class="px-4 py-2 rounded-xl border-2 border-gray-900 text-[13px] font-semibold bg-gray-900 text-white">Cedar &amp; Sage</button>
          <button class="px-4 py-2 rounded-xl border border-gray-200 text-[13px] text-gray-600 hover:border-gray-400 transition-colors">Bergamot</button>
          <button class="px-4 py-2 rounded-xl border border-gray-200 text-[13px] text-gray-600 hover:border-gray-400 transition-colors">Lavender</button>
        </div>
      </div>
      <!-- CTA -->
      <div class="space-y-3">
        <button class="w-full py-4 bg-gray-900 text-white rounded-2xl text-[15px] font-bold hover:bg-gray-800 transition-colors">Add to cart</button>
        <button class="w-full py-4 border-2 border-gray-200 text-gray-900 rounded-2xl text-[15px] font-semibold hover:border-gray-400 transition-colors flex items-center justify-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 14s-6-4.5-6-8a6 6 0 0112 0c0 3.5-6 8-6 8z" stroke="currentColor" stroke-width="1.5"/></svg>
          Save to wishlist
        </button>
      </div>
      <!-- Features -->
      <div class="border-t border-gray-100 pt-6 space-y-3">
        <div class="flex items-center gap-3 text-[13px] text-gray-600">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Free shipping on orders over €60
        </div>
        <div class="flex items-center gap-3 text-[13px] text-gray-600">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          30-day free returns
        </div>
        <div class="flex items-center gap-3 text-[13px] text-gray-600">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Handcrafted in Italy
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    id: "ai-assistant-system-prompt",
    name: "AI Chat Interface",
    description:
      "Modern dark AI assistant UI with sidebar conversation history, streaming messages, and model picker.",
    category: "ui",
    price: 999,
    stripePriceId: "price_1TBixGBoWNgrJbiyioEK1MiF",
    tags: ["ai", "chat", "dark", "saas", "dashboard", "minimal"],
    downloads: 3102,
    content: `<div class="min-h-screen bg-[#0A0A0B] flex" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <!-- Sidebar -->
  <div class="w-72 bg-[#111113] border-r border-white/[0.06] flex flex-col p-3">
    <div class="px-3 py-2 flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2a5 5 0 100 10A5 5 0 007 2z" fill="white" opacity=".8"/><circle cx="7" cy="7" r="2" fill="white"/></svg>
        </div>
        <span class="text-white text-[14px] font-semibold">Aria AI</span>
      </div>
      <button class="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </button>
    </div>
    <div class="px-3 mb-3">
      <div class="bg-white/[0.04] rounded-xl px-3 py-2 flex items-center gap-2">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="white" stroke-opacity=".3" stroke-width="1.5"/><path d="M10 10l-2-2" stroke="white" stroke-opacity=".3" stroke-width="1.5" stroke-linecap="round"/></svg>
        <span class="text-white/30 text-[12px]">Search conversations...</span>
      </div>
    </div>
    <div class="px-3 mb-2">
      <p class="text-white/25 text-[10px] uppercase tracking-widest font-semibold">Today</p>
    </div>
    <div class="space-y-0.5 px-1.5">
      <div class="flex items-center gap-2 px-2.5 py-2.5 rounded-xl bg-white/[0.06] cursor-pointer">
        <div class="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0"></div>
        <span class="text-white text-[13px] font-medium truncate">Marketing strategy for Q2</span>
      </div>
      <div class="flex items-center gap-2 px-2.5 py-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors">
        <div class="w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0"></div>
        <span class="text-white/60 text-[13px] truncate">Write product descriptions</span>
      </div>
      <div class="flex items-center gap-2 px-2.5 py-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors">
        <div class="w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0"></div>
        <span class="text-white/60 text-[13px] truncate">Code review: auth module</span>
      </div>
    </div>
    <div class="px-3 mt-3 mb-2">
      <p class="text-white/25 text-[10px] uppercase tracking-widest font-semibold">Yesterday</p>
    </div>
    <div class="space-y-0.5 px-1.5">
      <div class="flex items-center gap-2 px-2.5 py-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors">
        <div class="w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0"></div>
        <span class="text-white/60 text-[13px] truncate">Investor pitch deck outline</span>
      </div>
      <div class="flex items-center gap-2 px-2.5 py-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors">
        <div class="w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0"></div>
        <span class="text-white/60 text-[13px] truncate">SEO content audit report</span>
      </div>
    </div>
    <div class="mt-auto border-t border-white/[0.06] pt-3 px-1.5">
      <div class="flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer">
        <div class="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-[11px] font-bold">SA</div>
        <div class="flex-1"><p class="text-white text-[12px] font-medium">Sarah A.</p><p class="text-white/40 text-[11px]">Pro · Unlimited</p></div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 4l4 3-4 3" stroke="white" stroke-opacity=".3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
    </div>
  </div>
  <!-- Chat -->
  <div class="flex-1 flex flex-col">
    <!-- Header -->
    <div class="border-b border-white/[0.06] px-6 py-3.5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" fill="white" opacity=".8"/><circle cx="7" cy="7" r="2.5" fill="#7c3aed"/></svg>
        </div>
        <div><p class="text-white text-[14px] font-semibold">Aria</p><p class="text-emerald-400 text-[11px] flex items-center gap-1"><span class="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block"></span>Online · GPT-4o</p></div>
      </div>
      <div class="flex items-center gap-2">
        <button class="w-8 h-8 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/><path d="M7 4.5v3l2 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
        <button class="w-8 h-8 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </div>
    <!-- Messages -->
    <div class="flex-1 overflow-auto px-6 py-6 space-y-6">
      <!-- User message -->
      <div class="flex justify-end">
        <div class="max-w-[70%] bg-violet-500/20 border border-violet-500/20 rounded-2xl rounded-br-md px-4 py-3">
          <p class="text-white text-[14px] leading-relaxed">Can you help me create a comprehensive marketing strategy for our Q2 product launch? We're targeting mid-market SaaS companies.</p>
          <p class="text-white/30 text-[11px] mt-1.5 text-right">10:24 AM</p>
        </div>
      </div>
      <!-- AI message -->
      <div class="flex gap-3">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex-shrink-0 flex items-center justify-center mt-0.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4" fill="white" opacity=".8"/><circle cx="6" cy="6" r="2" fill="#7c3aed"/></svg>
        </div>
        <div class="flex-1 space-y-3">
          <div class="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-tl-md px-4 py-3">
            <p class="text-white text-[14px] leading-relaxed mb-3">Here's a structured Q2 marketing strategy for mid-market SaaS companies:</p>
            <div class="space-y-2">
              <div class="flex items-start gap-2"><span class="text-violet-400 font-bold text-[13px] mt-0.5">1.</span><div><p class="text-white font-semibold text-[13px]">Content marketing blitz</p><p class="text-white/60 text-[12px] leading-relaxed">Publish 3 high-value case studies featuring ROI metrics. Target "head of operations" and "VP of sales" decision makers.</p></div></div>
              <div class="flex items-start gap-2"><span class="text-violet-400 font-bold text-[13px] mt-0.5">2.</span><div><p class="text-white font-semibold text-[13px]">LinkedIn outbound sequence</p><p class="text-white/60 text-[12px] leading-relaxed">5-touch sequence targeting 200–500 employee companies. Personalize using recent funding rounds or hiring signals.</p></div></div>
              <div class="flex items-start gap-2"><span class="text-violet-400 font-bold text-[13px] mt-0.5">3.</span><div><p class="text-white font-semibold text-[13px]">Product-led growth loop</p><p class="text-white/60 text-[12px] leading-relaxed">Free tier with viral activation trigger. Conversion prompt at the 7-day mark with social proof overlay.</p></div></div>
            </div>
            <p class="text-white/30 text-[11px] mt-3">10:24 AM · Aria</p>
          </div>
          <div class="flex gap-2">
            <button class="text-white/40 hover:text-white/70 transition-colors p-1.5 rounded-lg hover:bg-white/[0.04]"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M4 4V3a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg></button>
            <button class="text-white/40 hover:text-white/70 transition-colors p-1.5 rounded-lg hover:bg-white/[0.04]"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 9.5L5.5 2l3.5 7.5M3.5 7h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <button class="text-white/40 hover:text-white/70 transition-colors p-1.5 rounded-lg hover:bg-white/[0.04]"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 4.5h9M2 8.5h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg></button>
          </div>
        </div>
      </div>
    </div>
    <!-- Input -->
    <div class="border-t border-white/[0.06] p-4">
      <div class="bg-white/[0.04] border border-white/[0.08] rounded-2xl flex items-end gap-3 px-4 py-3">
        <textarea class="flex-1 bg-transparent text-white text-[14px] resize-none outline-none placeholder-white/30 max-h-32" placeholder="Message Aria..." rows="1"></textarea>
        <div class="flex items-center gap-2 pb-0.5">
          <button class="w-8 h-8 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v6M4 5l3-3 3 3M2 11h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="w-8 h-8 rounded-xl bg-violet-500 hover:bg-violet-400 flex items-center justify-center transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l10-5-5 10V7H2z" fill="white"/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`,
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
    price: 799,
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
    price: 799,
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
    price: 499,
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
    <p class="text-center text-white/20 text-xs mt-8">Made with Forma ✦</p>
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
    stripePriceId: "price_1TCExsBoWNgrJbiy17IwkuEC",
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
    stripePriceId: "price_1TCExtBoWNgrJbiyHYcmL4bS",
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
    stripePriceId: "price_1TCExtBoWNgrJbiy6odbimrb",
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
    stripePriceId: "price_1TCExuBoWNgrJbiycciGeKPu",
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
    stripePriceId: "price_1TCExvBoWNgrJbiymrdVVGVN",
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
    stripePriceId: "price_1TCExvBoWNgrJbiyvEiB7bpm",
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
    stripePriceId: "price_1TCExwBoWNgrJbiy3VDFBfAm",
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
    name: "Personal Brand Landing",
    description:
      "Creator profile landing page with social stats, recent posts, newsletter opt-in, and follower metrics.",
    category: "ui",
    price: 999,
    stripePriceId: "price_1TCExxBoWNgrJbiyijEzE2LI",
    tags: ["personal brand", "creator", "landing", "minimal", "profile"],
    downloads: 678,
    isNew: true,
    content: `<div class="min-h-screen bg-[#F8F7F4]" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <!-- Nav -->
  <nav class="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
    <span class="font-bold text-gray-900 text-[16px]">Alex Chen</span>
    <div class="flex items-center gap-4 text-[13px] text-gray-500">
      <a href="#" class="hover:text-gray-900">About</a>
      <a href="#" class="hover:text-gray-900">Newsletter</a>
      <a href="#" class="hover:text-gray-900">Courses</a>
      <a href="#" class="bg-gray-900 text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-800 transition-colors">Follow</a>
    </div>
  </nav>
  <!-- Hero -->
  <div class="max-w-3xl mx-auto px-6 pt-16 pb-12 text-center">
    <div class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 mx-auto mb-4 flex items-center justify-center text-2xl shadow-lg shadow-blue-500/20">👨‍💻</div>
    <div class="flex items-center justify-center gap-2 mb-3">
      <span class="text-[13px] text-gray-500">@alexchen</span>
      <span class="bg-blue-100 text-blue-600 text-[11px] font-bold px-2 py-0.5 rounded-full">✓ Verified</span>
    </div>
    <h1 class="text-[38px] font-bold text-gray-900 leading-tight mb-4">I help founders build<br/><span class="text-blue-500">products people love</span></h1>
    <p class="text-[16px] text-gray-500 leading-relaxed max-w-xl mx-auto mb-8">Product designer &amp; growth strategist. Writing about SaaS, design systems, and building in public. 47K followers · 12K newsletter subscribers.</p>
    <div class="flex items-center justify-center gap-3">
      <button class="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold text-[14px] hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/25">Subscribe to newsletter →</button>
      <button class="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold text-[14px] border border-gray-200 hover:border-gray-300 transition-colors">View courses</button>
    </div>
  </div>
  <!-- Stats -->
  <div class="max-w-3xl mx-auto px-6 pb-12">
    <div class="bg-white rounded-2xl border border-gray-100 p-6 grid grid-cols-3 gap-6 text-center">
      <div><p class="text-[28px] font-bold text-gray-900">47K</p><p class="text-[12px] text-gray-400 mt-1">LinkedIn followers</p></div>
      <div class="border-x border-gray-100"><p class="text-[28px] font-bold text-gray-900">12K</p><p class="text-[12px] text-gray-400 mt-1">Newsletter readers</p></div>
      <div><p class="text-[28px] font-bold text-gray-900">3.2M</p><p class="text-[12px] text-gray-400 mt-1">Post impressions</p></div>
    </div>
  </div>
  <!-- Latest posts -->
  <div class="max-w-3xl mx-auto px-6 pb-16">
    <h2 class="text-[20px] font-bold text-gray-900 mb-4">Latest posts</h2>
    <div class="space-y-3">
      <div class="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:border-blue-200 transition-colors cursor-pointer">
        <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-lg flex-shrink-0">💡</div>
        <div class="flex-1"><p class="font-semibold text-gray-900 text-[14px]">The 5-step framework I used to grow from 0 to 47K followers</p><p class="text-gray-400 text-[12px] mt-0.5">47K impressions · 892 reactions</p></div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="text-gray-300"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:border-blue-200 transition-colors cursor-pointer">
        <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center text-lg flex-shrink-0">🚀</div>
        <div class="flex-1"><p class="font-semibold text-gray-900 text-[14px]">Why most SaaS products fail in the first 90 days (and how to fix it)</p><p class="text-gray-400 text-[12px] mt-0.5">31K impressions · 654 reactions</p></div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="text-gray-300"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:border-blue-200 transition-colors cursor-pointer">
        <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-lg flex-shrink-0">📊</div>
        <div class="flex-1"><p class="font-semibold text-gray-900 text-[14px]">I analyzed 100 landing pages. Here are the 7 elements that convert best</p><p class="text-gray-400 text-[12px] mt-0.5">28K impressions · 521 reactions</p></div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="text-gray-300"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    id: "youtube-script-pack",
    name: "Content Creator Studio",
    description:
      "YouTube creator dashboard with subscriber analytics, video performance metrics, and upload management.",
    category: "ui",
    price: 1299,
    stripePriceId: "price_1TCExxBoWNgrJbiyMycBkeO2",
    tags: ["creator", "youtube", "dashboard", "dark", "analytics"],
    downloads: 432,
    isNew: true,
    content: `<div class="min-h-screen bg-[#0F0F10]" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: white;">
  <!-- Header -->
  <div class="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 4l6 3-6 3V4z" fill="white"/></svg>
      </div>
      <span class="font-semibold text-[15px]">Creator Studio</span>
    </div>
    <div class="flex items-center gap-3 text-[13px] text-white/50">
      <button class="px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">Analytics</button>
      <button class="px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">Content</button>
      <button class="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white font-semibold transition-colors flex items-center gap-2">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
        Upload
      </button>
    </div>
  </div>
  <!-- Channel banner -->
  <div class="h-32 bg-gradient-to-r from-red-900/60 via-purple-900/60 to-indigo-900/60 relative overflow-hidden">
    <div class="absolute inset-0 opacity-40" style="background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(0deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 40px)"></div>
  </div>
  <div class="px-6 pb-6">
    <div class="flex items-end gap-4 -mt-8 mb-6">
      <div class="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-purple-600 border-4 border-[#0F0F10] flex items-center justify-center text-xl shadow-xl">🎬</div>
      <div class="pb-2">
        <h2 class="font-bold text-[18px]">TechWithMarcus</h2>
        <p class="text-white/50 text-[12px]">@techwithmarcus · 284K subscribers</p>
      </div>
      <button class="ml-auto mb-2 px-4 py-2 rounded-xl bg-white text-gray-900 font-bold text-[13px] hover:bg-gray-100 transition-colors">Customize channel</button>
    </div>
    <!-- Stats row -->
    <div class="grid grid-cols-4 gap-3 mb-6">
      <div class="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4">
        <p class="text-white/40 text-[11px] uppercase tracking-wider mb-1.5">Subscribers</p>
        <p class="text-[22px] font-bold">284K</p>
        <p class="text-emerald-400 text-[11px] mt-1">+2.1K this week</p>
      </div>
      <div class="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4">
        <p class="text-white/40 text-[11px] uppercase tracking-wider mb-1.5">Monthly views</p>
        <p class="text-[22px] font-bold">1.8M</p>
        <p class="text-emerald-400 text-[11px] mt-1">+12% vs last month</p>
      </div>
      <div class="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4">
        <p class="text-white/40 text-[11px] uppercase tracking-wider mb-1.5">Watch time (hrs)</p>
        <p class="text-[22px] font-bold">92K</p>
        <p class="text-white/40 text-[11px] mt-1">avg 8.4 min/video</p>
      </div>
      <div class="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4">
        <p class="text-white/40 text-[11px] uppercase tracking-wider mb-1.5">Revenue (est.)</p>
        <p class="text-[22px] font-bold">€4.2K</p>
        <p class="text-white/40 text-[11px] mt-1">AdSense + sponsors</p>
      </div>
    </div>
    <!-- Videos -->
    <div class="bg-white/[0.04] border border-white/[0.06] rounded-2xl overflow-hidden">
      <div class="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
        <h3 class="font-semibold text-[14px]">Recent videos</h3>
        <button class="text-red-400 text-[12px] font-semibold hover:text-red-300 transition-colors">View all →</button>
      </div>
      <div class="divide-y divide-white/[0.04]">
        <div class="px-5 py-4 flex items-center gap-4">
          <div class="w-24 h-14 bg-gradient-to-br from-red-900/60 to-purple-900/60 rounded-xl flex-shrink-0 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="white" stroke-opacity=".3" stroke-width="1.5"/><path d="M8 7l6 3-6 3V7z" fill="white" opacity=".8"/></svg>
          </div>
          <div class="flex-1">
            <p class="text-[13px] font-medium line-clamp-1">I built an AI SaaS in 72 hours — here's what happened</p>
            <p class="text-white/40 text-[11px] mt-1">148K views · 3 days ago</p>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="text-emerald-400 text-[12px] font-semibold">68% retention</p>
            <p class="text-white/40 text-[11px]">4.7% CTR</p>
          </div>
        </div>
        <div class="px-5 py-4 flex items-center gap-4">
          <div class="w-24 h-14 bg-gradient-to-br from-blue-900/60 to-indigo-900/60 rounded-xl flex-shrink-0 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="white" stroke-opacity=".3" stroke-width="1.5"/><path d="M8 7l6 3-6 3V7z" fill="white" opacity=".8"/></svg>
          </div>
          <div class="flex-1">
            <p class="text-[13px] font-medium line-clamp-1">The ONLY Tailwind CSS course you need in 2026</p>
            <p class="text-white/40 text-[11px] mt-1">91K views · 1 week ago</p>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="text-blue-400 text-[12px] font-semibold">54% retention</p>
            <p class="text-white/40 text-[11px]">3.2% CTR</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    id: "claude-projects-pack",
    name: "AI Projects Command Center",
    description:
      "Claude Projects-style dashboard to manage AI assistants with system prompts, knowledge base, and usage stats.",
    category: "ui",
    price: 1499,
    stripePriceId: "price_1TCExyBoWNgrJbiyIqOtURBP",
    tags: ["ai", "projects", "dashboard", "dark", "saas"],
    downloads: 891,
    editorsPick: true,
    isNew: true,
    content: `<div class="min-h-screen bg-[#09090B]" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: white;">
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="w-60 bg-[#0F0F11] border-r border-white/[0.05] p-4 flex flex-col gap-1">
      <div class="flex items-center gap-2 px-2 py-2 mb-3">
        <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-[13px]">⚡</div>
        <span class="font-semibold text-[14px]">Claude Projects</span>
      </div>
      <button class="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[12px] font-semibold mb-2">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        New Project
      </button>
      <p class="text-white/20 text-[9px] uppercase tracking-widest px-3 mb-1 mt-2">My Projects</p>
      <div class="space-y-0.5">
        <div class="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.06] cursor-pointer">
          <div class="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></div>
          <span class="text-white text-[12px] truncate font-medium">Marketing Copywriter</span>
        </div>
        <div class="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors">
          <div class="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></div>
          <span class="text-white/60 text-[12px] truncate">Code Reviewer Pro</span>
        </div>
        <div class="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors">
          <div class="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0"></div>
          <span class="text-white/60 text-[12px] truncate">Research Assistant</span>
        </div>
        <div class="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors">
          <div class="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0"></div>
          <span class="text-white/60 text-[12px] truncate">Sales Email Writer</span>
        </div>
        <div class="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors">
          <div class="w-2 h-2 rounded-full bg-pink-400 flex-shrink-0"></div>
          <span class="text-white/60 text-[12px] truncate">SEO Content Wizard</span>
        </div>
      </div>
    </div>
    <!-- Main -->
    <div class="flex-1 overflow-auto p-6">
      <div class="mb-6">
        <h1 class="text-[22px] font-bold">Marketing Copywriter</h1>
        <p class="text-white/40 text-[13px] mt-1">Active project · 847 conversations · Last used 2h ago</p>
      </div>
      <!-- Instructions card -->
      <div class="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5 mb-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-lg bg-orange-500/15 flex items-center justify-center"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 3h8M2 6h5M2 9h7" stroke="#f97316" stroke-width="1.4" stroke-linecap="round"/></svg></div>
            <span class="text-[13px] font-semibold">System Instructions</span>
          </div>
          <button class="text-white/40 hover:text-white text-[12px] transition-colors">Edit</button>
        </div>
        <div class="bg-black/30 rounded-xl p-4 font-mono text-[12px] text-white/60 leading-relaxed">
          <span class="text-orange-400">You are</span> an expert marketing copywriter specializing in <span class="text-blue-400">SaaS products</span>. Your writing style is <span class="text-emerald-400">conversational, benefit-focused</span>, and optimized for conversion.<br/><br/>
          <span class="text-white/30"># Guidelines</span><br/>
          - Always lead with the customer's desired outcome<br/>
          - Use power words: proven, instant, effortless, exclusive<br/>
          - Structure: Hook → Problem → Solution → CTA
        </div>
      </div>
      <!-- Knowledge files -->
      <div class="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5 mb-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-lg bg-blue-500/15 flex items-center justify-center"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="2" y="1" width="8" height="10" rx="1.5" stroke="#60a5fa" stroke-width="1.4"/><path d="M4 4.5h4M4 6.5h4M4 8.5h2" stroke="#60a5fa" stroke-width="1.2" stroke-linecap="round"/></svg></div>
            <span class="text-[13px] font-semibold">Knowledge Base</span>
          </div>
          <button class="text-white/40 hover:text-white text-[12px] transition-colors flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg> Add file</button>
        </div>
        <div class="space-y-2">
          <div class="flex items-center gap-3 p-3 bg-black/20 rounded-xl">
            <div class="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-[11px]">📄</div>
            <div class="flex-1"><p class="text-[12px] font-medium">brand_voice_guide.pdf</p><p class="text-white/30 text-[10px]">48 KB · Added 3 days ago</p></div>
          </div>
          <div class="flex items-center gap-3 p-3 bg-black/20 rounded-xl">
            <div class="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-[11px]">📊</div>
            <div class="flex-1"><p class="text-[12px] font-medium">competitor_analysis.xlsx</p><p class="text-white/30 text-[10px]">124 KB · Added 1 week ago</p></div>
          </div>
        </div>
      </div>
      <!-- Usage stats -->
      <div class="grid grid-cols-3 gap-3">
        <div class="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4 text-center">
          <p class="text-[22px] font-bold text-orange-400">847</p>
          <p class="text-white/40 text-[11px] mt-1">Conversations</p>
        </div>
        <div class="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4 text-center">
          <p class="text-[22px] font-bold text-blue-400">2.1M</p>
          <p class="text-white/40 text-[11px] mt-1">Tokens used</p>
        </div>
        <div class="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4 text-center">
          <p class="text-[22px] font-bold text-emerald-400">94%</p>
          <p class="text-white/40 text-[11px] mt-1">Satisfaction rate</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    id: "ai-workflow-pack",
    name: "Automation Workflow Board",
    description:
      "Visual automation workflow dashboard with multi-step pipeline builder and real-time execution stats.",
    category: "ui",
    price: 1699,
    stripePriceId: "price_1TCExzBoWNgrJbiyehVGNbWT",
    tags: ["automation", "workflow", "dashboard", "dark", "saas"],
    downloads: 312,
    isNew: true,
    content: `<div class="min-h-screen bg-[#0C0D0F]" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: white;">
  <!-- Header -->
  <div class="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3-4 2 3 2-5 3 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <span class="font-semibold text-[15px]">FlowAI</span>
    </div>
    <div class="flex items-center gap-2">
      <span class="bg-emerald-500/10 text-emerald-400 text-[12px] font-medium px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
        12 automations running
      </span>
      <button class="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-[13px] font-semibold transition-colors">New workflow</button>
    </div>
  </div>
  <!-- Content -->
  <div class="p-6">
    <!-- Stats -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="bg-[#111214] border border-white/[0.05] rounded-2xl p-4">
        <div class="flex items-center justify-between mb-3">
          <p class="text-white/40 text-[11px] uppercase tracking-wider">Tasks automated</p>
          <div class="w-7 h-7 rounded-lg bg-teal-500/10 flex items-center justify-center"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3 3 6-6" stroke="#14b8a6" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        </div>
        <p class="text-[26px] font-bold">14,821</p>
        <p class="text-teal-400 text-[11px] mt-1">↑ +847 this week</p>
      </div>
      <div class="bg-[#111214] border border-white/[0.05] rounded-2xl p-4">
        <div class="flex items-center justify-between mb-3">
          <p class="text-white/40 text-[11px] uppercase tracking-wider">Time saved</p>
          <div class="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="#60a5fa" stroke-width="1.4"/><path d="M6.5 4v3l2 1" stroke="#60a5fa" stroke-width="1.4" stroke-linecap="round"/></svg></div>
        </div>
        <p class="text-[26px] font-bold">312h</p>
        <p class="text-blue-400 text-[11px] mt-1">This month</p>
      </div>
      <div class="bg-[#111214] border border-white/[0.05] rounded-2xl p-4">
        <div class="flex items-center justify-between mb-3">
          <p class="text-white/40 text-[11px] uppercase tracking-wider">Success rate</p>
          <div class="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 8l3-4 2 3 2-5 4 6" stroke="#34d399" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        </div>
        <p class="text-[26px] font-bold">99.2%</p>
        <p class="text-emerald-400 text-[11px] mt-1">0 errors today</p>
      </div>
      <div class="bg-[#111214] border border-white/[0.05] rounded-2xl p-4">
        <div class="flex items-center justify-between mb-3">
          <p class="text-white/40 text-[11px] uppercase tracking-wider">Active workflows</p>
          <div class="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="1" width="4.5" height="4.5" rx="1" stroke="#a78bfa" stroke-width="1.4"/><rect x="7.5" y="1" width="4.5" height="4.5" rx="1" stroke="#a78bfa" stroke-width="1.4"/><rect x="1" y="7.5" width="4.5" height="4.5" rx="1" stroke="#a78bfa" stroke-width="1.4"/><rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1" stroke="#a78bfa" stroke-width="1.4"/></svg></div>
        </div>
        <p class="text-[26px] font-bold">12</p>
        <p class="text-purple-400 text-[11px] mt-1">4 scheduled</p>
      </div>
    </div>
    <!-- Workflows list -->
    <div class="bg-[#111214] border border-white/[0.05] rounded-2xl overflow-hidden">
      <div class="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
        <h2 class="font-semibold text-[14px]">Active Workflows</h2>
        <div class="flex gap-1.5">
          <button class="px-3 py-1.5 rounded-lg bg-teal-500/10 text-teal-400 text-[11px] font-semibold">Running</button>
          <button class="px-3 py-1.5 rounded-lg text-white/40 text-[11px] hover:bg-white/[0.04] transition-colors">All</button>
        </div>
      </div>
      <div class="divide-y divide-white/[0.04]">
        <div class="px-5 py-4 flex items-center gap-4">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/20 flex items-center justify-center text-base">📧</div>
          <div class="flex-1">
            <p class="text-[13px] font-medium">Email → CRM auto-sync</p>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-white/30 text-[11px]">Gmail</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="white" stroke-opacity=".2" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span class="text-white/30 text-[11px]">HubSpot</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="white" stroke-opacity=".2" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span class="text-white/30 text-[11px]">Slack notification</span>
            </div>
          </div>
          <div class="text-right"><p class="text-teal-400 text-[12px] font-semibold">2,847 runs</p><p class="text-white/30 text-[11px]">Last: 2 min ago</p></div>
          <span class="w-2 h-2 rounded-full bg-teal-400"></span>
        </div>
        <div class="px-5 py-4 flex items-center gap-4">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20 flex items-center justify-center text-base">📊</div>
          <div class="flex-1">
            <p class="text-[13px] font-medium">Weekly report generator</p>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-white/30 text-[11px]">Airtable</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="white" stroke-opacity=".2" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span class="text-white/30 text-[11px]">Claude AI</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="white" stroke-opacity=".2" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span class="text-white/30 text-[11px]">Google Docs</span>
            </div>
          </div>
          <div class="text-right"><p class="text-blue-400 text-[12px] font-semibold">12 runs</p><p class="text-white/30 text-[11px]">Every Monday 8AM</p></div>
          <span class="w-2 h-2 rounded-full bg-blue-400"></span>
        </div>
        <div class="px-5 py-4 flex items-center gap-4">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center text-base">🤖</div>
          <div class="flex-1">
            <p class="text-[13px] font-medium">Support ticket AI triage</p>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-white/30 text-[11px]">Zendesk</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="white" stroke-opacity=".2" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span class="text-white/30 text-[11px]">Claude AI classify</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="white" stroke-opacity=".2" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span class="text-white/30 text-[11px]">Auto-assign</span>
            </div>
          </div>
          <div class="text-right"><p class="text-purple-400 text-[12px] font-semibold">5,219 runs</p><p class="text-white/30 text-[11px]">Last: 8 min ago</p></div>
          <span class="w-2 h-2 rounded-full bg-purple-400"></span>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },

  {
    id: "notion-project-hub",
    name: "Notion Project Management Hub",
    category: "ui",
    price: 1299,
    stripePriceId: "price_1TCIgABoWNgrJbiyUCgrGaoU",
    downloadType: "notion",
    downloadUrl: "", // TODO: incolla qui il link di duplicazione Notion
    tags: ["notion", "project management", "productivity", "kanban", "team"],
    downloads: 387,
    description: "Complete Notion workspace for managing projects, tasks and deadlines with 5 pre-built views.",
    isNew: true,
    editorsPick: true,
    content: `<div style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;display:flex;height:100vh;background:#ffffff;color:#37352f;font-size:14px;line-height:1.5;overflow:hidden;">

<!-- Sidebar -->
<div style="width:240px;min-width:240px;background:#f7f7f5;border-right:1px solid #e9e9e7;display:flex;flex-direction:column;padding:8px 0;overflow-y:auto;">
  <div style="padding:8px 12px 4px;">
    <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;cursor:pointer;background:#ebebea;">
      <div style="width:24px;height:24px;background:#2f3437;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700;">P</div>
      <span style="font-size:13px;font-weight:600;color:#37352f;flex:1;">Project Hub</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9b9a97" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
    </div>
  </div>
  <div style="padding:4px 8px;">
    <div style="padding:5px 8px;border-radius:6px;display:flex;align-items:center;gap:8px;cursor:pointer;color:#787774;font-size:13px;" onmouseover="this.style.background='#ebebea'" onmouseout="this.style.background='transparent'">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> Cerca
    </div>
    <div style="padding:5px 8px;border-radius:6px;display:flex;align-items:center;gap:8px;cursor:pointer;color:#787774;font-size:13px;" onmouseover="this.style.background='#ebebea'" onmouseout="this.style.background='transparent'">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> Notifiche
    </div>
    <div style="padding:5px 8px;border-radius:6px;display:flex;align-items:center;gap:8px;cursor:pointer;color:#787774;font-size:13px;" onmouseover="this.style.background='#ebebea'" onmouseout="this.style.background='transparent'">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> Modelli
    </div>
  </div>
  <div style="height:1px;background:#e9e9e7;margin:6px 12px;"></div>
  <div style="padding:4px 8px;">
    <div style="padding:2px 8px;font-size:11px;color:#9b9a97;font-weight:500;text-transform:uppercase;letter-spacing:.05em;margin-bottom:2px;">Workspace</div>
    <div style="padding:5px 8px;border-radius:6px;display:flex;align-items:center;gap:8px;cursor:pointer;background:#e7e7e5;color:#37352f;font-size:13px;font-weight:500;">
      <span>🏠</span> Home
    </div>
    <div style="padding:5px 8px;border-radius:6px;display:flex;align-items:center;gap:8px;cursor:pointer;color:#787774;font-size:13px;" onmouseover="this.style.background='#ebebea';this.style.color='#37352f'" onmouseout="this.style.background='transparent';this.style.color='#787774'">
      <span>📁</span> Progetti
    </div>
    <div style="padding:5px 8px;border-radius:6px;display:flex;align-items:center;gap:8px;cursor:pointer;color:#787774;font-size:13px;" onmouseover="this.style.background='#ebebea';this.style.color='#37352f'" onmouseout="this.style.background='transparent';this.style.color='#787774'">
      <span>✅</span> Tasks
    </div>
    <div style="padding:5px 8px;border-radius:6px;display:flex;align-items:center;gap:8px;cursor:pointer;color:#787774;font-size:13px;" onmouseover="this.style.background='#ebebea';this.style.color='#37352f'" onmouseout="this.style.background='transparent';this.style.color='#787774'">
      <span>🏁</span> Milestones
    </div>
    <div style="padding:5px 8px;border-radius:6px;display:flex;align-items:center;gap:8px;cursor:pointer;color:#787774;font-size:13px;" onmouseover="this.style.background='#ebebea';this.style.color='#37352f'" onmouseout="this.style.background='transparent';this.style.color='#787774'">
      <span>📅</span> Riunioni
    </div>
  </div>
  <div style="height:1px;background:#e9e9e7;margin:6px 12px;"></div>
  <div style="padding:4px 8px;">
    <div style="padding:2px 8px;font-size:11px;color:#9b9a97;font-weight:500;text-transform:uppercase;letter-spacing:.05em;margin-bottom:2px;">Pagine Private</div>
    <div style="padding:5px 8px;border-radius:6px;display:flex;align-items:center;gap:8px;cursor:pointer;color:#787774;font-size:13px;" onmouseover="this.style.background='#ebebea';this.style.color='#37352f'" onmouseout="this.style.background='transparent';this.style.color='#787774'">
      <span>📝</span> Le mie note
    </div>
    <div style="padding:5px 8px;border-radius:6px;display:flex;align-items:center;gap:8px;cursor:pointer;color:#787774;font-size:13px;" onmouseover="this.style.background='#ebebea';this.style.color='#37352f'" onmouseout="this.style.background='transparent';this.style.color='#787774'">
      <span>🗓️</span> Agenda
    </div>
    <div style="padding:5px 8px;border-radius:6px;display:flex;align-items:center;gap:8px;cursor:pointer;color:#787774;font-size:13px;" onmouseover="this.style.background='#ebebea';this.style.color='#37352f'" onmouseout="this.style.background='transparent';this.style.color='#787774'">
      <span>📊</span> Report KPI
    </div>
  </div>
  <div style="flex:1;"></div>
  <div style="padding:8px 16px;border-top:1px solid #e9e9e7;">
    <div style="display:flex;align-items:center;gap:8px;padding:6px 0;cursor:pointer;">
      <div style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:600;">MR</div>
      <div style="flex:1;overflow:hidden;">
        <div style="font-size:12px;font-weight:600;color:#37352f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Marco Rossi</div>
        <div style="font-size:11px;color:#9b9a97;">Project Manager</div>
      </div>
    </div>
  </div>
</div>

<!-- Main Content -->
<div style="flex:1;display:flex;flex-direction:column;overflow:hidden;">

  <!-- Top Bar -->
  <div style="padding:12px 24px 0;border-bottom:1px solid #e9e9e7;">
    <div style="display:flex;align-items:center;gap:4px;margin-bottom:12px;">
      <span style="color:#9b9a97;font-size:13px;">Project Hub</span>
      <span style="color:#9b9a97;font-size:13px;">/</span>
      <span style="color:#37352f;font-size:13px;font-weight:500;">Progetti</span>
    </div>
    <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:16px;">
      <h1 style="font-size:28px;font-weight:700;color:#37352f;margin:0;line-height:1.2;">📁 Progetti</h1>
    </div>
    <!-- View Tabs -->
    <div style="display:flex;align-items:center;gap:0;">
      <div id="tab-table" onclick="showView('table')" style="padding:6px 14px;font-size:13px;font-weight:500;color:#37352f;border-bottom:2px solid #37352f;cursor:pointer;display:flex;align-items:center;gap:6px;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg> Table
      </div>
      <div id="tab-board" onclick="showView('board')" style="padding:6px 14px;font-size:13px;font-weight:500;color:#9b9a97;border-bottom:2px solid transparent;cursor:pointer;display:flex;align-items:center;gap:6px;" onmouseover="if(currentView!=='board')this.style.color='#37352f'" onmouseout="if(currentView!=='board')this.style.color='#9b9a97'">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="5" height="18" rx="1"/><rect x="10" y="3" width="5" height="18" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg> Board
      </div>
      <div style="padding:6px 14px;font-size:13px;font-weight:500;color:#9b9a97;border-bottom:2px solid transparent;cursor:pointer;display:flex;align-items:center;gap:6px;" onmouseover="this.style.color='#37352f'" onmouseout="this.style.color='#9b9a97'">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg> Timeline
      </div>
      <div style="padding:6px 14px;font-size:13px;font-weight:500;color:#9b9a97;border-bottom:2px solid transparent;cursor:pointer;display:flex;align-items:center;gap:6px;" onmouseover="this.style.color='#37352f'" onmouseout="this.style.color='#9b9a97'">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> Gallery
      </div>
      <div style="margin-left:auto;padding-bottom:6px;display:flex;align-items:center;gap:8px;">
        <button style="padding:4px 10px;font-size:12px;border:1px solid #e9e9e7;border-radius:6px;background:#fff;color:#37352f;cursor:pointer;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='#f7f7f5'" onmouseout="this.style.background='#fff'">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg> Filtra
        </button>
        <button style="padding:4px 10px;font-size:12px;border:1px solid #e9e9e7;border-radius:6px;background:#fff;color:#37352f;cursor:pointer;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='#f7f7f5'" onmouseout="this.style.background='#fff'">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5h10M11 9H7m4 8h10M11 17H7m4-4h10M7 13H3"/></svg> Raggruppa
        </button>
        <button style="padding:4px 12px;font-size:12px;border:none;border-radius:6px;background:#37352f;color:#fff;cursor:pointer;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='#2f2f2d'" onmouseout="this.style.background='#37352f'">
          + Nuovo
        </button>
      </div>
    </div>
  </div>

  <!-- Content Area -->
  <div style="flex:1;overflow-y:auto;padding:16px 24px 32px;">

    <!-- TABLE VIEW -->
    <div id="view-table" style="display:block;">
      <table style="width:100%;border-collapse:collapse;table-layout:fixed;">
        <colgroup>
          <col style="width:280px;"/>
          <col style="width:130px;"/>
          <col style="width:120px;"/>
          <col style="width:110px;"/>
          <col style="width:130px;"/>
          <col style="width:80px;"/>
          <col style="width:110px;"/>
        </colgroup>
        <thead>
          <tr style="border-bottom:1px solid #e9e9e7;">
            <th style="text-align:left;padding:8px 12px;font-size:12px;font-weight:500;color:#9b9a97;font-weight:600;letter-spacing:.02em;">Nome</th>
            <th style="text-align:left;padding:8px 10px;font-size:12px;font-weight:500;color:#9b9a97;font-weight:600;letter-spacing:.02em;">Stato</th>
            <th style="text-align:left;padding:8px 10px;font-size:12px;font-weight:500;color:#9b9a97;font-weight:600;letter-spacing:.02em;">Priorità</th>
            <th style="text-align:left;padding:8px 10px;font-size:12px;font-weight:500;color:#9b9a97;font-weight:600;letter-spacing:.02em;">Owner</th>
            <th style="text-align:left;padding:8px 10px;font-size:12px;font-weight:500;color:#9b9a97;font-weight:600;letter-spacing:.02em;">Avanzamento</th>
            <th style="text-align:left;padding:8px 10px;font-size:12px;font-weight:500;color:#9b9a97;font-weight:600;letter-spacing:.02em;">Health</th>
            <th style="text-align:left;padding:8px 10px;font-size:12px;font-weight:500;color:#9b9a97;font-weight:600;letter-spacing:.02em;">Scadenza</th>
          </tr>
        </thead>
        <tbody>

          <!-- Row 1 -->
          <tr style="border-bottom:1px solid #f1f1ef;cursor:pointer;transition:background .1s;" onmouseover="this.style.background='#f9f9f8'" onmouseout="this.style.background='transparent'">
            <td style="padding:10px 12px;font-size:13px;color:#37352f;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              <div style="display:flex;align-items:center;gap:8px;">
                <span>🛒</span>
                <span>Redesign Sito E-commerce</span>
              </div>
            </td>
            <td style="padding:10px 10px;">
              <span style="background:#dbeafe;color:#1d4ed8;padding:2px 8px;border-radius:12px;font-size:12px;font-weight:500;white-space:nowrap;">In Corso</span>
            </td>
            <td style="padding:10px 10px;font-size:13px;">🔥 Critica</td>
            <td style="padding:10px 10px;">
              <div style="display:flex;align-items:center;gap:-4px;">
                <div title="Marco Rossi" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600;border:2px solid #fff;">MR</div>
                <div title="Giulia Bianchi" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#f093fb,#f5576c);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600;border:2px solid #fff;margin-left:-6px;">GB</div>
              </div>
            </td>
            <td style="padding:10px 10px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="flex:1;height:6px;background:#e9e9e7;border-radius:3px;overflow:hidden;max-width:80px;">
                  <div style="width:72%;height:100%;background:#2383e2;border-radius:3px;"></div>
                </div>
                <span style="font-size:12px;color:#787774;white-space:nowrap;">72%</span>
              </div>
            </td>
            <td style="padding:10px 10px;font-size:16px;">🟢</td>
            <td style="padding:10px 10px;font-size:12px;color:#787774;white-space:nowrap;">15 apr 2026</td>
          </tr>

          <!-- Row 2 -->
          <tr style="border-bottom:1px solid #f1f1ef;cursor:pointer;" onmouseover="this.style.background='#f9f9f8'" onmouseout="this.style.background='transparent'">
            <td style="padding:10px 12px;font-size:13px;color:#37352f;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              <div style="display:flex;align-items:center;gap:8px;"><span>📱</span><span>App Mobile CRM</span></div>
            </td>
            <td style="padding:10px 10px;">
              <span style="background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:12px;font-size:12px;font-weight:500;white-space:nowrap;">Pianificazione</span>
            </td>
            <td style="padding:10px 10px;font-size:13px;">🟠 Alta</td>
            <td style="padding:10px 10px;">
              <div style="display:flex;align-items:center;">
                <div title="Luca Ferrari" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#4facfe,#00f2fe);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600;border:2px solid #fff;">LF</div>
              </div>
            </td>
            <td style="padding:10px 10px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="flex:1;height:6px;background:#e9e9e7;border-radius:3px;overflow:hidden;max-width:80px;">
                  <div style="width:18%;height:100%;background:#2383e2;border-radius:3px;"></div>
                </div>
                <span style="font-size:12px;color:#787774;white-space:nowrap;">18%</span>
              </div>
            </td>
            <td style="padding:10px 10px;font-size:16px;">🟡</td>
            <td style="padding:10px 10px;font-size:12px;color:#787774;white-space:nowrap;">30 giu 2026</td>
          </tr>

          <!-- Row 3 -->
          <tr style="border-bottom:1px solid #f1f1ef;cursor:pointer;" onmouseover="this.style.background='#f9f9f8'" onmouseout="this.style.background='transparent'">
            <td style="padding:10px 12px;font-size:13px;color:#37352f;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              <div style="display:flex;align-items:center;gap:8px;"><span>📣</span><span>Campagna Marketing Q2</span></div>
            </td>
            <td style="padding:10px 10px;">
              <span style="background:#dbeafe;color:#1d4ed8;padding:2px 8px;border-radius:12px;font-size:12px;font-weight:500;white-space:nowrap;">In Corso</span>
            </td>
            <td style="padding:10px 10px;font-size:13px;">🟠 Alta</td>
            <td style="padding:10px 10px;">
              <div style="display:flex;align-items:center;">
                <div title="Giulia Bianchi" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#f093fb,#f5576c);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600;border:2px solid #fff;">GB</div>
                <div title="Sara Conti" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#43e97b,#38f9d7);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600;border:2px solid #fff;margin-left:-6px;">SC</div>
                <div title="Antonio Mele" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#fa709a,#fee140);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600;border:2px solid #fff;margin-left:-6px;">AM</div>
              </div>
            </td>
            <td style="padding:10px 10px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="flex:1;height:6px;background:#e9e9e7;border-radius:3px;overflow:hidden;max-width:80px;">
                  <div style="width:55%;height:100%;background:#2383e2;border-radius:3px;"></div>
                </div>
                <span style="font-size:12px;color:#787774;white-space:nowrap;">55%</span>
              </div>
            </td>
            <td style="padding:10px 10px;font-size:16px;">🟢</td>
            <td style="padding:10px 10px;font-size:12px;color:#787774;white-space:nowrap;">1 mag 2026</td>
          </tr>

          <!-- Row 4 -->
          <tr style="border-bottom:1px solid #f1f1ef;cursor:pointer;" onmouseover="this.style.background='#f9f9f8'" onmouseout="this.style.background='transparent'">
            <td style="padding:10px 12px;font-size:13px;color:#37352f;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              <div style="display:flex;align-items:center;gap:8px;"><span>🔒</span><span>Migrazione Cloud & Sicurezza</span></div>
            </td>
            <td style="padding:10px 10px;">
              <span style="background:#d1fae5;color:#065f46;padding:2px 8px;border-radius:12px;font-size:12px;font-weight:500;white-space:nowrap;">Completato</span>
            </td>
            <td style="padding:10px 10px;font-size:13px;">🔥 Critica</td>
            <td style="padding:10px 10px;">
              <div style="display:flex;align-items:center;">
                <div title="Marco Rossi" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600;border:2px solid #fff;">MR</div>
                <div title="Luca Ferrari" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#4facfe,#00f2fe);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600;border:2px solid #fff;margin-left:-6px;">LF</div>
              </div>
            </td>
            <td style="padding:10px 10px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="flex:1;height:6px;background:#e9e9e7;border-radius:3px;overflow:hidden;max-width:80px;">
                  <div style="width:100%;height:100%;background:#059669;border-radius:3px;"></div>
                </div>
                <span style="font-size:12px;color:#787774;white-space:nowrap;">100%</span>
              </div>
            </td>
            <td style="padding:10px 10px;font-size:16px;">🟢</td>
            <td style="padding:10px 10px;font-size:12px;color:#9b9a97;white-space:nowrap;text-decoration:line-through;">28 feb 2026</td>
          </tr>

          <!-- Row 5 -->
          <tr style="border-bottom:1px solid #f1f1ef;cursor:pointer;" onmouseover="this.style.background='#f9f9f8'" onmouseout="this.style.background='transparent'">
            <td style="padding:10px 12px;font-size:13px;color:#37352f;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              <div style="display:flex;align-items:center;gap:8px;"><span>📊</span><span>Dashboard Analytics Interna</span></div>
            </td>
            <td style="padding:10px 10px;">
              <span style="background:#f3f4f6;color:#6b7280;padding:2px 8px;border-radius:12px;font-size:12px;font-weight:500;white-space:nowrap;">In Attesa</span>
            </td>
            <td style="padding:10px 10px;font-size:13px;">🟡 Media</td>
            <td style="padding:10px 10px;">
              <div style="display:flex;align-items:center;">
                <div title="Sara Conti" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#43e97b,#38f9d7);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600;border:2px solid #fff;">SC</div>
              </div>
            </td>
            <td style="padding:10px 10px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="flex:1;height:6px;background:#e9e9e7;border-radius:3px;overflow:hidden;max-width:80px;">
                  <div style="width:0%;height:100%;background:#2383e2;border-radius:3px;"></div>
                </div>
                <span style="font-size:12px;color:#787774;white-space:nowrap;">0%</span>
              </div>
            </td>
            <td style="padding:10px 10px;font-size:16px;">🔴</td>
            <td style="padding:10px 10px;font-size:12px;color:#ef4444;white-space:nowrap;">10 mar 2026</td>
          </tr>

          <!-- Row 6 -->
          <tr style="border-bottom:1px solid #f1f1ef;cursor:pointer;" onmouseover="this.style.background='#f9f9f8'" onmouseout="this.style.background='transparent'">
            <td style="padding:10px 12px;font-size:13px;color:#37352f;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              <div style="display:flex;align-items:center;gap:8px;"><span>🤖</span><span>Integrazione AI Assistente Vendite</span></div>
            </td>
            <td style="padding:10px 10px;">
              <span style="background:#dbeafe;color:#1d4ed8;padding:2px 8px;border-radius:12px;font-size:12px;font-weight:500;white-space:nowrap;">In Corso</span>
            </td>
            <td style="padding:10px 10px;font-size:13px;">🟠 Alta</td>
            <td style="padding:10px 10px;">
              <div style="display:flex;align-items:center;">
                <div title="Antonio Mele" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#fa709a,#fee140);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600;border:2px solid #fff;">AM</div>
                <div title="Marco Rossi" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600;border:2px solid #fff;margin-left:-6px;">MR</div>
              </div>
            </td>
            <td style="padding:10px 10px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="flex:1;height:6px;background:#e9e9e7;border-radius:3px;overflow:hidden;max-width:80px;">
                  <div style="width:38%;height:100%;background:#2383e2;border-radius:3px;"></div>
                </div>
                <span style="font-size:12px;color:#787774;white-space:nowrap;">38%</span>
              </div>
            </td>
            <td style="padding:10px 10px;font-size:16px;">🟡</td>
            <td style="padding:10px 10px;font-size:12px;color:#787774;white-space:nowrap;">15 lug 2026</td>
          </tr>

          <!-- Row 7 -->
          <tr style="border-bottom:1px solid #f1f1ef;cursor:pointer;" onmouseover="this.style.background='#f9f9f8'" onmouseout="this.style.background='transparent'">
            <td style="padding:10px 12px;font-size:13px;color:#37352f;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              <div style="display:flex;align-items:center;gap:8px;"><span>🏢</span><span>Onboarding Nuovi Clienti</span></div>
            </td>
            <td style="padding:10px 10px;">
              <span style="background:#d1fae5;color:#065f46;padding:2px 8px;border-radius:12px;font-size:12px;font-weight:500;white-space:nowrap;">Completato</span>
            </td>
            <td style="padding:10px 10px;font-size:13px;">🟢 Bassa</td>
            <td style="padding:10px 10px;">
              <div style="display:flex;align-items:center;">
                <div title="Giulia Bianchi" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#f093fb,#f5576c);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600;border:2px solid #fff;">GB</div>
              </div>
            </td>
            <td style="padding:10px 10px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="flex:1;height:6px;background:#e9e9e7;border-radius:3px;overflow:hidden;max-width:80px;">
                  <div style="width:100%;height:100%;background:#059669;border-radius:3px;"></div>
                </div>
                <span style="font-size:12px;color:#787774;white-space:nowrap;">100%</span>
              </div>
            </td>
            <td style="padding:10px 10px;font-size:16px;">🟢</td>
            <td style="padding:10px 10px;font-size:12px;color:#9b9a97;white-space:nowrap;text-decoration:line-through;">15 gen 2026</td>
          </tr>

          <!-- Row 8 -->
          <tr style="border-bottom:1px solid #f1f1ef;cursor:pointer;" onmouseover="this.style.background='#f9f9f8'" onmouseout="this.style.background='transparent'">
            <td style="padding:10px 12px;font-size:13px;color:#37352f;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              <div style="display:flex;align-items:center;gap:8px;"><span>🌐</span><span>Portale Fornitori B2B</span></div>
            </td>
            <td style="padding:10px 10px;">
              <span style="background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:12px;font-size:12px;font-weight:500;white-space:nowrap;">Pianificazione</span>
            </td>
            <td style="padding:10px 10px;font-size:13px;">🟡 Media</td>
            <td style="padding:10px 10px;">
              <div style="display:flex;align-items:center;">
                <div title="Luca Ferrari" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#4facfe,#00f2fe);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600;border:2px solid #fff;">LF</div>
                <div title="Sara Conti" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#43e97b,#38f9d7);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600;border:2px solid #fff;margin-left:-6px;">SC</div>
              </div>
            </td>
            <td style="padding:10px 10px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="flex:1;height:6px;background:#e9e9e7;border-radius:3px;overflow:hidden;max-width:80px;">
                  <div style="width:8%;height:100%;background:#2383e2;border-radius:3px;"></div>
                </div>
                <span style="font-size:12px;color:#787774;white-space:nowrap;">8%</span>
              </div>
            </td>
            <td style="padding:10px 10px;font-size:16px;">🟡</td>
            <td style="padding:10px 10px;font-size:12px;color:#787774;white-space:nowrap;">31 ago 2026</td>
          </tr>

          <!-- Add Row -->
          <tr onmouseover="this.style.background='#f9f9f8'" onmouseout="this.style.background='transparent'">
            <td colspan="7" style="padding:8px 12px;">
              <span style="font-size:13px;color:#9b9a97;cursor:pointer;display:flex;align-items:center;gap:6px;" onmouseover="this.style.color='#37352f'" onmouseout="this.style.color='#9b9a97'">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Nuovo progetto
              </span>
            </td>
          </tr>

        </tbody>
      </table>

      <!-- Summary Bar -->
      <div style="margin-top:24px;padding:16px;background:#f7f7f5;border-radius:8px;border:1px solid #e9e9e7;display:flex;align-items:center;gap:32px;">
        <div style="text-align:center;">
          <div style="font-size:22px;font-weight:700;color:#37352f;">8</div>
          <div style="font-size:11px;color:#9b9a97;margin-top:2px;">Totale Progetti</div>
        </div>
        <div style="width:1px;height:36px;background:#e9e9e7;"></div>
        <div style="text-align:center;">
          <div style="font-size:22px;font-weight:700;color:#1d4ed8;">3</div>
          <div style="font-size:11px;color:#9b9a97;margin-top:2px;">In Corso</div>
        </div>
        <div style="width:1px;height:36px;background:#e9e9e7;"></div>
        <div style="text-align:center;">
          <div style="font-size:22px;font-weight:700;color:#059669;">2</div>
          <div style="font-size:11px;color:#9b9a97;margin-top:2px;">Completati</div>
        </div>
        <div style="width:1px;height:36px;background:#e9e9e7;"></div>
        <div style="text-align:center;">
          <div style="font-size:22px;font-weight:700;color:#92400e;">2</div>
          <div style="font-size:11px;color:#9b9a97;margin-top:2px;">Pianificazione</div>
        </div>
        <div style="width:1px;height:36px;background:#e9e9e7;"></div>
        <div style="text-align:center;">
          <div style="font-size:22px;font-weight:700;color:#6b7280;">1</div>
          <div style="font-size:11px;color:#9b9a97;margin-top:2px;">In Attesa</div>
        </div>
        <div style="width:1px;height:36px;background:#e9e9e7;"></div>
        <div style="flex:1;">
          <div style="font-size:11px;color:#9b9a97;margin-bottom:6px;">Avanzamento Medio</div>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="flex:1;height:8px;background:#e9e9e7;border-radius:4px;overflow:hidden;">
              <div style="width:49%;height:100%;background:linear-gradient(90deg,#2383e2,#059669);border-radius:4px;"></div>
            </div>
            <span style="font-size:13px;font-weight:600;color:#37352f;">49%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- BOARD VIEW -->
    <div id="view-board" style="display:none;">
      <div style="display:flex;gap:16px;padding:4px 0;min-height:420px;overflow-x:auto;">

        <!-- To Do Column -->
        <div style="min-width:240px;max-width:240px;display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 4px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <div style="width:8px;height:8px;border-radius:50%;background:#9b9a97;"></div>
              <span style="font-size:12px;font-weight:600;color:#787774;text-transform:uppercase;letter-spacing:.05em;">Da Fare</span>
              <span style="font-size:11px;color:#9b9a97;background:#f1f1ef;padding:1px 6px;border-radius:10px;">3</span>
            </div>
          </div>
          <div style="background:#f7f7f5;border:1px solid #e9e9e7;border-radius:8px;padding:10px 12px;cursor:pointer;" onmouseover="this.style.background='#f1f1ef'" onmouseout="this.style.background='#f7f7f5'">
            <div style="font-size:13px;font-weight:500;color:#37352f;margin-bottom:8px;">Analisi competitiva SEO</div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="font-size:11px;color:#9b9a97;">📣 Marketing Q2</span>
              <div style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#f093fb,#f5576c);display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:600;">GB</div>
            </div>
          </div>
          <div style="background:#f7f7f5;border:1px solid #e9e9e7;border-radius:8px;padding:10px 12px;cursor:pointer;" onmouseover="this.style.background='#f1f1ef'" onmouseout="this.style.background='#f7f7f5'">
            <div style="font-size:13px;font-weight:500;color:#37352f;margin-bottom:8px;">Setup ambiente di staging</div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="font-size:11px;color:#9b9a97;">🌐 Portale B2B</span>
              <div style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#4facfe,#00f2fe);display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:600;">LF</div>
            </div>
          </div>
          <div style="background:#f7f7f5;border:1px solid #e9e9e7;border-radius:8px;padding:10px 12px;cursor:pointer;" onmouseover="this.style.background='#f1f1ef'" onmouseout="this.style.background='#f7f7f5'">
            <div style="font-size:13px;font-weight:500;color:#37352f;margin-bottom:4px;">Definire requisiti UX</div>
            <div style="font-size:11px;color:#ef4444;margin-bottom:6px;">Scaduto: 10 mar</div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="font-size:11px;color:#9b9a97;">📊 Dashboard</span>
              <div style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#43e97b,#38f9d7);display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:600;">SC</div>
            </div>
          </div>
          <div style="padding:8px 4px;border:1px dashed #d9d9d7;border-radius:8px;text-align:center;cursor:pointer;color:#9b9a97;font-size:12px;" onmouseover="this.style.background='#f7f7f5';this.style.color='#787774'" onmouseout="this.style.background='transparent';this.style.color='#9b9a97'">+ Aggiungi task</div>
        </div>

        <!-- In Progress Column -->
        <div style="min-width:240px;max-width:240px;display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 4px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <div style="width:8px;height:8px;border-radius:50%;background:#2383e2;"></div>
              <span style="font-size:12px;font-weight:600;color:#787774;text-transform:uppercase;letter-spacing:.05em;">In Corso</span>
              <span style="font-size:11px;color:#9b9a97;background:#f1f1ef;padding:1px 6px;border-radius:10px;">4</span>
            </div>
          </div>
          <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:10px 12px;cursor:pointer;" onmouseover="this.style.background='#dbeafe'" onmouseout="this.style.background='#eff6ff'">
            <div style="font-size:13px;font-weight:500;color:#37352f;margin-bottom:4px;">Sviluppo checkout flow</div>
            <div style="height:4px;background:#bfdbfe;border-radius:2px;margin-bottom:8px;overflow:hidden;"><div style="width:65%;height:100%;background:#2383e2;border-radius:2px;"></div></div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="font-size:11px;color:#9b9a97;">🛒 E-commerce</span>
              <div style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:600;">MR</div>
            </div>
          </div>
          <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:10px 12px;cursor:pointer;" onmouseover="this.style.background='#dbeafe'" onmouseout="this.style.background='#eff6ff'">
            <div style="font-size:13px;font-weight:500;color:#37352f;margin-bottom:4px;">API integration Salesforce</div>
            <div style="height:4px;background:#bfdbfe;border-radius:2px;margin-bottom:8px;overflow:hidden;"><div style="width:40%;height:100%;background:#2383e2;border-radius:2px;"></div></div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="font-size:11px;color:#9b9a97;">🤖 AI Assistente</span>
              <div style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#fa709a,#fee140);display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:600;">AM</div>
            </div>
          </div>
          <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:10px 12px;cursor:pointer;" onmouseover="this.style.background='#dbeafe'" onmouseout="this.style.background='#eff6ff'">
            <div style="font-size:13px;font-weight:500;color:#37352f;margin-bottom:4px;">Social media calendar</div>
            <div style="height:4px;background:#bfdbfe;border-radius:2px;margin-bottom:8px;overflow:hidden;"><div style="width:80%;height:100%;background:#2383e2;border-radius:2px;"></div></div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="font-size:11px;color:#9b9a97;">📣 Marketing Q2</span>
              <div style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#f093fb,#f5576c);display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:600;">GB</div>
            </div>
          </div>
          <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:10px 12px;cursor:pointer;" onmouseover="this.style.background='#dbeafe'" onmouseout="this.style.background='#eff6ff'">
            <div style="font-size:13px;font-weight:500;color:#37352f;margin-bottom:4px;">Prototipo UI schermata home</div>
            <div style="height:4px;background:#bfdbfe;border-radius:2px;margin-bottom:8px;overflow:hidden;"><div style="width:55%;height:100%;background:#2383e2;border-radius:2px;"></div></div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="font-size:11px;color:#9b9a97;">📱 App CRM</span>
              <div style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#4facfe,#00f2fe);display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:600;">LF</div>
            </div>
          </div>
          <div style="padding:8px 4px;border:1px dashed #bfdbfe;border-radius:8px;text-align:center;cursor:pointer;color:#9b9a97;font-size:12px;" onmouseover="this.style.background='#eff6ff';this.style.color='#787774'" onmouseout="this.style.background='transparent';this.style.color='#9b9a97'">+ Aggiungi task</div>
        </div>

        <!-- In Review Column -->
        <div style="min-width:240px;max-width:240px;display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 4px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <div style="width:8px;height:8px;border-radius:50%;background:#f59e0b;"></div>
              <span style="font-size:12px;font-weight:600;color:#787774;text-transform:uppercase;letter-spacing:.05em;">In Revisione</span>
              <span style="font-size:11px;color:#9b9a97;background:#f1f1ef;padding:1px 6px;border-radius:10px;">2</span>
            </div>
          </div>
          <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:10px 12px;cursor:pointer;" onmouseover="this.style.background='#fef3c7'" onmouseout="this.style.background='#fffbeb'">
            <div style="font-size:13px;font-weight:500;color:#37352f;margin-bottom:4px;">Copy campagna email DEM</div>
            <div style="font-size:11px;color:#92400e;margin-bottom:6px;">🔴 Feedback richiesto</div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="font-size:11px;color:#9b9a97;">📣 Marketing Q2</span>
              <div style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#43e97b,#38f9d7);display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:600;">SC</div>
            </div>
          </div>
          <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:10px 12px;cursor:pointer;" onmouseover="this.style.background='#fef3c7'" onmouseout="this.style.background='#fffbeb'">
            <div style="font-size:13px;font-weight:500;color:#37352f;margin-bottom:8px;">Test A/B landing page</div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="font-size:11px;color:#9b9a97;">🛒 E-commerce</span>
              <div style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:600;">MR</div>
            </div>
          </div>
          <div style="padding:8px 4px;border:1px dashed #fde68a;border-radius:8px;text-align:center;cursor:pointer;color:#9b9a97;font-size:12px;" onmouseover="this.style.background='#fffbeb';this.style.color='#787774'" onmouseout="this.style.background='transparent';this.style.color='#9b9a97'">+ Aggiungi task</div>
        </div>

        <!-- Done Column -->
        <div style="min-width:240px;max-width:240px;display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 4px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <div style="width:8px;height:8px;border-radius:50%;background:#059669;"></div>
              <span style="font-size:12px;font-weight:600;color:#787774;text-transform:uppercase;letter-spacing:.05em;">Completato</span>
              <span style="font-size:11px;color:#9b9a97;background:#f1f1ef;padding:1px 6px;border-radius:10px;">5</span>
            </div>
          </div>
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px 12px;cursor:pointer;opacity:.85;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='.85'">
            <div style="font-size:13px;font-weight:500;color:#37352f;margin-bottom:4px;text-decoration:line-through;color:#9b9a97;">Audit sicurezza infrastruttura</div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="font-size:11px;color:#9b9a97;">🔒 Cloud & Security</span>
              <div style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:600;">MR</div>
            </div>
          </div>
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px 12px;cursor:pointer;opacity:.85;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='.85'">
            <div style="font-size:13px;font-weight:500;color:#9b9a97;margin-bottom:4px;text-decoration:line-through;">Documentazione API REST</div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="font-size:11px;color:#9b9a97;">🔒 Cloud & Security</span>
              <div style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#4facfe,#00f2fe);display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:600;">LF</div>
            </div>
          </div>
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px 12px;cursor:pointer;opacity:.85;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='.85'">
            <div style="font-size:13px;font-weight:500;color:#9b9a97;margin-bottom:4px;text-decoration:line-through;">Video tutorial onboarding</div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="font-size:11px;color:#9b9a97;">🏢 Onboarding Clienti</span>
              <div style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#f093fb,#f5576c);display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:600;">GB</div>
            </div>
          </div>
          <div style="padding:8px 4px;border:1px dashed #bbf7d0;border-radius:8px;text-align:center;cursor:pointer;color:#9b9a97;font-size:12px;" onmouseover="this.style.background='#f0fdf4';this.style.color='#787774'" onmouseout="this.style.background='transparent';this.style.color='#9b9a97'">+ Aggiungi task</div>
        </div>

      </div>
    </div>

  </div>
</div>

<script>
var currentView = 'table';
function showView(view) {
  currentView = view;
  document.getElementById('view-table').style.display = view === 'table' ? 'block' : 'none';
  document.getElementById('view-board').style.display = view === 'board' ? 'block' : 'none';
  var tabTable = document.getElementById('tab-table');
  var tabBoard = document.getElementById('tab-board');
  if (view === 'table') {
    tabTable.style.color = '#37352f'; tabTable.style.borderBottomColor = '#37352f';
    tabBoard.style.color = '#9b9a97'; tabBoard.style.borderBottomColor = 'transparent';
  } else {
    tabBoard.style.color = '#37352f'; tabBoard.style.borderBottomColor = '#37352f';
    tabTable.style.color = '#9b9a97'; tabTable.style.borderBottomColor = 'transparent';
  }
}
</script>

</div>`,
  },
  {
    id: "notion-freelancer-crm",
    name: "Notion Freelancer CRM",
    category: "ui",
    price: 1299,
    stripePriceId: "price_1TCIgBBoWNgrJbiyTSZ5qOHG",
    downloadType: "notion",
    downloadUrl: "", // TODO: incolla qui il link di duplicazione Notion
    tags: ["notion", "crm", "freelance", "clients", "invoices"],
    downloads: 312,
    description: "Manage clients, projects, invoices and follow-ups in one Notion database.",
    isNew: true,
    editorsPick: false,
    content: `<div style="font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; display: flex; height: 100vh; background: #fff; color: #37352f; overflow: hidden;">

  <!-- Sidebar -->
  <aside style="width: 240px; min-width: 240px; background: #f7f6f3; border-right: 1px solid #e8e8e5; display: flex; flex-direction: column; padding: 12px 0; overflow-y: auto;">
    <div style="padding: 0 12px 12px; border-bottom: 1px solid #e8e8e5; margin-bottom: 8px;">
      <div style="display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 6px; cursor: pointer;">
        <div style="width: 28px; height: 28px; background: #2f3437; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 13px; font-weight: 700;">F</div>
        <div>
          <div style="font-size: 13px; font-weight: 600; color: #37352f;">Freelancer Hub</div>
          <div style="font-size: 11px; color: #9b9a97;">Piano Pro</div>
        </div>
      </div>
    </div>
    <nav style="padding: 0 8px; flex: 1;">
      <div style="margin-bottom: 4px;">
        <a href="#" style="display: flex; align-items: center; gap: 8px; padding: 5px 8px; border-radius: 4px; background: #e8e7e4; color: #37352f; text-decoration: none; font-size: 13px; font-weight: 500;">
          <span>📊</span> Business Dashboard
        </a>
      </div>
      <div style="margin-top: 12px; margin-bottom: 4px; padding: 0 8px;">
        <span style="font-size: 11px; font-weight: 600; color: #9b9a97; text-transform: uppercase; letter-spacing: 0.05em;">CRM</span>
      </div>
      <div style="margin-bottom: 2px;">
        <a href="#" style="display: flex; align-items: center; gap: 8px; padding: 5px 8px; border-radius: 4px; color: #37352f; text-decoration: none; font-size: 13px;">
          <span>👥</span> Clients
        </a>
      </div>
      <div style="margin-bottom: 2px;">
        <a href="#" style="display: flex; align-items: center; gap: 8px; padding: 5px 8px; border-radius: 4px; color: #37352f; text-decoration: none; font-size: 13px;">
          <span>📁</span> Projects
        </a>
      </div>
      <div style="margin-bottom: 2px;">
        <a href="#" style="display: flex; align-items: center; gap: 8px; padding: 5px 8px; border-radius: 4px; color: #37352f; text-decoration: none; font-size: 13px;">
          <span>⏱️</span> Time Log
        </a>
      </div>
      <div style="margin-top: 12px; margin-bottom: 4px; padding: 0 8px;">
        <span style="font-size: 11px; font-weight: 600; color: #9b9a97; text-transform: uppercase; letter-spacing: 0.05em;">Finanze</span>
      </div>
      <div style="margin-bottom: 2px;">
        <a href="#" style="display: flex; align-items: center; gap: 8px; padding: 5px 8px; border-radius: 4px; color: #37352f; text-decoration: none; font-size: 13px;">
          <span>🧾</span> Invoices
        </a>
      </div>
      <div style="margin-bottom: 2px;">
        <a href="#" style="display: flex; align-items: center; gap: 8px; padding: 5px 8px; border-radius: 4px; color: #37352f; text-decoration: none; font-size: 13px;">
          <span>💼</span> Services
        </a>
      </div>
      <div style="margin-bottom: 2px;">
        <a href="#" style="display: flex; align-items: center; gap: 8px; padding: 5px 8px; border-radius: 4px; color: #37352f; text-decoration: none; font-size: 13px;">
          <span>🎯</span> Leads
        </a>
      </div>
    </nav>
    <div style="padding: 8px 16px; border-top: 1px solid #e8e8e5; margin-top: 8px;">
      <div style="font-size: 11px; color: #9b9a97;">Marco Bianchi</div>
      <div style="font-size: 11px; color: #9b9a97;">marco@studiodesign.it</div>
    </div>
  </aside>

  <!-- Main Content -->
  <main style="flex: 1; overflow-y: auto; display: flex; flex-direction: column;">

    <!-- Top Bar -->
    <div style="padding: 16px 32px 0; border-bottom: 1px solid #e8e8e5; position: sticky; top: 0; background: #fff; z-index: 10;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <div>
          <div style="font-size: 11px; color: #9b9a97; margin-bottom: 2px;">CRM</div>
          <h1 style="font-size: 24px; font-weight: 700; color: #37352f; margin: 0;">Clients Pipeline</h1>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button style="display: flex; align-items: center; gap: 6px; padding: 6px 12px; background: #fff; border: 1px solid #e8e8e5; border-radius: 6px; font-size: 13px; cursor: pointer; color: #37352f;">
            🔍 Filtra
          </button>
          <button style="display: flex; align-items: center; gap: 6px; padding: 6px 12px; background: #37352f; border: none; border-radius: 6px; font-size: 13px; cursor: pointer; color: #fff; font-weight: 500;">
            + New Client
          </button>
        </div>
      </div>
      <!-- Revenue Callout -->
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px 16px; margin-bottom: 12px; display: flex; gap: 24px; align-items: center;">
        <span style="font-size: 12px; font-weight: 600; color: #166534;">📈 Fatturato MTD: <strong>€12.450</strong></span>
        <span style="color: #bbf7d0;">|</span>
        <span style="font-size: 12px; color: #166534;">🎯 Obiettivo: <strong>€15.000</strong></span>
        <span style="color: #bbf7d0;">|</span>
        <span style="font-size: 12px; color: #b45309; font-weight: 600;">💰 Da incassare: <strong>€3.200</strong></span>
        <div style="margin-left: auto;">
          <div style="background: #bbf7d0; height: 6px; width: 180px; border-radius: 99px; overflow: hidden;">
            <div style="background: #16a34a; height: 100%; width: 83%;"></div>
          </div>
          <div style="font-size: 10px; color: #166534; margin-top: 2px; text-align: right;">83% dell'obiettivo</div>
        </div>
      </div>
      <!-- View Tabs -->
      <div style="display: flex; gap: 0; margin-bottom: -1px;">
        <button style="padding: 7px 14px; font-size: 13px; border: none; background: none; border-bottom: 2px solid #37352f; color: #37352f; font-weight: 600; cursor: pointer;">🗂 Pipeline</button>
        <button style="padding: 7px 14px; font-size: 13px; border: none; background: none; border-bottom: 2px solid transparent; color: #9b9a97; cursor: pointer;">📋 Tabella</button>
        <button style="padding: 7px 14px; font-size: 13px; border: none; background: none; border-bottom: 2px solid transparent; color: #9b9a97; cursor: pointer;">📆 Calendario</button>
        <button style="padding: 7px 14px; font-size: 13px; border: none; background: none; border-bottom: 2px solid transparent; color: #9b9a97; cursor: pointer;">📊 Statistiche</button>
      </div>
    </div>

    <!-- Kanban Board -->
    <div style="padding: 24px 32px; overflow-x: auto;">
      <div style="display: flex; gap: 16px; min-width: max-content;">

        <!-- Col: Lead -->
        <div style="width: 240px; min-width: 240px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 13px;">🟡</span>
              <span style="font-size: 13px; font-weight: 600; color: #37352f;">Lead</span>
              <span style="background: #f1f0ef; color: #6b6b6b; font-size: 11px; padding: 1px 6px; border-radius: 99px; font-weight: 500;">3</span>
            </div>
            <button style="background: none; border: none; color: #9b9a97; font-size: 16px; cursor: pointer; line-height: 1;">+</button>
          </div>

          <!-- Card 1 -->
          <div style="background: #fff; border: 1px solid #e8e8e5; border-radius: 8px; padding: 12px; margin-bottom: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
            <div style="font-size: 13px; font-weight: 600; color: #37352f; margin-bottom: 4px;">Officine Rossi Srl</div>
            <div style="font-size: 12px; color: #9b9a97; margin-bottom: 8px;">Giulia Ferretti</div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #fef9c3; color: #92400e; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 99px;">LinkedIn</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: #37352f; font-weight: 500;">—</span>
              <span style="font-size: 11px; color: #9b9a97;">📅 28 mar</span>
            </div>
          </div>

          <!-- Card 2 -->
          <div style="background: #fff; border: 1px solid #e8e8e5; border-radius: 8px; padding: 12px; margin-bottom: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
            <div style="font-size: 13px; font-weight: 600; color: #37352f; margin-bottom: 4px;">Studi Legali Conti</div>
            <div style="font-size: 12px; color: #9b9a97; margin-bottom: 8px;">Avv. Marco Conti</div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #dbeafe; color: #1e40af; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 99px;">Referral</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: #37352f; font-weight: 500;">—</span>
              <span style="font-size: 11px; color: #9b9a97;">📅 25 mar</span>
            </div>
          </div>

          <!-- Card 3 -->
          <div style="background: #fff; border: 1px solid #e8e8e5; border-radius: 8px; padding: 12px; margin-bottom: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
            <div style="font-size: 13px; font-weight: 600; color: #37352f; margin-bottom: 4px;">FoodTech Italia</div>
            <div style="font-size: 12px; color: #9b9a97; margin-bottom: 8px;">Simone Gatti</div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #f3e8ff; color: #7c3aed; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 99px;">Evento</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: #37352f; font-weight: 500;">—</span>
              <span style="font-size: 11px; color: #9b9a97;">📅 30 mar</span>
            </div>
          </div>
        </div>

        <!-- Col: In trattativa -->
        <div style="width: 240px; min-width: 240px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 13px;">📞</span>
              <span style="font-size: 13px; font-weight: 600; color: #37352f;">In trattativa</span>
              <span style="background: #f1f0ef; color: #6b6b6b; font-size: 11px; padding: 1px 6px; border-radius: 99px; font-weight: 500;">3</span>
            </div>
            <button style="background: none; border: none; color: #9b9a97; font-size: 16px; cursor: pointer; line-height: 1;">+</button>
          </div>

          <!-- Card 4 -->
          <div style="background: #fff; border: 1px solid #e8e8e5; border-radius: 8px; padding: 12px; margin-bottom: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
            <div style="font-size: 13px; font-weight: 600; color: #37352f; margin-bottom: 4px;">Gruppo Moda Milano</div>
            <div style="font-size: 12px; color: #9b9a97; margin-bottom: 8px;">Elena Colombo</div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #fef9c3; color: #92400e; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 99px;">LinkedIn</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: #37352f; font-weight: 500;">€3.500</span>
              <span style="font-size: 11px; color: #9b9a97;">📅 24 mar</span>
            </div>
          </div>

          <!-- Card 5 -->
          <div style="background: #fff; border: 1px solid #e8e8e5; border-radius: 8px; padding: 12px; margin-bottom: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
            <div style="font-size: 13px; font-weight: 600; color: #37352f; margin-bottom: 4px;">FinEdge Consulting</div>
            <div style="font-size: 12px; color: #9b9a97; margin-bottom: 8px;">Roberto Mantovani</div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #dbeafe; color: #1e40af; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 99px;">Referral</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: #37352f; font-weight: 500;">€5.200</span>
              <span style="font-size: 11px; color: #9b9a97;">📅 23 mar</span>
            </div>
          </div>

          <!-- Card 6 -->
          <div style="background: #fff; border: 1px solid #e8e8e5; border-radius: 8px; padding: 12px; margin-bottom: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
            <div style="font-size: 13px; font-weight: 600; color: #37352f; margin-bottom: 4px;">Digital Pulse Agency</div>
            <div style="font-size: 12px; color: #9b9a97; margin-bottom: 8px;">Chiara Rizzo</div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #fee2e2; color: #991b1b; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 99px;">Sito Web</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: #37352f; font-weight: 500;">€2.800</span>
              <span style="font-size: 11px; color: #9b9a97;">📅 27 mar</span>
            </div>
          </div>
        </div>

        <!-- Col: Active -->
        <div style="width: 240px; min-width: 240px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 13px;">🟢</span>
              <span style="font-size: 13px; font-weight: 600; color: #37352f;">Active</span>
              <span style="background: #f1f0ef; color: #6b6b6b; font-size: 11px; padding: 1px 6px; border-radius: 99px; font-weight: 500;">4</span>
            </div>
            <button style="background: none; border: none; color: #9b9a97; font-size: 16px; cursor: pointer; line-height: 1;">+</button>
          </div>

          <!-- Card 7 -->
          <div style="background: #fff; border: 1px solid #e8e8e5; border-radius: 8px; padding: 12px; margin-bottom: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
            <div style="font-size: 13px; font-weight: 600; color: #37352f; margin-bottom: 4px;">Nexo Tech Srl</div>
            <div style="font-size: 12px; color: #9b9a97; margin-bottom: 8px;">Luca De Angelis</div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #dbeafe; color: #1e40af; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 99px;">Referral</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: #37352f; font-weight: 500;">€8.400</span>
              <span style="font-size: 11px; color: #9b9a97;">📅 01 apr</span>
            </div>
          </div>

          <!-- Card 8 -->
          <div style="background: #fff; border: 1px solid #e8e8e5; border-radius: 8px; padding: 12px; margin-bottom: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
            <div style="font-size: 13px; font-weight: 600; color: #37352f; margin-bottom: 4px;">VivaFarm Bio</div>
            <div style="font-size: 12px; color: #9b9a97; margin-bottom: 8px;">Paola Greco</div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #dcfce7; color: #166534; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 99px;">Instagram</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: #37352f; font-weight: 500;">€4.200</span>
              <span style="font-size: 11px; color: #9b9a97;">📅 05 apr</span>
            </div>
          </div>

          <!-- Card 9 -->
          <div style="background: #fff; border: 1px solid #e8e8e5; border-radius: 8px; padding: 12px; margin-bottom: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
            <div style="font-size: 13px; font-weight: 600; color: #37352f; margin-bottom: 4px;">Architetti Fuori Studio</div>
            <div style="font-size: 12px; color: #9b9a97; margin-bottom: 8px;">Filippo Martinelli</div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #f3e8ff; color: #7c3aed; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 99px;">Evento</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: #37352f; font-weight: 500;">€6.100</span>
              <span style="font-size: 11px; color: #9b9a97;">📅 02 apr</span>
            </div>
          </div>

          <!-- Card 10 -->
          <div style="background: #fff; border: 1px solid #e8e8e5; border-radius: 8px; padding: 12px; margin-bottom: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
            <div style="font-size: 13px; font-weight: 600; color: #37352f; margin-bottom: 4px;">TurboLogistica SpA</div>
            <div style="font-size: 12px; color: #9b9a97; margin-bottom: 8px;">Andrea Caruso</div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #fef9c3; color: #92400e; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 99px;">LinkedIn</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: #37352f; font-weight: 500;">€9.750</span>
              <span style="font-size: 11px; color: #9b9a97;">📅 08 apr</span>
            </div>
          </div>
        </div>

        <!-- Col: Retainer -->
        <div style="width: 240px; min-width: 240px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 13px;">🔁</span>
              <span style="font-size: 13px; font-weight: 600; color: #37352f;">Retainer</span>
              <span style="background: #f1f0ef; color: #6b6b6b; font-size: 11px; padding: 1px 6px; border-radius: 99px; font-weight: 500;">3</span>
            </div>
            <button style="background: none; border: none; color: #9b9a97; font-size: 16px; cursor: pointer; line-height: 1;">+</button>
          </div>

          <!-- Card 11 -->
          <div style="background: #fff; border: 1px solid #e8e8e5; border-radius: 8px; padding: 12px; margin-bottom: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
            <div style="font-size: 13px; font-weight: 600; color: #37352f; margin-bottom: 4px;">Medianova Studio</div>
            <div style="font-size: 12px; color: #9b9a97; margin-bottom: 8px;">Sara Fontana</div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #dbeafe; color: #1e40af; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 99px;">Referral</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: #37352f; font-weight: 500;">€18.200</span>
              <span style="font-size: 11px; color: #9b9a97;">📅 01 mag</span>
            </div>
          </div>

          <!-- Card 12 -->
          <div style="background: #fff; border: 1px solid #e8e8e5; border-radius: 8px; padding: 12px; margin-bottom: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
            <div style="font-size: 13px; font-weight: 600; color: #37352f; margin-bottom: 4px;">EduKids Platform</div>
            <div style="font-size: 12px; color: #9b9a97; margin-bottom: 8px;">Lorenzo Neri</div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #dcfce7; color: #166534; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 99px;">Podcast</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: #37352f; font-weight: 500;">€11.600</span>
              <span style="font-size: 11px; color: #9b9a97;">📅 01 mag</span>
            </div>
          </div>

          <!-- Card 13 -->
          <div style="background: #fff; border: 1px solid #e8e8e5; border-radius: 8px; padding: 12px; margin-bottom: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
            <div style="font-size: 13px; font-weight: 600; color: #37352f; margin-bottom: 4px;">WellnessFirst Srl</div>
            <div style="font-size: 12px; color: #9b9a97; margin-bottom: 8px;">Valentina Serra</div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #fee2e2; color: #991b1b; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 99px;">Sito Web</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: #37352f; font-weight: 500;">€9.000</span>
              <span style="font-size: 11px; color: #9b9a97;">📅 15 mag</span>
            </div>
          </div>
        </div>

        <!-- Col: Churned -->
        <div style="width: 240px; min-width: 240px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 13px;">🔴</span>
              <span style="font-size: 13px; font-weight: 600; color: #37352f;">Churned</span>
              <span style="background: #f1f0ef; color: #6b6b6b; font-size: 11px; padding: 1px 6px; border-radius: 99px; font-weight: 500;">2</span>
            </div>
            <button style="background: none; border: none; color: #9b9a97; font-size: 16px; cursor: pointer; line-height: 1;">+</button>
          </div>

          <!-- Card 14 -->
          <div style="background: #fff; border: 1px solid #e8e8e5; border-radius: 8px; padding: 12px; margin-bottom: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); opacity: 0.65;">
            <div style="font-size: 13px; font-weight: 600; color: #37352f; margin-bottom: 4px;">RetailMax Spa</div>
            <div style="font-size: 12px; color: #9b9a97; margin-bottom: 8px;">Giorgio Esposito</div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #fef9c3; color: #92400e; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 99px;">LinkedIn</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: #37352f; font-weight: 500;">€2.400</span>
              <span style="font-size: 11px; color: #9b9a97;">—</span>
            </div>
          </div>

          <!-- Card 15 -->
          <div style="background: #fff; border: 1px solid #e8e8e5; border-radius: 8px; padding: 12px; margin-bottom: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); opacity: 0.65;">
            <div style="font-size: 13px; font-weight: 600; color: #37352f; margin-bottom: 4px;">StartupHub Torino</div>
            <div style="font-size: 12px; color: #9b9a97; margin-bottom: 8px;">Marta Vitale</div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #f3e8ff; color: #7c3aed; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 99px;">Evento</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: #37352f; font-weight: 500;">€1.800</span>
              <span style="font-size: 11px; color: #9b9a97;">—</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Divider -->
    <div style="padding: 0 32px; margin-bottom: 8px;">
      <div style="border-top: 1px solid #e8e8e5;"></div>
    </div>

    <!-- Invoices Section -->
    <div style="padding: 0 32px 40px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <div>
          <h2 style="font-size: 18px; font-weight: 700; color: #37352f; margin: 0 0 2px 0;">🧾 Invoices</h2>
          <p style="font-size: 12px; color: #9b9a97; margin: 0;">Gestione fatture e pagamenti</p>
        </div>
        <button style="padding: 6px 12px; background: #fff; border: 1px solid #e8e8e5; border-radius: 6px; font-size: 13px; cursor: pointer; color: #37352f;">+ Nuova Fattura</button>
      </div>
      <div style="border: 1px solid #e8e8e5; border-radius: 8px; overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background: #f7f6f3; border-bottom: 1px solid #e8e8e5;">
              <th style="text-align: left; padding: 10px 16px; font-weight: 600; color: #6b6b6b; font-size: 12px;">#</th>
              <th style="text-align: left; padding: 10px 16px; font-weight: 600; color: #6b6b6b; font-size: 12px;">Cliente</th>
              <th style="text-align: right; padding: 10px 16px; font-weight: 600; color: #6b6b6b; font-size: 12px;">Importo (€)</th>
              <th style="text-align: right; padding: 10px 16px; font-weight: 600; color: #6b6b6b; font-size: 12px;">IVA</th>
              <th style="text-align: left; padding: 10px 16px; font-weight: 600; color: #6b6b6b; font-size: 12px;">Stato</th>
              <th style="text-align: left; padding: 10px 16px; font-weight: 600; color: #6b6b6b; font-size: 12px;">Scadenza</th>
              <th style="text-align: right; padding: 10px 16px; font-weight: 600; color: #6b6b6b; font-size: 12px;">GG Scaduta</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #f0eeec;">
              <td style="padding: 11px 16px; color: #9b9a97; font-family: monospace; font-size: 12px;">FT-2024-031</td>
              <td style="padding: 11px 16px; font-weight: 500; color: #37352f;">Nexo Tech Srl</td>
              <td style="padding: 11px 16px; text-align: right; font-weight: 600; color: #37352f;">2.800,00</td>
              <td style="padding: 11px 16px; text-align: right; color: #9b9a97;">22%</td>
              <td style="padding: 11px 16px;">
                <span style="background: #dcfce7; color: #166534; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 99px;">Pagata</span>
              </td>
              <td style="padding: 11px 16px; color: #9b9a97;">15 mar 2024</td>
              <td style="padding: 11px 16px; text-align: right; color: #9b9a97;">—</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0eeec;">
              <td style="padding: 11px 16px; color: #9b9a97; font-family: monospace; font-size: 12px;">FT-2024-032</td>
              <td style="padding: 11px 16px; font-weight: 500; color: #37352f;">Medianova Studio</td>
              <td style="padding: 11px 16px; text-align: right; font-weight: 600; color: #37352f;">1.500,00</td>
              <td style="padding: 11px 16px; text-align: right; color: #9b9a97;">22%</td>
              <td style="padding: 11px 16px;">
                <span style="background: #dcfce7; color: #166534; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 99px;">Pagata</span>
              </td>
              <td style="padding: 11px 16px; color: #9b9a97;">20 mar 2024</td>
              <td style="padding: 11px 16px; text-align: right; color: #9b9a97;">—</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0eeec;">
              <td style="padding: 11px 16px; color: #9b9a97; font-family: monospace; font-size: 12px;">FT-2024-033</td>
              <td style="padding: 11px 16px; font-weight: 500; color: #37352f;">VivaFarm Bio</td>
              <td style="padding: 11px 16px; text-align: right; font-weight: 600; color: #37352f;">900,00</td>
              <td style="padding: 11px 16px; text-align: right; color: #9b9a97;">22%</td>
              <td style="padding: 11px 16px;">
                <span style="background: #dbeafe; color: #1e40af; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 99px;">Inviata</span>
              </td>
              <td style="padding: 11px 16px; color: #9b9a97;">30 mar 2024</td>
              <td style="padding: 11px 16px; text-align: right; color: #9b9a97;">—</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0eeec; background: #fffbeb;">
              <td style="padding: 11px 16px; color: #9b9a97; font-family: monospace; font-size: 12px;">FT-2024-030</td>
              <td style="padding: 11px 16px; font-weight: 500; color: #37352f;">TurboLogistica SpA</td>
              <td style="padding: 11px 16px; text-align: right; font-weight: 600; color: #37352f;">3.200,00</td>
              <td style="padding: 11px 16px; text-align: right; color: #9b9a97;">22%</td>
              <td style="padding: 11px 16px;">
                <span style="background: #fef3c7; color: #92400e; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 99px;">Scaduta</span>
              </td>
              <td style="padding: 11px 16px; color: #b45309;">05 mar 2024</td>
              <td style="padding: 11px 16px; text-align: right; color: #dc2626; font-weight: 600;">+17</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0eeec; background: #fff5f5;">
              <td style="padding: 11px 16px; color: #9b9a97; font-family: monospace; font-size: 12px;">FT-2024-028</td>
              <td style="padding: 11px 16px; font-weight: 500; color: #37352f;">Gruppo Moda Milano</td>
              <td style="padding: 11px 16px; text-align: right; font-weight: 600; color: #37352f;">1.750,00</td>
              <td style="padding: 11px 16px; text-align: right; color: #9b9a97;">22%</td>
              <td style="padding: 11px 16px;">
                <span style="background: #fee2e2; color: #991b1b; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 99px;">Scaduta</span>
              </td>
              <td style="padding: 11px 16px; color: #dc2626;">25 feb 2024</td>
              <td style="padding: 11px 16px; text-align: right; color: #dc2626; font-weight: 600;">+25</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0eeec;">
              <td style="padding: 11px 16px; color: #9b9a97; font-family: monospace; font-size: 12px;">FT-2024-034</td>
              <td style="padding: 11px 16px; font-weight: 500; color: #37352f;">EduKids Platform</td>
              <td style="padding: 11px 16px; text-align: right; font-weight: 600; color: #37352f;">1.500,00</td>
              <td style="padding: 11px 16px; text-align: right; color: #9b9a97;">22%</td>
              <td style="padding: 11px 16px;">
                <span style="background: #f3f4f6; color: #6b7280; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 99px;">Bozza</span>
              </td>
              <td style="padding: 11px 16px; color: #9b9a97;">10 apr 2024</td>
              <td style="padding: 11px 16px; text-align: right; color: #9b9a97;">—</td>
            </tr>
            <tr>
              <td style="padding: 11px 16px; color: #9b9a97; font-family: monospace; font-size: 12px;">FT-2024-035</td>
              <td style="padding: 11px 16px; font-weight: 500; color: #37352f;">WellnessFirst Srl</td>
              <td style="padding: 11px 16px; text-align: right; font-weight: 600; color: #37352f;">2.250,00</td>
              <td style="padding: 11px 16px; text-align: right; color: #9b9a97;">22%</td>
              <td style="padding: 11px 16px;">
                <span style="background: #f3f4f6; color: #6b7280; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 99px;">Bozza</span>
              </td>
              <td style="padding: 11px 16px; color: #9b9a97;">15 apr 2024</td>
              <td style="padding: 11px 16px; text-align: right; color: #9b9a97;">—</td>
            </tr>
          </tbody>
          <tfoot>
            <tr style="background: #f7f6f3; border-top: 2px solid #e8e8e5;">
              <td colspan="2" style="padding: 10px 16px; font-weight: 600; color: #37352f; font-size: 12px;">Totale (7 fatture)</td>
              <td style="padding: 10px 16px; text-align: right; font-weight: 700; color: #37352f;">13.900,00</td>
              <td colspan="4"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

  </main>
</div>`,
  },
  {
    id: "notion-content-calendar",
    name: "Notion Content Calendar",
    category: "ui",
    price: 999,
    stripePriceId: "price_1TCIgCBoWNgrJbiyLKZj4e5L",
    downloadType: "notion",
    downloadUrl: "", // TODO: incolla qui il link di duplicazione Notion
    tags: ["notion", "content", "social media", "calendar", "marketing"],
    downloads: 445,
    description: "Plan, schedule and track content across all channels with status tracking.",
    isNew: true,
    editorsPick: true,
    content: `<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: { inter: ['Inter', 'sans-serif'] },
        colors: {
          notion: {
            bg: '#191919',
            sidebar: '#202020',
            hover: '#2d2d2d',
            border: '#2f2f2f',
            text: '#e3e3e3',
            muted: '#9b9b9b',
            accent: '#5865f2',
          }
        }
      }
    }
  }
</script>
<style>
  * { box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: #191919; color: #e3e3e3; margin: 0; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #3d3d3d; border-radius: 3px; }
  .notion-icon { font-size: 14px; width: 18px; display: inline-block; text-align: center; }
  .cal-cell { min-height: 100px; }
  .card-chip { font-size: 10px; line-height: 1.2; padding: 3px 6px; border-radius: 4px; font-weight: 500; }
  .status-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
  .tab-active { background: #2d2d2d; color: #e3e3e3; }
  .sidebar-item { display: flex; align-items: center; gap: 8px; padding: 5px 12px; border-radius: 5px; cursor: pointer; font-size: 13.5px; color: #9b9b9b; transition: background 0.12s; }
  .sidebar-item:hover, .sidebar-item.active { background: #2d2d2d; color: #e3e3e3; }
  .sidebar-item.active { color: #e3e3e3; }
  .badge { font-size: 10px; background: #3d3d3d; color: #9b9b9b; border-radius: 10px; padding: 1px 7px; margin-left: auto; }
  table { border-collapse: collapse; }
  th, td { text-align: left; }
</style>

<div class="flex h-screen overflow-hidden dark">

  <!-- Sidebar -->
  <aside style="width:220px;min-width:220px;background:#202020;border-right:1px solid #2f2f2f;" class="flex flex-col py-4 overflow-y-auto">

    <!-- Workspace header -->
    <div class="px-4 mb-4">
      <div class="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#2d2d2d] cursor-pointer">
        <div style="width:26px;height:26px;background:linear-gradient(135deg,#7c3aed,#2563eb);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:13px;">✦</div>
        <div>
          <div style="font-size:13px;font-weight:600;color:#e3e3e3;">Forma</div>
          <div style="font-size:10px;color:#6b6b6b;">Content Team</div>
        </div>
        <svg style="margin-left:auto;color:#6b6b6b;" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
      </div>
    </div>

    <!-- Nav -->
    <div class="px-2 space-y-0.5">
      <div style="font-size:11px;color:#5b5b5b;font-weight:600;letter-spacing:.06em;padding:4px 12px 6px;">WORKSPACE</div>

      <div class="sidebar-item active">
        <span class="notion-icon">📋</span> Content Hub
        <span class="badge">29</span>
      </div>
      <div class="sidebar-item">
        <span class="notion-icon">📅</span> Calendar
      </div>
      <div class="sidebar-item">
        <span class="notion-icon">💡</span> Ideas
        <span class="badge">12</span>
      </div>
      <div class="sidebar-item">
        <span class="notion-icon">📊</span> Analytics
      </div>
      <div class="sidebar-item">
        <span class="notion-icon">🗂️</span> Templates
      </div>
      <div class="sidebar-item">
        <span class="notion-icon">📡</span> Channels
      </div>

      <div style="font-size:11px;color:#5b5b5b;font-weight:600;letter-spacing:.06em;padding:14px 12px 6px;">CANALI</div>
      <div class="sidebar-item">
        <span class="notion-icon">📸</span> Instagram
      </div>
      <div class="sidebar-item">
        <span class="notion-icon">🐦</span> Twitter / X
      </div>
      <div class="sidebar-item">
        <span class="notion-icon">📹</span> YouTube
      </div>
      <div class="sidebar-item">
        <span class="notion-icon">📝</span> Blog
      </div>
      <div class="sidebar-item">
        <span class="notion-icon">💼</span> LinkedIn
      </div>
    </div>

    <!-- Bottom -->
    <div class="mt-auto px-2 pt-4 border-t border-[#2f2f2f]">
      <div class="sidebar-item">
        <span class="notion-icon">⚙️</span> Impostazioni
      </div>
      <div class="flex items-center gap-2 px-3 pt-3">
        <div style="width:26px;height:26px;background:#374151;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;color:#9ca3af;">MC</div>
        <div>
          <div style="font-size:12px;color:#e3e3e3;font-weight:500;">Marco C.</div>
          <div style="font-size:10px;color:#6b6b6b;">Editor</div>
        </div>
      </div>
    </div>
  </aside>

  <!-- Main -->
  <main class="flex-1 flex flex-col overflow-hidden" style="background:#191919;">

    <!-- Top toolbar -->
    <header style="border-bottom:1px solid #2f2f2f;padding:12px 24px;display:flex;align-items:center;gap:12px;flex-shrink:0;">
      <div>
        <div style="font-size:11px;color:#6b6b6b;margin-bottom:2px;">Content Hub /</div>
        <div style="font-size:18px;font-weight:700;color:#e3e3e3;display:flex;align-items:center;gap:8px;">📋 Content Calendar</div>
      </div>

      <!-- View tabs -->
      <div style="margin-left:auto;display:flex;align-items:center;gap:4px;background:#242424;border:1px solid #2f2f2f;border-radius:7px;padding:3px;">
        <button class="tab-active" style="font-size:12px;font-weight:500;padding:4px 12px;border-radius:5px;border:none;cursor:pointer;">📅 Calendar</button>
        <button style="font-size:12px;color:#6b6b6b;padding:4px 12px;border-radius:5px;border:none;background:transparent;cursor:pointer;">🗃️ Board</button>
        <button style="font-size:12px;color:#6b6b6b;padding:4px 12px;border-radius:5px;border:none;background:transparent;cursor:pointer;">☰ Table</button>
        <button style="font-size:12px;color:#6b6b6b;padding:4px 12px;border-radius:5px;border:none;background:transparent;cursor:pointer;">🖼️ Gallery</button>
      </div>

      <button style="font-size:12px;background:#5865f2;color:#fff;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-weight:500;">+ Nuovo contenuto</button>
    </header>

    <!-- Stats bar -->
    <div style="background:#1f1f1f;border-bottom:1px solid #2f2f2f;padding:8px 24px;display:flex;align-items:center;gap:24px;flex-shrink:0;">
      <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#9b9b9b;">
        <span class="status-dot" style="background:#4ade80;"></span>
        <span style="color:#e3e3e3;font-weight:600;">Pubblicati:</span> 18
      </div>
      <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#9b9b9b;">
        <span class="status-dot" style="background:#facc15;"></span>
        <span style="color:#e3e3e3;font-weight:600;">Schedulati:</span> 7
      </div>
      <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#9b9b9b;">
        <span class="status-dot" style="background:#60a5fa;"></span>
        <span style="color:#e3e3e3;font-weight:600;">Bozze:</span> 4
      </div>
      <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#9b9b9b;">
        <span style="color:#e3e3e3;font-weight:600;">Engagement medio:</span> 4.2%
      </div>
      <div style="margin-left:auto;display:flex;align-items:center;gap:8px;">
        <button style="font-size:11px;color:#9b9b9b;background:#2d2d2d;border:1px solid #3d3d3d;padding:4px 10px;border-radius:5px;cursor:pointer;">⟨ Feb</button>
        <span style="font-size:13px;font-weight:600;color:#e3e3e3;">Marzo 2026</span>
        <button style="font-size:11px;color:#9b9b9b;background:#2d2d2d;border:1px solid #3d3d3d;padding:4px 10px;border-radius:5px;cursor:pointer;">Apr ⟩</button>
      </div>
    </div>

    <!-- Scrollable content -->
    <div class="flex-1 overflow-y-auto" style="padding:20px 24px;">

      <!-- Calendar Grid -->
      <div style="background:#1e1e1e;border:1px solid #2f2f2f;border-radius:10px;overflow:hidden;margin-bottom:28px;">

        <!-- Day headers -->
        <div style="display:grid;grid-template-columns:repeat(7,1fr);border-bottom:1px solid #2f2f2f;">
          <div style="padding:8px 12px;font-size:11px;font-weight:600;color:#6b6b6b;letter-spacing:.05em;">LUN</div>
          <div style="padding:8px 12px;font-size:11px;font-weight:600;color:#6b6b6b;letter-spacing:.05em;">MAR</div>
          <div style="padding:8px 12px;font-size:11px;font-weight:600;color:#6b6b6b;letter-spacing:.05em;">MER</div>
          <div style="padding:8px 12px;font-size:11px;font-weight:600;color:#6b6b6b;letter-spacing:.05em;">GIO</div>
          <div style="padding:8px 12px;font-size:11px;font-weight:600;color:#6b6b6b;letter-spacing:.05em;">VEN</div>
          <div style="padding:8px 12px;font-size:11px;font-weight:600;color:#5b5b5b;letter-spacing:.05em;">SAB</div>
          <div style="padding:8px 12px;font-size:11px;font-weight:600;color:#5b5b5b;letter-spacing:.05em;">DOM</div>
        </div>

        <!-- Week 1: Mar starts Sunday → offset 6 from Mon -->
        <div style="display:grid;grid-template-columns:repeat(7,1fr);border-bottom:1px solid #2f2f2f;">
          <!-- Mon 23 Feb (prev month) -->
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;background:#1a1a1a;">
            <div style="font-size:11px;color:#3d3d3d;margin-bottom:4px;">23</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;background:#1a1a1a;">
            <div style="font-size:11px;color:#3d3d3d;margin-bottom:4px;">24</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;background:#1a1a1a;">
            <div style="font-size:11px;color:#3d3d3d;margin-bottom:4px;">25</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;background:#1a1a1a;">
            <div style="font-size:11px;color:#3d3d3d;margin-bottom:4px;">26</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;background:#1a1a1a;">
            <div style="font-size:11px;color:#3d3d3d;margin-bottom:4px;">27</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;background:#1a1a1a;">
            <div style="font-size:11px;color:#3d3d3d;margin-bottom:4px;">28</div>
          </div>
          <!-- Sun 1 Mar -->
          <div class="cal-cell" style="padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">1</div>
            <div class="card-chip" style="background:#1e3a2f;color:#4ade80;margin-bottom:3px;">📝 Blog · <span style="font-size:9px;">✅</span></div>
          </div>
        </div>

        <!-- Week 2: 2–8 -->
        <div style="display:grid;grid-template-columns:repeat(7,1fr);border-bottom:1px solid #2f2f2f;">
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">2</div>
            <div class="card-chip" style="background:#1e2a4a;color:#60a5fa;margin-bottom:3px;">📸 IG Reel</div>
            <div class="card-chip" style="background:#1e3a2f;color:#4ade80;margin-bottom:3px;">💼 LinkedIn</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">3</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">4</div>
            <div class="card-chip" style="background:#2a2010;color:#facc15;margin-bottom:3px;">🐦 Thread</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">5</div>
            <div class="card-chip" style="background:#2a1a10;color:#fb923c;margin-bottom:3px;">📹 YouTube</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">6</div>
            <div class="card-chip" style="background:#1e3a2f;color:#4ade80;margin-bottom:3px;">📸 Carousel</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;background:#1c1c1c;">
            <div style="font-size:11px;color:#6b6b6b;margin-bottom:4px;">7</div>
          </div>
          <div class="cal-cell" style="padding:8px;background:#1c1c1c;">
            <div style="font-size:11px;color:#6b6b6b;margin-bottom:4px;">8</div>
          </div>
        </div>

        <!-- Week 3: 9–15 -->
        <div style="display:grid;grid-template-columns:repeat(7,1fr);border-bottom:1px solid #2f2f2f;">
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">9</div>
            <div class="card-chip" style="background:#1e2a4a;color:#60a5fa;margin-bottom:3px;">📝 Blog Post</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">10</div>
            <div class="card-chip" style="background:#1e3a2f;color:#4ade80;margin-bottom:3px;">💼 Case Study</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">11</div>
            <div class="card-chip" style="background:#1e3a2f;color:#4ade80;margin-bottom:3px;">📸 Story</div>
            <div class="card-chip" style="background:#2a2010;color:#facc15;margin-bottom:3px;">🐦 Tweet</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">12</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">13</div>
            <div class="card-chip" style="background:#2a1a10;color:#fb923c;margin-bottom:3px;">📹 Tutorial</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;background:#1c1c1c;">
            <div style="font-size:11px;color:#6b6b6b;margin-bottom:4px;">14</div>
          </div>
          <div class="cal-cell" style="padding:8px;background:#1c1c1c;">
            <div style="font-size:11px;color:#6b6b6b;margin-bottom:4px;">15</div>
          </div>
        </div>

        <!-- Week 4: 16–22 (today = 22) -->
        <div style="display:grid;grid-template-columns:repeat(7,1fr);border-bottom:1px solid #2f2f2f;">
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">16</div>
            <div class="card-chip" style="background:#1e2a4a;color:#60a5fa;margin-bottom:3px;">📝 Newsletter</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">17</div>
            <div class="card-chip" style="background:#1e3a2f;color:#4ade80;margin-bottom:3px;">📸 Reel</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">18</div>
            <div class="card-chip" style="background:#1e3a2f;color:#4ade80;margin-bottom:3px;">💼 Post</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">19</div>
            <div class="card-chip" style="background:#2a2010;color:#facc15;margin-bottom:3px;">🐦 Thread</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">20</div>
            <div class="card-chip" style="background:#1e2a4a;color:#60a5fa;margin-bottom:3px;">📝 Blog</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;background:#1c1c1c;">
            <div style="font-size:11px;color:#6b6b6b;margin-bottom:4px;">21</div>
          </div>
          <!-- Today -->
          <div class="cal-cell" style="padding:8px;border:2px solid #5865f2;border-radius:0;position:relative;">
            <div style="font-size:11px;font-weight:700;color:#818cf8;margin-bottom:4px;">22 ●</div>
            <div class="card-chip" style="background:#2d1f4d;color:#a78bfa;margin-bottom:3px;">📸 Workshop BTS</div>
          </div>
        </div>

        <!-- Week 5: 23–29 -->
        <div style="display:grid;grid-template-columns:repeat(7,1fr);border-bottom:1px solid #2f2f2f;">
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">23</div>
            <div class="card-chip" style="background:#2a1a10;color:#fb923c;margin-bottom:3px;">📹 YouTube</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">24</div>
            <div class="card-chip" style="background:#2a2010;color:#facc15;margin-bottom:3px;">💼 Articolo</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">25</div>
            <div class="card-chip" style="background:#1e2a4a;color:#60a5fa;margin-bottom:3px;">📸 Carosello</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">26</div>
            <div class="card-chip" style="background:#2a1a10;color:#fb923c;margin-bottom:3px;">📝 Guide</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">27</div>
            <div class="card-chip" style="background:#2a2010;color:#facc15;margin-bottom:3px;">🐦 Tweet</div>
            <div class="card-chip" style="background:#1e3a2f;color:#4ade80;margin-bottom:3px;">📸 Story</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;background:#1c1c1c;">
            <div style="font-size:11px;color:#6b6b6b;margin-bottom:4px;">28</div>
          </div>
          <div class="cal-cell" style="padding:8px;background:#1c1c1c;">
            <div style="font-size:11px;color:#6b6b6b;margin-bottom:4px;">29</div>
          </div>
        </div>

        <!-- Week 6: 30–31 + April filler -->
        <div style="display:grid;grid-template-columns:repeat(7,1fr);">
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">30</div>
            <div class="card-chip" style="background:#2a2010;color:#facc15;margin-bottom:3px;">📹 Recap Mese</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;">
            <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">31</div>
            <div class="card-chip" style="background:#1e2a4a;color:#60a5fa;margin-bottom:3px;">📝 Newsletter</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;background:#1a1a1a;">
            <div style="font-size:11px;color:#3d3d3d;margin-bottom:4px;">1</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;background:#1a1a1a;">
            <div style="font-size:11px;color:#3d3d3d;margin-bottom:4px;">2</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;background:#1a1a1a;">
            <div style="font-size:11px;color:#3d3d3d;margin-bottom:4px;">3</div>
          </div>
          <div class="cal-cell" style="border-right:1px solid #2f2f2f;padding:8px;background:#1a1a1a;">
            <div style="font-size:11px;color:#3d3d3d;margin-bottom:4px;">4</div>
          </div>
          <div class="cal-cell" style="padding:8px;background:#1a1a1a;">
            <div style="font-size:11px;color:#3d3d3d;margin-bottom:4px;">5</div>
          </div>
        </div>

      </div><!-- /calendar -->

      <!-- This Week Table -->
      <div style="background:#1e1e1e;border:1px solid #2f2f2f;border-radius:10px;overflow:hidden;">

        <div style="padding:14px 20px;border-bottom:1px solid #2f2f2f;display:flex;align-items:center;justify-content:space-between;">
          <div style="font-size:14px;font-weight:600;color:#e3e3e3;">☰ Questa Settimana <span style="font-size:12px;font-weight:400;color:#6b6b6b;margin-left:6px;">16 – 22 marzo</span></div>
          <button style="font-size:11px;color:#9b9b9b;background:#2d2d2d;border:1px solid #3d3d3d;padding:4px 10px;border-radius:5px;cursor:pointer;">+ Aggiungi riga</button>
        </div>

        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:#1a1a1a;">
                <th style="padding:8px 16px;font-size:11px;font-weight:600;color:#6b6b6b;letter-spacing:.05em;border-bottom:1px solid #2f2f2f;white-space:nowrap;">TITOLO</th>
                <th style="padding:8px 12px;font-size:11px;font-weight:600;color:#6b6b6b;letter-spacing:.05em;border-bottom:1px solid #2f2f2f;white-space:nowrap;">CANALE</th>
                <th style="padding:8px 12px;font-size:11px;font-weight:600;color:#6b6b6b;letter-spacing:.05em;border-bottom:1px solid #2f2f2f;white-space:nowrap;">TIPO</th>
                <th style="padding:8px 12px;font-size:11px;font-weight:600;color:#6b6b6b;letter-spacing:.05em;border-bottom:1px solid #2f2f2f;white-space:nowrap;">STATO</th>
                <th style="padding:8px 12px;font-size:11px;font-weight:600;color:#6b6b6b;letter-spacing:.05em;border-bottom:1px solid #2f2f2f;white-space:nowrap;">PUBBL.</th>
                <th style="padding:8px 12px;font-size:11px;font-weight:600;color:#6b6b6b;letter-spacing:.05em;border-bottom:1px solid #2f2f2f;white-space:nowrap;">ENGAGEMENT</th>
              </tr>
            </thead>
            <tbody>

              <!-- Row 1 -->
              <tr style="border-bottom:1px solid #242424;" onmouseover="this.style.background='#242424'" onmouseout="this.style.background='transparent'">
                <td style="padding:10px 16px;font-size:13px;color:#e3e3e3;white-space:nowrap;">5 Errori da Evitare nel Web Design</td>
                <td style="padding:10px 12px;font-size:12px;color:#9b9b9b;">📝 Blog</td>
                <td style="padding:10px 12px;"><span style="font-size:11px;background:#2d2d2d;color:#9b9b9b;padding:2px 8px;border-radius:10px;">Articolo</span></td>
                <td style="padding:10px 12px;"><span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;color:#4ade80;"><span class="status-dot" style="background:#4ade80;"></span>Pubblicato</span></td>
                <td style="padding:10px 12px;font-size:12px;color:#6b6b6b;">16 mar</td>
                <td style="padding:10px 12px;font-size:12px;color:#a78bfa;font-weight:500;">6.1%</td>
              </tr>

              <!-- Row 2 -->
              <tr style="border-bottom:1px solid #242424;" onmouseover="this.style.background='#242424'" onmouseout="this.style.background='transparent'">
                <td style="padding:10px 16px;font-size:13px;color:#e3e3e3;white-space:nowrap;">Behind the Scenes: Workshop Milano</td>
                <td style="padding:10px 12px;font-size:12px;color:#9b9b9b;">📸 Instagram</td>
                <td style="padding:10px 12px;"><span style="font-size:11px;background:#2d2d2d;color:#9b9b9b;padding:2px 8px;border-radius:10px;">Reel</span></td>
                <td style="padding:10px 12px;"><span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;color:#4ade80;"><span class="status-dot" style="background:#4ade80;"></span>Pubblicato</span></td>
                <td style="padding:10px 12px;font-size:12px;color:#6b6b6b;">17 mar</td>
                <td style="padding:10px 12px;font-size:12px;color:#a78bfa;font-weight:500;">8.4%</td>
              </tr>

              <!-- Row 3 -->
              <tr style="border-bottom:1px solid #242424;" onmouseover="this.style.background='#242424'" onmouseout="this.style.background='transparent'">
                <td style="padding:10px 16px;font-size:13px;color:#e3e3e3;white-space:nowrap;">Come Usare l'AI per la Tua Strategia Social</td>
                <td style="padding:10px 12px;font-size:12px;color:#9b9b9b;">💼 LinkedIn</td>
                <td style="padding:10px 12px;"><span style="font-size:11px;background:#2d2d2d;color:#9b9b9b;padding:2px 8px;border-radius:10px;">Post</span></td>
                <td style="padding:10px 12px;"><span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;color:#4ade80;"><span class="status-dot" style="background:#4ade80;"></span>Pubblicato</span></td>
                <td style="padding:10px 12px;font-size:12px;color:#6b6b6b;">18 mar</td>
                <td style="padding:10px 12px;font-size:12px;color:#a78bfa;font-weight:500;">5.7%</td>
              </tr>

              <!-- Row 4 -->
              <tr style="border-bottom:1px solid #242424;" onmouseover="this.style.background='#242424'" onmouseout="this.style.background='transparent'">
                <td style="padding:10px 16px;font-size:13px;color:#e3e3e3;white-space:nowrap;">Trend Design 2026: Quello che Devi Sapere</td>
                <td style="padding:10px 12px;font-size:12px;color:#9b9b9b;">🐦 Twitter / X</td>
                <td style="padding:10px 12px;"><span style="font-size:11px;background:#2d2d2d;color:#9b9b9b;padding:2px 8px;border-radius:10px;">Thread</span></td>
                <td style="padding:10px 12px;"><span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;color:#facc15;"><span class="status-dot" style="background:#facc15;"></span>Schedulato</span></td>
                <td style="padding:10px 12px;font-size:12px;color:#6b6b6b;">19 mar</td>
                <td style="padding:10px 12px;font-size:12px;color:#5b5b5b;">—</td>
              </tr>

              <!-- Row 5 -->
              <tr style="border-bottom:1px solid #242424;" onmouseover="this.style.background='#242424'" onmouseout="this.style.background='transparent'">
                <td style="padding:10px 16px;font-size:13px;color:#e3e3e3;white-space:nowrap;">Guida Completa a Tailwind CSS 4.0</td>
                <td style="padding:10px 12px;font-size:12px;color:#9b9b9b;">📝 Blog</td>
                <td style="padding:10px 12px;"><span style="font-size:11px;background:#2d2d2d;color:#9b9b9b;padding:2px 8px;border-radius:10px;">Articolo</span></td>
                <td style="padding:10px 12px;"><span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;color:#facc15;"><span class="status-dot" style="background:#facc15;"></span>Schedulato</span></td>
                <td style="padding:10px 12px;font-size:12px;color:#6b6b6b;">20 mar</td>
                <td style="padding:10px 12px;font-size:12px;color:#5b5b5b;">—</td>
              </tr>

              <!-- Row 6 -->
              <tr style="border-bottom:1px solid #242424;" onmouseover="this.style.background='#242424'" onmouseout="this.style.background='transparent'">
                <td style="padding:10px 16px;font-size:13px;color:#e3e3e3;white-space:nowrap;">Workshop Milano: Il Recap in 60 Secondi</td>
                <td style="padding:10px 12px;font-size:12px;color:#9b9b9b;">📸 Instagram</td>
                <td style="padding:10px 12px;"><span style="font-size:11px;background:#2d2d2d;color:#9b9b9b;padding:2px 8px;border-radius:10px;">Reel</span></td>
                <td style="padding:10px 12px;"><span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;color:#fb923c;"><span class="status-dot" style="background:#fb923c;"></span>In Review</span></td>
                <td style="padding:10px 12px;font-size:12px;color:#6b6b6b;">22 mar</td>
                <td style="padding:10px 12px;font-size:12px;color:#5b5b5b;">—</td>
              </tr>

              <!-- Row 7 -->
              <tr style="border-bottom:1px solid #242424;" onmouseover="this.style.background='#242424'" onmouseout="this.style.background='transparent'">
                <td style="padding:10px 16px;font-size:13px;color:#e3e3e3;white-space:nowrap;">Da Freelance a Studio: La Mia Storia</td>
                <td style="padding:10px 12px;font-size:12px;color:#9b9b9b;">📹 YouTube</td>
                <td style="padding:10px 12px;"><span style="font-size:11px;background:#2d2d2d;color:#9b9b9b;padding:2px 8px;border-radius:10px;">Video</span></td>
                <td style="padding:10px 12px;"><span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;color:#60a5fa;"><span class="status-dot" style="background:#60a5fa;"></span>Bozza</span></td>
                <td style="padding:10px 12px;font-size:12px;color:#6b6b6b;">23 mar</td>
                <td style="padding:10px 12px;font-size:12px;color:#5b5b5b;">—</td>
              </tr>

              <!-- Row 8 -->
              <tr style="border-bottom:1px solid #242424;" onmouseover="this.style.background='#242424'" onmouseout="this.style.background='transparent'">
                <td style="padding:10px 16px;font-size:13px;color:#e3e3e3;white-space:nowrap;">10 Tool Gratuiti per Designer nel 2026</td>
                <td style="padding:10px 12px;font-size:12px;color:#9b9b9b;">💼 LinkedIn</td>
                <td style="padding:10px 12px;"><span style="font-size:11px;background:#2d2d2d;color:#9b9b9b;padding:2px 8px;border-radius:10px;">Articolo</span></td>
                <td style="padding:10px 12px;"><span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;color:#facc15;"><span class="status-dot" style="background:#facc15;"></span>Schedulato</span></td>
                <td style="padding:10px 12px;font-size:12px;color:#6b6b6b;">24 mar</td>
                <td style="padding:10px 12px;font-size:12px;color:#5b5b5b;">—</td>
              </tr>

              <!-- Row 9 -->
              <tr style="border-bottom:1px solid #242424;" onmouseover="this.style.background='#242424'" onmouseout="this.style.background='transparent'">
                <td style="padding:10px 16px;font-size:13px;color:#e3e3e3;white-space:nowrap;">Ottimizza il Tuo Portfolio in 5 Passi</td>
                <td style="padding:10px 12px;font-size:12px;color:#9b9b9b;">📸 Instagram</td>
                <td style="padding:10px 12px;"><span style="font-size:11px;background:#2d2d2d;color:#9b9b9b;padding:2px 8px;border-radius:10px;">Carosello</span></td>
                <td style="padding:10px 12px;"><span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;color:#60a5fa;"><span class="status-dot" style="background:#60a5fa;"></span>Bozza</span></td>
                <td style="padding:10px 12px;font-size:12px;color:#6b6b6b;">25 mar</td>
                <td style="padding:10px 12px;font-size:12px;color:#5b5b5b;">—</td>
              </tr>

              <!-- Row 10 -->
              <tr onmouseover="this.style.background='#242424'" onmouseout="this.style.background='transparent'">
                <td style="padding:10px 16px;font-size:13px;color:#e3e3e3;white-space:nowrap;">Recap Mensile: Marzo in Numeri</td>
                <td style="padding:10px 12px;font-size:12px;color:#9b9b9b;">📹 YouTube</td>
                <td style="padding:10px 12px;"><span style="font-size:11px;background:#2d2d2d;color:#9b9b9b;padding:2px 8px;border-radius:10px;">Video</span></td>
                <td style="padding:10px 12px;"><span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;color:#60a5fa;"><span class="status-dot" style="background:#60a5fa;"></span>Bozza</span></td>
                <td style="padding:10px 12px;font-size:12px;color:#6b6b6b;">30 mar</td>
                <td style="padding:10px 12px;font-size:12px;color:#5b5b5b;">—</td>
              </tr>

            </tbody>
          </table>
        </div>

        <!-- Table footer -->
        <div style="padding:10px 16px;border-top:1px solid #2f2f2f;display:flex;align-items:center;gap:8px;">
          <button style="font-size:12px;color:#6b6b6b;background:transparent;border:none;cursor:pointer;padding:2px 4px;">+ Nuova riga</button>
          <span style="font-size:11px;color:#3d3d3d;margin-left:auto;">10 elementi · ordinati per data</span>
        </div>

      </div><!-- /table -->

      <div style="height:32px;"></div>

    </div><!-- /scrollable content -->

  </main>

</div>
`,
  },
  {
    id: "notion-finance-tracker",
    name: "Notion Personal Finance Tracker",
    category: "ui",
    price: 1299,
    stripePriceId: "price_1TCIgDBoWNgrJbiyzQGqse0q",
    downloadType: "notion",
    downloadUrl: "", // TODO: incolla qui il link di duplicazione Notion
    tags: ["notion", "finance", "budget", "savings", "money"],
    downloads: 298,
    description: "Track income, expenses, savings goals and net worth in Notion.",
    isNew: true,
    editorsPick: false,
    content: `<div class="flex h-screen bg-[#1f1f1f] font-[system-ui,-apple-system,sans-serif] text-[#e2e2e2] overflow-hidden">

  <!-- Sidebar -->
  <aside class="w-56 bg-[#191919] flex flex-col py-4 px-2 shrink-0 border-r border-white/5">
    <!-- Workspace header -->
    <div class="flex items-center gap-2 px-3 py-2 mb-4">
      <div class="w-6 h-6 rounded bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">F</div>
      <span class="text-sm font-semibold text-[#e2e2e2] truncate">Finance Dashboard</span>
    </div>

    <!-- Nav items -->
    <nav class="flex flex-col gap-0.5 text-sm">
      <a href="#" class="flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-white/10 text-white font-medium">
        <span class="text-base">📊</span> Dashboard
      </a>
      <a href="#" class="flex items-center gap-2.5 px-3 py-1.5 rounded-md hover:bg-white/5 text-[#9b9b9b] transition-colors">
        <span class="text-base">🔄</span> Transazioni
      </a>
      <a href="#" class="flex items-center gap-2.5 px-3 py-1.5 rounded-md hover:bg-white/5 text-[#9b9b9b] transition-colors">
        <span class="text-base">📋</span> Budget
      </a>
      <a href="#" class="flex items-center gap-2.5 px-3 py-1.5 rounded-md hover:bg-white/5 text-[#9b9b9b] transition-colors">
        <span class="text-base">🎯</span> Obiettivi
      </a>
      <a href="#" class="flex items-center gap-2.5 px-3 py-1.5 rounded-md hover:bg-white/5 text-[#9b9b9b] transition-colors">
        <span class="text-base">📈</span> Net Worth
      </a>
      <a href="#" class="flex items-center gap-2.5 px-3 py-1.5 rounded-md hover:bg-white/5 text-[#9b9b9b] transition-colors">
        <span class="text-base">📡</span> Abbonamenti
      </a>
    </nav>

    <!-- Sidebar footer -->
    <div class="mt-auto px-3">
      <div class="flex items-center gap-2 py-2 mt-4 border-t border-white/5">
        <div class="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-xs font-bold text-white">M</div>
        <span class="text-xs text-[#9b9b9b] truncate">Marco Bianchi</span>
      </div>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 flex flex-col overflow-hidden">

    <!-- Top toolbar -->
    <header class="flex items-center justify-between px-8 py-3 border-b border-white/5 bg-[#1f1f1f] shrink-0">
      <div class="flex items-center gap-1">
        <button class="px-3 py-1.5 text-xs font-medium bg-white/10 text-white rounded-md">Dashboard</button>
        <button class="px-3 py-1.5 text-xs font-medium text-[#9b9b9b] hover:bg-white/5 rounded-md transition-colors">Transazioni</button>
        <button class="px-3 py-1.5 text-xs font-medium text-[#9b9b9b] hover:bg-white/5 rounded-md transition-colors">Budget</button>
        <button class="px-3 py-1.5 text-xs font-medium text-[#9b9b9b] hover:bg-white/5 rounded-md transition-colors">Obiettivi</button>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs text-[#9b9b9b]">Marzo 2026</span>
        <div class="w-px h-4 bg-white/10"></div>
        <button class="text-xs text-[#9b9b9b] hover:text-white transition-colors">+ Nuova voce</button>
      </div>
    </header>

    <!-- Scrollable body -->
    <div class="flex-1 overflow-y-auto px-8 py-6">

      <!-- Page title -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white tracking-tight">Finance Dashboard</h1>
        <p class="text-sm text-[#9b9b9b] mt-1">Riepilogo Marzo 2026</p>
      </div>

      <!-- Summary cards -->
      <div class="grid grid-cols-4 gap-4 mb-8">
        <div class="bg-[#2a2a2a] border border-white/5 rounded-xl p-4">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs text-[#9b9b9b] font-medium uppercase tracking-wide">Entrate</span>
            <span class="text-xs bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full font-medium">+8.2%</span>
          </div>
          <p class="text-2xl font-bold text-emerald-400">€4.850</p>
          <p class="text-xs text-[#9b9b9b] mt-1">vs €4.482 feb</p>
        </div>
        <div class="bg-[#2a2a2a] border border-white/5 rounded-xl p-4">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs text-[#9b9b9b] font-medium uppercase tracking-wide">Uscite</span>
            <span class="text-xs bg-red-500/15 text-red-400 px-2 py-0.5 rounded-full font-medium">+3.1%</span>
          </div>
          <p class="text-2xl font-bold text-red-400">€3.220</p>
          <p class="text-xs text-[#9b9b9b] mt-1">vs €3.122 feb</p>
        </div>
        <div class="bg-[#2a2a2a] border border-white/5 rounded-xl p-4">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs text-[#9b9b9b] font-medium uppercase tracking-wide">Risparmi</span>
            <span class="text-xs bg-sky-500/15 text-sky-400 px-2 py-0.5 rounded-full font-medium">33.6%</span>
          </div>
          <p class="text-2xl font-bold text-sky-400">€1.630</p>
          <p class="text-xs text-[#9b9b9b] mt-1">tasso risparmio</p>
        </div>
        <div class="bg-[#2a2a2a] border border-white/5 rounded-xl p-4">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs text-[#9b9b9b] font-medium uppercase tracking-wide">Net Worth</span>
            <span class="text-xs bg-violet-500/15 text-violet-400 px-2 py-0.5 rounded-full font-medium">+5.7%</span>
          </div>
          <p class="text-2xl font-bold text-violet-400">€28.450</p>
          <p class="text-xs text-[#9b9b9b] mt-1">vs €26.916 feb</p>
        </div>
      </div>

      <!-- Budget + Savings row -->
      <div class="grid grid-cols-2 gap-6 mb-8">

        <!-- Budget progress -->
        <div class="bg-[#2a2a2a] border border-white/5 rounded-xl p-5">
          <h2 class="text-sm font-semibold text-white mb-4">Budget mensile</h2>
          <div class="flex flex-col gap-4">

            <div>
              <div class="flex justify-between items-center mb-1.5">
                <span class="text-xs text-[#e2e2e2]">Affitto</span>
                <span class="text-xs text-[#9b9b9b]">€900 / €900</span>
              </div>
              <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-red-400 rounded-full" style="width:100%"></div>
              </div>
              <p class="text-[10px] text-red-400 mt-1">Limite raggiunto</p>
            </div>

            <div>
              <div class="flex justify-between items-center mb-1.5">
                <span class="text-xs text-[#e2e2e2]">Alimentari</span>
                <span class="text-xs text-[#9b9b9b]">€342 / €400</span>
              </div>
              <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-amber-400 rounded-full" style="width:85%"></div>
              </div>
              <p class="text-[10px] text-[#9b9b9b] mt-1">€58 rimanenti</p>
            </div>

            <div>
              <div class="flex justify-between items-center mb-1.5">
                <span class="text-xs text-[#e2e2e2]">Trasporti</span>
                <span class="text-xs text-[#9b9b9b]">€118 / €200</span>
              </div>
              <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-400 rounded-full" style="width:59%"></div>
              </div>
              <p class="text-[10px] text-[#9b9b9b] mt-1">€82 rimanenti</p>
            </div>

            <div>
              <div class="flex justify-between items-center mb-1.5">
                <span class="text-xs text-[#e2e2e2]">Intrattenimento</span>
                <span class="text-xs text-[#9b9b9b]">€145 / €150</span>
              </div>
              <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-amber-400 rounded-full" style="width:97%"></div>
              </div>
              <p class="text-[10px] text-amber-400 mt-1">Quasi al limite</p>
            </div>

            <div>
              <div class="flex justify-between items-center mb-1.5">
                <span class="text-xs text-[#e2e2e2]">Salute & Sport</span>
                <span class="text-xs text-[#9b9b9b]">€65 / €120</span>
              </div>
              <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-400 rounded-full" style="width:54%"></div>
              </div>
              <p class="text-[10px] text-[#9b9b9b] mt-1">€55 rimanenti</p>
            </div>

            <div>
              <div class="flex justify-between items-center mb-1.5">
                <span class="text-xs text-[#e2e2e2]">Shopping</span>
                <span class="text-xs text-[#9b9b9b]">€210 / €250</span>
              </div>
              <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-amber-400 rounded-full" style="width:84%"></div>
              </div>
              <p class="text-[10px] text-[#9b9b9b] mt-1">€40 rimanenti</p>
            </div>

            <div>
              <div class="flex justify-between items-center mb-1.5">
                <span class="text-xs text-[#e2e2e2]">Ristoranti & Cibo</span>
                <span class="text-xs text-[#9b9b9b]">€98 / €180</span>
              </div>
              <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-400 rounded-full" style="width:54%"></div>
              </div>
              <p class="text-[10px] text-[#9b9b9b] mt-1">€82 rimanenti</p>
            </div>

          </div>
        </div>

        <!-- Savings goals -->
        <div class="bg-[#2a2a2a] border border-white/5 rounded-xl p-5">
          <h2 class="text-sm font-semibold text-white mb-4">Obiettivi di risparmio</h2>
          <div class="flex flex-col gap-5">

            <div>
              <div class="flex justify-between items-start mb-2">
                <div>
                  <p class="text-xs font-medium text-[#e2e2e2]">Fondo Emergenza</p>
                  <p class="text-[10px] text-[#9b9b9b] mt-0.5">€7.200 / €10.000</p>
                </div>
                <span class="text-xs font-bold text-emerald-400">72%</span>
              </div>
              <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-400 rounded-full" style="width:72%"></div>
              </div>
              <p class="text-[10px] text-[#9b9b9b] mt-1.5">€2.800 al traguardo · obiettivo: Dic 2026</p>
            </div>

            <div>
              <div class="flex justify-between items-start mb-2">
                <div>
                  <p class="text-xs font-medium text-[#e2e2e2]">Vacanza Giappone</p>
                  <p class="text-[10px] text-[#9b9b9b] mt-0.5">€1.750 / €5.000</p>
                </div>
                <span class="text-xs font-bold text-sky-400">35%</span>
              </div>
              <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-sky-400 rounded-full" style="width:35%"></div>
              </div>
              <p class="text-[10px] text-[#9b9b9b] mt-1.5">€3.250 al traguardo · obiettivo: Set 2026</p>
            </div>

            <div>
              <div class="flex justify-between items-start mb-2">
                <div>
                  <p class="text-xs font-medium text-[#e2e2e2]">MacBook Pro M4</p>
                  <p class="text-[10px] text-[#9b9b9b] mt-0.5">€2.640 / €3.000</p>
                </div>
                <span class="text-xs font-bold text-violet-400">88%</span>
              </div>
              <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-violet-400 rounded-full" style="width:88%"></div>
              </div>
              <p class="text-[10px] text-[#9b9b9b] mt-1.5">€360 al traguardo · obiettivo: Apr 2026</p>
            </div>

          </div>

          <!-- Mini stat row -->
          <div class="mt-6 pt-4 border-t border-white/5 grid grid-cols-3 gap-3 text-center">
            <div>
              <p class="text-sm font-bold text-white">€11.590</p>
              <p class="text-[10px] text-[#9b9b9b] mt-0.5">Totale risparmiato</p>
            </div>
            <div>
              <p class="text-sm font-bold text-white">3</p>
              <p class="text-[10px] text-[#9b9b9b] mt-0.5">Obiettivi attivi</p>
            </div>
            <div>
              <p class="text-sm font-bold text-white">€540</p>
              <p class="text-[10px] text-[#9b9b9b] mt-0.5">Versato ce mese</p>
            </div>
          </div>
        </div>

      </div>

      <!-- Recent Transactions -->
      <div class="bg-[#2a2a2a] border border-white/5 rounded-xl p-5">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-semibold text-white">Transazioni recenti</h2>
          <button class="text-xs text-[#9b9b9b] hover:text-white transition-colors">Vedi tutte →</button>
        </div>

        <table class="w-full text-xs">
          <thead>
            <tr class="border-b border-white/5">
              <th class="text-left text-[#9b9b9b] font-medium pb-2.5 pr-4">Data</th>
              <th class="text-left text-[#9b9b9b] font-medium pb-2.5 pr-4">Descrizione</th>
              <th class="text-left text-[#9b9b9b] font-medium pb-2.5 pr-4">Categoria</th>
              <th class="text-right text-[#9b9b9b] font-medium pb-2.5 pr-4">Importo</th>
              <th class="text-left text-[#9b9b9b] font-medium pb-2.5">Conto</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr class="hover:bg-white/[0.02] transition-colors">
              <td class="py-3 pr-4 text-[#9b9b9b] whitespace-nowrap">27 mar</td>
              <td class="py-3 pr-4 text-[#e2e2e2] font-medium">Stipendio Marzo</td>
              <td class="py-3 pr-4"><span class="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 font-medium">Reddito</span></td>
              <td class="py-3 pr-4 text-right font-semibold text-emerald-400">+€3.200</td>
              <td class="py-3 text-[#9b9b9b]">Conto corrente</td>
            </tr>
            <tr class="hover:bg-white/[0.02] transition-colors">
              <td class="py-3 pr-4 text-[#9b9b9b] whitespace-nowrap">27 mar</td>
              <td class="py-3 pr-4 text-[#e2e2e2] font-medium">Freelance Progetto UI</td>
              <td class="py-3 pr-4"><span class="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 font-medium">Reddito</span></td>
              <td class="py-3 pr-4 text-right font-semibold text-emerald-400">+€1.650</td>
              <td class="py-3 text-[#9b9b9b]">PayPal</td>
            </tr>
            <tr class="hover:bg-white/[0.02] transition-colors">
              <td class="py-3 pr-4 text-[#9b9b9b] whitespace-nowrap">25 mar</td>
              <td class="py-3 pr-4 text-[#e2e2e2] font-medium">Affitto Marzo</td>
              <td class="py-3 pr-4"><span class="px-2 py-0.5 rounded-md bg-slate-500/20 text-slate-300 font-medium">Abitazione</span></td>
              <td class="py-3 pr-4 text-right font-semibold text-red-400">-€900</td>
              <td class="py-3 text-[#9b9b9b]">Conto corrente</td>
            </tr>
            <tr class="hover:bg-white/[0.02] transition-colors">
              <td class="py-3 pr-4 text-[#9b9b9b] whitespace-nowrap">23 mar</td>
              <td class="py-3 pr-4 text-[#e2e2e2] font-medium">Supermercato Esselunga</td>
              <td class="py-3 pr-4"><span class="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 font-medium">Alimentari</span></td>
              <td class="py-3 pr-4 text-right font-semibold text-red-400">-€87</td>
              <td class="py-3 text-[#9b9b9b]">Carta debito</td>
            </tr>
            <tr class="hover:bg-white/[0.02] transition-colors">
              <td class="py-3 pr-4 text-[#9b9b9b] whitespace-nowrap">22 mar</td>
              <td class="py-3 pr-4 text-[#e2e2e2] font-medium">Palestra Virgin Active</td>
              <td class="py-3 pr-4"><span class="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-400 font-medium">Salute</span></td>
              <td class="py-3 pr-4 text-right font-semibold text-red-400">-€45</td>
              <td class="py-3 text-[#9b9b9b]">Carta credito</td>
            </tr>
            <tr class="hover:bg-white/[0.02] transition-colors">
              <td class="py-3 pr-4 text-[#9b9b9b] whitespace-nowrap">20 mar</td>
              <td class="py-3 pr-4 text-[#e2e2e2] font-medium">Netflix Abbonamento</td>
              <td class="py-3 pr-4"><span class="px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-400 font-medium">Abbonamenti</span></td>
              <td class="py-3 pr-4 text-right font-semibold text-red-400">-€17</td>
              <td class="py-3 text-[#9b9b9b]">Carta credito</td>
            </tr>
            <tr class="hover:bg-white/[0.02] transition-colors">
              <td class="py-3 pr-4 text-[#9b9b9b] whitespace-nowrap">19 mar</td>
              <td class="py-3 pr-4 text-[#e2e2e2] font-medium">Trattoria da Luigi</td>
              <td class="py-3 pr-4"><span class="px-2 py-0.5 rounded-md bg-orange-500/15 text-orange-400 font-medium">Ristoranti</span></td>
              <td class="py-3 pr-4 text-right font-semibold text-red-400">-€38</td>
              <td class="py-3 text-[#9b9b9b]">Carta credito</td>
            </tr>
            <tr class="hover:bg-white/[0.02] transition-colors">
              <td class="py-3 pr-4 text-[#9b9b9b] whitespace-nowrap">17 mar</td>
              <td class="py-3 pr-4 text-[#e2e2e2] font-medium">Spotify Premium</td>
              <td class="py-3 pr-4"><span class="px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-400 font-medium">Abbonamenti</span></td>
              <td class="py-3 pr-4 text-right font-semibold text-red-400">-€11</td>
              <td class="py-3 text-[#9b9b9b]">Carta credito</td>
            </tr>
            <tr class="hover:bg-white/[0.02] transition-colors">
              <td class="py-3 pr-4 text-[#9b9b9b] whitespace-nowrap">15 mar</td>
              <td class="py-3 pr-4 text-[#e2e2e2] font-medium">Zara – Giacca primavera</td>
              <td class="py-3 pr-4"><span class="px-2 py-0.5 rounded-md bg-pink-500/15 text-pink-400 font-medium">Shopping</span></td>
              <td class="py-3 pr-4 text-right font-semibold text-red-400">-€79</td>
              <td class="py-3 text-[#9b9b9b]">Carta credito</td>
            </tr>
            <tr class="hover:bg-white/[0.02] transition-colors">
              <td class="py-3 pr-4 text-[#9b9b9b] whitespace-nowrap">14 mar</td>
              <td class="py-3 pr-4 text-[#e2e2e2] font-medium">Trenitalia Milano–Roma</td>
              <td class="py-3 pr-4"><span class="px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-400 font-medium">Trasporti</span></td>
              <td class="py-3 pr-4 text-right font-semibold text-red-400">-€54</td>
              <td class="py-3 text-[#9b9b9b]">Carta credito</td>
            </tr>
            <tr class="hover:bg-white/[0.02] transition-colors">
              <td class="py-3 pr-4 text-[#9b9b9b] whitespace-nowrap">12 mar</td>
              <td class="py-3 pr-4 text-[#e2e2e2] font-medium">Farmacia Comunale</td>
              <td class="py-3 pr-4"><span class="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-400 font-medium">Salute</span></td>
              <td class="py-3 pr-4 text-right font-semibold text-red-400">-€20</td>
              <td class="py-3 text-[#9b9b9b]">Carta debito</td>
            </tr>
            <tr class="hover:bg-white/[0.02] transition-colors">
              <td class="py-3 pr-4 text-[#9b9b9b] whitespace-nowrap">10 mar</td>
              <td class="py-3 pr-4 text-[#e2e2e2] font-medium">Amazon – Libri e tech</td>
              <td class="py-3 pr-4"><span class="px-2 py-0.5 rounded-md bg-pink-500/15 text-pink-400 font-medium">Shopping</span></td>
              <td class="py-3 pr-4 text-right font-semibold text-red-400">-€131</td>
              <td class="py-3 text-[#9b9b9b]">Carta credito</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </main>
</div>
`,
  },
  {
    id: "notion-second-brain",
    name: "Notion Second Brain (PKM)",
    category: "ui",
    price: 1499,
    stripePriceId: "price_1TCIgDBoWNgrJbiycUQ3W6EM",
    downloadType: "notion",
    downloadUrl: "", // TODO: incolla qui il link di duplicazione Notion
    tags: ["notion", "pkm", "second brain", "knowledge", "notes", "productivity"],
    downloads: 521,
    description: "Full personal knowledge management system: capture, organize and retrieve ideas.",
    isNew: true,
    editorsPick: true,
    content: `<script src="https://cdn.tailwindcss.com"></script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #3f3f3f; border-radius: 3px; }
  .tag-pill { display: inline-flex; align-items: center; padding: 2px 10px; border-radius: 9999px; font-size: 11px; font-weight: 500; }
  .sidebar-item { display: flex; align-items: center; gap: 8px; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 14px; color: #9b9b9b; transition: background 0.1s; }
  .sidebar-item:hover, .sidebar-item.active { background: #2a2a2a; color: #e3e3e3; }
  .progress-bar { height: 4px; border-radius: 2px; background: #2a2a2a; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 2px; }
  .card-hover { transition: background 0.15s; }
  .card-hover:hover { background: #232323; }
  .note-row { transition: background 0.1s; }
  .note-row:hover { background: #1e1e1e; }
</style>

<div class="flex h-screen bg-[#191919] text-[#e3e3e3] overflow-hidden">

  <!-- Sidebar -->
  <aside class="w-56 flex-shrink-0 bg-[#161616] border-r border-[#2a2a2a] flex flex-col overflow-y-auto">
    <div class="px-3 pt-4 pb-2">
      <div class="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#2a2a2a] cursor-pointer">
        <span class="text-lg">🧠</span>
        <div>
          <p class="text-sm font-semibold text-[#e3e3e3] leading-tight">Second Brain</p>
          <p class="text-[11px] text-[#6b6b6b]">PKM Workspace</p>
        </div>
      </div>
    </div>
    <div class="px-3 pb-2">
      <div class="flex items-center gap-2 px-2 py-1.5 rounded-md bg-[#222222] border border-[#2e2e2e]">
        <svg class="w-3.5 h-3.5 text-[#6b6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <span class="text-[13px] text-[#6b6b6b]">Cerca...</span>
        <span class="ml-auto text-[11px] text-[#444]">⌘K</span>
      </div>
    </div>
    <div class="px-3 space-y-0.5">
      <div class="sidebar-item active">🏠 <span>Second Brain Home</span></div>
      <div class="sidebar-item">📥 <span>Inbox</span></div>
      <div class="sidebar-item">📝 <span>Notes</span></div>
    </div>
    <div class="px-3 mt-4">
      <p class="text-[11px] font-semibold text-[#555] uppercase tracking-wider px-2 mb-1">PARA</p>
      <div class="space-y-0.5">
        <div class="sidebar-item">📁 <span>Projects</span></div>
        <div class="sidebar-item">🎯 <span>Areas</span></div>
        <div class="sidebar-item">📚 <span>Resources</span></div>
        <div class="sidebar-item">🗄️ <span>Archive</span></div>
      </div>
    </div>
    <div class="px-3 mt-4">
      <p class="text-[11px] font-semibold text-[#555] uppercase tracking-wider px-2 mb-1">RACCOGLITORI</p>
      <div class="space-y-0.5">
        <div class="sidebar-item">📖 <span>Reading List</span></div>
        <div class="sidebar-item">💡 <span>Idee & Bozze</span></div>
        <div class="sidebar-item">🔖 <span>Bookmarks</span></div>
        <div class="sidebar-item">🗓️ <span>Daily Notes</span></div>
        <div class="sidebar-item">🎓 <span>Corsi & Learning</span></div>
      </div>
    </div>
    <div class="mt-auto px-3 pb-4 border-t border-[#2a2a2a] pt-3">
      <div class="sidebar-item">⚙️ <span>Impostazioni</span></div>
      <div class="sidebar-item">🗑️ <span>Cestino</span></div>
    </div>
  </aside>

  <!-- Main Area -->
  <main class="flex-1 flex flex-col overflow-hidden">
    <header class="flex items-center justify-between px-6 py-3 border-b border-[#2a2a2a] bg-[#191919] flex-shrink-0">
      <div class="flex items-center gap-1 text-[13px] text-[#6b6b6b]">
        <span class="hover:text-[#e3e3e3] cursor-pointer transition">Second Brain Home</span>
      </div>
      <nav class="flex items-center gap-1">
        <button class="px-3 py-1.5 text-[13px] bg-[#2a2a2a] text-[#e3e3e3] rounded-md font-medium">Home</button>
        <button class="px-3 py-1.5 text-[13px] text-[#9b9b9b] hover:bg-[#2a2a2a] hover:text-[#e3e3e3] rounded-md transition">Notes</button>
        <button class="px-3 py-1.5 text-[13px] text-[#9b9b9b] hover:bg-[#2a2a2a] hover:text-[#e3e3e3] rounded-md transition">Projects</button>
        <button class="px-3 py-1.5 text-[13px] text-[#9b9b9b] hover:bg-[#2a2a2a] hover:text-[#e3e3e3] rounded-md transition">Resources</button>
      </nav>
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1.5 px-3 py-1.5 bg-[#222] border border-[#2e2e2e] rounded-md">
          <svg class="w-3.5 h-3.5 text-[#6b6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <span class="text-[13px] text-[#6b6b6b]">Cerca nel workspace...</span>
        </div>
        <button class="text-[13px] text-[#9b9b9b] hover:text-[#e3e3e3] px-2 py-1.5">···</button>
      </div>
    </header>

    <div class="flex-1 overflow-y-auto px-12 py-8 max-w-5xl mx-auto w-full">

      <!-- Page title -->
      <div class="mb-8">
        <div class="text-5xl mb-3">🧠</div>
        <h1 class="text-3xl font-bold text-[#e3e3e3] mb-1">Second Brain — Home</h1>
        <p class="text-[14px] text-[#6b6b6b]">Il tuo sistema di gestione della conoscenza personale · PARA Method</p>
      </div>

      <!-- 1. Inbox -->
      <section class="mb-10">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-[15px] font-semibold text-[#e3e3e3] flex items-center gap-2">📥 Inbox <span class="text-[11px] font-normal bg-[#2a2a2a] text-[#9b9b9b] px-2 py-0.5 rounded-full">5 elementi</span></h2>
          <button class="text-[12px] text-[#6b6b6b] hover:text-[#e3e3e3] transition">+ Aggiungi</button>
        </div>
        <div class="border border-[#2a2a2a] rounded-lg overflow-hidden">
          <div class="flex items-start gap-3 px-4 py-3 border-b border-[#2a2a2a] card-hover cursor-pointer">
            <span class="text-base mt-0.5">💬</span>
            <div class="flex-1 min-w-0">
              <p class="text-[13px] text-[#e3e3e3] font-medium truncate">Idee per Side Project — App per tracciare abitudini</p>
              <p class="text-[12px] text-[#6b6b6b] mt-0.5">Gamification + streak system. Ispirazione da Duolingo. Potrebbe usare AI per suggerire abitudini.</p>
            </div>
            <span class="text-[11px] text-[#555] flex-shrink-0 mt-1">Oggi</span>
          </div>
          <div class="flex items-start gap-3 px-4 py-3 border-b border-[#2a2a2a] card-hover cursor-pointer">
            <span class="text-base mt-0.5">🔗</span>
            <div class="flex-1 min-w-0">
              <p class="text-[13px] text-[#e3e3e3] font-medium truncate">Link: "The AI-First Workflow" — a16z blog post</p>
              <p class="text-[12px] text-[#6b6b6b] mt-0.5">https://a16z.com/ai-first-workflow — leggere stasera, rilevante per la strategia Q2.</p>
            </div>
            <span class="text-[11px] text-[#555] flex-shrink-0 mt-1">Ieri</span>
          </div>
          <div class="flex items-start gap-3 px-4 py-3 border-b border-[#2a2a2a] card-hover cursor-pointer">
            <span class="text-base mt-0.5">📌</span>
            <div class="flex-1 min-w-0">
              <p class="text-[13px] text-[#e3e3e3] font-medium truncate">Chiamare il commercialista — scadenza F24 aprile</p>
              <p class="text-[12px] text-[#6b6b6b] mt-0.5">Verificare contributi INPS freelance e detrazioni spese home office 2025.</p>
            </div>
            <span class="text-[11px] text-[#555] flex-shrink-0 mt-1">20 mar</span>
          </div>
          <div class="flex items-start gap-3 px-4 py-3 border-b border-[#2a2a2a] card-hover cursor-pointer">
            <span class="text-base mt-0.5">💡</span>
            <div class="flex-1 min-w-0">
              <p class="text-[13px] text-[#e3e3e3] font-medium truncate">Newsletter tema: "Come usare l'AI per il PKM"</p>
              <p class="text-[12px] text-[#6b6b6b] mt-0.5">Approccio pratico: Notion + ChatGPT + Readwise. Potenziale articolo da sviluppare.</p>
            </div>
            <span class="text-[11px] text-[#555] flex-shrink-0 mt-1">19 mar</span>
          </div>
          <div class="flex items-start gap-3 px-4 py-3 card-hover cursor-pointer">
            <span class="text-base mt-0.5">📸</span>
            <div class="flex-1 min-w-0">
              <p class="text-[13px] text-[#e3e3e3] font-medium truncate">Citazione: "Your mind is for having ideas, not holding them" — GTD</p>
              <p class="text-[12px] text-[#6b6b6b] mt-0.5">Da rielaborare per post LinkedIn. Collegare al concetto di Second Brain.</p>
            </div>
            <span class="text-[11px] text-[#555] flex-shrink-0 mt-1">18 mar</span>
          </div>
        </div>
      </section>

      <!-- 2. Active Projects -->
      <section class="mb-10">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-[15px] font-semibold text-[#e3e3e3] flex items-center gap-2">🔥 Progetti Attivi <span class="text-[11px] font-normal bg-[#2a2a2a] text-[#9b9b9b] px-2 py-0.5 rounded-full">4 progetti</span></h2>
          <button class="text-[12px] text-[#6b6b6b] hover:text-[#e3e3e3] transition">Vedi tutti →</button>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-4 card-hover cursor-pointer">
            <div class="flex items-start justify-between mb-3">
              <span class="text-xl">🚀</span>
              <span class="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#1a3a2a] text-[#4ade80]">In corso</span>
            </div>
            <h3 class="text-[14px] font-semibold text-[#e3e3e3] mb-1">Lancio Newsletter Mensile</h3>
            <p class="text-[12px] text-[#6b6b6b] mb-3">Prossima azione: scrivere bozza articolo principale per edizione aprile</p>
            <div class="progress-bar mb-1.5"><div class="progress-fill bg-[#4ade80]" style="width:65%"></div></div>
            <div class="flex items-center justify-between">
              <span class="text-[11px] text-[#555]">65% completato</span>
              <span class="text-[11px] text-[#555]">Scadenza: 31 mar</span>
            </div>
          </div>
          <div class="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-4 card-hover cursor-pointer">
            <div class="flex items-start justify-between mb-3">
              <span class="text-xl">💻</span>
              <span class="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#1a2a3a] text-[#60a5fa]">Pianificazione</span>
            </div>
            <h3 class="text-[14px] font-semibold text-[#e3e3e3] mb-1">App Habit Tracker</h3>
            <p class="text-[12px] text-[#6b6b6b] mb-3">Prossima azione: definire MVP features e tech stack (React Native vs Flutter)</p>
            <div class="progress-bar mb-1.5"><div class="progress-fill bg-[#60a5fa]" style="width:20%"></div></div>
            <div class="flex items-center justify-between">
              <span class="text-[11px] text-[#555]">20% completato</span>
              <span class="text-[11px] text-[#555]">Scadenza: Q2 2026</span>
            </div>
          </div>
          <div class="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-4 card-hover cursor-pointer">
            <div class="flex items-start justify-between mb-3">
              <span class="text-xl">🎓</span>
              <span class="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#3a2a1a] text-[#fb923c]">In corso</span>
            </div>
            <h3 class="text-[14px] font-semibold text-[#e3e3e3] mb-1">Corso Online: Machine Learning</h3>
            <p class="text-[12px] text-[#6b6b6b] mb-3">Prossima azione: completare modulo 4 — Neural Networks e backpropagation</p>
            <div class="progress-bar mb-1.5"><div class="progress-fill bg-[#fb923c]" style="width:48%"></div></div>
            <div class="flex items-center justify-between">
              <span class="text-[11px] text-[#555]">48% completato</span>
              <span class="text-[11px] text-[#555]">Scadenza: 30 apr</span>
            </div>
          </div>
          <div class="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-4 card-hover cursor-pointer">
            <div class="flex items-start justify-between mb-3">
              <span class="text-xl">✍️</span>
              <span class="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#2a1a3a] text-[#c084fc]">Revisione</span>
            </div>
            <h3 class="text-[14px] font-semibold text-[#e3e3e3] mb-1">Portfolio Personale v2</h3>
            <p class="text-[12px] text-[#6b6b6b] mb-3">Prossima azione: revisione copy sezione About e aggiornamento case studies</p>
            <div class="progress-bar mb-1.5"><div class="progress-fill bg-[#c084fc]" style="width:80%"></div></div>
            <div class="flex items-center justify-between">
              <span class="text-[11px] text-[#555]">80% completato</span>
              <span class="text-[11px] text-[#555]">Scadenza: 25 mar</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Areas of Responsibility -->
      <section class="mb-10">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-[15px] font-semibold text-[#e3e3e3]">🎯 Aree di Responsabilità</h2>
          <button class="text-[12px] text-[#6b6b6b] hover:text-[#e3e3e3] transition">Gestisci aree →</button>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div class="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-4 card-hover cursor-pointer text-center">
            <div class="text-2xl mb-2">💼</div>
            <p class="text-[13px] font-semibold text-[#e3e3e3]">Carriera</p>
            <p class="text-[11px] text-[#6b6b6b] mt-1">12 note · 3 progetti</p>
          </div>
          <div class="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-4 card-hover cursor-pointer text-center">
            <div class="text-2xl mb-2">🏃</div>
            <p class="text-[13px] font-semibold text-[#e3e3e3]">Salute</p>
            <p class="text-[11px] text-[#6b6b6b] mt-1">8 note · 2 progetti</p>
          </div>
          <div class="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-4 card-hover cursor-pointer text-center">
            <div class="text-2xl mb-2">💰</div>
            <p class="text-[13px] font-semibold text-[#e3e3e3]">Finanze</p>
            <p class="text-[11px] text-[#6b6b6b] mt-1">15 note · 1 progetto</p>
          </div>
          <div class="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-4 card-hover cursor-pointer text-center">
            <div class="text-2xl mb-2">📖</div>
            <p class="text-[13px] font-semibold text-[#e3e3e3]">Apprendimento</p>
            <p class="text-[11px] text-[#6b6b6b] mt-1">24 note · 4 progetti</p>
          </div>
          <div class="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-4 card-hover cursor-pointer text-center">
            <div class="text-2xl mb-2">❤️</div>
            <p class="text-[13px] font-semibold text-[#e3e3e3]">Relazioni</p>
            <p class="text-[11px] text-[#6b6b6b] mt-1">6 note · 0 progetti</p>
          </div>
          <div class="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-4 card-hover cursor-pointer text-center">
            <div class="text-2xl mb-2">🏠</div>
            <p class="text-[13px] font-semibold text-[#e3e3e3]">Casa</p>
            <p class="text-[11px] text-[#6b6b6b] mt-1">5 note · 1 progetto</p>
          </div>
        </div>
      </section>

      <!-- 4. Recent Notes -->
      <section class="mb-10">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-[15px] font-semibold text-[#e3e3e3] flex items-center gap-2">🧠 Note Recenti <span class="text-[11px] font-normal bg-[#2a2a2a] text-[#9b9b9b] px-2 py-0.5 rounded-full">87 totali</span></h2>
          <button class="text-[12px] text-[#6b6b6b] hover:text-[#e3e3e3] transition">Vedi tutte →</button>
        </div>
        <div class="border border-[#2a2a2a] rounded-lg overflow-hidden">
          <div class="flex items-start gap-3 px-4 py-3 border-b border-[#2a2a2a] note-row cursor-pointer">
            <span class="text-base mt-0.5 flex-shrink-0">📋</span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap mb-1">
                <p class="text-[13px] font-medium text-[#e3e3e3]">Appunti Riunione Team Q1 2026</p>
                <span class="tag-pill bg-[#1a2a3a] text-[#60a5fa]">#business</span>
                <span class="tag-pill bg-[#1a3a2a] text-[#4ade80]">#meeting</span>
              </div>
              <p class="text-[12px] text-[#6b6b6b] truncate">OKR del trimestre: +30% ricavi, lancio feature AI entro marzo. Azioni: Marco si occupa di...</p>
            </div>
            <span class="text-[11px] text-[#555] flex-shrink-0">Oggi</span>
          </div>
          <div class="flex items-start gap-3 px-4 py-3 border-b border-[#2a2a2a] note-row cursor-pointer">
            <span class="text-base mt-0.5 flex-shrink-0">💡</span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap mb-1">
                <p class="text-[13px] font-medium text-[#e3e3e3]">Riassunto Libro: Atomic Habits</p>
                <span class="tag-pill bg-[#2a1a3a] text-[#c084fc]">#produttività</span>
                <span class="tag-pill bg-[#3a2a1a] text-[#fb923c]">#libri</span>
              </div>
              <p class="text-[12px] text-[#6b6b6b] truncate">Le 4 leggi del cambiamento comportamentale: renderlo ovvio, attraente, facile e soddisfacente...</p>
            </div>
            <span class="text-[11px] text-[#555] flex-shrink-0">Ieri</span>
          </div>
          <div class="flex items-start gap-3 px-4 py-3 border-b border-[#2a2a2a] note-row cursor-pointer">
            <span class="text-base mt-0.5 flex-shrink-0">🤖</span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap mb-1">
                <p class="text-[13px] font-medium text-[#e3e3e3]">Prompt Engineering: tecniche avanzate per Claude</p>
                <span class="tag-pill bg-[#1a3a3a] text-[#22d3ee]">#AI</span>
                <span class="tag-pill bg-[#2a1a3a] text-[#c084fc]">#produttività</span>
              </div>
              <p class="text-[12px] text-[#6b6b6b] truncate">Chain-of-thought, few-shot examples, XML tagging per strutturare prompt complessi...</p>
            </div>
            <span class="text-[11px] text-[#555] flex-shrink-0">20 mar</span>
          </div>
          <div class="flex items-start gap-3 px-4 py-3 border-b border-[#2a2a2a] note-row cursor-pointer">
            <span class="text-base mt-0.5 flex-shrink-0">🎨</span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap mb-1">
                <p class="text-[13px] font-medium text-[#e3e3e3]">Note sul Design System: token e componenti</p>
                <span class="tag-pill bg-[#3a1a1a] text-[#f87171]">#design</span>
                <span class="tag-pill bg-[#1a2a3a] text-[#60a5fa]">#business</span>
              </div>
              <p class="text-[12px] text-[#6b6b6b] truncate">Figma variables per colori semantici. Naming convention: color/primary/default...</p>
            </div>
            <span class="text-[11px] text-[#555] flex-shrink-0">19 mar</span>
          </div>
          <div class="flex items-start gap-3 px-4 py-3 border-b border-[#2a2a2a] note-row cursor-pointer">
            <span class="text-base mt-0.5 flex-shrink-0">💰</span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap mb-1">
                <p class="text-[13px] font-medium text-[#e3e3e3]">Strategia di investimento 2026 — ETF e DCA</p>
                <span class="tag-pill bg-[#1a3a2a] text-[#4ade80]">#finanze</span>
                <span class="tag-pill bg-[#2a1a3a] text-[#c084fc]">#produttività</span>
              </div>
              <p class="text-[12px] text-[#6b6b6b] truncate">Allocazione: 60% MSCI World, 20% S&P500, 10% EM, 10% obbligazioni. DCA mensile il giorno 5...</p>
            </div>
            <span class="text-[11px] text-[#555] flex-shrink-0">18 mar</span>
          </div>
          <div class="flex items-start gap-3 px-4 py-3 border-b border-[#2a2a2a] note-row cursor-pointer">
            <span class="text-base mt-0.5 flex-shrink-0">🏃</span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap mb-1">
                <p class="text-[13px] font-medium text-[#e3e3e3]">Piano di allenamento — Preparazione mezza maratona</p>
                <span class="tag-pill bg-[#1a3a2a] text-[#4ade80]">#salute</span>
                <span class="tag-pill bg-[#3a2a1a] text-[#fb923c]">#sport</span>
              </div>
              <p class="text-[12px] text-[#6b6b6b] truncate">16 settimane al via. Settimana 1: 3 uscite da 5km. Long run domenica 10km...</p>
            </div>
            <span class="text-[11px] text-[#555] flex-shrink-0">17 mar</span>
          </div>
          <div class="flex items-start gap-3 px-4 py-3 border-b border-[#2a2a2a] note-row cursor-pointer">
            <span class="text-base mt-0.5 flex-shrink-0">🌐</span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap mb-1">
                <p class="text-[13px] font-medium text-[#e3e3e3]">Note da conferenza: UX Summit Milano 2026</p>
                <span class="tag-pill bg-[#3a1a1a] text-[#f87171]">#design</span>
                <span class="tag-pill bg-[#1a3a3a] text-[#22d3ee]">#AI</span>
                <span class="tag-pill bg-[#1a2a3a] text-[#60a5fa]">#business</span>
              </div>
              <p class="text-[12px] text-[#6b6b6b] truncate">Talk di Giulia Rossi su "AI e UX writing": generare varianti di copy con AI, validare con A/B test...</p>
            </div>
            <span class="text-[11px] text-[#555] flex-shrink-0">15 mar</span>
          </div>
          <div class="flex items-start gap-3 px-4 py-3 note-row cursor-pointer">
            <span class="text-base mt-0.5 flex-shrink-0">📊</span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap mb-1">
                <p class="text-[13px] font-medium text-[#e3e3e3]">Analisi competitor — Mercato SaaS B2B Italia</p>
                <span class="tag-pill bg-[#1a2a3a] text-[#60a5fa]">#business</span>
                <span class="tag-pill bg-[#3a1a1a] text-[#f87171]">#strategia</span>
              </div>
              <p class="text-[12px] text-[#6b6b6b] truncate">Analisi di 8 player principali. Gap di mercato: onboarding localizzato in italiano mancante nel 70%...</p>
            </div>
            <span class="text-[11px] text-[#555] flex-shrink-0">14 mar</span>
          </div>
        </div>
      </section>

      <!-- 5. Reading List -->
      <section class="mb-10">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-[15px] font-semibold text-[#e3e3e3] flex items-center gap-2">📖 Reading List <span class="text-[11px] font-normal bg-[#2a2a2a] text-[#9b9b9b] px-2 py-0.5 rounded-full">4 elementi</span></h2>
          <button class="text-[12px] text-[#6b6b6b] hover:text-[#e3e3e3] transition">Vedi lista completa →</button>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-4 card-hover cursor-pointer flex gap-3">
            <div class="w-10 h-14 bg-gradient-to-br from-[#1a3a2a] to-[#2a4a3a] rounded-md flex-shrink-0 flex items-center justify-center text-lg">📗</div>
            <div class="flex-1 min-w-0">
              <p class="text-[13px] font-semibold text-[#e3e3e3] leading-snug mb-0.5">Building a Second Brain</p>
              <p class="text-[12px] text-[#6b6b6b] mb-2">Tiago Forte · Libro</p>
              <span class="tag-pill bg-[#1a3a2a] text-[#4ade80] py-0.5">✓ Letto</span>
            </div>
          </div>
          <div class="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-4 card-hover cursor-pointer flex gap-3">
            <div class="w-10 h-14 bg-gradient-to-br from-[#1a2a3a] to-[#2a3a4a] rounded-md flex-shrink-0 flex items-center justify-center text-lg">📘</div>
            <div class="flex-1 min-w-0">
              <p class="text-[13px] font-semibold text-[#e3e3e3] leading-snug mb-0.5">Deep Work</p>
              <p class="text-[12px] text-[#6b6b6b] mb-2">Cal Newport · Libro</p>
              <span class="tag-pill bg-[#1a2a3a] text-[#60a5fa] py-0.5">📖 In lettura</span>
            </div>
          </div>
          <div class="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-4 card-hover cursor-pointer flex gap-3">
            <div class="w-10 h-14 bg-gradient-to-br from-[#2a2a1a] to-[#3a3a2a] rounded-md flex-shrink-0 flex items-center justify-center text-lg">📰</div>
            <div class="flex-1 min-w-0">
              <p class="text-[13px] font-semibold text-[#e3e3e3] leading-snug mb-0.5">Come l'AI sta ridefinendo il knowledge work</p>
              <p class="text-[12px] text-[#6b6b6b] mb-2">Harvard Business Review · Articolo</p>
              <span class="tag-pill bg-[#2a2a2a] text-[#9b9b9b] py-0.5">○ Da leggere</span>
            </div>
          </div>
          <div class="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-4 card-hover cursor-pointer flex gap-3">
            <div class="w-10 h-14 bg-gradient-to-br from-[#3a1a1a] to-[#4a2a2a] rounded-md flex-shrink-0 flex items-center justify-center text-lg">📙</div>
            <div class="flex-1 min-w-0">
              <p class="text-[13px] font-semibold text-[#e3e3e3] leading-snug mb-0.5">Il Metodo GTD per Professionisti Italiani</p>
              <p class="text-[12px] text-[#6b6b6b] mb-2">Adattamento locale · Libro</p>
              <span class="tag-pill bg-[#2a2a2a] text-[#9b9b9b] py-0.5">○ Da leggere</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Tag cloud -->
      <section class="mb-8">
        <h2 class="text-[15px] font-semibold text-[#e3e3e3] mb-3">🏷️ Tag Frequenti</h2>
        <div class="flex flex-wrap gap-2">
          <span class="tag-pill bg-[#2a1a3a] text-[#c084fc] text-[12px] py-1 px-3">#produttività</span>
          <span class="tag-pill bg-[#1a3a3a] text-[#22d3ee] text-[12px] py-1 px-3">#AI</span>
          <span class="tag-pill bg-[#3a1a1a] text-[#f87171] text-[12px] py-1 px-3">#design</span>
          <span class="tag-pill bg-[#1a2a3a] text-[#60a5fa] text-[12px] py-1 px-3">#business</span>
          <span class="tag-pill bg-[#1a3a2a] text-[#4ade80] text-[12px] py-1 px-3">#finanze</span>
          <span class="tag-pill bg-[#3a2a1a] text-[#fb923c] text-[12px] py-1 px-3">#libri</span>
          <span class="tag-pill bg-[#1a3a2a] text-[#4ade80] text-[12px] py-1 px-3">#salute</span>
          <span class="tag-pill bg-[#3a2a1a] text-[#fb923c] text-[12px] py-1 px-3">#sport</span>
          <span class="tag-pill bg-[#2a1a3a] text-[#c084fc] text-[12px] py-1 px-3">#PKM</span>
          <span class="tag-pill bg-[#1a3a3a] text-[#22d3ee] text-[12px] py-1 px-3">#meeting</span>
          <span class="tag-pill bg-[#3a1a1a] text-[#f87171] text-[12px] py-1 px-3">#freelance</span>
          <span class="tag-pill bg-[#1a2a3a] text-[#60a5fa] text-[12px] py-1 px-3">#strategia</span>
        </div>
      </section>

    </div>
  </main>
</div>
`,
  },
  {
    id: "notion-job-tracker",
    name: "Notion Job Application Tracker",
    category: "ui",
    price: 799,
    stripePriceId: "price_1TCIgEBoWNgrJbiys2bAQxkB",
    downloadType: "notion",
    downloadUrl: "", // TODO: incolla qui il link di duplicazione Notion
    tags: ["notion", "job search", "career", "applications", "interviews"],
    downloads: 189,
    description: "Track job applications, interviews and offers with a Kanban pipeline.",
    isNew: true,
    editorsPick: false,
    content: `<script src="https://cdn.tailwindcss.com"></script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #3d3d3d; border-radius: 3px; }
  .kanban-col { min-width: 220px; max-width: 220px; }
  .card-hover:hover { background: #2a2a2a !important; }
  .sidebar-item:hover { background: rgba(255,255,255,0.06); }
  .sidebar-item.active { background: rgba(255,255,255,0.1); }
  .tag { font-size: 11px; padding: 1px 7px; border-radius: 3px; font-weight: 500; }
  .view-btn { font-size: 13px; padding: 4px 10px; border-radius: 4px; color: #9b9b9b; cursor: pointer; }
  .view-btn.active, .view-btn:hover { background: rgba(255,255,255,0.08); color: #e2e2e2; }
  .checklist-item input[type="checkbox"] { accent-color: #5e96f7; width:14px; height:14px; cursor:pointer; }
</style>

<div class="flex h-screen bg-[#191919] text-[#e2e2e2] overflow-hidden">

  <!-- Sidebar -->
  <aside class="w-56 bg-[#111111] flex flex-col py-3 border-r border-[#2d2d2d] shrink-0">
    <div class="px-3 mb-3">
      <div class="flex items-center gap-2 px-2 py-1.5 rounded-md sidebar-item cursor-pointer">
        <div class="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-[10px] font-bold text-white">J</div>
        <span class="text-sm font-semibold text-[#e2e2e2]">Job Tracker</span>
        <span class="ml-auto text-[#555] text-xs">···</span>
      </div>
    </div>

    <div class="px-2 mb-1">
      <p class="text-[10px] font-semibold text-[#555] uppercase tracking-widest px-2 mb-1">Workspace</p>
    </div>

    <nav class="flex flex-col gap-0.5 px-2">
      <div class="sidebar-item flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer">
        <span class="text-[15px]">🏠</span>
        <span class="text-[13px] text-[#a0a0a0]">Job Tracker Home</span>
      </div>
      <div class="sidebar-item active flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer">
        <span class="text-[15px]">📋</span>
        <span class="text-[13px] text-[#e2e2e2] font-medium">Applications</span>
        <span class="ml-auto bg-blue-600 text-white text-[10px] font-bold px-1.5 rounded-full">24</span>
      </div>
      <div class="sidebar-item flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer">
        <span class="text-[15px]">🏢</span>
        <span class="text-[13px] text-[#a0a0a0]">Companies</span>
      </div>
      <div class="sidebar-item flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer">
        <span class="text-[15px]">👤</span>
        <span class="text-[13px] text-[#a0a0a0]">Contacts</span>
      </div>
      <div class="sidebar-item flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer">
        <span class="text-[15px]">📁</span>
        <span class="text-[13px] text-[#a0a0a0]">Documents</span>
      </div>
      <div class="sidebar-item flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer">
        <span class="text-[15px]">🎯</span>
        <span class="text-[13px] text-[#a0a0a0]">Interview Prep</span>
      </div>
    </nav>

    <div class="mt-4 px-2">
      <div class="h-px bg-[#2d2d2d] mb-3"></div>
      <p class="text-[10px] font-semibold text-[#555] uppercase tracking-widest px-2 mb-1">Risorse</p>
      <div class="sidebar-item flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer">
        <span class="text-[15px]">📊</span>
        <span class="text-[13px] text-[#a0a0a0]">Statistiche</span>
      </div>
      <div class="sidebar-item flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer">
        <span class="text-[15px]">📅</span>
        <span class="text-[13px] text-[#a0a0a0]">Calendario</span>
      </div>
    </div>

    <div class="mt-auto px-3 py-3 border-t border-[#2d2d2d]">
      <div class="flex items-center gap-2 cursor-pointer sidebar-item px-2 py-1.5 rounded-md">
        <div class="w-6 h-6 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-[11px] font-bold text-white">M</div>
        <div>
          <p class="text-[12px] font-medium text-[#d0d0d0]">Marco Rossi</p>
          <p class="text-[10px] text-[#666]">marco@email.com</p>
        </div>
      </div>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 flex flex-col overflow-hidden">

    <!-- Top Bar -->
    <header class="flex items-center justify-between px-6 py-3 border-b border-[#2d2d2d] shrink-0">
      <div>
        <div class="flex items-center gap-1.5 text-[12px] text-[#555] mb-1">
          <span>Job Tracker</span><span>/</span><span class="text-[#888]">Applications</span>
        </div>
        <h1 class="text-[22px] font-bold text-[#e8e8e8] leading-tight">📋 Applications</h1>
      </div>
      <div class="flex items-center gap-2">
        <button class="text-[12px] text-[#888] bg-[#252525] hover:bg-[#2f2f2f] px-3 py-1.5 rounded-md border border-[#333] transition-colors">+ Nuova Candidatura</button>
        <button class="text-[12px] text-[#888] hover:text-[#bbb] px-2 py-1.5 rounded-md transition-colors">⋯</button>
      </div>
    </header>

    <!-- Stats Bar -->
    <div class="flex items-center gap-6 px-6 py-2.5 bg-[#161616] border-b border-[#2d2d2d] shrink-0">
      <div class="flex items-center gap-1.5"><span class="text-[11px] text-[#666]">Candidature:</span><span class="text-[13px] font-semibold text-[#e2e2e2]">24</span></div>
      <div class="w-px h-3 bg-[#333]"></div>
      <div class="flex items-center gap-1.5"><span class="text-[11px] text-[#666]">In corso:</span><span class="text-[13px] font-semibold text-blue-400">8</span></div>
      <div class="w-px h-3 bg-[#333]"></div>
      <div class="flex items-center gap-1.5"><span class="text-[11px] text-[#666]">Colloqui:</span><span class="text-[13px] font-semibold text-purple-400">5</span></div>
      <div class="w-px h-3 bg-[#333]"></div>
      <div class="flex items-center gap-1.5"><span class="text-[11px] text-[#666]">Offerte:</span><span class="text-[13px] font-semibold text-green-400">1</span></div>
      <div class="w-px h-3 bg-[#333]"></div>
      <div class="flex items-center gap-1.5"><span class="text-[11px] text-[#666]">Tasso:</span><span class="text-[13px] font-semibold text-orange-400">33%</span></div>
    </div>

    <!-- View Toolbar -->
    <div class="flex items-center gap-1 px-6 py-2 border-b border-[#2d2d2d] shrink-0">
      <button class="view-btn active">▦ Board</button>
      <button class="view-btn">☰ Table</button>
      <button class="view-btn">📅 Calendar</button>
      <div class="ml-auto flex items-center gap-2">
        <button class="view-btn text-[12px]">🔽 Filter</button>
        <button class="view-btn text-[12px]">↕ Sort</button>
        <button class="view-btn text-[12px]">⋯ More</button>
      </div>
    </div>

    <!-- Scrollable Body -->
    <div class="flex-1 overflow-y-auto px-6 py-4" style="overflow-x:auto;">

      <!-- Kanban Board -->
      <div class="flex gap-3 pb-4" style="min-width: max-content;">

        <!-- Saved -->
        <div class="kanban-col flex flex-col gap-2">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[12px] font-semibold text-[#888]">📋 Saved <span class="text-[#555] font-normal ml-1">3</span></span>
            <button class="text-[#555] hover:text-[#aaa] text-lg leading-none">+</button>
          </div>
          <!-- Card -->
          <div class="card-hover bg-[#1e1e1e] rounded-lg p-3 border border-[#2d2d2d] cursor-pointer transition-colors">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-[12px] font-bold text-white shrink-0">S</div>
              <div><p class="text-[12px] font-semibold text-[#e0e0e0]">Shopify</p><p class="text-[11px] text-[#777]">Backend Engineer</p></div>
            </div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="tag bg-blue-900/50 text-blue-300">Remote</span>
            </div>
            <p class="text-[11px] text-[#666]">€65k – €85k · Salvato 10 mar</p>
          </div>
          <!-- Card -->
          <div class="card-hover bg-[#1e1e1e] rounded-lg p-3 border border-[#2d2d2d] cursor-pointer transition-colors">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-violet-700 flex items-center justify-center text-[12px] font-bold text-white shrink-0">T</div>
              <div><p class="text-[12px] font-semibold text-[#e0e0e0]">Typeform</p><p class="text-[11px] text-[#777]">React Developer</p></div>
            </div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="tag bg-amber-900/50 text-amber-300">Hybrid</span>
            </div>
            <p class="text-[11px] text-[#666]">€55k – €70k · Salvato 12 mar</p>
          </div>
          <!-- Card -->
          <div class="card-hover bg-[#1e1e1e] rounded-lg p-3 border border-[#2d2d2d] cursor-pointer transition-colors">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-rose-700 flex items-center justify-center text-[12px] font-bold text-white shrink-0">A</div>
              <div><p class="text-[12px] font-semibold text-[#e0e0e0]">Algolia</p><p class="text-[11px] text-[#777]">Frontend Engineer</p></div>
            </div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="tag bg-blue-900/50 text-blue-300">Remote</span>
            </div>
            <p class="text-[11px] text-[#666]">€60k – €80k · Salvato 15 mar</p>
          </div>
        </div>

        <!-- Applied -->
        <div class="kanban-col flex flex-col gap-2">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[12px] font-semibold text-[#888]">📨 Applied <span class="text-[#555] font-normal ml-1">5</span></span>
            <button class="text-[#555] hover:text-[#aaa] text-lg leading-none">+</button>
          </div>
          <div class="card-hover bg-[#1e1e1e] rounded-lg p-3 border border-[#2d2d2d] cursor-pointer transition-colors">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-[#1DB954] flex items-center justify-center text-[12px] font-bold text-white shrink-0">S</div>
              <div><p class="text-[12px] font-semibold text-[#e0e0e0]">Spotify</p><p class="text-[11px] text-[#777]">Senior Frontend</p></div>
            </div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="tag bg-amber-900/50 text-amber-300">Hybrid</span>
              <span class="tag bg-[#333] text-[#888]">Svezia</span>
            </div>
            <p class="text-[11px] text-[#666]">€80k – €105k · Appl. 1 mar</p>
          </div>
          <div class="card-hover bg-[#1e1e1e] rounded-lg p-3 border border-[#2d2d2d] cursor-pointer transition-colors">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-purple-700 flex items-center justify-center text-[12px] font-bold text-white shrink-0">B</div>
              <div><p class="text-[12px] font-semibold text-[#e0e0e0]">Bending Spoons</p><p class="text-[11px] text-[#777]">Product Designer</p></div>
            </div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="tag bg-orange-900/50 text-orange-300">On-site</span>
              <span class="tag bg-[#333] text-[#888]">Milano</span>
            </div>
            <p class="text-[11px] text-[#666]">€55k – €75k · Appl. 3 mar</p>
          </div>
          <div class="card-hover bg-[#1e1e1e] rounded-lg p-3 border border-[#2d2d2d] cursor-pointer transition-colors">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-[#6772E5] flex items-center justify-center text-[12px] font-bold text-white shrink-0">S</div>
              <div><p class="text-[12px] font-semibold text-[#e0e0e0]">Satispay</p><p class="text-[11px] text-[#777]">Mobile Developer</p></div>
            </div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="tag bg-amber-900/50 text-amber-300">Hybrid</span>
              <span class="tag bg-[#333] text-[#888]">Milano</span>
            </div>
            <p class="text-[11px] text-[#666]">€50k – €70k · Appl. 5 mar</p>
          </div>
          <div class="card-hover bg-[#1e1e1e] rounded-lg p-3 border border-[#2d2d2d] cursor-pointer transition-colors">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-sky-700 flex items-center justify-center text-[12px] font-bold text-white shrink-0">L</div>
              <div><p class="text-[12px] font-semibold text-[#e0e0e0]">Linear</p><p class="text-[11px] text-[#777]">UI Engineer</p></div>
            </div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="tag bg-blue-900/50 text-blue-300">Remote</span>
            </div>
            <p class="text-[11px] text-[#666]">€75k – €95k · Appl. 8 mar</p>
          </div>
          <div class="card-hover bg-[#1e1e1e] rounded-lg p-3 border border-[#2d2d2d] cursor-pointer transition-colors">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-cyan-700 flex items-center justify-center text-[12px] font-bold text-white shrink-0">D</div>
              <div><p class="text-[12px] font-semibold text-[#e0e0e0]">Doctolib</p><p class="text-[11px] text-[#777]">Full Stack Dev</p></div>
            </div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="tag bg-amber-900/50 text-amber-300">Hybrid</span>
              <span class="tag bg-[#333] text-[#888]">Parigi</span>
            </div>
            <p class="text-[11px] text-[#666]">€60k – €80k · Appl. 9 mar</p>
          </div>
        </div>

        <!-- Phone Screen -->
        <div class="kanban-col flex flex-col gap-2">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[12px] font-semibold text-[#888]">📞 Phone Screen <span class="text-[#555] font-normal ml-1">3</span></span>
            <button class="text-[#555] hover:text-[#aaa] text-lg leading-none">+</button>
          </div>
          <div class="card-hover bg-[#1e1e1e] rounded-lg p-3 border border-[#2d2d2d] cursor-pointer transition-colors">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-[12px] font-bold text-white shrink-0">S</div>
              <div><p class="text-[12px] font-semibold text-[#e0e0e0]">Stripe</p><p class="text-[11px] text-[#777]">Full Stack Eng.</p></div>
            </div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="tag bg-blue-900/50 text-blue-300">Remote</span>
              <span class="tag bg-[#333] text-[#888]">Irlanda</span>
            </div>
            <p class="text-[11px] text-[#666]">€90k – €120k · 📅 24 mar</p>
          </div>
          <div class="card-hover bg-[#1e1e1e] rounded-lg p-3 border border-[#2d2d2d] cursor-pointer transition-colors">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-red-700 flex items-center justify-center text-[12px] font-bold text-white shrink-0">N</div>
              <div><p class="text-[12px] font-semibold text-[#e0e0e0]">Nexi Group</p><p class="text-[11px] text-[#777]">Cloud Engineer</p></div>
            </div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="tag bg-orange-900/50 text-orange-300">On-site</span>
              <span class="tag bg-[#333] text-[#888]">Roma</span>
            </div>
            <p class="text-[11px] text-[#666]">€55k – €72k · 📅 25 mar</p>
          </div>
          <div class="card-hover bg-[#1e1e1e] rounded-lg p-3 border border-[#2d2d2d] cursor-pointer transition-colors">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-teal-700 flex items-center justify-center text-[12px] font-bold text-white shrink-0">F</div>
              <div><p class="text-[12px] font-semibold text-[#e0e0e0]">Facile.it</p><p class="text-[11px] text-[#777]">DevOps Engineer</p></div>
            </div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="tag bg-amber-900/50 text-amber-300">Hybrid</span>
              <span class="tag bg-[#333] text-[#888]">Milano</span>
            </div>
            <p class="text-[11px] text-[#666]">€52k – €68k · 📅 26 mar</p>
          </div>
        </div>

        <!-- Technical -->
        <div class="kanban-col flex flex-col gap-2">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[12px] font-semibold text-[#888]">💻 Technical <span class="text-[#555] font-normal ml-1">2</span></span>
            <button class="text-[#555] hover:text-[#aaa] text-lg leading-none">+</button>
          </div>
          <div class="card-hover bg-[#1e1e1e] rounded-lg p-3 border border-[#2d2d2d] cursor-pointer transition-colors">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-indigo-700 flex items-center justify-center text-[12px] font-bold text-white shrink-0">P</div>
              <div><p class="text-[12px] font-semibold text-[#e0e0e0]">Prima.it</p><p class="text-[11px] text-[#777]">Senior React Dev</p></div>
            </div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="tag bg-blue-900/50 text-blue-300">Remote</span>
            </div>
            <p class="text-[11px] text-[#666]">€65k – €85k · 📅 27 mar</p>
          </div>
          <div class="card-hover bg-[#1e1e1e] rounded-lg p-3 border border-[#2d2d2d] cursor-pointer transition-colors">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-yellow-700 flex items-center justify-center text-[12px] font-bold text-white shrink-0">K</div>
              <div><p class="text-[12px] font-semibold text-[#e0e0e0]">Klarna</p><p class="text-[11px] text-[#777]">iOS Developer</p></div>
            </div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="tag bg-amber-900/50 text-amber-300">Hybrid</span>
              <span class="tag bg-[#333] text-[#888]">Svezia</span>
            </div>
            <p class="text-[11px] text-[#666]">€85k – €110k · 📅 28 mar</p>
          </div>
        </div>

        <!-- Final Round -->
        <div class="kanban-col flex flex-col gap-2">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[12px] font-semibold text-[#888]">🤝 Final Round <span class="text-[#555] font-normal ml-1">2</span></span>
            <button class="text-[#555] hover:text-[#aaa] text-lg leading-none">+</button>
          </div>
          <div class="card-hover bg-[#1e1e1e] rounded-lg p-3 border border-[#2d2d2d] cursor-pointer transition-colors border-l-2 border-l-purple-500">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-orange-600 flex items-center justify-center text-[12px] font-bold text-white shrink-0">C</div>
              <div><p class="text-[12px] font-semibold text-[#e0e0e0]">Cortilia</p><p class="text-[11px] text-[#777]">CTO Office</p></div>
            </div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="tag bg-orange-900/50 text-orange-300">On-site</span>
              <span class="tag bg-[#333] text-[#888]">Milano</span>
            </div>
            <p class="text-[11px] text-[#666]">€70k – €90k · 📅 29 mar</p>
          </div>
          <div class="card-hover bg-[#1e1e1e] rounded-lg p-3 border border-[#2d2d2d] cursor-pointer transition-colors border-l-2 border-l-purple-500">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-pink-700 flex items-center justify-center text-[12px] font-bold text-white shrink-0">A</div>
              <div><p class="text-[12px] font-semibold text-[#e0e0e0]">Airbnb</p><p class="text-[11px] text-[#777]">Platform Eng.</p></div>
            </div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="tag bg-blue-900/50 text-blue-300">Remote</span>
            </div>
            <p class="text-[11px] text-[#666]">€110k – €140k · 📅 1 apr</p>
          </div>
        </div>

        <!-- Offer -->
        <div class="kanban-col flex flex-col gap-2">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[12px] font-semibold text-[#888]">🎉 Offer <span class="text-[#555] font-normal ml-1">1</span></span>
            <button class="text-[#555] hover:text-[#aaa] text-lg leading-none">+</button>
          </div>
          <div class="card-hover bg-[#1e1e1e] rounded-lg p-3 border border-[#2d2d2d] cursor-pointer transition-colors border-l-2 border-l-green-500">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-green-700 flex items-center justify-center text-[12px] font-bold text-white shrink-0">M</div>
              <div><p class="text-[12px] font-semibold text-[#e0e0e0]">Musixmatch</p><p class="text-[11px] text-[#777]">Frontend Lead</p></div>
            </div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="tag bg-green-900/50 text-green-300">✓ Offerta ricevuta</span>
            </div>
            <p class="text-[11px] text-green-500 font-semibold">€82k · Scade 30 mar</p>
          </div>
        </div>

        <!-- Rejected -->
        <div class="kanban-col flex flex-col gap-2">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[12px] font-semibold text-[#888]">❌ Rejected <span class="text-[#555] font-normal ml-1">4</span></span>
          </div>
          <div class="card-hover bg-[#1a1a1a] rounded-lg p-3 border border-[#252525] cursor-pointer transition-colors opacity-60">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center text-[12px] font-bold text-white shrink-0">G</div>
              <div><p class="text-[12px] font-semibold text-[#888] line-through">Google</p><p class="text-[11px] text-[#555]">SWE L4</p></div>
            </div>
            <p class="text-[11px] text-[#555]">€100k+ · Rifiutato 14 mar</p>
          </div>
          <div class="card-hover bg-[#1a1a1a] rounded-lg p-3 border border-[#252525] cursor-pointer transition-colors opacity-60">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center text-[12px] font-bold text-white shrink-0">M</div>
              <div><p class="text-[12px] font-semibold text-[#888] line-through">Meta</p><p class="text-[11px] text-[#555]">Frontend Dev</p></div>
            </div>
            <p class="text-[11px] text-[#555]">€120k+ · Rifiutato 16 mar</p>
          </div>
          <div class="card-hover bg-[#1a1a1a] rounded-lg p-3 border border-[#252525] cursor-pointer transition-colors opacity-60">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center text-[12px] font-bold text-white shrink-0">U</div>
              <div><p class="text-[12px] font-semibold text-[#888] line-through">Uber</p><p class="text-[11px] text-[#555]">Staff Eng.</p></div>
            </div>
            <p class="text-[11px] text-[#555]">€115k+ · Rifiutato 18 mar</p>
          </div>
        </div>

      </div>

      <!-- Divider -->
      <div class="flex items-center gap-3 my-6">
        <div class="h-px flex-1 bg-[#2d2d2d]"></div>
        <span class="text-[11px] text-[#555] font-semibold uppercase tracking-wider">Interview Prep & Prossimi Colloqui</span>
        <div class="h-px flex-1 bg-[#2d2d2d]"></div>
      </div>

      <!-- Bottom Section: Prep + Upcoming -->
      <div class="flex gap-5 pb-8" style="min-width:900px;">

        <!-- Checklist -->
        <div class="flex-1 bg-[#1e1e1e] rounded-xl border border-[#2d2d2d] p-4">
          <h3 class="text-[14px] font-semibold text-[#d0d0d0] mb-3">🎯 Interview Prep Checklist</h3>
          <div class="flex flex-col gap-2">
            <label class="checklist-item flex items-center gap-2.5 cursor-pointer"><input type="checkbox" checked><span class="text-[13px] text-[#888] line-through">Rivedere algoritmi e strutture dati</span></label>
            <label class="checklist-item flex items-center gap-2.5 cursor-pointer"><input type="checkbox" checked><span class="text-[13px] text-[#888] line-through">Preparare risposta "Parlami di te"</span></label>
            <label class="checklist-item flex items-center gap-2.5 cursor-pointer"><input type="checkbox" checked><span class="text-[13px] text-[#888] line-through">Studiare tech stack di Stripe</span></label>
            <label class="checklist-item flex items-center gap-2.5 cursor-pointer"><input type="checkbox"><span class="text-[13px] text-[#c0c0c0]">Preparare domande per l'intervistatore</span></label>
            <label class="checklist-item flex items-center gap-2.5 cursor-pointer"><input type="checkbox"><span class="text-[13px] text-[#c0c0c0]">Esercitarsi su LeetCode (30 medium)</span></label>
            <label class="checklist-item flex items-center gap-2.5 cursor-pointer"><input type="checkbox"><span class="text-[13px] text-[#c0c0c0]">Revisionare system design interview</span></label>
            <label class="checklist-item flex items-center gap-2.5 cursor-pointer"><input type="checkbox"><span class="text-[13px] text-[#c0c0c0]">Mock interview con amico (React)</span></label>
            <label class="checklist-item flex items-center gap-2.5 cursor-pointer"><input type="checkbox"><span class="text-[13px] text-[#c0c0c0]">Aggiornare portfolio con ultimi progetti</span></label>
            <label class="checklist-item flex items-center gap-2.5 cursor-pointer"><input type="checkbox"><span class="text-[13px] text-[#c0c0c0]">Ricercare cultura aziendale Klarna</span></label>
          </div>
          <div class="mt-3 pt-3 border-t border-[#2d2d2d]">
            <div class="flex items-center justify-between mb-1">
              <span class="text-[11px] text-[#666]">Progresso</span>
              <span class="text-[11px] text-[#888]">3 / 9</span>
            </div>
            <div class="w-full bg-[#2d2d2d] rounded-full h-1.5">
              <div class="bg-blue-500 h-1.5 rounded-full" style="width:33%"></div>
            </div>
          </div>
        </div>

        <!-- Upcoming Interviews Table -->
        <div class="flex-1 bg-[#1e1e1e] rounded-xl border border-[#2d2d2d] p-4">
          <h3 class="text-[14px] font-semibold text-[#d0d0d0] mb-3">📅 Prossimi Colloqui</h3>
          <table class="w-full text-[12px]">
            <thead>
              <tr class="border-b border-[#2d2d2d]">
                <th class="text-left text-[#555] font-semibold pb-2 pr-3">Azienda</th>
                <th class="text-left text-[#555] font-semibold pb-2 pr-3">Tipo</th>
                <th class="text-left text-[#555] font-semibold pb-2 pr-3">Data</th>
                <th class="text-left text-[#555] font-semibold pb-2">Stato</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#252525]">
              <tr>
                <td class="py-2 pr-3"><div class="flex items-center gap-1.5"><div class="w-4 h-4 rounded-full bg-blue-700 flex items-center justify-center text-[9px] font-bold text-white">S</div><span class="text-[#d0d0d0] font-medium">Stripe</span></div></td>
                <td class="py-2 pr-3 text-[#888]">Phone Screen</td>
                <td class="py-2 pr-3 text-[#888]">24 mar 10:00</td>
                <td class="py-2"><span class="tag bg-blue-900/50 text-blue-300">Confermato</span></td>
              </tr>
              <tr>
                <td class="py-2 pr-3"><div class="flex items-center gap-1.5"><div class="w-4 h-4 rounded-full bg-red-700 flex items-center justify-center text-[9px] font-bold text-white">N</div><span class="text-[#d0d0d0] font-medium">Nexi</span></div></td>
                <td class="py-2 pr-3 text-[#888]">HR Interview</td>
                <td class="py-2 pr-3 text-[#888]">25 mar 14:30</td>
                <td class="py-2"><span class="tag bg-blue-900/50 text-blue-300">Confermato</span></td>
              </tr>
              <tr>
                <td class="py-2 pr-3"><div class="flex items-center gap-1.5"><div class="w-4 h-4 rounded-full bg-teal-700 flex items-center justify-center text-[9px] font-bold text-white">F</div><span class="text-[#d0d0d0] font-medium">Facile.it</span></div></td>
                <td class="py-2 pr-3 text-[#888]">Tecnico</td>
                <td class="py-2 pr-3 text-[#888]">26 mar 11:00</td>
                <td class="py-2"><span class="tag bg-amber-900/50 text-amber-300">Da conf.</span></td>
              </tr>
              <tr>
                <td class="py-2 pr-3"><div class="flex items-center gap-1.5"><div class="w-4 h-4 rounded-full bg-indigo-700 flex items-center justify-center text-[9px] font-bold text-white">P</div><span class="text-[#d0d0d0] font-medium">Prima.it</span></div></td>
                <td class="py-2 pr-3 text-[#888]">Live Coding</td>
                <td class="py-2 pr-3 text-[#888]">27 mar 15:00</td>
                <td class="py-2"><span class="tag bg-blue-900/50 text-blue-300">Confermato</span></td>
              </tr>
              <tr>
                <td class="py-2 pr-3"><div class="flex items-center gap-1.5"><div class="w-4 h-4 rounded-full bg-yellow-700 flex items-center justify-center text-[9px] font-bold text-white">K</div><span class="text-[#d0d0d0] font-medium">Klarna</span></div></td>
                <td class="py-2 pr-3 text-[#888]">System Design</td>
                <td class="py-2 pr-3 text-[#888]">28 mar 09:30</td>
                <td class="py-2"><span class="tag bg-purple-900/50 text-purple-300">Prep. needed</span></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </main>
</div>
`,
  },
  {
    id: "notion-weekly-review",
    name: "Notion Weekly Review System",
    category: "ui",
    price: 799,
    stripePriceId: "price_1TCIgFBoWNgrJbiySP8ORstl",
    downloadType: "notion",
    downloadUrl: "", // TODO: incolla qui il link di duplicazione Notion
    tags: ["notion", "weekly review", "productivity", "goals", "reflection"],
    downloads: 234,
    description: "Structured weekly and monthly review template to stay aligned with goals.",
    isNew: true,
    editorsPick: false,
    content: `<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: { inter: ['Inter', 'sans-serif'] },
        colors: {
          notion: {
            bg: '#191919',
            sidebar: '#161616',
            hover: '#252525',
            border: '#2e2e2e',
            text: '#e6e6e6',
            muted: '#999999',
            accent: '#e8a87c',
          }
        }
      }
    }
  }
</script>
<style>
  body { font-family: 'Inter', sans-serif; background: #191919; color: #e6e6e6; margin: 0; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #3a3a3a; border-radius: 3px; }
  .dot-filled { background: #e8a87c; }
  .dot-empty { background: #2e2e2e; }
  .habit-check { color: #6dbd8a; }
  .habit-x { color: #e06c75; }
  .tag-high { background: rgba(224, 108, 117, 0.15); color: #e06c75; border: 1px solid rgba(224,108,117,0.3); }
  .tag-mid  { background: rgba(232, 168, 124, 0.15); color: #e8a87c; border: 1px solid rgba(232,168,124,0.3); }
  .tag-low  { background: rgba(109, 189, 138, 0.15); color: #6dbd8a; border: 1px solid rgba(109,189,138,0.3); }
  .sidebar-item { display: flex; align-items: center; gap: 8px; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 13.5px; color: #999; transition: background 0.1s; }
  .sidebar-item:hover, .sidebar-item.active { background: #252525; color: #e6e6e6; }
  .sidebar-item.active { color: #e6e6e6; }
  .section-title { font-size: 15px; font-weight: 600; color: #e6e6e6; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
  .card { background: #1f1f1f; border: 1px solid #2e2e2e; border-radius: 8px; padding: 20px; }
  .past-card { background: #1f1f1f; border: 1px solid #2e2e2e; border-radius: 8px; padding: 16px; cursor: pointer; transition: border-color 0.15s, transform 0.15s; }
  .past-card:hover { border-color: #e8a87c; transform: translateY(-2px); }
</style>

<div class="flex h-screen overflow-hidden dark" style="background:#191919;">

  <!-- Sidebar -->
  <aside style="width:220px;min-width:220px;background:#161616;border-right:1px solid #2e2e2e;display:flex;flex-direction:column;padding:16px 8px;overflow-y:auto;flex-shrink:0;">
    <div style="padding:0 12px 16px;border-bottom:1px solid #2e2e2e;margin-bottom:8px;">
      <div style="font-size:12px;font-weight:600;letter-spacing:.08em;color:#666;text-transform:uppercase;margin-bottom:2px;">Workspace</div>
      <div style="font-size:14px;font-weight:600;color:#e6e6e6;">Nicolò · Life OS</div>
    </div>
    <div style="font-size:11px;font-weight:600;letter-spacing:.08em;color:#555;text-transform:uppercase;padding:8px 12px 4px;">Review System</div>
    <div class="sidebar-item active">📋 Weekly Review</div>
    <div class="sidebar-item">🎯 Goals</div>
    <div class="sidebar-item">✅ Habits</div>
    <div class="sidebar-item">📔 Journal</div>
    <div style="font-size:11px;font-weight:600;letter-spacing:.08em;color:#555;text-transform:uppercase;padding:16px 12px 4px;">Archivio</div>
    <div class="sidebar-item">📅 Monthly Review</div>
    <div class="sidebar-item">🌍 Annual Review</div>
    <div style="margin-top:auto;padding:12px 12px 0;border-top:1px solid #2e2e2e;">
      <div style="font-size:11px;color:#555;">Ultima modifica</div>
      <div style="font-size:12px;color:#777;">23 marzo 2026</div>
    </div>
  </aside>

  <!-- Main content -->
  <main style="flex:1;overflow-y:auto;padding:40px 48px 60px;">

    <!-- Page header -->
    <div style="margin-bottom:8px;">
      <span style="font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#666;">Weekly Review</span>
    </div>
    <h1 style="font-size:30px;font-weight:700;color:#e6e6e6;margin:0 0 4px;">📋 Settimana 12</h1>
    <p style="font-size:15px;color:#777;margin:0 0 32px;">17 – 23 Marzo 2026 &nbsp;·&nbsp; <span style="color:#e8a87c;font-weight:500;">Punteggio globale: 4/5</span></p>

    <!-- Divider -->
    <div style="border-top:1px solid #2e2e2e;margin-bottom:32px;"></div>

    <!-- Row 1: Retrospettiva + Scorecard -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">

      <!-- Retrospettiva -->
      <div class="card">
        <div class="section-title">🔙 Retrospettiva</div>

        <div style="margin-bottom:14px;">
          <div style="font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#6dbd8a;margin-bottom:8px;">Wins</div>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px;">
            <li style="display:flex;align-items:flex-start;gap:8px;font-size:13.5px;color:#ccc;">
              <span style="color:#6dbd8a;margin-top:1px;">▸</span>
              Lanciato la prima versione del template marketplace in produzione
            </li>
            <li style="display:flex;align-items:flex-start;gap:8px;font-size:13.5px;color:#ccc;">
              <span style="color:#6dbd8a;margin-top:1px;">▸</span>
              Mantenuto la routine mattutina 6/7 giorni consecutivi
            </li>
            <li style="display:flex;align-items:flex-start;gap:8px;font-size:13.5px;color:#ccc;">
              <span style="color:#6dbd8a;margin-top:1px;">▸</span>
              Completata la lettura di "Atomic Habits" — messi in pratica 2 principi chiave
            </li>
          </ul>
        </div>

        <div style="margin-bottom:14px;">
          <div style="font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#e06c75;margin-bottom:8px;">Sfide</div>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px;">
            <li style="display:flex;align-items:flex-start;gap:8px;font-size:13.5px;color:#ccc;">
              <span style="color:#e06c75;margin-top:1px;">▸</span>
              Gestione del tempo frammentata mercoledì e giovedì (troppe riunioni)
            </li>
            <li style="display:flex;align-items:flex-start;gap:8px;font-size:13.5px;color:#ccc;">
              <span style="color:#e06c75;margin-top:1px;">▸</span>
              Alimentazione fuori controllo nel weekend — mancanza di meal prep
            </li>
          </ul>
        </div>

        <div>
          <div style="font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#999;margin-bottom:8px;">Lezione chiave</div>
          <p style="font-size:13.5px;color:#bbb;line-height:1.6;margin:0;font-style:italic;">
            "Proteggere i blocchi profondi di lavoro non è egoismo — è la condizione per dare il meglio. Imparare a dire no alle riunioni non urgenti è un'abilità da allenare come un muscolo."
          </p>
        </div>
      </div>

      <!-- Scorecard -->
      <div class="card">
        <div class="section-title">📊 Scorecard</div>
        <div style="display:flex;flex-direction:column;gap:16px;">

          <!-- Area row -->
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="font-size:13.5px;color:#ccc;width:90px;">💼 Lavoro</div>
            <div style="display:flex;gap:4px;">
              <div style="width:12px;height:12px;border-radius:50%;background:#e8a87c;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#e8a87c;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#e8a87c;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#e8a87c;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#2e2e2e;"></div>
            </div>
            <div style="font-size:12px;color:#777;width:28px;text-align:right;">4/5</div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="font-size:13.5px;color:#ccc;width:90px;">💪 Salute</div>
            <div style="display:flex;gap:4px;">
              <div style="width:12px;height:12px;border-radius:50%;background:#6dbd8a;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#6dbd8a;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#6dbd8a;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#2e2e2e;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#2e2e2e;"></div>
            </div>
            <div style="font-size:12px;color:#777;width:28px;text-align:right;">3/5</div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="font-size:13.5px;color:#ccc;width:90px;">❤️ Relazioni</div>
            <div style="display:flex;gap:4px;">
              <div style="width:12px;height:12px;border-radius:50%;background:#c085f5;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#c085f5;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#c085f5;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#c085f5;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#2e2e2e;"></div>
            </div>
            <div style="font-size:12px;color:#777;width:28px;text-align:right;">4/5</div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="font-size:13.5px;color:#ccc;width:90px;">📚 Crescita</div>
            <div style="display:flex;gap:4px;">
              <div style="width:12px;height:12px;border-radius:50%;background:#5bc4d4;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#5bc4d4;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#5bc4d4;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#5bc4d4;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#5bc4d4;"></div>
            </div>
            <div style="font-size:12px;color:#777;width:28px;text-align:right;">5/5</div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="font-size:13.5px;color:#ccc;width:90px;">💰 Finanze</div>
            <div style="display:flex;gap:4px;">
              <div style="width:12px;height:12px;border-radius:50%;background:#e8a87c;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#e8a87c;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#e8a87c;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#2e2e2e;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#2e2e2e;"></div>
            </div>
            <div style="font-size:12px;color:#777;width:28px;text-align:right;">3/5</div>
          </div>

          <div style="border-top:1px solid #2e2e2e;padding-top:14px;display:flex;justify-content:space-between;align-items:center;">
            <div style="font-size:13px;color:#999;">Media complessiva</div>
            <div style="font-size:17px;font-weight:700;color:#e8a87c;">3.8 / 5</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Row 2: Tasks completati / non completati -->
    <div class="card" style="margin-bottom:20px;">
      <div class="section-title">📋 Task della Settimana</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">

        <div>
          <div style="font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#6dbd8a;margin-bottom:10px;">✅ Completati</div>
          <div style="display:flex;flex-direction:column;gap:7px;">
            <label style="display:flex;align-items:center;gap:8px;font-size:13.5px;color:#aaa;cursor:pointer;">
              <span style="width:14px;height:14px;border-radius:3px;background:#6dbd8a;display:flex;align-items:center;justify-content:center;font-size:9px;color:#161616;flex-shrink:0;">✓</span>
              Deploy versione 1.0 del marketplace
            </label>
            <label style="display:flex;align-items:center;gap:8px;font-size:13.5px;color:#aaa;">
              <span style="width:14px;height:14px;border-radius:3px;background:#6dbd8a;display:flex;align-items:center;justify-content:center;font-size:9px;color:#161616;flex-shrink:0;">✓</span>
              Impostare webhook Stripe in produzione
            </label>
            <label style="display:flex;align-items:center;gap:8px;font-size:13.5px;color:#aaa;">
              <span style="width:14px;height:14px;border-radius:3px;background:#6dbd8a;display:flex;align-items:center;justify-content:center;font-size:9px;color:#161616;flex-shrink:0;">✓</span>
              Scrivere 3 nuovi template UI
            </label>
            <label style="display:flex;align-items:center;gap:8px;font-size:13.5px;color:#aaa;">
              <span style="width:14px;height:14px;border-radius:3px;background:#6dbd8a;display:flex;align-items:center;justify-content:center;font-size:9px;color:#161616;flex-shrink:0;">✓</span>
              Chiamata con mentor — strategia di crescita
            </label>
            <label style="display:flex;align-items:center;gap:8px;font-size:13.5px;color:#aaa;">
              <span style="width:14px;height:14px;border-radius:3px;background:#6dbd8a;display:flex;align-items:center;justify-content:center;font-size:9px;color:#161616;flex-shrink:0;">✓</span>
              Allenamento × 4 sessioni in palestra
            </label>
          </div>
        </div>

        <div>
          <div style="font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#e06c75;margin-bottom:10px;">❌ Non Completati</div>
          <div style="display:flex;flex-direction:column;gap:7px;">
            <label style="display:flex;align-items:center;gap:8px;font-size:13.5px;color:#777;">
              <span style="width:14px;height:14px;border-radius:3px;border:1px solid #e06c75;display:flex;align-items:center;justify-content:center;font-size:9px;color:#e06c75;flex-shrink:0;">✕</span>
              Scrivere post LinkedIn sul lancio
            </label>
            <label style="display:flex;align-items:center;gap:8px;font-size:13.5px;color:#777;">
              <span style="width:14px;height:14px;border-radius:3px;border:1px solid #e06c75;display:flex;align-items:center;justify-content:center;font-size:9px;color:#e06c75;flex-shrink:0;">✕</span>
              Meal prep domenicale
            </label>
            <label style="display:flex;align-items:center;gap:8px;font-size:13.5px;color:#777;">
              <span style="width:14px;height:14px;border-radius:3px;border:1px solid #e06c75;display:flex;align-items:center;justify-content:center;font-size:9px;color:#e06c75;flex-shrink:0;">✕</span>
              Revisione budget mensile
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Row 3: Obiettivi prossima settimana -->
    <div class="card" style="margin-bottom:20px;">
      <div class="section-title">🎯 Obiettivi Prossima Settimana</div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="tag-high" style="font-size:10px;font-weight:600;padding:2px 7px;border-radius:4px;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;">Alta</span>
          <span style="font-size:13.5px;color:#ccc;">Scrivere e pubblicare 5 nuovi template (2 UI, 3 prompt)</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="tag-high" style="font-size:10px;font-weight:600;padding:2px 7px;border-radius:4px;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;">Alta</span>
          <span style="font-size:13.5px;color:#ccc;">Lanciare campagna newsletter di onboarding (500 iscritti target)</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="tag-mid" style="font-size:10px;font-weight:600;padding:2px 7px;border-radius:4px;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;">Media</span>
          <span style="font-size:13.5px;color:#ccc;">Meal prep domenica — preparare pasti per 5 giorni</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="tag-mid" style="font-size:10px;font-weight:600;padding:2px 7px;border-radius:4px;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;">Media</span>
          <span style="font-size:13.5px;color:#ccc;">Pubblicare post LinkedIn sul lancio con risultati reali</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="tag-low" style="font-size:10px;font-weight:600;padding:2px 7px;border-radius:4px;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;">Bassa</span>
          <span style="font-size:13.5px;color:#ccc;">Aggiornare Notion OS con nuove aree di vita Q2</span>
        </div>
      </div>
    </div>

    <!-- Row 4: Habit Tracker -->
    <div class="card" style="margin-bottom:20px;">
      <div class="section-title">📅 Habit Tracker — Settimana 12</div>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:520px;">
          <thead>
            <tr>
              <th style="text-align:left;font-size:12px;color:#666;font-weight:500;padding:0 12px 10px 0;width:140px;">Abitudine</th>
              <th style="text-align:center;font-size:11px;color:#666;font-weight:500;padding:0 8px 10px;width:42px;">Lun</th>
              <th style="text-align:center;font-size:11px;color:#666;font-weight:500;padding:0 8px 10px;width:42px;">Mar</th>
              <th style="text-align:center;font-size:11px;color:#666;font-weight:500;padding:0 8px 10px;width:42px;">Mer</th>
              <th style="text-align:center;font-size:11px;color:#666;font-weight:500;padding:0 8px 10px;width:42px;">Gio</th>
              <th style="text-align:center;font-size:11px;color:#666;font-weight:500;padding:0 8px 10px;width:42px;">Ven</th>
              <th style="text-align:center;font-size:11px;color:#666;font-weight:500;padding:0 8px 10px;width:42px;">Sab</th>
              <th style="text-align:center;font-size:11px;color:#666;font-weight:500;padding:0 8px 10px;width:42px;">Dom</th>
              <th style="text-align:right;font-size:11px;color:#666;font-weight:500;padding:0 0 10px 12px;">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-top:1px solid #2e2e2e;">
              <td style="font-size:13px;color:#ccc;padding:9px 0;">🧘 Meditazione</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#e06c75;padding:9px 8px;">✕</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:right;font-size:12px;color:#e8a87c;font-weight:600;padding:9px 0;">6/7</td>
            </tr>
            <tr style="border-top:1px solid #2e2e2e;">
              <td style="font-size:13px;color:#ccc;padding:9px 0;">🏋️ Esercizio</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#e06c75;padding:9px 8px;">✕</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#e06c75;padding:9px 8px;">✕</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#e06c75;padding:9px 8px;">✕</td>
              <td style="text-align:right;font-size:12px;color:#e8a87c;font-weight:600;padding:9px 0;">4/7</td>
            </tr>
            <tr style="border-top:1px solid #2e2e2e;">
              <td style="font-size:13px;color:#ccc;padding:9px 0;">📖 Lettura</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:right;font-size:12px;color:#6dbd8a;font-weight:600;padding:9px 0;">7/7</td>
            </tr>
            <tr style="border-top:1px solid #2e2e2e;">
              <td style="font-size:13px;color:#ccc;padding:9px 0;">✍️ Journaling</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#e06c75;padding:9px 8px;">✕</td>
              <td style="text-align:center;font-size:14px;color:#e06c75;padding:9px 8px;">✕</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:right;font-size:12px;color:#e8a87c;font-weight:600;padding:9px 0;">5/7</td>
            </tr>
            <tr style="border-top:1px solid #2e2e2e;">
              <td style="font-size:13px;color:#ccc;padding:9px 0;">📵 No Social</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:center;font-size:14px;color:#e06c75;padding:9px 8px;">✕</td>
              <td style="text-align:center;font-size:14px;color:#e06c75;padding:9px 8px;">✕</td>
              <td style="text-align:center;font-size:14px;color:#e06c75;padding:9px 8px;">✕</td>
              <td style="text-align:center;font-size:14px;color:#6dbd8a;padding:9px 8px;">✓</td>
              <td style="text-align:right;font-size:12px;color:#e8a87c;font-weight:600;padding:9px 0;">4/7</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Row 5: Gratitudine + Note Libere -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">

      <!-- Gratitudine -->
      <div class="card">
        <div class="section-title">💭 Gratitudine</div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="display:flex;gap:10px;align-items:flex-start;">
            <span style="font-size:18px;line-height:1;">1.</span>
            <p style="margin:0;font-size:13.5px;color:#bbb;line-height:1.6;">Sono grato per la community che si sta formando attorno al progetto — i primi utenti sono entusiasti e questo mi ricarica di energia.</p>
          </div>
          <div style="display:flex;gap:10px;align-items:flex-start;">
            <span style="font-size:18px;line-height:1;">2.</span>
            <p style="margin:0;font-size:13.5px;color:#bbb;line-height:1.6;">Grato per la salute e la disciplina di svegliarmi presto ogni mattina — quella tranquillità alle 6:00 è un regalo.</p>
          </div>
          <div style="display:flex;gap:10px;align-items:flex-start;">
            <span style="font-size:18px;line-height:1;">3.</span>
            <p style="margin:0;font-size:13.5px;color:#bbb;line-height:1.6;">Grato per le persone vicine che credono nel progetto anche quando io stesso dubito — la loro fiducia vale più di qualsiasi metrica.</p>
          </div>
        </div>
      </div>

      <!-- Note Libere -->
      <div class="card">
        <div class="section-title">📝 Note Libere</div>
        <div style="background:#191919;border:1px solid #2e2e2e;border-radius:6px;padding:14px;font-size:13.5px;color:#bbb;line-height:1.8;min-height:160px;">
          <p style="margin:0 0 12px;">Questa settimana mi ha insegnato che la velocità di esecuzione è un vantaggio competitivo reale. Lanciare in fretta, iterare veloce — è l'unica strategia che ha senso in questa fase.</p>
          <p style="margin:0 0 12px;">Ho iniziato a percepire la differenza tra le giornate con "protezione dei blocchi di lavoro" e quelle no. La frammentazione è il nemico silenzioso della produttività creativa.</p>
          <p style="margin:0;color:#555;">Prossima settimana: implementare la "regola delle 2 riunioni" — massimo 2 call al giorno, tutte nel pomeriggio.</p>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div style="border-top:1px solid #2e2e2e;margin:8px 0 28px;"></div>

    <!-- Past weeks gallery -->
    <div style="margin-bottom:12px;">
      <div style="font-size:13px;font-weight:600;color:#666;letter-spacing:.06em;text-transform:uppercase;margin-bottom:16px;">Archivio Settimane Precedenti</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">

        <div class="past-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
            <div>
              <div style="font-size:12px;color:#666;margin-bottom:2px;">Settimana 11</div>
              <div style="font-size:13.5px;font-weight:600;color:#ccc;">10 – 16 Marzo 2026</div>
            </div>
            <div style="background:rgba(232,168,124,0.15);color:#e8a87c;border:1px solid rgba(232,168,124,0.3);font-size:12px;font-weight:700;padding:3px 8px;border-radius:5px;">3.6</div>
          </div>
          <div style="font-size:12px;color:#666;line-height:1.5;">Focus: onboarding utenti. Settimana intensa, qualità del sonno bassa. Migliorata la disciplina nel journaling.</div>
          <div style="margin-top:10px;display:flex;gap:3px;">
            <div style="height:3px;border-radius:2px;background:#e8a87c;flex:3.6;"></div>
            <div style="height:3px;border-radius:2px;background:#2e2e2e;flex:1.4;"></div>
          </div>
        </div>

        <div class="past-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
            <div>
              <div style="font-size:12px;color:#666;margin-bottom:2px;">Settimana 10</div>
              <div style="font-size:13.5px;font-weight:600;color:#ccc;">3 – 9 Marzo 2026</div>
            </div>
            <div style="background:rgba(109,189,138,0.15);color:#6dbd8a;border:1px solid rgba(109,189,138,0.3);font-size:12px;font-weight:700;padding:3px 8px;border-radius:5px;">4.2</div>
          </div>
          <div style="font-size:12px;color:#666;line-height:1.5;">Settimana di picco creativo. Scritti 7 template in 5 giorni. Routine perfetta. La migliore settimana del Q1.</div>
          <div style="margin-top:10px;display:flex;gap:3px;">
            <div style="height:3px;border-radius:2px;background:#6dbd8a;flex:4.2;"></div>
            <div style="height:3px;border-radius:2px;background:#2e2e2e;flex:0.8;"></div>
          </div>
        </div>

        <div class="past-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
            <div>
              <div style="font-size:12px;color:#666;margin-bottom:2px;">Settimana 9</div>
              <div style="font-size:13.5px;font-weight:600;color:#ccc;">24 Feb – 2 Mar 2026</div>
            </div>
            <div style="background:rgba(224,108,117,0.12);color:#e06c75;border:1px solid rgba(224,108,117,0.3);font-size:12px;font-weight:700;padding:3px 8px;border-radius:5px;">2.9</div>
          </div>
          <div style="font-size:12px;color:#666;line-height:1.5;">Settimana difficile. Mal di testa cronico, poca concentrazione. Completate solo le priorità essenziali.</div>
          <div style="margin-top:10px;display:flex;gap:3px;">
            <div style="height:3px;border-radius:2px;background:#e06c75;flex:2.9;"></div>
            <div style="height:3px;border-radius:2px;background:#2e2e2e;flex:2.1;"></div>
          </div>
        </div>

      </div>
    </div>

  </main>
</div>
`,
  },
  {
    id: "notion-client-portal",
    name: "Notion Client Portal",
    category: "ui",
    price: 1299,
    stripePriceId: "price_1TCIgFBoWNgrJbiyGO4iJItH",
    downloadType: "notion",
    downloadUrl: "", // TODO: incolla qui il link di duplicazione Notion
    tags: ["notion", "client portal", "freelance", "agency", "onboarding"],
    downloads: 267,
    description: "Shareable Notion workspace for client onboarding, deliverables and updates.",
    isNew: true,
    editorsPick: true,
    content: `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: { inter: ['Inter', 'sans-serif'] },
        colors: {
          notion: {
            bg: '#191919',
            sidebar: '#161616',
            hover: '#252525',
            border: '#2e2e2e',
            text: '#e6e6e6',
            muted: '#9b9b9b',
            accent: '#5865f2',
            tag: {
              green: { bg: '#1b3a2d', text: '#4cc38a' },
              yellow: { bg: '#3a2e1b', text: '#f0b429' },
              blue: { bg: '#1b2a3a', text: '#60a5fa' },
              red: { bg: '#3a1b1b', text: '#f87171' },
            }
          }
        }
      }
    }
  }
</script>
<style>
  * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
  body { margin: 0; background: #191919; color: #e6e6e6; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #3a3a3a; border-radius: 3px; }
  .sidebar-item { display: flex; align-items: center; gap: 8px; padding: 5px 12px; border-radius: 6px; cursor: pointer; font-size: 14px; color: #9b9b9b; transition: background 0.15s, color 0.15s; }
  .sidebar-item:hover, .sidebar-item.active { background: #252525; color: #e6e6e6; }
  .progress-bar-fill { background: linear-gradient(90deg, #5865f2, #818cf8); border-radius: 4px; height: 100%; transition: width 0.6s ease; }
  .timeline-line { position: absolute; top: 14px; left: 0; right: 0; height: 2px; background: #2e2e2e; z-index: 0; }
  .timeline-dot { position: relative; z-index: 1; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
  .faq-answer { display: none; }
  .faq-item.open .faq-answer { display: block; }
  .faq-item.open .faq-chevron { transform: rotate(90deg); }
  .faq-chevron { transition: transform 0.2s ease; display: inline-block; }
  .tag { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 500; }
  .section-block { background: #202020; border: 1px solid #2e2e2e; border-radius: 10px; padding: 24px; margin-bottom: 20px; }
  .section-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
  .comment-bubble { background: #252525; border: 1px solid #2e2e2e; border-radius: 10px; padding: 12px 16px; }
  .comment-bubble.studio { border-left: 3px solid #5865f2; }
  .comment-bubble.client { border-left: 3px solid #4cc38a; }
  table { width: 100%; border-collapse: collapse; }
  thead th { text-align: left; font-size: 12px; font-weight: 600; color: #9b9b9b; text-transform: uppercase; letter-spacing: 0.05em; padding: 8px 12px; border-bottom: 1px solid #2e2e2e; }
  tbody td { padding: 10px 12px; border-bottom: 1px solid #252525; font-size: 14px; vertical-align: middle; }
  tbody tr:last-child td { border-bottom: none; }
  tbody tr:hover td { background: #252525; }
  .check-item { display: flex; align-items: center; gap: 10px; padding: 7px 0; font-size: 14px; }
  .check-circle { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #3a3a3a; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .check-circle.done { background: #5865f2; border-color: #5865f2; }
  .download-link { color: #818cf8; text-decoration: none; font-size: 13px; display: inline-flex; align-items: center; gap: 4px; }
  .download-link:hover { color: #a5b4fc; text-decoration: underline; }
</style>

<div class="flex h-screen overflow-hidden dark">

  <!-- Sidebar -->
  <aside style="width:240px;min-width:240px;background:#161616;border-right:1px solid #2e2e2e;display:flex;flex-direction:column;padding:16px 8px;overflow-y:auto;">

    <!-- Workspace header -->
    <div style="padding:8px 12px 16px;border-bottom:1px solid #2e2e2e;margin-bottom:12px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="width:32px;height:32px;background:linear-gradient(135deg,#5865f2,#818cf8);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">🏢</div>
        <div>
          <div style="font-size:13px;font-weight:600;color:#e6e6e6;line-height:1.2;">Studio Creativo</div>
          <div style="font-size:11px;color:#9b9b9b;">Client Portal</div>
        </div>
      </div>
    </div>

    <!-- Nav -->
    <nav style="display:flex;flex-direction:column;gap:2px;">
      <div style="font-size:11px;font-weight:600;color:#9b9b9b;text-transform:uppercase;letter-spacing:0.07em;padding:6px 12px 4px;">Workspace</div>
      <div class="sidebar-item active">
        <span style="font-size:15px;">🏠</span><span>Client Portal</span>
      </div>
      <div class="sidebar-item">
        <span style="font-size:15px;">🚀</span><span>Onboarding</span>
      </div>
      <div class="sidebar-item">
        <span style="font-size:15px;">📦</span><span>Deliverables</span>
      </div>
      <div class="sidebar-item">
        <span style="font-size:15px;">📅</span><span>Timeline</span>
      </div>
      <div class="sidebar-item">
        <span style="font-size:15px;">🗂️</span><span>Files</span>
      </div>
      <div class="sidebar-item">
        <span style="font-size:15px;">💬</span><span>Feedback</span>
      </div>
      <div class="sidebar-item">
        <span style="font-size:15px;">❓</span><span>FAQ</span>
      </div>
    </nav>

    <!-- Spacer -->
    <div style="flex:1;"></div>

    <!-- Footer info -->
    <div style="padding:12px;background:#252525;border-radius:8px;margin-top:16px;">
      <div style="font-size:11px;color:#9b9b9b;margin-bottom:4px;">Progetto attivo</div>
      <div style="font-size:13px;font-weight:500;color:#e6e6e6;">Rebrand Cliente ABC</div>
      <div style="margin-top:8px;height:4px;background:#2e2e2e;border-radius:2px;">
        <div style="width:65%;height:100%;background:linear-gradient(90deg,#5865f2,#818cf8);border-radius:2px;"></div>
      </div>
      <div style="font-size:11px;color:#9b9b9b;margin-top:4px;">65% completato</div>
    </div>
  </aside>

  <!-- Main content -->
  <main style="flex:1;overflow-y:auto;background:#191919;">

    <!-- Top header -->
    <header style="position:sticky;top:0;z-index:50;background:#191919;border-bottom:1px solid #2e2e2e;padding:0 32px;">
      <div style="display:flex;align-items:center;justify-content:space-between;height:52px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <!-- Logo placeholder -->
          <div style="width:28px;height:28px;background:#252525;border:1px solid #2e2e2e;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:13px;color:#9b9b9b;">A</div>
          <span style="font-size:14px;color:#9b9b9b;">Portal</span>
          <span style="color:#3a3a3a;">—</span>
          <span style="font-size:14px;font-weight:500;color:#e6e6e6;">Studio Creativo × Cliente ABC</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:12px;color:#9b9b9b;">Aggiornato: 22 Mar 2026</span>
          <div style="width:28px;height:28px;background:linear-gradient(135deg,#4cc38a,#34d399);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;">C</div>
        </div>
      </div>
    </header>

    <!-- Page content -->
    <div style="max-width:900px;margin:0 auto;padding:32px 32px 64px;">

      <!-- Page title -->
      <div style="margin-bottom:28px;">
        <h1 style="font-size:28px;font-weight:700;color:#e6e6e6;margin:0 0 6px;">Client Portal</h1>
        <p style="font-size:14px;color:#9b9b9b;margin:0;">Benvenuto nel tuo spazio di lavoro condiviso. Qui trovi tutto il necessario per seguire l'avanzamento del progetto.</p>
      </div>

      <!-- 1. Stato Progetto -->
      <div class="section-block">
        <div class="section-title">🚀 Stato Progetto</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:20px;">
          <div style="background:#252525;border-radius:8px;padding:14px;">
            <div style="font-size:11px;color:#9b9b9b;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">Fase attuale</div>
            <div style="font-size:15px;font-weight:600;color:#e6e6e6;">Design in corso</div>
          </div>
          <div style="background:#252525;border-radius:8px;padding:14px;">
            <div style="font-size:11px;color:#9b9b9b;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">Prossima milestone</div>
            <div style="font-size:15px;font-weight:600;color:#f0b429;">28 Mar — Mockup</div>
          </div>
          <div style="background:#252525;border-radius:8px;padding:14px;">
            <div style="font-size:11px;color:#9b9b9b;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">Completamento</div>
            <div style="font-size:15px;font-weight:600;color:#5865f2;">65%</div>
          </div>
        </div>
        <div style="margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:13px;color:#9b9b9b;">Avanzamento generale</span>
          <span style="font-size:13px;font-weight:600;color:#818cf8;">65 / 100</span>
        </div>
        <div style="height:10px;background:#2e2e2e;border-radius:5px;overflow:hidden;">
          <div class="progress-bar-fill" style="width:65%;"></div>
        </div>
        <div style="margin-top:12px;font-size:13px;color:#9b9b9b;">
          <span style="color:#4cc38a;font-weight:500;">●</span> Presentazione Mockup — <strong style="color:#e6e6e6;">28 Marzo 2026</strong>
        </div>
      </div>

      <!-- 2. Onboarding Checklist -->
      <div class="section-block">
        <div class="section-title">📋 Onboarding Checklist</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 32px;">
          <div>
            <div class="check-item">
              <div class="check-circle done"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L3.8 7.5L8.5 2" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
              <span style="color:#e6e6e6;">Brief compilato</span>
            </div>
            <div class="check-item">
              <div class="check-circle done"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L3.8 7.5L8.5 2" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
              <span style="color:#e6e6e6;">Brand assets ricevuti</span>
            </div>
            <div class="check-item">
              <div class="check-circle done"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L3.8 7.5L8.5 2" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
              <span style="color:#e6e6e6;">Accessi forniti</span>
            </div>
            <div class="check-item">
              <div class="check-circle done"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L3.8 7.5L8.5 2" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
              <span style="color:#e6e6e6;">Contratto firmato</span>
            </div>
          </div>
          <div>
            <div class="check-item">
              <div class="check-circle done"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L3.8 7.5L8.5 2" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
              <span style="color:#e6e6e6;">Pagamento anticipo</span>
            </div>
            <div class="check-item">
              <div class="check-circle done"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L3.8 7.5L8.5 2" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
              <span style="color:#e6e6e6;">Kickoff call</span>
            </div>
            <div class="check-item">
              <div class="check-circle"></div>
              <span style="color:#9b9b9b;">Questionario stile</span>
              <span class="tag" style="background:#3a2e1b;color:#f0b429;margin-left:4px;">In attesa</span>
            </div>
            <div class="check-item">
              <div class="check-circle"></div>
              <span style="color:#9b9b9b;">Contenuti testi</span>
              <span class="tag" style="background:#3a2e1b;color:#f0b429;margin-left:4px;">In attesa</span>
            </div>
          </div>
        </div>
        <div style="margin-top:14px;padding:10px 14px;background:#252525;border-radius:6px;font-size:13px;color:#9b9b9b;">
          6 di 8 attività completate · <span style="color:#4cc38a;font-weight:500;">75%</span>
        </div>
      </div>

      <!-- 3. Deliverables -->
      <div class="section-block">
        <div class="section-title">📦 Deliverables</div>
        <div style="overflow-x:auto;border-radius:8px;border:1px solid #2e2e2e;">
          <table>
            <thead>
              <tr style="background:#1e1e1e;">
                <th>Deliverable</th>
                <th>Stato</th>
                <th>Scadenza</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight:500;">Logo & Brand Identity</td>
                <td><span class="tag" style="background:#1b3a2d;color:#4cc38a;">● Completato</span></td>
                <td style="color:#9b9b9b;">10 Mar 2026</td>
                <td><a href="#" class="download-link">↓ brand-kit-v2.zip</a></td>
              </tr>
              <tr>
                <td style="font-weight:500;">Wireframe UI</td>
                <td><span class="tag" style="background:#1b3a2d;color:#4cc38a;">● Completato</span></td>
                <td style="color:#9b9b9b;">18 Mar 2026</td>
                <td><a href="#" class="download-link">↓ wireframes.fig</a></td>
              </tr>
              <tr>
                <td style="font-weight:500;">Design Mockup Homepage</td>
                <td><span class="tag" style="background:#1b2a3a;color:#60a5fa;">● In Corso</span></td>
                <td style="color:#f0b429;">28 Mar 2026</td>
                <td><span style="font-size:13px;color:#9b9b9b;">— in lavorazione</span></td>
              </tr>
              <tr>
                <td style="font-weight:500;">Design Mockup Pagine Interne</td>
                <td><span class="tag" style="background:#2e2e2e;color:#9b9b9b;">○ Pending</span></td>
                <td style="color:#9b9b9b;">10 Apr 2026</td>
                <td><span style="font-size:13px;color:#9b9b9b;">—</span></td>
              </tr>
              <tr>
                <td style="font-weight:500;">Sviluppo Sito Web</td>
                <td><span class="tag" style="background:#2e2e2e;color:#9b9b9b;">○ Pending</span></td>
                <td style="color:#9b9b9b;">2 Mag 2026</td>
                <td><span style="font-size:13px;color:#9b9b9b;">—</span></td>
              </tr>
              <tr>
                <td style="font-weight:500;">Style Guide Completa</td>
                <td><span class="tag" style="background:#1b3a2d;color:#4cc38a;">● Completato</span></td>
                <td style="color:#9b9b9b;">15 Mar 2026</td>
                <td><a href="#" class="download-link">↓ style-guide.pdf</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 4. Timeline -->
      <div class="section-block">
        <div class="section-title">📅 Timeline Progetto</div>
        <div style="position:relative;padding:20px 0 40px;">
          <div class="timeline-line"></div>
          <div style="display:flex;justify-content:space-between;position:relative;">

            <div style="display:flex;flex-direction:column;align-items:center;gap:10px;width:18%;">
              <div class="timeline-dot" style="background:#4cc38a;color:#fff;">✓</div>
              <div style="text-align:center;">
                <div style="font-size:13px;font-weight:600;color:#4cc38a;">Kickoff</div>
                <div style="font-size:11px;color:#9b9b9b;margin-top:2px;">1 Mar 2026</div>
                <span class="tag" style="background:#1b3a2d;color:#4cc38a;margin-top:6px;font-size:10px;">Completato</span>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;align-items:center;gap:10px;width:18%;">
              <div class="timeline-dot" style="background:#4cc38a;color:#fff;">✓</div>
              <div style="text-align:center;">
                <div style="font-size:13px;font-weight:600;color:#4cc38a;">Wireframe</div>
                <div style="font-size:11px;color:#9b9b9b;margin-top:2px;">18 Mar 2026</div>
                <span class="tag" style="background:#1b3a2d;color:#4cc38a;margin-top:6px;font-size:10px;">Completato</span>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;align-items:center;gap:10px;width:18%;">
              <div class="timeline-dot" style="background:#5865f2;color:#fff;box-shadow:0 0 0 4px rgba(88,101,242,0.2);">→</div>
              <div style="text-align:center;">
                <div style="font-size:13px;font-weight:600;color:#818cf8;">Design</div>
                <div style="font-size:11px;color:#9b9b9b;margin-top:2px;">28 Mar 2026</div>
                <span class="tag" style="background:#1b2a3a;color:#60a5fa;margin-top:6px;font-size:10px;">In Corso</span>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;align-items:center;gap:10px;width:18%;">
              <div class="timeline-dot" style="background:#2e2e2e;color:#9b9b9b;border:2px solid #3a3a3a;">4</div>
              <div style="text-align:center;">
                <div style="font-size:13px;font-weight:600;color:#9b9b9b;">Sviluppo</div>
                <div style="font-size:11px;color:#9b9b9b;margin-top:2px;">2 Mag 2026</div>
                <span class="tag" style="background:#2e2e2e;color:#9b9b9b;margin-top:6px;font-size:10px;">Pending</span>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;align-items:center;gap:10px;width:18%;">
              <div class="timeline-dot" style="background:#2e2e2e;color:#9b9b9b;border:2px solid #3a3a3a;">🚀</div>
              <div style="text-align:center;">
                <div style="font-size:13px;font-weight:600;color:#9b9b9b;">Launch</div>
                <div style="font-size:11px;color:#9b9b9b;margin-top:2px;">20 Mag 2026</div>
                <span class="tag" style="background:#2e2e2e;color:#9b9b9b;margin-top:6px;font-size:10px;">Pending</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- 5. Feedback & Note -->
      <div class="section-block">
        <div class="section-title">💬 Feedback & Note</div>
        <div style="display:flex;flex-direction:column;gap:14px;">

          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <div style="width:26px;height:26px;background:linear-gradient(135deg,#5865f2,#818cf8);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;">S</div>
              <span style="font-size:13px;font-weight:600;color:#e6e6e6;">Studio Creativo</span>
              <span style="font-size:11px;color:#9b9b9b;">18 Mar, 10:42</span>
            </div>
            <div class="comment-bubble studio">
              <p style="margin:0;font-size:14px;line-height:1.6;">Ciao! Abbiamo completato i wireframe per tutte le pagine principali. Ho caricato il file Figma nella sezione Deliverables — puoi darci un feedback entro venerdì così possiamo procedere con il design visivo la settimana prossima.</p>
            </div>
          </div>

          <div style="padding-left:32px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <div style="width:26px;height:26px;background:linear-gradient(135deg,#4cc38a,#34d399);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;">C</div>
              <span style="font-size:13px;font-weight:600;color:#e6e6e6;">Cliente ABC</span>
              <span style="font-size:11px;color:#9b9b9b;">18 Mar, 15:20</span>
            </div>
            <div class="comment-bubble client">
              <p style="margin:0;font-size:14px;line-height:1.6;">Ottimo lavoro! Ho guardato i wireframe — nel complesso sono molto soddisfatto. Un'unica nota: nella homepage, potremmo spostare la sezione "Testimonianze" più in alto, subito dopo l'hero? Penso che darebbe più credibilità immediatamente.</p>
            </div>
          </div>

          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <div style="width:26px;height:26px;background:linear-gradient(135deg,#5865f2,#818cf8);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;">S</div>
              <span style="font-size:13px;font-weight:600;color:#e6e6e6;">Studio Creativo</span>
              <span style="font-size:11px;color:#9b9b9b;">19 Mar, 09:05</span>
            </div>
            <div class="comment-bubble studio">
              <p style="margin:0;font-size:14px;line-height:1.6;">Ottima idea! Modifica assolutamente sensata. Aggiorneremo il layout e la sezione Testimonianze sarà nella nuova posizione già nei mockup definitivi. Stiamo anche preparando 3 varianti di palette colori da mostrarvi — le vedrete nel prossimo update entro il 28 Marzo.</p>
            </div>
          </div>

          <div style="padding-left:32px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <div style="width:26px;height:26px;background:linear-gradient(135deg,#4cc38a,#34d399);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;">C</div>
              <span style="font-size:13px;font-weight:600;color:#e6e6e6;">Cliente ABC</span>
              <span style="font-size:11px;color:#9b9b9b;">19 Mar, 11:30</span>
            </div>
            <div class="comment-bubble client">
              <p style="margin:0;font-size:14px;line-height:1.6;">Perfetto, grazie mille per la rapidità! Non vediamo l'ora di vedere le varianti di colore. Preferiamo tonalità blu/navy con accenti dorati — in linea con il nostro brand attuale. A presto! 🎨</p>
            </div>
          </div>

          <!-- Add comment -->
          <div style="margin-top:8px;padding:12px;background:#252525;border:1px dashed #3a3a3a;border-radius:8px;display:flex;align-items:center;gap:10px;">
            <div style="width:26px;height:26px;background:#2e2e2e;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;color:#9b9b9b;flex-shrink:0;">+</div>
            <span style="font-size:13px;color:#9b9b9b;">Aggiungi un commento…</span>
          </div>
        </div>
      </div>

      <!-- 6. FAQ -->
      <div class="section-block">
        <div class="section-title">❓ FAQ — Domande Frequenti</div>
        <div style="display:flex;flex-direction:column;gap:4px;">

          <div class="faq-item" style="border-radius:8px;overflow:hidden;border:1px solid #2e2e2e;">
            <button onclick="this.closest('.faq-item').classList.toggle('open')" style="width:100%;background:transparent;border:none;cursor:pointer;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;color:#e6e6e6;">
              <span style="font-size:14px;font-weight:500;text-align:left;">Con quale frequenza riceverò aggiornamenti sul progetto?</span>
              <span class="faq-chevron" style="color:#9b9b9b;font-size:13px;flex-shrink:0;margin-left:12px;">▶</span>
            </button>
            <div class="faq-answer" style="padding:0 16px 14px;font-size:14px;color:#9b9b9b;line-height:1.65;">
              Ti aggiorneremo ogni settimana via questo portale e via email ogni venerdì con un resoconto dell'avanzamento. Per questioni urgenti puoi scriverci direttamente nella sezione Feedback o via email a <span style="color:#818cf8;">studio@studiocreativo.it</span>.
            </div>
          </div>

          <div class="faq-item" style="border-radius:8px;overflow:hidden;border:1px solid #2e2e2e;">
            <button onclick="this.closest('.faq-item').classList.toggle('open')" style="width:100%;background:transparent;border:none;cursor:pointer;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;color:#e6e6e6;">
              <span style="font-size:14px;font-weight:500;text-align:left;">Quante revisioni sono incluse nel pacchetto?</span>
              <span class="faq-chevron" style="color:#9b9b9b;font-size:13px;flex-shrink:0;margin-left:12px;">▶</span>
            </button>
            <div class="faq-answer" style="padding:0 16px 14px;font-size:14px;color:#9b9b9b;line-height:1.65;">
              Il pacchetto include <strong style="color:#e6e6e6;">2 round di revisione</strong> per ogni deliverable principale. Revisioni aggiuntive sono disponibili a €150/ora. Ti consigliamo di raccogliere tutti i feedback in un'unica sessione per ottimizzare i tempi.
            </div>
          </div>

          <div class="faq-item" style="border-radius:8px;overflow:hidden;border:1px solid #2e2e2e;">
            <button onclick="this.closest('.faq-item').classList.toggle('open')" style="width:100%;background:transparent;border:none;cursor:pointer;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;color:#e6e6e6;">
              <span style="font-size:14px;font-weight:500;text-align:left;">Come vengono gestiti eventuali cambiamenti di scope?</span>
              <span class="faq-chevron" style="color:#9b9b9b;font-size:13px;flex-shrink:0;margin-left:12px;">▶</span>
            </button>
            <div class="faq-answer" style="padding:0 16px 14px;font-size:14px;color:#9b9b9b;line-height:1.65;">
              Qualsiasi modifica allo scope originale viene valutata e ti invieremo un preventivo aggiuntivo prima di procedere. Non apportiamo mai modifiche non concordate. Tutte le variazioni vengono documentate tramite una Change Request firmata da entrambe le parti.
            </div>
          </div>

          <div class="faq-item" style="border-radius:8px;overflow:hidden;border:1px solid #2e2e2e;">
            <button onclick="this.closest('.faq-item').classList.toggle('open')" style="width:100%;background:transparent;border:none;cursor:pointer;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;color:#e6e6e6;">
              <span style="font-size:14px;font-weight:500;text-align:left;">Chi possiede i file sorgente al termine del progetto?</span>
              <span class="faq-chevron" style="color:#9b9b9b;font-size:13px;flex-shrink:0;margin-left:12px;">▶</span>
            </button>
            <div class="faq-answer" style="padding:0 16px 14px;font-size:14px;color:#9b9b9b;line-height:1.65;">
              Al saldo finale del progetto, tutti i file sorgente (Figma, codice sorgente, asset originali) vengono trasferiti interamente a te. Riceverai un archivio completo con tutti i materiali organizzati e documentati. I diritti d'autore passano a te al momento del pagamento finale.
            </div>
          </div>

        </div>
      </div>

    </div>
  </main>
</div>
`,
  },

  // ── E-learning & Corsi ────────────────────────────────────────────────────
  {
    id: "course-landing-page",
    name: "Online Course Landing Page",
    description:
      "Full landing page for an online course: hero, curriculum, instructor bio, testimonials and CTA with pricing.",
    category: "ui",
    price: 1299,
    stripePriceId: "price_1TD5Q7BoWNgrJbiy9N8N8GoF",
    tags: ["elearning", "course", "landing page", "education", "online course"],
    downloads: 0,
    isNew: true,
    editorsPick: true,
    content: `<div class="min-h-screen bg-white font-sans">
  <!-- Hero -->
  <section class="bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white py-20 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <span class="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-white/20">🎓 Corso Online</span>
      <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
        Diventa uno <span class="text-yellow-300">Sviluppatore AI</span><br/>in 8 settimane
      </h1>
      <p class="text-xl text-white/80 max-w-2xl mx-auto mb-8">
        Il corso pratico per imparare a costruire applicazioni AI con Python, LangChain e le API di OpenAI. Zero prerequisiti.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <button class="px-8 py-4 bg-yellow-400 text-gray-900 font-bold text-lg rounded-2xl hover:bg-yellow-300 transition shadow-lg">Inizia ora — €197</button>
        <button class="px-8 py-4 bg-white/15 text-white font-semibold rounded-2xl border border-white/30 hover:bg-white/25 transition backdrop-blur-sm">Guarda il video gratuito →</button>
      </div>
      <p class="text-white/50 text-sm">✅ Garanzia soddisfatti o rimborsati 30 giorni · 🎥 8 ore di video · 📁 Codice sorgente incluso</p>
    </div>
  </section>

  <!-- Social proof bar -->
  <section class="bg-indigo-900 text-white py-4 px-4">
    <div class="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 text-center text-sm">
      <div><span class="font-bold text-yellow-400 text-lg">2.400+</span><br/>studenti iscritti</div>
      <div><span class="font-bold text-yellow-400 text-lg">4.9 ★</span><br/>valutazione media</div>
      <div><span class="font-bold text-yellow-400 text-lg">8 settimane</span><br/>percorso guidato</div>
      <div><span class="font-bold text-yellow-400 text-lg">100%</span><br/>online & flessibile</div>
    </div>
  </section>

  <!-- What you'll learn -->
  <section class="py-16 px-4 bg-gray-50">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-extrabold text-gray-900 text-center mb-2">Cosa imparerai</h2>
      <p class="text-gray-500 text-center mb-10">8 moduli · 40+ lezioni · 3 progetti reali</p>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="flex gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <span class="text-2xl">🐍</span>
          <div><p class="font-semibold text-gray-900">Python per l'AI</p><p class="text-sm text-gray-500">Fondamenta solide: variabili, funzioni, async/await</p></div>
        </div>
        <div class="flex gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <span class="text-2xl">🔗</span>
          <div><p class="font-semibold text-gray-900">LangChain & LLMs</p><p class="text-sm text-gray-500">Catene, agenti e tool con OpenAI e Claude</p></div>
        </div>
        <div class="flex gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <span class="text-2xl">🗃️</span>
          <div><p class="font-semibold text-gray-900">RAG & Vector DB</p><p class="text-sm text-gray-500">Retrieval-Augmented Generation con Pinecone</p></div>
        </div>
        <div class="flex gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <span class="text-2xl">🚀</span>
          <div><p class="font-semibold text-gray-900">Deploy & Produzione</p><p class="text-sm text-gray-500">FastAPI, Docker, Railway e monitoring</p></div>
        </div>
        <div class="flex gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <span class="text-2xl">🤖</span>
          <div><p class="font-semibold text-gray-900">AI Agents</p><p class="text-sm text-gray-500">Agenti autonomi con tool use e reasoning</p></div>
        </div>
        <div class="flex gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <span class="text-2xl">💼</span>
          <div><p class="font-semibold text-gray-900">Portfolio & Lavoro</p><p class="text-sm text-gray-500">3 progetti reali da mostrare ai recruiter</p></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Curriculum -->
  <section class="py-16 px-4 bg-white">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-3xl font-extrabold text-gray-900 text-center mb-10">Curriculum del corso</h2>
      <div class="space-y-3">
        <details class="border border-gray-200 rounded-xl overflow-hidden group">
          <summary class="flex items-center justify-between px-5 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition font-semibold text-gray-800">
            <span>Modulo 1 — Setup & Python Essentials</span>
            <span class="text-sm text-gray-500 font-normal">4 lezioni · 45 min</span>
          </summary>
          <div class="px-5 py-4 text-sm text-gray-600 space-y-2">
            <p>1.1 Setup ambiente: VS Code, Python 3.11, venv</p>
            <p>1.2 Python per sviluppatori: sintassi accelerata</p>
            <p>1.3 Async/await: concetti fondamentali</p>
            <p>1.4 Prima chiamata API: OpenAI hello world</p>
          </div>
        </details>
        <details class="border border-gray-200 rounded-xl overflow-hidden">
          <summary class="flex items-center justify-between px-5 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition font-semibold text-gray-800">
            <span>Modulo 2 — LangChain Core</span>
            <span class="text-sm text-gray-500 font-normal">6 lezioni · 1h 20 min</span>
          </summary>
          <div class="px-5 py-4 text-sm text-gray-600 space-y-2">
            <p>2.1 Chains: prompt → model → output</p>
            <p>2.2 Memory: conversazioni con contesto</p>
            <p>2.3 Tools & Agents: il modello che decide</p>
            <p>2.4 Progetto: chatbot FAQ aziendale</p>
          </div>
        </details>
        <details class="border border-gray-200 rounded-xl overflow-hidden">
          <summary class="flex items-center justify-between px-5 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition font-semibold text-gray-800">
            <span>Modulo 3 — RAG & Vector Databases</span>
            <span class="text-sm text-gray-500 font-normal">5 lezioni · 1h 10 min</span>
          </summary>
          <div class="px-5 py-4 text-sm text-gray-600 space-y-2">
            <p>3.1 Embeddings: come funzionano i vettori</p>
            <p>3.2 Pinecone e ChromaDB a confronto</p>
            <p>3.3 Pipeline RAG completa end-to-end</p>
            <p>3.4 Progetto: AI che risponde dai tuoi PDF</p>
          </div>
        </details>
      </div>
    </div>
  </section>

  <!-- Instructor -->
  <section class="py-16 px-4 bg-gray-50">
    <div class="max-w-3xl mx-auto flex flex-col md:flex-row gap-8 items-center">
      <div class="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-extrabold flex-shrink-0">AI</div>
      <div>
        <p class="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-1">Il tuo istruttore</p>
        <h3 class="text-2xl font-extrabold text-gray-900 mb-2">Alex Romano</h3>
        <p class="text-gray-600 leading-relaxed">Senior AI Engineer con 8 anni di esperienza in Google e startup AI. Ha formato oltre 5.000 sviluppatori. Autore del blog "AI in Produzione" con 50k lettori mensili.</p>
        <div class="flex gap-4 mt-4 text-sm text-gray-500">
          <span>⭐ 4.97 rating</span>
          <span>👥 5.000+ studenti</span>
          <span>📚 12 corsi</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="py-16 px-4 bg-white">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-extrabold text-gray-900 text-center mb-10">Cosa dicono gli studenti</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-gray-50 rounded-2xl p-5 border border-gray-200">
          <div class="flex gap-0.5 mb-3">★★★★★</div>
          <p class="text-sm text-gray-600 mb-4">"Ho trovato lavoro come AI Engineer a Milano 3 settimane dopo aver finito il corso. Vale ogni centesimo."</p>
          <div class="flex items-center gap-2.5"><div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">GT</div><div><p class="text-sm font-semibold text-gray-800">Giulia T.</p><p class="text-xs text-gray-500">AI Engineer @ Fintech Startup</p></div></div>
        </div>
        <div class="bg-gray-50 rounded-2xl p-5 border border-gray-200">
          <div class="flex gap-0.5 mb-3">★★★★★</div>
          <p class="text-sm text-gray-600 mb-4">"Partivo da zero con Python. Ora ho deployato il mio primo agente AI in produzione. Alex spiega tutto con chiarezza."</p>
          <div class="flex items-center gap-2.5"><div class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">MR</div><div><p class="text-sm font-semibold text-gray-800">Marco R.</p><p class="text-xs text-gray-500">Full-Stack Developer</p></div></div>
        </div>
        <div class="bg-gray-50 rounded-2xl p-5 border border-gray-200">
          <div class="flex gap-0.5 mb-3">★★★★★</div>
          <p class="text-sm text-gray-600 mb-4">"Il modulo su RAG è il più completo che abbia mai visto. Ho implementato un chatbot per i documenti della mia azienda in 2 giorni."</p>
          <div class="flex items-center gap-2.5"><div class="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold">SC</div><div><p class="text-sm font-semibold text-gray-800">Sara C.</p><p class="text-xs text-gray-500">Data Scientist</p></div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing CTA -->
  <section class="py-20 px-4 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white text-center">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Pronto a iniziare?</h2>
    <p class="text-white/70 mb-10 text-lg">Una tantum · Accesso a vita · Aggiornamenti gratuiti</p>
    <div class="inline-block bg-white rounded-3xl p-8 text-gray-900 max-w-sm w-full shadow-2xl">
      <p class="text-gray-500 text-sm mb-1">Prezzo di lancio</p>
      <p class="text-5xl font-black mb-1">€197</p>
      <p class="text-gray-400 line-through text-lg mb-6">€397</p>
      <button class="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition mb-4">Iscriviti ora →</button>
      <p class="text-xs text-gray-400">✅ Garanzia 30 giorni · 🔒 Pagamento sicuro con Stripe</p>
    </div>
  </section>
</div>`,
  },
  {
    id: "webinar-registration",
    name: "Webinar Registration Page",
    description:
      "Live webinar opt-in page with countdown timer, speaker bio, session agenda and email capture form.",
    category: "ui",
    price: 999,
    stripePriceId: "price_1TD5Q7BoWNgrJbiyN7sHkTVu",
    tags: ["elearning", "webinar", "registration", "event", "lead generation"],
    downloads: 0,
    isNew: true,
    content: `<div class="min-h-screen bg-gray-950 text-white font-sans">
  <!-- Header -->
  <header class="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
    <div class="font-bold text-lg tracking-tight">🎓 AcademyPro</div>
    <span class="text-xs text-gray-400 border border-white/10 rounded-full px-3 py-1">Evento GRATUITO</span>
  </header>

  <!-- Hero -->
  <section class="py-16 px-4">
    <div class="max-w-3xl mx-auto text-center">
      <div class="inline-flex items-center gap-2 bg-red-500/15 border border-red-500/30 text-red-400 text-sm font-semibold px-4 py-2 rounded-full mb-8">
        <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block"></span>
        LIVE · Martedì 25 Marzo · ore 20:00
      </div>
      <h1 class="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
        Come usare l'AI per<br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">10x la tua produttività</span><br/>nel 2025
      </h1>
      <p class="text-gray-400 text-lg max-w-xl mx-auto mb-10">
        90 minuti di strategie pratiche e dimostrazione live. Porta il tuo laptop — costruiremo insieme il tuo primo agente AI.
      </p>

      <!-- Registration form -->
      <div class="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-md mx-auto text-left">
        <p class="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-5 text-center">Prenota il tuo posto gratuito</p>
        <div class="space-y-3 mb-5">
          <input type="text" placeholder="Il tuo nome" class="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition"/>
          <input type="email" placeholder="La tua email" class="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition"/>
        </div>
        <button class="w-full py-4 bg-gradient-to-r from-violet-600 to-cyan-600 font-bold text-lg rounded-2xl hover:opacity-90 transition shadow-lg shadow-violet-500/30">
          Partecipo gratis →
        </button>
        <p class="text-center text-xs text-gray-500 mt-3">📧 Riceverai il link Zoom via email · Nessuno spam</p>
      </div>
    </div>
  </section>

  <!-- Countdown -->
  <section class="py-10 px-4">
    <div class="max-w-lg mx-auto text-center">
      <p class="text-sm text-gray-500 mb-4 uppercase tracking-wide font-semibold">L'evento inizia tra</p>
      <div class="flex justify-center gap-4">
        <div class="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 min-w-[72px]">
          <p class="text-3xl font-black tabular-nums">03</p>
          <p class="text-xs text-gray-500 mt-1">giorni</p>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 min-w-[72px]">
          <p class="text-3xl font-black tabular-nums">14</p>
          <p class="text-xs text-gray-500 mt-1">ore</p>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 min-w-[72px]">
          <p class="text-3xl font-black tabular-nums">32</p>
          <p class="text-xs text-gray-500 mt-1">minuti</p>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 min-w-[72px]">
          <p class="text-3xl font-black tabular-nums">18</p>
          <p class="text-xs text-gray-500 mt-1">secondi</p>
        </div>
      </div>
      <p class="text-sm text-red-400 font-semibold mt-5">⚡ Solo 200 posti disponibili · 147 già prenotati</p>
    </div>
  </section>

  <!-- Agenda -->
  <section class="py-16 px-4">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl font-extrabold text-center mb-8">Cosa vedremo insieme</h2>
      <div class="space-y-4">
        <div class="flex gap-4 items-start">
          <div class="bg-violet-600/20 text-violet-400 text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0 mt-0.5">20:00</div>
          <div><p class="font-semibold text-white">Benvenuto e contesto</p><p class="text-sm text-gray-400">Perché l'AI cambierà ogni lavoro nei prossimi 2 anni</p></div>
        </div>
        <div class="flex gap-4 items-start">
          <div class="bg-violet-600/20 text-violet-400 text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0 mt-0.5">20:15</div>
          <div><p class="font-semibold text-white">Il Sistema AI Produttività (live demo)</p><p class="text-sm text-gray-400">Come automatizzare email, report e ricerche in 15 minuti al giorno</p></div>
        </div>
        <div class="flex gap-4 items-start">
          <div class="bg-violet-600/20 text-violet-400 text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0 mt-0.5">20:45</div>
          <div><p class="font-semibold text-white">Build insieme: il tuo primo agente AI</p><p class="text-sm text-gray-400">Costruiamo live un agente che legge le tue email e risponde in automatico</p></div>
        </div>
        <div class="flex gap-4 items-start">
          <div class="bg-violet-600/20 text-violet-400 text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0 mt-0.5">21:15</div>
          <div><p class="font-semibold text-white">Q&A aperto + Offerta riservata ai partecipanti</p><p class="text-sm text-gray-400">Rispondo a tutto. Solo chi partecipa live avrà accesso all'offerta speciale</p></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Speaker -->
  <section class="py-16 px-4 border-t border-white/10">
    <div class="max-w-2xl mx-auto flex flex-col sm:flex-row gap-6 items-center">
      <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-extrabold flex-shrink-0">AR</div>
      <div>
        <p class="text-xs text-violet-400 uppercase tracking-widest mb-1 font-semibold">Il tuo speaker</p>
        <h3 class="text-xl font-extrabold mb-2">Alex Romano</h3>
        <p class="text-sm text-gray-400">AI Engineer e formatore. Ha aiutato 5.000+ professionisti ad integrare l'AI nel lavoro quotidiano. Ospite di TEDxMilano 2024.</p>
        <div class="flex gap-3 mt-3 text-xs text-gray-500">
          <span>🐦 @alexromano_ai</span>
          <span>📺 50k YouTube</span>
          <span>✉️ 30k newsletter</span>
        </div>
      </div>
    </div>
  </section>
</div>`,
  },
  {
    id: "course-curriculum-builder",
    name: "AI Course Curriculum Builder",
    description:
      "Course management dashboard with structured modules, lessons, learning objectives and progress tracking.",
    category: "ui",
    price: 999,
    stripePriceId: "price_1TD5Q8BoWNgrJbiyj4Lgskzb",
    tags: ["elearning", "course", "curriculum", "education", "course creation"],
    downloads: 0,
    isNew: true,
    content: `<div style="display:flex;height:800px;width:1200px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f0f2f5;overflow:hidden;"><div style="width:240px;min-width:240px;background:#1e1e2e;display:flex;flex-direction:column;height:100%;overflow:hidden;"><div style="padding:24px 20px 20px;border-bottom:1px solid rgba(255,255,255,0.07);"><div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;"><div style="width:32px;height:32px;background:linear-gradient(135deg,#4F46E5,#7C3AED);border-radius:8px;display:flex;align-items:center;justify-content:center;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h8M2 12h10" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg></div><span style="color:#fff;font-size:13px;font-weight:700;letter-spacing:0.3px;">CourseFlow</span></div><div style="background:rgba(255,255,255,0.06);border-radius:8px;padding:12px;"><p style="color:rgba(255,255,255,0.45);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;margin:0 0 6px;">Corso attivo</p><p style="color:#fff;font-size:12px;font-weight:600;margin:0;line-height:1.4;">Machine Learning con Python</p><div style="display:flex;align-items:center;gap:6px;margin-top:8px;"><div style="height:3px;flex:1;background:rgba(255,255,255,0.12);border-radius:2px;overflow:hidden;"><div style="height:100%;width:34%;background:#4F46E5;border-radius:2px;"></div></div><span style="color:rgba(255,255,255,0.4);font-size:10px;">34%</span></div></div></div><nav style="flex:1;padding:16px 12px;overflow-y:auto;"><p style="color:rgba(255,255,255,0.3);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;margin:0 0 8px 8px;">Gestione</p><div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;background:rgba(79,70,229,0.18);border:1px solid rgba(79,70,229,0.3);margin-bottom:2px;cursor:pointer;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="#4F46E5"/><rect x="9" y="1" width="6" height="6" rx="1.5" fill="rgba(79,70,229,0.4)"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill="rgba(79,70,229,0.4)"/><rect x="9" y="9" width="6" height="6" rx="1.5" fill="rgba(79,70,229,0.4)"/></svg><span style="color:#818cf8;font-size:13px;font-weight:600;">Moduli</span></div><div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;margin-bottom:2px;cursor:pointer;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/><path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" stroke-linecap="round"/></svg><span style="color:rgba(255,255,255,0.45);font-size:13px;font-weight:500;">Studenti</span><span style="margin-left:auto;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);font-size:10px;font-weight:600;padding:2px 7px;border-radius:10px;">48</span></div><div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;margin-bottom:2px;cursor:pointer;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 12V8M6 12V5M10 12V7M14 12V3" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" stroke-linecap="round"/></svg><span style="color:rgba(255,255,255,0.45);font-size:13px;font-weight:500;">Analytics</span></div><div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;margin-bottom:2px;cursor:pointer;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" stroke-linecap="round"/></svg><span style="color:rgba(255,255,255,0.45);font-size:13px;font-weight:500;">Impostazioni</span></div></nav><div style="padding:16px;border-top:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;gap:10px;"><div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#4F46E5,#06b6d4);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><span style="color:#fff;font-size:12px;font-weight:700;">MR</span></div><div style="overflow:hidden;"><p style="color:#fff;font-size:12px;font-weight:600;margin:0;">Marco Rossi</p><p style="color:rgba(255,255,255,0.35);font-size:11px;margin:0;">Istruttore</p></div></div></div><div style="flex:1;display:flex;flex-direction:column;overflow:hidden;background:#f0f2f5;"><div style="background:#fff;border-bottom:1px solid #e5e7eb;padding:0 28px;height:60px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;"><div style="display:flex;align-items:center;gap:8px;"><span style="color:#9ca3af;font-size:13px;">Corsi</span><span style="color:#9ca3af;font-size:13px;">›</span><span style="color:#9ca3af;font-size:13px;">Machine Learning con Python</span><span style="color:#9ca3af;font-size:13px;">›</span><span style="color:#1a1a2e;font-size:13px;font-weight:600;">Curriculum</span></div><div style="display:flex;align-items:center;gap:10px;"><div style="display:flex;align-items:center;gap:6px;background:#f0fdf4;border:1px solid #bbf7d0;padding:6px 12px;border-radius:6px;"><div style="width:6px;height:6px;background:#22c55e;border-radius:50%;"></div><span style="color:#15803d;font-size:12px;font-weight:600;">Pubblicato</span></div></div></div><div style="flex:1;overflow-y:auto;padding:28px;"><div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px;"><div><div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;"><h1 style="font-size:22px;font-weight:700;color:#1a1a2e;margin:0;">Curriculum del Corso</h1><div style="display:flex;align-items:center;gap:5px;background:linear-gradient(135deg,#ede9fe,#ddd6fe);border:1px solid #c4b5fd;padding:4px 10px;border-radius:20px;"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1l1.2 2.5L10 4l-2 2 .5 2.8L6 7.5 3.5 8.8 4 6 2 4l2.8-.5L6 1z" fill="#7C3AED"/></svg><span style="color:#6d28d9;font-size:11px;font-weight:700;">Generato con AI</span></div></div><p style="color:#6b7280;font-size:13px;margin:0;">4 moduli · 14 lezioni · circa 12 ore di contenuto</p></div></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px;"><div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px;"><p style="color:#9ca3af;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;margin:0 0 4px;">Moduli</p><p style="color:#1a1a2e;font-size:22px;font-weight:700;margin:0;">4</p></div><div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px;"><p style="color:#9ca3af;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;margin:0 0 4px;">Lezioni</p><p style="color:#1a1a2e;font-size:22px;font-weight:700;margin:0;">14</p></div><div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px;"><p style="color:#9ca3af;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;margin:0 0 4px;">Durata totale</p><p style="color:#1a1a2e;font-size:22px;font-weight:700;margin:0;">12h</p></div><div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px;"><p style="color:#9ca3af;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;margin:0 0 4px;">Livello</p><p style="color:#1a1a2e;font-size:22px;font-weight:700;margin:0;">Principiante</p></div></div><div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:10px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.04);"><div style="display:flex;align-items:center;padding:16px 20px;border-left:4px solid #4F46E5;gap:14px;"><div style="width:32px;height:32px;background:#ede9fe;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><span style="color:#4F46E5;font-size:13px;font-weight:700;">1</span></div><div style="flex:1;"><div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;"><span style="color:#1a1a2e;font-size:14px;font-weight:700;">Fondamenti di Python per ML</span><span style="background:#ede9fe;color:#6d28d9;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;">3 lezioni</span><span style="background:#f0f9ff;color:#0369a1;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;">2h 30min</span></div><p style="color:#9ca3af;font-size:12px;margin:0;">Ambiente di sviluppo, librerie fondamentali e strutture dati per il machine learning</p></div></div><div style="border-top:1px solid #f3f4f6;padding:4px 0;"><div style="display:flex;align-items:center;gap:12px;padding:12px 20px 12px 60px;border-bottom:1px solid #f9fafb;"><div style="width:26px;height:26px;background:#dcfce7;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.5L5 9l4.5-6" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div style="flex:1;"><p style="color:#374151;font-size:13px;font-weight:500;margin:0;">1.1 — Ambienti e librerie (Conda, pip, Jupyter)</p></div><span style="color:#9ca3af;font-size:12px;">45 min</span></div><div style="display:flex;align-items:center;gap:12px;padding:12px 20px 12px 60px;border-bottom:1px solid #f9fafb;"><div style="width:26px;height:26px;background:#dcfce7;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.5L5 9l4.5-6" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div style="flex:1;"><p style="color:#374151;font-size:13px;font-weight:500;margin:0;">1.2 — NumPy essentials: array e operazioni vettoriali</p></div><span style="color:#9ca3af;font-size:12px;">55 min</span></div><div style="display:flex;align-items:center;gap:12px;padding:12px 20px 12px 60px;"><div style="width:26px;height:26px;background:#fef3c7;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4" stroke="#d97706" stroke-width="1.5"/></svg></div><div style="flex:1;"><p style="color:#374151;font-size:13px;font-weight:500;margin:0;">1.3 — Pandas per i dati: DataFrame, pulizia e analisi esplorativa</p></div><span style="color:#9ca3af;font-size:12px;">50 min</span></div></div></div><div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:10px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.04);"><div style="display:flex;align-items:center;padding:16px 20px;border-left:4px solid #06b6d4;gap:14px;"><div style="width:32px;height:32px;background:#ecfeff;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><span style="color:#0891b2;font-size:13px;font-weight:700;">2</span></div><div style="flex:1;"><div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;"><span style="color:#1a1a2e;font-size:14px;font-weight:700;">Il Primo Modello ML</span><span style="background:#ecfeff;color:#0e7490;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;">3 lezioni</span><span style="background:#f0f9ff;color:#0369a1;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;">3h 15min</span></div><p style="color:#9ca3af;font-size:12px;margin:0;">Regressione lineare, classificazione con scikit-learn e visualizzazione dei risultati</p></div></div></div><div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:10px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.04);"><div style="display:flex;align-items:center;padding:16px 20px;border-left:4px solid #f59e0b;gap:14px;"><div style="width:32px;height:32px;background:#fffbeb;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><span style="color:#d97706;font-size:13px;font-weight:700;">3</span></div><div style="flex:1;"><div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;"><span style="color:#1a1a2e;font-size:14px;font-weight:700;">Training e Valutazione dei Modelli</span><span style="background:#fffbeb;color:#b45309;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;">4 lezioni</span><span style="background:#f0f9ff;color:#0369a1;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;">3h 00min</span></div><p style="color:#9ca3af;font-size:12px;margin:0;">Overfitting, cross-validation, metriche di valutazione e ottimizzazione degli iperparametri</p></div></div></div><div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.04);"><div style="display:flex;align-items:center;padding:16px 20px;border-left:4px solid #10b981;gap:14px;"><div style="width:32px;height:32px;background:#ecfdf5;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><span style="color:#059669;font-size:13px;font-weight:700;">4</span></div><div style="flex:1;"><div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;"><span style="color:#1a1a2e;font-size:14px;font-weight:700;">Deploy in Produzione</span><span style="background:#ecfdf5;color:#065f46;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;">4 lezioni</span><span style="background:#f0f9ff;color:#0369a1;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;">2h 45min</span></div><p style="color:#9ca3af;font-size:12px;margin:0;">Flask API, containerizzazione con Docker, deploy su cloud e monitoraggio del modello</p></div></div></div><div style="background:linear-gradient(135deg,#1e1e2e,#2d2b55);border-radius:10px;padding:20px 24px;display:flex;align-items:center;gap:20px;"><div style="width:48px;height:48px;background:linear-gradient(135deg,#4F46E5,#7C3AED);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2L13.5 8H20L14.5 12L17 18L11 14.5L5 18L7.5 12L2 8H8.5L11 2Z" fill="#fff" fill-opacity="0.9"/></svg></div><div style="flex:1;"><div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;"><span style="color:#fff;font-size:15px;font-weight:700;">Progetto Capstone</span><span style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:rgba(255,255,255,0.8);font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;">Certificato</span></div><p style="color:rgba(255,255,255,0.55);font-size:12px;margin:0;">Costruisci un classificatore di immagini end-to-end: dal dataset grezzo al deploy su Heroku</p></div><div style="text-align:right;"><p style="color:rgba(255,255,255,0.4);font-size:10px;margin:0 0 2px;">Durata stimata</p><p style="color:#fff;font-size:14px;font-weight:700;margin:0;">8–12 ore</p></div></div></div></div></div>`,
  },
  {
    id: "student-success-story",
    name: "Student Success Story Template",
    description:
      "Case study editor and viewer with student profiles, metrics dashboard and social sharing tools.",
    category: "ui",
    price: 799,
    stripePriceId: "price_1TD5Q9BoWNgrJbiyJGqgvhe0",
    tags: ["elearning", "testimonial", "case study", "social proof", "copywriting"],
    downloads: 0,
    isNew: true,
    content: `<div style="display:flex;height:100vh;font-family:system-ui,-apple-system,sans-serif;background:#f5f5f7;overflow:hidden;"><aside style="width:220px;min-width:220px;background:#1e1e2e;display:flex;flex-direction:column;overflow:hidden;"><div style="padding:24px 20px 20px;border-bottom:1px solid rgba(255,255,255,0.07);"><div style="display:flex;align-items:center;gap:9px;"><div style="width:30px;height:30px;background:#E67E22;border-radius:7px;display:flex;align-items:center;justify-content:center;"><span style="color:#fff;font-weight:800;font-size:14px;">S</span></div><span style="color:#fff;font-weight:700;font-size:16px;letter-spacing:-0.3px;">StoryLab</span></div></div><nav style="padding:16px 12px;flex:1;display:flex;flex-direction:column;gap:4px;"><div style="padding:9px 12px;border-radius:8px;background:rgba(230,126,34,0.15);border:1px solid rgba(230,126,34,0.25);cursor:pointer;"><div style="display:flex;align-items:center;gap:10px;"><svg width="15" height="15" fill="none" stroke="#E67E22" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><span style="color:#E67E22;font-size:13px;font-weight:600;">Case Studies</span></div></div><div style="padding:9px 12px;border-radius:8px;cursor:pointer;"><div style="display:flex;align-items:center;gap:10px;"><svg width="15" height="15" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg><span style="color:rgba(255,255,255,0.45);font-size:13px;font-weight:500;">Testimonianze</span></div></div><div style="padding:9px 12px;border-radius:8px;cursor:pointer;"><div style="display:flex;align-items:center;gap:10px;"><svg width="15" height="15" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="2" viewBox="0 0 24 24"><path d="M22 4s-2.5 1.5-7 4c-4.5 2.5-9 3-13 3"/></svg><span style="color:rgba(255,255,255,0.45);font-size:13px;font-weight:500;">Social Media</span></div></div><div style="padding:9px 12px;border-radius:8px;cursor:pointer;"><div style="display:flex;align-items:center;gap:10px;"><svg width="15" height="15" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg><span style="color:rgba(255,255,255,0.45);font-size:13px;font-weight:500;">Email</span></div></div></nav><div style="padding:16px 20px;border-top:1px solid rgba(255,255,255,0.07);"><div style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:5px 10px;"><div style="width:6px;height:6px;background:#4ade80;border-radius:50%;box-shadow:0 0 6px #4ade80;"></div><span style="color:rgba(255,255,255,0.5);font-size:11px;font-weight:500;">Creato con AI</span></div></div></aside><main style="flex:1;overflow-y:auto;background:#fff;"><div style="display:flex;align-items:center;justify-content:space-between;padding:16px 32px;border-bottom:1px solid #f0f0f0;background:#fff;position:sticky;top:0;z-index:10;"><div style="display:flex;align-items:center;gap:8px;"><span style="color:#9ca3af;font-size:13px;">Case Studies</span><span style="color:#d1d5db;">›</span><span style="color:#374151;font-size:13px;font-weight:600;">Giulia Romano</span></div><div style="display:flex;align-items:center;gap:10px;"><button style="padding:8px 14px;border:1px solid #e5e7eb;border-radius:7px;background:#fff;color:#6b7280;font-size:13px;font-weight:500;cursor:pointer;">Anteprima</button><button style="padding:8px 18px;border:none;border-radius:7px;background:#16a34a;color:#fff;font-size:13px;font-weight:600;cursor:pointer;box-shadow:0 1px 4px rgba(22,163,74,0.3);">Pubblica</button></div></div><div style="max-width:720px;margin:0 auto;padding:40px 32px 60px;"><div style="margin-bottom:16px;"><span style="display:inline-block;background:#fff7ed;color:#E67E22;font-size:11px;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;padding:4px 10px;border-radius:20px;border:1px solid rgba(230,126,34,0.2);">Case Study</span></div><h1 style="font-size:28px;font-weight:800;color:#111827;line-height:1.25;letter-spacing:-0.5px;margin:0 0 24px;">Come Giulia ha trovato lavoro come AI Engineer in 3 settimane</h1><div style="display:flex;align-items:center;gap:14px;padding:16px 20px;background:#f9fafb;border:1px solid #f0f0f0;border-radius:10px;margin-bottom:36px;"><div style="width:46px;height:46px;background:linear-gradient(135deg,#E67E22,#f59e0b);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><span style="color:#fff;font-weight:700;font-size:15px;">GR</span></div><div><div style="font-weight:700;color:#111827;font-size:15px;">Giulia Romano</div><div style="color:#6b7280;font-size:13px;margin-top:2px;">Ex contabile → AI Engineer @ TechCorp</div></div></div><section style="margin-bottom:36px;"><h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#E67E22;margin:0 0 12px;">Il Contesto</h2><div style="border-left:3px solid #f0f0f0;padding-left:18px;display:flex;flex-direction:column;gap:8px;"><p style="margin:0;color:#374151;font-size:15px;line-height:1.65;">Giulia lavorava da sei anni come contabile in uno studio professionale a Milano. Nonostante la stabilità economica, sentiva di non esprimere il suo pieno potenziale e desiderava un ruolo più vicino alla tecnologia.</p><p style="margin:0;color:#374151;font-size:15px;line-height:1.65;">Aveva iniziato a esplorare il mondo dell'intelligenza artificiale nel tempo libero, completando corsi online e sperimentando con Python e le API di OpenAI, senza però sapere come trasformare questa passione in una carriera concreta.</p><p style="margin:0;color:#374151;font-size:15px;line-height:1.65;">La svolta è arrivata quando ha deciso di seguire un percorso strutturato, con obiettivi misurabili e una strategia di networking mirata nel settore tech.</p></div></section><section style="margin-bottom:36px;"><h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#E67E22;margin:0 0 16px;">I Risultati</h2><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;"><div style="padding:20px;border:1px solid #f0f0f0;border-radius:10px;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,0.04);"><div style="font-size:26px;font-weight:800;color:#E67E22;letter-spacing:-1px;">+180%</div><div style="font-size:12px;color:#6b7280;margin-top:4px;font-weight:500;">aumento stipendio</div></div><div style="padding:20px;border:1px solid #f0f0f0;border-radius:10px;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,0.04);"><div style="font-size:26px;font-weight:800;color:#E67E22;letter-spacing:-1px;">3 sett.</div><div style="font-size:12px;color:#6b7280;margin-top:4px;font-weight:500;">dalla ricerca all'offerta</div></div><div style="padding:20px;border:1px solid #f0f0f0;border-radius:10px;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,0.04);"><div style="font-size:26px;font-weight:800;color:#E67E22;letter-spacing:-1px;">12</div><div style="font-size:12px;color:#6b7280;margin-top:4px;font-weight:500;">colloqui ottenuti</div></div></div></section><section style="margin-bottom:40px;"><h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#E67E22;margin:0 0 16px;">La Citazione</h2><blockquote style="margin:0;padding:20px 24px;border-left:4px solid #E67E22;background:#fff7ed;border-radius:0 10px 10px 0;"><p style="margin:0 0 12px;color:#1f2937;font-size:16px;font-style:italic;line-height:1.7;">"Non avrei mai immaginato che la mia esperienza in contabilità potesse diventare un vantaggio nel mondo AI. Oggi sviluppo modelli per analisi finanziaria e ogni giorno mi sveglio entusiasta di andare al lavoro."</p><footer style="display:flex;align-items:center;gap:8px;"><div style="width:24px;height:24px;background:linear-gradient(135deg,#E67E22,#f59e0b);border-radius:50%;display:flex;align-items:center;justify-content:center;"><span style="color:#fff;font-size:10px;font-weight:700;">GR</span></div><cite style="font-style:normal;color:#E67E22;font-size:13px;font-weight:600;">Giulia Romano</cite><span style="color:#9ca3af;font-size:13px;">AI Engineer @ TechCorp</span></footer></blockquote></section><hr style="border:none;border-top:1px solid #f0f0f0;margin-bottom:32px;"><div><p style="color:#6b7280;font-size:13px;font-weight:500;margin:0 0 14px;">Condividi questa storia:</p><div style="display:flex;align-items:center;gap:10px;"><button style="display:flex;align-items:center;gap:8px;padding:9px 16px;border-radius:8px;border:1px solid #e5e7eb;background:#fff;color:#374151;font-size:13px;font-weight:500;cursor:pointer;">LinkedIn</button><button style="display:flex;align-items:center;gap:8px;padding:9px 16px;border-radius:8px;border:1px solid #e5e7eb;background:#fff;color:#374151;font-size:13px;font-weight:500;cursor:pointer;">Instagram</button><button style="display:flex;align-items:center;gap:8px;padding:9px 16px;border-radius:8px;border:1px solid #e5e7eb;background:#fff;color:#374151;font-size:13px;font-weight:500;cursor:pointer;">Email</button></div></div></div></main></div>`,
  },
  {
    id: "course-email-welcome",
    name: "Course Welcome Email Sequence",
    description:
      "5-part onboarding email dashboard with timeline, engagement tracking and customizable email templates.",
    category: "ui",
    price: 1299,
    stripePriceId: "price_1TD5Q9BoWNgrJbiyg4t1Uxfn",
    tags: ["elearning", "email", "onboarding", "sequence", "student retention"],
    downloads: 0,
    isNew: true,
    content: `<div style="display:flex;height:800px;width:1200px;font-family:system-ui,-apple-system,sans-serif;overflow:hidden;"><div style="width:240px;min-width:240px;background:#1e1e2e;display:flex;flex-direction:column;height:100%;color:#cdd6f4;"><div style="padding:24px 20px 20px;border-bottom:1px solid #313244;"><div style="display:flex;align-items:center;gap:10px;"><div style="width:32px;height:32px;background:linear-gradient(135deg,#10B981,#059669);border-radius:8px;display:flex;align-items:center;justify-content:center;"><span style="color:#fff;font-size:16px;font-weight:800;">A</span></div><span style="font-size:18px;font-weight:700;color:#cdd6f4;letter-spacing:-0.3px;">AutoMail</span></div></div><nav style="padding:16px 12px;flex:1;"><div style="margin-bottom:4px;"><div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;background:#313244;color:#10B981;cursor:pointer;"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg><span style="font-size:14px;font-weight:600;">Sequenze</span></div></div><div style="margin-bottom:4px;"><div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;color:#6c7086;cursor:pointer;"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg><span style="font-size:14px;font-weight:500;">Contatti</span></div></div><div style="margin-bottom:4px;"><div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;color:#6c7086;cursor:pointer;"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg><span style="font-size:14px;font-weight:500;">Analytics</span></div></div></nav><div style="padding:16px 20px;border-top:1px solid #313244;"><div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:#1a2e25;border-radius:8px;border:1px solid #1a3d2b;"><div style="width:8px;height:8px;border-radius:50%;background:#10B981;box-shadow:0 0 6px #10B981;flex-shrink:0;"></div><div><div style="font-size:11px;font-weight:600;color:#10B981;">Sequenza attiva</div><div style="font-size:10px;color:#4a5568;margin-top:1px;">847 iscritti</div></div></div></div></div><div style="flex:1;background:#f8f9fa;display:flex;flex-direction:column;overflow:hidden;"><div style="background:#fff;border-bottom:1px solid #e5e7eb;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;"><div><div style="font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.6px;font-weight:600;margin-bottom:2px;">Sequenza email</div><div style="font-size:18px;font-weight:700;color:#111827;letter-spacing:-0.3px;">Onboarding Nuovo Studente</div></div><div style="display:flex;align-items:center;gap:10px;"><div style="display:flex;align-items:center;gap:6px;padding:5px 12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:20px;"><div style="width:7px;height:7px;border-radius:50%;background:#10B981;"></div><span style="font-size:12px;font-weight:600;color:#059669;">Attiva</span></div><div style="padding:5px 12px;background:#f3f4f6;border-radius:20px;font-size:12px;font-weight:600;color:#6b7280;">5 email</div></div></div><div style="flex:1;display:flex;overflow:hidden;"><div style="flex:1;overflow-y:auto;padding:24px 24px 24px 32px;"><div style="display:flex;gap:16px;margin-bottom:24px;"><div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:14px 18px;flex:1;text-align:center;"><div style="font-size:22px;font-weight:800;color:#111827;">847</div><div style="font-size:11px;color:#9ca3af;margin-top:2px;">Iscritti totali</div></div><div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:14px 18px;flex:1;text-align:center;"><div style="font-size:22px;font-weight:800;color:#10B981;">59.6%</div><div style="font-size:11px;color:#9ca3af;margin-top:2px;">Open rate medio</div></div><div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:14px 18px;flex:1;text-align:center;"><div style="font-size:22px;font-weight:800;color:#3b82f6;">18.4%</div><div style="font-size:11px;color:#9ca3af;margin-top:2px;">Click rate medio</div></div></div><div style="position:relative;display:flex;gap:0;margin-bottom:0;"><div style="display:flex;flex-direction:column;align-items:center;width:40px;flex-shrink:0;"><div style="width:14px;height:14px;border-radius:50%;background:#10B981;border:2px solid #fff;box-shadow:0 0 0 2px #10B981;z-index:1;margin-top:20px;flex-shrink:0;"></div><div style="width:2px;flex:1;border-left:2px dashed #d1d5db;margin-top:4px;"></div></div><div style="flex:1;background:#fff;border:1px solid #e5e7eb;border-left:4px solid #10B981;border-radius:10px;padding:14px 16px;margin-left:8px;margin-top:12px;box-shadow:0 1px 4px rgba(0,0,0,0.06);"><div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;"><div><div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;"><span style="font-size:14px;">✅</span><span style="font-size:14px;font-weight:700;color:#111827;">Benvenuto</span><span style="font-size:10px;padding:2px 8px;background:#f0fdf4;color:#059669;border-radius:10px;font-weight:600;border:1px solid #bbf7d0;">Inviata</span></div><div style="font-size:12px;color:#6b7280;">Oggetto: "Benvenuto nel corso, [Nome]!"</div></div><div style="text-align:right;flex-shrink:0;margin-left:12px;"><div style="font-size:11px;color:#9ca3af;">Timing</div><div style="font-size:13px;font-weight:700;color:#374151;">Immediata</div></div></div><div style="display:flex;gap:16px;"><div style="flex:1;"><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:11px;color:#6b7280;">Open rate</span><span style="font-size:11px;font-weight:700;color:#10B981;">78%</span></div><div style="height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden;"><div style="height:100%;width:78%;background:#10B981;border-radius:3px;"></div></div></div><div style="flex:1;"><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:11px;color:#6b7280;">Click rate</span><span style="font-size:11px;font-weight:700;color:#3b82f6;">24%</span></div><div style="height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden;"><div style="height:100%;width:24%;background:#3b82f6;border-radius:3px;"></div></div></div></div></div></div><div style="position:relative;display:flex;gap:0;"><div style="display:flex;flex-direction:column;align-items:center;width:40px;flex-shrink:0;"><div style="width:2px;border-left:2px dashed #d1d5db;height:12px;"></div><div style="width:14px;height:14px;border-radius:50%;background:#10B981;border:2px solid #fff;box-shadow:0 0 0 2px #10B981;z-index:1;flex-shrink:0;"></div><div style="width:2px;flex:1;border-left:2px dashed #d1d5db;margin-top:4px;"></div></div><div style="flex:1;background:#fff;border:1px solid #e5e7eb;border-left:4px solid #10B981;border-radius:10px;padding:14px 16px;margin-left:8px;box-shadow:0 1px 4px rgba(0,0,0,0.06);"><div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;"><div><div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;"><span style="font-size:14px;">📋</span><span style="font-size:14px;font-weight:700;color:#111827;">Piano di Studio</span><span style="font-size:10px;padding:2px 8px;background:#f0fdf4;color:#059669;border-radius:10px;font-weight:600;border:1px solid #bbf7d0;">Inviata</span></div><div style="font-size:12px;color:#6b7280;">Oggetto: "Il tuo piano personalizzato è pronto"</div></div><div style="text-align:right;flex-shrink:0;margin-left:12px;"><div style="font-size:11px;color:#9ca3af;">Timing</div><div style="font-size:13px;font-weight:700;color:#374151;">+24 ore</div></div></div><div style="display:flex;gap:16px;"><div style="flex:1;"><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:11px;color:#6b7280;">Open rate</span><span style="font-size:11px;font-weight:700;color:#10B981;">65%</span></div><div style="height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden;"><div style="height:100%;width:65%;background:#10B981;border-radius:3px;"></div></div></div><div style="flex:1;"><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:11px;color:#6b7280;">Click rate</span><span style="font-size:11px;font-weight:700;color:#3b82f6;">19%</span></div><div style="height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden;"><div style="height:100%;width:19%;background:#3b82f6;border-radius:3px;"></div></div></div></div></div></div><div style="position:relative;display:flex;gap:0;"><div style="display:flex;flex-direction:column;align-items:center;width:40px;flex-shrink:0;"><div style="width:2px;border-left:2px dashed #d1d5db;height:12px;"></div><div style="width:14px;height:14px;border-radius:50%;background:#10B981;border:2px solid #fff;box-shadow:0 0 0 2px #10B981;z-index:1;flex-shrink:0;"></div><div style="width:2px;flex:1;border-left:2px dashed #d1d5db;margin-top:4px;"></div></div><div style="flex:1;background:#fff;border:1px solid #e5e7eb;border-left:4px solid #10B981;border-radius:10px;padding:14px 16px;margin-left:8px;box-shadow:0 1px 4px rgba(0,0,0,0.06);"><div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;"><div><div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;"><span style="font-size:14px;">🎯</span><span style="font-size:14px;font-weight:700;color:#111827;">Quick Win</span><span style="font-size:10px;padding:2px 8px;background:#f0fdf4;color:#059669;border-radius:10px;font-weight:600;border:1px solid #bbf7d0;">Inviata</span></div><div style="font-size:12px;color:#6b7280;">Oggetto: "Completa questo esercizio in 10 min"</div></div><div style="text-align:right;flex-shrink:0;margin-left:12px;"><div style="font-size:11px;color:#9ca3af;">Timing</div><div style="font-size:13px;font-weight:700;color:#374151;">+3 giorni</div></div></div><div style="display:flex;gap:16px;"><div style="flex:1;"><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:11px;color:#6b7280;">Open rate</span><span style="font-size:11px;font-weight:700;color:#10B981;">58%</span></div><div style="height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden;"><div style="height:100%;width:58%;background:#10B981;border-radius:3px;"></div></div></div><div style="flex:1;"><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:11px;color:#6b7280;">Click rate</span><span style="font-size:11px;font-weight:700;color:#3b82f6;">21%</span></div><div style="height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden;"><div style="height:100%;width:21%;background:#3b82f6;border-radius:3px;"></div></div></div></div></div></div><div style="position:relative;display:flex;gap:0;"><div style="display:flex;flex-direction:column;align-items:center;width:40px;flex-shrink:0;"><div style="width:2px;border-left:2px dashed #d1d5db;height:12px;"></div><div style="width:14px;height:14px;border-radius:50%;background:#f59e0b;border:2px solid #fff;box-shadow:0 0 0 2px #f59e0b;z-index:1;flex-shrink:0;"></div><div style="width:2px;flex:1;border-left:2px dashed #d1d5db;margin-top:4px;"></div></div><div style="flex:1;background:#fff;border:1px solid #e5e7eb;border-left:4px solid #f59e0b;border-radius:10px;padding:14px 16px;margin-left:8px;box-shadow:0 1px 4px rgba(0,0,0,0.06);"><div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;"><div><div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;"><span style="font-size:14px;">💪</span><span style="font-size:14px;font-weight:700;color:#111827;">Supera il Blocco</span><span style="font-size:10px;padding:2px 8px;background:#fffbeb;color:#d97706;border-radius:10px;font-weight:600;border:1px solid #fde68a;">In corso</span></div><div style="font-size:12px;color:#6b7280;">Oggetto: "Bloccato? Ecco come superare ogni ostacolo"</div></div><div style="text-align:right;flex-shrink:0;margin-left:12px;"><div style="font-size:11px;color:#9ca3af;">Timing</div><div style="font-size:13px;font-weight:700;color:#374151;">+7 giorni</div></div></div><div style="display:flex;gap:16px;"><div style="flex:1;"><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:11px;color:#6b7280;">Open rate</span><span style="font-size:11px;font-weight:700;color:#f59e0b;">52%</span></div><div style="height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden;"><div style="height:100%;width:52%;background:#f59e0b;border-radius:3px;"></div></div></div><div style="flex:1;"><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:11px;color:#6b7280;">Click rate</span><span style="font-size:11px;font-weight:700;color:#3b82f6;">15%</span></div><div style="height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden;"><div style="height:100%;width:15%;background:#3b82f6;border-radius:3px;"></div></div></div></div></div></div><div style="position:relative;display:flex;gap:0;margin-bottom:24px;"><div style="display:flex;flex-direction:column;align-items:center;width:40px;flex-shrink:0;"><div style="width:2px;border-left:2px dashed #d1d5db;height:12px;"></div><div style="width:14px;height:14px;border-radius:50%;background:#3b82f6;border:2px solid #fff;box-shadow:0 0 0 2px #3b82f6;z-index:1;flex-shrink:0;"></div></div><div style="flex:1;background:#fff;border:1px solid #e5e7eb;border-left:4px solid #3b82f6;border-radius:10px;padding:14px 16px;margin-left:8px;box-shadow:0 1px 4px rgba(0,0,0,0.06);"><div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;"><div><div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;"><span style="font-size:14px;">🤝</span><span style="font-size:14px;font-weight:700;color:#111827;">Community</span><span style="font-size:10px;padding:2px 8px;background:#eff6ff;color:#3b82f6;border-radius:10px;font-weight:600;border:1px solid #bfdbfe;">Programmata</span></div><div style="font-size:12px;color:#6b7280;">Oggetto: "Unisciti alla community esclusiva"</div></div><div style="text-align:right;flex-shrink:0;margin-left:12px;"><div style="font-size:11px;color:#9ca3af;">Timing</div><div style="font-size:13px;font-weight:700;color:#374151;">+14 giorni</div></div></div><div style="display:flex;gap:16px;"><div style="flex:1;"><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:11px;color:#6b7280;">Open rate stimato</span><span style="font-size:11px;font-weight:700;color:#3b82f6;">45%</span></div><div style="height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden;"><div style="height:100%;width:45%;background:#3b82f6;border-radius:3px;opacity:0.6;"></div></div></div><div style="flex:1;"><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:11px;color:#6b7280;">Click rate stimato</span><span style="font-size:11px;font-weight:700;color:#3b82f6;">12%</span></div><div style="height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden;"><div style="height:100%;width:12%;background:#3b82f6;border-radius:3px;opacity:0.6;"></div></div></div></div></div></div></div><div style="width:220px;min-width:220px;background:#fff;border-left:1px solid #e5e7eb;display:flex;flex-direction:column;overflow:hidden;"><div style="padding:14px 16px;border-bottom:1px solid #e5e7eb;background:#f9fafb;"><div style="font-size:11px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.5px;">Anteprima — Email 1</div></div><div style="flex:1;overflow-y:auto;padding:12px;"><div style="background:#f3f4f6;border-radius:6px;padding:8px 10px;margin-bottom:10px;"><div style="font-size:9px;color:#9ca3af;margin-bottom:2px;">Da:</div><div style="font-size:10px;font-weight:600;color:#374151;">Marco — Forma</div><div style="font-size:9px;color:#9ca3af;margin-top:4px;margin-bottom:2px;">Oggetto:</div><div style="font-size:10px;font-weight:700;color:#111827;">Benvenuto nel corso, Giulia!</div></div><div style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;"><div style="background:linear-gradient(135deg,#059669,#10B981);padding:16px 12px;text-align:center;"><div style="font-size:11px;font-weight:800;color:#fff;">Forma</div><div style="font-size:8px;color:#a7f3d0;margin-top:2px;">Academy</div></div><div style="padding:12px 10px;background:#fff;"><div style="font-size:10px;font-weight:700;color:#111827;margin-bottom:6px;">Ciao Giulia,</div><div style="font-size:9px;color:#4b5563;line-height:1.5;margin-bottom:8px;">Benvenuta ufficialmente nel corso!</div><div style="text-align:center;margin-bottom:10px;"><div style="display:inline-block;background:#10B981;color:#fff;font-size:9px;font-weight:700;padding:7px 14px;border-radius:5px;">Inizia Subito →</div></div></div><div style="padding:8px 10px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;"><div style="font-size:8px;color:#9ca3af;">© 2024 Forma Academy</div></div></div></div></div></div></div>`,
  },
  // ── Free Templates (Content Magnet Bundle) ────────────────────────────────
  {
    id: "free-email-optin",
    name: "Email Opt-in Section",
    description: "Minimal email capture section with value proposition, social proof counter, and animated gradient border.",
    category: "ui" as TemplateCategory,
    price: 0,
    stripePriceId: "price_free_email_optin",
    tags: ["free", "email", "optin", "lead capture", "newsletter", "landing"],
    downloads: 0,
    isNew: true,
    content: `<section class="relative bg-[#050402] min-h-[480px] flex items-center justify-center px-4 py-16 overflow-hidden">
  <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse at 50% 0%,rgba(200,169,110,0.12) 0%,transparent 60%)"></div>
  <div class="relative max-w-lg w-full text-center">
    <p class="text-[11px] font-bold uppercase tracking-[0.2em] mb-4" style="color:#C8A96E">Gratis · Nessuna carta richiesta</p>
    <h2 class="text-3xl md:text-4xl font-black text-[#F2EBD9] leading-tight mb-3" style="letter-spacing:-0.02em">
      Ricevi template<br/>pronti all'uso
    </h2>
    <p class="text-[15px] text-[#F2EBD9]/55 mb-8 max-w-md mx-auto leading-relaxed">
      Iscriviti alla newsletter e ricevi subito 3 template premium gratis. Unisciti a 2.400+ professionisti.
    </p>
    <form class="flex gap-2 max-w-sm mx-auto">
      <input type="email" placeholder="nome@email.com" class="flex-1 bg-[#F2EBD9]/6 border border-[#F2EBD9]/9 px-4 py-3 text-[14px] text-[#F2EBD9] placeholder:text-[#F2EBD9]/30 outline-none focus:border-[#C8A96E]/40 transition-colors" />
      <button type="submit" class="px-6 py-3 font-bold text-[13px] transition-colors" style="background:#C8A96E;color:#050402">Iscriviti</button>
    </form>
    <p class="text-[11px] text-[#F2EBD9]/30 mt-4">Zero spam · Cancella quando vuoi</p>
  </div>
</section>`,
  },
  {
    id: "free-testimonial-cards",
    name: "Testimonial Cards Grid",
    description: "3-column testimonial grid with star ratings, avatar initials, and editorial serif styling. Dark theme.",
    category: "ui" as TemplateCategory,
    price: 0,
    stripePriceId: "price_free_testimonial_cards",
    tags: ["free", "testimonials", "reviews", "social proof", "landing"],
    downloads: 0,
    isNew: true,
    content: `<section class="bg-[#050402] px-4 py-16">
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-10">
      <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C8A96E] mb-2">Recensioni</p>
      <h2 class="text-2xl md:text-3xl font-black text-[#F2EBD9] tracking-tight">Amato dai professionisti</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-[#F2EBD9]/4 border border-[#F2EBD9]/8 p-5">
        <div class="flex gap-0.5 mb-3">${Array.from({length:5}).map(() => '<svg width="13" height="13" viewBox="0 0 10 10" fill="#C8A96E"><path d="M5 0l1.2 3.7H10L6.9 5.9l1.2 3.7L5 7.5l-3.1 2.1 1.2-3.7L0 3.7h3.8z"/></svg>').join('')}</div>
        <p class="text-[13px] text-[#F2EBD9]/55 leading-relaxed mb-4">"Ho lanciato la landing del mio SaaS in meno di un giorno. Il template era perfetto."</p>
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 bg-gradient-to-br from-[#9C7733] to-[#C8A96E] flex items-center justify-center text-[11px] font-bold text-[#050402]">MF</div>
          <div><p class="text-[12px] font-semibold text-[#F2EBD9]">Marco F.</p><p class="text-[11px] text-[#F2EBD9]/40">Founder</p></div>
        </div>
      </div>
      <div class="bg-[#F2EBD9]/4 border border-[#F2EBD9]/8 p-5">
        <div class="flex gap-0.5 mb-3">${Array.from({length:5}).map(() => '<svg width="13" height="13" viewBox="0 0 10 10" fill="#C8A96E"><path d="M5 0l1.2 3.7H10L6.9 5.9l1.2 3.7L5 7.5l-3.1 2.1 1.2-3.7L0 3.7h3.8z"/></svg>').join('')}</div>
        <p class="text-[13px] text-[#F2EBD9]/55 leading-relaxed mb-4">"Risparmio ore di lavoro. Risultati professionali a prezzi competitivi per i miei clienti."</p>
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 bg-gradient-to-br from-[#B5501F] to-[#C4622D] flex items-center justify-center text-[11px] font-bold text-white">SN</div>
          <div><p class="text-[12px] font-semibold text-[#F2EBD9]">Sara N.</p><p class="text-[11px] text-[#F2EBD9]/40">Designer</p></div>
        </div>
      </div>
      <div class="bg-[#F2EBD9]/4 border border-[#F2EBD9]/8 p-5">
        <div class="flex gap-0.5 mb-3">${Array.from({length:5}).map(() => '<svg width="13" height="13" viewBox="0 0 10 10" fill="#C8A96E"><path d="M5 0l1.2 3.7H10L6.9 5.9l1.2 3.7L5 7.5l-3.1 2.1 1.2-3.7L0 3.7h3.8z"/></svg>').join('')}</div>
        <p class="text-[13px] text-[#F2EBD9]/55 leading-relaxed mb-4">"I prompt per LinkedIn hanno triplicato il mio engagement. Claude li personalizza perfettamente."</p>
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 bg-gradient-to-br from-[#7A6B56] to-[#9C7733] flex items-center justify-center text-[11px] font-bold text-[#F2EBD9]">LM</div>
          <div><p class="text-[12px] font-semibold text-[#F2EBD9]">Luca M.</p><p class="text-[11px] text-[#F2EBD9]/40">Marketing</p></div>
        </div>
      </div>
    </div>
  </div>
</section>`,
  },
  {
    id: "free-cold-intro-prompt",
    name: "Cold Intro Email Generator",
    description: "Outreach campaign manager with AI-generated email variants, relevance scoring and one-click export.",
    category: "ui" as TemplateCategory,
    price: 0,
    stripePriceId: "price_free_cold_intro_prompt",
    tags: ["free", "email", "cold outreach", "sales", "ai prompt", "b2b"],
    downloads: 0,
    isNew: true,
    content: `<div style="display:flex;height:100vh;font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;overflow:hidden;"><div style="width:220px;min-width:220px;background:#1e1e2e;display:flex;flex-direction:column;overflow:hidden;"><div style="padding:20px 20px 16px;border-bottom:1px solid rgba(255,255,255,0.08);"><div style="display:flex;align-items:center;gap:8px;"><div style="width:28px;height:28px;background:linear-gradient(135deg,#3B82F6,#8B5CF6);border-radius:7px;display:flex;align-items:center;justify-content:center;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h8M2 12h5" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg></div><span style="color:#fff;font-size:14px;font-weight:700;letter-spacing:-0.3px;">OutreachAI</span></div></div><nav style="flex:1;padding:12px 10px;"><div style="margin-bottom:4px;"><div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:rgba(59,130,246,0.18);border-radius:7px;cursor:pointer;"><svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="1" width="5.5" height="5.5" rx="1.5" fill="#3B82F6"/><rect x="8.5" y="1" width="5.5" height="5.5" rx="1.5" fill="#3B82F6" opacity="0.6"/><rect x="1" y="8.5" width="5.5" height="5.5" rx="1.5" fill="#3B82F6" opacity="0.6"/><rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1.5" fill="#3B82F6" opacity="0.3"/></svg><span style="color:#fff;font-size:13px;font-weight:600;">Campagne</span></div></div><div style="margin-bottom:4px;"><div style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:7px;cursor:pointer;"><span style="color:#6b7280;font-size:13px;font-weight:500;">Contatti</span></div></div><div style="margin-bottom:4px;"><div style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:7px;cursor:pointer;"><span style="color:#6b7280;font-size:13px;font-weight:500;">Template</span></div></div><div style="margin-bottom:4px;"><div style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:7px;cursor:pointer;"><span style="color:#6b7280;font-size:13px;font-weight:500;">Analytics</span></div></div><div style="height:1px;background:rgba(255,255,255,0.06);margin:12px 4px;"></div><div style="padding:0 4px;margin-bottom:6px;"><span style="color:#4b5563;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;">Recenti</span></div><div style="padding:7px 12px;border-radius:6px;cursor:pointer;margin-bottom:2px;"><div style="color:#9ca3af;font-size:12px;">TechCorp — Intro</div></div><div style="padding:7px 12px;border-radius:6px;cursor:pointer;"><div style="color:#9ca3af;font-size:12px;">SaaS Leads Q1</div></div></nav><div style="padding:14px 20px;border-top:1px solid rgba(255,255,255,0.06);"><div style="display:flex;align-items:center;gap:6px;"><div style="width:6px;height:6px;background:#22c55e;border-radius:50%;"></div><span style="color:#4b5563;font-size:11px;font-weight:500;">Powered by AI</span></div></div></div><div style="flex:1;display:flex;flex-direction:column;overflow:hidden;"><div style="background:#fff;border-bottom:1px solid #e2e8f0;padding:14px 28px;display:flex;align-items:center;justify-content:space-between;"><div><div style="display:flex;align-items:center;gap:8px;"><span style="color:#0f172a;font-size:15px;font-weight:700;">Campagna: TechCorp — Introduzione</span><span style="background:#dbeafe;color:#1d4ed8;font-size:11px;font-weight:600;padding:3px 9px;border-radius:20px;">3 varianti generate</span></div><div style="color:#94a3b8;font-size:12px;margin-top:2px;">Creata il 23 marzo 2026 · Modello: Cold Intro Email Prompt</div></div><div style="display:flex;align-items:center;gap:8px;"><button style="padding:7px 16px;border:none;background:#3B82F6;border-radius:7px;font-size:12px;font-weight:600;color:#fff;cursor:pointer;">Esporta tutto</button></div></div><div style="flex:1;overflow-y:auto;padding:22px 28px;display:flex;flex-direction:column;gap:16px;"><div style="background:#f1f5f9;border-radius:10px;padding:14px 18px;"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;"><span style="color:#475569;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;">Variabili di input</span><span style="color:#3B82F6;font-size:11px;font-weight:600;cursor:pointer;">Modifica</span></div><div style="display:flex;gap:12px;flex-wrap:wrap;"><div style="background:#fff;border:1px solid #e2e8f0;border-radius:7px;padding:7px 14px;"><span style="color:#94a3b8;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;display:block;">Azienda</span><span style="color:#0f172a;font-size:13px;font-weight:600;">DesignFlow</span></div><div style="background:#fff;border:1px solid #e2e8f0;border-radius:7px;padding:7px 14px;"><span style="color:#94a3b8;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;display:block;">Destinatario</span><span style="color:#0f172a;font-size:13px;font-weight:600;">Marco Bianchi, CTO</span></div><div style="background:#fff;border:1px solid #e2e8f0;border-radius:7px;padding:7px 14px;"><span style="color:#94a3b8;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;display:block;">Proposta di valore</span><span style="color:#0f172a;font-size:13px;font-weight:600;">Ridurre i tempi di deploy del 40%</span></div></div></div><div style="background:#fff;border-radius:10px;box-shadow:0 1px 4px rgba(0,0,0,0.07),0 0 0 1px #e2e8f0;overflow:hidden;"><div style="padding:14px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;"><div style="display:flex;align-items:center;gap:10px;"><div style="width:26px;height:26px;background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:7px;display:flex;align-items:center;justify-content:center;"><span style="color:#1d4ed8;font-size:11px;font-weight:800;">A</span></div><div><span style="color:#0f172a;font-size:13px;font-weight:700;">Variante A</span><span style="color:#94a3b8;font-size:12px;margin-left:6px;">· Riferimento specifico</span></div></div><div style="display:flex;align-items:center;gap:8px;"><span style="background:#dcfce7;color:#15803d;font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;">92% rilevanza</span><button style="padding:6px 14px;border:none;background:#3B82F6;border-radius:6px;font-size:11px;font-weight:600;color:#fff;cursor:pointer;">Usa questa</button></div></div><div style="padding:16px 20px;"><div style="margin-bottom:10px;"><span style="color:#94a3b8;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;">Oggetto</span><div style="color:#0f172a;font-size:13px;font-weight:600;margin-top:3px;background:#f8fafc;border-radius:6px;padding:8px 12px;border-left:3px solid #3B82F6;">DesignFlow + deploy in metà tempo</div></div><div><span style="color:#94a3b8;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;">Corpo email</span><div style="color:#334155;font-size:13px;line-height:1.65;margin-top:6px;"><p style="margin:0 0 7px;">Ciao Marco,</p><p style="margin:0 0 7px;">ho notato che DesignFlow sta scalando rapidamente il proprio team tecnico — complimenti per la crescita. Lavorando con aziende simili nel settore SaaS, abbiamo aiutato CTO come te a <strong style="color:#0f172a;">ridurre i cicli di deploy del 40%</strong> senza stravolgere il workflow esistente.</p><p style="margin:7px 0 0;color:#64748b;font-size:12px;">Sarebbe utile una chiamata di 15 minuti per capire se c'è margine anche per DesignFlow?</p></div></div></div></div><div style="background:#fff;border-radius:10px;box-shadow:0 1px 4px rgba(0,0,0,0.07),0 0 0 1px #e2e8f0;overflow:hidden;"><div style="padding:14px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;"><div style="display:flex;align-items:center;gap:10px;"><div style="width:26px;height:26px;background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:7px;display:flex;align-items:center;justify-content:center;"><span style="color:#15803d;font-size:11px;font-weight:800;">B</span></div><div><span style="color:#0f172a;font-size:13px;font-weight:700;">Variante B</span><span style="color:#94a3b8;font-size:12px;margin-left:6px;">· Social proof</span></div></div><div style="display:flex;align-items:center;gap:8px;"><span style="background:#dbeafe;color:#1d4ed8;font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;">87% rilevanza</span><button style="padding:6px 14px;border:1px solid #e2e8f0;background:#fff;border-radius:6px;font-size:11px;font-weight:600;color:#475569;cursor:pointer;">Usa questa</button></div></div><div style="padding:16px 20px;"><div style="margin-bottom:10px;"><span style="color:#94a3b8;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;">Oggetto</span><div style="color:#0f172a;font-size:13px;font-weight:600;margin-top:3px;background:#f8fafc;border-radius:6px;padding:8px 12px;border-left:3px solid #22c55e;">Come Startup X ha dimezzato i deploy</div></div><div><span style="color:#94a3b8;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;">Corpo email</span><div style="color:#334155;font-size:13px;line-height:1.65;margin-top:6px;"><p style="margin:0 0 7px;">Salve Marco,</p><p style="margin:0 0 7px;">sei mesi fa Flowbit — una scale-up SaaS molto simile a DesignFlow — aveva lo stesso problema: pipeline di deploy lente. Dopo aver integrato la nostra soluzione, il loro team ha <strong style="color:#0f172a;">ridotto i tempi di deploy del 43%</strong> già nel primo mese.</p><p style="margin:0;color:#64748b;font-size:12px;">Potrei condividere il case study completo e capire se i numeri hanno senso anche per voi.</p></div></div></div></div><div style="background:#fff;border-radius:10px;box-shadow:0 1px 4px rgba(0,0,0,0.07),0 0 0 1px #e2e8f0;overflow:hidden;"><div style="padding:14px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;"><div style="display:flex;align-items:center;gap:10px;"><div style="width:26px;height:26px;background:#fefce8;border:1.5px solid #fde68a;border-radius:7px;display:flex;align-items:center;justify-content:center;"><span style="color:#a16207;font-size:11px;font-weight:800;">C</span></div><div><span style="color:#0f172a;font-size:13px;font-weight:700;">Variante C</span><span style="color:#94a3b8;font-size:12px;margin-left:6px;">· Domanda diretta</span></div></div><div style="display:flex;align-items:center;gap:8px;"><span style="background:#fef9c3;color:#a16207;font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;">81% rilevanza</span><button style="padding:6px 14px;border:1px solid #e2e8f0;background:#fff;border-radius:6px;font-size:11px;font-weight:600;color:#475569;cursor:pointer;">Usa questa</button></div></div><div style="padding:16px 20px;"><div style="margin-bottom:10px;"><span style="color:#94a3b8;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;">Oggetto</span><div style="color:#0f172a;font-size:13px;font-weight:600;margin-top:3px;background:#f8fafc;border-radius:6px;padding:8px 12px;border-left:3px solid #f59e0b;">15 minuti per il vostro deploy?</div></div><div><span style="color:#94a3b8;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;">Corpo email</span><div style="color:#334155;font-size:13px;line-height:1.65;margin-top:6px;"><p style="margin:0 0 7px;">Marco, buongiorno.</p><p style="margin:0 0 7px;">Domanda diretta: quanto tempo perde il team di DesignFlow ogni settimana a causa di deploy lenti? Per molti CTO con cui parliamo la risposta è <strong style="color:#0f172a;">"troppo"</strong>.</p><p style="margin:0;color:#64748b;font-size:12px;">Le chiedo 15 minuti per mostrarle come abbiamo risolto questo problema per aziende simili. Disponibile giovedì o venerdì?</p></div></div></div></div></div></div></div>`,
  },

  {
    id: "free-hero-section",
    name: "Minimalist Hero Section",
    description: "Hero section dark con headline impattante, CTA doppio e badge di disponibilità. Pronto all'uso, zero dipendenze.",
    category: "ui" as TemplateCategory,
    price: 0,
    stripePriceId: "price_free_hero_section",
    tags: ["free", "hero", "landing", "dark", "cta", "starter"],
    downloads: 0,
    isNew: true,
    content: `<section style="min-height:100vh;background:#0A0A0B;display:flex;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:40px 24px;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% -10%,rgba(200,169,110,0.12),transparent);pointer-events:none;"></div>
  <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(200,169,110,0.3),transparent);"></div>
  <div style="max-width:680px;width:100%;text-align:center;position:relative;z-index:1;">
    <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:5px 14px;margin-bottom:32px;">
      <span style="width:6px;height:6px;border-radius:50%;background:#10b981;box-shadow:0 0 8px #10b981;flex-shrink:0;"></span>
      <span style="font-size:12px;color:rgba(255,255,255,0.5);font-weight:500;letter-spacing:0.3px;">Disponibile ora · Gratis</span>
    </div>
    <h1 style="font-size:clamp(2.4rem,6vw,4rem);font-weight:800;color:#F2EBD9;line-height:1.08;letter-spacing:-0.04em;margin:0 0 20px;">
      Il tuo prossimo<br><span style="background:linear-gradient(135deg,#C8A96E,#9C7733);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">grande lancio</span>
    </h1>
    <p style="font-size:17px;color:rgba(242,235,217,0.45);line-height:1.65;margin:0 auto 36px;max-width:480px;font-weight:400;">Template pronti all'uso. Zero configurazione. Risultati professionali da subito — senza sprecare ore in design.</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:32px;">
      <button style="background:linear-gradient(135deg,#C8A96E,#9C7733);color:#0A0A0B;border:none;padding:14px 28px;font-size:14px;font-weight:800;cursor:pointer;letter-spacing:0.01em;border-radius:0;">Inizia gratis →</button>
      <button style="background:transparent;color:rgba(242,235,217,0.65);border:1px solid rgba(242,235,217,0.15);padding:14px 24px;font-size:14px;font-weight:500;cursor:pointer;border-radius:0;">Vedi demo</button>
    </div>
    <div style="display:flex;align-items:center;justify-content:center;gap:20px;flex-wrap:wrap;">
      <span style="font-size:12px;color:rgba(242,235,217,0.25);display:flex;align-items:center;gap:6px;">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#C8A96E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Nessuna carta di credito
      </span>
      <span style="color:rgba(242,235,217,0.1);">·</span>
      <span style="font-size:12px;color:rgba(242,235,217,0.25);display:flex;align-items:center;gap:6px;">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#C8A96E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Zero spam
      </span>
      <span style="color:rgba(242,235,217,0.1);">·</span>
      <span style="font-size:12px;color:rgba(242,235,217,0.25);display:flex;align-items:center;gap:6px;">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#C8A96E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Cancella quando vuoi
      </span>
    </div>
  </div>
</section>`,
  },
  {
    id: "free-feature-grid",
    name: "Feature Grid with Icons",
    description: "Griglia 3-colonne per presentare feature di prodotto. Dark theme, icone SVG inline, hover animato. Ideale per SaaS e landing page.",
    category: "ui" as TemplateCategory,
    price: 0,
    stripePriceId: "price_free_feature_grid",
    tags: ["free", "features", "grid", "saas", "dark", "icons", "starter"],
    downloads: 0,
    isNew: true,
    content: `<section style="background:#0A0A0B;padding:80px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:900px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:56px;">
      <span style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#9C7733;background:rgba(156,119,51,0.1);border:1px solid rgba(156,119,51,0.25);padding:5px 14px;margin-bottom:16px;">Funzionalità</span>
      <h2 style="font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;color:#F2EBD9;line-height:1.1;letter-spacing:-0.03em;margin:0 0 14px;">Tutto ciò di cui hai bisogno,<br>niente di superfluo</h2>
      <p style="font-size:16px;color:rgba(242,235,217,0.4);max-width:440px;margin:0 auto;line-height:1.6;">Ogni feature è pensata per farti risparmiare tempo e consegnare lavoro professionale.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(242,235,217,0.08);">
      <div style="background:#0d0b08;padding:28px 24px;transition:background 0.2s;" onmouseenter="this.style.background='#111009'" onmouseleave="this.style.background='#0d0b08'">
        <div style="width:40px;height:40px;background:rgba(156,119,51,0.1);border:1px solid rgba(156,119,51,0.2);display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l2.4 4.8L18 7.6l-4 3.9.9 5.5L10 14.4l-4.9 2.6.9-5.5L2 7.6l5.6-.8L10 2z" fill="#C8A96E"/></svg>
        </div>
        <h3 style="font-size:15px;font-weight:700;color:#F2EBD9;margin:0 0 8px;letter-spacing:-0.01em;">Design premium</h3>
        <p style="font-size:13px;color:rgba(242,235,217,0.4);line-height:1.6;margin:0;">Ogni template è curato nei minimi dettagli per fare un'impressione duratura.</p>
      </div>
      <div style="background:#0d0b08;padding:28px 24px;" onmouseenter="this.style.background='#111009'" onmouseleave="this.style.background='#0d0b08'">
        <div style="width:40px;height:40px;background:rgba(156,119,51,0.1);border:1px solid rgba(156,119,51,0.2);display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="#C8A96E" stroke-width="1.8"/><path d="M7 10l2 2 4-4" stroke="#C8A96E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <h3 style="font-size:15px;font-weight:700;color:#F2EBD9;margin:0 0 8px;letter-spacing:-0.01em;">Pronto in minuti</h3>
        <p style="font-size:13px;color:rgba(242,235,217,0.4);line-height:1.6;margin:0;">Scarica, personalizza, pubblica. Nessun setup complicato, zero dipendenze.</p>
      </div>
      <div style="background:#0d0b08;padding:28px 24px;" onmouseenter="this.style.background='#111009'" onmouseleave="this.style.background='#0d0b08'">
        <div style="width:40px;height:40px;background:rgba(156,119,51,0.1);border:1px solid rgba(156,119,51,0.2);display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="1" fill="#C8A96E" opacity="0.7"/><rect x="11" y="3" width="6" height="6" rx="1" fill="#C8A96E"/><rect x="3" y="11" width="6" height="6" rx="1" fill="#C8A96E"/><rect x="11" y="11" width="6" height="6" rx="1" fill="#C8A96E" opacity="0.5"/></svg>
        </div>
        <h3 style="font-size:15px;font-weight:700;color:#F2EBD9;margin:0 0 8px;letter-spacing:-0.01em;">Modulare</h3>
        <p style="font-size:13px;color:rgba(242,235,217,0.4);line-height:1.6;margin:0;">Combina i blocchi come vuoi. Ogni sezione è autonoma e riusabile.</p>
      </div>
      <div style="background:#0d0b08;padding:28px 24px;" onmouseenter="this.style.background='#111009'" onmouseleave="this.style.background='#0d0b08'">
        <div style="width:40px;height:40px;background:rgba(156,119,51,0.1);border:1px solid rgba(156,119,51,0.2);display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3v3M10 14v3M3 10h3M14 10h3" stroke="#C8A96E" stroke-width="1.8" stroke-linecap="round"/><circle cx="10" cy="10" r="3" stroke="#C8A96E" stroke-width="1.8"/></svg>
        </div>
        <h3 style="font-size:15px;font-weight:700;color:#F2EBD9;margin:0 0 8px;letter-spacing:-0.01em;">AI-ready</h3>
        <p style="font-size:13px;color:rgba(242,235,217,0.4);line-height:1.6;margin:0;">Personalizza con Claude AI direttamente dallo Studio integrato in pochi click.</p>
      </div>
      <div style="background:#0d0b08;padding:28px 24px;" onmouseenter="this.style.background='#111009'" onmouseleave="this.style.background='#0d0b08'">
        <div style="width:40px;height:40px;background:rgba(156,119,51,0.1);border:1px solid rgba(156,119,51,0.2);display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6" stroke="#C8A96E" stroke-width="1.8" stroke-linecap="round"/><path d="M10 7v3l2 2" stroke="#C8A96E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <h3 style="font-size:15px;font-weight:700;color:#F2EBD9;margin:0 0 8px;letter-spacing:-0.01em;">Aggiornamenti inclusi</h3>
        <p style="font-size:13px;color:rgba(242,235,217,0.4);line-height:1.6;margin:0;">Nuovi template e miglioramenti ogni mese, senza costi aggiuntivi.</p>
      </div>
      <div style="background:#0d0b08;padding:28px 24px;" onmouseenter="this.style.background='#111009'" onmouseleave="this.style.background='#0d0b08'">
        <div style="width:40px;height:40px;background:rgba(156,119,51,0.1);border:1px solid rgba(156,119,51,0.2);display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 7v6l7 5 7-5V7l-7-5z" stroke="#C8A96E" stroke-width="1.8" stroke-linejoin="round"/></svg>
        </div>
        <h3 style="font-size:15px;font-weight:700;color:#F2EBD9;margin:0 0 8px;letter-spacing:-0.01em;">Qualità garantita</h3>
        <p style="font-size:13px;color:rgba(242,235,217,0.4);line-height:1.6;margin:0;">Ogni template è testato su browser moderni. Codice pulito, accessibile, manutenibile.</p>
      </div>
    </div>
  </div>
</section>`,
  },

  // ── Shopify Templates ────────────────────────────────────────────────────────
  {
    id: "shopify-product-landing",
    name: "Shopify Product Landing",
    description: "High-converting Shopify product landing section with hero image, feature grid, and add-to-cart. Liquid-ready.",
    category: "ui",
    price: 1499,
    stripePriceId: "price_1TCIgGBoWNgrJbiyShopProd1",
    tags: ["shopify", "ecommerce", "product", "landing", "liquid"],
    downloads: 312,
    isNew: true,
    downloadType: "shopify",
    content: `<section class="relative min-h-screen bg-gradient-to-br from-emerald-950 via-gray-950 to-gray-900 flex items-center justify-center overflow-hidden">
  <div class="absolute inset-0 opacity-[0.03]" style="background-image:url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22><rect width=%2260%22 height=%2260%22 fill=%22none%22/><path d=%22M30 0v60M0 30h60%22 stroke=%22%23fff%22 stroke-width=%220.5%22/></svg>');background-size:60px 60px"></div>
  <div class="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
    <div>
      <span class="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30 bg-emerald-500/10 mb-6 tracking-wide uppercase">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.76 3.57L13 5.24l-2.8 2.73.66 3.86L7 9.67 3.14 11.83l.66-3.86L1 5.24l4.24-.67L7 1z" fill="currentColor"/></svg>
        Shopify Theme Section
      </span>
      <h1 class="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
        Handcrafted<br/>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Artisan Candles</span>
      </h1>
      <p class="text-lg text-white/60 mb-8 max-w-md">100% natural soy wax, hand-poured in small batches. Each candle burns for 60+ hours of pure tranquility.</p>
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl font-bold text-white">€34.99</span>
        <span class="text-lg text-white/40 line-through">€44.99</span>
        <span class="bg-emerald-500/20 text-emerald-400 text-sm font-bold px-2.5 py-0.5">-22%</span>
      </div>
      <div class="flex gap-3">
        <button class="px-8 py-3.5 bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition">Add to Cart</button>
        <button class="px-6 py-3.5 border border-white/20 text-white font-semibold hover:bg-white/5 transition">Learn More</button>
      </div>
      <div class="flex items-center gap-6 mt-8 text-sm text-white/40">
        <span>Free shipping</span>
        <span>·</span>
        <span>30-day returns</span>
        <span>·</span>
        <span>Eco-friendly</span>
      </div>
    </div>
    <div class="relative">
      <div class="aspect-square bg-gradient-to-br from-emerald-900/40 to-gray-900/60 border border-white/10 flex items-center justify-center">
        <div class="text-center">
          <div class="text-6xl mb-4">🕯️</div>
          <p class="text-white/30 text-sm">Product image</p>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-2 mt-2">
        <div class="aspect-square bg-white/5 border border-white/10 flex items-center justify-center text-2xl">🕯️</div>
        <div class="aspect-square bg-white/5 border border-white/10 flex items-center justify-center text-2xl">📦</div>
        <div class="aspect-square bg-white/5 border border-white/10 flex items-center justify-center text-2xl">🌿</div>
      </div>
    </div>
  </div>
</section>`,
  },
  {
    id: "shopify-collection-grid",
    name: "Shopify Collection Grid",
    description: "Elegant product collection grid for Shopify with filtering, quick view, and animated hover cards. Liquid theme section.",
    category: "ui",
    price: 1299,
    stripePriceId: "price_1TCIgGBoWNgrJbiyShopColl1",
    tags: ["shopify", "ecommerce", "collection", "grid", "liquid", "filter"],
    downloads: 187,
    isNew: true,
    downloadType: "shopify",
    content: `<section class="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 py-16 px-6">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-3">Our Collection</h2>
      <p class="text-white/50 max-w-lg mx-auto">Curated essentials for the modern home. Each piece designed with care and crafted with intention.</p>
    </div>
    <div class="flex items-center justify-center gap-2 mb-10 flex-wrap">
      <button class="px-4 py-2 text-sm font-semibold bg-white text-gray-900">All</button>
      <button class="px-4 py-2 text-sm font-semibold text-white/60 border border-white/10 hover:border-white/30 transition">Candles</button>
      <button class="px-4 py-2 text-sm font-semibold text-white/60 border border-white/10 hover:border-white/30 transition">Diffusers</button>
      <button class="px-4 py-2 text-sm font-semibold text-white/60 border border-white/10 hover:border-white/30 transition">Gift Sets</button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="group border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
        <div class="aspect-[4/5] bg-gradient-to-br from-amber-900/20 to-gray-900/40 flex items-center justify-center relative overflow-hidden">
          <span class="text-5xl group-hover:scale-110 transition-transform duration-500">🕯️</span>
          <div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"><button class="bg-white text-gray-900 text-xs font-bold px-3 py-1.5">Quick View</button></div>
        </div>
        <div class="p-4">
          <h3 class="text-white font-semibold text-sm">Amber &amp; Vanilla Candle</h3>
          <p class="text-white/40 text-xs mt-1">Hand-poured soy wax · 60h burn</p>
          <div class="flex items-center justify-between mt-3">
            <span class="text-white font-bold">€29.99</span>
            <button class="text-xs text-emerald-400 font-semibold">Add to Cart →</button>
          </div>
        </div>
      </div>
      <div class="group border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
        <div class="aspect-[4/5] bg-gradient-to-br from-rose-900/20 to-gray-900/40 flex items-center justify-center relative overflow-hidden">
          <span class="text-5xl group-hover:scale-110 transition-transform duration-500">🌸</span>
          <div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"><button class="bg-white text-gray-900 text-xs font-bold px-3 py-1.5">Quick View</button></div>
        </div>
        <div class="p-4">
          <h3 class="text-white font-semibold text-sm">Rose Petal Reed Diffuser</h3>
          <p class="text-white/40 text-xs mt-1">Natural essential oils · 90 days</p>
          <div class="flex items-center justify-between mt-3">
            <span class="text-white font-bold">€39.99</span>
            <button class="text-xs text-emerald-400 font-semibold">Add to Cart →</button>
          </div>
        </div>
      </div>
      <div class="group border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
        <div class="aspect-[4/5] bg-gradient-to-br from-violet-900/20 to-gray-900/40 flex items-center justify-center relative overflow-hidden">
          <span class="text-5xl group-hover:scale-110 transition-transform duration-500">🎁</span>
          <div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"><button class="bg-white text-gray-900 text-xs font-bold px-3 py-1.5">Quick View</button></div>
        </div>
        <div class="p-4">
          <h3 class="text-white font-semibold text-sm">Serenity Gift Set</h3>
          <p class="text-white/40 text-xs mt-1">3 candles + diffuser · Gift box</p>
          <div class="flex items-center justify-between mt-3">
            <span class="text-white font-bold">€89.99</span>
            <button class="text-xs text-emerald-400 font-semibold">Add to Cart →</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
  },
  {
    id: "shopify-announcement-bar",
    name: "Shopify Announcement Bar",
    description: "Rotating announcement bar with countdown timer, free-shipping threshold, and slide-in animation. Drop-in Liquid section.",
    category: "ui",
    price: 499,
    stripePriceId: "price_1TCIgGBoWNgrJbiyShopAnn1",
    tags: ["shopify", "ecommerce", "announcement", "bar", "liquid", "countdown"],
    downloads: 524,
    isNew: true,
    downloadType: "shopify",
    content: `<div class="relative bg-gradient-to-r from-gray-950 via-emerald-950 to-gray-950 py-16 px-6">
  <div class="max-w-4xl mx-auto text-center">
    <p class="text-xs text-emerald-400/80 uppercase tracking-[0.2em] font-semibold mb-6">Shopify Announcement Bar Section</p>
    <div class="space-y-6">
      <div class="bg-emerald-600 py-2.5 px-4 flex items-center justify-center gap-3 text-white text-sm font-semibold">
        <span>🚀 FLASH SALE — 30% OFF EVERYTHING</span>
        <span class="text-white/60">|</span>
        <span class="font-mono tabular-nums">02:14:37</span>
        <span class="text-white/60">remaining</span>
      </div>
      <div class="bg-gray-900 border border-white/10 py-2.5 px-4 flex items-center justify-center gap-3 text-white text-sm">
        <span>📦 Free shipping on orders over €50</span>
        <span class="text-emerald-400 font-semibold">· You're €12 away!</span>
      </div>
      <div class="bg-gradient-to-r from-violet-600 to-fuchsia-600 py-2.5 px-4 flex items-center justify-center gap-3 text-white text-sm font-semibold overflow-hidden relative">
        <span>New arrivals just dropped — Shop the Spring Collection →</span>
      </div>
    </div>
    <p class="text-white/30 text-xs mt-8">Three announcement bar styles included. Auto-rotate, countdown timer, and free-shipping threshold built in.</p>
  </div>
</div>`,
  },

  // ── WordPress Templates ──────────────────────────────────────────────────────
  {
    id: "wordpress-business-theme",
    name: "WordPress Business Theme",
    description: "Complete WordPress business theme with hero, services, testimonials, and contact form. Clean PHP template hierarchy.",
    category: "ui",
    price: 1999,
    stripePriceId: "price_1TCIgHBoWNgrJbiyWpBiz1",
    tags: ["wordpress", "business", "theme", "php", "corporate", "services"],
    downloads: 245,
    isNew: true,
    downloadType: "wordpress",
    content: `<section class="min-h-screen bg-gradient-to-br from-blue-950 via-gray-950 to-gray-900 flex items-center justify-center overflow-hidden relative">
  <div class="absolute inset-0 opacity-[0.03]" style="background-image:url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><circle cx=%2220%22 cy=%2220%22 r=%221%22 fill=%22%23fff%22/></svg>');background-size:40px 40px"></div>
  <div class="max-w-6xl mx-auto px-6 py-20 relative z-10">
    <div class="text-center mb-16">
      <span class="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-blue-300 border border-blue-500/30 bg-blue-500/10 mb-6 tracking-wide uppercase">WordPress Theme</span>
      <h1 class="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
        Build with <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Confidence</span>
      </h1>
      <p class="text-lg text-white/50 max-w-2xl mx-auto mb-8">A clean, modern WordPress theme built for businesses that mean business. Starter-ready with full template hierarchy.</p>
      <div class="flex gap-3 justify-center">
        <button class="px-8 py-3.5 bg-blue-600 text-white font-bold hover:bg-blue-500 transition">Get Started</button>
        <button class="px-6 py-3.5 border border-white/20 text-white font-semibold hover:bg-white/5 transition">View Demo</button>
      </div>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      <div class="border border-white/10 bg-white/[0.02] p-6">
        <div class="w-10 h-10 bg-blue-500/20 flex items-center justify-center mb-4"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L2 7l8 5 8-5-8-5zM2 13l8 5 8-5" stroke="#60A5FA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h3 class="text-white font-bold mb-2">Services</h3>
        <p class="text-white/40 text-sm">Custom post type for services with icon, description, and CTA. Sortable in admin.</p>
      </div>
      <div class="border border-white/10 bg-white/[0.02] p-6">
        <div class="w-10 h-10 bg-blue-500/20 flex items-center justify-center mb-4"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM2 17a6 6 0 0112 0" stroke="#60A5FA" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <h3 class="text-white font-bold mb-2">Testimonials</h3>
        <p class="text-white/40 text-sm">Client reviews with photo, name, company, and star rating. Carousel or grid layout.</p>
      </div>
      <div class="border border-white/10 bg-white/[0.02] p-6">
        <div class="w-10 h-10 bg-blue-500/20 flex items-center justify-center mb-4"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="#60A5FA" stroke-width="1.5"/><path d="M2 8h16" stroke="#60A5FA" stroke-width="1.5"/></svg></div>
        <h3 class="text-white font-bold mb-2">Contact Form</h3>
        <p class="text-white/40 text-sm">Built-in contact form with validation. No plugin required. Sends via wp_mail().</p>
      </div>
    </div>
    <div class="mt-8 text-center">
      <p class="text-white/25 text-xs">Includes: front-page.php · page.php · single.php · archive.php · functions.php · style.css · 3 custom post types</p>
    </div>
  </div>
</section>`,
  },
  {
    id: "wordpress-blog-theme",
    name: "WordPress Blog Theme",
    description: "Minimal typography-focused WordPress blog theme. Optimised for readability with custom post formats, sidebar widgets, and comment styling.",
    category: "ui",
    price: 1499,
    stripePriceId: "price_1TCIgHBoWNgrJbiyWpBlog1",
    tags: ["wordpress", "blog", "theme", "php", "minimal", "typography"],
    downloads: 389,
    isNew: true,
    downloadType: "wordpress",
    content: `<section class="min-h-screen bg-gradient-to-b from-stone-950 to-gray-950 py-16 px-6">
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-16">
      <span class="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-500/30 bg-amber-500/10 mb-6 tracking-wide uppercase">WordPress Blog Theme</span>
      <h1 class="text-4xl md:text-5xl font-serif text-white leading-tight mb-3">The Art of<br/>Thoughtful Writing</h1>
      <p class="text-white/40 text-lg">A blog theme that puts your words first.</p>
    </div>
    <article class="border border-white/10 bg-white/[0.02] overflow-hidden">
      <div class="aspect-[21/9] bg-gradient-to-br from-amber-900/20 to-gray-900/40 flex items-center justify-center">
        <span class="text-4xl">📝</span>
      </div>
      <div class="p-8 md:p-12">
        <div class="flex items-center gap-3 mb-4">
          <span class="text-amber-400 text-xs font-semibold uppercase tracking-wider">Design</span>
          <span class="text-white/20">·</span>
          <span class="text-white/30 text-xs">March 24, 2026</span>
          <span class="text-white/20">·</span>
          <span class="text-white/30 text-xs">5 min read</span>
        </div>
        <h2 class="text-2xl font-bold text-white mb-4">Why Minimalism Wins in Web Design</h2>
        <p class="text-white/50 leading-relaxed mb-4">In an era of information overload, the most effective websites are those that embrace restraint. Every element must earn its place on the page — if it doesn't serve the reader, it doesn't belong.</p>
        <p class="text-white/50 leading-relaxed">This theme is built on that principle. Clean typography, generous whitespace, and a reading experience that gets out of the way of your content.</p>
        <div class="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
          <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-lg">👤</div>
          <div>
            <p class="text-white text-sm font-semibold">Elena Rossi</p>
            <p class="text-white/30 text-xs">Design Lead</p>
          </div>
        </div>
      </div>
    </article>
    <div class="mt-6 text-center">
      <p class="text-white/25 text-xs">Includes: index.php · single.php · page.php · comments.php · sidebar.php · functions.php · 3 post formats · Custom widgets</p>
    </div>
  </div>
</section>`,
  },
  {
    id: "wordpress-portfolio-theme",
    name: "WordPress Portfolio Theme",
    description: "Showcase portfolio theme for WordPress with filterable project grid, lightbox gallery, and client testimonials. CPT-based.",
    category: "ui",
    price: 1499,
    stripePriceId: "price_1TCIgHBoWNgrJbiyWpPort1",
    tags: ["wordpress", "portfolio", "theme", "php", "gallery", "creative"],
    downloads: 156,
    isNew: true,
    downloadType: "wordpress",
    content: `<section class="min-h-screen bg-gradient-to-br from-violet-950 via-gray-950 to-gray-900 py-16 px-6">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-12">
      <span class="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-violet-300 border border-violet-500/30 bg-violet-500/10 mb-6 tracking-wide uppercase">WordPress Portfolio Theme</span>
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-3">Selected Work</h2>
      <p class="text-white/40">A curated collection of my best projects.</p>
    </div>
    <div class="flex items-center justify-center gap-2 mb-10 flex-wrap">
      <button class="px-4 py-2 text-sm font-semibold bg-white text-gray-900">All</button>
      <button class="px-4 py-2 text-sm font-semibold text-white/60 border border-white/10 hover:border-white/30 transition">Branding</button>
      <button class="px-4 py-2 text-sm font-semibold text-white/60 border border-white/10 hover:border-white/30 transition">Web Design</button>
      <button class="px-4 py-2 text-sm font-semibold text-white/60 border border-white/10 hover:border-white/30 transition">Photography</button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="group relative aspect-square bg-gradient-to-br from-violet-900/30 to-gray-900/50 border border-white/10 overflow-hidden cursor-pointer">
        <div class="absolute inset-0 flex items-center justify-center"><span class="text-5xl group-hover:scale-110 transition-transform duration-500">🎨</span></div>
        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div class="text-center"><h3 class="text-white font-bold">Brand Identity</h3><p class="text-white/60 text-sm">Artisan Coffee Co.</p></div>
        </div>
      </div>
      <div class="group relative aspect-square bg-gradient-to-br from-blue-900/30 to-gray-900/50 border border-white/10 overflow-hidden cursor-pointer">
        <div class="absolute inset-0 flex items-center justify-center"><span class="text-5xl group-hover:scale-110 transition-transform duration-500">💻</span></div>
        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div class="text-center"><h3 class="text-white font-bold">Web Redesign</h3><p class="text-white/60 text-sm">TechFlow SaaS</p></div>
        </div>
      </div>
      <div class="group relative aspect-square bg-gradient-to-br from-rose-900/30 to-gray-900/50 border border-white/10 overflow-hidden cursor-pointer">
        <div class="absolute inset-0 flex items-center justify-center"><span class="text-5xl group-hover:scale-110 transition-transform duration-500">📸</span></div>
        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div class="text-center"><h3 class="text-white font-bold">Photo Series</h3><p class="text-white/60 text-sm">Urban Landscapes</p></div>
        </div>
      </div>
    </div>
    <div class="mt-8 text-center">
      <p class="text-white/25 text-xs">Includes: front-page.php · archive-project.php · single-project.php · taxonomy-project_category.php · Lightbox gallery · functions.php</p>
    </div>
  </div>
</section>`,
  },
];


export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}

export function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}

/** Lightweight template record — no inline HTML/prompt content. Use in catalog listings. */
export type TemplateMeta = Omit<Template, "content">;

/** All templates without their content strings — safe for client-side catalog imports. */
export const templatesMeta: TemplateMeta[] = templates.map(
  ({ content: _c, ...meta }) => meta
);

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
  emoji: string;
  accentColor: string; // Tailwind color class prefix, e.g. "blue"
  tags: string[];
  /** Optional: ID of the single template to spotlight on the bundle detail page */
  featuredProductId?: string;
}

export const bundles: Bundle[] = [
  {
    id: "bundle-saas-starter",
    name: "SaaS Starter Kit",
    tagline: "Lancia il tuo SaaS in un weekend",
    description:
      "Tutto ciò che serve per il tuo prodotto SaaS: hero section, pricing, features, dashboard e pricing completo. Risparmia ore di lavoro.",
    templateIds: ["hero-saas", "pricing-table", "feature-showcase", "saas-dashboard", "saas-pricing-full"],
    highlights: [
      "5 template UI pronti per produzione",
      "Da zero a SaaS in un weekend",
      "Risparmia €36 rispetto all'acquisto singolo",
    ],
    price: 2999,
    regularPrice: 5895,
    stripePriceId: "price_1TCExzBoWNgrJbiyVMKwMclb",
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
    highlights: [
      "5 prompt ottimizzati per Claude e ChatGPT",
      "Copertura completa: email, social, e-commerce",
      "Risparmia €31 rispetto all'acquisto singolo",
    ],
    price: 2299,
    regularPrice: 4495,
    stripePriceId: "price_1TCEy0BoWNgrJbiyV3JvPKLu",
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
    highlights: [
      "Presenza online professionale in un giorno",
      "CV, portfolio, fattura e newsletter inclusi",
      "Risparmia €12 rispetto all'acquisto singolo",
    ],
    price: 1999,
    regularPrice: 3196,
    stripePriceId: "price_1TCEy1BoWNgrJbiyl3MIkjJA",
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
    highlights: [
      "Il setup definitivo per lavorare con Claude",
      "6 system prompt + workflow + content LinkedIn",
      "Risparmia €22 rispetto all'acquisto singolo",
    ],
    price: 2999,
    regularPrice: 4996,
    stripePriceId: "price_1TCEy1BoWNgrJbiyKvC8QEdv",
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
    highlights: [
      "Tutti i touchpoint digitali in un colpo solo",
      "Ristorante, café, hotel e e-commerce coperti",
      "Risparmia €21 rispetto all'acquisto singolo",
    ],
    price: 1999,
    regularPrice: 4096,
    stripePriceId: "price_1TCEy2BoWNgrJbiyNuGtejM7",
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
    highlights: [
      "Strumenti concreti per chi produce davvero",
      "ADHD tracker, AI workflow e YouTube script",
      "Risparmia €15 rispetto all'acquisto singolo",
    ],
    price: 2499,
    regularPrice: 3997,
    stripePriceId: "price_1TCEy3BoWNgrJbiyfOfCLSnm",
    emoji: "⚡",
    accentColor: "orange",
    tags: ["productivity", "focus", "adhd", "automation"],
  },
  {
    id: "bundle-notion-productivity",
    name: "Notion Productivity Pack",
    tagline: "Il tuo workspace Notion completo in un colpo solo",
    description:
      "5 template Notion premium: Project Hub, CRM, Content Calendar, Finance Tracker e Second Brain. Tutto ciò che serve per lavorare meglio.",
    templateIds: ["notion-project-hub", "notion-freelancer-crm", "notion-content-calendar", "notion-finance-tracker", "notion-second-brain"],
    highlights: [
      "5 template Notion premium pronti all'uso",
      "Da CRM a PKM: copertura completa del workflow",
      "Risparmia €19 rispetto all'acquisto singolo",
    ],
    price: 3499,
    regularPrice: 6395,
    stripePriceId: "price_1TCIgGBoWNgrJbiyhXB2eWbc",
    emoji: "📓",
    accentColor: "emerald",
    tags: ["notion", "productivity", "pkm", "crm", "project management"],
  },
  {
    id: "bundle-free-starter",
    name: "Free Starter Kit",
    tagline: "5 template gratis per iniziare subito",
    description:
      "Il kit di partenza completo: hero section, feature grid, email opt-in, testimonial cards e un generatore di cold email AI. Cinque template pronti all'uso, zero costi — scopri la qualità Forma prima di acquistare.",
    templateIds: [
      "free-hero-section",
      "free-feature-grid",
      "free-email-optin",
      "free-testimonial-cards",
      "free-cold-intro-prompt",
    ],
    highlights: [
      "5 template premium 100% gratuiti",
      "4 sezioni UI + 1 tool AI inclusi",
      "Perfetto per testare prima di acquistare",
    ],
    price: 0,
    regularPrice: 0,
    stripePriceId: "price_free_starter_bundle",
    emoji: "🎁",
    accentColor: "amber",
    tags: ["free", "starter", "content magnet", "lead magnet"],
    featuredProductId: "ai-assistant-system-prompt",
  },
];

export function getBundle(id: string): Bundle | undefined {
  return bundles.find((b) => b.id === id);
}

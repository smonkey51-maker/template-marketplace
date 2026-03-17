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
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
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
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
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

  // ── Canva-Style Templates ─────────────────────────────────────────────────
  {
    id: "real-estate-agent",
    name: "Real Estate Agent Profile",
    description:
      "Elegant Canva-style profile page for real estate agents with listings showcase and contact CTA.",
    category: "ui",
    price: 899,
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
    tags: ["real estate", "agent", "profile", "canva", "listings"],
    downloads: 312,
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
    price: 799,
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
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
    price: 799,
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
    tags: ["therapist", "psychologist", "health", "canva", "booking"],
    downloads: 267,
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
    price: 899,
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
    tags: ["law", "legal", "firm", "canva", "professional"],
    downloads: 198,
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
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
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
    price: 799,
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
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
    price: 599,
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
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
    price: 799,
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
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
    price: 1199,
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
    tags: ["saas", "landing", "dark", "framer", "conversion"],
    downloads: 728,
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
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
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
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
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
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
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
    price: 1299,
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
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
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
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
    stripePriceId: "price_1TBixDBoWNgrJbiydllw5Qig",
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
  return `€${(cents / 100).toFixed(2)}`;
}

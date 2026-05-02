export default function CatalogSection() {
  const templates = [
    { id: 1, title: "Minimalist Portfolio", category: "Portfolio", featured: true },
    { id: 2, title: "E-commerce Landing", category: "E-commerce", featured: false },
    { id: 3, title: "Blog Editorial", category: "Content", featured: true },
    { id: 4, title: "SaaS Dashboard", category: "Dashboard", featured: false },
    { id: 5, title: "Agency Showcase", category: "Agency", featured: false },
    { id: 6, title: "Creative Studio", category: "Studio", featured: true },
  ];

  return (
    <div className="relative h-full flex flex-col items-center justify-center px-4 py-20">
      {/* Procedural dots overlay (Seurat style) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#D4AF37]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6,
            }}
          />
        ))}
      </div>

      <div className="anim-in relative z-10 w-full max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 mb-4">
            <span className="text-xs uppercase tracking-wider text-[#D4AF37]">Catalogo</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">Template Collection</h2>
          <p className="text-lg opacity-70">Esplora i nostri design pronti all'uso</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <div
              key={template.id}
              className="anim-up group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all cursor-pointer hover:-translate-y-2"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {template.featured && (
                <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8962E] text-xs font-semibold text-black">
                  Editor's Pick
                </div>
              )}

              <div className="aspect-[4/3] bg-gradient-to-br from-white/10 to-white/5 rounded-xl mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37]/40" />
              </div>

              <h3 className="text-xl mb-2">{template.title}</h3>
              <p className="text-sm opacity-60">{template.category}</p>

              <div className="mt-4 flex items-center text-[#D4AF37] text-sm group-hover:translate-x-2 transition-transform">
                <span>Visualizza</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section counter */}
      <div className="absolute top-8 right-8 text-sm opacity-30">02 / 05</div>

      {/* Oversized background text */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[12vw] font-bold opacity-5 pointer-events-none whitespace-nowrap"
        style={{ WebkitTextStroke: "2px currentColor", color: "transparent" }}
      >
        CATALOGO
      </div>
    </div>
  );
}

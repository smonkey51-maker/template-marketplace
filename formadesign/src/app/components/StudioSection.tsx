export default function StudioSection() {
  return (
    <div className="relative h-full flex flex-col items-center justify-center px-4 py-20">
      {/* Abstract geometric overlay (Kandinsky style) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <circle cx="200" cy="150" r="80" fill="#F5C519" opacity="0.6" />
          <circle cx="800" cy="300" r="120" fill="#D4AF37" opacity="0.4" />
          <polygon points="600,700 700,900 500,900" fill="#7ec8a0" opacity="0.5" />
          <rect x="100" y="600" width="150" height="150" fill="#B8962E" opacity="0.3" transform="rotate(45 175 675)" />
          <path d="M 400 200 Q 500 100, 600 200" stroke="#F5C519" strokeWidth="8" fill="none" opacity="0.6" />
        </svg>
      </div>

      <div className="anim-in relative z-10 w-full max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-[#F5C519]/20 border border-[#F5C519]/30 mb-4">
            <span className="text-xs uppercase tracking-wider text-[#F5C519]">AI Studio</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">Genera con AI</h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Descrivi la tua visione e Claude AI creerà il template perfetto
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Input Panel */}
          <div className="anim-up backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl mb-6">Prompt AI</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm opacity-70 mb-2">Descrizione</label>
                <textarea
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl outline-none focus:border-[#F5C519]/50 transition-colors resize-none"
                  rows={4}
                  placeholder="Es: Una landing page moderna per startup tech con sezione hero, features e pricing..."
                />
              </div>

              <div>
                <label className="block text-sm opacity-70 mb-2">Stile</label>
                <select className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl outline-none focus:border-[#F5C519]/50 transition-colors">
                  <option>Minimale</option>
                  <option>Bold & Colorato</option>
                  <option>Elegante & Serif</option>
                  <option>Tech & Futuristico</option>
                </select>
              </div>

              <button className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-[#F5C519] to-[#D4AF37] text-black font-semibold hover:shadow-lg hover:shadow-[rgba(245,197,25,0.4)] transition-all hover:-translate-y-1">
                Genera Template →
              </button>
            </div>
          </div>

          {/* Preview Grid */}
          <div className="anim-up grid grid-cols-2 gap-4" style={{ animationDelay: "0.2s" }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10 flex items-center justify-center hover:border-[#F5C519]/50 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-[#F5C519]/20 border-2 border-[#F5C519]/40 group-hover:scale-110 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section counter */}
      <div className="absolute top-8 right-8 text-sm opacity-30">04 / 05</div>

      {/* Oversized background text */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[12vw] font-bold opacity-5 pointer-events-none whitespace-nowrap"
        style={{ WebkitTextStroke: "2px currentColor", color: "transparent" }}
      >
        STUDIO
      </div>
    </div>
  );
}

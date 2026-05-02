export default function AccountSection() {
  return (
    <div className="relative h-full flex flex-col items-center justify-center px-4 py-20">
      {/* Botanical sunflower illustrations (Van Gogh style) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <svg className="absolute top-10 left-10 w-32 h-32" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="15" fill="#F5C519" />
          {[...Array(12)].map((_, i) => (
            <ellipse
              key={i}
              cx="50"
              cy="25"
              rx="8"
              ry="20"
              fill="#D4AF37"
              transform={`rotate(${i * 30} 50 50)`}
            />
          ))}
        </svg>
        <svg className="absolute bottom-20 right-20 w-40 h-40" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="15" fill="#F5C519" />
          {[...Array(12)].map((_, i) => (
            <ellipse
              key={i}
              cx="50"
              cy="25"
              rx="8"
              ry="20"
              fill="#D4AF37"
              transform={`rotate(${i * 30} 50 50)`}
            />
          ))}
        </svg>
      </div>

      <div className="anim-in relative z-10 w-full max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 mb-4">
            <span className="text-xs uppercase tracking-wider text-[#D4AF37]">Account</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">Area Personale</h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto mb-8">
            Gestisci i tuoi template, personalizzazioni e preferenze
          </p>

          {/* Stats pill */}
          <div className="inline-flex items-center gap-6 px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#D4AF37]">24</div>
              <div className="text-xs opacity-60">Template</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[#D4AF37]">∞</div>
              <div className="text-xs opacity-60">AI Gen</div>
            </div>
          </div>
        </div>

        <div className="anim-up backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-12 max-w-md mx-auto">
          <h3 className="text-2xl mb-8">Accedi o Registrati</h3>

          <div className="space-y-4">
            <button className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8962E] text-black font-semibold hover:shadow-lg hover:shadow-[rgba(212,175,55,0.4)] transition-all hover:-translate-y-1">
              Accedi con Email
            </button>

            <button className="w-full px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all">
              Accedi con Google
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black/50 text-white/60">oppure</span>
              </div>
            </div>

            <button className="w-full px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all">
              Registrati Gratuitamente
            </button>
          </div>

          <p className="mt-8 text-xs opacity-50">
            Nessuna carta richiesta • Inizia gratis
          </p>
        </div>
      </div>

      {/* Section counter */}
      <div className="absolute top-8 right-8 text-sm opacity-30">05 / 05</div>

      {/* Oversized background text */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[12vw] font-bold opacity-5 pointer-events-none whitespace-nowrap"
        style={{ WebkitTextStroke: "2px currentColor", color: "transparent" }}
      >
        ACCOUNT
      </div>

      {/* Warm glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.1), transparent 60%)",
        }}
      />
    </div>
  );
}

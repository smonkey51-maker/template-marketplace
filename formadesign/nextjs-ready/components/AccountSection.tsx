"use client";

export default function AccountSection() {
  return (
    <div className="relative px-6 py-20 flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-8 right-8 text-[#D4AF37] font-bold text-lg tracking-wider">
        05 / 05
      </div>

      <div className="anim-in text-center mb-16">
        <h2
          className="text-5xl md:text-7xl font-bold mb-4 text-[#eaeaea]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Account
        </h2>
        <p
          className="text-xl text-[#8a8a8a] max-w-2xl mx-auto"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          Accedi al tuo profilo e gestisci i tuoi acquisti
        </p>
      </div>

      <div className="anim-up max-w-md w-full" style={{ "--delay": "0.2s" } as any}>
        <div className="bg-[#0f0f0f] border border-[#D4AF37]/20 rounded-sm p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#B8962E] rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
              👤
            </div>
            <h3 className="text-2xl font-bold text-[#eaeaea] mb-2">
              Benvenuto
            </h3>
            <p className="text-[#8a8a8a]">Accedi per continuare</p>
          </div>

          <div className="space-y-4">
            <button className="w-full px-6 py-4 bg-gradient-to-br from-[#D4AF37] to-[#B8962E] text-[#060606] font-bold rounded-sm hover:scale-105 transition-transform duration-300">
              Accedi
            </button>
            <button className="w-full px-6 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-sm hover:bg-[#D4AF37]/10 transition-colors">
              Registrati
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-[#D4AF37]/20">
            <p className="text-[#8a8a8a] text-sm text-center mb-4">
              Vantaggi dell'account:
            </p>
            <ul className="space-y-2 text-sm text-[#8a8a8a]">
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF37]">✓</span>
                Accesso a tutti i tuoi acquisti
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF37]">✓</span>
                Download illimitati
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF37]">✓</span>
                Aggiornamenti gratuiti
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF37]">✓</span>
                Supporto prioritario
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#D4AF37]/30 pointer-events-none text-[12rem] font-black leading-none"
        style={{
          fontFamily: "Montserrat, sans-serif",
          WebkitTextStroke: "2px rgba(212, 175, 55, 0.2)",
          WebkitTextFillColor: "transparent",
        }}
      >
        ACCOUNT
      </div>
    </div>
  );
}

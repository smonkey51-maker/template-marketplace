# Istruzioni Integrazione FORMA → Next.js Vercel

## File Pronti per l'Integrazione

Questa directory contiene tutti i componenti FORMA già modificati per Next.js:

```
nextjs-ready/
├── components/
│   ├── ArtSection.tsx          ✅ "use client" + @/ imports
│   ├── HeroSection.tsx         ✅ "use client" + @/ imports
│   ├── CatalogSection.tsx      ✅ "use client"
│   ├── GuideSection.tsx        ✅ "use client"
│   ├── StudioSection.tsx       ✅ "use client"
│   ├── AccountSection.tsx      ✅ "use client"
│   ├── FormaLogo.tsx          ✅ Server component (no hooks)
│   ├── CustomCursor.tsx        ✅ "use client" + @/ imports
│   └── ScrollIndicator.tsx     ✅ "use client"
└── app/
    └── page.tsx                ✅ Server component con @/ imports
```

---

## Passo 1: Copia i Componenti

Nel tuo repository Next.js su Vercel:

```bash
# Dalla root del tuo progetto template-marketplace
cd /path/to/template-marketplace

# Copia i componenti
cp -r /workspaces/default/code/nextjs-ready/components/* components/

# Sovrascrivi app/page.tsx
cp /workspaces/default/code/nextjs-ready/app/page.tsx app/page.tsx
```

---

## Passo 2: Copia gli Stili CSS

Copia i file CSS da `src/styles/` del progetto Figma Make:

```bash
# Crea directory styles se non esiste
mkdir -p app/styles

# Copia i CSS
cp /workspaces/default/code/src/styles/animations.css app/styles/
cp /workspaces/default/code/src/styles/theme.css app/styles/
cp /workspaces/default/code/src/styles/fonts.css app/styles/
```

---

## Passo 3: Importa CSS in layout.tsx

Modifica `app/layout.tsx` per includere i nuovi stili:

```tsx
// app/layout.tsx
import './globals.css';
import './styles/fonts.css';      // ← AGGIUNGI
import './styles/theme.css';      // ← AGGIUNGI
import './styles/animations.css'; // ← AGGIUNGI

// ... resto del file
```

---

## Passo 4: Verifica Design Tokens

Assicurati che `app/styles/theme.css` contenga questi token:

```css
:root {
  --accent: #D4AF37;
  --bg: #060606;
  --surface: #0f0f0f;
  --text: #eaeaea;
  --muted: #8a8a8a;
  
  --ease-glide: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-snap: cubic-bezier(0.32, 1.10, 0.64, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## Passo 5: Configura Tailwind (se necessario)

Se il tuo `tailwind.config.ts` non include già questi percorsi:

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // ... resto config
};
```

---

## Passo 6: Test Locale

```bash
# Installa dipendenze (se necessario)
npm install

# Avvia dev server
npm run dev

# Apri http://localhost:3000
```

**Cosa verificare:**
- ✅ Scroll-snap funziona (scroll verticale a sezioni)
- ✅ Animazioni entrano quando scorri
- ✅ Custom cursor su desktop (hidden su mobile)
- ✅ Scroll indicator (pallini laterali)
- ✅ Logo FORMA si auto-disegna nella Hero
- ✅ Dipinti di sfondo visibili con overlay

---

## Passo 7: Deploy su Vercel

```bash
# Commit e push
git add .
git commit -m "feat: integrate FORMA snap-scroll design"
git push origin main

# Vercel rileverà il push e deploierà automaticamente
```

---

## Troubleshooting

### "window is not defined"
Se vedi questo errore, verifica che i componenti client abbiano la guard:

```tsx
"use client";

export default function CustomCursor() {
  if (typeof window === "undefined") return null;
  // ... resto
}
```

### Snap-scroll non funziona
Verifica che `globals.css` non sovrascriva le proprietà:

```css
/* Assicurati che body NON abbia overflow: hidden */
html, body {
  overflow: visible;
}
```

### Animazioni non partono
Verifica l'ordine import in `layout.tsx` — `animations.css` deve essere dopo Tailwind.

---

## Note Importanti

1. **Tutti i componenti sono già pronti** — hanno `"use client"` e import `@/components/...`
2. **app/page.tsx è un Server Component** — non ha `"use client"` perché non usa hooks
3. **I CSS sono separati** — `animations.css`, `theme.css`, `fonts.css` vanno in `app/styles/`
4. **Le immagini di sfondo** usano URL Wikipedia Commons — nessun asset locale richiesto
5. **Mobile-safe** — usa `100svh` invece di `100vh` per viewport height corretta

---

**Pronto per il deploy!** 🚀

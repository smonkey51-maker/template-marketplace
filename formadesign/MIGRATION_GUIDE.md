# Guida Migrazione: Figma Make → Next.js Vercel

## Componenti da Copiare

### 1. Core Components (da `src/app/components/`)
```bash
# Copia questi file nel tuo progetto Next.js sotto `/components/`
- ArtSection.tsx          # Wrapper con IntersectionObserver
- HeroSection.tsx         # Hero con logo animato
- CatalogSection.tsx      # Grid template con overlay Seurat
- GuideSection.tsx        # 3-step process
- StudioSection.tsx       # AI generation UI
- AccountSection.tsx      # User account
- FormaLogo.tsx          # Logo animato (3 varianti)
- CustomCursor.tsx       # Cursor con particle trail
- ScrollIndicator.tsx    # Navigation dots
```

### 2. Styles (da `src/styles/`)
```bash
# Copia questi file CSS in `/app/` o `/styles/`
- animations.css         # Keyframes e classi animazione
- theme.css             # Design tokens (mantieni quelli esistenti se compatibili)
- fonts.css             # Import font (se necessario)
```

### 3. Convertire App.tsx → page.tsx

**File Figma Make:** `src/app/App.tsx`
**Destinazione Next.js:** `app/page.tsx`

```tsx
// app/page.tsx (Next.js)
import ArtSection from '@/components/ArtSection';
import HeroSection from '@/components/HeroSection';
import CatalogSection from '@/components/CatalogSection';
import GuideSection from '@/components/GuideSection';
import StudioSection from '@/components/StudioSection';
import AccountSection from '@/components/AccountSection';
import CustomCursor from '@/components/CustomCursor';
import ScrollIndicator from '@/components/ScrollIndicator';

export default function HomePage() {
  return (
    <div
      className="snap-container"
      style={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        background: '#060606',
        color: '#eaeaea',
      }}
    >
      <CustomCursor />
      <ScrollIndicator />

      <ArtSection id="hero" className="hero-section">
        <HeroSection />
      </ArtSection>

      <ArtSection
        id="catalogo"
        className="catalogo-section"
        backgroundImage="https://upload.wikimedia.org/wikipedia/commons/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg"
        overlayOpacity={0.75}
      >
        <CatalogSection />
      </ArtSection>

      <ArtSection
        id="guida"
        className="guida-section"
        backgroundImage="https://upload.wikimedia.org/wikipedia/commons/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg"
        overlayOpacity={0.78}
      >
        <GuideSection />
      </ArtSection>

      <ArtSection
        id="studio"
        className="studio-section"
        backgroundImage="https://upload.wikimedia.org/wikipedia/commons/b/b4/Vassily_Kandinsky%2C_1913_-_Composition_7.jpg"
        overlayOpacity={0.80}
      >
        <StudioSection />
      </ArtSection>

      <ArtSection
        id="account"
        className="account-section"
        backgroundImage="https://upload.wikimedia.org/wikipedia/commons/4/46/Vincent_Willem_van_Gogh_127.jpg"
        overlayOpacity={0.75}
      >
        <AccountSection />
      </ArtSection>
    </div>
  );
}
```

---

## Modifiche Necessarie per Next.js

### 1. **Aggiungere "use client" ai Componenti Interattivi**

Componenti che usano useState, useEffect, event handlers necessitano della direttiva:

```tsx
// components/CustomCursor.tsx
"use client";

import { useEffect, useRef, useState } from "react";
// ... resto del codice
```

**Lista componenti che necessitano "use client":**
- `CustomCursor.tsx` (usa useState, useEffect, eventi mouse)
- `ScrollIndicator.tsx` (usa useState, useEffect, IntersectionObserver)
- `ArtSection.tsx` (usa useRef, useEffect, IntersectionObserver)
- `HeroSection.tsx` (se usa stato interno)
- `StudioSection.tsx` (se ha form/input interattivi)

### 2. **Import Paths**

Cambia gli import relativi con alias Next.js:

```tsx
// ❌ Figma Make
import ArtSection from './components/ArtSection';

// ✅ Next.js
import ArtSection from '@/components/ArtSection';
```

### 3. **CSS Import in layout.tsx**

```tsx
// app/layout.tsx
import '@/styles/animations.css';
import './globals.css'; // se hai già uno
```

---

## Stili CSS da Integrare

### animations.css
```css
/* Già pronto - copia direttamente */
/* Contiene:
   - @keyframes forma-fade-in, forma-fade-up
   - Classi .anim-in, .anim-up, .anim-bg
   - Easing variables
   - prefers-reduced-motion support
*/
```

### Design Tokens da Aggiungere

Se non hai già questi colori in `globals.css`, aggiungili:

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

## Checklist Migrazione

- [ ] Copia componenti in `/components/` del progetto Next.js
- [ ] Aggiungi `"use client"` dove necessario
- [ ] Converti `App.tsx` → `app/page.tsx`
- [ ] Copia `animations.css` e importalo in `layout.tsx`
- [ ] Verifica import paths (usa `@/components/...`)
- [ ] Testa scroll-snap su Next.js
- [ ] Verifica custom cursor funzioni
- [ ] Verifica animazioni IntersectionObserver
- [ ] Deploy su Vercel
- [ ] Testa in produzione

---

## Problemi Comuni

### 1. "window is not defined"
Se CustomCursor o altri componenti danno questo errore:

```tsx
"use client";

export default function CustomCursor() {
  if (typeof window === "undefined") return null;
  // ... resto del codice
}
```

### 2. Snap-scroll non funziona
Verifica che `globals.css` non sovrascriva le proprietà scroll:

```css
/* Assicurati che html/body non abbiano overflow: hidden */
html, body {
  overflow: visible;
}
```

### 3. Animazioni non partono
Verifica che `animations.css` sia importato **dopo** Tailwind in `layout.tsx`.

---

## Deploy su Vercel

Una volta completata la migrazione:

```bash
# Push al repository Git
git add .
git commit -m "feat: integrate FORMA marketplace design from Figma Make"
git push origin main

# Vercel deploierà automaticamente
```

---

## File Configurazione da Copiare

Porta anche questi file nel repo Next.js:

- `.claude/agents/*` → Agenti AI specializzati
- `.env.local.example` → Template variabili ambiente
- `CLAUDE.md` → Documentazione progetto
- `.gitignore` → Regole Git (merge con quello esistente)

---

**Pronto?** Ti preparo un archivio zip con tutti i file o preferisci che ti guidi passo passo?

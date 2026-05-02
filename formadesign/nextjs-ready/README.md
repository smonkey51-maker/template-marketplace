# FORMA Marketplace — Pacchetto Next.js Pronto

Questo pacchetto contiene **tutto il necessario** per integrare il design FORMA nel tuo progetto Next.js su Vercel.

---

## 📦 Contenuto del Pacchetto

```
nextjs-ready/
├── .claude/agents/          # 8 agenti AI specializzati
├── .env.local.example       # Template variabili ambiente (FORMA branding)
├── components/              # 9 componenti React (pronti per Next.js)
├── app/page.tsx            # Main page con snap-scroll
├── INTEGRATION_INSTRUCTIONS.md  # Guida dettagliata step-by-step
└── README.md               # Questo file
```

---

## ✅ Modifiche Già Applicate

**Tutti i file sono già pronti per Next.js 16:**
- ✅ Direttiva `"use client"` aggiunta ai componenti interattivi
- ✅ Import paths convertiti a `@/components/...`
- ✅ TypeScript types completi
- ✅ Compatibilità App Router
- ✅ Server Components dove possibile (es. FormaLogo.tsx)

---

## 🚀 Integrazione Rapida (5 Minuti)

### 1. Copia nel Tuo Progetto

```bash
# Dalla root del tuo repository template-marketplace
cd /path/to/template-marketplace

# Copia TUTTO il contenuto del pacchetto
cp -r /workspaces/default/code/nextjs-ready/.claude .
cp /workspaces/default/code/nextjs-ready/.env.local.example .
cp -r /workspaces/default/code/nextjs-ready/components/* components/
cp /workspaces/default/code/nextjs-ready/app/page.tsx app/page.tsx
```

### 2. Copia i CSS

```bash
# Dal progetto Figma Make
cp /workspaces/default/code/src/styles/animations.css app/styles/
cp /workspaces/default/code/src/styles/theme.css app/styles/
cp /workspaces/default/code/src/styles/fonts.css app/styles/
```

### 3. Importa CSS in layout.tsx

Aggiungi in `app/layout.tsx`:

```tsx
import './styles/fonts.css';
import './styles/theme.css';
import './styles/animations.css';
```

### 4. Test e Deploy

```bash
npm run dev       # Test locale http://localhost:3000
git add .
git commit -m "feat: integrate FORMA snap-scroll design"
git push origin main  # Vercel deploierà automaticamente
```

---

## 📋 Checklist Integrazione

- [ ] Copiato `.claude/agents/` (8 file)
- [ ] Copiato `.env.local.example`
- [ ] Copiato `components/` (9 file)
- [ ] Copiato `app/page.tsx`
- [ ] Copiato CSS da `src/styles/` → `app/styles/`
- [ ] Importato CSS in `app/layout.tsx`
- [ ] Testato locale (snap-scroll, animazioni, cursor)
- [ ] Deploy su Vercel
- [ ] Testato in produzione

---

## 🛠️ Componenti Inclusi

### Client Components (con "use client")
1. **CustomCursor.tsx** — Cursor animato con particle trail (desktop-only)
2. **ScrollIndicator.tsx** — Navigation dots laterali
3. **ArtSection.tsx** — Wrapper con IntersectionObserver per animazioni
4. **HeroSection.tsx** — Hero con logo FORMA animato
5. **CatalogSection.tsx** — Grid template con sfondo Seurat
6. **GuideSection.tsx** — 3 step process con sfondo Monet
7. **StudioSection.tsx** — AI generation UI con sfondo Kandinsky
8. **AccountSection.tsx** — Login/signup con sfondo Van Gogh

### Server Components (no hooks)
9. **FormaLogo.tsx** — 3 varianti logo (Animated, Static, Icon)

---

## 🎨 Design System

**Colori:**
- `--accent`: #D4AF37 (oro)
- `--bg`: #060606 (nero profondo)
- `--surface`: #0f0f0f (grigio scuro)
- `--text`: #eaeaea (bianco sporco)
- `--muted`: #8a8a8a (grigio medio)

**Font:**
- Montserrat (headings)
- Plus Jakarta Sans (body)
- Cormorant Garamond (hero headlines)
- Arial/Helvetica (logo FORMA)

**Animazioni:**
- Easing: `--ease-glide`, `--ease-snap`, `--ease-bounce`
- Keyframes: `forma-fade-in`, `forma-fade-up`, `shimmer`
- Trigger: IntersectionObserver con threshold 15%

---

## 🤖 Agenti AI Inclusi

Gli 8 agenti specializzati nella directory `.claude/agents/`:

1. **senior-web-perfectionist** — Code review, architettura, debugging
2. **senior-animation-expert** — Animazioni, motion design
3. **template-sales-specialist** — Creazione listing marketplace
4. **bundle-specialist** — Gestione bundle prodotti
5. **etsy-gumroad-sales-expert** — SEO e vendite marketplace
6. **fullstack-web-expert** — Full-stack development
7. **notion-template-specialist** — Template Notion
8. **senior-seo-specialist** — SEO e ottimizzazione

---

## 🔧 Troubleshooting

### "window is not defined"
Aggiungi guard nei componenti client:
```tsx
if (typeof window === "undefined") return null;
```

### Snap-scroll non funziona
Verifica in `globals.css`:
```css
html, body {
  overflow: visible; /* NON hidden */
}
```

### Animazioni non partono
Verifica ordine import in `layout.tsx` — `animations.css` deve essere DOPO Tailwind.

---

## 📖 Documentazione Completa

Leggi `INTEGRATION_INSTRUCTIONS.md` per:
- Guida step-by-step dettagliata
- Configurazione Tailwind
- Deploy su Vercel
- Testing checklist
- Troubleshooting avanzato

---

## 🎯 Risultato Finale

Una volta completata l'integrazione avrai:
- ✅ Snap-scroll full-screen (5 sezioni)
- ✅ Animazioni entrance con IntersectionObserver
- ✅ Custom cursor con particle trail (desktop)
- ✅ Logo FORMA auto-disegnato
- ✅ Dipinti famosi come sfondi sezioni
- ✅ Design system oro/dark completo
- ✅ 8 agenti AI per sviluppo futuro

---

**Pronto per il deploy su Vercel!** 🚀

Per domande o supporto, consulta:
- `INTEGRATION_INSTRUCTIONS.md` (guida dettagliata)
- `CLAUDE.md` (architettura progetto originale)
- `MIGRATION_GUIDE.md` (note tecniche migrazione)

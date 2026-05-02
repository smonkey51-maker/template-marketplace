# 🚀 Quick Start — FORMA Marketplace

Questa directory contiene **tutto il codice pronto** per integrare FORMA nel tuo progetto Next.js Vercel in 3 modi.

---

## 📦 Contenuto Pacchetto (21 file)

```
nextjs-ready/
├── .claude/agents/          # 8 agenti AI (bundle, seo, web, animation, etc.)
├── .env.local.example       # Variabili ambiente (FORMA branding)
├── components/              # 9 componenti React (tutti con "use client" dove serve)
├── app/page.tsx            # Main page con snap-scroll (Server Component)
├── deploy-to-vercel.sh     # Script automatico (OPZIONE 1)
├── README.md               # Guida completa
├── INTEGRATION_INSTRUCTIONS.md  # Guida dettagliata step-by-step (OPZIONE 2)
└── QUICK_START.md          # Questo file
```

---

## ⚡ 3 Modi per Integrare

### OPZIONE 1: Script Automatico (Più Veloce)

```bash
cd /workspaces/default/code/nextjs-ready

# Esegui lo script indicando il percorso del tuo repo Vercel
./deploy-to-vercel.sh /path/to/template-marketplace

# Lo script:
# ✅ Copia tutti i file nel posto giusto
# ✅ Crea backup automatico (opzionale)
# ✅ Ti chiede conferma prima di sovrascrivere
# ✅ Ti mostra i prossimi passi
```

### OPZIONE 2: Copia Manuale (Più Controllo)

```bash
cd /path/to/template-marketplace

# Copia agenti AI
cp -r /workspaces/default/code/nextjs-ready/.claude .

# Copia env example
cp /workspaces/default/code/nextjs-ready/.env.local.example .

# Copia componenti
cp -r /workspaces/default/code/nextjs-ready/components/* components/

# Copia page
cp /workspaces/default/code/nextjs-ready/app/page.tsx app/page.tsx
```

Poi segui `INTEGRATION_INSTRUCTIONS.md` per CSS e layout.

### OPZIONE 3: Solo Componenti (Integrazione Graduale)

Copia solo i componenti che ti servono:

```bash
# Esempio: solo Hero e Custom Cursor
cp /workspaces/default/code/nextjs-ready/components/HeroSection.tsx components/
cp /workspaces/default/code/nextjs-ready/components/CustomCursor.tsx components/
cp /workspaces/default/code/nextjs-ready/components/FormaLogo.tsx components/
```

---

## ✅ Dopo la Copia

**Indipendentemente dal metodo scelto, devi:**

### 1. Copiare i CSS

```bash
cd /path/to/template-marketplace
mkdir -p app/styles

cp /workspaces/default/code/src/styles/animations.css app/styles/
cp /workspaces/default/code/src/styles/theme.css app/styles/
cp /workspaces/default/code/src/styles/fonts.css app/styles/
```

### 2. Importare CSS in `app/layout.tsx`

Aggiungi in cima al file (dopo `import './globals.css'`):

```tsx
import './styles/fonts.css';
import './styles/theme.css';
import './styles/animations.css';
```

### 3. Test Locale

```bash
npm run dev
```

Apri http://localhost:3000 e verifica:
- ✅ Scroll-snap funziona (scorri verticalmente tra sezioni)
- ✅ Animazioni partono quando entri nelle sezioni
- ✅ Custom cursor su desktop (hidden su mobile)
- ✅ Logo FORMA si auto-disegna nella Hero
- ✅ Dipinti di sfondo visibili

### 4. Deploy su Vercel

```bash
git add .
git commit -m "feat: integrate FORMA snap-scroll design"
git push origin main
```

Vercel deploierà automaticamente.

---

## 📋 Componenti Pronti

Tutti con **"use client"** dove serve e **import `@/components/...`**:

| Componente | Uso | Client/Server |
|---|---|---|
| `CustomCursor.tsx` | Cursor animato particle trail | Client |
| `ScrollIndicator.tsx` | Navigation dots laterali | Client |
| `ArtSection.tsx` | Wrapper con IntersectionObserver | Client |
| `HeroSection.tsx` | Hero con logo FORMA animato | Client |
| `CatalogSection.tsx` | Grid template (sfondo Seurat) | Client |
| `GuideSection.tsx` | 3 step process (sfondo Monet) | Client |
| `StudioSection.tsx` | AI generation UI (Kandinsky) | Client |
| `AccountSection.tsx` | Login/signup (Van Gogh) | Client |
| `FormaLogo.tsx` | 3 varianti logo (Animated, Static, Icon) | Server |

---

## 🤖 Agenti AI Inclusi

Gli 8 agenti nella directory `.claude/agents/`:

1. **senior-web-perfectionist** — Code review, debugging, architettura
2. **senior-animation-expert** — Animazioni, motion design
3. **template-sales-specialist** — Creazione listing marketplace
4. **bundle-specialist** — Gestione bundle prodotti
5. **etsy-gumroad-sales-expert** — SEO Etsy/Gumroad
6. **fullstack-web-expert** — Full-stack development
7. **notion-template-specialist** — Template Notion
8. **senior-seo-specialist** — SEO tecnico

---

## 🎯 Risultato Finale

Dopo l'integrazione avrai:
- ✅ 5 sezioni full-screen con snap-scroll
- ✅ Animazioni entrance con IntersectionObserver
- ✅ Custom cursor con particle trail (desktop-only)
- ✅ Logo FORMA auto-disegnato (SVG animate)
- ✅ Dipinti famosi come sfondi (Seurat, Monet, Kandinsky, Van Gogh)
- ✅ Design system oro/dark (#D4AF37)
- ✅ 8 agenti AI per sviluppo futuro
- ✅ Mobile-safe (100svh viewport height)

---

## 🛠️ Troubleshooting Rapido

### "window is not defined"
Aggiungi guard nei componenti client:
```tsx
if (typeof window === "undefined") return null;
```

### Snap-scroll non funziona
In `globals.css` assicurati:
```css
html, body { overflow: visible; }
```

### Animazioni non partono
Verifica ordine import CSS in `layout.tsx` — `animations.css` DOPO Tailwind.

---

## 📖 Documentazione Completa

- **README.md** — Panoramica pacchetto e design system
- **INTEGRATION_INSTRUCTIONS.md** — Guida step-by-step dettagliata
- **QUICK_START.md** — Questo file (guida rapida)

---

**Scegli l'opzione che preferisci e inizia!** 🚀

Per supporto leggi `INTEGRATION_INSTRUCTIONS.md` o `README.md`.

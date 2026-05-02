#!/bin/bash

# FORMA Marketplace — Script Integrazione Automatica
# Questo script copia tutti i file necessari nel tuo repository Next.js Vercel

set -e

# Colori per output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  FORMA → Next.js Vercel Integration  ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""

# Verifica che il parametro sia stato passato
if [ -z "$1" ]; then
  echo -e "${RED}❌ Errore: Specifica il percorso del repository Vercel${NC}"
  echo ""
  echo "Uso:"
  echo "  ./deploy-to-vercel.sh /path/to/template-marketplace"
  echo ""
  echo "Esempio:"
  echo "  ./deploy-to-vercel.sh ~/projects/template-marketplace"
  exit 1
fi

TARGET_REPO="$1"

# Verifica che la directory esista
if [ ! -d "$TARGET_REPO" ]; then
  echo -e "${RED}❌ Errore: Directory non trovata: $TARGET_REPO${NC}"
  exit 1
fi

# Verifica che sia un progetto Next.js
if [ ! -f "$TARGET_REPO/next.config.ts" ] && [ ! -f "$TARGET_REPO/next.config.js" ]; then
  echo -e "${YELLOW}⚠️  Warning: Non sembra un progetto Next.js (next.config non trovato)${NC}"
  read -p "Continuare comunque? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

echo -e "${YELLOW}📂 Repository target: $TARGET_REPO${NC}"
echo ""

# Backup opzionale
read -p "Creare backup dei file esistenti? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  BACKUP_DIR="$TARGET_REPO/.backup-$(date +%Y%m%d-%H%M%S)"
  echo -e "${YELLOW}📦 Creazione backup in: $BACKUP_DIR${NC}"
  mkdir -p "$BACKUP_DIR"

  if [ -d "$TARGET_REPO/components" ]; then
    cp -r "$TARGET_REPO/components" "$BACKUP_DIR/"
  fi

  if [ -f "$TARGET_REPO/app/page.tsx" ]; then
    cp "$TARGET_REPO/app/page.tsx" "$BACKUP_DIR/"
  fi

  echo -e "${GREEN}✅ Backup creato${NC}"
  echo ""
fi

# Copia .claude/agents
echo -e "${YELLOW}📋 Copia agenti AI...${NC}"
mkdir -p "$TARGET_REPO/.claude/agents"
cp -r .claude/agents/* "$TARGET_REPO/.claude/agents/"
echo -e "${GREEN}✅ 8 agenti AI copiati${NC}"

# Copia .env.local.example
echo -e "${YELLOW}📋 Copia .env.local.example...${NC}"
if [ -f "$TARGET_REPO/.env.local.example" ]; then
  echo -e "${YELLOW}⚠️  File .env.local.example già esistente${NC}"
  read -p "Sovrascrivere? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    cp .env.local.example "$TARGET_REPO/"
    echo -e "${GREEN}✅ .env.local.example sovrascritto${NC}"
  else
    echo -e "${YELLOW}⏭️  Saltato${NC}"
  fi
else
  cp .env.local.example "$TARGET_REPO/"
  echo -e "${GREEN}✅ .env.local.example copiato${NC}"
fi

# Copia componenti
echo -e "${YELLOW}📋 Copia componenti React...${NC}"
mkdir -p "$TARGET_REPO/components"
cp components/*.tsx "$TARGET_REPO/components/"
echo -e "${GREEN}✅ 9 componenti copiati${NC}"

# Copia app/page.tsx
echo -e "${YELLOW}📋 Copia app/page.tsx...${NC}"
if [ -f "$TARGET_REPO/app/page.tsx" ]; then
  echo -e "${YELLOW}⚠️  File app/page.tsx già esistente${NC}"
  read -p "Sovrascrivere? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    cp app/page.tsx "$TARGET_REPO/app/"
    echo -e "${GREEN}✅ app/page.tsx sovrascritto${NC}"
  else
    echo -e "${YELLOW}⏭️  Saltato${NC}"
  fi
else
  cp app/page.tsx "$TARGET_REPO/app/"
  echo -e "${GREEN}✅ app/page.tsx copiato${NC}"
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║           ✅ Copia Completata!        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""

echo -e "${YELLOW}📋 Prossimi Passi:${NC}"
echo ""
echo "1. Copia i file CSS:"
echo -e "   ${GREEN}cp /workspaces/default/code/src/styles/*.css $TARGET_REPO/app/styles/${NC}"
echo ""
echo "2. Importa CSS in app/layout.tsx:"
echo "   import './styles/fonts.css';"
echo "   import './styles/theme.css';"
echo "   import './styles/animations.css';"
echo ""
echo "3. Test locale:"
echo -e "   ${GREEN}cd $TARGET_REPO && npm run dev${NC}"
echo ""
echo "4. Deploy su Vercel:"
echo -e "   ${GREEN}git add . && git commit -m \"feat: integrate FORMA design\" && git push${NC}"
echo ""
echo -e "${YELLOW}📖 Leggi INTEGRATION_INSTRUCTIONS.md per dettagli completi${NC}"
echo ""

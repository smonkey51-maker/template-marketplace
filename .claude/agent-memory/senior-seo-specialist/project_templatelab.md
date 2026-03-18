---
name: TemplateLab project context
description: Core details about the TemplateLab Next.js 15 marketplace project — site URL, CMS, tech stack, pages, and known SEO state
type: project
---

TemplateLab is a bilingual (IT/EN) Next.js 15 template marketplace at https://templatelab.io. It sells UI templates (HTML/Tailwind) and AI prompt templates, with Claude AI customization via an "AI Studio."

Tech stack: Next.js 15 App Router, TypeScript, Tailwind CSS, Clerk (auth), Stripe (payments), Claude AI API.

Key pages: / (homepage), /preview/[templateId] (dynamic), /studio, /guide, /account, /privacy, /terms, /success.

Templates are defined statically in lib/templates.ts (~27 templates as of March 2026). Italian translations live in lib/i18n.ts (templateTranslations map).

**Why:** Initial SEO audit was requested on 2026-03-18. No changes made yet — audit only.

**How to apply:** Use this context to give targeted file-level recommendations without re-reading the entire codebase.

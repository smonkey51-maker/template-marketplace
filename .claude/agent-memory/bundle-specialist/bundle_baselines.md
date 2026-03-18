---
name: bundle_baselines
description: Build output size baselines and known bundle issues recorded 2026-03-18
type: project
---

Baseline recorded: 2026-03-18 (before any optimizations applied).

**Build directory sizes:**
- `.next/` total: 195 MB
- `.next/static/`: 1.5 MB
- `.next/server/`: 24 MB
- Note: 195 MB total is abnormally large — likely dominated by node_modules cached by Next.js or the tsconfig.tsbuildinfo (1.26 MB)

**lib/templates.ts raw size:** 190 KB / 3005 lines

**Known issues identified:**
- next.config.ts is empty — no compiler optimizations, no image config, no headers, no bundle analyzer
- templates.ts is imported by HomeContent (client), TemplateGrid (client), PreviewContent (client), studio/page (client), and multiple API routes — entire 190 KB payload lands in the client bundle
- Tailwind content scan includes lib/**/*.ts — scans 190 KB of HTML string literals at build time
- ES2017 target in tsconfig may be preventing optimal output for modern browsers
- app/page.tsx renders a "use client" component directly — no RSC benefit on home page
- @stripe/stripe-js is in dependencies (not lazy-loaded) — adds ~300 KB to client bundle
- legacy-peer-deps=true in .npmrc signals dependency conflicts

**Why:** First analysis pass; no optimizations have been applied yet.
**How to apply:** Use these as the before-state when measuring improvement after any optimization work.

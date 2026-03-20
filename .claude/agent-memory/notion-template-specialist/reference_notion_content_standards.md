---
name: Notion Template Content Standards
description: Established content quality standards and patterns for the 8 core Notion templates in the marketplace
type: reference
---

## Content Standards for Notion Templates in lib/templates.ts

### Location
All 8 Notion templates are in `C:\Users\nicol\template-marketplace\lib\templates.ts`

### Template IDs and line numbers (approximate, will shift as file grows)
- `notion-project-hub` — 4-database system (Projects, Tasks, Milestones, Meetings)
- `notion-freelancer-crm` — 7-database CRM (Clients, Projects, Time Log, Invoices, Services, Leads, with Lead Score formula)
- `notion-content-calendar` — 3-database system (Content, Content Pillars, Analytics Mensili) with Engagement Rate % formula
- `notion-finance-tracker` — 5-database system (Transactions, Budgets, Savings Goals, Investments, Subscriptions)
- `notion-second-brain` — 8-database PARA system (Notes, Projects, Areas, Resources, Book Tracker, Habit Tracker, Daily Journal, Contacts)
- `notion-job-tracker` — 3-database system (Applications with 15+ properties, Interviews, Offers Comparison) + 5 email templates
- `notion-weekly-review` — 3-database system (Weekly Reviews, Annual Goals, Quarterly Reviews) + full templates
- `notion-client-portal` — 4-database portal (Milestones, Deliverables, Communication Log, Documents) + onboarding checklist

### Content quality standard established
Each content field is written in Italian (instructions, section headers, explanations) with English Notion terminology (database names, property names, view names, formula syntax). Content is 800-1200+ words per template.

### Structure every template follows
1. Intro paragraph (Italian, explains the system and its value)
2. DATABASE sections with full property schemas (name, type, options)
3. Views per database (name, type, filter/sort config)
4. Formulas in correct Notion 2.0 syntax (code blocks)
5. Dashboard/Home page layout
6. Quick Start steps (numbered, actionable)
7. Pro Tips (5 tips, practical and specific)
8. Bonus features / workflow sections where applicable

### Key formula patterns used across templates
- Days Remaining: `if(empty(prop("Due Date")), "Nessuna scadenza", if(dateBetween(prop("Due Date"), now(), "days") < 0, "⛔ " + toText(abs(dateBetween(prop("Due Date"), now(), "days"))) + " giorni di ritardo", ...))`
- Progress %: `if(prop("Target") > 0, round(prop("Current") / prop("Target") * 100), 0)`
- Engagement Rate: `if(prop("Reach") > 0, round(prop("Engagement") / prop("Reach") * 100 * 10) / 10, 0)`
- Lead Score: multi-condition if() adding numeric scores per attribute
- Status labels with emojis combining multiple conditions

### TypeScript syntax note
Content fields use backtick template literals. Inner backtick code blocks must use \\\` escape. All formulas are in \\`\\`\\` code blocks (triple backtick — safe, no escaping needed inside those).

-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: templates + bundles tables
-- Created: 2026-04-01
-- Source of truth moves from lib/templates.ts to Supabase.
-- Run scripts/seed-templates.ts after applying this migration.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── templates ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS templates (
  id               text PRIMARY KEY,
  name             text NOT NULL,
  description      text NOT NULL DEFAULT '',
  category         text NOT NULL DEFAULT 'ui',
  price            integer NOT NULL DEFAULT 0,       -- in cents
  stripe_price_id  text NOT NULL DEFAULT '',
  tags             text[] NOT NULL DEFAULT '{}',
  downloads        integer NOT NULL DEFAULT 0,
  content          text NOT NULL DEFAULT '',          -- raw HTML or prompt text
  download_type    text,                              -- null = default 'html'
  download_url     text,                              -- required for external types
  video_url        text,
  editors_pick     boolean NOT NULL DEFAULT false,
  is_new           boolean NOT NULL DEFAULT false,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

-- Indexes for common filter patterns
CREATE INDEX IF NOT EXISTS templates_category_idx ON templates (category);
CREATE INDEX IF NOT EXISTS templates_price_idx ON templates (price);
CREATE INDEX IF NOT EXISTS templates_tags_idx ON templates USING GIN (tags);
CREATE INDEX IF NOT EXISTS templates_editors_pick_idx ON templates (editors_pick) WHERE editors_pick = true;
CREATE INDEX IF NOT EXISTS templates_is_new_idx ON templates (is_new) WHERE is_new = true;

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_templates_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER templates_updated_at_trigger
  BEFORE UPDATE ON templates
  FOR EACH ROW EXECUTE FUNCTION update_templates_updated_at();

-- RLS: public read, service role write
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "templates_select_all" ON templates
  FOR SELECT USING (true);

CREATE POLICY "templates_service_role_write" ON templates
  FOR ALL USING (true) WITH CHECK (true);


-- ── bundles ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bundles (
  id              text PRIMARY KEY,
  name            text NOT NULL,
  tagline         text NOT NULL DEFAULT '',
  description     text NOT NULL DEFAULT '',
  price           integer NOT NULL DEFAULT 0,       -- in cents
  regular_price   integer NOT NULL DEFAULT 0,       -- original price before discount
  stripe_price_id text NOT NULL DEFAULT '',
  template_ids    text[] NOT NULL DEFAULT '{}',
  tags            text[] NOT NULL DEFAULT '{}',
  highlights      text[] NOT NULL DEFAULT '{}',
  emoji           text NOT NULL DEFAULT '',
  accent_color    text NOT NULL DEFAULT '',
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS bundles_tags_idx ON bundles USING GIN (tags);

CREATE OR REPLACE FUNCTION update_bundles_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER bundles_updated_at_trigger
  BEFORE UPDATE ON bundles
  FOR EACH ROW EXECUTE FUNCTION update_bundles_updated_at();

ALTER TABLE bundles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bundles_select_all" ON bundles
  FOR SELECT USING (true);

CREATE POLICY "bundles_service_role_write" ON bundles
  FOR ALL USING (true) WITH CHECK (true);

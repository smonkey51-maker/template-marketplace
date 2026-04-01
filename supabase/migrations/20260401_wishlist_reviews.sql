-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: wishlist + reviews tables
-- Created: 2026-04-01
-- ─────────────────────────────────────────────────────────────────────────────

-- ── wishlists ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wishlists (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     text NOT NULL,
  template_id text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT wishlists_user_template_unique UNIQUE (user_id, template_id)
);

CREATE INDEX IF NOT EXISTS wishlists_user_id_idx ON wishlists (user_id);
CREATE INDEX IF NOT EXISTS wishlists_template_id_idx ON wishlists (template_id);

-- RLS: users can only read/write their own wishlist rows
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "wishlists_select_own" ON wishlists
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "wishlists_insert_own" ON wishlists
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "wishlists_delete_own" ON wishlists
  FOR DELETE USING (auth.uid()::text = user_id);

-- Service role bypasses RLS — used by API routes with SUPABASE_SERVICE_ROLE_KEY
CREATE POLICY "wishlists_service_role_all" ON wishlists
  USING (true)
  WITH CHECK (true);


-- ── reviews ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     text NOT NULL,
  template_id text NOT NULL,
  rating      integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment     text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT reviews_user_template_unique UNIQUE (user_id, template_id)
);

CREATE INDEX IF NOT EXISTS reviews_template_id_idx ON reviews (template_id);
CREATE INDEX IF NOT EXISTS reviews_user_id_idx ON reviews (user_id);

-- Auto-update updated_at on upsert
CREATE OR REPLACE FUNCTION update_reviews_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER reviews_updated_at_trigger
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_reviews_updated_at();

-- RLS: anyone can read reviews, only owner can insert/update
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reviews_select_all" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "reviews_insert_own" ON reviews
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "reviews_update_own" ON reviews
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "reviews_delete_own" ON reviews
  FOR DELETE USING (auth.uid()::text = user_id);

-- Service role bypasses RLS
CREATE POLICY "reviews_service_role_all" ON reviews
  USING (true)
  WITH CHECK (true);

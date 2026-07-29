-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: make purchase writes idempotent
-- Created: 2026-07-29
--
-- Stripe retries webhook deliveries until it gets a 2xx, and a slow response or
-- a transient error means the same `checkout.session.completed` event can land
-- more than once. Without a unique key each redelivery inserted a duplicate
-- purchase row, which also broke the `.single()` purchase lookup in the reviews
-- endpoint (Postgres errors on multiple rows), locking genuine buyers out of
-- reviewing what they had bought.
--
-- The webhook now upserts on (user_id, template_id) with ignoreDuplicates, so
-- this index is what makes the retry a no-op.
-- ─────────────────────────────────────────────────────────────────────────────

-- Collapse any duplicates that already accumulated, keeping the earliest row.
DELETE FROM purchases a
USING purchases b
WHERE a.ctid > b.ctid
  AND a.user_id = b.user_id
  AND a.template_id = b.template_id;

CREATE UNIQUE INDEX IF NOT EXISTS purchases_user_template_unique
  ON purchases (user_id, template_id);

-- Session lookups: /api/download-session and support debugging both filter by it
CREATE INDEX IF NOT EXISTS purchases_stripe_session_idx
  ON purchases (stripe_session_id);

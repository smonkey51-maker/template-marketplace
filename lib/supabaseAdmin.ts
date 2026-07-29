import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service-role key.
 *
 * ⚠️ Never import this from a client component — the service-role key
 * bypasses RLS and must never reach the browser.
 *
 * A fresh client per call, deliberately: `createClient` only assembles a small
 * config object (no connection is opened until a query runs), and a
 * process-wide singleton would leak state between requests and between tests.
 * The value here is having one place that reads and validates the credentials.
 */
export function supabaseAdmin(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

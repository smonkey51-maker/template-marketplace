-- User brand preferences per AI memory
-- Persiste le preferenze di brand rilevate durante le sessioni AI

create table if not exists user_preferences (
  user_id       text primary key,                    -- Clerk user ID
  brand_tone    text,                                -- es. "professionale", "creativo", "minimale"
  preferred_style text,                              -- es. "dark", "light", "colorful", "minimal"
  color_notes   text,                                -- es. "usa oro e terra, evita blu"
  extra_context text,                                -- contesto libero aggiunto dall'utente
  updated_at    timestamptz not null default now()
);

-- RLS: ogni utente vede e modifica solo i propri
alter table user_preferences enable row level security;

create policy "users can read own preferences"
  on user_preferences for select
  using (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

create policy "users can upsert own preferences"
  on user_preferences for all
  using (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

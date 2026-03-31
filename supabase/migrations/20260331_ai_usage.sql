-- AI usage tracking per user
-- Traccia ogni chiamata AI con token e costo per gestire limiti e billing

create table if not exists ai_usage (
  id          uuid primary key default gen_random_uuid(),
  user_id     text not null,                          -- Clerk user ID
  feature     text not null check (feature in ('generate', 'customize')),
  model       text not null,
  input_tokens  integer not null default 0,
  output_tokens integer not null default 0,
  cost_usd    numeric(10, 6) not null default 0,
  template_id text,                                   -- opzionale: template di riferimento
  created_at  timestamptz not null default now()
);

create index ai_usage_user_id_idx on ai_usage (user_id);
create index ai_usage_created_at_idx on ai_usage (created_at);

-- Vista aggregata per dashboard: costo totale per utente nell'ultimo mese
create or replace view ai_usage_monthly as
select
  user_id,
  feature,
  count(*)            as calls,
  sum(input_tokens)   as total_input_tokens,
  sum(output_tokens)  as total_output_tokens,
  sum(cost_usd)       as total_cost_usd
from ai_usage
where created_at >= date_trunc('month', now())
group by user_id, feature;

-- RLS: ogni utente vede solo i propri dati
alter table ai_usage enable row level security;

create policy "users can read own usage"
  on ai_usage for select
  using (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Il service role può inserire senza RLS (chiamato dal backend Next.js)

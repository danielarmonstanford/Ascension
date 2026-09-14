create extension if not exists pgcrypto;

create table if not exists public.attendee_profiles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now()
);

alter table public.attendee_profiles
  add column if not exists name text,
  add column if not exists email text,
  add column if not exists consent boolean,
  add column if not exists acknowledgement boolean,
  add column if not exists answers jsonb not null default '{}'::jsonb,
  add column if not exists primary_pathway text,
  add column if not exists supporting_pathways text[] not null default '{}',
  add column if not exists source text,
  add column if not exists attribution jsonb not null default '{}'::jsonb,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_content text,
  add column if not exists referral_code text,
  add column if not exists preferred_destinations text[] not null default '{}',
  add column if not exists lead_route text,
  add column if not exists rate_limit_key text;

alter table public.attendee_profiles enable row level security;

comment on table public.attendee_profiles is
  'Private ASCENSION Body & Senses profiles. Server-only writes; no browser RLS policies.';

create index if not exists attendee_profiles_created_at_idx
  on public.attendee_profiles (created_at desc);

create index if not exists attendee_profiles_email_idx
  on public.attendee_profiles (lower(email));

create index if not exists attendee_profiles_rate_limit_idx
  on public.attendee_profiles (rate_limit_key, created_at desc);

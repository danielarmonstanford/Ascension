create extension if not exists pgcrypto;

create table if not exists public.partner_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 300),
  organization text not null check (char_length(organization) between 1 and 300),
  email text not null check (char_length(email) between 3 and 300),
  website text check (website is null or char_length(website) <= 300),
  category text not null check (char_length(category) between 1 and 300),
  interest text not null check (char_length(interest) between 1 and 300),
  message text not null check (char_length(message) between 1 and 2500),
  consent boolean not null check (consent = true),
  attribution jsonb not null default '{}'::jsonb,
  source_path text not null default '/partners'
);

alter table public.partner_inquiries enable row level security;

comment on table public.partner_inquiries is
  'Server-only ASCENSION partnership inquiries. No anonymous or authenticated browser policies are defined.';

create index if not exists partner_inquiries_created_at_idx
  on public.partner_inquiries (created_at desc);

create index if not exists partner_inquiries_email_idx
  on public.partner_inquiries (lower(email));

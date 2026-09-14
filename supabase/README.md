# ASCENSION Supabase connection

The partnership form writes through the server-only route at `/api/partners`.
Browser code must never receive the Supabase secret key.

## One-time database setup

1. Open the connected Supabase project.
2. Open **SQL Editor** and create a new query.
3. Paste and run `supabase/migrations/202609130001_create_partner_inquiries.sql`.
4. Paste and run `supabase/migrations/202609130002_create_attendee_profiles.sql`.
5. In **Table Editor**, confirm that `public.partner_inquiries` and `public.attendee_profiles` exist and have Row Level Security enabled.

No public RLS policy is intentionally created. Inserts are made only by the Next.js
server route using `SUPABASE_SECRET_KEY`.

## Required Vercel variables

Configure these for Production and Preview where submissions should be stored:

- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`

Optional:

- `ASCENSION_PARTNER_WEBHOOK_URL` — sends a secondary CRM notification after the
  database insert succeeds. The database remains the system of record.

After changing environment variables, redeploy the application. Never prefix the
secret key with `NEXT_PUBLIC_` and never commit it to Git.

The values must contain the actual Supabase project URL and secret key. Creating
environment-variable names with empty values does not connect the database.

## Verification

Submit one clearly labelled QA inquiry through `/partners`, confirm the success
state, and verify the row in Supabase Table Editor. Then delete only that labelled
QA row from the dashboard.

For the attendee questionnaire, submit one clearly labelled QA response through
`/profile` and confirm it appears in `public.attendee_profiles` with its primary
pathway, supporting pathways, lead route, consent and attribution fields.

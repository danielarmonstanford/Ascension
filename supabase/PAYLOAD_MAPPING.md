# Live Supabase payload mapping

Verified against the production OpenAPI schema on 2026-09-14. This is the
compatibility contract used by the server routes; browser code never receives
the Supabase secret.

## `public.partner_inquiries`

| Form payload | Live column | Treatment |
| --- | --- | --- |
| `name` | `name` | Direct |
| `organization` | `organization` | Direct |
| `email` | `email` | Direct |
| `website` | `website` | Direct; empty values become `null` |
| `category` | `partnership_category` | Explicit semantic mapping |
| `interest` | `interest` | Direct |
| `message` | `message` | Direct |
| consent checkbox | `consent` | Direct, server-asserted `true` |
| submission time | `consent_recorded_at` | Server-generated timestamp |
| current page path | `source_path` | Server-validated path |
| current page URL + campaign parameters | `source_url` | Server-normalized full URL |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` | matching `utm_*` columns | Flattened attribution |
| `ref` | `source_url` query string | Retained without a duplicate column |

The table has no `attribution` JSON column, so the route deliberately does not
send one. No form data is discarded. `id`, `created_at`, `status`,
`internal_notes` and `next_follow_up_at` are not accepted from a visitor and
remain database/workflow-owned.

## `public.attendee_profiles`

| Questionnaire payload | Live column | Treatment |
| --- | --- | --- |
| first name | `first_name` | Direct |
| email | `email` | Direct |
| privacy consent | `privacy_consent` | Direct, server-asserted `true` |
| non-diagnostic acknowledgement | `questionnaire_answers.acknowledgement` | Stored with the source answers |
| answers | `questionnaire_answers` | Complete structured payload |
| primary / second pathway | `primary_pathway` / `secondary_pathway` | Direct; third supporting pathway remains in `questionnaire_answers` |
| body, movement, travel and stay choices | matching live columns | Flattened where a dedicated live column exists; full source answers remain in `questionnaire_answers` |
| UTM values | matching `utm_*` columns | Flattened attribution |
| `ref` | `questionnaire_answers.referral_code` and `source_url` | Retained |
| lead routing | `recommended_route` | `da-nang-cohort` or `future-city-waitlist` |

`id`, `created_at`, `lead_status`, `lead_score`, `internal notes`, booklet
delivery fields and follow-up fields remain server/database/workflow-owned.

## Additive migrations

No partner-table migration is necessary: every required partnership value has a
compatible existing column. The profile route rate-limits against the existing
`email` and `created_at` columns, so no rate-limit column is required either.

If a separate immutable referral field is later required for reporting, use this
safe optional addition; do not rename or remove any existing column:

```sql
alter table public.partner_inquiries
  add column if not exists referral_code text;
```

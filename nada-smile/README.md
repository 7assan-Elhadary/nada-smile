# Nada Smile — Dental Clinic

Production-minded Next.js application based on the supplied Antigravity prompt and bundle.

## Included
- Responsive public website
- English + Arabic language switcher with RTL/LTR document direction
- Required service, about, technology, contact, FAQ and booking pages
- Neon PostgreSQL-backed appointment requests with `PENDING` semantics
- Server-side Zod validation
- Resend notification architecture
- Protected cookie-based admin dashboard
- Admin confirm/cancel/note/search/filter workflows
- SEO metadata, sitemap and robots
- Supplied Nada Smile logo assets

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in the Neon, Resend and admin values.
3. Run `database/neon-schema.sql` in the Neon SQL Editor.
4. Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and a random `ADMIN_SESSION_SECRET` (at least 32 characters).
5. `npm run dev` for local development.
6. Before deployment: `npm run lint` and `npm run build`.

Never commit `.env.local` or any secret keys to GitHub.

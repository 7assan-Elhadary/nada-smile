# Nada Smile — PROJECT SPEC

## Goal

Build a polished, production-minded dental clinic website for Nada Smile.

The site must feel like a real clinic website rather than an AI-generated template. It should have a functioning appointment-request workflow, server-side validation, persistent storage, email notification architecture, and a simple protected admin dashboard.

## Recommended stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Neon PostgreSQL for appointment storage
- Secure server-side HTTP-only cookie session for admin authentication
- Resend for transactional email
- Zod for server-side validation
- React Hook Form for client-side form UX
- Vercel-compatible deployment

If the environment already has an established equivalent stack, preserve it unless it conflicts with these requirements.

## Important: WhatsApp

Do **not** implement WhatsApp API integration now.
The phone number is still displayed prominently as a normal contact option.

Phone:
`01552708582`

Clickable:
`tel:+201552708582`

## Contact email

`dr.nada2005@gmail.com`

This email is the clinic notification destination.

## Environment variables

Never hard-code secrets.

Suggested `.env.local`:

DATABASE_URL=
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
RESEND_API_KEY=
CLINIC_EMAIL=dr.nada2005@gmail.com
NEXT_PUBLIC_CLINIC_PHONE=01552708582
ADMIN_EMAIL=

`SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` must never be exposed to the browser.

## Appointment workflow

1. Visitor opens Booking page.
2. Visitor completes form.
3. Client-side validation provides immediate feedback.
4. Server validates again with Zod.
5. Server stores appointment as `PENDING`.
6. If email credentials are configured:
   - send notification email to `CLINIC_EMAIL`
   - optionally send confirmation/receipt email to patient's email if supplied
7. Show success state only after the database request succeeds.
8. The success state must clearly say this is a request, not a confirmed appointment.
9. If email delivery is unavailable but database storage succeeds, do not falsely claim that the email was sent. Log the email failure safely and still tell the visitor that the request was received.
10. Admin can later change status to `CONFIRMED` or `CANCELLED`.

## Appointment statuses

- PENDING
- CONFIRMED
- CANCELLED

## Suggested database schema

Table: `appointments`

Fields:
- id: uuid primary key
- created_at: timestamptz
- full_name: text
- phone: text
- email: text nullable
- preferred_date: date
- preferred_time: text
- service: text
- message: text nullable
- status: text / enum
- admin_note: text nullable
- confirmed_at: timestamptz nullable
- cancelled_at: timestamptz nullable

Do not store unnecessary sensitive medical information.

## Admin dashboard

Route example:
`/admin`

Must be protected by authentication.

Dashboard features:
- appointment count by status
- list appointments
- filter by status
- search by name/phone/email
- view appointment details
- confirm
- cancel
- add/edit admin note
- show created date
- responsive layout

Do not expose the admin dashboard to unauthenticated users.

## Email behavior

### Clinic notification

Subject:
`New Nada Smile Appointment Request — {patientName}`

Include:
- patient name
- phone
- email if provided
- requested date
- requested time
- requested service
- message
- current status: PENDING
- link to admin dashboard if a secure deployment URL is available

### Patient confirmation email

Only send if patient email is supplied and email service is configured.

Subject:
`Nada Smile — Appointment Request Received`

Body should say:
- request was received
- requested date/time
- selected service
- clinic will review availability
- appointment is not confirmed yet
- clinic contact phone/email

## Security

- Server-side validation is mandatory.
- Sanitize/validate all user input.
- Add basic anti-spam protection/rate limiting where practical.
- Do not expose service-role keys.
- Use authenticated server-side admin actions.
- Use least-privilege database policies.
- Do not collect unnecessary medical history in the public booking form.
- Do not expose appointment data publicly.
- Do not put private credentials in Git.

## Pages

Required:
- `/`
- `/services`
- `/services/smile-design`
- `/services/orthodontics`
- `/services/restorative-dentistry`
- `/services/preventive-care`
- `/about`
- `/technology`
- `/contact`
- `/book`
- `/faq`
- `/admin`
- appropriate auth page(s)

## Design

Use the supplied brand assets and color system exactly as the visual starting point.

Design characteristics:
- clean medical
- premium but approachable
- modern and lightly high-tech
- calm
- spacious
- human

Avoid:
- generic AI landing-page look
- excessive gradients
- excessive glassmorphism
- neon UI
- huge animated backgrounds
- template-like card grids
- fake testimonials
- invented statistics
- invented doctor credentials
- invented clinic address/hours
- fake awards
- fake reviews
- fake before/after results

## Motion

Use subtle animation only:
- section reveal
- hover transitions
- button feedback
- page transitions where useful
- loading/success states

Respect `prefers-reduced-motion`.

## Responsive behavior

Mobile-first.
Test:
- 360px
- 390px
- 768px
- 1024px
- 1440px+

The booking form and navigation must be especially polished on mobile.

## Accessibility

- semantic HTML
- keyboard navigation
- visible focus states
- accessible labels
- proper error messages
- sufficient contrast
- reduced-motion support
- no color-only status communication

## Localization

Implement Arabic and English.

Requirements:
- language switcher
- Arabic RTL
- English LTR
- correct direction-aware spacing/icons
- translated navigation and key UI
- content comes from the CONTENT.md source of truth

Do not mechanically translate medical terminology if it makes the Arabic unnatural.

## SEO

Create:
- page metadata
- Open Graph metadata
- sitemap
- robots
- descriptive page titles
- appropriate canonical URL configuration

Do not invent a domain name. Use a configurable `NEXT_PUBLIC_SITE_URL`.

## Images

Use the supplied logo assets.

For clinical imagery:
- prefer high-quality, relevant imagery
- avoid excessive stock photos
- do not use identifiable patient photos unless supplied/authorized
- use placeholders where clinic-specific images are missing

## Error and empty states

Admin:
- loading state
- no appointments state
- error state
- success toast/message
- confirmation before destructive actions

Booking:
- validation state
- submitting state
- success state
- failure state

## Definition of done

The project is not considered complete until:
- all required pages exist
- navigation works
- Arabic/English direction works
- booking form validates on client and server
- appointment can be persisted
- admin can authenticate
- admin can view and update appointments
- email integration is wired behind environment variables
- no secrets are hard-coded
- responsive behavior is polished
- no placeholder/invented claims appear in production copy
- `npm run lint` and `npm run build` pass

# Nada Smile — Master Antigravity Build Prompt

You are building a real, production-minded dental clinic website for **Nada Smile Dental Clinic**.

Do not treat this as a generic landing-page generation task. Treat it as a complete web product with a polished public website, a working appointment-request backend, persistent storage, email notification architecture, and a protected admin dashboard.

The attached project bundle is the source of truth. Read these files BEFORE writing implementation code:

1. `README.md`
2. `brand/brand-guidelines.md`
3. `content/CONTENT.md`
4. `specs/PROJECT_SPEC.md`
5. `database/supabase-schema.sql`
6. `.env.example`

Use the supplied logo assets from `brand/assets/`.

---

## 1. BRAND

Brand:
**Nada Smile**

Descriptor:
**Dental Clinic**

Tagline:
**Your smile, our priority.**

Phone:
**01552708582**

Email:
**dr.nada2005@gmail.com**

The phone number must appear in the website UI as a direct contact option and should use:
`tel:+201552708582`

The email should use:
`mailto:dr.nada2005@gmail.com`

Use the exact brand palette in the bundle:

- Deep Navy: `#12343B`
- Medical Blue: `#176B87`
- Teal: `#2EC4B6`
- Soft Mint: `#DDF3EF`
- Background: `#F8FBFA`
- White: `#FFFFFF`
- Muted Text: `#536568`

Visual direction:
**Modern Medical + High-Tech Medical + Clean + Calm + Human**

The site should look custom-designed, not like an AI-generated template.

---

## 2. IMPORTANT CONTENT RULE

`content/CONTENT.md` is the content source of truth.

Do NOT invent:
- doctor credentials
- university names
- years of experience
- specialties
- awards
- certifications
- patient testimonials
- patient numbers
- success rates
- clinic address
- opening hours
- emergency-care availability
- equipment brands
- treatment guarantees
- medical claims
- before/after results
- social-media accounts

Where the content file contains `[TO BE PROVIDED]`, create a tasteful placeholder or omit that specific factual claim from the public-facing page.

Never fill missing facts with plausible-sounding AI content.

---

## 3. STACK

Prefer:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase PostgreSQL
- Supabase Auth
- Resend for transactional email
- Zod
- React Hook Form

The result should be deployable to Vercel or an equivalent Next.js host.

If an equivalent existing project setup is already present, adapt it rather than destroying it.

---

## 4. PUBLIC PAGES

Create and polish:

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

Every page needs:
- responsive navigation
- consistent header/footer
- SEO metadata
- correct language direction
- polished mobile layout
- accessible controls
- subtle motion

---

## 5. HOME PAGE EXPERIENCE

Build a strong hero with the supplied Nada Smile logo and this content:

Eyebrow:
`NADA SMILE DENTAL CLINIC`

Headline:
`Precision meets your smile.`

Arabic:
`دقة طبية. وابتسامة تشبهك.`

Supporting copy:
`Modern dental care designed around comfort, clarity, and your individual smile.`

Primary CTA:
`Book an Appointment`

Secondary CTA:
`Explore Services`

Then build:
- calm clinic introduction
- service preview
- modern technology/approach section
- appointment CTA
- contact strip
- polished footer

Do not make the hero excessively huge.
Do not use an enormous gradient background.
Do not use an animated 3D tooth.
Do not use a generic SaaS hero layout.

---

## 6. SERVICES

Use the service content from `CONTENT.md`.

Create dedicated pages for:
- Smile Design
- Orthodontics
- Restorative Dentistry
- Preventive Care

Each should feel like a real clinic service page, not a repeated card template.

Use relevant visual hierarchy:
- hero
- overview
- what the service involves
- considerations/process
- CTA
- related services

Do not invent treatment-specific medical claims.

---

## 7. ABOUT + TECHNOLOGY

About:
- clinic philosophy
- patient-centered experience
- Dr. Nada section
- tasteful placeholder if biography/photo is not provided

Technology:
- explain the role of modern dental technology
- emphasize clarity and thoughtful care
- never invent device names or brands

---

## 8. BOOKING SYSTEM

This is a core feature.

Create a polished booking page.

Form fields:

- Full name — required
- Phone number — required
- Email — optional
- Preferred date — required
- Preferred time — required
- Service — required
- Message/notes — optional
- Consent checkbox — required

Services:
- Smile Design
- Orthodontics
- Restorative Dentistry
- Preventive Care
- General Consultation
- Other

### Booking semantics

A submission is an **Appointment Request**, NOT an instant confirmed appointment.

Initial database status:
`PENDING`

The user must see:

`Your appointment request has been received. The clinic will review your request and contact you to confirm the appointment.`

Never tell the patient:
`Your appointment is confirmed`
unless an authenticated admin actually changes the status to `CONFIRMED`.

### Validation

Validate on:
1. client
2. server

Use Zod or equivalent.

Validate:
- name length
- phone format
- email format if supplied
- date
- time
- service
- message length
- consent

Prevent obviously invalid/past booking dates where appropriate.

---

## 9. BACKEND

Persist appointment requests in Supabase/PostgreSQL.

Use the schema in:
`database/supabase-schema.sql`

Appointment fields:

- id
- created_at
- full_name
- phone
- email
- preferred_date
- preferred_time
- service
- message
- status
- admin_note
- confirmed_at
- cancelled_at

Do not store unnecessary medical history.

Use server-side actions/API routes for mutations.

Never expose database service-role credentials to the client.

---

## 10. EMAIL

WhatsApp is NOT part of this version.

Email is the only automatic notification channel.

Clinic destination:
`dr.nada2005@gmail.com`

Use Resend or an equivalent transactional email provider.

Required environment variable:
`RESEND_API_KEY`

Clinic email:
`CLINIC_EMAIL=dr.nada2005@gmail.com`

### Clinic notification

Subject:
`New Nada Smile Appointment Request — {patientName}`

Include:
- patient name
- phone
- email
- preferred date
- preferred time
- service
- message
- status: PENDING

### Patient email

If the patient supplies an email, send:

Subject:
`Nada Smile — Appointment Request Received`

Explain:
- request was received
- requested date/time
- service
- clinic will review availability
- it is not confirmed yet
- clinic phone/email

### Critical behavior

If the Resend API key is not configured:
- appointment storage should still work if the database is configured
- do NOT pretend that an email was sent
- log the failure safely on the server
- show the user a truthful success state for request storage, not fake email delivery

Do not hard-code secrets.

---

## 11. ADMIN DASHBOARD

Create a protected:
`/admin`

Use Supabase Auth or an equivalent secure auth mechanism.

Unauthenticated users must not access appointment data.

Dashboard should include:

### Overview
- total requests
- pending
- confirmed
- cancelled

### Appointment list
Each row/card:
- patient name
- phone
- email
- service
- preferred date
- preferred time
- status
- created at

### Actions
- view details
- confirm
- cancel
- add/edit admin note
- filter by status
- search by name/phone/email

When confirming:
- status → `CONFIRMED`
- set `confirmed_at`

When cancelling:
- status → `CANCELLED`
- set `cancelled_at`

Do not delete appointment records by default.

Use a confirmation step before destructive/status-changing actions.

---

## 12. NAVIGATION

English:
- Home
- Services
- About
- Technology
- FAQ
- Contact
- Book an Appointment

Arabic:
- الرئيسية
- الخدمات
- عن العيادة
- التكنولوجيا
- الأسئلة الشائعة
- تواصل معنا
- احجز موعدًا

Add an English/Arabic language switcher.

Arabic must use RTL.
English must use LTR.

Do not merely flip the entire UI without checking:
- icon direction
- spacing
- form alignment
- navigation
- breadcrumbs
- cards
- dates/times

---

## 13. DESIGN SYSTEM

Use:
- generous whitespace
- calm medical surfaces
- subtle borders
- restrained shadows
- medium corner radius
- clear typography
- precise spacing
- elegant CTA buttons

Use:
- Inter for Latin
- IBM Plex Sans Arabic or Noto Sans Arabic for Arabic

Do not use:
- excessive glassmorphism
- neon
- loud gradients
- crypto/tech startup aesthetics
- giant floating blobs
- excessive pill-shaped components
- fake statistics
- fake testimonials
- fake reviews
- fake awards

High-tech should come from precision, typography, subtle lines, clean UI and restrained motion — not flashy effects.

---

## 14. LOGO

Use the supplied assets.

Primary:
`brand/assets/logo-primary.png`

Dark:
`brand/assets/logo-dark.png`

Icon:
`brand/assets/logo-icon.png`

Favicon:
`brand/assets/favicon.png`

Do not redraw the logo in CSS.
Do not distort it.
Do not apply random filters.
Do not change its colors.

The SVG files included in the bundle are embedded-raster wrappers, not true vector artwork. Prefer the PNGs unless an actual vector file is supplied later.

---

## 15. MOTION

Use subtle motion:
- fade/slide reveals
- button hover
- card hover
- form transitions
- success state
- navigation transitions

Keep motion short and refined.

Respect:
`prefers-reduced-motion`

No constant floating animations.
No distracting parallax.
No animated background noise.

---

## 16. RESPONSIVE

Mobile-first.

Explicitly test:
- 360px
- 390px
- 768px
- 1024px
- 1440px+

The booking form must be especially good on mobile.

Phone/email CTAs should be easy to tap.

---

## 17. ACCESSIBILITY

Implement:
- semantic HTML
- keyboard navigation
- visible focus states
- accessible labels
- correct input errors
- sufficient contrast
- screen-reader-friendly status messages
- reduced-motion support

Do not use color alone for appointment status.

---

## 18. SEO

Implement:
- page titles
- descriptions
- Open Graph metadata
- sitemap
- robots
- canonical URL support
- configurable `NEXT_PUBLIC_SITE_URL`

Do not invent a domain.

---

## 19. PRIVACY + DATA

Keep the public booking form minimal.

Do not ask for:
- detailed medical history
- diagnosis
- unnecessary personal information

Add a concise privacy/consent notice near the booking form.

Do not expose appointment records publicly.

Use proper RLS/database access controls.

---

## 20. IMAGE STRATEGY

Use the supplied logo.

For other images:
- use tasteful clinical/dental imagery only where it genuinely improves the page
- avoid excessive stock imagery
- avoid frightening procedures
- avoid identifiable patients unless assets are explicitly supplied
- use clean placeholders when clinic-specific photography is unavailable

Do not let imagery overpower the brand.

---

## 21. EMPTY / LOADING / ERROR STATES

Booking:
- idle
- validation errors
- submitting
- success
- failure

Admin:
- loading
- no appointments
- server error
- mutation success
- mutation failure

Make these states polished rather than browser-default.

---

## 22. CODE QUALITY

Use reusable components.

Suggested organization:
- `components/ui`
- `components/layout`
- `components/booking`
- `components/admin`
- `lib`
- `lib/validation`
- `lib/email`
- `app`

Keep server-only code separate from client components.

Use TypeScript types for database entities and form data.

Do not leave dead demo code.

Do not leave console logs containing patient data.

---

## 23. IMPLEMENTATION ORDER

Follow this order:

1. Inspect the repository and existing setup.
2. Read the supplied bundle files.
3. Establish design tokens and typography.
4. Build layout/header/footer.
5. Build home page.
6. Build service pages.
7. Build About/Technology/FAQ/Contact.
8. Build bilingual routing/state and RTL/LTR.
9. Build booking form.
10. Build server validation.
11. Build database persistence.
12. Build email integration.
13. Build admin auth.
14. Build admin dashboard.
15. Add SEO/accessibility.
16. Add responsive polish.
17. Run lint/typecheck/build.
18. Fix all errors.
19. Review every page visually for consistency.
20. Do not stop at a prototype.

---

## 24. FINAL QUALITY BAR

The final result should feel like a real, thoughtfully designed dental clinic website that could plausibly be shown to a client.

It must have:
- strong visual identity
- coherent brand system
- excellent responsive design
- real booking persistence
- real admin status management
- real email architecture behind environment variables
- Arabic + English
- RTL + LTR
- secure handling of secrets
- honest appointment semantics

Do not give me a static mockup.
Do not give me a prototype.
Build the complete application structure and implementation.

When something is missing from the clinic information, leave a clearly defined placeholder rather than inventing a fact.

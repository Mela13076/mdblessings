# MDBlessings — V1 Engineering Roadmap

**Status:** Proposed, ready to refine into GitHub issues  
**Version:** 1.0-draft  
**Last updated:** 2026-10-16  
**Capacity assumption:** ~2–4 hours/week; estimates are rough and not deadlines.

## Working agreement

- One small ticket at a time; target roughly 1–2 focused sessions per ticket.
- The developer proposes an approach before implementing it.
- Mentor reviews design/code, asks guiding questions, and offers progressive hints before complete solutions.
- Each ticket includes acceptance criteria, tests, and a short reflection.
- Prefer a working vertical slice over premature abstractions.
- Form provider and business-policy content remain **pending**; do not let them block unrelated tickets.

## Milestone 0 — Foundation and planning

### M0-01 — Confirm repository and tooling (1–2 h)
**Goal:** Create a clean Next.js/TypeScript/Tailwind project and GitHub repository.

**Acceptance criteria**
- App runs locally; initial build/lint scripts work.
- README explains project goal, prerequisites, setup, and scope.
- `.gitignore` protects secrets and build output.
- `AGENTS.md`, PRD, technical design, and roadmap are committed in a `docs/` folder (except root `AGENTS.md`).
- No Supabase/Prisma/auth packages added without an active requirement.

**Learning focus:** Tooling choices, package scripts, environment separation.

### M0-02 — Visual foundation (1–2 h)
**Goal:** Agree on core visual language and page wireframes.

**Acceptance criteria**
- Owner/developer approve logo, palette, typography, imagery direction, and responsive navigation concept.
- Design tokens and a small component inventory are documented.
- Mobile and desktop rough layouts exist for home, catalog, and product details.

**Dependency:** Owner review of branding.

### M0-03 — Content contracts and sample data (1–2 h)
**Goal:** Define product/category/image types and 2–3 representative sample records.

**Acceptance criteria**
- Data model supports multiple photos per product, starting prices, category, stable ID/slug, and publish state.
- Sample data is separate from JSX.
- Document decisions on missing prices, empty categories, and image alt text.

**Learning focus:** Domain modeling, TypeScript types, separation of concerns.

## Milestone 1 — Site foundation

### M1-01 — Responsive shell (2–3 h)
- Build semantic header, navigation, footer, and main layout.
- Keyboard navigation, focus visibility, and mobile menu behavior pass manual review.
- Primary inquiry CTA exists as a placeholder route/link without inventing a provider.

### M1-02 — Home page (2–4 h)
- Hero with brand identity and CTA, featured products preview, story teaser, social links.
- Responsive layouts and image treatment.
- No unsupported marketing claims.

## Milestone 2 — Product showcase

### M2-01 — Catalog data-access module (1–2 h)
- Exposes typed operations for published products, categories, and product-by-slug.
- Handles missing slug and ordering predictably.
- Add focused tests where practical.

### M2-02 — Product listing and cards (2–4 h)
- Displays name, image, category, and clearly labeled starting price.
- Cards navigate to stable product detail URLs.
- Empty/loading assumptions are appropriate for static data.

### M2-03 — Category filtering (2–3 h)
- Accessible category controls, correct results, clear empty state.
- Document decision on URL state versus local state.

### M2-04 — Product details and image gallery (3–5 h)
- Dynamic `[slug]` pages, 404 behavior, multiple images, descriptions, inquiry CTA.
- Mobile/keyboard interactions tested.
- Product-specific CTA preserves product context where supported by selected form.

### M2-05 — Populate real catalog (variable; content-dependent)
- Add approved 11–30 products, starting prices, photos, alt text, categories.
- Validate every public URL and image.
- Create a short developer-facing content-update guide.

## Milestone 3 — Inquiry path (blocked by owner decision)

### M3-01 — Owner workflow interview and form ADR (30–60 min)
- Confirm whether owner wants email, spreadsheet, or both.
- Choose Google Form/Sheet, custom form/Resend, or custom form/Sheets.
- Confirm required contact methods, response expectations, and what constitutes a successful request.
- Update PRD and technical design before implementation.

### M3-02 — Inquiry UX and integration (2–6 h, varies by option)
- General and product-specific request entry points work.
- Product context prefilled or clearly indicated.
- Form captures agreed fields and explains quote-only status.
- If custom: server-side validation, secrets, anti-spam, error/success states.
- If hosted: shareable link, mobile usability, response destination, and prefill tested.

### M3-03 — Inquiry reliability and privacy checks (1–3 h)
- Test actual owner receipt or sheet entry and a failure case.
- Avoid duplicate submissions where feasible.
- Document fallback contact route and data-handling/privacy notice.
- No customer image uploads.

## Milestone 4 — Story and trust

### M4-01 — About / Our Story (1–3 h)
- Approved family/business story and imagery; responsive and accessible.

### M4-02 — FAQ and contact (1–3 h)
- Approved turnaround, quote, payment, pickup, and policy copy; social/contact links work.

### M4-03 — Testimonials (1–3 h)
- Only permissioned quotes; accessible carousel or static alternative; graceful no-content state.

## Milestone 5 — QA and launch

### M5-01 — Accessibility and responsive audit (2–4 h)
- Keyboard, labels, headings, contrast, alt text, mobile layouts, reduced motion.

### M5-02 — Performance and SEO (2–3 h)
- Optimize images, metadata, social previews, sitemap/robots where appropriate; check broken links.

### M5-03 — Deployment and owner acceptance (2–4 h)
- Configure production hosting/domain, verify environment settings and forms.
- Owner reviews content, pricing, contact channels, policies, and inquiry receipt.
- Publish only after sign-off; document content-update and rollback process.

## Milestone exit criteria

| Milestone | Exit condition |
|---|---|
| 0 | Repo/tooling works; visual direction and content contract reviewed. |
| 1 | Navigation and home page work on mobile and desktop. |
| 2 | Approved catalog, filters, detail pages, and imagery work end to end. |
| 3 | A real customer can submit a request through the approved channel and owner can receive/find it. |
| 4 | Story, FAQ, contact, and testimonials are approved and accurate. |
| 5 | Accessibility, responsiveness, content, inquiry, and deployment checks pass; owner approves launch. |

## Definition of done (every ticket)

- Acceptance criteria met, no known blocking errors.
- Build/lint/tests appropriate to change pass.
- Keyboard/mobile behavior considered for UI work.
- No secrets or customer data committed.
- Changes are understandable and scoped; docs updated when contracts change.
- Developer can explain design trade-offs and one thing learned.

## Backlog — V2 / later

- Supabase schema, Storage, and content migration.
- Owner login and authorization.
- Content dashboard: products, photos, categories, starting prices, testimonials, FAQs.
- Optional analytics only with privacy considerations and a concrete need.
- Order management **only if owner requests it after workflow discovery**.
- Reusable freelance template and custom AI code-review agent are separate future initiatives.

## Suggested first issue

**M0-01: Initialize the MDBlessings repository.** Before coding, developer proposes Next.js setup choices (App Router, `src/` convention, package manager, linting, testing starter, and hosting approach). Mentor reviews the proposal; developer performs setup and shares repo tree/config for review.

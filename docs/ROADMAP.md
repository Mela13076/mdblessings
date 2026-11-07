# MDBlessings — V1 Engineering Roadmap (Codex Implementation)

**Status:** Implementation-ready plan; owner/content dependencies remain open  
**Version:** 1.1-draft  
**Updated:** 2026-10-22  
**Execution:** GitHub milestones group outcomes; linked GitHub issues are actionable Codex implementation tickets. Estimates are optional planning aids, **not delivery deadlines**.

## Working agreement

Client answers and approvals are collected in [CLIENT_CONFIRMATIONS.md](CLIENT_CONFIRMATIONS.md); use that record to resolve owner dependencies and keep the PRD/technical notes aligned.

- Developer chooses priorities, validates business details, reviews PRs/diffs and approves deployment.
- Codex implements approved issues directly, including code, responsive styling, accessibility, reasonable tests and relevant docs.
- Batch closely coupled work when efficient, but keep issues reviewable with explicit acceptance criteria and dependencies.
- At the end of each issue: report what changed, checks performed, failures/uncertainties, and what needs owner review.
- Do not stop to teach fundamentals before implementing; explain architectural choices when important.
- V1 remains a catalog + email inquiry site, **not** checkout, customer accounts, order tracking or an admin dashboard.
- **Selected inquiry:** custom on-site form + server-side validation + Resend email; real mailbox/domain configuration is an owner/developer dependency.

## Milestone 0 — Foundation and design system

### M0-01 — Initialize repository and tooling
**Outcome:** Working Next.js App Router + TypeScript + Tailwind project, README/setup docs, lint/typecheck/build scripts, sensible file organization and root `AGENTS.md`; planning documents in `docs/`. No premature DB/auth packages.
**Done when:** local dev and production build run, scripts are documented, secrets are ignored, deployment path is understandable.

### M0-02 — Establish branding and responsive design foundation
**Outcome:** Use approved logo/assets as references, define tokens and typography, global styles, layout patterns and basic responsive wireframes. Suggested aesthetic: blush/pink, cream and gold, subject to approval and contrast checks.
**Done when:** shared tokens and mobile/desktop layouts are coherent, owner/developer signs off on the direction; avoid hard-coded invented business info.

### M0-03 — Implement typed content models and seed examples
**Outcome:** Typed product/category/image models, 2–3 representative sample records, stable IDs/slugs, starting price convention, featured/published states, images with alt text, clear separation of data and UI.
**Done when:** seed products can render without duplicating content in JSX; unknown data remains explicitly provisional.

## Milestone 1 — Site foundation

### M1-01 — Build responsive global shell
**Outcome:** Header, navigation/mobile menu, footer, core layout, inquiry CTA, accessibility/keyboard focus and working internal routes.
**Done when:** mobile/desktop navigation operates with keyboard and touch; no broken links.

### M1-02 — Implement polished homepage
**Outcome:** Branded hero, featured product preview, story teaser, primary inquiry CTA and approved social/contact links; adapt to small screens.
**Done when:** compelling, coherent mobile-first page uses real or clearly flagged placeholder content; no invented testimonials or claims.

## Milestone 2 — Product showcase

### M2-01 — Build lightweight catalog access functions
**Outcome:** Typed operations for published products/categories/product by slug and predictable order; unit tests for key selectors.
**Done when:** UI imports catalog functions rather than manipulating content arrays across unrelated components.

### M2-02 — Build product listing and reusable cards
**Outcome:** Catalog grid with optimized images, name/category, clearly labeled starting price and valid product links; graceful missing data.
**Done when:** listing works across breakpoints with approved/sample data.

### M2-03 — Add category filtering
**Outcome:** Accessible filter controls, correct results, all-items option and empty state. Keep filtering simple; URL persistence optional if justified.
**Done when:** filters work with keyboard and touch, and never show unpublished products.

### M2-04 — Implement product detail pages and gallery
**Outcome:** `/products/[slug]`, gallery of example photos, description, starting-price notice, product-specific quote CTA with preserved product context, proper 404.
**Done when:** gallery works on mobile/keyboard and direct links/invalid slugs behave correctly.

### M2-05 — Populate approved real catalog
**Outcome:** Owner-approved ~11–30 product types, images, starting prices, alt text, categories and product URLs; short guide for later static content updates.
**Done when:** owner confirms displayed content and all assets/links load. **Dependency: owner assets and price approval.**

## Milestone 3 — Quote inquiry experience

### M3-01 — Confirm email and form contract (owner dependency)
**Outcome:** Confirm business recipient inbox, sending domain/DNS access, required contact fields, optional Messenger contact, subject/content template, approved privacy wording and fallback contact channel.
**Done when:** decisions recorded in PRD/technical notes; the custom form + Resend selection itself is already made.

### M3-02 — Implement custom quote form + Resend
**Outcome:** Responsive `/request` page with general and product-prefilled modes; client UX checks, server-side validation, protected Resend integration, basic abuse controls, success/error states.
**Done when:** both flows work end-to-end in a configured test environment, including invalid and failing requests; no secrets exposed.
**Dependency:** M3-01 for final business config; non-sensitive UI scaffolding may start sooner.

### M3-03 — Verify delivery, privacy and fallback
**Outcome:** Real email receipt test with intended mailbox, failure-path testing, graceful retry/contact alternative, privacy notice review and duplicate-submit safeguards as practical.
**Done when:** owner actually receives a test request and understands how to respond; documented provider failure limitations. **Launch blocker.**

## Milestone 4 — Story and trust

### M4-01 — Build Our Story
**Outcome:** Approved family story, meaning of MDBlessings, optional owner-approved imagery, responsive layout.
**Done when:** owner approves all published text/images.

### M4-02 — Build FAQ and contact
**Outcome:** Approved answers for customization, quotes, payment, turnaround and pickup; valid contact/social links and usable fallback contact method.
**Done when:** no invented policies, times or home pickup address appear publicly.

### M4-03 — Add testimonials (when approved)
**Outcome:** Permissioned quotes in accessible responsive display; section is hidden gracefully if content unavailable.
**Done when:** no testimonial is fabricated; user can navigate without forced motion.
**Dependency:** owner-provided consent/content. Can be deferred from launch if unavailable.

## Milestone 5 — Quality assurance and launch

### M5-01 — Mobile and accessibility audit
**Outcome:** Verify mobile/tablet/desktop navigation, page layout, headings, forms, focus, image descriptions, contrast and reduced motion.
**Done when:** no known high-severity accessibility or usability blockers remain.

### M5-02 — SEO and performance pass
**Outcome:** Review image sizes, metadata, social sharing previews, sitemap/robots, 404, missing images and broken links.
**Done when:** production build passes and core public pages are shareable/search-friendly.

### M5-03 — Deploy and obtain owner acceptance
**Outcome:** Confirm domain/hosting, environment secrets and DNS, production smoke tests, owner review of prices/policies/photos/contact and inquiry receipt; add minimal deployment/rollback/content-update instructions.
**Done when:** approved website is live, working on mobile, and owner can receive/respond to quote requests.

## GitHub organization recommendation

**Keep existing milestones and issue IDs.** Do not delete issues solely because the working style changed. Edit their descriptions and acceptance criteria, remove mentor-only requirements, and close duplicates only after verifying the functionality is covered elsewhere.

- **Milestones:** 0 Foundation & Design, 1 Site Shell & Home, 2 Product Showcase, 3 Quote Requests, 4 Story & Trust, 5 QA & Launch.
- **Issue labels:** `feature`, `design`, `integration`, `content`, `qa`, `blocked:owner`, `v2`, `bug` as useful.
- **Suggested issue template:** Outcome; user-visible acceptance criteria; technical constraints; dependencies/owner input; verification; out of scope.
- **Sequencing:** foundation → navigable shell → catalog → inquiry → content/QA → launch. Content collection and owner decisions happen in parallel to engineering.
- **Parallelism:** M4 content pages can run while M3 business configuration is pending. Do not mark launch done without successful email testing and owner approval.

## Launch gates

- [ ] Owner-approved logo, business details, images, product descriptions and starting prices
- [ ] Site navigation, listing, filtering and product pages function across common devices
- [ ] General and product-specific requests both work and accurately state quote-only status
- [ ] Resend sender domain configured, business inbox receipt tested, failure/fallback checked
- [ ] Owner-approved FAQ/policies and appropriate privacy notice published
- [ ] Accessibility, metadata, performance and broken-link checks complete
- [ ] Hosting/domain configured and owner signs off on production site

## V2 / future (not V1)

Supabase-backed catalog and content dashboard; staff authentication/permissions; self-managed image uploads; optional metrics based on actual needs. Order management only if the owner requests it after workflow discovery. Reusable freelance multi-client platform and independent coding challenge/AI mentor are separate projects.

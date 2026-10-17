# MDBlessings — V1 Technical Design

**Status:** Proposed technical baseline; inquiry adapter and design tokens pending  
**Version:** 1.0-draft  
**Last updated:** 2026-10-16

## 1. Architectural principles

1. Build a **showcase website**, not an e-commerce or order-management application.
2. Prefer the simplest solution that meets confirmed V1 needs.
3. Separate content and presentation so a future CMS/database migration is feasible.
4. Keep external form integrations behind a small boundary; do not build speculative infrastructure.
5. Optimize for independent learning, accessibility, maintainability, and low ongoing operational burden.

## 2. Proposed V1 stack

| Concern | Selection | Rationale |
|---|---|---|
| Application | Next.js App Router + React + TypeScript | File-based routes, static rendering, strong TS ecosystem, prior familiarity. |
| Styling | Tailwind CSS | Reusable responsive styling; define consistent tokens. |
| Content | Typed static TypeScript modules | Only 11–30 products and occasional updates; no database necessary. |
| Images | Optimized files in `public/images/` | Simple deployment, versioned with code, no storage credentials. |
| Hosting | Vercel (proposed) | Straightforward Next.js deploy/preview workflow. |
| Form delivery | **TBD** | Google Forms/Sheets OR custom React form with Resend OR custom form with Sheets. |
| Validation | Native browser checks plus server-side schema validation if custom backend chosen | Do not trust browser validation alone. Zod is a candidate, not yet mandatory. |
| Database/auth | None in V1 | Future dashboard only; Supabase planned for V2 evaluation. |

Pin actual package versions during repository setup; avoid choosing versions solely from this document.

## 3. System boundaries

```text
Customer browser
  └─ Next.js public website (Vercel proposed)
       ├─ Static catalog / categories / testimonials / FAQs
       ├─ Versioned product photos in public/images
       └─ Request CTA / form boundary
            ├─ Option A: hosted Google Form → Google Sheet
            ├─ Option B: custom form → server handler → Resend → owner email
            └─ Option C: custom form → server handler → Google Sheets

V2 (not implemented): authenticated content dashboard → Supabase DB/Storage
```

For option B/C, a server endpoint handles secrets, validation, spam mitigation, and provider errors. Do not call privileged provider APIs from the browser. A hosted Google Form is a link/embed rather than a custom server integration.

## 4. Route plan (proposed)

| Route | Purpose |
|---|---|
| `/` | Home, featured work, story preview, primary CTA |
| `/products` | Filterable catalog |
| `/products/[slug]` | Individual product page and inquiry CTA |
| `/about` | Our Story |
| `/faq` | Frequently asked questions |
| `/contact` | Contact information and inquiry entry |
| `/request` | Optional custom request page **only if** custom form chosen; otherwise link to hosted form |

Use actual route names consistently after the first design review. Product slugs must be stable and unique. For invalid product slugs, return a genuine 404/not-found page.

## 5. Content model (conceptual, not implementation code)

**Product**
- `id`: stable identifier independent of display name
- `slug`: unique, shareable URL segment
- `name`: customer-facing product type
- `description`: what is customizable
- `categoryId`: reference to category
- `startingPriceCents`: integer currency amount (or explicit price display model if some items have no starting price; resolve before populating)
- `images`: ordered list of image records (`src`, `alt`, optional caption)
- `featured`: boolean
- `published`: boolean
- `displayOrder`: number (optional)

**Category:** `id`, `slug`, `name`, `displayOrder`.

**Testimonial:** `id`, `quote`, `attribution`, `approved`, `displayOrder`; publish only with permission.

**FAQ:** `id`, `question`, `answer`, `displayOrder`; owner-approved answers only.

**Site content:** business name, short introduction, story copy, social/contact links, and pickup-area wording. Keep configuration centralized, not duplicated across components.

### Data rules
- Store prices as integer cents if they are numeric; render with a currency formatter.
- Always label prices as **starting at** and state final price is quoted by owner.
- One product type can have multiple example designs/photos; avoid treating every photo as a distinct sellable product.
- Use stable IDs and slugs so migrating to Supabase doesn't require changing public URLs.
- No customer information should be stored in static files or committed to Git.

## 6. Proposed code organization

```text
app/ or src/app/           # Next.js routes, layouts, metadata
components/                # Reusable presentational UI
components/products/       # Product cards, filters, gallery
components/layout/         # Header, footer, navigation
content/ or src/data/      # Typed catalog, categories, FAQ, testimonials
lib/catalog/               # getProducts, getProductBySlug, etc.
types/                     # Shared content contracts
public/images/             # Logo, product photos, static assets
```

This is an illustrative structure. Select one root convention (`src/` or root) when initializing; avoid creating empty folders for hypothetical features.

### Data-access boundary

UI components should not import and manipulate raw catalog arrays throughout the app. Instead, a small catalog module should expose operations such as listing published products, finding a product by slug, and retrieving categories. Keep it lightweight—no generic repository framework needed.

## 7. Rendering and interactions

- Prefer server-rendered/static routes for home, About, FAQ, and product details.
- Use client components only where interaction is needed (e.g., category filters, image gallery, testimonial carousel).
- Ensure filtering works without confusing empty states; consider whether URL query parameters should preserve filter state, but do not add complexity by default.
- Use Next.js image optimization where suitable; provide alt text, dimensions, and responsive sizes.
- Ensure testimonial carousel can be operated by keyboard and doesn't force motion.

## 8. Inquiry integration: decision boundary

**Unresolved. Do not implement until owner preference is collected.**

### Shared user-facing contract
- General request and product-specific request entry points.
- Fields: name; email **or** phone (at least one usable contact route); product context where relevant; quantity where relevant; customization description. Messenger can be supplemental after owner review.
- No uploads, checkout, or automated final quotes.
- Clear disclosure: inquiry only; owner will confirm design, final price, and pickup.
- Shareable path from social channels.

### Option A — Google Form + Google Sheet
- Link to hosted form from website and social media; consider product-prefilled URLs.
- Minimal custom code, but third-party branding and UX.
- Validate actual prefill behavior and whether owner checks response sheet or enables notifications.

### Option B — Custom form + Resend
- Build a React form and secure server-side submission handler.
- Validate/sanitize input, add spam/rate-limit mitigation, handle provider failures.
- Define honest success/error semantics; provider API acceptance is not inbox-delivery guarantee.
- No inquiry persistence in V1 unless specifically approved; acknowledge risk of missed email and define manual recovery path.

### Option C — Custom form + Google Sheets
- Custom frontend, server-side Sheets integration using appropriately protected credentials.
- Owner sees requests in a spreadsheet; decide whether email notifications are also needed.
- Handle append failures and duplicate submissions; avoid exposing Sheets credentials.

**Decision criterion:** Owner's preferred daily workflow, ease of customer submission, maintenance burden, and learning value. No speculative queue or order database.

## 9. Security, privacy, and operational expectations

- No secrets in git, client bundles, screenshots, or public configuration.
- Use environment variables for any server-side provider credentials.
- Do not store or log full inquiry details unnecessarily; redact PII in error logs.
- For custom forms: server-side validation, reasonable request size limits, anti-abuse controls, and explicit failure feedback.
- Publish privacy/contact information appropriate to the selected form provider.
- Owner approves business contact details and pickup-area wording; do not expose home address without consent.
- Maintain an accessible contact fallback if form provider is unavailable.

## 10. Testing strategy

**Unit:** Content selectors/filtering, price formatting, slug handling, form validation (if custom).

**Component:** Product cards, gallery, filter states, keyboard-accessible nav and carousel.

**Integration:** Product detail route/404, inquiry CTA preserves context, form success and error paths for chosen provider.

**Manual release checks:** Small-screen layout, contrast, keyboard navigation, screen-reader labels, broken images, SEO metadata, all links, owner review, and real-device inquiry test.

Choose testing libraries during repo setup based on actual ticket needs; don't add a large test stack before the first meaningful tests.

## 11. Deployment and content update process

- GitHub repo is source of truth.
- Preview deployments for review; production deployment after checks and owner approval.
- Developer edits typed content and assets, validates build, and redeploys for occasional changes.
- Compress/resize images before commit; use descriptive filenames and alt text.
- Record how to add a product in README or `docs/CONTENT_GUIDE.md` during the catalog milestone.

## 12. V2 migration path

1. Keep product/category/testimonial models explicit and stable in V1.
2. When V2 begins, design Supabase PostgreSQL schema and Storage bucket structure from actual content-editing requirements.
3. Write one-time import from typed static content and transfer images to managed storage.
4. Replace catalog data-access implementation while preserving component props and product URLs.
5. Add owner authentication, authorization/RLS, image management, audit considerations, and an admin interface.
6. Test data parity and redirects before switching the live content source.

Migration is not zero work, but it is bounded and intentional. **Do not install Supabase, Prisma, or authentication in V1 solely for future use.**

## 13. Open technical decisions

- Hosted vs custom inquiry form and chosen provider; exact contact fields.
- Visual design tokens, fonts, logo/image assets, and page mockups.
- Hosting/domain selection confirmation.
- Whether product filters persist in URL; decide during product-gallery ticket.
- Whether starting prices are available for every product; define display fallback if not.
- Exact test/tooling versions after project initialization.

## 14. Architecture decision log

- **ADR-001 (V1):** Use typed static content and repo-hosted images; defer Supabase to V2. Rationale: small catalog, occasional updates, no V1 content dashboard.
- **ADR-002 (V1):** Inquiry channel is independent of catalog content; delivery method pending owner decision.
- **ADR-003 (V2 direction):** Content dashboard, not order management, is the known future need.

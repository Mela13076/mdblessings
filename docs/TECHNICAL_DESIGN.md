# MDBlessings — V1 Technical Design

**Status:** Proposed technical baseline; inquiry adapter and design tokens pending  
**Version:** 1.1-draft  
**Last updated:** 2026-10-22

## 1. Architectural principles

1. Build a **showcase website**, not an e-commerce or order-management application.
2. Prefer the simplest solution that meets confirmed V1 needs.
3. Separate content and presentation so a future CMS/database migration is feasible.
4. Keep external form integrations behind a small boundary; do not build speculative infrastructure.
5. Optimize for fast AI-assisted delivery, accessibility, maintainability, and low ongoing operational burden.

## 2. Proposed V1 stack

| Concern | Selection | Rationale |
|---|---|---|
| Application | Next.js App Router + React + TypeScript | File-based routes, static rendering, strong TS ecosystem, prior familiarity. |
| Styling | Tailwind CSS | Reusable responsive styling; define consistent tokens. |
| Content | Typed static TypeScript modules | Only 11–30 products and occasional updates; no database necessary. |
| Images | Optimized files in `public/images/` | Simple deployment, versioned with code, no storage credentials. |
| Hosting | Vercel (proposed) | Straightforward Next.js deploy/preview workflow. |
| Form delivery | Custom on-site form + Resend | Matches the desired branded inquiry experience; owner recipient and sending domain still need confirmation. |
| Validation | Browser UX checks plus server-side validation | Do not trust browser validation alone; Zod is optional. Add abuse prevention and useful failure states. |
| Database/auth | None in V1 | Future dashboard only; Supabase planned for V2 evaluation. |

Pin actual package versions during repository setup; avoid choosing versions solely from this document.

## 3. System boundaries

```text
Customer browser
  └─ Next.js showcase site (Vercel proposed)
       ├─ Static typed catalog / categories / testimonials / FAQs
       ├─ Optimized images in public/images
       └─ Custom request form (general or product-prefilled)
            └─ Server handler (validate, limit abuse, protect secrets)
                 └─ Resend API → owner-approved business email

V2 (not implemented): authenticated content dashboard → Supabase DB/Storage
```

The server endpoint handles secrets, validation, spam mitigation, and provider errors. Never call privileged Resend APIs from the browser. Verify actual inbox receipt before launch.

## 4. Route plan (proposed)

| Route | Purpose |
|---|---|
| `/` | Home, featured work, story preview, primary CTA |
| `/products` | Filterable catalog |
| `/products/[slug]` | Individual product page and inquiry CTA |
| `/about` | Our Story |
| `/faq` | Frequently asked questions |
| `/contact` | Contact information and inquiry entry |
| `/request` | Branded custom quote-request page; optionally prefilled from product CTAs |

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

See Section 15 for detailed component architecture, separation of responsibilities, and coding conventions.

### Data-access boundary

UI components should not import and manipulate raw catalog arrays throughout the app. Instead, a small catalog module should expose operations such as listing published products, finding a product by slug, and retrieving categories. Keep it lightweight—no generic repository framework needed.

## 7. Rendering and interactions

- Prefer server-rendered/static routes for home, About, FAQ, and product details.
- Use client components only where interaction is needed (e.g., category filters, image gallery, testimonial carousel).
- Ensure filtering works without confusing empty states; consider whether URL query parameters should preserve filter state, but do not add complexity by default.
- Use Next.js image optimization where suitable; provide alt text, dimensions, and responsive sizes.
- Ensure testimonial carousel can be operated by keyboard and doesn't force motion.

## 8. Inquiry integration — selected V1 solution

**Decision:** Branded custom React form + secure Next.js server handler + Resend business email. **Still to confirm:** business recipient address, verified sending domain, precise contact fields, notification preferences and owner-approved customer wording.

### Customer-facing contract
- Entry from general CTAs and product detail pages; preserve product context, preferably in a stable URL or explicit form default.
- Capture name, at least one valid way to reply (email or phone), product/context, quantity when relevant, and customization notes. Confirm final required/optional field policy with owner.
- No image uploads, checkout, payment or automated final quote.
- Make clear that submitting a request does **not** place or confirm an order; owner follows up about design, final price, and local pickup.
- Show honest submit, success, failure, and retry/fallback experiences.

### Implementation expectations
- Validate all untrusted fields server-side, cap lengths/body size, and mitigate abuse (e.g. honeypot/rate controls appropriate to deployment).
- Keep provider keys server-side. Do not include customer inquiry details in logs.
- Consider accidental double submissions and provider failure. A provider-accepted send is not proof of inbox delivery; test with the intended mailbox.
- No V1 request database, email queue or order-management system. An accessible fallback contact option is required.
- Publish an owner-approved privacy notice explaining collection and email handling.

### Deferred alternatives
Google Forms/Sheets and direct Google Sheets capture are not part of the selected V1 implementation unless owner/developer later reopens the decision.

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

Any future migration should preserve the reusable component contracts and simplicity principles established in Section 15.

## 13. Open technical decisions

- Resend sending domain and recipient inbox; exact contact fields and optional Messenger treatment.
- Visual design tokens, fonts, logo/image assets, and page mockups. Use existing logo and card references as inspiration; proposed blush/pink, cream and restrained gold require owner approval and accessible contrast.
- Hosting/domain selection confirmation.
- Whether product filters persist in URL; decide during product-gallery ticket.
- Whether starting prices are available for every product; define display fallback if not.
- Exact test/tooling versions after project initialization.

## 14. Architecture decision log

- **ADR-001 (V1):** Use typed static content and repo-hosted images; defer Supabase to V2. Rationale: small catalog, occasional updates, no V1 content dashboard.
- **ADR-002 (V1):** Custom inquiry form + protected server endpoint + Resend email, independent of static catalog; production mailbox/domain details pending.
- **ADR-003 (V2 direction):** Content dashboard, not order management, is the known future need.

## 15. AI-assisted implementation convention

Codex may write complete approved features, tests and styling. Developer retains architectural/business ownership, reviews diffs and approves deployment. Prefer shipping integrated feature slices over mentor-style exercises; validate builds and integrations rather than assuming generated code works.


## 15. Component Architecture, Code Organization, and Future Reusability

### 15.1 Architectural Goals

MDBlessings should follow established Next.js, React, and TypeScript development practices while maintaining a simple, understandable architecture.

Although MDBlessings may eventually serve as the foundation for a reusable small-business website template, V1 must prioritize the needs of this business.

**Primary architectural objectives:**

- Maintain a clean, readable, and scalable codebase.
- Follow Next.js App Router and React best practices.
- Build reusable components without unnecessary abstraction.
- Separate business-specific content from presentation and application logic.
- Make future maintenance and feature development straightforward.
- Preserve a reasonable migration path toward a content-management dashboard.
- Avoid overengineering features that are not required for V1.

**Guiding principle:** Build for MDBlessings today while keeping future reuse practical.

### 15.2 Next.js and React Conventions

Follow the official conventions supported by the installed Next.js version.

**Server and Client Components**

- Prefer React Server Components for pages and components that do not require browser-side interactivity.
- Use Client Components for interactive features such as category filtering, image gallery controls, mobile navigation, and inquiry forms.
- Keep `'use client'` boundaries limited to components that require client-side behavior.
- Do not make entire pages Client Components solely because a small child component is interactive.
- Avoid unnecessary `useEffect`, client-side data fetching, and global state.

**Routing and Rendering**

- Use the Next.js App Router for routing and layouts.
- Use file-based routes and dynamic segments where appropriate.
- Prefer static rendering for content that changes infrequently.
- Use `notFound()` for invalid product slugs.
- Use Next.js metadata APIs for page titles, descriptions, and social previews.
- Use Next.js image and font optimization where appropriate.

**Accessibility and Performance**

- Use semantic HTML elements.
- Ensure keyboard accessibility and visible focus states.
- Provide descriptive image alternative text.
- Use responsive, mobile-first layouts.
- Avoid unnecessary JavaScript and large client-side dependencies.
- Respect reduced-motion preferences where applicable.

### 15.3 Component Architecture

Components should be organized around clear responsibilities and meaningful reuse.

**Component Guidelines**

- Create reusable components for UI patterns or functionality that appear in multiple locations.
- Keep components focused on a single primary responsibility.
- Prefer component composition and props over complicated configuration systems.
- Avoid deeply nested JSX and excessively large components.
- Keep business logic separate from presentational components when practical.
- Use descriptive component, prop, and function names.
- Avoid extracting trivial JSX into separate components unless doing so improves readability or consistency.

**Examples of reusable components:**

| Component | Responsibility |
|---|---|
| `Header` | Global navigation, logo, and primary CTA |
| `Footer` | Business information, contact details, and links |
| `ProductCard` | Display a product preview using supplied product data |
| `ProductGrid` | Arrange product cards in a responsive layout |
| `ProductGallery` | Display and navigate product example images |
| `InquiryForm` | Capture and validate customer inquiry information |
| `SectionHeading` | Provide consistent headings where the same pattern is reused |
| `Button` | Provide consistent styling and interaction for supported button variants |

These examples are suggestions rather than mandatory components. Create them when their responsibilities are needed.

### 15.4 Separation of Responsibilities

The application should maintain three primary architectural layers.

**1. Content and Business Configuration**

Contains information specific to MDBlessings, such as:

- Business name, tagline, and branding.
- Contact information and social links.
- Product records and category definitions.
- Starting prices and product descriptions.
- Business story, FAQs, and testimonials.
- Site-wide content and configuration.

Store these values in structured content modules rather than scattering them throughout JSX.

**2. Presentation and UI Components**

Contains reusable components responsible for displaying content and handling appropriate user interactions.

Components should receive business information through props or clearly defined interfaces when practical.

Generic components should not unnecessarily depend on MDBlessings-specific names, contact details, or product descriptions.

**3. Data Access and Integrations**

Contains small, focused modules responsible for:

- Retrieving and filtering product data.
- Finding products by slug.
- Formatting reusable values where needed.
- Validating inquiry submissions.
- Sending inquiry emails through Resend.
- Handling integration errors.

Keep external service credentials and privileged operations on the server.

Do not introduce generic repositories, dependency injection frameworks, or additional service layers without a concrete requirement.

### 15.5 Proposed Project Organization

The application should use a predictable folder structure based on the responsibilities of existing features.

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── products/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── faq/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── request/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   ├── products/
│   ├── forms/
│   └── ui/
│
├── content/
│   ├── products.ts
│   ├── categories.ts
│   ├── testimonials.ts
│   ├── faq.ts
│   └── site.ts
│
├── lib/
│   ├── catalog.ts
│   └── email.ts
│
└── types/
    └── product.ts
```

This structure is illustrative and may evolve during implementation.

Do not create empty directories, placeholder modules, or abstraction layers solely to match the proposed structure.

### 15.6 TypeScript Standards

TypeScript should be used consistently across the application.

- Define meaningful domain types for products, categories, images, testimonials, and inquiry payloads.
- Prefer type inference where the types are already clear.
- Use explicit interfaces or types when they improve contracts and readability.
- Avoid `any` unless its use is justified.
- Represent optional values accurately.
- Prefer simple data models over highly generic type structures.
- Validate untrusted data at appropriate server boundaries.
- Keep shared domain types independent of individual UI components where practical.

### 15.7 Styling and Design Consistency

Use Tailwind CSS and a small, consistent set of design tokens to maintain visual consistency.

- Define shared brand colors, typography, spacing conventions, and border treatments.
- Use existing MDBlessings branding and approved design references.
- Prefer reusable styling patterns over duplicated complex class combinations.
- Keep responsive behavior consistent across pages.
- Avoid creating a large custom design system or theme engine for V1.
- Use accessible contrast and responsive typography.

Design decisions should align with `design/DESIGN_GUIDELINES.md` and the reference wireframes when those files are available.

### 15.8 Preparing for a Future Reusable Website Template

MDBlessings may eventually become the foundation for websites offered to other small businesses.

However, V1 is a single-business implementation, not a multi-client platform.

**Prepare for future reuse by:**

- Separating business-specific content from reusable components.
- Centralizing branding and site-wide configuration.
- Building components that accept product or content data through props.
- Maintaining stable product IDs and URL slugs.
- Keeping catalog data access independent of UI components.
- Avoiding unnecessary assumptions about a business's name or contact information inside generic components.
- Maintaining clear integration boundaries.

**Do not implement the following in V1:**

- Multi-tenant infrastructure.
- Dynamic website builders.
- Drag-and-drop page editing.
- Universal theme configuration systems.
- Client onboarding or provisioning systems.
- Generalized CMS frameworks without an immediate requirement.
- Database infrastructure solely for hypothetical future clients.

When a second business website is developed, evaluate which components, patterns, and content structures are genuinely reusable before extracting a formal template.

### 15.9 Future Content-Management Dashboard Compatibility

The future MDBlessings dashboard is expected to manage website content, including products, photos, categories, prices, testimonials, and selected business information.

To support this direction:

1. Keep product and category data structures explicit and stable.
2. Access catalog content through small, focused functions.
3. Avoid tightly coupling presentation components to static TypeScript arrays.
4. Design component props independently of whether data originates from static files or a database.
5. Preserve stable product URLs during future content migrations.

Supabase PostgreSQL, Storage, and Authentication remain candidates for V2.

Do not implement these services in V1 solely for future compatibility.

### 15.10 Maintainability and Complexity Guidelines

Code should remain understandable to a developer familiar with React, TypeScript, and Next.js.

Prefer:

- Simple functions and straightforward logic.
- Small, focused components where they improve clarity.
- Clear naming and predictable file organization.
- Reuse of existing framework capabilities.
- Minimal external dependencies.
- Explicit handling of important error states.
- Focused testing of meaningful behavior.

Avoid:

- Premature optimization.
- Speculative abstraction.
- Unnecessary global state.
- Excessive provider nesting.
- Highly generic components with many unrelated props.
- Large utility modules containing unrelated functions.
- Duplicating existing functionality through additional libraries.
- Refactoring unrelated code during feature implementation.

**Complexity rule:** If two approaches satisfy the same requirements, prefer the simpler approach unless the more complex solution has a clear, current benefit.

### 15.11 Engineering Review and Definition of Done

Before considering a feature complete:

1. Confirm that the implementation satisfies the relevant PRD requirements and GitHub issue acceptance criteria.
2. Verify that components follow the established project architecture.
3. Check for unnecessary duplication, abstractions, or dependencies.
4. Run applicable linting, type-checking, build, and automated tests.
5. Review mobile responsiveness and relevant accessibility behavior.
6. Verify error handling and security expectations when applicable.
7. Ensure that business-specific content is appropriately separated from reusable UI.
8. Confirm that the implementation does not introduce unapproved V2 functionality.

A feature should be considered complete when it works correctly, meets its acceptance criteria, passes applicable checks, and remains understandable and maintainable.

**Final principle:** The goal is not to create the most abstract or sophisticated architecture. The goal is to deliver a well-engineered, professional website with code that can be confidently maintained and reused where appropriate.

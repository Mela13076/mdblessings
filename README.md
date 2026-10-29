# MDBlessings — Mimi's Divine Blessings

A custom merchandise showcase and inquiry website for Mimi's Divine Blessings, a small family business creating personalized apparel, tumblers, memorial items, hats, stickers, sports-themed products, and other custom goods.

The website will give customers a place to explore examples of the business's work, browse starting prices, learn the family's story, and request a personalized quote. The owner will personally confirm designs, final pricing, payment arrangements, and local pickup.

**Project status:** Initial project setup and planning. The features below describe the planned V1 release; they are not all implemented yet.

## Planned V1 features

- **Branded home page:** Introduction to the business, featured work, a story preview, and clear paths to browse products or request a quote.
- **Product catalog:** Approximately 11–30 product types with photos, descriptions, categories, and starting prices, plus category filtering.
- **Individual product pages:** Shareable product URLs, multiple example photos where available, and a product-specific inquiry entry point.
- **Custom inquiries:** General requests for unlisted items and requests for specific products, capturing customer contact information and customization details. Product context will be preserved or prefilled where the selected form supports it.
- **Our Story:** Owner-approved copy and imagery introducing the family and the meaning behind MDBlessings.
- **FAQ and contact:** Approved information about customization, quotes, turnaround, payment, and local pickup, alongside contact and social links.
- **Customer testimonials:** Genuine feedback published with permission, with the section hidden until approved testimonials are available.
- **Responsive and accessible design:** Layouts for phones, tablets, and desktops, keyboard-accessible navigation, visible focus states, labeled fields, and meaningful image descriptions.
- **Search and sharing basics:** Descriptive page titles, metadata, shareable URLs, social previews, and sitemap/robots configuration as appropriate.

### Quotes and fulfillment

Displayed prices are **starting prices**, with final pricing confirmed by the owner. Submitting an inquiry does not create a confirmed or paid order. V1 supports **local pickup only**, with exact details arranged privately.

The selected inquiry flow is a custom on-site form delivered through Resend email. Recipient mailbox, verified sending domain, privacy wording, and fallback contact channel still require owner confirmation. The current `/request` route is a clearly labeled preview and does not collect or submit inquiries.

### V1 boundaries

V1 does not include a shopping cart, checkout, online payments, shipping, customer accounts, reference-image uploads, inventory tracking, or order management. Catalog updates will be made by the developer and redeployed; an owner content-editing dashboard is a possible future phase.

## Technology

- Next.js App Router and React
- TypeScript
- Tailwind CSS
- ESLint
- npm with a committed `package-lock.json`

The planned catalog uses typed static content and optimized images stored in the repository. No database or authentication is required for V1. Vercel is the proposed hosting provider; hosting and domain selection remain open.

## Local development

### Prerequisites

- Node.js 20.9.0 or newer, as required by the installed Next.js package
- npm
- Git

### Setup

```bash
git clone https://github.com/Mela13076/mdblessings.git
cd mdblessings
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). The home page entry point is `src/app/page.tsx`.

### Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Generate Next.js route types and check TypeScript without emitting files. |
| `npm test` | Compile and run catalog, price, and product-card/grid checks with Node's built-in test runner. |
| `npm run build` | Create a production build. |
| `npm start` | Serve the production build after running `npm run build`. |

Tests use the existing TypeScript compiler and Node's built-in test runner, with no additional dependencies. Generated CommonJS test files go to ignored `.test-build/`; edit source tests in `src/lib/` and `src/components/products/`. Component tests render markup with React's server renderer; browser layout and interactions still need manual review.

No inquiry-provider credentials are required for the current scaffold. Any future provider secrets must stay server-side in local or deployment environment configuration. Never commit secrets or customer inquiry data.

## Repository structure

```text
src/app/              Application routes, layouts, and global styles
public/               Static assets
docs/                Product requirements, technical design, and roadmap
AGENTS.md             Engineering collaboration guidelines
```

Product content modules and reusable components will be added under `src/` as their roadmap tickets are implemented.

The M1-01 global shell lives in `src/components/layout/`, with shared business identity and navigation in `src/content/site.ts`. The M1-02 homepage follows the design wireframe with clearly labeled preview copy and photo placeholders; its content is in `src/content/home.ts` and scoped styles/helpers are in `src/components/home/`. Catalog, content, and form routes still have preview pages. Published product-detail URLs now show the M2-04 detail page and gallery; unknown/unpublished URLs return 404. The request preview preserves product context via `?product=<slug>`, with the form still deferred to M3. See [Milestone 1 verification](docs/varification/M1_VERIFICATION.md) and [Milestone 2 verification](docs/varification/M2_VERIFICATION.md) for issue-by-issue checks and remaining review work.

## Project documentation

- [Product requirements](docs/PRD.md): V1 scope, customer journeys, and open business decisions.
- [Technical design](docs/TECHNICAL_DESIGN.md): Architecture, content models, and integration constraints.
- [Engineering roadmap](docs/ROADMAP.md): Milestones, tickets, acceptance criteria, and launch checks.
- [Engineering guidelines](AGENTS.md): Project standards and collaboration workflow.
- [GitHub milestones](https://github.com/Mela13076/mdblessings/milestones) and [issues](https://github.com/Mela13076/mdblessings/issues): Implementation tracking.

Branding, catalog content, photos, prices, contact details, policies, and testimonial permissions require owner approval before publication. Production launch also requires owner sign-off and verification of the selected inquiry flow.

# Milestone 2 — Product showcase verification

One verification document for all Milestone 2 issues. Add implementation details and actual check results to each issue section as work is completed. Future verification criteria are not passed results.

## Issue status

| Issue | Outcome | Status |
| --- | --- | --- |
| M2-01 | Catalog access functions | Implemented; eight tests, lint, and typecheck pass. Local production build confirmation pending. |
| M2-02 | Product listing and cards | Implemented; 15 total tests, lint, and typecheck pass. Local build and browser review pending. |
| M2-03 | Category filtering | Implemented; 24 total tests, lint, and typecheck pass. Local build and browser review pending. |
| M2-04 | Product details and gallery | Implemented; 27 tests, lint and typecheck pass. Route HTTP smoke checks pass; production build and detailed browser QA pending. |
| M2-05 | Approved real catalog | Pending owner content and publication review. |

## Shared verification commands

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

Record results under the relevant issue, including which environment ran them. For visual issues, also verify mobile/tablet/desktop layout, keyboard behavior, visible focus, and working links against the design references.

## M2-01 catalog access verification

Issue: [#6 — Build lightweight catalog access functions](https://github.com/Mela13076/mdblessings/issues/6)

### Implemented

- Content-backed functions in `src/lib/catalog.ts` for published products, featured products, exact slug lookup, and categories with published products.
- Pure selectors in `src/lib/catalog-selectors.ts`, with stable display-order/ID sorting and no source-array mutation.
- Tests cover mixed publication states, featured drafts, exact/unknown/draft slugs, empty catalogs, category visibility, deterministic ordering, non-mutation, null/zero price preservation, and repository content integrity.
- Node's built-in test runner plus the existing TypeScript compiler; no new package dependencies. Generated test output is ignored by Git and ESLint.
- Added unpublished DTF print, wooden board, clear bag, memorial rosary, and memorial handkerchief drafts. Existing shirt, tumbler, and keepsake records keep their IDs/slugs. Prices and photos remain unapproved/empty.
- Content guide documents the API and server-to-client data boundary. No page imports raw catalog records; product listing, filters, and detail UI remain separate tickets. No visual changes were needed for this issue.

### Checks (2026-10-28)

- `npm test`: eight tests passed.
- `npm run lint`: passed after excluding generated test output.
- `npm run typecheck`: passed.
- `git diff --check`: passed.
- `npm run build`: blocked by the existing execution-environment restriction on Turbopack's CSS worker binding a port (`Operation not permitted`), including the elevated retry. A local build is still required before marking all issue checks complete.

### Remaining content decisions

Approve category labels and individual descriptions/options, real photography and permissions, and approved starting prices or quote-only treatment before publication. All eight records remain unpublished, so getters correctly return an empty public catalog. No prices, availability, material specifications, response times, or business policies were invented.

## M2-02 — Build product listing and reusable cards

Issue: [#7 — Build product listing and reusable cards](https://github.com/Mela13076/mdblessings/issues/7)

**Status:** Implementation and automated checks complete; local build and visual verification pending.

### Implemented

- `/products` now reads published products/categories through `src/lib/catalog.ts` and composes a catalog introduction, quote/local-pickup notice, and reusable `ProductGrid`.
- `ProductCard` takes product/category props and renders the first example image through Next.js Image with real dimensions, responsive sizes, lazy loading, and descriptive alt text. Photos use `object-fit: contain` to preserve the full item. Missing images show a bounded 40px decorative icon and an honest photo-pending label.
- Prices use `formatStartingPrice`: approved nonnegative safe integer USD cents render as “Starting at”; null/invalid amounts render as “Request a quote.” A real zero is preserved.
- Semantic product list and article cards, one clearly named link per card, visible keyboard focus, no animation, and a one/two/three-column layout at mobile/tablet/desktop widths. Long names can wrap without forcing page overflow.
- The existing eight draft records remain unpublished. The public listing currently displays the empty state with working `/request` and home links. No fake prices, photos, categories, or product cards are published.
- Page copy lives in `src/content/catalog-page.ts`. Prefixed catalog CSS lives with the product components and is imported by the page. No client components or package dependencies were added.
- No dedicated catalog wireframe exists in `design/wireframes/`; the implementation follows the homepage card reference, existing shell, and design guidelines. Category filtering is M2-03.

### Checks (2026-10-28)

- `npm test`: 15 tests pass (eight catalog tests, five card/grid server-render tests, and two price-formatting tests).
- Card/grid tests verify populated markup, category labels, canonical URL generation, supplied alt text/dimensions and responsive image optimization, missing-data fallbacks, selected order, and the actual all-draft catalog's empty state.
- `npm run lint`, `npm run typecheck`, and `git diff --check`: passed.
- `npm run build`: blocked by the same Turbopack CSS-worker local-port restriction (`Operation not permitted`), including the elevated retry.
- Responsive CSS and markup were reviewed in source. Rendered layout, touch, and keyboard behavior in a browser have not been verified in this run; server-render tests do not replace those checks.

### Local verification and dependencies

1. Run the shared verification commands above, then `npm run dev` and open `/products`. It should show the empty collection state because all current records are drafts; both general CTA links should work.
2. Review at 375px, 768px, 1024px, and 1440px, plus 320px and 200% zoom. Check spacing, readable text, focus visibility, and no horizontal overflow.
3. Populated card behavior is exercised with test-only fixtures, without publishing real drafts. Once approved records are ready, verify the populated grid's columns, complete photos, long names, price labels, and keyboard/touch navigation in a browser.
4. Cards generate the stable `/products/[slug]` links. End-to-end detail navigation remains dependent on M2-04: that route is currently a deliberate 404 placeholder. There are no live public product links while the catalog is empty. Do not publish records until the detail route is implemented and verified.

## M2-03 — Add category filtering

Issue: [#8 — Add category filtering](https://github.com/Mela13076/mdblessings/issues/8)

**Status:** Implementation and automated checks complete; local build and browser verification pending.

### Implemented

- Server-rendered category links with `/products?category=<slug>`, a selected-state indicator (`aria-current="page"`), All products reset, and result counts. Filter options use only categories represented by published products.
- Added an optional category slug to `getPublishedProducts`. The pure selector resolves slugs through category records, retains display order, and excludes unpublished products for every filter.
- Unknown categories show a specific no-matches message and reset link. Empty query values mean all items; repeated category parameters use the first value. Refresh and browser history retain the URL selection without extra client state.
- Wrapping links with 44px minimum touch targets and existing focus styling follow the current catalog design. No dedicated product-listing wireframe exists; the available FAQ filter controls and established brand guidelines inform the compact selected-state treatment.
- Preserved the developer's existing eight `published: true` settings and the shirt's 2500-cent price. Added published, clearly labeled hoodie and long-sleeve shirt samples in Apparel, plus a mug sample in Drinkware. New prices remain null; photos remain empty.
- Current test collection: 11 products, with three Apparel, two Drinkware, and two Memorial items. A visible catalog-preview notice identifies provisional sample listings/prices. These publication settings are authorized for testing, not recorded as owner-approved production content.
- Updated earlier tests to respect intentional publication changes and test empty/draft behavior through isolated fixtures instead of assuming the entire real catalog is unpublished.

### Checks (2026-10-28)

- `npm test`: 24 tests passed, including nine additional filter-related tests. Coverage includes multiple matches, category slug/ID separation, stable ordering, all-items reset, unknown/empty/draft-only categories, selected link markup, filtered empty-state recovery, and the current sample grid.
- `npm run lint`, `npm run typecheck`, and `git diff --check`: passed.
- `npm run build`: the usual Turbopack CSS-worker port permission restriction persists in this environment, including the elevated retry.
- Source and server-rendered markup reviewed; actual keyboard/touch, URL navigation, mobile layout, and back/forward behavior remain manual browser checks, not claimed as passed here.

### Local verification

1. Open `/products`: All products should be selected with 11 products.
2. Select Apparel: three products (shirt, hoodie, long-sleeve shirt). Select Drinkware: two products (tumbler and mug). Select Memorial items: two products (rosary and handkerchief).
3. Select All products to restore 11. Refresh a filtered URL and use browser back/forward; the highlighted category and results should agree with the URL.
4. Visit `/products?category=not-a-category`: expect zero products, the no-matches message, and a working All products link. An empty `?category=` shows all; `?category=apparel&category=drinkware` uses Apparel.
5. Tab to each category link and activate with Enter. Check visible focus and selected state; repeat with touch at 375px and review wrapping at intermediate and desktop widths. Check 200% zoom for overflow.
6. Run the shared automated commands and confirm the production build locally. Filtering tests include unpublished fixtures; do not publish additional records solely to satisfy tests.

Product detail routes still depend on M2-04; sample card links currently reach the intentional not-found placeholder.

## M2-04 — Implement product detail pages and gallery

Issue: [#9 — Implement product detail pages and gallery](https://github.com/Mela13076/mdblessings/issues/9)

**Status:** Implementation complete; automated checks and development-server HTTP smoke checks pass. Production build and detailed responsive/interaction verification remain pending.

### Implemented

- Server-rendered `/products/[slug]` uses published-only catalog getters, generates static params only for published records, and calls `notFound()` for unknown/unpublished records. `dynamicParams = false` limits served paths to that generated collection. Product-specific titles and descriptions use the same lookup.
- Breadcrumbs link to Home, Products and the category filter. The overview stacks gallery before product information on mobile and splits into columns from 768px. Existing cream/champagne tokens, typography and shell remain in use.
- Product name, category, description, shared starting-price formatter, final-quote/local-pickup notices, category browse link, native expandable detail/information panels, same-category related cards (excluding the current product), and general custom-quote CTA.
- `ProductGallery` is the sole new client boundary. Supplied example photos use Next.js Image, real dimensions, responsive sizes and contain cropping. Previous/next buttons wrap; thumbnail buttons select directly and expose pressed state. Native buttons support Tab and Enter/Space; a polite live caption announces the current example. There is no autoplay or animation.
- Missing photos show a neutral placeholder without image controls or broken URLs. Failed main photos show an unavailable message while retaining navigation to other examples. Single photos omit redundant controls. No swipe gesture or lightbox is required to use the gallery on touch devices.
- Followed `productDetailsPage.png` hierarchy. Example photos stay in one gallery rather than a second duplicate carousel. Optional ratings, favorites, feature claims, turnaround promises and unsupported specifications are omitted. Related products appear only when other published products share the category.
- Product CTA carries the stable slug as `/request?product=<slug>`. The request preview resolves only published records and displays the selected item with a return link; invalid context offers catalog recovery. It still collects/submits nothing. The actual form and Resend remain M3 work.
- Existing 11 published test samples, prices and empty image arrays are unchanged. Preview wording remains visible; real content/photography approval belongs to M2-05.

### Checks (2026-10-29)

- `npm test`: 27 tests pass. Three new server-render gallery tests cover zero/one/multiple images, accessible control names/selection, image sizing/alt text and captions. Existing selectors test unpublished exclusion and exact slug matching; price tests cover null and zero.
- `npm run lint`, `npm run typecheck`, and `git diff --check`: passed.
- Existing local development server: `/products/custom-shirt` and `/products/custom-tumbler` return HTTP 200, `/products/not-a-product` returns HTTP 404 with `noindex`, and `/request?product=custom-shirt` returns HTTP 200 with the selected product. Response content checks confirm product title, numeric/quote-only prices, placeholder, related products and contextual CTA.
- Safari: navigated from listing to the shirt page and inspected its accessibility tree and screenshot; expected headings, gallery placeholder, pricing, panels, related links and contextual CTA are present. This is a limited desktop smoke check, not completed multi-width visual QA.
- `npm run build`: blocked by the existing Turbopack CSS-worker port restriction (`Operation not permitted`), including the elevated retry. A second dev instance exited because the developer's server was already running; smoke checks used the existing server without stopping it.

### Remaining local verification

1. Run `npm run build` locally. Check detail layouts at 375px, 768px and 1440px, plus 320px and 200% zoom, against the wireframe. Confirm no horizontal overflow and visible focus.
2. Add approved photos when available (or temporarily use local test fixtures without committing publication changes). Verify zero, one, and multiple-photo galleries; previous/next wrap, thumbnails select, captions/alt text agree, and failed image URLs remain recoverable. Tab through controls and activate with Enter/Space; repeat with touch. Current real catalog images are all empty, so interactive gallery behavior has not been browser-tested.
3. Follow the product quote CTA and confirm the selected name and return link; refresh the URL. Test unknown/unpublished context without exposing draft data. General `/request` should remain a neutral preview until M3.
4. Check a product with and without related items, category breadcrumb/browse navigation, direct URLs, invalid slug 404 and unpublished slug exclusion after any publication edits.

## M2-05 — Populate approved real catalog

**Status:** Owner content dependency; verification pending. There are currently 11 provisional records published for developer-authorized testing, not approved for production.

### Verify when implemented

- Owner approves the final catalog of approximately 11–30 product types, category labels, descriptions, pricing treatment, and photo permissions.
- IDs/slugs remain unique and stable; category references and numeric prices are valid.
- All photos load with accurate alt text and appropriate dimensions.
- Published listing, filters, featured selections, and detail pages agree with the approved content.
- The content-maintenance guide reflects the final workflow.

## Site-wide Tailwind migration — 2026-10-29

Developer requested replacing custom component CSS throughout the site with Tailwind utilities. This follow-up supersedes the earlier descriptions of component CSS files; prior issue records above remain historical verification notes.

### Changes

- Migrated header/footer, mobile navigation, homepage and placeholder artwork, catalog/cards/filters, product details/gallery, request preview, and shared placeholder destinations to Tailwind utility classes in TSX.
- Removed `home.module.css`, `products.css` and `product-detail.css` and all their imports. `globals.css` retains the Tailwind import, semantic color/font tokens and base defaults in `@layer base`. No new dependencies, content/publication changes, routes or submission behavior.
- Kept existing spacing, breakpoints (640/768/1024px), theme colors, contain image cropping, touch target sizes, focus outlines, selected filter/thumbnail states, and mobile disclosure behavior. Breadcrumbs retain baseline alignment. Font shorthand defaults in detail panels are represented with explicit normal line-height utilities.
- Extended the shared placeholder artwork's props for existing hero/story sizing and icon sizes instead of relying on CSS Module descendant selectors. Updated current documentation to describe the Tailwind convention.

### Verification

- `npm test`: all 27 existing tests pass; no tests were rewritten to depend on utility class strings.
- Final `npm run lint`, `npm run typecheck`, and `git diff --check`: passed. An initial `npm run build` succeeded and supplied the production preview below. After final normal-line-height/font-token cleanup, the rebuild hit the existing Turbopack CSS-worker port restriction (`Operation not permitted`), including the elevated retry. Re-run the final build locally; the initial success does not verify those last cleanup changes.
- Compiled the final stylesheet directly with the installed Tailwind compiler: passed, including the heading font, normal line-height, breadcrumb baseline and responsive rules. This validates Tailwind generation but does not replace a full final Next.js production build.
- Audited utility generation with the installed Tailwind compiler, including responsive classes, pseudo-element breadcrumb separators, ARIA selection states, semantic theme colors, group variants and calculated widths. The only non-utility found by the inspection script was the `story` prop comparison value; `group` is intentionally a Tailwind state marker.
- Safari production preview on port 3100: reviewed the product detail page at desktop width and 375px; breadcrumbs align and the mobile overview stacks. Opened the mobile menu and confirmed expanded links appear; Escape closes it. Reviewed the mobile homepage hero, stacked CTAs and placeholder artwork at 375px.
- Full multi-width visual comparisons of every lower section, real-photo gallery interaction, touch-device testing and screen-reader/zoom checks remain release QA. Further native-browser inspection was interrupted by a `noWindowsAvailable` tool error; no complete visual audit is claimed.

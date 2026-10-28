# Milestone 2 — Product showcase verification

One verification document for all Milestone 2 issues. Add implementation details and actual check results to each issue section as work is completed. Future verification criteria are not passed results.

## Issue status

| Issue | Outcome | Status |
| --- | --- | --- |
| M2-01 | Catalog access functions | Implemented; eight tests, lint, and typecheck pass. Local production build confirmation pending. |
| M2-02 | Product listing and cards | Implemented; 15 total tests, lint, and typecheck pass. Local build and browser review pending. |
| M2-03 | Category filtering | Not implemented. |
| M2-04 | Product details and gallery | Not implemented. |
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

**Status:** Not implemented; verification pending.

### Verify when implemented

- All-items and category selections return the correct published products.
- Controls work with keyboard and touch and make the selected state clear.
- Empty results display a useful message; unpublished products remain hidden.

## M2-04 — Implement product detail pages and gallery

**Status:** Not implemented; verification pending. The current route is a not-found placeholder.

### Verify when implemented

- Published product URLs load directly; unknown and draft slugs return a genuine 404.
- Details show accurate descriptions, approved starting prices or quote-only treatment, and final-quote wording.
- Galleries work on mobile and with keyboard input, with appropriate alt text and missing-image handling.
- The quote CTA preserves product context and does not imply an accepted order.

## M2-05 — Populate approved real catalog

**Status:** Owner content dependency; verification pending. Eight unpublished drafts currently exist.

### Verify when implemented

- Owner approves the final catalog of approximately 11–30 product types, category labels, descriptions, pricing treatment, and photo permissions.
- IDs/slugs remain unique and stable; category references and numeric prices are valid.
- All photos load with accurate alt text and appropriate dimensions.
- Published listing, filters, featured selections, and detail pages agree with the approved content.
- The content-maintenance guide reflects the final workflow.

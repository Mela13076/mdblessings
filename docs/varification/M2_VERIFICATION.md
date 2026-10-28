# Milestone 2 — Product showcase verification

One verification document for all Milestone 2 issues. Add implementation details and actual check results to each issue section as work is completed. Future verification criteria are not passed results.

## Issue status

| Issue | Outcome | Status |
| --- | --- | --- |
| M2-01 | Catalog access functions | Implemented; eight tests, lint, and typecheck pass. Local production build confirmation pending. |
| M2-02 | Product listing and cards | Not implemented. |
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

**Status:** Not implemented; verification pending.

### Verify when implemented

- Catalog cards use the catalog functions and never expose unpublished products.
- Each card shows a photo or missing-image state, name, category, and approved starting price or quote-only fallback.
- Product links are valid and layouts work at mobile, tablet, and desktop widths.

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

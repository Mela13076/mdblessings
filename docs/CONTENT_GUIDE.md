# Catalog content contracts and seed examples

Issue: M0-03 (#3). These are development contracts, not approved catalog content.

## Files and boundaries

- `src/types/product.ts`: Product, Category, and ProductImage contracts.
- `src/content/categories.ts`: provisional category labels and stable identifiers.
- `src/content/products.ts`: eight unpublished sample/draft records, including custom shirts, tumblers, keepsakes, DTF prints, wooden boards, clear bags, memorial rosaries, and memorial handkerchiefs.
- `src/lib/catalog.ts`: public catalog access functions for Server Components.
- `src/lib/catalog-selectors.ts`: pure selection logic exercised by unit tests.

Content stays outside JSX. Public pages should consume the published-only catalog access functions implemented in M2-01 (#6), including product-by-slug lookup. Do not import raw content arrays or the content-backed catalog module into Client Components; select published records in Server Components and pass those records through props. Drafts must not appear in metadata, static route generation, or a client bundle. The existing homepage layout samples remain separate from catalog records until the product UI is implemented.

## Catalog access

Import from `@/lib/catalog` in Server Components:

| Function | Result |
| --- | --- |
| `getPublishedProducts()` | Published products sorted by display order, then ID. |
| `getFeaturedProducts()` | Published featured products in the same order. |
| `getProductBySlug(slug)` | Exact, case-sensitive published match; otherwise `undefined`. |
| `getPublishedCategories()` | Categories containing published products, sorted by display order, then ID. |

All list results are fresh arrays with readonly TypeScript return types. Selectors do not mutate source arrays; returned records are shared references, not deep-frozen copies. All content-backed lists currently return `[]` because the records remain drafts. Handle this as an ordinary empty catalog, not an error. A later product detail route should call `notFound()` when slug lookup returns `undefined`.

The new product types are based on the developer's requested list. Category assignments, descriptions, and options are provisional; prices remain `null`, images remain `[]`, and publication remains disabled. Existing shirt/tumbler/keepsake IDs and slugs are preserved. DTF remains a single draft type until image/print formats are confirmed; no unapproved service or material claims are implied.

## Content decisions

- **Identifiers:** Keep IDs and slugs unique and stable when renaming products. A product type can have many ordered example photographs; each photograph is not a separate product.
- **Prices:** Use nonnegative safe integer USD cents for approved starting prices. `null` means unknown or unapproved; never substitute zero or invent a price. Future UI should show “Request a quote” for null, and “Starting at” plus a currency-formatted amount for approved numbers. Always explain that the owner confirms final pricing. A real zero must not be treated as missing through a truthiness check.
- **Images:** Empty arrays are intentional until approved assets exist. Future UI should show a neutral missing-image state without rendering an empty/broken image URL. Add optimized photos under `public/images/`; use `/images/...` paths, actual positive pixel dimensions, descriptive nonempty alt text, and optional captions. Describe the visible item/design without inventing personalization details or repeating marketing copy. The first image is the primary image; remaining images are ordered gallery examples.
- **Categories:** Category labels are provisional. Each product references an existing category ID. Future public filters should omit categories with no published products; the all-items view should show a useful empty state when no products are published.
- **Publication:** All seed products remain `published: false`. `featured` expresses homepage selection intent only; it never overrides publication. Before publishing, replace sample names/descriptions, approve category labels, prices or quote-only treatment, photos/permissions and alt text, and remove sample wording.
- **Ordering:** Explicit numeric display order controls merchandising order. Catalog access functions should use a deterministic ID tie-breaker and must not mutate source arrays.

## Verification and remaining work

TypeScript validates content shapes; publication review must also verify unique IDs/slugs, category references, valid integer prices, asset existence/dimensions, and approved content. Run `npm test` for the M2-01 selector and content-integrity checks. The current draft-visibility test deliberately asserts that repository records are unpublished; update that expectation when approved content is intentionally published. Public cards, filters, detail pages, and galleries belong to later showcase issues.

Owner-approved photos, actual product descriptions, category names, and starting prices remain content dependencies. This issue introduces no database, CMS, or public preview route.

## Product listing and cards (M2-02)

`/products` now uses `getPublishedProducts()` and `getPublishedCategories()` to supply the reusable `ProductGrid` and `ProductCard` components under `src/components/products/`. Components accept selected records through props; do not pass raw drafts. Import `src/components/products/products.css` in any route that reuses them. Page copy is in `src/content/catalog-page.ts`.

Cards display the first approved image, or a photo-pending placeholder when `images` is empty. The shared price formatter handles integer cents, unknown prices, and a real zero. All cards generate `/products/[slug]` links; publishing records still depends on M2-04 replacing the current detail-route 404 placeholder. The public listing remains empty until content is approved and published. Category filtering is separate M2-03 work.

Run `npm test` to verify populated card markup using isolated fixtures. These fixtures are not public catalog entries and do not change publication state. Real-device layout, photo loading, and end-to-end product links must also be verified when real catalog content is ready.

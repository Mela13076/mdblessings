# Catalog content contracts and seed examples

Issue: M0-03 (#3). These are development contracts, not approved catalog content.

## Files and boundaries

- `src/types/product.ts`: Product, Category, and ProductImage contracts.
- `src/content/categories.ts`: provisional category labels and stable identifiers.
- `src/content/products.ts`: 11 provisional records, currently published for developer-authorized testing, including additional apparel and drinkware samples.
- `src/lib/catalog.ts`: public catalog access functions for Server Components.
- `src/lib/catalog-selectors.ts`: pure selection logic exercised by unit tests.

Content stays outside JSX. Public pages should consume the published-only catalog access functions implemented in M2-01 (#6), including product-by-slug lookup. Do not import raw content arrays or the content-backed catalog module into Client Components; select published records in Server Components and pass those records through props. Drafts must not appear in metadata, static route generation, or a client bundle. The existing homepage layout samples remain separate from catalog records until the product UI is implemented.

## Catalog access

Import from `@/lib/catalog` in Server Components:

| Function | Result |
| --- | --- |
| `getPublishedProducts(categorySlug?)` | Published products sorted by display order, then ID; optionally limited to a category slug. |
| `getFeaturedProducts()` | Published featured products in the same order. |
| `getProductBySlug(slug)` | Exact, case-sensitive published match; otherwise `undefined`. |
| `getPublishedCategories()` | Categories containing published products, sorted by display order, then ID. |

All list results are fresh arrays with readonly TypeScript return types. Selectors do not mutate source arrays; returned records are shared references, not deep-frozen copies. The developer enabled the existing records and authorized additional published samples for filter testing. An empty published catalog remains an ordinary empty state, not an error. A later product detail route should call `notFound()` when slug lookup returns `undefined`.

The new product types are based on the developer's requested list. Category assignments, descriptions, and options are provisional; new sample prices remain `null` and images remain `[]`. The developer’s existing shirt price of 2500 cents is preserved as provisional test content. Existing shirt/tumbler/keepsake IDs and slugs are preserved. DTF remains a single draft type until image/print formats are confirmed; no unapproved service or material claims are implied.

## Content decisions

- **Identifiers:** Keep IDs and slugs unique and stable when renaming products. A product type can have many ordered example photographs; each photograph is not a separate product.
- **Prices:** Use nonnegative safe integer USD cents for approved starting prices. `null` means unknown or unapproved; never substitute zero or invent a price. Future UI should show “Request a quote” for null, and “Starting at” plus a currency-formatted amount for approved numbers. Always explain that the owner confirms final pricing. A real zero must not be treated as missing through a truthiness check.
- **Images:** Empty arrays are intentional until approved assets exist. Future UI should show a neutral missing-image state without rendering an empty/broken image URL. Add optimized photos under `public/images/`; use `/images/...` paths, actual positive pixel dimensions, descriptive nonempty alt text, and optional captions. Describe the visible item/design without inventing personalization details or repeating marketing copy. The first image is the primary image; remaining images are ordered gallery examples.
- **Categories:** Category labels are provisional. Each product references an existing category ID. Future public filters should omit categories with no published products; the all-items view should show a useful empty state when no products are published.
- **Publication:** The current samples are published for explicitly authorized testing, and the listing displays a preview notice. This is not owner approval for production; review, replace, or unpublish sample content before launch. `featured` expresses homepage selection intent only; it never overrides publication. Before publishing, replace sample names/descriptions, approve category labels, prices or quote-only treatment, photos/permissions and alt text, and remove sample wording.
- **Ordering:** Explicit numeric display order controls merchandising order. Catalog access functions should use a deterministic ID tie-breaker and must not mutate source arrays.

## Verification and remaining work

TypeScript validates content shapes; publication review must also verify unique IDs/slugs, category references, valid integer prices, asset existence/dimensions, and approved content. Run `npm test` for the M2-01 selector and content-integrity checks. Tests now respect current publication flags and separately verify unpublished exclusion using isolated fixtures. Listing/cards and filters are implemented; detail pages and galleries remain M2-04 work.

Owner-approved photos, actual product descriptions, category names, and starting prices remain content dependencies. This issue introduces no database, CMS, or public preview route.

## Product listing and cards (M2-02)

`/products` now uses `getPublishedProducts()` and `getPublishedCategories()` to supply the reusable `ProductGrid` and `ProductCard` components under `src/components/products/`. Components accept selected records through props; do not pass raw drafts. Import `src/components/products/products.css` in any route that reuses them. Page copy is in `src/content/catalog-page.ts`.

Cards display the first approved image, or a photo-pending placeholder when `images` is empty. The shared price formatter handles integer cents, unknown prices, and a real zero. All cards generate `/products/[slug]` links; publishing records still depends on M2-04 replacing the current detail-route 404 placeholder. Published test samples currently appear in the listing. Category filtering is implemented in M2-03; detail pages remain a prerequisite for production publication.

Run `npm test` to verify populated card markup using isolated fixtures. These fixtures are not public catalog entries and do not change publication state. Real-device layout, photo loading, and end-to-end product links must also be verified when real catalog content is ready.

## Category filtering (M2-03)

Category links use `/products?category=<category-slug>`. The server reads `searchParams`, calls `getPublishedProducts(categorySlug)`, and renders only that category's published records. No new Client Component or dependency is needed. URLs support refresh, sharing, native links, and browser back/forward. An empty category query shows all products; a repeated query uses its first value; unknown or draft-only categories return no results with an All products reset link.

Filter options come from `getPublishedCategories()` and therefore exclude categories with no published products. The selected link has `aria-current="page"`, a distinct filled style, and at least a 44px touch target. Links wrap on small screens. Results display a product count.

For local testing, Apparel has the existing shirt plus published hoodie and long-sleeve shirt samples; Drinkware has the existing tumbler plus a published mug sample. Memorial items already has two records. All 11 current records are visible under All products. The three new samples are explicitly labeled and have no invented prices or photos. Keep the catalog preview notice until owner approval replaces the sample content.

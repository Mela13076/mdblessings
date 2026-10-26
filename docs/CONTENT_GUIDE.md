# Catalog content contracts and seed examples

Issue: M0-03 (#3). These are development contracts, not approved catalog content.

## Files and boundaries

- `src/types/product.ts`: Product, Category, and ProductImage contracts.
- `src/content/categories.ts`: provisional category labels and stable identifiers.
- `src/content/products.ts`: three unpublished, explicitly labeled sample records.

Content stays outside JSX. Public pages should consume the published-only catalog access functions scheduled in M2-01 (#6), including product-by-slug lookup. Do not import these raw arrays into public pages or expose drafts through metadata, static route generation, or a client bundle. No public UI is wired to these examples in M0-03.

## Content decisions

- **Identifiers:** Keep IDs and slugs unique and stable when renaming products. A product type can have many ordered example photographs; each photograph is not a separate product.
- **Prices:** Use nonnegative safe integer USD cents for approved starting prices. `null` means unknown or unapproved; never substitute zero or invent a price. Future UI should show “Request a quote” for null, and “Starting at” plus a currency-formatted amount for approved numbers. Always explain that the owner confirms final pricing. A real zero must not be treated as missing through a truthiness check.
- **Images:** Empty arrays are intentional until approved assets exist. Future UI should show a neutral missing-image state without rendering an empty/broken image URL. Add optimized photos under `public/images/`; use `/images/...` paths, actual positive pixel dimensions, descriptive nonempty alt text, and optional captions. Describe the visible item/design without inventing personalization details or repeating marketing copy. The first image is the primary image; remaining images are ordered gallery examples.
- **Categories:** Category labels are provisional. Each product references an existing category ID. Future public filters should omit categories with no published products; the all-items view should show a useful empty state when no products are published.
- **Publication:** All seed products remain `published: false`. `featured` expresses homepage selection intent only; it never overrides publication. Before publishing, replace sample names/descriptions, approve category labels, prices or quote-only treatment, photos/permissions and alt text, and remove sample wording.
- **Ordering:** Explicit numeric display order controls merchandising order. Catalog access functions should use a deterministic ID tie-breaker and must not mutate source arrays.

## Verification and remaining work

TypeScript validates content shapes; publication review must also verify unique IDs/slugs, category references, valid integer prices, asset existence/dimensions, and approved content. Runtime catalog selectors and their focused behavior tests belong to M2-01. Public cards, filters, detail pages, and galleries belong to later showcase issues.

Owner-approved photos, actual product descriptions, category names, and starting prices remain content dependencies. This issue introduces no database, CMS, or public preview route.

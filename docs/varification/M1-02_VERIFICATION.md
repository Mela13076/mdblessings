# M1-02 homepage implementation

Issue: [#5 — Implement polished homepage](https://github.com/Mela13076/mdblessings/issues/5)

## Scope and references

Read `AGENTS.md`, the PRD, technical design, roadmap, content guide, and design guidelines. Inspected `design/wireframes/HomePage.png` and the branding references. The existing user-selected `public/Logo.png` remains in the shared shell.

The homepage follows the reference order: hero, category preview, featured creations, story teaser, and quote CTA. Testimonials are omitted until genuine permissioned content exists. No approved social/contact URLs are available, so none are invented.

## Implementation decisions

- Server-rendered homepage with no additional client components, dependencies, or services.
- `src/content/home.ts` contains explicitly provisional layout-review copy, separate from JSX and from catalog records. The page prominently labels its design-preview status.
- Neutral, labeled image placeholders are used because no approved product or family photos are in `public/`. Decorative line icons are hidden from assistive technology; the placeholder captions remain readable.
- Category tiles and featured examples are noninteractive layout samples. They do not publish the unpublished catalog seed data, imply available products/prices, or link to unimplemented filters/detail pages. The working catalog links go to `/products`; replace the samples with published-only catalog content during the product showcase work.
- Desktop: split hero/story, four category columns, three featured columns. Mobile: stacked hero/story, two category columns, featured horizontal overflow with part of the next card visible. The scroll region is named and keyboard-focusable.
- Proposed cream/champagne tokens, limited blush panels, and thin gold accents follow the guidelines. System typography remains provisional with the existing shell.
- Quote CTAs go to `/request`; copy clearly states the form is not available yet and an inquiry is not a confirmed order. Local pickup and personally confirmed pricing remain explicit.
- No autoplay or animation. Use the ordinary hero/bottom inquiry links; floating CTA and theme control remain deferred as previously documented.

## Verification (2026-10-27)

- ESLint passed.
- Next.js route type generation and TypeScript passed.
- Diff whitespace check passed.
- Reviewed source for heading order, link destinations, labeled placeholders, semantic lists/sections, draft-data isolation, and reduced-motion behavior.
- Calculated all homepage foreground/background text pairs: minimum contrast 4.63:1 (muted text on blush), exceeding WCAG AA's 4.5:1 requirement for normal text. Decorative gold is not used as small text.
- Production build remains blocked in this execution environment: Turbopack's CSS worker cannot bind a local process port (`Operation not permitted`). The elevated retry produced the same error. The developer's previous successful build was for M1-01, not this change.
- Visual browser verification remains pending: Chrome's localhost tab initially showed connection refused; subsequent UI interaction was blocked by the computer-use tool's stale-app-state guard. No rendered mobile/desktop comparison is claimed.

## Review before closing

### Follow-up: oversized placeholder icons

The developer's screenshot exposed missing homepage styles. Inspection of `.next/dev` output confirmed that the broad `*.css` Tailwind loader emitted unscoped styles and an empty CSS Module export map. Restricted that loader to `globals.css` so homepage modules use Next.js's native CSS Module processing. Added intrinsic 48×48 SVG dimensions and explicit media-icon bounds as a fallback. Lint, typecheck, and whitespace checks pass; restart the dev server after this configuration change and refresh to verify the rendered correction.

1. Run `npm run build` locally and review `npm run dev` at 375px, 768px, 1024px, and 1440px, plus 320px and 200% zoom. Confirm no page overflow, hero/story stacking, category columns, and desktop featured grid.
2. At mobile width, swipe through the featured previews, then focus the scroll region with Tab and use arrow keys. Confirm all cards can be reached and focus is visible.
3. Follow Explore creations, View all products, Read our story, and both quote links. Recheck the existing mobile menu and footer on the longer homepage.
4. Owner/developer review the proposed colors, typography, and sample copy. Replace the placeholder photos, category examples, featured examples, and story copy with approved content before launch; remove the preview banner only when that review is complete.

The page is ready for local design review, with build/browser verification and owner content approval still outstanding.

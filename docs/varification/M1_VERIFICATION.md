# Milestone 1 — Site foundation verification

One verification document for all Milestone 1 issues. Keep each issue’s implementation, checks, and remaining review notes in its section below.

## Issue status

| Issue | Outcome | Status |
| --- | --- | --- |
| [M1-01 (#4)](https://github.com/Mela13076/mdblessings/issues/4) | Responsive global shell | Developer confirmed working routes, header/footer, mobile menu, and local build. |
| [M1-02 (#5)](https://github.com/Mela13076/mdblessings/issues/5) | Homepage | Developer marked the scoped issue complete; production content approval remains outstanding. |

The records below distinguish checks performed during implementation from later developer confirmation. Milestone acceptance does not replace final accessibility, content, inquiry-delivery, and production launch QA.

## M1-01 global shell verification

Issue: [#4 — Build responsive global shell](https://github.com/Mela13076/mdblessings/issues/4)

### Implemented

- Shared header/footer, Home/Products/Our Story/FAQ/Contact navigation, and `/request` CTA.
- Mobile disclosure below 64rem; full navigation on desktop. The disclosure uses normal links and tab order, with expanded-state announcements, Escape dismissal and focus return. It closes on link activation and resets on route changes.
- One main landmark, visible keyboard focus, active-page indication, and touch targets of at least 44px. A skip-to-content link was implemented but is currently commented out in the root layout; restoring and verifying it remains an accessibility follow-up.
- Clearly labeled preview destinations; no form submission, invented contact links, social accounts, prices, policies, or testimonials. Product-detail URLs and unknown routes return not-found content.
- Centralized business identity/navigation and explicit quote-only/local-pickup wording.

The supplied homepage and interior-page wireframes guide the header/footer hierarchy. The user-selected `public/Logo.png` asset is used unchanged through Next.js Image in both header and footer, with its square aspect ratio preserved. Both design-folder logo variants and business-card references were inspected. Colors follow the proposed light palette. System serif/sans fonts are provisional; final visual approval is outstanding. Dark theme/control and floating mobile CTA remain deferred; neither is needed to operate this shell. Business-card contact details remain unpublished pending confirmation as required by the PRD.

### Automated checks (2026-10-26)

- ESLint passed.
- Next.js route type generation and TypeScript passed.
- Diff whitespace check passed.
- Production build blocked: Turbopack CSS processing cannot bind its local process port (`Operation not permitted`). Retrying with elevated permissions produced the same error. Re-run `npm run build` in a local environment that permits it.

### Manual verification and remaining release checks

The developer confirmed the shell, preview routes, and smaller-screen menu work. The detailed checks below were not individually recorded as passed; retain them for release QA.

- At 375px, 768px, 1024px, and 1440px, check header/footer alignment, readable text, and no horizontal overflow. Also check 320px and 200% zoom.
- Tab from page load: skip link becomes visible and moves focus to main content. Focus rings remain visible on every control.
- On mobile, use Enter and Space on Menu. Verify `aria-expanded`, tab through the revealed links, press Escape, and confirm focus returns to Menu. Closed links must be absent from tab order. Repeat with touch.
- Follow each navigation/CTA link, including activating the current route; confirm the menu closes and the destination loads. Check browser back/forward and mobile-to-desktop resizing.
- On desktop, verify all links are visible, the mobile button is hidden, and active-page indication is correct.
- Check all six primary routes (`/`, `/products`, `/about`, `/faq`, `/contact`, `/request`) render within the shared shell, plus unknown-route/product-slug 404 behavior.
- Check reduced-motion settings and light palette contrast, including focus indicators and button text.

Developer follow-up confirmed working header/footer, preview routes, mobile navigation, and a successful local production build. The build restriction above records the agent environment, not the developer’s local result. Detailed accessibility and final branding checks remain release QA items.

## M1-02 homepage implementation

Issue: [#5 — Implement polished homepage](https://github.com/Mela13076/mdblessings/issues/5)

### Scope and references

Read `AGENTS.md`, the PRD, technical design, roadmap, content guide, and design guidelines. Inspected `design/wireframes/HomePage.png` and the branding references. The existing user-selected `public/Logo.png` remains in the shared shell.

The homepage follows the reference order: hero, category preview, featured creations, story teaser, and quote CTA. Testimonials are omitted until genuine permissioned content exists. No approved social/contact URLs are available, so none are invented.

### Implementation decisions

- Server-rendered homepage with no additional client components, dependencies, or services.
- `src/content/home.ts` contains explicitly provisional layout-review copy, separate from JSX and from catalog records. The page prominently labels its design-preview status.
- Neutral, labeled image placeholders are used because no approved product or family photos are in `public/`. Decorative line icons are hidden from assistive technology; the placeholder captions remain readable.
- Category tiles and featured examples are noninteractive layout samples. They do not publish the unpublished catalog seed data, imply available products/prices, or link to unimplemented filters/detail pages. The working catalog links go to `/products`; replace the samples with published-only catalog content during the product showcase work.
- Desktop: split hero/story, four category columns, three featured columns. Mobile: stacked hero/story, two category columns, featured horizontal overflow with part of the next card visible. The scroll region is named and keyboard-focusable.
- Proposed cream/champagne tokens, limited blush panels, and thin gold accents follow the guidelines. System typography remains provisional with the existing shell.
- Quote CTAs go to `/request`; copy clearly states the form is not available yet and an inquiry is not a confirmed order. Local pickup and personally confirmed pricing remain explicit.
- No autoplay or animation. Use the ordinary hero/bottom inquiry links; floating CTA and theme control remain deferred as previously documented.

### Verification (2026-10-27)

- ESLint passed.
- Next.js route type generation and TypeScript passed.
- Diff whitespace check passed.
- Reviewed source for heading order, link destinations, labeled placeholders, semantic lists/sections, draft-data isolation, and reduced-motion behavior.
- Calculated all homepage foreground/background text pairs: minimum contrast 4.63:1 (muted text on blush), exceeding WCAG AA's 4.5:1 requirement for normal text. Decorative gold is not used as small text.
- Production build remains blocked in this execution environment: Turbopack's CSS worker cannot bind a local process port (`Operation not permitted`). The elevated retry produced the same error. The developer's previous successful build was for M1-01, not this change.
- Visual browser verification remains pending: Chrome's localhost tab initially showed connection refused; subsequent UI interaction was blocked by the computer-use tool's stale-app-state guard. No rendered mobile/desktop comparison is claimed.

### Review before closing

#### Follow-up: oversized placeholder icons

The developer's screenshot exposed missing homepage styles. Inspection of `.next/dev` output confirmed that the broad `*.css` Tailwind loader emitted unscoped styles and an empty CSS Module export map. Restricted that loader to `globals.css` so homepage modules use Next.js's native CSS Module processing. Added intrinsic 48×48 SVG dimensions and explicit media-icon bounds as a fallback. Lint, typecheck, and whitespace checks pass; restart the dev server after this configuration change and refresh to verify the rendered correction.

1. Run `npm run build` locally and review `npm run dev` at 375px, 768px, 1024px, and 1440px, plus 320px and 200% zoom. Confirm no page overflow, hero/story stacking, category columns, and desktop featured grid.
2. At mobile width, swipe through the featured previews, then focus the scroll region with Tab and use arrow keys. Confirm all cards can be reached and focus is visible.
3. Follow Explore creations, View all products, Read our story, and both quote links. Recheck the existing mobile menu and footer on the longer homepage.
4. Owner/developer review the proposed colors, typography, and sample copy. Replace the placeholder photos, category examples, featured examples, and story copy with approved content before launch; remove the preview banner only when that review is complete.

The developer subsequently marked M1-02 complete. The detailed build/browser results above remain the implementation-time record; no additional individual checks are claimed. Owner-approved production content and final branding remain launch dependencies.

# M1-01 global shell verification

Issue: [#4 — Build responsive global shell](https://github.com/Mela13076/mdblessings/issues/4)

## Implemented

- Shared header/footer, Home/Products/Our Story/FAQ/Contact navigation, and `/request` CTA.
- Mobile disclosure below 64rem; full navigation on desktop. The disclosure uses normal links and tab order, with expanded-state announcements, Escape dismissal and focus return. It closes on link activation and resets on route changes.
- Skip-to-content link, one main landmark, visible keyboard focus, active-page indication, and touch targets of at least 44px.
- Clearly labeled preview destinations; no form submission, invented contact links, social accounts, prices, policies, or testimonials. Product-detail URLs and unknown routes return not-found content.
- Centralized business identity/navigation and explicit quote-only/local-pickup wording.

The supplied homepage and interior-page wireframes guide the header/footer hierarchy. The user-selected `public/Logo.png` asset is used unchanged through Next.js Image in both header and footer, with its square aspect ratio preserved. Both design-folder logo variants and business-card references were inspected. Colors follow the proposed light palette. System serif/sans fonts are provisional; final visual approval is outstanding. Dark theme/control and floating mobile CTA remain deferred; neither is needed to operate this shell. Business-card contact details remain unpublished pending confirmation as required by the PRD.

## Automated checks (2026-10-26)

- ESLint passed.
- Next.js route type generation and TypeScript passed.
- Diff whitespace check passed.
- Production build blocked: Turbopack CSS processing cannot bind its local process port (`Operation not permitted`). Retrying with elevated permissions produced the same error. Re-run `npm run build` in a local environment that permits it.

## Browser checks still required

No connected browser was available during implementation; these are pending, not recorded as passed.

- At 375px, 768px, 1024px, and 1440px, check header/footer alignment, readable text, and no horizontal overflow. Also check 320px and 200% zoom.
- Tab from page load: skip link becomes visible and moves focus to main content. Focus rings remain visible on every control.
- On mobile, use Enter and Space on Menu. Verify `aria-expanded`, tab through the revealed links, press Escape, and confirm focus returns to Menu. Closed links must be absent from tab order. Repeat with touch.
- Follow each navigation/CTA link, including activating the current route; confirm the menu closes and the destination loads. Check browser back/forward and mobile-to-desktop resizing.
- On desktop, verify all links are visible, the mobile button is hidden, and active-page indication is correct.
- Check all six primary routes (`/`, `/products`, `/about`, `/faq`, `/contact`, `/request`) render within the shared shell, plus unknown-route/product-slug 404 behavior.
- Check reduced-motion settings and light palette contrast, including focus indicators and button text.

M1-01 remains pending production build and browser verification. Owner approval of final visual branding is also outstanding.

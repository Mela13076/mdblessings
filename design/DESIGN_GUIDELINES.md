# MDBlessings — Design Guidelines

**Status:** Proposed visual baseline; owner approval and final asset selection pending  
**Project:** Mimi's Divine Blessings (MDBlessings)  
**Scope:** V1 public showcase and custom-order inquiry website

## 1. Purpose and source of truth

This document tells developers and Codex how to interpret the supplied design references. It is a visual implementation guide, **not** a replacement for product requirements.

Use this precedence when references disagree:

1. `docs/PRD.md` — functional scope, customer journeys, approved content, and business constraints.
2. `docs/TECHNICAL_DESIGN.md` — architecture and technical boundaries.
3. This document — visual direction, design tokens, responsive behavior, and approved layout decisions.
4. `design/wireframes/` — visual references for structure and section hierarchy.
5. `design/branding/` — official logo and collateral for brand appearance; do not infer functionality from them.

`docs/ROADMAP.md` tracks implementation milestones and acceptance criteria. Do not introduce V2 features to match a decorative reference.

## 2. Reference assets and interpretation

Expected repository organization (filenames are suggestions; adjust to actual committed assets):

```text
design/
  DESIGN_GUIDELINES.md
  wireframes/
    homepage-desktop-mobile.png
  branding/
    mdb-logo.png
    business-card-reference.png
```

- **Homepage wireframe:** Primary reference for homepage section ordering, relative layout, and desktop/mobile relationships. Grayscale blocks are image placeholders, not final styling.
- **Official logo:** Primary reference for brand identity, ornate gold details, and faith-inspired symbolism. Use the real approved asset; do not recreate or alter the mark without approval.
- **Business cards:** Inspiration for cream, gold, blush pink, warmth, and elegant ornamentation. They are *not* a literal website layout template.
- **Example headings, prices, category names, photos, testimonials, social icons, and marketing copy shown in wireframes are placeholders**, not owner-approved facts.
- Decorative hearts, search/favorite icons, slide indicators, and social platforms in a reference are **not requirements**. Do not add features simply because they appear in an image.

## 3. Brand character

**Elegant, welcoming, feminine, warm, faith-inspired, handcrafted, and quietly luxurious.**

Design for customers seeking personalized shirts, tumblers, memorial items, sports-related creations, gifts, and other custom merchandise. Balance the detailed logo with restrained interfaces, clear product photography, and generous whitespace. The site should feel personal and trustworthy, not like a generic checkout-driven marketplace.

### Visual principles

- Cream-first and gold-led in light mode; deep plum/burgundy and champagne gold in dark mode.
- Blush pink is a supporting accent, not a dominant background everywhere.
- Gold should feel refined: thin rules, selected borders, icon accents, small ornaments, and deliberate emphasis.
- Use consistent spacing, readable typography, subtle rounded corners, and soft rather than heavy shadows.
- Product photos should remain visually accurate: **do not apply dark-mode filters to merchandise photos**.
- Avoid excessive gradients, metallic textures, glitter, animation, or ornate decoration on every component.

## 4. Color system

These are **proposed web design tokens inspired by the branding**, not exact sampled logo colors. Review them against actual logo files and obtain owner approval before treating them as final.

### Light mode — Gold-first

| Token | Hex | Intended use |
|---|---|---|
| `background` | `#FFF9F1` | Warm cream page background |
| `surface` | `#FFFDF9` | Cards, forms, and elevated panels |
| `surface-accent` | `#F3E6CE` | Champagne-toned featured sections |
| `pink-soft` | `#F6D7DE` | Small decorative areas, special callouts |
| `gold` | `#D4A64C` | Decorative gold lines and details |
| `gold-strong` | `#A66C35` | Stronger gold/brown accent and links when contrast permits |
| `foreground` | `#4A3028` | Main headings and body text |
| `muted-foreground` | `#715D52` | Secondary text |
| `border` | `#E4D1B5` | Subtle dividers and card borders |
| `primary` | `#4A3028` | Primary filled CTA |
| `primary-foreground` | `#FFF9F1` | Text on primary CTA |
| `plum-optional` | `#805365` | Optional limited cross-theme accent |

### Dark mode — Burgundy & Plum

| Token | Hex | Intended use |
|---|---|---|
| `background` | `#24151F` | Deep plum page background |
| `surface` | `#2D1B28` | Cards and raised content |
| `surface-accent` | `#39212F` | Burgundy alternate sections |
| `pink-soft` | `#D9A8B9` | Muted dusty pink highlights |
| `gold` | `#E2BE79` | Champagne gold accents and buttons |
| `foreground` | `#FFF3E8` | Main ivory text |
| `muted-foreground` | `#D7C0CB` | Secondary text |
| `border` | `#71505E` | Dividers and outlined cards |
| `primary` | `#E2BE79` | Primary filled CTA |
| `primary-foreground` | `#24151F` | Text on primary CTA |

Use **semantic theme variables** (e.g., `background`, `foreground`, `surface`, `primary`, `border`) in Tailwind/CSS rather than scattering raw hex values throughout components. Keep the same component hierarchy, spacing, and typography in both themes. Verify WCAG contrast for every actual text/background and focus combination; decorative gold is not automatically suitable for small text. Prefer a clearly visible focus ring and readable solid-color buttons over metallic gradients.

**Theme behavior:** Implement both themes when scheduled in V1 work. A user-accessible theme control should support light/dark selection; system preference can provide the initial choice, and user selection should persist when feasible. Prevent a flash of the wrong theme where practical. The control must be keyboard and screen-reader accessible. If adding the theme mechanism threatens the launch schedule, keep tokens ready and defer the toggle explicitly rather than silently expanding scope.

## 5. Typography

- **Headings:** Cormorant Garamond (preferred) or Playfair Display, subject to actual rendering review.
- **Body/UI:** DM Sans (preferred) or Nunito Sans.
- Use no more than two principal font families; use the official logo artwork for ornate lettering rather than trying to reproduce it with a body font.
- Maintain readable line lengths and a clear hierarchy. Body text should generally be at least 16px at normal reading sizes; do not shrink important information to match a wireframe screenshot.
- Use consistent heading levels, line height, and text wrapping across screen sizes.
- Fonts are proposed until owner/developer sign-off.

## 6. Homepage information architecture

The homepage order is:

1. **Header/navigation:** Official brand mark, Home, Products, Our Story, FAQ, Contact, a visible custom-order CTA on desktop, and an accessible mobile menu. Include a theme toggle in a sensible location if implemented.
2. **Hero:** Desktop split layout, text on the left and one strong product photo or a restrained collage on the right. Mobile stacks text and CTAs above imagery. Suggested CTAs: **Explore Creations** (primary discovery action) and **Request a Custom Order** (secondary inquiry action). Copy is subject to owner approval.
3. **Browse by category:** Four prominent category cards in the wireframe, linking to catalog filtering. Final categories are based on the approved catalog; do not invent or force exactly four categories if content differs.
4. **Featured creations:** A small selection of real product types with photo, name, **Starting at** price where approved, and a link to the product detail page. Desktop uses a grid; mobile uses a horizontal scroll region with a partially visible next card and a clear **View All Products** link. Avoid an unnecessary autoplay carousel.
5. **Our Story preview:** Personal photo/workspace/product image, brief owner-approved introduction, and a link to the full story. Respect the family origin and faith inspiration without inventing biographical details.
6. **Testimonials:** Genuine, permissioned customer quotes only. Omit this section gracefully until approved testimonials exist. A simple responsive grid or accessible static presentation is preferable to complex animation.
7. **Custom request CTA:** Short invitation for products not pictured, linking to the chosen inquiry path. Make it clear this is a **request for a quote**, not a confirmed purchase.
8. **Footer:** Approved contact/social links, navigation, brand identity, and appropriate privacy information. Do not publish a private pickup/home address without permission.

### Header and inquiry CTA placement

- Desktop: CTA in header, secondary hero CTA, and bottom-page CTA.
- Mobile: hero and bottom CTA plus a **compact floating inquiry button** after the visitor scrolls past the hero, subject to implementation and accessibility review.
- Floating CTA must not obscure content, overlap browser safe areas or other controls, or interfere with the footer/form. Consider hiding it while the final CTA is visible. If this behavior becomes complex or disruptive, use a simpler non-floating mobile CTA.
- Avoid duplicate CTAs within the same viewport where possible.
- Do not add cart, checkout, favorites, customer login, or order tracking.

## 7. Responsive behavior

- Design mobile-first; use the supplied **375px mobile** and **1440px desktop** wireframes as reference canvases, not fixed device widths.
- Check at intermediate widths and zoom levels; no horizontal page overflow.
- Header: full navigation on desktop; menu button and accessible disclosure/drawer on mobile.
- Hero: two columns on wide screens; stacked on small screens.
- Categories: approximately four columns on wide screens, two on small screens where content fits.
- Featured creations: desktop grid; mobile horizontally scrollable cards with keyboard-accessible navigation and a visible hint of additional content.
- Story: side-by-side image and text on desktop; vertically stacked on mobile.
- Testimonials: responsive cards, with no requirement for a carousel.
- Buttons: touch-friendly, legible, and large enough to activate comfortably.
- Respect reduced-motion preferences; do not auto-rotate hero photos or testimonials.

## 8. Shared components and design tokens

Prefer reusable presentational components only where they serve real V1 use cases:

- `SiteHeader`, `MobileNav`, `SiteFooter`, `ThemeToggle` (if implemented)
- `Button`, `SectionHeading`, `Container`
- `CategoryCard`, `ProductCard`, `ProductImageGallery`
- `TestimonialCard` (only when content exists)
- `InquiryCTA`

Keep catalog data separate from JSX as specified in the technical design. Use stable product slugs, meaningful alt text, and accessible focus states. Avoid premature component libraries or speculative abstractions.

## 9. Product imagery and content fidelity

- Real product photos take priority over illustrations and stock images.
- Prefer consistent crop ratios and neutral photographic backgrounds, but never misrepresent the actual merchandise color or appearance.
- Optimize assets and provide responsive sizes; use alt text describing the product rather than repeating decorative branding.
- Show prices as **starting prices**, not fixed checkout totals. Do not fabricate prices or imply guaranteed availability.
- Only publish business claims, turnaround times, testimonials, contact details, policies, and social accounts approved by the owner.

## 10. Other V1 pages

Homepage styling should establish reusable patterns for:

- `/products`: filterable product catalog with cards, categories, starting prices, and clear empty states.
- `/products/[slug]`: product name, image gallery, description, starting price, and contextual request CTA.
- `/about`: approved family/business story and supporting imagery.
- `/faq`: owner-approved questions and answers.
- `/contact`: contact channels and an inquiry entry point.
- `/request`: only if the selected inquiry mechanism uses an on-site custom form.

Create rough **desktop and mobile** wireframes for the catalog and product-detail pages before closing visual-foundation milestone M0-02. Do not assume homepage wireframes fully specify the other pages.

## 11. Implementation instructions for Codex

1. Read `docs/PRD.md`, `docs/TECHNICAL_DESIGN.md`, `docs/ROADMAP.md`, and this file before implementing a page.
2. Inspect the actual reference assets in `design/wireframes/` and `design/branding/`; report missing assets rather than guessing.
3. Follow the wireframes for section order and responsive structure, and use this document for colors, typography, spacing, and visual tone.
4. Build with the project's approved Next.js, React, TypeScript, and Tailwind setup. Do not add services or dependencies merely to style the site.
5. Keep real business content separate from presentational components. Treat mockup content as placeholders until approved.
6. Make tasteful refinements to spacing, visual rhythm, crop, and responsive layout **without removing required sections or changing the inquiry-based user journey**.
7. Implement accessible controls, clear focus states, responsive images, and reduced-motion support.
8. Compare the rendered site to reference images at approximately 375px and 1440px, and inspect intermediate widths. Fix major layout differences; do not aim for pixel-perfect reproduction of an illustrative wireframe.
9. Validate functionality against the PRD and test keyboard/mobile navigation, product links, theme readability, and inquiry paths as applicable.
10. Ask for approval before introducing major layout changes, unapproved copy, new features, or new brand assets.

## 12. M0-02 approval checklist

- [ ] Owner/developer approve light and dark palettes and typography.
- [ ] Official logo and brand asset filenames/variants confirmed.
- [ ] Desktop and mobile homepage wireframe reviewed.
- [ ] Hero photo/collage direction approved.
- [ ] Homepage categories and featured-product content identified.
- [ ] Mobile floating CTA behavior reviewed for usability and accessibility.
- [ ] Desktop and mobile catalog wireframes created.
- [ ] Desktop and mobile product-detail wireframes created.
- [ ] Semantic design tokens and shared component inventory documented.
- [ ] Owner reviews final visual direction before implementation is considered approved.

**Open decisions:** Actual content/photos/prices, final category labels, official font approval, logo behavior on dark backgrounds, final inquiry delivery method, and whether theme toggle/floating CTA fit V1 implementation time.

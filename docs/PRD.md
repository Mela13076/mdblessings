# MDBlessings — V1 Product Requirements Document

**Status:** Baseline approved for engineering planning; explicitly marked open items remain unresolved  
**Version:** 1.0-draft  
**Last updated:** 2026-10-16  
**Product:** MDBlessings (Mimi's Divine Blessings)

## 1. Product overview

MDBlessings is a small, family-operated custom-merchandise business offering personalized apparel, tumblers, memorial items, hats, stickers, sports-themed products, and other customized goods. The website is a **showcase and inquiry channel**, not an online store. Its purpose is to help customers discover examples of work, understand starting prices, and contact the owner to discuss a potential custom order.

The owner continues to confirm designs, final pricing, payment arrangements, and local pickup personally. A submitted request **is not an accepted or paid order**.

## 2. Goals and success criteria

### Customer goals
- Easily browse approximately **11–30 product types** on mobile or desktop.
- See multiple examples of custom designs for each product type.
- Understand that displayed prices are **starting prices**, subject to a final quote.
- Find a clear path to request a specific product or ask about something not listed.
- Learn the business's story, see genuine testimonials, and find contact/social channels.

### Business goals
- Establish a credible, branded destination to share from Facebook, TikTok, messages, and business cards.
- Reduce repeated explanations by presenting examples, FAQs, and starting prices.
- Preserve the owner's existing person-to-person quotation and fulfillment process.
- Avoid requiring the owner to learn an order-management dashboard in V1.

### Engineering goals
- Ship a maintainable, accessible Next.js website within a constrained part-time development schedule (~2–4 hours/week).
- Practice independent TypeScript, React, routing, component architecture, forms/integrations, testing, and deployment.
- Keep content models separable from UI to support a **future content-management dashboard** without prematurely implementing one.

### Practical launch measures (targets to set after baseline)
- All approved product entries and photos are accurate and viewable.
- Core pages and request paths work on common mobile and desktop widths.
- At least one end-to-end test of the selected inquiry path succeeds, including a failure scenario.
- Owner reviews and approves all published business policies and contact details.

No conversion or traffic target has been agreed yet.

## 3. Users and primary journeys

**Potential customer:** Discovers MDBlessings via social media or referral → opens site → browses category → views product examples and starting price → requests a quote or contacts the owner → owner follows up directly → owner confirms quote/payment/pickup offline.

**Owner:** Shares the site and/or a standalone inquiry link; responds to messages or form notifications; updates products through the developer during V1. In V2, the owner may edit website content using a dashboard.

**Developer:** Maintains static catalog content, image assets, and deployments in V1.

## 4. V1 functional requirements

| ID | Requirement | Acceptance criteria |
|---|---|---|
| FR-01 | Home and global navigation | Responsive header/footer with logo, primary navigation, clear inquiry CTA, and social links; keyboard-accessible navigation. |
| FR-02 | Product catalog | Displays 11–30 product types with photo, name, category, and starting price; users can filter by category; empty state works. |
| FR-03 | Product detail pages | Each product has a stable shareable URL, description, starting price, multiple example photos where available, and product-specific inquiry CTA; invalid slug shows not-found state. |
| FR-04 | General inquiry entry | Customers can request an unlisted custom item from prominent site CTAs. |
| FR-05 | Inquiry experience | Selected form mechanism captures customer name, at least one reliable contact method (email or phone), product/general-request context, quantity when applicable, and customization notes; clearly says this is a request, not a confirmed order. |
| FR-06 | Inquiry distribution | Inquiry link/flow can be shared from social media and accessed from product pages; product context is preserved or prefilled when technically supported. |
| FR-07 | Our Story | Page explains family origin and meaning of MDBlessings using owner-approved copy and imagery. |
| FR-08 | FAQ and contact | Displays owner-approved answers about customization, quotes, turnaround, local pickup, payment, and policies; offers contact/social channels. |
| FR-09 | Testimonials | Displays genuine, permissioned customer feedback in an accessible, responsive carousel or equivalent; hide section gracefully until approved content exists. |
| FR-10 | Search/discoverability basics | Descriptive titles/meta, sensible headings, alt text, shareable URLs, sitemap/robots configuration as appropriate. |

### Inquiry scope clarification
- **No customer reference-image uploads in V1.** Customers may share images with the owner later via their chosen conversation channel.
- **No checkout, cart, customer account, or online payment.**
- **Local pickup only**; exact pickup details are arranged privately.
- The delivery mechanism is **OPEN** pending owner discussion: (A) Google Form → Google Sheet, (B) custom website form → Resend email, or (C) custom website form → Google Sheet; notification add-ons are optional.
- Do **not** assume Google Sheets is an order-management system; it may simply be a request log.
- The final contact fields, Messenger handling, and success/failure behavior depend on the chosen mechanism.

## 5. Nonfunctional requirements

**Accessibility:** Semantic landmarks, keyboard interaction, visible focus, labeled fields, meaningful alt text, adequate contrast, reduced-motion consideration for carousel/animations.

**Performance:** Optimize product images, use responsive sizes, avoid unnecessary client-side JavaScript, and check performance on mobile connections.

**Security/privacy:** Do not commit secrets or private customer data. Protect any server-side form credentials. Apply validation and anti-abuse measures to custom forms. Publish a short privacy notice describing what contact information is collected, where it goes, and how customers can ask about it. Do not publish the owner's private pickup/home address without explicit approval.

**Reliability:** Submission success must reflect the selected provider's actual acknowledgment; show useful error and retry guidance. Avoid promising delivery or response times not approved by the owner.

**Maintainability:** Product records are structured and separate from JSX; components receive data via props/functions; stable slugs and IDs support future migration.

**Responsiveness:** Mobile-first, with testing on phone, tablet, and desktop widths.

## 6. Explicitly out of scope for V1

- Admin/content dashboard; customer or staff authentication.
- Database-backed product catalog; Supabase/Prisma integration.
- Inquiry database, order status management, queue, retry worker, or inventory system.
- Online payments, deposits through site, shipping, shipping rates, cart, checkout.
- Customer-uploaded images and private upload storage.
- Customer accounts, automated order confirmations, and order tracking.
- Reusable multi-client website platform or AI code-review agent.

## 7. Content and policy dependencies

Owner must approve: business story, logo usage, photos, product names/descriptions, starting prices, category names, social/contact links, genuine testimonial quotes and permission, payment methods, quote/deposit process, typical turnaround, cancellation/refund approach, local pickup wording, and privacy notice. Unverified policies should remain unpublished or be labeled as pending.

## 8. Open decisions / blockers

| Decision | Owner | Deadline relative to implementation | Notes |
|---|---|---|---|
| Inquiry delivery: Google Forms/Sheets vs custom form/Resend vs custom form/Sheets | Owner + developer | Before inquiry ticket | Discuss whether owner prefers checking a sheet or receiving email; notification preferences. |
| Customer contact fields and Messenger option | Owner + developer | Before inquiry ticket | Require usable email or phone; Messenger may be supplemental. |
| Visual design system | Developer + owner | Before page styling | Existing logo and cream/gold direction; finalize fonts, colors, assets, mobile mockups. |
| Actual catalog content and media permissions | Owner | Before content population | Confirm 11–30 entries and image quality. |
| Business policies, contact channels, testimonial consent | Owner | Before launch | No invented claims. |
| Domain and hosting details | Developer + owner | Before launch | Vercel proposed; domain not yet selected. |

## 9. V2 direction (not a V1 commitment)

A **content-management dashboard** for adding/editing/hiding products, photos, categories, starting prices, testimonials, and selected site copy. Supabase PostgreSQL, Storage, and Auth are candidates for V2. An **order-management dashboard is not planned** unless the owner later identifies a real operational need.

## 10. Scope change process

New requests are logged as V1-critical, V1-optional, or V2/backlog. Only add to V1 if the feature is essential to a launch goal and its impact on timeline, dependencies, and tests is explicitly reviewed.

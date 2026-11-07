# MDBlessings — Client confirmations

**Last updated:** 2026-10-30  
**Purpose:** Keep client answers, approvals, and outstanding questions in one living document. Start with the inquiry decisions in M3-01; collect catalog and launch information alongside them.

## How to use this file

- Replace `Pending` with the actual answer when received. Use statuses **Pending**, **Proposed**, **Confirmed**, or **Deferred**; a suggestion is not client approval.
- For each confirmed answer, record who approved it and the date in the final column. Do not mark something confirmed just because it exists in sample content or a design reference.
- Keep this file as the detailed confirmation record. When a confirmed decision changes requirements, update [PRD.md](PRD.md), [TECHNICAL_DESIGN.md](TECHNICAL_DESIGN.md), and [ROADMAP.md](ROADMAP.md) as applicable. The PRD remains the product scope authority.
- Record only business details approved for this repository. For a private recipient address or other nonpublic configuration, record “Confirmed; stored in server environment configuration” rather than the value. Never put API keys, passwords, DNS credentials, customer inquiries, or a private pickup address here.
- Confirmation does not mean implementation or verification is complete. Track delivery testing and launch approval separately below.

## Existing V1 baseline

These requirements are already recorded in the project docs; they are not new client answers:

- Showcase and quote inquiries only; submitting a request does not confirm an order.
- Custom on-site form with protected server-side handling and Resend email delivery.
- Customer name and at least one reliable reply method: email or phone.
- General requests and product-specific requests, with product context preserved.
- Local pickup only; the owner confirms design, final price, payment, and pickup personally.
- No customer image uploads, checkout, payments, accounts, inquiry database, or dashboard.

## 1. Email delivery and contact — M3-01

| ID | Information to confirm | Answer / approved value | Status | Approved by / date |
| --- | --- | --- | --- | --- |
| EMAIL-01 | Business inbox that receives inquiries; may its address be published or must it stay server-only? | Pending | Pending | — |
| EMAIL-02 | Sending domain or subdomain, and who can manage its DNS records | Pending | Pending | — |
| EMAIL-03 | Resend account availability and who manages it; record setup status only, no credentials | Pending | Pending | — |
| EMAIL-04 | Sender display name and sender email address on business notifications | Pending | Pending | — |
| EMAIL-05 | Reply workflow: use the customer's supplied email as Reply-To when available; how should phone-only inquiries be handled? | Pending | Pending | — |
| EMAIL-06 | Notification subject format and email content/order | Pending | Pending | — |
| EMAIL-07 | Approved fallback contact channel if the form fails, including exact public address, phone number, or URL | Pending | Pending | — |

## 2. Inquiry form contract — M3-01

| ID | Information to confirm | Answer / approved value | Status | Approved by / date |
| --- | --- | --- | --- | --- |
| FORM-01 | Final required/optional contact fields within the name + email-or-phone baseline; any preferred reply-method choice | Pending | Pending | — |
| FORM-02 | Whether Messenger is offered as supplemental contact; if yes, exact approved URL and instructions | Pending | Pending | — |
| FORM-03 | Product/general-request field wording and whether customers can change the prefilled product | Pending | Pending | — |
| FORM-04 | When quantity is required, whether “not sure” is allowed, and any actual business limits | Pending | Pending | — |
| FORM-05 | Required customization notes and helpful prompts, such as design, color, size, or personalization details | Pending | Pending | — |
| FORM-06 | Any additional essential request fields, such as an optional needed-by date; do not imply availability or guaranteed turnaround | Pending | Pending | — |
| FORM-07 | Approved quote-only and local-pickup wording shown before submission | Pending | Pending | — |
| FORM-08 | Approved submission acknowledgment, failure/retry wording, and fallback instructions; no unapproved response-time promise | Pending | Pending | — |
| FORM-09 | Approved privacy notice: information collected, email handling through Resend, intended use, and contact for privacy questions | Pending | Pending | — |

M3-01 is ready to complete when the applicable email/form decisions are confirmed and reflected in the PRD and technical notes. Actual form implementation is M3-02; real delivery verification is M3-03.

## 3. Real catalog content — M2-05

| ID | Information to confirm | Answer / approved value | Status | Approved by / date |
| --- | --- | --- | --- | --- |
| CATALOG-01 | Final list of approximately 11–30 product types and approved category names | Pending | Pending | — |
| CATALOG-02 | Per-product display name, description, customization options, and category | Pending | Pending | — |
| CATALOG-03 | Per-product starting price in USD or approved quote-only treatment; final price is confirmed by the owner | Pending | Pending | — |
| CATALOG-04 | Approved example photos for each product, permission to publish, and preferred primary/gallery order | Pending | Pending | — |
| CATALOG-05 | Accurate descriptions of photographed items for alt text/captions; any identifying details to remove before publication | Pending | Pending | — |
| CATALOG-06 | Featured products, display order, and final review of product URLs; preserve existing stable IDs/slugs where possible | Pending | Pending | — |

Use [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for the technical content format. The checklist above tracks overall approval; use the table below for individual products. Add rows as information arrives. Do not treat existing preview records as approved.

| Product ID / slug | Approved name / category / description / options | Starting price or quote-only | Approved asset paths / order / alt text | Featured / display order | Status | Approved by / date |
| --- | --- | --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending | Pending | — |

## 4. Branding, story, and trust — M0-02, M4

| ID | Information to confirm | Answer / approved value | Status | Approved by / date |
| --- | --- | --- | --- | --- |
| CONTENT-01 | Exact public business name and preferred spelling | Pending | Pending | — |
| CONTENT-02 | Logo files/variants and permission to use them; final palette, fonts, and overall design approval | Pending | Pending | — |
| CONTENT-03 | Approved homepage introduction and other public marketing copy | Pending | Pending | — |
| CONTENT-04 | Family story, meaning of MDBlessings, and any approved owner/family photos | Pending | Pending | — |
| CONTENT-05 | Public contact details and exact social profile URLs; confirm which channels should appear | Pending | Pending | — |
| CONTENT-06 | Public pickup-area wording; exact pickup arrangements remain private | Pending | Pending | — |
| CONTENT-07 | FAQ answers about customization, quotes, turnaround, payment/deposits, pickup, cancellation/refunds, and other actual policies | Pending | Pending | — |
| CONTENT-08 | Genuine testimonials: exact approved quote, attribution, and permission to publish; otherwise keep section hidden | Pending | Pending | — |

Record longer approved copy below or link to an approved repository file; include the relevant ID and approval date. Do not link to private materials intended to stay outside the repository.

### Approved copy and supporting references

No client-approved copy has been recorded in this file yet.

## 5. Delivery verification and launch — M3-03, M5-03

These items require verification or explicit launch approval beyond collecting answers.

| ID | Confirmation / evidence needed | Result / reference | Status | Verified or approved by / date |
| --- | --- | --- | --- | --- |
| LAUNCH-01 | Approved website domain and hosting choice; identify who manages domain/DNS access without recording credentials | Pending | Pending | — |
| LAUNCH-02 | Resend sender-domain verification and required server environment configuration completed | Pending | Pending | — |
| LAUNCH-03 | Intended business inbox actually receives general and product-specific test inquiries; owner can reply | Pending | Pending | — |
| LAUNCH-04 | Failure/retry/fallback experience verified and privacy notice reviewed; provider acceptance alone is not proof of inbox receipt | Pending | Pending | — |
| LAUNCH-05 | Owner reviews final photos, prices, copy, policies, contact channels, and mobile experience | Pending | Pending | — |
| LAUNCH-06 | Owner/developer explicitly approves production launch | Pending | Pending | — |

## Decision history

Keep a brief record when confirmed answers change so previous decisions do not silently disappear.

| Date | IDs affected | Decision / change | Approved by |
| --- | --- | --- | --- |
| 2026-10-30 | All | Tracker created from existing V1 requirements; no new client answers or approvals recorded. | — |

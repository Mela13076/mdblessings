<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


# AGENTS.md — MDBlessings AI-Assisted Engineering Instructions

**Version:** 1.1 | **Updated:** 2026-10-22 | **Priority:** Deliver a safe, polished V1 efficiently.

## Project context and source of truth

MDBlessings (Mimi's Divine Blessings) is a family custom-merchandise **showcase and quote-inquiry website**, not an e-commerce store. Customers browse examples and request a quote. The owner personally confirms design, price, payment, and **local pickup**. A request is not an accepted order.

Before substantial implementation, consult:
1. `docs/PRD.md` — product goals, approved V1 scope, acceptance criteria and open owner decisions.
2. `docs/TECHNICAL_DESIGN.md` — architecture, data model, integration and design constraints.
3. `docs/ROADMAP.md` — GitHub milestone/issue plan and launch gates.

If a document is absent, use available repository context and report the missing reference rather than inventing specifications. In conflicts, identify the conflict and follow explicit developer direction; otherwise treat the PRD as product scope authority.

## Your role: senior engineer and implementation partner

Implement requested, approved features directly. Act as a pragmatic Next.js/TypeScript full-stack engineer, UI implementer, tester, accessibility reviewer, and code reviewer. The developer is the decision-maker and approves architecture/business changes, but **does not need to write each component**.

- Prefer completing a working vertical slice over stopping at a plan or tutorial.
- Generate and edit real files, routes, types, styles, integrations and relevant tests when implementation is requested.
- Independently decide routine implementation details within approved scope. Explain notable trade-offs concisely.
- Ask only for material unresolved business decisions (e.g., contact details, privacy policy, actual prices, approved photos) that block truthful functionality; continue unblocked work.
- Do not add features outside V1 or change providers, hosting, or architecture without explicit approval.
- Review the resulting diff, run relevant checks, fix issues within scope, and report accurately what passed and what could not be tested.
- Keep the developer informed of significant decisions, without mandatory pedagogical questions or hints.

## Default issue workflow

1. Read the requested GitHub issue, milestone, requirements and dependencies.
2. Inspect existing code and choose the simplest implementation that fits established patterns.
3. Implement the full scoped feature, including loading/empty/error states as appropriate.
4. Add or update proportional tests; check accessibility, mobile layout, performance, and security where applicable.
5. Run project lint/typecheck/build/tests that exist and fix failures introduced by the change.
6. Summarize files changed, design decisions, tests run, manual verification, remaining blockers, and any out-of-scope recommendations.
7. Do **not** commit, push, deploy, or change infrastructure/accounts unless explicitly authorized.

## Operating constraints

- V1: Next.js App Router, React, TypeScript, Tailwind; typed static product data for approximately 11–30 types; optimized assets in the repository; static content maintained by developer.
- V1: custom on-site quote inquiry form, delivered to business email through **Resend** via a protected server-side handler. The owner still needs to confirm recipient email and sending domain; integration is not launch-ready until real delivery is tested.
- Do not implement database, Supabase/Prisma, authentication, checkout, payments, inventory, customer image uploads, or dashboard in V1.
- Keep stable product IDs/slugs and content separate from UI so a future CMS/dashboard migration is manageable, without building a generic framework now.
- Local pickup only; starting prices are not final quotes; do not present inquiries as confirmed orders.
- Vercel is preferred hosting, subject to owner/developer approval and production configuration.
- Never fabricate actual prices, testimonials, business policies, response times, social URLs, contact information, or permissions. Use clearly flagged nonpublic placeholders or omit unapproved public sections.

## Visual direction

Use the provided MDBlessings logo and approved brand assets as design references. Desired aesthetic: welcoming, elegant, faith-inspired; soft blush/pink and cream with restrained gold accents. The logo and sample business card are **references, not automatically approved source files or final color codes**. Confirm exact palette, fonts, logo variants, asset usage and contrast before treating them as final. Prefer mobile-first, accessible, polished layouts rather than generic template styling. Avoid implying unrelated religious guarantees or using unapproved copy.


## Design References

Before implementing or modifying frontend pages:

- Read `design/DESIGN_GUIDELINES.md`.
- Inspect the relevant images in `design/wireframes/`.
- Reference branding assets in `design/branding/`.
- Follow the wireframes for section structure and visual hierarchy.
- Use the PRD for functional requirements.
- Ensure responsive, accessible implementations.
- Compare rendered pages against the references when possible.


## Engineering standards

- **Type safety:** Explicit types for domain content, no unjustified `any`; stable slugs and safe price formatting.
- **React/Next.js:** Prefer server components for static content and narrowly scoped client components for filters/forms/gallery; limit dependencies and client JavaScript.
- **Accessibility:** Semantic markup, visible focus, keyboard operation, form labels, alt text, sufficient contrast, reduced motion.
- **Security/privacy:** Server-side validation, input limits, anti-abuse protection, provider secrets in server environment only, no PII in logs/commits. Acknowledge email-service API acceptance does not guarantee inbox arrival.
- **Testing:** Proportionate unit/integration/manual tests, including invalid slug, mobile navigation, form success and failure, real recipient verification.
- **Performance/SEO:** Optimized images, appropriate metadata and social previews, stable shareable product URLs.

## Scope and decision handling

For requests that imply new scope, briefly identify V1 impact and offer V2/backlog placement. Resolve business-dependent unknowns in `docs/PRD.md` and update technical/roadmap references together after confirmation. Avoid lengthy planning where existing documents suffice.

## Coding Standards and Architectural Principles

### Primary Engineering Goal

Build a clean, production-ready Next.js application that is easy to understand, maintain, and eventually adapt into a reusable small-business website template.

Prioritize simplicity, readability, and maintainability over unnecessary abstractions or advanced architectural patterns.

### Next.js and React Standards

- Follow the official Next.js App Router conventions supported by the installed framework version.
- Prefer Server Components by default and use Client Components only where interactivity or browser APIs require them.
- Keep client-side component boundaries appropriately small.
- Use Next.js routing, layouts, metadata, image optimization, and font optimization where appropriate.
- Use semantic HTML and accessible interaction patterns.
- Avoid unnecessary React state, effects, and global state management.

### Component Architecture

- Create reusable components when functionality or UI patterns are repeated or conceptually distinct.
- Keep page components focused on composition, routing, and page-specific concerns.
- Use clear, descriptive component and variable names.
- Avoid excessively large components and deeply nested JSX.
- Avoid unnecessary component extraction, abstraction layers, or premature generalization.
- Prefer composition and props over complex inheritance or configuration systems.

### TypeScript and Data Organization

- Use TypeScript consistently with meaningful, explicit domain types.
- Avoid `any` unless justified.
- Keep business content and product data separate from UI components.
- Maintain stable product IDs and slugs.
- Keep data access behind small, understandable functions so the static catalog can later migrate to a database.
- Avoid premature database-specific abstractions.

### Code Quality and Maintainability

- Follow DRY principles without sacrificing readability.
- Favor straightforward implementations over clever or overly generic solutions.
- Use established framework features before adding external dependencies.
- Keep functions and components focused on clear responsibilities.
- Add appropriate error handling, validation, and accessibility.
- Avoid introducing unnecessary state-management libraries, providers, services, or architectural layers.
- Ensure code remains understandable to a developer familiar with React, TypeScript, and Next.js.

### Future Template Considerations

MDBlessings is the first implementation of a potential reusable small-business website template.

Design components and content models to make future reuse easier, but do not implement a multi-client platform during V1.

- Separate business branding and content from reusable UI.
- Prefer configurable props and shared design tokens where useful.
- Avoid unnecessarily hardcoding MDBlessings-specific content into generic components.
- Preserve clean boundaries between presentation, content, and integrations.
- Avoid building speculative customization features.
- Do not introduce multi-tenant architecture, dynamic theme builders, or generalized CMS functionality in V1.

### AI Implementation Expectations

When implementing a feature:

1. Review existing code before creating new components or utilities.
2. Reuse established patterns and components where appropriate.
3. Implement the simplest solution that satisfies the approved requirements.
4. Avoid unrelated refactoring or unnecessary dependencies.
5. Run relevant lint, type-checking, build, and testing commands.
6. Summarize significant implementation decisions, changes, and remaining issues.

Do not introduce complexity solely because MDBlessings may become a reusable template in the future.


## Definition of done

The feature meets the issue acceptance criteria; affected routes/functionality work; relevant checks pass or explicit blockers are recorded; accessibility, security and mobile behavior are considered; generated work is understandable, maintainable and reviewable. Final launch additionally requires owner content approval, real inquiry delivery, domain/hosting readiness, and production QA.

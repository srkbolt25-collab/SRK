# SRK Bolt Production Cleanup & SEO Fixes — 24 Sep 2026

## Completed
- Removed obsolete chocolate ecommerce routes: `/shop`, `/collections`, `/cart`, `/checkout`, `/payment`, `/order-confirmation`.
- Removed legacy chocolate assets/data and changed the package name to `srk-bolt`.
- Removed the obsolete Cart provider and legacy ecommerce navbar.
- Centralized product category aliases in `lib/categories.ts` so API and country pages use the same normalization rules.
- Expanded canonical matching for Hook & Eye, Rivets & Inserts, Heavy Load Attachments and Other/Specialty Products.
- Converted blog detail pages to server-rendered pages with slug URLs, canonical metadata, Open Graph metadata, BlogPosting schema and Breadcrumb schema.
- Fixed blog API so slug, meta title, meta description and excerpt are actually persisted.
- Added legacy blog slug backfill and redirect from old ObjectId blog URLs to canonical slug URLs.
- Added editable/stable blog slug field in admin.
- Added dynamic `/sitemap.xml` with static pages, country pages, product pages and blog URLs.
- Added `/robots.txt` and blocked admin/API crawl paths.
- Added human sitemap, Privacy Policy and Website Terms pages so footer links no longer 404.
- Replaced old rupee/free-shipping ecommerce defaults with B2B RFQ/delivery language.
- Replaced Join Us manufacturing-positioning leftovers with sourcing/supply language.
- Removed placeholder social `#` links from the footer and made phone/email clickable.
- Made copyright year dynamic.
- Removed hard-coded legacy admin credentials from client code.
- Added environment-variable admin authentication with HTTP-only 24-hour cookie and middleware protection for the admin dashboard and admin-only API mutations/data access.
- Added admin environment-variable instructions to deployment docs.

## Deployment variables required
- `MONGODB_URI`
- `MONGODB_DB_NAME`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLOUDINARY_FOLDER` (optional)
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_TOKEN`

## Verification
- TypeScript/TSX syntax parse completed successfully across the source tree.
- Local import-resolution scan completed successfully.
- Full Next.js build could not be completed in the sandbox because dependencies were not installed and the dependency-install attempt timed out. Run `npm ci && npm run build` in the deployment/local environment with network/package access before production release.

## URL preservation audit
- Compared all original App Router page URLs with the production-fixed project.
- Existing core public routes remain unchanged.
- Legacy duplicate `/rivets-pin-inserts` permanently redirects to `/rivets`.
- Legacy duplicate `/heavy-load-attachments` permanently redirects to `/attachments`.
- Internal product-category links now point directly to the canonical `/rivets` and `/attachments` URLs.
- Existing blog MongoDB-ID URLs and previous blog slugs permanently redirect to the current canonical blog slug.

## Admin Panel / Dynamic Content Connectivity Audit

- Fixed middleware so public Contact page can GET admin-managed Sales/Purchase contacts while create/update/delete remain admin-only.
- Fixed Careers application flow: public applicants now upload PDF/DOC/DOCX resumes through `/api/applications/upload`; generic `/api/upload` remains admin-only for product/banner/contact media.
- Added 5MB resume validation and Cloudinary raw-document upload under `careers/resumes`.
- Removed an unrelated hard-coded fallback notification inbox from email code. Email delivery now requires `EMAIL_TO`; MongoDB storage continues even when SMTP is not configured.
- Documented SMTP/notification environment variables for Vercel deployment.
- Explicitly marked MongoDB-backed API routes as dynamic so admin edits are not served from stale route-handler cache.
- Product display-name edits now preserve the existing product slug/URL; legacy products without a slug receive one automatically.
- Replaced remaining consumer-style “30-day/no questions asked” returns copy with B2B quotation/order-term wording.
- Fixed banner admin connectivity across all supported pages: dashboard now loads all banners, while public pages still fetch only their own page banners.
- Enforced the 3-banner limit per page (not globally), including safe checks when moving an existing banner to another page.

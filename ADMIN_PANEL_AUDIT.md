# SRK Bolt Admin Panel Connectivity Audit

Audit date: 25 September 2026

## Connected modules

- Admin authentication: `/admin-login` -> `/api/admin/login` -> HTTP-only session cookie -> middleware-protected `/admin-dashboard`.
- Products: admin CRUD uses MongoDB `products`; public category/search/product/country pages read the same collection.
- Blogs: admin CRUD uses MongoDB `blogs`; public blog listing/detail and sitemap read the same records. SEO slug/history support is enabled.
- Banners: admin manages banners for Home, About, Industries, Projects, Brands, Blogs and Careers. Dashboard loads all pages; each public page fetches only its own page banners. Limit is 3 banners per page.
- Contacts: admin CRUD uses MongoDB `contacts`; public Contact page can read Sales/Purchase contacts. Writes remain admin-only.
- Careers/Openings: admin CRUD uses MongoDB `openings`; Careers page reads the same collection.
- Job Applications: public application POST writes MongoDB `applications`; admin dashboard reads/deletes applications. CV upload uses `/api/applications/upload` and Cloudinary raw document storage.
- RFQ Enquiries: public RFQ POST writes MongoDB `rfq_enquiries`; admin dashboard reads the same collection.
- Datasheet Leads: public datasheet request POST writes MongoDB `datasheet_downloads`; admin dashboard reads the same collection.
- Media Uploads: generic `/api/upload` is admin-only for product/banner/contact media.

## Required deployment variables

- `MONGODB_URI`
- `MONGODB_DB_NAME`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_TOKEN`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Recommended for email notifications:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `EMAIL_FROM`
- `EMAIL_TO`

## Fixes made during this audit

1. Public Contact page GET was incorrectly protected by admin middleware. Fixed: contact reads are public; contact writes remain admin-only.
2. Careers CV upload used the admin-only image/video upload endpoint and could not accept PDF/DOC/DOCX. Fixed with a dedicated public resume upload route, file-type validation, 5MB limit, and Cloudinary raw storage.
3. Banner dashboard only loaded Home banners despite managing multiple pages. Fixed all-page admin view and per-page three-banner limits.
4. DB-backed API handlers are explicitly dynamic so admin changes are not served from stale route-handler cache.
5. Product display-name edits now preserve established slugs/URLs.
6. Removed remaining consumer-style return-policy fallback text and an unrelated hard-coded email fallback recipient.

## Verification

- TypeScript syntax transpilation passed for all TS/TSX source files.
- Local `@/` imports resolve to files present in the project.
- Stale chocolate/ecommerce copy scan is clean in application source.
- A full `next build` could not be completed in the sandbox because dependency installation timed out. Run `npm ci && npm run build` in the deployment environment before production release.

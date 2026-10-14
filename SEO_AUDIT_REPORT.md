# SRK Bolts — Technical SEO audit and code correction (15 Oct 2026)

## Scope
Audit based on the available `SRK-Bolts-Admin-Login-Password-Fixed.zip` website source, plus limited web inspection of `https://www.srkbolt.com/`. The latter returned cached HTML rather than a guaranteed current DOM. This is not a Search Console crawl or production Lighthouse test.

## Confirmed issues in supplied code
1. Root metadata declares canonical `/`. Routes without their own `metadata.alternates.canonical` can inherit that homepage canonical. **Fixed:** route-level metadata for public pages and appropriate private-page metadata.
2. Various utility/admin/order routes inherited global `index: true, follow: true`, risking indexation and improper canonical. **Fixed:** route-level `robots: noindex, nofollow` and self-canonical for utility routes. Note that real access security must be addressed by server authentication, not robots tags.
3. Legacy route aliases `/attachments`, `/rivets`, `/finneck-bolt` duplicated other page content. **Fixed:** preferred canonical and `noindex`, without changing links, redirects or user behavior. Further 301 redirects would be beneficial after a usage assessment.
4. Client-fetched blog detail `/blogs/[id]` has no server-rendered article metadata or content. **Mitigation:** noindex until the blog page has server-side article title/description/canonical and crawlable article content. This deliberately avoids indexing an incomplete page; it does not implement server-rendered blog SEO.
5. Legacy `/view-details` pages can be duplicate URLs of `/products/[slug]` and are client/data-driven. **Fixed:** keep noindex and prevent accidental homepage canonical. Exact one-to-one 301 redirects require a validated product slug mapping.
6. Sitemap falsely set `lastModified` to the time of each request for *every* URL. **Fixed:** removed fabricated lastModified timestamps. Also keeps private routes out of the sitemap.
7. `robots.txt` blocked `/view-details` while those pages emitted noindex, so crawlers could not see the noindex directive. **Fixed:** remove that one robots block. Noindex remains on these pages.
8. Unknown dynamic products and countries had metadata without noindex. **Fixed:** noindex for unfound metadata branches; page renderer already calls `notFound()`.

## Existing controls verified in source
- Homepage, main categories, product detail, country and country/category URLs already declare canonical metadata.
- `metadataBase` points to `https://www.srkbolt.com`.
- Sitemap dynamically lists 8 country pages, country/category combinations, and product slugs.
- Product detail output contains Product structured data (validity of descriptions/images and actual data must be separately verified).
- Robots blocks admin and transactional sections.

## Important follow-ups (cannot certify from source ZIP alone)
- Confirm canonical link tag in rendered page-source for each route type after Vercel deployment, including www/non-www and redirected URLs.
- Test deployed `robots.txt` and `sitemap.xml` with HTTP status, MIME type, XML validity and Search Console coverage.
- Run a real crawl for 404s, internal link graph, duplicate titles/H1s, parameter URLs, redirect loops, 3xx chains and crawl depth.
- Validate Product/Organization/Breadcrumb markup with Google Rich Results Test; remove any unverifiable company statistics or offers.
- Server-render and SEO-optimize client-fetched blog article pages, then remove their temporary noindex.
- Confirm actual product photos, external CDN URLs and media rights; no product images were replaced in this patch.
- Evaluate Core Web Vitals and HTTP security/auth independently; SEO patch does not fix insecure dashboard auth.

## Deployment
This is an SEO-only patch: merge files into the same paths in the current GitHub project. Do **not** replace your whole current site with an older project ZIP. Check file changes against your latest branch before merging, because some layouts may have been edited since the audited ZIP.

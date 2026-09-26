# Country Pages Visibility Fix — 2026-09-26

## Existing country product routes verified
- /uae/products
- /saudi-arabia/products
- /qatar/products
- /kuwait/products
- /bahrain/products
- /oman/products
- /iraq/products
- /jordan/products

These routes are served by `app/[country]/products/page.tsx` and use `lib/countryMarkets.ts` for market-specific copy and metadata.

## Visibility/discoverability fixes added
- Added `/countries` landing page listing all supported markets.
- Added desktop **Countries** dropdown in the top bar with direct links to all country product pages.
- Added **Countries We Serve** section with all country links in the mobile menu.
- Added `/countries` to XML sitemap generation.
- Added `All Countries` link to the human-readable sitemap.
- Added `All Countries` link in the footer market links.

## Country targeting
SRK Bolt remains positioned as a UAE-based supplier. UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman are GCC target markets; Iraq and Jordan are regional Middle East supply markets.

# Country Product Pages

Implemented one master product catalogue page per target market without adding "supplier" to the URL:

- /uae/products
- /saudi-arabia/products
- /qatar/products
- /kuwait/products
- /bahrain/products
- /oman/products
- /iraq/products
- /jordan/products

## How it works

- A single dynamic Next.js route powers all eight country pages.
- Each page has unique country-focused SEO copy, metadata, industries, cities, procurement notes and FAQs.
- Existing products are fetched directly from the main MongoDB `products` collection at request time.
- Products are grouped into the existing categories: Bolts, Nuts, Washers, Screws, Hook & Eye, Rivets/Pins/Inserts, Heavy Load Attachments and Other.
- Product cards keep the existing master product URL under `/view-details/<slug>`.
- The country page does not create duplicate country-specific product records or duplicate individual product detail pages.
- WhatsApp enquiry text includes the destination country.
- Existing menu/navigation structure was not changed.
- Footer market names now link to the respective country product pages to avoid orphan pages and improve crawlability.
- Canonical metadata and CollectionPage/Breadcrumb/ItemList JSON-LD are included.

## Positioning

SRK Bolt remains clearly UAE-based. Non-UAE country pages describe regional supply *for* those markets and do not claim a local office in those countries.

## SEO heading rule

- Visible H1 stays clean and does **not** use the word "Supplier": `Industrial Fasteners in <Country>`.
- "Supplier" remains in the SEO title, country intro copy and category H2s such as `Bolts Supplier in <Country>`.
- Country URLs remain unchanged and do not contain "supplier".

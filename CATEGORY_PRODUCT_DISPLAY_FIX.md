# Category product display fix

Fixed category products not appearing consistently on the public category pages.

## Root cause
- Admin saves Rivets as `RIVETS`, while the Rivets & Inserts page was requesting `RIVETS, PIN & INSERTS`.
- Admin saves Heavy Load as `ATTACHMENTS`, while the page was requesting `HEAVY LOAD ATTACHMENTS`.
- Older database entries can also contain alternate labels such as `HOOK AND EYE`, `RIVETS & INSERTS`, `HEAVY LOAD`, or `OTHER PRODUCTS`.
- The products API previously required an exact category string match.

## Fix
- Public Rivets page now requests canonical `RIVETS`.
- Public Heavy Load page now requests canonical `ATTACHMENTS`.
- Products API now maps category aliases and matches them case-insensitively with flexible whitespace.
- Hook & Eye and Other Products now also support common legacy category-name variants.
- Existing BOLTS/NUTS/WASHERS/SCREWS behavior remains compatible.
- Country product pages remain compatible with the same category families.

export const CATEGORY_ALIASES = {
  BOLTS: ["BOLTS", "BOLT"],
  NUTS: ["NUTS", "NUT"],
  WASHERS: ["WASHERS", "WASHER"],
  SCREWS: ["SCREWS", "SCREW"],
  "HOOK & EYE": ["HOOK & EYE", "HOOK AND EYE", "HOOK & EYE PRODUCTS", "HOOK AND EYE PRODUCTS"],
  RIVETS: ["RIVETS", "RIVET", "RIVETS & INSERTS", "RIVETS AND INSERTS", "RIVETS, PIN & INSERTS", "RIVETS, PINS & INSERTS"],
  ATTACHMENTS: ["ATTACHMENTS", "HEAVY LOAD", "HEAVY LOAD ATTACHMENTS", "HEAVY-LOAD ATTACHMENTS"],
  OTHER: ["OTHER", "OTHER PRODUCTS", "OTHER PRODUCT", "SPECIALTY PRODUCTS", "UNCATEGORIZED"],
} as const

export type CanonicalCategory = keyof typeof CATEGORY_ALIASES

export const normalizeCategory = (value: string) => value.trim().toUpperCase().replace(/\s+/g, " ")

const CATEGORY_CANONICAL_LOOKUP = Object.entries(CATEGORY_ALIASES).reduce<Record<string, CanonicalCategory>>(
  (lookup, [canonical, aliases]) => {
    for (const alias of aliases) {
      lookup[normalizeCategory(alias)] = canonical as CanonicalCategory
    }
    return lookup
  },
  {},
)

export function getCanonicalCategory(value: string): CanonicalCategory | string {
  const normalized = normalizeCategory(value)
  return CATEGORY_CANONICAL_LOOKUP[normalized] || normalized
}

export function getCategoryAliases(value: string): readonly string[] {
  const canonical = getCanonicalCategory(value)
  return Object.prototype.hasOwnProperty.call(CATEGORY_ALIASES, canonical)
    ? CATEGORY_ALIASES[canonical as CanonicalCategory]
    : [value.trim()]
}

export function categoryMatches(value: string, canonical: CanonicalCategory) {
  return getCanonicalCategory(value) === canonical
}

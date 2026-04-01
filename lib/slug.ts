/**
 * Converts a product name to a URL-friendly slug with hyphens
 * Example: "DIN 603 Carriage Bolt/ Mushroom Head Bolt" -> "din-603-carriage-bolt-mushroom-head-bolt"
 */
export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    // Replace slashes and backslashes with spaces
    .replace(/[\/\\]/g, ' ')
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove all non-alphanumeric except hyphens
    .replace(/[^a-z0-9-]/g, '')
    // Replace multiple hyphens with single hyphen
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '')
}


/**
 * Converts a slug back to a searchable product name pattern
 * This helps when searching for products by slug
 * Since we removed hyphens, we'll try to match by partial name matching
 */
export function slugToSearchPattern(slug: string): string {
  // Since slugs have no spaces/hyphens, we'll use the slug as-is for searching
  // The API will do partial matching
  return slug.trim()
}


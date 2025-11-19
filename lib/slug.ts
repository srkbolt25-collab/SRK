/**
 * Converts a product name to a URL-friendly slug without hyphens
 * Example: "DIN 603 Carriage Bolt/ Mushroom Head Bolt" -> "din603carriageboltmushroomheadbolt"
 */
export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    // Replace special characters and slashes with spaces
    .replace(/[\/\\]/g, ' ')
    // Replace multiple spaces with single space
    .replace(/\s+/g, ' ')
    // Remove all spaces and special characters, keep only alphanumeric
    .replace(/[^a-z0-9]/g, '')
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


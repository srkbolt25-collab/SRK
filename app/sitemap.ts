import type { MetadataRoute } from "next"
import { countries, seoCategories, siteUrl } from "@/lib/srk-seo"
import { srkProducts } from "@/data/srk-products"
import { createSlug } from "@/lib/slug"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/products", "/bolts", "/nuts", "/washers", "/screws", "/hook-eye", "/rivets-pin-inserts", "/heavy-load-attachments", "/other", "/about", "/industries", "/projects", "/contact", "/rfq", "/countries"]

  return [
    ...staticRoutes.map((route) => ({ url: `${siteUrl}${route}`, changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.8 })),
    ...countries.map((country) => ({ url: `${siteUrl}/countries/${country.slug}`, changeFrequency: "weekly" as const, priority: 0.85 })),
    ...countries.flatMap((country) => seoCategories.map((category) => ({ url: `${siteUrl}/countries/${country.slug}/${category.slug}`, changeFrequency: "weekly" as const, priority: 0.78 }))),
    ...srkProducts.map((product) => ({ url: `${siteUrl}/products/${createSlug(product.name)}`, changeFrequency: "monthly" as const, priority: 0.72 })),
  ]
}

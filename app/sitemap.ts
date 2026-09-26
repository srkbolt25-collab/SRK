import type { MetadataRoute } from "next"
import { getCollection } from "@/lib/mongodb"
import { countryMarkets } from "@/lib/countryMarkets"
import { createSlug } from "@/lib/slug"
import { slugify } from "@/lib/slugify"

const SITE_URL = "https://www.srkbolt.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const staticPaths = [
    "", "/about", "/products", "/bolts", "/nuts", "/washers", "/screws", "/hook-eye",
    "/rivets", "/attachments", "/other", "/industries", "/projects", "/brands", "/blogs",
    "/careers", "/join-us", "/contact", "/rfq", "/countries", "/privacy", "/terms", "/sitemap",
  ]

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/products" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/products" ? 0.9 : 0.7,
  }))

  for (const market of countryMarkets) {
    entries.push({
      url: `${SITE_URL}/${market.slug}/products`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    })
  }

  try {
    const products = await (await getCollection("products"))
      .find({}, { projection: { name: 1, slug: 1, updatedAt: 1 } })
      .toArray()

    for (const product of products) {
      const slug = String(product.slug || createSlug(String(product.name || ""))).trim()
      if (!slug) continue
      entries.push({
        url: `${SITE_URL}/view-details/${slug}`,
        lastModified: product.updatedAt ? new Date(product.updatedAt) : now,
        changeFrequency: "monthly",
        priority: 0.75,
      })
    }

    const blogCollection = await getCollection("blogs")
    const blogs = await blogCollection.find({}, { projection: { title: 1, slug: 1, publishedAt: 1, updatedAt: 1 } }).toArray()

    for (const blog of blogs) {
      let slug = String(blog.slug || "").trim()
      if (!slug) {
        slug = slugify(String(blog.title || "")) || `blog-${blog._id.toString()}`
        let candidate = slug
        let suffix = 2
        while (await blogCollection.findOne({ slug: candidate, _id: { $ne: blog._id } })) {
          candidate = `${slug}-${suffix++}`
        }
        slug = candidate
        await blogCollection.updateOne({ _id: blog._id }, { $set: { slug, updatedAt: new Date().toISOString() } })
      }
      entries.push({
        url: `${SITE_URL}/blogs/${slug}`,
        lastModified: blog.updatedAt || blog.publishedAt ? new Date(blog.updatedAt || blog.publishedAt) : now,
        changeFrequency: "monthly",
        priority: 0.8,
      })
    }
  } catch (error) {
    console.error("Sitemap database entries could not be loaded:", error)
  }

  return entries
}

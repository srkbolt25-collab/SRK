import { ObjectId, type Document } from "mongodb"
import { getCollection } from "@/lib/mongodb"
import { slugify } from "@/lib/slugify"

export type BlogDocument = Document & {
  _id: ObjectId
  title: string
  slug?: string
  previousSlugs?: string[]
  category: string
  content: string
  coverImage?: string
  publishedAt?: string
  metaTitle?: string
  metaDescription?: string
  createdAt?: string
  updatedAt?: string
}

export function blogExcerpt(content: string, maxLength = 160) {
  const plain = content
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/[#>*_`~-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
  return plain.length > maxLength ? `${plain.slice(0, maxLength - 1).trim()}…` : plain
}

export async function getBlogByIdentifier(identifier: string): Promise<BlogDocument | null> {
  const collection = await getCollection("blogs")

  let blog = await collection.findOne({
    $or: [{ slug: identifier }, { previousSlugs: identifier }],
  }) as BlogDocument | null

  if (!blog && ObjectId.isValid(identifier)) {
    blog = await collection.findOne({ _id: new ObjectId(identifier) }) as BlogDocument | null
  }

  // Legacy posts may have been created before slug persistence was fixed.
  if (!blog) {
    const legacyBlogs = await collection.find({ $or: [{ slug: { $exists: false } }, { slug: "" }] }).toArray()
    const legacyMatch = legacyBlogs.find((item) => slugify(String(item.title || "")) === identifier)
    if (legacyMatch) blog = legacyMatch as BlogDocument
  }

  if (blog && !blog.slug) {
    const base = slugify(blog.title) || `blog-${blog._id.toString()}`
    let candidate = base
    let suffix = 2
    while (await collection.findOne({ slug: candidate, _id: { $ne: blog._id } })) {
      candidate = `${base}-${suffix++}`
    }
    await collection.updateOne({ _id: blog._id }, { $set: { slug: candidate, updatedAt: new Date().toISOString() } })
    blog.slug = candidate
  }

  return blog
}

export async function getRecentBlogs(limit = 5): Promise<BlogDocument[]> {
  const collection = await getCollection("blogs")
  const blogs = await collection.find({}).sort({ publishedAt: -1, createdAt: -1 }).limit(limit).toArray()
  return blogs as BlogDocument[]
}

export async function getUniqueBlogSlug(title: string, requestedSlug?: string, excludeId?: ObjectId) {
  const collection = await getCollection("blogs")
  const base = slugify(requestedSlug || title) || `article-${Date.now()}`
  let candidate = base
  let suffix = 2

  const queryFor = (slug: string) => {
    const slugCollision = { $or: [{ slug }, { previousSlugs: slug }] }
    return excludeId
      ? { $and: [slugCollision, { _id: { $ne: excludeId } }] }
      : slugCollision
  }

  while (await collection.findOne(queryFor(candidate))) {
    candidate = `${base}-${suffix++}`
  }

  return candidate
}

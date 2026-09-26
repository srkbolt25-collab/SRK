import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { blogExcerpt, getUniqueBlogSlug } from "@/lib/blogs"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const collection = await getCollection("blogs")
    const blogs = await collection.find({}).sort({ publishedAt: -1, createdAt: -1 }).toArray()
    const mapped = blogs.map((blog) => ({
      ...blog,
      _id: blog._id?.toString(),
      slug: blog.slug || undefined,
      excerpt: blog.excerpt || blogExcerpt(String(blog.content || "")),
    }))
    return NextResponse.json(mapped)
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    if (!payload.title || !payload.category || !payload.content) {
      return NextResponse.json({ error: "Title, category, and content are required." }, { status: 400 })
    }

    const collection = await getCollection("blogs")
    const now = new Date().toISOString()
    const slug = await getUniqueBlogSlug(payload.title, payload.slug)
    const metaDescription = String(payload.metaDescription || blogExcerpt(payload.content, 160)).trim()

    const blog = {
      title: String(payload.title).trim(),
      slug,
      category: String(payload.category).trim(),
      content: String(payload.content),
      excerpt: String(payload.excerpt || blogExcerpt(payload.content, 220)).trim(),
      coverImage: String(payload.coverImage || "").trim(),
      metaTitle: String(payload.metaTitle || payload.title).trim(),
      metaDescription,
      publishedAt: payload.publishedAt || now,
      createdAt: now,
      updatedAt: now,
    }

    const result = await collection.insertOne(blog)

    return NextResponse.json(
      { message: "Blog created successfully", blogId: result.insertedId.toString(), slug },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { blogExcerpt, getBlogByIdentifier, getUniqueBlogSlug } from "@/lib/blogs"

export const dynamic = "force-dynamic"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const blog = await getBlogByIdentifier(params.id)
    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 })

    return NextResponse.json({ ...blog, _id: blog._id.toString() })
  } catch (error) {
    console.error("Error fetching blog:", error)
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id
    const payload = await request.json()

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 })
    }

    const collection = await getCollection("blogs")
    const objectId = new ObjectId(id)
    const existing = await collection.findOne({ _id: objectId })
    if (!existing) return NextResponse.json({ error: "Blog not found" }, { status: 404 })

    const title = String(payload.title || existing.title || "Untitled Article").trim()
    const content = String(payload.content ?? existing.content ?? "")
    const slug = await getUniqueBlogSlug(title, payload.slug || title, objectId)
    const previousSlugs = Array.isArray(existing.previousSlugs)
      ? existing.previousSlugs.map((value: unknown) => String(value)).filter(Boolean)
      : []
    const oldSlug = String(existing.slug || "").trim()
    if (oldSlug && oldSlug !== slug && !previousSlugs.includes(oldSlug)) {
      previousSlugs.push(oldSlug)
    }

    const updateData = {
      title,
      slug,
      previousSlugs,
      category: String(payload.category || existing.category || "Fastener Insights").trim(),
      content,
      excerpt: String(payload.excerpt || existing.excerpt || blogExcerpt(content, 220)).trim(),
      coverImage: String(payload.coverImage ?? existing.coverImage ?? "").trim(),
      metaTitle: String(payload.metaTitle || title).trim(),
      metaDescription: String(payload.metaDescription || blogExcerpt(content, 160)).trim(),
      publishedAt: payload.publishedAt || existing.publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await collection.updateOne({ _id: objectId }, { $set: updateData })
    return NextResponse.json({ message: "Blog updated successfully", slug })
  } catch (error) {
    console.error("Error updating blog:", error)
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id
    if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 })

    const collection = await getCollection("blogs")
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) return NextResponse.json({ error: "Blog not found" }, { status: 404 })

    return NextResponse.json({ message: "Blog deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const collection = await getCollection("blogs")
    const blogs = await collection.find({}).sort({ createdAt: -1 }).toArray()
    const mapped = blogs.map((blog) => ({
      ...blog,
      _id: blog._id?.toString(),
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
    const blog = {
      title: payload.title,
      category: payload.category,
      content: payload.content,
      coverImage: payload.coverImage || "",
      publishedAt: payload.publishedAt || now,
      createdAt: now,
      updatedAt: now,
    }

    const result = await collection.insertOne(blog)

    return NextResponse.json(
      {
        message: "Blog created successfully",
        blogId: result.insertedId.toString(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}


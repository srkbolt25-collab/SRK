import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog id" }, { status: 400 })
    }

    const payload = await request.json()
    if (!payload.title || !payload.category || !payload.content) {
      return NextResponse.json({ error: "Title, category, and content are required." }, { status: 400 })
    }

    const collection = await getCollection("blogs")

    const updateDoc = {
      $set: {
        title: payload.title,
        category: payload.category,
        content: payload.content,
        coverImage: payload.coverImage || "",
        publishedAt: payload.publishedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }

    const result = await collection.updateOne({ _id: new ObjectId(id) }, updateDoc)

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Blog updated successfully" })
  } catch (error) {
    console.error("Error updating blog:", error)
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog id" }, { status: 400 })
    }

    const collection = await getCollection("blogs")
    const result = await collection.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Blog deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}


import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

const MAX_BANNERS = 3

const invalidIdResponse = NextResponse.json({ error: "Invalid banner id" }, { status: 400 })

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params?.id

    if (!id || !ObjectId.isValid(id)) {
      return invalidIdResponse
    }

    const body = await request.json()

    const updates: Record<string, any> = {}

    if (typeof body.title === "string") {
      const title = body.title.trim()
      if (!title) {
        return NextResponse.json({ error: "Title cannot be empty" }, { status: 400 })
      }
      updates.title = title
    }

    if (typeof body.subtitle === "string") {
      updates.subtitle = body.subtitle.trim()
    }

    if (typeof body.highlight === "string") {
      updates.highlight = body.highlight.trim()
    }

    if (typeof body.image === "string") {
      const image = body.image.trim()
      if (!image) {
        return NextResponse.json({ error: "Image URL cannot be empty" }, { status: 400 })
      }
      updates.image = image
    }

    if (body.order !== undefined) {
      if (body.order === "" || body.order === null) {
        updates.order = 0
      } else {
        const parsedOrder = Number(body.order)
        if (Number.isNaN(parsedOrder)) {
          return NextResponse.json({ error: "Order must be a number" }, { status: 400 })
        }
        updates.order = parsedOrder
      }
    }

    if (typeof body.page === "string") {
      updates.page = body.page.trim() || "home"
    }

    updates.updatedAt = new Date().toISOString()

    const collection = await getCollection("banners")
    const existingBanner = await collection.findOne({ _id: new ObjectId(id) })
    if (!existingBanner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 })
    }

    const targetPage = typeof updates.page === "string" ? updates.page : (existingBanner.page || "home")
    const currentPage = existingBanner.page || "home"
    if (targetPage !== currentPage) {
      const targetCount = await collection.countDocuments({ page: targetPage })
      if (targetCount >= MAX_BANNERS) {
        return NextResponse.json({ error: `Maximum of ${MAX_BANNERS} banners allowed per page` }, { status: 400 })
      }
    }

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnDocument: "after" }
    )

    if (!result) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error updating banner:", error)
    return NextResponse.json({ error: "Failed to update banner" }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params?.id

    if (!id || !ObjectId.isValid(id)) {
      return invalidIdResponse
    }

    const collection = await getCollection("banners")
    const result = await collection.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting banner:", error)
    return NextResponse.json({ error: "Failed to delete banner" }, { status: 500 })
  }
}

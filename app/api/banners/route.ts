import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

const MAX_BANNERS = 3

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const showAll = searchParams.get("all") === "1"
    const page = searchParams.get("page") || "home"

    const collection = await getCollection("banners")
    const cursor = collection
      .find(showAll ? {} : { page })
      .sort(showAll ? { page: 1, order: 1, createdAt: -1 } : { order: 1, createdAt: -1 })

    if (!showAll) cursor.limit(MAX_BANNERS)
    const banners = await cursor.toArray()

    return NextResponse.json(banners)
  } catch (error) {
    console.error("Error fetching banners:", error)
    return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const collection = await getCollection("banners")
    const body = await request.json()

    const title = typeof body.title === "string" ? body.title.trim() : ""
    const image = typeof body.image === "string" ? body.image.trim() : ""

    if (!title || !image) {
      return NextResponse.json({ error: "Title and image are required" }, { status: 400 })
    }

    const subtitle = typeof body.subtitle === "string" ? body.subtitle.trim() : ""
    const highlight = typeof body.highlight === "string" ? body.highlight.trim() : ""
    const page = typeof body.page === "string" && body.page.trim() ? body.page.trim() : "home"
    const existingCount = await collection.countDocuments({ page })

    if (existingCount >= MAX_BANNERS) {
      return NextResponse.json({ error: `Maximum of ${MAX_BANNERS} banners allowed per page` }, { status: 400 })
    }

    const rawOrder = body.order
    let order = Number.isFinite(rawOrder) ? Number(rawOrder) : existingCount
    if (rawOrder !== undefined && rawOrder !== null && rawOrder !== "") {
      const parsedOrder = Number(rawOrder)
      if (Number.isNaN(parsedOrder)) {
        return NextResponse.json({ error: "Order must be a number" }, { status: 400 })
      }
      order = parsedOrder
    }

    const banner = {
      title,
      subtitle,
      highlight,
      image,
      order,
      page,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const result = await collection.insertOne(banner)

    return NextResponse.json({ ...banner, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating banner:", error)
    return NextResponse.json({ error: "Failed to create banner" }, { status: 500 })
  }
}

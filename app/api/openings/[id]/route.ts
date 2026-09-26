import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

const sanitizeString = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid opening id" }, { status: 400 })
    }

    const payload = await request.json()
    const updates: Record<string, unknown> = {}

    const title = sanitizeString(payload.title)
    const employmentType = sanitizeString(payload.employmentType)
    const location = sanitizeString(payload.location)
    const experience = sanitizeString(payload.experience)
    const description = sanitizeString(payload.description)
    const icon = sanitizeString(payload.icon)
    const gradient = sanitizeString(payload.gradient)

    if (title) updates.title = title
    if (employmentType) updates.employmentType = employmentType
    if (location) updates.location = location
    if (experience) updates.experience = experience
    if (description) updates.description = description
    if (icon) updates.icon = icon
    if (gradient) updates.gradient = gradient

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields provided" }, { status: 400 })
    }

    updates.updatedAt = new Date().toISOString()

    const collection = await getCollection("openings")
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnDocument: "after" }
    )

    if (!result) {
      return NextResponse.json({ error: "Opening not found" }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error updating opening:", error)
    return NextResponse.json({ error: "Failed to update opening" }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid opening id" }, { status: 400 })
    }

    const collection = await getCollection("openings")
    const result = await collection.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Opening not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting opening:", error)
    return NextResponse.json({ error: "Failed to delete opening" }, { status: 500 })
  }
}


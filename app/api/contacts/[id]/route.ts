import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export const dynamic = "force-dynamic"

const sanitizeString = (value: unknown, fallback = ""): string => {
  if (typeof value !== "string") return fallback
  return value.trim()
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const collection = await getCollection("contacts")
    const contact = await collection.findOne({ _id: new ObjectId(params.id) })
    
    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }
    
    return NextResponse.json(contact)
  } catch (error) {
    console.error("Error fetching contact:", error)
    return NextResponse.json({ error: "Failed to fetch contact" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payload = await request.json()

    const sanitized = {
      title: sanitizeString(payload.title),
      name: sanitizeString(payload.name),
      designation: sanitizeString(payload.designation),
      tel: sanitizeString(payload.tel),
      email: sanitizeString(payload.email),
      type: sanitizeString(payload.type, "sales"),
      image: sanitizeString(payload.image, ""),
      updatedAt: new Date().toISOString(),
    }

    // Validate type
    if (sanitized.type !== "sales" && sanitized.type !== "purchase") {
      return NextResponse.json(
        { error: "Type must be either 'sales' or 'purchase'" },
        { status: 400 }
      )
    }

    const collection = await getCollection("contacts")
    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: sanitized }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json({ ...sanitized, _id: params.id })
  } catch (error) {
    console.error("Error updating contact:", error)
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const collection = await getCollection("contacts")
    const result = await collection.deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Contact deleted successfully" })
  } catch (error) {
    console.error("Error deleting contact:", error)
    return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 })
  }
}


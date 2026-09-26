import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

const REQUIRED_FIELDS = ["title", "name", "designation", "tel", "email", "type"]

const sanitizeString = (value: unknown, fallback = ""): string => {
  if (typeof value !== "string") return fallback
  return value.trim()
}

export async function GET(request: NextRequest) {
  try {
    const collection = await getCollection("contacts")
    const type = request.nextUrl.searchParams.get("type")
    
    const query: any = {}
    if (type) {
      query.type = type
    }
    
    const contacts = await collection.find(query).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(contacts)
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    const sanitized = {
      title: sanitizeString(payload.title),
      name: sanitizeString(payload.name),
      designation: sanitizeString(payload.designation),
      tel: sanitizeString(payload.tel),
      email: sanitizeString(payload.email),
      type: sanitizeString(payload.type, "sales"), // sales or purchase
      image: sanitizeString(payload.image, ""),
    }

    const missing = REQUIRED_FIELDS.filter((field) => !sanitized[field as keyof typeof sanitized])
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      )
    }

    // Validate type
    if (sanitized.type !== "sales" && sanitized.type !== "purchase") {
      return NextResponse.json(
        { error: "Type must be either 'sales' or 'purchase'" },
        { status: 400 }
      )
    }

    const collection = await getCollection("contacts")
    const document = {
      ...sanitized,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const result = await collection.insertOne(document)
    return NextResponse.json({ ...document, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating contact:", error)
    return NextResponse.json({ error: "Failed to create contact" }, { status: 500 })
  }
}


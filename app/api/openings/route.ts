import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

const REQUIRED_FIELDS = ["title", "employmentType", "location", "experience", "description"]

const sanitizeString = (value: unknown, fallback = ""): string => {
  if (typeof value !== "string") return fallback
  return value.trim()
}

export async function GET() {
  try {
    const collection = await getCollection("openings")
    const openings = await collection.find({}).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(openings)
  } catch (error) {
    console.error("Error fetching openings:", error)
    return NextResponse.json({ error: "Failed to fetch openings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    const sanitized = {
      title: sanitizeString(payload.title),
      employmentType: sanitizeString(payload.employmentType, "Full-time"),
      location: sanitizeString(payload.location),
      experience: sanitizeString(payload.experience),
      description: sanitizeString(payload.description),
      icon: sanitizeString(payload.icon, "briefcase"),
      gradient: sanitizeString(payload.gradient, "from-red-500 to-red-600"),
    }

    const missing = REQUIRED_FIELDS.filter((field) => !sanitized[field as keyof typeof sanitized])
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      )
    }

    const collection = await getCollection("openings")
    const document = {
      ...sanitized,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const result = await collection.insertOne(document)
    return NextResponse.json({ ...document, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating opening:", error)
    return NextResponse.json({ error: "Failed to create opening" }, { status: 500 })
  }
}


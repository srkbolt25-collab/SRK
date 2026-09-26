import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

const sanitize = (value: unknown): string => (typeof value === "string" ? value.trim() : "")

export async function GET() {
  try {
    const collection = await getCollection("applications")
    const applications = await collection.find({}).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const name = sanitize(body.name)
    const email = sanitize(body.email)
    const phone = sanitize(body.phone)
    const resumeUrl = sanitize(body.resumeUrl)
    const openingId = sanitize(body.openingId)
    const openingTitle = sanitize(body.openingTitle)
    const employmentType = sanitize(body.employmentType)
    const location = sanitize(body.location)
    const coverLetter = sanitize(body.coverLetter)

    if (!name || !email || !phone || !resumeUrl) {
      return NextResponse.json(
        { error: "Name, email, phone, and resume URL are required." },
        { status: 400 }
      )
    }

    const collection = await getCollection("applications")
    const record = {
      name,
      email,
      phone,
      resumeUrl,
      openingId: openingId || undefined,
      openingTitle: openingTitle || undefined,
      employmentType: employmentType || undefined,
      location: location || undefined,
      coverLetter: coverLetter || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const result = await collection.insertOne(record)
    return NextResponse.json({ ...record, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}


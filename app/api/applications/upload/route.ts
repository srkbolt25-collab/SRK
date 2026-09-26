import { NextRequest, NextResponse } from "next/server"
import { uploadRawFileToCloudinary } from "@/lib/cloudinary"

const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
])

const MAX_RESUME_SIZE = 5 * 1024 * 1024

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No resume file provided" }, { status: 400 })
    }

    if (!ALLOWED_RESUME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Invalid resume format. Please upload a PDF, DOC, or DOCX file." },
        { status: 400 },
      )
    }

    if (file.size <= 0 || file.size > MAX_RESUME_SIZE) {
      return NextResponse.json(
        { error: "Resume file must be 5MB or smaller." },
        { status: 400 },
      )
    }

    const fileUrl = await uploadRawFileToCloudinary(file, "primary", "careers/resumes")

    return NextResponse.json({ fileUrl }, { status: 200 })
  } catch (error) {
    console.error("Error uploading resume:", error)
    const message = error instanceof Error ? error.message : "Failed to upload resume"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const username = String(body?.username || "").trim()
    const password = String(body?.password || "")

    const expectedUsername = process.env.ADMIN_USERNAME || "admin"
    const expectedPassword = process.env.ADMIN_PASSWORD || "srk@bolt@2026*#"

    if (username !== expectedUsername || password !== expectedPassword) {
      return NextResponse.json({ success: false, message: "Invalid username or password" }, { status: 401 })
    }

    return NextResponse.json({ success: true, message: "Login successful", session: Date.now().toString() })
  } catch {
    return NextResponse.json({ success: false, message: "Unable to process login request" }, { status: 500 })
  }
}

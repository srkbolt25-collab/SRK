import { NextRequest, NextResponse } from "next/server"

const DEFAULT_USERNAME = "admin"
const DEFAULT_PASSWORDS = ["srkbolt2026", "savron2024"]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const username = String(body?.username || "").trim()
    const password = String(body?.password || "")

    const expectedUsername = process.env.ADMIN_USERNAME || DEFAULT_USERNAME
    const configuredPassword = process.env.ADMIN_PASSWORD
    const allowedPasswords = configuredPassword ? [configuredPassword] : DEFAULT_PASSWORDS

    const isValid = username === expectedUsername && allowedPasswords.includes(password)

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password" },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Login successful",
      session: Date.now().toString(),
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to process login request" },
      { status: 500 }
    )
  }
}

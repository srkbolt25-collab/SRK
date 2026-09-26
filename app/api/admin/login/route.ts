import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const username = process.env.ADMIN_USERNAME
  const password = process.env.ADMIN_PASSWORD
  const sessionToken = process.env.ADMIN_SESSION_TOKEN

  if (!username || !password || !sessionToken) {
    return NextResponse.json({ error: "Admin authentication is not configured." }, { status: 503 })
  }

  const body = await request.json().catch(() => ({}))
  if (body.username !== username || body.password !== password) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set("srk_admin_session", sessionToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  })
  return response
}

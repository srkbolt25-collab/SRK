import { NextRequest, NextResponse } from "next/server"

function getAdminUsername() {
  return process.env.ADMIN_USERNAME || "admin"
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "srk@bolt@2026*#"
}

function getAdminSessionToken() {
  return process.env.ADMIN_SESSION_TOKEN || `srk-admin-session-${getAdminPassword()}`
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const username = String(body.username || "").trim()
  const password = String(body.password || "")

  if (username !== getAdminUsername() || password !== getAdminPassword()) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true, authenticated: true })
  response.cookies.set("srk_admin_session", getAdminSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  })
  return response
}

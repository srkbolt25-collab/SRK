import { NextRequest, NextResponse } from "next/server"

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "srk@bolt@2026*#"
}

function getAdminSessionToken() {
  return process.env.ADMIN_SESSION_TOKEN || `srk-admin-session-${getAdminPassword()}`
}

export async function GET(request: NextRequest) {
  const current = request.cookies.get("srk_admin_session")?.value
  return NextResponse.json({ authenticated: current === getAdminSessionToken() })
}

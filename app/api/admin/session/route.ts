import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const expected = process.env.ADMIN_SESSION_TOKEN
  const current = request.cookies.get("srk_admin_session")?.value
  return NextResponse.json({ authenticated: Boolean(expected && current === expected) })
}

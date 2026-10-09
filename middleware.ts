import { NextRequest, NextResponse } from "next/server"

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "srk@bolt@2026*#"
}

function getAdminSessionToken() {
  return process.env.ADMIN_SESSION_TOKEN || `srk-admin-session-${getAdminPassword()}`
}

function isAdmin(request: NextRequest) {
  const current = request.cookies.get("srk_admin_session")?.value
  return current === getAdminSessionToken()
}

function apiRequiresAdmin(request: NextRequest) {
  const path = request.nextUrl.pathname
  const method = request.method.toUpperCase()

  if (path.startsWith("/api/admin/")) return false
  if (path === "/api/upload" || path.startsWith("/api/upload/")) return true

  const publicReadAdminWrite = ["/api/products", "/api/blogs", "/api/openings", "/api/banners", "/api/contacts"]
  if (publicReadAdminWrite.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) {
    return method !== "GET" && method !== "HEAD" && method !== "OPTIONS"
  }

  const publicSubmitAdminRead = ["/api/rfq-enquiries", "/api/applications", "/api/datasheet-downloads"]
  if (publicSubmitAdminRead.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) {
    return method !== "POST" && method !== "OPTIONS"
  }

  return false
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  if (path.startsWith("/admin-dashboard") && !isAdmin(request)) {
    return NextResponse.redirect(new URL("/admin-login", request.url))
  }

  if (path.startsWith("/api/") && apiRequiresAdmin(request) && !isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin-dashboard/:path*", "/api/:path*"],
}

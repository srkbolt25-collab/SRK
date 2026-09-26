import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin-dashboard", "/admin-login", "/api/"],
    },
    sitemap: "https://www.srkbolt.com/sitemap.xml",
    host: "https://www.srkbolt.com",
  }
}

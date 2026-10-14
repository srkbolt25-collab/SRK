import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/srk-seo"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin-dashboard",
          "/admin-login",
          "/api/",
          "/cart",
          "/checkout",
          "/payment",
          "/order-confirmation",
          "/*?filter=",
          "/*?category=",
          "/*?search=",
          "/*?name=",
          "/*?id=",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}

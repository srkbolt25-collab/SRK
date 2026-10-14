import type { Metadata } from "next"
import type { ReactNode } from "react"

// Blog detail content is client-fetched; do not index without server-rendered article content and metadata.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: "/blogs" },
}
export default function BlogDetailSeoLayout({ children }: { children: ReactNode }) { return children }

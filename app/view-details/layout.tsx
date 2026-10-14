import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: "/view-details" },
}

export default function ViewDetailsLayout({ children }: { children: ReactNode }) {
  return children
}

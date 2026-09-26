import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Careers at SRK Bolt | UAE Industrial Fastener Supplier",
  description: "Explore career opportunities with SRK Bolt, a growing UAE-based industrial fastener supply business serving project and industrial customers.",
}

export default function SegmentLayout({ children }: { children: ReactNode }) {
  return children
}

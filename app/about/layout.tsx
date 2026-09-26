import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "About SRK Bolt | Industrial Fastener Supplier UAE & GCC",
  description: "Learn about SRK Bolt, a UAE-based industrial fastener supplier serving customers across the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman, Iraq and Jordan since 2015.",
}

export default function SegmentLayout({ children }: { children: ReactNode }) {
  return children
}

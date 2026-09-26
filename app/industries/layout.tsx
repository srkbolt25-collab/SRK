import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Industries We Serve | Fasteners UAE & GCC | SRK Bolt",
  description: "Explore SRK Bolt fastener supply for construction, structural steel, automotive, power, manufacturing, oil & gas and engineering applications across the UAE, GCC, Iraq and Jordan.",
}

export default function SegmentLayout({ children }: { children: ReactNode }) {
  return children
}

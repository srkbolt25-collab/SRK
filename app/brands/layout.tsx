import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Fastener Brands & Sourcing Network | SRK Bolt UAE",
  description: "View fastener brands and manufacturers within the SRK Bolt sourcing network. Contact our UAE sales team for current product, specification and brand availability.",
}

export default function SegmentLayout({ children }: { children: ReactNode }) {
  return children
}

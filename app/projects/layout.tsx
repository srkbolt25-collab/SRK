import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Industrial Fastener Project Supply | SRK Bolt UAE",
  description: "Explore selected SRK Bolt project references and fastener supply experience across infrastructure, marine, energy, automotive and petrochemical applications.",
}

export default function SegmentLayout({ children }: { children: ReactNode }) {
  return children
}

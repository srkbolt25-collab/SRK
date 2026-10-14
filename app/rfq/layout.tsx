import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: 'Request a Fastener Quote | SRK Bolts UAE',
  description: 'Request a quotation for bolts, nuts, washers, threaded rods, anchors and other fasteners. Include size, standard, material, finish and quantity.',
  alternates: { canonical: "/rfq" },
}

export default function PageSeoLayout({ children }: { children: ReactNode }) {
  return children
}

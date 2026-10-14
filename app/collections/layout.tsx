import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: 'Browse Fastener Collections | SRK Bolts UAE',
  description: 'Browse industrial fastener ranges including bolts, nuts, washers, screws and related project hardware.',
  alternates: { canonical: "/collections" },
}

export default function PageSeoLayout({ children }: { children: ReactNode }) {
  return children
}

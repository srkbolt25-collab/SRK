import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: 'About SRK Bolts | UAE Industrial Fastener Supplier',
  description: 'Learn about SRK Bolts, a UAE-based supplier of industrial fasteners for construction, engineering, marine and infrastructure requirements.',
  alternates: { canonical: "/about" },
}

export default function PageSeoLayout({ children }: { children: ReactNode }) {
  return children
}

import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: 'Shop Industrial Fasteners | SRK Bolts UAE',
  description: 'Explore fastener products and request quotations for construction and industrial requirements.',
  alternates: { canonical: "/shop" },
}

export default function PageSeoLayout({ children }: { children: ReactNode }) {
  return children
}

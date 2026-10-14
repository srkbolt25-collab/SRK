import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: 'Fastener Brands & Supply Partners | SRK Bolts UAE',
  description: 'Browse the fastener brands and product ranges available through SRK Bolts in the UAE.',
  alternates: { canonical: "/brands" },
}

export default function PageSeoLayout({ children }: { children: ReactNode }) {
  return children
}

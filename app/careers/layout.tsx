import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: 'Careers at SRK Bolts | UAE',
  description: 'Explore career opportunities and job openings at SRK Bolts.',
  alternates: { canonical: "/careers" },
}

export default function PageSeoLayout({ children }: { children: ReactNode }) {
  return children
}

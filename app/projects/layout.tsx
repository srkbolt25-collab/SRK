import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: 'Projects & Fastener Supply Experience | SRK Bolts UAE',
  description: 'Explore SRK Bolts project information and contact the team for engineering fastener and bulk procurement requirements.',
  alternates: { canonical: "/projects" },
}

export default function PageSeoLayout({ children }: { children: ReactNode }) {
  return children
}

import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: 'Fastener Technical Guides & Articles | SRK Bolts',
  description: 'Read practical guides about fastener standards, materials, bolts, nuts, washers and industrial procurement.',
  alternates: { canonical: "/blogs" },
}

export default function PageSeoLayout({ children }: { children: ReactNode }) {
  return children
}

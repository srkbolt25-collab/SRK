import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: 'Industries Served | Industrial Fasteners in UAE | SRK Bolts',
  description: 'Explore industrial fasteners for construction, steel fabrication, oil and gas, MEP, marine and maintenance applications.',
  alternates: { canonical: "/industries" },
}

export default function PageSeoLayout({ children }: { children: ReactNode }) {
  return children
}

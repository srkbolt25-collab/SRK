import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: 'Work With SRK Bolts | Partnerships & Careers',
  description: 'Learn about opportunities to work with SRK Bolts in the UAE.',
  alternates: { canonical: "/join-us" },
}

export default function PageSeoLayout({ children }: { children: ReactNode }) {
  return children
}

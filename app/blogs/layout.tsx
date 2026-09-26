import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Fastener Guides & Technical Insights | UAE & GCC",
  description: "Read SRK Bolt guides on fastener standards, grades, materials, coatings, applications, selection and industrial procurement across the UAE, GCC, Iraq and Jordan.",
}

export default function BlogsLayout({ children }: { children: ReactNode }) {
  return children
}

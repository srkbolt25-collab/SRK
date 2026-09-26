import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  alternates: { canonical: "https://www.srkbolt.com/attachments" },
  robots: { index: false, follow: true },
}

export default function LegacyLayout({ children }: { children: ReactNode }) {
  return children
}

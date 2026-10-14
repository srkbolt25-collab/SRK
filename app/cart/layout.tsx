import type { Metadata } from "next"
import type { ReactNode } from "react"
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: "/cart" },
}
export default function PrivateLayout({ children }: { children: ReactNode }) { return children }

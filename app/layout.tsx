import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ToastProvider } from "@/contexts/ToastContext"
import { Toaster } from "@/components/ui/simple-toaster"
import "./globals.css"
import { RFQProvider } from "@/contexts/RFQContext"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.srkbolt.com"),
  title: "Industrial Fasteners Supplier in UAE & GCC | SRK Bolt",
  description:
    "SRK Bolt is a UAE-based industrial fasteners supplier serving the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman, with regional supply support for Iraq and Jordan. Source bolts, nuts, washers, screws, rivets and engineered fastening solutions for industrial projects.",
  keywords:
    "industrial fasteners supplier UAE, fasteners supplier GCC, fasteners supplier Saudi Arabia, fasteners supplier Qatar, fasteners supplier Kuwait, fasteners supplier Bahrain, fasteners supplier Oman, fasteners supplier Iraq, fasteners supplier Jordan, bolts and nuts supplier UAE",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
        <ToastProvider>
          <RFQProvider>
            <Suspense fallback={null}>{children}</Suspense>
            <Toaster />
          </RFQProvider>
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  )
}

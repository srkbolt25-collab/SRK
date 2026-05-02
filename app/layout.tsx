import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { CartProvider } from "@/contexts/CartContext"
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
  title: "Best fasteners suppliers in Dubai, UAE - SRK BOLT",
  description:
    "We are one of the best fasteners suppliers and manufacturers in Dubai, UAE. Contact us for more +971 58 871 3064",
  keywords:
    "best fasteners suppliers in Dubai, fasteners suppliers UAE, industrial fasteners Dubai, bolts and nuts suppliers UAE, stainless steel fasteners Dubai, screw suppliers UAE, anchor bolts suppliers Dubai, high tensile fasteners UAE, fastener companies Dubai",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
        <CartProvider>
          <ToastProvider>
            <RFQProvider>
              <Suspense fallback={null}>{children}</Suspense>
              <Toaster />
            </RFQProvider>
          </ToastProvider>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import type { ReactNode } from "react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Screw suppliers in Dubai, UAE - SRK BOLT",
  description:
    "We provide premium quality self-tapping screws, machine screws, wood screws, and stainless-steel screws for construction, industrial, and engineering applications with fast delivery across the UAE.",
  keywords:
    "screw suppliers in Dubai, screw manufacturers UAE, stainless steel screws Dubai, self-tapping screws UAE, machine screws Dubai, wood screws UAE, industrial screws Dubai, fasteners suppliers UAE, drywall screws Dubai",
}

export default function SegmentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-2ZXGEEFR31" strategy="afterInteractive" />
      <Script id="google-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2ZXGEEFR31');
        `}
      </Script>
      {children}
    </>
  )
}

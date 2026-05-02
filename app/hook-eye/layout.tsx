import type { Metadata } from "next"
import type { ReactNode } from "react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Hook and eye suppliers in Dubai, UAE - SRK BOLT",
  description:
    "We offer premium quality eye bolts, hook bolts, screw eyes, and industrial fastening solutions for construction, marine, and engineering applications with fast delivery across the UAE.",
  keywords:
    "hook and eye suppliers Dubai, eye bolts suppliers UAE, hook bolts Dubai, screw eye suppliers UAE, lifting hooks Dubai, eye nuts UAE, industrial fasteners Dubai, rigging hardware suppliers UAE, stainless steel eye bolts Dubai",
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

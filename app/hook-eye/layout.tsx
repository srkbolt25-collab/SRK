import type { Metadata } from "next"
import type { ReactNode } from "react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Hook & Eye Fastener Supplier in UAE & GCC | SRK Bolt",
  description:
    "SRK Bolt supplies hook, eye and related industrial fastening hardware across the UAE and GCC for marine, structural, rigging and engineering requirements.",
  keywords:
    "hook and eye supplier UAE, eye bolts Dubai, hook bolts UAE, screw eyes UAE, industrial fastening hardware Dubai, rigging hardware UAE",
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

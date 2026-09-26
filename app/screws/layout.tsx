import type { Metadata } from "next"
import type { ReactNode } from "react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Screw Supplier in UAE & GCC | Industrial Screws | SRK Bolt",
  description:
    "Source machine screws, self-tapping screws and specialty screws across the UAE and GCC for metal, construction, manufacturing and engineering applications.",
  keywords:
    "screw supplier Dubai, screws supplier UAE, self tapping screws UAE, machine screws Dubai, stainless steel screws UAE, industrial screws UAE",
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

import type { Metadata } from "next"
import type { ReactNode } from "react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Washer Supplier in UAE & GCC | Industrial Washers | SRK Bolt",
  description:
    "SRK Bolt supplies plain, spring, locking, sealing and stainless steel washers across the UAE and GCC for construction, steel, machinery and industrial fastening requirements.",
  keywords:
    "washer supplier Dubai, washers supplier UAE, plain washers UAE, spring washers Dubai, lock washers UAE, stainless steel washers UAE, sealing washers UAE",
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

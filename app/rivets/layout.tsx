import type { Metadata } from "next"
import type { ReactNode } from "react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Rivets, Pins & Inserts Supplier in UAE & GCC | SRK Bolt",
  description:
    "Source rivets, pins and threaded inserts across the UAE and GCC for industrial assembly, fabrication, automotive and engineering applications.",
  keywords:
    "rivets supplier UAE, pins supplier Dubai, threaded inserts UAE, blind rivets Dubai, industrial rivets UAE, fastening inserts UAE",
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

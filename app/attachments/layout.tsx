import type { Metadata } from "next"
import type { ReactNode } from "react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Heavy Load Attachments Supplier in UAE & GCC | SRK Bolt",
  description:
    "SRK Bolt supplies heavy-load attachments and industrial fastening hardware across the UAE and GCC for construction, structural and engineering requirements.",
  keywords:
    "heavy load attachments UAE, industrial attachments Dubai, heavy duty fasteners UAE, structural fastening hardware Dubai, project fasteners UAE",
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

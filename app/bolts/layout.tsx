import type { Metadata } from "next"
import type { ReactNode } from "react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Bolt Supplier in UAE & GCC | Industrial Bolts | SRK Bolt",
  description:
    "SRK Bolt supplies industrial bolts across the UAE and GCC, including hex, high-tensile, anchor, stainless steel and specialty bolts for construction, steel and engineering applications.",
  keywords:
    "bolt supplier Dubai, bolts supplier UAE, industrial bolts UAE, high tensile bolts Dubai, hex bolts UAE, anchor bolts UAE, stainless steel bolts UAE",
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

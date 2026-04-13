import type { Metadata } from "next"
import type { ReactNode } from "react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Bolts suppliers and manufacturers in Dubai – Srkbolt.com",
  description:
    "Find trusted bolts suppliers and manufacturers in Dubai offering high-quality fasteners, stainless steel bolts, anchor bolts, and industrial hardware. Contact us for more +971 58 871 3064",
  keywords:
    " bolts suppliers in Dubai, fasteners suppliers UAE, bolt manufacturers Dubai, stainless steel bolts Dubai, anchor bolts UAE, industrial fasteners Dubai, hex bolts suppliers UAE, high tensile bolts Dubai, nuts and bolts suppliers UAE ",
}

export default function SegmentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-2ZXGEEFR31" strategy="afterInteractive" />
        <Script id="google-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2ZXGEEFR31');
          `}
        </Script>
      </head>
      {children}
    </>
  )
}

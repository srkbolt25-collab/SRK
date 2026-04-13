import type { Metadata } from "next"
import type { ReactNode } from "react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Washer suppliers and manufacturers in Dubai, UAE- Srkbolt.com",
  description:
    "Find top washer suppliers and manufacturers in Dubai, UAE offering high-quality flat washers, spring washers, and stainless-steel washers with competitive price. Contact us for more +971 58 871 3064.",
  keywords:
    " washer suppliers in Dubai, washer manufacturers UAE, flat washers Dubai, spring washers UAE, stainless steel washers Dubai, industrial washers UAE, lock washers suppliers Dubai, plain washers UAE, fasteners suppliers Dubai.",
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

import type { Metadata } from "next"
import type { ReactNode } from "react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Rivets pin and inserts suppliers in Dubai, UAE - Srkbolt.com",
  description:
    " We are one of the best Rivets, pin and inserts suppliers and manufacturers in Dubai, UAE. Contact us for more +971 58 871 3064 ",
  keywords:
    " rivets suppliers in Dubai, rivet manufacturers UAE, blind rivets Dubai, pins suppliers UAE, pins suppliers UAE, dowel pins Dubai, spring pins UAE, threaded inserts Dubai, industrial fasteners UAE, pop rivets suppliers Dubai.",
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

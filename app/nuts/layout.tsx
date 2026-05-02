import type { Metadata } from "next"
import type { ReactNode } from "react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Nut suppliers in Dubai, UAE - SRK BOLT",
  description:
    "Find reliable nuts suppliers and manufacturers in Dubai, UAE offering high-quality hex nuts, lock nuts, stainless steel nuts, and industrial fasteners with competitive pricing and fast delivery.",
  keywords:
    "nuts suppliers in Dubai, nuts manufacturers UAE, hex nuts suppliers Dubai, stainless steel nuts UAE, industrial nuts suppliers Dubai, lock nuts suppliers UAE, fasteners suppliers Dubai, heavy hex nuts UAE, coupling nuts Dubai",
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

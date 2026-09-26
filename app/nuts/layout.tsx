import type { Metadata } from "next"
import type { ReactNode } from "react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Nut Supplier in UAE & GCC | Industrial Nuts | SRK Bolt",
  description:
    "Source industrial nuts across the UAE and GCC, including hex, lock, flange, coupling and stainless steel nuts for construction, machinery and engineering requirements.",
  keywords:
    "nut supplier Dubai, nuts supplier UAE, hex nuts UAE, lock nuts Dubai, flange nuts UAE, stainless steel nuts UAE, industrial nuts supplier",
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

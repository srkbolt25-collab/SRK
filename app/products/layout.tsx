import type { Metadata } from "next"
import type { ReactNode } from "react"
import Script from "next/script"


export const metadata: Metadata = {
  title: "Industrial Fasteners & Fixings UAE & GCC | SRK Bolt",
  description: "Browse SRK Bolt industrial fasteners including bolts, nuts, washers, screws, rivets, hook & eye products, heavy-load attachments and specialty fasteners.",
}
export default function ProductsLayout({ children }: { children: ReactNode }) {
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

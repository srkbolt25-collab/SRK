import type { Metadata } from "next"
import type { ReactNode } from "react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Heavy load attachment suppliers in Dubai, UAE - SRK BOLT",
  description:
    "Heavy load attachment suppliers in Dubai, UAE offering high-quality lifting anchors, eye bolts, shackles, and rigging hardware with fast delivery across the UAE.",
  keywords:
    "heavy load attachment suppliers Dubai, lifting equipment suppliers UAE, rigging hardware Dubai, eye bolts and shackles UAE, lifting anchors Dubai, heavy duty fasteners UAE, industrial lifting solutions Dubai, turnbuckles suppliers UAE, load lifting accessories Dubai",
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

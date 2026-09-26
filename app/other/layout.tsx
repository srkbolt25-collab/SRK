import type { Metadata } from "next"
import type { ReactNode } from "react"
import Script from "next/script"


export const metadata: Metadata = {
  title: "Specialty & Non-Standard Fasteners UAE & GCC | SRK Bolt",
  description: "Source specialty and non-standard industrial fasteners in the UAE against specifications, samples or drawings. Contact SRK Bolt for project and bulk-order RFQs.",
}
export default function OtherProductsLayout({ children }: { children: ReactNode }) {
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

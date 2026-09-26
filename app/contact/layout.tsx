import type { Metadata } from "next"
import type { ReactNode } from "react"
import Script from "next/script"


export const metadata: Metadata = {
  title: "Contact SRK Bolt | Fastener RFQ UAE & GCC",
  description: "Contact SRK Bolt in Sharjah for industrial fastener RFQs and supply enquiries across the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman, Iraq and Jordan.",
}
export default function ContactLayout({ children }: { children: ReactNode }) {
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

import type { ReactNode } from "react"
import Script from "next/script"

export default function OtherProductsLayout({ children }: { children: ReactNode }) {
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


import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Globe2, MapPin } from "lucide-react"
import Layout from "@/components/Layout"
import { countryMarkets } from "@/lib/countryMarkets"

export const metadata: Metadata = {
  title: "Countries We Serve | Industrial Fasteners Supplier | SRK Bolt",
  description:
    "Explore SRK Bolt industrial fastener product pages for the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman, Iraq and Jordan. UAE-based regional supply for project and bulk RFQs.",
  alternates: { canonical: "https://www.srkbolt.com/countries" },
  openGraph: {
    title: "Countries We Serve | SRK Bolt",
    description:
      "UAE-based industrial fastener supply serving GCC and selected Middle East markets.",
    url: "https://www.srkbolt.com/countries",
    siteName: "SRK Bolt",
    type: "website",
  },
}

export default function CountriesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Countries We Serve",
    url: "https://www.srkbolt.com/countries",
    description:
      "SRK Bolt serves industrial fastener procurement requirements across the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman, Iraq and Jordan from its UAE base.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: countryMarkets.map((market, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: market.country,
        url: `https://www.srkbolt.com/${market.slug}/products`,
      })),
    },
  }

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-[#2E1F44] text-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-[#FFD5D5] font-semibold uppercase tracking-[0.18em] text-sm mb-4">
              <Globe2 className="w-5 h-5" /> Regional Supply
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Industrial Fasteners Across the GCC & Middle East
            </h1>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-3xl">
              SRK Bolt is a UAE-based industrial fasteners supplier supporting project, maintenance and bulk procurement requirements across the GCC, with regional supply support for Iraq and Jordan.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7FA] py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {countryMarkets.map((market) => (
                <article
                  key={market.slug}
                  className="bg-white rounded-2xl border border-[#E8E8EC] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#FFF0F0] text-[#A02222] flex items-center justify-center mb-5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#2E1F44] mb-3">{market.shortName}</h2>
                  <p className="text-gray-600 leading-relaxed text-sm mb-5 grow">
                    Industrial bolts, nuts, washers, screws and specialty fastener supply for {market.country}, serving {market.industryFocus.slice(0, 3).join(", ")} and other project requirements.
                  </p>
                  <p className="text-xs text-gray-500 mb-5">
                    Key markets: {market.cities.slice(0, 4).join(" • ")}
                  </p>
                  <Link
                    href={`/${market.slug}/products`}
                    className="inline-flex items-center justify-between gap-3 rounded-lg bg-[#A02222] hover:bg-[#2E1F44] text-white px-4 py-3 font-semibold transition-colors"
                  >
                    View {market.shortName} Products <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

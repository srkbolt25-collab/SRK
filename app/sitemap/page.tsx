import type { Metadata } from "next"
import Link from "next/link"
import Layout from "@/components/Layout"
import { countryMarkets } from "@/lib/countryMarkets"

export const metadata: Metadata = {
  title: "Website Sitemap | SRK Bolt",
  description: "Browse SRK Bolt product categories, markets, company pages and technical fastener guides.",
  alternates: { canonical: "https://www.srkbolt.com/sitemap" },
}

const sections = [
  { title: "Company", links: [["Home", "/"], ["About Us", "/about"], ["Industries", "/industries"], ["Projects", "/projects"], ["Brands", "/brands"], ["Careers", "/careers"], ["Join Us", "/join-us"], ["Contact", "/contact"], ["Request a Quote", "/rfq"]] },
  { title: "Products", links: [["All Products", "/products"], ["Bolts", "/bolts"], ["Nuts", "/nuts"], ["Washers", "/washers"], ["Screws", "/screws"], ["Hook & Eye", "/hook-eye"], ["Rivets & Inserts", "/rivets"], ["Heavy Load Attachments", "/attachments"], ["Other Products", "/other"]] },
  { title: "Resources", links: [["Fastener Guides & Insights", "/blogs"], ["Privacy Policy", "/privacy"], ["Website Terms", "/terms"]] },
]

export default function SitemapPage() {
  return (
    <Layout>
      <section className="bg-[#F7F7FA] py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold text-[#2E1F44] mb-10">Sitemap</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sections.map((section) => (
              <div key={section.title} className="bg-white border rounded-xl p-6">
                <h2 className="text-xl font-bold text-[#2E1F44] mb-4">{section.title}</h2>
                <ul className="space-y-2">{section.links.map(([label, href]) => <li key={href}><Link className="text-gray-700 hover:text-[#A02222]" href={href}>{label}</Link></li>)}</ul>
              </div>
            ))}
            <div className="bg-white border rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#2E1F44] mb-4">Markets</h2>
              <Link className="inline-block text-[#A02222] font-semibold mb-3 hover:underline" href="/countries">All Countries</Link>
              <ul className="space-y-2">{countryMarkets.map((market) => <li key={market.slug}><Link className="text-gray-700 hover:text-[#A02222]" href={`/${market.slug}/products`}>{market.shortName}</Link></li>)}</ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

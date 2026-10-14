import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Layout from "@/components/Layout"
import { CountrySEOSection } from "@/components/SEOContentBlocks"
import { countries, getCountryBySlug, siteUrl, withBrand } from "@/lib/srk-seo"

export function generateStaticParams() {
  return countries.map((country) => ({ country: country.slug }))
}

export function generateMetadata({ params }: { params: { country: string } }): Metadata {
  const country = getCountryBySlug(params.country)
  if (!country) return { title: "Country Not Found", robots: { index: false, follow: false } }
  return {
    title: withBrand(country.title),
    description: country.description,
    keywords: [...country.focus, ...country.secondaryKeywords, ...country.industries],
    alternates: { canonical: `/countries/${country.slug}` },
    openGraph: { title: withBrand(country.title), description: country.description, url: `${siteUrl}/countries/${country.slug}`, type: "website" },
  }
}

export default function CountryPage({ params }: { params: { country: string } }) {
  const country = getCountryBySlug(params.country)
  if (!country) notFound()
  return (
    <Layout>
      <CountrySEOSection country={country} />
    </Layout>
  )
}

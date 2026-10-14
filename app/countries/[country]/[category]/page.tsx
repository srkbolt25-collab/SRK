import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Layout from "@/components/Layout"
import { CountryCategorySEOSection } from "@/components/SEOContentBlocks"
import { countries, countryCategoryDescription, countryCategoryTitle, getCategoryBySlug, getCountryBySlug, seoCategories, siteUrl } from "@/lib/srk-seo"

export function generateStaticParams() {
  return countries.flatMap((country) => seoCategories.map((category) => ({ country: country.slug, category: category.slug })))
}

export function generateMetadata({ params }: { params: { country: string; category: string } }): Metadata {
  const country = getCountryBySlug(params.country)
  const category = getCategoryBySlug(params.category)
  if (!country || !category) return { title: "Page Not Found", robots: { index: false, follow: false } }
  const title = countryCategoryTitle(country, category)
  const description = countryCategoryDescription(country, category)
  return {
    title,
    description,
    keywords: [...category.secondaryKeywords, ...category.longTailKeywords, ...country.focus, ...country.secondaryKeywords, `${category.label} supplier ${country.name}`],
    alternates: { canonical: `/countries/${country.slug}/${category.slug}` },
    openGraph: { title, description, url: `${siteUrl}/countries/${country.slug}/${category.slug}`, type: "website" },
  }
}

export default function CountryCategoryPage({ params }: { params: { country: string; category: string } }) {
  const country = getCountryBySlug(params.country)
  const category = getCategoryBySlug(params.category)
  if (!country || !category) notFound()
  return (
    <Layout>
      <CountryCategorySEOSection country={country} category={category} />
    </Layout>
  )
}

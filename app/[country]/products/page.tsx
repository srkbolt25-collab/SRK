import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCollection } from "@/lib/mongodb"
import { getCountryMarket } from "@/lib/countryMarkets"
import { createSlug } from "@/lib/slug"
import CountryProductsClient, { type CountryProduct } from "./CountryProductsClient"

export const dynamic = "force-dynamic"

type PageProps = {
  params: {
    country: string
  }
}

const absoluteUrl = (path: string) => `https://www.srkbolt.com${path}`

export function generateMetadata({ params }: PageProps): Metadata {
  const market = getCountryMarket(params.country)
  if (!market) return {}

  const title = `Industrial Fasteners Supplier in ${market.shortName} | SRK Bolt`
  const description = `SRK Bolt is an industrial fasteners supplier serving ${market.country}, with bolts, nuts, washers, screws, hook & eye products, rivets & inserts, heavy load attachments and other fastener products for project, maintenance and bulk RFQs.`
  const canonical = absoluteUrl(`/${market.slug}/products`)

  return {
    title,
    description,
    keywords: [
      `fasteners supplier ${market.shortName}`,
      `industrial fasteners ${market.shortName}`,
      `bolts supplier ${market.shortName}`,
      `nuts supplier ${market.shortName}`,
      `washers supplier ${market.shortName}`,
      `screws supplier ${market.shortName}`,
      `fastener supplier ${market.country}`,
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "SRK Bolt",
      type: "website",
    },
  }
}

async function loadProducts(): Promise<CountryProduct[]> {
  try {
    const collection = await getCollection("products")
    const products = await collection.find({}).sort({ category: 1, name: 1 }).toArray()

    return products.map((product) => {
      const images = Array.isArray(product.images)
        ? product.images.filter((value: unknown) => typeof value === "string" && value.trim()).slice(0, 5)
        : []
      const grades = Array.isArray(product.grades)
        ? product.grades.filter((value: unknown) => typeof value === "string")
        : Array.isArray(product.specifications?.grades)
          ? product.specifications.grades.filter((value: unknown) => typeof value === "string")
          : []
      const coating = Array.isArray(product.coating)
        ? product.coating.filter((value: unknown) => typeof value === "string")
        : Array.isArray(product.specifications?.coating)
          ? product.specifications.coating.filter((value: unknown) => typeof value === "string")
          : []

      return {
        id: String(product._id),
        name: String(product.name || "Industrial Fastener"),
        description: String(product.description || ""),
        category: String(product.category || "OTHER"),
        image: String(images[0] || product.imageLink || "/placeholder.jpg"),
        standard: product.standard || product.specifications?.standard || undefined,
        equivalentStandard: product.equivalentStandard || product.specifications?.equivalentStandard || undefined,
        material: product.material || product.specifications?.material || undefined,
        sizes: product.sizes || product.specifications?.sizes || undefined,
        grades,
        coating,
        inStock: typeof product.inStock === "boolean" ? product.inStock : true,
      }
    })
  } catch (error) {
    console.error("Unable to load products for country page:", error)
    return []
  }
}

export default async function CountryProductsPage({ params }: PageProps) {
  const market = getCountryMarket(params.country)
  if (!market) notFound()

  const products = await loadProducts()
  const pageUrl = absoluteUrl(`/${market.slug}/products`)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Industrial Fasteners for ${market.country}`,
    description: `SRK Bolt industrial fastener catalogue for ${market.country}, including bolts, nuts, washers, screws, hook & eye products, rivets & inserts, heavy load attachments and other products.`,
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "SRK Bolt",
      url: "https://www.srkbolt.com/",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.srkbolt.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: market.shortName,
          item: pageUrl,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Products",
          item: pageUrl,
        },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.slice(0, 100).map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: absoluteUrl(`/view-details/${createSlug(product.name)}`),
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CountryProductsClient market={market} products={products} />
    </>
  )
}

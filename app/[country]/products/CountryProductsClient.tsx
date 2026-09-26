"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { CheckCircle, FileText, MessageCircle, PackageCheck, ShieldCheck, Wrench } from "lucide-react"
import Layout from "@/components/Layout"
import { useRFQ } from "@/contexts/RFQContext"
import { createSlug } from "@/lib/slug"
import { categoryMatches, type CanonicalCategory } from "@/lib/categories"
import type { CountryMarket } from "@/lib/countryMarkets"

export type CountryProduct = {
  id: string
  name: string
  description: string
  category: string
  image: string
  standard?: string
  equivalentStandard?: string
  material?: string
  sizes?: string
  grades?: string[]
  coating?: string[]
  inStock?: boolean
}

type CategoryDefinition = {
  key: string
  label: string
  seoLabel: string
  categoryHref: string
  canonical: CanonicalCategory
  intro: (market: CountryMarket) => string
}

const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  {
    key: "bolts",
    label: "Bolts",
    seoLabel: "Bolts",
    categoryHref: "/bolts",
    canonical: "BOLTS",
    intro: (market) =>
      `SRK Bolt supplies industrial bolts for ${market.shortName} construction, structural steel, fabrication, machinery and project procurement. Buyers can enquire by DIN, ISO, ASTM or project drawing and specify diameter, length, thread, grade, material and finish so the requirement can be matched accurately.`,
  },
  {
    key: "nuts",
    label: "Nuts",
    seoLabel: "Nuts",
    categoryHref: "/nuts",
    canonical: "NUTS",
    intro: (market) =>
      `Industrial nuts for ${market.shortName} are available for construction, fabrication, machinery, MEP and maintenance requirements. RFQs can identify the mating bolt or thread, dimensional standard, material, mechanical grade, finish and quantity to help select compatible fastening products.`,
  },
  {
    key: "washers",
    label: "Washers",
    seoLabel: "Washers",
    categoryHref: "/washers",
    canonical: "WASHERS",
    intro: (market) =>
      `SRK Bolt supplies washers for ${market.shortName} applications where load distribution, locking, spacing or joint protection is required. Buyers can enquire by standard, inner and outer diameter, thickness, material, hardness and coating according to the connected fastener and operating environment.`,
  },
  {
    key: "screws",
    label: "Screws",
    seoLabel: "Screws",
    categoryHref: "/screws",
    canonical: "SCREWS",
    intro: (market) =>
      `Our industrial screw range supports ${market.shortName} construction, fabrication, MEP, equipment and maintenance requirements. Selection can be based on head style, drive, thread, point, diameter, length, material and coating, with standard and specialty options reviewed against the base material and installation method.`,
  },
  {
    key: "hook-eye",
    label: "Hook & Eye",
    seoLabel: "Hook & Eye Products",
    categoryHref: "/hook-eye",
    canonical: "HOOK & EYE",
    intro: (market) =>
      `Hook & eye products are supplied for ${market.shortName} industrial, marine, rigging and general fastening requirements where applicable. Enquiries should include product type, dimensions, material, finish, working requirement and quantity so the appropriate item can be reviewed for the intended use.`,
  },
  {
    key: "rivets",
    label: "Rivets & Inserts",
    seoLabel: "Rivets & Inserts",
    categoryHref: "/rivets",
    canonical: "RIVETS",
    intro: (market) =>
      `Rivets and inserts support permanent fastening, assembly and thread reinforcement for ${market.shortName} fabrication and industrial requirements. Buyers can provide material stack, grip range, hole size, installation method, insert thread, material and finish to identify suitable catalogue options.`,
  },
  {
    key: "attachments",
    label: "Heavy Load",
    seoLabel: "Heavy Load Attachments",
    categoryHref: "/attachments",
    canonical: "ATTACHMENTS",
    intro: (market) =>
      `Heavy load attachment enquiries for ${market.shortName} can be reviewed against project drawings, standards and load-related specifications. Provide the intended application, dimensions, base material, load requirement, finish and quantity so suitable heavy-duty attachment products can be considered accurately.`,
  },
  {
    key: "other",
    label: "Other Products",
    seoLabel: "Other Fastener Products",
    categoryHref: "/other",
    canonical: "OTHER",
    intro: (market) =>
      `For ${market.shortName} requirements outside the principal fastener categories, SRK Bolt can review other and specialty product enquiries against a drawing, sample or technical specification. Include dimensions, material, grade, finish, quantity and application details wherever available.`,
  },
]

function productMatchesCategory(product: CountryProduct, category: CategoryDefinition) {
  return categoryMatches(product.category || "", category.canonical)
}

export default function CountryProductsClient({
  market,
  products,
}: {
  market: CountryMarket
  products: CountryProduct[]
}) {
  const { addToRFQ } = useRFQ()
  const [addedProduct, setAddedProduct] = useState<string | null>(null)

  const sections = useMemo(() => {
    const initialSections = CATEGORY_DEFINITIONS.map((category) => ({
      ...category,
      products: products.filter((product) => productMatchesCategory(product, category)),
    }))

    const matchedPrimaryProductIds = new Set(
      initialSections
        .filter((section) => section.key !== "other")
        .flatMap((section) => section.products.map((product) => product.id))
    )

    return initialSections.map((section) =>
      section.key === "other"
        ? {
            ...section,
            products: products.filter(
              (product) =>
                productMatchesCategory(product, section) ||
                !matchedPrimaryProductIds.has(product.id)
            ),
          }
        : section
    )
  }, [products])

  const handleWhatsApp = (product: CountryProduct) => {
    const phoneNumber = "971588713064"
    const message = `Hello SRK Bolt, I need a quotation for ${product.name} for ${market.country}.\n\nProduct: ${product.name}\nCategory: ${product.category}\nDestination market: ${market.country}\n\nPlease share availability and quotation.`
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer")
  }

  const handleAddToRFQ = (product: CountryProduct) => {
    addToRFQ(product.name, product.image)
    setAddedProduct(product.name)
    window.setTimeout(() => setAddedProduct(null), 2200)
  }

  return (
    <Layout>
      <section className="bg-[#2E1F44] text-white">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-sm text-white/70 mb-5">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span>{market.shortName}</span>
              <span className="mx-2">/</span>
              <span>Products</span>
            </div>
            <div className="grid lg:grid-cols-[1.45fr_0.55fr] gap-10 items-center">
              <div>
                <p className="uppercase tracking-[0.2em] text-sm font-semibold text-[#FFD5D5] mb-3">
                  UAE-Based Regional Supply
                </p>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                  Industrial Fasteners in {market.country}
                </h1>
                <p className="text-lg md:text-xl leading-relaxed text-white/85 max-w-4xl">
                  {market.intro}
                </p>
              </div>
              <div className="bg-white/10 border border-white/15 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4">Main product categories</h2>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {CATEGORY_DEFINITIONS.map((category) => (
                    <a
                      key={category.key}
                      href={`#${category.key}`}
                      className="rounded-lg bg-white/10 px-3 py-2 hover:bg-white/20 transition-colors"
                    >
                      {category.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-bold text-[#2E1F44] mb-4">
                Fastener Supply for {market.shortName} Projects & Procurement
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">{market.marketContext}</p>
              <p className="text-gray-700 leading-relaxed">{market.procurementNote}</p>
            </div>
            <div className="rounded-2xl bg-[#F7F7FA] p-7 border border-[#EDEDED]">
              <h3 className="text-xl font-semibold text-[#2E1F44] mb-4">Common sectors supported</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {market.industryFocus.map((industry) => (
                  <span key={industry} className="rounded-full bg-white border border-[#E6E2EA] px-3 py-1.5 text-sm text-[#2E1F44] capitalize">
                    {industry}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-semibold text-[#2E1F44] mb-2">Key markets</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{market.cities.join(" • ")}</p>
            </div>
          </div>
        </div>
      </section>

      <main className="bg-[#F7F7FA]">
        <div className="container mx-auto px-4 py-14">
          <div className="max-w-7xl mx-auto space-y-16">
            {sections.map((section) => (
              <section key={section.key} id={section.key} className="scroll-mt-28">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-7">
                  <div className="max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#2E1F44] mb-4">
                      {section.seoLabel} Supplier in {market.country}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{section.intro(market)}</p>
                  </div>
                  <Link
                    href={section.categoryHref}
                    className="shrink-0 text-[#A02222] font-semibold hover:text-[#2E1F44]"
                  >
                    View full {section.label} category →
                  </Link>
                </div>

                {section.products.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {section.products.map((product) => (
                      <article key={product.id} className="bg-white rounded-xl border border-[#E8E8EC] shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                        <Link href={`/view-details/${createSlug(product.name)}`} className="block bg-gray-50 aspect-square p-5">
                          <img src={product.image || "/placeholder.jpg"} alt={`${product.name} - ${market.shortName}`} className="w-full h-full object-contain" />
                        </Link>
                        <div className="p-5 flex flex-col grow">
                          <h3 className="font-semibold text-[#2E1F44] text-lg leading-snug mb-2">
                            <Link href={`/view-details/${createSlug(product.name)}`} className="hover:text-[#A02222]">
                              {product.name}
                            </Link>
                          </h3>
                          {(product.standard || product.equivalentStandard) && (
                            <p className="text-xs font-medium text-[#A02222] mb-2">
                              {[product.standard, product.equivalentStandard].filter(Boolean).join(" • ")}
                            </p>
                          )}
                          <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 mb-4">
                            {product.description || `Industrial ${product.name} available for ${market.shortName} project and procurement enquiries.`}
                          </p>
                          <div className="mt-auto space-y-2">
                            <Link
                              href={`/view-details/${createSlug(product.name)}`}
                              className="w-full border border-[#2E1F44] text-[#2E1F44] hover:bg-[#2E1F44] hover:text-white rounded-md px-3 py-2 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                            >
                              <FileText className="w-4 h-4" /> View Details
                            </Link>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => handleWhatsApp(product)}
                                className="bg-[#25D366] hover:bg-[#1ebe5a] text-white rounded-md px-3 py-2 text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
                              >
                                <MessageCircle className="w-4 h-4" /> WhatsApp
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAddToRFQ(product)}
                                className="bg-[#A02222] hover:bg-[#2E1F44] text-white rounded-md px-3 py-2 text-sm font-semibold transition-colors"
                              >
                                Add to RFQ
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-300 bg-white p-7 text-gray-600">
                    Online listings for this category are being updated. Send the required standard, size, grade, finish and quantity for {market.shortName} availability and quotation.
                  </div>
                )}
              </section>
            ))}


          </div>
        </div>
      </main>

      <section className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2E1F44] text-center mb-10">
              Specify the Fastener, Not Just the Name
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-xl border border-[#EDEDED] p-6">
                <Wrench className="w-9 h-9 text-[#A02222] mb-4" />
                <h3 className="text-xl font-semibold text-[#2E1F44] mb-3">Standards & Dimensions</h3>
                <p className="text-gray-600 leading-relaxed">DIN, ISO, ASTM, BS or project references, plus diameter, length, thread and dimensional requirements.</p>
              </div>
              <div className="rounded-xl border border-[#EDEDED] p-6">
                <ShieldCheck className="w-9 h-9 text-[#A02222] mb-4" />
                <h3 className="text-xl font-semibold text-[#2E1F44] mb-3">Material, Grade & Finish</h3>
                <p className="text-gray-600 leading-relaxed">Carbon steel, stainless steel and other material options with the required strength grade, coating or protective finish.</p>
              </div>
              <div className="rounded-xl border border-[#EDEDED] p-6">
                <PackageCheck className="w-9 h-9 text-[#A02222] mb-4" />
                <h3 className="text-xl font-semibold text-[#2E1F44] mb-3">Project & Bulk RFQs</h3>
                <p className="text-gray-600 leading-relaxed">Submit product schedules, BOQs or drawings for project quantities, recurring requirements and consolidated fastener enquiries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7FA] border-y border-[#EDEDED]">
        <div className="container mx-auto px-4 py-14">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-[#2E1F44] mb-5">Supply Support for {market.country}</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{market.logistics}</p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2E1F44] mb-8">Fastener Supply FAQs — {market.shortName}</h2>
            <div className="space-y-5">
              {[
                {
                  q: `Does SRK Bolt supply industrial fasteners for ${market.country}?`,
                  a: `Yes. SRK Bolt is UAE-based and supports industrial fastener enquiries for ${market.country}. Supply is subject to product availability, required specification, quantity and agreed commercial and delivery terms.`,
                },
                {
                  q: `Which fastener categories can I source for ${market.shortName}?`,
                  a: "The country catalogue follows the same product structure as the SRK Bolt main menu: Bolts, Nuts, Washers, Screws, Hook & Eye, Rivets & Inserts, Heavy Load and Other Products. The listings shown in each section are fetched from the main SRK Bolt product database.",
                },
                {
                  q: "Can I send a BOQ or drawing instead of selecting individual products?",
                  a: "Yes. For project or bulk requirements, send the BOQ, drawing or technical schedule with quantities and any required standards, grades, materials or finishes. The sales team can review the requirement for quotation.",
                },
                {
                  q: "Which standards can be specified?",
                  a: "Products can be enquired by common standards such as DIN, ISO and ASTM, as well as project-specific drawings or specifications. Availability varies by product, grade, size and finish.",
                },
                {
                  q: `How do I request a quotation for delivery to ${market.shortName}?`,
                  a: `Add products to the RFQ list or contact SRK Bolt with the product name or standard, size, grade, material, finish, quantity and ${market.shortName} delivery requirement.`,
                },
              ].map((faq) => (
                <div key={faq.q} className="rounded-xl border border-[#EDEDED] p-6">
                  <h3 className="text-lg font-semibold text-[#2E1F44] mb-2">{faq.q}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#A02222] text-white">
        <div className="container mx-auto px-4 py-14">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Request a Fastener Quote for {market.shortName}</h2>
            <p className="text-white/85 text-lg max-w-3xl mx-auto mb-7">
              Share the product standard or drawing, dimensions, grade, material, finish, quantity and destination requirement. Our UAE sales team will review your enquiry for regional supply.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/rfq" className="bg-white text-[#A02222] hover:bg-[#2E1F44] hover:text-white rounded-lg px-7 py-3 font-semibold transition-colors">
                Request a Quote
              </Link>
              <Link href="/contact" className="border border-white text-white hover:bg-white hover:text-[#A02222] rounded-lg px-7 py-3 font-semibold transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {addedProduct && (
        <div className="fixed right-4 bottom-4 z-50 bg-white border border-green-200 shadow-xl rounded-xl px-5 py-4 flex items-center gap-3 max-w-sm">
          <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
          <div>
            <p className="font-semibold text-[#2E1F44]">Added to RFQ</p>
            <p className="text-sm text-gray-600 line-clamp-1">{addedProduct}</p>
          </div>
        </div>
      )}
    </Layout>
  )
}

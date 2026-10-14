import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Layout from "@/components/Layout"
import ProductImage from "@/components/ProductImage"
import { srkProducts } from "@/data/srk-products"
import { createSlug } from "@/lib/slug"
import { getProductBySlug, productSeoDescription, productSeoTitle, siteUrl } from "@/lib/srk-seo"
import { getMaterialFamilyByProductSlug, getMaterialVariantBySlug } from "@/lib/material-variants"
import { CheckCircle, FileText, MessageCircle, Layers } from "lucide-react"

export function generateStaticParams() {
  return srkProducts.map((product) => ({ slug: createSlug(product.name) }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug)
  if (!product) return { title: "Product Not Found", robots: { index: false, follow: false } }
  const materialInfo = getMaterialVariantBySlug(params.slug)
  const materialKeyword = materialInfo ? `${materialInfo.variant.label} ${materialInfo.family.family}` : product.name
  const title = productSeoTitle(product)
  const description = productSeoDescription(product)
  return {
    title,
    description,
    keywords: [
      product.name,
      materialKeyword,
      product.standard || "industrial fasteners",
      product.category,
      product.material || product.specifications?.material || "fastener materials",
      "fastener supplier Dubai",
      "fasteners supplier UAE",
      "bolts and nuts supplier UAE",
      "industrial fasteners GCC",
    ],
    alternates: { canonical: `/products/${params.slug}` },
    openGraph: { title, description, url: `${siteUrl}/products/${params.slug}`, images: [{ url: product.image }], type: "website" },
  }
}

export default function ProductCleanPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const productSlug = createSlug(product.name)
  const materialFamily = getMaterialFamilyByProductSlug(productSlug)
  const materialVariant = getMaterialVariantBySlug(productSlug)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    brand: { "@type": "Brand", name: "SRK Bolts" },
    category: product.category,
    sku: product.id,
    additionalProperty: [
      product.standard ? { "@type": "PropertyValue", name: "Standard", value: product.standard } : null,
      product.material ? { "@type": "PropertyValue", name: "Material", value: product.material } : null,
      product.sizes ? { "@type": "PropertyValue", name: "Sizes", value: product.sizes } : null,
      materialVariant ? { "@type": "PropertyValue", name: "Material option", value: materialVariant.variant.label } : null,
    ].filter(Boolean),
  }

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-[#F7F7FA] py-14">
        <div className="container mx-auto max-w-7xl px-4">
          <Link href={product.category ? `/products` : "/products"} className="mb-6 inline-flex text-sm font-semibold text-[#A02222] hover:underline">← Back to products</Link>
          <div className="grid gap-8 rounded-3xl bg-white p-6 shadow-lg lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
            <div className="flex min-h-[340px] items-center justify-center rounded-2xl bg-gray-50 p-8">
              <ProductImage src={product.image} name={product.name} category={product.category} material={product.material || product.specifications?.material} alt={product.name} width={520} height={520} loading="eager" className="max-h-[380px] w-auto object-contain" />
            </div>
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#A02222]">{product.category}</p>
              {materialVariant && (
                <div className="mb-3 inline-flex items-center rounded-full border border-[#A02222]/20 bg-[#FCE9E9] px-3 py-1 text-xs font-bold text-[#A02222]">
                  <Layers className="mr-1.5 h-3.5 w-3.5" /> {materialVariant.variant.label}
                </div>
              )}
              <h1 className="mb-4 text-4xl font-bold text-[#2E1F44]">{product.name}</h1>
              <p className="mb-6 text-lg leading-8 text-[#2E1F44]/75">{product.description}</p>
              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                {[
                  ["Standard", product.standard || product.specifications?.standard],
                  ["Material", product.material || product.specifications?.material],
                  ["Grades", product.grades?.join(", ") || product.specifications?.grades?.join(", ")],
                  ["Sizes", product.sizes || product.specifications?.sizes],
                  ["Coating", product.coating?.join(", ") || product.specifications?.coating?.join(", ")],
                ].filter(([, value]) => value).map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-gray-200 bg-[#F7F7FA] p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#A02222]">{label}</p>
                    <p className="mt-1 text-sm font-semibold text-[#2E1F44]">{value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/rfq" className="inline-flex items-center justify-center rounded-lg bg-[#A02222] px-5 py-3 text-sm font-bold text-white hover:bg-[#2E1F44]"><FileText className="mr-2 h-4 w-4" /> Add to RFQ</Link>
                <a href={`https://wa.me/971588713064?text=${encodeURIComponent(`Hello SRK Bolts, I need quotation for ${product.name}.`)}`} className="inline-flex items-center justify-center rounded-lg bg-[#25D366] px-5 py-3 text-sm font-bold text-white hover:bg-[#1ebe5a]"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp</a>
              </div>
            </div>
          </div>


          {materialFamily && (
            <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#A02222]">Material options</p>
                  <h2 className="mt-2 text-2xl font-bold text-[#2E1F44]">{materialFamily.family} Available in MS, GI, HDG, SS304 and SS316</h2>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-[#2E1F44]/70">
                  Choose the correct material page for your quotation. SRK Bolts can review the project standard, grade, finish, size and quantity before quoting.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {materialFamily.variants.map((item) => {
                  const isActive = item.slug === productSlug
                  return (
                    <Link
                      key={item.slug}
                      href={`/products/${item.slug}`}
                      className={`rounded-2xl border p-4 transition ${isActive ? "border-[#A02222] bg-[#FCE9E9] shadow-sm" : "border-gray-200 bg-[#F7F7FA] hover:border-[#A02222]/40 hover:bg-white"}`}
                    >
                      <p className="text-sm font-extrabold text-[#A02222]">{item.shortLabel}</p>
                      <p className="mt-1 text-sm font-bold text-[#2E1F44]">{item.label}</p>
                      <p className="mt-2 text-xs leading-5 text-[#2E1F44]/65">{item.use}</p>
                      <span className="mt-3 inline-block text-xs font-bold text-[#A02222]">{isActive ? "Current page" : "View page →"}</span>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}

          <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#A02222]">Product Expertise</p>
            <h2 className="mb-4 text-2xl font-bold text-[#2E1F44]">{product.name} for UAE and GCC Project Requirements</h2>
            <div className="space-y-4 text-base leading-8 text-[#2E1F44]/75">
              <p>
                SRK Bolts supplies {product.name} for procurement teams that need dependable industrial fasteners with clear material, grade, finish and size information before placing an RFQ. The product can be requested for construction, steel fabrication, machinery, marine, oil and gas, MEP and maintenance applications depending on the required specification.
              </p>
              <p>
                Buyers often compare fastener options by standard, thread size, tensile class, stainless grade, galvanized coating, corrosion resistance and delivery location. SRK Bolts can review requirements such as {product.standard || product.specifications?.standard || "DIN, ISO, ASTM or drawing-based standard"}, {product.material || product.specifications?.material || "MS, GI, HDG, SS304 or SS316 material"}, {product.sizes || product.specifications?.sizes || "requested size range"} and bulk quantity before quotation.
              </p>
              <p>
                For faster support, send a drawing, BOQ line item, sample photo or previous purchase reference with the required quantity and delivery city. This helps the team confirm whether the enquiry needs MS, GI, HDG, SS304, SS316 or another material option.
              </p>
            </div>
          </section>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <Info title="Key features" items={product.features} />
            <Info title="Common uses" items={product.uses} />
            <Info title="RFQ checklist" items={["standard or drawing", "size and length", "grade/material", "coating/finish", "quantity", "delivery city"]} />
          </div>
        </div>
      </section>
    </Layout>
  )
}

function Info({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-[#2E1F44]">{title}</h2>
      <ul className="space-y-2">
        {items.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-[#2E1F44]/75"><CheckCircle className="mt-1 h-4 w-4 shrink-0 text-[#A02222]" />{item}</li>)}
      </ul>
    </div>
  )
}

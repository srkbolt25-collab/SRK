"use client"

import Link from "next/link"
import ProductImage from "@/components/ProductImage"
import { CheckCircle, FileText, HelpCircle, MapPin, ShieldCheck, Wrench } from "lucide-react"
import { srkProducts, type SRKProduct } from "@/data/srk-products"
import { createSlug } from "@/lib/slug"
import { countries, seoCategories, priorityBuyerQueries, type CountryPage, type SeoCategory } from "@/lib/srk-seo"

export function HomeSEOSection() {
  const faqs = [
    ["Who is SRK Bolts?", "SRK Bolts is a UAE-based industrial fastener supplier supporting construction, steel fabrication, oil and gas, marine, MEP, infrastructure and maintenance buyers with bolts, nuts, washers, screws, threaded rods, anchors and project hardware."],
    ["What products does SRK Bolts supply?", "SRK Bolts supplies hex bolts, anchor bolts, stud bolts, threaded bars, nuts, washers, screws, rivets, inserts, hook and eye products, U bolts, foundation bolts, Nord Lock washers, cup washers and heavy-load attachments."],
    ["Does SRK Bolts supply DIN, ISO and ASTM fasteners?", "Yes. SRK Bolts supports DIN, ISO, ASTM, BS, JIS and drawing-based fastener requirements depending on the required product, material, grade, size, coating and application."],
    ["Can SRK Bolts support GCC enquiries?", "Yes. SRK Bolts supports RFQ enquiries from UAE, Qatar, Saudi Arabia, Kuwait, Bahrain, Oman, Iraq and Jordan with quotation guidance for industrial and project fasteners."],
  ]

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#A02222]">Fastener Supply Partner</p>
            <h2 className="mb-5 text-3xl font-bold text-[#2E1F44] md:text-4xl">Fasteners Supplier in UAE for Industrial, Construction and GCC Project Requirements</h2>
            <div className="space-y-4 text-base leading-8 text-[#2E1F44]/80">
              <p>
                SRK Bolts is positioned for procurement teams searching for a dependable fasteners supplier in UAE, bolt supplier in Dubai, bolts and nuts supplier UAE and industrial fasteners supplier for GCC projects. The website now focuses on buyer intent around product standards, material options, coatings, grade selection, bulk supply and RFQ support rather than generic catalogue browsing only.
              </p>
              <p>
                The range covers bolts, nuts, washers, screws, threaded rods, anchor bolts, stud bolts, rivets, inserts, hook and eye products, U bolts, foundation bolts, Nord Lock washers, DTI washers and heavy-load attachments. Buyers can request MS, GI, HDG, SS304, SS316, zinc plated, hot dip galvanized, zinc flake and other finish options depending on site exposure and application.
              </p>
              <p>
                SRK Bolts supports construction, structural steel, MEP, oil and gas, marine, infrastructure, manufacturing, fabrication and maintenance requirements across UAE, Qatar, Saudi Arabia, Kuwait, Bahrain, Oman, Iraq and Jordan. Each commercial page includes answer-first information, technical product context and RFQ guidance so buyers can understand the product range quickly.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/rfq" className="rounded-lg bg-[#A02222] px-5 py-3 text-sm font-bold text-white hover:bg-[#2E1F44]">Request Fastener Quote</Link>
              <Link href="/countries" className="rounded-lg border border-[#A02222]/30 px-5 py-3 text-sm font-bold text-[#A02222] hover:bg-[#A02222]/10">View GCC Markets</Link>
            </div>
            <div className="mt-8 rounded-2xl border border-gray-200 bg-[#F7F7FA] p-5">
              <h3 className="mb-3 text-xl font-bold text-[#2E1F44]">Common buyer enquiries</h3>
              <div className="flex flex-wrap gap-2">
                {priorityBuyerQueries.map((keyword) => (
                  <span key={keyword} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#2E1F44] shadow-sm">{keyword}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-[#F7F7FA] p-6">
            <h3 className="mb-4 text-xl font-bold text-[#2E1F44]">Answer-first information</h3>
            <div className="space-y-4">
              {faqs.map(([question, answer]) => (
                <div key={question} className="rounded-xl bg-white p-4 shadow-sm">
                  <h4 className="mb-2 flex items-center gap-2 font-bold text-[#2E1F44]"><HelpCircle className="h-4 w-4 text-[#A02222]" />{question}</h4>
                  <p className="text-sm leading-6 text-[#2E1F44]/75">{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CategorySEOSection({ category }: { category: SeoCategory }) {
  return (
    <section className="bg-white py-14">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#A02222]">Technical Category Guide</p>
            <h2 className="mb-5 text-3xl font-bold text-[#2E1F44]">{category.h1}</h2>
            <div className="space-y-4 text-base leading-8 text-[#2E1F44]/80">
              <p>{category.description}</p>
              <p>
                Procurement teams commonly ask for {category.secondaryKeywords.slice(0, 4).join(", ")}. SRK Bolts supports these enquiries with clear standards, grade, material, finish and application guidance before quotation.
              </p>
              <p>
                Common materials and finishes for {category.label.toLowerCase()} include {category.materials.join(", ")}. Typical applications include {category.applications.join(", ")}. When requesting a quote, share {category.rfqFields.join(", ")}.
              </p>
              <p>
                SRK Bolts can support {category.expertise.join(", ")}. This helps reduce specification errors and gives buyers a clearer path from search to RFQ submission.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard title="Common Standards" items={category.standards} icon="standard" />
            <InfoCard title="RFQ Details Needed" items={category.rfqFields} icon="rfq" />
            <InfoCard title="Material Options" items={category.materials} icon="standard" />
            <InfoCard title="Common Enquiries" items={category.secondaryKeywords.slice(0, 6)} icon="rfq" />
          </div>
        </div>
        <AnswerBlock title={`${category.label} FAQ for Google, AEO and AI Search`} items={category.buyerQuestions} />
        <InternalMarketLinks category={category} />
      </div>
    </section>
  )
}

export function CountrySEOSection({ country }: { country: CountryPage }) {
  return (
    <section className="bg-white py-14">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#A02222]">GCC Market Support</p>
            <h1 className="mb-5 text-4xl font-bold text-[#2E1F44]">Fasteners Supplier in {country.name}</h1>
            <div className="space-y-4 text-base leading-8 text-[#2E1F44]/80">
              <p>{country.description}</p>
              <p>
                SRK Bolts supports procurement teams, contractors, fabricators and maintenance departments sourcing fasteners for {country.market}. Common enquiries include {country.focus.join(", ")} as well as {country.secondaryKeywords.join(", ")}.
              </p>
              <p>
                Buyers in {country.cities.join(", ")} can request bolts, nuts, washers, screws, threaded rods, anchor bolts, stud bolts, SS304 fasteners, SS316 fasteners, galvanized fasteners and high tensile hardware for {country.industries.join(", ")} applications.
              </p>
              <p>
                For faster quotation support, share the product standard, grade, size, material, coating, quantity, destination city and any drawing or BOQ reference. SRK Bolts can help compare MS, GI, HDG, SS304 and SS316 options based on application and exposure.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-[#F7F7FA] p-6">
            <h2 className="mb-4 text-xl font-bold text-[#2E1F44]">Fastener categories for {country.name}</h2>
            <div className="grid gap-2">
              {seoCategories.map((category) => (
                <Link key={category.slug} href={`/countries/${country.slug}/${category.slug}`} className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-[#2E1F44] shadow-sm hover:text-[#A02222]">
                  {category.label} in {country.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <AnswerBlock
          title={`Fastener Supply FAQ for ${country.name}`}
          items={[
            { question: `Does SRK Bolts supply fasteners to ${country.name}?`, answer: `Yes. SRK Bolts supports ${country.name} enquiries for industrial fasteners including bolts, nuts, washers, screws, anchors, threaded rods and stainless steel fasteners.` },
            { question: `Which cities in ${country.name} are targeted?`, answer: `SRK Bolts supports enquiries from ${country.cities.join(", ")} and related industrial/project locations.` },
            { question: `What information is needed for a ${country.name} fastener RFQ?`, answer: "Share product name, standard, grade, material, coating, size, quantity, destination city, application and any drawing or BOQ reference." },
          ]}
        />
        <CountryProductGrid country={country} />
      </div>
    </section>
  )
}

export function CountryCategorySEOSection({ country, category }: { country: CountryPage; category: SeoCategory }) {
  return (
    <section className="bg-white py-14">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#A02222]">{country.name} Fastener Supply</p>
            <h1 className="mb-5 text-4xl font-bold text-[#2E1F44]">{category.label} Supplier in {country.name}</h1>
            <div className="space-y-4 text-base leading-8 text-[#2E1F44]/80">
              <p>
                SRK Bolts supplies {category.label.toLowerCase()} for {country.name} projects covering {country.cities.slice(0, 4).join(", ")} and related industrial zones. Common enquiries include {category.secondaryKeywords.slice(0, 4).join(", ")} together with country-specific requirements such as {country.focus.slice(0, 3).join(", ")}.
              </p>
              <p>
                The category supports requirements for {category.applications.join(", ")}. Buyers can request {category.standards.slice(0, 5).join(", ")} standards and material options such as {category.materials.slice(0, 6).join(", ")} depending on project environment and specification.
              </p>
              <p>
                For {country.name} procurement, share {category.rfqFields.join(", ")}. SRK Bolts can help review technical details before quotation so the enquiry is more complete for construction, MEP, fabrication, oil and gas, marine or maintenance use.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard title="Standards & Options" items={category.standards} icon="standard" />
            <InfoCard title="RFQ Checklist" items={category.rfqFields} icon="rfq" />
            <InfoCard title="Material / Finish" items={category.materials} icon="standard" />
            <InfoCard title={`${country.name} Buyer Enquiries`} items={[...country.focus.slice(0, 3), ...category.secondaryKeywords.slice(0, 3)]} icon="rfq" />
          </div>
        </div>
        <AnswerBlock title={`${category.label} FAQ for ${country.name}`} items={category.buyerQuestions.map((item) => ({ question: item.question.replace("Dubai", country.name).replace("UAE", country.name), answer: item.answer.replace("Dubai", country.name).replace("UAE", country.name) }))} />
        <CountryProductGrid country={country} category={category} />
        <div className="mt-10 rounded-2xl bg-[#A02222] p-8 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold">Need {category.label} for {country.name}?</h2>
          <p className="mx-auto mb-5 max-w-2xl text-white/85">Send your specification, drawing, quantity and delivery city. Our team will respond with suitable fastener options and quotation guidance.</p>
          <Link href="/rfq" className="inline-flex rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#A02222] hover:bg-gray-100">Request Quote</Link>
        </div>
      </div>
    </section>
  )
}

function getCountryProducts(category?: SeoCategory) {
  const products = category
    ? srkProducts.filter((product) => product.category === category.categoryKey)
    : srkProducts.filter((product) => ["BOLTS", "NUTS", "WASHERS", "SCREWS", "HOOK & EYE", "ATTACHMENTS"].includes(product.category))

  const priorityTerms = ["SS316", "SS304", "MS", "GI", "HDG", "Hex Bolt", "Threaded", "Stud", "Washer", "U Bolt", "Anchor", "Socket", "Foundation", "Nord Lock"]

  return [...products]
    .sort((a, b) => {
      const aScore = priorityTerms.reduce((score, term) => score + (a.name.toLowerCase().includes(term.toLowerCase()) ? 1 : 0), 0)
      const bScore = priorityTerms.reduce((score, term) => score + (b.name.toLowerCase().includes(term.toLowerCase()) ? 1 : 0), 0)
      return bScore - aScore
    })
    .slice(0, category ? 16 : 12)
}

function CountryProductGrid({ country, category }: { country: CountryPage; category?: SeoCategory }) {
  const products = getCountryProducts(category)
  const title = category ? `${category.label} Products for ${country.name}` : `Popular Fastener Products for ${country.name}`
  const intro = category
    ? `Browse ${category.label.toLowerCase()} options commonly requested for ${country.market}. Each card links to a clean product page with specifications, material options and RFQ support.`
    : `Browse commonly requested fasteners for ${country.market}. These product cards help procurement teams move from the country page to detailed product specifications and quotation pages.`

  if (!products.length) return null

  return (
    <section className="mt-12 rounded-3xl border border-gray-200 bg-[#F7F7FA] p-5 shadow-sm md:p-8">
      <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#A02222]">Product Catalogue</p>
          <h2 className="text-2xl font-bold text-[#2E1F44] md:text-3xl">{title}</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-[#2E1F44]/70">{intro}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductGridCard key={`${country.slug}-${category?.slug || "all"}-${product.id}`} product={product} country={country} />
        ))}
      </div>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-[#2E1F44]/70">Need a material not shown here? Share the standard, grade, finish, size and quantity for {country.name} delivery support.</p>
        <Link href="/rfq" className="inline-flex shrink-0 justify-center rounded-lg bg-[#A02222] px-5 py-3 text-sm font-bold text-white hover:bg-[#2E1F44]">Request Quote</Link>
      </div>
    </section>
  )
}

function ProductGridCard({ product, country }: { product: SRKProduct; country: CountryPage }) {
  const productSlug = createSlug(product.name)
  const materialText = product.material || product.specifications?.material || product.category
  const standardText = product.standard || product.specifications?.standard || "DIN / ISO / ASTM"

  return (
    <Link href={`/products/${productSlug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#A02222]/35 hover:shadow-lg">
      <div className="flex aspect-square items-center justify-center bg-white p-4">
        <ProductImage src={product.image} name={product.name} category={product.category} material={product.material || product.specifications?.material} alt={`${product.name} supplier for ${country.name}`} width={320} height={320} className="h-full w-full object-contain transition duration-300 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#A02222]">{product.category}</p>
        <h3 className="line-clamp-2 text-sm font-extrabold leading-5 text-[#2E1F44] md:text-base">{product.name}</h3>
        <div className="mt-3 space-y-1 text-xs leading-5 text-[#2E1F44]/65">
          <p><span className="font-bold text-[#2E1F44]">Material:</span> {materialText}</p>
          <p><span className="font-bold text-[#2E1F44]">Standard:</span> {standardText}</p>
        </div>
        <span className="mt-auto pt-4 text-xs font-bold text-[#A02222]">View details →</span>
      </div>
    </Link>
  )
}

function AnswerBlock({ title, items }: { title: string; items: Array<{ question: string; answer: string }> }) {
  return (
    <section className="mt-10 rounded-3xl border border-gray-200 bg-[#F7F7FA] p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <ShieldCheck className="h-7 w-7 text-[#A02222]" />
        <h2 className="text-2xl font-bold text-[#2E1F44]">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.question} className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="mb-2 flex items-start gap-2 text-base font-bold text-[#2E1F44]"><HelpCircle className="mt-1 h-4 w-4 shrink-0 text-[#A02222]" />{item.question}</h3>
            <p className="text-sm leading-6 text-[#2E1F44]/70">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function InfoCard({ title, items, icon }: { title: string; items: string[]; icon: "standard" | "rfq" }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-[#F7F7FA] p-5">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#2E1F44]">
        {icon === "standard" ? <FileText className="h-5 w-5 text-[#A02222]" /> : <CheckCircle className="h-5 w-5 text-[#A02222]" />}
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-[#2E1F44]/75">
            <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-[#A02222]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function InternalMarketLinks({ category }: { category: SeoCategory }) {
  return (
    <div className="mt-10 rounded-2xl border border-gray-200 bg-[#F7F7FA] p-6">
      <div className="mb-4 flex items-center gap-2"><MapPin className="h-5 w-5 text-[#A02222]" /><h3 className="text-xl font-bold text-[#2E1F44]">{category.label} by GCC market</h3></div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {countries.map((country) => (
          <Link key={country.slug} href={`/countries/${country.slug}/${category.slug}`} className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-[#2E1F44] shadow-sm hover:text-[#A02222]">
            {category.label} in {country.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

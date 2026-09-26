import type { Metadata } from "next"
import Layout from "@/components/Layout"

export const metadata: Metadata = {
  title: "Website Terms | SRK Bolt",
  description: "Website terms covering SRK Bolt product information, enquiries and quotations.",
  alternates: { canonical: "https://www.srkbolt.com/terms" },
}

export default function TermsPage() {
  return (
    <Layout>
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-[#2E1F44] mb-6">Website Terms</h1>
          <div className="prose max-w-none text-gray-700">
            <p>The SRK Bolt website provides general product, market and company information for industrial procurement enquiries. Website content does not replace an approved project specification, engineering review or formal quotation.</p>
            <h2>Product information</h2>
            <p>Standards, dimensions, grades, materials, finishes, images and availability shown online should be confirmed for the specific enquiry. Products and specifications may change or be updated without prior notice.</p>
            <h2>Quotations and supply</h2>
            <p>Prices, lead times, delivery terms, availability and commercial conditions apply only when confirmed in an SRK Bolt quotation or order communication. Buyers should state the complete required standard, size, grade, material, finish, quantity and destination.</p>
            <h2>Website use</h2>
            <p>Users should not misuse the website, interfere with its operation or submit unlawful or misleading material. External links, where present, are provided for convenience and are subject to the destination provider's terms.</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

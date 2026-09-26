import type { Metadata } from "next"
import Layout from "@/components/Layout"

export const metadata: Metadata = {
  title: "Privacy Policy | SRK Bolt",
  description: "Privacy information for enquiries and website use on the SRK Bolt website.",
  alternates: { canonical: "https://www.srkbolt.com/privacy" },
}

export default function PrivacyPage() {
  return (
    <Layout>
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-[#2E1F44] mb-6">Privacy Policy</h1>
          <div className="prose max-w-none text-gray-700">
            <p>SRK Bolt uses information submitted through contact, RFQ and enquiry forms to review and respond to business requests. Information may include contact details, company information, project requirements, technical specifications and files voluntarily supplied with an enquiry.</p>
            <h2>How information is used</h2>
            <p>Submitted information is used for quotation, product and availability review, technical or commercial follow-up, customer service and related business communication. Website systems may also collect standard technical logs required for security, reliability and analytics.</p>
            <h2>Sharing and retention</h2>
            <p>Information is not intended for sale to third parties. It may be processed by service providers used to operate the website and business communications, subject to their applicable terms and safeguards. Records may be retained where reasonably required for enquiries, transactions, compliance or legitimate business records.</p>
            <h2>Contact</h2>
            <p>For privacy-related questions concerning information submitted through this website, contact sales@srkbolt.com.</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

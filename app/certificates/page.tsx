import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import { Download, FileCheck2, ExternalLink, ShieldCheck } from "lucide-react";

const certificates = [
  { code: "ISO 9001:2015", title: "Quality Management System", id: "212447", image: "/certificates/srk-metals-iso-9001.png", pdf: "/certificates/srk-metals-iso-9001.pdf" },
  { code: "ISO 14001:2015", title: "Environmental Management System", id: "212448", image: "/certificates/srk-metals-iso-14001.png", pdf: "/certificates/srk-metals-iso-14001.pdf" },
  { code: "ISO 45001:2018", title: "Occupational Health & Safety Management System", id: "ISO 45001/780", image: "/certificates/srk-metals-iso-45001.png", pdf: "/certificates/srk-metals-iso-45001.pdf" },
];

export default function CertificatesPage() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-[#A02222] to-[#711818] px-4 py-14 text-center text-white sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold"><ShieldCheck className="h-4 w-4" /> Documentation & Standards</div>
          <h1 className="text-3xl font-extrabold sm:text-5xl">Our Certificates</h1>
          <p className="mx-auto mt-5 max-w-3xl leading-7 text-white/90">Explore the management-system certificates issued to SRK METALS FZE-LLC, covering quality, environmental management and occupational health and safety.</p>
        </div>
      </section>
      <section className="bg-[#f7f7f9] px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-start gap-3"><FileCheck2 className="mt-1 h-6 w-6 shrink-0 text-[#A02222]" /><div>
              <h2 className="text-xl font-bold text-[#2E1F44]">Certification Details</h2>
              <p className="mt-2 leading-7 text-gray-700">Certificate holder: <strong>SRK METALS FZE-LLC</strong>, Sharjah, UAE. Issued by SWISS CERT Pvt. Ltd. The uploaded certificates state a validity period from <strong>24 September 2026 to 23 September 2029</strong>, subject to satisfactory surveillance audits. Certificates cover the activities specified on each document, including the supply and trading of fasteners.</p>
              <p className="mt-2 text-sm text-gray-600">These documents identify SRK METALS FZE-LLC as the certified legal entity; this page does not independently verify current accreditation status.</p>
            </div></div>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {certificates.map((certificate) => (
              <article key={certificate.code} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <a href={certificate.pdf} target="_blank" rel="noopener noreferrer" className="block bg-gray-100 p-4" aria-label={`View ${certificate.code} certificate PDF`}>
                  <Image src={certificate.image} alt={`${certificate.code} certificate issued to SRK METALS FZE-LLC`} width={900} height={1200} className="mx-auto h-auto w-full rounded bg-white object-contain shadow-sm" />
                </a>
                <div className="space-y-3 p-5">
                  <h2 className="text-xl font-extrabold text-[#A02222]">{certificate.code}</h2>
                  <p className="font-semibold text-[#2E1F44]">{certificate.title}</p>
                  <p className="text-sm text-gray-600">Certificate number: {certificate.id}</p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a href={certificate.pdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[#A02222] px-4 py-2 text-sm font-semibold text-[#A02222] hover:bg-red-50"><ExternalLink className="h-4 w-4" /> View</a>
                    <a href={certificate.pdf} download className="inline-flex items-center gap-2 rounded-lg bg-[#A02222] px-4 py-2 text-sm font-semibold text-white hover:bg-[#821b1b]"><Download className="h-4 w-4" /> Download PDF</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center"><Link href="/contact" className="inline-block rounded-lg bg-[#A02222] px-7 py-3 font-semibold text-white hover:bg-[#821b1b]">Request Certification Information</Link></div>
        </div>
      </section>
    </Layout>
  );
}

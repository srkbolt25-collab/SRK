"use client"

import Layout from "@/components/Layout"
import { BadgeCheck } from "lucide-react"

const BRAND_LOGOS: Array<{ name: string; logo: string; cardClass?: string }> = [
    {
    name: "Applied Bolting Technologies",
    logo: "https://appliedbolting.com/wp-content/uploads/2025/02/abt_logo.png",
    cardClass: "bg-[#E3ECFF] border-[#B7CDFD]",
  },
  {
    name: "SRK Bolt Industries",
    logo: "/banner_edited-removebg-preview.png",
    cardClass: "bg-white",
  },
  {
    name: "Shanghai Fastener Industrial Export Co.",
    logo: "https://resource.sfiec.cn/portal/image/index/logo.png",
    cardClass: "bg-white",
  },
  {
    name: "Schaefer + Peters",
    logo: "https://www.schaefer-peters.com/userdata/images/basics/logo.svg",
    cardClass: "bg-white",
  },
  {
    name: "Savron Fasteners",
    logo: "/image-removebg-preview (16).png",
    cardClass: "bg-white",
  },
  {
    name: "Sundram Fasteners",
    logo: "https://www.sundram.com/images/logo.png",
    cardClass: "bg-[#FFF1E5] border-[#F4CBA3]",
  },
]

export default function BrandsPage() {
  return (
    <Layout>
      <section className="relative h-96 bg-linear-to-br from-[#2E1F44] via-[#24163A] to-[#1C1233] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80')] opacity-20 bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full container mx-auto px-4 flex flex-col justify-center items-center text-center gap-4">
          <span className="inline-flex items-center gap-2 bg-white/15 px-4 py-1.5 rounded-full uppercase tracking-[0.3em] text-sm font-semibold">
            <BadgeCheck className="w-4 h-4" />
            Trusted Brands
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Strategic Brands & Partners Delivering Consistent Quality
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            We collaborate with globally respected manufacturers to ensure every fastening solution aligns with stringent
            performance, safety, and compliance benchmarks.
          </p>
          <a
            href="/srk-fastener.pdf"
            download
            className="inline-flex items-center gap-2 bg-white text-[#A02222] px-6 py-2.5 rounded-lg font-semibold border border-white hover:bg-[#A02222] hover:text-white transition-colors shadow-lg"
          >
            See Products
          </a>
        </div>
      </section>

      <section className="py-16 bg-[#F7F7FA]">
        <div className="container mx-auto px-4 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#2E1F44]">Our Brand Ecosystem</h2>
            <p className="text-[rgba(46,31,68,0.8)]">
              From in-house labels to strategic alliances, each brand is curated to cover critical industry demands—whether
              it is construction, oil & gas, heavy machinery, marine, or renewables.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {BRAND_LOGOS.map((brand) => (
              <div
                key={brand.name}
                className={`${brand.cardClass ?? "bg-white"} rounded-2xl shadow-[0_12px_30px_rgba(46,31,68,0.08)] border border-[#E4E1F0] flex items-center justify-center p-8 min-h-[220px]`}
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="max-h-32 w-auto object-contain"
                  loading="lazy"
                />
                </div>
            ))}
                </div>
              </div>
      </section>
    </Layout>
  )
}


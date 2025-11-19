"use client"

import { createSlug } from "@/lib/slug"

import Layout from "@/components/Layout"
import { useState } from "react"
import { useCategoryProducts } from "@/hooks/useCategoryProducts"
import { useRFQ } from "@/contexts/RFQContext"
import { FileText, MessageCircle, Layers, PackageSearch, Puzzle, CheckCircle } from "lucide-react"

export default function OtherFastenersPage() {
  const { products, loading, error } = useCategoryProducts("OTHER")
  const { addToRFQ } = useRFQ()
  const [isRFQPopupOpen, setIsRFQPopupOpen] = useState(false)
  const [rfqProductName, setRfqProductName] = useState("")

  const handleWhatsAppClick = (product: { name: string; category: string }) => {
    const phoneNumber = "971588713064"
    const message = `Hello! I'm interested in this product:\n\nProduct Name: ${product.name}\nCategory: ${product.category}\n\nPlease provide more information about this product.`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Layout>
      <section className="h-96 bg-linear-to-br from-[#2E1F44] via-[#3A2960] to-[#1C1233] text-white">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center gap-4">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-[0.2em]">
            <Layers className="w-4 h-4" />
            Miscellaneous Fasteners
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Specialized & Custom Fasteners for Unique Industrial Requirements
          </h1>
          <p className="text-white/80 max-w-2xl text-lg">
            Discover non-standard fasteners, specialty hardware, and custom components engineered for niche applications
            where typical catalogue items aren&apos;t enough.
          </p>
          <a
            href="/srk-fastener.pdf"
            download
            className="mt-2 inline-flex items-center gap-2 bg-white text-[#A02222] px-6 py-2.5 rounded-lg font-semibold border border-white hover:bg-[#A02222] hover:text-white transition-colors shadow-lg"
          >
          Download Catalogue
          </a>
        </div>
      </section>

      <section className="bg-[#F7F7FA] py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2E1F44] mb-4">Other Industrial Fasteners</h2>
            <p className="text-[rgba(46,31,68,0.85)] text-lg max-w-3xl mx-auto leading-relaxed">
              Every project is different. This catalogue covers unique fastening solutions ranging from locking mechanisms to
              made-to-order hardware for specialized machinery and infrastructure.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 text-center">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="h-64 rounded-xl bg-white animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="mb-16 rounded-2xl border border-dashed border-[#A02222]/40 bg-white p-12 text-center text-[#2E1F44]/70">
              No specialized fasteners have been added yet. Upload new products from the admin dashboard to populate this
              section.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col items-center text-center gap-4 h-full cursor-pointer"
                  onClick={() => {
                    const categoryParam = encodeURIComponent(product.category || "OTHER")
                    window.location.href = `/view-details/${createSlug(product.name)}`
                  }}
                >
                  <div className="w-full aspect-square bg-[#F1EFFA] rounded-lg flex items-center justify-center overflow-hidden p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-[#2E1F44]">{product.name}</h3>
                  <div className="w-full space-y-2.5 mt-auto">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          const categoryParam = encodeURIComponent(product.category || "OTHER")
                          window.location.href = `/view-details/${createSlug(product.name)}`
                        }}
                        className="flex-1 border border-[#2E1F44] text-[#2E1F44] text-xs font-semibold py-1.5 rounded-md transition-colors duration-200 flex items-center justify-center gap-1 hover:bg-[#A02222] hover:text-white hover:border-[#A02222]"
                      >
                        <FileText className="w-3 h-3" />
                        VIEW DETAILS
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleWhatsAppClick({
                            name: product.name,
                            category: product.category || "OTHER",
                          })
                        }}
                        className="flex-1 bg-[#25D366] hover:bg-[#1ebe5a] text-white text-xs font-semibold py-1.5 rounded-md transition-colors duration-200 flex items-center justify-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3" />
                        WHATSAPP
                      </button>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setRfqProductName(product.name)
                        setIsRFQPopupOpen(true)
                        addToRFQ(product.name, product.image)
                      }}
                      className="w-full bg-[#A02222] hover:bg-[#2E1F44] text-white text-xs font-semibold py-1.5 rounded-md transition-colors duration-200"
                    >
                      ADD TO RFQ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: PackageSearch,
                title: "Low Volume Specials",
                description: "Support for pilot projects and spare parts where only limited quantities are needed.",
              },
              {
                icon: Layers,
                title: "Material Flexibility",
                description: "Carbon steel, stainless, brass, high-nickel alloys, and engineered polymers available.",
              },
              {
                icon: Puzzle,
                title: "Custom Compatibility",
                description: "Precisely machined to integrate with bespoke equipment and legacy installations.",
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#A02222]/12 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-[#A02222]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2E1F44] mb-2">{feature.title}</h3>
                <p className="text-[#2E1F44]/75 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#A02222] text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Need a Custom Fastener?</h2>
            <p className="text-lg text-white/85 max-w-2xl mx-auto">
              Collaborate with our engineering team for bespoke designs, from prototype quantities to scalable production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#A02222] border border-white hover:bg-[#2E1F44] hover:text-white transition-colors duration-300 font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg">
                <FileText className="w-5 h-5" />
                Submit Requirements
              </button>
              <button className="border-[1.5px] border-white text-white hover:bg-white hover:text-[#A02222] transition-colors duration-300 font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {isRFQPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
            <div className="mb-6 flex justify-center">
              <CheckCircle className="w-24 h-24 text-[#25D366]" />
            </div>
            <h2 className="text-2xl font-bold text-[#2E1F44] mb-2">Product Added to RFQ!</h2>
            <p className="text-[#2E1F44]/80 text-lg mb-2">{rfqProductName}</p>
            <p className="text-[#2E1F44]/70 text-sm mb-6">
              The product has been added to your RFQ list. You can continue exploring or proceed to the RFQ summary.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setIsRFQPopupOpen(false)}
                className="w-full bg-[#A02222] hover:bg-[#2E1F44] text-white py-2 text-lg font-bold rounded-md transition-colors"
              >
                Continue Browsing
              </button>
              <button
                onClick={() => (window.location.href = "/rfq")}
                className="w-full bg-[#25D366] hover:bg-[#1ebe5a] text-white py-2 text-lg font-bold rounded-md transition-colors"
              >
                Go to RFQ
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}



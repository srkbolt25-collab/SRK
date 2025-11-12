"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Layout from "@/components/Layout"
import type { LucideIcon } from "lucide-react"
import {
  ChevronRight,
  ChevronLeft,
  Bolt,
  Nut,
  CircleDashed,
  Wrench,
  Link2,
  CircleDot,
  Settings,
  Layers,
  FileText,
  Phone,
  CheckCircle,
  MessageCircle,
} from "lucide-react"
import { useRFQ } from "@/contexts/RFQContext"
import { useCategoryProducts, type CategoryProductCard } from "@/hooks/useCategoryProducts"

type CategoryKey = "BOLTS" | "NUTS" | "WASHERS" | "SCREWS" | "HOOK & EYE" | "RIVETS" | "ATTACHMENTS" | "OTHER"

export default function SRKBoltHomepage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("BOLTS")
  const [isRFQPopupOpen, setIsRFQPopupOpen] = useState(false)
  const [rfqProductName, setRfqProductName] = useState("")
  
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Industrial Bolts & Screws"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Heavy Duty Fasteners"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Precision Engineering"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % slides.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev: number) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev: number) => (prev - 1 + slides.length) % slides.length)
  }

  type CategoryIcon =
    | { kind: "image"; src: string; alt: string }
    | { kind: "icon"; component: LucideIcon }

  const categories: Array<{ name: CategoryKey; icon: CategoryIcon }> = [
    { name: "BOLTS", icon: { kind: "image", src: "/icons8-bolt-64.png", alt: "Bolts Icon" } },
    { name: "NUTS", icon: { kind: "image", src: "/icons8-nut-64 (1).png", alt: "Nuts Icon" } },
    { name: "WASHERS", icon: { kind: "image", src: "/gasket.png", alt: "Washers Icon" } },
    { name: "SCREWS", icon: { kind: "image", src: "/screw (2).png", alt: "Screws Icon" } },
    { name: "HOOK & EYE", icon: { kind: "image", src: "/hookandeye.png", alt: "Hook and Eye Icon" } },
    { name: "RIVETS", icon: { kind: "image", src: "/rivet.png", alt: "Rivets Icon" } },
    { name: "ATTACHMENTS", icon: { kind: "icon", component: Settings } },
    { name: "OTHER", icon: { kind: "icon", component: Layers } },
  ]

  const { rfqCount, addToRFQ } = useRFQ()

  const {
    databaseProducts,
    loading: categoryLoading,
    error: categoryError,
  } = useCategoryProducts(selectedCategory)

  const handleWhatsAppClick = (product: CategoryProductCard) => {
    const phoneNumber = "971588713064" // WhatsApp number with country code
    const message = `Hello! I'm interested in this product:\n\nProduct Name: ${product.name}\nCategory: ${product.category}\n\nPlease provide more information about this product.`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Layout>
      {/* Hero Section - Image Slider */}
      <section className="relative h-96 overflow-hidden">
        {/* Slides */}
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full shrink-0 h-full relative">
              <img
                src={slide.image}
                alt="SRK Bolt Fasteners"
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for better contrast */}
              <div className="absolute inset-0 bg-black/40"></div>
              
              {/* Title overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <a
                    href="/srk-fastener.pdf"
                    download
                    className="mt-6 inline-flex items-center gap-2 bg-white text-[#A02222] px-6 py-2.5 rounded-lg font-semibold border border-white hover:bg-[#A02222] hover:text-white transition-colors shadow-lg"
                  >
                    See Products
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl rounded-full p-4 transition-all duration-300 transform hover:scale-110 z-10"
        >
          <ChevronLeft className="w-8 h-8 text-gray-800" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl rounded-full p-4 transition-all duration-300 transform hover:scale-110 z-10"
        >
          <ChevronRight className="w-8 h-8 text-gray-800" />
        </button>
        
      </section>

      {/* Product Catalog Section */}
      <section className="py-16 bg-[#F9F9F9]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2E1F44] mb-4">PRODUCT CATALOGUE</h2>
            <p className="text-[#555] text-lg max-w-3xl mx-auto">
              5k+ SKU's of fasteners supplies sourced from reputed manufacturers across India, Europe and Far East Asia available in stock.
            </p>
          </div>
          
          {/* Product Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
            {categories.map((category, index) => {
              const isSelected = selectedCategory === category.name
              return (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.name as CategoryKey)}
                  className={`group p-4 rounded-xl text-center cursor-pointer transition-all duration-300 border ${
                    isSelected
                    ? 'bg-[#A02222] text-white border-[#A02222] shadow-lg'
                    : 'bg-[#EDEDED] text-[#2E1F44] border-transparent hover:border-[#A02222]/40 hover:shadow-md'
                  }`}
                >
                  <div
                    className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-white border border-[#A02222]/40 shadow-[0_6px_14px_rgba(160,34,34,0.35)]'
                        : 'bg-[#FCE9E9] border border-[#A02222]/20 shadow-[0_2px_6px_rgba(160,34,34,0.12)]'
                    }`}
                  >
                    {category.icon.kind === "image" ? (
                      <div className="relative flex items-center justify-center w-full h-full">
                        <Image
                          src={category.icon.src}
                          alt={category.icon.alt}
                          width={36}
                          height={36}
                          className={`w-8 h-8 object-contain transition-transform duration-300 ${
                            isSelected ? 'group-hover:scale-[1.08]' : 'group-hover:scale-[1.05]'
                }`}
                          style={{ filter: "brightness(0) saturate(100%)" }}
                        />
                      </div>
                    ) : (
                      <category.icon.component
                        className={`w-6 h-6 transition-transform duration-300 ${
                          isSelected
                            ? 'text-black group-hover:scale-[1.08]'
                            : 'text-black group-hover:scale-[1.05]'
                        }`}
                      />
                    )}
                  </div>
                <p className="text-sm font-semibold">{category.name}</p>
                  {isSelected && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-2"></div>
                )}
              </button>
              )
            })}
          </div>
          
          {/* Product Grid */}
          {categoryError && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 text-center">
              {categoryError}
            </div>
          )}
          {categoryLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="h-72 bg-white/60 border border-[#E5E5E5] rounded-xl animate-pulse" />
              ))}
            </div>
          ) : databaseProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#A02222]/30 bg-white/60 p-12 text-center text-[#2E1F44]/70 mb-8">
              No products available in this category yet. Add new items from the admin dashboard to populate this catalogue.
            </div>
          ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {databaseProducts.slice(0, 8).map((product) => (
              <div
                  key={product.id ?? product.name}
                  className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                {/* Product Image */}
                <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Product Name */}
                <div className="p-4 text-center">
                  <h3 className="text-base font-semibold text-[#2E1F44] leading-tight">{product.name}</h3>
                </div>
                
                {/* Buttons */}
                <div className="px-4 pb-4">
                  <div className="flex gap-2 mb-3">
                    <button 
                      onClick={() => {
                          const categoryParam = encodeURIComponent(product.category || selectedCategory)
                          window.location.href = `/view-details?name=${encodeURIComponent(product.name)}&category=${categoryParam}`
                        }}
                      className="flex-1 border border-[#2E1F44] text-[#2E1F44] text-xs font-semibold py-2 rounded-md transition-colors duration-200 flex items-center justify-center hover:bg-[#A02222] hover:text-white hover:border-[#A02222]"
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      VIEW-DETAIL
                    </button>
                    <button 
                      onClick={() => handleWhatsAppClick(product)}
                      className="flex-1 bg-[#25D366] hover:bg-[#1ebe5a] text-white text-xs font-semibold py-2 rounded-md transition-colors duration-200 flex items-center justify-center"
                    >
                      <MessageCircle className="w-3 h-3 mr-1" />
                      WHATSAPP
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      setRfqProductName(product.name)
                      setIsRFQPopupOpen(true)
                      addToRFQ(product.name, product.image)
                    }}
                    className="w-full bg-[#A02222] hover:bg-[#2E1F44] text-white text-xs font-semibold py-2 rounded-md transition-colors duration-200"
                  >
                    ADD TO RFQ
                  </button>
                </div>
              </div>
            ))}
          </div>
          )}

          {/* Visit More Products Button */}
          <div className="text-center">
            <Button
              onClick={() => {
                const categoryUrl = selectedCategory.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')
                window.location.href = `/${categoryUrl}`
              }}
              className="bg-[#A02222] hover:bg-[#2E1F44] text-white px-12 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-110 shadow-lg hover:shadow-xl"
            >
              Visit More {selectedCategory} Products
              <ChevronRight className="w-6 h-6 ml-3" />
            </Button>
          </div>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="py-16 bg-[#F7F7FA]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-[#A02222] mb-4">SRK BOLT</h2>
                <h3 className="text-3xl font-bold text-[#2E1F44] mb-2">
                  Leading fasteners suppliers in India, Since <span className="text-[#A02222]">2015</span>
                </h3>
              </div>
              
              <div className="space-y-4 text-[rgba(46,31,68,0.85)]">
                <p>
                  Established in 2015, SRK Bolt started as a trading business dealing in a range of building material items such as nails, machine screws and self-tapping screws.
                </p>
                <p>
                  As India and other Asian countries developed, SRK Bolt progressed and diversified into specialized engineering and marine quality fasteners pertaining to various sectors such as the construction and steel structure industry, oil and petro-chemical industry, the automotive sector, shipbuilding, electrical and switch gear and the furniture industry.
                </p>
                <p>
                  It's legacy of over 10 years has allowed SRK Bolt to become one of the leading stockist and trader of engineering fasteners in the Indian region dealing in a variety of more than 5k SKU's coming from reputed manufacturers located in India, Europe and the Far East Asia.
                </p>
              </div>
            </div>
            
            {/* Right Content - Statistics */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#A02222] text-white p-8 rounded-[10px] text-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                <div className="text-4xl font-bold mb-2">25+</div>
                <div className="text-sm">Years Industry Experience</div>
              </div>
              <div className="bg-[#1F1F1F] text-white p-8 rounded-[10px] text-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                <div className="text-4xl font-bold mb-2">5k</div>
                <div className="text-sm">SKU's In Stock</div>
              </div>
              <div className="bg-[#1F1F1F] text-white p-8 rounded-[10px] text-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                <div className="text-4xl font-bold mb-2">50k</div>
                <div className="text-sm">Sq.ft Warehouse</div>
              </div>
              <div className="bg-[#A02222] text-white p-8 rounded-[10px] text-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#A02222] text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Experience Quality Fasteners?
            </h2>
            <p className="text-lg text-white/85 max-w-2xl mx-auto">
              Join hundreds of satisfied customers who trust SRK Bolt for their fastener needs. Contact us now for competitive pricing and reliable supply.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Button
                size="lg"
                className="bg-white text-[#A02222] border border-white hover:bg-[#2E1F44] hover:text-white transition-colors duration-300 font-semibold text-lg px-10 py-4 shadow-lg"
              >
                <a href="/contact" className="flex items-center text-inherit">
                  Get Quote
                  <ChevronRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[1.5px] border-white text-[#A02222] hover:bg-white hover:text-[#A02222] transition-colors duration-300 font-semibold text-lg px-10 py-4 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* RFQ Added Popup */}
      {isRFQPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
            <div className="mb-6 flex justify-center">
              <CheckCircle className="w-24 h-24 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Product Added to RFQ!
            </h2>
            <p className="text-gray-600 text-lg mb-2">
              {rfqProductName}
            </p>
            <p className="text-gray-500 text-sm mb-6">
              The product has been added to your RFQ list. You can continue shopping or proceed to checkout.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => setIsRFQPopupOpen(false)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 text-lg font-bold"
              >
                Continue Shopping
              </Button>
              <Button
                onClick={() => window.location.href = '/rfq'}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 text-lg font-bold"
              >
                Go to RFQ
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

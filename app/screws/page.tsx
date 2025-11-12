"use client"

import Layout from "@/components/Layout"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ExternalLink, Wrench, Settings, Factory, MessageCircle, FileText, CheckCircle } from "lucide-react"
import { useRFQ } from "@/contexts/RFQContext"
import { useCategoryProducts } from "@/hooks/useCategoryProducts"

export default function ScrewsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isRFQPopupOpen, setIsRFQPopupOpen] = useState(false)
  const [rfqProductName, setRfqProductName] = useState("")
  const { addToRFQ } = useRFQ()
  
  const slides = [
    {
      id: 1,
      image: "https://t3.ftcdn.net/jpg/02/33/71/82/240_F_233718247_GoQZJTzziQ1Qp2S30kv8hac3pVzMs74y.jpg",
      title: "Precision Screws",
      subtitle: "Threaded Fastening Solutions"
    },
    {
      id: 2,
      image: "https://t3.ftcdn.net/jpg/07/06/47/84/240_F_706478455_hSFXNArvKUkM3fWMmr91O71fvyqJTzmb.jpg",
      title: "Machine Screws",
      subtitle: "Industrial Grade Threading"
    },
    {
      id: 3,
      image: "https://t4.ftcdn.net/jpg/04/87/17/99/240_F_487179985_vWWNxyr0facawhl0G4F9ir8mjmfK64lU.jpg",
      title: "Wood Screws",
      subtitle: "Specialized Wood Applications"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Function to generate WhatsApp URL with product information
  const handleWhatsAppClick = (product: { name: string; category: string }) => {
    const phoneNumber = "971588713064" // WhatsApp number with country code
    const message = `Hello! I'm interested in this product:\n\nProduct Name: ${product.name}\nCategory: ${product.category}\n\nPlease provide more information about this product.`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }
  const {
    products: screwsProducts,
    loading: screwsLoading,
    error: screwsError,
  } = useCategoryProducts("SCREWS")

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
                alt="SRK Bolt Screws"
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for better contrast */}
              <div className="absolute inset-0 bg-black/50"></div>
              
              {/* Title overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-xl md:text-2xl drop-shadow-lg">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Screws Content */}
      <div className="bg-[#F7F7FA]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#2E1F44] mb-6">Screws Collection</h1>
            <p className="text-[rgba(46,31,68,0.85)] text-xl max-w-4xl mx-auto leading-relaxed">
              Explore our extensive range of screws designed for various materials and applications. 
              From precision machine screws to specialized wood screws, we provide reliable threaded 
              fastening solutions for every construction and manufacturing need.
            </p>
          </div>

          {screwsError && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {screwsError}
            </div>
          )}
          {screwsLoading && (
            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
              Loading latest screws from inventory...
            </div>
          )}
          
          {/* Product Grid */}
          {(!screwsLoading && screwsProducts.length === 0) ? (
            <div className="mb-16 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center text-gray-500">
              No screws are currently available. Add new products from the admin dashboard to populate this collection.
            </div>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {screwsProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col items-center text-center gap-3 h-full">
                <div className="w-full h-64 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden px-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h4 className="text-base font-semibold text-[#2E1F44]">{product.name}</h4>
                <div className="w-full space-y-2.5 mt-auto">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => window.location.href = `/view-details?name=${encodeURIComponent(product.name)}&category=SCREWS`}
                      className="flex-1 border border-[#2E1F44] text-[#2E1F44] text-xs font-semibold py-1.5 rounded-md transition-colors duration-200 flex items-center justify-center gap-1 hover:bg-[#A02222] hover:text-white hover:border-[#A02222]"
                      >
                      <FileText className="w-3 h-3" />
                        VIEW-DETAIL
                      </button>
                      <button 
                        onClick={() => handleWhatsAppClick(product)}
                      className="flex-1 bg-[#25D366] hover:bg-[#1ebe5a] text-white text-xs font-semibold py-1.5 rounded-md transition-colors duration-200 flex items-center justify-center gap-1"
                      >
                      <MessageCircle className="w-3 h-3" />
                        WHATSAPP
                      </button>
                    </div>
                    <button 
                      onClick={() => {
                        setRfqProductName(product.name);
                        setIsRFQPopupOpen(true);
                        addToRFQ(product.name, product.image);
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

          {/* Features Section */}
          <div className="bg-white rounded-2xl p-12 shadow-[0_2px_8px_rgba(0,0,0,0.08)] mb-16">
            <h2 className="text-3xl font-bold text-[#2E1F44] mb-12 text-center">Why Choose Our Screws?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#F7F7FA] rounded-xl p-8 shadow-sm">
                  <div className="w-16 h-16 bg-[#A02222]/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wrench className="w-8 h-8 text-[#A02222]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2E1F44] mb-3">Precision Threading</h3>
                  <p className="text-[rgba(46,31,68,0.85)] text-sm leading-relaxed">
                    Accurate thread profiles and consistent pitch for reliable engagement and secure fastening.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-[#F7F7FA] rounded-xl p-8 shadow-sm">
                  <div className="w-16 h-16 bg-[#A02222]/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-[#A02222]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2E1F44] mb-3">Material Specific</h3>
                  <p className="text-[rgba(46,31,68,0.85)] text-sm leading-relaxed">
                    Designed for specific materials including wood, metal, plastic, and composite applications.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-[#F7F7FA] rounded-xl p-8 shadow-sm">
                  <div className="w-16 h-16 bg-[#A02222]/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Factory className="w-8 h-8 text-[#A02222]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2E1F44] mb-3">Corrosion Resistance</h3>
                  <p className="text-[rgba(46,31,68,0.85)] text-sm leading-relaxed">
                    High-quality materials and coatings ensure long-lasting performance in various environments.
                  </p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <section className="py-16 bg-[#A02222] text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Need Specialized Screws?</h2>
            <p className="text-lg text-white/85 max-w-2xl mx-auto">
              Contact our technical team for custom screw specifications and bulk orders. We provide tailored threaded solutions for your specific material and application requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <button className="bg-white text-[#A02222] border border-white hover:bg-[#2E1F44] hover:text-white transition-colors duration-300 font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg">
                <ExternalLink className="w-5 h-5" />
                Get Custom Quote
              </button>
              <button className="border-[1.5px] border-white text-white hover:bg-white hover:text-[#A02222] transition-colors duration-300 font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Contact Us
              </button>
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
              <button
                onClick={() => setIsRFQPopupOpen(false)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 text-lg font-bold rounded-md transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => window.location.href = '/rfq'}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 text-lg font-bold rounded-md transition-colors"
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

"use client"

import Layout from "@/components/Layout"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ExternalLink, Shield, Settings, Factory, MessageCircle, FileText, CheckCircle } from "lucide-react"
import { useRFQ } from "@/contexts/RFQContext"

export default function HeavyLoadAttachmentsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isRFQPopupOpen, setIsRFQPopupOpen] = useState(false)
  const [rfqProductName, setRfqProductName] = useState("")
  const { addToRFQ } = useRFQ()
  
  const slides = [
    {
      id: 1,
      image: "https://t3.ftcdn.net/jpg/02/33/71/82/240_F_233718247_GoQZJTzziQ1Qp2S30kv8hac3pVzMs74y.jpg",
      title: "Heavy Load Attachments",
      subtitle: "Industrial Strength Solutions"
    },
    {
      id: 2,
      image: "https://t3.ftcdn.net/jpg/07/06/47/84/240_F_706478455_hSFXNArvKUkM3fWMmr91O71fvyqJTzmb.jpg",
      title: "Structural Components",
      subtitle: "High-Capacity Fastening"
    },
    {
      id: 3,
      image: "https://t4.ftcdn.net/jpg/04/87/17/99/240_F_487179985_vWWNxyr0facawhl0G4F9ir8mjmfK64lU.jpg",
      title: "Heavy Duty Hardware",
      subtitle: "Maximum Load Handling"
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
    const phoneNumber = "919321362064" // WhatsApp number with country code
    const message = `Hello! I'm interested in this product:\n\nProduct Name: ${product.name}\nCategory: ${product.category}\n\nPlease provide more information about this product.`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  // Heavy Load Attachments product data
  const heavyLoadProducts = [
    {
      id: 1,
      name: "Structural Bolts",
      image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
      description: "High-strength structural bolts for heavy construction",
      price: "₹125.50",
      category: "HEAVY LOAD",
      inStock: true
    },
    {
      id: 2,
      name: "Anchor Bolts",
      image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
      description: "Heavy-duty anchor bolts for concrete applications",
      price: "₹185.75",
      category: "HEAVY LOAD",
      inStock: true
    },
    {
      id: 3,
      name: "Foundation Bolts",
      image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
      description: "Foundation bolts for machinery mounting",
      price: "₹245.20",
      category: "HEAVY LOAD",
      inStock: true
    },
    {
      id: 4,
      name: "Heavy Duty Washers",
      image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
      description: "Extra-thick washers for high-load applications",
      price: "₹35.80",
      category: "HEAVY LOAD",
      inStock: true
    },
    {
      id: 5,
      name: "Structural Nuts",
      image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
      description: "Heavy-duty nuts for structural applications",
      price: "₹85.90",
      category: "HEAVY LOAD",
      inStock: true
    },
    {
      id: 6,
      name: "Crane Bolts",
      image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
      description: "Specialized bolts for crane and lifting equipment",
      price: "₹325.60",
      category: "HEAVY LOAD",
      inStock: true
    }
  ]

  return (
    <Layout>
      {/* Hero Section - Image Slider */}
      <section className="relative h-screen overflow-hidden">
        {/* Slides */}
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full shrink-0 h-full relative">
              <img
                src={slide.image}
                alt="SRK Bolt Heavy Load Attachments"
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

      {/* Heavy Load Attachments Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Heavy Load Attachments</h1>
            <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed">
              Discover our comprehensive range of heavy load attachments designed for structural, 
              construction, and industrial applications. From structural bolts to crane bolts, 
              we provide maximum-strength fastening solutions for the most demanding applications.
            </p>
          </div>
          
          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {heavyLoadProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
                    <p className="text-gray-200">{product.price}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold">HEAVY LOAD</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">{product.name}</h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Shield className="w-4 h-4 mr-1" />
                      <span>High Strength</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      <span>Structural</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => window.location.href = `/view-details?name=${encodeURIComponent(product.name)}&category=ATTACHMENTS`}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-medium py-2 px-3 rounded-md transition-colors duration-200 flex items-center justify-center"
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        VIEW-DETAIL
                      </button>
                      <button 
                        onClick={() => handleWhatsAppClick(product)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-2 px-3 rounded-md transition-colors duration-200 flex items-center justify-center"
                      >
                        <MessageCircle className="w-3 h-3 mr-1" />
                        WHATSAPP
                      </button>
                    </div>
                    <button 
                      onClick={() => {
                        setRfqProductName(product.name);
                        setIsRFQPopupOpen(true);
                        addToRFQ(product.name, product.image);
                      }}
                      className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-2 px-3 rounded-md transition-colors duration-200"
                    >
                      ADD TO RFQ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Choose Our Heavy Load Attachments?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Maximum Strength</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Engineered for maximum load capacity with superior tensile strength and durability.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Structural Grade</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Meets or exceeds structural engineering standards for critical load applications.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Factory className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Industrial Certified</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Certified for industrial use in construction, manufacturing, and heavy machinery applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <section className="bg-red-600 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Custom Heavy Load Solutions?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Contact our engineering team for custom heavy load attachment specifications and bulk orders. 
              We provide tailored structural solutions for your specific load and application requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                <ExternalLink className="w-5 h-5 mr-2" />
                Get Custom Quote
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors flex items-center justify-center">
                <ExternalLink className="w-5 h-5 mr-2" />
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

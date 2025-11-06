"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Layout from "@/components/Layout"
import {
  ChevronRight,
  ChevronLeft,
  Wrench,
  Settings,
  FileText,
  Phone,
  CheckCircle,
  MessageCircle,
} from "lucide-react"
import { useRFQ } from "@/contexts/RFQContext"

// Type definitions
interface Product {
  name: string
  image: string
}

type CategoryKey = "BOLTS" | "NUTS" | "WASHERS" | "SCREWS" | "HOOK & EYE" | "RIVETS" | "ATTACHMENTS" | "OTHER"

interface ProductsByCategory {
  [key: string]: Product[]
}

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

  // Product data organized by categories with Husaini Brothers authentic product images
  const productsByCategory: ProductsByCategory = {
    BOLTS: [
      { name: "DIN 933 / 931 Hexagon Bolt", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "ASTM A325M Heavy Hexagon Bolt", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "ASTM A490M Heavy Hexagon Bolt Friction Grip", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "DIN 975/976-1 Threaded Rods", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "DIN 912 Allen Bolt", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "DIN 7991 Allen CSK Bolt", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "Eye Bolt With 2washer Nut", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "DIN 186B T Bolt", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "Track Shoe Bolt", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "DIN 939 1.25D Engineering Stud", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "DIN 938 1D Engineering Stud", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "DIN 835 2D Engineering Stud", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" }
    ],
    NUTS: [
      { name: "DIN 6331 Hex Nut With Collar", image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg" },
      { name: "DIN 985/982 Self Locking Nut", image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg" },
      { name: "DIN 6926 Self Locking Hexagon Flange Nut", image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg" },
      { name: "DIN 917 Hexagon Cap Nut", image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg" },
      { name: "DIN 928 Square Weld Nut", image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg" },
      { name: "DIN 936 Hexagon Thin Nut, Medium", image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg" },
      { name: "DIN 439 Hexagon Very Thin Nut", image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg" },
      { name: "Cage Nut", image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg" },
      { name: "NUT Cylindrical Cage Nut", image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg" },
      { name: "DIN 937 Castle Nut", image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg" },
      { name: "DIN 979 Castle Nut", image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg" },
      { name: "NUT Speed Nut", image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg" }
    ],
    WASHERS: [
      { name: "DIN 6796 Conical Spring Washer", image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg" },
      { name: "NF E 25 511 Afnor Serrated Conical Contact Washers", image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg" },
      { name: "NF E 25 514 Afnor Washers Type", image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg" },
      { name: "DIN 137 Wave Spring Washer", image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg" },
      { name: "Safety Washers", image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg" },
      { name: "Schnorr Washers", image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg" },
      { name: "Nord Lock Washers", image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg" },
      { name: "DIN 6798 A Serrated Lock Washers", image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg" },
      { name: "DIN 6798 J Serrated Lock Washer Internal Teeth", image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg" },
      { name: "DIN 6798 V Serrated Lock Washer External Teeth", image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg" },
      { name: "DIN 6797 A External Toothed Lock Washer", image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg" }
    ],
    SCREWS: [
      { name: "DIN 86 Roundhead Machine Screw", image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg" },
      { name: "DIN 914 Cone Point Grub Screw", image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg" },
      { name: "Dog Point Grub Screw", image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg" },
      { name: "Torx Screw, Countersunk Head", image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg" },
      { name: "Socket Head Taptite", image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg" },
      { name: "Screw Hammer Drive Screw, U Type", image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg" },
      { name: "Screw Hex Slotted Self Tapping Screw", image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg" },
      { name: "Chipboard Screws", image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg" },
      { name: "DIN 18182-2 Drywall Screws", image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg" },
      { name: "Security Screws", image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg" },
      { name: "DIN 7504 K Hexagon Self Drilling Screws", image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg" },
      { name: "DIN 7504 P Counter Sunk Self Drilling Screw", image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg" }
    ],
    "HOOK & EYE": [
      { name: "D Shackle", image: "https://www.husainibrothers.com/cdn/images/200/4226372436_1635929365.jpg" },
      { name: "Twisted Dee Chain Shackle", image: "https://www.husainibrothers.com/cdn/images/200/4226372436_1635929365.jpg" },
      { name: "Long D Shackle", image: "https://www.husainibrothers.com/cdn/images/200/4226372436_1635929365.jpg" },
      { name: "Wide D Shackle", image: "https://www.husainibrothers.com/cdn/images/200/4226372436_1635929365.jpg" },
      { name: "Bow Shackle", image: "https://www.husainibrothers.com/cdn/images/200/4226372436_1635929365.jpg" },
      { name: "Bow Shackle Hook Eye", image: "https://www.husainibrothers.com/cdn/images/200/4226372436_1635929365.jpg" },
      { name: "Turnbuckle, Eye And Eye", image: "https://www.husainibrothers.com/cdn/images/200/4226372436_1635929365.jpg" },
      { name: "Turnbuckle, Hook And Hook", image: "https://www.husainibrothers.com/cdn/images/200/4226372436_1635929365.jpg" },
      { name: "Turnbuckle, Jaw And Jaw", image: "https://www.husainibrothers.com/cdn/images/200/4226372436_1635929365.jpg" },
      { name: "Swivel Eye And Eye", image: "https://www.husainibrothers.com/cdn/images/200/4226372436_1635929365.jpg" },
      { name: "Swivel Eye And Jaw", image: "https://www.husainibrothers.com/cdn/images/200/4226372436_1635929365.jpg" },
      { name: "Screw Eyes", image: "https://www.husainibrothers.com/cdn/images/200/4226372436_1635929365.jpg" }
    ],
    RIVETS: [
      { name: "DIN 472 Retaining Rings Internal Circlip", image: "https://www.husainibrothers.com/cdn/images/200/7698225208_1635930464.jpg" },
      { name: "DIN 471 Retaining Rings External Circlip", image: "https://www.husainibrothers.com/cdn/images/200/7698225208_1635930464.jpg" },
      { name: "DIN 6799 E Style External Retaining Ring", image: "https://www.husainibrothers.com/cdn/images/200/7698225208_1635930464.jpg" },
      { name: "DIN 94 Cotter Split Pin", image: "https://www.husainibrothers.com/cdn/images/200/7698225208_1635930464.jpg" },
      { name: "DIN 11024 R PIN", image: "https://www.husainibrothers.com/cdn/images/200/7698225208_1635930464.jpg" },
      { name: "DIN 11024 R Pin Double Ring", image: "https://www.husainibrothers.com/cdn/images/200/7698225208_1635930464.jpg" },
      { name: "DIN 1434 Clevis Pin", image: "https://www.husainibrothers.com/cdn/images/200/7698225208_1635930464.jpg" },
      { name: "DIN 1481 Spring Dowel Pin", image: "https://www.husainibrothers.com/cdn/images/200/7698225208_1635930464.jpg" },
      { name: "DIN 662 Round Head Rivet", image: "https://www.husainibrothers.com/cdn/images/200/7698225208_1635930464.jpg" },
      { name: "Self Tapping Threaded Inserts", image: "https://www.husainibrothers.com/cdn/images/200/7698225208_1635930464.jpg" },
      { name: "DIN 7 Dowel Cylindrical Pin", image: "https://www.husainibrothers.com/cdn/images/200/7698225208_1635930464.jpg" },
      { name: "DIN 664 Flat Round Head Rivet", image: "https://www.husainibrothers.com/cdn/images/200/7698225208_1635930464.jpg" }
    ],
    ATTACHMENTS: [
      { name: "Anchor Bolt", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "Rawl Bolt", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "Sheer Stud", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "L Shaped Anchor Bolt", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "J Shaped Anchor Bolt", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "Chemical Anchor Bolt", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "DIN 301 Hose Clamps With Worm Gear Drive Type A", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" }
    ],
    OTHER: [
      { name: "DIN 763 Chain Long Link", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "DIN 766 Chain Short Link", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "Door Hinge, Equal", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "Door Hinge, Unequal", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "Flush Door Hinges Equal", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "Butt Hinge", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "Din 6336 K Star Grip, Type K, Knob Bolt", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "DIN 6336 L Star Grip, Type L Knob Bolt", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "Turning Knob", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "Five Lobe Grip", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" },
      { name: "Disc Knob", image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg" }
    ]
  }

  const categories = [
    { name: "BOLTS", icon: Wrench },
    { name: "NUTS", icon: Settings },
    { name: "WASHERS", icon: Settings },
    { name: "SCREWS", icon: Wrench },
    { name: "HOOK & EYE", icon: Settings },
    { name: "RIVETS", icon: Settings },
    { name: "ATTACHMENTS", icon: Settings },
    { name: "OTHER", icon: Settings },
  ]

  const { rfqCount, addToRFQ } = useRFQ();

  // Function to generate WhatsApp URL with product information
  const handleWhatsAppClick = (product: Product) => {
    const phoneNumber = "919321362064" // WhatsApp number with country code
    const message = `Hello! I'm interested in this product:\n\nProduct Name: ${product.name}\nCategory: ${selectedCategory}\n\nPlease provide more information about this product.`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
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

      {/* Product Catalog Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">PRODUCT CATALOGUE</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              5k+ SKU's of fasteners supplies sourced from reputed manufacturers across India, Europe and Far East Asia available in stock.
            </p>
          </div>
          
          {/* Product Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.name as CategoryKey)}
                className={`p-4 rounded-lg text-center cursor-pointer transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <category.icon className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-semibold">{category.name}</p>
                {selectedCategory === category.name && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-2"></div>
                )}
              </button>
            ))}
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {productsByCategory[selectedCategory]?.slice(0, 8).map((product: Product, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                {/* Product Image */}
                <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Product Name */}
                <div className="p-3 text-center">
                  <h3 className="text-sm font-medium text-gray-800 leading-tight">{product.name}</h3>
                </div>
                
                {/* Buttons */}
                <div className="p-3 pt-0">
                  <div className="flex gap-2 mb-2">
                    <button 
                      onClick={() => window.location.href = `/view-details?name=${encodeURIComponent(product.name)}&category=${selectedCategory}`}
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
                      addToRFQ(product.name);
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-2 px-3 rounded-md transition-colors duration-200"
                  >
                    ADD TO RFQ
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Visit More Products Button */}
          <div className="text-center">
            <Button
              onClick={() => {
                const categoryUrl = selectedCategory.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')
                window.location.href = `/${categoryUrl}`
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-110 shadow-lg hover:shadow-xl"
            >
              Visit More {selectedCategory} Products
              <ChevronRight className="w-6 h-6 ml-3" />
            </Button>
          </div>
        </div>
      </section>

      {/* Company Statistics Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-red-600 mb-4">SRK BOLT</h2>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  Leading fasteners suppliers in India, Since <span className="text-red-600">1998</span>
                </h3>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  Established in 1998, SRK Bolt started as a trading business dealing in a range of building material items such as nails, machine screws and self-tapping screws.
                </p>
                <p>
                  As India and other Asian countries developed, SRK Bolt progressed and diversified into specialized engineering and marine quality fasteners pertaining to various sectors such as the construction and steel structure industry, oil and petro-chemical industry, the automotive sector, shipbuilding, electrical and switch gear and the furniture industry.
                </p>
                <p>
                  It's legacy of over 25 years has allowed SRK Bolt to become one of the leading stockist and trader of engineering fasteners in the Indian region dealing in a variety of more than 5k SKU's coming from reputed manufacturers located in India, Europe and the Far East Asia.
                </p>
              </div>
            </div>
            
            {/* Right Content - Statistics */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-red-600 text-white p-8 rounded-lg text-center">
                <div className="text-4xl font-bold mb-2">25+</div>
                <div className="text-sm">Years Industry Experience</div>
              </div>
              <div className="bg-gray-800 text-white p-8 rounded-lg text-center">
                <div className="text-4xl font-bold mb-2">5k</div>
                <div className="text-sm">SKU's In Stock</div>
              </div>
              <div className="bg-gray-800 text-white p-8 rounded-lg text-center">
                <div className="text-4xl font-bold mb-2">50k</div>
                <div className="text-sm">Sq.ft Warehouse</div>
              </div>
              <div className="bg-red-600 text-white p-8 rounded-lg text-center">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Experience Quality Fasteners?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join hundreds of satisfied customers who trust SRK Bolt for their fastener needs. Contact us now for competitive pricing and reliable supply.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 shadow-2xl transform hover:scale-105 transition-all duration-500 font-bold text-lg px-10 py-6"
              >
                <a href="/contact" className="flex items-center text-inherit">
                  Get Quote
                  <ChevronRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 bg-transparent shadow-2xl transform hover:scale-105 transition-all duration-500 font-bold text-lg px-10 py-6"
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

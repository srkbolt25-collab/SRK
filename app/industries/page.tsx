"use client"

import Layout from "@/components/Layout"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ExternalLink, Building, Car, Zap, Factory, Fuel, Plane } from "lucide-react"

type BannerSlide = {
  _id?: string
  id?: number
  title: string
  subtitle?: string
  highlight?: string
  image: string
  order?: number
}

const FALLBACK_SLIDES: BannerSlide[] = [
  {
    id: 1,
    image: "https://t4.ftcdn.net/jpg/04/52/77/95/240_F_452779507_lESxLc72CJujLVivBiFCzP8I2y1sm91b.jpg",
    title: "Industries We Serve",
    subtitle: "Fastener Supply for Industrial Applications"
  },
  {
    id: 2,
    image: "https://t3.ftcdn.net/jpg/11/26/43/62/240_F_1126436292_KiDUhPlVRWynG6WIkUu0HfKcaI0tgtZE.jpg",
    title: "Industrial Solutions",
    subtitle: "Engineering Excellence for Every Industry"
  },
  {
    id: 3,
    image: "https://t4.ftcdn.net/jpg/04/87/17/99/240_F_487179985_vWWNxyr0facawhl0G4F9ir8mjmfK64lU.jpg",
    title: "UAE & Regional Supply",
    subtitle: "Supporting Projects Across Key Sectors"
  }
]

export default function IndustriesPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<BannerSlide[]>(FALLBACK_SLIDES)
  const [loadingSlides, setLoadingSlides] = useState(false)

  useEffect(() => {
    let isMounted = true
    const loadSlides = async () => {
      try {
        setLoadingSlides(true)
        const response = await fetch("/api/banners?page=industries")

        if (!response.ok) {
          throw new Error("Failed to fetch banners")
        }

        const data = await response.json()
        if (!isMounted) return

        if (Array.isArray(data) && data.length > 0) {
          const sanitizedSlides: BannerSlide[] = data
            .filter((item: BannerSlide) => item && typeof item.image === "string")
            .map((item: BannerSlide, index: number) => ({
              ...item,
              title: item.title?.trim() || `Slide ${index + 1}`,
              subtitle: item.subtitle?.trim() || "",
              highlight: item.highlight?.trim() || "",
            }))
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

          setSlides(sanitizedSlides)
        } else {
          setSlides(FALLBACK_SLIDES)
        }
      } catch (error) {
        console.error("Error loading banners:", error)
        if (isMounted) {
          setSlides(FALLBACK_SLIDES)
        }
      } finally {
        if (isMounted) {
          setLoadingSlides(false)
        }
      }
    }
    loadSlides()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (slides.length === 0) {
      setCurrentSlide(0)
      return
    }
    setCurrentSlide((prev) => (prev >= slides.length ? 0 : prev))
  }, [slides.length])

  useEffect(() => {
    if (slides.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
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
            <div key={slide._id ?? slide.id ?? index} className="w-full shrink-0 h-full relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for better contrast */}
              <div className="absolute inset-0 bg-black/50"></div>
              
              {/* Title overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  {slide.highlight && (
                    <span className="inline-flex items-center justify-center bg-white/15 px-4 py-1.5 rounded-full uppercase tracking-[0.3em] text-xs md:text-sm font-semibold mb-4">
                      {slide.highlight}
                    </span>
                  )}
                  <h2 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
                    {slide.title}
                  </h2>
                  {slide.subtitle && (
                    <p className="text-xl md:text-2xl drop-shadow-lg">
                      {slide.subtitle}
                    </p>
                  )}
                  <a
                    href="/srk-fastener.pdf"
                    download
                    className="mt-6 inline-flex items-center gap-2 bg-white text-[#A02222] px-6 py-2.5 rounded-lg font-semibold border border-white hover:bg-[#A02222] hover:text-white transition-colors shadow-lg"
                  >
                    Download Catalogue
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </section>

      {/* Industries Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Industrial Fastener Solutions for UAE, GCC & Regional Projects</h1>
            <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed">
              SRK Bolt supplies industrial fasteners for construction, structural steel, automotive, power and energy, manufacturing, oil & gas and other engineering applications across the UAE and GCC. We support buyers in the UAE, Bahrain, Qatar, Kuwait, Saudi Arabia and Oman, with regional enquiries for Iraq and Jordan, helping match standards, materials, grades and finishes to each project requirement.
            </p>
          </div>
          
          {/* Modern Industry Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Construction Industry */}
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://t4.ftcdn.net/jpg/05/29/02/97/240_F_529029779_8wafyBb91UfdvEqiDcSZwfwc0U9vN993.jpg"
                  alt="Construction Industry"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">Construction</h3>
                  <p className="text-gray-200">Infrastructure</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Infrastructure</span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Construction & Infrastructure</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  High-tensile bolts, structural fasteners, threaded components and accessories for steel structures, buildings and infrastructure work, with options selected to project specifications.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Building className="w-4 h-4 mr-1" />
                    <span>Buildings & Bridges</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    <span>Structural</span>
                  </div>
                </div>
                <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Learn More
                </button>
              </div>
            </div>

            {/* Automotive Industry */}
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://t3.ftcdn.net/jpg/04/73/64/76/240_F_473647693_nXQEwNVeUTTAVFSasg5rci7iYtpOTiJr.jpg"
                  alt="Automotive Industry"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">Automotive</h3>
                  <p className="text-gray-200">Manufacturing</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Automotive</span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Automotive Industry</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Precision fasteners and threaded components for automotive assembly, maintenance and supporting production requirements where consistency, fit and traceable specifications matter.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Car className="w-4 h-4 mr-1" />
                    <span>Engine & Chassis</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    <span>Precision</span>
                  </div>
                </div>
                <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Learn More
                </button>
              </div>
            </div>

            {/* Power & Energy Industry */}
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://t3.ftcdn.net/jpg/02/33/71/82/240_F_233718247_GoQZJTzziQ1Qp2S30kv8hac3pVzMs74y.jpg"
                  alt="Power & Energy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">Power & Energy</h3>
                  <p className="text-gray-200">Renewable</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Energy</span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Power & Energy Sector</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Fasteners for power, solar and energy infrastructure, including material and coating options suited to outdoor exposure, structural connections and demanding service conditions.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Zap className="w-4 h-4 mr-1" />
                    <span>Solar & Thermal</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    <span>High-Temp</span>
                  </div>
                </div>
                <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Learn More
                </button>
              </div>
            </div>

            {/* Manufacturing Industry */}
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://t3.ftcdn.net/jpg/05/63/45/42/240_F_563454220_FynShMBjneQXf1CAr5ZuWV9W9PHp6CrU.jpg"
                  alt="Manufacturing Industry"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">Manufacturing</h3>
                  <p className="text-gray-200">Industrial</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Manufacturing</span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Manufacturing Industry</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Industrial bolts, nuts, washers, screws and specialty components for machinery, equipment, maintenance and production-line requirements.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Factory className="w-4 h-4 mr-1" />
                    <span>Machinery</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    <span>Precision</span>
                  </div>
                </div>
                <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Learn More
                </button>
              </div>
            </div>

            {/* Oil & Gas Industry */}
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://t3.ftcdn.net/jpg/11/76/17/28/240_F_1176172880_IzGMvsCPxZToFlMagCegpgmWIakuUaFY.jpg"
                  alt="Oil & Gas Industry"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">Oil & Gas</h3>
                  <p className="text-gray-200">Petrochemical</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Petrochemical</span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Oil & Gas Industry</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Fastener options for oil, gas and petrochemical environments, including corrosion-resistant materials and grades selected according to service conditions and project specifications.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Fuel className="w-4 h-4 mr-1" />
                    <span>Drilling & Refining</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    <span>Corrosion-Resistant</span>
                  </div>
                </div>
                <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Learn More
                </button>
              </div>
            </div>

            {/* Aerospace Industry */}
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://t4.ftcdn.net/jpg/01/33/57/65/240_F_133576515_DFrRHRoAa5PknMkijB832EOEjUJ1pX4s.jpg"
                  alt="Aerospace Industry"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">Aerospace</h3>
                  <p className="text-gray-200">Aviation</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Aerospace</span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Aerospace Industry</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Precision fastening requirements supported through specification-led sourcing, with documentation and material requirements reviewed against the customer enquiry.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Plane className="w-4 h-4 mr-1" />
                    <span>Aircraft & Engines</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    <span>Certified</span>
                  </div>
                </div>
                <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Industry Statistics */}
          <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Industry Coverage</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-4xl font-bold text-red-600 mb-2">6+</div>
                  <div className="text-gray-600 font-semibold">Major Industries</div>
                  <div className="text-sm text-gray-500 mt-1">Served Worldwide</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-4xl font-bold text-red-600 mb-2">10+</div>
                  <div className="text-gray-600 font-semibold">Years in Business</div>
                  <div className="text-sm text-gray-500 mt-1">Established 2015</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-4xl font-bold text-red-600 mb-2">5k+</div>
                  <div className="text-gray-600 font-semibold">Fastener SKUs</div>
                  <div className="text-sm text-gray-500 mt-1">Broad Product Coverage</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-4xl font-bold text-red-600 mb-2">UAE</div>
                  <div className="text-gray-600 font-semibold">Regional Supply Base</div>
                  <div className="text-sm text-gray-500 mt-1">GCC & Export Enquiries</div>
                </div>
              </div>
            </div>
          </div>

          {/* Industry Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Choose SRK Bolt?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Industry Expertise</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Practical understanding of how standards, grades, materials and coatings change across industrial applications.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Sourcing Flexibility</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Broad sourcing support for standard, specialty and project-specific fastener requirements.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Factory className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Specification Support</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Specification-led sourcing with documentation and certification support where applicable to the enquiry.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plane className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">UAE, GCC & Regional Support</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    UAE-based commercial support for availability, bulk orders, scheduled supply and enquiries across the UAE, Bahrain, Qatar, Kuwait, Saudi Arabia, Oman, Iraq and Jordan.
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
              Ready to Partner with SRK Bolt?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Tell us your application, standard, grade, finish and required quantity. Our team can help identify suitable fastener options and prepare an RFQ for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                <ExternalLink className="w-5 h-5 mr-2" />
                Get Industry Quote
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors flex items-center justify-center">
                <ExternalLink className="w-5 h-5 mr-2" />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

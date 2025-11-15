"use client"

import Layout from "@/components/Layout"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
    title: "About SRK Bolt",
    subtitle: "Leading Fastener Solutions Since 2015",
    image: "https://mikehardware.com/wp-content/uploads/2023/09/bolt-1-y.jpg",
  },
  {
    id: 2,
    title: "Quality Manufacturing",
    subtitle: "Precision Engineering Excellence",
    image: "https://t4.ftcdn.net/jpg/11/42/47/91/240_F_1142479131_EJ3VEcNTYlomctW2qr8j1dYM05DeIXal.jpg",
  },
  {
    id: 3,
    title: "Global Reach",
    subtitle: "Serving Industries Worldwide",
    image: "https://t4.ftcdn.net/jpg/15/51/86/31/240_F_1551863150_c4Ew22S4nIyVMRMuBSbNWsyo236KB5Ro.jpg",
  },
]

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<BannerSlide[]>(FALLBACK_SLIDES)
  const [loadingSlides, setLoadingSlides] = useState(false)

  useEffect(() => {
    let isMounted = true
    const loadSlides = async () => {
      try {
        setLoadingSlides(true)
        const response = await fetch("/api/banners?page=about")

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

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <Layout>
      {/* Hero Section - Image Slider */}
      <section className="relative h-96 overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide._id ?? slide.id ?? index} className="w-full shrink-0 h-full relative">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex items-center justify-center text-white text-center px-4">
                <div>
                  {slide.highlight && (
                    <span className="inline-flex items-center justify-center bg-white/15 px-4 py-1.5 rounded-full uppercase tracking-[0.3em] text-xs md:text-sm font-semibold mb-4">
                      {slide.highlight}
                    </span>
                  )}
                  <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{slide.title}</h2>
                  {slide.subtitle && <p className="text-xl md:text-2xl drop-shadow-lg">{slide.subtitle}</p>}
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

      {/* Company Snapshot */}
      <section className="py-16 bg-[#F7F7FA]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-[#A02222]">SRK BOLT</h2>
              <h3 className="text-3xl font-bold text-[#2E1F44]">
                Leading fasteners suppliers in UAE, Since <span className="text-[#A02222]">2015</span>
              </h3>
              <div className="space-y-4 text-[rgba(46,31,68,0.85)]">
                <p>
                  Established in 2015, SRK Bolt started as a trading business dealing in a range of building material items such as
                  nails, machine screws and self-tapping screws.
              </p>
                <p>
                  As UAE and other Asian countries developed, SRK Bolt progressed and diversified into specialized engineering and
                  marine quality fasteners pertaining to various sectors such as the construction and steel structure industry, oil and
                  petro-chemical industry, the automotive sector, shipbuilding, electrical and switch gear and the furniture industry.
              </p>
                <p>
                  Its legacy of over 10 years has allowed SRK Bolt to become one of the leading stockist and trader of engineering
                  fasteners in the Indian region dealing in a variety of more than 5k SKU's coming from reputed manufacturers located
                  in India, Europe and the Far East Asia.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[{ label: "Years Industry Experience", value: "10+", tone: "primary" }, { label: "SKU's In Stock", value: "5k", tone: "secondary" }, { label: "Sq.ft Warehouse", value: "50k", tone: "secondary" }, { label: "Happy Customers", value: "500+", tone: "primary" }].map(
                (card, index) => (
                  <div
                    key={index}
                    className={`p-8 rounded-[10px] text-white text-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] ${
                      card.tone === "primary" ? "bg-[#A02222]" : "bg-[#1F1F1F]"
                    }`}
                  >
                    <div className="text-4xl font-bold mb-2">{card.value}</div>
                    <div className="text-sm">{card.label}</div>
              </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Story & Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
            <img
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
              alt="SRK Bolt Facility"
              className="w-full h-96 object-cover rounded-2xl shadow-[0_12px_24px_rgba(32,23,60,0.15)]"
            />
            <div className="space-y-4 text-[rgba(46,31,68,0.85)]">
              <h3 className="text-3xl font-semibold text-[#2E1F44]">Our Story</h3>
              <p>
                What began as a modest trading venture has evolved into a comprehensive fastener solutions provider, serving diverse
                industries across India and beyond. We operate state-of-the-art manufacturing facilities and maintain extensive
                inventory to meet the ever-growing demands of our clients.
              </p>
              <p>
                From construction giants to automotive manufacturers, from power plants to aerospace companies, SRK Bolt has been the
                preferred choice for fastener solutions across multiple sectors.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Our Mission",
                description:
                  "To provide superior quality fasteners and engineering solutions that meet the highest industry standards while ensuring customer satisfaction and competitive pricing.",
              },
              {
                title: "Our Vision",
                description:
                  "To be the most trusted and preferred fastener supplier in India, recognized for quality, reliability, and customer service excellence.",
              },
              {
                title: "Our Values",
                description:
                  "Quality Excellence, Customer Satisfaction, Innovation, Reliability, and Integrity form the core of our business philosophy.",
              },
            ].map((card) => (
              <div key={card.title} className="bg-white p-8 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] text-center">
                <div className="w-16 h-16 bg-[#A02222]/15 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-[#A02222]">★</span>
                </div>
                <h4 className="text-xl font-semibold text-[#2E1F44] mb-3">{card.title}</h4>
                <p className="text-[rgba(46,31,68,0.85)] leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
            </div>
      </section>

      {/* Manufacturing Excellence */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-[rgba(46,31,68,0.85)]">
              <h3 className="text-3xl font-semibold text-[#2E1F44]">Manufacturing Excellence</h3>
              <p>
                Our manufacturing facilities are equipped with state-of-the-art machinery and advanced technology to produce fasteners
                that meet global quality standards. We maintain strict quality control processes at every stage of production, from raw
                material selection to final inspection.
              </p>
              <p>
                By investing in continuous improvement and innovation, we ensure that every fastener leaving our facilities performs
                reliably under the most demanding conditions.
              </p>
            </div>
            <img
              src="/WhatsApp Image 2025-11-15 at 12.36.27 PM.jpeg"
              alt="SRK Bolt Manufacturing Excellence"
              className="w-full h-96 object-cover rounded-2xl shadow-[0_12px_24px_rgba(32,23,60,0.15)]"
            />
          </div>
                </div>
      </section>

      {/* Why Choose SRK Bolt */}
      <section className="py-16 bg-[#F7F7FA]">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-semibold text-[#2E1F44] mb-10 text-center">Why Choose SRK Bolt?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "25+ Years Experience", description: "Decades of expertise in fastener manufacturing and supply." },
              { title: "Quality Assurance", description: "Rigorous quality control and testing procedures." },
              { title: "Wide Product Range", description: "Comprehensive selection of fasteners for all applications." },
              { title: "Customer Support", description: "Dedicated support team for all your fastener needs." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-center">
                <div className="w-12 h-12 bg-[#A02222]/15 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-[#A02222]">✓</span>
                </div>
                <h4 className="text-lg font-semibold text-[#2E1F44] mb-2">{item.title}</h4>
                <p className="text-[rgba(46,31,68,0.85)] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2E1F44] mb-4">Meet Our Team</h2>
            <p className="text-lg text-[rgba(46,31,68,0.85)] max-w-2xl mx-auto">
              The passionate individuals behind SRK Bolt's success, dedicated to delivering excellence in every fastener solution.
            </p>
          </div>
          
          <div className="flex flex-col gap-8 max-w-5xl mx-auto">
            {/* Mr. Kalyan Singh - Founder */}
            <div className="bg-white rounded-2xl shadow-[0_12px_30px_rgba(46,31,68,0.12)] overflow-hidden border border-[#E4E1F0] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(46,31,68,0.18)]">
              <div className="grid md:grid-cols-[auto_1fr] gap-4 p-6">
                {/* Image on Left */}
                <div className="max-w-md shrink-0">
                  <img
                    src="/WhatsApp Image 2025-11-14 at 6.15.47 PM.jpeg"
                    alt="Founder"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
                {/* Text on Right */}
                <div className="flex flex-col justify-center min-w-0">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-[#2E1F44] mb-2">Mr. Kalyan Singh</h3>
                    <p className="text-[#A02222] font-semibold">Founder & Managing Director, SRK Bolts</p>
                  </div>
                  <div className="text-[rgba(46,31,68,0.75)] text-sm leading-relaxed space-y-4">
                    <p>
                      At SRK Bolts, our mission has always been clear — to deliver reliable, high-performance fastening solutions that meet the highest standards of quality and precision. From humble beginnings, we have grown into a trusted name through our commitment to innovation, consistency, and customer satisfaction.
                    </p>
                    <p>
                      Success in any organization is built on strong values and a dedicated team. I take great pride in the professionalism, integrity, and hard work of everyone at SRK Bolts. Their efforts continue to strengthen our reputation and help us achieve new milestones every year.
                    </p>
                    <p>
                      As we move forward, our focus remains on continuous improvement, adopting advanced technologies, and expanding our global reach. Together, we will continue to build a company that not only meets the expectations of our clients but also sets new benchmarks in the industry.
                  </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#A02222] text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Partner with SRK Bolt</h2>
            <p className="text-lg text-white/85">
              Join hundreds of satisfied customers across industries who trust us for their fastener needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-[#A02222] border border-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2E1F44] hover:text-white transition-colors"
              >
                Contact Us
              </a>
              <a
                href="/projects"
                className="border-[1.5px] border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#A02222] transition-colors"
              >
                View Our Projects
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
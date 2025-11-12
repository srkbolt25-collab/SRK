"use client"

import Layout from "@/components/Layout"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      id: 1,
      image: "https://mikehardware.com/wp-content/uploads/2023/09/bolt-1-y.jpg",
      title: "About SRK Bolt",
      subtitle: "Leading Fastener Solutions Since 1998",
    },
    {
      id: 2,
      image: "https://t4.ftcdn.net/jpg/11/42/47/91/240_F_1142479131_EJ3VEcNTYlomctW2qr8j1dYM05DeIXal.jpg",
      title: "Quality Manufacturing",
      subtitle: "Precision Engineering Excellence",
    },
    {
      id: 3,
      image: "https://t4.ftcdn.net/jpg/15/51/86/31/240_F_1551863150_c4Ew22S4nIyVMRMuBSbNWsyo236KB5Ro.jpg",
      title: "Global Reach",
      subtitle: "Serving Industries Worldwide",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
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
          {slides.map((slide) => (
            <div key={slide.id} className="w-full shrink-0 h-full relative">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex items-center justify-center text-white text-center px-4">
                <div>
                  <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{slide.title}</h2>
                  <p className="text-xl md:text-2xl drop-shadow-lg">{slide.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
          </div>

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
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white" : "bg-white/50 hover:bg-white/75"}`}
            />
          ))}
        </div>
      </section>

      {/* Company Snapshot */}
      <section className="py-16 bg-[#F7F7FA]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-[#A02222]">SRK BOLT</h2>
              <h3 className="text-3xl font-bold text-[#2E1F44]">
                Leading fasteners suppliers in India, Since <span className="text-[#A02222]">2015</span>
              </h3>
              <div className="space-y-4 text-[rgba(46,31,68,0.85)]">
                <p>
                  Established in 2015K Bolt started as a trading business dealing in a range of building material items such as
                  nails, machine screws and self-tapping screws.
              </p>
                <p>
                  As India and other Asian countries developed, SRK Bolt progressed and diversified into specialized engineering and
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
              {[{ label: "Years Industry Experience", value: "25+", tone: "primary" }, { label: "SKU's In Stock", value: "5k", tone: "secondary" }, { label: "Sq.ft Warehouse", value: "50k", tone: "secondary" }, { label: "Happy Customers", value: "500+", tone: "primary" }].map(
                (card, index) => (
                  <div
                    key={index}
                    className={`p-8 rounded-[10px] text-white text-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] ${
                      card.tone === "primary" ? "bg-[#A02222]" : "bg-[#2E1F44]"
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
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
              alt="SRK Bolt Manufacturing"
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
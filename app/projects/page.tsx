"use client"

import Layout from "@/components/Layout"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, MapPin, Calendar, ExternalLink } from "lucide-react"

export default function ProjectsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      id: 1,
      image: "https://t3.ftcdn.net/jpg/05/63/45/42/240_F_563454220_FynShMBjneQXf1CAr5ZuWV9W9PHp6CrU.jpg",
      title: "Major Projects",
      subtitle: "Engineering Excellence Across Industries",
    },
    {
      id: 2,
      image: "https://t3.ftcdn.net/jpg/11/76/17/28/240_F_1176172880_IzGMvsCPxZToFlMagCegpgmWIakuUaFY.jpg",
      title: "Infrastructure Solutions",
      subtitle: "Building Tomorrow's Infrastructure Today",
    },
    {
      id: 3,
      image: "https://t4.ftcdn.net/jpg/01/33/57/65/240_F_133576505_MROPMEGANhhZgubxWSviz47sN21MVWbh.jpg",
      title: "Industrial Projects",
      subtitle: "Powering Industries with Quality Fasteners",
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

  const projectCards = [
    {
      title: "Mumbai Metro Rail Project",
      subtitle: "Mumbai Metro",
      badge: "Infrastructure",
      badgeTone: "bg-[#A02222]",
      image: "https://t4.ftcdn.net/jpg/05/29/02/97/240_F_529029779_8wafyBb91UfdvEqiDcSZwfwc0U9vN993.jpg",
      description:
        "Supplied high-tensile bolts and fasteners for the construction of Mumbai Metro Phase 2 and 3, ensuring structural integrity and safety in one of India's busiest transportation networks.",
      location: "Mumbai, India",
      duration: "2020-2023",
    },
    {
      title: "Chennai Port Expansion",
      subtitle: "Chennai Port",
      badge: "Marine",
      badgeTone: "bg-[#2E1F44]",
      image: "https://t3.ftcdn.net/jpg/04/73/64/76/240_F_473647693_nXQEwNVeUTTAVFSasg5rci7iYtpOTiJr.jpg",
      description:
        "Provided marine-grade fasteners and specialized bolts for the port expansion project, including container terminals and cargo handling facilities with corrosion-resistant solutions.",
      location: "Chennai, India",
      duration: "2019-2022",
    },
    {
      title: "Rajasthan Solar Power Plant",
      subtitle: "Solar Power",
      badge: "Renewable",
      badgeTone: "bg-[#1ebe5a]",
      image: "https://t3.ftcdn.net/jpg/02/33/71/82/240_F_233718247_GoQZJTzziQ1Qp2S30kv8hac3pVzMs74y.jpg",
      description:
        "Supplied corrosion-resistant fasteners for the construction of a 500MW solar power plant, ensuring long-term durability in harsh desert conditions and extreme weather exposure.",
      location: "Rajasthan, India",
      duration: "2021-2023",
    },
    {
      title: "Automotive Manufacturing Plant",
      subtitle: "Automotive",
      badge: "Automotive",
      badgeTone: "bg-[#2E1F44]",
      image: "https://t3.ftcdn.net/jpg/05/63/45/42/240_F_563454220_FynShMBjneQXf1CAr5ZuWV9W9PHp6CrU.jpg",
      description:
        "Provided precision fasteners for a major automotive manufacturer's new plant, including specialized bolts for engine assembly and chassis construction with strict quality standards.",
      location: "Pune, India",
      duration: "2020-2022",
    },
    {
      title: "Petroleum Refinery Upgrade",
      subtitle: "Oil Refinery",
      badge: "Petrochemical",
      badgeTone: "bg-[#A02222]",
      image: "https://t3.ftcdn.net/jpg/11/76/17/28/240_F_1176172880_IzGMvsCPxZToFlMagCegpgmWIakuUaFY.jpg",
      description:
        "Supplied high-temperature resistant fasteners for refinery equipment upgrade, ensuring safety and reliability in critical petrochemical operations under extreme conditions.",
      location: "Gujarat, India",
      duration: "2018-2021",
    },
    {
      title: "Cable-Stayed Bridge Project",
      subtitle: "Bridge",
      badge: "Infrastructure",
      badgeTone: "bg-[#2E1F44]",
      image: "https://t4.ftcdn.net/jpg/01/33/57/65/240_F_133576505_MROPMEGANhhZgubxWSviz47sN21MVWbh.jpg",
      description:
        "Provided structural bolts and specialized fasteners for a major cable-stayed bridge construction, ensuring structural integrity and load-bearing capacity for heavy traffic.",
      location: "Kerala, India",
      duration: "2019-2022",
    },
  ]

  const stats = [
    { label: "Projects Completed", value: "500+" },
    { label: "Years Experience", value: "25+" },
    { label: "Cities Served", value: "50+" },
    { label: "Quality Assurance", value: "100%" },
  ]

  return (
    <Layout>
      {/* Hero Section */}
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
        
      </section>

      {/* Projects Content */}
      <section className="py-16 bg-[#F7F7FA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#2E1F44] mb-6">Major Projects</h1>
            <p className="text-[rgba(46,31,68,0.85)] text-xl max-w-4xl mx-auto leading-relaxed">
              SRK Bolt has been proud to supply fasteners for numerous major infrastructure and industrial projects across India and
              internationally. Our expertise spans multiple sectors, delivering quality solutions for complex engineering challenges.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {projectCards.map((project) => (
              <div key={project.title} className="group bg-white rounded-2xl shadow-[0_10px_20px_rgba(46,31,68,0.08)] overflow-hidden hover:-translate-y-2 hover:shadow-[0_16px_32px_rgba(46,31,68,0.12)] transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{project.subtitle}</h3>
                </div>
                <div className="absolute top-4 right-4">
                    <span className={`${project.badgeTone} text-white px-3 py-1 rounded-full text-sm font-semibold`}>{project.badge}</span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h4 className="text-xl font-semibold text-[#2E1F44]">{project.title}</h4>
                  <p className="text-[rgba(46,31,68,0.85)] leading-relaxed">{project.description}</p>
                  <div className="flex items-center justify-between text-sm text-[#2E1F44]/70">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
              </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{project.duration}</span>
              </div>
                  </div>
                  <button className="w-full border border-[#2E1F44] text-[#2E1F44] py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-300 hover:bg-[#A02222] hover:text-white hover:border-[#A02222]">
                    <ExternalLink className="w-4 h-4" />
                  View Details
                </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-12 shadow-[0_12px_24px_rgba(46,31,68,0.08)] mb-16">
            <h2 className="text-3xl font-semibold text-[#2E1F44] mb-12 text-center">Project Statistics</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label} className="p-6 rounded-xl bg-[#F7F7FA] shadow-sm">
                  <div className="text-4xl font-bold text-[#A02222] mb-2">{stat.value}</div>
                  <div className="text-[rgba(46,31,68,0.85)] font-medium">{stat.label}</div>
              </div>
              ))}
            </div>
          </div>

          <div className="bg-[#A02222] text-white rounded-2xl p-12 text-center shadow-[0_12px_24px_rgba(46,31,68,0.15)]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Next Project?</h2>
            <p className="text-lg text-white/85 max-w-3xl mx-auto mb-6">
              Join our portfolio of successful projects. Let SRK Bolt provide the quality fasteners and engineering solutions your
              project needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-[#A02222] border border-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2E1F44] hover:text-white transition-colors"
              >
                Get Project Quote
              </a>
              <a
                href="/collections"
                className="border-[1.5px] border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#A02222] transition-colors"
              >
                Explore Products
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

"use client"

import Layout from "@/components/Layout"
import { BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

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
    title: "Our Brands",
    subtitle: "Selected Brands & Manufacturers Across Our Sourcing Network",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
  },
]

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
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<BannerSlide[]>(FALLBACK_SLIDES)
  const [loadingSlides, setLoadingSlides] = useState(false)

  useEffect(() => {
    let isMounted = true
    const loadSlides = async () => {
      try {
        setLoadingSlides(true)
        const response = await fetch("/api/banners?page=brands")

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
    if (slides.length === 0) return
    setCurrentSlide((prev: number) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    if (slides.length === 0) return
    setCurrentSlide((prev: number) => (prev - 1 + slides.length) % slides.length)
  }

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
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl mb-4">
                    {slide.title}
                  </h1>
                  {slide.subtitle && (
                    <p className="text-white/80 text-lg max-w-2xl mb-6">
                      {slide.subtitle}
                    </p>
                  )}
                  <a
                    href="/srk-fastener.pdf"
                    download
                    className="inline-flex items-center gap-2 bg-white text-[#A02222] px-6 py-2.5 rounded-lg font-semibold border border-white hover:bg-[#A02222] hover:text-white transition-colors shadow-lg"
                  >
                    Download Catalogue
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={loadingSlides || slides.length <= 1}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={nextSlide}
          disabled={loadingSlides || slides.length <= 1}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </section>

      <section className="py-16 bg-[#F7F7FA]">
        <div className="container mx-auto px-4 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#2E1F44]">Fastener Brands & Sourcing Network</h2>
            <p className="text-[rgba(46,31,68,0.8)]">
              SRK Bolt works with selected fastener brands and manufacturers to support a broad range of industrial requirements. Brand and product availability can vary by specification, size, material and project quantity, so contact our sales team for current sourcing and quotation support.
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


"use client"

import Layout from "@/components/Layout"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

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
    title: "Expertise, Trends & Proven Practices",
    subtitle: "From SRK Bolt Industries",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
  },
]

interface Blog {
  _id?: string
  title: string
  slug?: string
  category: string
  excerpt: string
  content: string
  coverImage?: string
  readTime?: string
  publishedAt?: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<BannerSlide[]>(FALLBACK_SLIDES)
  const [loadingSlides, setLoadingSlides] = useState(false)

  useEffect(() => {
    let isMounted = true
    const loadSlides = async () => {
      try {
        setLoadingSlides(true)
        const response = await fetch("/api/banners?page=blogs")

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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs")
        if (!response.ok) {
          throw new Error("Failed to load blogs")
        }
        const data = await response.json()
        setBlogs(data)
      } catch (err) {
        console.error(err)
        setError("Unable to load blogs right now. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

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
                  <h1 className="text-4xl md:text-5xl font-bold max-w-3xl leading-tight mb-4">
                    {slide.title}
                  </h1>
                  {slide.subtitle && (
                    <p className="text-white/80 text-lg max-w-2xl">
                      {slide.subtitle}
                    </p>
                  )}
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
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white/70 rounded-2xl border border-[#E4E1F0] p-6 animate-pulse space-y-4 h-[360px]"
                >
                  <div className="h-32 bg-[#FCE9E9]/70 rounded-xl" />
                  <div className="h-6 bg-[#E4E1F0] rounded w-3/4" />
                  <div className="h-4 bg-[#E4E1F0] rounded w-full" />
                  <div className="h-4 bg-[#E4E1F0] rounded w-2/3" />
                  <div className="h-4 bg-[#E4E1F0] rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-white rounded-2xl border border-red-200 text-red-600 px-6 py-12 text-center max-w-3xl mx-auto">
              {error}
            </div>
          ) : blogs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E4E1F0] px-6 py-12 text-center max-w-3xl mx-auto text-[#2E1F44]/70">
              No blog posts found. Check back soon for the latest updates from SRK Bolt.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {blogs.map((post) => {
                const previewSource =
                  (post.content && post.content.trim().length > 0 ? post.content : (post as any).excerpt || "") || ""
                const preview =
                  previewSource.length > 150 ? `${previewSource.slice(0, 150)}…` : previewSource
                const formattedDate = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                  : ""

                return (
                  <Link href={`/blogs/${post.slug || post._id}`} key={post._id} className="group">
                    <article
                      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
                    >
                      <div className="p-6">
                        <span className="inline-block bg-[#FCE9E9] text-[#A02222] uppercase tracking-[0.2em] text-[10px] font-bold px-3 py-1 rounded mb-4">
                          {post.category}
                        </span>

                        {post.coverImage && (
                          <div className="mb-4 rounded-lg overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        )}

                        <h2 className="text-xl font-semibold text-[#2E1F44] leading-tight mb-3 group-hover:text-[#A02222] transition-colors">
                          {post.title}
                        </h2>

                        <p className="text-[#2E1F44]/70 text-sm leading-relaxed mb-4 line-clamp-3">
                          {preview}
                        </p>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#2E1F44]/50">{formattedDate}</span>
                          <span className="text-[#A02222] font-semibold uppercase tracking-wider text-xs group-hover:underline">
                            Read More
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}


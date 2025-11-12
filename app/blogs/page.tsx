"use client"

import Layout from "@/components/Layout"
import { useEffect, useState } from "react"

interface Blog {
  _id?: string
  title: string
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
      <section className="relative h-80 bg-linear-to-br from-[#2E1F44] via-[#341D52] to-[#1C1233] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80')] opacity-15 bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full container mx-auto px-4 flex flex-col justify-center">
         
          <h1 className="text-4xl md:text-5xl font-bold max-w-3xl leading-tight">
            Expertise, Trends & Proven Practices from SRK Bolt Industries
          </h1>
         
        </div>
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
            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
              {blogs.map((post) => {
                const previewSource =
                  (post.content && post.content.trim().length > 0 ? post.content : (post as any).excerpt || "") || ""
                const preview =
                  previewSource.length > 200 ? `${previewSource.slice(0, 200)}…` : previewSource
                const formattedDate = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : ""

                return (
                  <article
                    key={post._id}
                    className="bg-white rounded-2xl shadow-[0_18px_40px_rgba(46,31,68,0.08)] border border-[#E4E1F0] overflow-hidden flex flex-col"
                  >
                    <div className="relative h-48 flex items-center justify-center overflow-hidden bg-[#FCE9E9]">
                      {post.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[#A02222]/25 text-5xl font-extrabold tracking-[0.5em] uppercase select-none">
                          SRK
                        </span>
                      )}
                      <span className="absolute top-4 left-4 bg-white/90 text-[#A02222] uppercase tracking-[0.25em] text-xs font-semibold px-4 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h2 className="text-2xl font-semibold text-[#2E1F44] leading-snug mb-3">{post.title}</h2>
                      <p className="text-[#2E1F44]/75 leading-relaxed mb-6 flex-1 whitespace-pre-line break-words">{preview}</p>
                      <div className="text-sm text-[#2E1F44]/60 flex items-center justify-between">
                        <span>{formattedDate}</span>
                        <span className="font-medium uppercase tracking-[0.3em] text-[#A02222]">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}


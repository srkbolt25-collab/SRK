"use client"

import Layout from "@/components/Layout"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Calendar, User, Search } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Blog {
    _id: string
    title: string
    slug?: string
    category: string
    content: string
    coverImage?: string
    readTime?: string
    publishedAt?: string
}

// Simple markdown renderer for bold text
function renderMarkdown(text: string) {
    // Replace **text** with <strong>text</strong>
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}

export default function BlogDetailsPage() {
    const params = useParams()
    const [blog, setBlog] = useState<Blog | null>(null)
    const [recentBlogs, setRecentBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`/api/blogs/${params.id}`)
                if (!response.ok) {
                    throw new Error("Failed to load blog")
                }
                const data = await response.json()
                setBlog(data)
            } catch (err) {
                console.error(err)
                setError("Unable to load blog details. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        const fetchRecentBlogs = async () => {
            try {
                const response = await fetch('/api/blogs')
                if (response.ok) {
                    const data = await response.json()
                    setRecentBlogs(data.slice(0, 5))
                }
            } catch (err) {
                console.error("Failed to fetch recent blogs:", err)
            }
        }

        if (params.id) {
            fetchBlog()
            fetchRecentBlogs()
        }
    }, [params.id])

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen bg-[#F7F7FA] py-8">
                    <div className="container mx-auto px-4">
                        <div className="animate-pulse space-y-6">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-64 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }

    if (error || !blog) {
        return (
            <Layout>
                <div className="min-h-screen bg-[#F7F7FA] flex flex-col items-center justify-center p-4">
                    <div className="bg-white rounded-lg border border-red-200 text-red-600 px-8 py-12 text-center max-w-lg w-full">
                        <h2 className="text-xl font-semibold mb-2">Error</h2>
                        <p>{error || "Blog not found"}</p>
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-2 mt-6 text-[#A02222] hover:underline"
                        >
                            <ChevronLeft size={20} />
                            Back to Blogs
                        </Link>
                    </div>
                </div>
            </Layout>
        )
    }

    const formattedDate = blog.publishedAt
        ? new Date(blog.publishedAt).toLocaleDateString("en-IN", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
        : ""

    return (
        <Layout>
            <div className="bg-[#F7F7FA] min-h-screen">
                {/* Breadcrumbs */}
                <div className="bg-white border-b">
                    <div className="container mx-auto px-4 py-4">
                        <nav className="flex items-center gap-2 text-sm text-gray-600">
                            <Link href="/" className="hover:text-[#A02222]">Home</Link>
                            <ChevronRight size={14} />
                            <Link href="/blogs" className="hover:text-[#A02222]">Blogs</Link>
                            <ChevronRight size={14} />
                            <span className="text-gray-900 line-clamp-1">{blog.title}</span>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Article */}
                        <article className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                                {/* Category Badge */}
                                <div className="p-6 pb-0">
                                    <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider">
                                        {blog.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <div className="p-6 pt-4">
                                    <h1 className="text-3xl md:text-4xl font-bold text-[#2E1F44] leading-tight mb-4">
                                        {blog.title}
                                    </h1>

                                    {/* Meta */}
                                    <div className="flex items-center gap-4 text-sm text-gray-600 pb-4 border-b">
                                        <div className="flex items-center gap-2">
                                            <User size={16} />
                                            <span>admin</span>
                                        </div>
                                        {formattedDate && (
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} />
                                                <span>{formattedDate}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Cover Image */}
                                {blog.coverImage && (
                                    <div className="px-6">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={blog.coverImage}
                                            alt={blog.title}
                                            className="w-full h-64 md:h-80 object-contain rounded-lg"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-6">
                                    <div
                                        className="prose prose-lg max-w-none
                      prose-headings:text-[#2E1F44] prose-headings:font-bold prose-headings:mb-4
                      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-[#2E1F44] prose-strong:font-bold
                      prose-ul:my-4 prose-li:text-gray-700
                      prose-img:rounded-lg prose-img:my-6
                    "
                                    >
                                        <div
                                            className="whitespace-pre-wrap"
                                            dangerouslySetInnerHTML={{ __html: renderMarkdown(blog.content) }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-1">
                            <div className="sticky top-8 space-y-6">
                                {/* Search */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-bold text-[#2E1F44] mb-4">Search</h3>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded">
                                            <Search size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Recent Posts */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-bold text-[#2E1F44] mb-4">Recent Posts</h3>
                                    <div className="space-y-4">
                                        {recentBlogs.map((post) => (
                                            <Link
                                                key={post._id}
                                                href={`/blogs/${post._id}`}
                                                className="block group"
                                            >
                                                <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-1">
                                                    {post.title}
                                                </h4>
                                                <p className="text-xs text-gray-500">
                                                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
                                                        month: "long",
                                                        day: "numeric",
                                                        year: "numeric"
                                                    }) : ""}
                                                </p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

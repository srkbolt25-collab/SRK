import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Calendar, ChevronLeft, ChevronRight, User } from "lucide-react"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import Layout from "@/components/Layout"
import { blogExcerpt, getBlogByIdentifier, getRecentBlogs } from "@/lib/blogs"

export const dynamic = "force-dynamic"

const SITE_URL = "https://www.srkbolt.com"

type PageProps = { params: { slug: string } }

function safeHref(value: string) {
  if (value.startsWith("/")) return value
  if (/^https?:\/\//i.test(value)) return value
  return "#"
}

function renderInline(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*.*?\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean)
  return tokens.map((token, index) => {
    const bold = token.match(/^\*\*(.*?)\*\*$/s)
    if (bold) return <strong key={index}>{bold[1]}</strong>

    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const href = safeHref(link[2].trim())
      const external = /^https?:\/\//i.test(href)
      return (
        <Link key={index} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {link[1]}
        </Link>
      )
    }

    return <span key={index}>{token}</span>
  })
}

function renderContent(content: string) {
  const blocks = content.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean)

  return blocks.map((block, index) => {
    const heading = block.match(/^(#{2,4})\s+(.+)$/s)
    if (heading) {
      const level = heading[1].length
      const children = renderInline(heading[2].trim())
      if (level === 2) return <h2 key={index}>{children}</h2>
      if (level === 3) return <h3 key={index}>{children}</h3>
      return <h4 key={index}>{children}</h4>
    }

    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean)
    if (lines.length && lines.every((line) => /^[-*]\s+/.test(line))) {
      return <ul key={index}>{lines.map((line, item) => <li key={item}>{renderInline(line.replace(/^[-*]\s+/, ""))}</li>)}</ul>
    }
    if (lines.length && lines.every((line) => /^\d+\.\s+/.test(line))) {
      return <ol key={index}>{lines.map((line, item) => <li key={item}>{renderInline(line.replace(/^\d+\.\s+/, ""))}</li>)}</ol>
    }

    return <p key={index}>{renderInline(block.replace(/\n/g, " "))}</p>
  })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const blog = await getBlogByIdentifier(params.slug)
  if (!blog) return { title: "Article Not Found | SRK Bolt", robots: { index: false, follow: false } }

  const slug = blog.slug || params.slug
  const canonical = `${SITE_URL}/blogs/${slug}`
  const title = blog.metaTitle || blog.title
  const description = blog.metaDescription || blogExcerpt(blog.content, 160)

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "SRK Bolt",
      type: "article",
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt,
      images: blog.coverImage ? [{ url: blog.coverImage, alt: blog.title }] : undefined,
    },
  }
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const blog = await getBlogByIdentifier(params.slug)
  if (!blog) notFound()

  if (blog.slug && params.slug !== blog.slug) redirect(`/blogs/${blog.slug}`)

  const recentBlogs = (await getRecentBlogs(6)).filter((item) => item._id.toString() !== blog._id.toString()).slice(0, 5)
  const canonical = `${SITE_URL}/blogs/${blog.slug}`
  const description = blog.metaDescription || blogExcerpt(blog.content, 160)
  const formattedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })
    : ""

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: blog.title,
        description,
        url: canonical,
        datePublished: blog.publishedAt || blog.createdAt,
        dateModified: blog.updatedAt || blog.publishedAt || blog.createdAt,
        image: blog.coverImage || undefined,
        author: { "@type": "Organization", name: "SRK Bolt" },
        publisher: { "@type": "Organization", name: "SRK Bolt", url: SITE_URL },
        mainEntityOfPage: canonical,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blogs", item: `${SITE_URL}/blogs` },
          { "@type": "ListItem", position: 3, name: blog.title, item: canonical },
        ],
      },
    ],
  }

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-[#F7F7FA] min-h-screen">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-[#A02222]">Home</Link>
              <ChevronRight size={14} />
              <Link href="/blogs" className="hover:text-[#A02222]">Blogs</Link>
              <ChevronRight size={14} />
              <span className="text-gray-900 line-clamp-1">{blog.title}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <article className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 pb-0">
                  <span className="inline-block bg-[#A02222] text-white px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider">{blog.category}</span>
                </div>
                <div className="p-6 pt-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-[#2E1F44] leading-tight mb-4">{blog.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-4 border-b">
                    <div className="flex items-center gap-2"><User size={16} /><span>SRK Bolt</span></div>
                    {formattedDate && <div className="flex items-center gap-2"><Calendar size={16} /><time dateTime={blog.publishedAt}>{formattedDate}</time></div>}
                  </div>
                </div>

                {blog.coverImage && <div className="px-6"><img src={blog.coverImage} alt={blog.title} className="w-full h-64 md:h-80 object-contain rounded-lg" /></div>}

                <div className="p-6">
                  <div className="prose prose-lg max-w-none prose-headings:text-[#2E1F44] prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#A02222] prose-strong:text-[#2E1F44] prose-li:text-gray-700">
                    {renderContent(blog.content)}
                  </div>
                </div>
              </div>
            </article>

            <aside className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-bold text-[#2E1F44] mb-4">Recent Posts</h2>
                  <div className="space-y-4">
                    {recentBlogs.map((post) => (
                      <Link key={post._id.toString()} href={`/blogs/${post.slug || post._id.toString()}`} className="block group">
                        <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#A02222] line-clamp-2 mb-1">{post.title}</h3>
                        <p className="text-xs text-gray-500">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" }) : ""}</p>
                      </Link>
                    ))}
                  </div>
                </div>
                <Link href="/blogs" className="inline-flex items-center gap-2 text-[#A02222] font-semibold hover:underline"><ChevronLeft size={18} /> Back to all guides</Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  )
}

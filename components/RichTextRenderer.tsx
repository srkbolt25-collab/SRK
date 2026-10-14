import React from "react"

export function containsHtml(value?: string | null) {
  return typeof value === "string" && /<\/?[a-z][\s\S]*>/i.test(value)
}

export function stripHtml(value = "") {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim()
}

export function sanitizeRichText(value = "") {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "")
}

type RichTextRendererProps = {
  content?: string | null
  className?: string
  fallback?: React.ReactNode
}

export default function RichTextRenderer({ content, className = "", fallback = null }: RichTextRendererProps) {
  const value = typeof content === "string" ? content.trim() : ""
  if (!value) return <>{fallback}</>

  if (containsHtml(value)) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: sanitizeRichText(value) }} />
  }

  return (
    <div className={className}>
      {value.split(/\n\s*\n/).map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"

type Props = { value: string; onChange: (value: string) => void; placeholder?: string }

// Allowlist used for pasted content and source edits. No scripts, event handlers, inline styles or embeds.
function sanitize(html: string): string {
  if (typeof document === "undefined") return html
  const root = document.createElement("div")
  root.innerHTML = html
  const allowed = new Set(["P", "BR", "H2", "H3", "H4", "STRONG", "B", "EM", "I", "U", "UL", "OL", "LI", "BLOCKQUOTE", "A", "TABLE", "THEAD", "TBODY", "TR", "TH", "TD", "HR", "DIV"])
  function scrub(parent: Element) {
    Array.from(parent.children).forEach(node => {
      if (["SCRIPT", "STYLE", "IFRAME", "OBJECT", "SVG", "FORM", "INPUT", "IMG"].includes(node.tagName)) { node.remove(); return }
      scrub(node)
      if (!allowed.has(node.tagName)) { node.replaceWith(...Array.from(node.childNodes)); return }
      const href = node.tagName === "A" ? node.getAttribute("href") : null
      Array.from(node.attributes).forEach(a => node.removeAttribute(a.name))
      if (href && (/^https?:\/\//i.test(href) || /^\//.test(href) || /^mailto:/i.test(href))) node.setAttribute("href", href)
    })
  }
  scrub(root)
  return root.innerHTML
}

export default function RichTextEditor({ value, onChange, placeholder = "Write blog content..." }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [source, setSource] = useState(false)
  const [html, setHtml] = useState(value || "")
  useEffect(() => { setHtml(value || ""); if (ref.current && document.activeElement !== ref.current && ref.current.innerHTML !== (value || "")) ref.current.innerHTML = value || "" }, [value])
  const change = (next: string) => { const cleaned = sanitize(next); setHtml(cleaned); onChange(cleaned) }
  const exec = (name: string, val?: string) => { ref.current?.focus(); document.execCommand(name, false, val); change(ref.current?.innerHTML || "") }
  const block = (tag: string) => exec("formatBlock", tag)
  const link = () => { const text = window.prompt("Link URL (https:// or /path)"); if (!text) return; const u = text.trim(); if (/^https?:\/\//i.test(u) || u.startsWith("/") || /^mailto:/i.test(u)) exec("createLink", u); else window.alert("Enter a valid https://, /path, or mailto: link") }
  const table = () => exec("insertHTML", '<table><tbody><tr><th>Heading 1</th><th>Heading 2</th></tr><tr><td>Cell 1</td><td>Cell 2</td></tr></tbody></table><p></p>')
  const btn = (label: string, handler: () => void) => <button key={label} type="button" onMouseDown={e => e.preventDefault()} onClick={handler} className="rounded border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-100" title={label}>{label}</button>
  const words = html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").trim().split(/\s+/).filter(Boolean).length
  return <div className="overflow-hidden rounded-lg border border-gray-300 bg-white">
    <div className="flex flex-wrap items-center gap-1 border-b bg-gray-50 p-2">
      {btn("P", () => block("p"))}{btn("H2", () => block("h2"))}{btn("H3", () => block("h3"))}{btn("H4", () => block("h4"))}
      {btn("B", () => exec("bold"))}{btn("I", () => exec("italic"))}{btn("U", () => exec("underline"))}
      {btn("• List", () => exec("insertUnorderedList"))}{btn("1. List", () => exec("insertOrderedList"))}{btn("Quote", () => block("blockquote"))}
      {btn("Left", () => exec("justifyLeft"))}{btn("Center", () => exec("justifyCenter"))}{btn("Right", () => exec("justifyRight"))}
      {btn("Link", link)}{btn("Unlink", () => exec("unlink"))}{btn("Table", table)}{btn("Line", () => exec("insertHorizontalRule"))}
      {btn("Clear", () => exec("removeFormat"))}{btn("Undo", () => exec("undo"))}{btn("Redo", () => exec("redo"))}
      <button type="button" onClick={() => setSource(s => !s)} className="ml-auto rounded bg-red-700 px-3 py-1 text-xs font-semibold text-white">{source ? "Visual" : "HTML Source"}</button>
    </div>
    {source ? <textarea className="min-h-[340px] w-full p-4 font-mono text-sm outline-none" aria-label="HTML source editor" value={html} onChange={e => change(e.target.value)} /> : <div ref={ref} contentEditable suppressContentEditableWarning data-placeholder={placeholder} aria-label="Rich blog editor" className="prose max-w-none min-h-[340px] p-4 text-sm outline-none [&_table]:border-collapse [&_td]:border [&_td]:p-2 [&_th]:border [&_th]:p-2" onInput={() => change(ref.current?.innerHTML || "")} onPaste={e => { e.preventDefault(); const pasted = e.clipboardData.getData("text/html") || e.clipboardData.getData("text/plain"); exec("insertHTML", sanitize(pasted)) }} />}
    <div className="border-t bg-gray-50 px-3 py-1 text-right text-xs text-gray-600">{words} words · {source ? "HTML Source" : "Visual Editor"}</div>
  </div>
}

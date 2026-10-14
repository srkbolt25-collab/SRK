"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Eraser, Heading2, Heading3, Pilcrow } from "lucide-react"

type WysiwygEditorProps = {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
}

const cleanEditorHtml = (html: string) => {
  return html
    .replace(/<div><br><\/div>/gi, "")
    .replace(/<p><br><\/p>/gi, "")
    .replace(/&nbsp;/g, " ")
    .trim()
}

export default function WysiwygEditor({
  value = "",
  onChange,
  placeholder = "Write content here...",
  minHeight = "160px",
}: WysiwygEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const [focused, setFocused] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [showLinkInput, setShowLinkInput] = useState(false)

  useEffect(() => {
    if (!editorRef.current || focused) return
    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ""
    }
  }, [value, focused])

  const updateValue = () => {
    const html = cleanEditorHtml(editorRef.current?.innerHTML || "")
    onChange(html)
  }

  const runCommand = (command: string, commandValue?: string) => {
    editorRef.current?.focus()
    document.execCommand(command, false, commandValue)
    updateValue()
  }

  const applyBlock = (tag: "p" | "h2" | "h3") => {
    runCommand("formatBlock", tag)
  }

  const addLink = () => {
    const url = linkUrl.trim()
    if (!url) return
    const safeUrl = /^https?:\/\//i.test(url) || url.startsWith("/") ? url : `https://${url}`
    runCommand("createLink", safeUrl)
    setLinkUrl("")
    setShowLinkInput(false)
  }

  return (
    <div className="rounded-md border border-gray-200 bg-white overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">
        <Button type="button" variant="ghost" size="sm" onClick={() => runCommand("bold")} title="Bold">
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => runCommand("italic")} title="Italic">
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => runCommand("underline")} title="Underline">
          <Underline className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => applyBlock("p")} title="Paragraph">
          <Pilcrow className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => applyBlock("h2")} title="Heading 2">
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => applyBlock("h3")} title="Heading 3">
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => runCommand("insertUnorderedList")} title="Bullet List">
          <List className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => runCommand("insertOrderedList")} title="Numbered List">
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setShowLinkInput((prev) => !prev)} title="Add Link">
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => runCommand("removeFormat")} title="Clear Formatting">
          <Eraser className="h-4 w-4" />
        </Button>
        {showLinkInput && (
          <div className="flex items-center gap-2 ml-1 w-full sm:w-auto">
            <Input
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="h-8 w-full sm:w-64"
            />
            <Button type="button" size="sm" onClick={addLink}>Apply</Button>
          </div>
        )}
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-label={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false)
          updateValue()
        }}
        onInput={updateValue}
        className="wysiwyg-editor min-h-[160px] w-full px-3 py-3 text-sm leading-6 outline-none focus:ring-2 focus:ring-red-100 empty:before:text-gray-400 empty:before:content-[attr(data-placeholder)]"
        style={{ minHeight }}
        data-placeholder={placeholder}
      />
    </div>
  )
}

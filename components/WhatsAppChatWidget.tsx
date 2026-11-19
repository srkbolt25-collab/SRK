"use client"

import { useState } from "react"
import { MessageCircle, Send, X } from "lucide-react"

const WHATSAPP_NUMBER = "971586600485"
const quickMessages = [
  { label: "Request a quotation", message: "Hello SRK Bolt, I would like to request a quotation for industrial fasteners." },
  { label: "Product availability", message: "Hello SRK Bolt, I would like to check product availability." },
  { label: "Delivery & shipping", message: "Hello SRK Bolt, I have a question about delivery and shipping." },
]

export default function WhatsAppChatWidget() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")

  const openWhatsApp = (text: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      {open && (
        <section aria-label="WhatsApp chat" className="w-[min(350px,calc(100vw-40px))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-[#075E54] px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/15 p-2"><MessageCircle className="h-5 w-5" /></div>
              <div><div className="text-sm font-semibold">SRK Bolt Support</div><div className="text-xs text-white/80">Chat with our team on WhatsApp</div></div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close WhatsApp chat" className="rounded-lg p-1.5 hover:bg-white/15"><X className="h-5 w-5" /></button>
          </div>
          <div className="space-y-3 bg-[#f1f5f3] p-4">
            <div className="max-w-[90%] rounded-xl rounded-tl-sm bg-white p-3 text-sm text-slate-800 shadow-sm">Hello! Welcome to SRK Bolt 👋 How can we help you today?</div>
            <p className="text-xs font-medium text-slate-600">Choose a topic to start a chat:</p>
            <div className="flex flex-col gap-2">
              {quickMessages.map(({ label, message: quickMessage }) => (
                <button key={label} type="button" onClick={() => openWhatsApp(quickMessage)} className="rounded-lg border border-[#25D366]/50 bg-white px-3 py-2 text-left text-sm font-medium text-[#075E54] transition-colors hover:bg-green-50">{label} ↗</button>
              ))}
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (message.trim()) openWhatsApp(message.trim()) }} className="flex items-center gap-2 border-t border-slate-100 bg-white p-3">
            <input aria-label="Your WhatsApp message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." className="min-w-0 flex-1 rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#25D366]" />
            <button type="submit" disabled={!message.trim()} aria-label="Send message on WhatsApp" className="rounded-full bg-[#25D366] p-2.5 text-white disabled:opacity-40"><Send className="h-4 w-4" /></button>
          </form>
          <p className="px-3 pb-3 text-center text-[11px] text-slate-500">Opens WhatsApp to send your message. No automatic replies.</p>
        </section>
      )}
      <button type="button" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"} aria-expanded={open} className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-4 ring-white/90 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075E54]">
        {open ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
      </button>
    </div>
  )
}

"use client"

import Layout from "@/components/Layout"
import { useState, useEffect } from "react"

interface Contact {
  _id?: string
  title: string
  name: string
  designation: string
  tel: string
  email: string
  type: "sales" | "purchase"
  image?: string
}

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"sales" | "purchase">("sales")
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/contacts?type=${activeTab}`)
        if (response.ok) {
          const data = await response.json()
          const normalised = (Array.isArray(data) ? data : []).map((contact: any) => ({
            ...contact,
            _id: typeof contact._id === "string" ? contact._id : contact._id?.$oid ?? "",
          }))
          setContacts(normalised)
        }
      } catch (error) {
        console.error("Error fetching contacts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [activeTab])

  return (
    <Layout>
      <section className="bg-[#F7F7FA] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl font-bold text-[#2E1F44]">Speak With SRK Bolt</h1>
            <p className="text-[rgba(46,31,68,0.85)] text-lg">
              Tell us what you need and our fastener specialists will get back within one business day with solutions, pricing, and
              availability tailored to your project.
            </p>
            <a
              href="/srk-fastener.pdf"
              download
              className="inline-flex items-center gap-2 bg-[#A02222] text-white px-6 py-2.5 rounded-lg font-semibold border border-[#A02222] hover:bg-white hover:text-[#A02222] transition-colors shadow-lg"
            >
              Download Catalogue
            </a>
            
            {/* Tabs in Center */}
            <div className="flex justify-center mt-6">
              <div className="flex bg-[#F5F5F5] rounded-full p-1">
                <button
                  onClick={() => setActiveTab("sales")}
                  className={`px-8 py-3 font-semibold transition-all duration-300 rounded-full ${
                    activeTab === "sales"
                      ? "bg-[#2E1F44] text-white shadow-sm"
                      : "bg-white text-[#2E1F44] border border-[#2E1F44]"
                  }`}
                >
                  Sales
                </button>
                <button
                  onClick={() => setActiveTab("purchase")}
                  className={`px-8 py-3 font-semibold transition-all duration-300 rounded-full ${
                    activeTab === "purchase"
                      ? "bg-[#2E1F44] text-white shadow-sm"
                      : "bg-white text-[#2E1F44] border border-[#2E1F44]"
                  }`}
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>
          
          {/* Sales/Purchase Contact Cards */}
          {(activeTab === "sales" || activeTab === "purchase") && (
            <div className="max-w-4xl mx-auto mt-8">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A02222] mx-auto mb-2"></div>
                    Loading contacts...
                  </div>
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No contacts available for {activeTab === "sales" ? "Sales" : "Purchase"}.
                </div>
              ) : (
                <div className="flex flex-wrap justify-center gap-4">
                  {contacts.map((contact) => (
                    <div key={contact._id} className="bg-[#F7F7FA] rounded-xl overflow-hidden shadow-sm max-w-md">
                      <div className="flex flex-col">
                        {/* Image Section - Top Half */}
                        <div className="w-full h-56 bg-gray-200 overflow-hidden flex items-center justify-center rounded-t-xl">
                          {contact.image ? (
                            <img
                              src={contact.image}
                              alt={`${contact.title} ${contact.name}`}
                              className="w-full h-full object-contain rounded-t-xl"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                              }}
                            />
                          ) : (
                            <div className="text-gray-400 text-sm">No image</div>
                          )}
                        </div>
                        {/* Text Section - Bottom Half */}
                        <div className="p-4 text-center">
                          <h3 className="text-base font-bold text-[#2E1F44] mb-1.5">
                            {contact.title} {contact.name}
                          </h3>
                          <p className="text-blue-600 font-semibold mb-3 text-xs">{contact.designation}</p>
                          <div className="space-y-1.5 text-xs text-[#2E1F44]">
                            <div>
                              <a href={`tel:${contact.tel.replace(/\s/g, '')}`} className="underline hover:text-[#A02222]">
                                Tel. {contact.tel}
                              </a>
                            </div>
                            <div>
                              <a href={`mailto:${contact.email}`} className="underline hover:text-[#A02222]">
                                {contact.email}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-white rounded-2xl shadow-[0_12px_24px_rgba(46,31,68,0.08)] p-10 space-y-8">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-[#2E1F44]">Contact Information</h2>
                <p className="text-[rgba(46,31,68,0.7)]">
                  Reach us via phone or email for immediate assistance or drop by our office for an in-person consultation.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Head Office",
                    detail: [
                      "Sharjah Publishing City Free Zone (SPC Free Zone)",
                      "Al Zahia, Sheikh Mohammed Bin Zayed Rd",
                      "Sharjah, United Arab Emirates",
                    ],
                  },
                  { title: "Phone", detail: ["+971 58 871 3064"] },
                  { title: "Email", detail: ["sales@srkbolt.com"] },
                  { title: "Working Hours", detail: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM", "Sun: Closed"] },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="bg-[#A02222] text-white w-12 h-12 rounded-xl flex items-center justify-center text-lg font-semibold">
                      {item.title.charAt(0)}
                  </div>
                  <div>
                      <h3 className="font-semibold text-[#2E1F44]">{item.title}</h3>
                      <div className="text-[rgba(46,31,68,0.7)] text-sm leading-relaxed">
                        {item.detail.map((line) => (
                          <div key={line}>{line}</div>
                        ))}
                  </div>
                </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
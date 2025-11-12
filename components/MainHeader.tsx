"use client"

import Link from "next/link"
import { Search, Phone, MessageCircle, ShoppingCart, Mail } from "lucide-react"
import { useRFQ } from "@/contexts/RFQContext"
import Image from "next/image"
import LogoSRK from "@/public/logoSRK.jpeg"

export default function MainHeader() {
  const { rfqCount, isHydrated } = useRFQ()

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-2 py-3">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-[#2E1F44]">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/">
              <div className="h-24 w-64 relative">
                <Image
                  src={LogoSRK}
                  alt="SRK Bolt Logo"
                  fill
                  className="object-contain cursor-pointer"
                  priority
                />
              </div>
            </Link>
          </div>
        
          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search model number, product..."
                className="w-full px-4 py-2 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A02222] placeholder:text-[#777777]"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A02222]" />
            </div>
          </div>
                
          {/* Contact Info */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
            <div className="flex items-center">
              <span className="bg-[#A02222] hover:bg-[#2E1F44] transition-colors px-3 py-2 rounded-lg flex items-center gap-2 text-white">
                <Phone className="w-4 h-4" />
                +971 58 871 3064
              </span>
            </div>
            <button
              onClick={() => {
                const phoneNumber = "971588713064"
                const whatsappUrl = `https://wa.me/${phoneNumber}`
                window.open(whatsappUrl, "_blank")
              }}
              className="bg-[#A02222] hover:bg-[#2E1F44] transition-colors px-3 py-2 rounded-lg flex items-center gap-2 text-white"
            >
              <MessageCircle className="w-4 h-4" />
              Message Us
            </button>
            <Link href="/rfq" className="relative">
              <span className="bg-[#A02222] hover:bg-[#2E1F44] transition-colors px-3 py-2 rounded-lg flex items-center gap-2 text-white">
                <ShoppingCart className="w-4 h-4" />
                RFQ List
              </span>
              {isHydrated && rfqCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FFD5D5] text-[#A02222] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {rfqCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => {
                window.location.href = "mailto:sales@srkbolt.com"
              }}
              className="bg-[#A02222] hover:bg-[#2E1F44] transition-colors px-3 py-2 rounded-lg flex items-center gap-2 text-white"
            >
              <Mail className="w-4 h-4" />
              Email Us
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

"use client"

import Link from "next/link"
import { Search, Phone, MessageCircle, ShoppingCart, Mail } from "lucide-react"
import { useRFQ } from "@/contexts/RFQContext"

export default function MainHeader() {
  const { rfqCount, isHydrated } = useRFQ()

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-2 py-1">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-1">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/">
              <img 
                src="/image-removebg-preview (15).png" 
                alt="SRK Bolt Logo" 
                className="h-16 w-auto cursor-pointer"
              />
            </Link>
          </div>
        
          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search model number, product..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
                
          {/* Contact Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-green-600">
              <Phone className="w-5 h-5" />
              <span className="text-sm font-semibold">+91-9876543210</span>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">Message Us</span>
            </div>
            <Link href="/rfq" className="flex items-center space-x-2 text-red-600 hover:text-red-700 relative cursor-pointer">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-semibold">RFQ List</span>
              {isHydrated && rfqCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
                  {rfqCount}
                </span>
              )}
            </Link>
            <div className="flex items-center space-x-2 text-red-600">
              <Mail className="w-5 h-5" />
              <span className="text-sm">sales@srkbolt.com</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

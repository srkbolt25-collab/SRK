"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Wrench, Settings, FileText, Map } from "lucide-react"

export default function ProductCategoriesNav() {
  return (
    <nav className="bg-[#A02222] text-white sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6 py-3 text-sm font-semibold">
          <Link href="/products" className="flex items-center gap-1 whitespace-nowrap hover:text-[#FFD5D5] transition-colors font-semibold">
            <span>ALL PRODUCTS</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link href="/bolts" className="flex items-center gap-1 whitespace-nowrap hover:text-[#FFD5D5] transition-colors">
            <Image
              src="/icons8-bolt-64.png"
              alt="Bolts Icon"
              width={16}
              height={16}
              className="w-4 h-4 object-contain"
            />
            <span>BOLTS</span>
          </Link>
          <Link href="/nuts" className="flex items-center gap-1 whitespace-nowrap hover:text-[#FFD5D5] transition-colors">
            <Image
              src="/icons8-nut-64%20(1).png"
              alt="Nuts Icon"
              width={16}
              height={16}
              className="w-4 h-4 object-contain"
            />
            <span>NUTS</span>
          </Link>
          <Link href="/washers" className="flex items-center gap-1 whitespace-nowrap hover:text-[#FFD5D5] transition-colors">
            <Image
              src="/gasket.png"
              alt="Washers Icon"
              width={16}
              height={16}
              className="w-4 h-4 object-contain"
            />
            <span>WASHERS</span>
          </Link>
          <Link href="/screws" className="flex items-center gap-1 whitespace-nowrap hover:text-[#FFD5D5] transition-colors">
            <Image
              src="/screw%20(2).png"
              alt="Screws Icon"
              width={16}
              height={16}
              className="w-4 h-4 object-contain"
            />
            <span>SCREWS</span>
          </Link>
          <Link href="/hook-eye" className="flex items-center gap-1 whitespace-nowrap hover:text-[#FFD5D5] transition-colors">
            <Image
              src="/hookandeye.png"
              alt="Hook & Eye Icon"
              width={16}
              height={16}
              className="w-4 h-4 object-contain"
            />
            <span>HOOK & EYE PRODUCTS</span>
          </Link>
          <Link href="/rivets" className="flex items-center gap-1 whitespace-nowrap hover:text-[#FFD5D5] transition-colors">
            <Image
              src="/rivet.png"
              alt="Rivets Icon"
              width={16}
              height={16}
              className="w-4 h-4 object-contain"
            />
            <span>RIVETS, PIN & INSERTS</span>
          </Link>
          <Link href="/attachments" className="flex items-center gap-1 whitespace-nowrap hover:text-[#FFD5D5] transition-colors">
            <Settings className="w-4 h-4" />
            <span>HEAVY LOAD ATTACHMENTS</span>
          </Link>
          <Link href="/other" className="flex items-center gap-1 whitespace-nowrap hover:text-[#FFD5D5] transition-colors">
            <Settings className="w-4 h-4" />
            <span>OTHER PRODUCTS</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

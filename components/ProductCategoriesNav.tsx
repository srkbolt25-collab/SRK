"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Settings, Map } from "lucide-react"

export default function ProductCategoriesNav() {
  return (
    <nav className="bg-[#A02222] text-white sticky top-0 z-40 shadow-lg">
      <div className="w-full px-3 md:px-4 lg:px-6 xl:px-8">
        <div className="flex flex-nowrap items-center justify-center gap-3 md:gap-4 lg:gap-6 py-2 text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-semibold tracking-[0.045em]">
          <Link
            href="/products"
            className="flex items-center gap-1.5 whitespace-nowrap hover:text-[#FFD5D5] transition-colors font-semibold uppercase tracking-[0.14em]"
          >
            <span>ALL PRODUCTS</span>
            <ChevronRight className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5" />
          </Link>
          <CategoryLink href="/bolts" iconSrc="/icons8-bolt-64.png" label="BOLTS" />
          <CategoryLink href="/nuts" iconSrc="/icons8-nut-64%20(1).png" label="NUTS" />
          <CategoryLink href="/washers" iconSrc="/gasket.png" label="WASHERS" />
          <CategoryLink href="/screws" iconSrc="/screw%20(2).png" label="SCREWS" />
          <CategoryLink href="/hook-eye" iconSrc="/hookandeye.png" label="HOOK & EYE" />
          <CategoryLink href="/rivets" iconSrc="/rivet.png" label="RIVETS & INSERTS" />
          <IconLink href="/attachments" icon={<Settings className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5" />} label="HEAVY LOAD" />
          <IconLink href="/other" icon={<Settings className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5" />} label="OTHER PRODUCTS" />
          <IconLink href="/contact" icon={<Map className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5" />} label="CONTACT US" />
        </div>
      </div>
    </nav>
  )
}

function CategoryLink({ href, iconSrc, label }: { href: string; iconSrc: string; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-1.5 whitespace-nowrap hover:text-[#FFD5D5] transition-colors">
      <Image
        src={iconSrc}
        alt={`${label} Icon`}
        width={20}
        height={20}
        className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5 object-contain"
      />
      <span>{label}</span>
    </Link>
  )
}

function IconLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-1.5 whitespace-nowrap hover:text-[#FFD5D5] transition-colors">
      {icon}
      <span>{label}</span>
    </Link>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Settings, Map, Menu, X, Globe2 } from "lucide-react"

export default function ProductCategoriesNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-[#A02222] text-white sticky top-0 z-40 shadow-lg overflow-x-hidden">
      <div className="w-full max-w-full px-1.5 sm:px-2 md:px-4 lg:px-6 xl:px-8">
        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:flex flex-nowrap items-center justify-center gap-2.5 lg:gap-4 xl:gap-6 py-1.5 sm:py-2 text-[12px] lg:text-[13px] xl:text-[14px] font-semibold tracking-tight">
          <Link
            href="/products"
            className="flex items-center gap-1 whitespace-nowrap hover:text-[#FFD5D5] transition-colors font-semibold uppercase shrink-0"
          >
            <span>ALL PRODUCTS</span>
            <ChevronRight className="w-4 h-4 lg:w-4.5 lg:h-4.5 shrink-0" />
          </Link>
          <CategoryLink href="/bolts" iconSrc="/icons8-bolt-64.png" label="BOLTS" />
          <CategoryLink href="/nuts" iconSrc="/icons8-nut-64%20(1).png" label="NUTS" />
          <CategoryLink href="/washers" iconSrc="/gasket.png" label="WASHERS" />
          <CategoryLink href="/screws" iconSrc="/screw%20(2).png" label="SCREWS" />
          <CategoryLink href="/hook-eye" iconSrc="/hookandeye.png" label="HOOK & EYE" />
          <CategoryLink href="/rivets" iconSrc="/rivet.png" label="RIVETS & INSERTS" />
          <IconLink href="/attachments" icon={<Settings className="w-4 h-4 lg:w-4.5 lg:h-4.5 shrink-0" />} label="HEAVY LOAD" />
          <IconLink href="/other" icon={<Settings className="w-4 h-4 lg:w-4.5 lg:h-4.5 shrink-0" />} label="OTHER PRODUCTS" />
          <IconLink href="/contact" icon={<Map className="w-4 h-4 lg:w-4.5 lg:h-4.5 shrink-0" />} label="CONTACT US" />
        </div>

        {/* Mobile Navigation Links and Menu Button - Visible only on mobile */}
        <div className="md:hidden border-b border-white/20 overflow-x-hidden">
          <div className="py-2.5 px-2 sm:px-3 flex flex-nowrap items-center gap-1 sm:gap-1.5 justify-center min-w-0 w-full">
            <Link href="/about" className="text-white hover:text-[#FFD5D5] transition-colors text-[11px] sm:text-sm font-semibold whitespace-nowrap shrink-0">
              About
            </Link>
            <span className="text-white/50 text-[9px] sm:text-[11px] shrink-0">•</span>
            <Link href="/industries" className="text-white hover:text-[#FFD5D5] transition-colors text-[11px] sm:text-sm font-semibold whitespace-nowrap shrink-0">
              Industries
            </Link>
            <span className="text-white/50 text-[9px] sm:text-[11px] shrink-0">•</span>
            <Link href="/projects" className="text-white hover:text-[#FFD5D5] transition-colors text-[11px] sm:text-sm font-semibold whitespace-nowrap shrink-0">
              Projects
            </Link>
            <span className="text-white/50 text-[9px] sm:text-[11px] shrink-0">•</span>
            <Link href="/brands" className="text-white hover:text-[#FFD5D5] transition-colors text-[11px] sm:text-sm font-semibold whitespace-nowrap shrink-0">
              Brands
            </Link>
            <span className="text-white/50 text-[9px] sm:text-[11px] shrink-0">•</span>
            <Link href="/blogs" className="text-white hover:text-[#FFD5D5] transition-colors text-[11px] sm:text-sm font-semibold whitespace-nowrap shrink-0">
              Blogs
            </Link>
            <span className="text-white/50 text-[9px] sm:text-[11px] shrink-0">•</span>
            <Link href="/careers" className="text-white hover:text-[#FFD5D5] transition-colors text-[11px] sm:text-sm font-semibold whitespace-nowrap shrink-0">
              Careers
            </Link>
            <span className="text-white/50 text-[9px] sm:text-[11px] mx-1 shrink-0">|</span>
            <button
              onClick={toggleMobileMenu}
              className="flex items-center gap-1 text-white hover:text-[#FFD5D5] transition-colors shrink-0"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown - Product Categories */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 bg-[#A02222]">
            <div className="py-3 space-y-1">
              <MobileCategoryLink
                href="/products"
                icon={<ChevronRight className="w-4 h-4" />}
                label="ALL PRODUCTS"
                onClick={closeMobileMenu}
              />
              <MobileCategoryLink
                href="/bolts"
                iconSrc="/icons8-bolt-64.png"
                label="BOLTS"
                onClick={closeMobileMenu}
              />
              <MobileCategoryLink
                href="/nuts"
                iconSrc="/icons8-nut-64%20(1).png"
                label="NUTS"
                onClick={closeMobileMenu}
              />
              <MobileCategoryLink
                href="/washers"
                iconSrc="/gasket.png"
                label="WASHERS"
                onClick={closeMobileMenu}
              />
              <MobileCategoryLink
                href="/screws"
                iconSrc="/screw%20(2).png"
                label="SCREWS"
                onClick={closeMobileMenu}
              />
              <MobileCategoryLink
                href="/hook-eye"
                iconSrc="/hookandeye.png"
                label="HOOK & EYE"
                onClick={closeMobileMenu}
              />
              <MobileCategoryLink
                href="/rivets"
                iconSrc="/rivet.png"
                label="RIVETS & INSERTS"
                onClick={closeMobileMenu}
              />
              <MobileCategoryLink
                href="/attachments"
                icon={<Settings className="w-4 h-4" />}
                label="HEAVY LOAD"
                onClick={closeMobileMenu}
              />
              <MobileCategoryLink
                href="/other"
                icon={<Settings className="w-4 h-4" />}
                label="OTHER PRODUCTS"
                onClick={closeMobileMenu}
              />
              <div className="border-t border-white/20 mt-2 pt-2">
                <MobileCategoryLink
                  href="/countries"
                  icon={<Globe2 className="w-4 h-4" />}
                  label="COUNTRIES WE SERVE"
                  onClick={closeMobileMenu}
                />
                {[
                  ["UAE", "/uae/products"],
                  ["Saudi Arabia", "/saudi-arabia/products"],
                  ["Qatar", "/qatar/products"],
                  ["Kuwait", "/kuwait/products"],
                  ["Bahrain", "/bahrain/products"],
                  ["Oman", "/oman/products"],
                  ["Iraq", "/iraq/products"],
                  ["Jordan", "/jordan/products"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMobileMenu}
                    className="block pl-11 pr-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white"
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <MobileCategoryLink
                href="/contact"
                icon={<Map className="w-4 h-4" />}
                label="CONTACT US"
                onClick={closeMobileMenu}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function CategoryLink({ href, iconSrc, label, mobileLabel }: { href: string; iconSrc: string; label: string; mobileLabel?: string }) {
  return (
    <Link href={href} className="flex items-center gap-0.5 sm:gap-1 whitespace-nowrap hover:text-[#FFD5D5] transition-colors shrink-0">
      <Image
        src={iconSrc}
        alt={`${label} Icon`}
        width={20}
        height={20}
        className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 object-contain shrink-0"
      />
      <span className="hidden sm:inline">{label}</span>
      {mobileLabel && <span className="sm:hidden">{mobileLabel}</span>}
      {!mobileLabel && <span className="sm:hidden">{label}</span>}
    </Link>
  )
}

function IconLink({ href, icon, label, mobileLabel }: { href: string; icon: React.ReactNode; label: string; mobileLabel?: string }) {
  return (
    <Link href={href} className="flex items-center gap-0.5 sm:gap-1 whitespace-nowrap hover:text-[#FFD5D5] transition-colors shrink-0">
      {icon}
      <span className="hidden sm:inline">{label}</span>
      {mobileLabel && <span className="sm:hidden">{mobileLabel}</span>}
      {!mobileLabel && <span className="sm:hidden">{label}</span>}
    </Link>
  )
}

function MobileCategoryLink({ 
  href, 
  iconSrc, 
  icon, 
  label, 
  onClick 
}: { 
  href: string
  iconSrc?: string
  icon?: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2.5 text-white hover:bg-white/10 transition-colors text-sm font-semibold uppercase"
    >
      {iconSrc ? (
        <Image
          src={iconSrc}
          alt={`${label} Icon`}
          width={20}
          height={20}
          className="w-5 h-5 object-contain"
        />
      ) : (
        icon
      )}
      <span>{label}</span>
    </Link>
  )
}

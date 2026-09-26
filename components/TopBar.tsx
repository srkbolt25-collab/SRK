import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { countryMarkets } from "@/lib/countryMarkets"

export default function TopBar() {
  return (
    <div className="bg-[#A02222] text-white py-2">
      <div className="container mx-auto px-4 flex justify-center md:justify-between items-center text-sm font-semibold">
        <span className="tracking-wide">Celebrating 10+ Years Of Excellence</span>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/about" className="transition-colors hover:text-[#FFD5D5] hover:underline">About Us</Link>
          <Link href="/industries" className="transition-colors hover:text-[#FFD5D5] hover:underline">Industries</Link>
          <Link href="/projects" className="transition-colors hover:text-[#FFD5D5] hover:underline">Projects</Link>
          <Link href="/brands" className="transition-colors hover:text-[#FFD5D5] hover:underline">Our Brands</Link>

          <div className="relative group">
            <Link
              href="/countries"
              className="flex items-center gap-1 transition-colors hover:text-[#FFD5D5]"
            >
              Countries <ChevronDown className="w-3.5 h-3.5" />
            </Link>
            <div className="absolute right-0 top-full pt-2 hidden group-hover:block group-focus-within:block z-[70]">
              <div className="w-56 rounded-xl bg-white text-[#2E1F44] border border-gray-200 shadow-xl overflow-hidden py-2">
                <Link
                  href="/countries"
                  className="block px-4 py-2.5 font-bold text-[#A02222] hover:bg-[#FFF5F5]"
                >
                  All Countries
                </Link>
                {countryMarkets.map((market) => (
                  <Link
                    key={market.slug}
                    href={`/${market.slug}/products`}
                    className="block px-4 py-2.5 hover:bg-[#FFF5F5] hover:text-[#A02222] transition-colors"
                  >
                    {market.shortName}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/blogs" className="transition-colors hover:text-[#FFD5D5] hover:underline">Blogs</Link>
          <Link href="/careers" className="transition-colors hover:text-[#FFD5D5] hover:underline">Careers</Link>
        </div>
      </div>
    </div>
  )
}

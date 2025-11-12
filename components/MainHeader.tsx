"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Search, Phone, MessageCircle, ShoppingCart, Mail } from "lucide-react"
import { useRFQ } from "@/contexts/RFQContext"
import Image from "next/image"
import LogoSRK from "@/public/logoSRK.jpeg"
import { useRouter } from "next/navigation"

type SearchSuggestion = {
  id: string
  name: string
  category?: string | null
  standard?: string | null
  equivalentStandard?: string | null
  sku?: string | null
  modelNumber?: string | null
}

export default function MainHeader() {
  const { rfqCount, isHydrated } = useRFQ()
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedTerm, setDebouncedTerm] = useState("")
  const [searchResults, setSearchResults] = useState<SearchSuggestion[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim())
    }, 300)
    return () => clearTimeout(handler)
  }, [searchTerm])

  useEffect(() => {
    if (!debouncedTerm) {
      setSearchResults([])
      setSearchError(null)
      setIsDropdownOpen(false)
      return
    }

    let isMounted = true
    const controller = new AbortController()

    const fetchSearchResults = async () => {
      try {
        setIsSearching(true)
        setSearchError(null)
        const response = await fetch(`/api/products?search=${encodeURIComponent(debouncedTerm)}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error("Failed to search products")
        }

        const data = await response.json()

        if (!isMounted) return

        const mapped: SearchSuggestion[] = Array.isArray(data)
          ? data.map((item: any) => ({
              id: item._id || item.id || item.name,
              name: item.name,
              category: item.category,
              standard: item.standard || item.specifications?.standard || null,
              equivalentStandard: item.equivalentStandard || item.specifications?.equivalentStandard || null,
              sku: item.sku || item.itemCode || null,
              modelNumber: item.modelNumber || item.partNumber || item.productCode || item.sku || null,
            }))
          : []

        setSearchResults(mapped)
        setIsDropdownOpen(true)
      } catch (error) {
        if (!isMounted || (error instanceof DOMException && error.name === "AbortError")) {
          return
        }
        console.error("Product search failed:", error)
        setSearchError("Unable to search products right now.")
        setSearchResults([])
        setIsDropdownOpen(true)
      } finally {
        if (isMounted) {
          setIsSearching(false)
        }
      }
    }

    fetchSearchResults()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [debouncedTerm])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelectProduct = (product: SearchSuggestion) => {
    const params = new URLSearchParams()
    params.set("name", product.name)
    if (product.category) {
      params.set("category", product.category)
    }
    router.push(`/view-details?${params.toString()}`)
    setSearchTerm("")
    setSearchResults([])
    setIsDropdownOpen(false)
  }

  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (searchResults.length > 0) {
      handleSelectProduct(searchResults[0])
      return
    }

    if (searchTerm.trim().length > 0) {
      setSearchError("No matching products found. Try another search term.")
      setIsDropdownOpen(true)
    }
  }

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
          <div className="flex-1 max-w-md mx-4 w-full" ref={searchContainerRef}>
            <form className="relative" onSubmit={handleSubmitSearch}>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) {
                    setIsDropdownOpen(true)
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setIsDropdownOpen(false)
                  }
                }}
                placeholder="Search by product name, standard, or model number..."
                className="w-full px-4 py-2 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A02222] placeholder:text-[#777777]"
                aria-label="Search products by name, standard or model number"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-2 text-[#A02222] hover:bg-[#FFF3F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A02222]"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-50 mt-2 w-full rounded-lg border border-[#E5E5E5] bg-white shadow-lg max-h-80 overflow-y-auto">
                  {isSearching ? (
                    <p className="px-4 py-3 text-sm text-[#2E1F44]/70">Searching products…</p>
                  ) : searchResults.length > 0 ? (
                    <ul className="divide-y divide-[#F1EFFA]">
                      {searchResults.map((product) => (
                        <li key={product.id}>
                          <button
                            type="button"
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => handleSelectProduct(product)}
                            className="w-full text-left px-4 py-3 hover:bg-[#FFF5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A02222]"
                          >
                            <span className="block text-sm font-semibold text-[#2E1F44]">{product.name}</span>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#2E1F44]/70">
                              {product.category && (
                                <span className="inline-flex items-center gap-1 uppercase tracking-wide bg-[#FCE9E9] text-[#A02222] px-2 py-0.5 rounded-full">
                                  {product.category}
                                </span>
                              )}
                              {product.standard && (
                                <span className="inline-flex items-center gap-1">
                                  <span className="font-semibold text-[#2E1F44]/80">Std:</span>
                                  {product.standard}
                                </span>
                              )}
                              {!product.standard && product.equivalentStandard && (
                                <span className="inline-flex items-center gap-1">
                                  <span className="font-semibold text-[#2E1F44]/80">Eqv:</span>
                                  {product.equivalentStandard}
                                </span>
                              )}
                              {product.sku && (
                                <span className="inline-flex items-center gap-1 text-[#2E1F44]/70">
                                  <span className="font-semibold text-[#2E1F44]/80">SKU:</span>
                                  {product.sku}
                                </span>
                              )}
                              {product.modelNumber && product.modelNumber !== product.sku && (
                                <span className="inline-flex items-center gap-1 text-[#2E1F44]/70">
                                  <span className="font-semibold text-[#2E1F44]/80">Model:</span>
                                  {product.modelNumber}
                                </span>
                              )}
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-4 py-3 text-sm text-[#2E1F44]/70">
                      {searchError ?? "No matching products found. Try refining your search."}
                    </p>
                  )}
                </div>
              )}
            </form>
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
              sales@srkbolt.com
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

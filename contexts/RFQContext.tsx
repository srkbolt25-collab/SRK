"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface RFQProduct {
  id: string
  name: string
  image: string
  quantity: number
}

interface RFQContextType {
  rfqCount: number
  rfqProducts: RFQProduct[]
  isHydrated: boolean
  addToRFQ: (productName: string, image?: string) => void
  removeFromRFQ: (productId: string) => void
  clearRFQ: () => void
  updateQuantity: (productId: string, quantity: number) => void
}

const RFQContext = createContext<RFQContextType | undefined>(undefined)

const STORAGE_KEY = 'rfq_products'

// Helper functions to sync with localStorage
const getRFQFromStorage = (): RFQProduct[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading RFQ from localStorage:', error)
    return []
  }
}

const saveRFQToStorage = (products: RFQProduct[]) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  } catch (error) {
    console.error('Error saving RFQ to localStorage:', error)
  }
}

export function RFQProvider({ children }: { children: ReactNode }) {
  // Always start with empty array to match server-side rendering
  const [rfqProducts, setRfqProducts] = useState<RFQProduct[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load RFQ products from localStorage after mount (client-side only)
  useEffect(() => {
    const storedProducts = getRFQFromStorage()
    if (storedProducts.length > 0) {
      setRfqProducts(storedProducts)
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage whenever rfqProducts changes
  useEffect(() => {
    saveRFQToStorage(rfqProducts)
  }, [rfqProducts])

  const addToRFQ = (productName: string, image: string = "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg") => {
    setRfqProducts(prev => {
      const existingProduct = prev.find(p => p.name === productName)
      const updatedProducts = existingProduct
        ? prev.map(p =>
            p.name === productName ? { ...p, quantity: p.quantity + 1 } : p
          )
        : [...prev, {
            id: Date.now().toString(),
            name: productName,
            image,
            quantity: 1
          }]
      return updatedProducts
    })
  }

  const removeFromRFQ = (productId: string) => {
    setRfqProducts(prev => {
      const updatedProducts = prev.filter(p => p.id !== productId)
      return updatedProducts
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromRFQ(productId)
      return
    }
    setRfqProducts(prev =>
      prev.map(p => p.id === productId ? { ...p, quantity } : p)
    )
  }

  const clearRFQ = () => {
    setRfqProducts([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return (
    <RFQContext.Provider value={{ rfqCount: rfqProducts.length, rfqProducts, isHydrated, addToRFQ, removeFromRFQ, updateQuantity, clearRFQ }}>
      {children}
    </RFQContext.Provider>
  )
}

export function useRFQ() {
  const context = useContext(RFQContext)
  if (!context) {
    throw new Error("useRFQ must be used within RFQProvider")
  }
  return context
}

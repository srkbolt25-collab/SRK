import { useEffect, useMemo, useState } from "react"

export interface DefaultCategoryProduct {
  id: string | number
  name: string
  image: string
  description: string
  price?: string
  category: string
  inStock?: boolean
}

export interface CategoryProductCard extends DefaultCategoryProduct {
  source: "default" | "database"
  productId?: string
  equivalentStandard?: string
  standard?: string
}

type ApiProduct = {
  _id?: string
  name: string
  description?: string
  category: string
  images?: string[]
  imageLink?: string
  price?: number
  inStock?: boolean
  standard?: string
  equivalentStandard?: string
  specifications?: {
    standard?: string
    equivalentStandard?: string
  }
}

const formatPrice = (_value?: number) => "Price on Request"

const mapApiProductToCard = (product: ApiProduct): CategoryProductCard => {
  const gallery = Array.isArray(product.images)
    ? Array.from(
        new Set(
          product.images
            .filter((url) => typeof url === "string" && url.trim() !== "")
            .map((url) => url.trim())
        )
      ).slice(0, 3)
    : []

  const image = gallery[0] || (product.imageLink?.trim() || "/placeholder.jpg")

  return {
    id: product._id || product.name,
    productId: product._id,
    name: product.name,
    description: product.description || "Premium industrial-grade product from SRK Bolt.",
    category: product.category,
    image,
    price: formatPrice(product.price),
    inStock: product.inStock ?? true,
    standard: product.standard || product.specifications?.standard,
    equivalentStandard: product.equivalentStandard || product.specifications?.equivalentStandard,
    source: "database",
  }
}

const mergeProducts = (
  defaults: DefaultCategoryProduct[],
  databaseProducts: CategoryProductCard[]
): CategoryProductCard[] => {
  const seen = new Set<string>()
  const merged: CategoryProductCard[] = []

  databaseProducts.forEach((product) => {
    const key = product.name.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      merged.push(product)
    }
  })

  defaults.forEach((product) => {
    const key = product.name.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      merged.push({
        ...product,
        source: "default",
        productId: undefined,
        equivalentStandard: undefined,
        standard: undefined,
      })
    }
  })

  return merged
}

export function useCategoryProducts(
  category: string,
  defaults: DefaultCategoryProduct[] = []
) {
  const [databaseProducts, setDatabaseProducts] = useState<CategoryProductCard[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/products?category=${encodeURIComponent(category)}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data: ApiProduct[] = await response.json()

        if (!isMounted) return

        setDatabaseProducts(data.map(mapApiProductToCard))
      } catch (err) {
        if (!isMounted || (err instanceof DOMException && err.name === "AbortError")) {
          return
        }
        console.error(`Error fetching ${category} products:`, err)
        setError("Could not load latest products. Showing default catalogue.")
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [category])

  const products = useMemo(() => mergeProducts(defaults, databaseProducts), [defaults, databaseProducts])

  return {
    products,
    databaseProducts,
    loading,
    error,
  }
}


"use client"

import { useEffect, useMemo, useState } from "react"
import { getProductFallbackImage, getSafeProductImage } from "@/lib/product-image"

type ProductImageProps = {
  src?: string | null
  name?: string | null
  category?: string | null
  material?: string | null
  alt?: string
  className?: string
  width?: number
  height?: number
  loading?: "lazy" | "eager"
  sizes?: string
}

export default function ProductImage({
  src,
  name,
  category,
  material,
  alt,
  className = "h-full w-full object-contain",
  width,
  height,
  loading = "lazy",
}: ProductImageProps) {
  const fallback = useMemo(
    () => getProductFallbackImage({ name, category, material }),
    [name, category, material]
  )
  const initialSrc = useMemo(
    () => getSafeProductImage({ image: src, name, category, material }),
    [src, name, category, material]
  )
  const [currentSrc, setCurrentSrc] = useState(initialSrc)

  useEffect(() => {
    setCurrentSrc(initialSrc)
  }, [initialSrc])

  return (
    <img
      src={currentSrc}
      alt={alt || name || "SRK Bolts product image"}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      onError={() => {
        if (currentSrc !== fallback) {
          setCurrentSrc(fallback)
        }
      }}
    />
  )
}

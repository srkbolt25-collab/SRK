import type { Metadata } from "next"
import type { ReactNode } from "react"
import { getCollection } from "@/lib/mongodb"
import { createSlug } from "@/lib/slug"

const DEFAULT_DESCRIPTION =
  "Premium industrial fasteners from SRK Bolt. Contact us for more +971 58 871 3064"

function normalizeSlug(raw: string) {
  return decodeURIComponent(raw || "")
    .replace(/[’']/g, "")
    .trim()
    .toLowerCase()
}

function titleFromSlug(slug: string) {
  const readable = slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")

  return readable ? `${readable} - SRK BOLT` : "SRK BOLT"
}

export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
  const requestedSlug = normalizeSlug(params?.name || "")

  if (!requestedSlug) {
    return {
      title: "Product Details - SRK BOLT",
      description: DEFAULT_DESCRIPTION,
    }
  }

  try {
    const collection = await getCollection("products")

    let product = await collection.findOne(
      { slug: requestedSlug },
      {
        projection: {
          name: 1,
          slug: 1,
          description: 1,
          seoTitle: 1,
          seoDescription: 1,
          seoKeywords: 1,
        },
      }
    )

    if (!product) {
      const candidates = await collection
        .find(
          {},
          {
            projection: {
              name: 1,
              description: 1,
              seoTitle: 1,
              seoDescription: 1,
              seoKeywords: 1,
            },
          }
        )
        .toArray()

      product =
        candidates.find((item) => typeof item?.name === "string" && createSlug(item.name) === requestedSlug) || null
    }

    if (product) {
      const seoTitle = typeof product.seoTitle === "string" ? product.seoTitle.trim() : ""
      const seoDescription = typeof product.seoDescription === "string" ? product.seoDescription.trim() : ""
      const seoKeywords = typeof product.seoKeywords === "string" ? product.seoKeywords.trim() : ""
      const name = typeof product.name === "string" ? product.name.trim() : ""
      const description = typeof product.description === "string" ? product.description.trim() : ""

      return {
        title: seoTitle || (name ? `${name} - SRK BOLT` : titleFromSlug(requestedSlug)),
        description: seoDescription || description || DEFAULT_DESCRIPTION,
        keywords: seoKeywords || undefined,
      }
    }
  } catch (error) {
    console.error("Error generating product metadata:", error)
  }

  return {
    title: titleFromSlug(requestedSlug),
    description: DEFAULT_DESCRIPTION,
  }
}

export default function ProductDetailsLayout({ children }: { children: ReactNode }) {
  return children
}

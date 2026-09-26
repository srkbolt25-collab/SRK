import Layout from "@/components/Layout"
import Image from "next/image"
import { Layers, Settings } from "lucide-react"

type ProductIcon =
  | { kind: "image"; src: string; alt: string }
  | { kind: "icon"; component: typeof Settings }

const PRODUCT_CARDS: Array<{
  name: string
  description: string
  href: string
  icon: ProductIcon
}> = [
  {
    name: "Bolts",
    description: "Hex, structural, high-tensile and specialty bolts for industrial and project requirements",
    href: "/bolts",
    icon: { kind: "image", src: "/icons8-bolt-64.png", alt: "Bolts Icon" },
  },
  {
    name: "Nuts",
    description: "Hex, lock, flange and specialty nuts in multiple materials, grades and finishes",
    href: "/nuts",
    icon: { kind: "image", src: "/icons8-nut-64 (1).png", alt: "Nuts Icon" },
  },
  {
    name: "Washers",
    description: "Plain, spring, locking and sealing washers for load distribution and joint performance",
    href: "/washers",
    icon: { kind: "image", src: "/gasket.png", alt: "Washers Icon" },
  },
  {
    name: "Screws",
    description: "Machine, self-tapping and specialty screws for metal, construction and engineering use",
    href: "/screws",
    icon: { kind: "image", src: "/screw (2).png", alt: "Screws Icon" },
  },
  {
    name: "Hook & Eye",
    description: "Hook, eye and related fastening hardware for industrial, marine and rigging requirements",
    href: "/hook-eye",
    icon: { kind: "image", src: "/hookandeye.png", alt: "Hook & Eye Icon" },
  },
  {
    name: "Rivets",
    description: "Rivets, pins and inserts for permanent fastening, alignment and thread reinforcement",
    href: "/rivets",
    icon: { kind: "image", src: "/rivet.png", alt: "Rivets Icon" },
  },
  {
    name: "Heavy Load Attachments",
    description: "Heavy-load attachments and industrial hardware for demanding project requirements",
    href: "/attachments",
    icon: { kind: "icon", component: Settings },
  },
  {
    name: "Other Products",
    description: "Specialty and non-standard fasteners sourced against drawings, specifications or project requirements",
    href: "/other",
    icon: { kind: "icon", component: Layers },
  },
]

export default function ProductsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10"><h1 className="text-4xl font-bold text-gray-800 mb-4">Industrial Fasteners & Fixings</h1><p className="text-lg text-gray-600 max-w-3xl mx-auto">Browse SRK Bolt product categories for bolts, nuts, washers, screws, rivets, hook & eye products, heavy-load attachments and specialty fasteners. Contact our UAE sales team for standards, grades, finishes, availability and bulk RFQs for supply across the UAE, GCC, Iraq and Jordan.</p></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCT_CARDS.map((card) => (
              <div
                key={card.name}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-[#EDEDED]"
              >
              <div className="text-center">
                  <div className="bg-[#FCE9E9] border border-[#A02222]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_2px_10px_rgba(160,34,34,0.12)]">
                    {card.icon.kind === "image" ? (
                      <Image
                        src={card.icon.src}
                        alt={card.icon.alt}
                        width={48}
                        height={48}
                        className="w-10 h-10 object-contain"
                        style={{ filter: "brightness(0) saturate(100%)" }}
                      />
                    ) : (
                      <card.icon.component className="w-8 h-8 text-[#A02222]" />
                    )}
                </div>
                  <h3 className="text-xl font-semibold text-[#2E1F44] mb-2">{card.name}</h3>
                  <p className="text-[#2E1F44]/70 mb-4">{card.description}</p>
                  <a href={card.href} className="text-[#A02222] hover:text-[#2E1F44] font-semibold">
                  View Products →
                </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

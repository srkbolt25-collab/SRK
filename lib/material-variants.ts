import { createSlug } from "@/lib/slug"

export type MaterialCode = "MS" | "GI" | "HDG" | "SS304" | "SS316" | "ZINC_FLAKE"

export type MaterialVariant = {
  code: MaterialCode
  label: string
  shortLabel: string
  slug: string
  use: string
}

export type MaterialFamily = {
  family: string
  category: string
  intro: string
  variants: MaterialVariant[]
}

const MATERIAL_COPY: Record<MaterialCode, Omit<MaterialVariant, "code" | "slug">> = {
  MS: {
    label: "MS / Mild Steel",
    shortLabel: "MS",
    use: "Cost-effective option for fabrication, machinery, steel structure and general indoor project fastening.",
  },
  GI: {
    label: "GI / Zinc Galvanized",
    shortLabel: "GI",
    use: "Useful for construction, MEP, maintenance and projects where zinc-coated corrosion protection is required.",
  },
  HDG: {
    label: "HDG / Hot Dip Galvanized",
    shortLabel: "HDG",
    use: "Recommended for outdoor, infrastructure, exposed steel and heavy-duty project applications.",
  },
  SS304: {
    label: "SS304 Stainless Steel",
    shortLabel: "SS304",
    use: "Common stainless option for general corrosion resistance, clean environments, equipment and fabrication work.",
  },
  SS316: {
    label: "SS316 Stainless Steel",
    shortLabel: "SS316",
    use: "Preferred for marine, coastal, chemical and higher-corrosion environments.",
  },
  ZINC_FLAKE: {
    label: "Zinc Flake Coated Steel",
    shortLabel: "Zinc Flake",
    use: "Used for wedge-locking and vibration-resistant bolted joints where zinc-flake coating is specified.",
  },
}

function variant(code: MaterialCode, productName: string): MaterialVariant {
  const copy = MATERIAL_COPY[code]
  const prefix = code === "ZINC_FLAKE" ? "Nord Lock Zinc Flake" : `${copy.shortLabel} ${productName}`
  const slug = code === "ZINC_FLAKE" ? createSlug("Nord Lock Zinc Flake") : createSlug(prefix)
  return { code, slug, ...copy }
}

export const materialFamilies: MaterialFamily[] = [
  {
    family: "Hex Bolt",
    category: "BOLTS",
    intro: "Hex bolts are commonly requested in MS, GI, HDG, SS304 and SS316 depending on strength, exposure and corrosion requirement.",
    variants: ["MS", "GI", "HDG", "SS304", "SS316"].map((code) => variant(code as MaterialCode, "Hex Bolt")),
  },
  {
    family: "CSK Allen Bolt",
    category: "BOLTS",
    intro: "Countersunk Allen bolts are shown as material options so buyers can choose flush-head fasteners by application and corrosion need.",
    variants: ["MS", "GI", "SS304", "SS316"].map((code) => variant(code as MaterialCode, "CSK Allen Bolt")),
  },
  {
    family: "Socket Head Allen Bolt",
    category: "BOLTS",
    intro: "Socket head Allen bolts can be quoted in steel and stainless options for precision machinery, equipment and recessed fastening.",
    variants: ["MS", "GI", "SS304", "SS316"].map((code) => variant(code as MaterialCode, "Socket Head Allen Bolt")),
  },
  {
    family: "Flange Head Bolt",
    category: "BOLTS",
    intro: "Flange head bolts are grouped by material so customers can choose integrated-bearing fasteners for indoor, galvanized or stainless applications.",
    variants: ["MS", "GI", "HDG", "SS304", "SS316"].map((code) => variant(code as MaterialCode, "Flange Head Bolt")),
  },
  {
    family: "Threaded Bar",
    category: "BOLTS",
    intro: "Threaded bars are important SEO/RFQ products and should be shown separately for MS, GI, HDG and stainless steel grades.",
    variants: [variant("MS", "Threaded Bar"), variant("GI", "Threaded Bar"), variant("HDG", "Threaded Bar"), variant("SS304", "Threaded Bars"), variant("SS316", "Threaded Bars")],
  },
  {
    family: "Stud Bolts",
    category: "BOLTS",
    intro: "Stud bolts are usually specified by material, grade, size and end-thread requirement for industrial, flange and project supply.",
    variants: ["MS", "GI", "HDG", "SS304", "SS316"].map((code) => variant(code as MaterialCode, "Stud Bolts")),
  },
  {
    family: "U Bolt",
    category: "HOOK & EYE",
    intro: "U bolts are shown by material so pipe support and clamp enquiries can be quoted correctly for indoor, outdoor or stainless applications.",
    variants: ["MS", "GI", "HDG", "SS304", "SS316"].map((code) => variant(code as MaterialCode, "U Bolt")),
  },
  {
    family: "Button Head Bolt",
    category: "BOLTS",
    intro: "Button head bolts are grouped by material for clean visible fastening in panels, frames and equipment covers.",
    variants: ["MS", "GI", "SS304", "SS316"].map((code) => variant(code as MaterialCode, "Button Head Bolt")),
  },
  {
    family: "Mushroom Head Bolt",
    category: "BOLTS",
    intro: "Mushroom head bolts can be selected in MS, GI, HDG and stainless variants for exposed-head fixing and light structural applications.",
    variants: ["MS", "GI", "HDG", "SS304", "SS316"].map((code) => variant(code as MaterialCode, "Mushroom Head Bolt")),
  },
  {
    family: "Wing Bolt",
    category: "BOLTS",
    intro: "Wing bolts are shown by material for tool-free tightening in panels, covers and light maintenance assemblies.",
    variants: ["MS", "GI", "SS304", "SS316"].map((code) => variant(code as MaterialCode, "Wing Bolt")),
  },
  {
    family: "Screw Self Tapping",
    category: "SCREWS",
    intro: "Self tapping screws are grouped by material so buyers can request the right option for sheet metal, panels and enclosures.",
    variants: ["MS", "GI", "SS304", "SS316"].map((code) => variant(code as MaterialCode, "Screw Self Tapping")),
  },
  {
    family: "Screw Self Drilling",
    category: "SCREWS",
    intro: "Self drilling screws are shown in MS, GI and stainless options for roofing, cladding, sheet metal and light steel applications.",
    variants: ["MS", "GI", "SS304", "SS316"].map((code) => variant(code as MaterialCode, "Screw Self Drilling")),
  },
  {
    family: "Flat Washer",
    category: "WASHERS",
    intro: "Flat washers are shown by material to support matching bolt, nut and washer RFQs.",
    variants: ["MS", "GI", "HDG", "SS304", "SS316"].map((code) => variant(code as MaterialCode, "Flat Washer")),
  },
  {
    family: "Nord Lock Washer",
    category: "WASHERS",
    intro: "Nord Lock washer options are useful for vibration-sensitive bolted joints and should show stainless and zinc-flake variants clearly.",
    variants: [variant("SS304", "Nord Lock Washer"), variant("SS316", "Nord Lock Washer"), variant("ZINC_FLAKE", "Nord Lock Washer")],
  },
  {
    family: "Cup Washer",
    category: "WASHERS",
    intro: "Cup washers are material-based finishing washers for countersunk screws and visible fastening.",
    variants: ["MS", "GI", "SS304", "SS316"].map((code) => variant(code as MaterialCode, "Cup Washer")),
  },
  {
    family: "L Anchor Foundation Bolt",
    category: "ATTACHMENTS",
    intro: "Foundation anchor bolts are often requested as MS, GI or HDG based on exposure, base plate design and project specification.",
    variants: ["MS", "GI", "HDG"].map((code) => variant(code as MaterialCode, "L Anchor Foundation Bolt")),
  },
  {
    family: "Straight Anchor Foundation Bolt",
    category: "ATTACHMENTS",
    intro: "Straight foundation bolts are shown by material and finish to support drawing-based RFQs.",
    variants: ["MS", "GI", "HDG"].map((code) => variant(code as MaterialCode, "Straight Anchor Foundation Bolt")),
  },
]

export function getMaterialFamilyByProductSlug(slug: string) {
  return materialFamilies.find((family) => family.variants.some((item) => item.slug === slug))
}

export function getMaterialVariantBySlug(slug: string) {
  for (const family of materialFamilies) {
    const variant = family.variants.find((item) => item.slug === slug)
    if (variant) return { family, variant }
  }
  return null
}

export function getMaterialFamiliesByCategory(category: string) {
  return materialFamilies.filter((family) => family.category.toUpperCase() === category.toUpperCase())
}

export function materialSeoNote(code: MaterialCode) {
  return MATERIAL_COPY[code].use
}

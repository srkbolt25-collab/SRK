import { createSlug } from "@/lib/slug"
import { srkProducts, type SRKProduct } from "@/data/srk-products"

export const siteUrl = "https://www.srkbolt.com"
export const companyName = "SRK Bolts"
export const phone = "+971 58 871 3064"
export const email = "sales@srkbolt.com"

export type SeoCategory = {
  slug: string
  label: string
  navLabel: string
  categoryKey: string
  title: string
  h1: string
  description: string
  secondaryKeywords: string[]
  longTailKeywords: string[]
  applications: string[]
  standards: string[]
  rfqFields: string[]
  expertise: string[]
  materials: string[]
  buyerQuestions: Array<{ question: string; answer: string }>
}

const quoteText = "Request standards, sizes, grade, material, coating, quantity and delivery location for a fast quotation."

export const seoCategories: SeoCategory[] = [
  {
    slug: "bolts",
    label: "Bolts",
    navLabel: "Bolts",
    categoryKey: "BOLTS",
    title: "Bolt Supplier in Dubai | Hex, Anchor, Stud & High Tensile Bolts UAE",
    h1: "Bolt Supplier in Dubai for Hex, Anchor, Stud and High Tensile Bolts",
    description:
      "SRK Bolts supplies industrial bolts in Dubai and across the UAE for construction, structural steel, MEP, oil and gas, marine, machinery and maintenance requirements. The range includes hex bolts, anchor bolts, stud bolts, socket bolts, flange bolts, U bolts, foundation bolts and high tensile bolts in MS, GI, HDG, SS304 and SS316 materials.",
    secondaryKeywords: ["bolt supplier Dubai", "industrial bolts UAE", "hex bolt supplier UAE", "anchor bolt supplier Dubai", "high tensile bolts UAE", "stud bolt supplier UAE", "bolts and nuts supplier UAE"],
    longTailKeywords: ["DIN 933 hex bolt supplier in Dubai", "ASTM A325 structural bolt supplier UAE", "SS316 hex bolt supplier UAE", "foundation anchor bolt supplier Dubai", "high tensile bolt and nut set UAE"],
    applications: ["structural steel connections", "fabrication workshops", "machinery assembly", "oil and gas facilities", "marine maintenance", "infrastructure projects", "base plate fixing"],
    standards: ["DIN 933", "DIN 931", "DIN 603", "DIN 912", "DIN 7991", "ASTM A325", "ASTM A490", "ISO metric bolts"],
    rfqFields: ["bolt standard or drawing", "diameter and length", "thread type", "grade/tensile class", "MS/GI/HDG/SS304/SS316 material", "finish/coating", "quantity and delivery city"],
    expertise: ["matched bolt-nut-washer assemblies", "material selection for indoor, outdoor, marine and corrosive environments", "bulk project quotation support", "DIN/ASTM/ISO specification review"],
    materials: ["MS", "GI", "HDG", "SS304", "SS316", "B7", "8.8", "10.9", "12.9"],
    buyerQuestions: [
      { question: "Who supplies industrial bolts in Dubai?", answer: "SRK Bolts supplies industrial bolts in Dubai for construction, fabrication, machinery, oil and gas and maintenance projects. Buyers can request DIN, ISO, ASTM or drawing-based bolt requirements." },
      { question: "Can SRK Bolts supply SS304 and SS316 bolts?", answer: "Yes. SRK Bolts supports stainless steel bolt requirements including SS304 and SS316 hex bolts, socket bolts, CSK bolts, U bolts and stud bolts, subject to required sizes and quantities." },
      { question: "What details are needed for a bolt quotation?", answer: quoteText },
    ],
  },
  {
    slug: "nuts",
    label: "Nuts",
    navLabel: "Nuts",
    categoryKey: "NUTS",
    title: "Nut Supplier in Dubai | Hex Nuts, Lock Nuts, Flange Nuts & Coupling Nuts",
    h1: "Nut Supplier in Dubai for Hex, Lock, Flange and Coupling Nuts",
    description:
      "SRK Bolts supplies industrial nuts for threaded assemblies, steel structures, pipe supports, equipment installation and maintenance stock across UAE and GCC markets. The range includes hex nuts, lock nuts, flange nuts, weld nuts, wing nuts, coupling nuts and special nuts in carbon steel, stainless steel, zinc plated and galvanized finishes.",
    secondaryKeywords: ["nut supplier Dubai", "hex nut supplier UAE", "DIN 934 hex nut UAE", "lock nut supplier Dubai", "flange nut supplier UAE", "coupling nut supplier UAE"],
    longTailKeywords: ["DIN 934 hex nut supplier in Dubai", "SS304 nut supplier UAE", "SS316 hex nut supplier UAE", "zinc plated hex nuts Dubai", "bolt nut washer set supplier UAE"],
    applications: ["bolt assemblies", "threaded rod connections", "pipe supports", "mechanical installation", "fabrication workshops", "maintenance stock"],
    standards: ["DIN 934", "DIN 985", "DIN 439", "DIN 6334", "DIN 928", "DIN 929"],
    rfqFields: ["nut type", "thread size", "grade", "material", "finish", "matching bolt or rod", "quantity"],
    expertise: ["matching nuts with bolt grade and coating", "bulk packaging support", "thread compatibility guidance", "stainless and galvanized nut options"],
    materials: ["MS", "GI", "HDG", "SS304", "SS316", "Brass", "Carbon steel"],
    buyerQuestions: [
      { question: "Which nuts are available from SRK Bolts?", answer: "SRK Bolts supplies hex nuts, lock nuts, flange nuts, wing nuts, weld nuts, coupling nuts and special nuts for industrial fastening requirements in UAE and GCC markets." },
      { question: "Can nuts be supplied with matching bolts and washers?", answer: "Yes. SRK Bolts can support matched bolt, nut and washer assemblies based on thread size, grade, material, coating and application." },
      { question: "What should I mention for a nut RFQ?", answer: "Share the nut type, thread size, standard, grade, material, finish, quantity and any matching bolt or threaded rod requirement." },
    ],
  },
  {
    slug: "washers",
    label: "Washers",
    navLabel: "Washers",
    categoryKey: "WASHERS",
    title: "Washer Supplier in Dubai | Flat, Spring, Lock, DTI & Nord Lock Washers",
    h1: "Washer Supplier in Dubai for Flat, Spring, Lock, DTI and Nord Lock Washers",
    description:
      "SRK Bolts supplies washers for load distribution, vibration resistance, preload control and surface protection in UAE and GCC projects. The range includes flat washers, spring washers, lock washers, DTI washers, Nord Lock washers, cup washers and Belleville washers in MS, GI, zinc flake, SS304 and SS316 options.",
    secondaryKeywords: ["washer supplier Dubai", "flat washer supplier UAE", "spring washer UAE", "Nord Lock washer UAE", "DTI washer supplier Dubai", "SS316 washer supplier UAE"],
    longTailKeywords: ["DIN 125 flat washer supplier Dubai", "DIN 127 spring washer supplier UAE", "SS316 flat washer supplier Dubai", "Nord Lock zinc flake washer UAE", "DTI squirter washer supplier UAE"],
    applications: ["load distribution", "surface protection", "vibration resistance", "structural bolting", "machinery installation", "maintenance work"],
    standards: ["DIN 125", "DIN 127", "DIN 6798", "DIN 6796", "DTI washer standards", "Nord Lock style wedge locking washers"],
    rfqFields: ["washer type", "inner diameter", "outer diameter", "thickness", "material", "finish", "quantity"],
    expertise: ["washer selection for bolted joints", "locking and vibration-resistant options", "stainless and zinc flake variants", "matched assemblies with bolts and nuts"],
    materials: ["MS", "GI", "HDG", "SS304", "SS316", "Zinc flake"],
    buyerQuestions: [
      { question: "What washers does SRK Bolts supply?", answer: "SRK Bolts supplies flat washers, spring washers, lock washers, DTI washers, Nord Lock washers, Belleville washers and cup washers for industrial bolted assemblies." },
      { question: "Are SS316 washers available?", answer: "Yes. SRK Bolts supports SS316 washer enquiries including flat washers, Nord Lock washers and cup washers depending on size and quantity." },
      { question: "How do I choose a washer?", answer: "Select a washer based on bolt size, joint surface, load, vibration condition, material, coating and whether locking or preload indication is needed." },
    ],
  },
  {
    slug: "screws",
    label: "Screws",
    navLabel: "Screws",
    categoryKey: "SCREWS",
    title: "Screw Supplier in Dubai | Self Tapping, Self Drilling, CSK & Socket Screws",
    h1: "Screw Supplier in Dubai for Self Tapping, Self Drilling, CSK and Socket Screws",
    description:
      "SRK Bolts supplies industrial screws for metal fabrication, equipment assembly, panels, brackets, maintenance and installation work. The range includes self tapping screws, self drilling screws, CSK Allen screws, socket head cap screws, button head screws, mushroom head screws and machine screws in MS, GI, SS304 and SS316 materials.",
    secondaryKeywords: ["screw supplier Dubai", "self tapping screws UAE", "self drilling screw supplier Dubai", "socket head screw UAE", "CSK Allen screw supplier", "SS316 screw supplier UAE"],
    longTailKeywords: ["SS316 self tapping screw supplier UAE", "SS304 socket head Allen bolt Dubai", "DIN 912 socket screw supplier UAE", "DIN 7991 CSK Allen bolt supplier Dubai", "self drilling screw supplier UAE"],
    applications: ["sheet metal fixing", "equipment assembly", "electrical panels", "machine building", "fabrication", "maintenance and repair"],
    standards: ["DIN 912", "DIN 7984", "DIN 7985", "DIN 7991", "DIN 965", "DIN 7981", "DIN 7504"],
    rfqFields: ["screw type", "head/drive type", "thread size", "length", "material", "finish", "quantity"],
    expertise: ["socket and countersunk screw selection", "self drilling and self tapping options", "stainless steel screw supply", "bulk project packaging"],
    materials: ["MS", "GI", "SS304", "SS316", "Zinc plated"],
    buyerQuestions: [
      { question: "Who supplies self tapping and self drilling screws in UAE?", answer: "SRK Bolts supplies self tapping screws, self drilling screws, socket head screws and CSK screws for UAE and GCC project requirements." },
      { question: "Can screws be supplied in stainless steel?", answer: "Yes. SRK Bolts supports SS304 and SS316 screw requirements, including self tapping, self drilling, socket head and CSK screw enquiries." },
      { question: "What screw details are needed for quotation?", answer: "Share the head type, drive type, thread size, length, material, coating, quantity and application surface." },
    ],
  },
  {
    slug: "hook-eye",
    label: "Hook & Eye Products",
    navLabel: "Hook & Eye",
    categoryKey: "HOOK & EYE",
    title: "Hook and Eye Bolt Supplier in Dubai | Eye Bolts, U Bolts & Rigging Fasteners",
    h1: "Hook and Eye Bolt Supplier in Dubai for Lifting, Rigging and Pipe Support",
    description:
      "SRK Bolts supplies hook bolts, eye bolts, eye nuts, U bolts and related support fasteners for marine, fabrication, pipe support, industrial maintenance and construction requirements. Options can be requested in MS, GI, HDG, SS304 and SS316 depending on exposure, load and project specification.",
    secondaryKeywords: ["eye bolt supplier Dubai", "hook bolt supplier UAE", "U bolt supplier Dubai", "rigging fasteners UAE", "pipe support U bolts", "SS316 U bolt supplier UAE"],
    longTailKeywords: ["DIN 580 eye bolt supplier UAE", "DIN 582 eye nut supplier Dubai", "SS316 U bolt supplier UAE", "galvanized U bolt supplier Dubai", "hook and eye fasteners UAE"],
    applications: ["lifting points", "pipe support", "marine fixing", "light rigging", "architectural fixing", "equipment support"],
    standards: ["DIN 580", "DIN 582", "DIN 3570", "custom U bolt drawings", "metric and imperial options"],
    rfqFields: ["hook/eye/U bolt type", "load/application", "thread size", "inside width", "leg length", "material", "coating", "quantity"],
    expertise: ["U bolt dimensional checks", "marine and outdoor material selection", "support hardware matching", "custom drawing-based enquiries"],
    materials: ["MS", "GI", "HDG", "SS304", "SS316"],
    buyerQuestions: [
      { question: "Does SRK Bolts supply U bolts?", answer: "Yes. SRK Bolts supplies U bolts for pipe support, brackets, marine and industrial fixing, with material options such as MS, GI, HDG, SS304 and SS316." },
      { question: "Are hook and eye products available for marine use?", answer: "Marine or coastal enquiries can be reviewed with stainless steel or galvanized options depending on load, exposure and project specification." },
      { question: "What dimensions are needed for a U bolt quote?", answer: "Share thread size, inside width, leg length, bend radius if available, material, coating and quantity." },
    ],
  },
  {
    slug: "rivets-pin-inserts",
    label: "Rivets, Pins & Inserts",
    navLabel: "Rivets & Inserts",
    categoryKey: "RIVETS",
    title: "Rivet, Pin and Insert Supplier in Dubai | Blind Rivets, Pins & Threaded Inserts",
    h1: "Rivets, Pins and Inserts Supplier in Dubai for Fabrication and Assembly",
    description:
      "SRK Bolts supplies rivets, blind rivets, threaded inserts, dowel pins, split pins, clevis pins and related small fasteners for sheet metal, machinery, panel assembly, fabrication and maintenance buyers in UAE and GCC markets.",
    secondaryKeywords: ["rivet supplier Dubai", "blind rivet supplier UAE", "threaded inserts UAE", "dowel pin supplier Dubai", "split pin supplier UAE", "industrial rivets Dubai"],
    longTailKeywords: ["blind rivet supplier in Dubai", "threaded insert supplier UAE", "stainless steel rivets UAE", "dowel pin supplier Dubai", "clevis pin supplier UAE"],
    applications: ["sheet metal fastening", "panel assembly", "machinery alignment", "fabrication", "maintenance kits", "repair work"],
    standards: ["DIN rivets", "ISO pins", "metric inserts", "custom pin sizes", "stainless and plated options"],
    rfqFields: ["item type", "diameter", "length", "material", "finish", "grip range", "quantity"],
    expertise: ["small fastener sourcing", "sheet metal and panel application support", "pin and insert selection", "bulk maintenance kits"],
    materials: ["Aluminium", "MS", "GI", "SS304", "SS316", "Brass"],
    buyerQuestions: [
      { question: "What rivets and inserts does SRK Bolts supply?", answer: "SRK Bolts supplies blind rivets, threaded inserts, pins and small industrial fasteners for fabrication, panel assembly and maintenance applications." },
      { question: "Can rivets be supplied in stainless steel?", answer: "Yes. Stainless steel rivet and insert enquiries can be reviewed depending on size, grip range, application and quantity." },
      { question: "What details are required for rivets?", answer: "Mention rivet type, diameter, grip range, material, finish, application and quantity." },
    ],
  },
  {
    slug: "heavy-load-attachments",
    label: "Heavy Load Attachments",
    navLabel: "Heavy Load",
    categoryKey: "ATTACHMENTS",
    title: "Heavy Load Fastener Supplier in Dubai | Anchor Bolts, Foundation Bolts & Attachments",
    h1: "Heavy Load Attachment Supplier in Dubai for Structural and Industrial Projects",
    description:
      "SRK Bolts supports heavy-duty fastening requirements including L anchor foundation bolts, straight anchor bolts, structural attachments, clamps, load-rated hardware, shear studs and project-based fastener assemblies for industrial, steel structure, infrastructure and equipment installation work.",
    secondaryKeywords: ["heavy duty fasteners UAE", "anchor bolt supplier Dubai", "foundation bolt supplier UAE", "L anchor bolt UAE", "straight anchor foundation bolt", "shear studs and ferrules UAE"],
    longTailKeywords: ["L anchor foundation bolt supplier Dubai", "straight anchor foundation bolt supplier UAE", "heavy load attachment supplier Dubai", "shear studs and ferrules supplier UAE", "structural anchor bolt supplier Dubai"],
    applications: ["base plate fixing", "machinery foundations", "structural installation", "industrial supports", "fabrication", "infrastructure projects"],
    standards: ["project drawings", "DIN/ISO options", "ASTM options", "custom fabrication", "galvanized finishes"],
    rfqFields: ["drawing or photo", "load/application", "diameter and length", "material", "finish", "quantity", "delivery schedule"],
    expertise: ["drawing-based fastener review", "foundation fixing support", "custom lengths and bends", "project quotation for heavy hardware"],
    materials: ["MS", "GI", "HDG", "Carbon steel", "Stainless steel"],
    buyerQuestions: [
      { question: "Does SRK Bolts supply anchor foundation bolts?", answer: "Yes. SRK Bolts supports L anchor foundation bolts, straight anchor bolts and drawing-based anchor bolt enquiries for industrial and structural applications." },
      { question: "Can heavy load attachments be made to drawing?", answer: "Drawing-based enquiries can be reviewed with required dimensions, material, finish, quantity and application details." },
      { question: "What should be included for a foundation bolt RFQ?", answer: "Share drawing, diameter, total length, thread length, bend shape, material, coating, quantity and delivery location." },
    ],
  },
  {
    slug: "other-products",
    label: "Other Fasteners",
    navLabel: "Other Products",
    categoryKey: "OTHER",
    title: "Industrial Fastener Supplier in Dubai | Special Fasteners, Threaded Bars & Hardware",
    h1: "Industrial Fastener Supplier in Dubai for Special and Project Hardware",
    description:
      "SRK Bolts helps source special fasteners, threaded bars, clamps, cup washers, custom hardware and project-based components for UAE and GCC procurement requirements. Buyers can share samples, drawings, standards, photos or BOQ references for quotation support.",
    secondaryKeywords: ["industrial fasteners UAE", "special fasteners Dubai", "threaded bar supplier UAE", "custom fasteners UAE", "fastener supplier GCC", "project hardware supplier Dubai"],
    longTailKeywords: ["MS threaded bar supplier UAE", "GI threaded bar supplier Dubai", "HDG threaded bar supplier UAE", "special fasteners supplier in Dubai", "custom fastener sourcing UAE"],
    applications: ["project procurement", "maintenance stock", "custom hardware", "factory supply", "construction support", "BOQ-based sourcing"],
    standards: ["DIN", "ISO", "ASTM", "BS", "JIS", "drawing-based supply"],
    rfqFields: ["photo/drawing", "application", "material", "grade", "finish", "quantity", "required delivery date"],
    expertise: ["special fastener sourcing", "threaded bar options", "material and finish comparison", "BOQ and drawing review"],
    materials: ["MS", "GI", "HDG", "SS304", "SS316", "Brass", "Copper", "Alloy steel"],
    buyerQuestions: [
      { question: "Can SRK Bolts help with special fasteners?", answer: "Yes. SRK Bolts can review special fastener requirements based on drawings, samples, standards, application photos or BOQ references." },
      { question: "Does SRK Bolts supply threaded bars?", answer: "Yes. SRK Bolts supports MS, GI, HDG, SS304 and SS316 threaded bar requirements depending on size and quantity." },
      { question: "How do I request a custom fastener quote?", answer: "Send the drawing or sample photo, dimensions, material, finish, grade, quantity and required delivery location." },
    ],
  },
]

export type CountryPage = {
  slug: string
  name: string
  market: string
  cities: string[]
  focus: string[]
  secondaryKeywords: string[]
  industries: string[]
  title: string
  description: string
}

export const countries: CountryPage[] = [
  { slug: "uae", name: "UAE", market: "Dubai, Abu Dhabi, Sharjah and other Emirates", cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"], focus: ["fasteners supplier in UAE", "fasteners supplier Dubai", "bolts and nuts supplier UAE"], secondaryKeywords: ["industrial fasteners UAE", "bolt supplier Dubai", "anchor bolt supplier UAE", "stainless steel fasteners UAE", "high tensile bolts UAE"], industries: ["construction", "oil and gas", "marine", "MEP", "steel fabrication", "industrial maintenance"], title: "Fasteners Supplier in UAE | Bolts, Nuts, Washers & Industrial Fasteners", description: "SRK Bolts is a UAE-based fastener supplier for Dubai, Abu Dhabi, Sharjah and other Emirates, supporting bolts, nuts, washers, screws, threaded rods, anchor bolts, stud bolts, stainless steel fasteners and project hardware requirements." },
  { slug: "qatar", name: "Qatar", market: "Doha, Lusail, Al Wakrah and Qatar project markets", cities: ["Doha", "Al Rayyan", "Lusail", "Al Wakrah"], focus: ["fasteners supplier in Qatar", "fasteners supplier Doha", "bolt supplier Qatar"], secondaryKeywords: ["industrial fasteners Qatar", "anchor bolt supplier Qatar", "stud bolt supplier Doha", "stainless steel fasteners Qatar", "bolts and nuts Qatar"], industries: ["construction", "MEP", "oil and gas", "infrastructure", "facility maintenance"], title: "Fasteners Supplier in Qatar | Bolts, Nuts, Anchor Bolts & Industrial Fasteners", description: "SRK Bolts supports Qatar and Doha buyers with UAE-based quotation support for bolts, nuts, washers, screws, anchor bolts, stud bolts, threaded rods, stainless steel fasteners and project fastener supply." },
  { slug: "saudi-arabia", name: "Saudi Arabia", market: "Riyadh, Jeddah, Dammam, Khobar and Saudi project markets", cities: ["Riyadh", "Jeddah", "Dammam", "Khobar"], focus: ["fasteners supplier in Saudi Arabia", "fasteners supplier KSA", "bolt supplier Riyadh"], secondaryKeywords: ["industrial fasteners Saudi Arabia", "anchor bolts KSA", "structural bolts Saudi Arabia", "stud bolts Dammam", "high tensile bolts Saudi Arabia"], industries: ["oil and gas", "infrastructure", "construction", "steel structure", "industrial maintenance"], title: "Fasteners Supplier in Saudi Arabia | Industrial Bolts, Nuts & Anchor Bolts", description: "SRK Bolts supports Saudi Arabia project enquiries for high tensile bolts, anchor bolts, nuts, washers, threaded rods, stud bolts, structural fasteners and stainless steel fastening items from the UAE." },
  { slug: "kuwait", name: "Kuwait", market: "Kuwait City, Shuwaikh, Ahmadi and Kuwait industrial zones", cities: ["Kuwait City", "Shuwaikh", "Ahmadi", "Hawalli"], focus: ["fasteners supplier in Kuwait", "bolt supplier Kuwait", "industrial fasteners Kuwait"], secondaryKeywords: ["stud bolt supplier Kuwait", "threaded rod supplier Kuwait", "anchor bolt supplier Kuwait", "stainless steel fasteners Kuwait", "bolts and nuts Kuwait"], industries: ["construction", "oil and gas", "MEP", "industrial maintenance", "fabrication"], title: "Fasteners Supplier in Kuwait | Bolts, Nuts, Washers, Screws & Stud Bolts", description: "SRK Bolts supports Kuwait fastener enquiries for DIN, ISO and ASTM bolts, nuts, washers, screws, threaded rods, anchor bolts, stud bolts and stainless steel project hardware." },
  { slug: "bahrain", name: "Bahrain", market: "Manama, Sitra, Hidd and Bahrain industrial areas", cities: ["Manama", "Sitra", "Hidd", "Riffa"], focus: ["fasteners supplier in Bahrain", "bolt supplier Bahrain", "industrial fasteners Bahrain"], secondaryKeywords: ["anchor bolt supplier Bahrain", "high tensile bolts Bahrain", "stainless steel fasteners Bahrain", "bolts and nuts Bahrain", "washer supplier Bahrain"], industries: ["construction", "marine", "industrial maintenance", "fabrication", "infrastructure"], title: "Fasteners Supplier in Bahrain | Industrial Bolts, Nuts & Stainless Steel Fasteners", description: "SRK Bolts supplies Bahrain buyers with industrial fasteners including bolts, nuts, washers, screws, anchor bolts, high tensile fasteners, threaded bars and stainless steel fastening products." },
  { slug: "oman", name: "Oman", market: "Muscat, Sohar, Salalah and Oman project areas", cities: ["Muscat", "Sohar", "Salalah", "Nizwa"], focus: ["fasteners supplier in Oman", "bolt supplier Muscat", "industrial fasteners Oman"], secondaryKeywords: ["stainless steel fasteners Oman", "anchor bolt supplier Oman", "threaded rod supplier Oman", "bolts and nuts Oman", "construction fasteners Oman"], industries: ["construction", "marine", "oil and gas", "industrial maintenance", "fabrication"], title: "Fasteners Supplier in Oman | Bolts, Nuts, Stainless Steel Fasteners & Anchors", description: "SRK Bolts supports Oman buyers with fastener supply for construction, oil and gas, marine, fabrication and maintenance projects across Muscat, Sohar, Salalah and other locations." },
  { slug: "iraq", name: "Iraq", market: "Baghdad, Basra, Erbil and Iraq project markets", cities: ["Baghdad", "Basra", "Erbil", "Najaf"], focus: ["fasteners supplier in Iraq", "bolt supplier Basra", "industrial fasteners Iraq"], secondaryKeywords: ["oil and gas fasteners Iraq", "anchor bolt supplier Iraq", "bolts and nuts supplier Iraq", "stud bolt supplier Iraq", "threaded rods Iraq"], industries: ["oil and gas", "construction", "infrastructure", "industrial maintenance", "fabrication"], title: "Fasteners Supplier in Iraq | Oil & Gas Bolts, Nuts, Anchors & Project Fasteners", description: "SRK Bolts supports Iraq project sourcing with industrial bolts, nuts, washers, screws, threaded rods, anchor bolts, stud bolts and oil and gas fastening items from the UAE." },
  { slug: "jordan", name: "Jordan", market: "Amman, Aqaba, Zarqa and Jordan industrial areas", cities: ["Amman", "Aqaba", "Zarqa", "Irbid"], focus: ["fasteners supplier in Jordan", "bolt supplier Amman", "industrial fasteners Jordan"], secondaryKeywords: ["high tensile bolts Jordan", "anchor bolt supplier Jordan", "stainless steel fasteners Jordan", "bolts and nuts Jordan", "washer supplier Jordan"], industries: ["construction", "industrial maintenance", "fabrication", "infrastructure", "MEP"], title: "Fasteners Supplier in Jordan | Bolts, Nuts, Anchors & Industrial Hardware", description: "SRK Bolts supplies Jordan buyers with industrial fasteners including bolts, nuts, washers, screws, anchors, threaded rods, high tensile bolts and stainless steel fastening items." },
]

export const priorityBuyerQueries = [
  "fasteners supplier in UAE",
  "fasteners supplier in Dubai",
  "bolts and nuts supplier UAE",
  "industrial fasteners UAE",
  "anchor bolt supplier UAE",
  "stud bolt supplier UAE",
  "threaded rod supplier UAE",
  "high tensile bolt supplier UAE",
  "stainless steel fasteners UAE",
  "GCC fasteners supplier",
]

export const competitorPositioningInsights = [
  "Target supplier-intent phrases such as leading fasteners supplier in Dubai, industrial bolts UAE and fasteners supplier UAE.",
  "Use category depth across bolts, nuts, washers, screws, rivets, anchors, threaded rods, inserts and heavy-load attachments.",
  "Show standards, grades, coatings, materials and applications clearly so procurement buyers can compare faster.",
  "Build answer-first blocks for buyer questions and AI search visibility instead of only product grids.",
]

export const featuredProductSlugs = srkProducts.slice(0, 40).map((product) => ({
  ...product,
  slug: createSlug(product.name),
}))

export function getCategoryBySlug(slug: string) {
  return seoCategories.find((category) => category.slug === slug)
}

export function getCountryBySlug(slug: string) {
  return countries.find((country) => country.slug === slug)
}

export function getProductBySlug(slug: string) {
  return srkProducts.find((product) => createSlug(product.name) === slug)
}

export function cleanTitle(title: string) {
  return title.replace(/\s+-\s+SRK Bolts$/i, "").replace(/\s+\|\s+SRK Bolts$/i, "").trim()
}

export function withBrand(title: string) {
  const clean = cleanTitle(title)
  return `${clean} - SRK Bolts`
}

export function countryCategoryTitle(country: CountryPage, category: SeoCategory) {
  const primary = `${category.label} Supplier in ${country.name}`
  const secondary = category.secondaryKeywords[0] || country.focus[0]
  return withBrand(`${primary} | ${secondary}`)
}

export function countryCategoryDescription(country: CountryPage, category: SeoCategory) {
  return `SRK Bolts supplies ${category.label.toLowerCase()} to ${country.name} for ${country.cities.slice(0, 3).join(", ")} projects, including ${category.secondaryKeywords.slice(0, 4).join(", ")}. Request ${category.standards.slice(0, 3).join(", ")} standards, material, grade, coating, quantity and delivery scope.`
}

export function productSeoTitle(product: SRKProduct) {
  const slug = createSlug(product.name)
  const materialPhrase = /ss316/i.test(product.name) ? "SS316 Stainless Steel Fasteners UAE" : /ss304/i.test(product.name) ? "SS304 Stainless Steel Fasteners UAE" : /\bgi\b/i.test(product.name) ? "Galvanized Fasteners UAE" : /\bhdg\b/i.test(product.name) ? "Hot Dip Galvanized Fasteners UAE" : /\bms\b/i.test(product.name) ? "Mild Steel Fasteners UAE" : product.standard || product.category
  return withBrand(`${product.name} Supplier in Dubai | ${materialPhrase}`)
}

export function productSeoDescription(product: SRKProduct) {
  const material = product.material || product.specifications?.material || "industrial fastener material options"
  const standard = product.standard || product.specifications?.standard || "DIN, ISO or ASTM standard"
  return `Request ${product.name} from SRK Bolts in Dubai, UAE. Available with ${standard}, ${material}, grade, coating, size and bulk quotation support for construction, fabrication, oil and gas, marine and industrial projects.`
}

export const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: companyName,
  url: siteUrl,
  logo: `${siteUrl}/logoSRK.jpeg`,
  email,
  telephone: phone,
  areaServed: countries.map((country) => country.name),
  knowsAbout: ["industrial fasteners", "bolts", "nuts", "washers", "screws", "anchor bolts", "threaded rods", "stud bolts", "DIN fasteners", "ASTM fasteners", "stainless steel fasteners"],
  sameAs: ["https://www.srkbolt.com"],
}

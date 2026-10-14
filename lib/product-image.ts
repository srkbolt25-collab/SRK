export type ProductImageInput = {
  name?: string | null
  category?: string | null
  material?: string | null
  image?: string | null
}

const LOCAL_IMAGE_PREFIX = "/srk-product-images/"

const isUsableImage = (value?: string | null) => {
  const clean = typeof value === "string" ? value.trim() : ""
  if (!clean) return false
  const lower = clean.toLowerCase()
  if (lower.includes("placeholder") || lower === "undefined" || lower === "null") return false
  // Allow actual product photo URLs from the original SRK Bolt catalogue data.
  if (lower.startsWith(LOCAL_IMAGE_PREFIX) && lower.endsWith(".svg")) return false
  return true
}

const materialSuffix = (haystack: string) => {
  if (haystack.includes("316")) return "ss316"
  if (haystack.includes("304")) return "ss304"
  if (haystack.includes("hdg") || haystack.includes("hot dip")) return "hdg"
  if (/\bgi\b/.test(haystack) || haystack.includes("galvanized iron")) return "gi"
  if (/\bms\b/.test(haystack) || haystack.includes("mild steel")) return "ms"
  return "ms"
}

const stainlessSuffix = (suffix: string) => (suffix === "ss316" || suffix === "ss304" ? suffix : "ss304")
const steelSuffix = (suffix: string) => (["ms", "gi", "hdg", "ss304", "ss316"].includes(suffix) ? suffix : "ms")

export const getProductFallbackImage = (input: ProductImageInput = {}) => {
  const name = (input.name || "").toLowerCase()
  const category = (input.category || "").toUpperCase()
  const material = (input.material || "").toLowerCase()
  const haystack = `${name} ${material}`
  const suffix = materialSuffix(haystack)
  const base = LOCAL_IMAGE_PREFIX

  if (haystack.includes("csk") || haystack.includes("countersunk")) return `${base}csk-allen-bolt-${stainlessSuffix(suffix)}.png`
  if (haystack.includes("socket head") || haystack.includes("allen bolt") || haystack.includes("socket screw")) return `${base}socket-head-allen-bolt-${stainlessSuffix(suffix)}.png`
  if (haystack.includes("flange head") || haystack.includes("flange bolt")) return `${base}flange-head-bolt-${stainlessSuffix(suffix)}.png`
  if (haystack.includes("threaded")) return `${base}threaded-bar-${steelSuffix(suffix)}.png`
  if (haystack.includes("shear") || haystack.includes("ferrule")) return `${base}shear-studs-and-ferrules.png`
  if (haystack.includes("stud")) return `${base}stud-bolt-${suffix === "ss316" || suffix === "ss304" ? suffix : "ms"}.png`
  if (haystack.includes("dti") || haystack.includes("squirter")) return `${base}dti-washers-squirter.png`
  if (haystack.includes("nord")) return `${base}nord-lock-washer.png`
  if (haystack.includes("cup washer")) return `${base}cup-washer-${["ss316", "ss304", "gi", "ms"].includes(suffix) ? suffix : "ss304"}.png`
  if (haystack.includes("washer") || category === "WASHERS") return `${base}flat-washer-${steelSuffix(suffix)}.png`
  if (haystack.includes("wing")) return `${base}wing-bolt-${stainlessSuffix(suffix)}.png`
  if (haystack.includes("self tapping") || haystack.includes("self-tapping")) return `${base}self-tapping-screw-${["ss316", "ss304", "gi", "ms"].includes(suffix) ? suffix : "ss304"}.png`
  if (haystack.includes("self drilling") || haystack.includes("self-drilling")) return `${base}self-drilling-screw-${["ss316", "ss304", "gi", "ms"].includes(suffix) ? suffix : "ss304"}.png`
  if (haystack.includes("button")) return `${base}button-head-bolt-${stainlessSuffix(suffix)}.png`
  if (haystack.includes("mushroom")) return `${base}mushroom-head-bolt-${stainlessSuffix(suffix)}.png`
  if (haystack.includes("u bolt") || haystack.includes("u-bolt")) return `${base}u-bolt-${steelSuffix(suffix)}.png`
  if (haystack.includes("l anchor")) return `${base}l-anchor-foundation-bolt.png`
  if (haystack.includes("straight anchor")) return `${base}straight-anchor-foundation-bolt.png`
  if (haystack.includes("anchor") || haystack.includes("foundation") || category === "ATTACHMENTS" || category === "HEAVY LOAD ATTACHMENTS") return `${base}anchor-bolt.png`
  if (haystack.includes("hook") || haystack.includes("eye") || category === "HOOK & EYE") return `${base}hook-eye-fastener.png`
  if (haystack.includes("rivet") || haystack.includes("insert") || haystack.includes("pin") || category === "RIVETS") return `${base}rivet-pin-insert.png`
  if (category === "NUTS" || haystack.includes("nut")) return `${base}nut.png`
  if (haystack.includes("screw") || category === "SCREWS") return `${base}self-tapping-screw-${["ss316", "ss304", "gi", "ms"].includes(suffix) ? suffix : "ss304"}.png`

  return `${base}hex-bolt-${steelSuffix(suffix)}.png`
}

export const getSafeProductImage = (input: ProductImageInput = {}) => {
  const clean = typeof input.image === "string" ? input.image.trim() : ""
  if (isUsableImage(clean) && clean.startsWith(LOCAL_IMAGE_PREFIX) && clean.endsWith(".svg")) {
    return getProductFallbackImage(input)
  }
  return isUsableImage(clean) ? clean : getProductFallbackImage(input)
}

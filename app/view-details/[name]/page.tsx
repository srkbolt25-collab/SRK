"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Layout from "@/components/Layout"
import { 
  ChevronLeft, 
  ChevronRight,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Award,
  Zap,
  Check,
  MessageCircle,
  FileText,
  CheckCircle,
  Send,
  X
} from "lucide-react"
import { findProductByName, findProductById, getCategoryRoute, type HusainiProduct } from "@/data/husaini-products"
import { useRFQ } from "@/contexts/RFQContext"
import { slugToSearchPattern } from "@/lib/slug"

export default function ProductDetailsPage() {
  const params = useParams()
  const productSlug = params?.name as string
  // Convert slug back to searchable pattern
  const productNameSearch = productSlug ? slugToSearchPattern(decodeURIComponent(productSlug)) : null
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [product, setProduct] = useState<HusainiProduct | null>(null)
  const [rawProductData, setRawProductData] = useState<any>(null) // Store raw product data to access technicalInformation
  const [loadingProduct, setLoadingProduct] = useState(true)
  const [productError, setProductError] = useState<string | null>(null)
  const [isRFQPopupOpen, setIsRFQPopupOpen] = useState(false)
  const [isDataSheetPopupOpen, setIsDataSheetPopupOpen] = useState(false)
  const [dataSheetForm, setDataSheetForm] = useState({
    name: "",
    mobile: "",
    email: "",
    companyName: ""
  })
  const [isDataSheetSuccessOpen, setIsDataSheetSuccessOpen] = useState(false)
  const { addToRFQ } = useRFQ()

  const mapDbProductToHusaini = (dbProduct: any, fallbackCategory?: string): HusainiProduct => {
    const gallery = Array.isArray(dbProduct.images) && dbProduct.images.length > 0
      ? Array.from(
          new Set(
            dbProduct.images
              .filter((url: string) => typeof url === "string" && url.trim() !== "")
              .map((url: string) => url.trim())
          )
        ).slice(0, 3)
      : []

    const primaryImage = gallery[0] || dbProduct.imageLink?.trim() || "/placeholder.jpg"

    const sanitizedGallery = gallery.length > 0 ? gallery : [primaryImage]

    const features = Array.isArray(dbProduct.features) && dbProduct.features.length > 0
      ? dbProduct.features
      : ["High performance", "Reliable construction"]

    const uses = Array.isArray(dbProduct.uses) && dbProduct.uses.length > 0
      ? dbProduct.uses
      : ["Industrial applications"]

    return {
      id: dbProduct._id?.toString() || dbProduct.name,
      name: dbProduct.name,
      category: dbProduct.category || fallbackCategory || "BOLTS",
      image: primaryImage,
      images: sanitizedGallery,
      standard: dbProduct.standard || dbProduct.specifications?.standard,
      equivalentStandard: dbProduct.equivalentStandard || dbProduct.specifications?.equivalentStandard,
      material: dbProduct.material || dbProduct.specifications?.material,
      grades: dbProduct.grades?.length ? dbProduct.grades : dbProduct.specifications?.grades,
      sizes: dbProduct.sizes || dbProduct.specifications?.sizes,
      coating: dbProduct.coating?.length ? dbProduct.coating : dbProduct.specifications?.coating,
      description: dbProduct.description || "Premium industrial product from SRK Bolt.",
      features,
      uses,
      specifications: {
        standard: dbProduct.specifications?.standard || dbProduct.standard,
        equivalentStandard: dbProduct.specifications?.equivalentStandard || dbProduct.equivalentStandard,
        material: dbProduct.specifications?.material || dbProduct.material,
        grades: dbProduct.specifications?.grades || dbProduct.grades,
        sizes: dbProduct.specifications?.sizes || dbProduct.sizes,
        coating: dbProduct.specifications?.coating || dbProduct.coating,
        tensileStrength: dbProduct.specifications?.tensileStrength || dbProduct.tensileStrength,
        threadType: dbProduct.specifications?.threadType || dbProduct.threadType,
        finish: dbProduct.specifications?.finish || dbProduct.finish,
      },
    }
  }

  useEffect(() => {
    if (!productNameSearch) {
      setProduct(null)
      setProductError('Product name is required.')
      setLoadingProduct(false)
      return
    }

    let cancelled = false

    const loadProduct = async () => {
      setLoadingProduct(true)
      setProductError(null)

      try {
        // Try to fetch by name from database - search using the pattern
        const response = await fetch(`/api/products?search=${encodeURIComponent(productNameSearch)}`)
        if (response.ok) {
          const data = await response.json()
          if (!cancelled && Array.isArray(data) && data.length > 0) {
            // Find the best match by comparing slugs
            // Create slug from each product name and compare with the URL slug
            const urlSlug = productSlug.toLowerCase().replace(/[^a-z0-9]/g, '')
            let matchedProduct = data.find((p: any) => {
              const pSlug = p.name.toLowerCase().replace(/[^a-z0-9]/g, '')
              return pSlug === urlSlug
            }) || data[0]
            
            setRawProductData(matchedProduct) // Store raw data for technicalInformation
            setProduct(mapDbProductToHusaini(matchedProduct))
            setProductError(null)
            setLoadingProduct(false)
            return
          }
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Error fetching product from database:', error)
          setProductError('Unable to load product from inventory. Showing default catalogue data instead.')
        }
      }

      if (cancelled) return

      // Fallback to catalogue data - try to find by matching the search pattern
      let fallback: HusainiProduct | undefined = findProductByName(productNameSearch)

      if (!fallback) {
        fallback = findProductByName("DIN 933 / 931 Hexagon Bolt", "BOLTS") || undefined
      }

      if (!cancelled) {
        if (!fallback) {
          setProduct(null)
          setProductError((prev) => prev ?? 'Product not found in inventory or catalogue.')
        } else {
          setProduct(fallback)
          setProductError((prev) => prev ?? 'Showing catalogue product details.')
        }
        setLoadingProduct(false)
      }
    }

    loadProduct()

    return () => {
      cancelled = true
    }
  }, [productNameSearch])

  if (loadingProduct) {
    return (
      <Layout>
        <div className="pt-12 pb-20 bg-[#F7F7FA]">
          <div className="container mx-auto px-4 text-center">
            <p className="text-[#2E1F44]/70 font-medium tracking-wide">Loading product details...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!product) {
    return (
      <Layout>
        <div className="pt-12 pb-20 bg-[#F7F7FA]">
          <div className="container mx-auto px-4 text-center space-y-3">
            <p className="text-[#2E1F44] font-semibold text-lg">Product not found.</p>
            {productError && <p className="text-sm text-[#2E1F44]/70">{productError}</p>}
          </div>
        </div>
      </Layout>
    )
  }

  // Function to generate WhatsApp URL with product information
  const handleWhatsAppClick = () => {
    const phoneNumber = "971588713064"
    const message = `Hello! I'm interested in this product:\n\nProduct Name: ${product.name}\nCategory: ${product.category}\nStandard: ${product.standard || 'N/A'}\n\nPlease provide more information, pricing, and availability.`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const productImages = product.images && product.images.length > 0
    ? product.images
    : [product.image, product.image, product.image] // Use same image for all thumbnails

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  const handleAddToRFQ = () => {
    addToRFQ(product.name, product.image)
    setIsRFQPopupOpen(true)
  }

  const handleDownloadDataSheet = () => {
    setIsDataSheetPopupOpen(true)
  }

  const generateDataSheet = async () => {
    if (!product) return

    // Validation
    if (!dataSheetForm.name.trim() || !dataSheetForm.mobile.trim() || !dataSheetForm.email.trim() || !dataSheetForm.companyName.trim()) {
      alert("Please fill in all fields (Name, Mobile, Email, Company Name)")
      return
    }

    // Store the download information in database
    try {
      await fetch('/api/datasheet-downloads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: dataSheetForm.name,
          mobile: dataSheetForm.mobile,
          email: dataSheetForm.email,
          companyName: dataSheetForm.companyName,
          productName: product.name,
          productCategory: product.category,
          productStandard: product.standard || product.specifications?.standard || '',
          productMaterial: product.material || product.specifications?.material || '',
        }),
      })
    } catch (error) {
      console.error('Error recording data sheet download:', error)
      // Continue with download even if recording fails
    }

    // Close popup, reset form, and show success message
    setIsDataSheetPopupOpen(false)
    setDataSheetForm({ name: "", mobile: "", email: "", companyName: "" })
    setIsDataSheetSuccessOpen(true)
  }

  return (
    <Layout>
      <div className="pt-12 pb-20 bg-[#F7F7FA]">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-10 flex items-center gap-2 text-sm text-[#2E1F44]/70">
            <a href="/" className="font-medium hover:text-[#A02222] transition-colors">Home</a>
            <span>/</span>
            <a href="/products" className="font-medium hover:text-[#A02222] transition-colors">Products</a>
            <span>/</span>
            <a href={getCategoryRoute(product.category)} className="font-medium hover:text-[#A02222] transition-colors">{product.category}</a>
            <span>/</span>
            <span className="text-[#2E1F44] font-semibold">{product.name}</span>
          </div>

          {productError && (
            <div className="mb-8 rounded-xl border border-[#FAD2CF] bg-[#FFF1EF] px-4 py-3 text-sm text-[#8C2F2F] shadow-sm">
              {productError}
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Product Images */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl shadow-[0_12px_30px_rgba(39,31,68,0.08)] overflow-hidden border border-[#E4E1F0] w-full max-w-lg mx-auto">
                <div className="aspect-square flex items-center justify-center bg-linear-to-br from-white via-[#F5F5FB] to-[#ECE8F8]">
                  <img 
                    src={productImages[selectedImage]} 
                    alt={product.name}
                    className="w-[90%] h-[90%] object-contain drop-shadow-xl"
                  />
                </div>

                {/* Navigation Buttons */}
                {productImages.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2.5 transition-all border border-[#E4E1F0]"
                    >
                      <ChevronLeft className="w-6 h-6 text-[#2E1F44]" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2.5 transition-all border border-[#E4E1F0]"
                    >
                      <ChevronRight className="w-6 h-6 text-[#2E1F44]" />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="bg-[#A02222] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-md">
                    {product.standard || product.category}
                  </span>
                  <span className="bg-[#2E1F44] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-md">
                    In Stock
                    </span>
                </div>
              </div>

              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {productImages.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square rounded-lg border-2 overflow-hidden transition-all ${
                        selectedImage === idx 
                          ? "border-[#A02222] shadow-[0_6px_18px_rgba(160,34,34,0.25)]" 
                          : "border-[#E4E1F0] hover:border-[#A02222]/70"
                      }`}
                    >
                      <img src={image} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain p-2" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Information */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-[#E6E1F5] text-[#2E1F44] px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                  <span className="bg-[#E1F7EC] text-[#1F7A4D] px-3 py-1 rounded-full text-sm font-medium">
                    In Stock
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-[#2E1F44] mb-4 leading-snug">{product.name}</h1>

                {/* Product Standard */}
                {product.standard && (
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-lg font-semibold text-[#2E1F44]/80">Standard:</span>
                    <span className="text-lg text-[#2E1F44] font-semibold">{product.standard}</span>
                  </div>
                )}
              </div>

              {/* Specifications */}
              <div className="bg-white p-6 rounded-2xl shadow-[0_12px_30px_rgba(39,31,68,0.08)] border border-[#E4E1F0]">
                <h3 className="text-lg font-bold text-[#2E1F44] mb-4 tracking-wide">Specifications</h3>
                <div className="space-y-3 text-sm">
                  {(product.equivalentStandard || product.specifications?.equivalentStandard || product.standard || product.specifications?.standard) && (
                    <div className="flex justify-between border-b border-dashed border-[#E4E1F0] pb-2">
                      <span className="text-[#2E1F44]/70 font-semibold">Equivalent Standard:</span>
                      <span className="text-[#2E1F44] font-medium text-right max-w-[60%]">
                        {product.equivalentStandard || product.specifications?.equivalentStandard || product.standard || product.specifications?.standard}
                      </span>
                    </div>
                  )}
                  {product.specifications.material && (
                    <div className="flex justify-between border-b border-dashed border-[#E4E1F0] pb-2">
                      <span className="text-[#2E1F44]/70 font-semibold">Material:</span>
                      <span className="text-[#2E1F44] font-medium text-right max-w-[60%]">{product.specifications.material}</span>
                  </div>
                  )}
                  {product.specifications.sizes && (
                    <div className="flex justify-between border-b border-dashed border-[#E4E1F0] pb-2">
                      <span className="text-[#2E1F44]/70 font-semibold">Sizes:</span>
                      <span className="text-[#2E1F44] font-medium text-right max-w-[60%]">{product.specifications.sizes}</span>
                  </div>
                  )}
                  {product.specifications.grades && product.specifications.grades.length > 0 && (
                    <div className="flex justify-between border-b border-dashed border-[#E4E1F0] pb-2">
                      <span className="text-[#2E1F44]/70 font-semibold">Grades:</span>
                      <span className="text-[#2E1F44] font-medium text-right max-w-[60%]">{product.specifications.grades.join(", ")}</span>
                  </div>
                  )}
                  {product.specifications.coating && product.specifications.coating.length > 0 && (
                    <div className="flex justify-between border-b border-dashed border-[#E4E1F0] pb-2">
                      <span className="text-[#2E1F44]/70 font-semibold">Coating:</span>
                      <span className="text-[#2E1F44] font-medium text-right max-w-[60%]">{product.specifications.coating.join(", ")}</span>
                    </div>
                  )}
                  {product.specifications.threadType && (
                    <div className="flex justify-between">
                      <span className="text-[#2E1F44]/70 font-semibold">Thread Type:</span>
                      <span className="text-[#2E1F44] font-medium text-right max-w-[60%]">{product.specifications.threadType}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="bg-white p-6 rounded-2xl shadow-[0_12px_30px_rgba(39,31,68,0.08)] border border-[#E4E1F0]">
                <h3 className="text-lg font-bold text-[#2E1F44] mb-4 tracking-wide">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#2E1F44]/80 leading-relaxed">
                      <Check className="w-5 h-5 text-[#A02222] shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity & Actions */}
              <div className="bg-white p-6 rounded-2xl shadow-[0_12px_30px_rgba(39,31,68,0.08)] space-y-5 border border-[#E4E1F0]">
                <div className="flex items-center justify-between bg-[#F3F1FB] border border-[#E0DBF4] rounded-xl px-4 py-3">
                  <span className="text-[#2E1F44] font-semibold">Quantity</span>
                  <div className="flex items-center bg-white border border-[#E0DBF4] rounded-lg shadow-sm">
                    <button
                      className="px-4 py-2 text-[#2E1F44] hover:bg-[#F7F7FA] font-semibold"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    >
                      −
                    </button>
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border-x border-[#E0DBF4] py-2 text-[#2E1F44] font-semibold"
                    />
                    <button
                      className="px-4 py-2 text-[#2E1F44] hover:bg-[#F7F7FA] font-semibold"
                      onClick={() => setQuantity((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-[#A02222] hover:bg-[#2E1F44] text-white py-3 text-lg flex items-center justify-center gap-2 shadow-[0_10px_24px_rgba(160,34,34,0.25)]"
                    onClick={handleAddToRFQ}
                  >
                  <ShoppingCart className="w-5 h-5" />
                  Add to RFQ
                </Button>
                  <Button
                    className="w-full bg-[#25D366] hover:bg-[#20BD5B] text-white py-3 text-lg flex items-center justify-center gap-2"
                    onClick={handleWhatsAppClick}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Contact via WhatsApp
                  </Button>
                  <Button
                    className="w-full bg-[#2E1F44] hover:bg-[#A02222] text-white py-3 text-lg flex items-center justify-center gap-2"
                    onClick={handleDownloadDataSheet}
                  >
                    <Send className="w-5 h-5" />
                    Submit Request
                  </Button>
                </div>
              </div>

            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-[0_16px_40px_rgba(39,31,68,0.08)] p-8 border border-[#E4E1F0]">
            <Tabs defaultValue="description" className="w-full">
              {(() => {
                const hasTechnicalInfo = rawProductData?.technicalInformation && 
                  typeof rawProductData.technicalInformation === 'string' && 
                  rawProductData.technicalInformation.trim() !== ""
                return (
                  <TabsList className={`grid w-full mb-8 rounded-xl bg-[#F0ECFA] p-1 ${hasTechnicalInfo ? 'grid-cols-4' : 'grid-cols-3'}`}>
                    <TabsTrigger value="description" className="data-[state=active]:bg-white data-[state=active]:text-[#A02222] data-[state=active]:shadow-[0_8px_20px_rgba(160,34,34,0.15)] text-[#2E1F44]/70 font-semibold rounded-lg transition-all">
                      Description
                    </TabsTrigger>
                    <TabsTrigger value="uses" className="data-[state=active]:bg-white data-[state=active]:text-[#A02222] data-[state=active]:shadow-[0_8px_20px_rgba(160,34,34,0.15)] text-[#2E1F44]/70 font-semibold rounded-lg transition-all">
                      Uses & Applications
                    </TabsTrigger>
                    {hasTechnicalInfo && (
                      <TabsTrigger value="technical" className="data-[state=active]:bg-white data-[state=active]:text-[#A02222] data-[state=active]:shadow-[0_8px_20px_rgba(160,34,34,0.15)] text-[#2E1F44]/70 font-semibold rounded-lg transition-all">
                        Technical Information
                      </TabsTrigger>
                    )}
                    <TabsTrigger value="shipping" className="data-[state=active]:bg-white data-[state=active]:text-[#A02222] data-[state=active]:shadow-[0_8px_20px_rgba(160,34,34,0.15)] text-[#2E1F44]/70 font-semibold rounded-lg transition-all">
                      Shipping & Returns
                    </TabsTrigger>
                  </TabsList>
                )
              })()}

              <TabsContent value="description" className="space-y-4">
                <h3 className="text-2xl font-bold text-[#2E1F44]">Product Description</h3>
                <p className="text-[#2E1F44]/80 leading-relaxed">
                  {product.description}
                </p>
                
                {/* Material Specifications */}
                {(product.specifications?.material || product.material || product.specifications?.coating || product.coating || product.specifications?.grades || product.grades || product.specifications?.tensileStrength) && (
                  <div className="mt-6">
                    <h4 className="font-bold text-[#2E1F44] mb-3">Material Specifications:</h4>
                    <ul className="space-y-2 text-[#2E1F44]/80">
                      {(product.specifications?.material || product.material) && (
                        <li>• Material: {product.specifications?.material || product.material}</li>
                      )}
                      {((product.specifications?.coating && product.specifications.coating.length > 0) || (product.coating && product.coating.length > 0)) && (
                        <li>• Coating options: {((product.specifications?.coating && product.specifications.coating.length > 0) ? product.specifications.coating : product.coating || []).join(", ")}</li>
                      )}
                      {((product.specifications?.grades && product.specifications.grades.length > 0) || (product.grades && product.grades.length > 0)) && (
                        <li>• Available grades: {((product.specifications?.grades && product.specifications.grades.length > 0) ? product.specifications.grades : product.grades || []).join(", ")}</li>
                      )}
                      {product.specifications?.tensileStrength && (
                        <li>• Tensile strength: {product.specifications.tensileStrength}</li>
                      )}
                  </ul>
                </div>
                )}
              </TabsContent>

              <TabsContent value="uses" className="space-y-4">
                <h3 className="text-2xl font-bold text-[#2E1F44]">Ideal For</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.uses.map((use, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[#FFE9E6] p-4 rounded-xl border border-[#FBC7BF]">
                      <Award className="w-5 h-5 text-[#A02222] shrink-0" />
                      <span className="text-[#2E1F44] font-medium">{use}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {rawProductData?.technicalInformation && 
               typeof rawProductData.technicalInformation === 'string' && 
               rawProductData.technicalInformation.trim() !== "" && (
                <TabsContent value="technical" className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#2E1F44]">Technical Information</h3>
                  <div className="text-[#2E1F44]/80 leading-relaxed whitespace-pre-wrap">
                    {rawProductData.technicalInformation}
                  </div>
                </TabsContent>
              )}

              <TabsContent value="shipping" className="space-y-4">
                <h3 className="text-2xl font-bold text-[#2E1F44]">Shipping & Returns</h3>
                <div className="space-y-4 text-[#2E1F44]/80">
                  <div>
                    <h4 className="font-bold mb-2 text-[#2E1F44]">Shipping:</h4>
                    <p>{(product as any).shippingInfo || "Free shipping on orders over ₹2,499. Standard delivery takes 5-7 business days."}</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-[#2E1F44]">Returns:</h4>
                    <p>{(product as any).returnsInfo || "30-day return policy with no questions asked. Products must be in original condition."}</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-[#2E1F44]">Warranty:</h4>
                    <p>{(product as any).warrantyInfo || "All products come with manufacturer's warranty. Contact us for warranty details."}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* RFQ Added Popup */}
      {isRFQPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-[0_16px_40px_rgba(39,31,68,0.2)] p-8 max-w-md w-full text-center border border-[#E4E1F0]">
            <div className="mb-6 flex justify-center">
              <CheckCircle className="w-24 h-24 text-[#25D366]" />
            </div>
            <h2 className="text-2xl font-bold text-[#2E1F44] mb-2">
              Product Added to RFQ!
            </h2>
            <p className="text-[#2E1F44]/80 text-lg mb-2">
              {product.name}
            </p>
            <p className="text-[#2E1F44]/60 text-sm mb-6">
              The product has been added to your RFQ list. You can continue shopping or proceed to checkout.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setIsRFQPopupOpen(false)}
                className="w-full bg-[#A02222] hover:bg-[#2E1F44] text-white py-2 text-lg font-bold rounded-md transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => window.location.href = '/rfq'}
                className="w-full bg-[#25D366] hover:bg-[#20BD5B] text-white py-2 text-lg font-bold rounded-md transition-colors"
              >
                Go to RFQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Data Sheet Popup */}
      {isDataSheetPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-[0_16px_40px_rgba(39,31,68,0.2)] p-8 max-w-lg w-full border border-[#E4E1F0]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#2E1F44]">
                Download Data Sheet
              </h2>
              <button
                onClick={() => setIsDataSheetPopupOpen(false)}
                className="text-[#2E1F44]/40 hover:text-[#A02222] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-[#F3F1FB] rounded-xl border border-[#E0DBF4]">
              <p className="text-sm font-semibold text-[#2E1F44] mb-2">Product Details (Auto-filled):</p>
              <p className="text-sm text-[#2E1F44]/80 mb-1"><strong>Name:</strong> {product.name}</p>
              <p className="text-sm text-[#2E1F44]/80 mb-1"><strong>Category:</strong> {product.category}</p>
              {product.standard && (
                <p className="text-sm text-[#2E1F44]/80 mb-1"><strong>Standard:</strong> {product.standard}</p>
              )}
              {product.material && (
                <p className="text-sm text-[#2E1F44]/80"><strong>Material:</strong> {product.material}</p>
              )}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); generateDataSheet(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#2E1F44] font-semibold">Name *</Label>
                <Input
                  id="name"
                  value={dataSheetForm.name}
                  onChange={(e) => setDataSheetForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-[#2E1F44] font-semibold">Mobile *</Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={dataSheetForm.mobile}
                  onChange={(e) => setDataSheetForm(prev => ({ ...prev, mobile: e.target.value }))}
                  placeholder="Enter your mobile number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#2E1F44] font-semibold">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={dataSheetForm.email}
                  onChange={(e) => setDataSheetForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-[#2E1F44] font-semibold">Company Name *</Label>
                <Input
                  id="companyName"
                  value={dataSheetForm.companyName}
                  onChange={(e) => setDataSheetForm(prev => ({ ...prev, companyName: e.target.value }))}
                  placeholder="Enter your company name"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDataSheetPopupOpen(false)
                    setDataSheetForm({ name: "", mobile: "", email: "", companyName: "" })
                  }}
                  className="flex-1 border-[#A02222] text-[#A02222] hover:bg-[#A02222] hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#2E1F44] hover:bg-[#A02222] text-white shadow-[0_10px_24px_rgba(46,31,68,0.2)]"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDataSheetSuccessOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-[0_16px_40px_rgba(39,31,68,0.2)] p-8 max-w-md w-full text-center space-y-6 border border-[#E4E1F0]">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-[#25D366]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#2E1F44] mb-2">Request Submitted</h3>
              <p className="text-[#2E1F44]/80">
                Thank you! Our team has received your request. We will send the data sheet to your email shortly.
              </p>
            </div>
            <Button
              className="w-full bg-[#2E1F44] hover:bg-[#A02222] text-white"
              onClick={() => setIsDataSheetSuccessOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </Layout>
  )
}


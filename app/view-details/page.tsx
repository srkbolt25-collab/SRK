"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  Download,
  X
} from "lucide-react"
import { findProductByName, findProductById, getCategoryRoute, type HusainiProduct } from "@/data/husaini-products"
import { useRFQ } from "@/contexts/RFQContext"

export default function ProductDetailsPage() {
  const searchParams = useSearchParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [product, setProduct] = useState<HusainiProduct | null>(null)
  const [isRFQPopupOpen, setIsRFQPopupOpen] = useState(false)
  const [isDataSheetPopupOpen, setIsDataSheetPopupOpen] = useState(false)
  const [dataSheetForm, setDataSheetForm] = useState({
    name: "",
    number: "",
    address: ""
  })
  const { addToRFQ } = useRFQ()

  useEffect(() => {
    // Get product info from URL parameters
    const productName = searchParams.get('name')
    const productId = searchParams.get('id')
    const category = searchParams.get('category')

    let foundProduct: HusainiProduct | undefined

    if (productId) {
      foundProduct = findProductById(productId)
    } else if (productName) {
      foundProduct = findProductByName(productName, category || undefined)
    }

    // Fallback to default product if not found
    if (!foundProduct) {
      foundProduct = findProductByName("DIN 933 / 931 Hexagon Bolt", "BOLTS") || undefined
    }

    if (foundProduct) {
      setProduct(foundProduct)
    }
  }, [searchParams])

  if (!product) {
    return (
      <Layout>
        <div className="pt-8 pb-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
      </Layout>
    )
  }

  // Function to generate WhatsApp URL with product information
  const handleWhatsAppClick = () => {
    const phoneNumber = "919321362064"
    const message = `Hello! I'm interested in this product:\n\nProduct Name: ${product.name}\nCategory: ${product.category}\nStandard: ${product.standard || 'N/A'}\n\nPlease provide more information, pricing, and availability.`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const productImages = [product.image, product.image, product.image] // Use same image for all thumbnails

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
    if (!dataSheetForm.name.trim() || !dataSheetForm.number.trim() || !dataSheetForm.address.trim()) {
      alert("Please fill in all fields (Name, Number, Address)")
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
          number: dataSheetForm.number,
          address: dataSheetForm.address,
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

    // Create HTML content for data sheet
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Product Data Sheet - ${product.name}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }
    .header {
      border-bottom: 3px solid #dc2626;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .logo {
      text-align: center;
      margin-bottom: 20px;
    }
    h1 {
      color: #dc2626;
      font-size: 28px;
      margin: 10px 0;
      text-align: center;
    }
    .company-info {
      text-align: center;
      color: #666;
      margin-bottom: 30px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      background-color: #dc2626;
      color: white;
      padding: 10px 15px;
      font-weight: bold;
      margin-bottom: 15px;
      font-size: 18px;
    }
    .info-row {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    .info-label {
      font-weight: bold;
      width: 200px;
      color: #333;
    }
    .info-value {
      flex: 1;
      color: #666;
    }
    .specs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-top: 15px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #eee;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
    @media print {
      body { padding: 20px; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">
      <h1>SRK BOLT</h1>
      <p class="company-info">Leading Fasteners Suppliers in India, Since 1998</p>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Customer Information</div>
    <div class="info-row">
      <div class="info-label">Name:</div>
      <div class="info-value">${dataSheetForm.name}</div>
    </div>
    <div class="info-row">
      <div class="info-label">Contact Number:</div>
      <div class="info-value">${dataSheetForm.number}</div>
    </div>
    <div class="info-row">
      <div class="info-label">Address:</div>
      <div class="info-value">${dataSheetForm.address}</div>
    </div>
    <div class="info-row">
      <div class="info-label">Date:</div>
      <div class="info-value">${new Date().toLocaleDateString()}</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Product Information</div>
    <div class="info-row">
      <div class="info-label">Product Name:</div>
      <div class="info-value">${product.name}</div>
    </div>
    <div class="info-row">
      <div class="info-label">Category:</div>
      <div class="info-value">${product.category}</div>
    </div>
    ${product.standard ? `
    <div class="info-row">
      <div class="info-label">Standard:</div>
      <div class="info-value">${product.standard}</div>
    </div>
    ` : ''}
    ${product.material ? `
    <div class="info-row">
      <div class="info-label">Material:</div>
      <div class="info-value">${product.material}</div>
    </div>
    ` : ''}
    ${product.sizes ? `
    <div class="info-row">
      <div class="info-label">Sizes:</div>
      <div class="info-value">${product.sizes}</div>
    </div>
    ` : ''}
  </div>

  <div class="section">
    <div class="section-title">Technical Specifications</div>
    ${product.specifications?.standard ? `
    <div class="info-row">
      <div class="info-label">Standard:</div>
      <div class="info-value">${product.specifications.standard}</div>
    </div>
    ` : ''}
    ${product.specifications?.material ? `
    <div class="info-row">
      <div class="info-label">Material:</div>
      <div class="info-value">${product.specifications.material}</div>
    </div>
    ` : ''}
    ${product.specifications?.sizes ? `
    <div class="info-row">
      <div class="info-label">Sizes:</div>
      <div class="info-value">${product.specifications.sizes}</div>
    </div>
    ` : ''}
    ${product.specifications?.grades && product.specifications.grades.length > 0 ? `
    <div class="info-row">
      <div class="info-label">Grades:</div>
      <div class="info-value">${product.specifications.grades.join(", ")}</div>
    </div>
    ` : ''}
    ${product.specifications?.coating && product.specifications.coating.length > 0 ? `
    <div class="info-row">
      <div class="info-label">Coating:</div>
      <div class="info-value">${product.specifications.coating.join(", ")}</div>
    </div>
    ` : ''}
    ${product.specifications?.tensileStrength ? `
    <div class="info-row">
      <div class="info-label">Tensile Strength:</div>
      <div class="info-value">${product.specifications.tensileStrength}</div>
    </div>
    ` : ''}
    ${product.specifications?.threadType ? `
    <div class="info-row">
      <div class="info-label">Thread Type:</div>
      <div class="info-value">${product.specifications.threadType}</div>
    </div>
    ` : ''}
  </div>

  ${product.description ? `
  <div class="section">
    <div class="section-title">Product Description</div>
    <p style="line-height: 1.6; color: #666;">${product.description}</p>
  </div>
  ` : ''}

  ${product.features && product.features.length > 0 ? `
  <div class="section">
    <div class="section-title">Key Features</div>
    <ul style="line-height: 1.8; color: #666;">
      ${product.features.map(feature => `<li>${feature}</li>`).join('')}
    </ul>
  </div>
  ` : ''}

  ${product.uses && product.uses.length > 0 ? `
  <div class="section">
    <div class="section-title">Applications & Uses</div>
    <ul style="line-height: 1.8; color: #666;">
      ${product.uses.map(use => `<li>${use}</li>`).join('')}
    </ul>
  </div>
  ` : ''}

  <div class="footer">
    <p><strong>SRK BOLT</strong></p>
    <p>Contact: +91-9321362064 | Email: sales@srkbolt.com</p>
    <p>Website: www.srkbolt.com</p>
    <p style="margin-top: 20px;">This data sheet is generated on ${new Date().toLocaleString()}</p>
  </div>
</body>
</html>
    `

    // Create a blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `SRK_Bolt_DataSheet_${product.name.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    // Close popup and show success message
    setIsDataSheetPopupOpen(false)
    setDataSheetForm({ name: "", number: "", address: "" })
    
    // Show success message
    alert("Data sheet downloaded successfully!")
  }

  return (
    <Layout>
      <div className="pt-8 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-red-600">Home</a>
            <span>/</span>
            <a href="/products" className="hover:text-red-600">Products</a>
            <span>/</span>
            <a href={getCategoryRoute(product.category)} className="hover:text-red-600">{product.category}</a>
            <span>/</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Product Images */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-square flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                  <img 
                    src={productImages[selectedImage]} 
                    alt={product.name}
                    className="h-96 w-96 object-contain"
                  />
                </div>

                {/* Navigation Buttons */}
                {productImages.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {product.standard || product.category}
                  </span>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
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
                          ? "border-red-600 shadow-lg" 
                          : "border-gray-200 hover:border-red-600"
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
                  <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    In Stock
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

                {/* Product Standard */}
                {product.standard && (
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-lg font-semibold text-gray-700">Standard:</span>
                    <span className="text-lg text-gray-900">{product.standard}</span>
                  </div>
                )}
              </div>

              {/* Specifications */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Specifications</h3>
                <div className="space-y-3">
                  {product.specifications.standard && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600 font-medium">Standard:</span>
                    <span className="text-gray-900">{product.specifications.standard}</span>
                  </div>
                  )}
                  {product.specifications.material && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600 font-medium">Material:</span>
                    <span className="text-gray-900">{product.specifications.material}</span>
                  </div>
                  )}
                  {product.specifications.sizes && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600 font-medium">Sizes:</span>
                      <span className="text-gray-900">{product.specifications.sizes}</span>
                  </div>
                  )}
                  {product.specifications.grades && product.specifications.grades.length > 0 && (
                    <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600 font-medium">Grades:</span>
                    <span className="text-gray-900">{product.specifications.grades.join(", ")}</span>
                  </div>
                  )}
                  {product.specifications.coating && product.specifications.coating.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">Coating:</span>
                      <span className="text-gray-900">{product.specifications.coating.join(", ")}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <Check className="w-5 h-5 text-green-600 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity & Actions */}
              <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button className="px-4 py-2 text-gray-600 hover:bg-gray-100">−</button>
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border-l border-r border-gray-300 py-2"
                    />
                    <button className="px-4 py-2 text-gray-600 hover:bg-gray-100">+</button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg flex items-center justify-center gap-2" onClick={handleAddToRFQ}>
                  <ShoppingCart className="w-5 h-5" />
                  Add to RFQ
                </Button>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg flex items-center justify-center gap-2" onClick={handleWhatsAppClick}>
                    <MessageCircle className="w-5 h-5" />
                    Contact via WhatsApp
                  </Button>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg flex items-center justify-center gap-2" onClick={handleDownloadDataSheet}>
                    <Download className="w-5 h-5" />
                    Download Data Sheet
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                  <Truck className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-800">Free Shipping</p>
                  <p className="text-xs text-gray-600">Over ₹2,499</p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-800">Secure Payment</p>
                  <p className="text-xs text-gray-600">SSL Encrypted</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-800">30-Day Returns</p>
                  <p className="text-xs text-gray-600">No Questions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="uses">Uses & Applications</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Product Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
                
                {/* Material Specifications */}
                {(product.specifications?.material || product.material || product.specifications?.coating || product.coating || product.specifications?.grades || product.grades || product.specifications?.tensileStrength) && (
                  <div className="mt-6">
                  <h4 className="font-bold text-gray-900 mb-3">Material Specifications:</h4>
                  <ul className="space-y-2 text-gray-700">
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
                <h3 className="text-xl font-bold text-gray-900">Ideal For</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.uses.map((use, i) => (
                    <div key={i} className="flex items-center gap-3 bg-red-50 p-4 rounded-lg">
                      <Award className="w-5 h-5 text-red-600 shrink-0" />
                      <span className="text-gray-800">{use}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Shipping & Returns</h3>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-bold mb-2">Shipping:</h4>
                    <p>{(product as any).shippingInfo || "Free shipping on orders over ₹2,499. Standard delivery takes 5-7 business days."}</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Returns:</h4>
                    <p>{(product as any).returnsInfo || "30-day return policy with no questions asked. Products must be in original condition."}</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Warranty:</h4>
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
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
            <div className="mb-6 flex justify-center">
              <CheckCircle className="w-24 h-24 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Product Added to RFQ!
            </h2>
            <p className="text-gray-600 text-lg mb-2">
              {product.name}
            </p>
            <p className="text-gray-500 text-sm mb-6">
              The product has been added to your RFQ list. You can continue shopping or proceed to checkout.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setIsRFQPopupOpen(false)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 text-lg font-bold rounded-md transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => window.location.href = '/rfq'}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 text-lg font-bold rounded-md transition-colors"
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
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Download Data Sheet
              </h2>
              <button
                onClick={() => setIsDataSheetPopupOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-2">Product Details (Auto-filled):</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Name:</strong> {product.name}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Category:</strong> {product.category}</p>
              {product.standard && (
                <p className="text-sm text-gray-600 mb-1"><strong>Standard:</strong> {product.standard}</p>
              )}
              {product.material && (
                <p className="text-sm text-gray-600"><strong>Material:</strong> {product.material}</p>
              )}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); generateDataSheet(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={dataSheetForm.name}
                  onChange={(e) => setDataSheetForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="number">Contact Number *</Label>
                <Input
                  id="number"
                  type="tel"
                  value={dataSheetForm.number}
                  onChange={(e) => setDataSheetForm(prev => ({ ...prev, number: e.target.value }))}
                  placeholder="Enter your contact number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={dataSheetForm.address}
                  onChange={(e) => setDataSheetForm(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter your complete address"
                  rows={3}
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDataSheetPopupOpen(false)
                    setDataSheetForm({ name: "", number: "", address: "" })
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Data Sheet
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}

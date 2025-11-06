"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import TopBar from "@/components/TopBar"
import MainHeader from "@/components/MainHeader"
import Footer from "@/components/Footer"
import { useToast } from "@/contexts/ToastContext"
import { 
  Plus, 
  Package, 
  Edit, 
  Trash2, 
  Eye, 
  Upload,
  Save,
  X,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  Loader2,
  Download,
  FileText
} from "lucide-react"

interface Product {
  _id?: string
  name: string
  description: string
  category: string
  inStock: boolean
  images: string[]
  imageLink?: string
  standard?: string
  material?: string
  grades?: string[]
  sizes?: string
  coating?: string[]
  features: string[]
  uses: string[]
  technicalInformation?: string
  shippingInfo?: string
  returnsInfo?: string
  warrantyInfo?: string
  specifications: {
    standard?: string
    material?: string
    grades?: string[]
    sizes?: string
    coating?: string[]
    tensileStrength?: string
    threadType?: string
    finish?: string[]
  }
  premium?: boolean
  createdAt?: string
  updatedAt?: string
}

export default function AdminDashboard() {
  const { toast } = useToast()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("add-product")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [dataSheetDownloads, setDataSheetDownloads] = useState<any[]>([])
  const [loadingDownloads, setLoadingDownloads] = useState(false)
  const [rfqEnquiries, setRfqEnquiries] = useState<any[]>([])
  const [loadingEnquiries, setLoadingEnquiries] = useState(false)
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null)
  const [isEnquiryViewOpen, setIsEnquiryViewOpen] = useState(false)
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    category: "",
    inStock: true,
    premium: false,
    images: [] as File[],
    imageLink: "",
    standard: "",
    material: "",
    sizes: "",
    grades: [""],
    coating: [""],
    features: [""],
    uses: [""],
    technicalInformation: "",
    shippingInfo: "Free shipping on orders over ₹2,499. Standard delivery takes 5-7 business days.",
    returnsInfo: "30-day return policy with no questions asked. Products must be in original condition.",
    warrantyInfo: "All products come with manufacturer's warranty. Contact us for warranty details.",
    tensileStrength: "",
    threadType: "",
    finish: [""]
  })
  
  // Form state for adding new product
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    inStock: true,
    premium: false,
    images: [] as File[],
    imageLink: "",
    standard: "",
    material: "",
    sizes: "",
    grades: [""],
    coating: [""],
    features: [""],
    uses: [""],
    technicalInformation: "",
    shippingInfo: "Free shipping on orders over ₹2,499. Standard delivery takes 5-7 business days.",
    returnsInfo: "30-day return policy with no questions asked. Products must be in original condition.",
    warrantyInfo: "All products come with manufacturer's warranty. Contact us for warranty details.",
    tensileStrength: "",
    threadType: "",
    finish: [""]
  })
  const [uploadingImages, setUploadingImages] = useState(false)
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([])

  // Check authentication on component mount
  useEffect(() => {
    checkAuthentication()
  }, [])

  const checkAuthentication = () => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    const adminSession = localStorage.getItem("adminSession")
    
    if (adminLoggedIn === "true" && adminSession) {
      // Check if session is not expired (24 hours)
      const sessionTime = parseInt(adminSession)
      const currentTime = Date.now()
      const sessionDuration = 24 * 60 * 60 * 1000 // 24 hours
      
      if (currentTime - sessionTime < sessionDuration) {
        setIsAuthenticated(true)
        fetchProducts()
        fetchDataSheetDownloads()
        fetchRFQEnquiries()
      } else {
        // Session expired
        localStorage.removeItem("adminLoggedIn")
        localStorage.removeItem("adminSession")
        router.push("/admin-login")
      }
    } else {
      router.push("/admin-login")
    }
    setCheckingAuth(false)
  }

  const fetchDataSheetDownloads = async () => {
    try {
      setLoadingDownloads(true)
      const response = await fetch('/api/datasheet-downloads')
      if (response.ok) {
        const data = await response.json()
        setDataSheetDownloads(data)
      } else {
        throw new Error('Failed to fetch data sheet downloads')
      }
    } catch (error) {
      console.error('Error fetching data sheet downloads:', error)
      toast({
        title: "Error",
        description: "Failed to fetch data sheet downloads",
        variant: "destructive"
      })
    } finally {
      setLoadingDownloads(false)
    }
  }

  const fetchRFQEnquiries = async () => {
    try {
      setLoadingEnquiries(true)
      const response = await fetch('/api/rfq-enquiries')
      if (response.ok) {
        const data = await response.json()
        setRfqEnquiries(data)
      } else {
        throw new Error('Failed to fetch RFQ enquiries')
      }
    } catch (error) {
      console.error('Error fetching RFQ enquiries:', error)
      toast({
        title: "Error",
        description: "Failed to fetch RFQ enquiries",
        variant: "destructive"
      })
    } finally {
      setLoadingEnquiries(false)
    }
  }

  const handleViewEnquiry = (enquiry: any) => {
    setSelectedEnquiry(enquiry)
    setIsEnquiryViewOpen(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    localStorage.removeItem("adminSession")
    router.push("/admin-login")
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Product deleted successfully",
          variant: "success"
        })
        // Refresh the products list
        fetchProducts()
      } else {
        throw new Error('Failed to delete product')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      })
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      } else {
        throw new Error('Failed to fetch products')
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayFieldChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field as keyof typeof prev]) 
        ? (prev[field as keyof typeof prev] as string[]).map((item: string, i: number) => 
            i === index ? value : item
          )
        : prev[field as keyof typeof prev]
    }))
  }

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    try {
      setUploadingImages(true)
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Upload failed')
        }

        const data = await response.json()
        return data.imageUrl
      })

      const urls = await Promise.all(uploadPromises)
      setUploadedImageUrls(prev => [...prev, ...urls])
      
      toast({
        title: "Images Uploaded Successfully",
        description: `${files.length} image(s) uploaded to Cloudinary`,
        variant: "success",
      })
    } catch (error) {
      console.error('Error uploading images:', error)
      toast({
        title: "Upload Error",
        description: "Failed to upload images",
        variant: "destructive",
      })
    } finally {
      setUploadingImages(false)
    }
  }

  const removeImage = (index: number) => {
    setUploadedImageUrls(prev => prev.filter((_, i) => i !== index))
  }

  const addArrayField = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field as keyof typeof prev])
        ? [...(prev[field as keyof typeof prev] as string[]), ""]
        : prev[field as keyof typeof prev]
    }))
  }

  const removeArrayField = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field as keyof typeof prev])
        ? (prev[field as keyof typeof prev] as string[]).filter((_: string, i: number) => i !== index)
        : prev[field as keyof typeof prev]
    }))
  }

  // Edit functions
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setEditFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      inStock: product.inStock,
      premium: product.premium || false,
      images: [],
      imageLink: product.imageLink || "",
      standard: product.standard || product.specifications?.standard || "",
      material: product.material || product.specifications?.material || "",
      sizes: product.sizes || product.specifications?.sizes || "",
      grades: product.grades && product.grades.length > 0 ? product.grades : (product.specifications?.grades && product.specifications.grades.length > 0 ? product.specifications.grades : [""]),
      coating: product.coating && product.coating.length > 0 ? product.coating : (product.specifications?.coating && product.specifications.coating.length > 0 ? product.specifications.coating : [""]),
      features: product.features && product.features.length > 0 ? product.features : [""],
      uses: product.uses && product.uses.length > 0 ? product.uses : [""],
      technicalInformation: product.technicalInformation || "",
      shippingInfo: product.shippingInfo || "Free shipping on orders over ₹2,499. Standard delivery takes 5-7 business days.",
      returnsInfo: product.returnsInfo || "30-day return policy with no questions asked. Products must be in original condition.",
      warrantyInfo: product.warrantyInfo || "All products come with manufacturer's warranty. Contact us for warranty details.",
      tensileStrength: product.specifications?.tensileStrength || "",
      threadType: product.specifications?.threadType || "",
      finish: product.specifications?.finish && product.specifications.finish.length > 0 ? product.specifications.finish : [""]
    })
    setActiveTab("add-product")
  }

  const handleEditInputChange = (field: string, value: any) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEditArrayFieldChange = (field: string, index: number, value: string) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field as keyof typeof prev])
        ? (prev[field as keyof typeof prev] as string[]).map((item: string, i: number) => 
            i === index ? value : item
          )
        : prev[field as keyof typeof prev]
    }))
  }

  const addEditArrayField = (field: string) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field as keyof typeof prev])
        ? [...(prev[field as keyof typeof prev] as string[]), ""]
        : prev[field as keyof typeof prev]
    }))
  }

  const removeEditArrayField = (field: string, index: number) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field as keyof typeof prev])
        ? (prev[field as keyof typeof prev] as string[]).filter((_: string, i: number) => i !== index)
        : prev[field as keyof typeof prev]
    }))
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editingProduct) return

    // Validation
    if (!editFormData.name.trim() || !editFormData.description.trim() || !editFormData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    try {
      setSubmitting(true)

      // Combine uploaded images and image link
      const finalImages = uploadedImageUrls.length > 0 
        ? uploadedImageUrls 
        : editFormData.imageLink 
          ? [editFormData.imageLink] 
          : editingProduct.images

      const productData = {
        name: editFormData.name,
        description: editFormData.description,
        category: editFormData.category,
        inStock: editFormData.inStock,
        premium: editFormData.premium,
        images: finalImages,
        imageLink: editFormData.imageLink || undefined,
        standard: editFormData.standard || undefined,
        material: editFormData.material || undefined,
        sizes: editFormData.sizes || undefined,
        grades: editFormData.grades.filter(g => g.trim() !== ""),
        coating: editFormData.coating.filter(c => c.trim() !== ""),
        features: editFormData.features.filter(feat => feat.trim() !== ""),
        uses: editFormData.uses.filter(use => use.trim() !== ""),
        technicalInformation: editFormData.technicalInformation || undefined,
        shippingInfo: editFormData.shippingInfo || undefined,
        returnsInfo: editFormData.returnsInfo || undefined,
        warrantyInfo: editFormData.warrantyInfo || undefined,
        specifications: {
          standard: editFormData.standard || undefined,
          material: editFormData.material || undefined,
          sizes: editFormData.sizes || undefined,
          grades: editFormData.grades.filter(g => g.trim() !== ""),
          coating: editFormData.coating.filter(c => c.trim() !== ""),
          tensileStrength: editFormData.tensileStrength || undefined,
          threadType: editFormData.threadType || undefined,
          finish: editFormData.finish.filter(f => f.trim() !== "")
        },
        updatedAt: new Date().toISOString()
      }

      const response = await fetch(`/api/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Product updated successfully",
          variant: "default"
        })
        
        // Reset form and fetch updated products
        setEditingProduct(null)
        setEditFormData({
          name: "",
          description: "",
          category: "",
          inStock: true,
          premium: false,
          images: [],
          imageLink: "",
          standard: "",
          material: "",
          sizes: "",
          grades: [""],
          coating: [""],
          features: [""],
          uses: [""],
          technicalInformation: "",
          shippingInfo: "Free shipping on orders over ₹2,499. Standard delivery takes 5-7 business days.",
          returnsInfo: "30-day return policy with no questions asked. Products must be in original condition.",
          warrantyInfo: "All products come with manufacturer's warranty. Contact us for warranty details.",
          tensileStrength: "",
          threadType: "",
          finish: [""]
        })
        fetchProducts()
      } else {
        const errorData = await response.json()
        toast({
          title: "Error",
          description: errorData.error || "Failed to update product",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error updating product:', error)
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  const cancelEdit = () => {
    setEditingProduct(null)
    setEditFormData({
      name: "",
      description: "",
      category: "",
      inStock: true,
      premium: false,
      images: [],
      imageLink: "",
      standard: "",
      material: "",
      sizes: "",
      grades: [""],
      coating: [""],
      features: [""],
      uses: [""],
      technicalInformation: "",
      shippingInfo: "Free shipping on orders over ₹2,499. Standard delivery takes 5-7 business days.",
      returnsInfo: "30-day return policy with no questions asked. Products must be in original condition.",
      warrantyInfo: "All products come with manufacturer's warranty. Contact us for warranty details.",
      tensileStrength: "",
      threadType: "",
      finish: [""]
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.description || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Description, Category)",
        variant: "destructive"
      })
      return
    }

    try {
      setSubmitting(true)
      
      // Combine uploaded images and image link
      const finalImages = uploadedImageUrls.length > 0 
        ? uploadedImageUrls 
        : formData.imageLink 
          ? [formData.imageLink] 
          : []

      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        inStock: formData.inStock,
        premium: formData.premium,
        images: finalImages,
        imageLink: formData.imageLink || undefined,
        standard: formData.standard || undefined,
        material: formData.material || undefined,
        sizes: formData.sizes || undefined,
        grades: formData.grades.filter(g => g.trim() !== ""),
        coating: formData.coating.filter(c => c.trim() !== ""),
        features: formData.features.filter(feat => feat.trim() !== ""),
        uses: formData.uses.filter(use => use.trim() !== ""),
        technicalInformation: formData.technicalInformation || undefined,
        shippingInfo: formData.shippingInfo || undefined,
        returnsInfo: formData.returnsInfo || undefined,
        warrantyInfo: formData.warrantyInfo || undefined,
        specifications: {
          standard: formData.standard || undefined,
          material: formData.material || undefined,
          sizes: formData.sizes || undefined,
          grades: formData.grades.filter(g => g.trim() !== ""),
          coating: formData.coating.filter(c => c.trim() !== ""),
          tensileStrength: formData.tensileStrength || undefined,
          threadType: formData.threadType || undefined,
          finish: formData.finish.filter(f => f.trim() !== "")
        }
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        // Reset form
        setFormData({
          name: "",
          description: "",
          category: "",
          inStock: true,
          premium: false,
          images: [],
          imageLink: "",
          standard: "",
          material: "",
          sizes: "",
          grades: [""],
          coating: [""],
          features: [""],
          uses: [""],
          technicalInformation: "",
          shippingInfo: "Free shipping on orders over ₹2,499. Standard delivery takes 5-7 business days.",
          returnsInfo: "30-day return policy with no questions asked. Products must be in original condition.",
          warrantyInfo: "All products come with manufacturer's warranty. Contact us for warranty details.",
          tensileStrength: "",
          threadType: "",
          finish: [""]
        })
        setUploadedImageUrls([]) // Clear uploaded images

        toast({
          title: "Product Added Successfully",
          description: `${productData.name} has been added to the product catalog`,
          variant: "success"
        })

        // Refresh products list
        await fetchProducts()
        setActiveTab("products")
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create product')
      }
    } catch (error) {
      console.error('Error creating product:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create product",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", "BOLTS", "NUTS", "WASHERS", "SCREWS", "HOOK & EYE", "RIVETS", "ATTACHMENTS", "OTHER"]

  // Show loading while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <MainHeader />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-red-600 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Manage your fastener products and track inventory
            </p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-red-600">{products.length}</p>
                </div>
                <Package className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Stock</p>
                  <p className="text-2xl font-bold text-green-600">{products.filter(p => p.inStock).length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-blue-600">{new Set(products.map(p => p.category)).size}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                  <p className="text-2xl font-bold text-orange-600">{products.filter(p => !p.inStock).length}</p>
                </div>
                <Package className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="add-product" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Manage Products
            </TabsTrigger>
            <TabsTrigger value="datasheet-downloads" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Data Sheet Downloads
            </TabsTrigger>
            <TabsTrigger value="rfq-enquiries" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              RFQ Enquiries
            </TabsTrigger>
          </TabsList>

          {/* Add Product Tab */}
          <TabsContent value="add-product">
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {editingProduct ? (
                    <>
                      <Edit className="h-5 w-5" />
                      Edit Product: {editingProduct.name}
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      Add New Product
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={editingProduct ? handleEditSubmit : handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Title *</Label>
                    <Input
                      id="name"
                      value={editingProduct ? editFormData.name : formData.name}
                      onChange={(e) => editingProduct ? handleEditInputChange("name", e.target.value) : handleInputChange("name", e.target.value)}
                      placeholder="e.g., DIN 933 / 931 Hexagon Bolt"
                      required
                    />
                  </div>

                  {/* Standard */}
                  <div className="space-y-2">
                    <Label htmlFor="standard">Standard:</Label>
                    <Input
                      id="standard"
                      value={editingProduct ? editFormData.standard : formData.standard}
                      onChange={(e) => editingProduct ? handleEditInputChange("standard", e.target.value) : handleInputChange("standard", e.target.value)}
                      placeholder="e.g., DIN 933 / 931"
                    />
                  </div>

                  {/* Specifications Section */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="spec-standard">Standard:</Label>
                        <Input
                          id="spec-standard"
                          value={editingProduct ? editFormData.standard : formData.standard}
                          onChange={(e) => editingProduct ? handleEditInputChange("standard", e.target.value) : handleInputChange("standard", e.target.value)}
                          placeholder="e.g., DIN 933 / 931"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="material">Material:</Label>
                        <Input
                          id="material"
                          value={editingProduct ? editFormData.material : formData.material}
                          onChange={(e) => editingProduct ? handleEditInputChange("material", e.target.value) : handleInputChange("material", e.target.value)}
                          placeholder="e.g., Steel / Stainless Steel"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sizes">Sizes:</Label>
                        <Input
                          id="sizes"
                          value={editingProduct ? editFormData.sizes : formData.sizes}
                          onChange={(e) => editingProduct ? handleEditInputChange("sizes", e.target.value) : handleInputChange("sizes", e.target.value)}
                          placeholder="e.g., M6 to M42"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={editingProduct ? editFormData.category : formData.category} onValueChange={(value) => editingProduct ? handleEditInputChange("category", value) : handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BOLTS">BOLTS</SelectItem>
                          <SelectItem value="NUTS">NUTS</SelectItem>
                          <SelectItem value="WASHERS">WASHERS</SelectItem>
                          <SelectItem value="SCREWS">SCREWS</SelectItem>
                          <SelectItem value="HOOK & EYE">HOOK & EYE</SelectItem>
                          <SelectItem value="RIVETS">RIVETS</SelectItem>
                          <SelectItem value="ATTACHMENTS">ATTACHMENTS</SelectItem>
                          <SelectItem value="OTHER">OTHER</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="premium"
                          checked={editingProduct ? editFormData.premium : formData.premium}
                          onChange={(e) => editingProduct ? handleEditInputChange("premium", e.target.checked) : handleInputChange("premium", e.target.checked)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-600"
                        />
                        <Label htmlFor="premium" className="text-sm font-medium">
                          Premium Product
                        </Label>
                      </div>
                      <p className="text-xs text-gray-500">Premium products will be featured prominently</p>
                    </div>
                    </div>
                    
                      {/* Grades */}
                      <div className="space-y-2">
                        <Label>Grades:</Label>
                        {editingProduct ? editFormData.grades.map((grade, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={grade}
                              onChange={(e) => handleEditArrayFieldChange("grades", index, e.target.value)}
                              placeholder="e.g., Grade 8.8"
                            />
                            {editFormData.grades.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeEditArrayField("grades", index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        )) : formData.grades.map((grade, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={grade}
                              onChange={(e) => handleArrayFieldChange("grades", index, e.target.value)}
                              placeholder="e.g., Grade 8.8"
                            />
                            {formData.grades.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeArrayField("grades", index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => editingProduct ? addEditArrayField("grades") : addArrayField("grades")}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Grade
                        </Button>
                      </div>
                      
                      {/* Coating */}
                      <div className="space-y-2">
                        <Label>Coating:</Label>
                        {editingProduct ? editFormData.coating.map((coat, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={coat}
                              onChange={(e) => handleEditArrayFieldChange("coating", index, e.target.value)}
                              placeholder="e.g., Zinc Plated"
                            />
                            {editFormData.coating.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeEditArrayField("coating", index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        )) : formData.coating.map((coat, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={coat}
                              onChange={(e) => handleArrayFieldChange("coating", index, e.target.value)}
                              placeholder="e.g., Zinc Plated"
                            />
                            {formData.coating.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeArrayField("coating", index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => editingProduct ? addEditArrayField("coating") : addArrayField("coating")}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Coating
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Image Link or Upload */}
                  <div className="space-y-4">
                    <Label>Image Link or Upload Image</Label>
                    
                    {/* Image Link Input */}
                    <div className="space-y-2">
                      <Label htmlFor="imageLink">Image URL (Optional)</Label>
                      <Input
                        id="imageLink"
                        type="url"
                        value={editingProduct ? editFormData.imageLink : formData.imageLink}
                        onChange={(e) => editingProduct ? handleEditInputChange("imageLink", e.target.value) : handleInputChange("imageLink", e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                      <p className="text-xs text-gray-500">Enter image URL or upload image below</p>
                    </div>
                    
                    {/* File Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-600 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={(e) => handleImageUpload(e.target.files)}
                        className="hidden"
                        id="image-upload"
                        disabled={uploadingImages}
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        {uploadingImages ? (
                          <div className="flex flex-col items-center">
                            <Loader2 className="h-8 w-8 animate-spin text-red-600 mb-2" />
                            <p className="text-sm text-gray-600">Uploading to Cloudinary...</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <Upload className="h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm font-medium text-gray-600">
                              Click to upload images or videos
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Supports: JPG, PNG, GIF, MP4, MOV (Max 5MB each)
                            </p>
                          </div>
                        )}
                      </label>
                    </div>

                    {/* Uploaded Images Preview */}
                    {uploadedImageUrls.length > 0 && (
                      <div className="space-y-2">
                        <Label>Uploaded Media ({uploadedImageUrls.length})</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {uploadedImageUrls.map((url, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square rounded-lg overflow-hidden border">
                                {url.includes('video') ? (
                                  <video
                                    src={url}
                                    className="w-full h-full object-cover"
                                    controls
                                  />
                                ) : (
                                  <img
                                    src={url}
                                    alt={`Upload ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Finish (Optional) */}
                  <div className="space-y-2">
                    <Label>Finish (Optional)</Label>
                    {editingProduct ? editFormData.finish.map((fin, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={fin}
                          onChange={(e) => handleEditArrayFieldChange("finish", index, e.target.value)}
                          placeholder="e.g., Chrome Plated"
                        />
                        {editFormData.finish.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeEditArrayField("finish", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    )) : formData.finish.map((fin, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={fin}
                          onChange={(e) => handleArrayFieldChange("finish", index, e.target.value)}
                          placeholder="e.g., Chrome Plated"
                        />
                        {formData.finish.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayField("finish", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => editingProduct ? addEditArrayField("finish") : addArrayField("finish")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Finish
                    </Button>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-2">
                    <Label>Key Features</Label>
                    {editingProduct ? editFormData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => handleEditArrayFieldChange("features", index, e.target.value)}
                          placeholder="e.g., Precision engineered for perfect fit"
                        />
                        {editFormData.features.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeEditArrayField("features", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    )) : formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => handleArrayFieldChange("features", index, e.target.value)}
                          placeholder="e.g., Precision engineered for perfect fit"
                        />
                        {formData.features.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayField("features", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => editingProduct ? addEditArrayField("features") : addArrayField("features")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>

                  {/* Product Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Product Description *</Label>
                    <Textarea
                      id="description"
                      value={editingProduct ? editFormData.description : formData.description}
                      onChange={(e) => editingProduct ? handleEditInputChange("description", e.target.value) : handleInputChange("description", e.target.value)}
                      placeholder="Enter product description"
                      rows={4}
                      required
                    />
                  </div>

                  {/* Technical Information */}
                  <div className="space-y-2">
                    <Label htmlFor="technicalInformation">Technical Information</Label>
                    <Textarea
                      id="technicalInformation"
                      value={editingProduct ? editFormData.technicalInformation : formData.technicalInformation}
                      onChange={(e) => editingProduct ? handleEditInputChange("technicalInformation", e.target.value) : handleInputChange("technicalInformation", e.target.value)}
                      placeholder="Enter technical information and specifications"
                      rows={4}
                    />
                  </div>

                  {/* Uses & Applications */}
                  <div className="space-y-2">
                    <Label>Uses & Applications</Label>
                    {editingProduct ? editFormData.uses.map((use, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={use}
                          onChange={(e) => handleEditArrayFieldChange("uses", index, e.target.value)}
                          placeholder="e.g., Construction & Structural Steel"
                        />
                        {editFormData.uses.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeEditArrayField("uses", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    )) : formData.uses.map((use, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={use}
                          onChange={(e) => handleArrayFieldChange("uses", index, e.target.value)}
                          placeholder="e.g., Construction & Structural Steel"
                        />
                        {formData.uses.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayField("uses", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => editingProduct ? addEditArrayField("uses") : addArrayField("uses")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Use Case
                    </Button>
                  </div>

                  {/* Shipping & Returns */}
                  <div className="border-t pt-6 space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Shipping & Returns</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="shippingInfo">Shipping:</Label>
                      <Textarea
                        id="shippingInfo"
                        value={editingProduct ? editFormData.shippingInfo : formData.shippingInfo}
                        onChange={(e) => editingProduct ? handleEditInputChange("shippingInfo", e.target.value) : handleInputChange("shippingInfo", e.target.value)}
                        placeholder="Free shipping on orders over ₹2,499. Standard delivery takes 5-7 business days."
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="returnsInfo">Returns:</Label>
                      <Textarea
                        id="returnsInfo"
                        value={editingProduct ? editFormData.returnsInfo : formData.returnsInfo}
                        onChange={(e) => editingProduct ? handleEditInputChange("returnsInfo", e.target.value) : handleInputChange("returnsInfo", e.target.value)}
                        placeholder="30-day return policy with no questions asked. Products must be in original condition."
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="warrantyInfo">Warranty:</Label>
                      <Textarea
                        id="warrantyInfo"
                        value={editingProduct ? editFormData.warrantyInfo : formData.warrantyInfo}
                        onChange={(e) => editingProduct ? handleEditInputChange("warrantyInfo", e.target.value) : handleInputChange("warrantyInfo", e.target.value)}
                        placeholder="All products come with manufacturer's warranty. Contact us for warranty details."
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="inStock"
                      checked={editingProduct ? editFormData.inStock : formData.inStock}
                      onChange={(e) => editingProduct ? handleEditInputChange("inStock", e.target.checked) : handleInputChange("inStock", e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="inStock">In Stock</Label>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1" disabled={submitting}>
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          {editingProduct ? "Updating Product..." : "Adding Product..."}
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          {editingProduct ? "Update Product" : "Add Product"}
                        </>
                      )}
                    </Button>
                    {editingProduct && (
                      <Button type="button" variant="outline" onClick={cancelEdit} className="flex-1">
                        <X className="h-4 w-4 mr-2" />
                        Cancel Edit
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Management Tab */}
          <TabsContent value="products">
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Product Management
                </CardTitle>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-red-600" />
                    <span className="ml-2">Loading products...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredProducts.map((product) => (
                      <div key={product._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                              <h3 className="text-base sm:text-lg font-semibold">{product.name}</h3>
                              <Badge variant={product.inStock ? "default" : "destructive"} className="text-xs">
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </Badge>
                              <Badge variant="outline" className="text-xs">{product.category}</Badge>
                              {product.premium && (
                                <Badge className="bg-linear-to-r from-yellow-400 to-yellow-600 text-white font-bold text-xs">
                                  PREMIUM
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mb-2 text-sm sm:text-base">{product.description}</p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                              {(product.standard || product.specifications?.standard) && (
                                <span>Standard: {product.standard || product.specifications?.standard}</span>
                              )}
                              {(product.material || product.specifications?.material) && (
                                <span>Material: {product.material || product.specifications?.material}</span>
                              )}
                              {(product.sizes || product.specifications?.sizes) && (
                                <span>Sizes: {product.sizes || product.specifications?.sizes}</span>
                              )}
                              {product.createdAt && (
                              <span>Added: {new Date(product.createdAt).toLocaleDateString()}</span>
                              )}
                            </div>
                            {((product.grades && product.grades.length > 0) || (product.specifications?.grades && product.specifications.grades.length > 0)) && (
                              <div className="mt-2">
                                <p className="text-xs sm:text-sm font-medium">Grades:</p>
                                <p className="text-xs sm:text-sm text-gray-600">
                                  {(product.grades && product.grades.length > 0 ? product.grades : product.specifications?.grades || []).join(", ")}
                                </p>
                              </div>
                            )}
                            {((product.coating && product.coating.length > 0) || (product.specifications?.coating && product.specifications.coating.length > 0)) && (
                              <div className="mt-2">
                                <p className="text-xs sm:text-sm font-medium">Coating:</p>
                                <p className="text-xs sm:text-sm text-gray-600">
                                  {(product.coating && product.coating.length > 0 ? product.coating : product.specifications?.coating || []).join(", ")}
                                </p>
                              </div>
                            )}
                            {product.features && product.features.length > 0 && (
                              <div className="mt-2">
                                <p className="text-xs sm:text-sm font-medium">Features:</p>
                                <p className="text-xs sm:text-sm text-gray-600">{product.features.join(", ")}</p>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 sm:ml-4">
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)} className="flex-1 sm:flex-none">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 flex-1 sm:flex-none" onClick={() => handleDeleteProduct(product._id!)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {filteredProducts.length === 0 && !loading && (
                      <div className="text-center py-8 text-gray-500">
                        <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No products found matching your criteria</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Sheet Downloads Tab */}
          <TabsContent value="datasheet-downloads">
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Data Sheet Downloads
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  View all data sheet download requests from customers
                </p>
              </CardHeader>
              <CardContent>
                {loadingDownloads ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-red-600" />
                    <span className="ml-2">Loading downloads...</span>
                  </div>
                ) : dataSheetDownloads.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No data sheet downloads yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">S.No</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Contact</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Address</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Product Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Category</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Standard</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Material</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Downloaded At</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dataSheetDownloads.map((download, index) => (
                          <tr key={download._id || index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {download.name}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {download.number}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate" title={download.address}>
                              {download.address}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {download.productName}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              <Badge variant="outline">{download.productCategory}</Badge>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {download.productStandard || '-'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {download.productMaterial || '-'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {download.downloadedAt 
                                ? new Date(download.downloadedAt).toLocaleString('en-IN', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })
                                : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* RFQ Enquiries Tab */}
          <TabsContent value="rfq-enquiries">
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  RFQ Enquiries
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  View all Request for Quotation enquiries from customers
                </p>
              </CardHeader>
              <CardContent>
                {loadingEnquiries ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-red-600" />
                    <span className="ml-2">Loading enquiries...</span>
                  </div>
                ) : rfqEnquiries.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No RFQ enquiries yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">S.No</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Company</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Mobile</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">City</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Products</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {rfqEnquiries.map((enquiry, index) => (
                          <tr key={enquiry._id || index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {enquiry.fullName}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {enquiry.email}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {enquiry.companyName || '-'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {enquiry.mobileNumber}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {enquiry.city || '-'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              <Badge variant="outline">{enquiry.totalItems || enquiry.products?.length || 0} items</Badge>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {enquiry.enquiryDate || enquiry.createdAt
                                ? new Date(enquiry.enquiryDate || enquiry.createdAt).toLocaleString('en-IN', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })
                                : '-'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewEnquiry(enquiry)}
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enquiry View Popup */}
      {isEnquiryViewOpen && selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-8 py-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                RFQ Enquiry Details
              </h2>
              <button
                onClick={() => {
                  setIsEnquiryViewOpen(false)
                  setSelectedEnquiry(null)
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              {/* Customer Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="text-base font-medium text-gray-900">{selectedEnquiry.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-base font-medium text-gray-900">{selectedEnquiry.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mobile Number</p>
                    <p className="text-base font-medium text-gray-900">{selectedEnquiry.mobileNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Company Name</p>
                    <p className="text-base font-medium text-gray-900">{selectedEnquiry.companyName || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="text-base font-medium text-gray-900">{selectedEnquiry.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">City</p>
                    <p className="text-base font-medium text-gray-900">{selectedEnquiry.city || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Country</p>
                    <p className="text-base font-medium text-gray-900">{selectedEnquiry.country || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Enquiry Date</p>
                    <p className="text-base font-medium text-gray-900">
                      {selectedEnquiry.enquiryDate || selectedEnquiry.createdAt
                        ? new Date(selectedEnquiry.enquiryDate || selectedEnquiry.createdAt).toLocaleString('en-IN')
                        : '-'}
                    </p>
                  </div>
                </div>
                {selectedEnquiry.comments && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Comments</p>
                    <p className="text-base text-gray-900 mt-1">{selectedEnquiry.comments}</p>
                  </div>
                )}
              </div>

              {/* Products List */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Products ({selectedEnquiry.totalItems || selectedEnquiry.products?.length || 0} items)
                </h3>
                <div className="space-y-4">
                  {selectedEnquiry.products && selectedEnquiry.products.length > 0 ? (
                    selectedEnquiry.products.map((product: any, index: number) => (
                      <div key={product.id || index} className="border rounded-lg p-4 flex gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                          <img
                            src={product.image || '/placeholder.jpg'}
                            alt={product.name}
                            className="w-16 h-16 object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-1">{product.name}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Quantity: <strong className="text-gray-900">{product.quantity || 1}</strong></span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No products found</p>
                  )}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t px-8 py-4 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEnquiryViewOpen(false)
                  setSelectedEnquiry(null)
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  )
}

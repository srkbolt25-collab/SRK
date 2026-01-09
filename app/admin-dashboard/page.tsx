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
  FileText,
  Images,
  Briefcase,
  CheckCircle,
  BookOpen,
  Inbox,
  LinkIcon,
  ArrowRight,
  Phone,
  Bold,
} from "lucide-react"

interface Product {
  _id?: string
  name: string
  description: string
  category: string
  inStock: boolean
  images: string[]
  imageLinks?: string[]
  imageLink?: string
  standard?: string
  equivalentStandard?: string
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
    equivalentStandard?: string
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

interface Blog {
  _id?: string
  title: string
  category: string
  content: string
  coverImage?: string
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
}

const emptyBlogForm = {
  title: "",
  content: "",
  coverImage: "",
  publishedAt: "",
  category: "",
}

interface Opening {
  _id?: string
  title: string
  employmentType: string
  location: string
  experience: string
  description: string
  icon?: string
  gradient?: string
  createdAt?: string
  updatedAt?: string
}

const emptyOpeningForm = {
  title: "",
  employmentType: "Full-time",
  location: "",
  experience: "",
  description: "",
  icon: "briefcase",
  gradient: "from-red-500 to-red-600",
}

interface ApplicationRecord {
  _id?: string
  name: string
  email: string
  phone: string
  resumeUrl: string
  openingId?: string
  openingTitle?: string
  employmentType?: string
  location?: string
  coverLetter?: string
  createdAt?: string
}

interface Contact {
  _id?: string
  title: string
  name: string
  designation: string
  tel: string
  email: string
  type: "sales" | "purchase"
  image?: string
  createdAt?: string
  updatedAt?: string
}

interface Banner {
  _id?: string
  title: string
  highlight: string
  subtitle: string
  image: string
  order?: number
  page?: string
  createdAt?: string
  updatedAt?: string
}

const emptyContactForm = {
  title: "",
  name: "",
  designation: "",
  tel: "",
  email: "",
  type: "sales" as "sales" | "purchase",
  image: "",
}

const MAX_BANNER_COUNT = 3

type BannerSlideForm = {
  title: string
  highlight: string
  subtitle: string
  image: string
}

const createEmptyBannerForm = () => ({
  slides: Array.from({ length: MAX_BANNER_COUNT }, () => ({
    title: "",
    highlight: "",
    subtitle: "",
    image: "",
  })) as BannerSlideForm[],
  order: "",
  page: "home",
})

type BannerForm = ReturnType<typeof createEmptyBannerForm>

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
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loadingBlogs, setLoadingBlogs] = useState(false)
  const [submittingBlog, setSubmittingBlog] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [blogForm, setBlogForm] = useState(emptyBlogForm)
  const [openings, setOpenings] = useState<Opening[]>([])
  const [loadingOpenings, setLoadingOpenings] = useState(false)
  const [submittingOpening, setSubmittingOpening] = useState(false)
  const [editingOpening, setEditingOpening] = useState<Opening | null>(null)
  const [openingForm, setOpeningForm] = useState(emptyOpeningForm)
  const [applications, setApplications] = useState<ApplicationRecord[]>([])
  const [loadingApplications, setLoadingApplications] = useState(false)
  const [submittingApplication, setSubmittingApplication] = useState(false)
  const [banners, setBanners] = useState<Banner[]>([])
  const [loadingBanners, setLoadingBanners] = useState(false)
  const [submittingBanner, setSubmittingBanner] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [bannerForm, setBannerForm] = useState<BannerForm>(createEmptyBannerForm())
  const [uploadingBannerImages, setUploadingBannerImages] = useState<Record<number, boolean>>({})
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loadingContacts, setLoadingContacts] = useState(false)
  const [submittingContact, setSubmittingContact] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [contactForm, setContactForm] = useState(emptyContactForm)
  const [uploadingContactImage, setUploadingContactImage] = useState(false)
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    category: "",
    inStock: true,
    premium: false,
    images: [] as File[],
    imageLinks: [""] as string[],
    standard: "",
    equivalentStandard: "",
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
    imageLinks: [""] as string[],
    standard: "",
    equivalentStandard: "",
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
  const MAX_IMAGES = 5

  const iconChoices: Array<{ value: string; label: string }> = [
    { value: "briefcase", label: "Briefcase" },
    { value: "check-circle", label: "Check Circle" },
    { value: "trending-up", label: "Trending Up" },
    { value: "users", label: "Users" },
    { value: "book-open", label: "Book Open" },
  ]

  const iconComponentMap: Record<string, typeof Briefcase> = {
    briefcase: Briefcase,
    "check-circle": CheckCircle,
    "trending-up": TrendingUp,
    users: Users,
    "book-open": BookOpen,
  }

  const gradientChoices: Array<{ value: string; label: string }> = [
    { value: "from-red-500 to-red-600", label: "Ruby" },
    { value: "from-orange-500 to-red-500", label: "Sunset" },
    { value: "from-amber-500 to-orange-500", label: "Amber" },
    { value: "from-indigo-500 to-blue-500", label: "Indigo" },
    { value: "from-emerald-500 to-teal-500", label: "Emerald" },
  ]
  const [contentParagraphs, setContentParagraphs] = useState<string[]>([""])

  const currentImageLinks = editingProduct ? editFormData.imageLinks : formData.imageLinks
  const sanitizedManualLinks = (currentImageLinks || [])
    .map((url) => (typeof url === 'string' ? url.trim() : ''))
    .filter((url) => url.length > 0)
  const remainingImageSlots = Math.max(0, MAX_IMAGES - (sanitizedManualLinks.length + uploadedImageUrls.length))

  const hasReachedBannerLimit = !editingBanner && banners.length >= MAX_BANNER_COUNT

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
        fetchBlogs()
        fetchApplications()
        fetchOpenings()
        fetchBanners()
        fetchContacts()
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

  const fetchBlogs = async () => {
    try {
      setLoadingBlogs(true)
      const response = await fetch("/api/blogs")
      if (!response.ok) {
        throw new Error("Failed to fetch blogs")
      }
      const data = await response.json()
      setBlogs(data)
    } catch (error) {
      console.error("Error fetching blogs:", error)
      toast({
        title: "Error",
        description: "Failed to fetch blogs",
        variant: "destructive",
      })
    } finally {
      setLoadingBlogs(false)
    }
  }

  const fetchOpenings = async () => {
    try {
      setLoadingOpenings(true)
      const response = await fetch("/api/openings")
      if (!response.ok) {
        throw new Error("Failed to fetch openings")
      }
      const data = await response.json()
      const normalised = (Array.isArray(data) ? data : []).map((opening: any) => ({
        ...opening,
        _id: typeof opening._id === "string" ? opening._id : opening._id?.$oid ?? "",
      }))
      setOpenings(normalised)
    } catch (error) {
      console.error("Error fetching openings:", error)
      toast({
        title: "Error",
        description: "Failed to fetch current openings",
        variant: "destructive",
      })
    } finally {
      setLoadingOpenings(false)
    }
  }

  const fetchApplications = async () => {
    try {
      setLoadingApplications(true)
      const response = await fetch("/api/applications")
      if (!response.ok) {
        throw new Error("Failed to fetch applications")
      }
      const data = await response.json()
      const normalised = (Array.isArray(data) ? data : []).map((application: any) => ({
        ...application,
        _id: typeof application._id === "string" ? application._id : application._id?.$oid ?? "",
      }))
      setApplications(normalised)
    } catch (error) {
      console.error("Error fetching applications:", error)
      toast({
        title: "Error",
        description: "Failed to fetch job applications",
        variant: "destructive",
      })
    } finally {
      setLoadingApplications(false)
    }
  }

  const fetchBanners = async () => {
    try {
      setLoadingBanners(true)
      const response = await fetch('/api/banners')
      if (response.ok) {
        const data = await response.json()
        setBanners(data)
      } else {
        throw new Error('Failed to fetch banners')
      }
    } catch (error) {
      console.error('Error fetching banners:', error)
      toast({
        title: "Error",
        description: "Failed to fetch banners",
        variant: "destructive"
      })
    } finally {
      setLoadingBanners(false)
    }
  }

  const handleBannerInputChange = (field: keyof Omit<BannerForm, "slides">, value: string) => {
    setBannerForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleBannerSlideChange = (
    index: number,
    field: keyof BannerForm["slides"][number],
    value: string
  ) => {
    setBannerForm((prev) => ({
      ...prev,
      slides: prev.slides.map((slide, slideIndex) =>
        slideIndex === index ? { ...slide, [field]: value } : slide
      ),
    }))
  }

  const handleOpeningInputChange = (field: keyof typeof emptyOpeningForm, value: string) => {
    setOpeningForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleOpeningSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      title: openingForm.title.trim(),
      employmentType: openingForm.employmentType.trim(),
      location: openingForm.location.trim(),
      experience: openingForm.experience.trim(),
      description: openingForm.description.trim(),
      icon: openingForm.icon,
      gradient: openingForm.gradient,
    }

    if (!payload.title || !payload.location || !payload.experience || !payload.description) {
      toast({
        title: "Missing fields",
        description: "Title, location, experience, and description are required.",
        variant: "destructive",
      })
      return
    }

    try {
      setSubmittingOpening(true)

      const endpoint = editingOpening ? `/api/openings/${editingOpening._id}` : "/api/openings"
      const method = editingOpening ? "PUT" : "POST"

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save opening")
      }

      toast({
        title: editingOpening ? "Opening updated" : "Opening added",
        description: editingOpening
          ? "The job opening has been updated successfully."
          : "New job opening created successfully.",
        variant: "success",
      })

      setOpeningForm(emptyOpeningForm)
      setEditingOpening(null)
      fetchOpenings()
    } catch (error) {
      console.error("Error saving opening:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save opening",
        variant: "destructive",
      })
    } finally {
      setSubmittingOpening(false)
    }
  }

  const handleEditOpening = (opening: Opening) => {
    setEditingOpening(opening)
    setOpeningForm({
      title: opening.title || "",
      employmentType: opening.employmentType || "Full-time",
      location: opening.location || "",
      experience: opening.experience || "",
      description: opening.description || "",
      icon: opening.icon || "briefcase",
      gradient: opening.gradient || "from-red-500 to-red-600",
    })
    setActiveTab("openings")
  }

  const cancelOpeningEdit = () => {
    setEditingOpening(null)
    setOpeningForm(emptyOpeningForm)
  }

  const handleDeleteOpening = async (openingId?: string) => {
    if (!openingId) return
    const confirmed = confirm("Are you sure you want to delete this opening?")
    if (!confirmed) return

    try {
      const response = await fetch(`/api/openings/${openingId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete opening")
      }

      toast({
        title: "Opening deleted",
        description: "The job opening has been removed.",
        variant: "success",
      })

      fetchOpenings()
    } catch (error) {
      console.error("Error deleting opening:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete opening",
        variant: "destructive",
      })
    }
  }

  const fetchContacts = async () => {
    try {
      setLoadingContacts(true)
      const response = await fetch("/api/contacts")
      if (!response.ok) {
        throw new Error("Failed to fetch contacts")
      }
      const data = await response.json()
      const normalised = (Array.isArray(data) ? data : []).map((contact: any) => ({
        ...contact,
        _id: typeof contact._id === "string" ? contact._id : contact._id?.$oid ?? "",
      }))
      setContacts(normalised)
    } catch (error) {
      console.error("Error fetching contacts:", error)
      toast({
        title: "Error",
        description: "Failed to fetch contacts",
        variant: "destructive",
      })
    } finally {
      setLoadingContacts(false)
    }
  }

  const handleContactInputChange = (field: keyof typeof emptyContactForm, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleContactImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploadingContactImage(true)
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const data = await response.json()
      setContactForm((prev) => ({ ...prev, image: data.imageUrl }))
      toast({
        title: "Image uploaded",
        description: "Contact image uploaded successfully.",
        variant: "success",
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploadingContactImage(false)
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      title: contactForm.title.trim(),
      name: contactForm.name.trim(),
      designation: contactForm.designation.trim(),
      tel: contactForm.tel.trim(),
      email: contactForm.email.trim(),
      type: contactForm.type,
      image: contactForm.image.trim(),
    }

    if (!payload.title || !payload.name || !payload.designation || !payload.tel || !payload.email) {
      toast({
        title: "Missing fields",
        description: "All fields are required.",
        variant: "destructive",
      })
      return
    }

    try {
      setSubmittingContact(true)

      const endpoint = editingContact ? `/api/contacts/${editingContact._id}` : "/api/contacts"
      const method = editingContact ? "PUT" : "POST"

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save contact")
      }

      toast({
        title: editingContact ? "Contact updated" : "Contact added",
        description: editingContact
          ? "The contact has been updated successfully."
          : "The contact has been added successfully.",
        variant: "success",
      })

      setContactForm(emptyContactForm)
      setEditingContact(null)
      fetchContacts()
    } catch (error) {
      console.error("Error saving contact:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save contact",
        variant: "destructive",
      })
    } finally {
      setSubmittingContact(false)
    }
  }

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact)
    setContactForm({
      title: contact.title || "",
      name: contact.name || "",
      designation: contact.designation || "",
      tel: contact.tel || "",
      email: contact.email || "",
      type: contact.type || "sales",
      image: contact.image || "",
    })
    setActiveTab("contacts")
  }

  const cancelContactEdit = () => {
    setEditingContact(null)
    setContactForm(emptyContactForm)
  }

  const handleDeleteContact = async (contactId?: string) => {
    if (!contactId) return
    const confirmed = confirm("Are you sure you want to delete this contact?")
    if (!confirmed) return

    try {
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete contact")
      }

      toast({
        title: "Contact removed",
        description: "The contact has been removed.",
        variant: "success",
      })

      fetchContacts()
    } catch (error) {
      console.error("Error deleting contact:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete contact",
        variant: "destructive",
      })
    }
  }

  const handleDeleteApplication = async (applicationId?: string) => {
    if (!applicationId) return
    const confirmed = confirm("Delete this application?")
    if (!confirmed) return

    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete application")
      }

      toast({
        title: "Application removed",
        description: "The application has been deleted.",
        variant: "success",
      })

      fetchApplications()
    } catch (error) {
      console.error("Error deleting application:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete application",
        variant: "destructive",
      })
    }
  }

  const handleBannerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingBanner && banners.length >= MAX_BANNER_COUNT) {
      toast({
        title: "Banner limit reached",
        description: `You can manage up to ${MAX_BANNER_COUNT} banners. Delete or edit an existing banner to make changes.`,
        variant: "destructive",
      })
      return
    }

    const sanitizedSlides = bannerForm.slides
      .map((slide, index) => ({
        index,
        title: slide.title.trim(),
        highlight: slide.highlight.trim(),
        subtitle: slide.subtitle.trim(),
        image: slide.image.trim(),
      }))
      .filter((slide) => slide.image.length > 0)
      .sort((a, b) => a.index - b.index)

    if (sanitizedSlides.length === 0 || !sanitizedSlides.some((slide) => slide.index === 0)) {
      toast({
        title: "Missing fields",
        description: "Banner 1 requires an image URL before saving.",
        variant: "destructive",
      })
      return
    }

    const uniqueSlides = sanitizedSlides.filter(
      (slide, idx, arr) => arr.findIndex((candidate) => candidate.image === slide.image) === idx
    )

    const submittedOrder = bannerForm.order.trim()
    let parsedOrder: number | undefined

    if (submittedOrder) {
      const numericOrder = Number(submittedOrder)
      if (Number.isNaN(numericOrder)) {
        toast({
          title: "Invalid order",
          description: "Display order must be a number",
          variant: "destructive",
        })
        return
      }
      parsedOrder = numericOrder
    }

    try {
      setSubmittingBanner(true)

      if (editingBanner) {
        const [primarySlide, ...extraSlides] = uniqueSlides

        const updatePayload: Record<string, unknown> = {
          title: primarySlide.title,
          subtitle: primarySlide.subtitle,
          highlight: primarySlide.highlight,
          image: primarySlide.image,
          page: bannerForm.page || "home",
        }

        if (parsedOrder !== undefined) {
          updatePayload.order = parsedOrder
        }

        const updateResponse = await fetch(`/api/banners/${editingBanner._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatePayload),
        })

        if (!updateResponse.ok) {
          const errorData = await updateResponse.json()
          throw new Error(errorData.error || 'Failed to update banner')
        }

        let createdCount = 0
        if (extraSlides.length > 0) {
          const availableSlots = Math.max(0, MAX_BANNER_COUNT - banners.length)
          if (availableSlots === 0) {
            toast({
              title: "No space for extra images",
              description: `You already have ${MAX_BANNER_COUNT} banners. Remove one before adding more images.`,
              variant: "destructive",
            })
          } else {
            const slidesToCreate = extraSlides.slice(0, availableSlots)
            const baseOrder =
              parsedOrder !== undefined
                ? parsedOrder + 1
                : (editingBanner.order ?? banners.length) + 1

            for (let i = 0; i < slidesToCreate.length; i += 1) {
              const createPayload = {
                title: slidesToCreate[i].title,
                subtitle: slidesToCreate[i].subtitle,
                highlight: slidesToCreate[i].highlight,
                image: slidesToCreate[i].image,
                order: baseOrder + i,
                page: bannerForm.page || "home",
              }

              const createResponse = await fetch('/api/banners', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(createPayload),
              })

              if (!createResponse.ok) {
                const errorData = await createResponse.json()
                throw new Error(errorData.error || 'Failed to save additional banner')
              }

              createdCount += 1
            }

            if (extraSlides.length > slidesToCreate.length) {
              toast({
                title: 'Banner limit reached',
                description: `Added ${slidesToCreate.length} additional banner(s). ${extraSlides.length - slidesToCreate.length} slide(s) were skipped because only ${MAX_BANNER_COUNT} slides are allowed.`,
                variant: 'destructive',
              })
            }
          }
        }

        toast({
          title: 'Banner updated',
          description: createdCount > 0 ? `Banner updated and ${createdCount} new slide(s) added.` : 'Slider banner updated successfully.',
          variant: 'success',
        })
      } else {
        const availableSlots = Math.max(0, MAX_BANNER_COUNT - banners.length)
        if (availableSlots <= 0) {
          toast({
            title: 'Banner limit reached',
            description: `You already have ${MAX_BANNER_COUNT} banners configured. Delete one to add a new image.`,
            variant: 'destructive',
          })
          return
        }

        const slidesToCreate = uniqueSlides.slice(0, availableSlots)
        const baseOrder = parsedOrder ?? banners.length
        let createdCount = 0

        for (let i = 0; i < slidesToCreate.length; i += 1) {
          const createPayload = {
            title: slidesToCreate[i].title,
            subtitle: slidesToCreate[i].subtitle,
            highlight: slidesToCreate[i].highlight,
            image: slidesToCreate[i].image,
            order: baseOrder + i,
            page: bannerForm.page || "home",
          }

          const createResponse = await fetch('/api/banners', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(createPayload),
          })

          if (!createResponse.ok) {
            const errorData = await createResponse.json()
            throw new Error(errorData.error || 'Failed to save banner')
          }

          createdCount += 1
        }

        if (uniqueSlides.length > slidesToCreate.length) {
          toast({
            title: 'Banner limit reached',
            description: `${slidesToCreate.length} banner(s) added. ${uniqueSlides.length - slidesToCreate.length} slide(s) were skipped because only ${MAX_BANNER_COUNT} slides are allowed.`,
            variant: 'destructive',
          })
        }

        toast({
          title: 'Banner added',
          description: `${createdCount} banner slide(s) created successfully.`,
          variant: 'success',
        })
      }

      setBannerForm(createEmptyBannerForm())
      setEditingBanner(null)
      fetchBanners()
    } catch (error) {
      console.error('Error saving banner:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save banner',
        variant: 'destructive',
      })
    } finally {
      setSubmittingBanner(false)
    }
  }

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner)
    const form = createEmptyBannerForm()
    form.slides[0] = {
      title: banner.title || '',
      highlight: banner.highlight || '',
      subtitle: banner.subtitle || '',
      image: banner.image || '',
    }
    form.order = banner.order !== undefined ? String(banner.order) : ''
    form.page = (banner as any).page || "home"
    setBannerForm(form)
    setActiveTab('banners')
  }

  const cancelBannerEdit = () => {
    setEditingBanner(null)
    setBannerForm(createEmptyBannerForm())
  }

  const handleDeleteBanner = async (bannerId?: string) => {
    if (!bannerId) return
    const confirmed = confirm('Are you sure you want to delete this banner?')
    if (!confirmed) return

    try {
      const response = await fetch(`/api/banners/${bannerId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete banner')
      }

      toast({
        title: 'Banner deleted',
        description: 'Slider banner removed successfully',
        variant: 'success',
      })

      fetchBanners()
    } catch (error) {
      console.error('Error deleting banner:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete banner',
        variant: 'destructive',
      })
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

    if (remainingImageSlots <= 0) {
      toast({
        title: "Image Limit Reached",
        description: `You can upload a maximum of ${MAX_IMAGES} product images.`,
        variant: "destructive",
      })
      return
    }

    const filesToUpload = Array.from(files).slice(0, remainingImageSlots)
    if (filesToUpload.length === 0) {
      toast({
        title: "Image Limit Reached",
        description: `You can upload a maximum of ${MAX_IMAGES} product images.`,
        variant: "destructive",
      })
      return
    }

    try {
      setUploadingImages(true)
      const uploadPromises = filesToUpload.map(async (file) => {
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
      setUploadedImageUrls(prev => {
        const merged = [...prev, ...urls]
          .filter((url) => typeof url === 'string' && url.trim() !== '')
          .map((url) => url.trim())
        return Array.from(new Set(merged)).slice(0, MAX_IMAGES)
      })

      toast({
        title: "Images Uploaded Successfully",
        description: `${filesToUpload.length} image(s) uploaded to Cloudinary`,
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

  const handleBannerImageUpload = async (file: File, slideIndex: number) => {
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Only JPEG, PNG, WebP, and GIF images are allowed.",
        variant: "destructive",
      })
      return
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB.",
        variant: "destructive",
      })
      return
    }

    try {
      setUploadingBannerImages(prev => ({ ...prev, [slideIndex]: true }))

      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.error || errorData.details || 'Upload failed'
        throw new Error(errorMessage)
      }

      const data = await response.json()
      const imageUrl = data.imageUrl

      // Update the banner form with the uploaded image URL
      handleBannerSlideChange(slideIndex, "image", imageUrl)

      toast({
        title: "Image uploaded successfully",
        description: "Banner image has been uploaded to Cloudinary",
        variant: "success",
      })
    } catch (error) {
      console.error('Error uploading banner image:', error)
      toast({
        title: "Upload error",
        description: error instanceof Error ? error.message : "Failed to upload banner image",
        variant: "destructive",
      })
    } finally {
      setUploadingBannerImages(prev => ({ ...prev, [slideIndex]: false }))
    }
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

  const handleBlogInputChange = (field: string, value: string) => {
    setBlogForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...contentParagraphs]
    newParagraphs[index] = value
    setContentParagraphs(newParagraphs)

    // Update main content field as well for compatibility
    setBlogForm(prev => ({
      ...prev,
      content: newParagraphs.join("\n\n")
    }))
  }

  const addParagraph = () => {
    setContentParagraphs([...contentParagraphs, ""])
  }

  const removeParagraph = (index: number) => {
    if (contentParagraphs.length <= 1) return
    const newParagraphs = contentParagraphs.filter((_, i) => i !== index)
    setContentParagraphs(newParagraphs)
    setBlogForm(prev => ({
      ...prev,
      content: newParagraphs.join("\n\n")
    }))
  }

  const toggleBold = (index: number) => {
    const inputId = `paragraph-${index}`
    const input = document.getElementById(inputId) as HTMLTextAreaElement
    if (!input) return

    const start = input.selectionStart
    const end = input.selectionEnd
    const text = contentParagraphs[index]

    if (start === end) {
      // No selection, append bold syntax
      const newText = text + " **bold text** "
      handleParagraphChange(index, newText)
    } else {
      // Wrap selection
      const newText = text.substring(0, start) + "**" + text.substring(start, end) + "**" + text.substring(end)
      handleParagraphChange(index, newText)
    }

    // Restore focus
    setTimeout(() => input.focus(), 0)
  }

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmittingBlog(true)

      // Import slugify dynamically
      const { slugify } = await import('@/lib/slugify')

      const payload = {
        ...blogForm,
        slug: slugify(blogForm.title),
        publishedAt: blogForm.publishedAt || new Date().toISOString(),
      }

      const method = editingBlog ? "PUT" : "POST"
      const endpoint = editingBlog ? `/api/blogs/${editingBlog._id}` : "/api/blogs"

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save blog")
      }

      toast({
        title: editingBlog ? "Blog Updated" : "Blog Added",
        description: editingBlog ? "Blog post updated successfully" : "Blog post created successfully",
        variant: "success",
      })

      setBlogForm(emptyBlogForm)
      setEditingBlog(null)
      fetchBlogs()
    } catch (error) {
      console.error("Error saving blog:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save blog post",
        variant: "destructive",
      })
    } finally {
      setSubmittingBlog(false)
    }
  }

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog)
    setBlogForm({
      title: blog.title || "",
      content: blog.content || "",
      coverImage: blog.coverImage || "",
      publishedAt: blog.publishedAt ? new Date(blog.publishedAt).toISOString().slice(0, 10) : "",
      category: blog.category || "",
    })
    setContentParagraphs(blog.content ? blog.content.split("\n\n") : [""])
    setActiveTab("blogs")
  }

  const cancelBlogEdit = () => {
    setEditingBlog(null)
    setBlogForm(emptyBlogForm)
    setContentParagraphs([""])
  }

  const handleDeleteBlog = async (blogId?: string) => {
    if (!blogId) return
    const confirmed = confirm("Are you sure you want to delete this blog post?")
    if (!confirmed) return

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete blog")
      }

      toast({
        title: "Blog Deleted",
        description: "Blog post removed successfully",
        variant: "success",
      })
      if (editingBlog?._id === blogId) {
        cancelBlogEdit()
      }
      fetchBlogs()
    } catch (error) {
      console.error("Error deleting blog:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete blog post",
        variant: "destructive",
      })
    }
  }

  // Edit functions
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    const rawImages = Array.isArray(product.images) ? [...product.images] : []
    if (rawImages.length === 0 && product.imageLink) {
      rawImages.push(product.imageLink)
    }
    const sanitizedImages = rawImages
      ? Array.from(
        new Set(
          rawImages
            .filter((url) => typeof url === 'string' && url.trim() !== '')
            .map((url) => url.trim())
        )
      ).slice(0, MAX_IMAGES)
      : []

    setEditFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      inStock: product.inStock,
      premium: product.premium || false,
      images: [],
      imageLinks: sanitizedImages.length > 0 ? sanitizedImages : [""],
      standard: product.standard || product.specifications?.standard || "",
      equivalentStandard: product.equivalentStandard || product.specifications?.equivalentStandard || product.standard || product.specifications?.standard || "",
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
    setUploadedImageUrls([])
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

    try {
      setSubmitting(true)

      // Combine uploaded images and image link
      const manualLinks = (editFormData.imageLinks || [])
        .map((url) => url.trim())
        .filter((url) => url.length > 0)

      const limitedManualLinks = manualLinks.slice(0, MAX_IMAGES)

      let combinedImages = [...limitedManualLinks, ...uploadedImageUrls]

      if (combinedImages.length === 0 && Array.isArray(editingProduct.images)) {
        combinedImages = Array.from(
          new Set(
            editingProduct.images
              .filter((url) => typeof url === 'string' && url.trim() !== '')
              .map((url) => url.trim())
          )
        )
      }

      const finalImages = Array.from(
        new Set(
          combinedImages
            .filter((url) => typeof url === 'string' && url.trim() !== '')
            .map((url) => url.trim())
        )
      ).slice(0, MAX_IMAGES)

      // Handle technicalInformation - send null if empty so API knows to remove it
      const technicalInfoValue = editFormData.technicalInformation?.trim()
      const technicalInformation = technicalInfoValue && technicalInfoValue !== "" ? technicalInfoValue : null

      const productData: Record<string, any> = {
        name: editFormData.name,
        description: editFormData.description,
        category: editFormData.category,
        inStock: editFormData.inStock,
        premium: editFormData.premium,
        images: finalImages,
        imageLink: limitedManualLinks[0] || undefined,
        imageLinks: limitedManualLinks,
        standard: editFormData.standard || undefined,
        equivalentStandard: editFormData.equivalentStandard || undefined,
        material: editFormData.material || undefined,
        sizes: editFormData.sizes || undefined,
        grades: editFormData.grades.filter(g => g.trim() !== ""),
        coating: editFormData.coating.filter(c => c.trim() !== ""),
        features: editFormData.features.filter(feat => feat.trim() !== ""),
        uses: editFormData.uses.filter(use => use.trim() !== ""),
        technicalInformation: technicalInformation, // Send null if empty
        shippingInfo: editFormData.shippingInfo || undefined,
        returnsInfo: editFormData.returnsInfo || undefined,
        warrantyInfo: editFormData.warrantyInfo || undefined,
        specifications: {
          standard: editFormData.standard || undefined,
          equivalentStandard: editFormData.equivalentStandard || undefined,
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
          imageLinks: [""],
          standard: "",
          equivalentStandard: "",
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
        setUploadedImageUrls([])
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
      imageLinks: [""],
      standard: "",
      equivalentStandard: "",
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
    setUploadedImageUrls([])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setSubmitting(true)

      // Combine uploaded images and image link
      const manualLinks = (formData.imageLinks || [])
        .map((url) => url.trim())
        .filter((url) => url.length > 0)

      const limitedManualLinks = manualLinks.slice(0, MAX_IMAGES)

      const combinedImages = [...limitedManualLinks, ...uploadedImageUrls]

      const finalImages = Array.from(
        new Set(
          combinedImages
            .filter((url) => typeof url === 'string' && url.trim() !== '')
            .map((url) => url.trim())
        )
      ).slice(0, MAX_IMAGES)

      // Handle technicalInformation - send null if empty
      const technicalInfoValue = formData.technicalInformation?.trim()
      const technicalInformation = technicalInfoValue && technicalInfoValue !== "" ? technicalInfoValue : null

      const productData: Record<string, any> = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        inStock: formData.inStock,
        premium: formData.premium,
        images: finalImages,
        imageLink: limitedManualLinks[0] || undefined,
        imageLinks: limitedManualLinks,
        standard: formData.standard || undefined,
        equivalentStandard: formData.equivalentStandard || undefined,
        material: formData.material || undefined,
        sizes: formData.sizes || undefined,
        grades: formData.grades.filter(g => g.trim() !== ""),
        coating: formData.coating.filter(c => c.trim() !== ""),
        features: formData.features.filter(feat => feat.trim() !== ""),
        uses: formData.uses.filter(use => use.trim() !== ""),
        technicalInformation: technicalInformation, // Send null if empty
        shippingInfo: formData.shippingInfo || undefined,
        returnsInfo: formData.returnsInfo || undefined,
        warrantyInfo: formData.warrantyInfo || undefined,
        specifications: {
          standard: formData.standard || undefined,
          equivalentStandard: formData.equivalentStandard || undefined,
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
          imageLinks: [""],
          standard: "",
          equivalentStandard: "",
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
          <TabsList className="grid w-full grid-cols-9">
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
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <Inbox className="h-4 w-4" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="openings" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Current Openings
            </TabsTrigger>
            <TabsTrigger value="banners" className="flex items-center gap-2">
              <Images className="h-4 w-4" />
              Banners
            </TabsTrigger>
            <TabsTrigger value="blogs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Blogs
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact Us
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
                    <Label htmlFor="name">Title</Label>
                    <Input
                      id="name"
                      value={editingProduct ? editFormData.name : formData.name}
                      onChange={(e) => editingProduct ? handleEditInputChange("name", e.target.value) : handleInputChange("name", e.target.value)}
                      placeholder="e.g., DIN 933 / 931 Hexagon Bolt"
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
                        <Label htmlFor="equivalentStandard">Equivalent Standard:</Label>
                        <Input
                          id="equivalentStandard"
                          value={editingProduct ? editFormData.equivalentStandard : formData.equivalentStandard}
                          onChange={(e) => editingProduct ? handleEditInputChange("equivalentStandard", e.target.value) : handleInputChange("equivalentStandard", e.target.value)}
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

                      <div className="space-y-2">
                        <Label htmlFor="threadType">Thread Type:</Label>
                        <Input
                          id="threadType"
                          value={editingProduct ? editFormData.threadType : formData.threadType}
                          onChange={(e) => editingProduct ? handleEditInputChange("threadType", e.target.value) : handleInputChange("threadType", e.target.value)}
                          placeholder="e.g., Metric Coarse, UNC, UNF"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
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

                  {/* Image Link or Upload */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Image Links (Optional)</Label>
                      <p className="text-xs text-gray-500">Paste direct image URLs. Uploaded files and links combined can contain up to {MAX_IMAGES} items.</p>
                      {(currentImageLinks || []).map((link, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            type="url"
                            value={link}
                            onChange={(e) => editingProduct
                              ? handleEditArrayFieldChange("imageLinks", index, e.target.value)
                              : handleArrayFieldChange("imageLinks", index, e.target.value)}
                            placeholder="https://example.com/image.jpg"
                          />
                          {(currentImageLinks?.length || 0) > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => editingProduct
                                ? removeEditArrayField("imageLinks", index)
                                : removeArrayField("imageLinks", index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (remainingImageSlots <= 0) {
                              toast({
                                title: "Image Limit Reached",
                                description: `Maximum of ${MAX_IMAGES} images allowed. Remove an image to add another.`,
                                variant: "destructive",
                              })
                              return
                            }
                            editingProduct ? addEditArrayField("imageLinks") : addArrayField("imageLinks")
                          }}
                          disabled={remainingImageSlots <= 0}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Image Link
                        </Button>
                        <span className="text-xs text-gray-500">Slots remaining: {remainingImageSlots}</span>
                      </div>
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
                              Supports: JPG, PNG, GIF, MP4, MOV (Max 5MB each). {remainingImageSlots} upload slot(s) remaining.
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
                    <Label htmlFor="description">Product Description</Label>
                    <Textarea
                      id="description"
                      value={editingProduct ? editFormData.description : formData.description}
                      onChange={(e) => editingProduct ? handleEditInputChange("description", e.target.value) : handleInputChange("description", e.target.value)}
                      placeholder="Enter product description"
                      rows={4}
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
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Mobile</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Company</th>
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
                              {download.mobile || download.number || '-'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {download.email || '-'}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate" title={download.companyName || download.address}>
                              {download.companyName || download.address || '-'}
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

          {/* Current Openings Tab */}
          <TabsContent value="openings">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {editingOpening ? (
                      <>
                        <Edit className="h-5 w-5" />
                        Edit Opening: {editingOpening.title}
                      </>
                    ) : (
                      <>
                        <Briefcase className="h-5 w-5" />
                        Add Job Opening
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleOpeningSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="opening-title">Job Title</Label>
                      <Input
                        id="opening-title"
                        value={openingForm.title}
                        onChange={(e) => handleOpeningInputChange("title", e.target.value)}
                        placeholder="e.g., Sales Manager"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="opening-type">Employment Type</Label>
                        <Select
                          value={openingForm.employmentType}
                          onValueChange={(value) => handleOpeningInputChange("employmentType", value)}
                        >
                          <SelectTrigger id="opening-type">
                            <SelectValue placeholder="Select employment type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="opening-location">Location</Label>
                        <Input
                          id="opening-location"
                          value={openingForm.location}
                          onChange={(e) => handleOpeningInputChange("location", e.target.value)}
                          placeholder="e.g., Mumbai"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="opening-experience">Experience</Label>
                        <Input
                          id="opening-experience"
                          value={openingForm.experience}
                          onChange={(e) => handleOpeningInputChange("experience", e.target.value)}
                          placeholder="e.g., 5+ years"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="opening-icon">Icon</Label>
                        <Select
                          value={openingForm.icon}
                          onValueChange={(value) => handleOpeningInputChange("icon", value)}
                        >
                          <SelectTrigger id="opening-icon">
                            <SelectValue placeholder="Select icon" />
                          </SelectTrigger>
                          <SelectContent>
                            {iconChoices.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="opening-gradient">Highlight Gradient</Label>
                      <Select
                        value={openingForm.gradient}
                        onValueChange={(value) => handleOpeningInputChange("gradient", value)}
                      >
                        <SelectTrigger id="opening-gradient">
                          <SelectValue placeholder="Select gradient style" />
                        </SelectTrigger>
                        <SelectContent>
                          {gradientChoices.map((gradient) => (
                            <SelectItem key={gradient.value} value={gradient.value}>
                              {gradient.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="opening-description">Role Description</Label>
                      <Textarea
                        id="opening-description"
                        value={openingForm.description}
                        onChange={(e) => handleOpeningInputChange("description", e.target.value)}
                        placeholder="Describe the responsibilities, required skills, and expectations for this role."
                        rows={6}
                        required
                      />
                    </div>

                    {editingOpening && (
                      <Button type="button" variant="outline" className="w-full" onClick={cancelOpeningEdit}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel Editing
                      </Button>
                    )}

                    <Button type="submit" disabled={submittingOpening} className="w-full">
                      {submittingOpening ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          {editingOpening ? "Update Opening" : "Save Opening"}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Current Openings
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">Manage published roles for the careers page.</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={fetchOpenings} disabled={loadingOpenings}>
                    <Loader2 className={`h-4 w-4 mr-2 ${loadingOpenings ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </CardHeader>
                <CardContent>
                  {loadingOpenings ? (
                    <div className="flex items-center justify-center py-10 text-gray-500">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      Loading openings...
                    </div>
                  ) : openings.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      No current openings yet. Use the form to add your first opportunity.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {openings.map((opening) => {
                        const Icon = iconComponentMap[opening.icon || "briefcase"] || Briefcase
                        const gradient = opening.gradient || "from-red-500 to-red-600"
                        return (
                          <div key={opening._id} className="border rounded-xl overflow-hidden shadow-sm bg-white">
                            <div className={`h-1 bg-linear-to-r ${gradient}`}></div>
                            <div className="p-6 space-y-4">
                              <div className="flex items-start justify-between gap-3">
                                <div className={`p-3 rounded-lg bg-linear-to-br ${gradient} text-white`}>
                                  <Icon className="w-5 h-5" />
                                </div>
                                <Badge className="bg-emerald-100 text-emerald-700">
                                  {opening.employmentType || "Full-time"}
                                </Badge>
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-[#2E1F44]">{opening.title}</h3>
                                <p className="mt-2 text-sm text-[#2E1F44]/70 leading-relaxed line-clamp-3">
                                  {opening.description}
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-6 text-xs text-[#2E1F44]/70 uppercase tracking-[0.2em] font-semibold">
                                <span>
                                  <span className="text-[#2E1F44] mr-1 normal-case font-semibold tracking-normal">Location:</span>
                                  {opening.location}
                                </span>
                                <span>
                                  <span className="text-[#2E1F44] mr-1 normal-case font-semibold tracking-normal">Experience:</span>
                                  {opening.experience}
                                </span>
                              </div>
                            </div>
                            <div className="px-6 py-4 border-t flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEditOpening(opening)}>
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDeleteOpening(opening._id)}>
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Banner Management Tab */}
          <TabsContent value="banners">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {editingBanner ? (
                      <>
                        <Edit className="h-5 w-5" />
                        Edit Banner: {editingBanner.title}
                      </>
                    ) : (
                      <>
                        <Plus className="h-5 w-5" />
                        Add Slider Banner
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBannerSubmit} className="space-y-5">
                    {hasReachedBannerLimit && (
                      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                        You already have {MAX_BANNER_COUNT} banners published. Delete or edit an existing banner to make room for a new slide.
                      </div>
                    )}
                    {bannerForm.slides.map((slide, index) => {
                      const bannerIndex = index + 1
                      const inputPrefix = `banner-${index}`
                      const requireImage = index === 0
                      const slideDisabled = hasReachedBannerLimit

                      return (
                        <div
                          key={inputPrefix}
                          className="space-y-4 rounded-2xl border border-[#E5E5E5] bg-[#FAFAFC] p-4 md:p-5"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A02222]">
                              Banner {bannerIndex}
                            </p>
                            {requireImage && (
                              <Badge variant="outline" className="text-xs border-[#A02222] text-[#A02222]">
                                Required
                              </Badge>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`${inputPrefix}-title`}>Headline</Label>
                            <Input
                              id={`${inputPrefix}-title`}
                              value={slide.title}
                              onChange={(e) => handleBannerSlideChange(index, "title", e.target.value)}
                              placeholder="e.g., Industrial Bolts & Screws"
                              disabled={slideDisabled}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`${inputPrefix}-highlight`}>Highlight Label</Label>
                            <Input
                              id={`${inputPrefix}-highlight`}
                              value={slide.highlight}
                              onChange={(e) => handleBannerSlideChange(index, "highlight", e.target.value)}
                              placeholder="e.g., New Release"
                              disabled={slideDisabled}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`${inputPrefix}-subtitle`}>Supporting Copy</Label>
                            <Textarea
                              id={`${inputPrefix}-subtitle`}
                              value={slide.subtitle}
                              onChange={(e) => handleBannerSlideChange(index, "subtitle", e.target.value)}
                              placeholder="Add a short supporting message"
                              rows={4}
                              disabled={slideDisabled}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`${inputPrefix}-image`}>Banner Image {bannerIndex}</Label>

                            {/* Image URL Input */}
                            <Input
                              id={`${inputPrefix}-image`}
                              value={slide.image}
                              onChange={(e) => handleBannerSlideChange(index, "image", e.target.value)}
                              placeholder={`https://example.com/banner-${bannerIndex}.jpg`}
                              required={requireImage}
                              disabled={slideDisabled && !editingBanner}
                            />

                            {/* Divider */}
                            <div className="flex items-center gap-2 my-2">
                              <div className="flex-1 border-t border-gray-300"></div>
                              <span className="text-xs text-gray-500">OR</span>
                              <div className="flex-1 border-t border-gray-300"></div>
                            </div>

                            {/* File Upload */}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#A02222] transition-colors">
                              <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) {
                                    handleBannerImageUpload(file, index)
                                  }
                                  // Reset input
                                  e.target.value = ''
                                }}
                                className="hidden"
                                id={`${inputPrefix}-file-upload`}
                                disabled={slideDisabled && !editingBanner || uploadingBannerImages[index]}
                              />
                              <label
                                htmlFor={`${inputPrefix}-file-upload`}
                                className={`cursor-pointer flex flex-col items-center ${(slideDisabled && !editingBanner) || uploadingBannerImages[index] ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                {uploadingBannerImages[index] ? (
                                  <div className="flex flex-col items-center">
                                    <Loader2 className="h-6 w-6 text-[#A02222] animate-spin mb-2" />
                                    <p className="text-sm text-gray-600">Uploading to Cloudinary...</p>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center">
                                    <Upload className="h-6 w-6 text-gray-400 mb-2" />
                                    <p className="text-sm font-medium text-gray-600">
                                      Click to upload image
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      JPEG, PNG, WebP, or GIF (max 5MB)
                                    </p>
                                  </div>
                                )}
                              </label>
                            </div>

                            {/* Image Preview */}
                            {slide.image && (
                              <div className="mt-3">
                                <Label className="text-xs text-gray-600 mb-2 block">Preview:</Label>
                                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200">
                                  <img
                                    src={slide.image}
                                    alt={`Banner ${bannerIndex} preview`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.style.display = 'none'
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleBannerSlideChange(index, "image", "")}
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
                                    disabled={slideDisabled && !editingBanner}
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            )}

                            <p className="text-xs text-gray-500">
                              {requireImage
                                ? "Primary background image (required). Enter URL or upload an image."
                                : "Optional slide. Leave blank if you only need fewer banners."}
                            </p>
                          </div>
                        </div>
                      )
                    })}

                    <p className="text-xs text-gray-400">
                      Fill up to {MAX_BANNER_COUNT} banner sections. Each completed section becomes a slide in the homepage
                      carousel.
                    </p>

                    <div className="space-y-2">
                      <Label htmlFor="banner-page">Page</Label>
                      <Select
                        value={bannerForm.page}
                        onValueChange={(value) => handleBannerInputChange("page", value)}
                        disabled={hasReachedBannerLimit}
                      >
                        <SelectTrigger id="banner-page">
                          <SelectValue placeholder="Select page" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home">Home Page</SelectItem>
                          <SelectItem value="about">About Us</SelectItem>
                          <SelectItem value="industries">Industries</SelectItem>
                          <SelectItem value="projects">Projects</SelectItem>
                          <SelectItem value="brands">Our Brands</SelectItem>
                          <SelectItem value="blogs">Blogs</SelectItem>
                          <SelectItem value="careers">Careers</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500">Select which page this banner will be displayed on.</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="banner-order">Display Order</Label>
                      <Input
                        id="banner-order"
                        type="number"
                        value={bannerForm.order}
                        onChange={(e) => handleBannerInputChange("order", e.target.value)}
                        placeholder="0"
                        disabled={hasReachedBannerLimit}
                      />
                      <p className="text-xs text-gray-500">Lower numbers appear first in the slider. Maximum of {MAX_BANNER_COUNT} slides rotating in order.</p>
                    </div>

                    {editingBanner && (
                      <Button type="button" variant="outline" className="w-full" onClick={cancelBannerEdit}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel Editing
                      </Button>
                    )}

                    <Button type="submit" disabled={submittingBanner || hasReachedBannerLimit} className="w-full">
                      {submittingBanner ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          {editingBanner ? "Update Banner" : "Save Banner"}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Images className="h-5 w-5" />
                      Current Slider Banners <span className="text-xs font-medium text-gray-500">({Math.min(banners.length, MAX_BANNER_COUNT)} / {MAX_BANNER_COUNT})</span>
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">Manage banners for different pages. Each page can have up to {MAX_BANNER_COUNT} banners.</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={fetchBanners} disabled={loadingBanners}>
                    <Loader2 className={`h-4 w-4 mr-2 ${loadingBanners ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </CardHeader>
                <CardContent>
                  {loadingBanners ? (
                    <div className="flex items-center justify-center py-10 text-gray-500">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      Loading banners...
                    </div>
                  ) : banners.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      No banners configured yet. Add your first slide using the form.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {banners.map((banner) => (
                        <div key={banner._id} className="border rounded-xl overflow-hidden shadow-sm">
                          <div className="relative h-48 bg-gray-100">
                            <img
                              src={banner.image}
                              alt={banner.title}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30" />
                            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                              {banner.highlight && (
                                <span className="text-xs uppercase tracking-[0.3em] text-[#FFD5D5] font-semibold block mb-2">
                                  {banner.highlight}
                                </span>
                              )}
                              <h3 className="text-lg font-semibold leading-snug">{banner.title}</h3>
                              {banner.subtitle && (
                                <p className="text-sm text-white/80 mt-2 line-clamp-2">{banner.subtitle}</p>
                              )}
                            </div>
                          </div>
                          <div className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
                              <Badge variant="outline">Order: {banner.order ?? 0}</Badge>
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                Page: {(banner as any).page || "home"}
                              </Badge>
                              <span className="text-gray-400">
                                Updated {banner.updatedAt ? new Date(banner.updatedAt).toLocaleDateString("en-IN") : "recently"}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEditBanner(banner)}>
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDeleteBanner(banner._id)}>
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Blogs Tab */}
          <TabsContent value="blogs">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {editingBlog ? (
                      <>
                        <Edit className="h-5 w-5" />
                        Edit Blog: {editingBlog.title}
                      </>
                    ) : (
                      <>
                        <Plus className="h-5 w-5" />
                        Add Blog Post
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBlogSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="blog-title">Title</Label>
                      <Input
                        id="blog-title"
                        value={blogForm.title}
                        onChange={(e) => handleBlogInputChange("title", e.target.value)}
                        placeholder="Enter blog title"
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>Content (Paragraphs)</Label>
                      {contentParagraphs.map((paragraph, index) => (
                        <div key={index} className="flex gap-2 items-start">
                          <div className="flex-1 space-y-2">
                            <div className="relative">
                              <Textarea
                                id={`paragraph-${index}`}
                                value={paragraph}
                                onChange={(e) => handleParagraphChange(index, e.target.value)}
                                placeholder={`Paragraph ${index + 1}`}
                                rows={4}
                                className="min-h-[100px] pr-12"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-gray-100"
                                onClick={() => toggleBold(index)}
                                title="Bold Text"
                              >
                                <Bold className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="pt-2">
                            {contentParagraphs.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeParagraph(index)}
                                className="h-9 w-9 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addParagraph}
                        className="w-full border-dashed"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Paragraph
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="blog-cover">Image Link</Label>
                      <Input
                        id="blog-cover"
                        value={blogForm.coverImage}
                        onChange={(e) => handleBlogInputChange("coverImage", e.target.value)}
                        placeholder="https://example.com/blog-cover.jpg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="blog-date">Date</Label>
                      <Input
                        id="blog-date"
                        type="date"
                        value={blogForm.publishedAt}
                        onChange={(e) => handleBlogInputChange("publishedAt", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="blog-category">Category</Label>
                      <Input
                        id="blog-category"
                        value={blogForm.category}
                        onChange={(e) => handleBlogInputChange("category", e.target.value)}
                        placeholder="e.g., Engineering Insights"
                        required
                      />
                    </div>

                    {editingBlog && (
                      <Button type="button" variant="outline" className="w-full" onClick={cancelBlogEdit}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel Editing
                      </Button>
                    )}

                    <Button type="submit" disabled={submittingBlog} className="w-full">
                      {submittingBlog ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Publish Blog
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Recent Blogs
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Manage published insights and announcements.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={fetchBlogs} disabled={loadingBlogs}>
                    <Loader2 className={`h-4 w-4 mr-2 ${loadingBlogs ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </CardHeader>
                <CardContent>
                  {loadingBlogs ? (
                    <div className="flex items-center justify-center py-10 text-gray-500">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      Loading blogs...
                    </div>
                  ) : blogs.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      No blog posts yet. Create your first article using the form.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {blogs.map((blog) => {
                        const previewSource = (blog.content && blog.content.trim().length > 0 ? blog.content : (blog as any).excerpt || "") || ""
                        const preview = previewSource.length > 200 ? `${previewSource.slice(0, 200)}…` : previewSource
                        const formattedDate = blog.publishedAt
                          ? new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                          : "Unpublished"

                        return (
                          <div key={blog._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <p className="text-xs uppercase tracking-[0.3em] text-[#A02222] font-semibold mb-2">
                                  {blog.category}
                                </p>
                                <h3 className="text-lg font-semibold text-[#2E1F44] break-words">{blog.title}</h3>
                                <p className="text-sm text-[#2E1F44]/70 mt-2 whitespace-pre-line break-words">{preview}</p>
                                <div className="flex flex-wrap items-center gap-4 text-xs text-[#2E1F44]/60 mt-3">
                                  <span>{formattedDate}</span>
                                  {blog.coverImage && (
                                    <a
                                      href={blog.coverImage}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-[#A02222] hover:underline break-all"
                                    >
                                      {blog.coverImage}
                                    </a>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-row lg:flex-col gap-2 shrink-0">
                                <Button variant="outline" size="sm" onClick={() => handleEditBlog(blog)}>
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteBlog(blog._id)}>
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card className="bg-white shadow-md">
              <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Inbox className="h-5 w-5" />
                    Job Applications
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Review and export submissions received from the careers page.</p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchApplications} disabled={loadingApplications}>
                  <Loader2 className={`h-4 w-4 mr-2 ${loadingApplications ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                {loadingApplications ? (
                  <div className="flex items-center justify-center py-10 text-gray-500">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    Loading applications...
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 border border-dashed border-gray-200 rounded-xl">
                    No applications received yet. Completed forms on the careers page will appear here.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((application) => (
                      <div key={application._id} className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-[#2E1F44]">{application.name}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-[#2E1F44]/70">
                              <span className="flex items-center gap-2">
                                <LinkIcon className="h-4 w-4" />
                                <a
                                  href={`mailto:${application.email}`}
                                  className="text-[#A02222] hover:underline"
                                >
                                  {application.email}
                                </a>
                              </span>
                              <span>{application.phone}</span>
                              {application.location && <span>{application.location}</span>}
                            </div>
                            {application.openingTitle && (
                              <p className="text-xs uppercase tracking-[0.3em] text-[#A02222] font-semibold">
                                Applied For: {application.openingTitle}
                              </p>
                            )}
                            {application.employmentType && (
                              <Badge variant="outline" className="text-xs">
                                {application.employmentType}
                              </Badge>
                            )}
                            <div className="flex items-center gap-3 text-sm">
                              <a
                                href={application.resumeUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-[#A02222] hover:text-[#2E1F44] font-semibold"
                              >
                                View CV
                                <ArrowRight className="h-4 w-4" />
                              </a>
                              <span className="text-[#2E1F44]/60">
                                Submitted {application.createdAt ? new Date(application.createdAt).toLocaleString("en-IN") : "recently"}
                              </span>
                            </div>
                            {application.coverLetter && (
                              <p className="text-sm text-[#2E1F44]/60 leading-relaxed">{application.coverLetter}</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteApplication(application._id)}>
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Management Tab */}
          <TabsContent value="contacts">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {editingContact ? (
                      <>
                        <Edit className="h-5 w-5" />
                        Edit Contact: {editingContact.name}
                      </>
                    ) : (
                      <>
                        <Phone className="h-5 w-5" />
                        Add Contact
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="contact-title">Title</Label>
                      <Input
                        id="contact-title"
                        value={contactForm.title}
                        onChange={(e) => handleContactInputChange("title", e.target.value)}
                        placeholder="e.g., Mr., Mrs., Ms."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Name</Label>
                      <Input
                        id="contact-name"
                        value={contactForm.name}
                        onChange={(e) => handleContactInputChange("name", e.target.value)}
                        placeholder="e.g., John Doe"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-designation">Designation</Label>
                      <Input
                        id="contact-designation"
                        value={contactForm.designation}
                        onChange={(e) => handleContactInputChange("designation", e.target.value)}
                        placeholder="e.g., Founder & Managing Director"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-tel">Telephone</Label>
                        <Input
                          id="contact-tel"
                          value={contactForm.tel}
                          onChange={(e) => handleContactInputChange("tel", e.target.value)}
                          placeholder="e.g., +971 58 871 3064"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Email</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => handleContactInputChange("email", e.target.value)}
                          placeholder="e.g., sales@srkbolt.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-type">Type</Label>
                      <Select
                        value={contactForm.type}
                        onValueChange={(value) => handleContactInputChange("type", value)}
                      >
                        <SelectTrigger id="contact-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="purchase">Purchase</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-image">Image URL</Label>
                      <div className="flex gap-2">
                        <Input
                          id="contact-image"
                          value={contactForm.image}
                          onChange={(e) => handleContactInputChange("image", e.target.value)}
                          placeholder="Enter image URL or upload"
                          className="flex-1"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleContactImageUpload}
                          className="hidden"
                          id="contact-image-upload"
                          disabled={uploadingContactImage}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          disabled={uploadingContactImage}
                          className="whitespace-nowrap"
                          onClick={() => {
                            const fileInput = document.getElementById('contact-image-upload') as HTMLInputElement
                            fileInput?.click()
                          }}
                        >
                          {uploadingContactImage ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="h-4 w-4 mr-2" />
                              Upload
                            </>
                          )}
                        </Button>
                      </div>
                      {contactForm.image && (
                        <div className="mt-3">
                          <img
                            src={contactForm.image}
                            alt="Contact preview"
                            className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {editingContact && (
                      <Button type="button" variant="outline" className="w-full" onClick={cancelContactEdit}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel Editing
                      </Button>
                    )}

                    <Button type="submit" disabled={submittingContact} className="w-full">
                      {submittingContact ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          {editingContact ? "Update Contact" : "Add Contact"}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Contact List
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">Manage contacts for the Contact Us page.</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={fetchContacts} disabled={loadingContacts}>
                    <Loader2 className={`h-4 w-4 mr-2 ${loadingContacts ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </CardHeader>
                <CardContent>
                  {loadingContacts ? (
                    <div className="flex items-center justify-center py-10 text-gray-500">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      Loading contacts...
                    </div>
                  ) : contacts.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 border border-dashed border-gray-200 rounded-xl">
                      No contacts added yet. Add your first contact using the form on the left.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {contacts.map((contact) => (
                        <div key={contact._id} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex gap-4 flex-1">
                              {contact.image && (
                                <img
                                  src={contact.image}
                                  alt={contact.name}
                                  className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.style.display = 'none'
                                  }}
                                />
                              )}
                              <div className="space-y-1 flex-1">
                                <h3 className="text-lg font-semibold text-[#2E1F44]">
                                  {contact.title} {contact.name}
                                </h3>
                                <p className="text-sm text-blue-600 font-semibold">{contact.designation}</p>
                                <div className="flex flex-wrap gap-4 text-xs text-[#2E1F44]/70 mt-2">
                                  <span>{contact.tel}</span>
                                  <a
                                    href={`mailto:${contact.email}`}
                                    className="text-[#A02222] hover:underline"
                                  >
                                    {contact.email}
                                  </a>
                                </div>
                                <Badge variant="outline" className="text-xs mt-2">
                                  {contact.type === "sales" ? "Sales" : "Purchase"}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex flex-row lg:flex-col gap-2 shrink-0">
                              <Button variant="outline" size="sm" onClick={() => handleEditContact(contact)}>
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDeleteContact(contact._id)}>
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
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

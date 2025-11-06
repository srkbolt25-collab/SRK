"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Layout from "@/components/Layout"
import { useRFQ } from "@/contexts/RFQContext"
import { MapPin, CheckCircle, Trash2, Plus, Minus } from "lucide-react"

export default function RFQPage() {
  const { rfqProducts, removeFromRFQ, updateQuantity, clearRFQ } = useRFQ()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    companyName: "",
    country: "United Arab Emirates",
    city: "",
    mobileNumber: "",
    comments: "",
  })
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.address || !formData.mobileNumber) {
      alert("Please fill in all required fields")
      return
    }

    if (rfqProducts.length === 0) {
      alert("Please add at least one product to your RFQ")
      return
    }

    try {
      // Store the enquiry in database
      const response = await fetch('/api/rfq-enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          address: formData.address,
          companyName: formData.companyName,
          country: formData.country,
          city: formData.city,
          mobileNumber: formData.mobileNumber,
          comments: formData.comments,
          products: rfqProducts
        }),
      })

      if (response.ok) {
        // Show success modal
        setShowSuccessModal(true)
        // Clear form and RFQ immediately (don't wait)
        setFormData({
          fullName: "",
          email: "",
          address: "",
          companyName: "",
          country: "United Arab Emirates",
          city: "",
          mobileNumber: "",
          comments: "",
        })
        clearRFQ()
      } else {
        alert("Failed to submit enquiry. Please try again.")
      }
    } catch (error) {
      console.error('Error submitting RFQ:', error)
      alert("An error occurred. Please try again.")
    }
  }

  const closeModal = () => {
    setShowSuccessModal(false)
  }

  return (
    <Layout>
      <div className="pt-8 pb-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Check out</h1>
            <p className="text-gray-600">Complete your Request for Quotation</p>
          </div>

          {rfqProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Products Added</h2>
              <p className="text-gray-600 mb-6">
                You haven't added any products to your RFQ yet. Please add products from the catalogue to proceed.
              </p>
              <Button
                onClick={() => window.location.href = '/'}
                className="bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-bold px-8"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Address Section */}
                  <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="bg-gray-700 text-white px-6 py-4 rounded-lg mb-6 -m-8">
                      <h2 className="text-lg font-bold flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Address
                      </h2>
                    </div>

                    {/* Full Name and Email */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Full Name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="youremail@example.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address - Bldg No. / Landmark / Street"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                    </div>

                    {/* Company Name, Country, City */}
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="Company Name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <option>United Arab Emirates</option>
                          <option>Saudi Arabia</option>
                          <option>Kuwait</option>
                          <option>Bahrain</option>
                          <option>Qatar</option>
                          <option>Oman</option>
                          <option>Egypt</option>
                          <option>India</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="City"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Mobile Number and Comments */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mobile Number <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="tel"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          placeholder="Mobile Number"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Comments
                        </label>
                        <input
                          type="text"
                          name="comments"
                          value={formData.comments}
                          onChange={handleChange}
                          placeholder="Comments"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Right: Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-8 sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Summary</h2>

                  {/* Products List */}
                  <div className="border-b pb-6 mb-6 space-y-4 max-h-96 overflow-y-auto">
                    {rfqProducts.map((product) => (
                      <div key={product.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-14 h-14 object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2 line-clamp-2">{product.name}</p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(product.id, product.quantity - 1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="text-sm font-medium w-8 text-center">{product.quantity}</span>
                            <button
                              onClick={() => updateQuantity(product.id, product.quantity + 1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => removeFromRFQ(product.id)}
                              className="ml-auto p-1 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Info */}
                  <div className="space-y-3 mb-6 pb-6 border-b">
                    <div className="flex justify-between text-gray-600">
                      <span>Total Items</span>
                      <span className="font-bold text-gray-900">{rfqProducts.reduce((sum, p) => sum + p.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-bold mb-3"
                  >
                    PLACE ENQUIRE
                  </Button>
                  <Button
                    onClick={() => window.location.href = '/'}
                    variant="outline"
                    className="w-full border-red-600 text-red-600 hover:bg-red-50 py-3 text-lg font-bold"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
            <div className="mb-6 flex justify-center">
              <CheckCircle className="w-24 h-24 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Enquiry Placed Successfully!
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              Thank you for your request
            </p>
            <p className="text-gray-500 text-sm mb-8">
              We have received your quotation request for {rfqProducts.reduce((sum, p) => sum + p.quantity, 0)} product(s). Our team will contact you shortly with the pricing and availability information.
            </p>

            {/* Continue Shopping Button */}
            <Button
              onClick={() => {
                closeModal()
                window.location.href = '/'
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-bold"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      )}
    </Layout>
  )
}

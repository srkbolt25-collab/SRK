"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/contexts/ToastContext"
import { Lock, User, Eye, EyeOff, Shield } from "lucide-react"

const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "srk@bolt@2026*#"

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const goToDashboard = () => {
    // Use a hard navigation instead of router.push so redirect works even if
    // the deployed client bundle/router is stale or stuck after toast render.
    window.location.href = "/admin-dashboard"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.username || !formData.password) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" })
      return
    }

    setLoading(true)

    const username = formData.username.trim()
    const password = formData.password

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const session = Date.now().toString()
      localStorage.setItem("adminLoggedIn", "true")
      localStorage.setItem("adminSession", session)
      sessionStorage.setItem("adminLoggedIn", "true")
      sessionStorage.setItem("adminSession", session)

      toast({
        title: "Success",
        description: "Login successful! Opening dashboard...",
        variant: "success",
      })

      setTimeout(goToDashboard, 250)
      return
    }

    // Also support server/env based login if the API route is present.
    try {
      const response = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      const result = await response.json().catch(() => null)

      if (response.ok && result?.success) {
        const session = result.session || Date.now().toString()
        localStorage.setItem("adminLoggedIn", "true")
        localStorage.setItem("adminSession", session)
        sessionStorage.setItem("adminLoggedIn", "true")
        sessionStorage.setItem("adminSession", session)

        toast({
          title: "Success",
          description: "Login successful! Opening dashboard...",
          variant: "success",
        })

        setTimeout(goToDashboard, 250)
        return
      }
    } catch {
      // direct login already checked above; show invalid credentials below
    } finally {
      setLoading(false)
    }

    toast({ title: "Error", description: "Invalid username or password", variant: "destructive" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="mb-6 flex justify-center">
            <img src="/image-removebg-preview (15).png" alt="SRK Bolt Logo" className="h-20 w-auto" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">SRK BOLT</h1>
          <div className="flex items-center justify-center gap-2 text-white/90 mb-4">
            <Shield className="h-5 w-5" />
            <p className="text-lg font-semibold">Admin Portal</p>
          </div>
          <p className="text-white/80 text-sm">Industrial Fasteners Management System</p>
        </div>

        <Card className="bg-white shadow-2xl border-0">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lock className="h-6 w-6 text-red-600" />
              <CardTitle className="text-2xl font-bold text-gray-900">Admin Login</CardTitle>
            </div>
            <p className="text-gray-600 text-sm">Enter your credentials to access the dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 font-medium">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input id="username" type="text" value={formData.username} onChange={(e) => handleInputChange("username", e.target.value)} placeholder="Enter username" className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input id="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} placeholder="Enter password" className="pl-10 pr-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors" aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm">© 2026 SRK BOLT. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

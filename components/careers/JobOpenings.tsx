"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Upload, ArrowRight } from "lucide-react"

type Opening = {
  id: string
  title: string
  employmentType: string
  location: string
  experience: string
  description: string
  iconElement: React.ReactNode
  gradient: string
}

type JobOpeningsProps = {
  openings: Opening[]
}

type FormState = {
  name: string
  email: string
  phone: string
  resumeFile: File | null
  coverLetter: string
}

const initialFormState: FormState = {
  name: "",
  email: "",
  phone: "",
  resumeFile: null,
  coverLetter: "",
}

export function JobOpeningsGrid({ openings }: JobOpeningsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedOpening, setSelectedOpening] = useState<Opening | null>(null)
  const [formState, setFormState] = useState<FormState>(initialFormState)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const handleApplyClick = (opening: Opening) => {
    setSelectedOpening(opening)
    setFeedback(null)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    if (submitting) return
    setIsDialogOpen(false)
    setSelectedOpening(null)
    setFormState(initialFormState)
    setFeedback(null)
  }

  const handleInputChange = (field: keyof FormState, value: string | File | null) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const uploadResume = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    const response = await fetch("/api/applications/upload", { method: "POST", body: formData })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to upload resume")
    }
    const data = await response.json()
    return data.fileUrl as string
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting || !selectedOpening) return

    if (!formState.name.trim() || !formState.email.trim() || !formState.phone.trim() || !formState.resumeFile) {
      setFeedback({ type: "error", message: "Please complete all required fields and attach your CV." })
      return
    }

    try {
      setSubmitting(true)
      setFeedback(null)

      const resumeUrl = await uploadResume(formState.resumeFile)

      const payload = {
        name: formState.name.trim(),
        email: formState.email.trim(),
        phone: formState.phone.trim(),
        coverLetter: formState.coverLetter.trim(),
        resumeUrl,
        openingId: selectedOpening.id,
        openingTitle: selectedOpening.title,
        employmentType: selectedOpening.employmentType,
        location: selectedOpening.location,
      }

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit application")
      }

      setFeedback({ type: "success", message: "Application submitted successfully! Our HR team will connect with you soon." })
      setFormState(initialFormState)
    } catch (error) {
      console.error("Error submitting application:", error)
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to submit application. Please try again.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        {openings.length === 0 ? (
          <div className="md:col-span-2 text-center py-12 border border-dashed border-gray-200 rounded-2xl">
            <h3 className="text-xl font-semibold text-gray-700">No openings available right now</h3>
            <p className="mt-2 text-gray-500">
              We&apos;re not actively hiring for new roles. Check back soon or drop us your CV at{" "}
              <a href="mailto:careers@srkbolt.com" className="text-[#A02222] font-semibold">
                careers@srkbolt.com
              </a>
              .
            </p>
          </div>
        ) : (
          openings.map((job) => (
            <div
              key={job.id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200 transform hover:-translate-y-2"
            >
              <div className={`h-1 bg-linear-to-r ${job.gradient}`}></div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-linear-to-br ${job.gradient} text-white`}>{job.iconElement}</div>
                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                    {job.employmentType}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-2">{job.description}</p>

                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-semibold">LOCATION</p>
                    <p className="text-gray-900 font-semibold">{job.location}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-semibold">EXPERIENCE</p>
                    <p className="text-gray-900 font-semibold">{job.experience}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleApplyClick(job)}
                  className="w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => (open ? null : closeDialog())}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Apply for {selectedOpening?.title}</DialogTitle>
            <DialogDescription>
              Share your details below and our HR team will contact you for the next steps.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="applicant-name">Full Name</Label>
              <Input
                id="applicant-name"
                value={formState.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="applicant-email">Email</Label>
                <Input
                  id="applicant-email"
                  type="email"
                  value={formState.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="applicant-phone">Contact Number</Label>
                <Input
                  id="applicant-phone"
                  value={formState.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+971 58 871 3064"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="applicant-resume">Upload CV/Resume (PDF, DOC, DOCX)</Label>
              <Input
                id="applicant-resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleInputChange("resumeFile", e.target.files?.[0] ?? null)}
                required
              />
            </div>
            <div>
              <Label htmlFor="applicant-cover-letter">Cover Letter (Optional)</Label>
              <Textarea
                id="applicant-cover-letter"
                value={formState.coverLetter}
                onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                placeholder="Share a short introduction or message for our team."
                rows={4}
              />
            </div>

            {feedback && (
              <div
                className={`rounded-lg px-4 py-3 text-sm ${
                  feedback.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-red-50 text-red-700 border border-red-100"
                }`}
              >
                {feedback.message}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={closeDialog} disabled={submitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}


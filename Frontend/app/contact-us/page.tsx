"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon!",
        variant: "success",
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="transition-all hover:border-emerald-400">
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>
              We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="transition-all focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="transition-all focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="transition-all focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={5}
                    required
                    className="transition-all focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full transition-all hover:bg-emerald-600" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="transition-all hover:border-emerald-400">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">
                    123 Sustainability Street
                    <br />
                    Green City, EC0 123
                    <br />
                    Earth
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-emerald-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">
                    info@enviromind.com
                    <br />
                    support@enviromind.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-emerald-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">
                    +1 (555) 123-4567
                    <br />
                    +1 (555) 765-4321
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:border-emerald-400">
            <CardHeader>
              <CardTitle>Office Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

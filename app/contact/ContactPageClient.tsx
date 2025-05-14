"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Clock } from "lucide-react"

export default function ContactPageClient() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card
          className="border-2 border-transparent hover:border-green-600 focus-within:border-green-600 transition-colors duration-300"
          tabIndex={0}
        >
          <CardHeader className="text-center">
            <MapPin className="mx-auto h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Our Location</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>123 Sustainability Street</p>
            <p>Eco District, Green City</p>
            <p>EC0 123, Earth</p>
          </CardContent>
        </Card>

        <Card
          className="border-2 border-transparent hover:border-green-600 focus-within:border-green-600 transition-colors duration-300"
          tabIndex={0}
        >
          <CardHeader className="text-center">
            <Phone className="mx-auto h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Phone & Email</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>+1 (555) 123-4567</p>
            <p className="mt-2">info@enviromind.org</p>
            <p>support@enviromind.org</p>
          </CardContent>
        </Card>

        <Card
          className="border-2 border-transparent hover:border-green-600 focus-within:border-green-600 transition-colors duration-300"
          tabIndex={0}
        >
          <CardHeader className="text-center">
            <Clock className="mx-auto h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Working Hours</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>Monday - Friday: 9am - 6pm</p>
            <p>Saturday: 10am - 4pm</p>
            <p>Sunday: Closed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card
          className="border-2 border-transparent hover:border-green-600 focus-within:border-green-600 transition-colors duration-300"
          tabIndex={0}
        >
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>Have questions or feedback? We'd love to hear from you!</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Message subject" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message" rows={5} />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card
          className="border-2 border-transparent hover:border-green-600 focus-within:border-green-600 transition-colors duration-300"
          tabIndex={0}
        >
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Check our FAQ section for quick answers to common questions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">How do I create an account?</h3>
              <p className="text-muted-foreground">
                You can create an account by clicking the "Sign Up" button on our homepage and following the
                registration process.
              </p>
            </div>

            <div>
              <h3 className="font-medium">How can I track my sustainability progress?</h3>
              <p className="text-muted-foreground">
                Your dashboard displays personalized impact metrics that track your environmental footprint based on
                your activities.
              </p>
            </div>

            <div>
              <h3 className="font-medium">Are the tools available on mobile devices?</h3>
              <p className="text-muted-foreground">
                Yes, EnviroMind is fully responsive and works on all devices. We also offer dedicated mobile apps for
                iOS and Android.
              </p>
            </div>

            <div>
              <h3 className="font-medium">How can I partner with EnviroMind?</h3>
              <p className="text-muted-foreground">
                For partnership inquiries, please email partners@enviromind.org with details about your organization and
                collaboration ideas.
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => (window.location.href = "/frequently-asked-questions")}
            >
              View All FAQs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

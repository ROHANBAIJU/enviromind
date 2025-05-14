"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Users, Heart, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"

const jobOpenings = [
  {
    id: "job-1",
    title: "Sustainability Specialist",
    department: "Research & Development",
    location: "Remote",
    type: "Full-time",
    description:
      "Join our team to develop and implement sustainability strategies that align with SDG goals. You'll work on research, analysis, and creating educational content for our platform.",
  },
  {
    id: "job-2",
    title: "Frontend Developer",
    department: "Engineering",
    location: "Hybrid",
    type: "Full-time",
    description:
      "Help build and improve our user interface with a focus on creating engaging, accessible, and responsive experiences that promote sustainable actions.",
  },
  {
    id: "job-3",
    title: "Content Creator",
    department: "Marketing",
    location: "Remote",
    type: "Part-time",
    description:
      "Create compelling content about sustainability, environmental awareness, and SDGs to educate and inspire our users to take action.",
  },
  {
    id: "job-4",
    title: "Community Manager",
    department: "User Engagement",
    location: "Remote",
    type: "Full-time",
    description:
      "Build and nurture our community of environmentally conscious users, organize events, and facilitate discussions around sustainability topics.",
  },
]

export default function WorkWithUsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Work With Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join our mission to create a more sustainable world through innovation, education, and community engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card className="bg-gradient-to-br from-emerald-950 to-emerald-900 border-emerald-800 transition-all hover:border-emerald-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-emerald-400" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We're dedicated to promoting sustainable development goals and empowering individuals to make
              environmentally conscious choices that positively impact our planet.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-950 to-emerald-900 border-emerald-800 transition-all hover:border-emerald-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-400" />
              Our Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We're a diverse group of passionate individuals committed to environmental sustainability, innovation, and
              creating meaningful change through technology.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-950 to-emerald-900 border-emerald-800 transition-all hover:border-emerald-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-emerald-400" />
              Our Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Sustainability, integrity, innovation, inclusivity, and collaboration guide everything we do as we work
              together to build a better future for our planet.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-emerald-500" />
          Current Openings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobOpenings.map((job) => (
            <Card key={job.id} className="overflow-hidden transition-all hover:border-emerald-400">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle>{job.title}</CardTitle>
                  <Badge variant="outline" className="bg-emerald-950 text-emerald-300 border-emerald-800">
                    {job.type}
                  </Badge>
                </div>
                <CardDescription className="flex flex-wrap gap-2 mt-1">
                  <span>{job.department}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-muted-foreground">{job.description}</p>
              </CardContent>
              <div className="px-6 pb-6">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/work-with-us/${job.id}`}>
                    <span className="flex items-center justify-center gap-2">
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="max-w-3xl mx-auto bg-gradient-to-r from-emerald-950 to-slate-900 border-emerald-800 transition-all hover:border-emerald-400">
        <CardHeader>
          <CardTitle>Don't see a role that fits?</CardTitle>
          <CardDescription>
            We're always looking for talented individuals who are passionate about sustainability.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            If you're passionate about our mission and believe you can contribute to our team, we'd love to hear from
            you. Send us your resume and tell us how you can help us create a more sustainable world.
          </p>
          <Button asChild>
            <Link href="/contact-us">
              <span className="flex items-center gap-2">
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

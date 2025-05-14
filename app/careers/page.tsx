import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Users, Briefcase, GraduationCap, Heart, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Work With Us | EnviroMind",
  description: "Join the EnviroMind team and help build a more sustainable future.",
}

export default function CareersPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Work With Us</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Join our team of passionate individuals dedicated to creating innovative solutions for a sustainable future.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="text-center">
          <CardHeader>
            <Users className="h-12 w-12 mx-auto text-green-600 mb-2" />
            <CardTitle>Collaborative Culture</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Work with diverse, talented teams in an inclusive environment that values every voice and perspective.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Heart className="h-12 w-12 mx-auto text-green-600 mb-2" />
            <CardTitle>Meaningful Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Contribute to projects that make a real difference in addressing global environmental challenges.</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <GraduationCap className="h-12 w-12 mx-auto text-green-600 mb-2" />
            <CardTitle>Growth & Development</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Access continuous learning opportunities, mentorship programs, and career advancement paths.</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="full-time" className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
          <TabsList className="inline-flex">
            <TabsTrigger value="full-time">Full-Time</TabsTrigger>
            <TabsTrigger value="internships">Internships</TabsTrigger>
            <TabsTrigger value="remote">Remote</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="full-time" className="space-y-6">
          <JobCard
            title="Senior Sustainability Analyst"
            department="Research & Development"
            location="Green City, EC"
            type="Full-Time"
            description="Lead research initiatives to develop new sustainability metrics and assessment methodologies for our platform."
            requirements={[
              "Master's degree in Environmental Science, Sustainability, or related field",
              "5+ years of experience in sustainability analysis or environmental consulting",
              "Strong data analysis skills and experience with sustainability reporting frameworks",
              "Excellent communication and project management abilities",
            ]}
          />

          <JobCard
            title="Full Stack Developer"
            department="Engineering"
            location="Green City, EC"
            type="Full-Time"
            description="Build and maintain features across our platform, focusing on creating intuitive user experiences for sustainability tools."
            requirements={[
              "3+ years of experience with modern web development frameworks (React, Next.js)",
              "Strong understanding of frontend and backend technologies",
              "Experience with database design and API development",
              "Passion for creating accessible and responsive web applications",
            ]}
          />

          <JobCard
            title="Environmental Data Scientist"
            department="Data & Analytics"
            location="Green City, EC"
            type="Full-Time"
            description="Analyze environmental datasets to generate insights and develop predictive models for our sustainability tools."
            requirements={[
              "PhD or Master's degree in Data Science, Environmental Science, or related field",
              "Experience with machine learning and statistical analysis",
              "Proficiency in Python, R, or similar data analysis tools",
              "Background in environmental data analysis and visualization",
            ]}
          />
        </TabsContent>

        <TabsContent value="internships" className="space-y-6">
          <JobCard
            title="Sustainability Research Intern"
            department="Research & Development"
            location="Green City, EC"
            type="Internship (6 months)"
            description="Support research projects focused on developing new sustainability metrics and assessment methodologies."
            requirements={[
              "Currently pursuing a degree in Environmental Science, Sustainability, or related field",
              "Strong analytical skills and attention to detail",
              "Familiarity with sustainability concepts and environmental issues",
              "Excellent written and verbal communication skills",
            ]}
          />

          <JobCard
            title="Web Development Intern"
            department="Engineering"
            location="Green City, EC"
            type="Internship (3-6 months)"
            description="Assist in developing and testing new features for our sustainability platform."
            requirements={[
              "Currently pursuing a degree in Computer Science or related field",
              "Knowledge of HTML, CSS, JavaScript, and React",
              "Familiarity with version control systems (Git)",
              "Passion for creating user-friendly web applications",
            ]}
          />
        </TabsContent>

        <TabsContent value="remote" className="space-y-6">
          <JobCard
            title="Remote UX/UI Designer"
            department="Design"
            location="Remote"
            type="Full-Time"
            description="Create intuitive and engaging user experiences for our sustainability tools and platform."
            requirements={[
              "3+ years of experience in UX/UI design for web applications",
              "Proficiency with design tools (Figma, Adobe XD)",
              "Portfolio demonstrating user-centered design approach",
              "Experience with responsive design and accessibility standards",
            ]}
          />

          <JobCard
            title="Remote Content Specialist"
            department="Marketing"
            location="Remote"
            type="Full-Time"
            description="Develop engaging content about sustainability topics for our platform, blog, and social media channels."
            requirements={[
              "Bachelor's degree in Environmental Science, Communications, or related field",
              "2+ years of experience in content creation or environmental communications",
              "Excellent writing skills and ability to explain complex topics clearly",
              "Knowledge of SEO best practices and content management systems",
            ]}
          />
        </TabsContent>
      </Tabs>

      <Card className="mb-16">
        <CardHeader>
          <CardTitle className="text-2xl">Benefits & Perks</CardTitle>
          <CardDescription>
            We offer a comprehensive benefits package to support your wellbeing and professional growth.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium">Competitive Compensation</h3>
                <p className="text-muted-foreground">Salary packages that recognize your skills and experience</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium">Health & Wellness</h3>
                <p className="text-muted-foreground">Comprehensive health insurance and wellness programs</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium">Flexible Work Arrangements</h3>
                <p className="text-muted-foreground">Options for remote work and flexible scheduling</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium">Professional Development</h3>
                <p className="text-muted-foreground">Learning stipends and career growth opportunities</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium">Paid Time Off</h3>
                <p className="text-muted-foreground">Generous vacation policy and paid holidays</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium">Sustainability Initiatives</h3>
                <p className="text-muted-foreground">Support for your personal environmental projects</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Don't See a Perfect Fit?</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
          We're always looking for talented individuals who are passionate about sustainability. Send us your resume and
          tell us how you can contribute to our mission.
        </p>
        <Button size="lg" className="bg-green-600 hover:bg-green-700">
          Submit Your Application
        </Button>
      </div>
    </div>
  )
}

interface JobCardProps {
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
}

function JobCard({ title, department, location, type, description, requirements }: JobCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap justify-between items-start gap-2">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-2 mt-1">
              <span className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1" /> {department}
              </span>
              <span className="flex items-center ml-4">
                <MapPin className="h-4 w-4 mr-1" /> {location}
              </span>
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{description}</p>
        <div>
          <h4 className="font-medium mb-2">Requirements:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-green-600 hover:bg-green-700">Apply Now</Button>
      </CardFooter>
    </Card>
  )
}

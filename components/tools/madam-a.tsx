"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, BookOpen, Search, Clock, Award, Play, CheckCircle, ArrowRight, Download } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface MadamAToolProps {
  onClose?: () => void
}

interface Course {
  id: string
  title: string
  description: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  sdgGoals: number[]
  image: string
  progress?: number
  completed?: boolean
  moduleCount?: number
}

interface Certificate {
  id: string
  courseId: string
  courseTitle: string
  completionDate: string
  image: string
}

// Certificates data
const certificates: Certificate[] = [
  {
    id: "cert-1",
    courseId: "course-1",
    courseTitle: "Introduction to Sustainable Development",
    completionDate: "2025-04-15",
    image: "/placeholder.svg?height=600&width=800",
  },
]

export default function MadamATool({ onClose }: MadamAToolProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [showCertificates, setShowCertificates] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null)
  const [downloadFormat, setDownloadFormat] = useState<"pdf" | "image">("pdf")
  const [coursesState, setCoursesState] = useState<Course[]>([
    {
      id: "course-1",
      title: "Introduction to Sustainable Development",
      description:
        "Learn the fundamentals of sustainable development and how the SDGs provide a framework for global action.",
      duration: "2 hours",
      level: "Beginner",
      sdgGoals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      image: "/course1.png?key=ahvl2",
      progress: 100,
      completed: true,
    },
    {
      id: "course-2",
      title: "Climate Action Fundamentals",
      description:
        "Understand climate change science, impacts, and the actions needed to combat this global challenge.",
      duration: "3 hours",
      level: "Beginner",
      sdgGoals: [13, 7, 11, 12],
      image: "/course2.png?key=lqvcb",
      progress: 65,
    },
    {
      id: "course-3",
      title: "Sustainable Cities and Communities",
      description: "Explore how urban planning and community development can contribute to sustainability goals.",
      duration: "2.5 hours",
      level: "Intermediate",
      sdgGoals: [11, 6, 7, 9, 13],
      image: "/course3.png?key=3uils",
      progress: 0,
    },
    {
      id: "course-4",
      title: "Clean Water and Sanitation",
      description: "Learn about water conservation, management, and technologies for clean water access.",
      duration: "2 hours",
      level: "Beginner",
      sdgGoals: [6, 3, 14],
      image: "/course4.png?key=6w1hp",
      progress: 0,
    },
    {
      id: "course-5",
      title: "Responsible Consumption and Production",
      description: "Discover sustainable practices for resource use, waste reduction, and circular economy principles.",
      duration: "3 hours",
      level: "Intermediate",
      sdgGoals: [12, 9, 11, 13, 14, 15],
      image: "/course5.png?key=t71aa",
      progress: 0,
    },
    {
      id: "course-6",
      title: "Gender Equality in Sustainable Development",
      description: "Understand the critical role of gender equality in achieving all sustainable development goals.",
      duration: "2 hours",
      level: "Intermediate",
      sdgGoals: [5, 1, 3, 4, 8, 10, 16],
      image: "/course6.png?height=300&width=500&query=gender+equality+diverse+women+leadership+empowerment",
      progress: 0,
    },
    {
      id: "course-7",
      title: "Biodiversity and Ecosystem Conservation",
      description: "Learn about protecting terrestrial and marine ecosystems and preserving biodiversity.",
      duration: "3.5 hours",
      level: "Advanced",
      sdgGoals: [14, 15, 13, 6],
      image: "/course7.png?height=300&width=500&query=biodiversity+wildlife+conservation+coral+reef+forest",
      progress: 0,
    },
    {
      id: "course-8",
      title: "Sustainable Agriculture and Food Systems",
      description: "Explore practices for sustainable food production, distribution, and consumption.",
      duration: "3 hours",
      level: "Intermediate",
      sdgGoals: [2, 12, 13, 15],
      image: "/course8.png?height=300&width=500&query=organic+farming+sustainable+agriculture+crops+field",
      progress: 0,
    },
  ])
  const [userCertificates, setUserCertificates] = useState<Certificate[]>(certificates)

  useEffect(() => {
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0)
  }, [])

  const router = useRouter()

  // Default onClose implementation
  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      try {
        router.push("/dashboard")
        // Fallback in case router.push fails
        setTimeout(() => {
          if (window.location.pathname !== "/dashboard") {
            window.location.href = "/dashboard"
          }
        }, 500)
      } catch (error) {
        console.error("Navigation error:", error)
        window.location.href = "/dashboard"
      }
    }
  }

  const completeCourse = (courseId: string) => {
    // Update the course as completed
    setCoursesState((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              progress: 100,
              completed: true,
            }
          : course,
      ),
    )

    // Check if certificate already exists
    const certificateExists = userCertificates.some((cert) => cert.courseId === courseId)

    // Generate a certificate if it doesn't exist
    if (!certificateExists) {
      const course = coursesState.find((c) => c.id === courseId)
      if (course) {
        const newCertificate: Certificate = {
          id: `cert-${Date.now()}`,
          courseId: course.id,
          courseTitle: course.title,
          completionDate: new Date().toISOString().split("T")[0],
          image: "/placeholder.svg?height=600&width=800&text=Certificate+for+" + encodeURIComponent(course.title),
        }
        setUserCertificates((prev) => [...prev, newCertificate])

        // Show success message
        toast({
          title: "Certificate Earned!",
          description: `You've completed "${course.title}" and earned a certificate.`,
          variant: "success",
        })
      }
    }
  }

  const updateCourseProgress = (courseId: string, newProgress: number) => {
    setCoursesState((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              progress: newProgress,
              completed: newProgress === newProgress,
            }
          : course,
      ),
    )

    // If course is completed, generate certificate
    if (newProgress === 100) {
      completeCourse(courseId)
    }
  }

  const courses = coursesState

  const filteredCourses = courses.filter((course) => {
    // Filter by search query
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab
    if (activeTab === "all") return matchesSearch
    if (activeTab === "in-progress") return matchesSearch && course.progress && course.progress < 100
    if (activeTab === "completed") return matchesSearch && course.completed

    return matchesSearch
  })

  const handleStartCourse = (course: Course) => {
    setSelectedCourse(course)
  }

  const handleBackToCourses = () => {
    setSelectedCourse(null)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300"
    }
  }

  const handleDownload = (certificate: Certificate) => {
    // Create a printable window with the certificate
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = date.toLocaleString("default", { month: "long" })
        const day = date.getDate()
        return `${month} ${day}, ${year}`
      }

      // Find the course details
      const course = coursesState.find((c) => c.id === certificate.courseId)
      const courseTitle = course ? course.title : certificate.courseTitle

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${courseTitle} Certificate</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9; }
            .certificate-container { 
              width: 800px; 
              margin: 0 auto; 
              position: relative; 
              border: 20px solid #FFF8E1; 
              background-color: white;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              padding: 40px;
            }
            .certificate-header { text-align: center; padding-top: 20px; }
            .certificate-title { font-size: 32px; color: #B45309; margin-bottom: 10px; }
            .certificate-subtitle { font-size: 20px; color: #92400E; margin-bottom: 30px; }
            .certificate-body { text-align: center; padding: 20px; }
            .recipient { font-size: 28px; font-weight: bold; margin: 20px 0; color: #1F2937; }
            .course-title { font-size: 22px; margin: 20px 0; color: #4B5563; }
            .completion-date { margin: 20px 0; color: #6B7280; }
            .certificate-footer { display: flex; justify-content: space-between; margin-top: 60px; padding: 0 100px; }
            .signature { width: 200px; text-align: center; }
            .signature-line { border-top: 1px solid #92400E; margin-bottom: 5px; }
            .print-button { 
              display: block; 
              margin: 20px auto; 
              padding: 12px 24px; 
              background: #B45309; 
              color: white; 
              border: none; 
              border-radius: 4px; 
              cursor: pointer;
              font-size: 16px;
              font-weight: bold;
            }
            .print-button:hover { background: #92400E; }
            .certificate-seal { 
              position: absolute; 
              bottom: 40px; 
              right: 50px; 
              width: 100px; 
              height: 100px; 
              border-radius: 50%; 
              border: 2px solid #B45309; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
            }
            .seal-inner { 
              width: 90px; 
              height: 90px; 
              border-radius: 50%; 
              border: 1px dashed #B45309; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              font-size: 28px; 
              color: #B45309; 
            }
            .sdg-goals {
              margin: 20px 0;
              font-style: italic;
              color: #6B7280;
            }
            @media print {
              .print-button { display: none; }
              body { -webkit-print-color-adjust: exact; background-color: white; }
              .certificate-container { box-shadow: none; border-color: #FFF8E1 !important; }
            }
          </style>
        </head>
        <body>
          <button class="print-button" onclick="window.print();">Print Certificate</button>
          <div class="certificate-container">
            <div class="certificate-header">
              <div class="certificate-title">EnviroMind</div>
              <div class="certificate-subtitle">Certificate of Completion</div>
            </div>
            <div class="certificate-body">
              <p>This certifies that</p>
              <div class="recipient">John Doe</div>
              <p>has successfully completed</p>
              <div class="course-title">${courseTitle}</div>
              <div class="completion-date">on ${formatDate(certificate.completionDate)}</div>
              ${course?.sdgGoals ? `<div class="sdg-goals">Related to SDG Goals: ${course.sdgGoals.join(", ")}</div>` : ""}
            </div>
            <div class="certificate-footer">
              <div class="signature">
                <div class="signature-line"></div>
                <p>Instructor</p>
              </div>
              <div class="signature">
                <div class="signature-line"></div>
                <p>Director</p>
              </div>
            </div>
            <div class="certificate-seal">
              <div class="seal-inner">EM</div>
            </div>
          </div>
        </body>
        </html>
      `)
      printWindow.document.close()
    } else {
      toast({
        title: "Popup Blocked",
        description: "Please allow popups to view and print your certificate.",
        variant: "destructive",
      })
    }
  }

  // Certificate modal
  const CertificatesModal = () => {
    const completedCourses = coursesState.filter((course) => course.completed)
    const availableCertificates = userCertificates.filter((cert) =>
      completedCourses.some((course) => course.id === cert.courseId),
    )

    const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = date.toLocaleString("default", { month: "long" })
      const day = date.getDate()
      return `${month} ${day}, ${year}`
    }

    return (
      <Dialog open={showCertificates} onOpenChange={setShowCertificates}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-amber-700 dark:text-amber-300">
              Your Certificates
            </DialogTitle>
            <DialogDescription>View and download certificates for your completed courses</DialogDescription>
          </DialogHeader>

          {availableCertificates.length > 0 ? (
            <div className="space-y-6">
              {selectedCertificate ? (
                <div className="space-y-4">
                  <Button variant="outline" size="sm" onClick={() => setSelectedCertificate(null)} className="mb-2">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to all certificates
                  </Button>

                  {userCertificates
                    .filter((cert) => cert.id === selectedCertificate)
                    .map((certificate) => (
                      <div key={certificate.id} className="space-y-4">
                        <div className="relative border-8 border-amber-100 dark:border-amber-900 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=50&width=50')] opacity-5"></div>
                          <div className="p-8 relative">
                            <div className="text-center space-y-6">
                              <div>
                                <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200">EnviroMind</h3>
                                <div className="h-px bg-amber-200 dark:bg-amber-700 w-24 mx-auto my-2"></div>
                                <p className="text-sm text-amber-600 dark:text-amber-400">Certificate of Completion</p>
                              </div>

                              <div className="py-6">
                                <p className="text-sm text-amber-600 dark:text-amber-400">This certifies that</p>
                                <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 my-2">John Doe</h2>
                                <p className="text-sm text-amber-600 dark:text-amber-400">has successfully completed</p>
                                <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200 my-2">
                                  {certificate.courseTitle}
                                </h3>
                                <p className="text-sm text-amber-600 dark:text-amber-400">
                                  on {formatDate(certificate.completionDate)}
                                </p>
                              </div>

                              <div className="flex justify-between items-end pt-6">
                                <div className="text-left">
                                  <div className="h-px w-32 bg-amber-400 dark:bg-amber-600 mb-1"></div>
                                  <p className="text-xs text-amber-600 dark:text-amber-400">Instructor Signature</p>
                                </div>
                                <div>
                                  <div className="h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mx-auto mb-1">
                                    <Award className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="h-px w-32 bg-amber-400 dark:bg-amber-600 mb-1"></div>
                                  <p className="text-xs text-amber-600 dark:text-amber-400">Director</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-1">
                            <Select
                              value={downloadFormat}
                              onValueChange={(value) => setDownloadFormat(value as "pdf" | "image")}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select format" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pdf">PDF Format</SelectItem>
                                <SelectItem value="image">Image Format (PNG)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button
                            onClick={() => handleDownload(certificate)}
                            className="bg-amber-600 hover:bg-amber-700 text-white"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download Certificate
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableCertificates.map((certificate) => (
                    <Card
                      key={certificate.id}
                      className="overflow-hidden hover:border-amber-500 transition-all cursor-pointer"
                      onClick={() => setSelectedCertificate(certificate.id)}
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={certificate.image || "/placeholder.svg"}
                          alt={certificate.courseTitle}
                          fill
                          className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                          <div className="p-4 text-white w-full">
                            <div className="flex justify-between items-end">
                              <div>
                                <p className="text-xs text-amber-200 mb-1">Certificate of Completion</p>
                                <h3 className="font-semibold text-white">{certificate.courseTitle}</h3>
                                <p className="text-xs text-gray-300 mt-1">
                                  Completed on {formatDate(certificate.completionDate)}
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-amber-600/80 hover:bg-amber-700 text-white border-amber-500"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedCertificate(certificate.id)
                                  setTimeout(() => {
                                    window.print()
                                  }, 500)
                                }}
                              >
                                <Download className="h-3 w-3 mr-1" /> Print
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardFooter className="flex justify-between items-center">
                        <Badge
                          variant="outline"
                          className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                        >
                          <Award className="mr-1 h-3 w-3" />
                          Certified
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCertificate(certificate.id)
                          }}
                        >
                          View Certificate <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <Award className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No certificates yet</h3>
              <p className="text-muted-foreground mb-6">Complete courses to earn certificates</p>
              <Button
                variant="outline"
                onClick={() => setShowCertificates(false)}
                className="hover:border-amber-500 focus:border-amber-500 focus:ring-amber-500"
              >
                Browse Courses
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    )
  }

  useEffect(() => {
    // Load courses and certificates from localStorage
    if (typeof window !== "undefined") {
      const savedCourses = localStorage.getItem("enviromind_courses")
      const savedCertificates = localStorage.getItem("enviromind_certificates")

      if (savedCourses) {
        try {
          setCoursesState(JSON.parse(savedCourses))
        } catch (e) {
          console.error("Failed to parse saved courses")
        }
      }

      if (savedCertificates) {
        try {
          setUserCertificates(JSON.parse(savedCertificates))
        } catch (e) {
          console.error("Failed to parse saved certificates")
        }
      }
    }
  }, [])

  // Save courses and certificates to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("enviromind_courses", JSON.stringify(coursesState))
      localStorage.setItem("enviromind_certificates", JSON.stringify(userCertificates))
    }
  }, [coursesState, userCertificates])

  useEffect(() => {
    // Generate certificates for all completed courses if they don't exist
    coursesState.forEach((course) => {
      if (course.completed) {
        const certificateExists = userCertificates.some((cert) => cert.courseId === course.id)
        if (!certificateExists) {
          const newCertificate: Certificate = {
            id: `cert-${course.id}-${Date.now()}`,
            courseId: course.id,
            courseTitle: course.title,
            completionDate: new Date().toISOString().split("T")[0],
            image: "/placeholder.svg?height=600&width=800&text=Certificate+for+" + encodeURIComponent(course.title),
          }
          setUserCertificates((prev) => [...prev, newCertificate])
        }
      }
    })
  }, [coursesState])

  // Function to complete all courses (for testing)
  const completeAllCourses = () => {
    coursesState.forEach((course) => {
      if (!course.completed) {
        completeCourse(course.id)
      }
    })
    toast({
      title: "All Courses Completed",
      description: "All courses have been marked as completed for demonstration purposes.",
      variant: "success",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950/40 dark:via-yellow-950/40 dark:to-orange-950/40 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-5 p-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/50 px-3 py-1 rounded-full text-amber-700 dark:text-amber-300 text-sm font-medium mb-4">
              <BookOpen className="h-4 w-4" />
              SDG Learning Platform
            </div>
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-200 mb-2">Madam A</h2>
            <p className="text-amber-800 dark:text-amber-300 mb-4">
              Your personal guide to sustainable development education. Access courses, earn certificates, and build
              your knowledge about the SDGs.
            </p>

            <div className="space-y-3 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-700 dark:text-amber-300"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-amber-900 dark:text-amber-200">Interactive Courses</h3>
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                    Learn at your own pace with multimedia content
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-700 dark:text-amber-300"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-amber-900 dark:text-amber-200">Track Your Progress</h3>
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                    Monitor your learning journey with detailed analytics
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-700 dark:text-amber-300"
                  >
                    <path d="M8.56 3.69a9 9 0 0 0-2.92 1.95"></path>
                    <path d="M3.69 8.56A9 9 0 0 0 3 12"></path>
                    <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92"></path>
                    <path d="M8.56 20.31A9 9 0 0 0 12 21"></path>
                    <path d="M15.44 20.31a9 9 0 0 0 2.92-1.95"></path>
                    <path d="M20.31 15.44A9 9 0 0 0 21 12"></path>
                    <path d="M20.31 8.56a9 9 0 0 0-1.95-2.92"></path>
                    <path d="M15.44 3.69A9 9 0 0 0 12 3"></path>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-amber-900 dark:text-amber-200">Earn Certificates</h3>
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                    Get recognized for your sustainable development knowledge
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-yellow-500/10 dark:from-amber-500/5 dark:to-yellow-500/5"></div>
            <div className="relative p-6 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                <div className="bg-white/90 dark:bg-slate-800/90 rounded-lg shadow-md p-4 flex flex-col transform hover:scale-105 transition-transform">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600 dark:text-green-400"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="M8 12h8"></path>
                        <path d="M12 8v8"></path>
                      </svg>
                    </div>
                    <h3 className="font-medium text-sm">Climate Action Fundamentals</h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                    Understand climate change science, impacts, and the actions needed to combat this global challenge.
                  </p>
                  <div className="mt-auto">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Progress</span>
                      <span className="text-xs font-medium">65%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 dark:bg-slate-800/90 rounded-lg shadow-md p-4 flex flex-col transform hover:scale-105 transition-transform">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600 dark:text-blue-400"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="M12 8v8"></path>
                        <path d="M8 12h8"></path>
                      </svg>
                    </div>
                    <h3 className="font-medium text-sm">Clean Water and Sanitation</h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                    Learn about water conservation, management, and technologies for clean water access.
                  </p>
                  <div className="mt-auto">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: "0%" }}></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Progress</span>
                      <span className="text-xs font-medium">0%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 dark:bg-slate-800/90 rounded-lg shadow-md p-4 flex flex-col transform hover:scale-105 transition-transform">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-purple-600 dark:text-purple-400"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <h3 className="font-medium text-sm">Gender Equality</h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                    Understand the critical role of gender equality in achieving all sustainable development goals.
                  </p>
                  <div className="mt-auto">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: "0%" }}></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Progress</span>
                      <span className="text-xs font-medium">0%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 dark:bg-slate-800/90 rounded-lg shadow-md p-4 flex flex-col transform hover:scale-105 transition-transform">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600 dark:text-green-400"
                      >
                        <path d="M18 8c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z"></path>
                        <path d="M6 15.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
                        <path d="M20 15.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
                        <path d="M4 22v-5a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v5"></path>
                      </svg>
                    </div>
                    <h3 className="font-medium text-sm">Sustainable Communities</h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                    Explore how urban planning and community development can contribute to sustainability goals.
                  </p>
                  <div className="mt-auto">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: "0%" }}></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Progress</span>
                      <span className="text-xs font-medium">0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-amber-600/10 dark:bg-amber-900/30 p-4 flex justify-between items-center">
          <div className="text-sm text-amber-800 dark:text-amber-300">
            <span className="font-medium">{coursesState.length} courses available</span> • {userCertificates.length}{" "}
            {userCertificates.length === 1 ? "certificate" : "certificates"} earned
          </div>
          <Button
            onClick={() => setShowCertificates(true)}
            className="bg-amber-600 hover:bg-amber-700 text-black"
            size="sm"
          >
            Browse Certificates
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hover:border-amber-500 focus:border-amber-500 focus:ring-amber-500"
            onClick={completeAllCourses}
          >
            Complete All Courses (Demo)
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            className="hover:border-amber-500 focus:border-amber-500 focus:ring-amber-500"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <Button
            variant="secondary"
            onClick={() => setSelectedCourse(null)}
            className="hover:border-amber-500 hover:border-2 focus:border-amber-500 focus:border-2 focus:ring-amber-500 transition-all"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            All Courses
          </Button>
        </div>
        <h1 className="text-3xl font-bold">Madam A</h1>
      </div>

      {selectedCourse ? (
        <div className="space-y-8">
          <Card>
            <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
              <Image
                src={selectedCourse.image || "/placeholder.svg"}
                alt={selectedCourse.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedCourse.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getLevelColor(selectedCourse.level)}>{selectedCourse.level}</Badge>
                    <Badge
                      variant="outline"
                      className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                    >
                      <Clock className="mr-1 h-3 w-3" />
                      {selectedCourse.duration}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold mb-4">About This Course</h3>
                  <p className="text-muted-foreground mb-6">{selectedCourse.description}</p>

                  <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <span>Understand the key principles and concepts related to this SDG area</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <span>Identify challenges and opportunities in implementing sustainable practices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <span>Develop practical strategies for contributing to the SDGs in your daily life</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <span>Connect with global initiatives and local actions related to these goals</span>
                    </li>
                  </ul>

                  <h3 className="text-xl font-bold mb-4">Course Content</h3>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Module 1: Introduction and Overview</h4>
                        <Badge variant="outline">25 min</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-amber-600 hover:bg-amber-700 hover:border-amber-500 focus:border-amber-500 focus:ring-amber-500"
                        >
                          <Play className="mr-2 h-3 w-3" />
                          Start Module
                        </Button>
                        {selectedCourse && selectedCourse.progress && selectedCourse.progress < 100 && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              if (selectedCourse) {
                                const newProgress = Math.min(selectedCourse.progress + 25, 100)
                                updateCourseProgress(selectedCourse.id, newProgress)
                                setSelectedCourse({
                                  ...selectedCourse,
                                  progress: newProgress,
                                  completed: newProgress === 100,
                                })
                              }
                            }}
                          >
                            <CheckCircle className="mr-2 h-3 w-3" />
                            Complete Module
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Module 2: Key Concepts and Frameworks</h4>
                        <Badge variant="outline">40 min</Badge>
                      </div>
                      <Button
                        size="sm"
                        className="bg-amber-600 hover:bg-amber-700 hover:border-amber-500 focus:border-amber-500 focus:ring-amber-500"
                      >
                        <Play className="mr-2 h-3 w-3" />
                        Start Module
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Module 3: Case Studies and Best Practices</h4>
                        <Badge variant="outline">35 min</Badge>
                      </div>
                      <Button
                        size="sm"
                        className="bg-amber-600 hover:bg-amber-700 hover:border-amber-500 focus:border-amber-500 focus:ring-amber-500"
                      >
                        <Play className="mr-2 h-3 w-3" />
                        Start Module
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Module 4: Implementation Strategies</h4>
                        <Badge variant="outline">30 min</Badge>
                      </div>
                      <Button
                        size="sm"
                        className="bg-amber-600 hover:bg-amber-700 hover:border-amber-500 focus:border-amber-500 focus:ring-amber-500"
                      >
                        <Play className="mr-2 h-3 w-3" />
                        Start Module
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <Card className="hover:border-amber-500 transition-colors">
                    <CardHeader>
                      <CardTitle>Course Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Duration</h4>
                        <p className="flex items-center text-muted-foreground">
                          <Clock className="mr-2 h-4 w-4" />
                          {selectedCourse.duration}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Level</h4>
                        <Badge className={getLevelColor(selectedCourse.level)}>{selectedCourse.level}</Badge>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Related SDGs</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedCourse.sdgGoals.map((goal) => (
                            <Badge key={goal} variant="outline">
                              SDG {goal}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Completion</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{selectedCourse.progress || 0}%</span>
                          </div>
                          <Progress value={selectedCourse.progress || 0} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => {
                          if (selectedCourse.completed) {
                            // If course is completed, just view it
                            handleStartCourse(selectedCourse)
                          } else if (selectedCourse.progress && selectedCourse.progress > 0) {
                            // If course is in progress, continue
                            handleStartCourse(selectedCourse)
                          } else {
                            // If course is not started, start it with initial progress
                            updateCourseProgress(selectedCourse.id, 10)
                            handleStartCourse({ ...selectedCourse, progress: 10 })
                          }
                        }}
                        className="w-full bg-amber-600 hover:bg-amber-700 hover:border-amber-500 focus:border-amber-500 focus:ring-amber-500"
                      >
                        {selectedCourse.progress && selectedCourse.progress > 0 ? (
                          selectedCourse.progress === 100 ? (
                            <>
                              <BookOpen className="mr-2 h-4 w-4" />
                              Review Course
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Continue ({selectedCourse.progress}%)
                            </>
                          )
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Start Course
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>

                  <div className="mt-6">
                    <Button
                      variant="outline"
                      className="w-full hover:border-amber-500 focus:border-amber-500 focus:ring-amber-500"
                      onClick={handleBackToCourses}
                    >
                      Back to Course Library
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search courses..."
                className="pl-10 focus:border-amber-500 focus:ring-amber-500 hover:border-amber-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="border border-transparent">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:border-amber-500 data-[state=active]:border-b-2 hover:border-amber-500 hover:border-b-2 transition-all"
                >
                  All Courses
                </TabsTrigger>
                <TabsTrigger
                  value="in-progress"
                  className="data-[state=active]:border-amber-500 data-[state=active]:border-b-2 hover:border-amber-500 hover:border-b-2 transition-all"
                >
                  In Progress
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:border-amber-500 data-[state=active]:border-b-2 hover:border-amber-500 hover:border-b-2 transition-all"
                >
                  Completed
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:border-amber-500 transition-colors">
                  <div className="relative aspect-video">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
                    />
                    {course.completed && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-green-600">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Completed
                        </Badge>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                      <Badge variant="outline">
                        <Clock className="mr-1 h-3 w-3" />
                        {course.duration}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {course.sdgGoals.slice(0, 3).map((goal) => (
                        <Badge
                          key={goal}
                          variant="outline"
                          className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                        >
                          SDG {goal}
                        </Badge>
                      ))}
                      {course.sdgGoals.length > 3 && (
                        <Badge
                          variant="outline"
                          className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                        >
                          +{course.sdgGoals.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {course.progress !== undefined && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => {
                        if (course.completed) {
                          // If course is completed, just view it
                          handleStartCourse(course)
                        } else if (course.progress && course.progress > 0) {
                          // If course is in progress, continue
                          handleStartCourse(course)
                        } else {
                          // If course is not started, start it with initial progress
                          updateCourseProgress(course.id, 10)
                          handleStartCourse({ ...course, progress: 10 })
                        }
                      }}
                      className="w-full bg-amber-600 hover:bg-amber-700 hover:border-amber-500 focus:border-amber-500 focus:ring-amber-500"
                    >
                      {course.progress && course.progress > 0 ? (
                        course.progress === 100 ? (
                          <>
                            <BookOpen className="mr-2 h-4 w-4" />
                            Review Course
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Continue ({course.progress}%)
                          </>
                        )
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Start Course
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setActiveTab("all")
                  }}
                  className="hover:border-amber-500 focus:border-amber-500 focus:ring-amber-500"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          <div className="mt-12">
            <Card className="hover:border-amber-500 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  Your Learning Journey
                </CardTitle>
                <CardDescription>Track your progress and earn certificates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Courses Completed</h3>
                    <div className="flex items-center gap-2">
                      <div className="text-3xl font-bold text-amber-500">
                        {coursesState.filter((course) => course.completed).length}
                      </div>
                      <div className="text-sm text-muted-foreground">of {coursesState.length} total courses</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">In Progress</h3>
                    <div className="flex items-center gap-2">
                      <div className="text-3xl font-bold text-amber-500">
                        {
                          coursesState.filter(
                            (course) => course.progress && course.progress > 0 && course.progress < 100,
                          ).length
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {coursesState.filter(
                          (course) => course.progress && course.progress > 0 && course.progress < 100,
                        ).length === 1
                          ? "course currently in progress"
                          : "courses currently in progress"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Certificates Earned</h3>
                    <div className="flex items-center gap-2">
                      <div className="text-3xl font-bold text-amber-500">{userCertificates.length}</div>
                      <div className="text-sm text-muted-foreground">
                        {userCertificates.length === 1 ? "certificate of completion" : "certificates of completion"}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full hover:border-amber-500 focus:border-amber-500 focus:ring-amber-500"
                  onClick={() => setShowCertificates(true)}
                >
                  View All Certificates
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 hover:border-amber-500 focus:border-amber-500 focus:ring-amber-500"
                  onClick={completeAllCourses}
                >
                  Complete All Courses (Demo)
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}
      {/* Certificate Modal */}
      <CertificatesModal />
    </div>
  )
}

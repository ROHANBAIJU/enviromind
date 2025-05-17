"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LearnMoreClientPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("enviromind_user")
    setIsLoggedIn(!!user)
  }, []) // Empty dependency array ensures this only runs once on mount

  const handleExploreClick = () => {
    if (isLoggedIn) {
      router.push("/dashboard")
    } else {
      // Store intended destination
      localStorage.setItem("redirect_after_login", "/dashboard")
      // Navigate to home page
      router.push("/")
      // We'll need to handle the login modal opening separately
      // This approach avoids potential issues with custom events
      setTimeout(() => {
        const loginEvent = new CustomEvent("open-login-modal")
        window.dispatchEvent(loginEvent)
      }, 100)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back to Home */}
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline" className="group transition-all hover:border-green-600 hover:text-green-600">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:text-green-600" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">About EnviroMind</h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400">
          Innovative solutions for a sustainable future, addressing key environmental challenges through technology
        </p>
      </div>

      {/* Our Mission Section */}
      <section className="mb-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
            <p className="mb-4 text-lg">
              EnviroMind is dedicated to creating a sustainable future through innovative technology solutions that
              address pressing environmental challenges. We believe that by providing accessible tools and information,
              we can empower individuals and organizations to make environmentally conscious decisions.
            </p>
            <p className="mb-4 text-lg">
              Our platform brings together cutting-edge AI models, data visualization, and educational resources to
              promote environmental awareness and drive positive change. Through our specialized tools, we aim to
              contribute to the United Nations Sustainable Development Goals (SDGs) and help build a more sustainable
              world.
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image src="/sustainable-city-planning.png" alt="Sustainable city planning" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Our Tools Section */}
      <section className="mb-20">
        <h2 className="mb-10 text-center text-3xl font-bold">Our Innovative Tools</h2>

        {/* Eco-Scan */}
        <div className="mb-16 rounded-xl bg-white p-8 shadow-md dark:bg-gray-800">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Eco-Scan</h3>
              </div>
              <p className="mb-4">
                Our advanced AI-powered scanning tool that identifies recyclable materials and helps users properly
                segregate waste. Eco-Scan contributes to SDG 12 (Responsible Consumption and Production) and SDG 11
                (Sustainable Cities and Communities).
              </p>
              <h4 className="mb-2 font-semibold">Key Features:</h4>
              <ul className="mb-4 list-inside list-disc space-y-1">
                <li>Real-time material identification using computer vision</li>
                <li>Personalized recycling guidance based on local regulations</li>
                <li>Waste reduction insights and recommendations</li>
                <li>Tracks environmental impact of recycling efforts</li>
              </ul>
              <h4 className="mb-2 font-semibold">SDG Impact:</h4>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  SDG 11: Sustainable Cities
                </span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  SDG 12: Responsible Consumption
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?key=454z2"
                  alt="Eco-Scan technology in action"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="rounded-lg bg-black/5 p-6 dark:bg-white/5">
                <h4 className="mb-3 font-semibold">Technical Achievement:</h4>
                <p>
                  Successfully created an AI model for recyclable waste identification and segregation, with over 95%
                  accuracy across 30+ material types. The model was trained on a dataset of 100,000+ images and deployed
                  using TensorFlow and OpenCV.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AgroVision */}
        <div className="mb-16 rounded-xl bg-white p-8 shadow-md dark:bg-gray-800">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">AgroVision</h3>
              </div>
              <p className="mb-4">
                Advanced agricultural monitoring system that utilizes AI to detect plant diseases and identify soil
                types, supporting sustainable farming practices. AgroVision contributes to SDG 2 (Zero Hunger) and SDG
                15 (Life on Land).
              </p>
              <h4 className="mb-2 font-semibold">Key Features:</h4>
              <ul className="mb-4 list-inside list-disc space-y-1">
                <li>Real-time plant disease detection with treatment recommendations</li>
                <li>Soil type identification and crop suitability analysis</li>
                <li>Resource optimization suggestions (water, fertilizer, pesticides)</li>
                <li>Yield prediction and harvesting timing guidance</li>
              </ul>
              <h4 className="mb-2 font-semibold">SDG Impact:</h4>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  SDG 2: Zero Hunger
                </span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  SDG 15: Life on Land
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?key=pmkwo"
                  alt="AgroVision technology in action"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="rounded-lg bg-black/5 p-6 dark:bg-white/5">
                <h4 className="mb-3 font-semibold">Technical Achievement:</h4>
                <p>
                  Successfully developed an AI model for plant disease detection with soil identification capabilities,
                  capable of identifying 50+ common plant diseases and 15 soil types. The model leverages TensorFlow and
                  custom computer vision algorithms with 92% accuracy in real-world conditions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pollu-Map */}
        <div className="mb-16 rounded-xl bg-white p-8 shadow-md dark:bg-gray-800">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Pollu-Map</h3>
              </div>
              <p className="mb-4">
                Interactive mapping tool that visualizes pollution hotspots and air/water quality data. Pollu-Map
                contributes to SDG 11 (Sustainable Cities and Communities) and SDG 3 (Good Health and Well-being).
              </p>
              <h4 className="mb-2 font-semibold">Key Features:</h4>
              <ul className="mb-4 list-inside list-disc space-y-1">
                <li>Real-time air quality index visualization</li>
                <li>Water pollution tracking and monitoring</li>
                <li>Pollution source identification</li>
                <li>Health impact assessments and alerts</li>
              </ul>
              <h4 className="mb-2 font-semibold">SDG Impact:</h4>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  SDG 3: Good Health
                </span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  SDG 11: Sustainable Cities
                </span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  SDG 6: Clean Water
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?key=qwr1y"
                  alt="Pollu-Map visualization interface"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="rounded-lg bg-black/5 p-6 dark:bg-white/5">
                <h4 className="mb-3 font-semibold">Technical Achievement:</h4>
                <p>
                  Developed a comprehensive environmental monitoring system with real-time data visualization for air
                  and water quality metrics. The platform integrates data from multiple sources and uses predictive
                  analytics to forecast pollution trends with 85% accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dr. R */}
        <div className="mb-16 rounded-xl bg-white p-8 shadow-md dark:bg-gray-800">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Dr. R</h3>
              </div>
              <p className="mb-4">
                Highly intelligent general medical chatbot with comprehensive knowledge about urgent care situations and
                approximately 10,000 medicines. Dr. R contributes to SDG 3 (Good Health and Well-being).
              </p>
              <h4 className="mb-2 font-semibold">Key Features:</h4>
              <ul className="mb-4 list-inside list-disc space-y-1">
                <li>Medication information and interaction checking</li>
                <li>Urgent care guidance and first-aid recommendations</li>
                <li>Health condition analysis and symptom assessment</li>
                <li>Medical terminology explanation and education</li>
              </ul>
              <h4 className="mb-2 font-semibold">SDG Impact:</h4>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  SDG 3: Good Health
                </span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  SDG 10: Reduced Inequalities
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?key=pq38b"
                  alt="Dr. R medical assistant interface"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="rounded-lg bg-black/5 p-6 dark:bg-white/5">
                <h4 className="mb-3 font-semibold">Technical Achievement:</h4>
                <p>
                  Developed a sophisticated medical AI assistant with knowledge of over 10,000 medicines, urgent care
                  protocols, and common medical conditions. The model utilizes natural language processing techniques to
                  provide accurate medical information with appropriate disclaimers, achieving a 96% satisfaction rate
                  among users.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Madam A */}
        <div className="mb-16 rounded-xl bg-white p-8 shadow-md dark:bg-gray-800">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Madam A</h3>
              </div>
              <p className="mb-4">
                An advanced AI-powered educational assistant that provides personalized learning resources and guidance
                on environmental topics. Madam A contributes to SDG 4 (Quality Education) and SDG 13 (Climate Action).
              </p>
              <h4 className="mb-2 font-semibold">Key Features:</h4>
              <ul className="mb-4 list-inside list-disc space-y-1">
                <li>Personalized environmental education curriculum</li>
                <li>Interactive learning modules on sustainability topics</li>
                <li>Real-time answers to environmental questions</li>
                <li>Research assistance and resource recommendations</li>
              </ul>
              <h4 className="mb-2 font-semibold">SDG Impact:</h4>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  SDG 4: Quality Education
                </span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  SDG 13: Climate Action
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?key=ckt1l"
                  alt="Madam A educational assistant interface"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="rounded-lg bg-black/5 p-6 dark:bg-white/5">
                <h4 className="mb-3 font-semibold">Technical Achievement:</h4>
                <p>
                  Developed an intelligent educational assistant with comprehensive knowledge of environmental topics
                  and sustainability practices. The system uses adaptive learning algorithms to personalize content
                  based on user knowledge level and interests, with a database of over 5,000 educational resources and
                  the ability to generate custom learning materials on demand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Results */}
      <section className="mb-20">
        <h2 className="mb-10 text-center text-3xl font-bold">Our Results & Achievements</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-bold">AI Model Development</h3>
            <p className="mb-4">Successfully created three advanced AI models for:</p>
            <ul className="mb-4 list-inside list-disc space-y-2">
              <li>Recyclable waste identification and segregation (Eco-Scan)</li>
              <li>Plant disease detection with soil analysis capabilities (AgroVision)</li>
              <li>Comprehensive medical knowledge assistant (Dr. R)</li>
            </ul>
            <p>These models have been trained on diverse datasets and optimized for mobile and web applications.</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-bold">Environmental Impact</h3>
            <p className="mb-4">Our platform has contributed to:</p>
            <ul className="mb-4 list-inside list-disc space-y-2">
              <li>840,000+ tons of CO₂ emissions reduction</li>
              <li>25% improvement in waste recycling rates among users</li>
              <li>30% increase in sustainable agricultural practices</li>
              <li>45,000+ hectares of land under improved management</li>
            </ul>
            <p>These impacts directly support multiple UN Sustainable Development Goals.</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-bold">Community Growth</h3>
            <p className="mb-4">Our platform has achieved:</p>
            <ul className="mb-4 list-inside list-disc space-y-2">
              <li>125,000+ active users across 45+ countries</li>
              <li>2.3+ million people benefited indirectly</li>
              <li>65% user retention rate, exceeding industry average</li>
              <li>15,000+ educational resources accessed monthly</li>
            </ul>
            <p>We continue to expand our reach and enhance our tools based on user feedback.</p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="mb-20">
        <h2 className="mb-10 text-center text-3xl font-bold">Our Technology Stack</h2>
        <div className="rounded-xl bg-white p-8 shadow-md dark:bg-gray-800">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xl font-bold">Frontend Technologies</h3>
              <ul className="list-inside list-disc space-y-2">
                <li>React.js for dynamic UI components</li>
                <li>Next.js for server-side rendering and routing</li>
                <li>Tailwind CSS for responsive design</li>
                <li>TypeScript for type-safe code</li>
                <li>Three.js for interactive 3D visualizations</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold">Backend Technologies</h3>
              <ul className="list-inside list-disc space-y-2">
                <li>Python for data processing and AI models</li>
                <li>Flask for RESTful API development</li>
                <li>Firebase for authentication and real-time data</li>
                <li>Node.js for server-side operations</li>
                <li>MongoDB and PostgreSQL for data storage</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold">AI & Data Technologies</h3>
              <ul className="list-inside list-disc space-y-2">
                <li>TensorFlow and PyTorch for deep learning models</li>
                <li>OpenCV for computer vision algorithms</li>
                <li>scikit-learn for machine learning pipelines</li>
                <li>NLTK and spaCy for natural language processing</li>
                <li>Pandas and NumPy for data manipulation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mb-12 text-center">
        <h2 className="mb-6 text-3xl font-bold">Join Our Mission</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg">
          Be part of the solution and help create a sustainable future for generations to come. Explore our tools,
          contribute to our initiatives, and make a positive impact on the environment.
        </p>
        <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={handleExploreClick}>
          Explore Our Platform
        </Button>
      </section>
    </div>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import LoginButton from "@/components/login-button"
import { LoginModal } from "@/components/login-modal"
import { useRouter } from "next/navigation"

// Chart with animation component
function ChartWithAnimation({ title, value, displayValue, subtitle, description, strokeColor, percentage }) {
  const chartRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentValue, setCurrentValue] = useState(0)
  const [currentPercentage, setCurrentPercentage] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (chartRef.current) {
      observer.observe(chartRef.current)
    }

    return () => {
      if (chartRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Animate the counter
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepTime = duration / steps
    let currentStep = 0

    const counterInterval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      setCurrentValue(Math.floor(progress * value))
      setCurrentPercentage(progress * percentage)

      if (currentStep === steps) {
        clearInterval(counterInterval)
      }
    }, stepTime)

    return () => clearInterval(counterInterval)
  }, [isVisible, value, percentage])

  // Calculate the stroke-dashoffset based on percentage
  const circumference = 2 * Math.PI * 40
  const strokeDashoffset = circumference - (currentPercentage / 100) * circumference

  // Format the current value for display
  const formattedValue =
    currentValue >= value
      ? displayValue
      : currentValue >= 1000000
        ? `${(currentValue / 1000000).toFixed(1)}M`
        : currentValue >= 1000
          ? `${(currentValue / 1000).toFixed(0)}K`
          : currentValue.toString()

  return (
    <div
      className="bg-black text-white p-6 rounded-xl shadow-sm border border-transparent hover:border-green-600 focus-within:border-green-600 transition-colors duration-300"
      ref={chartRef}
      tabIndex={0}
    >
      <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>
      <div className="w-full aspect-square relative">
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-4xl font-bold transition-all duration-300">{formattedValue}</span>
          <span className="text-sm text-gray-300">{subtitle}</span>
        </div>
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e5e7eb" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke={strokeColor}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? strokeDashoffset : circumference}
            strokeLinecap="round"
            className="transition-all duration-2000 ease-out"
            style={{ transition: "stroke-dashoffset 2s ease-out" }}
          />
        </svg>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  )
}

export default function Page() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()
  const totalSlides = 7 // Updated to include AgroVision

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate next slide (0 to 6, then back to 0)
      const nextSlide = (currentSlide + 1) % totalSlides
      setCurrentSlide(nextSlide)

      // Update carousel position
      const container = document.getElementById("carousel-container")
      if (container) {
        container.style.transform = `translateX(-${nextSlide * 100}%)`
      }
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [currentSlide, totalSlides])

  // Function to handle tool navigation
  const navigateToTool = (path) => {
    const isLoggedIn = localStorage.getItem("enviromind_user") !== null
    if (isLoggedIn) {
      // Clear any saved scroll positions for dashboard
      if (path === "/dashboard") {
        sessionStorage.removeItem("sidebarScrollPosition")
        // Also clear main content scroll position if needed
        window.scrollTo(0, 0)
      }

      // Use direct navigation with a small delay to ensure proper loading
      setTimeout(() => {
        window.location.href = path
      }, 100)
    } else {
      setShowLoginModal(true)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-green-600">EnviroMind</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LoginButton setShowLoginModal={setShowLoginModal} />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Sustainable Solutions for a Better Tomorrow
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Join our platform to track your environmental impact, discover sustainable products, and contribute to a
                healthier planet.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => navigateToTool("/dashboard")}
                >
                  Get Started
                </Button>
                <Link href="/learn-more">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="/sustainability-infinity.png"
                alt="Sustainable development infinity symbol with renewable energy elements"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Platform Features</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Discover the tools and resources we offer to help you make sustainable choices
              </p>
            </div>
          </div>

          {/* Carousel */}
          <div className="mt-12 relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                id="carousel-container"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Eco-Scan Tool */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-black text-white rounded-xl shadow-sm p-8 flex flex-col items-center h-full">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-500"
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
                    <h3 className="text-xl font-bold mb-2">Eco-Scan</h3>
                    <p className="text-gray-300 mb-6 text-center">
                      Analyze your environmental footprint with our advanced scanning tool. Get personalized
                      recommendations to reduce your impact on the planet.
                    </p>
                    <button
                      onClick={() => navigateToTool("/tools/eco-scan")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors mt-auto"
                    >
                      Try Eco-Scan
                    </button>
                  </div>
                </div>

                {/* Pollu-Map Tool */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-black text-white rounded-xl shadow-sm p-8 flex flex-col items-center h-full">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-500"
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
                    <h3 className="text-xl font-bold mb-2">Pollu-Map</h3>
                    <p className="text-gray-300 mb-6 text-center">
                      Interactive mapping tool that visualizes pollution hotspots in your area. Stay informed about air
                      and water quality in your community.
                    </p>
                    <button
                      onClick={() => navigateToTool("/tools/pollu-map")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors mt-auto"
                    >
                      Explore Pollu-Map
                    </button>
                  </div>
                </div>

                {/* Dr. R Tool */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-black text-white rounded-xl shadow-sm p-8 flex flex-col items-center h-full">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-500"
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
                    <h3 className="text-xl font-bold mb-2">Dr. R</h3>
                    <p className="text-gray-300 mb-6 text-center">
                      Your personal recycling assistant. Dr. R helps you identify recyclable materials and provides
                      guidance on proper disposal methods for various items.
                    </p>
                    <button
                      onClick={() => navigateToTool("/tools/dr-r")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors mt-auto"
                    >
                      Consult Dr. R
                    </button>
                  </div>
                </div>

                {/* AgroVision Tool */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-black text-white rounded-xl shadow-sm p-8 flex flex-col items-center h-full">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-500"
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
                    <h3 className="text-xl font-bold mb-2">AgroVision</h3>
                    <p className="text-gray-300 mb-6 text-center">
                      Advanced agricultural monitoring system that uses satellite imagery and AI to optimize crop
                      yields, reduce resource usage, and promote sustainable farming practices.
                    </p>
                    <button
                      onClick={() => navigateToTool("/tools/agro-vision")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors mt-auto"
                    >
                      Explore AgroVision
                    </button>
                  </div>
                </div>

                {/* MADAM-A Tool */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-black text-white rounded-xl shadow-sm p-8 flex flex-col items-center h-full">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">MADAM-A</h3>
                    <p className="text-gray-300 mb-6 text-center">
                      Monitoring and Analysis of Data for Agricultural Management. AI-powered tool that helps farmers
                      optimize resource usage and adopt sustainable practices.
                    </p>
                    <button
                      onClick={() => navigateToTool("/tools/madam-a")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors mt-auto"
                    >
                      Access MADAM-A
                    </button>
                  </div>
                </div>

                {/* Revive Marketplace */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-black text-white rounded-xl shadow-sm p-8 flex flex-col items-center h-full">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Revive Marketplace</h3>
                    <p className="text-gray-300 mb-6 text-center">
                      Shop for eco-friendly, upcycled, and sustainable products. Our marketplace connects you with
                      ethical brands and artisans committed to environmental responsibility.
                    </p>
                    <button
                      onClick={() => navigateToTool("/revive-store")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors mt-auto"
                    >
                      Shop Revive
                    </button>
                  </div>
                </div>

                {/* Farmers Market */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-black text-white rounded-xl shadow-sm p-8 flex flex-col items-center h-full">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Farmers Market</h3>
                    <p className="text-gray-300 mb-6 text-center">
                      Connect with local farmers and purchase fresh, organic produce. Support sustainable agriculture
                      and reduce your food miles while enjoying healthier options.
                    </p>
                    <button
                      onClick={() => navigateToTool("/farmers-market")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors mt-auto"
                    >
                      Visit Market
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 focus:outline-none z-10"
              onClick={() => {
                const container = document.getElementById("carousel-container")
                const currentTransform =
                  Number.parseInt(container.style.transform.replace("translateX(", "").replace("%)", "")) || 0
                const newTransform = Math.min(currentTransform + 100, 0)
                container.style.transform = `translateX(${newTransform}%)`
                setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 0))
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 focus:outline-none z-10"
              onClick={() => {
                const container = document.getElementById("carousel-container")
                const currentTransform =
                  Number.parseInt(container.style.transform.replace("translateX(", "").replace("%)", "")) || 0
                const newTransform = Math.max(currentTransform - 100, -(totalSlides - 1) * 100) // Updated for 7 slides
                container.style.transform = `translateX(${newTransform}%)`
                setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : totalSlides - 1))
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === index ? "bg-green-600" : "bg-gray-300 hover:bg-green-600"
                  } focus:outline-none transition-colors duration-300`}
                  onClick={() => {
                    const container = document.getElementById("carousel-container")
                    container.style.transform = `translateX(${-index * 100}%)`
                    setCurrentSlide(index)
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SDG Section */}
      <section className="py-12 md:py-24 bg-gradient-to-r from-black via-green-900 to-green-800 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                United Nations Sustainable Development Goals
              </h2>
              <p className="text-gray-300 md:text-xl/relaxed">
                Our platform is committed to advancing the UN's 17 Sustainable Development Goals. Together, we can
                create a more sustainable and equitable world by 2030.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <div className="group relative flex flex-col items-center p-3 bg-black text-white rounded-lg shadow-sm border border-transparent hover:border-green-600 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-xs text-center mt-1">No Poverty</span>
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                <Link
                  href="/startsdginfo"
                  className="bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded w-full text-center"
                >
                  See more details
                </Link>
              </div>
            </div>

            <div className="group relative flex flex-col items-center p-3 bg-black text-white rounded-lg shadow-sm border border-transparent hover:border-green-600 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                />
              </svg>
              <span className="text-xs text-center mt-1">Zero Hunger</span>
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                <Link
                  href="/startsdginfo"
                  className="bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded w-full text-center"
                >
                  See more details
                </Link>
              </div>
            </div>

            <div className="group relative flex flex-col items-center p-3 bg-black text-white rounded-lg shadow-sm border border-transparent hover:border-green-600 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="text-xs text-center mt-1">Good Health</span>
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                <Link
                  href="/startsdginfo"
                  className="bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded w-full text-center"
                >
                  See more details
                </Link>
              </div>
            </div>

            <div className="group relative flex flex-col items-center p-3 bg-black text-white rounded-lg shadow-sm border border-transparent hover:border-green-600 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span className="text-xs text-center mt-1">Gender Equality</span>
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                <Link
                  href="/startsdginfo"
                  className="bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded w-full text-center"
                >
                  See more details
                </Link>
              </div>
            </div>

            <div className="group relative flex flex-col items-center p-3 bg-black text-white rounded-lg shadow-sm border border-transparent hover:border-green-600 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              <span className="text-xs text-center mt-1">Clean Water</span>
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                <Link
                  href="/startsdginfo"
                  className="bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded w-full text-center"
                >
                  See more details
                </Link>
              </div>
            </div>

            <div className="group relative flex flex-col items-center p-3 bg-black text-white rounded-lg shadow-sm border border-transparent hover:border-green-600 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs text-center mt-1">Clean Energy</span>
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                <Link
                  href="/startsdginfo"
                  className="bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded w-full text-center"
                >
                  See more details
                </Link>
              </div>
            </div>

            <div className="group relative flex flex-col items-center p-3 bg-black text-white rounded-lg shadow-sm border border-transparent hover:border-green-600 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs text-center mt-1">Economic Growth</span>
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                <Link
                  href="/startsdginfo"
                  className="bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded w-full text-center"
                >
                  See more details
                </Link>
              </div>
            </div>

            <div className="group relative flex flex-col items-center p-3 bg-black text-white rounded-lg shadow-sm border border-transparent hover:border-green-600 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span className="text-xs text-center mt-1">Industry & Innovation</span>
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                <Link
                  href="/startsdginfo"
                  className="bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded w-full text-center"
                >
                  See more details
                </Link>
              </div>
            </div>

            <div className="group relative flex flex-col items-center p-3 bg-black text-white rounded-lg shadow-sm border border-transparent hover:border-green-600 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
              <span className="text-xs text-center mt-1">Reduced Inequalities</span>
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                <Link
                  href="/startsdginfo"
                  className="bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded w-full text-center"
                >
                  See more details
                </Link>
              </div>
            </div>

            <div className="group relative flex flex-col items-center p-3 bg-black text-white rounded-lg shadow-sm border border-transparent hover:border-green-600 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span className="text-xs text-center mt-1">Sustainable Cities</span>
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                <Link
                  href="/startsdginfo"
                  className="bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded w-full text-center"
                >
                  See more details
                </Link>
              </div>
            </div>

            <div className="group relative flex flex-col items-center p-3 bg-black text-white rounded-lg shadow-sm border border-transparent hover:border-green-600 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="text-xs text-center mt-1">Responsible Consumption</span>
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                <Link
                  href="/startsdginfo"
                  className="bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded w-full text-center"
                >
                  See more details
                </Link>
              </div>
            </div>

            <div className="group relative flex flex-col items-center p-3 bg-black text-white rounded-lg shadow-sm border border-transparent hover:border-green-600 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs text-center mt-1">Climate Action</span>
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                <Link
                  href="/startsdginfo"
                  className="bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded w-full text-center"
                >
                  See more details
                </Link>
              </div>
            </div>

            <div className="group relative flex flex-col items-center p-3 bg-black text-white rounded-lg shadow-sm border border-transparent hover:border-green-600 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
              <span className="text-xs text-center mt-1">Life Below Water</span>
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                <Link
                  href="/startsdginfo"
                  className="bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded w-full text-center"
                >
                  See more details
                </Link>
              </div>
            </div>

            <div className="group relative flex flex-col items-center p-3 bg-black text-white rounded-lg shadow-sm border border-transparent hover:border-green-600 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <span className="text-xs text-center mt-1">Life On Land</span>
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                <Link
                  href="/startsdginfo"
                  className="bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded w-full text-center"
                >
                  See more details
                </Link>
              </div>
            </div>

            <div className="group relative flex flex-col items-center p-3 bg-black text-white rounded-lg shadow-sm border border-transparent hover:border-green-600 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-xs text-center mt-1">Partnerships</span>
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                <Link
                  href="/startsdginfo"
                  className="bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded w-full text-center"
                >
                  See more details
                </Link>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Our Focus Areas</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 mt-0.5">
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
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Clean Water and Sanitation (SDG 6)</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 mt-0.5">
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
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Affordable and Clean Energy (SDG 7)</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 mt-0.5">
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
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Responsible Consumption and Production (SDG 12)</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 mt-0.5">
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
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Climate Action (SDG 13)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Our Impact</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Clean Water Projects</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 border border-green-600">
                    <div className="bg-black h-2.5 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Renewable Energy</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 border border-green-600">
                    <div className="bg-black h-2.5 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Waste Reduction</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 border border-green-600">
                    <div className="bg-black h-2.5 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Carbon Offset</span>
                    <span className="text-sm font-medium">53%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 border border-green-600">
                    <div className="bg-black h-2.5 rounded-full" style={{ width: "53%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Link href="/startsdginfo">
              <Button
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
              >
                Learn More About Our SDG Initiatives
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Global Impact</h2>
              <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                Measuring our contribution to a more sustainable world through data-driven insights
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Users Chart */}
            <ChartWithAnimation
              title="Active Platform Users"
              value={125000}
              displayValue="125K+"
              subtitle="Global Users"
              description="Active users across 45+ countries contributing to environmental initiatives"
              strokeColor="#065f46"
              percentage={80}
            />

            {/* People Benefitted Chart */}
            <ChartWithAnimation
              title="People Benefitted"
              value={2300000}
              displayValue="2.3M+"
              subtitle="Lives Improved"
              description="Communities with improved access to clean water, sustainable energy, and education"
              strokeColor="#000000"
              percentage={75}
            />

            {/* Carbon Reduction Chart */}
            <ChartWithAnimation
              title="Carbon Reduction"
              value={840000}
              displayValue="840K"
              subtitle="Tons CO₂"
              description="Total carbon emissions reduced through our sustainable initiatives and user actions"
              strokeColor="#10b981"
              percentage={70}
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Us</h2>
              <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                Meet the team behind EnviroMind and our mission to create a more sustainable future
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center border border-transparent hover:border-green-600 focus-within:border-green-600 transition-colors duration-300"
              tabIndex={0}
            >
              <div className="w-24 h-24 mx-auto mb-4 overflow-hidden">
                <Image
                  src="/arya.png"
                  alt="Arya J"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Arya J</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Co-Founder & Lead Developer</p>
              <p className="text-sm">
                Passionate about leveraging technology to solve environmental challenges and create sustainable
                solutions for future generations.
              </p>
            </div>

            <div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center border border-transparent hover:border-green-600 focus-within:border-green-600 transition-colors duration-300"
              tabIndex={0}
            >
              <div className="w-24 h-24 mx-auto mb-4 overflow-hidden">
                <Image
                  src="/rohanb.png"
                  alt="Rohan B"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  priority
                  onError={(e) => {
                    // Fallback to JPEG if PNG fails
                    const target = e.target as HTMLImageElement
                    target.onerror = null // Prevent infinite loop
                    target.src = "/rohanb.jpeg"
                  }}
                />
                {/* Fallback image in case Next.js Image fails */}
                <img
                  src="/rohanb.jpeg"
                  alt="Rohan B Fallback"
                  className="hidden"
                  onLoad={(e) => {
                    const nextImage = e.currentTarget.previousElementSibling as HTMLElement
                    if (nextImage && window.getComputedStyle(nextImage).opacity === "0") {
                      nextImage.style.display = "none"
                      e.currentTarget.className = "w-full h-full object-cover"
                    }
                  }}
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Rohan B</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Co-Founder & Environmental Specialist</p>
              <p className="text-sm">
                Dedicated to creating innovative approaches to environmental conservation and promoting sustainable
                practices worldwide.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400">
              Founded in 2023, EnviroMind is committed to advancing the United Nations Sustainable Development Goals
              through technology, education, and community engagement. Our platform connects individuals and
              organizations with the tools and resources they need to make a positive impact on our planet.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-green-50 dark:bg-green-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Community Today</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Be part of the solution and help create a sustainable future for generations to come
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => navigateToTool("/dashboard")}
              >
                Sign Up Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-green-600">EnviroMind</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sustainable solutions for a better tomorrow. © 2025 EnviroMind.
            </p>
          </div>
          <nav className="flex flex-wrap gap-4 md:gap-6">
            <Link href="/contact" className="text-sm font-medium hover:text-green-600 transition-colors">
              Contact
            </Link>
            <Link
              href="/frequently-asked-questions"
              className="text-sm font-medium hover:text-green-600 transition-colors"
            >
              FAQs
            </Link>
            <Link href="/careers" className="text-sm font-medium hover:text-green-600 transition-colors">
              Careers
            </Link>
            <button
              onClick={() => navigateToTool("/publications")}
              className="text-sm font-medium hover:text-green-600 transition-colors bg-transparent border-none p-0 cursor-pointer"
            >
              Publications
            </button>
          </nav>
        </div>
      </footer>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  )
}

"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3Icon,
  BookOpenIcon,
  CreditCardIcon,
  FileTextIcon,
  GlobeIcon,
  HeartHandshakeIcon,
  HomeIcon,
  LeafIcon,
  LifeBuoyIcon,
  LogOutIcon,
  MessageSquareIcon,
  Settings2Icon,
  UserIcon,
  UsersIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  StoreIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AppSidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [userName, setUserName] = useState("Arya J")
  const [userImage, setUserImage] = useState("/abstract-profile.png")
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Load user data from localStorage on initial render and when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleStorageChange = () => {
        const savedUser = localStorage.getItem("enviromind_user")
        const savedImage = localStorage.getItem("enviromind_profile_image")

        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser)
            setUserName(parsedUser.fullName || "Arya J")
          } catch (e) {
            console.error("Failed to parse saved user data")
          }
        }

        if (savedImage) {
          setUserImage(savedImage)
        }
      }

      // Initial load
      handleStorageChange()

      // Listen for changes
      window.addEventListener("storage", handleStorageChange)

      // Custom event for when we update localStorage directly
      window.addEventListener("enviromind_user_updated", handleStorageChange)

      return () => {
        window.removeEventListener("storage", handleStorageChange)
        window.removeEventListener("enviromind_user_updated", handleStorageChange)
      }
    }
  }, [])

  const handleLogout = () => {
    // Show logout transition
    setIsLoggingOut(true)

    // Small delay to show transition
    setTimeout(() => {
      // Clear user data from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("enviromind_user")
        localStorage.removeItem("enviromind_profile_image")

        // Trigger the custom event to update the UI
        window.dispatchEvent(new Event("enviromind_user_updated"))

        // Redirect to home page with a small delay to allow for transition
        window.location.href = "/"
      }
    }, 500)
  }

  // This will preserve the sidebar scroll position between page navigations
  useEffect(() => {
    // Reference to the sidebar element
    const sidebarRef = document.getElementById("enviromind-sidebar")

    // Store the current scroll position in sessionStorage when navigating
    const handleScroll = () => {
      if (sidebarRef) {
        sessionStorage.setItem("sidebarScrollPosition", sidebarRef.scrollTop.toString())
      }
    }

    // Add scroll event listener
    if (sidebarRef) {
      sidebarRef.addEventListener("scroll", handleScroll)

      // Restore scroll position from sessionStorage
      const savedScrollPosition = sessionStorage.getItem("sidebarScrollPosition")
      if (savedScrollPosition) {
        sidebarRef.scrollTop = Number.parseInt(savedScrollPosition)
      }
    }

    // Clean up event listener
    return () => {
      if (sidebarRef) {
        sidebarRef.removeEventListener("scroll", handleScroll)
      }
    }
  }, [pathname]) // Re-run when pathname changes

  return (
    <div
      id="enviromind-sidebar"
      className={cn(
        "pb-12 w-64 border-r bg-white dark:bg-gray-950 h-screen overflow-y-auto transition-opacity duration-500 text-gray-900 dark:text-gray-100",
        isLoggingOut ? "opacity-50 pointer-events-none" : "opacity-100",
        className,
      )}
    >
      {isLoggingOut && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 dark:bg-black bg-opacity-70">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      )}
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <Link href="/" className="flex items-center gap-2">
            <LeafIcon className="h-6 w-6 text-emerald-500" />
            <h2 className="text-lg font-semibold tracking-tight">EnviroMind</h2>
          </Link>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Sustainable Development Platform</p>
        </div>

        {/* User Profile Section */}
        <div className="px-4 py-2 border-t border-b border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <Link
              href="/profile"
              className="flex items-center gap-3 py-2 hover:bg-gray-800 rounded-md px-2 transition-all"
            >
              <Avatar className="h-10 w-10 border-2 border-emerald-500">
                <AvatarImage src={userImage || "/placeholder.svg"} alt="Profile" />
                <AvatarFallback>{userName.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">{userName}</h3>
                <p className="text-xs text-muted-foreground">View Profile</p>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOutIcon className="h-5 w-5 text-red-500" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>

        <div className="px-3">
          <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight text-gray-700 dark:text-gray-400">
            Navigation
          </h2>
          <div className="space-y-1">
            <Button
              asChild
              variant="ghost"
              className={`w-full justify-start hover:bg-emerald-500 hover:text-black dark:hover:text-white transition-all ${
                pathname === "/dashboard" ? "bg-emerald-500 text-black dark:text-white" : ""
              }`}
            >
              <Link href="/dashboard">
                <HomeIcon className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`w-full justify-start hover:bg-emerald-500 hover:text-black dark:hover:text-white transition-all ${
                pathname === "/sdginfo" ? "bg-emerald-500 text-black dark:text-white" : ""
              }`}
            >
              <Link href="/sdginfo">
                <BookOpenIcon className="mr-2 h-4 w-4" />
                SDG Information
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`w-full justify-start hover:bg-emerald-500 hover:text-black dark:hover:text-white transition-all ${
                pathname === "/redeem-credits" ? "bg-emerald-500 text-black dark:text-white" : ""
              }`}
            >
              <Link href="/redeem-credits">
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Redeem Credits
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`w-full justify-start hover:bg-emerald-500 hover:text-black dark:hover:text-white transition-all ${
                pathname === "/profile" ? "bg-emerald-500 text-black dark:text-white" : ""
              }`}
            >
              <Link href="/profile">
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`w-full justify-start hover:bg-emerald-500 hover:text-black dark:hover:text-white transition-all ${
                pathname === "/publications" ? "bg-emerald-500 text-black dark:text-white" : ""
              }`}
            >
              <Link href="/publications">
                <FileTextIcon className="mr-2 h-4 w-4" />
                Publications
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3">
          <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight text-gray-700 dark:text-gray-400">SDG Tools</h2>
          <div className="space-y-1">
            <Button
              asChild
              variant="ghost"
              className={`w-full justify-start hover:bg-emerald-600 hover:text-white ${
                pathname === "/tools/eco-scan" ? "bg-emerald-600 text-white" : ""
              }`}
            >
              <Link href="/tools/eco-scan">
                <GlobeIcon className="mr-2 h-4 w-4" />
                EcoScan
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`w-full justify-start hover:bg-green-600 hover:text-white ${
                pathname === "/tools/agro-vision" ? "bg-green-600 text-white" : ""
              }`}
            >
              <Link href="/tools/agro-vision">
                <LeafIcon className="mr-2 h-4 w-4" />
                AgroVision
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`w-full justify-start hover:bg-blue-600 hover:text-white ${
                pathname === "/tools/pollu-map" ? "bg-blue-600 text-white" : ""
              }`}
            >
              <Link href="/tools/pollu-map">
                <BarChart3Icon className="mr-2 h-4 w-4" />
                PolluMap
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`w-full justify-start hover:bg-purple-600 hover:text-white ${
                pathname === "/tools/dr-r" ? "bg-purple-600 text-white" : ""
              }`}
            >
              <Link href="/tools/dr-r">
                <HeartHandshakeIcon className="mr-2 h-4 w-4" />
                Dr. R
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`w-full justify-start hover:bg-orange-600 hover:text-white ${
                pathname === "/tools/madam-a" ? "bg-orange-600 text-white" : ""
              }`}
            >
              <Link href="/tools/madam-a">
                <UsersIcon className="mr-2 h-4 w-4" />
                Madam A
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3">
          <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight text-gray-700 dark:text-gray-400">
            EnviroMind eMarkets
          </h2>
          <div className="space-y-3">
            <Button
              asChild
              variant="ghost"
              className={`w-full justify-start text-sm hover:border-green-500 hover:border-2 focus:border-green-500 focus:border-2 transition-all ${
                pathname === "/revive-store" ? "border-green-500 border-2" : ""
              }`}
            >
              <Link href="/revive-store">
                <ShoppingBagIcon className="mr-2 h-4 w-4 text-green-500" />
                EcoScan - Revive Store
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start text-xs hover:border-lime-500 hover:border-2 focus:border-lime-500 focus:border-2 transition-all pr-2"
            >
              <Link href="/farmers-market">
                <StoreIcon className="mr-2 h-4 w-4 text-lime-500" />
                AgroVision - Farmers Market
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start text-sm hover:border-fuchsia-500 hover:border-2 focus:border-fuchsia-500 focus:border-2 transition-all"
            >
              <Link href="/eco-pharmacy">
                <ShoppingCartIcon className="mr-2 h-4 w-4 text-fuchsia-500" />
                Dr. R - Eco Pharmacy
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3">
          <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight text-gray-700 dark:text-gray-400">Support</h2>
          <div className="space-y-1">
            <Button
              asChild
              variant="ghost"
              className={`w-full justify-start hover:bg-emerald-500 hover:text-black dark:hover:text-white transition-all ${
                pathname === "/contact-us" ? "bg-emerald-500 text-black dark:text-white" : ""
              }`}
            >
              <Link href="/contact-us">
                <MessageSquareIcon className="mr-2 h-4 w-4" />
                Contact Us
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`w-full justify-start hover:bg-emerald-500 hover:text-black dark:hover:text-white transition-all ${
                pathname === "/faqs" ? "bg-emerald-500 text-black dark:text-white" : ""
              }`}
            >
              <Link href="/faqs">
                <LifeBuoyIcon className="mr-2 h-4 w-4" />
                FAQs
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`w-full justify-start hover:bg-emerald-500 hover:text-black dark:hover:text-white transition-all ${
                pathname === "/work-with-us" ? "bg-emerald-500 text-black dark:text-white" : ""
              }`}
            >
              <Link href="/work-with-us">
                <Settings2Icon className="mr-2 h-4 w-4" />
                Work With Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

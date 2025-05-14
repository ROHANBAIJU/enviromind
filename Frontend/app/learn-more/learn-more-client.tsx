"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function LearnMoreClient() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const hasCheckedAuth = useRef(false)

  // Safe localStorage access with error handling
  const getLocalStorageItem = (key: string): string | null => {
    try {
      if (typeof window !== "undefined") {
        return window.localStorage.getItem(key)
      }
      return null
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      return null
    }
  }

  const setLocalStorageItem = (key: string, value: string): boolean => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, value)
        return true
      }
      return false
    } catch (error) {
      console.error("Error setting localStorage:", error)
      return false
    }
  }

  // Check login status only once on client-side
  useEffect(() => {
    if (!hasCheckedAuth.current && typeof window !== "undefined") {
      const user = getLocalStorageItem("enviromind_user")
      setIsLoggedIn(!!user)
      hasCheckedAuth.current = true
    }
  }, [])

  const handleExploreClick = () => {
    if (isLoggedIn) {
      router.push("/dashboard")
    } else {
      setLocalStorageItem("redirect_after_login", "/dashboard")
      router.push("/")
    }
  }

  // Only render the button when we know the login status
  if (isLoggedIn === null) {
    return (
      <Button size="lg" className="bg-gray-400 cursor-not-allowed" disabled>
        Loading...
      </Button>
    )
  }

  return (
    <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={handleExploreClick}>
      Explore Our Platform
    </Button>
  )
}

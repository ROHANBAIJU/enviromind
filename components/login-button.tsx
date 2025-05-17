"use client"

import type React from "react"

import { Button } from "@/components/ui/button"

interface LoginButtonProps {
  setShowLoginModal: (show: boolean) => void
  className?: string
  children?: React.ReactNode
}

export function LoginButton({
  setShowLoginModal,
  className = "bg-green-600 hover:bg-green-700",
  children = "Login",
}: LoginButtonProps) {
  return (
    <Button onClick={() => setShowLoginModal(true)} className={className}>
      {children}
    </Button>
  )
}

export default LoginButton

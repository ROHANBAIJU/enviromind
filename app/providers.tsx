"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { PharmacyProvider } from "@/lib/pharmacy-context"
import { StoreProvider } from "@/lib/store-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <StoreProvider>
        <PharmacyProvider>{children}</PharmacyProvider>
      </StoreProvider>
    </ThemeProvider>
  )
}

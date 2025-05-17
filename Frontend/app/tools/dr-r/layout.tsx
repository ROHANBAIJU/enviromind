import type React from "react"
import { PharmacyProvider } from "@/lib/pharmacy-context"
import SidebarLayout from "@/components/layouts/sidebar-layout"

export default function DrRLayout({ children }: { children: React.ReactNode }) {
  return (
    <PharmacyProvider>
      <SidebarLayout>{children}</SidebarLayout>
    </PharmacyProvider>
  )
}

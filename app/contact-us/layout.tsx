import type React from "react"
import SidebarLayout from "@/components/layouts/sidebar-layout"

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>
}

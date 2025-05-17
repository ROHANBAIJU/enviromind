import type React from "react"
import SidebarLayout from "@/components/layouts/sidebar-layout"

export default function WorkWithUsLayout({ children }: { children: React.ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>
}

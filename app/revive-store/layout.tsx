import type React from "react"
import { SidebarLayout } from "@/components/layouts/sidebar-layout"

export default function ReviveStoreLayout({ children }: { children: React.ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>
}

import type React from "react"
import type { Metadata } from "next"
import AppSidebar from "@/components/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

export const metadata: Metadata = {
  title: "Publications - EnviroMind",
  description: "Share your SDG-related projects and ideas",
}

export default function PublicationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b flex items-center justify-end px-4">
          <ThemeToggle />
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

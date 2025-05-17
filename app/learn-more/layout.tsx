import type React from "react"
export default function LearnMoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="min-h-screen bg-background">{children}</main>
}

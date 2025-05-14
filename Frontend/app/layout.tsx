import type React from "react"
import "@/app/globals.css"
import { Providers } from "./providers"

export const metadata = {
  title: "EnviroMind Platform",
  description: "A platform for environmental sustainability and SDG awareness",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

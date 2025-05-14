import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Us | EnviroMind",
  description: "Get in touch with the EnviroMind team for questions, feedback, or support.",
}

export default function ContactPage() {
  return <ContactPageClient />
}

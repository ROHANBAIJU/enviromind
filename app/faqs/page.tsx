"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, HelpCircle } from "lucide-react"

const faqs = [
  {
    id: "faq-1",
    question: "What is EnviroMind?",
    answer:
      "EnviroMind is a platform dedicated to promoting sustainable development goals (SDGs) through user engagement, education, and incentives. We help individuals and organizations make environmentally conscious choices and track their positive impact on the planet.",
  },
  {
    id: "faq-2",
    question: "How do I earn credits on EnviroMind?",
    answer:
      "You can earn credits by completing various sustainability tasks such as using Dr R for 30 minutes, scanning products with Eco Scan, learning with Madam A for 30 minutes, or purchasing eco-friendly products from the EnviroMind pharmacy.",
  },
  {
    id: "faq-3",
    question: "What can I do with my credits?",
    answer:
      "Credits can be redeemed for sustainable products in our marketplace. These products are carefully selected to promote environmental consciousness and sustainable living. The more credits you earn, the more you contribute to creating a sustainable world.",
  },
  {
    id: "faq-4",
    question: "How is my sustainability score calculated?",
    answer:
      "Your sustainability score is calculated based on your activities on the platform, including completed tasks, redeemed products, and overall engagement with sustainable practices. The score represents your contribution to creating a sustainable world through EnviroMind.",
  },
  {
    id: "faq-5",
    question: "What is Eco Scan?",
    answer:
      "Eco Scan is a feature that allows you to scan product barcodes to check their environmental impact and sustainability rating. By using Eco Scan, you can make more informed purchasing decisions and earn credits for being environmentally conscious.",
  },
  {
    id: "faq-6",
    question: "Who are Dr R and Madam A?",
    answer:
      "Dr R and Madam A are our virtual sustainability experts who provide educational content and guidance on environmental topics. By engaging with their content, you can learn more about sustainable practices and earn credits.",
  },
  {
    id: "faq-7",
    question: "How can I track my progress?",
    answer:
      "Your progress is tracked on your personal dashboard, which displays your sustainability score, earned credits, completed tasks, and redeemed products. You can access your dashboard at any time to see your contribution to creating a sustainable world.",
  },
  {
    id: "faq-8",
    question: "Can I gift my credits to someone else?",
    answer:
      "Currently, credits cannot be transferred between accounts. However, we're working on implementing a gifting feature in the future to allow users to share their sustainability journey with friends and family.",
  },
  {
    id: "faq-9",
    question: "How can I provide feedback or suggestions?",
    answer:
      "We value your input! You can provide feedback or suggestions through the Contact Us page. Your insights help us improve the platform and better serve our community of environmentally conscious users.",
  },
  {
    id: "faq-10",
    question: "Is EnviroMind available internationally?",
    answer:
      "Yes, EnviroMind is available globally. Our mission is to promote sustainable development goals worldwide and create a positive environmental impact on a global scale.",
  },
]

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about EnviroMind, credits, sustainability, and more.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search FAQs..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card className="max-w-3xl mx-auto transition-all hover:border-emerald-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-emerald-500" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>Browse through our most commonly asked questions</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="transition-all hover:border-emerald-400">
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No FAQs found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

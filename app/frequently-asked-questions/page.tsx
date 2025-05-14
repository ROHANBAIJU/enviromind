import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | EnviroMind",
  description: "Find answers to common questions about EnviroMind platform and sustainability.",
}

export default function FrequentlyAskedQuestionsPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>About EnviroMind</CardTitle>
          <CardDescription>Learn more about our platform and mission</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is EnviroMind?</AccordionTrigger>
              <AccordionContent>
                EnviroMind is a comprehensive platform designed to help individuals and organizations track, improve,
                and share their sustainability efforts. Our tools provide insights into environmental impact, suggest
                improvements, and connect users with sustainable resources.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How does EnviroMind support the SDGs?</AccordionTrigger>
              <AccordionContent>
                EnviroMind aligns all its tools and features with the UN Sustainable Development Goals (SDGs). Each tool
                is designed to address specific SDGs, and our platform provides educational resources about each goal
                and how users can contribute to achieving them.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is EnviroMind free to use?</AccordionTrigger>
              <AccordionContent>
                EnviroMind offers both free and premium tiers. The free tier provides access to basic features and
                tools, while the premium subscription unlocks advanced analytics, personalized recommendations, and
                additional resources.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Using Our Tools</CardTitle>
          <CardDescription>Information about our sustainability tools</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="tools-1">
              <AccordionTrigger>What is EcoScan?</AccordionTrigger>
              <AccordionContent>
                EcoScan is our flagship tool that helps users analyze products and materials for their environmental
                impact. By scanning barcodes or inputting product information, users receive sustainability scores and
                alternative recommendations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="tools-2">
              <AccordionTrigger>How does PolluMap work?</AccordionTrigger>
              <AccordionContent>
                PolluMap uses geospatial data to visualize pollution levels and environmental risks in different areas.
                Users can explore air quality, water pollution, and other environmental factors in their region and
                receive alerts about changing conditions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="tools-3">
              <AccordionTrigger>What is Dr. R?</AccordionTrigger>
              <AccordionContent>
                Dr. R is our eco-pharmacy tool that helps users find environmentally friendly alternatives to common
                products. It provides information about sustainable ingredients, packaging, and disposal methods for
                various household and personal care items.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="tools-4">
              <AccordionTrigger>How can I use Madam A?</AccordionTrigger>
              <AccordionContent>
                Madam A is our AI assistant specialized in sustainability. You can ask questions about environmental
                topics, get personalized advice on reducing your carbon footprint, and receive recommendations for
                sustainable practices tailored to your lifestyle.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="tools-5">
              <AccordionTrigger>What is AgroVision?</AccordionTrigger>
              <AccordionContent>
                AgroVision connects users with sustainable farming practices and local produce. It provides information
                about nearby farmers markets, organic farms, and seasonal produce availability, helping users make
                environmentally conscious food choices.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Account & Credits</CardTitle>
          <CardDescription>Information about accounts and sustainability credits</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="account-1">
              <AccordionTrigger>How do I earn sustainability credits?</AccordionTrigger>
              <AccordionContent>
                You can earn sustainability credits by completing eco-friendly actions tracked through our platform,
                participating in community challenges, contributing to environmental projects, and consistently using
                our tools to make sustainable choices.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="account-2">
              <AccordionTrigger>What can I do with my sustainability credits?</AccordionTrigger>
              <AccordionContent>
                Sustainability credits can be redeemed for eco-friendly products in our REVIVE Store, donated to
                environmental causes, used to unlock premium features, or converted to discounts with our partner
                organizations that offer sustainable goods and services.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="account-3">
              <AccordionTrigger>How do I track my environmental impact?</AccordionTrigger>
              <AccordionContent>
                Your dashboard displays personalized impact metrics that track your carbon footprint, water usage, waste
                reduction, and other environmental indicators. These metrics are updated based on your activities and
                choices logged in our platform.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Technical Support</CardTitle>
          <CardDescription>Help with technical issues</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="tech-1">
              <AccordionTrigger>How do I reset my password?</AccordionTrigger>
              <AccordionContent>
                You can reset your password by clicking on the "Forgot Password" link on the login page. You will
                receive an email with instructions to create a new password. If you don't receive the email, please
                check your spam folder or contact our support team.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="tech-2">
              <AccordionTrigger>Is my data secure on EnviroMind?</AccordionTrigger>
              <AccordionContent>
                Yes, we take data security seriously. All personal information is encrypted, and we follow industry best
                practices for data protection. We never share your information with third parties without your explicit
                consent. You can review our privacy policy for more details.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="tech-3">
              <AccordionTrigger>How can I contact support?</AccordionTrigger>
              <AccordionContent>
                For technical support, you can reach our team through the Contact page on our website, send an email to
                support@enviromind.org, or use the in-app chat feature available in the bottom right corner of your
                dashboard.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

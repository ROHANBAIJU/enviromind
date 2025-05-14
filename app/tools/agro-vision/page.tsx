"use client"

import { useState } from "react"
import { AgroVisionTool } from "@/components/tools/agro-vision"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Info, Leaf, Sprout, Globe } from "lucide-react"
import Link from "next/link"

export default function AgroVisionPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sprout className="h-8 w-8 text-green-600" />
            AgroVision Tool
          </h1>
          <p className="text-muted-foreground mt-1">Advanced agricultural analysis for sustainable farming practices</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="bg-green-50 dark:bg-green-950/20 border-b">
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
            <Info className="h-5 w-5" />
            About AgroVision
          </CardTitle>
          <CardDescription>
            AgroVision helps you analyze plant health, soil conditions, and connect with local farmers to promote
            sustainable agriculture.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4">
            AgroVision combines advanced image recognition, soil analysis, and agricultural data to provide
            comprehensive insights for sustainable farming. Upload images of your plants for health analysis, analyze
            soil samples, or connect with local farmers through our marketplace.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sprout className="h-5 w-5 text-green-600" />
                  Plant Analysis
                </CardTitle>
                <CardDescription>Identify plant health issues and get care recommendations</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Soil Analysis
                </CardTitle>
                <CardDescription>Analyze soil composition and get improvement suggestions</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  Farmers Market
                </CardTitle>
                <CardDescription>Connect with local farmers and buy fresh produce</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tool">Use Tool</TabsTrigger>
          <TabsTrigger value="impact">Impact Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sustainable Agriculture</CardTitle>
              <CardDescription>Learn how AgroVision supports sustainable development goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  AgroVision directly supports SDG 2 (Zero Hunger), SDG 12 (Responsible Consumption and Production), and
                  SDG 15 (Life on Land) by promoting sustainable agricultural practices.
                </p>

                <h3>Key Features:</h3>
                <ul>
                  <li>Plant health analysis using advanced image recognition</li>
                  <li>Soil composition analysis with improvement recommendations</li>
                  <li>Local farmers market connecting consumers with sustainable producers</li>
                  <li>Agricultural news and data insights</li>
                  <li>Sustainable farming practice recommendations</li>
                </ul>

                <h3>Benefits:</h3>
                <ul>
                  <li>Increased crop yields through early disease detection</li>
                  <li>Reduced use of fertilizers and pesticides</li>
                  <li>Support for local, sustainable food systems</li>
                  <li>Decreased food miles and carbon footprint</li>
                  <li>Preservation of biodiversity and soil health</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tool">
          <AgroVisionTool onClose={() => setActiveTab("overview")} />
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Impact</CardTitle>
              <CardDescription>Measuring the impact of sustainable agriculture practices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Environmental Impact</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-green-600">42%</div>
                      <div className="text-sm text-muted-foreground">Reduction in water usage</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-green-600">38%</div>
                      <div className="text-sm text-muted-foreground">Less fertilizer needed</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-green-600">27%</div>
                      <div className="text-sm text-muted-foreground">Reduced pesticide use</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-green-600">65%</div>
                      <div className="text-sm text-muted-foreground">Improved soil health</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Economic Impact</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-green-600">28%</div>
                      <div className="text-sm text-muted-foreground">Increased crop yields</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-green-600">45%</div>
                      <div className="text-sm text-muted-foreground">Higher farmer income</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-green-600">12K+</div>
                      <div className="text-sm text-muted-foreground">Local farmers supported</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-green-600">$4.2M</div>
                      <div className="text-sm text-muted-foreground">Community economic impact</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

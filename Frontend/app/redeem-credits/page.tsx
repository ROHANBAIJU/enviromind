"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Leaf, Award } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { SustainabilityMeter } from "@/components/sustainability-meter"
import ProductGrid from "@/components/product-grid"
import TaskList from "@/components/task-list"

export default function RedeemCreditsPage() {
  const [userCredits, setUserCredits] = useState(500)
  const [sustainabilityScore, setSustainabilityScore] = useState(42)
  const { toast } = useToast()

  const handleRedeemProduct = (productId: string, cost: number) => {
    if (userCredits >= cost) {
      setUserCredits((prev) => prev - cost)
      setSustainabilityScore((prev) => Math.min(100, prev + 2))

      toast({
        title: "Product Redeemed!",
        description: "You've successfully redeemed this product.",
        variant: "success",
      })
    } else {
      toast({
        title: "Insufficient Credits",
        description: "You don't have enough credits to redeem this product.",
        variant: "destructive",
      })
    }
  }

  const handleCompleteTask = (taskId: string, creditReward: number) => {
    setUserCredits((prev) => prev + creditReward)
    setSustainabilityScore((prev) => Math.min(100, prev + 1))

    toast({
      title: "Task Completed!",
      description: `You've earned ${creditReward} credits!`,
      variant: "success",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <Card className="flex-1 transition-all hover:shadow-lg hover:border-emerald-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-emerald-500" />
              Your Sustainability Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SustainabilityMeter percentage={sustainabilityScore} />
            <p className="text-center mt-4">
              You have contributed <span className="font-bold text-emerald-500">{sustainabilityScore}%</span> in
              creating a sustainable world through EnviroMind
            </p>
          </CardContent>
        </Card>

        <Card className="flex-1 transition-all hover:shadow-lg hover:border-amber-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              Your Credits
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="text-5xl font-bold mb-4 transition-all hover:scale-110">{userCredits}</div>
            <Progress value={(userCredits / 1000) * 100} className="w-full h-2" />
            <p className="text-sm text-muted-foreground mt-2">Earn more credits by completing tasks</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="redeem" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="redeem">Redeem Products</TabsTrigger>
          <TabsTrigger value="earn">Earn Credits</TabsTrigger>
        </TabsList>

        <TabsContent value="redeem" className="mt-6">
          <ProductGrid userCredits={userCredits} onRedeem={handleRedeemProduct} />
        </TabsContent>

        <TabsContent value="earn" className="mt-6">
          <TaskList onCompleteTask={handleCompleteTask} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

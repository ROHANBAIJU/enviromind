"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LeafIcon, DropletIcon, BatteryChargingIcon, RecycleIcon } from "lucide-react"

export default function ImpactMetrics() {
  const [metrics, setMetrics] = useState({
    carbonSaved: 0,
    waterSaved: 0,
    energySaved: 0,
    wasteDiverted: 0,
  })

  useEffect(() => {
    // Simulate loading metrics
    setMetrics({
      carbonSaved: 245,
      waterSaved: 1250,
      energySaved: 78,
      wasteDiverted: 34,
    })
  }, [])

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Your Impact</CardTitle>
            <CardDescription>Environmental savings this month</CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            +12% from last month
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
              <LeafIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium">{metrics.carbonSaved} kg</p>
              <p className="text-xs text-muted-foreground">Carbon Saved</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <DropletIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium">{metrics.waterSaved} L</p>
              <p className="text-xs text-muted-foreground">Water Saved</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
              <BatteryChargingIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium">{metrics.energySaved} kWh</p>
              <p className="text-xs text-muted-foreground">Energy Saved</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
              <RecycleIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium">{metrics.wasteDiverted} kg</p>
              <p className="text-xs text-muted-foreground">Waste Diverted</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

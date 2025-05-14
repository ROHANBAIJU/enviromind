"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SustainabilityMeterProps {
  percentage?: number
}

export function SustainabilityMeter({ percentage }: SustainabilityMeterProps) {
  const [progress, setProgress] = useState(0)
  const [level, setLevel] = useState("Beginner")
  const [pointsToNextLevel, setPointsToNextLevel] = useState(100)
  const [currentPoints, setCurrentPoints] = useState(0)

  useEffect(() => {
    // If percentage is provided, use it, otherwise use default value
    const value = percentage !== undefined ? percentage : 65
    setProgress(value)
    setCurrentPoints(value)

    // Determine level based on percentage
    if (value < 30) {
      setLevel("Beginner")
    } else if (value < 60) {
      setLevel("Eco-Enthusiast")
    } else if (value < 80) {
      setLevel("Sustainability Champion")
    } else {
      setLevel("Environmental Guardian")
    }

    setPointsToNextLevel(100)
  }, [percentage])

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle>Your Sustainability Journey</CardTitle>
        <CardDescription>Track your environmental impact</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Level: {level}</span>
            <span className="text-sm text-muted-foreground">
              {currentPoints}/{pointsToNextLevel} points
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="text-xs text-muted-foreground text-center">
            {pointsToNextLevel - currentPoints} points to next level
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

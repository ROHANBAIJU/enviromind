"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  Award,
  CheckCircle,
  TrendingUp,
  ShoppingBag,
  Calendar,
  Camera,
  Sprout,
  MapPin,
  MessageSquare,
  BookOpen,
  Globe,
  Clock,
  ShoppingCart,
} from "lucide-react"
import { SustainabilityMeter } from "@/components/sustainability-meter"
import Link from "next/link"
import { EcoScanTool } from "@/components/tools/eco-scan"
import { AgroVisionTool } from "@/components/tools/agro-vision"
import { PolluMapTool } from "@/components/tools/pollu-map"
import DrRTool from "@/components/tools/dr-r"
import MadamATool from "@/components/tools/madam-a"
import { ThemeToggle } from "@/components/theme-toggle"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DashboardPage() {
  const [userStats, setUserStats] = useState({
    credits: 500,
    sustainabilityScore: 42, // This will be updated by calculateSustainabilityScore
    tasksCompleted: 12,
    productsRedeemed: 3,
  })

  const [toolUsage, setToolUsage] = useState({
    ecoscan: 15,
    agrovision: 8,
    pollumap: 12,
    drr: 20,
    madama: 10,
    reviveStore: 5,
    farmersMarket: 7,
  })

  // Calculate sustainability score based on tool usage
  const calculateSustainabilityScore = useCallback(() => {
    const totalUsage = Object.values(toolUsage).reduce((sum, value) => sum + value, 0)
    // Max possible score is 100, calculate percentage based on total usage (capped at 100)
    const calculatedScore = Math.min(Math.round((totalUsage / 150) * 100), 100)
    return calculatedScore
  }, [toolUsage])

  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<{
    from: Date
    to?: Date
  }>({
    from: new Date(),
    to: undefined,
  })
  const [taskTitle, setTaskTitle] = useState("")
  const [taskTime, setTaskTime] = useState("")
  const [miniCalendarOpen, setMiniCalendarOpen] = useState(false)

  interface Task {
    id: number
    name: string
    dueDate: string
    endDate?: string
    time: string
    credits: number
    isMultiDay?: boolean
  }

  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([
    { id: 1, name: "Weekly Eco Scan Challenge", dueDate: "Tomorrow", time: "10:00 AM", credits: 100 },
    { id: 2, name: "Dr R Consultation", dueDate: "In 3 days", time: "2:30 PM", credits: 75 },
    { id: 3, name: "Sustainability Webinar with Madam A", dueDate: "Next week", time: "", credits: 120 },
    {
      id: 4,
      name: "Environmental Conference",
      dueDate: "May 15, 2025",
      endDate: "May 18, 2025",
      time: "9:00 AM",
      credits: 200,
      isMultiDay: true,
    },
    { id: 5, name: "Community Garden Volunteering", dueDate: "May 20, 2025", time: "9:00 AM", credits: 150 },
    { id: 6, name: "Recycling Workshop", dueDate: "May 25, 2025", time: "2:00 PM", credits: 80 },
    { id: 7, name: "Beach Cleanup Event", dueDate: "June 1, 2025", time: "8:00 AM", credits: 180 },
    { id: 8, name: "Sustainable Cooking Class", dueDate: "June 5, 2025", time: "6:00 PM", credits: 90 },
  ])

  const recentActivities = [
    { id: 1, type: "task", name: "Used Dr R for 30 mins", date: "2 days ago", credits: 50 },
    { id: 2, type: "redeem", name: "Redeemed Eco-friendly Water Bottle", date: "5 days ago", credits: -200 },
    { id: 3, type: "task", name: "Used Eco Scan for 6 products", date: "1 week ago", credits: 60 },
    { id: 4, type: "task", name: "Used Madam A for learning", date: "1 week ago", credits: 50 },
    { id: 5, type: "redeem", name: "Redeemed Bamboo Cutlery Set", date: "2 weeks ago", credits: -150 },
  ]

  const renderActiveTool = () => {
    switch (activeTool) {
      case "ecoscan":
        return <EcoScanTool onClose={() => setActiveTool(null)} />
      case "agrovision":
        return <AgroVisionTool onClose={() => setActiveTool(null)} />
      case "pollumap":
        return <PolluMapTool onClose={() => setActiveTool(null)} />
      case "drr":
        return <DrRTool onClose={() => setActiveTool(null)} />
      case "madama":
        return <MadamATool onClose={() => setActiveTool(null)} />
      default:
        return null
    }
  }

  useEffect(() => {
    if (activeTool) {
      // Update tool usage when a tool is activated
      setToolUsage((prev) => ({
        ...prev,
        [activeTool]: prev[activeTool] + 1,
      }))
    }
  }, [activeTool])

  useEffect(() => {
    // Update sustainability score whenever toolUsage changes
    const newScore = calculateSustainabilityScore()
    setUserStats((prev) => ({
      ...prev,
      sustainabilityScore: newScore,
    }))
  }, [toolUsage, calculateSustainabilityScore])

  if (activeTool) {
    return renderActiveTool()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link href="/sdginfo?from=dashboard">
              <Globe className="mr-2 h-4 w-4" />
              SDG Info
            </Link>
          </Button>
          <Button asChild>
            <Link href="/redeem-credits">Redeem Credits</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>

      {/* SDG Tools Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">SDG Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Button
            onClick={() => setActiveTool("ecoscan")}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2 hover:bg-emerald-100 hover:text-emerald-800 dark:hover:bg-emerald-900 dark:hover:text-emerald-200 transition-all hover:scale-105"
          >
            <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
              <Camera className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="font-medium">EcoScan</span>
            <span className="text-xs text-muted-foreground">Scan products</span>
          </Button>

          <Button
            onClick={() => setActiveTool("agrovision")}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2 hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-900 dark:hover:text-green-200 transition-all hover:scale-105"
          >
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Sprout className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="font-medium">AgroVision</span>
            <span className="text-xs text-muted-foreground">Agricultural insights</span>
          </Button>

          <Button
            onClick={() => setActiveTool("pollumap")}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2 hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-900 dark:hover:text-blue-200 transition-all hover:scale-105"
          >
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="font-medium">PolluMap</span>
            <span className="text-xs text-muted-foreground">Pollution mapping</span>
          </Button>

          <Button
            onClick={() => setActiveTool("drr")}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2 hover:bg-purple-100 hover:text-purple-800 dark:hover:bg-purple-900 dark:hover:text-purple-200 transition-all hover:scale-105"
          >
            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="font-medium">Dr. R</span>
            <span className="text-xs text-muted-foreground">AI consultation</span>
          </Button>

          <Button
            onClick={() => setActiveTool("madama")}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2 hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-900 dark:hover:text-amber-200 transition-all hover:scale-105"
          >
            <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="font-medium">Madam A</span>
            <span className="text-xs text-muted-foreground">Educational courses</span>
          </Button>
        </div>
      </div>

      {/* Tutorial Video */}
      <div className="mb-8">
        <Card className="transition-all hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle>Tutorial Video</CardTitle>
            <CardDescription>Learn how to use EnviroMind's features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full max-w-2xl mx-auto rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dVqmA10NggA"
                title="EnviroMind Tutorial Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="transition-all hover:shadow-lg hover:border-amber-500 group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-amber-500 transition-colors">
              Credits Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-amber-500 mr-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold group-hover:text-amber-500 transition-colors">{userStats.credits}</div>
            </div>
            <Progress
              value={(userStats.credits / 1000) * 100}
              className="h-1 mt-2 group-hover:bg-amber-200 dark:group-hover:bg-amber-900 transition-colors"
            />
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-lg hover:border-emerald-500 group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-emerald-500 transition-colors">
              Sustainability Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Leaf className="h-5 w-5 text-emerald-500 mr-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold group-hover:text-emerald-500 transition-colors">
                {userStats.sustainabilityScore}%
              </div>
            </div>
            <Progress
              value={userStats.sustainabilityScore}
              className="h-1 mt-2 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900 transition-colors"
            />
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-lg hover:border-blue-500 group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-blue-500 transition-colors">
              Tasks Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-blue-500 mr-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold group-hover:text-blue-500 transition-colors">
                {userStats.tasksCompleted}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-lg hover:border-purple-500 group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-purple-500 transition-colors">
              Products Redeemed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 text-purple-500 mr-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold group-hover:text-purple-500 transition-colors">
                {userStats.productsRedeemed}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2 transition-all hover:shadow-lg hover:border-emerald-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Your Sustainability Journey
            </CardTitle>
            <CardDescription>Track your progress towards a sustainable lifestyle</CardDescription>
          </CardHeader>
          <CardContent>
            <SustainabilityMeter percentage={userStats.sustainabilityScore} />
            <p className="text-center mt-4 mb-6">
              You have contributed <span className="font-bold text-emerald-500">{userStats.sustainabilityScore}%</span>{" "}
              in creating a sustainable world through EnviroMind
            </p>

            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-medium mb-3">Tool Usage Statistics</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <Camera className="h-4 w-4 text-emerald-500 mr-1" />
                      EcoScan
                    </span>
                    <span>{toolUsage.ecoscan} uses</span>
                  </div>
                  <Progress value={(toolUsage.ecoscan / 30) * 100} className="h-2 bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(toolUsage.ecoscan / 30) * 100}%` }}
                    ></div>
                  </Progress>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <Sprout className="h-4 w-4 text-green-500 mr-1" />
                      AgroVision
                    </span>
                    <span>{toolUsage.agrovision} uses</span>
                  </div>
                  <Progress value={(toolUsage.agrovision / 30) * 100} className="h-2 bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(toolUsage.agrovision / 30) * 100}%` }}
                    ></div>
                  </Progress>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 text-blue-500 mr-1" />
                      PolluMap
                    </span>
                    <span>{toolUsage.pollumap} uses</span>
                  </div>
                  <Progress value={(toolUsage.pollumap / 30) * 100} className="h-2 bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(toolUsage.pollumap / 30) * 100}%` }}
                    ></div>
                  </Progress>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <MessageSquare className="h-4 w-4 text-purple-500 mr-1" />
                      Dr. R
                    </span>
                    <span>{toolUsage.drr} uses</span>
                  </div>
                  <Progress value={(toolUsage.drr / 30) * 100} className="h-2 bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${(toolUsage.drr / 30) * 100}%` }}
                    ></div>
                  </Progress>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <BookOpen className="h-4 w-4 text-amber-500 mr-1" />
                      Madam A
                    </span>
                    <span>{toolUsage.madama} uses</span>
                  </div>
                  <Progress value={(toolUsage.madama / 30) * 100} className="h-2 bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${(toolUsage.madama / 30) * 100}%` }}
                    ></div>
                  </Progress>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <ShoppingBag className="h-4 w-4 text-pink-500 mr-1" />
                      Revive Store
                    </span>
                    <span>{toolUsage.reviveStore} uses</span>
                  </div>
                  <Progress value={(toolUsage.reviveStore / 30) * 100} className="h-2 bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-full bg-pink-500 rounded-full"
                      style={{ width: `${(toolUsage.reviveStore / 30) * 100}%` }}
                    ></div>
                  </Progress>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <ShoppingCart className="h-4 w-4 text-orange-500 mr-1" />
                      Farmers Market
                    </span>
                    <span>{toolUsage.farmersMarket} uses</span>
                  </div>
                  <Progress value={(toolUsage.farmersMarket / 30) * 100} className="h-2 bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${(toolUsage.farmersMarket / 30) * 100}%` }}
                    ></div>
                  </Progress>
                </div>
              </div>

              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>Your sustainability score increases as you use more tools and features.</p>
                <p>Keep exploring to improve your impact!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-lg hover:border-blue-500 flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Task Scheduler
            </CardTitle>
            <CardDescription>Schedule and manage your sustainability tasks</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5 text-blue-500" />
                    <div>
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            <span>{format(dateRange.from, "MMM d, yyyy")}</span>
                            <span className="mx-1">-</span>
                            <span>{format(dateRange.to, "MMM d, yyyy")}</span>
                          </>
                        ) : (
                          format(dateRange.from, "PPP")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </div>
                  </div>

                  <Popover open={miniCalendarOpen} onOpenChange={setMiniCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900"
                      >
                        <Calendar className="h-4 w-4 text-blue-500 hover:scale-110 transition-transform" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 border-2 border-blue-200 dark:border-blue-800 shadow-lg"
                      align="end"
                    >
                      <div className="p-2 bg-blue-50 dark:bg-blue-900 text-center border-b border-blue-200 dark:border-blue-800">
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Select Date</span>
                      </div>
                      <div className="p-3">
                        <div className="bg-white dark:bg-zinc-900 rounded-md p-1">
                          <div className="text-xs font-medium text-center mb-1 text-blue-600 dark:text-blue-400">
                            {format(new Date(), "MMMM yyyy")}
                          </div>
                          <div className="grid grid-cols-7 gap-1">
                            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                              <div key={day} className="text-[10px] text-center text-muted-foreground">
                                {day}
                              </div>
                            ))}

                            {Array.from(
                              { length: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() },
                              (_, i) => (
                                <div key={`empty-start-${i}`} className="h-6 w-6"></div>
                              ),
                            )}

                            {Array.from(
                              { length: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() },
                              (_, i) => {
                                const day = i + 1
                                const date = new Date(new Date().getFullYear(), new Date().getMonth(), day)
                                const isSelected =
                                  dateRange.from &&
                                  date.getDate() === dateRange.from.getDate() &&
                                  date.getMonth() === dateRange.from.getMonth() &&
                                  date.getFullYear() === dateRange.from.getFullYear()
                                const isToday =
                                  date.getDate() === new Date().getDate() &&
                                  date.getMonth() === new Date().getMonth() &&
                                  date.getFullYear() === new Date().getFullYear()

                                return (
                                  <div
                                    key={`day-${day}`}
                                    onClick={() => {
                                      setDateRange({ from: date, to: undefined })
                                      setMiniCalendarOpen(false)
                                    }}
                                    className={`h-6 w-6 text-[10px] flex items-center justify-center rounded-full cursor-pointer
                                      ${isSelected ? "bg-blue-600 text-white" : ""}
                                      ${isToday && !isSelected ? "border border-blue-500 text-blue-600" : ""}
                                      ${!isSelected && !isToday ? "hover:bg-blue-100 dark:hover:bg-blue-900" : ""}
                                    `}
                                  >
                                    {day}
                                  </div>
                                )
                              },
                            )}
                          </div>
                        </div>

                        <div className="mt-3 flex justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setDateRange({ from: new Date(), to: undefined })
                              setMiniCalendarOpen(false)
                            }}
                            className="text-xs"
                          >
                            Today
                          </Button>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="sm" className="text-xs">
                                More Options
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <div className="p-2 bg-blue-50 dark:bg-blue-900 text-center border-b border-blue-200 dark:border-blue-800">
                                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Date Range</span>
                              </div>
                              <Calendar
                                mode="range"
                                selected={dateRange}
                                onSelect={(range) => {
                                  setDateRange(range)
                                  setMiniCalendarOpen(false)
                                }}
                                numberOfMonths={2}
                                className="border rounded-md"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="task">Task Title</Label>
                  <Input
                    id="task"
                    placeholder="Enter task title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="time"
                      type="time"
                      value={taskTime}
                      onChange={(e) => setTaskTime(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={() => {
                        if (taskTitle && dateRange.from && taskTime) {
                          // Format the time for display
                          const formattedTime = new Date(`2000-01-01T${taskTime}`).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })

                          // Create a new task
                          const newTask: Task = {
                            id: Date.now(), // Use timestamp as unique ID
                            name: taskTitle,
                            dueDate: format(dateRange.from, "MMM d, yyyy"),
                            time: formattedTime,
                            credits: Math.floor(Math.random() * 50) + 50, // Random credits between 50-100
                          }

                          // If it's a multi-day task, add the end date
                          if (dateRange.to) {
                            newTask.endDate = format(dateRange.to, "MMM d, yyyy")
                            newTask.isMultiDay = true
                            // More credits for multi-day tasks
                            newTask.credits += Math.floor(Math.random() * 100)
                          }

                          // Add the new task to the list
                          setUpcomingTasks((prev) => [newTask, ...prev])

                          // Clear the form
                          setTaskTitle("")
                          setTaskTime("")
                        }
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Schedule
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex-1 flex flex-col">
                <h3 className="font-medium mb-2">Upcoming Tasks</h3>
                <div
                  className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar"
                  style={{
                    height: "360px", // Fixed height to show exactly 4 tasks (90px per task)
                    maxHeight: "360px", // Add max-height as well
                    borderRadius: "8px",
                    border: "1px solid rgba(100, 116, 139, 0.2)",
                    padding: "8px",
                    overflowY: "scroll", // Always show scrollbar
                    display: "block", // Ensure it's a block element
                  }}
                >
                  {upcomingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex justify-between items-start p-3 border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                    >
                      <div>
                        <p className="font-medium">{task.name}</p>
                        <div className="flex items-center text-sm text-muted-foreground gap-2">
                          <CalendarIcon className="h-3 w-3" />
                          <span>
                            {task.dueDate}
                            {task.isMultiDay && task.endDate && (
                              <>
                                <span className="mx-1">-</span>
                                <span>{task.endDate}</span>
                              </>
                            )}
                          </span>
                          {task.time && (
                            <>
                              <Clock className="h-3 w-3 ml-2" />
                              <span>{task.time}</span>
                            </>
                          )}
                          {task.isMultiDay && (
                            <Badge
                              variant="outline"
                              className="ml-1 py-0 h-4 text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            >
                              Multi-day
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-blue-950 text-blue-300 border-blue-800 hover:bg-blue-900 transition-colors"
                      >
                        +{task.credits}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="transition-all hover:shadow-lg">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest tasks and redemptions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="redemptions">Redemptions</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex justify-between items-start pb-3 border-b border-zinc-800 last:border-0 last:pb-0 hover:bg-slate-50 dark:hover:bg-slate-900 p-2 rounded-md transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {activity.type === "task" ? (
                        <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                      ) : (
                        <ShoppingBag className="h-5 w-5 text-purple-500 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium">{activity.name}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                    <Badge
                      variant={activity.type === "task" ? "outline" : "secondary"}
                      className={
                        activity.type === "task"
                          ? "bg-blue-950 text-blue-300 border-blue-800 hover:bg-blue-900 transition-colors"
                          : "bg-purple-950 text-purple-300 hover:bg-purple-900 transition-colors"
                      }
                    >
                      {activity.credits > 0 ? `+${activity.credits}` : activity.credits}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tasks">
              <div className="space-y-4">
                {recentActivities
                  .filter((a) => a.type === "task")
                  .map((activity) => (
                    <div
                      key={activity.id}
                      className="flex justify-between items-start pb-3 border-b border-zinc-800 last:border-0 last:pb-0 hover:bg-slate-50 dark:hover:bg-slate-900 p-2 rounded-md transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium">{activity.name}</p>
                          <p className="text-sm text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-blue-950 text-blue-300 border-blue-800 hover:bg-blue-900 transition-colors"
                      >
                        +{activity.credits}
                      </Badge>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="redemptions">
              <div className="space-y-4">
                {recentActivities
                  .filter((a) => a.type === "redeem")
                  .map((activity) => (
                    <div
                      key={activity.id}
                      className="flex justify-between items-start pb-3 border-b border-zinc-800 last:border-0 last:pb-0 hover:bg-slate-50 dark:hover:bg-slate-900 p-2 rounded-md transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <ShoppingBag className="h-5 w-5 text-purple-500 mt-0.5" />
                        <div>
                          <p className="font-medium">{activity.name}</p>
                          <p className="text-sm text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-purple-950 text-purple-300 hover:bg-purple-900 transition-colors"
                      >
                        {activity.credits}
                      </Badge>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <style jsx>{`
  .custom-scrollbar::-webkit-scrollbar {
    width: 10px;
    display: block;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(100, 116, 139, 0.2);
    border-radius: 10px;
    margin: 4px 0;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(100, 116, 139, 0.6);
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(100, 116, 139, 0.8);
  }
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(100, 116, 139, 0.6) rgba(100, 116, 139, 0.2);
    overflow-y: scroll !important;
    display: block !important;
  }
`}</style>
    </div>
  )
}


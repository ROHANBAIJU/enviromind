"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts"

const COLORS = ["#10B981", "#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#EF4444"]

const userGrowthData = [
  { month: "Jan", users: 2400 },
  { month: "Feb", users: 3600 },
  { month: "Mar", users: 5400 },
  { month: "Apr", users: 7800 },
  { month: "May", users: 9200 },
  { month: "Jun", users: 10800 },
  { month: "Jul", users: 14200 },
  { month: "Aug", users: 15800 },
  { month: "Sep", users: 18400 },
  { month: "Oct", users: 21000 },
  { month: "Nov", users: 24600 },
  { month: "Dec", users: 28000 },
]

const sdgImpactData = [
  { name: "No Poverty", value: 18 },
  { name: "Zero Hunger", value: 15 },
  { name: "Good Health", value: 22 },
  { name: "Quality Education", value: 20 },
  { name: "Climate Action", value: 25 },
]

const environmentalImpactData = [
  { name: "Carbon Reduction", value: 35 },
  { name: "Water Conservation", value: 25 },
  { name: "Waste Reduction", value: 20 },
  { name: "Energy Efficiency", value: 20 },
]

const monthlyImpactData = [
  { month: "Jan", carbon: 240, water: 180, waste: 120, energy: 150 },
  { month: "Feb", carbon: 300, water: 200, waste: 140, energy: 180 },
  { month: "Mar", carbon: 320, water: 220, waste: 180, energy: 200 },
  { month: "Apr", carbon: 380, water: 250, waste: 190, energy: 220 },
  { month: "May", carbon: 400, water: 280, waste: 210, energy: 250 },
  { month: "Jun", carbon: 450, water: 300, waste: 220, energy: 280 },
]

const regionData = [
  { name: "North America", users: 12000 },
  { name: "Europe", users: 8000 },
  { name: "Asia", users: 15000 },
  { name: "Africa", users: 5000 },
  { name: "South America", users: 4000 },
  { name: "Oceania", users: 2000 },
]

export default function EnhancedImpactMetrics() {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-center">Global Impact Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="users">User Growth</TabsTrigger>
            <TabsTrigger value="sdgs">SDG Impact</TabsTrigger>
            <TabsTrigger value="environmental">Environmental</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="users" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">28,000+ Active Users</h3>
              <p className="text-sm text-muted-foreground">Growing community of sustainability advocates</p>
            </div>
          </TabsContent>

          <TabsContent value="sdgs" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sdgImpactData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {sdgImpactData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Top 5 SDG Impact Areas</h3>
              <p className="text-sm text-muted-foreground">Percentage of user contributions by SDG</p>
            </div>
          </TabsContent>

          <TabsContent value="environmental" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyImpactData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="carbon" stroke="#10B981" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="water" stroke="#3B82F6" />
                  <Line type="monotone" dataKey="waste" stroke="#8B5CF6" />
                  <Line type="monotone" dataKey="energy" stroke="#F59E0B" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Monthly Environmental Impact</h3>
              <p className="text-sm text-muted-foreground">Tracking our collective environmental savings</p>
            </div>
          </TabsContent>

          <TabsContent value="regional" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Global User Distribution</h3>
              <p className="text-sm text-muted-foreground">EnviroMind users across different regions</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Upload,
  Sprout,
  Leaf,
  BarChart,
  Globe,
  Search,
  ShoppingCart,
  Star,
  Filter,
  MapPin,
  User,
  Ruler,
  ChevronRight,
  Camera,
  CalendarIcon,
  Check,
  AlertCircle,
  Droplet,
  Sun,
  Wind,
  LineChart,
  BarChart2,
  Plus,
  Trash2,
  Edit,
  CalendarDays,
} from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { format, addDays, isSameDay, isSameMonth, addMonths, subMonths } from "date-fns"
import { cn } from "@/lib/utils"

interface AgroVisionToolProps {
  onClose?: () => void
}

// News items data
const newsItems = [
  {
    id: 1,
    title: "UN Report: Sustainable Agriculture Key to Food Security",
    date: "April 26, 2025",
    source: "United Nations",
    excerpt:
      "A new UN report highlights the critical role of sustainable agricultural practices in ensuring global food security amid climate change challenges.",
  },
  {
    id: 2,
    title: "Drought-Resistant Crops Show Promise in Field Trials",
    date: "April 24, 2025",
    source: "Agricultural Science Journal",
    excerpt:
      "New varieties of drought-resistant crops have shown significant yield improvements in regions affected by water scarcity.",
  },
  {
    id: 3,
    title: "Regenerative Farming Practices Gain Momentum Globally",
    date: "April 22, 2025",
    source: "Global Farming Initiative",
    excerpt:
      "Farmers worldwide are increasingly adopting regenerative agriculture techniques to improve soil health and carbon sequestration.",
  },
  {
    id: 4,
    title: "AI-Powered Irrigation Systems Reduce Water Usage by 40%",
    date: "April 20, 2025",
    source: "Tech for Agriculture",
    excerpt:
      "Smart irrigation systems using artificial intelligence have demonstrated significant water conservation in agricultural applications.",
  },
]

// Product interface
interface Product {
  id: string
  name: string
  farmer: string
  location: string
  price: number
  unit: string
  category: string
  organic: boolean
  image: string
  rating: number
  stock: number
  description: string
}

// Order interface
interface Order {
  id: string
  date: string
  products: { product: Product; quantity: number }[]
  total: number
  status: "processing" | "shipped" | "delivered"
  estimatedDelivery?: string
  trackingNumber?: string
}

// Plant care task interface
interface PlantCareTask {
  id: string
  title: string
  description: string
  date: Date
  isCurrent: boolean
  completed: boolean
  taskType: "watering" | "fertilizing" | "pruning" | "planting" | "harvesting" | "other"
}

// Sample produce items
const produceItems: Product[] = [
  {
    id: "prod-1",
    name: "Organic Tomatoes",
    farmer: "Green Valley Farm",
    location: "Local (15 miles)",
    price: 3.99,
    unit: "lb",
    category: "Vegetables",
    organic: true,
    image: "/ripe-tomatoes.png",
    rating: 4.8,
    stock: 45,
    description: "Fresh, locally grown organic tomatoes. Perfect for salads and cooking.",
  },
  {
    id: "prod-2",
    name: "Fresh Spinach",
    farmer: "Riverside Organics",
    location: "Local (8 miles)",
    price: 2.49,
    unit: "bunch",
    category: "Vegetables",
    organic: true,
    image: "/fresh-spinach.png",
    rating: 4.7,
    stock: 30,
    description: "Nutrient-rich organic spinach, harvested daily for maximum freshness.",
  },
  {
    id: "prod-3",
    name: "Honey Crisp Apples",
    farmer: "Sunshine Orchards",
    location: "Regional (25 miles)",
    price: 1.99,
    unit: "lb",
    category: "Fruits",
    organic: false,
    image: "/ripe-apples.png",
    rating: 4.9,
    stock: 120,
    description: "Sweet and crisp apples grown with minimal pesticides.",
  },
  {
    id: "prod-4",
    name: "Free-Range Eggs",
    farmer: "Happy Hen Farm",
    location: "Local (12 miles)",
    price: 5.99,
    unit: "dozen",
    category: "Dairy & Eggs",
    organic: true,
    image: "/assorted-eggs.png",
    rating: 5.0,
    stock: 24,
    description: "Eggs from free-range chickens fed with organic feed.",
  },
  {
    id: "prod-5",
    name: "Grass-Fed Beef",
    farmer: "Green Pastures Ranch",
    location: "Regional (30 miles)",
    price: 8.99,
    unit: "lb",
    category: "Meat",
    organic: true,
    image: "/cuts-of-beef.png",
    rating: 4.8,
    stock: 15,
    description: "Ethically raised, grass-fed beef with no hormones or antibiotics.",
  },
  {
    id: "prod-6",
    name: "Organic Carrots",
    farmer: "Earth Bounty Farms",
    location: "Local (10 miles)",
    price: 2.29,
    unit: "bunch",
    category: "Vegetables",
    organic: true,
    image: "/bunch-of-carrots.png",
    rating: 4.6,
    stock: 50,
    description: "Sweet and crunchy organic carrots, freshly harvested.",
  },
  {
    id: "prod-7",
    name: "Fresh Strawberries",
    farmer: "Berry Good Farm",
    location: "Local (5 miles)",
    price: 4.99,
    unit: "pint",
    category: "Fruits",
    organic: true,
    image: "/ripe-strawberries.png",
    rating: 4.9,
    stock: 20,
    description: "Sweet, juicy organic strawberries picked at peak ripeness.",
  },
  {
    id: "prod-8",
    name: "Artisan Goat Cheese",
    farmer: "Mountain View Dairy",
    location: "Regional (35 miles)",
    price: 6.99,
    unit: "8 oz",
    category: "Dairy & Eggs",
    organic: false,
    image: "/goat-cheese.png",
    rating: 4.7,
    stock: 12,
    description: "Creamy goat cheese made in small batches from pasture-raised goats.",
  },
]

// Farm data
const farmData = [
  {
    id: "farm-1",
    name: "Green Valley Farm",
    farmer: "Thomas Greene",
    location: "15 miles away",
    description: "Family-owned organic farm specializing in heirloom vegetables and free-range eggs.",
    image: "/organic-vegetable-farm.png",
    rating: 4.8,
    products: ["Organic Tomatoes", "Free-Range Eggs", "Heirloom Carrots", "Fresh Herbs"],
    certifications: ["Certified Organic", "Sustainable Farming"],
    founded: "2005",
    farmSize: "25 acres",
  },
  {
    id: "farm-2",
    name: "Riverside Organics",
    farmer: "Maria Rodriguez",
    location: "8 miles away",
    description: "Certified organic farm with a wide variety of seasonal produce and herbs.",
    image: "/riverside-organic-farm.png",
    rating: 4.7,
    products: ["Fresh Spinach", "Organic Kale", "Seasonal Berries", "Medicinal Herbs"],
    certifications: ["Certified Organic", "Non-GMO"],
    founded: "2010",
    farmSize: "18 acres",
  },
  {
    id: "farm-3",
    name: "Sunshine Orchards",
    farmer: "James Wilson",
    location: "25 miles away",
    description: "Family orchard growing a variety of apples, pears, and stone fruits with minimal pesticides.",
    image: "/apple-orchard-trees.png",
    rating: 4.9,
    products: ["Honey Crisp Apples", "Bartlett Pears", "Peaches", "Fresh Apple Cider"],
    certifications: ["Low-Spray", "Integrated Pest Management"],
    founded: "1978",
    farmSize: "40 acres",
  },
  {
    id: "farm-4",
    name: "Happy Hen Farm",
    farmer: "Sarah Johnson",
    location: "12 miles away",
    description: "Specializing in free-range eggs, poultry, and seasonal vegetables grown without pesticides.",
    image: "/free-range-chicken-farm.png",
    rating: 5.0,
    products: ["Free-Range Eggs", "Pasture-Raised Chicken", "Seasonal Vegetables"],
    certifications: ["Animal Welfare Approved", "Pasture Raised"],
    founded: "2015",
    farmSize: "15 acres",
  },
  {
    id: "farm-5",
    name: "Green Pastures Ranch",
    farmer: "Michael Brown",
    location: "30 miles away",
    description: "Grass-fed beef and dairy products from pasture-raised cattle.",
    image: "/cattle-grazing.png",
    rating: 4.8,
    products: ["Grass-Fed Beef", "Raw Milk", "Artisan Cheese", "Yogurt"],
    certifications: ["Grass-Fed", "Humane Certified"],
    founded: "1995",
    farmSize: "120 acres",
  },
  {
    id: "farm-6",
    name: "Earth Bounty Farms",
    farmer: "David Chen",
    location: "10 miles away",
    description: "Diverse vegetable farm using regenerative agriculture practices.",
    image: "/diverse-vegetable-farm.png",
    rating: 4.6,
    products: ["Organic Carrots", "Rainbow Chard", "Heirloom Tomatoes", "Garlic"],
    certifications: ["Certified Organic", "Regenerative Agriculture"],
    founded: "2012",
    farmSize: "22 acres",
  },
]

// Plant health data for charts
const plantHealthData = [
  { name: "Healthy", value: 65, fill: "#22c55e" },
  { name: "Diseased", value: 35, fill: "#374151" },
]

// Function to generate dynamic plant health data based on analysis results
const generatePlantHealthData = (healthCondition: string | undefined) => {
  if (healthCondition === "Healthy") {
    // For healthy plants, show mostly healthy with small potential issues
    return [
      { name: "Healthy", value: 85 + Math.floor(Math.random() * 10), fill: "#22c55e" },
      { name: "Potential Issues", value: 15 - Math.floor(Math.random() * 10), fill: "#374151" },
    ]
  } else {
    // For unhealthy plants, show various issues
    const diseaseValue = 40 + Math.floor(Math.random() * 30)
    return [
      { name: "Healthy", value: 100 - diseaseValue, fill: "#22c55e" },
      { name: "Diseased", value: diseaseValue, fill: "#ef4444" },
    ]
  }
}

// Growth metrics data for charts
const growthMetricsData = [
  { week: "Week 1", height: 5, leaves: 6, health: 85 },
  { week: "Week 2", height: 8, leaves: 10, health: 90 },
  { week: "Week 3", height: 12, leaves: 15, health: 88 },
  { week: "Week 4", height: 18, leaves: 22, health: 75 },
  { week: "Week 5", height: 24, leaves: 28, health: 65 },
  { week: "Week 6", height: 30, leaves: 32, health: 70 },
]

// Nutrient data for charts
const nutrientData = [
  { name: "Nitrogen", current: 65, optimal: 80 },
  { name: "Phosphorus", current: 45, optimal: 60 },
  { name: "Potassium", current: 70, optimal: 75 },
  { name: "Calcium", current: 50, optimal: 65 },
  { name: "Magnesium", current: 40, optimal: 55 },
]

// Add this after the nutrientData array
const plantCareRecommendations = [
  "Apply organic fungicide to treat leaf spot",
  "Add Epsom salts to soil for magnesium deficiency",
  "Ensure consistent watering (soil should be moist but not soggy)",
  "Provide at least 6 hours of direct sunlight daily",
  "Prune affected leaves and improve air circulation",
  "Apply neem oil spray to treat pest infestations",
  "Add compost or organic matter to improve soil structure",
  "Adjust soil pH to appropriate level for your plant type",
  "Apply diluted seaweed extract as a natural growth stimulant",
  "Rotate crops to prevent disease buildup in soil",
  "Install a drip irrigation system for consistent moisture",
  "Apply calcium-rich amendments for blossom end rot",
  "Use companion planting to naturally deter pests",
  "Apply diluted hydrogen peroxide to treat root rot",
  "Mulch around plants to retain moisture and suppress weeds",
]

// Sample plant care tasks
const initialPlantCareTasks: PlantCareTask[] = [
  {
    id: "task-1",
    title: "Tomato Planting Season",
    description: "Optimal time to plant tomato seedlings outdoors",
    date: new Date(),
    isCurrent: true,
    completed: false,
    taskType: "planting",
  },
  {
    id: "task-2",
    title: "First Harvest Expected",
    description: "Estimated time for first tomato harvest",
    date: addDays(new Date(), 45),
    isCurrent: false,
    completed: false,
    taskType: "harvesting",
  },
  {
    id: "task-3",
    title: "Apply Organic Fertilizer",
    description: "Recommended for optimal growth",
    date: addDays(new Date(), 5),
    isCurrent: false,
    completed: false,
    taskType: "fertilizing",
  },
]

// Simplified chart components
const SimplePieChart = ({ data }: { data: { name: string; value: number; fill: string }[] }) => (
  <div className="h-64 flex flex-col items-center justify-center">
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  </div>
)

const SimpleBarChart = ({ data }: { data: typeof nutrientData }) => (
  <div className="space-y-3 h-64 flex flex-col justify-center">
    <BarChart2 className="h-12 w-12 mx-auto mb-2 text-green-600" />
    {data.map((item) => (
      <div key={item.name} className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>{item.name}</span>
          <span>
            Current: {item.current}% | Optimal: {item.optimal}%
          </span>
        </div>
        <div className="flex gap-2 h-4">
          <div className="bg-green-600 rounded" style={{ width: `${item.current}%` }}></div>
          <div className="bg-gray-600 rounded" style={{ width: `${item.optimal - item.current}%` }}></div>
        </div>
      </div>
    ))}
  </div>
)

const SimpleLineChart = ({ data }: { data: typeof growthMetricsData }) => (
  <div className="h-64 flex flex-col justify-center">
    <LineChart className="h-12 w-12 mx-auto mb-4 text-green-600" />
    <div className="grid grid-cols-6 gap-2">
      {data.map((item) => (
        <div key={item.week} className="text-center">
          <div className="text-xs mb-1">{item.week}</div>
          <div className="relative h-32 bg-slate-200 dark:bg-slate-700 rounded overflow-hidden">
            <div className="absolute bottom-0 w-full bg-green-600" style={{ height: `${(item.height / 30) * 100}%` }} />
          </div>
          <div className="text-xs mt-1">H: {item.height}cm</div>
        </div>
      ))}
    </div>
  </div>
)

const PlantNutrientBarChart = ({ data }: { data: { [key: string]: { Current: number; Optimal: number } } }) => {
  return (
    <div className="space-y-3 h-64 flex flex-col justify-center">
      <BarChart2 className="h-12 w-12 mx-auto mb-2 text-green-600" />
      {Object.entries(data).map(([nutrient, values]) => (
        <div key={nutrient} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{nutrient}</span>
            <span>
              Current: {values.Current}% | Optimal: {values.Optimal}%
            </span>
          </div>
          <div className="flex gap-2 h-4">
            <div className="bg-green-600 rounded" style={{ width: `${values.Current}%` }}></div>
            <div className="bg-gray-600 rounded" style={{ width: `${values.Optimal - values.Current}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  )
}

const SoilNutrientBarChart = ({
  data,
}: { data: { Macronutrients: Record<string, number>; Micronutrients: Record<string, number> } }) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Macronutrients</h4>
        <div className="space-y-2">
          {Object.entries(data.Macronutrients).map(([nutrient, value]) => (
            <div key={nutrient} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{nutrient}</span>
                <span>{value}%</span>
              </div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full" style={{ width: `${value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Micronutrients</h4>
        <div className="space-y-2">
          {Object.entries(data.Micronutrients).map(([nutrient, value]) => (
            <div key={nutrient} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{nutrient}</span>
                <span>{value}%</span>
              </div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Task type icons mapping
const taskTypeIcons = {
  watering: <Droplet className="h-5 w-5 text-blue-500" />,
  fertilizing: <Sprout className="h-5 w-5 text-green-600" />,
  pruning: <Leaf className="h-5 w-5 text-green-500" />,
  planting: <Sprout className="h-5 w-5 text-green-700" />,
  harvesting: <Check className="h-5 w-5 text-amber-500" />,
  other: <CalendarIcon className="h-5 w-5 text-slate-500" />,
}

export function AgroVisionTool({ onClose }: AgroVisionToolProps) {
  // State variables
  const [activeSection, setActiveSection] = useState<"plant" | "soil" | "market">("plant")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([])
  const [selectedFarm, setSelectedFarm] = useState<(typeof farmData)[0] | null>(null)
  const [showFarmRegistration, setShowFarmRegistration] = useState(false)
  const [registrationForm, setRegistrationForm] = useState({
    farmName: "",
    farmerName: "",
    location: "",
    description: "",
    products: "",
    certifications: "",
  })
  const [orders, setOrders] = useState<Order[]>([])
  const [showOrderHistory, setShowOrderHistory] = useState(false)
  const [weatherData, setWeatherData] = useState({
    temperature: "24°C",
    humidity: "65%",
    rainfall: "0.2 in",
    forecast: "Partly Cloudy",
  })
  const { toast } = useToast()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [plantAnalysisResult, setPlantAnalysisResult] = useState<any>(null)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)

  // Soil analysis state
  const [soilFile, setSoilFile] = useState<File | null>(null)
  const [isAnalyzingSoil, setIsAnalyzingSoil] = useState(false)
  const [showSoilResults, setShowSoilResults] = useState(false)
  const [soilAnalysisResult, setSoilAnalysisResult] = useState<any>(null)
  const [includeNutrientAnalysis, setIncludeNutrientAnalysis] = useState(false)
  const [soilImageUrl, setSoilImageUrl] = useState<string | null>(null)

  // Plant care calendar state
  const [plantCareTasks, setPlantCareTasks] = useState<PlantCareTask[]>(initialPlantCareTasks)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date())
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false)
  const [showEditTaskDialog, setShowEditTaskDialog] = useState(false)
  const [selectedTask, setSelectedTask] = useState<PlantCareTask | null>(null)
  const [newTask, setNewTask] = useState<Omit<PlantCareTask, "id">>({
    title: "",
    description: "",
    date: new Date(),
    isCurrent: false,
    completed: false,
    taskType: "other",
  })

  // Add this after the state variables
  useEffect(() => {
    // Cleanup function to revoke object URL when component unmounts or URL changes
    return () => {
      if (selectedImageUrl) {
        URL.revokeObjectURL(selectedImageUrl)
      }
    }
  }, [selectedImageUrl])

  // Add this after the existing useEffect for selectedImageUrl
  useEffect(() => {
    // Cleanup function to revoke object URL when component unmounts or URL changes
    return () => {
      if (soilImageUrl) {
        URL.revokeObjectURL(soilImageUrl)
      }
    }
  }, [soilImageUrl])

  // Load saved plant care tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("plantCareTasks")
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks)
        // Convert string dates back to Date objects
        const tasksWithDates = parsedTasks.map((task: any) => ({
          ...task,
          date: new Date(task.date),
        }))
        setPlantCareTasks(tasksWithDates)
      } catch (error) {
        console.error("Error parsing saved tasks:", error)
      }
    }
  }, [])

  // Save plant care tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("plantCareTasks", JSON.stringify(plantCareTasks))
  }, [plantCareTasks])

  // Handle plant analysis
  const handleAnalyze = () => {
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    // Create form data to send the file
    const formData = new FormData()
    formData.append("file", selectedFile)

    // Send the image to the backend
    fetch("http://127.0.0.1:5000/agrovision/plant_mode", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        console.log("Backend response:", data)

        // Update the state with the response data
        setPlantAnalysisResult({
          plantName: data["Plant Name"],
          biologicalName: data["Biological Name"],
          healthCondition: data["Health Condition"],
          confidenceScore: data["Confidence Score"],
          nutrientAnalysis: data["Nutrient Analysis"],
        })

        setIsAnalyzing(false)
        setShowResults(true)
      })
      .catch((error) => {
        console.error("Error analyzing plant:", error)
        toast({
          title: "Analysis failed",
          description: "There was an error analyzing your plant image. Please try again.",
          variant: "destructive",
        })
        setIsAnalyzing(false)
      })
  }

  // Function to save plant analysis results
  const handleSaveResults = () => {
    if (!plantAnalysisResult) {
      toast({
        title: "No results to save",
        description: "Please analyze a plant first before saving results",
        variant: "destructive",
      })
      return
    }

    // Create a results object with all relevant data
    const resultsToSave = {
      id: `analysis-${Date.now()}`,
      date: new Date().toISOString(),
      plantName: plantAnalysisResult.plantName,
      biologicalName: plantAnalysisResult.biologicalName,
      healthCondition: plantAnalysisResult.healthCondition,
      confidenceScore: plantAnalysisResult.confidenceScore,
      nutrientAnalysis: plantAnalysisResult.nutrientAnalysis,
      imageUrl: selectedImageUrl,
    }

    // Get existing saved results from localStorage or initialize empty array
    const existingSavedResults = JSON.parse(localStorage.getItem("agroVisionSavedResults") || "[]")

    // Add new results to the array
    const updatedResults = [resultsToSave, ...existingSavedResults]

    // Save back to localStorage
    localStorage.setItem("agroVisionSavedResults", JSON.stringify(updatedResults))

    toast({
      title: "Results Saved Successfully",
      description: `Analysis for ${plantAnalysisResult.plantName} has been saved to your history.`,
      variant: "success",
    })
  }

  // Function to analyze soil
  const handleAnalyzeSoil = () => {
    if (!soilFile) {
      toast({
        title: "No image selected",
        description: "Please upload a soil image first",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzingSoil(true)

    // Create form data to send the file
    const formData = new FormData()
    formData.append("file", soilFile)

    // Send the image to the backend
    fetch("http://127.0.0.1:5000/agrovision/soil_mode", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        console.log("Soil analysis response:", data)

        // Update the state with the response data
        setSoilAnalysisResult(data)
        setIsAnalyzingSoil(false)
        setShowSoilResults(true)
      })
      .catch((error) => {
        console.error("Error analyzing soil:", error)
        toast({
          title: "Analysis failed",
          description: "There was an error analyzing your soil image. Please try again.",
          variant: "destructive",
        })
        setIsAnalyzingSoil(false)
      })
  }

  // Plant care calendar functions
  const handleAddTask = () => {
    const task: PlantCareTask = {
      id: `task-${Date.now()}`,
      ...newTask,
    }

    setPlantCareTasks((prev) => [...prev, task])
    setShowAddTaskDialog(false)
    setNewTask({
      title: "",
      description: "",
      date: new Date(),
      isCurrent: false,
      completed: false,
      taskType: "other",
    })

    toast({
      title: "Task Added",
      description: "Your plant care task has been added to the calendar.",
      variant: "success",
    })
  }

  const handleEditTask = () => {
    if (!selectedTask) return

    setPlantCareTasks((prev) => prev.map((task) => (task.id === selectedTask.id ? { ...selectedTask } : task)))
    setShowEditTaskDialog(false)
    setSelectedTask(null)

    toast({
      title: "Task Updated",
      description: "Your plant care task has been updated.",
      variant: "success",
    })
  }

  const handleDeleteTask = (taskId: string) => {
    setPlantCareTasks((prev) => prev.filter((task) => task.id !== taskId))

    toast({
      title: "Task Deleted",
      description: "Your plant care task has been removed from the calendar.",
      variant: "success",
    })
  }

  const handleToggleTaskCurrent = (taskId: string) => {
    setPlantCareTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, isCurrent: !task.isCurrent } : task)),
    )
  }

  const handleToggleTaskCompleted = (taskId: string) => {
    setPlantCareTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    )
  }

  // Get tasks for the selected date
  const tasksForSelectedDate = plantCareTasks.filter((task) => isSameDay(task.date, selectedDate))

  // Filter products based on search and category
  const filteredProducts = produceItems.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Cart functions
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id)

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        return [...prevCart, { product, quantity: 1 }]
      }
    })

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      variant: "success",
    })
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCart((prevCart) =>
      prevCart.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId))
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  // Checkout function
  const handleCheckout = () => {
    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString(),
      products: [...cart],
      total: calculateTotal() + 5, // Including delivery fee
      status: "processing",
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      trackingNumber: `TRK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    }

    setOrders((prev) => [newOrder, ...prev])

    toast({
      title: "Order Placed Successfully",
      description: "Your order has been placed and will be delivered soon!",
      variant: "success",
    })

    setCart([])
  }

  // Farm registration functions
  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setRegistrationForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFarmRegistration = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Farm Registration Submitted",
      description: "Your farm registration has been received and is under review.",
      variant: "success",
    })
    setShowFarmRegistration(false)
    setRegistrationForm({
      farmName: "",
      farmerName: "",
      location: "",
      description: "",
      products: "",
      certifications: "",
    })
  }

  // Navigation buttons
  const SectionButton = ({
    section,
    current,
    icon,
    title,
  }: {
    section: "plant" | "soil" | "market"
    current: "plant" | "soil" | "market"
    icon: React.ReactNode
    title: string
  }) => (
    <Button
      variant={section === current ? "default" : "outline"}
      className={`flex-1 ${section === current ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-50 hover:text-green-700"}`}
      onClick={() => setActiveSection(section)}
    >
      {icon}
      <span className="ml-2">{title}</span>
    </Button>
  )

  const SimpleBarChart = ({ data }: { data: typeof nutrientData }) => (
    <div className="space-y-3 h-64 flex flex-col justify-center">
      <BarChart2 className="h-12 w-12 mx-auto mb-2 text-green-600" />
      {data.map((item) => (
        <div key={item.name} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{item.name}</span>
            <span>
              Current: {item.current}% | Optimal: {item.optimal}%
            </span>
          </div>
          <div className="flex gap-2 h-4">
            <div className="bg-green-600 rounded" style={{ width: `${item.current}%` }}></div>
            <div className="bg-gray-600 rounded" style={{ width: `${item.optimal - item.current}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  )

  const SimpleLineChart = ({ data }: { data: typeof growthMetricsData }) => (
    <div className="h-64 flex flex-col justify-center">
      <LineChart className="h-12 w-12 mx-auto mb-4 text-green-600" />
      <div className="grid grid-cols-6 gap-2">
        {data.map((item) => (
          <div key={item.week} className="text-center">
            <div className="text-xs mb-1">{item.week}</div>
            <div className="relative h-32 bg-slate-200 dark:bg-slate-700 rounded overflow-hidden">
              <div
                className="absolute bottom-0 w-full bg-green-600"
                style={{ height: `${(item.height / 30) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs mt-1">H: {item.height}cm</div>
          </div>
        ))}
      </div>
    </div>
  )

  const PHLevelChart = ({
    phValue,
    idealRange,
  }: {
    phValue: number | { "pH Level": number; Category: string } | undefined
    idealRange: [number, number] | undefined
  }) => {
    // Extract pH value from either direct number or object format
    const extractedPhValue = typeof phValue === "object" && phValue ? phValue["pH Level"] : phValue

    // Add default values and null checks
    const safePhValue = extractedPhValue ?? 7.0 // Default to neutral pH if undefined
    const safeIdealRange = idealRange ?? [6.0, 7.0] // Default ideal range if undefined

    // Get category directly from the object if available
    const category = typeof phValue === "object" && phValue ? phValue["Category"] : null

    // pH scale ranges from 0 to 14
    const getPhColor = (value: number, cat?: string | null) => {
      if (cat === "Acidic") return "#ef4444" // Acidic - red
      if (cat === "Slightly Acidic") return "#f97316" // Slightly acidic - orange
      if (cat === "Neutral") return "#22c55e" // Neutral - green
      if (cat === "Slightly Alkaline") return "#3b82f6" // Slightly alkaline - blue
      if (cat === "Alkaline") return "#8b5cf6" // Alkaline - purple

      // Fallback to value-based coloring if category not provided
      if (value < 5.5) return "#ef4444" // Acidic - red
      if (value >= 5.5 && value < 6.5) return "#f97316" // Slightly acidic - orange
      if (value >= 6.5 && value < 7.5) return "#22c55e" // Neutral - green
      if (value >= 7.5 && value < 8.5) return "#3b82f6" // Slightly alkaline - blue
      return "#8b5cf6" // Alkaline - purple
    }

    return (
      <div className="space-y-4">
        <div className="flex justify-between text-xs">
          <span>Acidic</span>
          <span>Neutral</span>
          <span>Alkaline</span>
        </div>
        <div className="h-8 w-full bg-gradient-to-r from-red-500 via-green-500 to-purple-500 rounded-md relative">
          {/* Ideal range indicator */}
          <div
            className="absolute h-full bg-white/20 border border-white"
            style={{
              left: `${(safeIdealRange[0] / 14) * 100}%`,
              width: `${((safeIdealRange[1] - safeIdealRange[0]) / 14) * 100}%`,
            }}
          ></div>

          {/* Current pH indicator */}
          <div
            className="absolute w-4 h-10 -mt-1 bg-white border-2 rounded-full transform -translate-x-1/2"
            style={{
              left: `${(safePhValue / 14) * 100}%`,
              borderColor: getPhColor(safePhValue, category),
            }}
          ></div>
        </div>
        <div className="flex justify-between text-sm">
          <span>0</span>
          <span>7</span>
          <span>14</span>
        </div>
        <div className="text-center font-medium">
          Current pH:{" "}
          <span className="text-lg" style={{ color: getPhColor(safePhValue, category) }}>
            {safePhValue.toFixed(1)}
          </span>
          <span className="ml-2 text-sm text-muted-foreground">
            (Ideal: {safeIdealRange[0]}-{safeIdealRange[1]})
          </span>
          {category && (
            <div className="text-sm mt-1">
              Category: <span style={{ color: getPhColor(safePhValue, category) }}>{category}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  const NutrientBarChart = ({ data }: { data: { name: string; level: string; value: number; ideal: number }[] }) => {
    const getNutrientColor = (level: string | undefined) => {
      // Handle undefined or null level values
      if (!level) return "#94a3b8" // Default color for undefined levels

      switch (level.toLowerCase()) {
        case "low":
          return "#ef4444"
        case "medium":
          return "#f97316"
        case "high":
          return "#22c55e"
        case "excessive":
          return "#8b5cf6"
        default:
          return "#94a3b8"
      }
    }

    return (
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span className="font-medium" style={{ color: getNutrientColor(item.level) }}>
                {item.level} ({item.value}%)
              </span>
            </div>
            <div className="flex gap-2 h-4">
              <div
                className="rounded"
                style={{
                  width: `${item.value}%`,
                  backgroundColor: getNutrientColor(item.level),
                }}
              ></div>
              <div
                className="border-r-2 border-dashed absolute h-4"
                style={{
                  left: `${item.ideal}%`,
                  borderColor: "#64748b",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      {/* Section Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <SectionButton
          section="plant"
          current={activeSection}
          icon={<Sprout className="h-4 w-4" />}
          title="Plant Mode"
        />
        <SectionButton section="soil" current={activeSection} icon={<Leaf className="h-4 w-4" />} title="Soil Mode" />
        <SectionButton
          section="market"
          current={activeSection}
          icon={<ShoppingCart className="h-4 w-4" />}
          title="Farmers Market"
        />
      </div>

      {/* Plant Mode Section */}
      {activeSection === "plant" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:min-h-[700px]">
            {/* Plant Analysis Card */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sprout className="h-5 w-5 text-green-500" />
                  Plant Analysis
                </CardTitle>
                <CardDescription>
                  Upload an image of your plant for health analysis and care recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-auto">
                {!showResults ? (
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Upload className="h-10 w-10 text-slate-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Upload Plant Image</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Drag and drop an image file or click to browse
                        </p>
                        <div className="flex gap-2">
                          <label htmlFor="plant-image-upload" className="cursor-pointer">
                            <Button
                              type="button"
                              onClick={() => document.getElementById("plant-image-upload")?.click()}
                            >
                              Select Image
                            </Button>
                            <input
                              id="plant-image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const file = e.target.files[0]
                                  setSelectedFile(file)
                                  // Create and store the image URL
                                  const imageUrl = URL.createObjectURL(file)
                                  setSelectedImageUrl(imageUrl)
                                }
                              }}
                            />
                          </label>
                          <Button variant="outline">
                            <Camera className="h-4 w-4 mr-2" />
                            Take Photo
                          </Button>
                        </div>
                        {selectedFile && <p className="mt-2 text-sm text-green-600">Selected: {selectedFile.name}</p>}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="plant-type">Plant Type (Optional)</Label>
                        <Select>
                          <SelectTrigger id="plant-type">
                            <SelectValue placeholder="Select plant type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tomato">Tomato</SelectItem>
                            <SelectItem value="pepper">Pepper</SelectItem>
                            <SelectItem value="cucumber">Cucumber</SelectItem>
                            <SelectItem value="lettuce">Lettuce</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="plant-age">Plant Age (Optional)</Label>
                        <Select>
                          <SelectTrigger id="plant-age">
                            <SelectValue placeholder="Select plant age" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="seedling">Seedling (0-2 weeks)</SelectItem>
                            <SelectItem value="young">Young Plant (2-4 weeks)</SelectItem>
                            <SelectItem value="mature">Mature Plant (1-3 months)</SelectItem>
                            <SelectItem value="flowering">Flowering/Fruiting</SelectItem>
                            <SelectItem value="unknown">Unknown</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="advanced-analysis" />
                        <Label htmlFor="advanced-analysis">Enable Advanced Analysis</Label>
                      </div>
                    </div>

                    <Button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      {isAnalyzing ? (
                        <>
                          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></span>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sprout className="mr-2 h-4 w-4" />
                          Analyze Plant
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
                      <div className="aspect-square max-w-[200px] mx-auto bg-white dark:bg-slate-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        {selectedImageUrl ? (
                          <div className="relative w-32 h-32 mx-auto">
                            <Image
                              src={selectedImageUrl || "/placeholder.svg"}
                              alt="Analyzed plant"
                              width={128}
                              height={128}
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <Leaf className="h-16 w-16 text-green-500" />
                        )}
                      </div>
                      <h3 className="text-lg font-medium mb-2">Analysis Complete</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Plant Identification</h3>
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <span>
                              {plantAnalysisResult?.plantName} ({plantAnalysisResult?.biologicalName})
                            </span>
                            <Badge className="bg-green-600">{plantAnalysisResult?.confidenceScore} Match</Badge>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Health Assessment</h3>
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`w-3 h-3 rounded-full ${plantAnalysisResult?.healthCondition === "Healthy" ? "bg-green-500" : "bg-amber-500"}`}
                            ></span>
                            <span className="font-medium">
                              {plantAnalysisResult?.healthCondition === "Healthy"
                                ? "Healthy Plant Detected"
                                : "Health Issues Detected"}
                            </span>
                          </div>
                          <ul className="space-y-1 text-sm">
                            {plantAnalysisResult?.healthCondition === "Healthy" ? (
                              <li>• Plant appears to be in good health</li>
                            ) : (
                              <>
                                <li>• Signs of disease detected</li>
                                <li>• Requires attention and treatment</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Plant Health Analysis</h3>
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                          <SimplePieChart data={generatePlantHealthData(plantAnalysisResult?.healthCondition)} />
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Recommendations</h3>
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                          {plantAnalysisResult?.healthCondition !== "Healthy" ? (
                            <ul className="space-y-1 text-sm">
                              {/* Get 4 random recommendations using a more straightforward approach */}
                              {[...plantCareRecommendations]
                                .sort(() => 0.5 - Math.random())
                                .slice(0, 4)
                                .map((recommendation, index) => (
                                  <li key={index}>• {recommendation}</li>
                                ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-green-600">
                              Your plant appears healthy! Continue with regular care and maintenance.
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Nutrient Composition Analysis</h3>
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                          {plantAnalysisResult?.nutrientAnalysis ? (
                            <PlantNutrientBarChart data={plantAnalysisResult.nutrientAnalysis} />
                          ) : (
                            <div className="text-center py-4 text-muted-foreground">
                              Nutrient analysis not available
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" className="flex-1" onClick={() => setShowResults(false)}>
                        Scan Another Plant
                      </Button>
                      <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleSaveResults}>
                        Save Results
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Agricultural News & Data Card */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <h1 className="text-2xl font-bold text-green-600">AgroVision</h1>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
                    onClick={onClose}
                  >
                    <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                    Back to Dashboard
                  </Button>
                </div>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-500" />
                  Agricultural News & Data
                </CardTitle>
                <CardDescription>Latest updates and insights on sustainable agriculture</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-auto">
                <Tabs defaultValue="news" className="h-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="news">News</TabsTrigger>
                    <TabsTrigger value="data">Data Charts</TabsTrigger>
                    <TabsTrigger value="weather">Weather</TabsTrigger>
                  </TabsList>

                  <TabsContent value="news" className="space-y-4">
                    {newsItems.map((item) => (
                      <div key={item.id} className="border-b pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium mb-1">{item.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <span>{item.date}</span>
                          <span>•</span>
                          <span>{item.source}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.excerpt}</p>
                        <Button variant="link" className="p-0 h-auto text-green-600 text-sm">
                          Read more
                        </Button>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="data">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Growth Metrics Over Time</h3>
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                          <SimpleLineChart data={growthMetricsData} />
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Sustainable Farming Adoption</h3>
                        <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <BarChart className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                              <span className="text-muted-foreground">Regional Adoption Rates</span>
                              <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded">
                                  <div className="text-2xl font-bold text-green-600">68%</div>
                                  <div className="text-xs">Urban Farms</div>
                                </div>
                                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded">
                                  <div className="text-2xl font-bold text-green-600">42%</div>
                                  <div className="text-xs">Rural Farms</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="weather">
                    <div className="space-y-4">
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                        <h3 className="font-medium mb-3">Current Weather Conditions</h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Sun className="h-10 w-10 text-amber-500 mr-3" />
                            <div>
                              <div className="text-2xl font-bold">{weatherData.temperature}</div>
                              <div className="text-sm text-muted-foreground">{weatherData.forecast}</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center">
                              <Droplet className="h-4 w-4 text-blue-500 mr-2" />
                              <span>{weatherData.humidity}</span>
                            </div>
                            <div className="flex items-center">
                              <Wind className="h-4 w-4 text-slate-500 mr-2" />
                              <span>8 mph</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">5-Day Forecast</h3>
                        <div className="grid grid-cols-5 gap-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-center">
                              <div className="text-xs font-medium mb-1">
                                {new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                                  weekday: "short",
                                })}
                              </div>
                              <Sun className="h-6 w-6 mx-auto text-amber-500 mb-1" />
                              <div className="text-sm font-medium">{24 + Math.floor(Math.random() * 5)}°C</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Agricultural Alerts</h3>
                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-amber-700 dark:text-amber-400">Drought Warning</h4>
                              <p className="text-sm text-amber-700/80 dark:text-amber-400/80">
                                Rainfall below average for the past 30 days. Consider adjusting irrigation schedules.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-green-500" />
                  Plant Care Calendar
                </CardTitle>
                <CardDescription>Schedule and track your plant care tasks</CardDescription>
              </div>
              <Dialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Plant Care Task</DialogTitle>
                    <DialogDescription>Create a new task for your plant care calendar</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="task-title">Task Title</Label>
                      <Input
                        id="task-title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        placeholder="e.g. Water tomato plants"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="task-description">Description</Label>
                      <Textarea
                        id="task-description"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        placeholder="Add details about this task"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Task Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(newTask.date, "PPP")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newTask.date}
                            onSelect={(date) => date && setNewTask({ ...newTask, date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="task-type">Task Type</Label>
                      <Select
                        value={newTask.taskType}
                        onValueChange={(value: any) => setNewTask({ ...newTask, taskType: value })}
                      >
                        <SelectTrigger id="task-type">
                          <SelectValue placeholder="Select task type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="watering">Watering</SelectItem>
                          <SelectItem value="fertilizing">Fertilizing</SelectItem>
                          <SelectItem value="pruning">Pruning</SelectItem>
                          <SelectItem value="planting">Planting</SelectItem>
                          <SelectItem value="harvesting">Harvesting</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="task-current"
                        checked={newTask.isCurrent}
                        onCheckedChange={(checked) => setNewTask({ ...newTask, isCurrent: checked })}
                      />
                      <Label htmlFor="task-current">Mark as current task</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddTaskDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddTask} className="bg-green-600 hover:bg-green-700">
                      Add Task
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
                {/* Calendar View */}
                <div className="md:col-span-3 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{format(calendarMonth, "MMMM yyyy")}</h3>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCalendarMonth(subMonths(calendarMonth, 1))}
                      >
                        <ChevronRight className="h-4 w-4 rotate-180" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      month={calendarMonth}
                      onMonthChange={setCalendarMonth}
                      className="rounded-md border"
                      components={{
                        day: (props) => {
                          // Check if there are tasks for this day
                          const date = props.date
                          const hasTasks = plantCareTasks.some(
                            (task) => isSameDay(task.date, date) && isSameMonth(task.date, calendarMonth),
                          )
                          const hasCurrentTask = plantCareTasks.some(
                            (task) =>
                              isSameDay(task.date, date) && task.isCurrent && isSameMonth(task.date, calendarMonth),
                          )

                          return (
                            <div
                              className={cn(
                                "relative h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                                hasTasks && "font-semibold",
                                hasCurrentTask && "text-green-600 dark:text-green-400",
                              )}
                            >
                              <div
                                className={cn(
                                  "flex h-full w-full items-center justify-center rounded-full",
                                  props.selected &&
                                    "bg-green-600 text-white hover:bg-green-600 hover:text-white focus:bg-green-600 focus:text-white",
                                )}
                              >
                                {format(date, "d")}
                              </div>
                              {hasTasks && (
                                <div
                                  className={cn(
                                    "absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full",
                                    hasCurrentTask ? "bg-green-600" : "bg-slate-400",
                                    props.selected && "bg-white",
                                  )}
                                />
                              )}
                            </div>
                          )
                        },
                      }}
                    />
                  </div>
                </div>

                {/* Tasks for Selected Date */}
                <div className="md:col-span-4 space-y-4 border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Tasks for {format(selectedDate, "MMMM d, yyyy")}</h3>
                    {tasksForSelectedDate.length === 0 && (
                      <Badge variant="outline" className="text-slate-500">
                        No tasks
                      </Badge>
                    )}
                    {tasksForSelectedDate.length > 0 && (
                      <Badge className="bg-green-600">
                        {tasksForSelectedDate.length} task{tasksForSelectedDate.length !== 1 ? "s" : ""}
                      </Badge>
                    )}
                  </div>

                  <div className="h-[300px] border rounded-md">
                    <ScrollArea className="h-full w-full p-4">
                      <div className="space-y-3 pr-4">
                        {tasksForSelectedDate.length > 0 ? (
                          tasksForSelectedDate.map((task) => (
                            <div
                              key={task.id}
                              className={cn(
                                "p-3 rounded-lg border",
                                task.isCurrent
                                  ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                                  : "bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700",
                                task.completed && "opacity-60",
                              )}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                  <div className="mt-0.5">{taskTypeIcons[task.taskType]}</div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium">{task.title}</h4>
                                      {task.isCurrent && <Badge className="bg-green-600">Current</Badge>}
                                      {task.completed && (
                                        <Badge
                                          variant="outline"
                                          className="border-green-200 text-green-700 bg-green-50"
                                        >
                                          Completed
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{task.description}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-slate-500"
                                    onClick={() => {
                                      setSelectedTask(task)
                                      setShowEditTaskDialog(true)
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-slate-500"
                                    onClick={() => handleDeleteTask(task.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="mt-2 pt-2 border-t border-dashed flex justify-between">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className={cn(
                                      "h-7 text-xs",
                                      task.completed
                                        ? "bg-green-50 text-green-700 border-green-200"
                                        : "bg-slate-100 text-slate-700 border-slate-200",
                                    )}
                                    onClick={() => handleToggleTaskCompleted(task.id)}
                                  >
                                    <Check className="h-3 w-3 mr-1" />
                                    {task.completed ? "Completed" : "Mark Complete"}
                                  </Button>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 text-xs"
                                  onClick={() => handleToggleTaskCurrent(task.id)}
                                >
                                  {task.isCurrent ? "Remove Current" : "Set as Current"}
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8 text-center">
                            <CalendarDays className="h-12 w-12 text-slate-300 mb-2" />
                            <p className="text-muted-foreground mb-4">No tasks scheduled for this date</p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setNewTask({ ...newTask, date: selectedDate })
                                setShowAddTaskDialog(true)
                              }}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add Task for This Day
                            </Button>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Task Dialog */}
          <Dialog open={showEditTaskDialog} onOpenChange={setShowEditTaskDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Plant Care Task</DialogTitle>
                <DialogDescription>Update your plant care task details</DialogDescription>
              </DialogHeader>
              {selectedTask && (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-task-title">Task Title</Label>
                    <Input
                      id="edit-task-title"
                      value={selectedTask.title}
                      onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-task-description">Description</Label>
                    <Textarea
                      id="edit-task-description"
                      value={selectedTask.description}
                      onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Task Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(selectedTask.date, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedTask.date}
                          onSelect={(date) => date && setSelectedTask({ ...selectedTask, date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-task-type">Task Type</Label>
                    <Select
                      value={selectedTask.taskType}
                      onChange={(value: any) => setSelectedTask({ ...selectedTask, taskType: value })}
                    >
                      <SelectTrigger id="edit-task-type">
                        <SelectValue placeholder="Select task type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="watering">Watering</SelectItem>
                        <SelectItem value="fertilizing">Fertilizing</SelectItem>
                        <SelectItem value="pruning">Pruning</SelectItem>
                        <SelectItem value="planting">Planting</SelectItem>
                        <SelectItem value="harvesting">Harvesting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-task-current"
                      checked={selectedTask.isCurrent}
                      onCheckedChange={(checked) => setSelectedTask({ ...selectedTask, isCurrent: checked })}
                    />
                    <Label htmlFor="edit-task-current">Mark as current task</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-task-completed"
                      checked={selectedTask.completed}
                      onCheckedChange={(checked) => setSelectedTask({ ...selectedTask, completed: checked })}
                    />
                    <Label htmlFor="edit-task-completed">Mark as completed</Label>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEditTaskDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditTask} className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Soil Mode Section */}
      {activeSection === "soil" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-500" />
                Soil Analysis
              </CardTitle>
              <CardDescription>
                Upload an image of your soil sample for composition analysis and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto">
              {!showSoilResults ? (
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Upload className="h-10 w-10 text-slate-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Upload Soil Image</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop an image file or click to browse
                      </p>
                      <div className="flex gap-2">
                        <label htmlFor="soil-image-upload" className="cursor-pointer">
                          <Button type="button" onClick={() => document.getElementById("soil-image-upload")?.click()}>
                            Select Image
                          </Button>
                          <input
                            id="soil-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0]
                                setSoilFile(file)
                                // Create and store the image URL
                                const imageUrl = URL.createObjectURL(file)
                                setSoilImageUrl(imageUrl)
                              }
                            }}
                          />
                        </label>
                        <Button variant="outline">
                          <Camera className="h-4 w-4 mr-2" />
                          Take Photo
                        </Button>
                      </div>
                      {soilFile && <p className="mt-2 text-sm text-green-600">Selected: {soilFile.name}</p>}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="soil-type">Soil Type (if known)</Label>
                      <Select>
                        <SelectTrigger id="soil-type">
                          <SelectValue placeholder="Select soil type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clay">Clay Soil</SelectItem>
                          <SelectItem value="sandy">Sandy Soil</SelectItem>
                          <SelectItem value="loamy">Loamy Soil</SelectItem>
                          <SelectItem value="silty">Silty Soil</SelectItem>
                          <SelectItem value="peaty">Peaty Soil</SelectItem>
                          <SelectItem value="chalky">Chalky Soil</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="location">Growing Location</Label>
                      <Select>
                        <SelectTrigger id="location">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="garden">Garden Bed</SelectItem>
                          <SelectItem value="container">Container/Pot</SelectItem>
                          <SelectItem value="raised">Raised Bed</SelectItem>
                          <SelectItem value="indoor">Indoor</SelectItem>
                          <SelectItem value="greenhouse">Greenhouse</SelectItem>
                          <SelectItem value="field">Field/Farm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="detailed-analysis"
                        checked={includeNutrientAnalysis}
                        onCheckedChange={setIncludeNutrientAnalysis}
                      />
                      <Label htmlFor="detailed-analysis">Include Nutrient Analysis</Label>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handleAnalyzeSoil}
                    disabled={isAnalyzingSoil}
                  >
                    {isAnalyzingSoil ? (
                      <>
                        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></span>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Leaf className="mr-2 h-4 w-4" />
                        Analyze Soil
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
                    <div className="aspect-square max-w-[200px] mx-auto bg-white dark:bg-slate-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      {soilImageUrl ? (
                        <div className="relative w-32 h-32 mx-auto">
                          <Image
                            src={soilImageUrl || "/placeholder.svg"}
                            alt="Analyzed soil"
                            width={128}
                            height={128}
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <Leaf className="h-16 w-16 text-green-500" />
                      )}
                    </div>
                    <h3 className="text-lg font-medium mb-2">Analysis Complete</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Soil Type</h3>
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <Leaf className="h-6 w-6 text-amber-600" />
                          </div>
                          <div>
                            <div className="font-medium text-lg">{soilAnalysisResult?.["Predicted Soil Type"]}</div>
                            <div className="text-sm text-muted-foreground">Identified with high confidence</div>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                          <h4 className="font-medium mb-2">Recommended Crops</h4>
                          {(() => {
                            const crops = soilAnalysisResult?.["Recommended Crops"]
                            if (!crops) return null

                            // Handle array
                            if (Array.isArray(crops)) {
                              return crops.map((crop: string, index: number) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="bg-green-50 text-green-700 border-green-200"
                                >
                                  {crop}
                                </Badge>
                              ))
                            }

                            // Handle string (comma or semicolon separated)
                            if (typeof crops === "string") {
                              return crops.split(/[,;]/).map((crop: string, index: number) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="bg-green-50 text-green-700 border-green-200"
                                >
                                  {crop.trim()}
                                </Badge>
                              ))
                            }

                            // Handle object (key-value pairs)
                            if (typeof crops === "object") {
                              return Object.keys(crops).map((crop: string, index: number) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="bg-green-50 text-green-700 border-green-200"
                                >
                                  {crop}
                                </Badge>
                              ))
                            }

                            return null
                          })()}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">pH Level</h3>
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                        {soilAnalysisResult?.["pH Level Info"] ? (
                          <PHLevelChart
                            phValue={soilAnalysisResult["pH Level Info"]}
                            idealRange={
                              soilAnalysisResult["Ideal pH Level"]
                                ? (soilAnalysisResult["Ideal pH Level"].split("-").map(Number.parseFloat) as [
                                    number,
                                    number,
                                  ])
                                : undefined
                            }
                          />
                        ) : (
                          <div className="text-center py-4 text-muted-foreground">
                            pH level information not available
                          </div>
                        )}
                        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                          <h4 className="font-medium mb-2">pH Adjustment Recommendations</h4>
                          {soilAnalysisResult?.["pH Level Info"]?.recommendations?.length > 0 ? (
                            <ul className="space-y-1 text-sm">
                              {soilAnalysisResult["pH Level Info"].recommendations.map((rec: string, index: number) => (
                                <li key={index}>• {rec}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              {soilAnalysisResult?.["pH Level Info"]?.status
                                ? `Current pH is ${soilAnalysisResult["pH Level Info"].status.toLowerCase()} for ${soilAnalysisResult["Predicted Soil Type"]}. ${soilAnalysisResult["pH Level Info"].recommendation || ""}`
                                : "No specific pH adjustment recommendations available."}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {includeNutrientAnalysis && soilAnalysisResult?.["Nutrient Analysis"] && (
                      <div>
                        <h3 className="font-medium mb-2">Nutrient Analysis</h3>
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                          <SoilNutrientBarChart data={soilAnalysisResult["Nutrient Analysis"]} />
                          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                            <h4 className="font-medium mb-2">Nutrient Recommendations</h4>
                            <ul className="space-y-1 text-sm">
                              {soilAnalysisResult["Nutrient Recommendations"] &&
                                Object.entries(soilAnalysisResult["Nutrient Recommendations"]).map(
                                  ([name, recommendation]) => (
                                    <li key={name}>
                                      • <span className="font-medium">{name}:</span> {recommendation}
                                    </li>
                                  ),
                                )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1" onClick={() => setShowSoilResults(false)}>
                      Analyze Another Sample
                    </Button>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">Save Results</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Soil Health Guidelines</CardTitle>
              <CardDescription>Key indicators of healthy soil for sustainable agriculture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Optimal pH Levels</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Most plants thrive in soil with a pH between 6.0 and 7.0. Some plants prefer more acidic or alkaline
                    conditions.
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-red-100 dark:bg-red-900 p-2 rounded">
                      <div>Acidic</div>
                      <div className="font-medium">4.0-6.0</div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded">
                      <div>Neutral</div>
                      <div className="font-medium">6.0-7.0</div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
                      <div>Alkaline</div>
                      <div className="font-medium">7.0-8.0</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Essential Nutrients</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                      <h4 className="text-sm font-medium mb-1">Macronutrients</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Nitrogen (N)</li>
                        <li>• Phosphorus (P)</li>
                        <li>• Potassium (K)</li>
                        <li>• Calcium (Ca)</li>
                        <li>• Magnesium (Mg)</li>
                      </ul>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                      <h4 className="text-sm font-medium mb-1">Micronutrients</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Iron (Fe)</li>
                        <li>• Manganese (Mn)</li>
                        <li>• Zinc (Zn)</li>
                        <li>• Copper (Cu)</li>
                        <li>• Boron (B)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Soil Structure</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Good soil structure allows for proper drainage, root growth, and nutrient availability.
                  </p>
                  <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                    <ul className="text-sm space-y-1">
                      <li>• Loamy soil is ideal for most plants</li>
                      <li>• Soil should be crumbly and not compacted</li>
                      <li>• Organic matter improves soil structure</li>
                      <li>• Good drainage prevents root rot</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Common Soil Problems</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="compaction">
                      <AccordionTrigger className="text-sm">Soil Compaction</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Compacted soil restricts root growth and water infiltration. Aerate soil by adding organic
                          matter, avoiding walking on garden beds, and using cover crops with deep roots.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="drainage">
                      <AccordionTrigger className="text-sm">Poor Drainage</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Poorly drained soil can lead to root rot and fungal diseases. Improve drainage by adding
                          organic matter, creating raised beds, or installing drainage systems in severe cases.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="nutrient">
                      <AccordionTrigger className="text-sm">Nutrient Deficiency</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Signs include yellowing leaves, stunted growth, and poor yields. Address with appropriate
                          organic fertilizers, compost, or specific amendments based on soil test results.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Soil Amendment Recommendations</CardTitle>
              <CardDescription>Common amendments to improve soil health and fertility</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Compost</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Improves soil structure, adds nutrients, and enhances microbial activity.
                  </p>
                  <div className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span>Nutrient Value:</span>
                      <span>Medium</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Structure Improvement:</span>
                      <span>High</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Application Rate:</span>
                      <span>1-3" layer</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Aged Manure</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Rich in nutrients and organic matter. Use only well-composted manure.
                  </p>
                  <div className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span>Nutrient Value:</span>
                      <span>High</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Structure Improvement:</span>
                      <span>Medium</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Application Rate:</span>
                      <span>1/2-1" layer</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Leaf Mold</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Decomposed leaves that improve soil structure and water retention.
                  </p>
                  <div className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span>Nutrient Value:</span>
                      <span>Low</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Structure Improvement:</span>
                      <span>High</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Application Rate:</span>
                      <span>2-3" layer</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Farmers Market Section */}
      {activeSection === "market" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle>Farmers Market</CardTitle>
                <CardDescription>Buy fresh produce directly from local farmers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search for produce..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Vegetables">Vegetables</SelectItem>
                        <SelectItem value="Fruits">Fruits</SelectItem>
                        <SelectItem value="Dairy & Eggs">Dairy & Eggs</SelectItem>
                        <SelectItem value="Meat">Meat</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden h-full flex flex-col">
                      <div className="relative aspect-square">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        {product.organic && <Badge className="absolute top-2 right-2 bg-green-600">Organic</Badge>}
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            <span className="text-sm ml-1">{product.rating}</span>
                          </div>
                        </div>
                        <CardDescription>
                          <span className="flex items-center gap-1">
                            <span>{product.farmer}</span>
                            <span>•</span>
                            <span>{product.location}</span>
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2 flex-grow">
                        <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-lg">
                            ${product.price.toFixed(2)}
                            <span className="text-sm font-normal text-muted-foreground">/{product.unit}</span>
                          </div>
                          <Badge variant="outline">{product.stock} available</Badge>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={() => addToCart(product)} className="w-full bg-green-600 hover:bg-green-700">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-green-500" />
                  Your Cart
                </CardTitle>
                <CardDescription>
                  {cart.length === 0
                    ? "Your cart is empty"
                    : `${cart.reduce((total, item) => total + item.quantity, 0)} items in your cart`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cart.length > 0 ? (
                  <div className="space-y-4">
                    <ScrollArea className="h-[300px] pr-3">
                      {cart.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex justify-between items-center pb-3 border-b last:border-0 last:pb-0 mb-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 relative rounded overflow-hidden">
                              <Image
                                src={item.product.image || "/placeholder.svg"}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{item.product.name}</p>
                              <p className="text-xs text-muted-foreground">
                                ${item.product.price.toFixed(2)}/{item.product.unit}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-none"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              >
                                <span className="sr-only">Decrease</span>
                                <span>-</span>
                              </Button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-none"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <span className="sr-only">Increase</span>
                                <span>+</span>
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-red-500"
                              onClick={() => removeFromCart(item.product.id)}
                            >
                              <span className="sr-only">Remove</span>
                              <span>×</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Delivery</span>
                        <span>$5.00</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${(calculateTotal() + 5).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground">
                      Browse the farmers market to add fresh produce to your cart
                    </p>
                  </div>
                )}
              </CardContent>
              {cart.length > 0 && (
                <CardFooter className="flex flex-col gap-2">
                  <Button onClick={handleCheckout} className="w-full bg-green-600 hover:bg-green-700">
                    Checkout
                  </Button>
                </CardFooter>
              )}

              {cart.length === 0 && orders.length > 0 && (
                <CardFooter className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className="w-full border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
                    onClick={() => setShowOrderHistory(true)}
                  >
                    View Order History
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>

          <Card className="lg:col-span-4 mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-500" />
                Nearby Farms
              </CardTitle>
              <CardDescription>Connect with local farmers in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {farmData.slice(0, 3).map((farm) => (
                  <div key={farm.id} className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 flex flex-col h-full">
                    <div className="relative w-full aspect-video rounded-md overflow-hidden mb-3">
                      <Image src={farm.image || "/placeholder.svg"} alt={farm.name} fill className="object-cover" />
                    </div>
                    <h3 className="font-medium mb-1">{farm.name}</h3>
                    <CardDescription>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {farm.location}
                      </span>
                    </CardDescription>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">{farm.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 hover:border-green-300 focus:ring-green-500"
                      onClick={() => setSelectedFarm(farm)}
                    >
                      View Profile
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                  onClick={() => setShowFarmRegistration(true)}
                >
                  Register Your Farm
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Farm Details Dialog */}
      {selectedFarm && (
        <Dialog open={!!selectedFarm} onOpenChange={(open) => !open && setSelectedFarm(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Farm Details</DialogTitle>
              <DialogDescription>Learn more about this local farm</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                <Image
                  src={selectedFarm.image || "/placeholder.svg"}
                  alt={selectedFarm.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedFarm.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-600">Since {selectedFarm.founded}</Badge>
                    <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                      ★ {selectedFarm.rating}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedFarm.farmer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedFarm.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedFarm.farmSize}</span>
                  </div>
                </div>

                <p className="text-muted-foreground">{selectedFarm.description}</p>

                <div>
                  <h3 className="font-medium mb-2">Products</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFarm.products.map((product, i) => (
                      <Badge key={i} variant="secondary">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFarm.certifications.map((cert, i) => (
                      <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Browse Products
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Farm Registration Dialog */}
      {showFarmRegistration && (
        <Dialog open={showFarmRegistration} onOpenChange={setShowFarmRegistration}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Register Your Farm</DialogTitle>
              <DialogDescription>
                Join our network of local farmers and sell your products directly to consumers
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh]">
              <form onSubmit={handleFarmRegistration} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="farmName">Farm Name</Label>
                    <Input
                      id="farmName"
                      name="farmName"
                      value={registrationForm.farmName}
                      onChange={handleRegistrationChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmerName">Farmer Name</Label>
                    <Input
                      id="farmerName"
                      name="farmerName"
                      value={registrationForm.farmerName}
                      onChange={handleRegistrationChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={registrationForm.location}
                      onChange={handleRegistrationChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certifications">Certifications</Label>
                    <Input
                      id="certifications"
                      name="certifications"
                      value={registrationForm.certifications}
                      onChange={handleRegistrationChange}
                      placeholder="e.g. Organic, Non-GMO, etc."
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="products">Products (comma separated)</Label>
                    <Input
                      id="products"
                      name="products"
                      value={registrationForm.products}
                      onChange={handleRegistrationChange}
                      placeholder="e.g. Tomatoes, Eggs, Beef, etc."
                      required
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="description">Farm Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={registrationForm.description}
                      onChange={handleRegistrationChange}
                      rows={4}
                      required
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="farmImages">Farm Images</Label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Drag and drop images or click to browse</p>
                      <Button type="button" variant="outline" size="sm">
                        Select Images
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowFarmRegistration(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Submit Registration
                  </Button>
                </div>
              </form>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}

      {/* Order History Dialog */}
      {showOrderHistory && (
        <Dialog open={showOrderHistory} onOpenChange={setShowOrderHistory}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Order History</DialogTitle>
              <DialogDescription>Track your orders and view past purchases</DialogDescription>
            </DialogHeader>

            {orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">Order #{order.id}</CardTitle>
                        <Badge
                          className={
                            order.status === "delivered"
                              ? "bg-green-600"
                              : order.status === "shipped"
                                ? "bg-blue-600"
                                : "bg-amber-600"
                          }
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription>Placed on {order.date}</CardDescription>
                    </CardHeader>

                    <CardContent className="max-h-[400px] overflow-y-auto">
                      <div className="space-y-4">
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                          <h4 className="font-medium mb-2">Order Status</h4>
                          <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                              <div className="text-xs text-green-600 font-semibold">
                                {order.status === "processing"
                                  ? "Processing"
                                  : order.status === "shipped"
                                    ? "Shipped"
                                    : "Delivered"}
                              </div>
                              {order.estimatedDelivery && (
                                <div className="text-xs text-muted-foreground">
                                  Est. Delivery: {order.estimatedDelivery}
                                </div>
                              )}
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-200 dark:bg-slate-700">
                              <div
                                style={{
                                  width:
                                    order.status === "processing" ? "33%" : order.status === "shipped" ? "66%" : "100%",
                                }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"
                              />
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Processing</span>
                              <span>Shipped</span>
                              <span>Delivered</span>
                            </div>
                          </div>

                          {order.trackingNumber && (
                            <div className="mt-3 text-sm">
                              <span className="font-medium">Tracking Number: </span>
                              <span className="text-muted-foreground">{order.trackingNumber}</span>
                            </div>
                          )}
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Items</h4>
                          <div className="space-y-2">
                            {order.products.map((item) => (
                              <div key={item.product.id} className="flex justify-between items-center border-b pb-2">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 relative rounded overflow-hidden">
                                    <Image
                                      src={item.product.image || "/placeholder.svg"}
                                      alt={item.product.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">{item.product.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      ${item.product.price.toFixed(2)} × {item.quantity}
                                    </p>
                                  </div>
                                </div>
                                <div className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t pt-3">
                          <div className="flex justify-between mb-1">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>${(order.total - 5).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-muted-foreground">Delivery</span>
                            <span>$5.00</span>
                          </div>
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">No order history yet</p>
                <p className="text-sm text-muted-foreground">Your completed orders will appear here</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

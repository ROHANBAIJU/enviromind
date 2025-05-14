"use client"

import { useState, useRef } from "react"
import axios from "axios"
import { useStore } from "@/lib/store-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Recycle,
  ShoppingCart,
  Camera,
  Upload,
  BarChart3,
  MapPin,
  Package,
  X,
  Plus,
  Minus,
  Check,
  ShoppingBag,
  Leaf,
  Star,
  ArrowLeft,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

// Revive store products data
const reviveProducts = [
  {
    id: "water-bottle-1",
    name: "Eco-Friendly Water Bottle",
    price: 24.99,
    image: "/eco-friendly-water-bottle.png",
    store: "EcoLife",
    category: "kitchen",
    recycled: true,
    rating: 4.8,
  },
  {
    id: "cutlery-set-1",
    name: "Bamboo Cutlery Set",
    price: 18.99,
    image: "/bamboo-cutlery-set.png",
    store: "Green Living",
    category: "kitchen",
    recycled: false,
    rating: 4.7,
  },
  {
    id: "power-bank-1",
    name: "Solar Power Bank",
    price: 39.99,
    image: "/solar-power-bank.png",
    store: "EcoTech",
    category: "electronics",
    recycled: false,
    rating: 4.6,
  },
  {
    id: "tote-bag-1",
    name: "Organic Cotton Tote Bag",
    price: 15.99,
    image: "/organic-cotton-tote-bag.png",
    store: "Green Living",
    category: "bags",
    recycled: false,
    rating: 4.9,
  },
  {
    id: "notebook-1",
    name: "Recycled Paper Notebook",
    price: 9.99,
    image: "/recycled-paper-notebook.png",
    store: "EcoStationery",
    category: "stationery",
    recycled: true,
    rating: 4.5,
  },
  {
    id: "backpack-1",
    name: "Recycled Plastic Backpack",
    price: 59.99,
    image: "/recycled-plastic-backpack.png",
    store: "EcoGear",
    category: "bags",
    recycled: true,
    rating: 4.7,
  },
  {
    id: "notebook-2",
    name: "Upcycled Denim Notebook",
    price: 12.99,
    image: "/upcycled-denim-notebook.png",
    store: "EcoStationery",
    category: "stationery",
    recycled: true,
    rating: 4.6,
  },
  {
    id: "desk-organizer-1",
    name: "Reclaimed Wood Desk Organizer",
    price: 29.99,
    image: "/reclaimed-wood-desk-organizer.png",
    store: "EcoHome",
    category: "home",
    recycled: true,
    rating: 4.8,
  },
]

// Environmental tips mapping (same as backend)
const ENV_TIPS = {
  cardboard: "Recycle or compost cardboard to reduce landfill waste.",
  glass: "Glass can be infinitely recycled, so make sure to drop it in the right bin.",
  metal: "Reuse metal items when possible and recycle scrap metal responsibly.",
  paper: "Paper recycling helps save trees—avoid excessive paper waste.",
  plastic: "Plastic recycling varies by type; reduce single-use plastics when possible.",
  trash: "Consider repurposing or minimizing waste to reduce environmental impact.",
}

export function EcoScanTool({ onClose }) {
  const [activeTab, setActiveTab] = useState("scan")
  const [scanResult, setScanResult] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [showSellDialog, setShowSellDialog] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [scanImage, setScanImage] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [isOfflineMode, setIsOfflineMode] = useState(false) // Added offline mode state
  const fileInputRef = useRef(null)
  const { toast } = useToast()
  const router = useRouter()

  // Get store context
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    orders,
    addOrder,
    cartTotal,
    wishlist,
    toggleWishlist,
    clearCart,
  } = useStore()

  const handleFileSelect = (event) => {
    if (!event.target.files || event.target.files.length === 0) return

    const file = event.target.files[0]
    if (file) {
      // Create a preview URL for the selected image
      const imageUrl = URL.createObjectURL(file)
      setScanImage(imageUrl)

      // Process the file
      handleScanFile(file)
    }
  }

  const handleScanFile = async (file) => {
    setIsScanning(true)
    setScanResult(null)
    setErrorMessage("")

    const formData = new FormData()
    formData.append("file", file)

    try {
      let response

      try {
        // Connect to the Flask backend
        response = await axios.post("http://127.0.0.1:5000/eco_scan", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 10000, // 10 second timeout
        })

        console.log("Backend response:", response.data)
        console.log("Predicted Class:", response.data["Predicted Class"])

        // Define materialMap before using it
        const materialMap = {
          cardboard: "Cardboard",
          glass: "Glass",
          metal: "Metal",
          paper: "Paper",
          plastic: "Plastic",
          trash: "Trash",
        }

        console.log("Mapped Material:", materialMap[response.data["Predicted Class"]])

        // Transform backend response to frontend format
        const backendData = response.data

        // Parse confidence score from string to number (remove % and convert to decimal)
        const confidenceStr = backendData["Confidence Score"]
        const confidenceNum = Number.parseFloat(confidenceStr) / 100

        const transformedResult = {
          material: materialMap[backendData["Predicted Class"]] || backendData["Predicted Class"],
          rawMaterial: backendData["Predicted Class"],
          recyclable: backendData["Predicted Class"] !== "trash",
          value: backendData["EcoScore"] || 0,
          confidence: confidenceNum,
          impact: backendData["Environmental Tips"] || "Recycling this item helps reduce landfill waste.",
          recommendations: [
            backendData["Biodegradable"] ? "This material is biodegradable" : "This material is not biodegradable",
            backendData["ReVive Friendly"]
              ? "This material is Revive-friendly"
              : "This material is not Revive-friendly",
            `Confidence: ${confidenceStr}`,
          ],
        }

        setScanResult(transformedResult)
        toast({
          title: "Scan Successful",
          description: `Identified as ${transformedResult.material} with ${confidenceStr} confidence`,
        })
      } catch (backendError) {
        console.warn("Backend connection failed, using fallback mock data:", backendError)

        // Fallback to mock data if backend is not available
        // Simulate a delay to mimic API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Create a mock response based on the file type
        const fileName = file.name.toLowerCase()
        let mockClass = "plastic" // Default

        if (fileName.includes("glass") || fileName.includes("bottle")) {
          mockClass = "glass"
        } else if (fileName.includes("paper") || fileName.includes("cardboard")) {
          mockClass = "cardboard"
        } else if (fileName.includes("can") || fileName.includes("metal")) {
          mockClass = "metal"
        } else if (fileName.includes("trash") || fileName.includes("waste")) {
          mockClass = "trash"
        }

        const mockConfidence = 0.85
        const mockConfidenceStr = `${(mockConfidence * 100).toFixed(2)}%`

        const materialMap = {
          cardboard: "Cardboard",
          glass: "Glass",
          metal: "Metal",
          paper: "Paper",
          plastic: "Plastic",
          trash: "Trash",
        }

        const transformedResult = {
          material: materialMap[mockClass] || mockClass.charAt(0).toUpperCase() + mockClass.slice(1),
          recyclable: mockClass !== "trash",
          value: mockClass === "trash" ? 0 : Math.floor(Math.random() * 5) + 2,
          confidence: mockConfidence,
          impact:
            ENV_TIPS[mockClass] || "Recycling this item helps reduce landfill waste and conserves natural resources.",
          recommendations: [
            mockClass !== "plastic" && mockClass !== "glass"
              ? "This material is biodegradable"
              : "This material is not biodegradable",
            mockClass !== "trash" ? "This material is Revive-friendly" : "This material is not Revive-friendly",
            `Confidence: ${mockConfidenceStr}`,
          ],
        }

        setScanResult(transformedResult)
        toast({
          title: "Scan Successful (Offline Mode)",
          description: `Identified as ${transformedResult.material} with ${mockConfidenceStr} confidence`,
        })
      }
    } catch (error) {
      console.error("Error scanning item:", error)
      setErrorMessage("Could not process the image. Using offline mode with limited functionality.")

      // Create a basic fallback result even if the mock data processing fails
      const fallbackResult = {
        material: "Unknown Material",
        recyclable: true,
        value: 3,
        confidence: 0.7,
        impact: "Recycling helps reduce waste in landfills and conserves natural resources.",
        recommendations: [
          "When possible, clean items before recycling",
          "Check local recycling guidelines for specific instructions",
          "Consider reusing this item before recycling",
        ],
      }

      setScanResult(fallbackResult)
      toast({
        title: "Offline Mode",
        description: "Using limited functionality in offline mode",
        variant: "warning",
      })
      setIsOfflineMode(true) // Set offline mode to true
    } finally {
      setIsScanning(false)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Checkout function
  const handleCheckout = () => {
    if (cart.length === 0) return

    // Create new order items
    const newOrder = {
      id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toLocaleDateString(),
      products: [...cart],
      total: cartTotal + 5, // Including delivery fee
      status: "processing",
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      trackingNumber: `TRK${Math.floor(Math.random() * 100000000)}`,
    }

    // Add to order history
    addOrder(newOrder)

    toast({
      title: "Order Placed Successfully",
      description: "Your order has been placed and will be delivered soon!",
    })

    // Clear cart
    clearCart()
  }

  const filteredProducts = reviveProducts.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.store.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const renderScanTab = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/40 rounded-xl overflow-hidden mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          <div className="p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">EcoScan</h2>
            <p className="text-green-700 dark:text-green-400 mb-4">
              Scan recyclable items to identify materials, earn credits, and track your environmental impact.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center">
                  <Recycle className="h-4 w-4 text-green-700 dark:text-green-300" />
                </div>
                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                  Identify recyclable materials
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center">
                  <Star className="h-4 w-4 text-green-700 dark:text-green-300" />
                </div>
                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                  Earn credits for recycling
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-green-700 dark:text-green-300" />
                </div>
                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                  Track your environmental impact
                </span>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 relative min-h-[250px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-3 p-6 w-full h-full">
                <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm p-4 transform hover:scale-105 transition-transform flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-black/10 dark:bg-black/30 flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      <path d="M21 9V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"></path>
                      <path d="M3 16v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"></path>
                      <path d="M3 12h18"></path>
                      <path d="M12 3v18"></path>
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium mb-1">Plastic</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">5 credits</p>
                </div>
                <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm p-4 transform hover:scale-105 transition-transform flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-black/10 dark:bg-black/30 flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      <rect width="8" height="14" x="8" y="3" rx="4"></rect>
                      <path d="M8 8h8"></path>
                      <path d="M8 12h8"></path>
                      <path d="M10 17h4"></path>
                      <path d="M6 20a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2Z"></path>
                      <path d="M20 20a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2Z"></path>
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium mb-1">Glass</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">4 credits</p>
                </div>
                <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm p-4 transform hover:scale-105 transition-transform flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-black/10 dark:bg-black/30 flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-600 dark:text-gray-400"
                    >
                      <path d="M12 3v19"></path>
                      <path d="M5 8h14"></path>
                      <path d="M19 12H5"></path>
                      <path d="M5 16h14"></path>
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium mb-1">Metal</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">6 credits</p>
                </div>
                <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm p-4 transform hover:scale-105 transition-transform flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-black/10 dark:bg-black/30 flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      <path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3"></path>
                      <path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"></path>
                      <path d="M12 3v18"></path>
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium mb-1">Paper</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 credits</p>
                </div>
                <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm p-4 transform hover:scale-105 transition-transform flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-black/10 dark:bg-black/30 flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      <path d="M6.5 10c.94-2.25 2.5-3 4.5-3s3.56.75 4.5 3"></path>
                      <path d="M18 10.5c1.73.2 3 .5 3 2.5 0 .16 0 .32-.03.48"></path>
                      <path d="M6.5 10c-1.73.2-3 .5-3 2.5 0 .18.01.36.04.54"></path>
                      <path d="M12.5 15c-.5 0-1.58.67-2 2"></path>
                      <path d="M10 21c-2 0-3-1-3-3"></path>
                      <path d="M10 21c2 0 3-1 3-3"></path>
                      <path d="M15 21c2 0 3-1 3-3"></path>
                      <path d="M18 10.25C18 7 15.5 4 12 4s-6 3-6 6.25"></path>
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium mb-1">Textiles</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">3 credits</p>
                </div>
                <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm p-4 transform hover:scale-105 transition-transform flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-black/10 dark:bg-black/30 flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium mb-1">E-waste</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">8 credits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green-600/10 dark:bg-green-900/30 p-4 flex flex-col gap-3">
          <div>
            <Button
              variant="outline"
              onClick={handleClose}
              className="hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 focus:border-green-500 focus:ring-green-500 transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
          <div className="flex justify-between items-center mt-1">
            <div className="text-sm text-green-800 dark:text-green-300">
              <span className="font-medium">127 total credits earned</span> • 43 items recycled
            </div>
            <Button onClick={triggerFileInput} className="bg-green-600 hover:bg-green-700 text-white" size="sm">
              Start Scanning
            </Button>
            <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileSelect} className="hidden" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch justify-between space-y-4 md:space-y-0 md:space-x-6 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-inner dark:border-gray-700">
        {/* Left side - Scanner */}
        <div className="flex flex-col items-center justify-center md:w-1/2 p-4 bg-black/5 dark:bg-black/20 rounded-lg">
          {isScanning ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-64 h-64 relative bg-black rounded-lg overflow-hidden shadow-lg">
                {scanImage && (
                  <Image
                    src={scanImage || "/placeholder.svg"}
                    alt="Scanning item"
                    fill
                    className="object-cover opacity-70"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-1 bg-green-500 animate-scan"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-30"></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">Analyzing image...</p>
            </div>
          ) : scanImage ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-64 h-64 relative bg-black rounded-lg overflow-hidden shadow-lg">
                <Image src={scanImage || "/placeholder.svg"} alt="Scanned item" fill className="object-cover" />
              </div>
              <div className="flex space-x-2 mt-4">
                <Button
                  onClick={() => {
                    setScanImage(null)
                    setScanResult(null)
                    setErrorMessage("")
                  }}
                  variant="outline"
                  className="hover:border-green-500 transition-colors shadow-sm hover:shadow"
                >
                  Clear Image
                </Button>
                <Button
                  onClick={triggerFileInput}
                  className="bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all"
                >
                  Scan New Image
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div
                className="w-64 h-64 relative bg-black rounded-lg overflow-hidden flex items-center justify-center shadow-lg group cursor-pointer"
                onClick={triggerFileInput}
              >
                <Camera className="h-16 w-16 text-gray-600 group-hover:text-gray-400 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <div className="space-y-2 text-center mt-4">
                <h3 className="font-medium">Scan Recyclable Item</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upload an image of a recyclable item to identify it and earn credits
                </p>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button
                  onClick={triggerFileInput}
                  className="bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Select Image
                </Button>
                <Button
                  variant="outline"
                  className="hover:border-green-500 transition-colors shadow-sm hover:shadow"
                  onClick={triggerFileInput}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Right side - Scan Results */}
        <div className="md:w-1/2 flex flex-col p-4 bg-black/5 dark:bg-black/20 rounded-lg">
          {isOfflineMode && ( // Added offline mode indicator
            <div className="mb-4 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Running in offline mode with limited functionality
                </p>
              </div>
            </div>
          )}
          {isScanning ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 bg-green-200 dark:bg-green-800 rounded-full flex items-center justify-center mb-4">
                  <Recycle className="h-8 w-8 text-green-600 dark:text-green-400 animate-spin" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Analyzing your item...</p>
              </div>
            </div>
          ) : errorMessage ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg shadow-sm">
                <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
                <h3 className="font-medium mb-2 text-red-600 dark:text-red-400">Scan Failed</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{errorMessage}</p>
                <Button
                  onClick={() => {
                    setErrorMessage("")
                    triggerFileInput()
                  }}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white"
                  size="sm"
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : scanResult ? (
            <div className="w-full space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full shadow-sm">
                  <Recycle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {scanResult.material}
                    <span className="text-xs text-gray-500 ml-2">(Raw: {scanResult.rawMaterial})</span>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {scanResult.recyclable ? "Recyclable" : "Not Recyclable"}
                  </p>
                </div>
                <Badge className="ml-auto shadow-sm" variant={scanResult.recyclable ? "success" : "destructive"}>
                  {scanResult.recyclable ? `${scanResult.value} credits` : "No value"}
                </Badge>
              </div>

              <div className="space-y-2 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-sm">
                <h4 className="text-sm font-medium">Environmental Impact</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{scanResult.impact}</p>
              </div>

              <div className="space-y-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-medium flex items-center">
                  <span className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2">
                    <Recycle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </span>
                  Recommendations
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-3">
                  {scanResult.recommendations.map((rec, i) => {
                    // Check if this is the confidence recommendation
                    if (rec.includes("Confidence:")) {
                      const confidenceMatch = rec.match(/Confidence: ([\d.]+)%/)
                      const confidenceValue = confidenceMatch ? Number.parseFloat(confidenceMatch[1]) : 0
                      return (
                        <li key={i} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Confidence Level</span>
                            <span
                              className={`text-xs font-semibold ${
                                confidenceValue > 80
                                  ? "text-green-600 dark:text-green-400"
                                  : confidenceValue > 60
                                    ? "text-amber-600 dark:text-amber-400"
                                    : "text-red-600 dark:text-red-400"
                              }`}
                            >
                              {confidenceValue.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                confidenceValue > 80
                                  ? "bg-green-500"
                                  : confidenceValue > 60
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${confidenceValue}%` }}
                            ></div>
                          </div>
                        </li>
                      )
                    }
                    // Check if this is the Revive-friendly recommendation
                    else if (rec.includes("Revive-friendly")) {
                      return (
                        <li key={i} className="flex items-start p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                          <span className="mr-2 text-green-500">
                            {rec.includes("not") ? (
                              <X className="h-4 w-4 text-red-500" />
                            ) : (
                              <Check className="h-4 w-4" />
                            )}
                          </span>
                          <span
                            className={
                              rec.includes("not")
                                ? "text-gray-600 dark:text-gray-300"
                                : "text-green-600 dark:text-green-400 font-medium"
                            }
                          >
                            {rec}
                          </span>
                        </li>
                      )
                    }
                    // For other recommendations
                    else {
                      return (
                        <li key={i} className="flex items-start p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                          <span className="mr-2 text-green-500">•</span>
                          <span>{rec}</span>
                        </li>
                      )
                    }
                  })}
                </ul>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic">
                  Tip: For more accurate results, ensure good lighting and a clear view of the item.
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  onClick={() => {
                    setScanResult(null)
                    setScanImage(null)
                  }}
                  variant="outline"
                  size="sm"
                  className="hover:border-green-500 transition-colors shadow-sm hover:shadow"
                >
                  Scan Again
                </Button>
                {scanResult.recyclable && (
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all"
                    onClick={() => {
                      toast({
                        title: "Credits Claimed",
                        description: `You've earned ${scanResult.value} credits for recycling this ${scanResult.material.toLowerCase()}.`,
                      })
                    }}
                  >
                    Claim {scanResult.value} Credits
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center p-6 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-sm">
                <h3 className="font-medium mb-2">Scan Results</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upload an image to see detailed information about its recyclability and environmental impact.
                </p>
                <Button
                  onClick={triggerFileInput}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Select Image
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Recent Scans</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-black/10 dark:bg-black/30 rounded-full">
                <Recycle className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <p className="font-medium">Aluminum Can</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Dec 10, 2023</p>
              </div>
            </div>
            <Badge>3 credits</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-black/10 dark:bg-black/30 rounded-full">
                <Recycle className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <p className="font-medium">Glass Bottle</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Dec 8, 2023</p>
              </div>
            </div>
            <Badge>4 credits</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-black/10 dark:bg-black/30 rounded-full">
                <Recycle className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <p className="font-medium">Cardboard Box</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Dec 5, 2023</p>
              </div>
            </div>
            <Badge>2 credits</Badge>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Recycling Stats</h3>
          <Button variant="ghost" size="sm" className="hover:border-green-500 transition-colors">
            <BarChart3 className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">+12 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Items Recycled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">43</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">+5 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">CO2 Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.5kg</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">+2.1kg this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Recycling Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7 days</div>
              <p className="text-xs text-green-500">Current streak</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderReviveTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">REVIVE Store</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Shop sustainable products made from recycled materials
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowSellDialog(true)}
            className="hover:border-green-500 transition-colors"
          >
            Sell Now
          </Button>
          <Dialog open={showSellDialog} onOpenChange={setShowSellDialog}>
            <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Your Cart</DialogTitle>
                <DialogDescription>Review your items before checkout</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh]">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                    <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-amber-500">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 hover:border-green-500 transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 hover:border-green-500 transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-between font-semibold">
                  <span>Total:</span>
                  <span className="text-amber-500">${cartTotal.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-emerald-500">Ready to checkout</span>
                  <Button
                    onClick={handleCheckout}
                    disabled={cart.length === 0}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <Card className="border-emerald-200 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Total: <span className="font-bold text-amber-500">${cartTotal.toFixed(2)}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="hover:border-green-500 transition-colors">
                      View Cart
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Your Cart</DialogTitle>
                      <DialogDescription>Review your items before checkout</DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="max-h-[60vh]">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                          <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-amber-500">${item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 hover:border-green-500 transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 hover:border-green-500 transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </ScrollArea>
                    <div className="pt-4 space-y-4">
                      <div className="flex items-center justify-between font-semibold">
                        <span>Total:</span>
                        <span className="text-amber-500">${cartTotal.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-500">Ready to checkout</span>
                        <Button
                          onClick={handleCheckout}
                          disabled={cart.length === 0}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          Checkout
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button onClick={handleCheckout} className="bg-emerald-600 hover:bg-emerald-700">
                  Checkout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg p-3 mb-4 hidden sm:flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full mr-3">
            <ShoppingBag className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium">REVIVE Impact</h4>
            <p className="text-xs text-muted-foreground">Join our community of eco-conscious sellers</p>
          </div>
        </div>
        <div className="flex gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">24,731</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Active Sellers</p>
          </div>
          <div>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">1.2M kg</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Waste Recycled</p>
          </div>
          <div>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">$3.4M</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Seller Earnings</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="kitchen">Kitchen</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="bags">Bags</SelectItem>
            <SelectItem value="stationery">Stationery</SelectItem>
            <SelectItem value="home">Home</SelectItem>
            <SelectItem value="garden">Garden</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-md transition-all duration-300 border-slate-200 hover:border-green-300"
          >
            <div className="aspect-square relative group">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <Badge className="absolute top-2 right-2 bg-green-600">{product.category}</Badge>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <Button
                    onClick={() => {
                      addToCart(product)
                      toast({
                        title: "Added to Cart",
                        description: `${product.name} has been added to your cart.`,
                      })
                    }}
                    className="w-full bg-white text-black hover:bg-white/90"
                    disabled={cart.some((item) => item.id === product.id && item.quantity > 0)}
                  >
                    {cart.some((item) => item.id === product.id && item.quantity > 0) ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription className="text-green-600 font-medium">${product.price}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  <ShoppingBag className="h-4 w-4 text-green-500" />
                  <Progress
                    value={product.rating * 20}
                    className="h-1.5 w-16 ml-1"
                    data-indicator-class="bg-green-500"
                  />
                </div>
                <span className="text-xs font-medium">{product.rating}/5</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{product.store}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No products found matching your criteria</p>
          <Button
            variant="link"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Order History Section */}
      {orders.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Your Order History</h2>
          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Active Orders</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-4">
              <div className="space-y-4">
                {orders
                  .filter((order) => order.status !== "delivered")
                  .map((order) => (
                    <Card key={order.id} className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Order #{order.id}</CardTitle>
                        <CardDescription>{order.date}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {order.products.map((product) => (
                            <div key={product.id} className="flex items-center gap-4">
                              <div className="relative h-12 w-12 rounded overflow-hidden flex-shrink-0">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="text-sm text-muted-foreground">Quantity: {product.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total: ${order.total.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">
                            Status: <span className="font-medium">{order.status}</span>
                          </p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm" className="hover:border-green-500 transition-colors">
                            Track Order
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                {orders.filter((order) => order.status !== "delivered").length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No active orders</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-4">
              <div className="space-y-4">
                {orders
                  .filter((order) => order.status === "delivered")
                  .map((order) => (
                    <Card key={order.id} className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Order #{order.id}</CardTitle>
                        <CardDescription>{order.date}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {order.products.map((product) => (
                            <div key={product.id} className="flex items-center gap-4">
                              <div className="relative h-12 w-12 rounded overflow-hidden flex-shrink-0">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="text-sm text-muted-foreground">Quantity: {product.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total: ${order.total.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">
                            Status: <span className="font-medium">{order.status}</span>
                          </p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm" className="hover:border-green-500 transition-colors">
                            View Details
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                {orders.filter((order) => order.status === "delivered").length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No completed orders yet</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="all" className="mt-4">
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="border-slate-200">
                    <CardHeader>
                      <CardTitle>Order #{order.id}</CardTitle>
                      <CardDescription>{order.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {order.products.map((product) => (
                          <div key={product.id} className="flex items-center gap-4">
                            <div className="relative h-12 w-12 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">Quantity: {product.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total: ${order.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          Status: <span className="font-medium">{order.status}</span>
                        </p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm" className="hover:border-green-500 transition-colors">
                          {order.status !== "delivered" ? "Track Order" : "View Details"}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Sell Dialog */}
      <Dialog open={showSellDialog} onOpenChange={setShowSellDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sell on Revive Marketplace</DialogTitle>
            <DialogDescription>List your raw recyclable materials or upcycled products for sale</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Tabs defaultValue="materials">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="materials"
                  className="data-[state=active]:border-green-500 data-[state=active]:border-b-2 hover:border-green-300 hover:border-b-2 transition-colors"
                >
                  Raw Materials
                </TabsTrigger>
                <TabsTrigger
                  value="products"
                  className="data-[state=active]:border-green-500 data-[state=active]:border-b-2 hover:border-green-300 hover:border-b-2 transition-colors"
                >
                  Recycled Products
                </TabsTrigger>
              </TabsList>

              <TabsContent value="materials" className="space-y-4 pt-4">
                <div className="grid grid-cols-6 gap-3 mb-4">
                  <div className="border rounded-lg p-3 hover:border-green-500 cursor-pointer transition-colors">
                    <div className="bg-black/10 dark:bg-black/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-700 dark:text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <h4 className="font-medium">Plastic</h4>
                    <p className="text-xs text-gray-500">$0.20-0.50/kg</p>
                  </div>
                  <div className="border rounded-lg p-3 hover:border-green-500 cursor-pointer transition-colors">
                    <div className="bg-black/10 dark:bg-black/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-700 dark:text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-medium">Paper</h4>
                    <p className="text-xs text-gray-500">$0.10-0.30/kg</p>
                  </div>
                  <div className="border rounded-lg p-3 hover:border-green-500 cursor-pointer transition-colors">
                    <div className="bg-black/10 dark:bg-black/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-700 dark:text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-medium">Glass</h4>
                    <p className="text-xs text-gray-500">$0.05-0.15/kg</p>
                  </div>
                  <div className="border rounded-lg p-3 hover:border-green-500 cursor-pointer transition-colors">
                    <div className="bg-black/10 dark:bg-black/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-700 dark:text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-medium">Metal</h4>
                    <p className="text-xs text-gray-500">$0.30-1.50/kg</p>
                  </div>
                  <div className="border rounded-lg p-3 hover:border-green-500 cursor-pointer transition-colors">
                    <div className="bg-black/10 dark:bg-black/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-700 dark:text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                        />
                      </svg>
                    </div>
                    <h4 className="font-medium">Textile</h4>
                    <p className="text-xs text-gray-500">$0.10-0.40/kg</p>
                  </div>
                  <div className="border rounded-lg p-3 hover:border-green-500 cursor-pointer transition-colors">
                    <div className="bg-black/10 dark:bg-black/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-700 dark:text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-medium">Electronics</h4>
                    <p className="text-xs text-gray-500">$1.00-5.00/kg</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="material-type">Material Type</Label>
                  <Select>
                    <SelectTrigger id="material-type" className="hover:border-green-500 transition-colors">
                      <SelectValue placeholder="Select material type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plastic">Plastic</SelectItem>
                      <SelectItem value="paper">Paper/Cardboard</SelectItem>
                      <SelectItem value="glass">Glass</SelectItem>
                      <SelectItem value="metal">Metal</SelectItem>
                      <SelectItem value="textile">Textile</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="material-quality">Quality</Label>
                  <Select>
                    <SelectTrigger id="material-quality" className="hover:border-green-500 transition-colors">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent - Clean & Sorted</SelectItem>
                      <SelectItem value="good">Good - Minor Cleaning Needed</SelectItem>
                      <SelectItem value="fair">Fair - Requires Processing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="material-price">Price per kg ($)</Label>
                    <Input
                      id="material-price"
                      type="number"
                      min="0.01"
                      step="0.01"
                      className="hover:border-green-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="material-quantity">Available Quantity (kg)</Label>
                    <Input
                      id="material-quantity"
                      type="number"
                      min="0.1"
                      step="0.1"
                      className="hover:border-green-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="material-location">Pickup Location</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="material-location"
                        placeholder="Enter address"
                        className="flex-1 hover:border-green-500 transition-colors"
                      />
                      <Button variant="outline" size="icon" className="hover:border-green-500 transition-colors">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="material-description">Description</Label>
                  <Textarea
                    id="material-description"
                    placeholder="Provide details about your materials"
                    className="hover:border-green-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Photos</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center justify-center h-20 border-2 border-dashed border-gray-300 rounded-md hover:border-green-500 transition-colors">
                      <Button variant="ghost" size="sm" className="hover:border-green-500 transition-colors">
                        <Upload className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="products" className="space-y-4 pt-4">
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div className="border rounded-lg p-3 hover:border-green-500 cursor-pointer transition-colors">
                    <div className="relative h-32 w-full mb-2 rounded overflow-hidden">
                      <Image
                        src="/recycled-plastic-backpack.png"
                        alt="Recycled Backpack"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-medium">Recycled Accessories</h4>
                    <p className="text-xs text-gray-500">Bags, jewelry, etc.</p>
                  </div>
                  <div className="border rounded-lg p-3 hover:border-green-500 cursor-pointer transition-colors">
                    <div className="relative h-32 w-full mb-2 rounded overflow-hidden">
                      <Image src="/upcycled-denim-notebook.png" alt="Upcycled Notebook" fill className="object-cover" />
                    </div>
                    <h4 className="font-medium">Upcycled Stationery</h4>
                    <p className="text-xs text-gray-500">Notebooks, pens, etc.</p>
                  </div>
                  <div className="border rounded-lg p-3 hover:border-green-500 cursor-pointer transition-colors">
                    <div className="relative h-32 w-full mb-2 rounded overflow-hidden">
                      <Image
                        src="/reclaimed-wood-desk-organizer.png"
                        alt="Desk Organizer"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-medium">Home Goods</h4>
                    <p className="text-xs text-gray-500">Organizers, decor, etc.</p>
                  </div>
                  <div className="border rounded-lg p-3 hover:border-green-500 cursor-pointer transition-colors">
                    <div className="relative h-32 w-full mb-2 rounded overflow-hidden">
                      <Image src="/upcycled-glass-terrarium.png" alt="Glass Terrarium" fill className="object-cover" />
                    </div>
                    <h4 className="font-medium">Garden & Plants</h4>
                    <p className="text-xs text-gray-500">Planters, terrariums, etc.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input id="product-name" className="hover:border-green-500 transition-colors" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-category">Category</Label>
                  <Select>
                    <SelectTrigger id="product-category" className="hover:border-green-500 transition-colors">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="stationery">Stationery</SelectItem>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="garden">Garden</SelectItem>
                      <SelectItem value="decor">Decor</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="product-price">Price ($)</Label>
                    <Input
                      id="product-price"
                      type="number"
                      min="0.01"
                      step="0.01"
                      className="hover:border-green-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-quantity">Quantity Available</Label>
                    <Input
                      id="product-quantity"
                      type="number"
                      min="1"
                      step="1"
                      className="hover:border-green-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-materials">Recycled Materials Used</Label>
                  <Input
                    id="product-materials"
                    placeholder="e.g., 80% recycled plastic, 20% natural fibers"
                    className="hover:border-green-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-description">Description</Label>
                  <Textarea
                    id="product-description"
                    placeholder="Describe your product, its features, and sustainability benefits"
                    className="hover:border-green-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Photos</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center justify-center h-20 border-2 border-dashed border-gray-300 rounded-md hover:border-green-500 transition-colors">
                      <Button variant="ghost" size="sm" className="hover:border-green-500 transition-colors">
                        <Upload className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="product-certification" />
                    <Label htmlFor="product-certification" className="text-sm">
                      I certify this product is made from at least 50% recycled materials
                    </Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSellDialog(false)}
              className="hover:border-green-500 transition-colors"
            >
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">List for Sale</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )

  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      try {
        router.push("/dashboard")
        // Fallback in case router.push fails
        setTimeout(() => {
          if (window.location.pathname !== "/dashboard") {
            window.location.href = "/dashboard"
          }
        }, 500)
      } catch (error) {
        console.error("Navigation error:", error)
        window.location.href = "/dashboard"
      }
    }
  }

  return (
    <div className="space-y-6 pt-4">
      <Tabs defaultValue="scan" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="scan"
            className="data-[state=active]:border-green-500 data-[state=active]:border-b-2 hover:border-green-300 hover:border-b-2 transition-colors"
          >
            <Camera className="h-4 w-4 mr-2" />
            Scan Items
          </TabsTrigger>
          <TabsTrigger
            value="revive"
            className="data-[state=active]:border-green-500 data-[state=active]:border-b-2 hover:border-green-300 hover:border-b-2 transition-colors"
          >
            <Leaf className="h-4 w-4 mr-2" />
            REVIVE Store
          </TabsTrigger>
        </TabsList>
        <TabsContent value="scan" className="mt-6">
          {renderScanTab()}
        </TabsContent>
        <TabsContent value="revive" className="mt-6">
          {renderReviveTab()}
        </TabsContent>
      </Tabs>
    </div>
  )
}

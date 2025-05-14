"use client"

import { useState } from "react"
import { useStore } from "@/lib/store-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ShoppingCart,
  Search,
  X,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
  Check,
  Package,
  Upload,
  MapPin,
  Clock,
  Calendar,
  FileText,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

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
  {
    id: "garden-lamp-1",
    name: "Solar Garden Lamp",
    price: 34.99,
    image: "/solar-powered-garden-lamp.png",
    store: "EcoTech",
    category: "garden",
    recycled: false,
    rating: 4.7,
  },
  {
    id: "doormat-1",
    name: "Recycled Tire Doormat",
    price: 19.99,
    image: "/recycled-tire-doormat.png",
    store: "EcoHome",
    category: "home",
    recycled: true,
    rating: 4.5,
  },
  {
    id: "terrarium-1",
    name: "Upcycled Glass Terrarium",
    price: 27.99,
    image: "/upcycled-glass-terrarium.png",
    store: "EcoHome",
    category: "garden",
    recycled: true,
    rating: 4.9,
  },
  {
    id: "paper-art-1",
    name: "Recycled Paper Wall Art",
    price: 45.99,
    image: "/recycled-paper-art.png",
    store: "EcoHome",
    category: "home",
    recycled: true,
    rating: 4.6,
  },
  {
    id: "sunglasses-1",
    name: "Ocean Plastic Sunglasses",
    price: 79.99,
    image: "/ocean-plastic-sunglasses.png",
    store: "EcoFashion",
    category: "accessories",
    recycled: true,
    rating: 4.8,
  },
  {
    id: "desk-lamp-1",
    name: "LED Desk Lamp",
    price: 32.99,
    image: "/led-desk-lamp.png",
    store: "EcoTech",
    category: "home",
    recycled: false,
    rating: 4.7,
  },
  {
    id: "lunch-box-1",
    name: "Reusable Lunch Box",
    price: 21.99,
    image: "/reusable-lunch-box.png",
    store: "EcoLife",
    category: "kitchen",
    recycled: false,
    rating: 4.9,
  },
  {
    id: "phone-case-1",
    name: "Biodegradable Phone Case",
    price: 29.99,
    image: "/biodegradable-phone-case.png",
    store: "EcoTech",
    category: "electronics",
    recycled: false,
    rating: 4.6,
  },
]

// Raw materials buyers data
const rawMaterialBuyers = [
  {
    id: 1,
    name: "EcoPlastics Manufacturing",
    type: "Company",
    materials: ["Plastic", "PET Bottles", "HDPE Containers"],
    offerPrice: { Plastic: "$0.45/kg", "PET Bottles": "$0.60/kg", "HDPE Containers": "$0.55/kg" },
    rating: 4.8,
    reviews: 342,
    location: "Industrial Zone, 5 miles away",
    image: "/generic-company-logo.png",
    verified: true,
    description: "Large-scale manufacturer of recycled plastic products. We buy clean, sorted plastic in bulk.",
    minimumQuantity: "10kg",
    paymentMethods: ["Bank Transfer", "Check", "Store Credit"],
    pickupAvailable: true,
  },
  {
    id: 2,
    name: "GreenBottle Co.",
    type: "Company",
    materials: ["PET Bottles", "Glass Bottles"],
    offerPrice: { "PET Bottles": "$0.65/kg", "Glass Bottles": "$0.30/kg" },
    rating: 4.6,
    reviews: 187,
    location: "Downtown, 2 miles away",
    image: "/bottle-company-logo.png",
    verified: true,
    description:
      "We specialize in recycling bottles for our beverage packaging. Looking for clean, label-free bottles.",
    minimumQuantity: "5kg",
    paymentMethods: ["Cash", "Bank Transfer", "PayPal"],
    pickupAvailable: true,
  },
  {
    id: 3,
    name: "Sarah's Craft Supply",
    type: "Individual",
    materials: ["Plastic", "Cardboard", "Fabric Scraps"],
    offerPrice: { Plastic: "$0.40/kg", Cardboard: "$0.25/kg", "Fabric Scraps": "$2.00/kg" },
    rating: 4.9,
    reviews: 56,
    location: "Residential Area, 3 miles away",
    image: "/craft-store-logo.png",
    verified: false,
    description:
      "Small craft business looking for materials for upcycling projects. Interested in unique and colorful items.",
    minimumQuantity: "1kg",
    paymentMethods: ["Cash", "PayPal"],
    pickupAvailable: false,
  },
  {
    id: 4,
    name: "City Recycling Center",
    type: "Government",
    materials: ["Plastic", "Paper", "Metal", "Glass", "Electronics"],
    offerPrice: { Plastic: "$0.35/kg", Paper: "$0.20/kg", Metal: "$1.20/kg", Glass: "$0.25/kg", Electronics: "Varies" },
    rating: 4.2,
    reviews: 412,
    location: "City Center, 4 miles away",
    image: "/recycling-center-logo.png",
    verified: true,
    description:
      "Official city recycling center. We accept all types of recyclable materials. Special rates for bulk quantities.",
    minimumQuantity: "No minimum",
    paymentMethods: ["Check", "Bank Transfer"],
    pickupAvailable: true,
  },
  {
    id: 5,
    name: "Michael's Upcycling Workshop",
    type: "Individual",
    materials: ["Plastic Bottles", "Cardboard", "Metal Cans"],
    offerPrice: { "Plastic Bottles": "$0.50/kg", Cardboard: "$0.30/kg", "Metal Cans": "$0.90/kg" },
    rating: 4.7,
    reviews: 83,
    location: "Arts District, 6 miles away",
    image: "/workshop-logo.png",
    verified: false,
    description:
      "Artist looking for materials for sculptures and installations. Interested in unique shapes and colors.",
    minimumQuantity: "2kg",
    paymentMethods: ["Cash", "PayPal", "Venmo"],
    pickupAvailable: false,
  },
]

// Recycled products buyers data
const recycledProductBuyers = [
  {
    id: 1,
    name: "EcoRetail Store",
    type: "Company",
    products: ["Upcycled Crafts", "Recycled Jewelry", "Eco-Friendly Home Decor"],
    offerPrice: {
      "Upcycled Crafts": "Up to $25",
      "Recycled Jewelry": "Up to $40",
      "Eco-Friendly Home Decor": "Up to $60",
    },
    rating: 4.7,
    reviews: 215,
    location: "Shopping Mall, 3 miles away",
    image: "/retail-store-logo.png",
    verified: true,
    description:
      "Retail store specializing in eco-friendly products. We're looking for unique handcrafted items made from recycled materials.",
    commissionRate: "25%",
    paymentMethods: ["Bank Transfer", "Check"],
    consignmentAvailable: true,
  },
  {
    id: 2,
    name: "Green Gifts Online",
    type: "Company",
    products: ["Paper Crafts", "Upcycled Accessories", "Recycled Art"],
    offerPrice: { "Paper Crafts": "Up to $15", "Upcycled Accessories": "Up to $30", "Recycled Art": "Up to $100" },
    rating: 4.5,
    reviews: 178,
    location: "Online Only",
    image: "/online-store-logo.png",
    verified: true,
    description:
      "E-commerce platform for sustainable gifts. We're always looking for creative recycled products to add to our catalog.",
    commissionRate: "20%",
    paymentMethods: ["PayPal", "Bank Transfer"],
    consignmentAvailable: false,
  },
  {
    id: 3,
    name: "Local Artisan Market",
    type: "Marketplace",
    products: ["All Handcrafted Items", "Recycled Art", "Upcycled Furniture"],
    offerPrice: {
      "All Handcrafted Items": "Market Price",
      "Recycled Art": "Market Price",
      "Upcycled Furniture": "Market Price",
    },
    rating: 4.9,
    reviews: 320,
    location: "Downtown, 2 miles away",
    image: "/artisan-market-logo.png",
    verified: true,
    description:
      "Weekly market for local artisans. Rent a booth to sell your recycled creations directly to customers.",
    commissionRate: "10% booth fee",
    paymentMethods: ["Cash", "Credit Card"],
    consignmentAvailable: false,
  },
  {
    id: 4,
    name: "Emma's Eco Boutique",
    type: "Individual",
    products: ["Recycled Jewelry", "Upcycled Clothing", "Eco-Friendly Accessories"],
    offerPrice: {
      "Recycled Jewelry": "Up to $35",
      "Upcycled Clothing": "Up to $50",
      "Eco-Friendly Accessories": "Up to $25",
    },
    rating: 4.8,
    reviews: 92,
    location: "Fashion District, 5 miles away",
    image: "/elegant-boutique-logo.png",
    verified: false,
    description: "Small boutique specializing in sustainable fashion. Looking for unique pieces with a story.",
    commissionRate: "30%",
    paymentMethods: ["Cash", "PayPal"],
    consignmentAvailable: true,
  },
  {
    id: 5,
    name: "EcoSchool Supplies",
    type: "Company",
    products: ["Paper Crafts", "Recycled Stationery", "Educational Toys"],
    offerPrice: { "Paper Crafts": "Up to $10", "Recycled Stationery": "Up to $15", "Educational Toys": "Up to $30" },
    rating: 4.4,
    reviews: 145,
    location: "Education District, 4 miles away",
    image: "/school-supplies-logo.png",
    verified: true,
    description:
      "We supply eco-friendly school materials. Looking for creative educational items made from recycled materials.",
    commissionRate: "15%",
    paymentMethods: ["Check", "Bank Transfer"],
    consignmentAvailable: false,
  },
]

// OrderCard Component
const OrderCard = ({ order }) => {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle>Order #{order.id}</CardTitle>
        <CardDescription>{order.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {order.products.map((product) => (
            <div key={product.id} className="flex items-center gap-4">
              <div className="relative h-12 w-12 rounded overflow-hidden flex-shrink-0">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
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
          <Button variant="outline" size="sm">
            Track Order
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function ReviveStorePage() {
  const router = useRouter()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [trackingId, setTrackingId] = useState("")
  const [trackingResult, setTrackingResult] = useState(null)
  const [activeTab, setActiveTab] = useState("buy")
  const { toast } = useToast()

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

  // Sell Now interface state
  const [showSellNowModal, setShowSellNowModal] = useState(false)
  const [sellType, setSellType] = useState("")
  const [sellMaterial, setSellMaterial] = useState("")
  const [sellProduct, setSellProduct] = useState("")
  const [sellQuantity, setSellQuantity] = useState([5])
  const [sellCondition, setSellCondition] = useState("good")
  const [sellPrice, setSellPrice] = useState("")
  const [sellDescription, setSellDescription] = useState("")
  const [sellImages, setSellImages] = useState([])
  const [listInMarketplace, setListInMarketplace] = useState(true)
  const [selectedBuyer, setSelectedBuyer] = useState(null)
  const [sellStep, setSellStep] = useState(1)

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

  const handleTrackOrder = (e) => {
    e.preventDefault()
    // Simulate order tracking
    if (trackingId) {
      setTrackingResult({
        id: trackingId,
        status: "In Transit",
        estimatedDelivery: "April 25, 2023",
        currentLocation: "Distribution Center",
        history: [
          { date: "April 15, 2023", status: "Order Placed" },
          { date: "April 16, 2023", status: "Processing" },
          { date: "April 18, 2023", status: "Shipped" },
        ],
      })
    }
  }

  const openSellNowModal = () => {
    setShowSellNowModal(true)
    setSellStep(1)
    setSellType("")
    setSellMaterial("")
    setSellProduct("")
    setSellQuantity([5])
    setSellCondition("good")
    setSellPrice("")
    setSellDescription("")
    setSellImages([])
    setListInMarketplace(true)
    setSelectedBuyer(null)
  }

  const closeSellNowModal = () => {
    setShowSellNowModal(false)
  }

  const handleSellTypeSelect = (type) => {
    setSellType(type)
    setSellStep(2)
  }

  const handleMaterialSelect = (material) => {
    setSellMaterial(material)
    setSellStep(3)
  }

  const handleProductSelect = (product) => {
    setSellProduct(product)
    setSellStep(3)
  }

  const handleBuyerSelect = (buyer) => {
    setSelectedBuyer(buyer)
  }

  const getRelevantBuyers = () => {
    if (sellType === "raw") {
      return rawMaterialBuyers.filter((buyer) => !sellMaterial || buyer.materials.includes(sellMaterial))
    } else if (sellType === "recycled") {
      return recycledProductBuyers.filter((buyer) => !sellProduct || buyer.products.includes(sellProduct))
    }
    return []
  }

  const getEstimatedPrice = () => {
    if (sellType === "raw" && sellMaterial) {
      const relevantBuyers = getRelevantBuyers()
      if (relevantBuyers.length > 0) {
        const prices = relevantBuyers
          .filter((buyer) => buyer.offerPrice[sellMaterial])
          .map((buyer) => {
            const price = buyer.offerPrice[sellMaterial]
            if (price.includes("/kg")) {
              const ratePerKg = Number.parseFloat(price.replace(/[^\d.]/g, ""))
              return ratePerKg * sellQuantity[0]
            }
            return Number.parseFloat(price.replace(/[^\d.]/g, ""))
          })

        if (prices.length > 0) {
          const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length
          return `$${avgPrice.toFixed(2)}`
        }
      }
      return "Varies by buyer"
    } else if (sellType === "recycled" && sellProduct) {
      const relevantBuyers = getRelevantBuyers()
      if (relevantBuyers.length > 0) {
        const prices = relevantBuyers
          .filter((buyer) => buyer.offerPrice[sellProduct])
          .map((buyer) => {
            const price = buyer.offerPrice[sellProduct]
            if (price.includes("Up to")) {
              return Number.parseFloat(price.replace(/[^\d.]/g, ""))
            }
            return 0
          })

        if (prices.length > 0) {
          const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length
          return `Up to $${avgPrice.toFixed(2)}`
        }
      }
      return "Varies by buyer"
    }
    return "Set your price"
  }

  const handleSubmitListing = () => {
    // Here you would handle the actual submission
    // For now, we'll just close the modal and show a success message
    closeSellNowModal()
    toast({
      title: "Listing Submitted",
      description: "Your listing has been submitted successfully!",
    })
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">REVIVE Store</h1>
        </div>
      </div>

      <div className="space-y-6">
        {/* Enhanced Cart Summary */}
        {cart.length > 0 && (
          <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 dark:border-emerald-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row items-stretch">
                <div className="bg-emerald-100 dark:bg-emerald-900 p-4 sm:p-6 flex items-center justify-center sm:w-1/4">
                  <div className="text-center">
                    <ShoppingCart className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                    <h3 className="font-semibold text-lg text-emerald-700 dark:text-emerald-300">Your Cart</h3>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      {cart.reduce((total, item) => total + item.quantity, 0)} items
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-6 flex-grow flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-muted-foreground">Subtotal:</span>
                      <span className="font-bold text-amber-500">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-muted-foreground">Shipping:</span>
                      <span className="font-medium">$5.00</span>
                    </div>
                    <div className="flex items-center gap-2 pt-1 border-t">
                      <span className="text-sm font-medium">Total:</span>
                      <span className="font-bold text-lg text-amber-500">${(cartTotal + 5).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:border-emerald-700 dark:hover:bg-emerald-900"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          View Cart
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5 text-emerald-500" />
                            Your Cart
                          </DialogTitle>
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
                                  className="h-6 w-6"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-6 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6"
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
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Subtotal:</span>
                              <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Shipping:</span>
                              <span>$5.00</span>
                            </div>
                            <div className="flex items-center justify-between font-semibold pt-2 border-t">
                              <span>Total:</span>
                              <span className="text-amber-500">${(cartTotal + 5).toFixed(2)}</span>
                            </div>
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
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold">REVIVE</h3>
            <p className="text-sm text-muted-foreground">Giving waste a new life through recycling and upcycling</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setActiveTab("orders")}
              className="border-amber-200 hover:border-amber-300 hover:bg-amber-50 dark:border-amber-800 dark:hover:border-amber-700 dark:hover:bg-amber-900"
            >
              <Clock className="h-4 w-4 mr-2" />
              Order History
            </Button>
            <Button
              variant="outline"
              onClick={openSellNowModal}
              className="border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:border-green-700 dark:hover:bg-green-900"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Sell Now
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:border-emerald-700 dark:hover:bg-emerald-900"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({cart.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-emerald-500" />
                    Your Cart
                  </DialogTitle>
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
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Shipping:</span>
                      <span>$5.00</span>
                    </div>
                    <div className="flex items-center justify-between font-semibold pt-2 border-t">
                      <span>Total:</span>
                      <span className="text-amber-500">${(cartTotal + 5).toFixed(2)}</span>
                    </div>
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

        <Tabs defaultValue="buy" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <TabsTrigger
              value="buy"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 rounded"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Shop Products
            </TabsTrigger>
            <TabsTrigger
              value="track"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 rounded"
            >
              <Package className="h-4 w-4 mr-2" />
              Track Order
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 rounded"
            >
              <Clock className="h-4 w-4 mr-2" />
              Order History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4 pt-4">
            <div className="flex items-center space-x-2 mb-4">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {reviveProducts.map((product) => (
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
          </TabsContent>
          <TabsContent value="track" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Track Your Order</CardTitle>
                <CardDescription>Enter your order ID to check the status</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTrackOrder} className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter tracking ID"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit">Track</Button>
                  </div>
                </form>

                {trackingResult && (
                  <div className="mt-4">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Order #{trackingResult.id}</h4>
                        <Badge
                          variant={
                            trackingResult.status === "Processing"
                              ? "default"
                              : trackingResult.status === "Shipped"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {trackingResult.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Estimated Delivery:</span>
                          <span className="font-medium">{trackingResult.estimatedDelivery}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current Location:</span>
                          <span>{trackingResult.currentLocation}</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative mb-6">
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted transform -translate-y-1/2"></div>
                      <div className="relative flex justify-between">
                        {trackingResult.history.map((event, index) => {
                          const isCompleted =
                            index <= trackingResult.history.findIndex((e) => e.status === trackingResult.status)
                          return (
                            <div key={index} className="flex flex-col items-center">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                                  isCompleted ? "bg-green-500" : "bg-muted"
                                }`}
                              >
                                {isCompleted && <Check className="h-3 w-3 text-white" />}
                              </div>
                              <span className="text-xs mt-1 font-medium">{event.status}</span>
                              <span className="text-xs text-muted-foreground">{event.date}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="orders" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  Your Order History
                </CardTitle>
                <CardDescription>View and manage your past orders</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="mb-6">
                  <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    <TabsTrigger
                      value="all"
                      className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 rounded"
                    >
                      All Orders
                    </TabsTrigger>
                    <TabsTrigger
                      value="processing"
                      className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 rounded"
                    >
                      Processing
                    </TabsTrigger>
                    <TabsTrigger
                      value="shipped"
                      className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 rounded"
                    >
                      Shipped
                    </TabsTrigger>
                    <TabsTrigger
                      value="delivered"
                      className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 rounded"
                    >
                      Delivered
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-4">
                    <div className="space-y-4">
                      {orders.length > 0 ? (
                        orders.map((order) => (
                          <Card
                            key={order.id}
                            className="overflow-hidden border-slate-200 hover:border-amber-300 transition-colors"
                          >
                            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 pb-2">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-base">Order #{order.id}</CardTitle>
                                <Badge
                                  variant={
                                    order.status === "processing"
                                      ? "outline"
                                      : order.status === "shipped"
                                        ? "secondary"
                                        : "default"
                                  }
                                  className={
                                    order.status === "processing"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-300 dark:border-blue-700"
                                      : order.status === "shipped"
                                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  }
                                >
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                              </div>
                              <CardDescription className="flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                {order.date}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-4">
                              <div className="space-y-3">
                                {order.products.slice(0, 2).map((product) => (
                                  <div key={product.id} className="flex items-center gap-3">
                                    <div className="relative h-10 w-10 rounded overflow-hidden flex-shrink-0">
                                      <Image
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="flex-grow">
                                      <p className="text-sm font-medium">{product.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        Qty: {product.quantity} × ${product.price.toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                                {order.products.length > 2 && (
                                  <p className="text-xs text-muted-foreground italic">
                                    + {order.products.length - 2} more items
                                  </p>
                                )}
                              </div>

                              <div className="mt-4 pt-3 border-t flex justify-between items-center">
                                <div>
                                  <p className="text-xs text-muted-foreground">Total Amount:</p>
                                  <p className="font-semibold text-amber-500">${order.total.toFixed(2)}</p>
                                </div>
                                <div className="flex gap-2">
                                  {order.trackingNumber && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-xs h-8 border-slate-200 hover:border-slate-300"
                                      onClick={() => {
                                        setTrackingId(order.trackingNumber)
                                        setActiveTab("track")
                                        setTimeout(() => handleTrackOrder(new Event("click") as any), 100)
                                      }}
                                    >
                                      <Package className="h-3 w-3 mr-1" />
                                      Track
                                    </Button>
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-8 border-amber-200 hover:border-amber-300 hover:bg-amber-50 dark:border-amber-800 dark:hover:border-amber-700 dark:hover:bg-amber-900"
                                  >
                                    <FileText className="h-3 w-3 mr-1" />
                                    Details
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <ShoppingBag className="h-12 w-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
                          <h3 className="text-lg font-medium mb-1">No orders yet</h3>
                          <p className="text-sm text-muted-foreground mb-4">Start shopping to see your orders here</p>
                          <Button onClick={() => setActiveTab("buy")} className="bg-emerald-600 hover:bg-emerald-700">
                            Browse Products
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="processing" className="mt-4">
                    <div className="space-y-4">
                      {orders.filter((order) => order.status === "processing").length > 0 ? (
                        orders
                          .filter((order) => order.status === "processing")
                          .map((order) => (
                            <Card
                              key={order.id}
                              className="overflow-hidden border-slate-200 hover:border-amber-300 transition-colors"
                            >
                              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 pb-2">
                                <div className="flex justify-between items-center">
                                  <CardTitle className="text-base">Order #{order.id}</CardTitle>
                                  <Badge
                                    variant="outline"
                                    className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-300 dark:border-blue-700"
                                  >
                                    Processing
                                  </Badge>
                                </div>
                                <CardDescription className="flex items-center gap-2">
                                  <Calendar className="h-3 w-3" />
                                  {order.date}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="pt-4">
                                <div className="space-y-3">
                                  {order.products.slice(0, 2).map((product) => (
                                    <div key={product.id} className="flex items-center gap-3">
                                      <div className="relative h-10 w-10 rounded overflow-hidden flex-shrink-0">
                                        <Image
                                          src={product.image || "/placeholder.svg"}
                                          alt={product.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div className="flex-grow">
                                        <p className="text-sm font-medium">{product.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                          Qty: {product.quantity} × ${product.price.toFixed(2)}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                  {order.products.length > 2 && (
                                    <p className="text-xs text-muted-foreground italic">
                                      + {order.products.length - 2} more items
                                    </p>
                                  )}
                                </div>

                                <div className="mt-4 pt-3 border-t flex justify-between items-center">
                                  <div>
                                    <p className="text-xs text-muted-foreground">Total Amount:</p>
                                    <p className="font-semibold text-amber-500">${order.total.toFixed(2)}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-xs h-8 border-amber-200 hover:border-amber-300 hover:bg-amber-50 dark:border-amber-800 dark:hover:border-amber-700 dark:hover:bg-amber-900"
                                    >
                                      <FileText className="h-3 w-3 mr-1" />
                                      Details
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
                          <p>No processing orders</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="shipped" className="mt-4">
                    <div className="space-y-4">
                      {orders.filter((order) => order.status === "shipped").length > 0 ? (
                        orders
                          .filter((order) => order.status === "shipped")
                          .map((order) => (
                            <Card
                              key={order.id}
                              className="overflow-hidden border-slate-200 hover:border-amber-300 transition-colors"
                            >
                              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 pb-2">
                                <div className="flex justify-between items-center">
                                  <CardTitle className="text-base">Order #{order.id}</CardTitle>
                                  <Badge
                                    variant="secondary"
                                    className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                  >
                                    Shipped
                                  </Badge>
                                </div>
                                <CardDescription className="flex items-center gap-2">
                                  <Calendar className="h-3 w-3" />
                                  {order.date}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="pt-4">
                                <div className="space-y-3">
                                  {order.products.slice(0, 2).map((product) => (
                                    <div key={product.id} className="flex items-center gap-3">
                                      <div className="relative h-10 w-10 rounded overflow-hidden flex-shrink-0">
                                        <Image
                                          src={product.image || "/placeholder.svg"}
                                          alt={product.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div className="flex-grow">
                                        <p className="text-sm font-medium">{product.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                          Qty: {product.quantity} × ${product.price.toFixed(2)}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                  {order.products.length > 2 && (
                                    <p className="text-xs text-muted-foreground italic">
                                      + {order.products.length - 2} more items
                                    </p>
                                  )}
                                </div>

                                <div className="mt-4 pt-3 border-t flex justify-between items-center">
                                  <div>
                                    <p className="text-xs text-muted-foreground">Total Amount:</p>
                                    <p className="font-semibold text-amber-500">${order.total.toFixed(2)}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    {order.trackingNumber && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-xs h-8 border-slate-200 hover:border-slate-300"
                                        onClick={() => {
                                          setTrackingId(order.trackingNumber)
                                          setActiveTab("track")
                                          setTimeout(() => handleTrackOrder(new Event("click") as any), 100)
                                        }}
                                      >
                                        <Package className="h-3 w-3 mr-1" />
                                        Track
                                      </Button>
                                    )}
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-xs h-8 border-amber-200 hover:border-amber-300 hover:bg-amber-50 dark:border-amber-800 dark:hover:border-amber-700 dark:hover:bg-amber-900"
                                    >
                                      <FileText className="h-3 w-3 mr-1" />
                                      Details
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
                          <p>No shipped orders</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="delivered" className="mt-4">
                    <div className="space-y-4">
                      {orders.filter((order) => order.status === "delivered").length > 0 ? (
                        orders
                          .filter((order) => order.status === "delivered")
                          .map((order) => (
                            <Card
                              key={order.id}
                              className="overflow-hidden border-slate-200 hover:border-amber-300 transition-colors"
                            >
                              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 pb-2">
                                <div className="flex justify-between items-center">
                                  <CardTitle className="text-base">Order #{order.id}</CardTitle>
                                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                    Delivered
                                  </Badge>
                                </div>
                                <CardDescription className="flex items-center gap-2">
                                  <Calendar className="h-3 w-3" />
                                  {order.date}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="pt-4">
                                <div className="space-y-3">
                                  {order.products.slice(0, 2).map((product) => (
                                    <div key={product.id} className="flex items-center gap-3">
                                      <div className="relative h-10 w-10 rounded overflow-hidden flex-shrink-0">
                                        <Image
                                          src={product.image || "/placeholder.svg"}
                                          alt={product.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div className="flex-grow">
                                        <p className="text-sm font-medium">{product.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                          Qty: {product.quantity} × ${product.price.toFixed(2)}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                  {order.products.length > 2 && (
                                    <p className="text-xs text-muted-foreground italic">
                                      + {order.products.length - 2} more items
                                    </p>
                                  )}
                                </div>

                                <div className="mt-4 pt-3 border-t flex justify-between items-center">
                                  <div>
                                    <p className="text-xs text-muted-foreground">Total Amount:</p>
                                    <p className="font-semibold text-amber-500">${order.total.toFixed(2)}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-xs h-8 border-amber-200 hover:border-amber-300 hover:bg-amber-50 dark:border-amber-800 dark:hover:border-amber-700 dark:hover:bg-amber-900"
                                    >
                                      <FileText className="h-3 w-3 mr-1" />
                                      Details
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
                          <p>No delivered orders</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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
                      <OrderCard key={order.id} order={order} />
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
                      <OrderCard key={order.id} order={order} />
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
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      <Dialog open={showSellNowModal} onOpenChange={setShowSellNowModal}>
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
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-600"
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
                    <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-amber-600"
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
                    <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-600"
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
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
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
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-purple-600"
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
                    <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-red-600"
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
              onClick={() => setShowSellNowModal(false)}
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
}

"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Filter, Search, Leaf, ShoppingCart, Star, MapPin, X, Plus, Minus } from "lucide-react"
import { useStore, type Product, type Order } from "@/lib/store-context"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Product interface
interface FarmProduct extends Product {
  farmer: string
  location: string
  unit: string
  category: string
  organic: boolean
  stock: number
}

// Farm interface
interface Farm {
  id: string
  name: string
  farmer: string
  location: string
  description: string
  image: string
  rating: number
  products: string[]
  certifications: string[]
  founded: string
  farmSize: string
}

// Sample produce items
const produceItems: FarmProduct[] = [
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
const farmData: Farm[] = [
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

// Function to determine product color based on name
const getProductColor = (productName: string): string => {
  const productNameLower = productName.toLowerCase()

  if (productNameLower.includes("tomato")) return "text-red-600"
  if (productNameLower.includes("spinach") || productNameLower.includes("kale")) return "text-green-700"
  if (productNameLower.includes("apple")) return "text-red-500"
  if (productNameLower.includes("egg")) return "text-amber-600"
  if (productNameLower.includes("beef") || productNameLower.includes("meat")) return "text-rose-700"
  if (productNameLower.includes("carrot")) return "text-orange-500"
  if (productNameLower.includes("strawberr")) return "text-pink-600"
  if (productNameLower.includes("cheese") || productNameLower.includes("milk") || productNameLower.includes("yogurt"))
    return "text-yellow-600"
  if (productNameLower.includes("herb")) return "text-emerald-600"
  if (productNameLower.includes("pear")) return "text-lime-600"
  if (productNameLower.includes("peach")) return "text-orange-400"
  if (productNameLower.includes("cider")) return "text-amber-700"
  if (productNameLower.includes("chicken")) return "text-amber-800"
  if (productNameLower.includes("chard")) return "text-purple-600"
  if (productNameLower.includes("garlic")) return "text-gray-600"

  // Default color for other products
  return "text-green-600"
}

export default function FarmersMarketPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [maxDistance, setMaxDistance] = useState(50)
  const [selectedProduct, setSelectedProduct] = useState<FarmProduct | null>(null)
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null)
  const [showOrderHistory, setShowOrderHistory] = useState(false)
  const { toast } = useToast()

  // Get store context
  const { cart, addToCart, removeFromCart, updateQuantity, orders, addOrder, cartTotal, wishlist, toggleWishlist } =
    useStore()

  // Filter products based on search and category
  const filteredProducts = produceItems.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

    // Extract distance as a number from the location string
    const distanceMatch = product.location.match(/\d+/)
    const distance = distanceMatch ? Number.parseInt(distanceMatch[0], 10) : 0
    const matchesDistance = distance <= maxDistance

    return matchesSearch && matchesCategory && matchesDistance
  })

  // Checkout function
  const handleCheckout = () => {
    if (cart.length === 0) return

    // Create new order
    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString(),
      products: [...cart],
      total: cartTotal + 5, // Including delivery fee
      status: "processing",
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      trackingNumber: `TRK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    }

    // Add to order history
    addOrder(newOrder)

    toast({
      title: "Order Placed Successfully",
      description: "Your order has been placed and will be delivered soon!",
    })

    // Clear cart
    cart.forEach((item) => removeFromCart(item.id))
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Farmers Market</h1>
        </div>
        <div className="flex gap-2 ml-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">Sell Now</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>List Your Farm Products</DialogTitle>
                <DialogDescription>Fill out this form to list your farm products on our marketplace.</DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <ScrollArea className="max-h-[60vh]">
                  <div className="space-y-4 p-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="farmName">Farm Name</Label>
                        <Input id="farmName" placeholder="Your farm name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farmerName">Farmer Name</Label>
                        <Input id="farmerName" placeholder="Your name" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="farmLocation">Farm Location</Label>
                      <Input id="farmLocation" placeholder="Address or location" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="farmDescription">Farm Description</Label>
                      <Textarea id="farmDescription" placeholder="Tell us about your farm and practices" />
                    </div>

                    <div className="space-y-2">
                      <Label>Certifications</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="organic" />
                          <Label htmlFor="organic" className="font-normal">
                            Certified Organic
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="nonGMO" />
                          <Label htmlFor="nonGMO" className="font-normal">
                            Non-GMO
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="sustainable" />
                          <Label htmlFor="sustainable" className="font-normal">
                            Sustainable Farming
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="grassFed" />
                          <Label htmlFor="grassFed" className="font-normal">
                            Grass-Fed
                          </Label>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />
                    <h3 className="text-lg font-medium">Add Products</h3>

                    <div className="space-y-4 border p-4 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="productName">Product Name</Label>
                          <Input id="productName" placeholder="e.g., Organic Tomatoes" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="vegetables">Vegetables</SelectItem>
                              <SelectItem value="fruits">Fruits</SelectItem>
                              <SelectItem value="dairy">Dairy & Eggs</SelectItem>
                              <SelectItem value="meat">Meat</SelectItem>
                              <SelectItem value="herbs">Herbs</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price ($)</Label>
                          <Input id="price" type="number" step="0.01" placeholder="0.00" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="unit">Unit</Label>
                          <Input id="unit" placeholder="e.g., lb, bunch, dozen" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="stock">Available Stock</Label>
                          <Input id="stock" type="number" placeholder="0" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="productDescription">Product Description</Label>
                        <Textarea id="productDescription" placeholder="Describe your product" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="productImage">Product Image</Label>
                        <Input id="productImage" type="file" />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="isOrganic" />
                        <Label htmlFor="isOrganic" className="font-normal">
                          This product is organic
                        </Label>
                      </div>
                    </div>

                    <Button type="button" variant="outline" className="w-full">
                      + Add Another Product
                    </Button>
                  </div>
                </ScrollArea>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">List Products</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={() => setShowOrderHistory(true)}>
            Order History
          </Button>
        </div>
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Total: <span className="font-bold text-green-600">${cartTotal.toFixed(2)}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
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
                            <p className="text-sm text-green-600">${item.price.toFixed(2)}</p>
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
                      <div className="flex items-center justify-between font-semibold">
                        <span>Total:</span>
                        <span className="text-green-600">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Delivery Fee:</span>
                        <span>$5.00</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-green-600">Ready to checkout</span>
                        <Button
                          onClick={handleCheckout}
                          disabled={cart.length === 0}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Checkout
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button onClick={handleCheckout} className="bg-green-600 hover:bg-green-700">
                  Checkout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Nearby Farms Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Nearby Farms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmData.map((farm) => (
            <Card key={farm.id} className="overflow-hidden hover:shadow-lg transition-all">
              <div className="h-48 overflow-hidden">
                <img src={farm.image || "/placeholder.svg"} alt={farm.name} className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{farm.name}</CardTitle>
                  <Badge className="bg-green-100 text-green-800">{farm.location}</Badge>
                </div>
                <CardDescription>{farm.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(farm.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">{farm.rating}</span>
                </div>
                <div className="mt-2">
                  <h4 className="text-sm font-medium mb-1">Top Products:</h4>
                  <div className="flex flex-wrap gap-1">
                    {farm.products.slice(0, 3).map((product, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className={`bg-white hover:bg-gray-50 cursor-pointer ${getProductColor(product)}`}
                        onClick={() => {
                          const matchedProduct = produceItems.find(
                            (p) => p.name.toLowerCase().includes(product.toLowerCase()) && p.farmer === farm.name,
                          )
                          if (matchedProduct) {
                            addToCart(matchedProduct)
                            toast({
                              title: "Added to Cart",
                              description: `${matchedProduct.name} has been added to your cart.`,
                            })
                          } else {
                            toast({
                              title: "Product Coming Soon",
                              description: `${product} will be available soon.`,
                            })
                          }
                        }}
                      >
                        {product}
                      </Badge>
                    ))}
                    {farm.products.length > 3 && (
                      <Badge variant="outline" className="bg-white hover:bg-gray-50 cursor-pointer">
                        +{farm.products.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  <h4 className="text-sm font-medium mb-1">Certifications:</h4>
                  <div className="flex flex-wrap gap-1">
                    {farm.certifications.map((cert, idx) => (
                      <Badge key={idx} className="bg-green-100 text-green-800">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setSelectedFarm(farm)}>
                  View Details
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    const farmProducts = produceItems.filter((p) => p.farmer === farm.name)
                    if (farmProducts.length > 0) {
                      addToCart(farmProducts[0])
                      toast({
                        title: "Added to Cart",
                        description: `${farmProducts[0].name} from ${farm.name} has been added to your cart.`,
                      })
                    }
                  }}
                >
                  Shop Products
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-800 to-lime-600 rounded-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Fresh, Local, Sustainable</h2>
        <p className="mb-4">Support local farmers and enjoy fresh, seasonal produce delivered directly to your door.</p>
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5" />
          <span className="font-semibold">All products are sourced from farms within 50 miles</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="hover:border-green-500 focus:border-green-500 focus:ring-green-500">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Vegetables">Vegetables</SelectItem>
                    <SelectItem value="Fruits">Fruits</SelectItem>
                    <SelectItem value="Dairy & Eggs">Dairy & Eggs</SelectItem>
                    <SelectItem value="Meat">Meat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Max Distance: {maxDistance} miles</label>
                <Slider
                  defaultValue={[50]}
                  max={50}
                  step={5}
                  onValueChange={(value) => setMaxDistance(value[0])}
                  className="py-4"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products or farms..."
                    className="pl-8 hover:border-green-500 focus:border-green-500 focus:ring-green-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-3/4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4 w-full justify-start border-b">
              <TabsTrigger
                value="all"
                className="data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none"
              >
                All Products
              </TabsTrigger>
              <TabsTrigger
                value="organic"
                className="data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none"
              >
                Organic
              </TabsTrigger>
              <TabsTrigger
                value="seasonal"
                className="data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none"
              >
                Seasonal
              </TabsTrigger>
              <TabsTrigger
                value="local"
                className="data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none"
              >
                Local Farms
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover:border-green-500 hover:border-2 transition-all"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{product.name}</CardTitle>
                          <CardDescription>{product.description}</CardDescription>
                        </div>
                        {product.organic && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Organic</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">{product.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {product.farmer} ({product.location})
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <span className="font-bold">
                        ${product.price.toFixed(2)} / {product.unit}
                      </span>
                      <Button
                        onClick={() => {
                          addToCart(product)
                          toast({
                            title: "Added to Cart",
                            description: `${product.name} has been added to your cart.`,
                          })
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="organic" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts
                  .filter((p) => p.organic)
                  .map((product) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden hover:border-green-500 hover:border-2 transition-all"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{product.name}</CardTitle>
                            <CardDescription>{product.description}</CardDescription>
                          </div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Organic</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">{product.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>
                            {product.farmer} ({product.location})
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <span className="font-bold">
                          ${product.price.toFixed(2)} / {product.unit}
                        </span>
                        <Button
                          onClick={() => {
                            addToCart(product)
                            toast({
                              title: "Added to Cart",
                              description: `${product.name} has been added to your cart.`,
                            })
                          }}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="seasonal" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.slice(0, 4).map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover:border-green-500 hover:border-2 transition-all"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{product.name}</CardTitle>
                          <CardDescription>{product.description}</CardDescription>
                        </div>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">In Season</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">{product.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {product.farmer} ({product.location})
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <span className="font-bold">
                        ${product.price.toFixed(2)} / {product.unit}
                      </span>
                      <Button
                        onClick={() => {
                          addToCart(product)
                          toast({
                            title: "Added to Cart",
                            description: `${product.name} has been added to your cart.`,
                          })
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="local" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts
                  .filter((p) => {
                    const distanceMatch = p.location.match(/\d+/)
                    const distance = distanceMatch ? Number.parseInt(distanceMatch[0], 10) : 0
                    return distance < 10
                  })
                  .map((product) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden hover:border-green-500 hover:border-2 transition-all"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{product.name}</CardTitle>
                            <CardDescription>{product.description}</CardDescription>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Local</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">{product.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>
                            {product.farmer} ({product.location})
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <span className="font-bold">
                          ${product.price.toFixed(2)} / {product.unit}
                        </span>
                        <Button
                          onClick={() => {
                            addToCart(product)
                            toast({
                              title: "Added to Cart",
                              description: `${product.name} has been added to your cart.`,
                            })
                          }}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Order History Dialog */}
      <Dialog open={showOrderHistory} onOpenChange={setShowOrderHistory}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order History</DialogTitle>
            <DialogDescription>View your past orders and their status</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">You haven't placed any orders yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/50">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                          <CardDescription>Placed on {order.date}</CardDescription>
                        </div>
                        <Badge
                          className={
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-amber-100 text-amber-800"
                          }
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Items</h4>
                          <div className="space-y-2">
                            {order.products.map((item) => (
                              <div key={item.id} className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <div className="h-10 w-10 rounded overflow-hidden">
                                    <img
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <span>
                                    {item.name} x {item.quantity}
                                  </span>
                                </div>
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center font-bold">
                          <span>Total</span>
                          <span className="text-green-600">${order.total.toFixed(2)}</span>
                        </div>
                        {order.status !== "delivered" && (
                          <div className="bg-muted p-3 rounded-md">
                            <p className="text-sm">
                              <span className="font-medium">Estimated Delivery:</span> {order.estimatedDelivery}
                            </p>
                            {order.trackingNumber && (
                              <p className="text-sm">
                                <span className="font-medium">Tracking Number:</span> {order.trackingNumber}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Farm Details Dialog */}
      <Dialog open={!!selectedFarm} onOpenChange={(open) => !open && setSelectedFarm(null)}>
        {selectedFarm && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedFarm.name}</DialogTitle>
              <DialogDescription>Owned by {selectedFarm.farmer}</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-64 rounded-md overflow-hidden mb-4">
                  <img
                    src={selectedFarm.image || "/placeholder.svg"}
                    alt={selectedFarm.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(selectedFarm.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">{selectedFarm.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-3 w-3" />
                  <span>{selectedFarm.location}</span>
                </div>
                <p className="text-muted-foreground mb-4">{selectedFarm.description}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Farm Details</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Founded</span>
                    <span>{selectedFarm.founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Farm Size</span>
                    <span>{selectedFarm.farmSize}</span>
                  </div>
                </div>
                <h3 className="font-semibold mb-2">Products</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedFarm.products.map((product) => (
                    <Badge
                      key={product}
                      variant="outline"
                      className={`cursor-pointer ${getProductColor(product)}`}
                      onClick={() => {
                        const matchedProduct = produceItems.find(
                          (p) => p.name.toLowerCase().includes(product.toLowerCase()) && p.farmer === selectedFarm.name,
                        )
                        if (matchedProduct) {
                          addToCart(matchedProduct)
                          toast({
                            title: "Added to Cart",
                            description: `${matchedProduct.name} has been added to your cart.`,
                          })
                        }
                      }}
                    >
                      {product}
                    </Badge>
                  ))}
                </div>
                <h3 className="font-semibold mb-2">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedFarm.certifications.map((cert) => (
                    <Badge key={cert} className="bg-green-100 text-green-800">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Check, Plus, Minus, ShoppingBag, Clock, Package, X, Heart, HeartOff } from "lucide-react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Product {
  id: string
  name: string
  description: string
  creditCost: number
  category: string
  image: string
  impact: string
  stock?: number
  rating?: number
}

interface CartItem extends Product {
  quantity: number
}

interface OrderItem extends CartItem {
  orderId: string
  orderDate: string
  status: "processing" | "shipped" | "delivered"
  estimatedDelivery: string
  trackingNumber: string
}

interface ProductGridProps {
  userCredits: number
  onRedeem: (productId: string, cost: number) => void
}

const products: Product[] = [
  {
    id: "prod-1",
    name: "Eco-friendly Water Bottle",
    description: "Reusable stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    creditCost: 200,
    category: "Home",
    image: "/eco-friendly-water-bottle.png",
    impact: "Reduces plastic waste by replacing 167 single-use bottles per year",
    stock: 15,
    rating: 4.8,
  },
  {
    id: "prod-2",
    name: "Bamboo Cutlery Set",
    description: "Portable bamboo cutlery set including fork, knife, spoon, and chopsticks in a cotton pouch.",
    creditCost: 150,
    category: "Kitchen",
    image: "/bamboo-cutlery-set.png",
    impact: "Eliminates need for disposable plastic utensils",
    stock: 23,
    rating: 4.5,
  },
  {
    id: "prod-3",
    name: "Solar Power Bank",
    description: "10,000mAh power bank with solar charging capability for emergency power on the go.",
    creditCost: 350,
    category: "Tech",
    image: "/solar-power-bank.png",
    impact: "Uses renewable energy to charge your devices",
    stock: 8,
    rating: 4.7,
  },
  {
    id: "prod-4",
    name: "Organic Cotton Tote Bag",
    description: "Durable, washable tote bag made from 100% organic cotton with reinforced handles.",
    creditCost: 100,
    category: "Accessories",
    image: "/organic-cotton-tote-bag.png",
    impact: "Replaces hundreds of plastic bags over its lifetime",
    stock: 42,
    rating: 4.9,
  },
  {
    id: "prod-5",
    name: "Recycled Notebook",
    description: "A5 notebook made from 100% post-consumer recycled paper with 80 lined pages.",
    creditCost: 120,
    category: "Office",
    image: "/recycled-paper-notebook.png",
    impact: "Saves trees and reduces landfill waste",
    stock: 31,
    rating: 4.6,
  },
  {
    id: "prod-6",
    name: "LED Desk Lamp",
    description: "Energy-efficient LED desk lamp with adjustable brightness and color temperature.",
    creditCost: 280,
    category: "Home",
    image: "/led-desk-lamp.png",
    impact: "Uses 75% less energy than traditional bulbs",
    stock: 12,
    rating: 4.4,
  },
  {
    id: "prod-7",
    name: "Compostable Phone Case",
    description: "Biodegradable phone case made from plant-based materials that protect your device.",
    creditCost: 180,
    category: "Tech",
    image: "/compostable-phone-case.png",
    impact: "Biodegrades completely within 1-2 years",
    stock: 19,
    rating: 4.3,
  },
  {
    id: "prod-8",
    name: "Beeswax Food Wraps",
    description: "Set of 3 reusable food wraps made from organic cotton, beeswax, and jojoba oil.",
    creditCost: 160,
    category: "Kitchen",
    image: "/beeswax-food-wraps.png",
    impact: "Eliminates need for plastic wrap and aluminum foil",
    stock: 27,
    rating: 4.7,
  },
]

// Sample order history data
const sampleOrderHistory: OrderItem[] = [
  {
    ...products[0],
    quantity: 1,
    orderId: "ORD-2023-001",
    orderDate: "2023-04-15",
    status: "delivered",
    estimatedDelivery: "2023-04-22",
    trackingNumber: "TRK12345678",
  },
  {
    ...products[3],
    quantity: 2,
    orderId: "ORD-2023-002",
    orderDate: "2023-05-03",
    status: "shipped",
    estimatedDelivery: "2023-05-10",
    trackingNumber: "TRK87654321",
  },
  {
    ...products[5],
    quantity: 1,
    orderId: "ORD-2023-003",
    orderDate: "2023-05-20",
    status: "processing",
    estimatedDelivery: "2023-05-27",
    trackingNumber: "TRK11223344",
  },
]

export default function ProductGrid({ userCredits, onRedeem }: ProductGridProps) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [orderHistory, setOrderHistory] = useState<OrderItem[]>(sampleOrderHistory)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("All")

  // Calculate total cost of items in cart
  const cartTotal = cart.reduce((total, item) => total + item.creditCost * item.quantity, 0)

  // Filter products by category
  const filteredProducts =
    activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory)

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))]

  // Add to cart function
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  // Remove from cart function
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  // Update quantity function
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  // Toggle wishlist function
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  // Checkout function
  const handleCheckout = () => {
    if (userCredits < cartTotal) return

    // Create new order items
    const newOrders: OrderItem[] = cart.map((item) => ({
      ...item,
      orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      orderDate: new Date().toISOString().split("T")[0],
      status: "processing",
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      trackingNumber: `TRK${Math.floor(Math.random() * 100000000)}`,
    }))

    // Add to order history
    setOrderHistory((prev) => [...newOrders, ...prev])

    // Clear cart
    setCart([])

    // Call parent onRedeem function
    onRedeem("checkout", cartTotal)
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={activeCategory === category ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
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
                  Total: <span className="font-bold text-amber-500">{cartTotal} Credits</span>
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
                            <p className="text-sm text-amber-500">{item.creditCost} Credits</p>
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
                        <span className="text-amber-500">{cartTotal} Credits</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Your Balance:</span>
                        <span>{userCredits} Credits</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className={userCredits < cartTotal ? "text-red-500" : "text-emerald-500"}>
                          {userCredits < cartTotal ? "Insufficient credits" : "Ready to checkout"}
                        </span>
                        <Button
                          onClick={handleCheckout}
                          disabled={cart.length === 0 || userCredits < cartTotal}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          Checkout
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  onClick={handleCheckout}
                  disabled={userCredits < cartTotal}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-emerald-300"
          >
            <div
              className="relative aspect-square bg-muted group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <Badge className="absolute top-2 right-2 bg-emerald-600">{product.category}</Badge>
              <div className="absolute bottom-2 right-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleWishlist(product.id)
                  }}
                >
                  {wishlist.includes(product.id) ? (
                    <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                  ) : (
                    <Heart className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {product.stock && product.stock < 10 && (
                <Badge variant="destructive" className="absolute top-2 left-2">
                  Only {product.stock} left
                </Badge>
              )}
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-start">
                <span>{product.name}</span>
                {product.rating && (
                  <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                    ★ {product.rating}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
              <div className="flex items-center gap-1 text-xs text-emerald-600">
                <Check className="h-3 w-3" />
                <span>{product.impact}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-2 border-t">
              <div className="flex items-center justify-between w-full">
                <div className="font-bold text-amber-500">{product.creditCost} Credits</div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedProduct(product)}
                    className="hover:bg-slate-100"
                  >
                    Details
                  </Button>
                  <Button
                    onClick={() => addToCart(product)}
                    disabled={userCredits < product.creditCost}
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Product Detail Dialog */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-square bg-muted rounded-md overflow-hidden">
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-emerald-600">{selectedProduct.category}</Badge>
                    {selectedProduct.rating && (
                      <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                        ★ {selectedProduct.rating}
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground">{selectedProduct.description}</p>

                <div className="bg-emerald-50 dark:bg-emerald-950 p-3 rounded-md border border-emerald-200 dark:border-emerald-800">
                  <h3 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">Environmental Impact</h3>
                  <p className="text-emerald-600 dark:text-emerald-400">{selectedProduct.impact}</p>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-2xl text-amber-500">{selectedProduct.creditCost} Credits</div>
                    <div>
                      {selectedProduct.stock && (
                        <span
                          className={`text-sm ${selectedProduct.stock < 10 ? "text-red-500" : "text-muted-foreground"}`}
                        >
                          {selectedProduct.stock} in stock
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        addToCart(selectedProduct)
                        setSelectedProduct(null)
                      }}
                      disabled={userCredits < selectedProduct.creditCost}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" onClick={() => toggleWishlist(selectedProduct.id)} className="flex-1">
                      {wishlist.includes(selectedProduct.id) ? (
                        <>
                          <HeartOff className="h-4 w-4 mr-2" />
                          Remove from Wishlist
                        </>
                      ) : (
                        <>
                          <Heart className="h-4 w-4 mr-2" />
                          Add to Wishlist
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Order History Section */}
      {orderHistory.length > 0 && (
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
                {orderHistory
                  .filter((order) => order.status !== "delivered")
                  .map((order) => (
                    <OrderCard key={order.orderId} order={order} />
                  ))}
                {orderHistory.filter((order) => order.status !== "delivered").length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No active orders</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-4">
              <div className="space-y-4">
                {orderHistory
                  .filter((order) => order.status === "delivered")
                  .map((order) => (
                    <OrderCard key={order.orderId} order={order} />
                  ))}
                {orderHistory.filter((order) => order.status === "delivered").length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No completed orders yet</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="all" className="mt-4">
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <OrderCard key={order.orderId} order={order} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

// Order Card Component
function OrderCard({ order }: { order: OrderItem }) {
  const [expanded, setExpanded] = useState(false)

  // Calculate delivery progress
  const getDeliveryProgress = (status: string) => {
    switch (status) {
      case "processing":
        return 33
      case "shipped":
        return 66
      case "delivered":
        return 100
      default:
        return 0
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "shipped":
        return <Package className="h-4 w-4 text-blue-500" />
      case "delivered":
        return <Check className="h-4 w-4 text-emerald-500" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  // Get status text with color
  const getStatusText = (status: string) => {
    switch (status) {
      case "processing":
        return <span className="text-amber-500">Processing</span>
      case "shipped":
        return <span className="text-blue-500">Shipped</span>
      case "delivered":
        return <span className="text-emerald-500">Delivered</span>
      default:
        return <span>Unknown</span>
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base flex items-center gap-2">
            {getStatusIcon(order.status)}
            Order #{order.orderId.split("-").pop()}
          </CardTitle>
          <Badge
            variant={order.status === "delivered" ? "outline" : order.status === "shipped" ? "secondary" : "default"}
          >
            {order.status === "processing" ? "Processing" : order.status === "shipped" ? "Shipped" : "Delivered"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Ordered on {order.orderDate}</span>
          <span className="text-muted-foreground">
            {order.status !== "delivered"
              ? `Est. delivery: ${order.estimatedDelivery}`
              : `Delivered: ${order.estimatedDelivery}`}
          </span>
        </div>

        <Progress value={getDeliveryProgress(order.status)} className="h-2 mb-4" />

        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
            <Image src={order.image || "/placeholder.svg"} alt={order.name} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-medium">{order.name}</h4>
            <p className="text-sm text-muted-foreground">
              Qty: {order.quantity} · {order.creditCost * order.quantity} Credits
            </p>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Tracking Number</p>
                <p className="text-muted-foreground">{order.trackingNumber}</p>
              </div>
              <div>
                <p className="font-medium">Status</p>
                <p>{getStatusText(order.status)}</p>
              </div>
              <div>
                <p className="font-medium">Order Date</p>
                <p className="text-muted-foreground">{order.orderDate}</p>
              </div>
              <div>
                <p className="font-medium">Estimated Delivery</p>
                <p className="text-muted-foreground">{order.estimatedDelivery}</p>
              </div>
            </div>

            {order.status !== "delivered" && (
              <div className="mt-4 bg-slate-50 dark:bg-slate-900 p-3 rounded-md border text-sm">
                <p className="font-medium mb-1">Tracking Information</p>
                {order.status === "processing" ? (
                  <p className="text-muted-foreground">Your order is being processed and will be shipped soon.</p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <p>Package has left our warehouse</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <p>Package is in transit</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <p>Estimated delivery on {order.estimatedDelivery}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="ml-auto">
          {expanded ? "Show Less" : "Track Order"}
        </Button>
      </CardFooter>
    </Card>
  )
}

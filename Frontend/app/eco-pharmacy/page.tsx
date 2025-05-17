"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Star,
  Package,
  Clock,
  History,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Truck,
  ShoppingCart,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePharmacyContext } from "@/lib/pharmacy-context"
import type { Order } from "@/lib/pharmacy-context"

export default function EcoPharmacyPage() {
  const [activeTab, setActiveTab] = useState("pharmacy")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [trackingIdSearch, setTrackingIdSearch] = useState("")
  const [trackingResult, setTrackingResult] = useState<Order | null>(null)
  const { toast } = useToast()

  const { products, cart, orders, addToCart, updateQuantity, removeFromCart, addOrder, calculateTotal } =
    usePharmacyContext()

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const handleAddToCart = (product: any) => {
    addToCart(product)

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      variant: "success",
    })
  }

  const handleCheckout = () => {
    if (cart.length === 0) return

    const newOrder: Order = {
      id: `ORD-2025-${orders.length + 3}`,
      date: new Date(),
      status: "processing",
      items: [...cart],
      total: calculateTotal(),
      trackingId: `TRK${Math.floor(Math.random() * 900000000) + 100000000}`,
    }

    addOrder(newOrder)

    toast({
      title: "Order Placed Successfully",
      description: `Your order #${newOrder.id} has been placed and is being processed.`,
      variant: "success",
    })
  }

  const handleTrackOrder = () => {
    if (!trackingIdSearch.trim()) {
      toast({
        title: "Please Enter Tracking ID",
        description: "Enter a valid tracking ID to track your order.",
        variant: "destructive",
      })
      return
    }

    const foundOrder = orders.find((order) => order.trackingId === trackingIdSearch)

    if (foundOrder) {
      setTrackingResult(foundOrder)
    } else {
      toast({
        title: "Tracking ID Not Found",
        description: "No order found with the provided tracking ID.",
        variant: "destructive",
      })
      setTrackingResult(null)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Eco Pharmacy</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
            Dr. R's Recommended
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="pharmacy" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            value="pharmacy"
            className="hover:border-purple-500 data-[state=active]:border-purple-500 data-[state=active]:border-2"
          >
            Browse Products
          </TabsTrigger>
          <TabsTrigger
            value="cart"
            className="hover:border-purple-500 data-[state=active]:border-purple-500 data-[state=active]:border-2"
          >
            Cart{" "}
            {cart.length > 0 && (
              <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="hover:border-purple-500 data-[state=active]:border-purple-500 data-[state=active]:border-2"
          >
            Orders
          </TabsTrigger>
          <TabsTrigger
            value="tracking"
            className="hover:border-purple-500 data-[state=active]:border-purple-500 data-[state=active]:border-2"
          >
            Track Order
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pharmacy" className="mt-6">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Eco Pharmacy</CardTitle>
              <CardDescription>Sustainable and eco-friendly health products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10 hover:border-green-500 focus:border-green-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px] hover:border-green-500 focus:border-green-500">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Personal Care">Personal Care</SelectItem>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Tech">Tech</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" className="hover:border-green-500">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>{product.category}</CardDescription>
                    </div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < product.ecoRating
                              ? "text-emerald-500 fill-emerald-500"
                              : "text-slate-300 dark:text-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex gap-4 mb-3">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                      <p className="font-bold">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-purple-600 hover:bg-purple-700 hover:border-green-500"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cart" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-purple-500" />
                Your Cart
              </CardTitle>
              <CardDescription>Review your items before checkout</CardDescription>
            </CardHeader>
            <CardContent>
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                          <img
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none hover:border-green-500"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <div className="h-8 px-3 flex items-center justify-center border-y">{item.quantity}</div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none hover:border-green-500"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-100 hover:border-red-500"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    <div className="flex justify-between font-medium">
                      <span>Subtotal</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <ShoppingCart className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6">
                    Browse our eco-friendly products and add items to your cart
                  </p>
                  <Button variant="outline" onClick={() => setActiveTab("pharmacy")} className="hover:border-green-500">
                    Continue Shopping
                  </Button>
                </div>
              )}
            </CardContent>
            {cart.length > 0 && (
              <CardFooter>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-purple-600 hover:bg-purple-700 hover:border-green-500"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Proceed to Checkout
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-purple-500" />
                Order History
              </CardTitle>
              <CardDescription>Track and manage your orders</CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg overflow-hidden">
                      <div className="bg-slate-100 dark:bg-slate-800 p-4">
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <div>
                            <h3 className="font-medium">Order #{order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              {order.date.toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          <Badge
                            className={
                              order.status === "delivered"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : order.status === "shipped"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                  : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                            }
                          >
                            {order.status === "delivered" ? (
                              <Package className="h-3 w-3 mr-1" />
                            ) : order.status === "shipped" ? (
                              <Truck className="h-3 w-3 mr-1" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        {order.trackingId && (
                          <p className="text-sm mt-2">
                            <span className="text-muted-foreground">Tracking ID:</span> {order.trackingId}
                          </p>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.product.id} className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                                <img
                                  src={item.product.image || "/placeholder.svg"}
                                  alt={item.product.name}
                                  className="max-w-full max-h-full object-contain"
                                />
                              </div>
                              <div className="flex-grow">
                                <h4 className="font-medium">{item.product.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  ${item.product.price.toFixed(2)} × {item.quantity}
                                </p>
                              </div>
                              <div className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between font-bold mt-4 pt-4 border-t">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Your order history will appear here once you make a purchase
                  </p>
                  <Button variant="outline" onClick={() => setActiveTab("pharmacy")} className="hover:border-green-500">
                    Browse Products
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-purple-500" />
                Track Your Order
              </CardTitle>
              <CardDescription>Enter your tracking ID to see order status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter tracking ID (e.g., TRK123456789)"
                    value={trackingIdSearch}
                    onChange={(e) => setTrackingIdSearch(e.target.value)}
                    className="flex-grow hover:border-green-500 focus:border-green-500"
                  />
                  <Button
                    onClick={handleTrackOrder}
                    className="bg-purple-600 hover:bg-purple-700 hover:border-green-500"
                  >
                    Track
                  </Button>
                </div>

                {trackingResult && (
                  <div className="border rounded-lg overflow-hidden mt-6">
                    <div className="bg-slate-100 dark:bg-slate-800 p-4">
                      <div className="flex flex-wrap justify-between items-center gap-2">
                        <div>
                          <h3 className="font-medium">Order #{trackingResult.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            {trackingResult.date.toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <Badge
                          className={
                            trackingResult.status === "delivered"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : trackingResult.status === "shipped"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          }
                        >
                          {trackingResult.status === "delivered" ? (
                            <Package className="h-3 w-3 mr-1" />
                          ) : trackingResult.status === "shipped" ? (
                            <Truck className="h-3 w-3 mr-1" />
                          ) : (
                            <Clock className="h-3 w-3 mr-1" />
                          )}
                          {trackingResult.status.charAt(0).toUpperCase() + trackingResult.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm mt-2">
                        <span className="text-muted-foreground">Tracking ID:</span> {trackingResult.trackingId}
                      </p>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {trackingResult.items.map((item) => (
                          <div key={item.product.id} className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                              <img
                                src={item.product.image || "/placeholder.svg"}
                                alt={item.product.name}
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium">{item.product.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                ${item.product.price.toFixed(2)} × {item.quantity}
                              </p>
                            </div>
                            <div className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between font-bold mt-4 pt-4 border-t">
                        <span>Total</span>
                        <span>${trackingResult.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="p-4 border-t">
                      <h4 className="font-medium mb-3">Shipping Updates</h4>
                      <div className="space-y-3">
                        {trackingResult.status === "delivered" && (
                          <>
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-0.5">
                                <Package className="h-3 w-3 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <p className="font-medium">Delivered</p>
                                <p className="text-sm text-muted-foreground">Your package has been delivered</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date().toLocaleDateString()} -{" "}
                                  {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-0.5">
                                <Truck className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="font-medium">Out for Delivery</p>
                                <p className="text-sm text-muted-foreground">Your package is out for delivery</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString()} - 08:30
                                  AM
                                </p>
                              </div>
                            </div>
                          </>
                        )}

                        {(trackingResult.status === "delivered" || trackingResult.status === "shipped") && (
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-0.5">
                              <Truck className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium">Shipped</p>
                              <p className="text-sm text-muted-foreground">Your package has been shipped</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(new Date().setDate(new Date().getDate() - 2)).toLocaleDateString()} - 14:20 PM
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mt-0.5">
                            <Clock className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <p className="font-medium">Order Processed</p>
                            <p className="text-sm text-muted-foreground">
                              Your order has been processed and is being prepared
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(new Date().setDate(new Date().getDate() - 3)).toLocaleDateString()} - 09:45 AM
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

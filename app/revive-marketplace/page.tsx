"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Recycle, ChevronRight, Sparkles, ShoppingCart } from "lucide-react"

// Mock data for products
const recycledProducts = [
  {
    id: 1,
    name: "Recycled Plastic Backpack",
    price: 45,
    credits: 20,
    image: "/recycled-plastic-backpack.png",
    description: "Durable backpack made from recycled plastic bottles",
    seller: "EcoGear",
    rating: 4.5,
    materials: ["Recycled PET", "Organic Cotton"],
    carbonSaved: "2.3kg",
  },
  {
    id: 2,
    name: "Upcycled Denim Notebook",
    price: 15,
    credits: 8,
    image: "/upcycled-denim-notebook.png",
    description: "Handcrafted notebook with cover made from upcycled denim",
    seller: "PaperCraft",
    rating: 4.2,
    materials: ["Recycled Denim", "Recycled Paper"],
    carbonSaved: "0.8kg",
  },
  {
    id: 3,
    name: "Reclaimed Wood Desk Organizer",
    price: 35,
    credits: 15,
    image: "/reclaimed-wood-desk-organizer.png",
    description: "Stylish desk organizer made from reclaimed wood",
    seller: "WoodWorks",
    rating: 4.7,
    materials: ["Reclaimed Pine", "Recycled Metal"],
    carbonSaved: "1.5kg",
  },
  {
    id: 4,
    name: "Solar-Powered Garden Lamp",
    price: 28,
    credits: 12,
    image: "/solar-powered-garden-lamp.png",
    description: "Energy-efficient garden lamp powered by solar energy",
    seller: "SolarGlow",
    rating: 4.3,
    materials: ["Recycled Aluminum", "Solar Panel"],
    carbonSaved: "3.2kg",
  },
  {
    id: 5,
    name: "Recycled Tire Doormat",
    price: 22,
    credits: 10,
    image: "/recycled-tire-doormat.png",
    description: "Durable doormat made from recycled rubber tires",
    seller: "RubberRevive",
    rating: 4.1,
    materials: ["Recycled Rubber", "Natural Fibers"],
    carbonSaved: "1.8kg",
  },
  {
    id: 6,
    name: "Upcycled Glass Terrarium",
    price: 40,
    credits: 18,
    image: "/upcycled-glass-terrarium.png",
    description: "Beautiful terrarium made from upcycled glass bottles",
    seller: "GlassGarden",
    rating: 4.6,
    materials: ["Upcycled Glass", "Reclaimed Wood"],
    carbonSaved: "1.2kg",
  },
  {
    id: 7,
    name: "Recycled Paper Art",
    price: 32,
    credits: 14,
    image: "/recycled-paper-art.png",
    description: "Unique wall art created from recycled paper",
    seller: "PaperArtistry",
    rating: 4.4,
    materials: ["Recycled Paper", "Natural Dyes"],
    carbonSaved: "0.9kg",
  },
  {
    id: 8,
    name: "Ocean Plastic Sunglasses",
    price: 65,
    credits: 25,
    image: "/ocean-plastic-sunglasses.png",
    description: "Stylish sunglasses made from recovered ocean plastic",
    seller: "OceanView",
    rating: 4.8,
    materials: ["Ocean Plastic", "Plant-based Acetate"],
    carbonSaved: "1.7kg",
  },
]

// Mock data for raw materials
const rawMaterials = [
  { id: 1, name: "Plastic Bottles (kg)", price: 0.5, credits: 2 },
  { id: 2, name: "Aluminum Cans (kg)", price: 1.2, credits: 3 },
  { id: 3, name: "Paper Waste (kg)", price: 0.3, credits: 1 },
  { id: 4, name: "Glass Bottles (kg)", price: 0.4, credits: 2 },
  { id: 5, name: "Cardboard (kg)", price: 0.2, credits: 1 },
  { id: 6, name: "Electronic Waste (kg)", price: 2.0, credits: 5 },
  { id: 7, name: "Textile Waste (kg)", price: 0.8, credits: 3 },
  { id: 8, name: "Organic Waste (kg)", price: 0.1, credits: 1 },
]

// Mock data for companies
const companies = [
  {
    id: 1,
    name: "EcoBottle",
    logo: "/bottle-company-logo.png",
    description: "Specializes in recycling plastic bottles into new products",
  },
  {
    id: 2,
    name: "GreenCraft",
    logo: "/craft-store-logo.png",
    description: "Artisanal workshop creating handmade items from recycled materials",
  },
  {
    id: 3,
    name: "RecycleHub",
    logo: "/recycling-center-logo.png",
    description: "Collection and processing center for various recyclable materials",
  },
  {
    id: 4,
    name: "UpcycleWorkshop",
    logo: "/workshop-logo.png",
    description: "Community workshop focused on upcycling and creative reuse",
  },
  {
    id: 5,
    name: "EcoRetail",
    logo: "/retail-store-logo.png",
    description: "Retail chain specializing in sustainable and recycled products",
  },
  {
    id: 6,
    name: "WebEcoStore",
    logo: "/online-store-logo.png",
    description: "Online marketplace for eco-friendly and recycled products",
  },
]

// Mock data for orders
const orders = [
  {
    id: "ORD-2023-001",
    date: "2023-04-15",
    status: "Delivered",
    items: ["Recycled Plastic Backpack", "Upcycled Glass Terrarium"],
    total: 85,
  },
  { id: "ORD-2023-002", date: "2023-04-18", status: "In Transit", items: ["Ocean Plastic Sunglasses"], total: 65 },
  {
    id: "ORD-2023-003",
    date: "2023-04-20",
    status: "Processing",
    items: ["Recycled Tire Doormat", "Recycled Paper Art"],
    total: 54,
  },
  { id: "ORD-2023-004", date: "2023-04-22", status: "Delivered", items: ["Upcycled Denim Notebook"], total: 15 },
]

export default function ReviveMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [showCartDialog, setShowCartDialog] = useState(false);
  const [showSellDialog, setShowSellDialog] = useState(false);
  const [sellType, setSellType] = useState("raw");
  const [sellForm, setSellForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    material: "",
    image: null
  });

  // Filter products based on search query
  const filteredProducts = recycledProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add product to cart
  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setShowProductDialog(false);
  };

  // Remove product from cart
  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Calculate total price and credits
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCredits = cart.reduce((total, item) => total + (item.credits * item.quantity), 0);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-700">Revive Marketplace</h1>
            <p className="text-gray-600 dark:text-gray-400">Buy and sell recycled products and raw materials</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="relative"
              onClick={() => setShowCartDialog(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="products">Recycled Products</TabsTrigger>
            <TabsTrigger value="raw">Raw Materials</TabsTrigger>
            <TabsTrigger value="companies">Partner Companies</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Recycled Products</h2>
              <Dialog open={showSellDialog && sellType === "product"} onOpenChange={(open) => {
                setShowSellDialog(open);
                if (open) setSellType("product");
              }}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Recycle className="mr-2 h-4 w-4" />
                    Sell Recycled Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Sell Your Recycled Product</DialogTitle>
                    <DialogDescription>
                      List your handcrafted or recycled product on our marketplace.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="product-name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="product-name"
                        value={sellForm.name}
                        onChange={(e) => setSellForm({...sellForm, name: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="product-description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="product-description"
                        value={sellForm.description}
                        onChange={(e) => setSellForm({...sellForm, description: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="product-price" className="text-right">
                        Price ($)
                      </Label>
                      <Input
                        id="product-price"
                        type="number"
                        value={sellForm.price}
                        onChange={(e) => setSellForm({...sellForm, price: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="product-quantity" className="text-right">
                        Quantity
                      </Label>
                      <Input
                        id="product-quantity"
                        type="number"
                        value={sellForm.quantity}
                        onChange={(e) => setSellForm({...sellForm, quantity: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="product-material" className="text-right">
                        Materials
                      </Label>
                      <Input
                        id="product-material"
                        value={sellForm.material}
                        onChange={(e) => setSellForm({...sellForm, material: e.target.value})}
                        className="col-span-3"
                        placeholder="e.g., Recycled plastic, Reclaimed wood"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="product-image" className="text-right">
                        Image
                      </Label>
                      <Input
                        id="product-image"
                        type="file"
                        className="col-span-3"
                        onChange={(e) => setSellForm({...sellForm, image: e.target.files?.[0] || null})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">List Product</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-600">
                      {product.credits} Credits
                    </Badge>
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">${product.price}</span>
                      <span className="text-sm text-gray-500">Seller: {product.seller}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Carbon saved: {product.carbonSaved}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowProductDialog(true);
                      }}
                    >
                      Details
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="raw" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Raw Materials</h2>
              <Dialog open={showSellDialog && sellType === "raw"} onOpenChange={(open) => {
                setShowSellDialog(open);
                if (open) setSellType("raw");
              }}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Recycle className="mr-2 h-4 w-4" />
                    Sell Raw Materials
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Sell Your Raw Materials</DialogTitle>
                    <DialogDescription>
                      Sell your recyclable materials and earn credits.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="material-type" className="text-right">
                        Material Type
                      </Label>
                      <Select onValueChange={(value) => setSellForm({...sellForm, material: value})}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select material type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plastic">Plastic</SelectItem>
                          <SelectItem value="paper">Paper</SelectItem>
                          <SelectItem value="glass">Glass</SelectItem>
                          <SelectItem value="metal">Metal</SelectItem>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="textile">Textile</SelectItem>
                          <SelectItem value="organic">Organic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="material-quantity" className="text-right">
                        Quantity (kg)
                      </Label>
                      <Input
                        id="material-quantity"
                        type="number"
                        value={sellForm.quantity}
                        onChange={(e) => setSellForm({...sellForm, quantity: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="material-description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="material-description"
                        value={sellForm.description}
                        onChange={(e) => setSellForm({...sellForm, description: e.target.value})}
                        className="col-span-3"
                        placeholder="Condition, source, etc."
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="material-image" className="text-right">
                        Image
                      </Label>
                      <Input
                        id="material-image"
                        type="file"
                        className="col-span-3"
                        onChange={(e) => setSellForm({...sellForm, image: e.target.files?.[0] || null})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">Submit</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {rawMaterials.map((material) => (
                <Card key={material.id}>
                  <CardHeader>
                    <CardTitle>{material.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${material.price}/kg</span>
                      <Badge className="bg-green-600">{material.credits} Credits/kg</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-green-600 hover:bg-green-700">Sell Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            <h2 className="text-2xl font-semibold">Partner Companies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <Card key={company.id} className="overflow-hidden">
                  <div className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
                    <img
                      src={company.logo || "/placeholder.svg"}
                      alt={company.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{company.name}</CardTitle>
                    <CardDescription>{company.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Products
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-2xl font-semibold">My Orders</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <Badge className={
                        order.status === "Delivered" ? "bg-green-600" :
                        order.status === "In Transit" ? "bg-blue-600" :
                        "bg-yellow-600"
                      }>
                        {order.status}
                      </Badge>
                    </div>
                    <CardDescription>Placed on {order.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="font-medium">Items:</div>
                      <ul className="list-disc list-inside">
                        {order.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <div className="font-bold mt-2">Total: ${order.total}</div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Track Order</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Product Detail Dialog */}
        <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedProduct && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedProduct.name}</DialogTitle>
                  <DialogDescription>{selectedProduct.description}</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                    <img
                      src={selectedProduct.image || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Price</h3>
                      <p className="font-bold text-xl">${selectedProduct.price}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Credits</h3>
                      <p className="font-bold text-xl text-green-600">{selectedProduct.credits} Credits</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Seller</h3>
                      <p>{selectedProduct.seller}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Materials</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedProduct.materials.map((material: string, index: number) => (
                          <Badge key={index} variant="outline">{material}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Carbon Saved</h3>
                      <div className="flex items-center mt-1">
                        <Sparkles className="h-4 w-4 text-green-600 mr-1" />
                        <span>{selectedProduct.carbonSaved}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowProductDialog(false)}>
                    Close
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => addToCart(selectedProduct)}
                  >
                    Add to Cart
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Shopping Cart Dialog */}
        <Dialog open={showCartDialog} onOpenChange={setShowCartDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Shopping Cart</DialogTitle>
              <DialogDescription>
                Review your items before checkout
              </DialogDescription>
            </DialogHeader>
            {cart.length === 0 ? (
              <div className="py-6 text-center text-gray-500 dark:text-gray-400">
                Your cart is empty
              </div>
            ) : (
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-sm font-medium">
                              ${item.price} each
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">${item.price * item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          &times;
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
            {cart.length > 0 && (
              <>
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-xl">${cartTotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Credits Earned:</span>
                  <span className="font-bold text-xl text-green-600">{cartCredits} Credits</span>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCartDialog(false)}>
                    Continue Shopping
                  </Button>
                  <Button className\

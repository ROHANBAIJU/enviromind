"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  ecoRating: number
  tags: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  date: Date
  status: "processing" | "shipped" | "delivered"
  items: CartItem[]
  total: number
  trackingId?: string
}

interface PharmacyContextType {
  products: Product[]
  cart: CartItem[]
  orders: Order[]
  addToCart: (product: Product) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  addOrder: (order: Order) => void
  calculateTotal: () => number
}

const defaultProducts: Product[] = [
  {
    id: "prod-1",
    name: "Eco-friendly Water Bottle",
    description: "Reusable stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 25,
    image: "/cart1.png?height=80&width=80",
    category: "Home",
    ecoRating: 5,
    tags: ["reusable", "plastic-free", "sustainable"],
  },
  {
    id: "prod-2",
    name: "Bamboo Toothbrush Set",
    description: "Pack of 4 biodegradable bamboo toothbrushes with charcoal-infused bristles.",
    price: 15,
    image: "/cart2.png?height=80&width=80",
    category: "Personal Care",
    ecoRating: 5,
    tags: ["biodegradable", "plastic-free", "sustainable"],
  },
  {
    id: "prod-3",
    name: "Organic Multivitamin",
    description: "Plant-based daily multivitamin with essential nutrients from organic sources.",
    price: 30,
    image: "/cart3.png?height=80&width=80",
    category: "Health",
    ecoRating: 4,
    tags: ["organic", "vegan", "non-gmo"],
  },
  {
    id: "prod-4",
    name: "Natural Deodorant",
    description: "Aluminum-free deodorant made with essential oils and natural ingredients.",
    price: 12,
    image: "/cart4.png?height=80&width=80",
    category: "Personal Care",
    ecoRating: 4,
    tags: ["aluminum-free", "natural", "cruelty-free"],
  },
  {
    id: "prod-5",
    name: "Natural Sleep Aid",
    description: "Herbal sleep supplement with melatonin, valerian root, and chamomile.",
    price: 22,
    image: "/cart5.png?height=80&width=80",
    category: "Health",
    ecoRating: 4,
    tags: ["herbal", "non-habit-forming", "natural"],
  },
  {
    id: "prod-6",
    name: "Reusable Produce Bags",
    description: "Set of 5 mesh bags for fruits and vegetables to reduce plastic waste.",
    price: 18,
    image: "/cart6.png?height=80&width=80",
    category: "Home",
    ecoRating: 5,
    tags: ["reusable", "plastic-free", "sustainable"],
  },
  {
    id: "prod-7",
    name: "Organic Lip Balm Set",
    description: "Set of 4 organic lip balms with natural ingredients and essential oils.",
    price: 14,
    image: "/cart7.png?height=80&width=80",
    category: "Personal Care",
    ecoRating: 5,
    tags: ["organic", "cruelty-free", "plastic-free"],
  },
  {
    id: "prod-8",
    name: "Eco-friendly Laundry Detergent",
    description: "Plant-based laundry detergent that's gentle on clothes and the environment.",
    price: 20,
    image: "/cart8.png?height=80&width=80",
    category: "Home",
    ecoRating: 5,
    tags: ["biodegradable", "phosphate-free", "eco-friendly"],
  },
  {
    id: "prod-9",
    name: "Reusable Coffee Cup",
    description: "Insulated bamboo coffee cup with silicone lid and sleeve.",
    price: 16,
    image: "/cart9.png?height=80&width=80",
    category: "Home",
    ecoRating: 5,
    tags: ["reusable", "plastic-free", "sustainable"],
  },
  {
    id: "prod-10",
    name: "Organic Immune Support",
    description: "Herbal supplement to support immune system health with elderberry and echinacea.",
    price: 28,
    image: "/cart10.png?height=80&width=80",
    category: "Health",
    ecoRating: 4,
    tags: ["organic", "vegan", "non-gmo"],
  },
  {
    id: "prod-11",
    name: "Biodegradable Phone Case",
    description: "Phone case made from plant-based materials that will biodegrade when composted.",
    price: 24,
    image: "/cart11.png?height=80&width=80",
    category: "Tech",
    ecoRating: 5,
    tags: ["biodegradable", "plastic-free", "sustainable"],
  },
  {
    id: "prod-12",
    name: "Solar Power Bank",
    description: "10,000mAh power bank with solar charging capability for emergency power.",
    price: 45,
    image: "/cart12.png?height=80&width=80",
    category: "Tech",
    ecoRating: 4,
    tags: ["renewable", "sustainable", "eco-friendly"],
  },
]

const defaultOrders: Order[] = [
  {
    id: "ORD-2025-001",
    date: new Date(2025, 3, 20),
    status: "delivered",
    items: [
      {
        product: defaultProducts[0],
        quantity: 1,
      },
    ],
    total: 25,
    trackingId: "TRK123456789",
  },
  {
    id: "ORD-2025-002",
    date: new Date(2025, 3, 25),
    status: "shipped",
    items: [
      {
        product: defaultProducts[2],
        quantity: 1,
      },
      {
        product: defaultProducts[4],
        quantity: 1,
      },
    ],
    total: 52,
    trackingId: "TRK987654321",
  },
]

const PharmacyContext = createContext<PharmacyContextType | undefined>(undefined)

export function PharmacyProvider({ children }: { children: React.ReactNode }) {
  const [products] = useState<Product[]>(defaultProducts)
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>(defaultOrders)

  // Load cart and orders from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("enviromind_pharmacy_cart")
    const savedOrders = localStorage.getItem("enviromind_pharmacy_orders")

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse saved cart data")
      }
    }

    if (savedOrders) {
      try {
        // Convert string dates back to Date objects
        const parsedOrders = JSON.parse(savedOrders, (key, value) => {
          if (key === "date") return new Date(value)
          return value
        })
        setOrders(parsedOrders)
      } catch (e) {
        console.error("Failed to parse saved orders data")
      }
    }
  }, [])

  // Save cart and orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("enviromind_pharmacy_cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem("enviromind_pharmacy_orders", JSON.stringify(orders))
  }, [orders])

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

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev])
    // Clear cart after order is placed
    setCart([])
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  return (
    <PharmacyContext.Provider
      value={{
        products,
        cart,
        orders,
        addToCart,
        updateQuantity,
        removeFromCart,
        addOrder,
        calculateTotal,
      }}
    >
      {children}
    </PharmacyContext.Provider>
  )
}

export function usePharmacyContext() {
  const context = useContext(PharmacyContext)
  if (context === undefined) {
    throw new Error("usePharmacyContext must be used within a PharmacyProvider")
  }
  return context
}

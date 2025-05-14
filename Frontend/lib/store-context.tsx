"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define types for our store items
export interface Product {
  id: string | number
  name: string
  description: string
  price: number
  image: string
  category: string
  unit?: string
  farm?: string
  distance?: string
  rating?: number
  organic?: boolean
  sustainabilityScore?: number
  quantity?: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  date: string
  products: CartItem[]
  total: number
  status: "processing" | "shipped" | "delivered"
  estimatedDelivery?: string
  trackingNumber?: string
}

interface StoreContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string | number) => void
  updateQuantity: (productId: string | number, quantity: number) => void
  clearCart: () => void
  orders: Order[]
  addOrder: (order: Order) => void
  wishlist: (string | number)[]
  toggleWishlist: (productId: string | number) => void
  cartTotal: number
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [wishlist, setWishlist] = useState<(string | number)[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Calculate total cost of items in cart
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Load state from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("enviromind_cart")
      const savedOrders = localStorage.getItem("enviromind_orders")
      const savedWishlist = localStorage.getItem("enviromind_wishlist")

      if (savedCart) setCart(JSON.parse(savedCart))
      if (savedOrders) setOrders(JSON.parse(savedOrders))
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist))

      setIsInitialized(true)
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      localStorage.setItem("enviromind_cart", JSON.stringify(cart))
      localStorage.setItem("enviromind_orders", JSON.stringify(orders))
      localStorage.setItem("enviromind_wishlist", JSON.stringify(wishlist))
    }
  }, [cart, orders, wishlist, isInitialized])

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
  const removeFromCart = (productId: string | number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  // Update quantity function
  const updateQuantity = (productId: string | number, quantity: number) => {
    if (quantity < 1) return

    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  // Clear cart function
  const clearCart = () => {
    setCart([])
  }

  // Add order function
  const addOrder = (order: Order) => {
    setOrders((prevOrders) => [order, ...prevOrders])
  }

  // Toggle wishlist function
  const toggleWishlist = (productId: string | number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        orders,
        addOrder,
        wishlist,
        toggleWishlist,
        cartTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}

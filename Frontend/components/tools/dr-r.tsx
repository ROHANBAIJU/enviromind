"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  MessageSquare,
  Send,
  ShoppingCart,
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
  Share2,
  MoreVertical,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePharmacyContext } from "@/lib/pharmacy-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DrRToolProps {
  onClose: () => void
}

interface Message {
  id: string
  sender: "user" | "dr-r"
  content: string
  timestamp: Date
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  ecoRating: number
  tags: string[]
}

interface CartItem {
  product: Product
  quantity: number
}

interface Order {
  id: string
  date: Date
  status: "processing" | "shipped" | "delivered"
  items: CartItem[]
  total: number
  trackingId?: string
}

export default function DrRTool({ onClose }: DrRToolProps) {
  const [activeTab, setActiveTab] = useState("chat")
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const { cart, addToCart, updateQuantity, removeFromCart, orders, addOrder, products, calculateTotal } =
    usePharmacyContext()

  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [trackingIdSearch, setTrackingIdSearch] = useState("")
  const [trackingResult, setTrackingResult] = useState<Order | null>(null)
  const [chatSessions, setChatSessions] = useState<
    Array<{
      id: string
      title: string
      messages: Message[]
      createdAt: Date
    }>
  >([
    {
      id: "initial",
      title: "Welcome Conversation",
      messages: [],
      createdAt: new Date(),
    },
  ])
  const [activeChatId, setActiveChatId] = useState("initial")

  useEffect(() => {
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0)
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, newUserMessage]
    setMessages(updatedMessages)
    setInputMessage("")
    setIsTyping(true)

    // Update the chat session with the new message
    setChatSessions((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: updatedMessages,
              title: inputMessage.length > 20 ? inputMessage.substring(0, 20) + "..." : inputMessage,
            }
          : chat,
      ),
    )

    try {
      // Make API call to Flask backend
      const response = await fetch("http://127.0.0.1:5000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()

      // Create Dr. R's response message
      const newDrRMessage: Message = {
        id: Date.now().toString(),
        sender: "dr-r",
        content: data.message,
        timestamp: new Date(),
      }

      const finalMessages = [...updatedMessages, newDrRMessage]
      setMessages(finalMessages)

      // Update the chat session with Dr. R's response
      setChatSessions((prev) =>
        prev.map((chat) => (chat.id === activeChatId ? { ...chat, messages: finalMessages } : chat)),
      )
    } catch (error) {
      console.error("Error calling chatbot API:", error)

      // Show error message in chat
      const errorMessage: Message = {
        id: Date.now().toString(),
        sender: "dr-r",
        content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
        timestamp: new Date(),
      }

      const finalMessages = [...updatedMessages, errorMessage]
      setMessages(finalMessages)

      // Update the chat session with the error message
      setChatSessions((prev) =>
        prev.map((chat) => (chat.id === activeChatId ? { ...chat, messages: finalMessages } : chat)),
      )

      // Show toast notification
      toast({
        title: "Connection Error",
        description: "Could not connect to Dr. R's backend service.",
        variant: "destructive",
      })
    } finally {
      setIsTyping(false)
    }
  }

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the parent onClick

    // Don't delete if it's the only chat
    if (chatSessions.length <= 1) {
      toast({
        title: "Cannot Delete",
        description: "You need to have at least one chat session.",
        variant: "destructive",
      })
      return
    }

    // Filter out the chat to delete
    const updatedSessions = chatSessions.filter((chat) => chat.id !== chatId)
    setChatSessions(updatedSessions)

    // If the active chat is being deleted, switch to another chat
    if (chatId === activeChatId) {
      const newActiveChat = updatedSessions[0]
      setActiveChatId(newActiveChat.id)
      setMessages(newActiveChat.messages)
    }

    toast({
      title: "Chat Deleted",
      description: "The chat session has been deleted.",
      variant: "default",
    })
  }

  const handleShareChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the parent onClick

    // Find the chat to share
    const chatToShare = chatSessions.find((chat) => chat.id === chatId)

    if (chatToShare) {
      // Format the chat content for sharing
      const formattedChat = chatToShare.messages
        .map((msg) => {
          const sender = msg.sender === "user" ? "You" : "Dr. R"
          const time = msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          return `${sender} (${time}): ${msg.content}`
        })
        .join("\n\n")

      // Copy to clipboard
      navigator.clipboard
        .writeText(formattedChat)
        .then(() => {
          toast({
            title: "Chat Copied to Clipboard",
            description: "You can now paste and share the conversation.",
            variant: "success",
          })
        })
        .catch((err) => {
          console.error("Failed to copy chat: ", err)
          toast({
            title: "Failed to Copy",
            description: "Could not copy the chat to clipboard.",
            variant: "destructive",
          })
        })
    }
  }

  const handleAddToCart = (product: Product) => {
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

  useEffect(() => {
    // Load chat sessions from localStorage
    const savedSessions = localStorage.getItem("drRChatSessions")
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions)
        // Convert string dates back to Date objects
        const sessionsWithDates = parsedSessions.map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          messages: session.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }))
        setChatSessions(sessionsWithDates)

        // Set active chat to the most recent one
        if (sessionsWithDates.length > 0) {
          const mostRecentChat = sessionsWithDates.sort(
            (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )[0]
          setActiveChatId(mostRecentChat.id)
          setMessages(mostRecentChat.messages)
        }
      } catch (error) {
        console.error("Error parsing saved chat sessions:", error)
      }
    }
  }, [])

  // Save chat sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("drRChatSessions", JSON.stringify(chatSessions))
  }, [chatSessions])

  useEffect(() => {
    // Only initialize if there are no messages (first load)
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "dr-r",
          content: "Hello! I'm Dr. R, your sustainable lifestyle consultant. How can I help you today?",
          timestamp: new Date(),
        },
      ])
    }
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/dashboard")}
          className="hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 focus:border-green-500 focus:ring-green-500 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <h1 className="text-3xl font-bold">Dr. R</h1>
      </div>

      <Tabs defaultValue="chat" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger
            value="chat"
            className="hover:border-purple-600 data-[state=active]:border-purple-600 border-transparent border-2 transition-colors"
          >
            AI Consultation
          </TabsTrigger>
          <TabsTrigger
            value="pharmacy"
            className="hover:border-purple-600 data-[state=active]:border-purple-600 border-transparent border-2 transition-colors"
          >
            Eco Pharmacy
          </TabsTrigger>
          <TabsTrigger
            value="cart"
            className="hover:border-purple-600 data-[state=active]:border-purple-600 border-transparent border-2 transition-colors"
          >
            Cart
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="hover:border-purple-600 data-[state=active]:border-purple-600 border-transparent border-2 transition-colors"
          >
            Orders
          </TabsTrigger>
          <TabsTrigger
            value="tracking"
            className="hover:border-purple-600 data-[state=active]:border-purple-600 border-transparent border-2 transition-colors"
          >
            Track Order
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="mt-6">
          <Card className="h-[600px] flex flex-col border-magenta-500 dark:border-magenta-700">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-magenta-500" />
                Chat with Dr. R
              </CardTitle>
              <CardDescription>Your AI consultant for sustainable living and health</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden p-0">
              <div className="flex h-full">
                {/* Chat History Sidebar */}
                <div className="w-64 border-r border-magenta-200 dark:border-magenta-800 h-full flex flex-col">
                  <div className="p-3 border-b border-magenta-200 dark:border-magenta-800">
                    <Button
                      onClick={() => {
                        const newChatId = Date.now().toString()
                        setChatSessions((prev) => [
                          ...prev,
                          {
                            id: newChatId,
                            title: "New Conversation",
                            messages: [
                              {
                                id: "welcome",
                                sender: "dr-r",
                                content:
                                  "Hello! I'm Dr. R, your sustainable lifestyle consultant. How can I help you today?",
                                timestamp: new Date(),
                              },
                            ],
                            createdAt: new Date(),
                          },
                        ])
                        setActiveChatId(newChatId)
                        setMessages([
                          {
                            id: "welcome",
                            sender: "dr-r",
                            content:
                              "Hello! I'm Dr. R, your sustainable lifestyle consultant. How can I help you today?",
                            timestamp: new Date(),
                          },
                        ])
                      }}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white border-2 border-purple-500 hover:border-blue-500 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" /> New Chat
                    </Button>
                  </div>
                  <ScrollArea className="flex-grow">
                    <div className="p-2 space-y-1">
                      {chatSessions.map((chat) => (
                        <div
                          key={chat.id}
                          onClick={() => {
                            setActiveChatId(chat.id)
                            setMessages(chat.messages)
                          }}
                          className={`p-2 rounded-md cursor-pointer flex items-start gap-2 text-sm border-2 transition-colors group relative ${
                            activeChatId === chat.id
                              ? "bg-magenta-100 dark:bg-magenta-900/40 text-magenta-900 dark:text-magenta-100 border-purple-500 dark:border-purple-500"
                              : "border-transparent hover:border-purple-600 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                          }`}
                        >
                          <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div className="overflow-hidden flex-grow">
                            <div className="font-medium truncate">{chat.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {chat.createdAt.toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className="flex items-center gap-2 text-sm cursor-pointer"
                                onClick={(e) => handleShareChat(chat.id, e as React.MouseEvent)}
                              >
                                <Share2 className="h-4 w-4 text-purple-600" />
                                <span>Share Chat</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="flex items-center gap-2 text-sm cursor-pointer text-red-600 focus:text-red-600"
                                onClick={(e) => handleDeleteChat(chat.id, e as React.MouseEvent)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete Chat</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Chat Area */}
                <div className="flex-grow flex flex-col h-full">
                  <ScrollArea className="flex-grow p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === "user" ? "bg-purple-600 text-white" : "bg-slate-200 dark:bg-slate-800"
                            }`}
                          >
                            {message.sender === "dr-r" && (
                              <div className="flex items-center gap-2 mb-1">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src="/dricon.jpg?height=24&width=24" alt="Dr. R" />
                                  <AvatarFallback className="bg-magenta-100 text-magenta-800">DR</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-sm">Dr. R</span>
                              </div>
                            )}
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs text-right mt-1 opacity-70">
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="max-w-[80%] rounded-lg p-3 bg-slate-200 dark:bg-slate-800">
                            <div className="flex items-center gap-2 mb-1">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src="/dricon.jpg?height=24&width=24" alt="Dr. R" />
                                <AvatarFallback className="bg-magenta-100 text-magenta-800">DR</AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-sm">Dr. R</span>
                            </div>
                            <div className="flex gap-1">
                              <span className="animate-bounce">•</span>
                              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                                •
                              </span>
                              <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                                •
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t border-magenta-200 dark:border-magenta-800">
                    <div className="flex w-full gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSendMessage()
                        }}
                        className="border-magenta-300 focus:ring-magenta-500 focus:border-magenta-500"
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-600/30 border-0 transition-all duration-200"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Personal Care">Personal Care</SelectItem>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Tech">Tech</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
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
                  <Button onClick={() => handleAddToCart(product)} className="w-full bg-purple-600 hover:bg-purple-700">
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
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <div className="h-8 px-3 flex items-center justify-center border-y">{item.quantity}</div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-100"
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
                  <Button variant="outline" onClick={() => setActiveTab("pharmacy")}>
                    Continue Shopping
                  </Button>
                </div>
              )}
            </CardContent>
            {cart.length > 0 && (
              <CardFooter>
                <Button onClick={handleCheckout} className="w-full bg-purple-600 hover:bg-purple-700">
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
                  <Button variant="outline" onClick={() => setActiveTab("pharmacy")}>
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
                    className="flex-grow"
                  />
                  <Button onClick={handleTrackOrder} className="bg-purple-600 hover:bg-purple-700">
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

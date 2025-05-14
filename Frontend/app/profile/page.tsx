"use client"

import type React from "react"

import { useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Camera, Check, Edit, Globe, Lock, Mail, MapPin, Save, Shield, User } from "lucide-react"
import { useRouter } from "next/navigation"

// Create a user context to share user data across components
import { createContext, useContext, useEffect } from "react"

// Define the user profile schema
const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not be longer than 160 characters.",
  }),
  location: z.string().optional(),
  profession: z.string().optional(),
  interests: z.string().optional(),
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// Define the UserContext type
type UserContextType = {
  user: ProfileFormValues | null
  updateUser: (data: ProfileFormValues) => void
  profileImage: string
  updateProfileImage: (url: string) => void
}

// Create the context with a default value
export const UserContext = createContext<UserContextType>({
  user: null,
  updateUser: () => {},
  profileImage: "/abstract-profile.png",
  updateProfileImage: () => {},
})

// Custom hook to use the user context
export const useUser = () => useContext(UserContext)

const defaultValues: ProfileFormValues = {
  username: "arya_j",
  email: "arya@enviromind.org",
  bio: "Environmental enthusiast passionate about sustainable development and climate action.",
  location: "New York, USA",
  profession: "Environmental Scientist",
  interests: "Climate Change, Renewable Energy, Sustainable Agriculture",
  fullName: "Arya J",
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState<ProfileFormValues>(defaultValues)
  const [profileImage, setProfileImage] = useState("/abstract-profile.png")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: userData,
    mode: "onChange",
  })

  // Update form values when userData changes
  useEffect(() => {
    form.reset(userData)
  }, [form, userData])

  // Save user data to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("enviromind_user", JSON.stringify(userData))
      localStorage.setItem("enviromind_profile_image", profileImage)
    }
  }, [userData, profileImage])

  // Load user data from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("enviromind_user")
      const savedImage = localStorage.getItem("enviromind_profile_image")

      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser)
          setUserData(parsedUser)
        } catch (e) {
          console.error("Failed to parse saved user data")
        }
      }

      if (savedImage) {
        setProfileImage(savedImage)
      }
    }
  }, [])

  function onSubmit(data: ProfileFormValues) {
    // Update the user data
    setUserData(data)

    // Update the global state (would typically be done through a context or state management library)
    if (typeof window !== "undefined") {
      localStorage.setItem("enviromind_user", JSON.stringify(data))
    }

    setIsEditing(false)

    // Force a refresh to update the sidebar
    router.refresh()
  }

  function handleImageUpload() {
    // Trigger the hidden file input when the camera button is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      // Create a FileReader to read the selected image
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string
        if (imageDataUrl) {
          // Set the image data URL as the profile image
          setProfileImage(imageDataUrl)

          // Save to localStorage
          if (typeof window !== "undefined") {
            localStorage.setItem("enviromind_profile_image", imageDataUrl)
          }

          // Force a refresh to update the sidebar
          router.refresh()
        }
      }
      // Read the file as a data URL
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your public profile information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-4">
              <div className="relative mb-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback>{userData.fullName?.substring(0, 2) || "AJ"}</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-emerald-600 hover:bg-emerald-700 h-8 w-8"
                  onClick={handleImageUpload}
                >
                  <Camera className="h-4 w-4" />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  aria-label="Upload profile picture"
                />
              </div>
              <h2 className="text-xl font-bold">{userData.fullName}</h2>
              <p className="text-sm text-muted-foreground mb-2">@{userData.username}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{userData.location}</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge
                  variant="outline"
                  className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                >
                  {userData.profession}
                </Badge>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  SDG Champion
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                >
                  Top Contributor
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Impact Stats</CardTitle>
              <CardDescription>Your contribution to sustainability</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Tasks Completed</p>
                      <p className="text-2xl font-bold">128</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">SDGs Contributed</p>
                      <p className="text-2xl font-bold">9/17</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <User className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Member Since</p>
                      <p className="text-lg font-medium">March 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                  <CardDescription>Update your profile information visible to other users</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Full Name"
                                {...field}
                                disabled={!isEditing}
                                className={!isEditing ? "opacity-70" : ""}
                              />
                            </FormControl>
                            <FormDescription>Your full name as displayed on your profile.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="username"
                                  {...field}
                                  disabled={!isEditing}
                                  className={!isEditing ? "opacity-70" : ""}
                                />
                              </FormControl>
                              <FormDescription>This is your public display name.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="email@example.com"
                                  {...field}
                                  disabled={!isEditing}
                                  className={!isEditing ? "opacity-70" : ""}
                                />
                              </FormControl>
                              <FormDescription>Your email address for notifications.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about yourself"
                                className={`resize-none ${!isEditing ? "opacity-70" : ""}`}
                                disabled={!isEditing}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Brief description for your profile. Maximum 160 characters.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="City, Country"
                                  {...field}
                                  disabled={!isEditing}
                                  className={!isEditing ? "opacity-70" : ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="profession"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Profession</FormLabel>
                              <Select disabled={!isEditing} onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className={!isEditing ? "opacity-70" : ""}>
                                    <SelectValue placeholder="Select your profession" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Environmental Scientist">Environmental Scientist</SelectItem>
                                  <SelectItem value="Sustainability Consultant">Sustainability Consultant</SelectItem>
                                  <SelectItem value="Renewable Energy Engineer">Renewable Energy Engineer</SelectItem>
                                  <SelectItem value="Conservation Biologist">Conservation Biologist</SelectItem>
                                  <SelectItem value="Urban Planner">Urban Planner</SelectItem>
                                  <SelectItem value="Student">Student</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="interests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Interests</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Climate Change, Renewable Energy, etc."
                                {...field}
                                disabled={!isEditing}
                                className={!isEditing ? "opacity-70" : ""}
                              />
                            </FormControl>
                            <FormDescription>Comma-separated list of your sustainability interests.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  {isEditing && (
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="mr-2">
                      Cancel
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Manage your privacy preferences and data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Profile Visibility</p>
                          <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                        </div>
                      </div>
                      <Select defaultValue="public">
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="members">Members Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Email Visibility</p>
                          <p className="text-sm text-muted-foreground">Control who can see your email address</p>
                        </div>
                      </div>
                      <Select defaultValue="none">
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="members">Members Only</SelectItem>
                          <SelectItem value="none">No One</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Data Sharing</p>
                          <p className="text-sm text-muted-foreground">
                            Share your sustainability data with researchers
                          </p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Task Reminders</p>
                        <p className="text-sm text-muted-foreground">Get reminders for upcoming sustainability tasks</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SDG Updates</p>
                        <p className="text-sm text-muted-foreground">Receive updates on SDG progress and news</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Community Activity</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified about community events and activities
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Communications</p>
                        <p className="text-sm text-muted-foreground">Receive promotional content and offers</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

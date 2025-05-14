"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ReliableImageProps {
  src: string
  alt: string
  className?: string
}

export function ReliableImage({ src, alt, className = "" }: ReliableImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Reset states when src changes
  useEffect(() => {
    setImageSrc(src)
    setError(false)
    setLoaded(false)
  }, [src])

  const handleError = () => {
    setError(true)
    // Try fallback if PNG fails
    if (imageSrc.endsWith(".png")) {
      setImageSrc(imageSrc.replace(".png", ".jpg"))
    }
  }

  if (error && imageSrc.endsWith(".jpg")) {
    // If both PNG and JPG fail, use a direct img tag
    return (
      <div className={`relative aspect-video overflow-hidden rounded-lg ${className}`}>
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="w-full h-full object-contain bg-black"
          onError={(e) => {
            // If direct image fails, show a placeholder
            ;(e.target as HTMLImageElement).src = "/placeholder.svg?text=Image+Failed+to+Load"
          }}
        />
      </div>
    )
  }

  return (
    <div className={`relative aspect-video overflow-hidden rounded-lg ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-green-600 border-green-200"></div>
        </div>
      )}

      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        fill
        className={`object-contain bg-black ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        priority
      />

      {/* Fallback direct image (hidden) */}
      {error && (
        <img
          src={src.replace(".png", ".jpg") || "/placeholder.svg"}
          alt={alt}
          className="absolute inset-0 w-full h-full object-contain bg-black"
          style={{ display: loaded ? "none" : "block" }}
        />
      )}
    </div>
  )
}

"use client"

import { useState } from "react"

interface SimpleImageProps {
  src: string
  alt: string
  className?: string
}

export function SimpleImage({ src, alt, className = "" }: SimpleImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`relative aspect-video overflow-hidden rounded-lg ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-green-600 border-green-200"></div>
        </div>
      )}

      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={`w-full h-full object-contain bg-black ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true)
          // Try fallback if PNG fails
          if (src.endsWith(".png")) {
            const img = document.createElement("img")
            img.src = src.replace(".png", ".jpg")
            img.alt = alt
            img.className = "w-full h-full object-contain bg-black"
            const container = document.querySelector(`[data-image-container="${alt}"]`)
            if (container) {
              container.innerHTML = ""
              container.appendChild(img)
            }
          }
        }}
      />
    </div>
  )
}

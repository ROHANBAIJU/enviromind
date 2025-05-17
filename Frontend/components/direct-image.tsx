"use client"

import { useState, useEffect } from "react"

interface DirectImageProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
}

export function DirectImage({ src, alt, className = "", fallbackSrc }: DirectImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Reset states when src changes
    setImgSrc(src)
    setLoaded(false)
    setError(false)
  }, [src])

  const handleError = () => {
    setError(true)
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <img
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        className={`w-full h-full object-contain ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        onLoad={() => setLoaded(true)}
        onError={handleError}
      />
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-green-600 border-green-200"></div>
        </div>
      )}
      {error && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <p className="text-sm text-gray-500">Failed to load image</p>
        </div>
      )}
    </div>
  )
}

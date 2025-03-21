"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import Script from "next/script"

interface CustomWorldcoinProps {
  onSuccess: (result: any) => void
  onError?: (error: Error) => void
}

export function CustomWorldcoin({ onSuccess, onError }: CustomWorldcoinProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)
  const worldcoinButtonRef = useRef<HTMLDivElement>(null)
  const worldcoinInitialized = useRef(false)
  const initAttempts = useRef(0)

  // This function will attempt to initialize Worldcoin
  const initializeWorldcoin = () => {
    if (!worldcoinButtonRef.current) {
      setDebugInfo("Button ref not available yet")
      return
    }

    if (worldcoinInitialized.current) {
      setDebugInfo("Already initialized")
      return
    }

    if (typeof window === "undefined") {
      setDebugInfo("Window not available (server-side)")
      return
    }

    if (!window.worldcoinIdKit) {
      // If we've tried too many times, show an error
      if (initAttempts.current > 10) {
        setError("Worldcoin verification failed to load. Please refresh the page and try again.")
        setIsLoading(false)
        return
      }

      setDebugInfo(`Worldcoin not available yet. Attempt: ${initAttempts.current + 1}`)
      initAttempts.current += 1
      // Try again in a second
      setTimeout(initializeWorldcoin, 1000)
      return
    }

    try {
      setDebugInfo("Initializing Worldcoin...")
      worldcoinInitialized.current = true

      // Create a button element
      const button = document.createElement("button")
      button.className =
        "w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
      button.textContent = "Verify with Worldcoin"

      // Clear any existing content
      if (worldcoinButtonRef.current) {
        worldcoinButtonRef.current.innerHTML = ""
        worldcoinButtonRef.current.appendChild(button)
      }

      // Initialize the Worldcoin IDKit
      window.worldcoinIdKit.init({
        app_id: "app_staging_90a3f94d9e5c9c6b5c7a6c9d6c3f9c6b", // Replace with your actual app ID
        action: "vote",
        signal: "vote_signal",
        enableTelemetry: true,
        onSuccess: (result: any) => {
          setDebugInfo("Verification successful")
          onSuccess(result)
        },
        onError: (error: Error) => {
          console.error("Worldcoin verification error:", error)
          setDebugInfo(`Verification error: ${error.message}`)
          setError("Verification failed. Please try again.")
          onError?.(error)
        },
      })

      // Attach click handler to the button
      button.addEventListener("click", () => {
        setDebugInfo("Button clicked, opening Worldcoin")
        try {
          window.worldcoinIdKit.open()
        } catch (err) {
          console.error("Error opening Worldcoin:", err)
          setDebugInfo(`Error opening Worldcoin: ${err instanceof Error ? err.message : String(err)}`)
          setError("Failed to open Worldcoin verification. Please try again.")
        }
      })

      setIsLoading(false)
      setDebugInfo("Initialization complete")
    } catch (err) {
      console.error("Error initializing Worldcoin:", err)
      setDebugInfo(`Initialization error: ${err instanceof Error ? err.message : String(err)}`)
      setError("Failed to initialize Worldcoin verification. Please refresh and try again.")
      onError?.(err instanceof Error ? err : new Error(String(err)))
      setIsLoading(false)
    }
  }

  // Handle script load event
  const handleScriptLoad = () => {
    setScriptLoaded(true)
    setDebugInfo("Script loaded successfully")
    // Give a small delay to ensure the script is fully initialized
    setTimeout(initializeWorldcoin, 500)
  }

  // Handle script error
  const handleScriptError = () => {
    console.error("Failed to load Worldcoin script")
    setDebugInfo("Script failed to load")
    setError("Failed to load Worldcoin verification. Please check your internet connection and try again.")
    setIsLoading(false)
  }

  // Try to initialize when the component mounts or when the script loads
  useEffect(() => {
    if (scriptLoaded) {
      initializeWorldcoin()
    }
  }, [scriptLoaded])

  // Manual retry function
  const handleRetry = () => {
    setError(null)
    setIsLoading(true)
    setDebugInfo("Retrying...")
    initAttempts.current = 0

    // Force reload the script
    const oldScript = document.querySelector('script[src="https://cdn.worldcoin.org/js/idkit.js"]')
    if (oldScript) {
      oldScript.remove()
    }

    // Create a new script element
    const script = document.createElement("script")
    script.src = "https://cdn.worldcoin.org/js/idkit.js"
    script.async = true
    script.onload = handleScriptLoad
    script.onerror = handleScriptError
    document.head.appendChild(script)
  }

  return (
    <div className="w-full">
      <Script
        src="https://cdn.worldcoin.org/js/idkit.js"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
        strategy="afterInteractive"
      />

      {isLoading && (
        <Button disabled className="w-full">
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
          Loading Worldcoin...
        </Button>
      )}

      {error && (
        <div className="space-y-4 mt-2">
          <div className="rounded-lg bg-destructive/15 p-3 text-center text-sm text-destructive">{error}</div>
          <Button onClick={handleRetry} variant="outline" className="w-full">
            Retry Loading
          </Button>
        </div>
      )}

      <div ref={worldcoinButtonRef} className={isLoading || error ? "hidden" : "block"}></div>

      {/* Debug information - remove in production */}
      {debugInfo && (
        <div className="mt-4 p-2 text-xs text-muted-foreground bg-muted rounded-md">
          <details>
            <summary>Debug Info</summary>
            <pre className="whitespace-pre-wrap">{debugInfo}</pre>
          </details>
        </div>
      )}
    </div>
  )
}

// Add the worldcoinIdKit to the Window interface
declare global {
  interface Window {
    worldcoinIdKit: {
      init: (options: any) => void
      open: () => void
    }
  }
}


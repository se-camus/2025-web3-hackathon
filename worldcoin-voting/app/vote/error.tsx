"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Vote page error:", error)
  }, [error])

  return (
    <div className="container max-w-md py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Error Loading Vote Page</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            We encountered an error while loading the voting interface. This might be due to an issue with the Worldcoin
            integration.
          </p>
          <div className="bg-muted p-3 rounded-md overflow-auto text-xs">
            <p>{error.message}</p>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={reset} className="flex-1">
            Try Again
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = "/")} className="flex-1">
            Go Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}


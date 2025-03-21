"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

interface MockVerificationProps {
  onSuccess: (result: any) => void
}

export function MockVerification({ onSuccess }: MockVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerify = async () => {
    setIsVerifying(true)

    // Simulate verification delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate a mock verification result
    const mockResult = {
      merkle_root:
        "0x" +
        Array(64)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join(""),
      nullifier_hash:
        "0x" +
        Array(64)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join(""),
      proof:
        "0x" +
        Array(128)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join(""),
      verification_level: "device",
      action: "vote",
      signal: "vote_signal",
    }

    onSuccess(mockResult)
    setIsVerifying(false)
  }

  return (
    <div className="space-y-4 w-full">
      <Alert className="bg-amber-50 border-amber-200">
        <InfoIcon className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-600">
          Using mock verification for testing. In production, this would use real Worldcoin verification.
        </AlertDescription>
      </Alert>

      <Button onClick={handleVerify} disabled={isVerifying} className="w-full">
        {isVerifying ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
            Verifying...
          </>
        ) : (
          "Simulate Verification"
        )}
      </Button>
    </div>
  )
}


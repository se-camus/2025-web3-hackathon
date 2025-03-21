"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CustomWorldcoin } from "@/components/custom-worldcoin"
import { MockVerification } from "@/components/mock-verification"
import { verifyProof } from "@/lib/worldcoin"
import { saveVote } from "@/lib/vote-service"

// Set this to false to use real Worldcoin verification
// Set to true to use mock verification for testing
const USE_MOCK_VERIFICATION = true

export default function VotePage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [isVerified, setIsVerified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleProofSuccess = async (result: any) => {
    try {
      // Verify the proof with Worldcoin
      const verified = await verifyProof(result)

      if (verified) {
        setIsVerified(true)
        setError(null)
      } else {
        setError("Verification failed. Please try again.")
      }
    } catch (err) {
      setError("An error occurred during verification.")
      console.error(err)
    }
  }

  const handleVoteSubmit = async () => {
    if (!isVerified) {
      setError("Please verify your identity with Worldcoin first.")
      return
    }

    if (!selectedOption) {
      setError("Please select an option to vote.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Save the vote
      await saveVote(selectedOption)
      router.push("/results?success=true")
    } catch (err: any) {
      if (err.message === "ALREADY_VOTED") {
        setError("You have already voted in this election.")
      } else {
        setError("Failed to submit your vote. Please try again.")
      }
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-md py-12">
      <Card>
        <CardHeader>
          <CardTitle>Cast Your Vote</CardTitle>
          <CardDescription>Vote on the current proposal. Each person can only vote once.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isVerified ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-center text-sm text-muted-foreground">
                First, verify your identity with Worldcoin to ensure you're a unique human.
              </p>
              {USE_MOCK_VERIFICATION ? (
                <MockVerification onSuccess={handleProofSuccess} />
              ) : (
                <CustomWorldcoin onSuccess={handleProofSuccess} />
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-3 text-center text-sm text-muted-foreground">
                ✓ Identity verified. You can now vote.
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Current Proposal: Community Fund Allocation</h3>
                <p className="text-sm text-muted-foreground">
                  How should we allocate the community fund for the next quarter?
                </p>
              </div>
              <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                <div className="flex items-center space-x-2 rounded-lg border p-3 transition-colors hover:bg-accent">
                  <RadioGroupItem value="infrastructure" id="infrastructure" />
                  <Label htmlFor="infrastructure" className="flex-1 cursor-pointer">
                    Infrastructure Development
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 transition-colors hover:bg-accent">
                  <RadioGroupItem value="education" id="education" />
                  <Label htmlFor="education" className="flex-1 cursor-pointer">
                    Education Programs
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 transition-colors hover:bg-accent">
                  <RadioGroupItem value="research" id="research" />
                  <Label htmlFor="research" className="flex-1 cursor-pointer">
                    Research Grants
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 transition-colors hover:bg-accent">
                  <RadioGroupItem value="community" id="community" />
                  <Label htmlFor="community" className="flex-1 cursor-pointer">
                    Community Events
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-destructive/15 p-3 text-center text-sm text-destructive">{error}</div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleVoteSubmit}
            disabled={!isVerified || !selectedOption || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit Vote"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}


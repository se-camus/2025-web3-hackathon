"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"
import { getVoteResults } from "@/lib/vote-service"

interface VoteResult {
  option: string
  count: number
  percentage: number
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const showSuccess = searchParams.get("success") === "true"
  const [results, setResults] = useState<VoteResult[]>([])
  const [totalVotes, setTotalVotes] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getVoteResults()
        setResults(data.results)
        setTotalVotes(data.totalVotes)
      } catch (error) {
        console.error("Failed to fetch results:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchResults, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container max-w-2xl py-12">
      {showSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">
            Your vote has been successfully recorded. Thank you for participating!
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Voting Results</CardTitle>
          <CardDescription>
            Current results for the Community Fund Allocation proposal.
            {totalVotes > 0 && ` Total votes: ${totalVotes}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-6">
              {results.map((result) => (
                <div key={result.option} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {result.option === "infrastructure" && "Infrastructure Development"}
                      {result.option === "education" && "Education Programs"}
                      {result.option === "research" && "Research Grants"}
                      {result.option === "community" && "Community Events"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {result.count} votes ({result.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full bg-primary" style={{ width: `${result.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-muted-foreground">No votes have been cast yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


/**
 * Service for handling votes and results
 */

interface VoteResult {
  option: string
  count: number
  percentage: number
}

interface VoteResults {
  results: VoteResult[]
  totalVotes: number
}

/**
 * Saves a vote to the database
 *
 * @param option The selected voting option
 * @returns Promise<void>
 * @throws Error if the user has already voted or if there's a server error
 */
export async function saveVote(option: string): Promise<void> {
  try {
    const response = await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ option }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to save vote")
    }
  } catch (error) {
    console.error("Error saving vote:", error)
    throw error
  }
}

/**
 * Gets the current voting results
 *
 * @returns Promise<VoteResults> The current voting results
 */
export async function getVoteResults(): Promise<VoteResults> {
  try {
    // In a real application, this would fetch from your API
    // For demo purposes, we're returning mock data

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock data
    const mockResults: VoteResult[] = [
      { option: "infrastructure", count: 42, percentage: 42 },
      { option: "education", count: 28, percentage: 28 },
      { option: "research", count: 18, percentage: 18 },
      { option: "community", count: 12, percentage: 12 },
    ]

    const totalVotes = mockResults.reduce((sum, result) => sum + result.count, 0)

    return {
      results: mockResults,
      totalVotes,
    }
  } catch (error) {
    console.error("Error fetching vote results:", error)
    return {
      results: [],
      totalVotes: 0,
    }
  }
}


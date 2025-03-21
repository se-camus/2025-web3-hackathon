import { type NextRequest, NextResponse } from "next/server"

// In a real application, this would be stored in a database
// For this example, we'll use a Map to store nullifier hashes
const votedNullifiers = new Map<string, string>()

/**
 * API route to handle vote submissions
 */
export async function POST(request: NextRequest) {
  try {
    const { option } = await request.json()

    if (!option) {
      return NextResponse.json({ success: false, message: "Option is required" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Get the nullifier hash from the verified Worldcoin proof
    // 2. Check if this nullifier has already voted
    // 3. Store the vote in your database

    // For this example, we'll simulate this process
    // Generate a random "nullifier" based on the user's session
    const cookies = request.cookies.getAll()
    const sessionId =
      cookies.find((c) => c.name === "next-auth.session-token")?.value ||
      request.headers.get("x-forwarded-for") ||
      Math.random().toString(36).substring(2)

    // Check if this "user" has already voted
    if (votedNullifiers.has(sessionId)) {
      return NextResponse.json({ success: false, message: "ALREADY_VOTED" }, { status: 409 })
    }

    // Record the vote
    votedNullifiers.set(sessionId, option)

    // Return success response
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing vote:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

/**
 * API route to get voting results
 */
export async function GET() {
  try {
    // Count votes by option
    const voteCounts = new Map<string, number>()

    for (const option of votedNullifiers.values()) {
      voteCounts.set(option, (voteCounts.get(option) || 0) + 1)
    }

    const totalVotes = votedNullifiers.size

    // Format results
    const results = [
      { option: "infrastructure", count: voteCounts.get("infrastructure") || 0 },
      { option: "education", count: voteCounts.get("education") || 0 },
      { option: "research", count: voteCounts.get("research") || 0 },
      { option: "community", count: voteCounts.get("community") || 0 },
    ].map((result) => ({
      ...result,
      percentage: totalVotes > 0 ? (result.count / totalVotes) * 100 : 0,
    }))

    return NextResponse.json({
      results,
      totalVotes,
    })
  } catch (error) {
    console.error("Error getting vote results:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}


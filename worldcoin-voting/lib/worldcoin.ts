/**
 * Utility functions for Worldcoin verification
 */

// Define the success result interface locally
interface VerificationResult {
  merkle_root?: string
  nullifier_hash?: string
  proof?: string
  verification_level?: string
  action?: string
  signal?: string
  [key: string]: any
}

/**
 * Verifies a Worldcoin proof to ensure the user is a unique human
 *
 * @param result The success result object from IDKit
 * @returns Promise<boolean> Whether the proof is valid
 */
export async function verifyProof(result: VerificationResult): Promise<boolean> {
  try {
    // In a production environment, you would verify this on your backend
    // using the Worldcoin API
    const response = await fetch("/api/verify-worldcoin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    })

    if (!response.ok) {
      throw new Error("Verification failed")
    }

    const data = await response.json()
    return data.success
  } catch (error) {
    console.error("Error verifying Worldcoin proof:", error)
    return false
  }
}


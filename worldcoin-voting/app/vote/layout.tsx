import type React from "react"
import { ErrorBoundary } from "@/components/error-boundary"

export default function VoteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ErrorBoundary>{children}</ErrorBoundary>
}


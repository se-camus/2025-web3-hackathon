import Link from "next/link"
import { CheckCircle, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Electoral <span className="text-primary">Voting</span> Portal
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
            Your secure gateway to participate in the democratic process. Select an option below to continue.
          </p>
        </div>

        <div className="grid w-full max-w-3xl gap-8 sm:grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-8 shadow-sm transition-all hover:shadow-md">
            <div className="rounded-full bg-primary/10 p-4">
              <UserCheck className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">I have never voted</h2>
            <p className="text-center text-muted-foreground">
              First-time voter? Get verified to participate in the electoral process.
            </p>
            <Button size="lg" className="mt-4 w-full">
              Get Verified
            </Button>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-8 shadow-sm transition-all hover:shadow-md">
            <div className="rounded-full bg-primary/10 p-4">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">I have been verified</h2>
            <p className="text-center text-muted-foreground">
              Already verified? Proceed to cast your vote in the current election.
            </p>
            <Button size="lg" className="mt-4 w-full">
              Vote Now
            </Button>
          </div>
        </div>

        <footer className="mt-8 text-sm text-muted-foreground">
          <p>Secure • Accessible • Transparent</p>
          <div className="mt-2 flex gap-4 justify-center">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/help" className="hover:underline">
              Help
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
          </div>
        </footer>
      </div>
    </main>
  )
}


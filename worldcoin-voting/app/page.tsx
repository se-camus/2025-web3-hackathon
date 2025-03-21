import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">SecureVote</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/vote">
              <Button variant="ghost">Vote</Button>
            </Link>
            <Link href="/results">
              <Button variant="ghost">Results</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Secure Voting with Worldcoin
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A decentralized voting platform that ensures each person can only vote once using Worldcoin's proof
                    of personhood technology.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/vote">
                    <Button size="lg" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <Card className="overflow-hidden">
                <CardHeader className="pb-0">
                  <CardTitle>How It Works</CardTitle>
                  <CardDescription>
                    Our platform uses Worldcoin to verify your unique identity without revealing personal information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div className="grid gap-1">
                      <h3 className="text-lg font-semibold">Verify with Worldcoin</h3>
                      <p className="text-sm text-muted-foreground">
                        Authenticate using World ID to prove you're a unique human.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div className="grid gap-1">
                      <h3 className="text-lg font-semibold">Cast Your Vote</h3>
                      <p className="text-sm text-muted-foreground">
                        Submit your vote on the current proposal securely.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div className="grid gap-1">
                      <h3 className="text-lg font-semibold">View Results</h3>
                      <p className="text-sm text-muted-foreground">
                        See real-time voting results with confidence in their integrity.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Your privacy is protected. We only verify uniqueness, not identity.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 SecureVote. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}


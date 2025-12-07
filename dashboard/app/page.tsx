import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, Shield, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">ProjectSupportToolkit</h1>
          <div className="flex gap-4">
            <Link href="/login">
              <Button asChild variant="ghost">
                <span>Login</span>
              </Button>
            </Link>
            <Link href="/signup">
              <Button asChild>
                <span>Get Started</span>
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl space-y-10 text-center">
          <div className="space-y-6">
            <h2 className="text-balance text-5xl font-bold leading-tight">
              Collect Customer Feedback at Scale
            </h2>
            <p className="text-pretty text-xl text-muted-foreground">
              Multi-tenant SaaS platform for managing customer feedback. Each
              partner gets secure access to their own feedback data.
            </p>

            <Link href="/signup">
              <Button size="lg" asChild>
                <span>Start Free Trial</span>
              </Button>
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <MessageSquare className="mx-auto h-12 w-12 text-primary" />
                <CardTitle>Easy Integration</CardTitle>
                <CardDescription>
                  Add one script to your site and you’re live.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="mx-auto h-12 w-12 text-primary" />
                <CardTitle>Secure & Isolated</CardTitle>
                <CardDescription>
                  Row-level security ensures partners only see their own data.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="mx-auto h-12 w-12 text-primary" />
                <CardTitle>Real-time Dashboard</CardTitle>
                <CardDescription>
                  See your feedbacks instantly with powerful tools.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="rounded-lg border bg-card p-8 text-left">
            <h3 className="mb-4 text-2xl font-bold">Quick Integration</h3>
            <p className="mb-4 text-muted-foreground">
              Add this single line of code to your website to start collecting
              feedback:
            </p>
            <div className="rounded-md bg-muted p-4 font-mono text-sm">
              <code className="text-foreground">
                {
                  '<script src="https://partner-support-toolkit.vercel.app/widget.js" data-key="your-key"></script>'
                }
              </code>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Replace <span className="font-semibold">your-key</span> with your
              unique API key from the dashboard.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-8 text-left">
            <h3 className="mb-4 text-2xl font-bold">How It Works</h3>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  1
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    Sign Up as a Partner
                  </p>
                  <p className="text-sm">
                    Create your company account and get your unique script
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  2
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    Embed the Widget
                  </p>
                  <p className="text-sm">
                    Add our feedback widget to your website
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  3
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    View Your Dashboard
                  </p>
                  <p className="text-sm">
                    Access all feedbacks from your users in one secure place
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

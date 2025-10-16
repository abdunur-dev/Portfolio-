import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function CheckEmailPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-black">
      <div className="w-full max-w-sm">
        <Card className="border-zinc-800 bg-zinc-950">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Check Your Email</CardTitle>
            <CardDescription className="text-zinc-400">
              We sent you a confirmation link. Please check your email to complete the signup process.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/auth/login" className="text-orange-500 hover:text-orange-400 text-sm">
              Back to login
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function AdminHeader() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="text-xl font-bold">
          abdu<span className="text-orange-500">{"{admin}"}</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" className="text-zinc-400 hover:text-white">
              View Site
            </Button>
          </Link>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-zinc-800 text-white hover:bg-zinc-900 bg-transparent"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AdminLink() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
    }
    checkAuth()
  }, [])

  if (!isAuthenticated) return null

  return (
    <Link href="/admin" className="fixed bottom-6 right-6 z-50">
      <Button className="bg-orange-500 hover:bg-orange-600 shadow-lg">Admin Panel</Button>
    </Link>
  )
}

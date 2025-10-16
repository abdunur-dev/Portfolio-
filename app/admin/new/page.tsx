import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import BlogEditor from "@/components/blog-editor"
import { AdminHeader } from "@/components/admin-header"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function NewPostPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminHeader />
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <Link href="/admin">
          <Button variant="ghost" className="mb-6 text-zinc-400 hover:text-white">
            ← Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-8">Create New Post</h1>
        <BlogEditor userId={user.id} />
      </div>
    </div>
  )
}

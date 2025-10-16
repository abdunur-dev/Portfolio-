import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminHeader } from "@/components/admin-header"

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch all blog posts
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminHeader />
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-zinc-400">Manage your blog posts</p>
          </div>
          <Link href="/admin/new">
            <Button className="bg-orange-500 hover:bg-orange-600">Create New Post</Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id} className="border-zinc-800 bg-zinc-950">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white">{post.title}</CardTitle>
                      <CardDescription className="text-zinc-400 mt-2">{post.excerpt}</CardDescription>
                    </div>
                    <Badge variant={post.published ? "default" : "secondary"} className="ml-4">
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-zinc-500">
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <Link href={`/admin/edit/${post.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-zinc-800 text-white hover:bg-zinc-900 bg-transparent"
                      >
                        Edit
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-zinc-800 bg-zinc-950">
              <CardContent className="py-12 text-center">
                <p className="text-zinc-400 mb-4">No blog posts yet. Create your first post!</p>
                <Link href="/admin/new">
                  <Button className="bg-orange-500 hover:bg-orange-600">Create New Post</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

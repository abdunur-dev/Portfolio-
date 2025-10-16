import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24 max-w-6xl">
        <div className="mb-12">
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="text-5xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground text-lg">All my thoughts, tutorials, and project updates</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2">
                  {post.cover_image && (
                    <div className="relative w-full h-56 overflow-hidden rounded-t-lg">
                      <Image
                        src={post.cover_image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-sm text-primary group-hover:underline">Read more →</span>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

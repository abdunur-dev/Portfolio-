import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).single()

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <Link href="/blog">
          <Button variant="ghost" className="mb-6">
            ← Back to Blog
          </Button>
        </Link>

        <article className="prose prose-invert prose-lg max-w-none">
          {post.cover_image && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <Image src={post.cover_image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          )}

          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {new Date(post.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Badge>
            <h1 className="text-5xl font-bold mb-4 text-balance">{post.title}</h1>
            {post.excerpt && <p className="text-xl text-muted-foreground text-pretty">{post.excerpt}</p>}
          </div>

          <div className="whitespace-pre-wrap text-foreground leading-relaxed">{post.content}</div>
        </article>

        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/blog">
            <Button variant="outline">← Back to all posts</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

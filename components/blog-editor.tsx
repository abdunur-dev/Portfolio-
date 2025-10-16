"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  cover_image?: string
  published: boolean
}

interface BlogEditorProps {
  userId: string
  post?: BlogPost
}

export default function BlogEditor({ userId, post }: BlogEditorProps) {
  const [title, setTitle] = useState(post?.title || "")
  const [slug, setSlug] = useState(post?.slug || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [content, setContent] = useState(post?.content || "")
  const [coverImage, setCoverImage] = useState(post?.cover_image || "")
  const [published, setPublished] = useState(post?.published || false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    if (!post) {
      setSlug(generateSlug(newTitle))
    }
  }

  const handleSave = async (shouldPublish: boolean) => {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      const postData = {
        title,
        slug,
        excerpt,
        content,
        cover_image: coverImage || null,
        published: shouldPublish,
        author_id: userId,
        updated_at: new Date().toISOString(),
      }

      if (post) {
        // Update existing post
        const { error } = await supabase.from("blog_posts").update(postData).eq("id", post.id)

        if (error) throw error
      } else {
        // Create new post
        const { error } = await supabase.from("blog_posts").insert(postData)

        if (error) throw error
      }

      router.push("/admin")
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!post || !confirm("Are you sure you want to delete this post?")) return

    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("blog_posts").delete().eq("id", post.id)

      if (error) throw error

      router.push("/admin")
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-zinc-800 bg-zinc-950">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-zinc-200">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter post title"
              className="bg-zinc-900 border-zinc-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug" className="text-zinc-200">
              Slug
            </Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="post-url-slug"
              className="bg-zinc-900 border-zinc-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt" className="text-zinc-200">
              Excerpt
            </Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of your post"
              rows={3}
              className="bg-zinc-900 border-zinc-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage" className="text-zinc-200">
              Cover Image URL
            </Label>
            <Input
              id="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="bg-zinc-900 border-zinc-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-zinc-200">
              Content
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              rows={15}
              className="bg-zinc-900 border-zinc-800 text-white font-mono"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="published" checked={published} onCheckedChange={setPublished} />
            <Label htmlFor="published" className="text-zinc-200">
              Published
            </Label>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-4">
            <Button
              onClick={() => handleSave(false)}
              variant="outline"
              className="border-zinc-800 text-white hover:bg-zinc-900"
              disabled={isLoading}
            >
              Save as Draft
            </Button>
            <Button onClick={() => handleSave(true)} className="bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
              {isLoading ? "Saving..." : published ? "Update & Publish" : "Publish"}
            </Button>
            {post && (
              <Button onClick={handleDelete} variant="destructive" className="ml-auto" disabled={isLoading}>
                Delete Post
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

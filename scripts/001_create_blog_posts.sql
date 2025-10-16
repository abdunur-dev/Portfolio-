-- Create blog_posts table
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null,
  excerpt text,
  cover_image text,
  published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  author_id uuid references auth.users(id) on delete cascade not null
);

-- Enable RLS
alter table public.blog_posts enable row level security;

-- Policies for blog_posts
-- Anyone can view published posts
create policy "blog_posts_select_published"
  on public.blog_posts for select
  using (published = true);

-- Authenticated users can view their own posts (published or not)
create policy "blog_posts_select_own"
  on public.blog_posts for select
  using (auth.uid() = author_id);

-- Only authenticated users can insert their own posts
create policy "blog_posts_insert_own"
  on public.blog_posts for insert
  with check (auth.uid() = author_id);

-- Only authors can update their own posts
create policy "blog_posts_update_own"
  on public.blog_posts for update
  using (auth.uid() = author_id);

-- Only authors can delete their own posts
create policy "blog_posts_delete_own"
  on public.blog_posts for delete
  using (auth.uid() = author_id);

-- Create index for slug lookups
create index if not exists blog_posts_slug_idx on public.blog_posts(slug);

-- Create index for published posts
create index if not exists blog_posts_published_idx on public.blog_posts(published, created_at desc);

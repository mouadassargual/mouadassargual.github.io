-- Admin setup for Mouad website (Supabase)
-- Run this in your Supabase SQL editor

-- 1) Create an admins table that maps auth user IDs to admin privileges
CREATE TABLE IF NOT EXISTS admins (
  user_id uuid PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);

-- 2) Insert your admin user id (inserted below using the UID you provided)
INSERT INTO admins (user_id) VALUES ('982ebc3e-0675-4fd5-b0da-88abd20e75f3')
ON CONFLICT (user_id) DO NOTHING;

-- 3) Ensure blog_posts RLS is enabled and add a policy so only admins can manage posts
-- Ensure required extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- If the `blog_posts` table does not exist (user schema not applied), create it now.
-- This matches the schema used by the app. If you already ran `supabase-schema.sql` you can skip this,
-- but having the CREATE TABLE IF NOT EXISTS here makes the script idempotent.
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance (safe to run repeatedly)
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Keep any existing public SELECT policy for published posts.

-- Enable RLS now that the table exists, then create the admin policy.
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy: Postgres does not support CREATE POLICY IF NOT EXISTS,
-- so drop the policy if it exists then create it.
DROP POLICY IF EXISTS "Admins can manage blog posts" ON blog_posts;

CREATE POLICY "Admins can manage blog posts"
ON blog_posts
FOR ALL
USING (
  EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid())
)
WITH CHECK (
  EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid())
);

-- 4) Optional: add published_at timestamp if you want scheduling
ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS published_at timestamptz;

-- 5) Helpful index for published_at
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- 6) Reminder: do NOT run or store your SUPABASE_SERVICE_ROLE_KEY in the client.

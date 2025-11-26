-- Mouad Assargual Website Database Schema
-- Run this in your Supabase SQL Editor

-- ============================================
-- SETUP INSTRUCTIONS
-- ============================================
-- 1. Run this entire SQL script in Supabase SQL Editor
-- 2. Create an admin user:
--    - Go to Supabase Dashboard > Authentication > Users
--    - Click "Add User" or "Invite User"
--    - Enter your email and create a password
--    - The user will be created with authenticated role
-- 3. Login at: http://localhost:3000/admin/login
-- 4. Use the email and password you created in step 2
-- ============================================

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts
-- Anyone can read published posts
CREATE POLICY "Public can view published blog posts"
ON blog_posts FOR SELECT
USING (published = true);

-- Authenticated users (admin) can view all posts
CREATE POLICY "Authenticated users can view all blog posts"
ON blog_posts FOR SELECT
TO authenticated
USING (true);

-- Authenticated users (admin) can insert posts
CREATE POLICY "Authenticated users can insert blog posts"
ON blog_posts FOR INSERT
TO authenticated
WITH CHECK (true);

-- Authenticated users (admin) can update posts
CREATE POLICY "Authenticated users can update blog posts"
ON blog_posts FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Authenticated users (admin) can delete posts
CREATE POLICY "Authenticated users can delete blog posts"
ON blog_posts FOR DELETE
TO authenticated
USING (true);

-- Create policies for contact_messages
-- Anyone can insert contact messages
CREATE POLICY "Anyone can insert contact messages"
ON contact_messages FOR INSERT
WITH CHECK (true);

-- Authenticated users (admin) can view all contact messages
CREATE POLICY "Authenticated users can view contact messages"
ON contact_messages FOR SELECT
TO authenticated
USING (true);

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, image_url, published) VALUES
('Digital Transformation in Morocco''s Public Sector',
 'digital-transformation-morocco',
 'Exploring the challenges and opportunities of modernizing government services through technology and strategic communication.',
 'Full article content here...',
 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop',
 true),

('Building Smart Cities for Africa''s Future',
 'smart-cities-africa',
 'How AI-powered platforms can revolutionize citizen-government interactions in African municipalities.',
 'Full article content here...',
 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&auto=format&fit=crop',
 true),

('Strategic Communication in the Digital Age',
 'strategic-communication-leaders',
 'Why public leaders need to combine traditional communication strategies with modern digital tools.',
 'Full article content here...',
 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop',
 true),

('AI Applications for Public Good',
 'ai-public-services',
 'Practical examples of how artificial intelligence can improve efficiency and citizen satisfaction in public services.',
 'Full article content here...',
 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop',
 true),

('GovTech Innovation: Lessons from Morocco',
 'govtech-innovation',
 'Case studies and insights from implementing government technology solutions in Moroccan institutions.',
 'Full article content here...',
 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&auto=format&fit=crop',
 true),

('Achieving Institutional Excellence Through Digital Tools',
 'institutional-excellence',
 'A comprehensive guide to transforming public institutions with the right blend of strategy and technology.',
 'Full article content here...',
 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop',
 true);

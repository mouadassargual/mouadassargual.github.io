# Mouad Assargual - Personal Website

A modern, professional portfolio website built with Next.js 15 and Supabase. Features a dark minimalist design, blog system, and full CMS capabilities.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (recommended)

## Features

- Server-side rendering with Next.js App Router
- Dynamic blog system powered by Supabase
- Responsive design (mobile, tablet, desktop)
- SEO optimized
- Image optimization with Next.js Image
- Dark theme matching aboudia.me aesthetic
- Grayscale to color image hover effects
- Smooth animations and transitions

## Quick Start

### 1. Clone and Install

```bash
cd mouadwebsite
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and anon key from Project Settings → API
3. Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run the database schema in Supabase SQL Editor:
   - Open Supabase Dashboard → SQL Editor
   - Copy the contents of `supabase-schema.sql`
   - Paste and run it

This will create:
- `blog_posts` table with sample data
- `contact_messages` table
- Row Level Security policies
- Necessary indexes

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your website.

## Project Structure

```
mouadwebsite/
├── app/
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   └── blog/
│       └── [slug]/
│           └── page.tsx    # Dynamic blog post pages
├── components/
│   ├── Header.tsx          # Navigation header
│   └── Footer.tsx          # Footer with social links
├── lib/
│   └── supabase.ts         # Supabase client & types
├── utils/                  # Utility functions
├── public/                 # Static files
├── supabase-schema.sql     # Database schema
├── .env.local.example      # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## Customization

### Adding Content to Your Bio

Edit `app/page.tsx` and expand the About section with your full bio from `1.txt`.

### Creating Blog Posts

#### Option 1: Using Supabase Dashboard
1. Go to Supabase Dashboard → Table Editor → blog_posts
2. Click "Insert row"
3. Fill in the fields:
   - `title`: Your post title
   - `slug`: URL-friendly version (e.g., "my-post-title")
   - `excerpt`: Short description
   - `content`: Full markdown or HTML content
   - `image_url`: Featured image URL
   - `published`: Check to make it live

#### Option 2: Using SQL
```sql
INSERT INTO blog_posts (title, slug, excerpt, content, image_url, published)
VALUES (
  'Your Post Title',
  'your-post-slug',
  'Short description here',
  'Full content here...',
  'https://your-image-url.com/image.jpg',
  true
);
```

### Styling

The design uses Tailwind CSS with custom colors matching aboudia.me:

**Color Variables** (in `tailwind.config.ts`):
- `primary`: #020E1A (dark navy background)
- `secondary`: #0a1929 (lighter navy)
- `accent`: #3B82F6 (blue accent)
- `text-primary`: #FCFCFC (off-white)
- `text-secondary`: #84878D (gray)

**Fonts**:
- Body: Inter
- Headings: Space Grotesk

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

Your site will be live at `your-project.vercel.app`

### Custom Domain

1. In Vercel, go to Project Settings → Domains
2. Add your custom domain (e.g., mouadas.me)
3. Follow DNS configuration instructions

## Database Management

### Viewing Contact Messages

```sql
SELECT * FROM contact_messages ORDER BY created_at DESC;
```

### Managing Blog Posts

```sql
-- Get all published posts
SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC;

-- Update a post
UPDATE blog_posts
SET title = 'New Title', content = 'New content...'
WHERE slug = 'post-slug';

-- Delete a post
DELETE FROM blog_posts WHERE slug = 'post-slug';
```

## Adding More Features

### Contact Form

Create `app/api/contact/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  const { name, email, message } = await request.json()

  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{ name, email, message }])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
```

### Newsletter Signup

Add a `newsletters` table to Supabase and create an API route similar to the contact form.

### Admin Dashboard

Create protected routes under `app/admin/` for managing blog posts through a web interface instead of Supabase dashboard.

## Troubleshooting

### Images Not Loading
- Check that image URLs in Supabase are accessible
- Add image domains to `next.config.js`:
```javascript
images: {
  domains: ['your-image-domain.com'],
}
```

### Database Connection Errors
- Verify `.env.local` variables are correct
- Check Supabase project is active
- Ensure RLS policies are set up correctly

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors with `npm run lint`
- Clear `.next` folder: `rm -rf .next`

## Performance

- Uses Next.js 15 App Router for optimal performance
- Server-side rendering for SEO
- Image optimization with Next.js Image component
- Revalidation strategy for dynamic content
- Tailwind CSS for minimal CSS bundle size

## Support

For issues or questions:
- Check the [Next.js Documentation](https://nextjs.org/docs)
- Check the [Supabase Documentation](https://supabase.com/docs)
- Review `CLAUDE.md` for development guidelines

## License

© 2024 Mouad Assargual. All rights reserved.

---

Built with Next.js, TypeScript, Tailwind CSS, and Supabase

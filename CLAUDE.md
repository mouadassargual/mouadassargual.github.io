# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Mouad Assargual, a Digital Transformation & GovTech Consultant based in Agadir, Morocco. The site showcases expertise in public affairs, strategic communication, and AI solutions for Morocco's public sector.

**Tech Stack:**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- Vercel (deployment)

## Project Structure

```
mouadwebsite/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Home page (Hero, About, Blog, Contact)
│   ├── globals.css        # Global styles & Tailwind
│   └── blog/
│       └── [slug]/
│           └── page.tsx   # Dynamic blog post pages
├── components/            # React components
│   ├── Header.tsx        # Navigation with mobile menu
│   └── Footer.tsx        # Footer with social links
├── lib/
│   └── supabase.ts       # Supabase client & TypeScript types
├── utils/                # Utility functions
├── public/               # Static assets
├── _old_static/          # Original HTML/CSS/JS website (backup)
├── supabase-schema.sql   # Database schema to run in Supabase
└── 1.txt                 # Personal information source
```

## Development Setup

### Prerequisites
- Node.js 18+ installed
- Supabase account and project created
- Environment variables configured

### Installation

```bash
npm install
```

### Environment Variables

Create `.env.local` in root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Database Setup

1. Open Supabase Dashboard → SQL Editor
2. Run the contents of `supabase-schema.sql`
3. This creates `blog_posts` and `contact_messages` tables with RLS policies

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Key Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture & Design Patterns

### App Router (Next.js 15)

This project uses the Next.js App Router (not Pages Router):
- Pages are in `app/` directory
- Server Components by default
- Use `'use client'` directive for client components
- Data fetching happens directly in Server Components

### Data Fetching Pattern

**Server Components** (default in App Router):
```typescript
// app/page.tsx
import { supabase } from '@/lib/supabase'

export const revalidate = 60 // Revalidate every 60 seconds

async function getBlogPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
  return data
}

export default async function Page() {
  const posts = await getBlogPosts()
  // render posts
}
```

**Client Components** (for interactivity):
```typescript
'use client'

import { useState } from 'react'

export default function InteractiveComponent() {
  const [state, setState] = useState(false)
  // component logic
}
```

### Styling Approach

- **Tailwind CSS** for utility-first styling
- **Custom CSS variables** in `globals.css` for theme colors
- **Responsive design** using Tailwind breakpoints (md:, lg:, etc.)
- **Design system** matches aboudia.me aesthetic

### Key Design Patterns

**Color Scheme:**
- Dark minimalist theme (#020E1A background)
- Blue accent (#3B82F6)
- High contrast text (#FCFCFC on dark)

**Typography:**
- Headings: Space Grotesk font
- Body: Inter font
- Fluid sizing with `clamp()` for responsive text

**Hover Effects:**
- Blog card images: grayscale to color transition
- Buttons: filled to outline transition
- Cards: border color change + elevation

## Database Schema

### blog_posts Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| title | TEXT | Post title |
| slug | TEXT | URL-friendly identifier (unique) |
| excerpt | TEXT | Short description |
| content | TEXT | Full post content (HTML/Markdown) |
| image_url | TEXT | Featured image URL |
| published | BOOLEAN | Visibility flag |
| created_at | TIMESTAMP | Creation date |
| updated_at | TIMESTAMP | Last update |

### contact_messages Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Sender name |
| email | TEXT | Sender email |
| message | TEXT | Message content |
| created_at | TIMESTAMP | Submission date |

### Row Level Security (RLS)

- `blog_posts`: Public can read published posts
- `contact_messages`: Anyone can insert messages

## Content Management

### Adding Blog Posts

**Via Supabase Dashboard:**
1. Go to Table Editor → blog_posts
2. Click "Insert row"
3. Fill in all fields
4. Set `published` to `true` to make it live

**Via SQL:**
```sql
INSERT INTO blog_posts (title, slug, excerpt, content, image_url, published)
VALUES ('Title', 'url-slug', 'Excerpt...', 'Content...', 'image-url', true);
```

### Updating Personal Information

Edit `app/page.tsx` to update:
- Hero section text
- About section bio
- Contact information

Original content is in `1.txt` for reference.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

**Environment Variables to Add:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Build Command

```bash
npm run build
```

Vercel auto-detects Next.js and configures correctly.

## Common Tasks

### Adding a New Page

1. Create `app/new-page/page.tsx`
2. Export default component
3. Access at `/new-page`

### Adding a New Component

1. Create file in `components/` directory
2. Export component
3. Import in pages: `import Component from '@/components/Component'`

### Adding API Routes

Create `app/api/route-name/route.ts`:

```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ data: 'value' })
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ success: true })
}
```

### Image Optimization

Use Next.js Image component:

```typescript
import Image from 'next/image'

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  className="..."
/>
```

For external images, add domain to `next.config.js`:

```javascript
images: {
  domains: ['images.unsplash.com', 'your-domain.com'],
}
```

## TypeScript Types

Key types are defined in `lib/supabase.ts`:

```typescript
interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image_url: string
  published: boolean
  created_at: string
  updated_at: string
}
```

When adding new database tables, define interfaces here.

## Performance Optimization

- **Revalidation**: Set `export const revalidate = 60` in pages for ISR
- **Image Optimization**: Always use `next/image` component
- **Font Optimization**: Using `next/font/google` for font loading
- **Server Components**: Use by default, only add `'use client'` when needed

## Troubleshooting

### Database Connection Issues
- Verify `.env.local` exists and has correct values
- Check Supabase project is active
- Test connection in Supabase dashboard

### TypeScript Errors
- Run `npm run lint` to check for errors
- Ensure all imports are correct
- Check type definitions in `lib/supabase.ts`

### Build Errors
- Delete `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npx tsc --noEmit`

### Image Loading Issues
- Verify image URLs are accessible
- Add domains to `next.config.js`
- Check Supabase `image_url` fields

## Code Style

- Use TypeScript for all new files
- Use functional components (not class components)
- Prefer Server Components over Client Components
- Use Tailwind CSS classes (avoid inline styles)
- Follow existing naming conventions

## Testing

Currently no testing framework is set up. To add tests:

```bash
npm install -D @testing-library/react @testing-library/jest-dom jest
```

## Future Enhancements

Potential features to add:
- Admin dashboard for blog management
- Newsletter subscription system
- Contact form with email notifications
- Search functionality for blog
- Tags/categories for blog posts
- Analytics integration
- Comment system for blog posts

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

For questions about the codebase, refer to this file first. The original static website is preserved in `_old_static/` for reference.

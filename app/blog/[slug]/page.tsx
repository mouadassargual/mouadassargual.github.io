import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { BlogPost } from '@/lib/supabase'

// Fetch a single blog post by slug
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return data as BlogPost
}

// Generate static params for all published posts
export async function generateStaticParams() {
  const { data } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('published', true)

  return data?.map((post) => ({
    slug: post.slug,
  })) || []
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Mouad Assargual`,
    description: post.excerpt,
  }
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Format date
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Header with Image */}
      <div className="relative min-h-[70vh] overflow-hidden">
        {post.image_url ? (
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black"></div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40"></div>
        
        {/* Back Link - Below navbar */}
        <div className="absolute top-28 left-0 right-0 z-20">
          <div className="section-container">
            <Link
              href="/blog"
              className="inline-flex items-center text-white/70 hover:text-white transition-colors text-sm font-medium group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l-4 4m0 0l4 4m-4-4H3" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="section-container pb-16">
            <div className="max-w-4xl">
              {/* Meta info */}
              <div className="flex items-center gap-4 mb-6 text-white/60 text-sm uppercase tracking-wider">
                <time dateTime={post.created_at}>{formattedDate}</time>
                <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                <span>{Math.ceil(post.content.length / 1000)} min read</span>
              </div>
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-white text-black">
        <div className="section-container">
          <article className="max-w-3xl mx-auto py-16 md:py-24">
            {/* Excerpt / Lead */}
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-12 font-light">
              {post.excerpt}
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-12">
              <div className="flex-1 h-px bg-gray-200"></div>
              <div className="w-2 h-2 bg-black rotate-45"></div>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Post Content */}
            <div
              className="prose prose-lg max-w-none text-gray-700
                [&>*]:text-gray-700
                [&>h1]:text-black [&>h2]:text-black [&>h3]:text-black [&>h4]:text-black
                [&>h1]:font-bold [&>h2]:font-bold [&>h3]:font-bold
                [&>h2]:text-3xl [&>h2]:mt-16 [&>h2]:mb-6
                [&>h3]:text-2xl [&>h3]:mt-12 [&>h3]:mb-4
                [&>p]:text-gray-700 [&>p]:leading-[1.8] [&>p]:mb-6
                [&>a]:text-black [&>a]:font-medium [&>a]:underline
                [&>strong]:text-black [&>strong]:font-semibold
                [&>ul]:text-gray-700 [&>ul]:my-8
                [&>ol]:text-gray-700 [&>ol]:my-8
                [&>li]:my-3 [&>li]:leading-relaxed
                [&>blockquote]:border-l-4 [&>blockquote]:border-black
                [&>blockquote]:pl-8 [&>blockquote]:py-2 [&>blockquote]:italic [&>blockquote]:text-gray-600
                [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-4 [&>pre]:my-8
                [&>code]:text-black [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1
                [&>img]:my-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags / Share section */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Share</span>
                  <div className="flex gap-2">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://mouadas.me/blog/${slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-all duration-300"
                      aria-label="Share on Twitter"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://mouadas.me/blog/${slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-all duration-300"
                      aria-label="Share on LinkedIn"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Author Section */}
            <div className="mt-16 p-8 md:p-10 bg-gray-50">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 relative flex-shrink-0 overflow-hidden">
                  <Image
                    src="/profile.jpg"
                    alt="Mouad Assargual"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Written by</p>
                  <h3 className="text-xl font-bold text-black mb-2">Mouad Assargual</h3>
                  <p className="text-gray-500 leading-relaxed">
                    Digital Transformation & GovTech Consultant based in Morocco. Passionate about modernizing public institutions through strategic communication and smart technology.
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Blog CTA */}
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l-4 4m0 0l4 4m-4-4H3" />
                </svg>
                Back to All Articles
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center px-8 py-4 border border-gray-200 text-black font-medium hover:border-black transition-colors"
              >
                Get in Touch
                <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </main>
  )
}

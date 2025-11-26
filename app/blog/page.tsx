import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import type { BlogPost } from '@/lib/supabase'

const POSTS_PER_PAGE = 6

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>
}

async function getBlogPosts(page: number): Promise<{ posts: BlogPost[], total: number }> {
  const from = (page - 1) * POSTS_PER_PAGE
  const to = from + POSTS_PER_PAGE - 1

  // Get total count
  const { count } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true })
    .eq('published', true)

  // Get posts for current page
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Error fetching blog posts:', error)
    return { posts: [], total: 0 }
  }

  return {
    posts: data as BlogPost[],
    total: count || 0
  }
}

export const metadata = {
  title: 'Blog | Mouad Assargual',
  description: 'Insights on digital transformation, GovTech, and strategic communication'
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const { posts, total } = await getBlogPosts(currentPage)
  const totalPages = Math.ceil(total / POSTS_PER_PAGE)

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-32 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900"></div>
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white/50 uppercase tracking-[0.3em] text-sm mb-6">Blog</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
              Insights &<br/>Articles
            </h1>
            <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-2xl mx-auto">
              Thoughts on digital transformation, GovTech, and Morocco's technological evolution
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 md:py-32 bg-white">
        <div className="section-container">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📝</div>
              <h2 className="text-3xl font-bold text-black mb-4">No posts yet</h2>
              <p className="text-xl text-gray-500">Check back soon for new articles!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((post, index) => (
                  <article key={post.id} className="group">
                    <Link href={`/blog/${post.slug}`} className="block h-full">
                      <div className="h-full bg-white rounded-none overflow-hidden transition-all duration-500">
                        {/* Image Container */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                          {post.image_url ? (
                            <Image
                              src={post.image_url}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                              loading="lazy"
                              quality={85}
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                              <span className="text-6xl opacity-50">📝</span>
                            </div>
                          )}
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          {/* Number indicator */}
                          <div className="absolute top-4 left-4 w-10 h-10 bg-white text-black flex items-center justify-center text-sm font-bold">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="py-6">
                          {/* Date and reading time */}
                          <div className="flex items-center gap-3 mb-4 text-xs text-gray-400 uppercase tracking-wider">
                            <time>
                              {new Date(post.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </time>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{Math.ceil((post.excerpt?.length || 100) / 50)} min read</span>
                          </div>

                          {/* Title */}
                          <h2 className="text-xl font-bold text-black mb-3 line-clamp-2 group-hover:text-gray-600 transition-colors duration-300">
                            {post.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="text-gray-500 line-clamp-2 text-sm leading-relaxed mb-6">
                            {post.excerpt}
                          </p>

                          {/* Read more link */}
                          <div className="flex items-center text-black font-medium text-sm">
                            <span className="relative">
                              Read Article
                              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                            </span>
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Pagination - Minimal style */}
              {totalPages > 1 && (
                <div className="mt-20 flex justify-center items-center gap-4">
                  {/* Previous Button */}
                  {currentPage > 1 ? (
                    <Link
                      href={`/blog?page=${currentPage - 1}`}
                      className="px-6 py-3 border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-all duration-300 text-sm font-medium"
                    >
                      ← Previous
                    </Link>
                  ) : (
                    <span className="px-6 py-3 border border-gray-100 text-gray-300 text-sm font-medium cursor-not-allowed">
                      ← Previous
                    </span>
                  )}

                  {/* Page indicator */}
                  <div className="flex items-center gap-2 px-4">
                    <span className="text-black font-bold text-lg">{String(currentPage).padStart(2, '0')}</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-400 text-lg">{String(totalPages).padStart(2, '0')}</span>
                  </div>

                  {/* Next Button */}
                  {currentPage < totalPages ? (
                    <Link
                      href={`/blog?page=${currentPage + 1}`}
                      className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-all duration-300 text-sm font-medium"
                    >
                      Next →
                    </Link>
                  ) : (
                    <span className="px-6 py-3 bg-gray-100 text-gray-300 text-sm font-medium cursor-not-allowed">
                      Next →
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

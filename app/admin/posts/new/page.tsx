'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/auth'

export default function NewPost() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    published: false,
  })

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUser()
      if (!user) {
        router.push('/admin/login')
        return
      }
      setCheckingAuth(false)
    }
    checkAuth()
  }, [router])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    // Validate required fields
    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      setError('Slug can only contain lowercase letters, numbers, and hyphens')
      setLoading(false)
      return
    }

    // Check for duplicate slug
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', formData.slug)
      .single()

    if (existingPost) {
      setError('A post with this slug already exists. Please choose a different slug.')
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('blog_posts')
      .insert([{
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content,
        image_url: formData.image_url.trim() || null,
        published: formData.published,
      }])

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    setSuccess('Post created successfully!')
    setTimeout(() => {
      router.push('/admin')
      router.refresh()
    }, 1000)
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 z-50 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-white/50 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-white">Create New Post</h1>
                <p className="text-sm text-white/50">Add a new blog article</p>
              </div>
            </div>
            <Link
              href="/admin"
              className="text-white/50 hover:text-white transition-colors text-sm"
            >
              Cancel
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Messages */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-400 text-sm flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-500/10 border border-green-500/50 text-green-400 text-sm flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {success}
            </div>
          )}

          {/* Title */}
          <div className="relative bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-6">
            <label htmlFor="title" className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              className="w-full px-0 py-2 bg-transparent border-0 border-b border-white/20 text-white text-2xl font-bold placeholder-white/20 focus:outline-none focus:border-white/50 transition-colors"
              placeholder="Enter your post title"
            />
          </div>

          {/* Slug */}
          <div className="relative bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-6">
            <label htmlFor="slug" className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
              URL Slug <span className="text-red-400">*</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-white/30 text-sm">/blog/</span>
              <input
                type="text"
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                required
                className="flex-1 px-3 py-2 bg-black/50 border border-white/20 text-white font-mono text-sm placeholder-white/20 focus:outline-none focus:border-white/50 transition-colors"
                placeholder="post-url-slug"
              />
            </div>
            <p className="text-xs text-white/30 mt-2">
              Auto-generated from title. Only lowercase letters, numbers, and hyphens allowed.
            </p>
          </div>

          {/* Excerpt */}
          <div className="relative bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-6">
            <label htmlFor="excerpt" className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
              Excerpt <span className="text-red-400">*</span>
            </label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              required
              rows={3}
              maxLength={300}
              className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder-white/20 focus:outline-none focus:border-white/50 transition-colors resize-none"
              placeholder="Brief description of the post (shown in previews)"
            />
            <p className="text-xs text-white/30 mt-2 text-right">
              {formData.excerpt.length}/300 characters
            </p>
          </div>

          {/* Content */}
          <div className="relative bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-6">
            <label htmlFor="content" className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
              Content <span className="text-red-400">*</span>
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={20}
              className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white font-mono text-sm placeholder-white/20 focus:outline-none focus:border-white/50 transition-colors resize-none"
              placeholder="Write your post content here... (Markdown supported)"
            />
            <p className="text-xs text-white/30 mt-2">
              You can use Markdown formatting: **bold**, *italic*, # headings, - lists, etc.
            </p>
          </div>

          {/* Image URL */}
          <div className="relative bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-6">
            <label htmlFor="image_url" className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
              Featured Image URL
            </label>
            <input
              type="url"
              id="image_url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder-white/20 focus:outline-none focus:border-white/50 transition-colors"
              placeholder="https://example.com/image.jpg"
            />
            {formData.image_url && (
              <div className="mt-4 relative aspect-video bg-white/5 overflow-hidden">
                <img 
                  src={formData.image_url} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>

          {/* Published Status */}
          <div className="relative bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-6">
            <label className="flex items-center gap-4 cursor-pointer group">
              <div className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${formData.published ? 'bg-green-500' : 'bg-white/20'}`}>
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${formData.published ? 'translate-x-8' : 'translate-x-1'}`}></div>
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="sr-only"
                />
              </div>
              <div>
                <p className="text-white font-medium">Publish immediately</p>
                <p className="text-white/40 text-sm">
                  {formData.published ? 'This post will be visible to everyone' : 'Save as draft for later'}
                </p>
              </div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative flex-1 bg-white text-black py-4 font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Post
                  </>
                )}
              </span>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
            </button>
            <Link
              href="/admin"
              className="px-8 py-4 border border-white/20 text-white/70 font-semibold hover:border-white/50 hover:text-white transition-all duration-300 flex items-center justify-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}

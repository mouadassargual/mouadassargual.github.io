'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/auth'
import type { BlogPost } from '@/lib/supabase'

export default function EditPost() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [originalSlug, setOriginalSlug] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    published: false,
  })

  useEffect(() => {
    const init = async () => {
      // Check auth
      const user = await getUser()
      if (!user) {
        router.push('/admin/login')
        return
      }
      
      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      if (!uuidRegex.test(postId)) {
        setError('Invalid post ID')
        setLoading(false)
        return
      }

      fetchPost()
    }
    init()
  }, [postId, router])

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', postId)
      .single()

    if (error) {
      setError('Post not found')
      setLoading(false)
      return
    }

    if (data) {
      setOriginalSlug(data.slug)
      setFormData({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        image_url: data.image_url || '',
        published: data.published,
      })
    }
    setLoading(false)
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
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
    setSaving(true)

    // Validate required fields
    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content) {
      setError('Please fill in all required fields')
      setSaving(false)
      return
    }

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      setError('Slug can only contain lowercase letters, numbers, and hyphens')
      setSaving(false)
      return
    }

    // Check for duplicate slug (only if slug changed)
    if (formData.slug !== originalSlug) {
      const { data: existingPost } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', formData.slug)
        .neq('id', postId)
        .single()

      if (existingPost) {
        setError('A post with this slug already exists. Please choose a different slug.')
        setSaving(false)
        return
      }
    }

    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content,
        image_url: formData.image_url.trim() || null,
        published: formData.published,
        updated_at: new Date().toISOString(),
      })
      .eq('id', postId)

    if (updateError) {
      setError(updateError.message)
      setSaving(false)
      return
    }

    setSuccess('Post updated successfully!')
    setOriginalSlug(formData.slug)
    setTimeout(() => {
      setSuccess('')
    }, 3000)
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <p className="text-white/50 text-sm">Loading post...</p>
        </div>
      </div>
    )
  }

  if (error && !formData.title) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">{error}</h2>
          <p className="text-white/50 mb-6">The post you're looking for doesn't exist or has been deleted.</p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 font-semibold hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
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
                <h1 className="text-xl font-bold text-white">Edit Post</h1>
                <p className="text-sm text-white/50">Modify your blog article</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/blog/${formData.slug}`}
                className="text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm"
                target="_blank"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Preview
              </Link>
              <Link
                href="/admin"
                className="text-white/50 hover:text-white transition-colors text-sm"
              >
                Cancel
              </Link>
            </div>
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
            {formData.slug !== originalSlug && (
              <p className="text-xs text-yellow-400 mt-2">
                ⚠️ Changing the slug will break existing links to this post
              </p>
            )}
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
                <p className="text-white font-medium">
                  {formData.published ? 'Published' : 'Draft'}
                </p>
                <p className="text-white/40 text-sm">
                  {formData.published ? 'This post is visible to everyone' : 'This post is hidden from the public'}
                </p>
              </div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="group relative flex-1 bg-white text-black py-4 font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
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

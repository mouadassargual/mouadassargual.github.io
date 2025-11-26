'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { signOut, getUser } from '@/lib/auth'
import type { BlogPost } from '@/lib/supabase'

export default function AdminDashboard() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 })
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    checkUser()
    fetchPosts()
  }, [])

  const checkUser = async () => {
    const currentUser = await getUser()
    if (!currentUser) {
      router.push('/admin/login')
      return
    }
    setUser(currentUser)
  }

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setPosts(data)
      setStats({
        total: data.length,
        published: data.filter(p => p.published).length,
        drafts: data.filter(p => !p.published).length
      })
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (!error) {
      const newPosts = posts.filter(post => post.id !== id)
      setPosts(newPosts)
      setStats({
        total: newPosts.length,
        published: newPosts.filter(p => p.published).length,
        drafts: newPosts.filter(p => !p.published).length
      })
    }
    setDeleteConfirm(null)
  }

  const togglePublished = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('blog_posts')
      .update({ published: !currentStatus })
      .eq('id', id)

    if (!error) {
      const newPosts = posts.map(post =>
        post.id === id ? { ...post, published: !currentStatus } : post
      )
      setPosts(newPosts)
      setStats({
        total: newPosts.length,
        published: newPosts.filter(p => p.published).length,
        drafts: newPosts.filter(p => !p.published).length
      })
    }
  }

  const handleLogout = async () => {
    await signOut()
    // Clear all auth cookies
    document.cookie = 'sb-access-token=; path=/; max-age=0; SameSite=Strict'
    document.cookie = 'sb-refresh-token=; path=/; max-age=0; SameSite=Strict'
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <p className="text-white/50 text-sm">Loading dashboard...</p>
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
              <Link href="/" className="group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-black group-hover:scale-110 transition-transform duration-300">
                  MA
                </div>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-sm text-white/50">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Link 
                href="/" 
                className="text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="text-white/50 hover:text-red-400 transition-colors flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all duration-500 hover:border-white/30">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/50 text-sm uppercase tracking-wider mb-2">Total Posts</p>
                <p className="text-4xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-green-500/10 to-green-500/5 backdrop-blur-sm border border-green-500/20 p-6 transition-all duration-500 hover:border-green-500/40">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400/70 text-sm uppercase tracking-wider mb-2">Published</p>
                <p className="text-4xl font-bold text-green-400">{stats.published}</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 backdrop-blur-sm border border-yellow-500/20 p-6 transition-all duration-500 hover:border-yellow-500/40">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400/70 text-sm uppercase tracking-wider mb-2">Drafts</p>
                <p className="text-4xl font-bold text-yellow-400">{stats.drafts}</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
            <p className="text-white/50 text-sm mt-1">Manage your blog content</p>
          </div>
          <Link
            href="/admin/posts/new"
            className="group relative bg-white text-black px-6 py-3 font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-white/20 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Post
            <div className="absolute top-0 right-0 w-20 h-20 bg-gray-100 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
          </Link>
        </div>

        {/* Posts Table */}
        <div className="relative bg-gradient-to-br from-white/5 to-transparent border border-white/10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          {posts.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
              <p className="text-white/50 mb-6">Create your first blog post to get started</p>
              <Link
                href="/admin/posts/new"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 font-semibold hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create First Post
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Title</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider hidden md:table-cell">Slug</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider hidden sm:table-cell">Date</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {posts.map((post, index) => (
                    <tr key={post.id} className="group hover:bg-white/5 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-white/30 font-mono">{String(index + 1).padStart(2, '0')}</span>
                          <div>
                            <p className="font-medium text-white group-hover:text-white/90 transition-colors">{post.title}</p>
                            <p className="text-sm text-white/40 line-clamp-1 mt-1">{post.excerpt}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 hidden md:table-cell">
                        <code className="text-sm text-white/50 bg-white/5 px-2 py-1 rounded">{post.slug}</code>
                      </td>
                      <td className="px-6 py-5">
                        <button
                          onClick={() => togglePublished(post.id, post.published)}
                          className={`px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                            post.published
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30'
                          }`}
                        >
                          {post.published ? '● Published' : '○ Draft'}
                        </button>
                      </td>
                      <td className="px-6 py-5 text-sm text-white/40 hidden sm:table-cell">
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-3">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-white/40 hover:text-white transition-colors p-2"
                            title="View"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                          <Link
                            href={`/admin/posts/${post.id}`}
                            className="text-white/40 hover:text-white transition-colors p-2"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          {deleteConfirm === post.id ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDelete(post.id)}
                                className="text-red-400 hover:text-red-300 transition-colors text-xs font-medium"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="text-white/40 hover:text-white transition-colors text-xs"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(post.id)}
                              className="text-white/40 hover:text-red-400 transition-colors p-2"
                              title="Delete"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

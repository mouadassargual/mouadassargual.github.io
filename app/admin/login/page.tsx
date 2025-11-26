'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn, getUser } from '@/lib/auth'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // Redirect if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUser()
      if (user) {
        router.push('/admin')
      }
      setCheckingAuth(false)
    }
    checkAuth()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    const { data, error: signInError } = await signIn(email, password)

    if (signInError) {
      // Generic error message for security
      setError('Invalid credentials. Please try again.')
      setLoading(false)
      return
    }

    if (data.session) {
      // Store token in cookie with secure flags
      const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
      document.cookie = `sb-access-token=${data.session.access_token}; path=/; max-age=3600; SameSite=Strict${secure}`
      router.push('/admin')
      router.refresh()
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center font-bold text-3xl text-black mx-auto shadow-2xl shadow-white/20 hover:scale-110 transition-transform duration-300">
              MA
            </div>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Admin</span>{' '}
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">Portal</span>
          </h1>
          <p className="text-gray-400 text-lg">Sign in to manage your content</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          
          <div className="relative z-10 p-10">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-400 text-sm flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-3 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full px-5 py-4 bg-black/50 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-all duration-300"
                  placeholder="your@email.com"
                />
                <div className="absolute inset-0 border border-white/0 group-focus-within:border-white/30 pointer-events-none transition-colors duration-300"></div>
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-3 uppercase tracking-wider">
                Password
              </label>
              <div className="relative group">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full px-5 py-4 bg-black/50 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full bg-white text-black py-4 font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </span>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Protected admin area
          </p>
          <Link href="/" className="text-white/50 hover:text-white text-sm mt-4 inline-block transition-colors">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  )
}

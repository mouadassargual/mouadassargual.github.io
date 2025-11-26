"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import AdminEditor from './AdminEditor'

export default function AdminAuth() {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [message, setMessage] = useState('')
  const [showDebug, setShowDebug] = useState(false)

  useEffect(() => {
    const init = async () => {
      // If the magic-link redirected with the access token in the URL hash,
      // Supabase will automatically handle it via onAuthStateChange
      try {
        const { data } = await supabase.auth.getSession()
        if (data?.session?.user) {
          setUser(data.session.user)
          checkAdmin(data.session.user.id)
        }
      } catch (err) {
        console.error('Auth init error', err)
      }
    }
    init()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        checkAdmin(session.user.id)
      } else {
        setUser(null)
        setIsAdmin(false)
      }
    })

    return () => listener?.subscription.unsubscribe()
  }, [])

  async function checkAdmin(userId: string) {
    try {
      const { data } = await supabase.from('admins').select('user_id').eq('user_id', userId).single()
      if (data) setIsAdmin(true)
      else setIsAdmin(false)
    } catch (err) {
      setIsAdmin(false)
    }
  }

  async function signIn() {
    setLoading(true)
    setMessage('')
    try {
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) setMessage(error.message)
      else setMessage('Magic link sent — check your email.')
    } catch (err: any) {
      setMessage(err.message || 'Error sending link')
    } finally {
      setLoading(false)
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
    setIsAdmin(false)
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-6 bg-secondary rounded">
        <h2 className="text-2xl font-bold mb-4">Admin sign in</h2>
        <p className="mb-4">Enter your email to receive a magic link.</p>
        <input
          className="w-full mb-3 p-3 border border-border-color rounded bg-primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <div className="flex gap-3">
          <button onClick={signIn} disabled={!email || loading} className="btn-primary">
            {loading ? 'Sending...' : 'Send magic link'}
          </button>
        </div>
        {message && <p className="mt-3">{message}</p>}
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-secondary rounded text-center">
        <div className="flex justify-end mb-4">
          <button onClick={() => setShowDebug(s => !s)} className="text-sm btn-secondary">
            {showDebug ? 'Hide debug' : 'Show debug'}
          </button>
        </div>
        {showDebug && (
          <pre className="text-left bg-primary p-3 rounded mb-4 overflow-auto text-sm">
            {JSON.stringify({ user: user ? { id: user.id, email: user.email } : null, isAdmin }, null, 2)}
          </pre>
        )}
        <h2 className="text-2xl font-bold mb-4">Not authorized</h2>
        <p>Your account doesn't have admin privileges.</p>
        <div className="mt-4">
          <button onClick={signOut} className="btn-secondary">
            Sign out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={() => setShowDebug(s => !s)} className="text-sm btn-secondary">
          {showDebug ? 'Hide debug' : 'Show debug'}
        </button>
      </div>
      {showDebug && (
        <pre className="text-left bg-primary p-3 rounded mb-4 overflow-auto text-sm max-w-3xl">
          {JSON.stringify({ user: user ? { id: user.id, email: user.email } : null, isAdmin }, null, 2)}
        </pre>
      )}
      <div className="flex justify-between mb-6 items-center">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm">Signed in as {user.email}</span>
          <button onClick={signOut} className="btn-secondary">
            Sign out
          </button>
        </div>
      </div>
      <AdminEditor />
    </div>
  )
}

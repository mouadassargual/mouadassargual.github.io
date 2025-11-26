'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // TODO: Integrate with your newsletter service (Mailchimp, ConvertKit, etc.)
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000))

      setStatus('success')
      setMessage('Thank you for subscribing!')
      setEmail('')

      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')

      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
    }
  }

  return (
    <div className="max-w-md">
      <h4 className="text-text-primary font-semibold mb-4">Stay Updated</h4>
      <p className="text-text-secondary text-sm mb-4">
        Get insights on digital transformation and GovTech delivered to your inbox.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          disabled={status === 'loading'}
          className="flex-1 px-4 py-2 bg-white/5 border border-border-color text-white placeholder:text-text-secondary focus:outline-none focus:border-white transition-colors disabled:opacity-50"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-2 bg-white text-black font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Subscribe to newsletter"
        >
          {status === 'loading' ? 'Sending...' : 'Subscribe'}
        </button>
      </form>

      {message && (
        <p className={`mt-3 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </div>
  )
}

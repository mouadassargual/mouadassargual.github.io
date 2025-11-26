"use client"

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function SupabaseSessionHandler() {
  useEffect(() => {
    async function handleMagicLink() {
      try {
        if (typeof window === 'undefined') return

        // If URL fragment contains an access token (magic link), Supabase handles it automatically
        // We just need to get the session to trigger the auth state change
        if (window.location.hash && (window.location.hash.includes('access_token') || window.location.hash.includes('type=magiclink'))) {
          try {
            const { data, error } = await supabase.auth.getSession()
            if (error) {
              console.warn('getSession error', error)
            } else if (data?.session?.user) {
              // remove token fragment from URL for cleanliness
              try { window.history.replaceState(null, '', window.location.pathname + window.location.search) } catch (e) {}
            }
          } catch (e) {
            console.warn('Error handling magic link', e)
          }
        }
      } catch (err) {
        console.error('SupabaseSessionHandler init error', err)
      }
    }

    handleMagicLink()
  }, [])

  return null
}

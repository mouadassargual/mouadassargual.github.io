"use client"

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function SupabaseSessionHandler() {
  useEffect(() => {
    async function handleMagicLink() {
      try {
        if (typeof window === 'undefined') return

        // If URL fragment contains an access token (magic link), parse and store session
        if (window.location.hash && (window.location.hash.includes('access_token') || window.location.hash.includes('type=magiclink'))) {
          // Supabase provides a helper to parse the url and store the session
          try {
            const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true })
            if (error) {
              console.warn('getSessionFromUrl error', error)
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

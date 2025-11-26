import { supabase } from './supabase'

// Rate limiting storage (in production, use Redis or similar)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()
const MAX_ATTEMPTS = 5
const LOCKOUT_TIME = 15 * 60 * 1000 // 15 minutes

function checkRateLimit(email: string): boolean {
  const now = Date.now()
  const attempts = loginAttempts.get(email)
  
  if (!attempts) {
    return true // No previous attempts
  }
  
  // Reset if lockout period has passed
  if (now - attempts.lastAttempt > LOCKOUT_TIME) {
    loginAttempts.delete(email)
    return true
  }
  
  return attempts.count < MAX_ATTEMPTS
}

function recordAttempt(email: string, success: boolean) {
  if (success) {
    loginAttempts.delete(email)
    return
  }
  
  const attempts = loginAttempts.get(email)
  if (attempts) {
    attempts.count += 1
    attempts.lastAttempt = Date.now()
  } else {
    loginAttempts.set(email, { count: 1, lastAttempt: Date.now() })
  }
}

export async function signIn(email: string, password: string) {
  // Check rate limit
  if (!checkRateLimit(email)) {
    return {
      data: { session: null, user: null },
      error: { message: 'Too many login attempts. Please try again later.' }
    }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase().trim(),
    password,
  })
  
  // Record the attempt
  recordAttempt(email, !error)
  
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function refreshSession() {
  const { data: { session }, error } = await supabase.auth.refreshSession()
  return { session, error }
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Security headers for all responses
  const response = NextResponse.next()
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Admin routes protection
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    // Get the token from cookies
    const token = request.cookies.get('sb-access-token')

    // If no token, redirect to login
    if (!token || !token.value) {
      const loginUrl = new URL('/admin/login', request.url)
      // Add redirect param to return to original page after login
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Basic JWT format validation (without full verification)
    const tokenParts = token.value.split('.')
    if (tokenParts.length !== 3) {
      // Invalid token format, clear it and redirect
      const loginUrl = new URL('/admin/login', request.url)
      const response = NextResponse.redirect(loginUrl)
      response.cookies.delete('sb-access-token')
      return response
    }

    // Check token expiration (basic check from payload)
    try {
      const payload = JSON.parse(atob(tokenParts[1]))
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        // Token expired, clear it and redirect
        const loginUrl = new URL('/admin/login', request.url)
        const response = NextResponse.redirect(loginUrl)
        response.cookies.delete('sb-access-token')
        return response
      }
    } catch {
      // Invalid token, redirect to login
      const loginUrl = new URL('/admin/login', request.url)
      const response = NextResponse.redirect(loginUrl)
      response.cookies.delete('sb-access-token')
      return response
    }
  }

  // Prevent access to sensitive files
  const sensitivePatterns = [
    /\.env/,
    /\.git/,
    /node_modules/,
    /\.config/,
    /package\.json$/,
  ]

  for (const pattern of sensitivePatterns) {
    if (pattern.test(pathname)) {
      return new NextResponse('Not Found', { status: 404 })
    }
  }

  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

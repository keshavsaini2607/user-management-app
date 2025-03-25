import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === '/auth/signin'

  // Get the token from cookies - you'll need to implement this based on your auth strategy
  const token = request.cookies.get('auth-token')?.value || ''

  // If token exists and trying to access signin page, redirect to home
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If no token and trying to access protected route, redirect to signin
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/',
    '/auth/signin',
    // Add other protected routes here
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
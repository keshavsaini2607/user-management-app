import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/auth/signin' || path === '/auth/signup'
  const token = request.cookies.get('auth-token')?.value || ''

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard/home', request.url))
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/auth/signin',
    '/auth/signup',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
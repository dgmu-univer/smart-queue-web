import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PREFIX = '/dashboard11'
const SESSION_COOKIE = 'connect.sid'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasSession = request.cookies.has(SESSION_COOKIE)

  // Unauthenticated user on a protected route → /login?from=<path>
  if (!hasSession && pathname.startsWith(PROTECTED_PREFIX)) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Authenticated user on /login → dashboard
  if (hasSession && pathname === '/login') {
    return NextResponse.redirect(new URL(PROTECTED_PREFIX, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  //console.log('token', token)
  if (request.nextUrl.pathname === '/home/tramites' && !token)
    return NextResponse.redirect(new URL('/login', request.url))
  if (token) return
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: '/home/:path*',
}

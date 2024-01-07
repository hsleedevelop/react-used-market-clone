import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export { default } from 'next-auth/middleware'

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.JWT_SECRET })
  const pathname = req.nextUrl.pathname
  console.log('middleware', pathname)

  //only login user
  if (pathname.startsWith('/user') && !session) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  } 

  //only admin
  if (pathname.startsWith('/admin') && (session?.role !== 'admin')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  //if login
  if (pathname.startsWith('/auth') && session) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  
  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*', '/auth/:path*', '/user'] }
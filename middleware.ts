import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

// Define protected routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/voting",
  "/meals",
  "/shopping",
  "/expenses",
  "/payments",
  "/calculations",
  "/analytics",
  "/market",
  "/excel",
  "/notifications",
  "/settings",
  "/profile"
]

// Define public paths that don't require authentication
const publicPaths = [
  "/",
  "/login",
  "/register",
  "/api/auth",
  "/forgot-password",
  "/reset-password",
  "/_next",
  "/favicon.ico"
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const url = request.nextUrl.clone()

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if current path is public
  const isPublicPath = publicPaths.some(publicPath => 
    pathname === publicPath || pathname.startsWith(publicPath + "/")
  )

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(route + "/")
  )

  // Get the session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Handle redirects for authentication
  if (isProtectedRoute) {
    if (!token) {
      // User is not authenticated and trying to access protected route
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
    
    // Add any role-based access control here if needed
    // if (token.role !== 'ADMIN' && pathname.startsWith('/admin')) {
    //   return NextResponse.redirect(new URL('/unauthorized', request.url))
    // }
  }

  // Redirect authenticated users away from auth pages
  if ((pathname === '/login' || pathname === '/register') && token) {
    const callbackUrl = request.nextUrl.searchParams.get('callbackUrl') || '/dashboard'
    return NextResponse.redirect(new URL(callbackUrl, request.url))
  }

  // Add security headers to all responses
  const response = NextResponse.next()
  
  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // For production, add HSTS and other security headers
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
    response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;")
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:png|jpg|jpeg|gif|svg|css|js|woff|woff2|ttf|eot)$).*)',
  ],
}

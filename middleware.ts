import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const publicPaths = ['/login', '/register', '/'];
  
  // Check if the current path is public
  const isPublicPath = publicPaths.includes(path);

  // For public paths, allow access
  if (isPublicPath) {
    return NextResponse.next();
  }

  // For protected paths, we'll let the client-side handle authentication
  // since we're using localStorage for token storage
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

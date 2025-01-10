import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Protect home route (/) and any other routes like /dashboard and /profile
const isProtectedRoute = createRouteMatcher(['/'])

export default clerkMiddleware(async (auth, req) => {
  // If the route is protected, enforce authentication
  if (isProtectedRoute(req)) {
    await auth.protect()  // This will redirect users to the login page if not authenticated
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files (images, CSS, etc.), unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

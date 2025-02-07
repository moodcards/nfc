import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add Permissions-Policy header
  response.headers.set("Permissions-Policy", "interest-cohort=()")

  return response
}

// Configure middleware to run on all paths
export const config = {
  matcher: "/:path*",
}


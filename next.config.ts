import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        protocol: "https",
        hostname: "www.sanfrancisco.net",
      },
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
    ],
  },
  // Configure base path for GitHub Pages
  basePath: process.env.NODE_ENV === "production" ? "/moodcards" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/moodcards" : "",

  // Disable server-side features in static export
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Enable strict mode for better development experience
  reactStrictMode: true,
}

export default nextConfig


import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Configure base path for GitHub Pages
  basePath: process.env.NODE_ENV === "production" ? "/nfc" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/nfc" : "",

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


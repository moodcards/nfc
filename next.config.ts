import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static HTML export
  output: "export",

  // Ensure proper handling of images
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

  // Set basePath and assetPrefix for GitHub Pages
  basePath: "/moodcards",
  assetPrefix: "/moodcards",

  // TypeScript settings
  typescript: {
    ignoreBuildErrors: false, // Strictly enforce build error handling
  },

  // ESLint settings
  eslint: {
    ignoreDuringBuilds: false, // Strictly enforce linting during builds
  },

  // Enable React's Strict Mode for development
  reactStrictMode: true,
};

export default nextConfig;
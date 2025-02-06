import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  // Remove basePath and assetPrefix if you're deploying to the root
  images: {
    unoptimized: true,
    domains: ["v0.blob.com"],
  },
}

export default nextConfig


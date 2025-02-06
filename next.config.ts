import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    domains: ["v0.blob.com"],
  },
}

export default nextConfig


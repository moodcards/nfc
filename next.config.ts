import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "/moodcards" : "",
  basePath: process.env.NODE_ENV === "production" ? "/moodcards" : "",
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "interest-cohort=()",
          },
        ],
      },
    ]
  },
}

export default nextConfig


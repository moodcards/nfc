import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Biz Franchise - Digital Business Card",
  description: "Professional Digital Business Card",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}


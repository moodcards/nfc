import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import type React from "react" // Import React

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Asylbekov Saikal - Digital Business Card",
  description: "Entrepreneur & Franchising Expert",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}


import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Twitter → Knowledge Base → LLM | Transform Bookmarks into AI Context",
  description:
    "Transform your Twitter bookmarks into a queryable knowledge system for AI retrieval. Built with Readwise API, vector search, and conversational AI.",
  keywords: ["Twitter", "Knowledge Base", "LLM", "Readwise", "AI", "Vector Search", "Bookmarks", "FLOAT"],
  authors: [{ name: "Evan Schultz" }],
  creator: "Evan Schultz",
  publisher: "v0.dev",
  generator: "v0.dev",
  metadataBase: new URL("https://v0-readwise-to-claude.vercel.app"),

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://v0-readwise-to-claude.vercel.app",
    title: "Twitter → Knowledge Base → LLM",
    description: "Transform your Twitter bookmarks into a queryable knowledge system for AI retrieval",
    siteName: "Twitter Knowledge Base",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Twitter → Knowledge Base → LLM - Transform bookmarks into AI context",
      },
      {
        url: "/og-image-square.png",
        width: 1200,
        height: 1200,
        alt: "Twitter → Knowledge Base → LLM",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Twitter → Knowledge Base → LLM",
    description: "Transform your Twitter bookmarks into a queryable knowledge system for AI retrieval",
    creator: "@e_p82",
    images: ["/twitter-card.png"],
  },

  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags */}
        <meta name="theme-color" content="#1e293b" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  )
}

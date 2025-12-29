/*
 * ═══════════════════════════════════════════════════════════════
 * ROOT LAYOUT - SAMIYA WEB APP
 * ═══════════════════════════════════════════════════════════════
 *
 * This is the root layout that wraps EVERY page in the app.
 *
 * WHAT IT DOES:
 * - Loads global CSS
 * - Sets up fonts
 * - Adds analytics tracking (GA4, Clarity, TikTok Pixel, Meta Pixel)
 * - Defines metadata (SEO)
 * - Wraps all pages with consistent structure
 *
 * This file only renders ONCE when the app loads.
 *
 * ═══════════════════════════════════════════════════════════════
 */

import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import AnalyticsWrapper from "@/components/analytics/AnalyticsWrapper";
// import AnalyticsWrapper from '@/components/analytics/AnalyticsWrapper' // Temporarily disabled for testing

// ─────────────────────────────────────────────────────────────
// FONT SETUP
// ─────────────────────────────────────────────────────────────
// Next.js automatically optimizes fonts and loads them from Google Fonts

// Inter - Used for body text (paragraphs, buttons, etc.)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Poppins - Used for headings (h1, h2, h3, etc.)
const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

// ─────────────────────────────────────────────────────────────
// METADATA (SEO) - Shows up in Google search results
// ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Samiya - Creative, Helpful, Mom Content",
  description:
    "Join 1M+ people following Samiya for real mom life, creative solutions, and helpful tips. From viral TikTok to your trusted community.",
  keywords: [
    "mom content creator",
    "parenting tips",
    "mom life",
    "creative mom",
    "helpful parenting advice",
    "viral tiktok mom",
    "samiya",
  ],
  authors: [{ name: "Samiya" }],
  creator: "Samiya",

  // Open Graph (how links look when shared on social media)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samiya.com", // TODO: Replace with actual domain
    title: "Samiya - Creative, Helpful, Mom Content",
    description:
      "Join 1M+ people following Samiya for real mom life, creative solutions, and helpful tips.",
    siteName: "Samiya",
    images: [
      {
        url: "/og-image.jpg", // TODO: Add actual image
        width: 1200,
        height: 630,
        alt: "Samiya - Mom Content Creator",
      },
    ],
  },

  // Twitter card (how links look when shared on Twitter/X)
  twitter: {
    card: "summary_large_image",
    title: "Samiya - Creative, Helpful, Mom Content",
    description:
      "Join 1M+ people following Samiya for real mom life, creative solutions, and helpful tips.",
    images: ["/og-image.jpg"], // TODO: Add actual image
    creator: "@samiya", // TODO: Add actual Twitter handle
  },

  // Favicon and app icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Prevent search engines from indexing during development
  // TODO: Remove this line before launch!
  robots: {
    index: false,
    follow: false,
  },
};

// ─────────────────────────────────────────────────────────────
// ROOT LAYOUT COMPONENT
// ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      {/*
        The <head> is automatically managed by Next.js using the metadata above.
        No need to manually add <title>, <meta>, etc.
      */}

      <body className="antialiased">
        {/* 
          AnalyticsWrapper temporarily disabled for testing
          Will enable after confirming basic setup works
        */}
        <AnalyticsWrapper />

        {/* 
          {children} is where the actual page content goes.
          This will be replaced with page.tsx content.
        */}
        {children}
      </body>
    </html>
  );
}

/*
 * ═══════════════════════════════════════════════════════════════
 * HOW THIS FILE WORKS:
 * ═══════════════════════════════════════════════════════════════
 *
 * When a user visits ANY page on the site:
 * 1. This layout renders first
 * 2. Fonts load from Google
 * 3. Analytics scripts initialize
 * 4. Global CSS applies
 * 5. The specific page content ({children}) renders inside this layout
 *
 * Example flow:
 * User visits homepage → layout.tsx loads → page.tsx content inserted into {children}
 *
 * ═══════════════════════════════════════════════════════════════
 *
 * TODO BEFORE LAUNCH:
 * ═══════════════════════════════════════════════════════════════
 *
 * 1. Update domain in metadata (replace 'samiya.com')
 * 2. Add actual social media image (/og-image.jpg)
 * 3. Add Twitter handle
 * 4. Add favicon files to /public folder
 * 5. Remove robots.txt blocking (change to index: true)
 * 6. Test all analytics tracking
 *
 * ═══════════════════════════════════════════════════════════════
 */

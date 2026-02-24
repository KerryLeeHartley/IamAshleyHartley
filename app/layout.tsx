/*
 * ═══════════════════════════════════════════════════════════════
 * ROOT LAYOUT - ASHLEY HARTLEY WEBSITE
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
 * ═══════════════════════════════════════════════════════════════
 */

import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import AnalyticsWrapper from "@/components/analytics/AnalyticsWrapper";

// ─────────────────────────────────────────────────────────────
// FONT SETUP
// ─────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

// ─────────────────────────────────────────────────────────────
// METADATA (SEO)
// ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Ashley Hartley | Founder, Pilates & Faith",
  description:
    "Atlanta-based creator, inventor, and Hot Mat Pilates lover. Follow along for faith, founderhood, wellness, and real life in Atlanta.",
  keywords: [
    "Ashley Hartley",
    "Atlanta creator",
    "hot mat pilates",
    "faith lifestyle",
    "founder journey",
    "UGC creator Atlanta",
    "pilates wellness",
    "mom creator",
  ],
  authors: [{ name: "Ashley Hartley" }],
  creator: "Ashley Hartley",

  // Open Graph (how links look when shared on social media)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iamashleyhartley.com",
    title: "IamAshleyHartley",
    description:
      "Atlanta-based creator, inventor, and Hot Mat Pilates lover. Faith, founderhood, and real life.",
    siteName: "Ashley Hartley",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ashley Hartley",
      },
    ],
  },

  // Twitter/X card
  twitter: {
    card: "summary_large_image",
    title: "IamAshleyHartley",
    description:
      "Atlanta-based creator, inventor, and Hot Mat Pilates lover. Faith, founderhood, and real life.",
    images: ["/og-image.jpg"],
    creator: "@iamashleyhartley",
  },

  // Favicon
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Allow search engines to index the site
  robots: {
    index: true,
    follow: true,
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
      <body className="antialiased">
        <AnalyticsWrapper />
        {children}
      </body>
    </html>
  );
}

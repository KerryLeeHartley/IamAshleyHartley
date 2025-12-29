/*
 * SIMPLIFIED LAYOUT - FOR TESTING
 * This version removes complex imports to help diagnose the issue
 */

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Samiya - Creative, Helpful, Mom Content',
  description: 'Join 1M+ people following Samiya for real mom life, creative solutions, and helpful tips.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

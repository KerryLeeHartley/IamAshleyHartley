/*
 * ═══════════════════════════════════════════════════════════════
 * FOOTER COMPONENT - TO BE COMPLETED
 * ═══════════════════════════════════════════════════════════════
 */

'use client'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <p className="text-xl font-bold mb-4">Samiya</p>
          <p className="text-gray-400 mb-6">
            Creative • Helpful • Mom
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://www.tiktok.com/@samiya" target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink transition-colors">
              TikTok
            </a>
            <a href="https://www.instagram.com/samiya" target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink transition-colors">
              Instagram
            </a>
          </div>
          
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Samiya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

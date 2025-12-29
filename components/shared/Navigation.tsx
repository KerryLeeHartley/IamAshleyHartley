/*
 * ═══════════════════════════════════════════════════════════════
 * NAVIGATION COMPONENT - TO BE COMPLETED
 * ═══════════════════════════════════════════════════════════════
 * 
 * This component will contain:
 * - Logo
 * - Navigation menu (Home, About, Contact)
 * - Mobile hamburger menu
 * - Social media links
 * - All clicks tracked with GA4
 * 
 * COMING IN NEXT ITERATION!
 * 
 * ═══════════════════════════════════════════════════════════════
 */

'use client'

interface NavigationProps {
  scrolled?: boolean
}

export default function Navigation({ scrolled }: NavigationProps) {
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold gradient-text">
            Samiya
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="hover:text-brand-purple transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-brand-purple transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-brand-purple transition-colors">
              Contact
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

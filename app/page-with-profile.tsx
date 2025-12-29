/*
 * ═══════════════════════════════════════════════════════════════
 * LINKTREE-STYLE HOMEPAGE - SAMIYA THE ARTIST
 * ═══════════════════════════════════════════════════════════════
 * 
 * Custom link-in-bio style page featuring:
 * - Email capture modal
 * - TikTok video embeds
 * - Scrollable art gallery
 * - YouTube link
 * - Work With Me contact
 * - All clicks tracked with analytics
 * 
 * ═══════════════════════════════════════════════════════════════
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════
// MAIN HOMEPAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function HomePage() {
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [showTikTok, setShowTikTok] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [email, setEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState('')

  // ─────────────────────────────────────────────────────────────
  // EMAIL SIGNUP HANDLER
  // ─────────────────────────────────────────────────────────────
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailStatus('loading')
    
    // TODO: Connect to Supabase
    // For now, just show success
    setTimeout(() => {
      setEmailStatus('success')
      setEmail('')
      
      // Track conversion
      console.log('📊 Email signup:', email)
      
      setTimeout(() => {
        setShowEmailModal(false)
        setEmailStatus('')
      }, 2000)
    }, 1000)
  }

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          3D HEARTS BACKGROUND (OPTIONAL)
          ═══════════════════════════════════════════════════════
          Uncomment to enable:
          <ThreeDBackground />
      */}
      
      <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white py-12 px-6">
        <div className="max-w-2xl mx-auto">
          
          {/* ═══════════════════════════════════════════════════
              HERO SECTION
              ═══════════════════════════════════════════════════
          */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            {/* Profile Image */}
            <img 
              src="/images/samiya_profile_pic.jpeg"
              alt="Samiya - Painter, Creative, Mom"
              className="w-24 h-24 mx-auto mb-4 rounded-full object-cover shadow-lg border-4 border-white hover:scale-105 transition-transform"
            />
            
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Samiya
            </h1>
            
            <p className="text-xl text-gray-600 mb-1">
              Painter • Creative • Mom
            </p>
            
            <p className="text-sm text-gray-500">
              💕 Join 1M+ people following my creative journey
            </p>
          </motion.div>

          {/* ═══════════════════════════════════════════════════
              LINK BUTTONS
              ═══════════════════════════════════════════════════
          */}
          <div className="space-y-4">
            
            {/* ────────── JOIN COMMUNITY (PRIMARY) ────────── */}
            <LinkButton
              icon="✉️"
              label="Join My Community"
              subtitle="Get weekly painting tips & exclusive content"
              onClick={() => setShowEmailModal(true)}
              isPrimary
            />

            {/* ────────── VIRAL TIKTOK ────────── */}
            <LinkButton
              icon="🎥"
              label="Watch My Viral TikTok"
              subtitle="1.1M+ views • See what everyone's talking about"
              onClick={() => setShowTikTok(!showTikTok)}
              isExpanded={showTikTok}
            />
            
            {/* TikTok Embed (expands when clicked) */}
            <AnimatePresence>
              {showTikTok && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="aspect-[9/16] max-w-xs mx-auto bg-gray-200 rounded-xl flex items-center justify-center">
                      <p className="text-gray-500 text-center px-4">
                        TikTok Embed Here<br/>
                        <span className="text-sm">Add your TikTok video ID</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ────────── ART GALLERY ────────── */}
            <LinkButton
              icon="🎨"
              label="View My Art Gallery"
              subtitle="Browse my latest paintings"
              onClick={() => setShowGallery(!showGallery)}
              isExpanded={showGallery}
            />
            
            {/* Gallery (expands when clicked) */}
            <AnimatePresence>
              {showGallery && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <ArtGallery />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ────────── YOUTUBE ────────── */}
            <LinkButton
              icon="▶️"
              label="YouTube Channel"
              subtitle="Painting tutorials & behind the scenes"
              href="https://youtube.com/@samiya"
              external
            />

            {/* ────────── WORK WITH ME ────────── */}
            <LinkButton
              icon="👋"
              label="Work With Me"
              subtitle="Commissions, collaborations & partnerships"
              onClick={() => setShowContact(!showContact)}
              isExpanded={showContact}
            />
            
            {/* Contact Form (expands when clicked) */}
            <AnimatePresence>
              {showContact && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <ContactForm />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ═══════════════════════════════════════════════════
              FOOTER
              ═══════════════════════════════════════════════════
          */}
          <footer className="mt-16 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Samiya. All rights reserved.</p>
          </footer>
        </div>
      </main>

      {/* ═══════════════════════════════════════════════════════
          EMAIL MODAL
          ═══════════════════════════════════════════════════════
      */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowEmailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">💕</div>
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Join My Community!
                </h2>
                <p className="text-gray-600">
                  Get weekly painting tips, exclusive content, and be the first to see new work!
                </p>
              </div>

              {emailStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <p className="text-xl font-semibold text-green-600">Welcome to the community!</p>
                  <p className="text-gray-600 mt-2">Check your email for a welcome message 💌</p>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-full focus:border-purple-500 focus:outline-none text-lg"
                  />
                  
                  <button
                    type="submit"
                    disabled={emailStatus === 'loading'}
                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold text-lg hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {emailStatus === 'loading' ? 'Joining...' : 'Join Now! 💕'}
                  </button>
                </form>
              )}

              <button
                onClick={() => setShowEmailModal(false)}
                className="mt-4 text-gray-400 hover:text-gray-600 text-sm w-full"
              >
                Maybe later
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════
// LINK BUTTON COMPONENT
// ═══════════════════════════════════════════════════════════════

interface LinkButtonProps {
  icon: string
  label: string
  subtitle?: string
  onClick?: () => void
  href?: string
  external?: boolean
  isPrimary?: boolean
  isExpanded?: boolean
}

function LinkButton({ 
  icon, 
  label, 
  subtitle, 
  onClick, 
  href, 
  external, 
  isPrimary,
  isExpanded 
}: LinkButtonProps) {
  const baseClasses = "block w-full rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
  const primaryClasses = "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
  const secondaryClasses = "bg-white text-gray-800 hover:bg-gray-50"
  
  const content = (
    <div className="flex items-center">
      <div className="text-3xl mr-4">{icon}</div>
      <div className="flex-1 text-left">
        <div className={`font-semibold text-lg ${isPrimary ? 'text-white' : 'text-gray-900'}`}>
          {label}
        </div>
        {subtitle && (
          <div className={`text-sm ${isPrimary ? 'text-white/90' : 'text-gray-500'}`}>
            {subtitle}
          </div>
        )}
      </div>
      {external && (
        <div className="text-xl ml-2">→</div>
      )}
      {isExpanded !== undefined && (
        <div className="text-xl ml-2">{isExpanded ? '▲' : '▼'}</div>
      )}
    </div>
  )

  if (href && external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  )
}

// ═══════════════════════════════════════════════════════════════
// ART GALLERY COMPONENT
// ═══════════════════════════════════════════════════════════════

function ArtGallery() {
  // Placeholder paintings - replace with real images
  const paintings = [
    { id: 1, title: 'Sunset Dreams', image: '/paintings/1.jpg' },
    { id: 2, title: 'Ocean Breeze', image: '/paintings/2.jpg' },
    { id: 3, title: 'Forest Magic', image: '/paintings/3.jpg' },
    { id: 4, title: 'City Lights', image: '/paintings/4.jpg' },
    { id: 5, title: 'Morning Glow', image: '/paintings/5.jpg' },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-center">My Art Gallery 🎨</h3>
      
      {/* Horizontal scrolling gallery */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-2">
          {paintings.map((painting) => (
            <motion.div
              key={painting.id}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 w-64 cursor-pointer"
            >
              <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl overflow-hidden shadow-md">
                {/* Replace with actual images */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎨</div>
                    <div className="text-sm">{painting.title}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-4">
        <a 
          href="/gallery" 
          className="text-purple-600 hover:text-purple-700 font-semibold"
        >
          View Full Gallery →
        </a>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// CONTACT FORM COMPONENT
// ═══════════════════════════════════════════════════════════════

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    // TODO: Connect to Supabase or email service
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    }, 1000)
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-center">Let's Work Together! 👋</h3>
      
      {status === 'success' ? (
        <div className="text-center py-8">
          <div className="text-5xl mb-3">✨</div>
          <p className="text-lg font-semibold text-green-600">Message sent!</p>
          <p className="text-gray-600 mt-2">I'll get back to you soon 💕</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
          />
          
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
          />
          
          <textarea
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            required
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
          />
          
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message 💌'}
          </button>
        </form>
      )}
    </div>
  )
}

/*
 * ═══════════════════════════════════════════════════════════════
 * CUSTOMIZATION GUIDE:
 * ═══════════════════════════════════════════════════════════════
 * 
 * PROFILE IMAGE: Line 79 - /images/samiya_profile_pic.jpeg ✅ DONE!
 * 
 * ADD YOUR DETAILS:
 * 1. Line 134: Add TikTok video URL/embed code
 * 2. Line 422: Add real painting images
 * 3. Line 167: Update YouTube handle
 * 
 * ENABLE 3D HEARTS:
 * Uncomment line 61-63
 * 
 * ADD ANALYTICS:
 * Import tracking functions at top:
 * import { trackEvent } from '@/lib/analytics'
 * 
 * Add to onClick handlers:
 * onClick={() => {
 *   trackEvent('link_click', { link: 'community' })
 *   setShowEmailModal(true)
 * }}
 * 
 * ═══════════════════════════════════════════════════════════════
 */

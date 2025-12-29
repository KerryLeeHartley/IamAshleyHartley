/*
 * ═══════════════════════════════════════════════════════════════
 * HOMEPAGE - VIRAL TIKTOK MOM INFLUENCER MVP
 * ═══════════════════════════════════════════════════════════════
 * 
 * PURPOSE:
 * This is the main landing page that TikTok traffic will hit when they
 * click "link in bio". Goal is to capture emails and track user behavior.
 * 
 * TRACKING IMPLEMENTED:
 * - Google Analytics 4 (GA4) - page views, demographics, events
 * - Microsoft Clarity - session recordings, heatmaps
 * - TikTok Pixel - retargeting, custom audiences
 * - Custom events - every click, scroll, form interaction
 * 
 * CONVERSION GOAL:
 * Get visitors to submit their email so we can build a list and
 * eventually sell products/services to them.
 * 
 * ═══════════════════════════════════════════════════════════════
 */

'use client' // This tells Next.js this is a client-side component (needs browser APIs)

// ═══════════════════════════════════════════════════════════════
// IMPORTS - All the tools we need
// ═══════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react' // React hooks for state management
// import { motion } from 'framer-motion' // Animation library - temporarily disabled
// Temporarily disabled complex imports for testing
// import Navigation from '@/components/shared/Navigation'
// import Footer from '@/components/shared/Footer'
// import EmailCapture from '@/components/homepage/EmailCapture'
// import TikTokEmbed from '@/components/homepage/TikTokEmbed'
// import BrandPillars from '@/components/homepage/BrandPillars'
// import HeroSection from '@/components/homepage/HeroSection'

// Analytics tracking functions - temporarily disabled
// import { 
//   trackPageView, 
//   trackEvent,
//   trackScroll 
// } from '@/lib/analytics'

// ═══════════════════════════════════════════════════════════════
// MAIN HOMEPAGE COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function HomePage() {
  
  // ─────────────────────────────────────────────────────────────
  // STATE MANAGEMENT
  // ─────────────────────────────────────────────────────────────
  // State = data that can change over time (like variables that trigger re-renders)
  
  const [scrolled, setScrolled] = useState(false) // Track if user has scrolled down

  // ─────────────────────────────────────────────────────────────
  // EFFECTS (Run when component loads)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    // Track page view when component mounts (loads for the first time)
    trackPageView('Homepage')

    // Scroll tracking - fires when user scrolls
    const handleScroll = () => {
      const scrollPosition = window.scrollY // How far down user has scrolled
      
      // If scrolled more than 50px, set scrolled to true
      if (scrollPosition > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Track scroll depth at 25%, 50%, 75%, 100%
      trackScroll()
    }

    // Add scroll event listener (listens for scroll events)
    window.addEventListener('scroll', handleScroll)

    // Cleanup function - removes listener when component unmounts
    return () => window.removeEventListener('scroll', handleScroll)
  }, []) // Empty array = only run once when component loads

  // ─────────────────────────────────────────────────────────────
  // EVENT HANDLERS
  // ─────────────────────────────────────────────────────────────
  
  // Track when user clicks a TikTok link
  const handleTikTokClick = (videoTitle: string) => {
    trackEvent('tiktok_click', {
      video_title: videoTitle,
      location: 'homepage_showcase',
      timestamp: new Date().toISOString()
    })
  }

  // Track when user clicks a brand pillar card
  const handlePillarClick = (pillar: string) => {
    trackEvent('pillar_click', {
      pillar_name: pillar,
      location: 'homepage',
      timestamp: new Date().toISOString()
    })
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER (What shows on the page)
  // ─────────────────────────────────────────────────────────────
  return (
    <>
      {/* 
        NAVIGATION BAR 
        - Sticky header that follows user as they scroll
        - Changes style when scrolled (becomes more opaque)
      */}
      <Navigation scrolled={scrolled} />

      {/* 
        MAIN CONTENT WRAPPER 
        - <main> is semantic HTML for main content
        - className applies Tailwind CSS classes
      */}
      <main className="min-h-screen bg-gradient-to-b from-[#FFF5F7] to-white">
        
        {/* ═══════════════════════════════════════════════════════
            HERO SECTION - First thing visitors see
            ═══════════════════════════════════════════════════════
            
            GOAL: Hook them immediately with personality
            
            CONTAINS:
            - Welcome message
            - Short intro video or image
            - Primary CTA (Call To Action)
            - Social proof (1.1M views!)
        */}
        <HeroSection />

        {/* ═══════════════════════════════════════════════════════
            SOCIAL PROOF BANNER
            ═══════════════════════════════════════════════════════
            
            Shows credibility - "Chase is reaching out to me!"
            Creates urgency - "Join before I blow up!"
        */}
        <section className="py-12 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }} // Start invisible and lower
              whileInView={{ opacity: 1, y: 0 }} // Fade in when scrolled into view
              viewport={{ once: true }} // Only animate once
              transition={{ duration: 0.6 }}
            >
              <p className="text-white text-sm font-semibold tracking-wider uppercase mb-2">
                🔥 Going Viral
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                1.1M+ Views & Counting!
              </h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                Brands like Chase are already reaching out. Join my community before I blow up! 🚀
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            TOP CONTENT SHOWCASE
            ═══════════════════════════════════════════════════════
            
            Embeds her top 3 TikTok videos directly on the page
            
            WHY: 
            - Keeps users engaged on OUR site (not redirecting to TikTok)
            - Shows her best content
            - We track which videos resonate most
        */}
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
              >
                My Best Content
              </motion.h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The videos that got me here. Real mom life, real solutions. 💕
              </p>
            </div>

            {/* TikTok Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 
                VIDEO 1: The 1.1M view viral video
                TODO: Replace with actual TikTok embed code
              */}
              <TikTokEmbed 
                videoId="viral-video-1" // Will be replaced with real TikTok ID
                title="The Viral One - 1.1M views!"
                views="1.1M"
                onClick={() => handleTikTokClick('Viral Video 1')}
              />

              {/* VIDEO 2: Second best performing */}
              <TikTokEmbed 
                videoId="viral-video-2"
                title="Mom Hacks That Actually Work"
                views="130K"
                onClick={() => handleTikTokClick('Mom Hacks')}
              />

              {/* VIDEO 3: Third best performing */}
              <TikTokEmbed 
                videoId="viral-video-3"
                title="Real Talk: Parenting Is Hard"
                views="89K"
                onClick={() => handleTikTokClick('Real Talk')}
              />
            </div>

            {/* CTA to see more */}
            <div className="text-center mt-12">
              <motion.a
                href="https://www.tiktok.com/@[HER_HANDLE]" // TODO: Add real TikTok handle
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('view_all_tiktoks', { location: 'homepage' })}
                className="inline-block px-8 py-4 bg-black text-white rounded-full font-semibold text-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All My TikToks →
              </motion.a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            EMAIL CAPTURE SECTION
            ═══════════════════════════════════════════════════════
            
            THE MONEY MAKER - This is where we capture leads
            
            STRATEGY:
            - Position it after they've seen her content (warmed up)
            - Offer value ("Weekly tips just like these!")
            - Make it frictionless (just email, no password)
            - Track everything (form view, typing, submit, errors)
        */}
        <section className="py-24 px-6 lg:px-8 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-4xl mx-auto">
            <EmailCapture />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            BRAND PILLARS SECTION
            ═══════════════════════════════════════════════════════
            
            Shows what she's about: Creative | Helpful | Mom
            
            WHY:
            - Builds brand identity
            - Helps visitors understand what they'll get
            - Segments audience (we track which pillar they click)
        */}
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
              >
                What I'm All About
              </motion.h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Three things you can always expect from me 💕
              </p>
            </div>

            <BrandPillars onPillarClick={handlePillarClick} />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            FINAL CTA SECTION
            ═══════════════════════════════════════════════════════
            
            Last chance to convert visitors before they leave
        */}
        <section className="py-24 px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Let's Stay Connected!
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join my growing community of amazing moms. Weekly tips, behind-the-scenes content, and exclusive updates. 💌
              </p>
              
              {/* Social Media Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="https://www.tiktok.com/@[HER_HANDLE]" // TODO: Add real handle
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('social_click', { platform: 'tiktok', location: 'final_cta' })}
                  className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Follow on TikTok 🎵
                </motion.a>

                <motion.a
                  href="https://www.instagram.com/[HER_HANDLE]" // TODO: Add real handle
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('social_click', { platform: 'instagram', location: 'final_cta' })}
                  className="px-8 py-4 bg-white/10 text-white border-2 border-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Follow on Instagram 📸
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER - Legal links, social links, copyright */}
      <Footer />
    </>
  )
}

/*
 * ═══════════════════════════════════════════════════════════════
 * NEXT STEPS TO CUSTOMIZE THIS FILE:
 * ═══════════════════════════════════════════════════════════════
 * 
 * 1. Replace [HER_HANDLE] with actual TikTok/Instagram handles
 * 2. Get real TikTok video IDs for the top 3 videos
 * 3. Add her actual brand colors if different from pink/purple
 * 4. Update copy to match her voice (is she funny? Serious? Sassy?)
 * 5. Add her logo/profile image to hero section
 * 6. Connect email form to Supabase (we'll do this next)
 * 
 * ═══════════════════════════════════════════════════════════════
 */

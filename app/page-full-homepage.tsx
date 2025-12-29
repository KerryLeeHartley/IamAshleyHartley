/*
 * SIMPLIFIED HOMEPAGE - FOR TESTING
 * This version has minimal imports to get you started
 */

'use client'

import { useState } from 'react'
import ThreeDBackground from '@/components/3d/ThreeDBackground'

export default function HomePage() {
  const [email, setEmail] = useState('')
  
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          3D BACKGROUND
          ═══════════════════════════════════════════════════════
          Your 3D model appears as a fixed background layer.
          All content below will appear on top of it.
      */}
      <ThreeDBackground />
      
      <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Samiya
            </div>
            <div className="hidden md:flex gap-6">
              <a href="/" className="hover:text-purple-600">Home</a>
              <a href="#about" className="hover:text-purple-600">About</a>
              <a href="#contact" className="hover:text-purple-600">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Hey! I'm Samiya 👋
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Creative mom sharing real life, helpful tips, and authentic moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold text-lg hover:opacity-90 transition-all">
              Join My Community
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-purple-500 text-purple-500 rounded-full font-semibold text-lg hover:bg-purple-500 hover:text-white transition-all">
              Watch My TikToks
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-white text-sm font-semibold tracking-wider uppercase mb-2">
            🔥 Going Viral
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            1.1M+ Views & Counting!
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Brands like Chase are already reaching out. Join my community before I blow up! 🚀
          </p>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-24 px-6 bg-pink-50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Join My Community 💕
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get weekly tips, exclusive content, and be the first to know about new projects!
            </p>
            
            <form onSubmit={(e) => {
              e.preventDefault()
              alert(`Thank you! Email: ${email}\n\nNote: Database not connected yet. Check SETUP-STEPS.md to set up Supabase.`)
            }} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-full focus:border-purple-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold hover:opacity-90 transition-all"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Brand Pillars */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              What I'm All About
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three things you can always expect from me 💕
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: '🎨', title: 'Creative', desc: 'Fresh ideas and unique perspectives on everyday life' },
              { emoji: '💡', title: 'Helpful', desc: 'Practical tips and solutions that actually work' },
              { emoji: '❤️', title: 'Mom', desc: 'Real talk about parenting, no filters' }
            ].map((pillar) => (
              <div key={pillar.title} className="bg-white rounded-2xl shadow-xl p-8 text-center hover:transform hover:-translate-y-2 transition-all cursor-pointer">
                <div className="text-6xl mb-4">{pillar.emoji}</div>
                <h3 className="text-2xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-gray-600">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xl font-bold mb-4">Samiya</p>
          <p className="text-gray-400 mb-6">Creative • Helpful • Mom</p>
          
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://www.tiktok.com/@samiya" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
              TikTok
            </a>
            <a href="https://www.instagram.com/samiya" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
              Instagram
            </a>
          </div>
          
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Samiya. All rights reserved.
          </p>
        </div>
      </footer>
      </main>
    </>
  )
}

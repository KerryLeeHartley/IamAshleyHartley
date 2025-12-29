/*
 * ═══════════════════════════════════════════════════════════════
 * FULL ART GALLERY PAGE - SAMIYA'S PAINTINGS
 * ═══════════════════════════════════════════════════════════════
 * 
 * Dedicated page to showcase all of Samiya's artwork
 * Grid layout, lightbox functionality, filtered by category
 * 
 * ═══════════════════════════════════════════════════════════════
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function GalleryPage() {
  const [selectedPainting, setSelectedPainting] = useState<any>(null)
  const [filter, setFilter] = useState('all')

  // Placeholder paintings - replace with real data
  const paintings = [
    { id: 1, title: 'Sunset Dreams', category: 'landscape', price: '$250', image: '/paintings/1.jpg', description: 'Acrylic on canvas, 16x20"' },
    { id: 2, title: 'Ocean Breeze', category: 'seascape', price: '$300', image: '/paintings/2.jpg', description: 'Oil on canvas, 18x24"' },
    { id: 3, title: 'Forest Magic', category: 'landscape', price: '$200', image: '/paintings/3.jpg', description: 'Watercolor, 12x16"' },
    { id: 4, title: 'City Lights', category: 'urban', price: '$350', image: '/paintings/4.jpg', description: 'Mixed media, 20x30"' },
    { id: 5, title: 'Morning Glow', category: 'abstract', price: '$275', image: '/paintings/5.jpg', description: 'Acrylic on canvas, 16x20"' },
    { id: 6, title: 'Desert Rose', category: 'landscape', price: '$225', image: '/paintings/6.jpg', description: 'Oil on canvas, 14x18"' },
    { id: 7, title: 'Moonlit Waters', category: 'seascape', price: '$300', image: '/paintings/7.jpg', description: 'Acrylic on canvas, 18x24"' },
    { id: 8, title: 'Urban Dreams', category: 'urban', price: '$400', image: '/paintings/8.jpg', description: 'Mixed media, 24x36"' },
  ]

  const categories = ['all', 'landscape', 'seascape', 'urban', 'abstract']
  
  const filteredPaintings = filter === 'all' 
    ? paintings 
    : paintings.filter(p => p.category === filter)

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            href="/" 
            className="inline-block mb-6 text-purple-600 hover:text-purple-700 font-semibold"
          >
            ← Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            My Art Gallery 🎨
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Original paintings created with love. Each piece tells a story.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                filter === cat
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPaintings.map((painting) => (
            <motion.div
              key={painting.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedPainting(painting)}
              className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
            >
              {/* Image */}
              <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center overflow-hidden">
                <div className="text-6xl">🎨</div>
                {/* Replace with: <img src={painting.image} alt={painting.title} /> */}
              </div>
              
              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                  {painting.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{painting.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-600">{painting.price}</span>
                  <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                    Inquire
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredPaintings.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎨</div>
            <p className="text-xl text-gray-600">No paintings in this category yet!</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPainting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPainting(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                <div className="text-8xl">🎨</div>
              </div>
              
              {/* Details */}
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-2">{selectedPainting.title}</h2>
                <p className="text-gray-600 mb-4">{selectedPainting.description}</p>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-purple-600">{selectedPainting.price}</span>
                  <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    {selectedPainting.category}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
                    Purchase Original 💕
                  </button>
                  
                  <button className="w-full py-4 bg-white border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
                    Commission Similar Work
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

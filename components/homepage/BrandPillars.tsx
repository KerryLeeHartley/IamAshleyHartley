'use client'

import { motion } from 'framer-motion'

interface BrandPillarsProps {
  onPillarClick?: (pillar: string) => void
}

export default function BrandPillars({ onPillarClick }: BrandPillarsProps) {
  const pillars = [
    {
      id: 'creative',
      title: 'Creative',
      description: 'Fresh ideas and unique perspectives on everyday life',
      emoji: '🎨',
      color: 'from-pink-500 to-purple-500'
    },
    {
      id: 'helpful',
      title: 'Helpful',
      description: 'Practical tips and solutions that actually work',
      emoji: '💡',
      color: 'from-purple-500 to-blue-500'
    },
    {
      id: 'mom',
      title: 'Mom',
      description: 'Real talk about parenting, no filters',
      emoji: '❤️',
      color: 'from-pink-500 to-red-500'
    }
  ]
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {pillars.map((pillar, index) => (
        <motion.div
          key={pillar.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          onClick={() => onPillarClick?.(pillar.id)}
          className="bg-white rounded-2xl shadow-xl p-8 text-center card-hover cursor-pointer"
        >
          <div className="text-6xl mb-4">{pillar.emoji}</div>
          <h3 className="text-2xl font-bold mb-3">{pillar.title}</h3>
          <p className="text-gray-600">{pillar.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

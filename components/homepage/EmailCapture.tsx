'use client'

import { useState } from 'react'
import { saveSubscriber } from '@/lib/supabase'
import { emailFormTracking } from '@/lib/analytics'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    emailFormTracking.submit('homepage')
    
    const { data, error } = await saveSubscriber(email, 'homepage')
    
    if (error) {
      setMessage('Error: ' + error.message)
      emailFormTracking.error('homepage', error.message)
    } else {
      setMessage('Success! Check your email 💌')
      emailFormTracking.success('homepage', email)
      setEmail('')
    }
    
    setLoading(false)
  }
  
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-4">
        Join My Community 💕
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Get weekly tips, exclusive content, and be the first to know about new projects!
      </p>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1"
            onFocus={() => emailFormTracking.startTyping('homepage')}
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
        {message && (
          <p className={`mt-4 ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}

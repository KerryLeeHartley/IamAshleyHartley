'use client'

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-cream to-white px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
          Hey! I'm Samiya 👋
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Creative mom sharing real life, helpful tips, and authentic moments.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary">
            Join My Community
          </button>
          <button className="btn-secondary">
            Watch My TikToks
          </button>
        </div>
      </div>
    </section>
  )
}

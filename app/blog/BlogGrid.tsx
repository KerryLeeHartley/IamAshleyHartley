// ═══════════════════════════════════════════════════════════════
// COMPONENT: BlogGrid
// FILE: app/blog/BlogGrid.tsx
// ═══════════════════════════════════════════════════════════════
//
// WHAT THIS IS:
//   The interactive part of the blog page.
//   - Shows category filter buttons (All, Faith, Pilates, etc.)
//   - Shows a grid of post cards
//   - When user clicks a filter, grid updates to show only
//     posts in that category — instantly, no page reload.
//
// WHY 'use client'?
//   useState (for tracking which filter is active) only works
//   in client components. The parent BlogPage is a server
//   component that fetches data; this component receives that
//   data and handles the interactive parts.
//
// WHY IS urlFor DEFINED HERE (not passed as a prop)?
//   Next.js does not allow passing functions as props from
//   server components to client components. So instead of
//   getting urlFor from the parent, we set it up right here.
//
// ═══════════════════════════════════════════════════════════════

'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { BlogPost } from './page'

// ─────────────────────────────────────────────────────────────
// SANITY CLIENT + IMAGE URL BUILDER
// Defined here (client side) because Next.js won't let us
// pass the urlFor function down from the server component.
// This is a lightweight read-only client — safe to use here.
// ─────────────────────────────────────────────────────────────
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-20',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

// ─────────────────────────────────────────────────────────────
// CATEGORY CONFIG
// ─────────────────────────────────────────────────────────────
const CATEGORIES = [
  { value: 'all',       label: 'All Posts',          emoji: '🦋' },
  { value: 'founder',   label: 'Founder Journey',    emoji: '✨' },
  { value: 'faith',     label: 'Faith',              emoji: '🙏' },
  { value: 'wellness',  label: 'Pilates & Wellness',  emoji: '🔥' },
  { value: 'dreamlife', label: 'Dream Life',          emoji: '💭' },
  { value: 'lifestyle', label: 'Lifestyle',           emoji: '🌿' },
  { value: 'home',      label: 'Home',                emoji: '🏡' },
]

const CATEGORY_LABELS: Record<string, string> = {
  faith:     'Faith',
  wellness:  'Pilates & Wellness',
  dreamlife: 'Dream Life',
  founder:   'Founder Journey',
  lifestyle: 'Lifestyle',
  home:      'Home',
}

interface BlogGridProps {
  posts: BlogPost[]
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function BlogGrid({ posts }: BlogGridProps) {

  const [activeFilter, setActiveFilter] = useState('all')

  const filteredPosts = activeFilter === 'all'
    ? posts
    : posts.filter(post => post.category === activeFilter)

  return (
    <div className="max-w-6xl mx-auto px-6 pb-8">

      {/* ── CATEGORY FILTER BUTTONS ── */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setActiveFilter(cat.value)}
            className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap"
            style={
              activeFilter === cat.value
                ? { backgroundColor: '#8B2E1E', color: '#FFFFFF', transform: 'scale(1.02)' }
                : { backgroundColor: '#F0E0D6', color: '#8B4A3C' }
            }
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* ── POST COUNT ── */}
      <p className="text-sm mb-6" style={{ color: '#B07060' }}>
        {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
        {activeFilter !== 'all' && ` in ${CATEGORY_LABELS[activeFilter] || activeFilter}`}
      </p>

      {/* ── POST GRID ── */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">📝</p>
          <p style={{ color: '#8B4A3C', fontStyle: 'italic' }}>
            No posts in this category yet — check back soon!
          </p>
        </div>
      )}

    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// POST CARD COMPONENT
// ═══════════════════════════════════════════════════════════════
function PostCard({ post }: { post: BlogPost }) {

  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(600).url()
    : null

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  const categoryLabel = post.category
    ? CATEGORY_LABELS[post.category] || post.category
    : null

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      {/* ── COVER IMAGE ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: '220px', backgroundColor: '#F5EBE4' }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #F5EBE4 0%, #EDD5C5 100%)' }}
          >
            <span style={{ fontSize: '48px', opacity: 0.4 }}>✍️</span>
          </div>
        )}

        {categoryLabel && (
          <div className="absolute top-3 left-3">
            <span
              className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full"
              style={{
                backgroundColor: 'rgba(255,255,255,0.92)',
                color: '#8B2E1E',
                backdropFilter: 'blur(4px)',
              }}
            >
              {categoryLabel}
            </span>
          </div>
        )}
      </div>

      {/* ── CARD TEXT ── */}
      <div className="p-5">
        <h2
          className="font-bold text-lg mb-2 leading-snug"
          style={{
            color: '#2C1810',
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          {post.title}
        </h2>

        {post.excerpt && (
          <p
            className="text-sm leading-relaxed mb-4 line-clamp-2"
            style={{ color: '#7A5A52' }}
          >
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between">
          {formattedDate && (
            <span className="text-xs" style={{ color: '#B07060' }}>
              {formattedDate}
            </span>
          )}
          <span
            className="text-xs font-medium group-hover:underline"
            style={{ color: '#8B2E1E' }}
          >
            Read more →
          </span>
        </div>
      </div>
    </Link>
  )
}

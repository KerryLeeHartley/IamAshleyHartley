// ═══════════════════════════════════════════════════════════════
// COMPONENT: VlogPlayer
// FILE: app/vlog/[slug]/VlogPlayer.tsx
// ═══════════════════════════════════════════════════════════════
//
// WHAT THIS IS:
//   The interactive YouTube video player for the vlog page.
//   It's a separate "use client" component because it needs
//   useState to track muted/unmuted state.
//
// HOW AUTO-PLAY WORKS:
//   Browsers block autoplay WITH sound. The workaround:
//   1. Embed loads with autoplay=1&mute=1 (starts playing, silently)
//   2. A big overlay button says "🔊 Tap to unmute"
//   3. User clicks → overlay disappears → sound turns on
//   This is the exact technique used by major media sites.
//
// PROPS:
//   - videoId  → YouTube video ID (e.g. "dQw4w9WgXcQ")
//   - title    → Used for accessibility (iframe title attribute)
//
// ═══════════════════════════════════════════════════════════════

'use client'

import { useState } from 'react'

interface VlogPlayerProps {
  videoId: string
  title: string
}

export default function VlogPlayer({ videoId, title }: VlogPlayerProps) {

  // ── MUTE STATE ───────────────────────────────────────────────
  // true  = video is muted (default — required for autoplay)
  // false = user clicked, video is now playing with sound
  const [muted, setMuted] = useState(true)

  // ── BUILD EMBED URL ──────────────────────────────────────────
  // YouTube embed parameters:
  // autoplay=1        → start playing immediately
  // mute=1/0          → muted or not (changes when user clicks)
  // rel=0             → don't show related videos at the end
  // modestbranding=1  → minimal YouTube logo
  // playsinline=1     → plays inline on iOS (not fullscreen)
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&rel=0&modestbranding=1&playsinline=1`

  return (
    <div style={{ marginBottom: 20 }}>

      {/* ── VIDEO CONTAINER ─────────────────────────────────
          16:9 aspect ratio using the padding-top trick.
          The iframe fills this container absolutely.         */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%', // 16:9 ratio (9/16 = 0.5625)
          borderRadius: 20,
          overflow: 'hidden',
          background: '#1A0A08',
          boxShadow: '0 16px 48px rgba(192,57,43,0.2)',
        }}
      >
        {/* YouTube iframe embed */}
        <iframe
          key={muted ? 'muted' : 'unmuted'}
          // key forces React to remount iframe when mute changes
          // This is necessary because YouTube doesn't respond to
          // src changes dynamically — we need a full remount
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            border: 'none',
          }}
        />

        {/* ── UNMUTE OVERLAY ──────────────────────────────────
            Only shown when video is muted.
            Big, obvious button so users know they can get sound.
            Disappears permanently when clicked.              */}
        {muted && (
          <button
            onClick={() => setMuted(false)}
            style={{
              position: 'absolute',
              bottom: 16, left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px',
              background: 'rgba(26,10,8,0.75)',
              backdropFilter: 'blur(8px)',
              color: 'white', border: 'none',
              borderRadius: 100, cursor: 'pointer',
              fontSize: '0.82rem', fontWeight: 700,
              letterSpacing: '0.04em',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              transition: 'all 0.2s ease',
              zIndex: 10,
              whiteSpace: 'nowrap',
            }}
          >
            {/* Speaker icon */}
            <svg viewBox="0 0 24 24" fill="white" style={{ width: 16, height: 16, flexShrink: 0 }}>
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            🔊 Tap to unmute
          </button>
        )}
      </div>

      {/* ── MUTE STATUS TEXT ──────────────────────────────────
          Small helper text under the video              */}
      {muted && (
        <p style={{
          fontSize: '0.72rem', color: '#B07060',
          textAlign: 'center', marginTop: 8, marginBottom: 0,
        }}>
          Video playing silently — tap above to unmute
        </p>
      )}
    </div>
  )
}

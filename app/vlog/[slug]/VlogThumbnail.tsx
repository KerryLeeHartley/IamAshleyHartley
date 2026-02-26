'use client'

// ─────────────────────────────────────────────────────────────
// VlogThumbnail
// A tiny client component just for handling image load errors.
// We need 'use client' because onError is an event handler.
// ─────────────────────────────────────────────────────────────

interface VlogThumbnailProps {
  src: string
  alt: string
  fallbackSrc: string
}

export default function VlogThumbnail({ src, alt, fallbackSrc }: VlogThumbnailProps) {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      onError={(e) => {
        (e.target as HTMLImageElement).src = fallbackSrc
      }}
    />
  )
}

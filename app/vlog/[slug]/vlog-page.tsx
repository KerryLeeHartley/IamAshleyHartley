// ═══════════════════════════════════════════════════════════════
// PAGE: /vlog/[slug]  →  app/vlog/[slug]/page.tsx
// ═══════════════════════════════════════════════════════════════
//
// WHAT THIS IS:
//   A high-converting vlog landing page for ad traffic.
//   Instead of sending ads to YouTube (where you lose control),
//   you send them HERE — a branded page where:
//   - All 6 pixels fire (retargeting data)
//   - Email capture happens
//   - Product links generate affiliate revenue
//   - YouTube still gets the view/watch time
//
// PAGE STRUCTURE:
//   1. Auto-playing YouTube embed (muted on load — browser rules)
//   2. Video title + category + date
//   3. YouTube Subscribe button
//   4. "Shop This Video" product links (from Sanity)
//   5. Full transcript (with affiliate links woven in via Sanity)
//   6. Email signup CTA
//   7. Related vlogs
//
// HOW AUTO-PLAY WORKS:
//   Browsers block auto-play with sound. So we autoplay MUTED,
//   with a big "▶ Tap to unmute" button overlay. This is the
//   same technique used by major media sites.
//   YouTube embed params used:
//   - autoplay=1  → starts playing
//   - mute=1      → muted (required by browsers)
//   - rel=0       → no related videos at end
//   - modestbranding=1 → minimal YouTube branding
//
// SANITY FIELDS USED (from vlogPost schema):
//   - title          → page heading
//   - slug           → URL /vlog/[slug]
//   - youtubeUrl     → converted to embed URL
//   - category       → category tag
//   - publishedAt    → date shown
//   - transcript     → full text below video
//   - productLinks[] → "Shop This Video" section (new field)
//
// ═══════════════════════════════════════════════════════════════

export const revalidate = 60

import { client } from '@/lib/sanity'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import EmailSignupForm from '@/components/EmailSignupForm'
import VlogPlayer from './VlogPlayer'

// ─────────────────────────────────────────────────────────────
// FETCH VLOG POST FROM SANITY
// ─────────────────────────────────────────────────────────────
async function getVlogPost(slug: string) {
  return client.fetch(
    `*[_type == "vlogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      youtubeUrl,
      category,
      publishedAt,
      transcript,
      productLinks[] {
        name,
        url,
        description
      }
    }`,
    { slug }
  )
}

// Fetch related vlogs (same category, excluding current)
async function getRelatedVlogs(category: string, currentId: string) {
  return client.fetch(
    `*[_type == "vlogPost" && category == $category && _id != $currentId] | order(publishedAt desc) [0...4] {
      _id, title, slug, youtubeUrl, category
    }`,
    { category, currentId }
  )
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function getYouTubeId(url: string): string {
  const match = url.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : ''
}

function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

const categoryLabels: Record<string, string> = {
  vlog: 'Vlog',
  pilates: 'Pilates',
  faith: 'Faith & Lifestyle',
  home: 'Home & Decor',
}

// ─────────────────────────────────────────────────────────────
// GENERATE METADATA FOR SEO
// Each vlog page gets its own title/description in Google
// ─────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getVlogPost(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Ashley Hartley`,
    description: post.transcript
      ? post.transcript.slice(0, 155) + '...'
      : `Watch ${post.title} on Ashley Hartley's channel.`,
  }
}

// ─────────────────────────────────────────────────────────────
// SCRIBBLES (matches blog post page aesthetic)
// ─────────────────────────────────────────────────────────────
function Scribbles() {
  return (
    <svg
      style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: 0.07,
      }}
      viewBox="0 0 800 1000"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <circle cx="80" cy="120" r="55" stroke="#C0392B" strokeWidth="1.5" strokeDasharray="8 6" />
      <path d="M-20 80 Q100 40 200 90 Q300 140 420 70 Q540 10 660 80 Q760 130 820 60" stroke="#C0392B" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M620 700 L650 730 L680 700 L710 730 L740 700 L770 730" stroke="#C0392B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M-10 900 Q120 870 240 905 Q360 940 480 900 Q600 860 720 900 Q780 920 820 890" stroke="#C0392B" strokeWidth="1" strokeLinecap="round" strokeDasharray="6 5" />
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT (Server Component)
// ═══════════════════════════════════════════════════════════════
export default async function VlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getVlogPost(params.slug)
  if (!post) notFound()

  const videoId = getYouTubeId(post.youtubeUrl)
  const relatedVlogs = post.category
    ? await getRelatedVlogs(post.category, post._id)
    : []

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#FDF6F0',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .back-link:hover { color: #C0392B !important; }
        .product-card:hover { transform: translateY(-2px) !important; box-shadow: 0 12px 32px rgba(192,57,43,0.18) !important; }
        .related-card:hover { transform: translateY(-4px) !important; box-shadow: 0 16px 40px rgba(192,57,43,0.2) !important; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatOrb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,-30px) scale(1.06)} 66%{transform:translate(-15px,15px) scale(0.94)} }
        .a0{animation:fadeUp .6s ease 0s both}
        .a1{animation:fadeUp .6s ease .1s both}
        .a2{animation:fadeUp .6s ease .2s both}
        .a3{animation:fadeUp .6s ease .3s both}
        .a4{animation:fadeUp .6s ease .4s both}
        .a5{animation:fadeUp .6s ease .5s both}
      `}</style>

      {/* Background orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', width: 480, height: 480, borderRadius: '50%',
          background: '#C0392B', filter: 'blur(90px)', opacity: 0.14,
          top: -140, right: -100, animation: 'floatOrb 11s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 360, height: 360, borderRadius: '50%',
          background: '#F5C6C0', filter: 'blur(90px)', opacity: 0.2,
          bottom: 80, left: -80, animation: 'floatOrb 15s ease-in-out infinite reverse',
        }} />
      </div>
      <Scribbles />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 560, margin: '0 auto',
        padding: '44px 24px 60px',
      }}>

        {/* ── BACK LINK ──────────────────────────────────── */}
        <div className="a0" style={{ marginBottom: 24 }}>
          <Link
            href="/"
            className="back-link"
            style={{
              fontSize: '0.85rem', color: '#7A3030',
              textDecoration: 'none', display: 'inline-flex',
              alignItems: 'center', gap: 6, fontWeight: 500,
              transition: 'color 0.2s ease',
            }}
          >
            ← Back to Home
          </Link>
        </div>

        {/* ── META (category + date) ─────────────────────── */}
        <div className="a1" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {post.category && (
              <span style={{
                fontSize: '0.7rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                background: 'rgba(192,57,43,0.1)', color: '#C0392B',
                padding: '4px 12px', borderRadius: 100,
              }}>
                {categoryLabels[post.category] || post.category}
              </span>
            )}
            {formattedDate && (
              <span style={{ fontSize: '0.78rem', color: '#7A3030' }}>
                {formattedDate}
              </span>
            )}
          </div>
        </div>

        {/* ── TITLE ─────────────────────────────────────── */}
        <h1
          className="a1"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '2.2rem', fontWeight: 600,
            color: '#1A0A08', letterSpacing: '-0.02em',
            lineHeight: 1.15, margin: '0 0 28px',
          }}
        >
          {post.title}
        </h1>

        {/* ══════════════════════════════════════════════════
            VIDEO PLAYER
            VlogPlayer is a client component because it needs
            JavaScript to handle the mute/unmute interaction.
            The server component passes the videoId down to it.
        ══════════════════════════════════════════════════ */}
        <div className="a2">
          <VlogPlayer videoId={videoId} title={post.title} />
        </div>

        {/* ── YOUTUBE SUBSCRIBE BUTTON ───────────────────── */}
        <div className="a2" style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 32 }}>
          <a
            href="https://youtube.com/@iamashleyhartley?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 28px', background: '#FF0000',
              color: 'white', borderRadius: 100, textDecoration: 'none',
              fontWeight: 700, fontSize: '0.88rem',
              boxShadow: '0 4px 16px rgba(255,0,0,0.3)',
              transition: 'all 0.25s ease',
            }}
          >
            <svg viewBox="0 0 24 24" fill="white" style={{ width: 18, height: 18 }}>
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Subscribe on YouTube
          </a>
        </div>

        {/* ══════════════════════════════════════════════════
            SHOP THIS VIDEO
            Product links added in Sanity CMS.
            Ashley pastes affiliate URLs when publishing the vlog.
            Only shows if productLinks array has items.
        ══════════════════════════════════════════════════ */}
        {post.productLinks && post.productLinks.length > 0 && (
          <div className="a3" style={{ marginBottom: 40 }}>
            <p style={{
              fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase' as const,
              color: '#C0392B', marginBottom: 14, marginTop: 0,
            }}>
              🛍️ Shop This Video
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
              {post.productLinks.map((product: any, i: number) => (
                <a
                  key={i}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="product-card"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 18px',
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1.5px solid rgba(192,57,43,0.12)',
                    borderRadius: 16, textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 4px 16px rgba(26,10,8,0.06)',
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(192,57,43,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontSize: '1rem',
                  }}>
                    🔗
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '0.88rem', fontWeight: 700,
                      color: '#1A0A08', margin: 0, lineHeight: 1.3,
                    }}>
                      {product.name}
                    </p>
                    {product.description && (
                      <p style={{
                        fontSize: '0.75rem', color: '#7A3030',
                        margin: '2px 0 0', lineHeight: 1.4,
                      }}>
                        {product.description}
                      </p>
                    )}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#C0392B', fontWeight: 600, flexShrink: 0 }}>
                    Shop →
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ── DIVIDER ───────────────────────────────────── */}
        <div style={{
          width: '100%', height: 1,
          background: 'linear-gradient(to right, #C0392B30, transparent)',
          marginBottom: 32,
        }} />

        {/* ══════════════════════════════════════════════════
            TRANSCRIPT
            Full video transcript pulled from Sanity.
            Google indexes this text → FREE SEO from every video.
            Ashley pastes the YouTube auto-transcript here.
        ══════════════════════════════════════════════════ */}
        {post.transcript && (
          <div className="a4" style={{ marginBottom: 48 }}>
            <p style={{
              fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase' as const,
              color: '#C0392B', marginBottom: 16, marginTop: 0,
            }}>
              📝 Full Transcript
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(192,57,43,0.08)',
              borderRadius: 20, padding: '24px 22px',
            }}>
              {post.transcript.split('\n').filter(Boolean).map((para: string, i: number) => (
                <p key={i} style={{
                  fontSize: '0.95rem', lineHeight: 1.85,
                  color: '#3D1A1A', marginBottom: '1.2em', marginTop: 0,
                }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            EMAIL SIGNUP CTA
            Primary conversion goal for ad traffic.
            Catch viewers before they leave.
        ══════════════════════════════════════════════════ */}
        <div
          className="a4"
          style={{
            marginBottom: 48, padding: '28px 24px',
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(192,57,43,0.12)',
            borderRadius: 24, textAlign: 'center',
            boxShadow: '0 8px 32px rgba(26,10,8,0.05)',
          }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.5rem', fontWeight: 600,
            color: '#1A0A08', marginBottom: 6, marginTop: 0,
          }}>
            Want more like this? 🦋
          </p>
          <p style={{
            fontSize: '0.85rem', color: '#7A3030',
            marginBottom: 18, lineHeight: 1.5, marginTop: 0,
          }}>
            Get weekly updates, Pilates tips & behind the scenes straight to your inbox.
          </p>
          <EmailSignupForm source="vlog-page" />
        </div>

        {/* ══════════════════════════════════════════════════
            RELATED VLOGS
            Shows up to 4 videos in the same category.
            Keeps people on your site longer + more YouTube views.
        ══════════════════════════════════════════════════ */}
        {relatedVlogs.length > 0 && (
          <div className="a5" style={{ marginBottom: 40 }}>
            <p style={{
              fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase' as const,
              color: '#C0392B', marginBottom: 16, marginTop: 0,
            }}>
              ▶ More Videos
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
              {relatedVlogs.map((v: any) => {
                const vid = getYouTubeId(v.youtubeUrl)
                const thumb = getYouTubeThumbnail(vid)
                return (
                  <Link
                    key={v._id}
                    href={`/vlog/${v.slug?.current}`}
                    className="related-card"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '10px 10px',
                      background: 'rgba(255,255,255,0.85)',
                      backdropFilter: 'blur(12px)',
                      border: '1.5px solid rgba(192,57,43,0.1)',
                      borderRadius: 16, textDecoration: 'none',
                      transition: 'all 0.25s ease',
                      boxShadow: '0 4px 16px rgba(26,10,8,0.06)',
                    }}
                  >
                    <div style={{
                      width: 80, height: 52, borderRadius: 10,
                      overflow: 'hidden', flexShrink: 0,
                      background: '#1A0A08', position: 'relative',
                    }}>
                      <img
                        src={thumb}
                        alt={v.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`
                        }}
                      />
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,0,0,0.2)',
                      }}>
                        <div style={{
                          width: 24, height: 24, borderRadius: '50%',
                          background: 'rgba(192,57,43,0.9)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <svg viewBox="0 0 24 24" fill="white" style={{ width: 10, height: 10, marginLeft: 1 }}>
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p style={{
                      fontSize: '0.85rem', fontWeight: 600,
                      color: '#1A0A08', margin: 0, lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical' as const,
                      overflow: 'hidden',
                    }}>
                      {v.title}
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* ── FOOTER ───────────────────────────────────── */}
        <footer style={{
          fontSize: '0.75rem', color: '#7A3030',
          textAlign: 'center', opacity: 0.7, marginTop: 20,
        }}>
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} Ashley Hartley · Made with 💕 in Atlanta
          </p>
        </footer>
      </div>
    </main>
  )
}

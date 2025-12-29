/*
 * ═══════════════════════════════════════════════════════════════
 * TYPESCRIPT TYPES - SAMIYA WEB APP
 * ═══════════════════════════════════════════════════════════════
 * 
 * This file defines all the data structures (types) used in the app.
 * 
 * WHY USE TYPES?
 * - Catch errors before runtime
 * - Get autocomplete in VS Code
 * - Make code self-documenting
 * - Easier refactoring
 * 
 * ═══════════════════════════════════════════════════════════════
 */

// ─────────────────────────────────────────────────────────────
// SUBSCRIBER TYPE (Email signups)
// ─────────────────────────────────────────────────────────────
export interface Subscriber {
  id?: string                  // UUID from Supabase (optional because it's auto-generated)
  email: string                // User's email address
  subscribed_at?: Date         // When they signed up (optional, auto-generated)
  source?: string              // Where they signed up ('homepage', 'popup', 'blog')
  utm_source?: string          // Traffic source (e.g., 'tiktok', 'instagram')
  utm_campaign?: string        // Campaign name (e.g., 'viral-video-1')
  status?: 'active' | 'unsubscribed'  // Subscription status
}

// ─────────────────────────────────────────────────────────────
// ANALYTICS EVENT TYPE (Custom tracking)
// ─────────────────────────────────────────────────────────────
export interface AnalyticsEvent {
  id?: string                  // UUID from Supabase
  event_name: string           // Event name (e.g., 'video_click', 'email_signup')
  event_data?: Record<string, any>  // Flexible data object (any additional info)
  user_id?: string             // User ID if logged in (null for anonymous)
  session_id?: string          // Session ID to track same user across pages
  created_at?: Date            // When the event occurred
}

// ─────────────────────────────────────────────────────────────
// TIKTOK VIDEO TYPE (For embedded videos)
// ─────────────────────────────────────────────────────────────
export interface TikTokVideo {
  id: string                   // TikTok video ID
  url: string                  // Full TikTok URL
  title: string                // Video title/description
  views: string                // View count (e.g., '1.1M')
  thumbnail?: string           // Thumbnail image URL
  embedUrl: string             // TikTok embed URL
}

// ─────────────────────────────────────────────────────────────
// BRAND PILLAR TYPE (Creative, Helpful, Mom)
// ─────────────────────────────────────────────────────────────
export interface BrandPillar {
  id: string                   // Unique ID ('creative', 'helpful', 'mom')
  title: string                // Display title
  description: string          // Short description
  icon: string                 // Icon name or emoji
  color: string                // Brand color (Tailwind class)
  link?: string                // Optional link to dedicated page
}

// ─────────────────────────────────────────────────────────────
// FORM ERRORS TYPE (For error handling)
// ─────────────────────────────────────────────────────────────
export interface FormError {
  field: string                // Which field has the error
  message: string              // Error message to display
}

// ─────────────────────────────────────────────────────────────
// NAVIGATION LINK TYPE (For menu items)
// ─────────────────────────────────────────────────────────────
export interface NavLink {
  label: string                // Link text
  href: string                 // URL path
  external?: boolean           // Opens in new tab if true
  tracking?: string            // GA4 event label for this link
}

// ─────────────────────────────────────────────────────────────
// SOCIAL MEDIA LINK TYPE
// ─────────────────────────────────────────────────────────────
export interface SocialLink {
  platform: 'tiktok' | 'instagram' | 'youtube' | 'facebook' | 'twitter'
  url: string
  handle: string               // @username
  icon: React.ReactNode        // Icon component
}

// ─────────────────────────────────────────────────────────────
// API RESPONSE TYPE (For Supabase queries)
// ─────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T | null
  error: Error | null
  loading: boolean
}

// ─────────────────────────────────────────────────────────────
// PAGE VIEW TRACKING TYPE
// ─────────────────────────────────────────────────────────────
export interface PageView {
  page_title: string
  page_path: string
  referrer?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

// ─────────────────────────────────────────────────────────────
// SURVEY RESPONSE TYPE (For future audience questions)
// ─────────────────────────────────────────────────────────────
export interface SurveyResponse {
  id?: string
  question: string
  answer: string
  email?: string
  submitted_at?: Date
}

// ─────────────────────────────────────────────────────────────
// CONTENT PERFORMANCE TYPE (Track clicks on content)
// ─────────────────────────────────────────────────────────────
export interface ContentPerformance {
  id?: string
  content_type: 'tiktok_embed' | 'blog_post' | 'product' | 'cta'
  content_id: string
  clicks: number
  last_clicked?: Date
}

/*
 * ═══════════════════════════════════════════════════════════════
 * HOW TO USE THESE TYPES:
 * ═══════════════════════════════════════════════════════════════
 * 
 * Import the type you need:
 * import { Subscriber } from '@/lib/types'
 * 
 * Use it to type your variables:
 * const subscriber: Subscriber = {
 *   email: 'user@example.com',
 *   source: 'homepage'
 * }
 * 
 * Use it in function parameters:
 * async function saveSubscriber(data: Subscriber) {
 *   // TypeScript will ensure data has the right shape
 * }
 * 
 * ═══════════════════════════════════════════════════════════════
 */

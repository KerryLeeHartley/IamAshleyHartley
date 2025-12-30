/*
 * ═══════════════════════════════════════════════════════════════
 * SUPABASE CLIENT - DATABASE CONNECTION
 * ═══════════════════════════════════════════════════════════════
 * 
 * This file sets up the connection to Supabase (our database).
 * 
 * WHAT IS SUPABASE?
 * - It's like Firebase but open-source
 * - Gives us a PostgreSQL database
 * - Handles authentication
 * - Provides real-time updates
 * - 100% FREE for our MVP (500MB database, 2GB bandwidth)
 * 
 * SETUP REQUIRED:
 * 1. Go to https://supabase.com/
 * 2. Create a new project (choose a name, password, region)
 * 3. Go to Project Settings > API
 * 4. Copy the URL and anon key
 * 5. Add them to .env.local
 * 
 * ═══════════════════════════════════════════════════════════════
 */

import { createClient } from '@supabase/supabase-js'

// ─────────────────────────────────────────────────────────────
// ENVIRONMENT VARIABLES
// ─────────────────────────────────────────────────────────────
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// ─────────────────────────────────────────────────────────────
// VALIDATE ENVIRONMENT VARIABLES
// ─────────────────────────────────────────────────────────────
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(`
    ⚠️  SUPABASE NOT CONFIGURED!
    
    Please set up your .env.local file with:
    - NEXT_PUBLIC_SUPABASE_URL
    - NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    Get these from: https://supabase.com/dashboard
  `)
}

// ─────────────────────────────────────────────────────────────
// CREATE SUPABASE CLIENT
// ─────────────────────────────────────────────────────────────
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// ═══════════════════════════════════════════════════════════════
// SUBSCRIBERS (PRIVATE - NOT DISPLAYED PUBLICLY)
// ═══════════════════════════════════════════════════════════════

/**
 * Save a new email subscriber to the database
 * @param email - User's email address
 * @param source - Where they signed up (e.g., 'homepage', 'community_modal')
 * @param utmData - UTM parameters from URL (for tracking campaign performance)
 * @returns Object with success status and data/error
 */
export async function saveSubscriber(
  email: string,
  source: string = 'homepage',
  utmData?: {
    utm_source?: string
    utm_campaign?: string
    utm_medium?: string
  }
) {
  try {
    console.log('📧 Saving subscriber:', email, 'from:', source)

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim()

    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('subscribers')
      .select('email')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (existing) {
      console.log('⚠️ Email already subscribed')
      return {
        success: false,
        data: null,
        error: 'Email already subscribed!',
        isDuplicate: true
      }
    }

    // Insert new subscriber
    const { data, error } = await supabase
      .from('subscribers')
      .insert([
        {
          email: normalizedEmail,
          source,
          utm_source: utmData?.utm_source || null,
          utm_campaign: utmData?.utm_campaign || null,
          status: 'active',
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('❌ Error saving subscriber:', error)
      return { success: false, data: null, error: error.message }
    }

    console.log('✅ Subscriber saved:', data)
    return { success: true, data, error: null }
  } catch (error: any) {
    console.error('❌ Unexpected error:', error)
    return { success: false, data: null, error: error.message }
  }
}

// NOTE: Subscriber count intentionally NOT exposed publicly
// Only accessible via Supabase dashboard for privacy

// ═══════════════════════════════════════════════════════════════
// ANALYTICS EVENTS
// ═══════════════════════════════════════════════════════════════

/**
 * Track a custom analytics event in the database
 * @param eventName - Name of the event (e.g., 'video_click', 'button_click')
 * @param eventData - Additional data about the event
 * @param sessionId - Session ID to group events from same visit
 * @returns Object with success status and data/error
 */
export async function trackDatabaseEvent(
  eventName: string,
  eventData?: Record<string, any>,
  sessionId?: string
) {
  try {
    const { data, error } = await supabase
      .from('analytics_events')
      .insert([
        {
          event_name: eventName,
          event_data: eventData || {},
          session_id: sessionId || null,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error tracking event:', error)
      return { success: false, data: null, error: error.message }
    }

    return { success: true, data, error: null }
  } catch (error: any) {
    console.error('Unexpected error:', error)
    return { success: false, data: null, error: error.message }
  }
}

// ═══════════════════════════════════════════════════════════════
// CONTENT CLICKS
// ═══════════════════════════════════════════════════════════════

/**
 * Increment click count for a piece of content
 * Used to track which TikTok videos, blog posts, etc. are most popular
 * @param contentType - Type of content (e.g., 'tiktok_embed', 'youtube_video')
 * @param contentId - Unique ID of the content
 * @returns Object with success status
 */
export async function trackContentClick(
  contentType: string,
  contentId: string
) {
  try {
    // Check if record exists
    const { data: existing } = await supabase
      .from('content_clicks')
      .select('*')
      .eq('content_type', contentType)
      .eq('content_id', contentId)
      .maybeSingle()

    if (existing) {
      // Update existing record (increment clicks)
      const { error } = await supabase
        .from('content_clicks')
        .update({
          clicks: existing.clicks + 1,
          last_clicked: new Date().toISOString(),
        })
        .eq('id', existing.id)

      if (error) {
        console.error('Error updating content click:', error)
        return { success: false, error: error.message }
      }

      return { success: true, clicks: existing.clicks + 1 }
    } else {
      // Create new record
      const { error } = await supabase
        .from('content_clicks')
        .insert([
          {
            content_type: contentType,
            content_id: contentId,
            clicks: 1,
            last_clicked: new Date().toISOString(),
          },
        ])

      if (error) {
        console.error('Error creating content click:', error)
        return { success: false, error: error.message }
      }

      return { success: true, clicks: 1 }
    }
  } catch (error: any) {
    console.error('Unexpected error:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Get content click stats (for internal analytics only)
 * @param contentType - Type of content to filter by (optional)
 * @returns Array of content with click counts
 */
export async function getContentClickStats(contentType?: string) {
  try {
    let query = supabase
      .from('content_clicks')
      .select('*')
      .order('clicks', { ascending: false })

    if (contentType) {
      query = query.eq('content_type', contentType)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error getting content clicks:', error)
      return { success: false, data: null, error: error.message }
    }

    return { success: true, data, error: null }
  } catch (error: any) {
    console.error('Unexpected error:', error)
    return { success: false, data: null, error: error.message }
  }
}

// ═══════════════════════════════════════════════════════════════
// SURVEYS (FOR FUTURE USE)
// ═══════════════════════════════════════════════════════════════

/**
 * Submit survey response
 * @param question - Survey question
 * @param answer - User's answer
 * @param email - User's email (optional)
 * @returns Object with success status and data/error
 */
export async function submitSurveyResponse(
  question: string,
  answer: string,
  email?: string
) {
  try {
    const { data, error } = await supabase
      .from('surveys')
      .insert([
        {
          question: question,
          answer: answer,
          email: email || null,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error submitting survey:', error)
      return { success: false, data: null, error: error.message }
    }

    return { success: true, data, error: null }
  } catch (error: any) {
    console.error('Unexpected error:', error)
    return { success: false, data: null, error: error.message }
  }
}

/*
 * ═══════════════════════════════════════════════════════════════
 * DATABASE SCHEMA (SQL to run in Supabase)
 * ═══════════════════════════════════════════════════════════════
 * 
 * Go to Supabase Dashboard > SQL Editor > New Query
 * Copy and paste each CREATE TABLE statement:
 * 
 * -- Subscribers table (PRIVATE - not exposed to public)
 * CREATE TABLE IF NOT EXISTS subscribers (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   email VARCHAR(255) UNIQUE NOT NULL,
 *   subscribed_at TIMESTAMP DEFAULT NOW(),
 *   source VARCHAR(50),
 *   utm_source VARCHAR(100),
 *   utm_campaign VARCHAR(100),
 *   status VARCHAR(20) DEFAULT 'active'
 * );
 * 
 * -- Analytics events table
 * CREATE TABLE IF NOT EXISTS analytics_events (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   event_name VARCHAR(100),
 *   event_data JSONB,
 *   user_id UUID,
 *   session_id VARCHAR(100),
 *   created_at TIMESTAMP DEFAULT NOW()
 * );
 * 
 * -- Content clicks table
 * CREATE TABLE IF NOT EXISTS content_clicks (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   content_type VARCHAR(50),
 *   content_id VARCHAR(100),
 *   clicks INT DEFAULT 0,
 *   last_clicked TIMESTAMP
 * );
 * 
 * -- Surveys table (for future use)
 * CREATE TABLE IF NOT EXISTS surveys (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   question TEXT,
 *   answer TEXT,
 *   email VARCHAR(255),
 *   submitted_at TIMESTAMP DEFAULT NOW()
 * );
 * 
 * -- Row Level Security (RLS) - Keep subscriber data private
 * ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
 * 
 * -- Only service role can read subscribers (keeps it private)
 * CREATE POLICY "Service role only" ON subscribers
 *   FOR ALL
 *   USING (auth.role() = 'service_role');
 * 
 * ═══════════════════════════════════════════════════════════════
 */
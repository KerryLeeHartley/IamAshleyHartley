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
// These come from .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// ─────────────────────────────────────────────────────────────
// VALIDATE ENVIRONMENT VARIABLES
// ─────────────────────────────────────────────────────────────
// Make sure the developer set up their .env.local file
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
// This is the main object we'll use to interact with the database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Auth configuration (if we add user login later)
    persistSession: true,
    autoRefreshToken: true,
  },
})

// ─────────────────────────────────────────────────────────────
// HELPER FUNCTIONS FOR DATABASE OPERATIONS
// ─────────────────────────────────────────────────────────────

/**
 * Save a new email subscriber to the database
 * 
 * @param email - User's email address
 * @param source - Where they signed up (e.g., 'homepage', 'popup')
 * @param utmData - UTM parameters from URL (for tracking campaign performance)
 * @returns The saved subscriber data or error
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
    // Check if email already exists (prevent duplicates)
    const { data: existing, error: checkError } = await supabase
      .from('subscribers')
      .select('email')
      .eq('email', email)
      .single()

    // If email exists, return message
    if (existing) {
      return {
        data: null,
        error: new Error('Email already subscribed!'),
      }
    }

    // Insert new subscriber
    const { data, error } = await supabase
      .from('subscribers')
      .insert([
        {
          email,
          source,
          utm_source: utmData?.utm_source || null,
          utm_campaign: utmData?.utm_campaign || null,
          status: 'active',
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error saving subscriber:', error)
      return { data: null, error }
    }

    return { data, error: null }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { data: null, error: error as Error }
  }
}

/**
 * Track a custom analytics event in the database
 * 
 * @param eventName - Name of the event (e.g., 'video_click', 'pillar_click')
 * @param eventData - Additional data about the event
 * @param sessionId - Session ID to group events from same visit
 * @returns The saved event or error
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
      return { data: null, error }
    }

    return { data, error: null }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { data: null, error: error as Error }
  }
}

/**
 * Get subscriber count (for showing on homepage)
 * 
 * @returns Total number of active subscribers
 */
export async function getSubscriberCount() {
  try {
    const { count, error } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    if (error) {
      console.error('Error getting subscriber count:', error)
      return { count: 0, error }
    }

    return { count: count || 0, error: null }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { count: 0, error: error as Error }
  }
}

/**
 * Increment click count for a piece of content
 * Used to track which TikTok videos, blog posts, etc. are most popular
 * 
 * @param contentType - Type of content (e.g., 'tiktok_embed')
 * @param contentId - Unique ID of the content
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
      .single()

    if (existing) {
      // Update existing record (increment clicks)
      const { error } = await supabase
        .from('content_clicks')
        .update({
          clicks: existing.clicks + 1,
          last_clicked: new Date().toISOString(),
        })
        .eq('id', existing.id)

      if (error) console.error('Error updating content click:', error)
    } else {
      // Create new record
      const { error } = await supabase
        .from('content_clicks')
        .insert([
          {
            content_type: contentType,
            content_id: contentId,
            clicks: 1,
          },
        ])

      if (error) console.error('Error creating content click:', error)
    }
  } catch (error) {
    console.error('Unexpected error:', error)
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
 * -- Subscribers table
 * CREATE TABLE subscribers (
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
 * CREATE TABLE analytics_events (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   event_name VARCHAR(100),
 *   event_data JSONB,
 *   user_id UUID,
 *   session_id VARCHAR(100),
 *   created_at TIMESTAMP DEFAULT NOW()
 * );
 * 
 * -- Content clicks table
 * CREATE TABLE content_clicks (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   content_type VARCHAR(50),
 *   content_id VARCHAR(100),
 *   clicks INT DEFAULT 0,
 *   last_clicked TIMESTAMP
 * );
 * 
 * -- Surveys table (for future use)
 * CREATE TABLE surveys (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   question TEXT,
 *   answer TEXT,
 *   email VARCHAR(255),
 *   submitted_at TIMESTAMP DEFAULT NOW()
 * );
 * 
 * ═══════════════════════════════════════════════════════════════
 */

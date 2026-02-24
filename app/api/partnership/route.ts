// ═══════════════════════════════════════════════════════════════
// API ROUTE: /api/partnership
// FILE: app/api/partnership/route.ts
// ═══════════════════════════════════════════════════════════════
//
// WHAT THIS DOES:
//   Receives partnership inquiry form submissions from
//   /work-with-me and saves them to the Supabase 'partnerships'
//   table so Ashley can review them in her dashboard.
//
// HOW IT'S CALLED:
//   POST /api/partnership
//   Body: { name, email, company, partnershipType, message }
//
// SUPABASE TABLE REQUIRED:
//   Run this SQL in Supabase Dashboard → SQL Editor → New Query:
//
//   CREATE TABLE IF NOT EXISTS partnerships (
//     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//     created_at TIMESTAMP DEFAULT NOW(),
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL,
//     company VARCHAR(255),
//     partnership_type VARCHAR(100),
//     message TEXT,
//     status VARCHAR(50) DEFAULT 'new'
//   );
//
// ═══════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// ─────────────────────────────────────────────────────────────
// SUPABASE CLIENT
// ─────────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ─────────────────────────────────────────────────────────────
// POST HANDLER
// ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { name, email, company, partnershipType, message } = await req.json()

    // ── Basic validation ─────────────────────────────────────
    if (!name || !email || !message || !partnershipType) {
      return NextResponse.json(
        { error: 'Name, email, partnership type, and message are required' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      )
    }

    // ── Save to Supabase ─────────────────────────────────────
    const { error: dbError } = await supabase
      .from('partnerships')
      .insert([{
        name: name.trim(),
        email: email.toLowerCase().trim(),
        company: company?.trim() || null,
        partnership_type: partnershipType,
        message: message.trim(),
        status: 'new',
      }])

    if (dbError) {
      console.error('Supabase partnership error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save inquiry' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error('Partnership route error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
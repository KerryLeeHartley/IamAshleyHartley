import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function subscribeToKit(email: string) {
  const formId = process.env.KIT_FORM_ID
  const apiKey = process.env.KIT_API_KEY

  console.log('Kit formId:', formId)
  console.log('Kit apiKey exists:', !!apiKey)

  const response = await fetch(
    `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: apiKey, email }),
    }
  )

  const data = await response.json()
  console.log('Kit response status:', response.status)
  console.log('Kit response body:', JSON.stringify(data))

  return response.ok
}

export async function POST(req: NextRequest) {
  try {
    const { email, source = 'website' } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Save to Supabase
    const { error: dbError } = await supabase
      .from('subscribers')
      .insert([{ email: normalizedEmail, source, status: 'active' }])

    if (dbError && dbError.code !== '23505') {
      console.error('Supabase error:', dbError)
    } else {
      console.log('✅ Supabase saved:', normalizedEmail)
    }

    // Subscribe to Kit
    try {
      const kitSuccess = await subscribeToKit(normalizedEmail)
      if (kitSuccess) {
        console.log('✅ Kit subscribed:', normalizedEmail)
      } else {
        console.error('❌ Kit failed for:', normalizedEmail)
      }
    } catch (kitError) {
      console.error('❌ Kit error:', kitError)
    }

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error('Subscribe error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

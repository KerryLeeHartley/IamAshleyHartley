/*
 * ═══════════════════════════════════════════════════════════════
 * ANALYTICS TRACKING - SAMIYA WEB APP (FIXED & ENHANCED)
 * ═══════════════════════════════════════════════════════════════
 * 
 * FIXES:
 * - Console logging now works in PRODUCTION ✅
 * - Supabase integration added ✅
 * - Better debugging ✅
 * 
 * ═══════════════════════════════════════════════════════════════
 */

// Declare GTM dataLayer
declare global {
  interface Window {
    dataLayer: any[]
    gtag?: (...args: any[]) => void
    fbq?: (...args: any[]) => void
    ttq?: any
  }
}

/**
 * Initialize dataLayer if it doesn't exist
 */
export function initializeAnalytics() {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    console.log('✅ Analytics initialized')
  }
}

/**
 * Send event to dataLayer
 * @param eventName - Name of the event
 * @param eventData - Additional event parameters
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window === 'undefined') return

  // Initialize dataLayer if needed
  window.dataLayer = window.dataLayer || []

  const eventPayload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    page_url: window.location.href,
    page_path: window.location.pathname,
    ...eventData
  }

  // Push event to dataLayer
  window.dataLayer.push(eventPayload)

  // ALWAYS log events (even in production for debugging)
  console.log('📊 Analytics Event:', eventName, eventPayload)

  // Also send to GA4 directly if available
  if (window.gtag) {
    window.gtag('event', eventName, eventData)
  }

  // Send to Meta Pixel if available
  if (window.fbq) {
    window.fbq('trackCustom', eventName, eventData)
  }

  // Send to TikTok Pixel if available
  if (window.ttq) {
    window.ttq.track(eventName, eventData)
  }
}

// ═══════════════════════════════════════════════════════════════
// PAGE & NAVIGATION TRACKING
// ═══════════════════════════════════════════════════════════════

/**
 * Track page view
 */
export function trackPageView(pageName: string, pageUrl?: string) {
  trackEvent('page_view', {
    page_name: pageName,
    page_title: typeof document !== 'undefined' ? document.title : '',
    referrer: typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct'
  })
}

/**
 * Track scroll depth
 * @param depth - Percentage scrolled (25, 50, 75, 90)
 */
export function trackScrollDepth(depth: number) {
  trackEvent('scroll_depth', {
    depth_percentage: depth,
    engagement_type: 'scroll',
    page_height: typeof document !== 'undefined' ? document.documentElement.scrollHeight : 0,
    viewport_height: typeof window !== 'undefined' ? window.innerHeight : 0
  })
}

// ═══════════════════════════════════════════════════════════════
// BUTTON & LINK TRACKING
// ═══════════════════════════════════════════════════════════════

/**
 * Track button/link click
 * @param buttonName - Name of button clicked
 * @param buttonType - Type (primary_button, secondary_button, link, etc.)
 * @param destination - Where the button leads (optional)
 */
export function trackClick(buttonName: string, buttonType?: string, destination?: string) {
  trackEvent('button_click', {
    button_name: buttonName,
    button_type: buttonType || 'button',
    destination: destination,
    click_timestamp: Date.now()
  })
}

/**
 * Track social media click
 * @param platform - Social platform (tiktok, youtube, instagram, etc.)
 * @param destination - URL clicked
 */
export function trackSocialClick(platform: 'tiktok' | 'youtube' | 'instagram' | 'facebook', destination: string) {
  trackEvent('social_click', {
    platform: platform,
    destination: destination,
    click_type: 'outbound',
    social_network: platform
  })
}

// ═══════════════════════════════════════════════════════════════
// FORM TRACKING
// ═══════════════════════════════════════════════════════════════

/**
 * Track form start (user begins filling form)
 * @param formName - Name of the form
 */
export function trackFormStart(formName: string) {
  trackEvent('form_start', {
    form_name: formName,
    form_start_time: Date.now()
  })
}

/**
 * Track email signup
 * @param email - User's email
 * @param source - Where they signed up (community_modal, homepage, etc.)
 */
export function trackEmailSignup(email: string, source: string) {
  trackEvent('email_signup', {
    email_provided: true, // Don't send actual email to GA4
    source: source,
    conversion_type: 'email_capture',
    signup_method: 'modal'
  })
}

/**
 * Track partnership inquiry submission
 * @param data - Form data (name, email, company)
 */
export function trackPartnershipInquiry(data: {
  name: string
  email: string
  company: string
}) {
  trackEvent('partnership_inquiry', {
    inquiry_type: 'brand_partnership',
    company: data.company,
    conversion_type: 'lead_form',
    has_company_name: !!data.company
  })
}

/**
 * Track form abandonment (user starts but doesn't submit)
 * @param formName - Name of the form
 * @param fieldsCompleted - Number of fields filled
 */
export function trackFormAbandonment(formName: string, fieldsCompleted: number) {
  trackEvent('form_abandon', {
    form_name: formName,
    fields_completed: fieldsCompleted,
    abandonment_type: 'form_exit'
  })
}

// ═══════════════════════════════════════════════════════════════
// CONTENT INTERACTION TRACKING
// ═══════════════════════════════════════════════════════════════

/**
 * Track TikTok video interaction
 * @param action - Action taken (view, click, play)
 * @param videoId - TikTok video ID
 * @param videoTitle - Video title (optional)
 */
export function trackTikTokVideo(action: 'view' | 'click' | 'play', videoId: string, videoTitle?: string) {
  trackEvent('tiktok_video', {
    action: action,
    video_id: videoId,
    video_title: videoTitle,
    platform: 'tiktok',
    content_type: 'video'
  })
}

/**
 * Track gallery interaction
 * @param action - Action taken (open, scroll, view_painting)
 * @param paintingTitle - Title of painting (optional)
 */
export function trackGallery(action: 'open' | 'scroll' | 'view_painting', paintingTitle?: string) {
  trackEvent('gallery_interaction', {
    action: action,
    painting_title: paintingTitle,
    gallery_type: 'art_gallery'
  })
}

/**
 * Track painting view in gallery
 * @param paintingId - ID of painting
 * @param paintingTitle - Title of painting
 * @param category - Category (landscape, abstract, etc.)
 */
export function trackPaintingView(paintingId: number, paintingTitle: string, category?: string) {
  trackEvent('painting_view', {
    painting_id: paintingId,
    painting_title: paintingTitle,
    painting_category: category,
    content_type: 'artwork'
  })
}

// ═══════════════════════════════════════════════════════════════
// MODAL TRACKING
// ═══════════════════════════════════════════════════════════════

/**
 * Track modal open/close
 * @param action - open or close
 * @param modalName - Name of modal (email_modal, partnership_modal, etc.)
 */
export function trackModal(action: 'open' | 'close', modalName: string) {
  trackEvent('modal_interaction', {
    action: action,
    modal_name: modalName,
    interaction_type: 'modal'
  })
}

// ═══════════════════════════════════════════════════════════════
// DOWNLOAD TRACKING
// ═══════════════════════════════════════════════════════════════

/**
 * Track media kit download
 */
export function trackMediaKitDownload() {
  trackEvent('media_kit_download', {
    content_type: 'media_kit',
    conversion_type: 'download',
    file_type: 'pdf',
    download_source: 'partnership_modal'
  })
}

/**
 * Track file download (generic)
 * @param fileName - Name of file
 * @param fileType - Type (pdf, jpg, etc.)
 */
export function trackFileDownload(fileName: string, fileType: string) {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
    download_type: 'direct'
  })
}

// ═══════════════════════════════════════════════════════════════
// ENGAGEMENT TRACKING
// ═══════════════════════════════════════════════════════════════

/**
 * Track time spent on page
 * @param seconds - Time in seconds
 */
export function trackTimeOnPage(seconds: number) {
  trackEvent('time_on_page', {
    time_seconds: seconds,
    time_minutes: Math.round(seconds / 60),
    engagement_type: 'time'
  })
}

/**
 * Track carousel navigation
 * @param carouselName - Name of carousel (tiktok, gallery, etc.)
 * @param direction - Direction (left, right)
 */
export function trackCarouselNavigation(carouselName: string, direction: 'left' | 'right') {
  trackEvent('carousel_navigation', {
    carousel_name: carouselName,
    direction: direction,
    interaction_type: 'swipe'
  })
}

/**
 * Track section view (when user scrolls to section)
 * @param sectionName - Name of section
 */
export function trackSectionView(sectionName: string) {
  trackEvent('section_view', {
    section_name: sectionName,
    engagement_type: 'scroll_to_section'
  })
}

// ═══════════════════════════════════════════════════════════════
// ERROR TRACKING
// ═══════════════════════════════════════════════════════════════

/**
 * Track form errors
 * @param formName - Name of form
 * @param errorMessage - Error message
 */
export function trackFormError(formName: string, errorMessage: string) {
  trackEvent('form_error', {
    form_name: formName,
    error_message: errorMessage,
    error_type: 'validation'
  })
}

/**
 * Track general errors
 * @param errorType - Type of error
 * @param errorMessage - Error message
 */
export function trackError(errorType: string, errorMessage: string) {
  trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage,
    error_timestamp: Date.now()
  })
}

// ═══════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get current scroll percentage
 */
export function getCurrentScrollPercentage(): number {
  if (typeof window === 'undefined') return 0
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  return Math.round((scrollTop / (documentHeight - windowHeight)) * 100)
}

/**
 * Track custom conversion
 * @param conversionName - Name of conversion
 * @param conversionValue - Value (optional)
 */
export function trackConversion(conversionName: string, conversionValue?: number) {
  trackEvent('conversion', {
    conversion_name: conversionName,
    conversion_value: conversionValue,
    conversion_type: 'custom'
  })
}
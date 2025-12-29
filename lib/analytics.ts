/*
 * ═══════════════════════════════════════════════════════════════
 * ANALYTICS TRACKING - SAMIYA WEB APP
 * ═══════════════════════════════════════════════════════════════
 * 
 * Sends custom events to Google Tag Manager's dataLayer
 * GTM then forwards events to GA4, Meta Pixel, TikTok Pixel, etc.
 * 
 * All tracking managed through GTM - no code changes needed!
 * 
 * ═══════════════════════════════════════════════════════════════
 */

// Declare GTM dataLayer
declare global {
  interface Window {
    dataLayer: any[]
  }
}

/**
 * Initialize dataLayer if it doesn't exist
 */
export function initializeAnalytics() {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
  }
}

/**
 * Send event to GTM dataLayer
 * @param eventName - Name of the event
 * @param eventData - Additional event parameters
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window === 'undefined') return

  // Initialize dataLayer if needed
  window.dataLayer = window.dataLayer || []

  // Push event to dataLayer
  window.dataLayer.push({
    event: eventName,
    timestamp: new Date().toISOString(),
    ...eventData
  })

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, eventData)
  }
}

// ═══════════════════════════════════════════════════════════════
// PREDEFINED TRACKING FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Track page view
 */
export function trackPageView(pageName: string, pageUrl?: string) {
  trackEvent('page_view', {
    page_name: pageName,
    page_url: pageUrl || window.location.href,
    page_path: window.location.pathname
  })
}

/**
 * Track button/link click
 */
export function trackClick(buttonName: string, buttonType?: string, destination?: string) {
  trackEvent('button_click', {
    button_name: buttonName,
    button_type: buttonType || 'button',
    destination: destination
  })
}

/**
 * Track email signup
 */
export function trackEmailSignup(email: string, source: string) {
  trackEvent('email_signup', {
    email: email,
    source: source,
    conversion_type: 'email_capture'
  })
}

/**
 * Track partnership inquiry submission
 */
export function trackPartnershipInquiry(data: {
  name: string
  email: string
  company: string
}) {
  trackEvent('partnership_inquiry', {
    inquiry_type: 'brand_partnership',
    company: data.company,
    conversion_type: 'lead_form'
  })
}

/**
 * Track TikTok video interaction
 */
export function trackTikTokVideo(action: 'view' | 'click' | 'play', videoId: string, videoTitle?: string) {
  trackEvent('tiktok_video', {
    action: action,
    video_id: videoId,
    video_title: videoTitle,
    platform: 'tiktok'
  })
}

/**
 * Track gallery interaction
 */
export function trackGallery(action: 'open' | 'scroll' | 'view_painting', paintingTitle?: string) {
  trackEvent('gallery_interaction', {
    action: action,
    painting_title: paintingTitle
  })
}

/**
 * Track social media click
 */
export function trackSocialClick(platform: 'tiktok' | 'youtube', destination: string) {
  trackEvent('social_click', {
    platform: platform,
    destination: destination,
    click_type: 'outbound'
  })
}

/**
 * Track modal open/close
 */
export function trackModal(action: 'open' | 'close', modalName: string) {
  trackEvent('modal_interaction', {
    action: action,
    modal_name: modalName
  })
}

/**
 * Track media kit download
 */
export function trackMediaKitDownload() {
  trackEvent('media_kit_download', {
    content_type: 'media_kit',
    conversion_type: 'download'
  })
}

/**
 * Track scroll depth (optional - for engagement)
 */
export function trackScrollDepth(depth: number) {
  trackEvent('scroll_depth', {
    depth_percentage: depth,
    engagement_type: 'scroll'
  })
}

// ═══════════════════════════════════════════════════════════════
// ECOMMERCE TRACKING (If you add products later)
// ═══════════════════════════════════════════════════════════════

/**
 * Track product view (for future use)
 */
export function trackProductView(productName: string, price: number) {
  trackEvent('view_item', {
    item_name: productName,
    price: price,
    currency: 'USD'
  })
}

/**
 * Track add to cart (for future use)
 */
export function trackAddToCart(productName: string, price: number) {
  trackEvent('add_to_cart', {
    item_name: productName,
    price: price,
    currency: 'USD'
  })
}

/**
 * Track purchase (for future use)
 */
export function trackPurchase(transactionId: string, value: number, items: any[]) {
  trackEvent('purchase', {
    transaction_id: transactionId,
    value: value,
    currency: 'USD',
    items: items
  })
}

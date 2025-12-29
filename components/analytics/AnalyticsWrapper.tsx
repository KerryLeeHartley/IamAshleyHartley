/*
 * ═══════════════════════════════════════════════════════════════
 * ANALYTICS WRAPPER - LOADS ALL TRACKING SCRIPTS
 * ═══════════════════════════════════════════════════════════════
 * 
 * This component loads all the analytics tracking scripts:
 * - Google Analytics 4 (GA4)
 * - Microsoft Clarity
 * - TikTok Pixel
 * - Meta Pixel (Facebook/Instagram)
 * 
 * It's loaded once in layout.tsx and runs on every page.
 * 
 * ═══════════════════════════════════════════════════════════════
 */

'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackPageView } from '@/lib/analytics'

export default function AnalyticsWrapper() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // ─────────────────────────────────────────────────────────────
  // GET ENVIRONMENT VARIABLES
  // ─────────────────────────────────────────────────────────────
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
  const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID
  const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
  
  // ─────────────────────────────────────────────────────────────
  // TRACK PAGE VIEWS ON ROUTE CHANGES
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    // Get page title from pathname
    const pageTitle = pathname === '/' ? 'Homepage' : pathname.slice(1)
    
    // Track page view
    trackPageView(pageTitle)
  }, [pathname, searchParams])
  
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          GOOGLE ANALYTICS 4 (GA4)
          ═══════════════════════════════════════════════════════
          
          Tracks:
          - Demographics (age, gender, location)
          - Device types (mobile, desktop, tablet)
          - Traffic sources (where visitors come from)
          - Page views and time on site
          - Custom events (clicks, form submissions, etc.)
      */}
      {GA_MEASUREMENT_ID && (
        <>
          {/* Load GA4 script */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          
          {/* Initialize GA4 */}
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
                send_page_view: true
              });
            `}
          </Script>
        </>
      )}
      
      {/* ═══════════════════════════════════════════════════════
          MICROSOFT CLARITY
          ═══════════════════════════════════════════════════════
          
          Tracks:
          - Session recordings (watch how users navigate)
          - Heatmaps (see where users click)
          - Scroll depth (how far they scroll)
          - Rage clicks (frustration points)
          - Dead clicks (clicking non-functional elements)
          
          This is GOLD for understanding user behavior!
      */}
      {CLARITY_PROJECT_ID && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          `}
        </Script>
      )}
      
      {/* ═══════════════════════════════════════════════════════
          TIKTOK PIXEL
          ═══════════════════════════════════════════════════════
          
          Tracks:
          - Which TikTok videos drive traffic
          - User behavior on site after clicking from TikTok
          - Conversion events (email signups, purchases)
          
          Creates:
          - Custom audiences (retarget website visitors on TikTok)
          - Lookalike audiences (find similar people)
          - Conversion tracking for TikTok ads
          
          This is KEY for growing Samiya's TikTok business!
      */}
      {TIKTOK_PIXEL_ID && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;
              var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},
              ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
              ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
              n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;
              e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('${TIKTOK_PIXEL_ID}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}
      
      {/* ═══════════════════════════════════════════════════════
          META PIXEL (Facebook/Instagram)
          ═══════════════════════════════════════════════════════
          
          Tracks:
          - Instagram traffic (if Samiya promotes there)
          - User behavior from Facebook/Instagram
          - Conversion events
          
          Creates:
          - Custom audiences for Facebook/Instagram ads
          - Retargeting campaigns
          - Lookalike audiences
          
          Great for when Samiya wants to run Instagram/Facebook ads!
      */}
      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
      
      {/* Warning if analytics not configured */}
      {(!GA_MEASUREMENT_ID || !CLARITY_PROJECT_ID) && (
        <Script id="analytics-warning" strategy="afterInteractive">
          {`
            console.warn('⚠️ Analytics not fully configured. Add tracking IDs to .env.local');
          `}
        </Script>
      )}
    </>
  )
}

/*
 * ═══════════════════════════════════════════════════════════════
 * SETUP CHECKLIST:
 * ═══════════════════════════════════════════════════════════════
 * 
 * ✅ Google Analytics 4:
 *    1. Go to https://analytics.google.com/
 *    2. Create property
 *    3. Get Measurement ID (G-XXXXXXXXXX)
 *    4. Add to .env.local: NEXT_PUBLIC_GA_MEASUREMENT_ID
 * 
 * ✅ Microsoft Clarity:
 *    1. Go to https://clarity.microsoft.com/
 *    2. Create project
 *    3. Get Project ID
 *    4. Add to .env.local: NEXT_PUBLIC_CLARITY_PROJECT_ID
 * 
 * ✅ TikTok Pixel (IMPORTANT FOR SAMIYA!):
 *    1. Go to TikTok Ads Manager
 *    2. Assets > Events > Web Events
 *    3. Create pixel
 *    4. Get Pixel ID
 *    5. Add to .env.local: NEXT_PUBLIC_TIKTOK_PIXEL_ID
 * 
 * ✅ Meta Pixel (Optional for now):
 *    1. Go to Facebook Business Manager
 *    2. Business Settings > Data Sources > Pixels
 *    3. Get Pixel ID
 *    4. Add to .env.local: NEXT_PUBLIC_META_PIXEL_ID
 * 
 * ═══════════════════════════════════════════════════════════════
 */

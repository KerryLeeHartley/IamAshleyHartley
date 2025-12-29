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
 * UPDATED: Wrapped in Suspense to fix Next.js 14 build error
 *
 * ═══════════════════════════════════════════════════════════════
 */

"use client";

import Script from "next/script";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

// Separate component for tracking (uses useSearchParams)
function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pageTitle = pathname === "/" ? "Homepage" : pathname.slice(1);
    trackPageView(pageTitle);
  }, [pathname, searchParams]);

  return null;
}

export default function AnalyticsWrapper() {
  // ─────────────────────────────────────────────────────────────
  // GET ENVIRONMENT VARIABLES
  // ─────────────────────────────────────────────────────────────
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
  const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {/* Track page views with Suspense boundary */}
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>

      {/* ═══════════════════════════════════════════════════════
          GOOGLE ANALYTICS 4 (GA4)
          ═══════════════════════════════════════════════════════
      */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />

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
  );
}

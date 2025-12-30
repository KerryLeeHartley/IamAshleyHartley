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
 * - Pinterest Tag
 * - LinkedIn Insight Tag
 *
 * It's loaded once in layout.tsx and runs on every page.
 *
 * UPDATED: Fixed double page view firing issue
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
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID;
  const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
  const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_AGENCY_TIKTOK_PIXEL_ID;
  const META_PIXEL_ID = process.env.NEXT_PUBLIC_AGENCY_META_PIXEL_ID;
  const PINTEREST_TAG_ID = process.env.NEXT_PUBLIC_AGENCY_PINTEREST_TAG_ID;
  const LINKEDIN_TAG_ID = process.env.NEXT_PUBLIC_AGENCY_LINKEDIN_TAG_ID;

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
                send_page_view: false
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
        <>
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
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════
          PINTEREST TAG
          ═══════════════════════════════════════════════════════
      */}
      {PINTEREST_TAG_ID && (
        <>
          <Script id="pinterest-tag" strategy="afterInteractive">
            {`
              !function(e){if(!window.pintrk){window.pintrk = function () {
              window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
              n=window.pintrk;n.queue=[],n.version="3.0";var
              t=document.createElement("script");t.async=!0,t.src=e;var
              r=document.getElementsByTagName("script")[0];
              r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
              pintrk('load', '${PINTEREST_TAG_ID}');
              pintrk('page');
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://ct.pinterest.com/v3/?event=init&tid=${PINTEREST_TAG_ID}&noscript=1`}
            />
          </noscript>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════
          LINKEDIN INSIGHT TAG
          ═══════════════════════════════════════════════════════
      */}
      {LINKEDIN_TAG_ID && (
        <>
          <Script id="linkedin-insight" strategy="afterInteractive">
            {`
              _linkedin_partner_id = "${LINKEDIN_TAG_ID}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              
              (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);
              })(window.lintrk);
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://px.ads.linkedin.com/collect/?pid=${LINKEDIN_TAG_ID}&fmt=gif`}
            />
          </noscript>
        </>
      )}

      {/* Warning if analytics not configured */}
      {(!GA_MEASUREMENT_ID || !CLARITY_PROJECT_ID) && (
        <Script id="analytics-warning" strategy="afterInteractive">
          {`
            console.warn('⚠️ Analytics not fully configured. Add tracking IDs to .env.local');
            console.log('GA4:', '${GA_MEASUREMENT_ID || "NOT SET"}');
            console.log('Clarity:', '${CLARITY_PROJECT_ID || "NOT SET"}');
          `}
        </Script>
      )}
    </>
  );
}

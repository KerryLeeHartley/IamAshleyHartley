# 📁 FILE GUIDE - What Each File Does

## 🎯 CORE FILES (Start Here)

### `app/page.tsx` ⭐ MOST IMPORTANT
- **What:** Main homepage
- **Contains:** Hero section, TikTok videos, email capture, brand pillars
- **Customize:** Add Samiya's handles, video IDs, update copy
- **Lines to change:** 89 (TikTok handle), 105 (Instagram), 141-157 (video IDs)

### `app/layout.tsx`
- **What:** Wraps every page (loads once)
- **Contains:** Fonts, metadata (SEO), analytics wrapper
- **Customize:** Update domain (line 52), description (line 57), social image (line 75)

### `app/globals.css`
- **What:** Global styles (colors, fonts, buttons)
- **Customize:** Change brand colors if needed (lines 29-34)

---

## 📊 ANALYTICS & TRACKING

### `lib/analytics.ts` ⭐ KEY FILE
- **What:** All tracking functions
- **Use:** Import these functions to track clicks, form submissions, etc.
- **Functions:**
  - `trackPageView()` - Tracks page views
  - `trackEvent()` - Track any custom event
  - `emailFormTracking` - Track email form interactions
  - `trackNavClick()` - Track navigation clicks
  - `trackTikTokVideo()` - Track TikTok video interactions

### `components/analytics/AnalyticsWrapper.tsx`
- **What:** Loads GA4, Clarity, TikTok Pixel, Meta Pixel
- **Automatic:** No customization needed, reads from .env.local

---

## 🗄️ DATABASE

### `lib/supabase.ts` ⭐ KEY FILE
- **What:** Database connection and helper functions
- **Functions:**
  - `saveSubscriber()` - Save email to database
  - `trackDatabaseEvent()` - Save custom events
  - `getSubscriberCount()` - Get total subscribers
  - `trackContentClick()` - Track content clicks
- **Setup Required:** Run SQL queries (lines 213-271)

---

## 🎨 COMPONENTS

### Shared Components (Used on every page)

#### `components/shared/Navigation.tsx`
- **What:** Top navigation bar
- **Status:** Basic placeholder (needs mobile menu)
- **Customize:** Add menu items, logo

#### `components/shared/Footer.tsx`
- **What:** Footer with social links
- **Customize:** Add social media URLs (lines 18-24)

### Homepage Components

#### `components/homepage/HeroSection.tsx`
- **What:** First section visitors see
- **Customize:** Update headline, add video/image

#### `components/homepage/EmailCapture.tsx` ⭐ MONEY MAKER
- **What:** Email signup form (saves to Supabase)
- **Features:** Loading states, error handling, analytics tracking
- **Working:** Fully functional!

#### `components/homepage/TikTokEmbed.tsx`
- **What:** Displays embedded TikTok videos
- **Status:** Placeholder (add real TikTok embed code)
- **TODO:** Add TikTok oEmbed or widget

#### `components/homepage/BrandPillars.tsx`
- **What:** Shows Creative/Helpful/Mom pillars
- **Features:** Animations, click tracking
- **Working:** Fully functional!

---

## ⚙️ CONFIGURATION FILES

### `package.json`
- **What:** Lists all dependencies
- **Don't touch:** Unless adding new packages

### `next.config.js`
- **What:** Next.js configuration
- **Customize:** Add image domains if using external images

### `tailwind.config.ts`
- **What:** Tailwind CSS configuration
- **Customize:** Change brand colors (lines 10-15)

### `tsconfig.json`
- **What:** TypeScript configuration
- **Don't touch:** Works out of the box

### `.env.example`
- **What:** Template for environment variables
- **Action:** Copy to `.env.local` and fill in

### `.env.local` (YOU CREATE THIS)
- **What:** Your actual API keys (NEVER commit to Git)
- **Required:**
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - NEXT_PUBLIC_GA_MEASUREMENT_ID
  - NEXT_PUBLIC_CLARITY_PROJECT_ID
  - NEXT_PUBLIC_TIKTOK_PIXEL_ID

### `.gitignore`
- **What:** Tells Git what files to ignore
- **Don't touch:** Protects your secrets

---

## 📄 DOCUMENTATION

### `README.md` ⭐ FULL GUIDE
- Complete setup instructions
- Troubleshooting
- Deployment guide
- Testing checklist

### `SETUP-STEPS.md` ⭐ QUICK START
- 3-day plan
- Step-by-step checklist
- Success metrics

### `FILE-GUIDE.md` (THIS FILE)
- What each file does
- What to customize
- What not to touch

---

## 📦 TYPES & UTILITIES

### `lib/types.ts`
- **What:** TypeScript type definitions
- **Use:** Import types for autocomplete
- **Types Available:**
  - `Subscriber` - Email subscriber data
  - `AnalyticsEvent` - Custom event data
  - `TikTokVideo` - TikTok video data
  - `BrandPillar` - Pillar card data

---

## 🎯 CUSTOMIZATION PRIORITY

### 🔴 MUST CHANGE (Before Launch):
1. `app/page.tsx` - Lines 89, 105 (social handles)
2. `app/page.tsx` - Lines 141-157 (TikTok video IDs)
3. `app/layout.tsx` - Lines 52-85 (metadata, domain)
4. `.env.local` - All environment variables

### 🟡 SHOULD CHANGE (Day 2):
1. `components/shared/Navigation.tsx` - Add full nav
2. `components/homepage/HeroSection.tsx` - Add real content
3. `components/homepage/TikTokEmbed.tsx` - Add real embeds

### 🟢 CAN WAIT (After MVP):
1. `tailwind.config.ts` - Only if custom colors needed
2. `next.config.js` - Only if using external images

---

## 🚫 DON'T TOUCH (Unless You Know What You're Doing)

- `package.json` - Could break dependencies
- `tsconfig.json` - Works out of the box
- `.gitignore` - Protects your secrets
- `postcss.config.js` - Needed for Tailwind

---

## 🔍 FINDING THINGS

### Need to track a click?
→ `lib/analytics.ts`

### Need to save to database?
→ `lib/supabase.ts`

### Need to change homepage content?
→ `app/page.tsx`

### Need to change site-wide styles?
→ `app/globals.css` or `tailwind.config.ts`

### Need to add/change components?
→ `components/` folder

### Need to fix metadata/SEO?
→ `app/layout.tsx`

---

## 📝 QUICK REFERENCE

**Import paths:**
- `@/lib/` → Library files
- `@/components/` → Component files
- `@/app/` → Page files

**Useful commands:**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Run production build
```

**Where to test:**
- Local: http://localhost:3000
- GA4: https://analytics.google.com/
- Clarity: https://clarity.microsoft.com/
- Supabase: Your project dashboard

---

**QUESTIONS?** Check the comments in each file - they explain everything! 💡

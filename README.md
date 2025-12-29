# 🚀 SAMIYA WEB APP - MVP Setup Guide

## 📋 **PROJECT OVERVIEW**

This is Samiya's web application designed to capture her viral TikTok momentum and convert followers into a loyal, trackable audience.

**Goals:**
- ✅ Capture traffic from TikTok "link in bio"
- ✅ Collect email subscribers
- ✅ Track detailed analytics (demographics, behavior)
- ✅ Build custom audiences for retargeting
- ✅ Test what the audience wants (Design Thinking approach)
- ✅ Convert viral moment into sustainable business

**Tech Stack:**
- Next.js 14 (React framework)
- TypeScript (type safety)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Supabase (database - FREE)
- Vercel (hosting - FREE)
- GA4 + Clarity + TikTok Pixel (analytics - FREE)

**Total Cost: $0** ✅

---

## 🏗️ **PROJECT STRUCTURE**

```
samiya-web-app/
├── app/
│   ├── layout.tsx          # Root layout (loads once)
│   ├── page.tsx            # Homepage (main landing page)
│   └── globals.css         # Global styles
│
├── components/
│   ├── shared/             # Reusable components
│   │   ├── Navigation.tsx  # Top nav bar
│   │   └── Footer.tsx      # Bottom footer
│   ├── homepage/           # Homepage-specific components
│   │   ├── HeroSection.tsx
│   │   ├── EmailCapture.tsx
│   │   ├── TikTokEmbed.tsx
│   │   └── BrandPillars.tsx
│   └── analytics/
│       └── AnalyticsWrapper.tsx  # Loads all tracking scripts
│
├── lib/
│   ├── analytics.ts        # Tracking functions
│   ├── supabase.ts         # Database connection
│   └── types.ts            # TypeScript types
│
├── public/
│   └── images/             # Images go here
│
├── .env.local              # Environment variables (YOU CREATE THIS)
├── .env.example            # Template for environment variables
├── package.json            # Dependencies
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

---

## ⚡ **QUICK START (Mac)**

### **Step 1: Extract the Project**
```bash
# Unzip the project
unzip samiya-web-app.zip
cd samiya-web-app
```

### **Step 2: Install Dependencies**
```bash
# Install Node.js packages
npm install
```

### **Step 3: Set Up Environment Variables**
```bash
# Copy the example file
cp .env.example .env.local

# Open .env.local in VS Code
code .env.local
```

**Fill in these values** (instructions below):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional but recommended)
- `NEXT_PUBLIC_CLARITY_PROJECT_ID` (optional but recommended)
- `NEXT_PUBLIC_TIKTOK_PIXEL_ID` (**CRITICAL for Samiya!**)

### **Step 4: Start Development Server**
```bash
npm run dev
```

Open http://localhost:3000 in your browser! 🎉

---

## 🔧 **DETAILED SETUP INSTRUCTIONS**

### **1. Supabase Setup (Database) - REQUIRED**

**Why:** Stores email subscribers and custom analytics

**Steps:**
1. Go to https://supabase.com/
2. Click "Start your project"
3. Sign in with GitHub (free account)
4. Click "New Project"
   - Name: `samiya-web-app`
   - Database Password: (create a strong password, save it!)
   - Region: Choose closest to your audience (e.g., `US East`)
   - Pricing: Free tier (500MB database, perfect for MVP)
5. Wait ~2 minutes for database to provision
6. Go to **Project Settings** > **API**
7. Copy these values to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUz...
   ```

**Create Database Tables:**
1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste each CREATE TABLE statement:

```sql
-- Subscribers table
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  source VARCHAR(50),
  utm_source VARCHAR(100),
  utm_campaign VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active'
);

-- Analytics events table
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_name VARCHAR(100),
  event_data JSONB,
  user_id UUID,
  session_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Content clicks table
CREATE TABLE content_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type VARCHAR(50),
  content_id VARCHAR(100),
  clicks INT DEFAULT 0,
  last_clicked TIMESTAMP
);

-- Surveys table (for future use)
CREATE TABLE surveys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT,
  answer TEXT,
  email VARCHAR(255),
  submitted_at TIMESTAMP DEFAULT NOW()
);
```

4. Click **Run** for each table
5. Verify tables exist in **Table Editor**

---

### **2. Google Analytics 4 Setup - HIGHLY RECOMMENDED**

**Why:** Track demographics, traffic sources, page views

**Steps:**
1. Go to https://analytics.google.com/
2. Click **Admin** (bottom left gear icon)
3. Click **Create Property**
   - Property name: `Samiya Web App`
   - Timezone: Your timezone
   - Currency: USD
4. Click **Next**, choose **Web**
5. Add website details:
   - Website URL: `http://localhost:3000` (change after deployment)
   - Stream name: `Samiya Website`
6. Copy the **Measurement ID** (starts with `G-`)
7. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

**Test it works:**
1. Start your dev server: `npm run dev`
2. Open http://localhost:3000
3. In GA4, go to **Reports** > **Realtime**
4. You should see 1 active user! 🎉

---

### **3. Microsoft Clarity Setup - HIGHLY RECOMMENDED**

**Why:** Watch session recordings, see heatmaps, understand user behavior

**Steps:**
1. Go to https://clarity.microsoft.com/
2. Sign in with Microsoft account (or create one)
3. Click **Add new project**
   - Name: `Samiya Web App`
   - Website URL: `http://localhost:3000`
4. Setup method: **Install tracking code manually**
5. Copy the **Project ID** (the random string of letters/numbers)
6. Add to `.env.local`:
   ```
   NEXT_PUBLIC_CLARITY_PROJECT_ID=abc123def456
   ```

**Test it works:**
1. Start your dev server
2. Navigate around your site
3. Go back to Clarity dashboard
4. Click **Recordings** - you should see your session! 🎥

---

### **4. TikTok Pixel Setup - CRITICAL FOR SAMIYA!**

**Why:** Build custom audiences, retarget website visitors on TikTok, track which videos drive traffic

**Steps:**
1. Go to https://ads.tiktok.com/
2. Sign in with Samiya's TikTok account
3. Go to **Assets** > **Events**
4. Click **Web Events** > **Create Pixel**
   - Name: `Samiya Website Pixel`
   - Connection method: **Manually Install Pixel Code**
5. Copy the **Pixel ID** (long string of letters)
6. Add to `.env.local`:
   ```
   NEXT_PUBLIC_TIKTOK_PIXEL_ID=ABC123DEF456
   ```

**What this unlocks:**
- ✅ See which TikTok videos drive the most traffic
- ✅ Retarget website visitors with TikTok ads
- ✅ Build lookalike audiences (find similar people)
- ✅ Track conversions (email signups, purchases)
- ✅ Optimize ad spend based on real data

---

### **5. Meta Pixel Setup (Optional - for later)**

**Why:** Retarget on Facebook/Instagram, track Instagram traffic

**Steps:**
1. Go to https://business.facebook.com/
2. Go to **Business Settings** > **Data Sources** > **Pixels**
3. Click **Add** > **Create a Pixel**
   - Name: `Samiya Website`
4. Copy the **Pixel ID**
5. Add to `.env.local`:
   ```
   NEXT_PUBLIC_META_PIXEL_ID=123456789012345
   ```

---

## 🎨 **CUSTOMIZATION CHECKLIST**

Before deploying, customize these files:

### **1. Update Brand Information**

**File: `app/page.tsx`**
- Line 89: Add Samiya's TikTok handle
- Line 105: Add Instagram handle
- Update copy to match Samiya's voice

**File: `app/layout.tsx`**
- Line 52: Update domain
- Line 57: Add description
- Line 75: Add Twitter handle
- Line 85: Add social share image

### **2. Add TikTok Video IDs**

Get the video IDs from TikTok URLs:
- URL: `https://www.tiktok.com/@username/video/1234567890`
- Video ID: `1234567890`

Update in `app/page.tsx`:
- Line 141: Replace `"viral-video-1"` with real ID
- Line 149: Replace `"viral-video-2"` with real ID
- Line 157: Replace `"viral-video-3"` with real ID

### **3. Add Brand Colors (if different)**

**File: `tailwind.config.ts`**
- Update the `brand` colors if Samiya has specific brand colors

### **4. Add Logo & Images**

Add these files to `/public/`:
- `favicon.ico` - Browser tab icon
- `og-image.jpg` - Social media share image (1200x630px)
- `logo.png` - Samiya's logo

---

## 🚀 **DEPLOYMENT TO VERCEL (100% FREE)**

### **Step 1: Push to GitHub**

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Samiya Web App MVP"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/samiya-web-app.git
git push -u origin main
```

### **Step 2: Deploy to Vercel**

1. Go to https://vercel.com/
2. Sign up with GitHub
3. Click **Add New** > **Project**
4. Import `samiya-web-app` repository
5. **Environment Variables** - Add all your `.env.local` variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - `NEXT_PUBLIC_CLARITY_PROJECT_ID`
   - `NEXT_PUBLIC_TIKTOK_PIXEL_ID`
   - `NEXT_PUBLIC_META_PIXEL_ID` (optional)
6. Click **Deploy**
7. Wait ~2 minutes ⏱️
8. Your site is live! 🎉

**Update analytics:**
1. Copy your Vercel URL (e.g., `samiya-web-app.vercel.app`)
2. Update in GA4 (add as data stream)
3. Update in Clarity (change website URL)

---

## 📊 **TESTING ANALYTICS**

After deployment, test everything works:

### **1. Test Page Views**
- Visit your site
- Check GA4 Realtime: Should show 1 user
- Check Clarity: Should start recording

### **2. Test Email Signup**
- Enter an email
- Check Supabase: Go to Table Editor > `subscribers`
- Should see new row with your email

### **3. Test Event Tracking**
- Click navigation links
- Click TikTok videos
- Click brand pillar cards
- Check GA4: **Reports** > **Events**
- Should see: `nav_click`, `tiktok_video`, `pillar_click`

### **4. Test TikTok Pixel**
- Install TikTok Pixel Helper (Chrome extension)
- Visit your site
- Should see green checkmark (pixel firing)

---

## 🐛 **TROUBLESHOOTING**

### **Issue: "Supabase client error"**
**Solution:**
- Check `.env.local` has correct URL and key
- Restart dev server: `npm run dev`

### **Issue: "Analytics not tracking"**
**Solution:**
- Check browser console for errors (F12 > Console tab)
- Verify IDs in `.env.local` are correct
- Clear browser cache and cookies

### **Issue: "TikTok videos not embedding"**
**Solution:**
- Get the actual TikTok embed code from TikTok
- Use TikTok's oEmbed API or embed widget

### **Issue: "Styles not loading"**
**Solution:**
- Run: `npm install`
- Delete `.next` folder: `rm -rf .next`
- Restart: `npm run dev`

---

## 📈 **NEXT STEPS AFTER MVP LAUNCH**

### **Week 1: Data Collection**
- ✅ Monitor GA4 for demographics
- ✅ Watch Clarity recordings
- ✅ Track email signup rate
- ✅ Note which TikTok videos drive most traffic

### **Week 2: Audience Research**
- ✅ Add a survey asking "What problems can I help you solve?"
- ✅ Analyze Supabase data for patterns
- ✅ Create audience segments

### **Week 3: Content Strategy**
- ✅ Based on data, create targeted content
- ✅ Add blog section
- ✅ Create lead magnets (free downloads)

### **Week 4: Monetization**
- ✅ Launch product based on audience needs
- ✅ Set up Stripe for payments
- ✅ Create sales funnel

---

## 📚 **LEARNING RESOURCES**

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Supabase Docs: https://supabase.com/docs
- GA4 Academy: https://analytics.google.com/analytics/academy/

---

## 🆘 **NEED HELP?**

Check the comments in each file - they're heavily annotated to explain everything!

Key files to understand:
1. `app/page.tsx` - The homepage
2. `lib/analytics.ts` - All tracking functions
3. `lib/supabase.ts` - Database operations

---

## ✅ **PRE-LAUNCH CHECKLIST**

- [ ] Supabase set up and tables created
- [ ] Environment variables configured
- [ ] GA4 tracking tested
- [ ] Clarity recording works
- [ ] TikTok Pixel installed
- [ ] Email signup works
- [ ] Mobile responsive (test on phone)
- [ ] All TikTok video IDs added
- [ ] Samiya's social links updated
- [ ] Logo and images added
- [ ] Deployed to Vercel
- [ ] Custom domain connected (optional)
- [ ] TikTok bio updated with website link

---

**READY TO LAUNCH!** 🚀

Good luck with the MVP! Remember, this is just the beginning. Use the data you collect to build something amazing! 💪

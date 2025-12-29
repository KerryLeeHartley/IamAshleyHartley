# 🎨 SAMIYA'S LINKTREE-STYLE HOMEPAGE - SETUP GUIDE

## ✅ **WHAT WE JUST BUILT:**

Your new homepage is a **custom Linktree-style page** featuring:
- ✉️ Email capture modal (on-site, not external)
- 🎥 Expandable TikTok video embed
- 🎨 Scrollable art gallery preview
- ▶️ YouTube channel link
- 👋 Work With Me contact form
- Full `/gallery` page for all artwork

---

## 🎯 **PAGE STRUCTURE:**

```
Homepage (/)           → Linktree-style link page
Gallery (/gallery)     → Full art showcase
Old Homepage (backup)  → Saved as page-full-homepage.tsx
```

---

## 🚀 **QUICK START:**

```bash
# Run the site
npm run dev

# Open browser
http://localhost:3000  → New Linktree homepage
http://localhost:3000/gallery  → Full gallery page
```

---

## ✏️ **CUSTOMIZATION CHECKLIST:**

### **1. Add Your Profile Photo**

**File:** `app/page.tsx` (line 59)

**Find:**
```tsx
<div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-4xl">
  🎨
</div>
```

**Replace with:**
```tsx
<img 
  src="/profile.jpg" 
  alt="Samiya" 
  className="w-24 h-24 mx-auto mb-4 rounded-full object-cover shadow-lg"
/>
```

Then add `profile.jpg` to `/public/` folder

---

### **2. Add Your TikTok Video**

**File:** `app/page.tsx` (line 104)

**Find:**
```tsx
<div className="aspect-[9/16] max-w-xs mx-auto bg-gray-200 rounded-xl flex items-center justify-center">
  <p className="text-gray-500 text-center px-4">
    TikTok Embed Here
  </p>
</div>
```

**Replace with TikTok embed code:**
```tsx
<iframe 
  src="https://www.tiktok.com/embed/v2/YOUR_VIDEO_ID"
  className="w-full h-full rounded-xl"
  allowFullScreen
/>
```

Get embed code from TikTok:
1. Go to your TikTok video
2. Click "..." → Embed
3. Copy the iframe code

---

### **3. Add Your Paintings**

**File:** `app/page.tsx` (line 284)

**Step 1:** Add images to `/public/paintings/`
```
public/
  paintings/
    1.jpg
    2.jpg
    3.jpg
    etc...
```

**Step 2:** Update the paintings array:
```tsx
const paintings = [
  { 
    id: 1, 
    title: 'Sunset Dreams', 
    image: '/paintings/sunset-dreams.jpg'  // ← Add real path
  },
  // Add more...
]
```

**Step 3:** Update the gallery component:
```tsx
<div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl overflow-hidden">
  <img 
    src={painting.image} 
    alt={painting.title}
    className="w-full h-full object-cover"
  />
</div>
```

---

### **4. Update YouTube Link**

**File:** `app/page.tsx` (line 152)

**Find:**
```tsx
href="https://youtube.com/@samiya"
```

**Change to your actual YouTube channel:**
```tsx
href="https://youtube.com/@YOUR_ACTUAL_CHANNEL"
```

---

### **5. Connect Email to Supabase**

**File:** `app/page.tsx` (line 34)

**Find:**
```tsx
// TODO: Connect to Supabase
setTimeout(() => {
  setEmailStatus('success')
  // ...
}, 1000)
```

**Replace with:**
```tsx
import { saveSubscriber } from '@/lib/supabase'

const handleEmailSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setEmailStatus('loading')
  
  const { data, error } = await saveSubscriber(email, 'homepage')
  
  if (error) {
    setEmailStatus('error')
  } else {
    setEmailStatus('success')
    setEmail('')
  }
}
```

---

### **6. Update Text/Copy**

**Customize these lines:**

**Hero tagline** (line 65):
```tsx
<p className="text-xl text-gray-600 mb-1">
  Painter • Creative • Mom  {/* ← Change this */}
</p>
```

**Email modal text** (line 200):
```tsx
<p className="text-gray-600">
  Get weekly painting tips, exclusive content, and be the first to see new work!
  {/* ← Customize this message */}
</p>
```

**Button subtitles:**
- Line 76: "Get weekly painting tips & exclusive content"
- Line 86: "1.1M+ views • See what everyone's talking about"
- Line 127: "Browse my latest paintings"
- Line 148: "Painting tutorials & behind the scenes"
- Line 158: "Commissions, collaborations & partnerships"

---

## 🎨 **FULL GALLERY PAGE SETUP:**

### **Add Real Paintings to Gallery**

**File:** `app/gallery/page.tsx` (line 18)

**Update the paintings array:**
```tsx
const paintings = [
  { 
    id: 1, 
    title: 'Sunset Dreams', 
    category: 'landscape',  // landscape, seascape, urban, abstract
    price: '$250',          // Your pricing
    image: '/paintings/sunset-dreams.jpg',
    description: 'Acrylic on canvas, 16x20"'  // Medium & size
  },
  // Add all your paintings...
]
```

---

## 🔥 **ENABLE 3D HEARTS BACKGROUND:**

**File:** `app/page.tsx` (line 54-56)

**Uncomment these lines:**
```tsx
{/* 
  Uncomment to enable:
  <ThreeDBackground />
*/}
```

**Change to:**
```tsx
<ThreeDBackground />
```

Make sure `components/3d/ThreeDBackground.tsx` and `Hearts.tsx` are set up!

---

## 📊 **ADD ANALYTICS TRACKING:**

### **Track Link Clicks**

**At top of page.tsx:**
```tsx
import { trackEvent } from '@/lib/analytics'
```

**On each button click:**
```tsx
onClick={() => {
  trackEvent('link_click', { 
    link: 'community',
    location: 'homepage' 
  })
  setShowEmailModal(true)
}}
```

---

## 🎯 **MOBILE TESTING:**

Test on actual phone or use Chrome DevTools:
1. Open Chrome DevTools (F12)
2. Click device icon (top-left)
3. Select "iPhone 12 Pro" or similar
4. Reload page

**Check:**
- [ ] All buttons are easy to tap
- [ ] Email modal fits on screen
- [ ] Gallery scrolls smoothly
- [ ] Text is readable
- [ ] Gradients look good

---

## 🌈 **COLOR CUSTOMIZATION:**

All colors are in your theme:
- Pink: `#EC4899`
- Purple: `#A855F7`
- Backgrounds: Pink-50 to White gradient

**To change colors:**

Search and replace in `page.tsx`:
- `from-pink-500` → `from-YOUR-COLOR-500`
- `to-purple-500` → `to-YOUR-COLOR-500`

---

## 🚀 **DEPLOYMENT CHECKLIST:**

Before deploying:

- [ ] Add real profile photo
- [ ] Add real TikTok embed
- [ ] Add real painting images
- [ ] Update YouTube link
- [ ] Connect Supabase for emails
- [ ] Test all buttons/modals
- [ ] Test on mobile
- [ ] Add analytics tracking
- [ ] Test email form works
- [ ] Add custom domain (optional)

---

## 📱 **TESTING URLS:**

```bash
# Homepage
http://localhost:3000

# Gallery
http://localhost:3000/gallery

# Old homepage (if needed)
# Rename page-full-homepage.tsx back to access it
```

---

## 🎨 **ADDING MORE LINK BUTTONS:**

Copy this template and add to the link buttons section:

```tsx
<LinkButton
  icon="💎"  // Your emoji
  label="Shop My Prints"  // Button text
  subtitle="Limited edition prints available"  // Description
  href="https://shop.samiya.com"  // External link
  external  // Opens in new tab
/>
```

**Or for expandable sections:**
```tsx
<LinkButton
  icon="📝"
  label="My Blog"
  subtitle="Painting tips and creative insights"
  onClick={() => setShowBlog(!showBlog)}
  isExpanded={showBlog}
/>

{/* Add state at top: const [showBlog, setShowBlog] = useState(false) */}
```

---

## ✨ **NEXT STEPS:**

1. **Week 1:** Get homepage live with basics
2. **Week 2:** Add real paintings and connect email
3. **Week 3:** Add shop/purchase functionality
4. **Week 4:** Analytics review and optimization

---

## 🆘 **NEED HELP?**

Common issues:
- **Images not showing:** Check file paths start with `/`
- **Modal not closing:** Check z-index and backdrop click
- **Gallery not scrolling:** Add `overflow-x-auto` to container
- **Animations laggy:** Reduce `framer-motion` animations

Check the comments in the code - everything is heavily annotated!

---

**YOU'RE READY TO LAUNCH!** 🚀🎨💕

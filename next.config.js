/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'p16-sign-va.tiktokcdn.com', // TikTok thumbnails
      'v16-webapp.tiktok.com',      // TikTok videos
      'images.unsplash.com',        // Unsplash images (for placeholders)
      'cdn.sanity.io',              // Sanity CMS images (blog covers)
    ],
  },
}
module.exports = nextConfig

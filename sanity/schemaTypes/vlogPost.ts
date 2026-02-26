// ═══════════════════════════════════════════════════════════════
// SANITY SCHEMA: vlogPost
// FILE: sanity/schemaTypes/vlogPost.ts
// ═══════════════════════════════════════════════════════════════
//
// CHANGES FROM ORIGINAL:
//   + Added 'slug' field → needed for /vlog/[slug] URL routing
//   + Added 'productLinks' array → "Shop This Video" section
//     Each product link has: name, url, description
//
// ═══════════════════════════════════════════════════════════════

import { defineField, defineType, defineArrayMember } from 'sanity'

export const vlogPostType = defineType({
  name: 'vlogPost',
  title: 'Vlog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // ── NEW: Slug field ────────────────────────────────────────
    // This creates the URL for the vlog landing page.
    // e.g. title "Church Day Vlog" → slug "church-day-vlog"
    //      → URL becomes /vlog/church-day-vlog
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'Auto-generated from title. Used for the vlog landing page URL.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Paste the full YouTube URL e.g. https://www.youtube.com/watch?v=ABC123',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Custom Thumbnail (optional)',
      type: 'image',
      options: { hotspot: true },
      description: 'Leave blank to auto-use the YouTube thumbnail',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: '🎬 Vlog', value: 'vlog' },
          { title: '🔥 Pilates', value: 'pilates' },
          { title: '✨ Faith & Lifestyle', value: 'faith' },
          { title: '🏡 Home & Decor', value: 'home' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript / Notes',
      type: 'text',
      rows: 8,
      description: 'Paste the video transcript here for SEO — this gets indexed by Google',
    }),

    // ── NEW: Product Links ─────────────────────────────────────
    // Each item Ashley mentions in the video gets an entry here.
    // Shows up as a "Shop This Video" section on the landing page.
    // Perfect for affiliate links!
    //
    // HOW TO USE IN SANITY:
    //   1. Publish a vlog post
    //   2. Scroll to "Product Links" section
    //   3. Click "Add item"
    //   4. Fill in product name, affiliate URL, and short description
    //   5. Publish — links appear on the vlog landing page
    defineField({
      name: 'productLinks',
      title: 'Product Links (Shop This Video)',
      type: 'array',
      description: 'Add affiliate/product links mentioned in this video',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Product Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Link (affiliate URL)',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Short Description (optional)',
              type: 'string',
              description: 'e.g. "The mat I use in every class" or "20% off with code ASHLEY"',
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'description' },
          },
        }),
      ],
    }),

    defineField({
      name: 'featuredOnHomepage',
      title: 'Show in Homepage Carousel?',
      type: 'boolean',
      description: 'Toggle on to feature this video in the homepage Vlogs carousel',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in the carousel',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'thumbnail',
    },
  },
})

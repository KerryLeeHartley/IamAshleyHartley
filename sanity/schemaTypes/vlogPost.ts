import { defineField, defineType } from 'sanity'

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

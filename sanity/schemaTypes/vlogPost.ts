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

    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'Auto-generated from title. Click Generate.',
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

    // ── DESCRIPTION / BLOG SECTION ────────────────────────────
    // Rich text editor — shown on the page above the transcript.
    //
    // HOW TO ADD INLINE AFFILIATE LINKS:
    //   1. Type your description text
    //   2. Highlight the product/word you want to link
    //   3. Click the link 🔗 icon in the toolbar
    //   4. Paste your affiliate URL
    //   5. Toggle "Open in new tab" ON → Publish
    //
    // Use this for:
    //   • "In this vlog I visited [church name] and wore [outfit link]"
    //   • Key moments / what to expect in the video
    //   • Pilates tips, faith reflections, founder insights
    defineField({
      name: 'description',
      title: '📝 Description / Blog Section',
      type: 'array',
      description: 'Rich text shown above the transcript. Add your video summary, inline affiliate links, key moments.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h2' },
            { title: 'Subheading', value: 'h3' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({ allowRelative: false, scheme: ['http', 'https'] }),
                  }),
                  defineField({
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab?',
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),

    defineField({
      name: 'transcript',
      title: '🎙️ Full Transcript (SEO)',
      type: 'text',
      rows: 10,
      description: 'Paste raw YouTube auto-transcript here. Shown collapsed on page. Google indexes it for SEO.',
    }),

    defineField({
      name: 'productLinks',
      title: '🛍️ Product Links (Shop This Video)',
      type: 'array',
      description: 'Affiliate/product links shown as clickable cards on the landing page',
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
              title: 'Affiliate URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Short Description (optional)',
              type: 'string',
              description: 'e.g. "The mat I use every class" or "20% off with code ASHLEY"',
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
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'thumbnail' },
  },
})

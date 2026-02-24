import { defineField, defineType } from 'sanity'

export const blogPostType = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Faith', value: 'faith' },
          { title: 'Pilates & Wellness', value: 'wellness' },
          { title: 'Dream Life', value: 'dreamlife' },
          { title: 'Founder Journey', value: 'founder' },
          { title: 'Lifestyle', value: 'lifestyle' },
          { title: 'Home', value: 'home' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Excerpt',
      type: 'text',
      rows: 2,
      description: 'A one or two sentence preview shown on the blog listing page',
    }),
    defineField({
      name: 'body',
      title: 'Post Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'featuredOnHomepage',
      title: 'Show in Homepage Carousel?',
      type: 'boolean',
      description: 'Toggle on to feature this post in the Dreamers Blog carousel',
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
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})

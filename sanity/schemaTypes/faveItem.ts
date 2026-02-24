import { defineField, defineType } from 'sanity'

export const faveItemType = defineType({
  name: 'faveItem',
  title: 'Fave Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: '👗 Wearing / Fashion', value: 'wearing' },
          { title: '🔥 Pilates Gear', value: 'pilates' },
          { title: '🏡 Home Decor', value: 'home' },
          { title: '🌿 Fave Meals & Vegan Options', value: 'food' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag (e.g. "Must Have", "New Fave")',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Product Link (affiliate URL)',
      type: 'url',
    }),
    defineField({
      name: 'featuredOnHomepage',
      title: 'Show in Homepage Carousel?',
      type: 'boolean',
      description: 'Toggle on to feature this item in the homepage Faves carousel',
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
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
  },
})

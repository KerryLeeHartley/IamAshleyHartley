import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Latest single vlog for featured embed
export async function getLatestVlog() {
  return client.fetch(
    `*[_type == "vlogPost"] | order(publishedAt desc) [0] {
      _id, title, youtubeUrl, thumbnail, category, slug
    }`
  )
}

// Featured vlogs for carousel
export async function getFeaturedVlogs() {
  return client.fetch(
    `*[_type == "vlogPost" && featuredOnHomepage == true] | order(publishedAt desc) {
      _id, title, youtubeUrl, thumbnail, category, slug
    }`
  )
}

// Featured blog posts for carousel
export async function getFeaturedBlogPosts() {
  return client.fetch(
    `*[_type == "blogPost" && featuredOnHomepage == true] | order(publishedAt desc) {
      _id, title, coverImage, category, slug
    }`
  )
}

// Featured faves for carousel
export async function getFeaturedFaves() {
  return client.fetch(
    `*[_type == "faveItem" && featuredOnHomepage == true] | order(order asc) {
      _id, name, image, category, tag, link
    }`
  )
}

// All vlogs for archive page
export async function getAllVlogs() {
  return client.fetch(
    `*[_type == "vlogPost"] | order(publishedAt desc) {
      _id, title, youtubeUrl, thumbnail, category, publishedAt, transcript
    }`
  )
}

// All blog posts for blog page
export async function getAllBlogPosts() {
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      _id, title, coverImage, category, excerpt, slug, publishedAt
    }`
  )
}

// All faves for faves page
export async function getAllFaves() {
  return client.fetch(
    `*[_type == "faveItem"] | order(order asc) {
      _id, name, image, description, category, tag, link
    }`
  )
}

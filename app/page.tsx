export const revalidate = 60

import { getLatestVlog, getFeaturedVlogs, getFeaturedBlogPosts, getFeaturedFaves } from '@/lib/sanity'
import HomeClient from '@/components/HomeClient'

export default async function HomePage() {
  const [latestVlog, vlogs, blogPosts, faves] = await Promise.all([
    getLatestVlog(),
    getFeaturedVlogs(),
    getFeaturedBlogPosts(),
    getFeaturedFaves(),
  ])

  return <HomeClient latestVlog={latestVlog} vlogs={vlogs} blogPosts={blogPosts} faves={faves} />
}

// ═══════════════════════════════════════════════════════════════
// PAGE: /blog  →  app/blog/page.tsx
// ═══════════════════════════════════════════════════════════════
//
// WHAT THIS IS:
//   The blog archive — shows ALL of Ashley's blog posts in a grid.
//   Visitors can filter by category (Faith, Pilates, etc.)
//   and click any card to read the full post.
//
// HOW DATA FLOWS:
//   1. Page loads → server fetches ALL posts from Sanity CMS
//   2. Posts are passed to the client <BlogGrid> component
//   3. User clicks a category filter → grid updates instantly
//      (no page reload needed — React handles it in the browser)
//
// FILE STRUCTURE:
//   ┌─ BlogPage (server component) ─────────────────────────────┐
//   │  Fetches data from Sanity, then renders:                  │
//   │   ┌─ PageHeader ──────────────────────────────────────┐   │
//   │   │  "A Dreamers Blog" title + subtitle               │   │
//   │   └───────────────────────────────────────────────────┘   │
//   │   ┌─ BlogGrid (client component) ─────────────────────┐   │
//   │   │  Category filter buttons + post cards grid        │   │
//   │   └───────────────────────────────────────────────────┘   │
//   └───────────────────────────────────────────────────────────┘
//
// WHY TWO COMPONENTS?
//   - BlogPage is a "server component" — it runs on the server
//     and fetches data FAST before the page loads. Good for SEO.
//   - BlogGrid is a "client component" — it runs in the browser
//     so it can respond to clicks (filter buttons).
//   - You can't do interactive things (useState) in server components,
//     so we split them up. The server fetches, the client interacts.
//
// SANITY FIELDS USED (from blogPost.ts schema):
//   - title        → post card heading
//   - slug.current → URL: /blog/[slug]
//   - coverImage   → card thumbnail
//   - category     → filter tag (faith, wellness, dreamlife, etc.)
//   - excerpt      → short preview text on card
//   - publishedAt  → date shown on card
//
// ═══════════════════════════════════════════════════════════════

// 'use client' is NOT here — this top level is a server component
// The client interactivity lives in BlogGrid below

import Link from "next/link";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import BlogGrid from "./BlogGrid";

// ─────────────────────────────────────────────────────────────
// SANITY CLIENT SETUP
// This connects to Ashley's Sanity CMS project.
// The values come from .env.local — never hardcode these!
// ─────────────────────────────────────────────────────────────
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-20",
  useCdn: true,
  // useCdn: true = use Sanity's fast global cache
  // Good for production. If posts seem stale, set to false.
});

// ─────────────────────────────────────────────────────────────
// IMAGE URL BUILDER
// Sanity stores images as references, not plain URLs.
// This helper converts them: { asset: { _ref: '...' } } → "https://cdn.sanity.io/..."
// ─────────────────────────────────────────────────────────────
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// ─────────────────────────────────────────────────────────────
// TYPESCRIPT TYPE
// Describes exactly what shape a blog post object has.
// This helps catch typos — TypeScript will warn if you use
// a field that doesn't exist.
// ─────────────────────────────────────────────────────────────
export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage?: any; // Sanity image reference (we'll convert to URL)
  category?: string; // 'faith' | 'wellness' | 'dreamlife' | 'founder' | 'lifestyle' | 'home'
  excerpt?: string; // Short preview text
  publishedAt?: string; // ISO date string e.g. "2026-02-20T00:00:00Z"
}

// ─────────────────────────────────────────────────────────────
// FETCH ALL BLOG POSTS FROM SANITY
// GROQ is Sanity's query language (like SQL for Sanity).
// This query says:
//   "Get everything where the document type is 'blogPost',
//    sorted newest first, and return only these specific fields"
// ─────────────────────────────────────────────────────────────
async function getAllBlogPosts(): Promise<BlogPost[]> {
  const query = `
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      coverImage,
      category,
      excerpt,
      publishedAt
    }
  `;

  try {
    const posts = await client.fetch<BlogPost[]>(query);
    return posts || [];
  } catch (error) {
    // If Sanity is unreachable or not configured, return empty array
    // so the page still loads without crashing
    console.error("Error fetching blog posts from Sanity:", error);
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════
// PAGE METADATA
// This controls what shows up in Google search results and
// when someone shares the page on social media.
// ═══════════════════════════════════════════════════════════════
export const metadata = {
  title: "A Dreamers Blog | Ashley Hartley",
  description:
    "Real life. Honest thoughts. Faith, Pilates, motherhood, and building a dream life in Atlanta.",
};

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT (Server Component)
// This runs on the server — it fetches data then renders HTML.
// ═══════════════════════════════════════════════════════════════
export default async function BlogPage() {
  // Fetch posts from Sanity (happens on the server, before page loads)
  const posts = await getAllBlogPosts();

  return (
    // ── Overall page background: warm cream matching blog post pages
    <main className="min-h-screen" style={{ backgroundColor: "#FDF6F0" }}>
      {/* ── BACK NAVIGATION ───────────────────────────────────
          Small link back to homepage, just like the blog post pages have  */}
      <div className="px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm"
          style={{ color: "#8B4A3C" }}
        >
          {/* Left arrow */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* ── PAGE HEADER ───────────────────────────────────────
          Big title + subtitle, centered, warm tones to match blog post style */}
      <header className="text-center px-6 pt-10 pb-12">
        {/* Small label above title — matches the "FOUNDER JOURNEY" style tags */}
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          style={{ color: "#B07060" }}
        >
          Ashley Hartley
        </p>

        {/* Main page title — large serif font, dark warm brown */}
        <h1
          className="text-5xl md:text-6xl font-bold mb-4"
          style={{
            color: "#2C1810",
            fontFamily: 'Georgia, "Times New Roman", serif',
            letterSpacing: "-0.02em",
          }}
        >
          A Dreamers Blog
        </h1>

        {/* Subtitle — italic, lighter color */}
        <p
          className="text-lg md:text-xl max-w-md mx-auto"
          style={{
            color: "#8B4A3C",
            fontStyle: "italic",
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          Real life. Honest thoughts. Building a dream one day at a time.
        </p>

        {/* Decorative divider line — thin warm colored line */}
        <div
          className="w-16 h-px mx-auto mt-8"
          style={{ backgroundColor: "#D4A89A" }}
        />
      </header>

      {/* ── BLOG GRID (Client Component) ──────────────────────
          Passes the fetched posts down to BlogGrid.
          BlogGrid handles the filter buttons and card layout.
          We pass urlFor so BlogGrid can build Sanity image URLs. */}
      <BlogGrid posts={posts} />

      {/* ── NEWSLETTER CTA ────────────────────────────────────
          Email signup prompt at the bottom of the page */}
      <section
        className="mx-6 md:mx-auto max-w-2xl mb-16 rounded-2xl p-10 text-center"
        style={{ backgroundColor: "#F5EBE4" }}
      >
        <p className="text-3xl mb-3">🦋</p>
        <h3
          className="text-2xl font-bold mb-2"
          style={{
            color: "#2C1810",
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          Stay in the loop
        </h3>
        <p className="mb-6 text-sm" style={{ color: "#8B4A3C" }}>
          Real updates, Pilates tips &amp; behind the scenes of building my
          dream life.
        </p>
        <Link
          href="/#subscribe"
          className="inline-block px-8 py-3 rounded-full text-white text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#8B2E1E" }}
        >
          Subscribe ✨
        </Link>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────
          Minimal footer matching existing blog post pages */}
      <footer
        className="text-center pb-10 text-sm"
        style={{ color: "#B07060" }}
      >
        © {new Date().getFullYear()} Ashley Hartley · Made with 💕 in Atlanta
      </footer>
    </main>
  );
}

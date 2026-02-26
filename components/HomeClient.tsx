"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity"
import EmailSignupForm from "@/components/EmailSignupForm";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface VlogPost {
  _id: string;
  title: string;
  youtubeUrl: string;
  thumbnail?: any;
  category?: string;
  slug?: { current: string };
}

interface BlogPost {
  _id: string;
  title: string;
  coverImage?: any;
  category?: string;
  slug?: { current: string };
}

interface FaveItem {
  _id: string;
  name: string;
  image?: any;
  category?: string;
  tag?: string;
  link?: string;
}

interface Props {
  latestVlog: VlogPost | null;
  vlogs: VlogPost[];
  blogPosts: BlogPost[];
  faves: FaveItem[];
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function getYouTubeId(url: string): string {
  const match = url.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : "";
}

function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

const categoryLabels: Record<string, string> = {
  wearing: "Wearing",
  pilates: "Pilates Gear",
  vlogging: "Vlogging Essentials",
  home: "Home Decor",
  food: "Fave Meals",
  vlog: "Vlog",
  faith: "Faith",
  wellness: "Pilates & Wellness",
  dreamlife: "Dream Life",
  founder: "Founder Journey",
  lifestyle: "Lifestyle",
};

// ─────────────────────────────────────────────────────────────
// SOCIAL LINKS
// ─────────────────────────────────────────────────────────────
const socialLinks = [
  {
    name: "Instagram",
    url: "https://instagram.com/iamashleyhartley",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: "22px", height: "22px" }}
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    url: "https://tiktok.com/@iamashleyhartley",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: "22px", height: "22px" }}
      >
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@iamashleyhartley",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: "22px", height: "22px" }}
      >
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    url: "https://pinterest.com/iamashleyhartley",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: "22px", height: "22px" }}
      >
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/iamashleyhartley",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: "22px", height: "22px" }}
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────────────────────
// SCRIBBLES
// ─────────────────────────────────────────────────────────────
function Scribbles() {
  return (
    <svg
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.1,
      }}
      viewBox="0 0 800 1000"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <circle
        cx="80"
        cy="120"
        r="55"
        stroke="#C0392B"
        strokeWidth="1.5"
        strokeDasharray="8 6"
      />
      <path
        d="M-20 80 Q100 40 200 90 Q300 140 420 70 Q540 10 660 80 Q760 130 820 60"
        stroke="#C0392B"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <g transform="translate(720, 160)">
        <line
          x1="0"
          y1="-18"
          x2="0"
          y2="18"
          stroke="#8B1A1A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="-18"
          y1="0"
          x2="18"
          y2="0"
          stroke="#8B1A1A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="-13"
          y1="-13"
          x2="13"
          y2="13"
          stroke="#8B1A1A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="13"
          y1="-13"
          x2="-13"
          y2="13"
          stroke="#8B1A1A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M30 320 Q-20 370 40 410 Q100 450 60 500 Q20 540 70 570"
        stroke="#C0392B"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="750" cy="300" r="3" fill="#C0392B" />
      <circle cx="765" cy="315" r="2" fill="#C0392B" />
      <circle cx="740" cy="325" r="2.5" fill="#C0392B" />
      <ellipse
        cx="60"
        cy="580"
        rx="38"
        ry="22"
        stroke="#C0392B"
        strokeWidth="1.2"
        transform="rotate(-20, 60, 580)"
      />
      <path
        d="M620 700 L650 730 L680 700 L710 730 L740 700 L770 730"
        stroke="#C0392B"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M100 800 Q80 760 110 740 Q150 720 170 755 Q190 790 160 810 Q130 825 115 805"
        stroke="#8B1A1A"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M-10 900 Q120 870 240 905 Q360 940 480 900 Q600 860 720 900 Q780 920 820 890"
        stroke="#C0392B"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="6 5"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────────────────────
function SectionHeader({
  label,
  seeAllHref,
  seeAllLabel = "See all →",
}: {
  label: string;
  seeAllHref: string;
  seeAllLabel?: string;
}) {
  return (
    <div
      style={{
        padding: "0 24px",
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <p
        style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#C0392B",
          margin: 0,
        }}
      >
        {label}
      </p>
      <Link
        href={seeAllHref}
        style={{
          fontSize: "0.75rem",
          color: "#7A3030",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        {seeAllLabel}
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// VLOG CARD
// ─────────────────────────────────────────────────────────────
function VlogCard({ vlog }: { vlog: VlogPost }) {
  const videoId = getYouTubeId(vlog.youtubeUrl);
  const thumbUrl = vlog.thumbnail
    ? urlFor(vlog.thumbnail).width(400).height(225).url()
    : getYouTubeThumbnail(videoId);

  // Link to vlog landing page if slug exists, otherwise fall back to YouTube
  const href = vlog.slug?.current ? `/vlog/${vlog.slug.current}` : vlog.youtubeUrl;
  const isExternal = !vlog.slug?.current;

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="vlog-card"
      style={{
        flexShrink: 0,
        width: 200,
        borderRadius: 16,
        overflow: "hidden",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        border: "1.5px solid rgba(192,57,43,0.12)",
        boxShadow: "0 4px 20px rgba(26,10,8,0.08)",
        textDecoration: "none",
        display: "block",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 12px 32px rgba(192,57,43,0.18)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 4px 20px rgba(26,10,8,0.08)";
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
          background: "#1A0A08",
          position: "relative",
        }}
      >
        <img
          src={thumbUrl}
          alt={vlog.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(192,57,43,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="white"
              style={{ width: 16, height: 16, marginLeft: 2 }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div style={{ padding: "10px 12px 12px" }}>
        {vlog.category && (
          <span
            style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#C0392B",
              display: "block",
              marginBottom: 4,
            }}
          >
            {categoryLabels[vlog.category] || vlog.category}
          </span>
        )}
        <p
          style={{
            fontSize: "0.82rem",
            fontWeight: 700,
            color: "#1A0A08",
            lineHeight: 1.3,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {vlog.title}
        </p>
      </div>
    </a>
  );
}

// ─────────────────────────────────────────────────────────────
// BLOG CARD
// ─────────────────────────────────────────────────────────────
function BlogCard({ post }: { post: BlogPost }) {
  const imgUrl = post.coverImage
    ? urlFor(post.coverImage).width(400).height(400).url()
    : null;
  const href = post.slug ? `/blog/${post.slug.current}` : "/blog";

  return (
    <Link
      href={href}
      className="blog-card"
      style={{
        flexShrink: 0,
        width: 180,
        borderRadius: 16,
        overflow: "hidden",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        border: "1.5px solid rgba(192,57,43,0.12)",
        boxShadow: "0 4px 20px rgba(26,10,8,0.08)",
        textDecoration: "none",
        display: "block",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 12px 32px rgba(192,57,43,0.18)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 4px 20px rgba(26,10,8,0.08)";
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "1/1",
          overflow: "hidden",
          background: "#F5EDE8",
          position: "relative",
        }}
      >
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={post.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
            }}
          >
            🦋
          </div>
        )}
        {post.category && (
          <div
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              background: "rgba(192,57,43,0.9)",
              color: "white",
              fontSize: "0.6rem",
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: 100,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {categoryLabels[post.category] || post.category}
          </div>
        )}
      </div>
      <div style={{ padding: "10px 12px 14px" }}>
        <p
          style={{
            fontSize: "0.82rem",
            fontWeight: 700,
            color: "#1A0A08",
            lineHeight: 1.3,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.title}
        </p>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────
// FAVE CARD
// ─────────────────────────────────────────────────────────────
function FaveCard({ fave }: { fave: FaveItem }) {
  const imgUrl = fave.image
    ? urlFor(fave.image).width(300).height(300).url()
    : null;
  const Wrapper = fave.link
    ? ({ children }: { children: React.ReactNode }) => (
        <a
          href={fave.link!}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flexShrink: 0,
            width: 160,
            textDecoration: "none",
            display: "block",
          }}
          onMouseEnter={(e) => {
            const c = (e.currentTarget as HTMLElement).querySelector(
              ".fi",
            ) as HTMLElement;
            if (c) {
              c.style.transform = "translateY(-4px)";
              c.style.boxShadow = "0 12px 32px rgba(192,57,43,0.18)";
            }
          }}
          onMouseLeave={(e) => {
            const c = (e.currentTarget as HTMLElement).querySelector(
              ".fi",
            ) as HTMLElement;
            if (c) {
              c.style.transform = "translateY(0)";
              c.style.boxShadow = "0 4px 20px rgba(26,10,8,0.08)";
            }
          }}
        >
          {children}
        </a>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <div style={{ flexShrink: 0, width: 160 }}>{children}</div>
      );

  return (
    <Wrapper>
      <div
        className="fi"
        style={{
          borderRadius: 16,
          overflow: "hidden",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          border: "1.5px solid rgba(192,57,43,0.12)",
          boxShadow: "0 4px 20px rgba(26,10,8,0.08)",
          transition: "all 0.25s ease",
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "1/1",
            overflow: "hidden",
            background: "#F5EDE8",
            position: "relative",
          }}
        >
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={fave.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
              }}
            >
              ✨
            </div>
          )}
          {fave.tag && (
            <div
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                background: "rgba(192,57,43,0.9)",
                color: "white",
                fontSize: "0.6rem",
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: 100,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {fave.tag}
            </div>
          )}
        </div>
        <div style={{ padding: "10px 12px 12px" }}>
          {fave.category && (
            <span
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#C0392B",
                display: "block",
                marginBottom: 3,
              }}
            >
              {categoryLabels[fave.category] || fave.category}
            </span>
          )}
          <p
            style={{
              fontSize: "0.82rem",
              fontWeight: 700,
              color: "#1A0A08",
              lineHeight: 1.3,
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {fave.name}
          </p>
          {fave.link && (
            <p
              style={{
                fontSize: "0.7rem",
                color: "#C0392B",
                fontWeight: 600,
                marginTop: 6,
                marginBottom: 0,
              }}
            >
              Shop →
            </p>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────
export default function HomeClient({
  latestVlog,
  vlogs,
  blogPosts,
  faves,
}: Props) {
  const featuredVideoId = latestVlog ? getYouTubeId(latestVlog.youtubeUrl) : "";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FDF6F0",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .ah-social:hover { background: #C0392B !important; color: white !important; transform: translateY(-3px) !important; }
        .ah-btn-s:hover { background: white !important; border-color: #C0392B !important; transform: translateY(-3px) !important; box-shadow: 0 14px 36px rgba(192,57,43,0.25) !important; }
        .ah-btn-p:hover { transform: translateY(-3px) !important; box-shadow: 0 14px 36px rgba(192,57,43,0.55) !important; }
        .ah-sub-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 10px 28px rgba(192,57,43,0.45) !important; }
        .yt-sub-btn:hover { transform: translateY(-3px) !important; box-shadow: 0 8px 24px rgba(255,0,0,0.45) !important; }
        .vlog-card:hover { transform: translateY(-5px) !important; box-shadow: 0 16px 40px rgba(192,57,43,0.22) !important; }
        .blog-card:hover { transform: translateY(-5px) !important; box-shadow: 0 16px 40px rgba(192,57,43,0.22) !important; }
        .fave-card:hover { transform: translateY(-5px) !important; box-shadow: 0 16px 40px rgba(192,57,43,0.22) !important; }
        .fave-card:hover .shop-link { color: #8B1A1A !important; }
        .card-img-overlay { transition: opacity 0.25s ease !important; }
        .vlog-card:hover .card-img-overlay { opacity: 0.35 !important; }
        .carousel::-webkit-scrollbar { display: none; }
        .carousel { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatOrb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,-30px) scale(1.06)} 66%{transform:translate(-15px,15px) scale(0.94)} }
        .a0{animation:fadeUp .6s ease 0s both}
        .a1{animation:fadeUp .6s ease .1s both}
        .a2{animation:fadeUp .6s ease .2s both}
        .a3{animation:fadeUp .6s ease .3s both}
        .a4{animation:fadeUp .6s ease .4s both}
        .a5{animation:fadeUp .6s ease .5s both}
        .a6{animation:fadeUp .6s ease .6s both}
        .a7{animation:fadeUp .6s ease .7s both}
      `}</style>

      {/* Orbs */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "#C0392B",
            filter: "blur(90px)",
            opacity: 0.18,
            top: -160,
            right: -100,
            animation: "floatOrb 11s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "#F5C6C0",
            filter: "blur(90px)",
            opacity: 0.24,
            bottom: 80,
            left: -80,
            animation: "floatOrb 15s ease-in-out infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "#E8A09A",
            filter: "blur(90px)",
            opacity: 0.2,
            top: "55%",
            left: "55%",
            animation: "floatOrb 13s ease-in-out infinite 2s",
          }}
        />
      </div>
      <Scribbles />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 480,
          margin: "0 auto",
          padding: "52px 0 52px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
        }}
      >
        {/* PROFILE */}
        <section
          className="a0"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: "0 24px",
          }}
        >
          <div
            style={{
              width: 136,
              height: 136,
              borderRadius: "50%",
              padding: 3,
              background: "linear-gradient(135deg, #C0392B, #F5C6C0, #C0392B)",
              marginBottom: 14,
              boxShadow: "0 8px 32px rgba(192,57,43,0.3)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid #FDF6F0",
              }}
            >
              <Image
                src="/ashley-profile.jpg"
                alt="Ashley Hartley"
                width={130}
                height={130}
                priority
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
            </div>
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "2.5rem",
              fontWeight: 600,
              color: "#1A0A08",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Ashley Hartley
          </h1>
          <p style={{ fontSize: "1rem", color: "#7A3030", margin: 0 }}>
            Founder & Pilates 💕
          </p>
          <p
            style={{
              fontSize: "0.72rem",
              color: "#C0392B",
              letterSpacing: "0.14em",
              fontWeight: 700,
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            ✦ Atlanta, GA ✦
          </p>
        </section>

        {/* SOCIAL */}
        <section
          className="a1"
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            padding: "0 24px",
          }}
        >
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="ah-social"
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.78)",
                backdropFilter: "blur(10px)",
                border: "1.5px solid rgba(192,57,43,0.22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#7A3030",
                transition: "all 0.25s ease",
                textDecoration: "none",
              }}
            >
              {s.icon}
            </a>
          ))}
        </section>

        {/* FEATURED VIDEO */}
        {latestVlog && (
          <section className="a2" style={{ width: "100%", padding: "0 24px" }}>
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#C0392B",
                marginBottom: 10,
                textAlign: "center",
                marginTop: 0,
              }}
            >
              ▶ Latest Video
            </p>
            <div
              style={{
                width: "100%",
                aspectRatio: "16/9",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 16px 48px rgba(192,57,43,0.2)",
                background: "#1A0A08",
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${featuredVideoId}?rel=0&modestbranding=1`}
                title={latestVlog.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  display: "block",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#1A0A08",
                textAlign: "center",
                marginTop: 10,
                marginBottom: 12,
              }}
            >
              {latestVlog.title}
            </p>
            {/* YouTube Subscribe Button */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <a
                href="https://youtube.com/@iamashleyhartley?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="yt-sub-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "11px 24px",
                  background: "#FF0000",
                  color: "white",
                  borderRadius: 100,
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  boxShadow: "0 4px 16px rgba(255,0,0,0.3)",
                  transition: "all 0.25s ease",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="white"
                  style={{ width: 18, height: 18, flexShrink: 0 }}
                >
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Subscribe
              </a>
            </div>
          </section>
        )}

        {/* VLOGS CAROUSEL */}
        {vlogs.length > 0 && (
          <section className="a3" style={{ width: "100%" }}>
            <SectionHeader label="Latest Vlogs" seeAllHref="/vlog" />
            <div
              className="carousel"
              style={{
                display: "flex",
                gap: 12,
                overflowX: "auto",
                paddingLeft: 24,
                paddingRight: 24,
                paddingBottom: 8,
              }}
            >
              {vlogs.map((v) => (
                <VlogCard key={v._id} vlog={v} />
              ))}
            </div>
          </section>
        )}

        {/* DREAMERS BLOG CAROUSEL */}
        {blogPosts.length > 0 && (
          <section className="a4" style={{ width: "100%" }}>
            <SectionHeader label="A Dreamers Blog" seeAllHref="/blog" />
            <div
              className="carousel"
              style={{
                display: "flex",
                gap: 12,
                overflowX: "auto",
                paddingLeft: 24,
                paddingRight: 24,
                paddingBottom: 8,
              }}
            >
              {blogPosts.map((p) => (
                <BlogCard key={p._id} post={p} />
              ))}
            </div>
          </section>
        )}

        {/* FAVES CAROUSEL */}
        {faves.length > 0 && (
          <section className="a5" style={{ width: "100%" }}>
            <SectionHeader label="Current Faves ✨" seeAllHref="/faves" />
            <div
              className="carousel"
              style={{
                display: "flex",
                gap: 12,
                overflowX: "auto",
                paddingLeft: 24,
                paddingRight: 24,
                paddingBottom: 8,
              }}
            >
              {faves.map((f) => (
                <FaveCard key={f._id} fave={f} />
              ))}
            </div>
          </section>
        )}

        {/* WORK WITH ME BUTTON */}
        <section className="a6" style={{ width: "100%", padding: "0 24px" }}>
          <Link
            href="/work-with-me"
            className="ah-btn-p"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              width: "100%",
              padding: "20px 32px",
              borderRadius: 100,
              textDecoration: "none",
              textAlign: "center",
              background: "linear-gradient(135deg, #C0392B 0%, #8B1A1A 100%)",
              color: "white",
              boxShadow: "0 8px 28px rgba(192,57,43,0.42)",
              transition: "all 0.25s ease",
            }}
          >
            <span style={{ fontSize: "1rem", fontWeight: 700 }}>
              Work With Me
            </span>
            <span
              style={{ fontSize: "0.78rem", fontWeight: 400, opacity: 0.65 }}
            >
              Brand partnerships & collaborations
            </span>
          </Link>
        </section>

        {/* EMAIL SIGNUP */}
        <section
          className="a7"
          id="email-signup"
          style={{ width: "100%", padding: "0 24px" }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(16px)",
              border: "1.5px solid rgba(192,57,43,0.15)",
              borderRadius: 28,
              padding: "32px 26px",
              textAlign: "center",
              boxShadow: "0 8px 32px rgba(26,10,8,0.06)",
            }}
          >
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#C0392B",
                marginBottom: 8,
                marginTop: 0,
              }}
            >
              💌 Stay Connected
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.85rem",
                fontWeight: 600,
                color: "#1A0A08",
                marginBottom: 8,
                lineHeight: 1.2,
                marginTop: 0,
              }}
            >
              Join the Newsletter
            </h2>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#7A3030",
                lineHeight: 1.6,
                marginBottom: 22,
                marginTop: 0,
              }}
            >
              Real updates, Pilates tips & behind-the-scenes of building my
              dream life.
            </p>
            <EmailSignupForm source="homepage" />
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            fontSize: "0.75rem",
            color: "#7A3030",
            textAlign: "center",
            opacity: 0.7,
            padding: "0 24px",
          }}
        >
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} Ashley Hartley · Made with 💕 in
            Atlanta
          </p>
        </footer>
      </div>
    </main>
  );
}

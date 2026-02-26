// ═══════════════════════════════════════════════════════════════
// PAGE: /vlog  →  app/vlog/page.tsx
// ═══════════════════════════════════════════════════════════════
//
// WHAT THIS IS:
//   Archive page showing all of Ashley's vlogs in a grid.
//   "See all →" on the homepage Latest Vlogs section links here.
//
// EACH CARD LINKS TO:
//   /vlog/[slug]  → the individual vlog landing page
//   (falls back to YouTube if no slug set in Sanity)
//
// ═══════════════════════════════════════════════════════════════

export const revalidate = 60;

import { client } from "@/lib/sanity";
import Link from "next/link";
import VlogThumbnail from "./VlogThumbnail";

// ─────────────────────────────────────────────────────────────
// FETCH ALL VLOGS
// ─────────────────────────────────────────────────────────────
async function getAllVlogs() {
  return client.fetch(
    `*[_type == "vlogPost"] | order(publishedAt desc) {
      _id, title, slug, youtubeUrl, thumbnail, category, publishedAt
    }`,
  );
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function getYouTubeId(url: string): string {
  const match = url.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : "";
}

const categoryLabels: Record<string, string> = {
  vlog: "🎬 Vlog",
  pilates: "🔥 Pilates",
  faith: "✨ Faith & Lifestyle",
  home: "🏡 Home & Decor",
};

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
        opacity: 0.07,
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
      <path
        d="M620 700 L650 730 L680 700 L710 730 L740 700 L770 730"
        stroke="#C0392B"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════
export default async function VlogArchivePage() {
  const vlogs = await getAllVlogs();

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
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatOrb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,-30px) scale(1.06)} 66%{transform:translate(-15px,15px) scale(0.94)} }
        .vlog-card:hover { transform: translateY(-4px) !important; box-shadow: 0 16px 40px rgba(192,57,43,0.2) !important; }
        .a0{animation:fadeUp .6s ease 0s both}
        .a1{animation:fadeUp .6s ease .1s both}
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
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "#C0392B",
            filter: "blur(90px)",
            opacity: 0.12,
            top: -140,
            right: -100,
            animation: "floatOrb 11s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "#F5C6C0",
            filter: "blur(90px)",
            opacity: 0.18,
            bottom: 80,
            left: -80,
            animation: "floatOrb 15s ease-in-out infinite reverse",
          }}
        />
      </div>
      <Scribbles />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 560,
          margin: "0 auto",
          padding: "44px 24px 60px",
        }}
      >
        {/* BACK LINK */}
        <div className="a0" style={{ marginBottom: 32 }}>
          <Link
            href="/"
            style={{
              fontSize: "0.85rem",
              color: "#7A3030",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 500,
            }}
          >
            ← Back to Home
          </Link>
        </div>

        {/* HEADER */}
        <header
          className="a1"
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: "#B07060",
              marginBottom: 12,
              marginTop: 0,
            }}
          >
            Ashley Hartley
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "3rem",
              fontWeight: 600,
              color: "#1A0A08",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: "0 0 16px",
            }}
          >
            All Vlogs
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "#7A3030",
              fontStyle: "italic",
              margin: 0,
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Real life in Atlanta 🍑
          </p>
          <div
            style={{
              width: 48,
              height: 1,
              background: "#D4A89A",
              margin: "20px auto 0",
            }}
          />
        </header>

        {/* VLOG GRID */}
        {vlogs.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#7A3030",
              fontStyle: "italic",
            }}
          >
            No vlogs yet — check back soon!
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}
          >
            {vlogs.map((vlog: any) => {
              const videoId = getYouTubeId(vlog.youtubeUrl);
              const thumb = vlog.thumbnail
                ? `https://cdn.sanity.io/images/9esis5v5/production/${vlog.thumbnail.asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-webp", ".webp")}`
                : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

              // Link to landing page if slug exists, otherwise YouTube
              const href = vlog.slug?.current
                ? `/vlog/${vlog.slug.current}`
                : vlog.youtubeUrl;
              const isExternal = !vlog.slug?.current;

              const formattedDate = vlog.publishedAt
                ? new Date(vlog.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : null;

              return (
                <a
                  key={vlog._id}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="vlog-card"
                  style={{
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
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      overflow: "hidden",
                      background: "#1A0A08",
                      position: "relative",
                    }}
                  >
                    <VlogThumbnail
                      src={thumb}
                      alt={vlog.title}
                      fallbackSrc={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    />
                    {/* Play button overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0,0,0,0.12)",
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
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
                          style={{ width: 13, height: 13, marginLeft: 2 }}
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: "10px 12px 12px" }}>
                    {vlog.category && (
                      <span
                        style={{
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase" as const,
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
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "#1A0A08",
                        lineHeight: 1.3,
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical" as const,
                        overflow: "hidden",
                      }}
                    >
                      {vlog.title}
                    </p>
                    {formattedDate && (
                      <p
                        style={{
                          fontSize: "0.68rem",
                          color: "#B07060",
                          margin: "4px 0 0",
                        }}
                      >
                        {formattedDate}
                      </p>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* YOUTUBE CTA */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a
            href="https://youtube.com/@iamashleyhartley?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 28px",
              background: "#FF0000",
              color: "white",
              borderRadius: 100,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.88rem",
              boxShadow: "0 4px 16px rgba(255,0,0,0.3)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="white"
              style={{ width: 18, height: 18 }}
            >
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Subscribe on YouTube
          </a>
        </div>

        {/* FOOTER */}
        <footer
          style={{
            fontSize: "0.75rem",
            color: "#7A3030",
            textAlign: "center",
            opacity: 0.7,
            marginTop: 40,
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

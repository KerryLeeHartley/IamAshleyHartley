export const revalidate = 60;

import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import EmailSignupForm from "@/components/EmailSignupForm";

// ─────────────────────────────────────────────────────────────
// FETCH
// ─────────────────────────────────────────────────────────────
async function getBlogPost(slug: string) {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      coverImage,
      category,
      excerpt,
      body,
      publishedAt,
      slug
    }`,
    { slug },
  );
}

// ─────────────────────────────────────────────────────────────
// CATEGORY LABELS
// ─────────────────────────────────────────────────────────────
const categoryLabels: Record<string, string> = {
  faith: "Faith",
  wellness: "Pilates & Wellness",
  dreamlife: "Dream Life",
  founder: "Founder Journey",
  lifestyle: "Lifestyle",
};

// ─────────────────────────────────────────────────────────────
// PORTABLE TEXT COMPONENTS
// ─────────────────────────────────────────────────────────────
const ptComponents = {
  block: {
    normal: ({ children }: any) => (
      <p
        style={{
          fontSize: "1rem",
          lineHeight: 1.85,
          color: "#3D1A1A",
          marginBottom: "1.4em",
          marginTop: 0,
        }}
      >
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.8rem",
          fontWeight: 600,
          color: "#1A0A08",
          marginTop: "2em",
          marginBottom: "0.5em",
          lineHeight: 1.2,
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.4rem",
          fontWeight: 600,
          color: "#1A0A08",
          marginTop: "1.6em",
          marginBottom: "0.4em",
          lineHeight: 1.2,
        }}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote
        style={{
          borderLeft: "3px solid #C0392B",
          paddingLeft: "1.2em",
          margin: "1.6em 0",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.25rem",
          fontStyle: "italic",
          color: "#7A3030",
          lineHeight: 1.6,
        }}
      >
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong style={{ fontWeight: 700, color: "#1A0A08" }}>{children}</strong>
    ),
    em: ({ children }: any) => (
      <em style={{ fontStyle: "italic", color: "#7A3030" }}>{children}</em>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#C0392B",
          textDecoration: "underline",
          textUnderlineOffset: 3,
        }}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => {
      const imgUrl = value ? urlFor(value).width(600).url() : null;
      return imgUrl ? (
        <div
          style={{
            margin: "2em 0",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(26,10,8,0.1)",
          }}
        >
          <img
            src={imgUrl}
            alt={value?.alt || ""}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      ) : null;
    },
  },
};

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
        d="M620 700 L650 730 L680 700 L710 730 L740 700 L770 730"
        stroke="#C0392B"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
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
// PAGE
// ─────────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) notFound();

  const coverImgUrl = post.coverImage
    ? urlFor(post.coverImage).width(600).height(600).url()
    : null;

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

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
        .back-link:hover { color: #C0392B !important; }
        .sub-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 10px 28px rgba(192,57,43,0.45) !important; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatOrb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,-30px) scale(1.06)} 66%{transform:translate(-15px,15px) scale(0.94)} }
        .a0{animation:fadeUp .6s ease 0s both}
        .a1{animation:fadeUp .6s ease .1s both}
        .a2{animation:fadeUp .6s ease .2s both}
        .a3{animation:fadeUp .6s ease .3s both}
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
            opacity: 0.14,
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
            opacity: 0.2,
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
            className="back-link"
            style={{
              fontSize: "0.85rem",
              color: "#7A3030",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 500,
              transition: "color 0.2s ease",
            }}
          >
            ← Back to Home
          </Link>
        </div>

        {/* COVER IMAGE */}
        {coverImgUrl && (
          <div
            className="a1"
            style={{
              width: "100%",
              aspectRatio: "1/1",
              borderRadius: 24,
              overflow: "hidden",
              marginBottom: 32,
              boxShadow: "0 16px 48px rgba(192,57,43,0.15)",
            }}
          >
            <img
              src={coverImgUrl}
              alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        {/* META */}
        <div className="a2" style={{ marginBottom: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
              flexWrap: "wrap",
            }}
          >
            {post.category && (
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: "rgba(192,57,43,0.1)",
                  color: "#C0392B",
                  padding: "4px 12px",
                  borderRadius: 100,
                }}
              >
                {categoryLabels[post.category] || post.category}
              </span>
            )}
            {formattedDate && (
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "#7A3030",
                  fontWeight: 400,
                }}
              >
                {formattedDate}
              </span>
            )}
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "2.6rem",
              fontWeight: 600,
              color: "#1A0A08",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: 0,
              marginBottom: 16,
            }}
          >
            {post.title}
          </h1>
          {post.excerpt && (
            <p
              style={{
                fontSize: "1.05rem",
                color: "#7A3030",
                lineHeight: 1.65,
                margin: 0,
                fontStyle: "italic",
              }}
            >
              {post.excerpt}
            </p>
          )}
        </div>

        {/* DIVIDER */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "linear-gradient(to right, #C0392B30, transparent)",
            marginBottom: 32,
          }}
        />

        {/* BODY */}
        <div className="a3">
          {post.body ? (
            <PortableText value={post.body} components={ptComponents} />
          ) : (
            <p style={{ color: "#7A3030", fontStyle: "italic" }}>
              No content yet.
            </p>
          )}
        </div>

        {/* BOTTOM CTA */}
        <div
          style={{
            marginTop: 48,
            padding: "28px 24px",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(16px)",
            border: "1.5px solid rgba(192,57,43,0.12)",
            borderRadius: 24,
            textAlign: "center",
            boxShadow: "0 8px 32px rgba(26,10,8,0.05)",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#1A0A08",
              marginBottom: 6,
              marginTop: 0,
            }}
          >
            Stay in the loop 🦋
          </p>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#7A3030",
              marginBottom: 18,
              lineHeight: 1.5,
              marginTop: 0,
            }}
          >
            Real updates, Pilates tips & behind the scenes of building my dream
            life.
          </p>
          <EmailSignupForm />
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

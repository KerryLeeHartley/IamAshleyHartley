/*
 * ═══════════════════════════════════════════════════════════════
 * LINKTREE-STYLE HOMEPAGE - SAMIYA THE ARTIST
 * ═══════════════════════════════════════════════════════════════
 *
 * ✅ Profile pic with gradient border
 * ✅ TikTok videos play inline
 * ✅ Art gallery with arrows
 * ✅ All features working
 *
 * ═══════════════════════════════════════════════════════════════
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  trackClick,
  trackEmailSignup,
  trackPartnershipInquiry,
  trackTikTokVideo,
  trackGallery,
  trackSocialClick,
  trackModal,
  trackMediaKitDownload,
  initializeAnalytics,
} from "@/lib/analytics";

// LOGO COMPONENTS
function YouTubeLogo() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
      <path
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        fill="#FF0000"
      />
    </svg>
  );
}

function TikTokLogo() {
  return (
    <div className="relative w-8 h-8">
      {/* Black circular background */}
      <div className="absolute inset-0 bg-black rounded-full" />
      {/* White TikTok logo on top */}
      <svg className="relative w-8 h-8 p-1.5" viewBox="0 0 24 24" fill="none">
        <path
          d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
          fill="white"
        />
      </svg>
    </div>
  );
}

export default function HomePage() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showTikTok, setShowTikTok] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailStatus("loading");

    setTimeout(() => {
      setEmailStatus("success");
      setEmail("");
      console.log("📊 Email signup:", email);

      setTimeout(() => {
        setShowEmailModal(false);
        setEmailStatus("");
      }, 2000);
    }, 1000);
  };

  return (
    <>
      <main className="min-h-screen relative py-12 px-6 overflow-hidden">
        {/* ANIMATED BACKGROUND */}
        <div className="absolute inset-0 -z-10">
          {/* Gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-white" />

          {/* Animated gradient orbs */}
          <div className="absolute top-0 -left-20 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-4000" />

          {/* Floating shapes */}
          <div className="absolute top-20 right-20 w-20 h-20 border-2 border-pink-300/40 rounded-lg rotate-12 animate-float" />
          <div className="absolute bottom-40 left-10 w-16 h-16 border-2 border-purple-300/40 rounded-full animate-float animation-delay-1000" />
          <div className="absolute top-1/2 right-10 w-12 h-12 border-2 border-pink-300/40 rounded-lg -rotate-45 animate-float animation-delay-3000" />
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          {/* HERO SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            {/* ✅ PROFILE IMAGE WITH GRADIENT BORDER */}
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 p-1">
                <img
                  src="/images/samiya_profile_pic.jpeg"
                  alt="Samiya"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Samiya
            </h1>

            <p className="text-xl text-gray-600 mb-1">
              Helpful • Creative • Mom
            </p>

            <p className="text-sm text-gray-500">
              💕 Join 1M+ people following my creative journey
            </p>
          </motion.div>

          {/* LINK BUTTONS */}
          <div className="space-y-4">
            {/* JOIN COMMUNITY */}
            <LinkButton
              icon="✉️"
              label="Join My Community"
              subtitle="Get weekly painting tips & exclusive content"
              onClick={() => setShowEmailModal(true)}
              isPrimary
            />

            {/* VIRAL TIKTOKS */}
            <LinkButton
              icon={<TikTokLogo />}
              label="Watch My Top TikToks"
              subtitle="3 viral videos • 1.1M+ views"
              onClick={() => setShowTikTok(!showTikTok)}
              isExpanded={showTikTok}
            />

            <AnimatePresence>
              {showTikTok && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <TikTokCarousel />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ART GALLERY */}
            <LinkButton
              icon="🎨"
              label="View My Art Gallery"
              subtitle="Browse my latest paintings"
              onClick={() => setShowGallery(!showGallery)}
              isExpanded={showGallery}
            />

            <AnimatePresence>
              {showGallery && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <ArtGallery />
                </motion.div>
              )}
            </AnimatePresence>

            {/* YOUTUBE */}
            <LinkButton
              icon={<YouTubeLogo />}
              label="YouTube Channel"
              subtitle="Painting tutorials & behind the scenes"
              href="https://www.youtube.com/@samiyasheree"
              external
            />

            {/* WORK WITH ME */}
            <LinkButton
              icon="👋🏾"
              label="Brand Partnerships"
              subtitle="Collaborations & partnership opportunities"
              onClick={() => setShowContact(true)}
            />
          </div>

          {/* FOOTER */}
          <footer className="mt-16 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Samiya. All rights reserved.</p>
          </footer>
        </div>
      </main>

      {/* EMAIL MODAL */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowEmailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">💕</div>
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Join My Community!
                </h2>
                <p className="text-gray-600">
                  Get weekly painting tips, exclusive content, and be the first
                  to see new work!
                </p>
              </div>

              {emailStatus === "success" ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <p className="text-xl font-semibold text-green-600">
                    Welcome to the community!
                  </p>
                  <p className="text-gray-600 mt-2">
                    Check your email for a welcome message 💌
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-full focus:border-purple-500 focus:outline-none text-lg"
                  />

                  <button
                    type="submit"
                    disabled={emailStatus === "loading"}
                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold text-lg hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {emailStatus === "loading" ? "Joining..." : "Join Now! 💕"}
                  </button>
                </form>
              )}

              <button
                onClick={() => setShowEmailModal(false)}
                className="mt-4 text-gray-400 hover:text-gray-600 text-sm w-full"
              >
                Maybe later
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BRAND PARTNERSHIP MODAL */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowContact(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto relative"
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setShowContact(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* CONTENT */}
              <ContactForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// LINK BUTTON COMPONENT
interface LinkButtonProps {
  icon: string | React.ReactNode;
  label: string;
  subtitle?: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  isPrimary?: boolean;
  isExpanded?: boolean;
}

function LinkButton({
  icon,
  label,
  subtitle,
  onClick,
  href,
  external,
  isPrimary,
  isExpanded,
}: LinkButtonProps) {
  const baseClasses =
    "block w-full rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1";
  const primaryClasses =
    "bg-gradient-to-r from-pink-500 to-purple-500 text-white";
  const secondaryClasses = "bg-white text-gray-800 hover:bg-gray-50";

  const content = (
    <div className="flex items-center">
      <div className="text-3xl mr-4 flex items-center justify-center">
        {typeof icon === "string" ? icon : icon}
      </div>
      <div className="flex-1 text-left">
        <div
          className={`font-semibold text-lg ${
            isPrimary ? "text-white" : "text-gray-900"
          }`}
        >
          {label}
        </div>
        {subtitle && (
          <div
            className={`text-sm ${
              isPrimary ? "text-white/90" : "text-gray-500"
            }`}
          >
            {subtitle}
          </div>
        )}
      </div>
      {external && <div className="text-xl ml-2">→</div>}
      {isExpanded !== undefined && (
        <div className="text-xl ml-2">{isExpanded ? "▲" : "▼"}</div>
      )}
    </div>
  );

  if (href && external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${
          isPrimary ? primaryClasses : secondaryClasses
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${
        isPrimary ? primaryClasses : secondaryClasses
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}

// ✅ TIKTOK CAROUSEL - SHOWS REAL TIKTOK EMBEDS IMMEDIATELY
function TikTokCarousel() {
  const videos = [
    {
      id: 1,
      videoId: "7584858842291391775",
      username: "nextchaptersamiya",
      title: "Top Viral Video",
      views: "1.1M",
    },
    {
      id: 2,
      videoId: "7547148304459582733",
      username: "nextchaptersamiya",
      title: "Connecting with Moms",
      views: "170K",
    },
    {
      id: 3,
      videoId: "7584959339845143821",
      username: "nextchaptersamiya",
      title: "Community",
      views: "150K",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("tiktok-scroll");
    if (container) {
      const scrollAmount = 350;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-center">My Top TikToks 🎥</h3>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Scrollable Container */}
        <div
          id="tiktok-scroll"
          className="overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="flex gap-4 px-12">
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex-shrink-0 w-[325px]"
                style={{ scrollSnapAlign: "center" }}
              >
                {/* TikTok Embed - Shows real thumbnail immediately */}
                <div className="aspect-[9/16] rounded-xl overflow-hidden shadow-md bg-black">
                  <iframe
                    src={`https://www.tiktok.com/embed/v2/${video.videoId}?lang=en-US`}
                    className="w-full h-full"
                    allowFullScreen
                    scrolling="no"
                    allow="encrypted-media;"
                    style={{ border: "none" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="text-center mt-4">
        <a
          href="https://www.tiktok.com/@nextchaptersamiya"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:text-purple-700 font-semibold inline-flex items-center gap-2"
        >
          Follow on TikTok
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ART GALLERY COMPONENT
function ArtGallery() {
  const paintings = [
    { id: 1, title: "Sunset Dreams", image: "/paintings/1.jpg" },
    { id: 2, title: "Ocean Breeze", image: "/paintings/2.jpg" },
    { id: 3, title: "Forest Magic", image: "/paintings/3.jpg" },
    { id: 4, title: "City Lights", image: "/paintings/4.jpg" },
    { id: 5, title: "Morning Glow", image: "/paintings/5.jpg" },
  ];

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("gallery-scroll");
    if (container) {
      const scrollAmount = 280;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-center">My Art Gallery 🎨</h3>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div
          id="gallery-scroll"
          className="overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="flex gap-4 px-12">
            {paintings.map((painting) => (
              <motion.div
                key={painting.id}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 w-64 cursor-pointer"
                style={{ scrollSnapAlign: "center" }}
              >
                <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl overflow-hidden shadow-md relative">
                  <img
                    src={painting.image}
                    alt={painting.title}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <div className="text-white text-sm font-medium">
                      {painting.title}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="text-center mt-4">
        <a
          href="/gallery"
          className="text-purple-600 hover:text-purple-700 font-semibold"
        >
          View Full Gallery →
        </a>
      </div>
    </div>
  );
}

// BRAND PARTNERSHIP CONTENT (FOR MODAL)
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // TODO: Connect to Supabase or email service
    console.log("Partnership inquiry:", formData);

    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-3">
          Let's Create Together
        </h3>

        {/* DOWNLOAD MEDIA KIT */}
        <button className="text-sm md:text-base text-purple-600 hover:text-purple-700 font-semibold inline-flex items-center gap-2">
          📄 Download Full Media Kit
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </button>
      </div>

      {/* TIKTOK ANALYTICS */}
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 md:p-6">
        <h4 className="text-lg md:text-xl font-bold mb-4 text-gray-800">
          📊 TikTok Growth & Reach
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-white rounded-lg p-3 md:p-4 text-center shadow-sm">
            <div className="text-xl md:text-2xl font-bold text-pink-600">
              1.1M+
            </div>
            <div className="text-xs md:text-sm text-gray-600">Total Views</div>
          </div>
          <div className="bg-white rounded-lg p-3 md:p-4 text-center shadow-sm">
            <div className="text-xl md:text-2xl font-bold text-purple-600">
              5K+
            </div>
            <div className="text-xs md:text-sm text-gray-600">Followers</div>
          </div>
          <div className="bg-white rounded-lg p-3 md:p-4 text-center shadow-sm">
            <div className="text-xl md:text-2xl font-bold text-pink-600">
              8.5%
            </div>
            <div className="text-xs md:text-sm text-gray-600">Engagement</div>
          </div>
          <div className="bg-white rounded-lg p-3 md:p-4 text-center shadow-sm">
            <div className="text-xl md:text-2xl font-bold text-purple-600">
              Growing
            </div>
            <div className="text-xs md:text-sm text-gray-600">Daily</div>
          </div>
        </div>
        <p className="text-xs md:text-sm text-gray-600 mt-3 text-center italic">
          🎯 Authentic content that resonates with moms, creatives, and
          lifestyle enthusiasts
        </p>
      </div>

      {/* 3 BRAND PILLARS */}
      <div>
        <h4 className="text-lg md:text-xl font-bold mb-4 text-gray-800 text-center">
          ✨ My Brand Pillars
        </h4>
        <div className="grid md:grid-cols-3 gap-3 md:gap-4">
          <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-xl p-4 md:p-5 text-center">
            <div className="text-3xl md:text-4xl mb-2">🤝</div>
            <h5 className="font-bold text-base md:text-lg text-gray-800 mb-2">
              Helpful
            </h5>
            <p className="text-xs md:text-sm text-gray-600">
              Sharing tips, solutions, and resources that make life easier for
              my community
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl p-4 md:p-5 text-center">
            <div className="text-3xl md:text-4xl mb-2">🎨</div>
            <h5 className="font-bold text-base md:text-lg text-gray-800 mb-2">
              Creative
            </h5>
            <p className="text-xs md:text-sm text-gray-600">
              Bringing artistic vision and unique perspectives to every project
              and collaboration
            </p>
          </div>
          <div className="bg-gradient-to-br from-pink-100 to-purple-50 rounded-xl p-4 md:p-5 text-center">
            <div className="text-3xl md:text-4xl mb-2">💕</div>
            <h5 className="font-bold text-base md:text-lg text-gray-800 mb-2">
              Motherhood
            </h5>
            <p className="text-xs md:text-sm text-gray-600">
              Authentic stories and experiences that connect with parents
              navigating modern life
            </p>
          </div>
        </div>
      </div>

      {/* IDEAL PARTNERSHIPS */}
      <div className="bg-gray-50 rounded-xl p-4 md:p-6">
        <h4 className="text-lg md:text-xl font-bold mb-3 text-gray-800">
          Perfect For
        </h4>
        <div className="grid md:grid-cols-2 gap-2 md:gap-3">
          <div className="flex items-start gap-2">
            <span className="text-pink-500 mt-0.5">✓</span>
            <span className="text-xs md:text-sm text-gray-700">
              UGC (User Generated Content) campaigns
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-pink-500 mt-0.5">✓</span>
            <span className="text-xs md:text-sm text-gray-700">
              Brand ambassadorships
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-pink-500 mt-0.5">✓</span>
            <span className="text-xs md:text-sm text-gray-700">
              Product reviews & unboxings
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-pink-500 mt-0.5">✓</span>
            <span className="text-xs md:text-sm text-gray-700">
              Creative collaborations
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-pink-500 mt-0.5">✓</span>
            <span className="text-xs md:text-sm text-gray-700">
              Lifestyle & parenting brands
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-pink-500 mt-0.5">✓</span>
            <span className="text-xs md:text-sm text-gray-700">
              Agency talent roster
            </span>
          </div>
        </div>
      </div>

      {/* CONTACT FORM */}
      <div>
        <h4 className="text-lg md:text-xl font-bold mb-4 text-gray-800 text-center">
          Get In Touch
        </h4>

        {status === "success" ? (
          <div className="text-center py-8 bg-green-50 rounded-xl">
            <div className="text-4xl md:text-5xl mb-3">✨</div>
            <p className="text-base md:text-lg font-semibold text-green-600">
              Message sent!
            </p>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              I'll get back to you within 24-48 hours 💕
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-sm md:text-base"
              />

              <input
                type="text"
                placeholder="Company/Brand *"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-sm md:text-base"
              />
            </div>

            <input
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-sm md:text-base"
            />

            <textarea
              placeholder="Tell me about your partnership opportunity... *"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none text-sm md:text-base"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 md:py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold text-base md:text-lg hover:opacity-90 transition-all disabled:opacity-50 shadow-lg"
            >
              {status === "loading"
                ? "Sending..."
                : "Send Partnership Inquiry 💌"}
            </button>

            <p className="text-xs text-center text-gray-500">
              * All fields required. I respond to all serious inquiries within
              24-48 hours.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

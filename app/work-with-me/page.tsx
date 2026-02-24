// ═══════════════════════════════════════════════════════════════
// PAGE: /work-with-me  →  app/work-with-me/page.tsx
// ═══════════════════════════════════════════════════════════════
//
// WHAT THIS IS:
//   Ashley's partnership inquiry page — simple and clean.
//   Just a "Get In Touch" header and the contact form.
//   Brand pillars + copy will be added in a future session
//   once Ashley's messaging is finalized.
//
// FORM SUBMITS TO:
//   POST /api/partnership → saves to Supabase 'partnerships' table
//
// SUPABASE TABLE NEEDED (run once in Supabase SQL Editor):
//   CREATE TABLE IF NOT EXISTS partnerships (
//     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//     created_at TIMESTAMP DEFAULT NOW(),
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL,
//     company VARCHAR(255),
//     partnership_type VARCHAR(100),
//     message TEXT,
//     status VARCHAR(50) DEFAULT 'new'
//   );
//
// ═══════════════════════════════════════════════════════════════

"use client";

import { useState } from "react";
import Link from "next/link";

const INQUIRY_TYPES = [
  "UGC Campaign",
  "Brand Ambassadorship",
  "Product Review / Unboxing",
  "Creative Collaboration",
  "Agency Inquiry",
  "Other",
];

export default function WorkWithMePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    partnershipType: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/partnership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus("success");
        setForm({
          name: "",
          email: "",
          company: "",
          partnershipType: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FDF6F0" }}>
      {/* ── BACK NAV ── */}
      <div className="px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm"
          style={{ color: "#8B4A3C" }}
        >
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

      {/* ── HEADER ── */}
      <header className="text-center px-6 pt-10 pb-10">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          style={{ color: "#B07060" }}
        >
          Ashley Hartley
        </p>
        <h1
          className="text-5xl md:text-6xl font-bold mb-4"
          style={{
            color: "#2C1810",
            fontFamily: 'Georgia, "Times New Roman", serif',
            letterSpacing: "-0.02em",
          }}
        >
          Get In Touch
        </h1>
        <p
          className="text-lg max-w-sm mx-auto"
          style={{
            color: "#8B4A3C",
            fontStyle: "italic",
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          Send Partnership Inquiry 💌
        </p>
        <div
          className="w-16 h-px mx-auto mt-8"
          style={{ backgroundColor: "#D4A89A" }}
        />
      </header>

      {/* ── FORM ── */}
      <section className="max-w-xl mx-auto px-6 pb-20">
        {status === "success" ? (
          <div
            className="rounded-2xl p-10 text-center"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #EDD5C5" }}
          >
            <p className="text-4xl mb-4">💌</p>
            <h3
              className="text-xl font-bold mb-2"
              style={{
                color: "#2C1810",
                fontFamily: 'Georgia, "Times New Roman", serif',
              }}
            >
              Message received!
            </h3>
            <p className="text-sm" style={{ color: "#7A5A52" }}>
              Thank you for reaching out. Ashley personally reviews all
              inquiries and responds to serious opportunities within 24–48
              hours. 🦋
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-8"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #EDD5C5" }}
          >
            {/* Name */}
            <div className="mb-5">
              <label
                className="block text-xs font-semibold tracking-wider uppercase mb-2"
                style={{ color: "#8B4A3C" }}
              >
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Jane Smith"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  backgroundColor: "#FDF6F0",
                  border: "1px solid #EDD5C5",
                  color: "#2C1810",
                }}
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label
                className="block text-xs font-semibold tracking-wider uppercase mb-2"
                style={{ color: "#8B4A3C" }}
              >
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="jane@brand.com"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  backgroundColor: "#FDF6F0",
                  border: "1px solid #EDD5C5",
                  color: "#2C1810",
                }}
              />
            </div>

            {/* Company */}
            <div className="mb-5">
              <label
                className="block text-xs font-semibold tracking-wider uppercase mb-2"
                style={{ color: "#8B4A3C" }}
              >
                Brand / Company
              </label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Your brand name"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  backgroundColor: "#FDF6F0",
                  border: "1px solid #EDD5C5",
                  color: "#2C1810",
                }}
              />
            </div>

            {/* Partnership Type */}
            <div className="mb-5">
              <label
                className="block text-xs font-semibold tracking-wider uppercase mb-2"
                style={{ color: "#8B4A3C" }}
              >
                Type of Partnership *
              </label>
              <select
                name="partnershipType"
                value={form.partnershipType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none"
                style={{
                  backgroundColor: "#FDF6F0",
                  border: "1px solid #EDD5C5",
                  color: form.partnershipType ? "#2C1810" : "#B07060",
                }}
              >
                <option value="" disabled>
                  Select partnership type...
                </option>
                {INQUIRY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="mb-7">
              <label
                className="block text-xs font-semibold tracking-wider uppercase mb-2"
                style={{ color: "#8B4A3C" }}
              >
                Tell Me About Your Campaign *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Share details about your brand, campaign goals, timeline, and what you're envisioning..."
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{
                  backgroundColor: "#FDF6F0",
                  border: "1px solid #EDD5C5",
                  color: "#2C1810",
                }}
              />
            </div>

            {status === "error" && (
              <p
                className="text-sm text-center mb-4"
                style={{ color: "#8B2E1E" }}
              >
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 rounded-full text-white font-semibold text-sm tracking-wide"
              style={{
                backgroundColor: status === "loading" ? "#C4876B" : "#8B2E1E",
                cursor: status === "loading" ? "not-allowed" : "pointer",
              }}
            >
              {status === "loading"
                ? "Sending..."
                : "Send Partnership Inquiry 💌"}
            </button>

            <p
              className="text-center text-xs mt-4"
              style={{ color: "#B07060" }}
            >
              * All fields required. I respond to all serious inquiries within
              24–48 hours.
            </p>
          </form>
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="text-center pb-10 text-sm"
        style={{ color: "#B07060" }}
      >
        © {new Date().getFullYear()} Ashley Hartley · Made with 💕 in Atlanta
      </footer>
    </main>
  );
}

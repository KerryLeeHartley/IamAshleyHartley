"use client";

import { useState } from "react";

export default function EmailSignupForm({
  source = "website",
}: {
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're in! 🦋 Check your email to confirm.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again!");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again!");
    }
  }

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <p
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#1A0A08",
            margin: 0,
          }}
        >
          🦋 You're in!
        </p>
        <p
          style={{
            fontSize: "0.85rem",
            color: "#7A3030",
            marginTop: 6,
            marginBottom: 0,
          }}
        >
          Check your email to confirm your subscription.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 10 }}
    >
      <input
        type="email"
        placeholder="your@email.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading"}
        style={{
          width: "100%",
          padding: "13px 20px",
          border: "2px solid rgba(192,57,43,0.22)",
          borderRadius: 100,
          fontSize: "0.9rem",
          fontFamily: "'DM Sans', sans-serif",
          background: "rgba(255,255,255,0.9)",
          color: "#1A0A08",
          outline: "none",
          textAlign: "center",
          opacity: status === "loading" ? 0.7 : 1,
        }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          width: "100%",
          padding: "13px 20px",
          background: "linear-gradient(135deg, #C0392B, #8B1A1A)",
          color: "white",
          fontSize: "0.9rem",
          fontWeight: 700,
          fontFamily: "'DM Sans', sans-serif",
          border: "none",
          borderRadius: 100,
          cursor: status === "loading" ? "not-allowed" : "pointer",
          transition: "all 0.25s ease",
          boxShadow: "0 6px 20px rgba(192,57,43,0.32)",
          opacity: status === "loading" ? 0.8 : 1,
        }}
      >
        {status === "loading" ? "Subscribing..." : "Subscribe ✨"}
      </button>
      {status === "error" && (
        <p
          style={{
            fontSize: "0.8rem",
            color: "#C0392B",
            textAlign: "center",
            margin: 0,
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}

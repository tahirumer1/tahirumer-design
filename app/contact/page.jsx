"use client";

import { useState, useEffect } from "react";
import { R } from "@/components/Reveals";
import LiveClock from "@/components/LiveClock";

const SOCIALS = [
  { name: "Dribbble", url: "https://dribbble.com/iamtahirumer" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/iamtahirumer/" },
  { name: "Behance", url: "https://www.behance.net/tahirumer2" },
  { name: "Facebook", url: "https://www.facebook.com/tahirumer.ui.ux" },
];

// ── Formspree setup ─────────────────────────────────────────────────────────
// 1. Create a free form at https://formspree.io (set the destination email to
//    iamtahirumer@gmail.com).
// 2. Copy the form ID from its endpoint — e.g. https://formspree.io/f/XXXXXXXX
// 3. Paste just the ID (the XXXXXXXX part) between the quotes below.
// Until it's set, the form falls back to a simulated submit (nothing is sent).
const FORMSPREE_ID = "";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", type: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // Pre-select the project type when arriving from a service CTA (e.g. /contact?type=product)
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    if (t && ["product", "brand", "web", "other"].includes(t)) {
      setForm((f) => ({ ...f, type: t }));
    }
  }, []);

  const submit = async () => {
    setError("");
    setSubmitting(true);
    try {
      if (FORMSPREE_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            projectType: form.type || "Not specified",
            budget: form.budget || "Not specified",
            message: form.message,
            _subject: `New project inquiry — ${form.name}`,
          }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.errors?.[0]?.message || "Submission failed");
        }
      } else {
        // Formspree not configured yet — simulate so the UI still works.
        await new Promise((r) => setTimeout(r, 600));
      }
      setSent(true);
    } catch {
      setError("Couldn't send right now — please email iamtahirumer@gmail.com directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-pad">
      <R><span className="mono" style={{ color: "var(--accent)", fontSize: 12 }}>005 / Contact</span></R>
      <R d={0.1}><h1 className="page-title">Let's build<br />something great.</h1></R>
      <R d={0.15}>
        <p className="page-sub">Tell me about your project. I'll get back within 48 hours.</p>
      </R>

      <div className="contact-grid">
        <R d={0.2}>
          {sent ? (
            <div style={{ paddingTop: 60, textAlign: "center" }}>
              <span style={{ fontSize: 40, color: "var(--accent)" }}>✓</span>
              <h3 style={{ fontFamily: "var(--display)", fontSize: 30, color: "var(--text-1)", marginTop: 16, fontWeight: 600, letterSpacing: "-0.02em" }}>
                Sent.
              </h3>
              <p className="body-text" style={{ marginTop: 12 }}>Thanks — I'll be in touch within 48 hours.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); submit(); }}>
              <div className="form-field">
                <label htmlFor="cf-name" className="mono form-field__label">Name</label>
                <input
                  id="cf-name"
                  className="form-field__input"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => up("name", e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="cf-email" className="mono form-field__label">Email</label>
                <input
                  id="cf-email"
                  className="form-field__input"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => up("email", e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="cf-type" className="mono form-field__label">Project Type</label>
                <select id="cf-type" className="form-field__input" value={form.type} onChange={(e) => up("type", e.target.value)}>
                  <option value="">Select</option>
                  <option value="product">Product / UX Design</option>
                  <option value="brand">Brand Identity</option>
                  <option value="web">Website Design & Dev</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="cf-budget" className="mono form-field__label">Budget</label>
                <select id="cf-budget" className="form-field__input" value={form.budget} onChange={(e) => up("budget", e.target.value)}>
                  <option value="">Select range</option>
                  <option value="a">$3K – $5K</option>
                  <option value="b">$5K – $10K</option>
                  <option value="c">$10K – $20K</option>
                  <option value="d">$20K+</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="cf-message" className="mono form-field__label">Message</label>
                <textarea
                  id="cf-message"
                  className="form-field__input form-field__textarea"
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) => up("message", e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="mono" style={{ color: "#FF7A7A", fontSize: 12, lineHeight: 1.6 }}>{error}</p>
              )}
              <button data-cursor="" type="submit" className="form-submit" disabled={submitting}>
                {submitting ? "Sending..." : "Send Message"}
                <span style={{ marginLeft: 10 }}>→</span>
              </button>
            </form>
          )}
        </R>
        <R d={0.3}>
          <div className="contact-info">
            <div>
              <span className="mono" style={{ color: "var(--text-3)", fontSize: 11 }}>Email</span>
              <div style={{ marginTop: 6 }}>
                <a href="mailto:iamtahirumer@gmail.com" style={{ color: "var(--accent)", fontSize: 15 }}>iamtahirumer@gmail.com</a>
              </div>
            </div>
            <div>
              <span className="mono" style={{ color: "var(--text-3)", fontSize: 11 }}>Based in</span>
              <div style={{ color: "var(--text-2)", fontSize: 15, marginTop: 6 }}>Lahore, Pakistan</div>
              <div className="mono" style={{ color: "var(--text-3)", fontSize: 12, marginTop: 2 }}>
                <LiveClock /> GMT+5
              </div>
            </div>
            <div>
              <span className="mono" style={{ color: "var(--text-3)", fontSize: 11 }}>Connect</span>
              <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
                {SOCIALS.map((s) => (
                  <a key={s.name} data-cursor="" className="social-link" href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
                ))}
              </div>
            </div>
            <div className="contact-call-card">
              <p style={{ fontSize: 14, color: "var(--text-3)", lineHeight: 1.6 }}>
                Prefer a conversation? Book a 30-minute intro call.
              </p>
              <a data-cursor="" className="contact-call-btn mono" href="mailto:iamtahirumer@gmail.com?subject=Intro%20call">Schedule a Call →</a>
            </div>
          </div>
        </R>
      </div>
    </main>
  );
}

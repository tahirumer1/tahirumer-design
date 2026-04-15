"use client";

import { useState } from "react";
import { R } from "@/components/Reveals";
import LiveClock from "@/components/LiveClock";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", type: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const up = (k, v) => setForm({ ...form, [k]: v });

  const submit = async () => {
    setSubmitting(true);
    // TODO: Wire up to actual email endpoint (Resend, Formspree, or API route)
    // For now, simulate submission
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSent(true);
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
              <p className="body-text" style={{ marginTop: 12 }}>I'll be in touch within 48 hours.</p>
            </div>
          ) : (
            <div className="contact-form">
              <div className="form-field">
                <label className="mono form-field__label">Name</label>
                <input
                  className="form-field__input"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => up("name", e.target.value)}
                />
              </div>
              <div className="form-field">
                <label className="mono form-field__label">Email</label>
                <input
                  className="form-field__input"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => up("email", e.target.value)}
                />
              </div>
              <div className="form-field">
                <label className="mono form-field__label">Project Type</label>
                <select className="form-field__input" value={form.type} onChange={(e) => up("type", e.target.value)}>
                  <option value="">Select</option>
                  <option value="product">Product / UX Design</option>
                  <option value="brand">Brand Identity</option>
                  <option value="web">Website Design & Dev</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-field">
                <label className="mono form-field__label">Budget</label>
                <select className="form-field__input" value={form.budget} onChange={(e) => up("budget", e.target.value)}>
                  <option value="">Select range</option>
                  <option value="a">$3K – $5K</option>
                  <option value="b">$5K – $10K</option>
                  <option value="c">$10K – $20K</option>
                  <option value="d">$20K+</option>
                </select>
              </div>
              <div className="form-field">
                <label className="mono form-field__label">Message</label>
                <textarea
                  className="form-field__input form-field__textarea"
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) => up("message", e.target.value)}
                />
              </div>
              <button data-cursor="" className="form-submit" onClick={submit} disabled={submitting}>
                {submitting ? "Sending..." : "Send Message"}
                <span style={{ marginLeft: 10 }}>→</span>
              </button>
            </div>
          )}
        </R>
        <R d={0.3}>
          <div className="contact-info">
            <div>
              <span className="mono" style={{ color: "var(--text-3)", fontSize: 11 }}>Email</span>
              <div style={{ color: "var(--accent)", fontSize: 15, marginTop: 6 }}>hello@tahirumer.design</div>
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
              <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                {["Dribbble", "LinkedIn", "Behance"].map((s) => (
                  <span key={s} data-cursor="" className="social-link">{s}</span>
                ))}
              </div>
            </div>
            <div className="contact-call-card">
              <p style={{ fontSize: 14, color: "var(--text-3)", lineHeight: 1.6 }}>
                Prefer a conversation? Book a 30-minute intro call.
              </p>
              <button data-cursor="" className="contact-call-btn mono">Schedule a Call →</button>
            </div>
          </div>
        </R>
      </div>
    </main>
  );
}

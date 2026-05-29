"use client";

import { useState, useEffect } from "react";
import { R } from "./Reveals";
import LiveClock from "./LiveClock";

// ── Formspree ───────────────────────────────────────────────────────────────
// Paste your Formspree form ID between the quotes (from https://formspree.io/f/XXXXXXXX).
// Until it's set, the form simulates a successful submit (nothing is delivered).
const FORMSPREE_ID = "";

export default function ContactForm({ contact, settings }) {
  const [form, setForm] = useState({ name: "", email: "", type: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const socials = settings?.socialLinks || [];
  const email = settings?.email || "iamtahirumer@gmail.com";

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
          const d = await res.json().catch(() => ({}));
          throw new Error(d?.errors?.[0]?.message || "Submission failed");
        }
      } else {
        await new Promise((r) => setTimeout(r, 600));
      }
      setSent(true);
    } catch {
      setError(`Couldn't send right now — please email ${email} directly.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-grid">
      <R d={0.2}>
        {sent ? (
          <div style={{ paddingTop: 60, textAlign: "center" }}>
            <span style={{ fontSize: 40, color: "var(--accent)" }}>✓</span>
            <h3 style={{ fontFamily: "var(--display)", fontSize: 30, color: "var(--text-1)", marginTop: 16, fontWeight: 600, letterSpacing: "-0.02em" }}>
              Sent.
            </h3>
            <p className="body-text" style={{ marginTop: 12 }}>{contact.sent}</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); submit(); }}>
            <div className="form-field">
              <label htmlFor="cf-name" className="mono form-field__label">Name</label>
              <input id="cf-name" className="form-field__input" type="text" placeholder="Your name" value={form.name} onChange={(e) => up("name", e.target.value)} required />
            </div>
            <div className="form-field">
              <label htmlFor="cf-email" className="mono form-field__label">Email</label>
              <input id="cf-email" className="form-field__input" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => up("email", e.target.value)} required />
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
              <textarea id="cf-message" className="form-field__input form-field__textarea" placeholder="Tell me about your project..." value={form.message} onChange={(e) => up("message", e.target.value)} required />
            </div>
            {error && <p className="mono" style={{ color: "#FF7A7A", fontSize: 12, lineHeight: 1.6 }}>{error}</p>}
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
              <a href={`mailto:${email}`} style={{ color: "var(--accent-text)", fontSize: 15 }}>{email}</a>
            </div>
          </div>
          <div>
            <span className="mono" style={{ color: "var(--text-3)", fontSize: 11 }}>Based in</span>
            <div style={{ color: "var(--text-2)", fontSize: 15, marginTop: 6 }}>{contact.basedIn}</div>
            <div className="mono" style={{ color: "var(--text-3)", fontSize: 12, marginTop: 2 }}>
              <LiveClock /> {contact.timezone}
            </div>
          </div>
          <div>
            <span className="mono" style={{ color: "var(--text-3)", fontSize: 11 }}>Connect</span>
            <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
              {socials.map((s) => (
                <a key={s.platform} data-cursor="" className="social-link" href={s.url} target="_blank" rel="noopener noreferrer">{s.platform}</a>
              ))}
            </div>
          </div>
          <div className="contact-call-card">
            <p style={{ fontSize: 14, color: "var(--text-3)", lineHeight: 1.6 }}>{contact.callText}</p>
            <a data-cursor="" className="contact-call-btn mono" href={`mailto:${email}?subject=Intro%20call`}>{contact.callButton}</a>
          </div>
        </div>
      </R>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { R, LineReveal } from "./Reveals";
import Accent from "./Accent";

export default function Testimonials({ items, label = "Kind Words", heading = "Thoughts from *people I've worked with*." }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!items?.length) return;
    const iv = setInterval(() => setIdx((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(iv);
  }, [items]);

  if (!items?.length) return null;

  return (
    <section className="testimonial-section">
      <R><span className="mono section-head__label">{label}</span></R>
      <R d={0.1}>
        <h2 className="testimonial-section__title"><Accent>{heading}</Accent></h2>
      </R>
      <LineReveal d={0.2} />
      <div className="testimonial-stage">
        {items.map((t, i) => (
          <div key={t._id} className={`testimonial ${i === idx ? "testimonial--active" : ""}`}>
            {t.rating ? (
              <div className="testimonial__rating" aria-label={`Rated ${t.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <span key={s} aria-hidden="true" className={s < t.rating ? "is-on" : ""}>★</span>
                ))}
              </div>
            ) : null}
            <blockquote className="testimonial__quote">
              <span style={{ color: "var(--accent)" }}>&ldquo;</span>
              {t.quote}
              <span style={{ color: "var(--accent)" }}>&rdquo;</span>
            </blockquote>
            <div className="testimonial__author">
              <div className="testimonial__avatar">{(t.author || "").trim().charAt(0).toUpperCase()}</div>
              <div>
                <div style={{ color: "var(--text-1)", fontSize: 15, fontWeight: 500 }}>{t.author}</div>
                {(t.company || t.source) && (
                  <div className="mono" style={{ color: "var(--text-3)", fontSize: 11, marginTop: 2 }}>
                    {t.company}
                    {t.company && t.source ? " · " : ""}
                    {t.source ? `via ${t.source}` : ""}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="testimonial-dots">
        {items.map((_, i) => (
          <button
            key={i}
            data-cursor=""
            onClick={() => setIdx(i)}
            aria-label={`Show testimonial ${i + 1} of ${items.length}`}
            aria-current={i === idx}
            className={`testimonial-dot ${i === idx ? "testimonial-dot--active" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { R, LineReveal } from "./Reveals";

export default function ServicesList({ services }) {
  const [open, setOpen] = useState(null);

  return (
    <div style={{ marginTop: "var(--space-lg)" }}>
      {services.map((s, i) => (
        <div key={s._id || i}>
          <LineReveal d={0.1} />
          <R d={0.08}>
            <div className="svc-row">
              <h3 style={{ margin: 0 }}>
                <button
                  className="svc-row__head"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`svc-body-${i}`}
                  id={`svc-head-${i}`}
                  style={{ width: "100%", textAlign: "left", padding: 0 }}
                >
                  <span className="mono" style={{ color: "var(--accent-text)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="svc-row__title">{s.title}</span>
                  <span className={`svc-row__toggle ${open === i ? "svc-row__toggle--open" : ""}`}>+</span>
                </button>
              </h3>
              <div
                id={`svc-body-${i}`}
                role="region"
                aria-labelledby={`svc-head-${i}`}
                className={`svc-row__body ${open === i ? "svc-row__body--open" : ""}`}
              >
                <p className="body-text" style={{ maxWidth: 560 }}>{s.description}</p>
                {s.items?.length > 0 && (
                  <div className="svc-row__pills">
                    {s.items.map((it) => <span key={it} className="svc-pill">{it}</span>)}
                  </div>
                )}
                {s.cta && (
                  <Link
                    href={`/contact?type=${s.ctaType || "other"}`}
                    className="svc-cta"
                    data-cursor="let's talk"
                    tabIndex={open === i ? 0 : -1}
                  >
                    {s.cta}
                    <span className="svc-cta__arrow" aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </div>
          </R>
        </div>
      ))}
      <LineReveal d={0.1} />
    </div>
  );
}

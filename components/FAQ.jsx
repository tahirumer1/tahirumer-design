"use client";

import { useState } from "react";
import { R, LineReveal } from "./Reveals";

export default function FAQ({ items }) {
  const [open, setOpen] = useState(null);
  if (!items?.length) return null;

  return (
    <section className="faq-section">
      <R>
        <div className="section-head">
          <span className="mono section-head__label">Frequently Asked</span>
        </div>
      </R>
      <R d={0.1}>
        <h2 className="faq-section__title">
          Answers to the <em>common questions</em>.
        </h2>
      </R>
      <LineReveal d={0.2} />
      <div>
        {items.map((f, i) => (
          <div key={f._id}>
            <R d={0.05 * i}>
              <div className="faq-row" data-cursor="" onClick={() => setOpen(open === i ? null : i)}>
                <div className="faq-row__head">
                  <span className="mono" style={{ color: "var(--text-3)", fontSize: 11 }}>
                    0{i + 1}
                  </span>
                  <h3 className="faq-row__q">{f.question}</h3>
                  <span className={`faq-row__toggle ${open === i ? "faq-row__toggle--open" : ""}`}>
                    <span /><span />
                  </span>
                </div>
                <div className={`faq-row__body ${open === i ? "faq-row__body--open" : ""}`}>
                  <p>{f.answer}</p>
                </div>
              </div>
            </R>
            <LineReveal d={0.05} />
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { R, LineReveal } from "@/components/Reveals";
import CTABlock from "@/components/CTABlock";

const SERVICES = [
  {
    n: "01", t: "UI/UX Design", type: "product", cta: "Start a UI/UX project",
    d: "I design digital products from the ground up — research, strategy, wireframes, flows, and polished interfaces. I think in systems and outcomes, not just screens.",
    items: ["Product Design", "SaaS Platforms", "Web & App Design", "Landing Pages", "Design Systems"],
  },
  {
    n: "02", t: "Graphic Design", type: "brand", cta: "Start a branding project",
    d: "Brand is a system, not a logo. I create visual identities that extend across every touchpoint — cohesive, intentional, and built to scale.",
    items: ["Brand Identity", "Visual Language", "Digital Media", "Print Media", "Marketing Assets"],
  },
  {
    n: "03", t: "WordPress Development", type: "web", cta: "Start a web project",
    d: "I build what I design. Custom themes, full CMS setups, design to deployment. Clients get a polished product they can manage independently.",
    items: ["Custom Themes", "Elementor", "Domain & Hosting", "CMS Configuration", "Performance"],
  },
];

export default function ServicesPage() {
  const [open, setOpen] = useState(null);

  return (
    <main className="page-pad">
      <R><span className="mono" style={{ color: "var(--accent)", fontSize: 12 }}>003 / Services</span></R>
      <R d={0.1}><h1 className="page-title">How I<br />Can Help.</h1></R>
      <R d={0.15}>
        <p className="page-sub" style={{ maxWidth: 520 }}>
          I help businesses design and build digital products that are clear, usable, and built to perform.
        </p>
      </R>

      <div style={{ marginTop: "var(--space-lg)" }}>
        {SERVICES.map((s, i) => (
          <div key={i}>
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
                    <span className="mono" style={{ color: "var(--accent)" }}>{s.n}</span>
                    <span className="svc-row__title">{s.t}</span>
                    <span className={`svc-row__toggle ${open === i ? "svc-row__toggle--open" : ""}`}>+</span>
                  </button>
                </h3>
                <div
                  id={`svc-body-${i}`}
                  role="region"
                  aria-labelledby={`svc-head-${i}`}
                  className={`svc-row__body ${open === i ? "svc-row__body--open" : ""}`}
                >
                  <p className="body-text" style={{ maxWidth: 560 }}>{s.d}</p>
                  <div className="svc-row__pills">
                    {s.items.map((it) => <span key={it} className="svc-pill">{it}</span>)}
                  </div>
                  <Link
                    href={`/contact?type=${s.type}`}
                    className="svc-cta"
                    data-cursor="let's talk"
                    tabIndex={open === i ? 0 : -1}
                  >
                    {s.cta}
                    <span className="svc-cta__arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </R>
          </div>
        ))}
        <LineReveal d={0.1} />
      </div>

      <R>
        <div style={{ marginTop: "var(--space-lg)", padding: "40px 0" }}>
          <p style={{ fontFamily: "var(--display)", fontSize: 26, color: "var(--text-2)", fontWeight: 500, letterSpacing: "-0.02em" }}>
            Not sure what you need? <em>Let's figure it out together.</em>
          </p>
        </div>
      </R>

      <CTABlock />
    </main>
  );
}

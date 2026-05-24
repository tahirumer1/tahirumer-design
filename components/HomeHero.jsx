"use client";

import { useState, useEffect } from "react";
import Scene3D from "./Scene3D";
import LiveClock from "./LiveClock";

export default function HomeHero({
  tagline,
  line1 = "I design digital",
  line2 = "products that",
  emphasis = "perform.",
  label = "UI/UX Designer · 10+ Years · Product‑Focused",
  ticker = [],
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => { setTimeout(() => setReady(true), 150); }, []);

  const scrollToWork = () => {
    document.getElementById("work-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const labelItems = String(label).split("·").map((s) => s.trim()).filter(Boolean);
  const tickerItems = ticker.length
    ? ticker
    : ["● AVAILABLE FOR SELECT PROJECTS", "● 2026 BOOKINGS OPEN", "● INTERNATIONAL CLIENTS WELCOME", "● BASED IN LAHORE · WORKING GLOBALLY"];

  // Each word in its own reveal mask, with real spaces between (so words don't run together).
  const words = (text, baseDelay) =>
    String(text).split(" ").filter(Boolean).flatMap((w, i) => {
      const span = (
        <span key={`${baseDelay}-${i}`} className="hero__word">
          <span className={`hero__word-inner ${ready ? "in" : ""}`} style={{ transitionDelay: `${baseDelay + i * 0.08}s` }}>{w}</span>
        </span>
      );
      return i === 0 ? [span] : [" ", span];
    });

  return (
    <section className="hero">
      <Scene3D />
      <div className="hero__content">
        <div className="hero__label">
          <span className={`hero__label-line ${ready ? "in" : ""}`}>
            {labelItems.flatMap((item, i) => {
              const el = <span key={`l${i}`} className="mono">{item}</span>;
              return i === 0 ? [el] : [<span key={`r${i}`} className="hero__label-rule" />, el];
            })}
          </span>
        </div>
        <h1 className="hero__title">
          {words(line1, 0.15)}
          <br />
          {words(line2, 0.45)}
          {" "}
          <em className="hero__word">
            <span className={`hero__word-inner ${ready ? "in" : ""}`} style={{ transitionDelay: "0.62s" }}>{emphasis}</span>
          </em>
        </h1>
      </div>
      <div className={`hero__bottom ${ready ? "in" : ""}`}>
        <div className="hero__bottom-left">
          <div className="hero__clock">
            <span className="hero__clock-dot" />
            <span className="mono" style={{ color: "var(--text-2)" }}><LiveClock /></span>
            <span className="mono" style={{ color: "var(--text-3)" }}>LHE · PK</span>
          </div>
          <p className="hero__sub">{tagline || "Helping businesses turn complex ideas into high‑performing digital experiences for over a decade."}</p>
        </div>
        <button data-cursor="explore" className="hero__scroll" onClick={scrollToWork} aria-label="Scroll to selected work">
          <span className="mono" style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em" }}>SCROLL</span>
          <span className="hero__scroll-line" />
        </button>
      </div>

      <div className="hero__ticker">
        <div className="hero__ticker-inner">
          {Array(4).fill(null).map((_, j) => (
            <span key={j} className="hero__ticker-text">
              {tickerItems.map((t, k) => <span key={k}>{t}</span>)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

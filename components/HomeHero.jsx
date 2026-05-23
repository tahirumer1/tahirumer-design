"use client";

import { useState, useEffect } from "react";
import Scene3D from "./Scene3D";
import LiveClock from "./LiveClock";

export default function HomeHero({ tagline }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { setTimeout(() => setReady(true), 150); }, []);

  const scrollToWork = () => {
    document.getElementById("work-section")?.scrollIntoView({ behavior: "smooth" });
  };

  // Render each word in its own reveal mask, with real spaces between them.
  // (Adjacent inline-block spans collapse whitespace, so the spaces must be
  // explicit text nodes between the masks — otherwise the words run together.)
  const words = (text, baseDelay) =>
    text.split(" ").flatMap((w, i) => {
      const span = (
        <span key={`${baseDelay}-${i}`} className="hero__word">
          <span
            className={`hero__word-inner ${ready ? "in" : ""}`}
            style={{ transitionDelay: `${baseDelay + i * 0.08}s` }}
          >
            {w}
          </span>
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
            <span className="mono">UI/UX Designer</span>
            <span className="hero__label-rule" />
            <span className="mono">10+ Years</span>
            <span className="hero__label-rule" />
            <span className="mono">Product‑Focused</span>
          </span>
        </div>
        <h1 className="hero__title">
          {words("I design digital", 0.15)}
          <br />
          {words("products that", 0.45)}
          {" "}
          <em className="hero__word">
            <span
              className={`hero__word-inner ${ready ? "in" : ""}`}
              style={{ transitionDelay: "0.62s" }}
            >
              perform.
            </span>
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
              <span>● AVAILABLE FOR SELECT PROJECTS</span>
              <span>● 2026 BOOKINGS OPEN</span>
              <span>● INTERNATIONAL CLIENTS WELCOME</span>
              <span>● BASED IN LAHORE · WORKING GLOBALLY</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

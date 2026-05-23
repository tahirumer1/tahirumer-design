"use client";

import { useState, useEffect } from "react";

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    // Honor reduced-motion: skip the intro entirely and reveal content.
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPct(100);
      setHide(true);
      const t = setTimeout(onDone, 50);
      return () => clearTimeout(t);
    }

    let p = 0;
    let timer;
    const tick = () => {
      p += Math.random() * 7 + 4;
      if (p >= 100) {
        setPct(100);
        timer = setTimeout(() => {
          setHide(true);
          timer = setTimeout(onDone, 700);
        }, 250);
      } else {
        setPct(Math.floor(p));
        timer = setTimeout(tick, 22 + Math.random() * 38);
      }
    };
    tick();
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="loader" style={{ opacity: hide ? 0 : 1, pointerEvents: hide ? "none" : "all" }} aria-hidden="true">
      <div className="loader__bars" style={{ transform: hide ? "translateY(-100%)" : "translateY(0)" }}>
        <div /><div /><div /><div /><div />
      </div>
      <div className="loader__inner">
        <div className="loader__meta">
          <span className="mono">TAHIR UMER</span>
          <span className="mono">DESIGN STUDIO — 2026</span>
        </div>
        <div className="loader__pct">
          <span className="loader__pct-num">{String(pct).padStart(3, "0")}</span>
          <span className="loader__pct-sym">%</span>
        </div>
        <div className="loader__bar">
          <div className="loader__bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="loader__meta">
          <span className="mono">LOADING EXPERIENCE</span>
          <span className="mono">PLEASE WAIT</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let p = 0;
    const tick = () => {
      p += Math.random() * 4 + 1;
      if (p >= 100) {
        setPct(100);
        setTimeout(() => {
          setHide(true);
          setTimeout(onDone, 900);
        }, 400);
      } else {
        setPct(Math.floor(p));
        setTimeout(tick, 40 + Math.random() * 60);
      }
    };
    tick();
  }, [onDone]);

  return (
    <div className="loader" style={{ opacity: hide ? 0 : 1, pointerEvents: hide ? "none" : "all" }}>
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
          <span className="mono">PLS WAIT</span>
        </div>
      </div>
    </div>
  );
}

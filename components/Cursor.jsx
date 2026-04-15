"use client";

import { useState, useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const move = (e) => {
      if (dot.current) {
        dot.current.style.left = e.clientX + "px";
        dot.current.style.top = e.clientY + "px";
      }
      if (ring.current) {
        ring.current.style.left = e.clientX + "px";
        ring.current.style.top = e.clientY + "px";
      }
    };
    const over = (e) => {
      const t = e.target.closest("[data-cursor]");
      if (t) {
        setActive(true);
        setLabel(t.dataset.cursor || "");
      } else {
        setActive(false);
        setLabel("");
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cur-dot" style={{ width: active ? 0 : 6, height: active ? 0 : 6 }} />
      <div
        ref={ring}
        className="cur-ring"
        style={{
          width: active ? (label ? 110 : 56) : 38,
          height: active ? (label ? 110 : 56) : 38,
          borderColor: active ? "var(--accent)" : "var(--text-3)",
          background: active && label ? "var(--accent)" : "transparent",
        }}
      >
        {label && <span>{label}</span>}
      </div>
    </>
  );
}

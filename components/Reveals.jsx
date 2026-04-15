"use client";

import { useState, useEffect, useRef } from "react";

export function useReveal(threshold = 0.18) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          ob.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [threshold]);
  return [ref, vis];
}

export function R({ children, d = 0, y = 50, className = "", style = {} }) {
  const [ref, vis] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${d}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${d}s`,
      }}
    >
      {children}
    </div>
  );
}

export function LineReveal({ d = 0 }) {
  const [ref, vis] = useReveal(0.5);
  return (
    <div
      ref={ref}
      style={{
        height: "1px",
        background: "var(--rule)",
        transformOrigin: "left",
        transform: vis ? "scaleX(1)" : "scaleX(0)",
        transition: `transform 1.2s cubic-bezier(0.22,1,0.36,1) ${d}s`,
      }}
    />
  );
}

export function Counter({ end, suffix = "", duration = 2 }) {
  const [ref, vis] = useReveal(0.5);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!vis) return;
    const start = Date.now();
    const raf = () => {
      const p = Math.min((Date.now() - start) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(end * ease));
      if (p < 1) requestAnimationFrame(raf);
    };
    raf();
  }, [vis, end, duration]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

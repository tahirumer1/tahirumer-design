"use client";

import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";

const CATEGORIES = ["All", "UI/UX", "Graphic", "Development"];
// Clean URL slugs for shareable per-field links: /work?cat=ui-ux | graphic | development
const CAT_TO_SLUG = { "All": "", "UI/UX": "ui-ux", "Graphic": "graphic", "Development": "development" };
const SLUG_TO_CAT = { "ui-ux": "UI/UX", "graphic": "Graphic", "development": "Development", "all": "All" };

export default function FilterableWork({ projects, showCounts = false, limit, emptyMessage = "No projects in this category yet — check back soon.", syncUrl = false }) {
  const [cat, setCat] = useState("All");

  // Honor a ?cat= deep link on load so each field of work has a shareable URL.
  useEffect(() => {
    if (!syncUrl || typeof window === "undefined") return;
    const slug = new URLSearchParams(window.location.search).get("cat");
    const c = slug && SLUG_TO_CAT[slug.toLowerCase()];
    if (c) setCat(c);
  }, [syncUrl]);

  const choose = (c) => {
    setCat(c);
    if (!syncUrl || typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const slug = CAT_TO_SLUG[c];
    if (slug) url.searchParams.set("cat", slug);
    else url.searchParams.delete("cat");
    window.history.replaceState(null, "", url);
  };

  let filtered = cat === "All" ? projects : projects.filter((p) => p.category === cat);
  if (limit) filtered = filtered.slice(0, limit);

  return (
    <>
      <div className="filter-row">
        {CATEGORIES.map((c) => {
          const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              data-cursor=""
              onClick={() => choose(c)}
              className={`filter-btn ${cat === c ? "filter-btn--active" : ""}`}
            >
              <span className="mono">{c}</span>
              {showCounts && <span className="mono filter-btn__count">({count})</span>}
            </button>
          );
        })}
      </div>
      {filtered.length === 0 ? (
        <p style={{ color: "var(--text-3)", fontFamily: "var(--mono)", fontSize: 13, letterSpacing: "0.04em", padding: "48px 0" }}>
          {emptyMessage}
        </p>
      ) : (
        <div className="proj-grid">
          {filtered.map((p, i) => (
            <ProjectCard key={p._id || p.slug} project={p} index={i} />
          ))}
        </div>
      )}
    </>
  );
}

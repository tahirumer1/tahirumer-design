"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";

const CATEGORIES = ["All", "UI/UX", "Graphic", "Development"];

export default function FilterableWork({ projects, showCounts = false, limit, emptyMessage = "No projects in this category yet — check back soon." }) {
  const [cat, setCat] = useState("All");
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
              onClick={() => setCat(c)}
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

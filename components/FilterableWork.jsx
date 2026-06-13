"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";

const CATEGORIES = ["All", "UI/UX", "Graphic", "Development"];
// Clean URL slugs for shareable per-field links: /work?cat=ui-ux | graphic | development
const CAT_TO_SLUG = { "All": "", "UI/UX": "ui-ux", "Graphic": "graphic", "Development": "development" };
const SLUG_TO_CAT = { "ui-ux": "UI/UX", "graphic": "Graphic", "development": "Development", "all": "All" };

export default function FilterableWork({ projects, showCounts = false, limit, pageSize, emptyMessage = "No projects in this category yet — check back soon.", syncUrl = false }) {
  const [cat, setCat] = useState("All");
  // Archive pagination: render `pageSize` cards, reveal more on "Load more".
  // Keeps the initial DOM (and its 55 IntersectionObservers) small so the page
  // stays snappy. `limit` (homepage) is a separate, fixed cap — not paginated.
  const [visible, setVisible] = useState(pageSize || Infinity);

  // Honor a ?cat= deep link on load so each field of work has a shareable URL.
  useEffect(() => {
    if (!syncUrl || typeof window === "undefined") return;
    const slug = new URLSearchParams(window.location.search).get("cat");
    const c = slug && SLUG_TO_CAT[slug.toLowerCase()];
    if (c) { setCat(c); setVisible(pageSize || Infinity); }
  }, [syncUrl, pageSize]);

  const choose = (c) => {
    setCat(c);
    setVisible(pageSize || Infinity); // restart pagination when the filter changes
    if (!syncUrl || typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const slug = CAT_TO_SLUG[c];
    if (slug) url.searchParams.set("cat", slug);
    else url.searchParams.delete("cat");
    window.history.replaceState(null, "", url);
  };

  const inCat = cat === "All" ? projects : projects.filter((p) => p.category === cat);
  const totalInCat = inCat.length;
  const filtered = limit ? inCat.slice(0, limit) : pageSize ? inCat.slice(0, visible) : inCat;
  const remaining = totalInCat - filtered.length;

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
        <>
          <div className="proj-grid">
            {filtered.map((p, i) => (
              <ProjectCard key={p._id || p.slug} project={p} index={i} />
            ))}
          </div>
          {limit ? (
            <div className="work-viewall">
              <Link
                href={`/work${CAT_TO_SLUG[cat] ? `?cat=${CAT_TO_SLUG[cat]}` : ""}`}
                className="work-viewall__link mono"
                data-cursor=""
              >
                {cat === "All" ? "View the full archive" : `View all ${totalInCat} ${cat} projects`}
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
          ) : pageSize && remaining > 0 ? (
            <div className="work-viewall">
              <button
                type="button"
                onClick={() => setVisible((v) => v + pageSize)}
                className="work-viewall__link mono"
                data-cursor=""
              >
                Load more
                <span className="filter-btn__count">({remaining} more)</span>
                <span aria-hidden="true"> ↓</span>
              </button>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

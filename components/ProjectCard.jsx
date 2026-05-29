"use client";

import Link from "next/link";
import { useReveal } from "./Reveals";
import { colorToGradient } from "@/lib/queries";

export default function ProjectCard({ project, index = 0 }) {
  const [ref, vis] = useReveal();
  const num = String(index + 1).padStart(2, "0");
  // Use `backgroundImage` (NOT the `background` shorthand) for thumbnails so the
  // CSS class's `background-size: cover` + `background-position` are preserved.
  // The shorthand resets those to `auto` / `0% 0%`, which showed a 1:1 top-left crop.
  const imgStyle = project.thumbnailUrl
    ? { backgroundImage: `url(${project.thumbnailUrl})` }
    : { background: colorToGradient(project.accentColor) };

  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${0.08 * index}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${0.08 * index}s`,
      }}
    >
      <Link href={`/work/${project.slug}`} className="proj-card" data-cursor="view">
        <div className="proj-card__img" style={imgStyle}>
          <span className="mono proj-card__num">{num}</span>
          {!project.thumbnailUrl && (
            <span className="proj-card__letter">
              {project.title.slice(0, 2)}
            </span>
          )}
          <div className="proj-card__overlay">
            <span className="mono">View Project →</span>
          </div>
        </div>
        <div className="proj-card__info">
          <div className="proj-card__meta">
            <span className="mono" style={{ color: project.accentColor || "var(--accent)" }}>{project.category}</span>
            <span className="mono" style={{ color: "var(--text-3)" }}>{project.year}</span>
          </div>
          <h3 className="proj-card__title">{project.title}</h3>
          {project.brief && <p className="proj-card__brief">{project.brief}</p>}
        </div>
      </Link>
    </div>
  );
}

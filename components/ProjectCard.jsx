"use client";

import Link from "next/link";
import { useReveal } from "./Reveals";
import { colorToGradient } from "@/lib/queries";

export default function ProjectCard({ project, index = 0 }) {
  const [ref, vis] = useReveal();
  const num = String(index + 1).padStart(2, "0");
  // Render the thumbnail as a real lazy <img> (not a CSS background) so off-screen
  // cards defer their downloads — a 50+ card archive no longer fetches every image
  // up front on mobile. Falls back to an accent gradient when there's no thumbnail.
  const fallbackStyle = project.thumbnailUrl
    ? undefined
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
        <div className="proj-card__img" style={fallbackStyle}>
          {project.thumbnailUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.thumbnailUrl}
              alt=""
              aria-hidden="true"
              className="proj-card__cover"
              loading="lazy"
              decoding="async"
            />
          )}
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
            <span className="mono" style={{ color: "var(--accent-text)" }}>{project.category}</span>
            <span className="mono" style={{ color: "var(--text-3)" }}>{project.year}</span>
          </div>
          <h3 className="proj-card__title">{project.title}</h3>
          {project.brief && <p className="proj-card__brief">{project.brief}</p>}
        </div>
      </Link>
    </div>
  );
}

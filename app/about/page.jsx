import { R, LineReveal } from "@/components/Reveals";
import CTABlock from "@/components/CTABlock";
import { getSiteContent } from "@/lib/queries";
import { EXPERIENCE, SKILL_GROUPS, TOOLS, EDUCATION, CERTIFICATIONS } from "@/lib/resume";

export const metadata = { title: "About — Tahir Umer" };
export const revalidate = 60;

export default async function AboutPage() {
  const { about, labels } = await getSiteContent();

  return (
    <main className="page-pad">
      <R><span className="mono" style={{ color: "var(--accent)", fontSize: 12 }}>002 / {labels.about}</span></R>
      <R d={0.1}><h1 className="page-title" style={{ maxWidth: 800 }}>{about.headline}</h1></R>
      <R d={0.15}>
        <p style={{ fontFamily: "var(--display)", fontSize: "clamp(22px,3.2vw,36px)", color: "var(--text-2)", lineHeight: 1.4, maxWidth: 720, fontWeight: 400, marginTop: 12, letterSpacing: "-0.02em" }}>
          {about.subtitle}
        </p>
      </R>

      <R d={0.2}>
        <div
          role="img"
          aria-label="Tahir Umer"
          style={{
            marginTop: "var(--space-lg)",
            aspectRatio: "1 / 1",
            width: "100%",
            maxWidth: 480,
            borderRadius: 8,
            border: "1px solid var(--rule)",
            overflow: "hidden",
            backgroundColor: "var(--accent-deep)",
            backgroundImage: "url(/tahir.png)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
      </R>

      <div style={{ marginTop: "var(--space-xl)", maxWidth: 680 }}>
        <R><span className="mono section-head__label">{labels.story}</span></R>
        <R d={0.05}><LineReveal /></R>
        {about.story.map((t, i) => (
          <R key={i} d={0.08 * i}>
            <p className="body-text" style={{ marginTop: i === 0 ? 32 : 20 }}>{t}</p>
          </R>
        ))}
      </div>

      {/* Experience */}
      <div style={{ marginTop: "var(--space-xl)" }}>
        <R><span className="mono section-head__label">Experience</span></R>
        <R d={0.05}><LineReveal /></R>
        <div className="exp-list">
          {EXPERIENCE.map((e, i) => (
            <R key={i} d={0.04 * Math.min(i, 4)}>
              <div className="exp-item">
                <div className="exp-item__head">
                  <h3 className="exp-item__role">{e.role}</h3>
                  <span className="mono exp-item__period">{e.period}</span>
                </div>
                <div className="mono exp-item__co">{e.company} · {e.location}</div>
                <ul className="exp-item__bullets">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="body-text">{b}</li>
                  ))}
                </ul>
              </div>
            </R>
          ))}
        </div>
      </div>

      {/* Skills & Tools */}
      <div style={{ marginTop: "var(--space-xl)" }}>
        <R><span className="mono section-head__label">Skills &amp; Tools</span></R>
        <R d={0.05}><LineReveal /></R>
        <div className="skills-grid">
          {SKILL_GROUPS.map((g, i) => (
            <R key={i} d={0.06 * i}>
              <div className="skills-group">
                <span className="mono skills-group__label">{g.group}</span>
                <div className="skills-group__tags">
                  {g.items.map((it) => (
                    <span key={it} className="skill-tag">{it}</span>
                  ))}
                </div>
              </div>
            </R>
          ))}
        </div>
        <R d={0.1}>
          <div className="tools-row">
            {TOOLS.map((t) => (
              <div key={t.name} className="tool-chip">
                <span className="tool-chip__name">{t.name}</span>
                <span className="mono tool-chip__level">{t.level}</span>
              </div>
            ))}
          </div>
        </R>
      </div>

      {/* Education & Certifications */}
      <div style={{ marginTop: "var(--space-xl)", maxWidth: 760 }}>
        <R><span className="mono section-head__label">Education &amp; Certifications</span></R>
        <R d={0.05}><LineReveal /></R>
        <div className="edu-list">
          {[...EDUCATION, ...CERTIFICATIONS].map((e, i) => (
            <R key={i} d={0.05 * i}>
              <div className="edu-item">
                <span className="mono edu-item__year">{e.year}</span>
                <div className="edu-item__body">
                  <div className="edu-item__title">{e.title}</div>
                  <div className="mono edu-item__org">{e.org}</div>
                </div>
              </div>
            </R>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "var(--space-xl)" }}>
        <R><span className="mono section-head__label">{labels.philosophy}</span></R>
        <R d={0.05}><LineReveal /></R>
        <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 40 }}>
          {about.philosophy.map((p, i) => (
            <R key={i} d={0.1 * i}>
              <div className="philosophy-card">
                <h3 className="philosophy-card__title">{p.title}</h3>
                <p className="body-text" style={{ marginTop: 8 }}>{p.desc}</p>
              </div>
            </R>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "var(--space-xl)", maxWidth: 600 }}>
        <R><span className="mono section-head__label">{labels.beyond}</span></R>
        <R d={0.05}><LineReveal /></R>
        <R d={0.1}>
          <p className="body-text" style={{ marginTop: 32 }}>{about.beyondScreen}</p>
        </R>
      </div>

      <CTABlock />
    </main>
  );
}

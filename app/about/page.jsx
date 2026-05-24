import { R, LineReveal } from "@/components/Reveals";
import CTABlock from "@/components/CTABlock";
import { getSiteContent } from "@/lib/queries";

export const metadata = { title: "About — Tahir Umer" };
export const revalidate = 60;

export default async function AboutPage() {
  const { settings, about } = await getSiteContent();

  return (
    <main className="page-pad">
      <R><span className="mono" style={{ color: "var(--accent)", fontSize: 12 }}>002 / About</span></R>
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
        <R><span className="mono section-head__label">My Story</span></R>
        <R d={0.05}><LineReveal /></R>
        {about.story.map((t, i) => (
          <R key={i} d={0.08 * i}>
            <p className="body-text" style={{ marginTop: i === 0 ? 32 : 20 }}>{t}</p>
          </R>
        ))}
      </div>

      <div style={{ marginTop: "var(--space-xl)" }}>
        <R><span className="mono section-head__label">Philosophy</span></R>
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
        <R><span className="mono section-head__label">Beyond the Screen</span></R>
        <R d={0.05}><LineReveal /></R>
        <R d={0.1}>
          <p className="body-text" style={{ marginTop: 32 }}>{about.beyondScreen}</p>
        </R>
      </div>

      <CTABlock email={settings.email} />
    </main>
  );
}

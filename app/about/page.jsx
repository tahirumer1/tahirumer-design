import { R, LineReveal } from "@/components/Reveals";
import CTABlock from "@/components/CTABlock";
import { getSiteSettings } from "@/lib/queries";

export const metadata = { title: "About — Tahir Umer" };

const STORY = [
  "I started over a decade ago with a simple belief: design should solve problems, not create them. What began as visual curiosity evolved into a deeper fascination — how people think, decide, and interact with digital products.",
  "I've worked across industries — fintech, healthcare, education, architecture. Collaborating with startups finding their footing and established businesses rethinking digital presence. Each project sharpened my understanding of the relationship between design, strategy, and human behavior.",
  "Working with international clients across different markets taught me to design for context, not convention. Every culture, audience, and business has its own logic — the best design respects that.",
  "Today I approach every project as a product problem, not a design task. I ask 'why' before 'how.' I think in systems, not screens. The best experiences feel so natural, you forget someone designed them.",
];

const PHILOSOPHY = [
  ["Design is a business tool.", "I measure success by outcomes, not aesthetics alone. Beautiful work that doesn't perform is decoration — and I don't do decoration."],
  ["Simplicity is a feature.", "Complexity is the default. My job is to fight it — to find the clearest path between a user and their goal."],
  ["Process over perfection.", "I trust the process to get to the right answer. Research, iteration, and honest feedback always beat guesswork."],
];

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <main className="page-pad">
      <R><span className="mono" style={{ color: "var(--accent)", fontSize: 12 }}>002 / About</span></R>
      <R d={0.1}><h1 className="page-title" style={{ maxWidth: 800 }}>I'm Tahir —</h1></R>
      <R d={0.15}>
        <p style={{ fontFamily: "var(--display)", fontSize: "clamp(22px,3.2vw,36px)", color: "var(--text-2)", lineHeight: 1.4, maxWidth: 720, fontWeight: 400, marginTop: 12, letterSpacing: "-0.02em" }}>
          a product designer who believes great design is invisible until it isn't.
        </p>
      </R>

      <R d={0.2}>
        <div style={{ marginTop: "var(--space-lg)", aspectRatio: "2.2/1", borderRadius: 4, background: "linear-gradient(135deg, #141414, #1a1a1a)", border: "1px solid var(--rule)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 50%, rgba(212,255,0,0.06), transparent 60%)" }} />
          <span className="mono" style={{ color: "var(--text-3)", fontSize: 12, position: "relative" }}>Your photograph</span>
        </div>
      </R>

      <div style={{ marginTop: "var(--space-xl)", maxWidth: 680 }}>
        <R><span className="mono section-head__label">My Story</span></R>
        <R d={0.05}><LineReveal /></R>
        {STORY.map((t, i) => (
          <R key={i} d={0.08 * i}>
            <p className="body-text" style={{ marginTop: i === 0 ? 32 : 20 }}>{t}</p>
          </R>
        ))}
      </div>

      <div style={{ marginTop: "var(--space-xl)" }}>
        <R><span className="mono section-head__label">Philosophy</span></R>
        <R d={0.05}><LineReveal /></R>
        <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 40 }}>
          {PHILOSOPHY.map(([t, d], i) => (
            <R key={i} d={0.1 * i}>
              <div className="philosophy-card">
                <h3 className="philosophy-card__title">{t}</h3>
                <p className="body-text" style={{ marginTop: 8 }}>{d}</p>
              </div>
            </R>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "var(--space-xl)", maxWidth: 600 }}>
        <R><span className="mono section-head__label">Beyond the Screen</span></R>
        <R d={0.05}><LineReveal /></R>
        <R d={0.1}>
          <p className="body-text" style={{ marginTop: 32 }}>
            When I'm not designing, I'm exploring photography, reading behavioral psychology, or traveling to places that challenge my perspective. The best ideas tend to come from outside the screen.
          </p>
        </R>
      </div>

      <CTABlock email={settings.email} />
    </main>
  );
}

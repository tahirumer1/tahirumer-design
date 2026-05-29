import Link from "next/link";
import { notFound } from "next/navigation";
import { R, LineReveal } from "@/components/Reveals";
import CTABlock from "@/components/CTABlock";
import DemoEmbed from "@/components/DemoEmbed";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectSlugs,
  getSiteSettings,
} from "@/lib/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const p = await getProjectBySlug(params.slug);
  if (!p) return { title: "Project Not Found" };
  return {
    title: `${p.title} — Tahir Umer`,
    description: p.brief,
  };
}

export default async function CaseStudyPage({ params }) {
  const [p, allProjects, settings] = await Promise.all([
    getProjectBySlug(params.slug),
    getAllProjects(),
    getSiteSettings(),
  ]);

  if (!p) notFound();

  const currentIdx = allProjects.findIndex((x) => x.slug === params.slug);
  const next = allProjects[(currentIdx + 1) % allProjects.length];

  return (
    <main className="page-pad">
      <R>
        <Link href="/work" className="back-link" data-cursor="">
          <span className="mono">← Back to Archive</span>
        </Link>
      </R>

      <R d={0.1}>
        <span className="mono" style={{ color: p.accentColor || "var(--accent)", fontSize: 12 }}>
          {String(currentIdx + 1).padStart(2, "0")} / {p.category} / {p.year}
        </span>
      </R>
      <R d={0.15}><h1 className="cs-title">{p.title}.</h1></R>
      <R d={0.25}><p className="cs-brief">{p.brief}</p></R>

      <R d={0.3}>
        <div className="cs-meta-row">
          {[["Role", p.role], ["Timeline", p.timeline], ["Platform", p.platform]].map(([l, v]) =>
            v ? (
              <div key={l} className="cs-meta">
                <span className="mono cs-meta__label">{l}</span>
                <span className="cs-meta__value" style={{ display: "block" }}>{v}</span>
              </div>
            ) : null
          )}
        </div>
      </R>

      {p.demoUrl && (
        <R d={0.32}>
          <DemoEmbed src={p.demoUrl} poster={p.thumbnailUrl} title={p.title} accent={p.accentColor} />
          {p.description && (
            <p className="cs-section__body" style={{ marginTop: 28, maxWidth: 760 }}>{p.description}</p>
          )}
          {p.roleTags?.length > 0 && (
            <div className="cs-demo__tags">
              {p.roleTags.map((t) => (
                <span key={t} className="cs-demo__tag">{t}</span>
              ))}
            </div>
          )}
        </R>
      )}

      {p.detailImageUrls?.length > 0 && (
        <div className="cs-shots">
          {p.detailImageUrls.map((url, i) => (
            <R key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${url}?w=1600&auto=format&fit=max`}
                alt={`${p.title} — image ${i + 1}`}
                className="cs-shot"
                loading="lazy"
              />
            </R>
          ))}
        </div>
      )}

      {p.challenge && (
        <div className="cs-section">
          <R>
            <div className="cs-section__head">
              <span className="mono" style={{ color: p.accentColor || "var(--accent)" }}>01</span>
              <h2 className="cs-section__title">The Challenge</h2>
            </div>
          </R>
          <LineReveal />
          <R d={0.1}><p className="cs-section__body">{p.challenge}</p></R>
        </div>
      )}

      {p.context && (
        <div className="cs-section">
          <R>
            <div className="cs-section__head">
              <span className="mono" style={{ color: p.accentColor || "var(--accent)" }}>02</span>
              <h2 className="cs-section__title">Context</h2>
            </div>
          </R>
          <LineReveal />
          <R d={0.1}><p className="cs-section__body">{p.context}</p></R>
        </div>
      )}

      {p.process?.length > 0 && (
        <div className="cs-section">
          <R>
            <div className="cs-section__head">
              <span className="mono" style={{ color: p.accentColor || "var(--accent)" }}>03</span>
              <h2 className="cs-section__title">Process</h2>
            </div>
          </R>
          <LineReveal />
          {p.process.map((s, i) => (
            <R key={i} d={0.1 * i}>
              <div className="cs-process-step">
                <div className="cs-process-step__left">
                  <span className="mono" style={{ color: "var(--text-3)", fontSize: 11 }}>0{i + 1}</span>
                  <h4 style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 600, color: "var(--text-1)", marginTop: 6, letterSpacing: "-0.02em" }}>
                    {s.title}
                  </h4>
                </div>
                <p className="cs-process-step__right">{s.description}</p>
              </div>
            </R>
          ))}
        </div>
      )}

      {p.outcome && (
        <div className="cs-section">
          <R>
            <div className="cs-section__head">
              <span className="mono" style={{ color: p.accentColor || "var(--accent)" }}>04</span>
              <h2 className="cs-section__title">Outcome</h2>
            </div>
          </R>
          <LineReveal />
          <R d={0.1}><p className="cs-outcome">{p.outcome}</p></R>
        </div>
      )}

      <LineReveal />
      {next && (
        <R>
          <Link href={`/work/${next.slug}`} className="cs-next" data-cursor="next" style={{ display: "block" }}>
            <span className="mono" style={{ color: "var(--text-3)", fontSize: 11 }}>
              Next Project — {String(((currentIdx + 1) % allProjects.length) + 1).padStart(3, "0")}
            </span>
            <h2 className="cs-next__title">
              {next.title}
              <span style={{ color: next.accentColor || "var(--accent)" }}> →</span>
            </h2>
            <span className="mono" style={{ color: "var(--text-3)" }}>{next.category} · {next.year}</span>
          </Link>
        </R>
      )}

      <CTABlock email={settings.email} />
    </main>
  );
}

import Link from "next/link";
import { R, LineReveal, Counter } from "@/components/Reveals";
import HomeHero from "@/components/HomeHero";
import FilterableWork from "@/components/FilterableWork";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTABlock from "@/components/CTABlock";
import { getAllProjects, getTestimonials, getFaqs, getSiteSettings } from "@/lib/queries";

export const revalidate = 60;

export default async function HomePage() {
  const [projects, testimonials, faqs, settings] = await Promise.all([
    getAllProjects(),
    getTestimonials(),
    getFaqs(),
    getSiteSettings(),
  ]);

  return (
    <main>
      <HomeHero tagline={settings.heroTagline} />

      <section className="about-strip">
        <div className="about-strip__grid">
          <R><span className="mono section-head__label">About</span></R>
          <R d={0.1}>
            <p className="about-strip__text">
              {settings.aboutIntro?.split("10+").map((part, i, arr) =>
                i === arr.length - 1 ? part : <>{part}<em>10+</em></>
              ) || (
                <>I'm Tahir Umer, a product designer based in Lahore. I've spent <em>10+ years</em> building digital products across fintech, healthcare, education, and architecture — working with startups and international clients. I think in <em>systems, flows, and outcomes</em>.</>
              )}
            </p>
          </R>
        </div>
      </section>

      <section id="work-section" className="work-section">
        <R>
          <div className="section-head">
            <span className="mono section-head__label">Selected Work</span>
            <Link href="/work" data-cursor="" className="section-head__link">View Archive →</Link>
          </div>
        </R>
        <LineReveal d={0.15} />
        <FilterableWork projects={projects} limit={4} />
      </section>

      <section className="quote-section">
        <R><span className="mono section-head__label">Philosophy</span></R>
        <R d={0.1}>
          <blockquote className="pull-quote">
            I don't just make things look good — I make them <em>work</em>. Every pixel is a product decision. Every layout is a business strategy. Every interaction is a conversation with the user.
          </blockquote>
        </R>
      </section>

      <section className="stats-section">
        <LineReveal />
        <div className="stats-grid">
          {[
            { n: settings.projectsCount || 100, s: "+", l: "Successful Projects" },
            { n: settings.countriesCount || 6, s: "", l: "Countries Served" },
            { n: settings.yearsExperience || 10, s: "+", l: "Years of Experience" },
            { n: 48, s: "h", l: "Response Time" },
          ].map((st, i) => (
            <R key={i} d={0.08 * i}>
              <div className="stat-cell">
                <span className="stat-cell__num"><Counter end={st.n} suffix={st.s} /></span>
                <span className="mono stat-cell__label">{st.l}</span>
              </div>
            </R>
          ))}
        </div>
        <LineReveal />
      </section>

      <section className="cap-section">
        <R><span className="mono section-head__label">Capabilities</span></R>
        <R d={0.1}>
          <h2 className="cap-section__title">
            What I do, in <em>three</em> disciplines.
          </h2>
        </R>
        <LineReveal d={0.2} />
        <div className="cap-grid">
          {[
            { n: "01", t: "UI/UX Design", desc: "End-to-end product design — research, architecture, interaction, interface.", items: ["Product Design", "SaaS Platforms", "Web & App", "Design Systems", "Landing Pages"] },
            { n: "02", t: "Graphic Design", desc: "Visual identity and communication design that works as a system.", items: ["Brand Identity", "Visual Language", "Digital Media", "Print Media", "Marketing Assets"] },
            { n: "03", t: "Development", desc: "WordPress development — from theme customization to custom builds.", items: ["Custom Themes", "Elementor", "Domain & Hosting", "CMS Setup", "Performance"] },
          ].map((c, i) => (
            <R key={i} d={0.12 * i}>
              <Link href="/services" className="cap-card" data-cursor="explore">
                <div className="cap-card__top">
                  <span className="mono cap-card__num">{c.n}</span>
                  <span className="cap-card__arrow">↗</span>
                </div>
                <h3 className="cap-card__title">{c.t}</h3>
                <p className="cap-card__desc">{c.desc}</p>
                <div className="cap-card__items">
                  {c.items.map((it) => <span key={it} className="cap-card__item mono">{it}</span>)}
                </div>
              </Link>
            </R>
          ))}
        </div>
      </section>

      <div className="marquee">
        <div className="marquee__inner">
          {Array(3).fill(null).map((_, j) => (
            <span key={j} className="marquee__text">
              DISCOVER <span className="marquee__dot">✦</span> DEFINE <span className="marquee__dot">✦</span> DESIGN <span className="marquee__dot">✦</span> REFINE <span className="marquee__dot">✦</span> DELIVER <span className="marquee__dot">✦</span>&nbsp;
            </span>
          ))}
        </div>
      </div>

      <Testimonials items={testimonials} />
      <FAQ items={faqs} />
      <CTABlock email={settings.email} />
    </main>
  );
}

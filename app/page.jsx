import { Fragment } from "react";
import Link from "next/link";
import { R, LineReveal, Counter } from "@/components/Reveals";
import Accent from "@/components/Accent";
import HomeHero from "@/components/HomeHero";
import FilterableWork from "@/components/FilterableWork";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTABlock from "@/components/CTABlock";
import { getAllProjects, getTestimonials, getFaqs, getSiteContent } from "@/lib/queries";

export const revalidate = 60;

function parseStat(value) {
  const m = String(value || "").match(/^(\d+)(.*)$/);
  return m ? { n: parseInt(m[1], 10), suffix: m[2] } : { n: 0, suffix: String(value || "") };
}

export default async function HomePage() {
  const [projects, testimonials, faqs, content] = await Promise.all([
    getAllProjects(),
    getTestimonials(),
    getFaqs(),
    getSiteContent(),
  ]);
  const { settings, home, labels, headings } = content;

  return (
    <main>
      <HomeHero
        tagline={settings.heroTagline}
        line1={home.heroLine1}
        line2={home.heroLine2}
        emphasis={home.heroEmphasis}
        label={home.heroLabel}
        ticker={home.tickerItems}
      />

      <section className="about-strip">
        <div className="about-strip__grid">
          <R><span className="mono section-head__label">{labels.about}</span></R>
          <R d={0.1}>
            <p className="about-strip__text"><Accent>{settings.aboutIntro}</Accent></p>
          </R>
        </div>
      </section>

      <section id="work-section" className="work-section">
        <R>
          <div className="section-head">
            <span className="mono section-head__label">{labels.work}</span>
            <Link href="/work" data-cursor="" className="section-head__link">{labels.viewArchive}</Link>
          </div>
        </R>
        <LineReveal d={0.15} />
        <FilterableWork projects={projects} limit={4} emptyMessage={content.work.empty} />
      </section>

      <section className="quote-section">
        <R><span className="mono section-head__label">{labels.philosophy}</span></R>
        <R d={0.1}>
          <blockquote className="pull-quote"><Accent>{home.philosophyQuote}</Accent></blockquote>
        </R>
      </section>

      <section className="stats-section">
        <LineReveal />
        <div className="stats-grid">
          {home.stats.map((st, i) => {
            const { n, suffix } = parseStat(st.value);
            return (
              <R key={i} d={0.08 * i}>
                <div className="stat-cell">
                  <span className="stat-cell__num"><Counter end={n} suffix={suffix} /></span>
                  <span className="mono stat-cell__label">{st.label}</span>
                </div>
              </R>
            );
          })}
        </div>
        <LineReveal />
      </section>

      <section className="cap-section">
        <R><span className="mono section-head__label">{labels.capabilities}</span></R>
        <R d={0.1}>
          <h2 className="cap-section__title"><Accent>{home.capHeading}</Accent></h2>
        </R>
        <LineReveal d={0.2} />
        <div className="cap-grid">
          {home.capabilities.map((c, i) => (
            <R key={i} d={0.12 * i}>
              <Link href="/services" className="cap-card" data-cursor="explore">
                <div className="cap-card__top">
                  <span className="mono cap-card__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cap-card__arrow">↗</span>
                </div>
                <h3 className="cap-card__title">{c.title}</h3>
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
              {home.marqueeWords.map((w, k) => (
                <Fragment key={k}>{w} <span className="marquee__dot">✦</span> </Fragment>
              ))}
            </span>
          ))}
        </div>
      </div>

      <Testimonials items={testimonials} label={labels.testimonials} heading={headings.testimonials} />
      <FAQ items={faqs} label={labels.faq} heading={headings.faq} />
      <CTABlock />
    </main>
  );
}

import Link from "next/link";
import { R, LineReveal } from "./Reveals";
import { getSiteContent } from "@/lib/queries";

export default async function CTABlock() {
  const { settings, cta } = await getSiteContent();

  return (
    <section className="cta-block">
      <R>
        <LineReveal />
        <div className="cta-block__inner">
          <span className="mono" style={{ color: "var(--text-3)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {cta.eyebrow}
          </span>
          <h2 className="cta-block__title">{cta.heading}</h2>
          <p className="body-text" style={{ marginTop: 16, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
            {cta.text}
          </p>
          <Link href="/contact" data-cursor="let's talk" className="cta-btn">
            <span className="cta-btn__dot" />
            {cta.button}
            <span style={{ marginLeft: 10 }}>→</span>
          </Link>
          <div className="mono" style={{ fontSize: 12, color: "var(--text-3)", marginTop: 20 }}>
            or email <span style={{ color: "var(--accent-text)" }}>{settings.email}</span>
          </div>
        </div>
      </R>
    </section>
  );
}

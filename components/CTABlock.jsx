import Link from "next/link";
import { R, LineReveal } from "./Reveals";

export default function CTABlock({ email = "hello@tahirumer.design" }) {
  return (
    <section className="cta-block">
      <R>
        <LineReveal />
        <div className="cta-block__inner">
          <span className="mono" style={{ color: "var(--text-3)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Ready to start?
          </span>
          <h2 className="cta-block__title">
            Have a project<br />in mind?
          </h2>
          <p className="body-text" style={{ marginTop: 16, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
            I'm currently available for select projects in 2026. Let's talk about yours.
          </p>
          <Link href="/contact" data-cursor="let's talk" className="cta-btn">
            <span className="cta-btn__dot" />
            Start a Conversation
            <span style={{ marginLeft: 10 }}>→</span>
          </Link>
          <div className="mono" style={{ fontSize: 12, color: "var(--text-3)", marginTop: 20 }}>
            or email <span style={{ color: "var(--accent)" }}>{email}</span>
          </div>
        </div>
      </R>
    </section>
  );
}

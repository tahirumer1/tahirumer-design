import Link from "next/link";
import LiveClock from "./LiveClock";
import { getSiteContent } from "@/lib/queries";

export default async function Footer() {
  const { settings, footer } = await getSiteContent();
  const social = settings.socialLinks || [];

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <Link href="/" className="footer__big">
            tahir<br /><span className="accent">umer.</span>
          </Link>
          <p className="mono" style={{ color: "var(--text-3)", fontSize: 12, marginTop: 24, maxWidth: 280, lineHeight: 1.7 }}>
            {footer.tagline}
          </p>
        </div>
        <div className="footer__cols">
          <div className="footer__col">
            <span className="mono footer__col-label">Navigate</span>
            <Link href="/" data-cursor="">Home</Link>
            <Link href="/work" data-cursor="">Work</Link>
            <Link href="/about" data-cursor="">About</Link>
            <Link href="/services" data-cursor="">Services</Link>
            <Link href="/contact" data-cursor="">Contact</Link>
          </div>
          <div className="footer__col">
            <span className="mono footer__col-label">Social</span>
            {social.map((s) => (
              <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" data-cursor="">
                {s.platform} ↗
              </a>
            ))}
          </div>
          <div className="footer__col">
            <span className="mono footer__col-label">Contact</span>
            <a href={`mailto:${settings.email}`} style={{ color: "var(--accent-text)" }}>{settings.email}</a>
            <span style={{ color: "var(--text-3)" }}>
              Lahore, PK · <LiveClock />
            </span>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <span className="mono">{footer.copyright}</span>
        <span className="mono">{footer.note}</span>
      </div>
    </footer>
  );
}

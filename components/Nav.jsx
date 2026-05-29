"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  ["/work", "Work"],
  ["/about", "About"],
  ["/services", "Services"],
  ["/contact", "Contact"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mOpen, setMOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setMOpen(false); }, [pathname]);

  const isActive = (href) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <Link href="/" className="nav__logo" data-cursor="home">
          <span className="nav__logo-dot" />
          <span>tahir<span className="accent">umer</span></span>
        </Link>
        <div className="nav__links">
          {LINKS.map(([href, label], i) => (
            <Link key={href} href={href} data-cursor="" className={`nav__link ${isActive(href) ? "nav__link--active" : ""}`}>
              <span className="mono nav__link-num">0{i + 1}</span>
              {label}
            </Link>
          ))}
          <Link href="/contact" data-cursor="let's talk" className="nav__cta">
            <span className="nav__cta-dot" />Available
          </Link>
        </div>
        <button
          className={`nav__burger ${mOpen ? "nav__burger--open" : ""}`}
          onClick={() => setMOpen(!mOpen)}
          aria-label={mOpen ? "Close menu" : "Open menu"}
          aria-expanded={mOpen}
          aria-controls="mobile-menu"
        >
          <span /><span />
        </button>
      </nav>

      <div id="mobile-menu" className={`mobile-menu ${mOpen ? "mobile-menu--open" : ""}`}>
        {[["/", "Home"], ...LINKS].map(([href, label], i) => (
          <Link key={href} href={href} className="mobile-menu__link" style={{ transitionDelay: mOpen ? `${0.08 * i}s` : "0s" }}>
            <span className="mono" style={{ color: "var(--accent-text)", fontSize: 12 }}>0{i + 1}</span>
            {label}
          </Link>
        ))}
      </div>
    </>
  );
}

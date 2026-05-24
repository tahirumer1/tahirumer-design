import { R } from "@/components/Reveals";
import CTABlock from "@/components/CTABlock";
import ServicesList from "@/components/ServicesList";
import { getServices, getSiteSettings } from "@/lib/queries";

export const revalidate = 60;
export const metadata = { title: "Services — Tahir Umer" };

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSiteSettings()]);

  return (
    <main className="page-pad">
      <R><span className="mono" style={{ color: "var(--accent)", fontSize: 12 }}>003 / Services</span></R>
      <R d={0.1}><h1 className="page-title">How I<br />Can Help.</h1></R>
      <R d={0.15}>
        <p className="page-sub" style={{ maxWidth: 520 }}>
          I help businesses design and build digital products that are clear, usable, and built to perform.
        </p>
      </R>

      <ServicesList services={services} />

      <R>
        <div style={{ marginTop: "var(--space-lg)", padding: "40px 0" }}>
          <p style={{ fontFamily: "var(--display)", fontSize: 26, color: "var(--text-2)", fontWeight: 500, letterSpacing: "-0.02em" }}>
            Not sure what you need? <em>Let's figure it out together.</em>
          </p>
        </div>
      </R>

      <CTABlock email={settings.email} />
    </main>
  );
}

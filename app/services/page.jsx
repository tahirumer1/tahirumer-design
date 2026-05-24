import { R } from "@/components/Reveals";
import Accent from "@/components/Accent";
import CTABlock from "@/components/CTABlock";
import ServicesList from "@/components/ServicesList";
import { getServices, getSiteContent } from "@/lib/queries";

export const revalidate = 60;
export const metadata = { title: "Services — Tahir Umer" };

export default async function ServicesPage() {
  const [services, content] = await Promise.all([getServices(), getSiteContent()]);
  const copy = content.services;

  return (
    <main className="page-pad">
      <R><span className="mono" style={{ color: "var(--accent)", fontSize: 12 }}>003 / Services</span></R>
      <R d={0.1}><h1 className="page-title">{copy.title}</h1></R>
      <R d={0.15}>
        <p className="page-sub" style={{ maxWidth: 520 }}>{copy.sub}</p>
      </R>

      <ServicesList services={services} />

      <R>
        <div style={{ marginTop: "var(--space-lg)", padding: "40px 0" }}>
          <p style={{ fontFamily: "var(--display)", fontSize: 26, color: "var(--text-2)", fontWeight: 500, letterSpacing: "-0.02em" }}>
            <Accent>{copy.footer}</Accent>
          </p>
        </div>
      </R>

      <CTABlock />
    </main>
  );
}

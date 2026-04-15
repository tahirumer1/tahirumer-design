import { R } from "@/components/Reveals";
import FilterableWork from "@/components/FilterableWork";
import CTABlock from "@/components/CTABlock";
import { getAllProjects, getSiteSettings } from "@/lib/queries";

export const revalidate = 60;
export const metadata = { title: "Work — Tahir Umer" };

export default async function WorkPage() {
  const [projects, settings] = await Promise.all([getAllProjects(), getSiteSettings()]);

  return (
    <main className="page-pad">
      <R><span className="mono" style={{ color: "var(--accent)", fontSize: 12 }}>004 / Work</span></R>
      <R d={0.1}><h1 className="page-title">Selected<br />Work.</h1></R>
      <R d={0.2}>
        <p className="page-sub">
          A carefully picked showcase of projects that highlight my commitment to product design, UX, and digital craft.
        </p>
      </R>

      <div style={{ marginTop: "var(--space-md)" }}>
        <R d={0.3}>
          <FilterableWork projects={projects} showCounts />
        </R>
      </div>

      <CTABlock email={settings.email} />
    </main>
  );
}
